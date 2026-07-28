"use client";

import { useState } from "react";
import {
  IconDownload,
  IconBrandGithub,
  IconCheck,
  IconCopy,
  IconDeviceDesktop,
  IconShieldCheck,
  IconSparkles,
} from "@tabler/icons-react";

interface DownloadCtaProps {
  onToast?: (msg: string) => void;
}

export default function DownloadCta({ onToast }: DownloadCtaProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyCommand = () => {
    navigator.clipboard.writeText("git clone https://github.com/Mananwebdev160408/debloater.git");
    setCopied(true);
    if (onToast) onToast("Copied repository git command to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="download"
      className="relative px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-28"
    >
      <div className="glass-panel rounded-3xl border border-emerald-500/30 p-8 sm:p-14 bg-gradient-to-b from-[#0a121f] to-[#06080e] shadow-[0_0_50px_rgba(16,185,129,0.15)] text-center relative overflow-hidden">
        {/* Background Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.15),transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
            <IconSparkles size={16} />
            <span>Ready for Instant System Speed?</span>
          </div>

          <h2 className="text-3xl sm:text-6xl font-black text-white tracking-tight leading-tight font-display">
            Take Back Control of Your <br />
            <span className="text-emerald-400">Windows PC Today</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg font-sans leading-relaxed">
            Download Purgo Desktop GUI now — lightweight, 100% open source, with automatic System Restore point protection and instant bloatware removal.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="https://github.com/Mananwebdev160408/debloater"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm font-sans transition flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/25"
            >
              <IconDownload size={20} />
              <span>Download Purgo Desktop v1.0.0</span>
            </a>

            <a
              href="https://github.com/Mananwebdev160408/debloater"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900 border border-white/10 hover:bg-slate-800 text-slate-200 font-semibold text-sm font-sans transition flex items-center justify-center gap-2"
            >
              <IconBrandGithub size={20} />
              <span>View Source Code</span>
            </a>
          </div>

          {/* Git Clone Quick Command */}
          <div className="pt-6">
            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-slate-300 backdrop-blur-md">
              <span className="text-emerald-400 font-bold">$</span>
              <span>git clone https://github.com/Mananwebdev160408/debloater.git</span>
              <button
                onClick={handleCopyCommand}
                className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-emerald-300 transition ml-2"
                title="Copy Command"
              >
                {copied ? <IconCheck size={16} className="text-emerald-400" /> : <IconCopy size={16} />}
              </button>
            </div>
          </div>

          {/* Footnotes */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-sans pt-4">
            <span className="flex items-center gap-1.5">
              <IconDeviceDesktop size={15} className="text-emerald-400" /> Windows 10 & 11 (64-bit)
            </span>
            <span className="flex items-center gap-1.5">
              <IconShieldCheck size={15} className="text-emerald-400" /> System Restore Safeguard
            </span>
            <span className="flex items-center gap-1.5">
              <IconSparkles size={15} className="text-emerald-400" /> 100% Free & Open Source
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
