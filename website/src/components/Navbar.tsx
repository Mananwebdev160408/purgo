"use client";

import {
  IconTerminal,
  IconExternalLink,
  IconBrandGithub,
} from "@tabler/icons-react";

interface NavbarProps {
  onToast: (msg: string) => void;
}

export function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export default function Navbar({ onToast }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#080a11]/90 border-b border-[#1e2638] backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:border-emerald-400 transition p-1">
            <img
              src="/logo.png"
              alt="Purgo Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-base tracking-tight text-white group-hover:text-emerald-300 transition font-sans">
              Purgo
            </span>
            <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-900 text-emerald-400 border border-emerald-500/30">
              v1.0.0
            </span>
          </div>
        </a>

        {/* Quick Section Anchors & Action Links */}
        <div className="hidden lg:flex items-center gap-6 text-xs font-sans font-medium text-slate-300">
          <a href="#modules" className="hover:text-emerald-400 transition">
            Modules
          </a>
          <a href="#simulator" className="hover:text-emerald-400 transition">
            Simulator
          </a>
          <a href="#safety" className="hover:text-emerald-400 transition">
            Safety
          </a>
          <a href="#benchmarks" className="hover:text-emerald-400 transition">
            Benchmarks
          </a>
          <a href="#faq" className="hover:text-emerald-400 transition">
            FAQ
          </a>
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Download App Button */}
          <a
            href="https://github.com/Mananwebdev160408/purgo/releases/download/v1.0.0/Purgo-Setup-1.0.0.exe"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-sans font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition"
          >
            <IconTerminal size={15} className="text-emerald-400" />
            <span className="hidden sm:inline">Download App</span>
            <IconExternalLink size={14} className="text-emerald-400/70" />
          </a>

          {/* GitHub Repo */}
          <a
            href="https://github.com/Mananwebdev160408/purgo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-200 border border-[#1e2638] transition"
          >
            <IconBrandGithub size={16} />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
