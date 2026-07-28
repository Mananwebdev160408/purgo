"use client";

import { useState } from "react";
import {
  IconDownload,
  IconCheck,
  IconShieldCheck,
  IconBrandGithub,
  IconDeviceDesktop,
} from "@tabler/icons-react";

interface DownloadCtaProps {
  onToast: (msg: string) => void;
}

export default function DownloadCta({ onToast }: DownloadCtaProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    onToast("Starting Purgo Setup Wizard Download...");
    setTimeout(() => setDownloading(false), 2500);
    window.open(
      "https://github.com/Mananwebdev160408/purgo/releases/download/v1.0.0/Purgo-Setup-1.0.0.exe",
      "_blank"
    );
  };

  return (
    <section
      id="download"
      className="relative px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto scroll-mt-28"
    >
      <div className="shredded-glass-panel rounded-3xl border-emerald-500/40 p-8 sm:p-14 text-center">
        {/* Glow Effects */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[radial-gradient(circle,rgba(16,185,129,0.3),transparent_70%)] pointer-events-none" />

        <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono backdrop-blur-xl shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <IconDeviceDesktop size={15} />
            <span>Purgo v1.0.0 Desktop Standalone</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
            Reclaim Your Storage <br />
            <span className="text-emerald-400">Keep Your Sanity</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-sans leading-relaxed">
            Download Purgo for Windows 10 & 11. Clean recreatable build artifacts, global caches, and stale git repos safely with 30-day Purgo Trash.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={handleDownload}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-sans font-black text-sm transition flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(16,185,129,0.35)] backdrop-blur-md"
            >
              {downloading ? (
                <IconCheck size={20} className="text-emerald-950 animate-pulse" />
              ) : (
                <IconDownload size={20} className="text-emerald-950" />
              )}
              <span>
                {downloading ? "Opening Release..." : "Download Purgo Desktop App (.exe)"}
              </span>
            </button>

            <a
              href="https://github.com/Mananwebdev160408/purgo"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-white/15 text-slate-200 font-sans font-bold text-sm transition flex items-center justify-center gap-2.5 backdrop-blur-md"
            >
              <IconBrandGithub size={20} />
              <span>GitHub Repository</span>
            </a>
          </div>

          <div className="pt-4 flex items-center justify-center gap-6 text-xs text-slate-400 font-sans">
            <span className="flex items-center gap-1.5">
              <IconShieldCheck size={16} className="text-emerald-400" />
              100% Free & Open Source (MIT)
            </span>
            <span>•</span>
            <span>Windows 10 & 11 (64-bit)</span>
            <span>•</span>
            <span>Zero Telemetry</span>
          </div>
        </div>
      </div>
    </section>
  );
}
