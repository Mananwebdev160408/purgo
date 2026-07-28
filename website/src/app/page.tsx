'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

import Hero from '@/components/Hero';
import PurgoModules from '@/components/PurgoModules';
import PurgoSimulator from '@/components/PurgoSimulator';
import BottomDock from '@/components/BottomDock';
import ScrollConvergingBackground from '@/components/ScrollConvergingBackground';
import CursorGlowAndScrollProgress from '@/components/CursorGlowAndScrollProgress';
import InitialPreloader from '@/components/InitialPreloader';

// Dynamic Lazy-Loaded Sections
const SafetyArchitecture = dynamic(() => import('@/components/SafetyArchitecture'));
const PerformanceMatrix = dynamic(() => import('@/components/PerformanceMatrix'));
const PurgoFaq = dynamic(() => import('@/components/PurgoFaq'));
const DownloadCta = dynamic(() => import('@/components/DownloadCta'));

interface ToastItem {
  id: number;
  message: string;
}

export default function Home() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (message: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  };

  return (
    <div className="relative min-h-screen bg-[#080a11] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* 1. High-Craft System Boot Preloader (Retained) */}
      <InitialPreloader />

      {/* 2. Interactive Cursor Light Beam Ambient Glow */}
      <CursorGlowAndScrollProgress />

      {/* 3. Scroll-Reactive Converging 3D Background Artwork */}
      <ScrollConvergingBackground />

      {/* 4. Background Ambient Radial Lighting Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute inset-0 bg-cover bg-top opacity-[0.25] pointer-events-none"
          style={{
            backgroundImage: 'url(/banner.jpg)',
            filter: 'hue-rotate(125deg) saturate(1.35) brightness(1.05)',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 90%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 90%)',
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.18),transparent_70%)]" />
        <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(16,185,129,0.08),transparent_65%)]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(52,211,153,0.09),transparent_65%)]" />
      </div>

      {/* 5. Toast Notifications */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto px-4 py-3 rounded-xl border border-emerald-500/30 bg-[#0e1320]/90 text-emerald-300 font-sans text-xs font-semibold shadow-2xl flex items-center gap-3 backdrop-blur-xl animate-slide-in"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      {/* 6. Main Page Sections */}
      <main className="relative z-10 space-y-20 sm:space-y-32 pt-12 pb-36">
        <Hero onToast={addToast} />
        <PurgoModules onToast={addToast} />
        <PurgoSimulator onToast={addToast} />
        <SafetyArchitecture />
        <PerformanceMatrix />
        <PurgoFaq />
        <DownloadCta onToast={addToast} />
      </main>

      {/* 7. Bottom Navigation Command Dock */}
      <BottomDock onToast={addToast} />
    </div>
  );
}
