'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  IconHome,
  IconCpu,
  IconSparkles,
  IconShieldCheck,
  IconChartBar,
  IconHelpCircle,
  IconDownload,
  IconCopy,
  IconCheck,
  IconBrandGithub,
  IconX,
} from '@tabler/icons-react';
import DbPortalLogo from './DbPortalLogo';

interface BottomDockProps {
  onToast?: (msg: string) => void;
}

export default function BottomDock({ onToast }: BottomDockProps) {
  const [activeSection, setActiveSection] = useState('hero');
  const [copied, setCopied] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Framer Motion Scroll Progress Tracker
  const { scrollYProgress } = useScroll();

  // Dynamic Conic Gradient Border starting from top (270deg) and filling clockwise with scroll
  const borderBackground = useTransform(
    scrollYProgress,
    (progress) => {
      const pct = Math.min(Math.max(progress * 100, 0.5), 100);
      return `conic-gradient(from 270deg at 50% 50%, #10b981 0%, #34d399 ${pct}%, rgba(255, 255, 255, 0.12) ${pct}%, rgba(255, 255, 255, 0.12) 100%)`;
    }
  );

  const dockItems = [
    { id: 'hero', label: 'Overview', key: '1', icon: IconHome },
    { id: 'modules', label: 'Modules', key: '2', icon: IconCpu },
    { id: 'simulator', label: 'Simulator', key: '3', icon: IconSparkles },
    { id: 'safety', label: 'Safety', key: '4', icon: IconShieldCheck },
    { id: 'benchmarks', label: 'Benchmarks', key: '5', icon: IconChartBar },
    { id: 'faq', label: 'FAQ', key: '6', icon: IconHelpCircle },
    { id: 'download', label: 'Download', key: '7', icon: IconDownload },
  ];

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '-20% 0px -50% 0px',
      threshold: 0.1,
    });

    dockItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key >= '1' && e.key <= '7')) {
        const keyVal = e.key;
        const target = dockItems.find((item) => item.key === keyVal);
        if (target) {
          e.preventDefault();
          const targetEl = document.getElementById(target.id);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
            if (onToast) onToast(`Navigated to ${target.label}`);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      observer.disconnect();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onToast]);

  const handleNavClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveSection(id);
    const targetEl = document.getElementById(id);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('purgo --clean');
    setCopied(true);
    if (onToast) onToast('Copied "purgo --clean" to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* 1. DESKTOP/TABLET DOCK (Horizontal) */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 max-w-[95vw] hidden md:block">
        <div className="relative rounded-full p-[2px] shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden">
          {/* Dynamic Framer Motion Scroll Progress Conic Glow Border */}
          <motion.div
            className="absolute -inset-[200%] pointer-events-none z-0 shadow-[0_0_20px_rgba(16,185,129,0.6)]"
            style={{ background: borderBackground }}
          />

          {/* Inner Dock Bar */}
          <div className="bg-[#0e1320]/90 border border-white/10 backdrop-blur-2xl rounded-full p-1.5 sm:p-2 flex items-center gap-1 font-sans text-xs relative z-10">
            
            {/* Brand Badge inside Dock */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick('hero', e)}
              className="dock-item relative flex items-center justify-center p-1 rounded-full hover:bg-white/10 transition"
              aria-label="Purgo"
            >
              <DbPortalLogo className="w-8 h-8 sm:w-10 sm:h-10 shrink-0" />
              <span className="dock-tooltip font-sans font-bold text-emerald-300">
                Purgo
              </span>
            </a>

            <div className="w-px h-5 bg-white/10 mx-1 hidden sm:block" />

            {/* Navigation Items */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none px-1 py-0.5">
              {dockItems.map((item, idx) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;

                return (
                  <div key={item.id} className="relative flex items-center shrink-0">
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleNavClick(item.id, e)}
                      className={`dock-item flex items-center justify-center p-2.5 sm:p-3 rounded-full transition-all duration-200 ${
                        isActive
                          ? 'active text-emerald-300 bg-emerald-500/25 border border-emerald-500/50 shadow-[0_0_18px_rgba(16,185,129,0.35)] scale-105'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-white/10'
                      }`}
                      aria-label={item.label}
                    >
                      <Icon size={18} stroke={1.75} />
                      <span className="dock-tooltip font-sans">
                        {item.label}
                      </span>
                    </a>

                    {(idx === 2 || idx === 5) && <div className="w-px h-5 bg-white/10 mx-1 hidden sm:block" />}
                  </div>
                );
              })}
            </div>

            <div className="w-px h-5 bg-white/10 mx-1 hidden sm:block" />

            {/* Quick Actions inside Dock */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={handleQuickCopy}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 text-xs font-mono transition shadow-inner"
                title="Copy debloat command"
              >
                {copied ? <IconCheck size={15} stroke={2} className="text-emerald-300" /> : <IconCopy size={15} stroke={1.75} className="text-emerald-400" />}
                <span className="hidden md:inline font-semibold">purgo --clean</span>
              </button>

              <a
                href="https://github.com/Mananwebdev160408/debloater"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition"
                title="GitHub Repository"
              >
                <IconBrandGithub size={19} stroke={1.75} />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. MOBILE DOCK */}
      <div className="md:hidden">
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 15 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="fixed bottom-24 right-6 z-50 bg-[#0e1320]/95 border border-white/10 backdrop-blur-2xl rounded-2xl p-3 flex flex-col gap-2 shadow-[0_20px_50px_rgba(0,0,0,0.85)] max-h-[60vh] overflow-y-auto scrollbar-none w-48"
            >
              {dockItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;

                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      handleNavClick(item.id, e);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-150 ${
                      isActive
                        ? 'text-emerald-300 bg-emerald-500/20 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.2)] font-bold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <Icon size={18} stroke={1.75} className="shrink-0" />
                    <span className="font-sans text-xs font-semibold">{item.label}</span>
                  </a>
                );
              })}

              <div className="h-px bg-white/10 my-1" />

              <button
                onClick={(e) => {
                  handleQuickCopy(e);
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 text-xs font-mono transition"
              >
                {copied ? <IconCheck size={16} stroke={2} className="text-emerald-300" /> : <IconCopy size={16} stroke={1.75} className="text-emerald-400" />}
                <span className="font-bold">purgo --clean</span>
              </button>

              <a
                href="https://github.com/Mananwebdev160408/debloater"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-[#1e2638] text-slate-300 text-xs font-semibold hover:bg-slate-800 transition"
              >
                <IconBrandGithub size={18} stroke={1.75} />
                <span>GitHub Repo</span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          drag
          dragMomentum={false}
          dragConstraints={{ left: -320, right: 0, top: -720, bottom: 0 }}
          whileDrag={{ scale: 1.05 }}
          className="fixed bottom-6 right-6 z-50 cursor-grab active:cursor-grabbing select-none"
        >
          <div className="relative rounded-full p-[2px] shadow-[0_10px_30px_rgba(0,0,0,0.8)] overflow-hidden">
            <motion.div
              className="absolute -inset-[200%] pointer-events-none z-0"
              style={{ background: borderBackground }}
            />

            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="relative z-10 w-14 h-14 rounded-full bg-[#0e1320]/95 border border-white/10 backdrop-blur-xl flex items-center justify-center text-white transition hover:bg-[#141a2b] shadow-inner"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <IconX size={24} className="text-emerald-400" />
              ) : (
                <DbPortalLogo className="w-10 h-10" />
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
