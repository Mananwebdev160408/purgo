"use client";

import { useState } from "react";
import {
  IconShieldCheck,
  IconCpu,
  IconDownload,
  IconArrowUpRight,
  IconSparkles,
  IconTrash,
  IconDeviceDesktop,
  IconCheck,
  IconTerminal,
  IconActivity,
  IconLock,
  IconCopy,
  IconRefresh,
} from "@tabler/icons-react";

interface HeroProps {
  onToast: (msg: string) => void;
}

export default function Hero({ onToast }: HeroProps) {
  const [downloading, setDownloading] = useState(false);
  const [activeTab, setActiveTab] = useState<"terminal" | "shield" | "vault">("terminal");
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    onToast("Starting Purgo Setup Wizard Download...");
    setTimeout(() => setDownloading(false), 2500);
    window.open("https://github.com/Mananwebdev160408/purgo/releases/download/v1.0.0/Purgo-Setup-1.0.0.exe", "_blank");
  };

  const handleCopyCommand = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("purgo --clean");
    setCopied(true);
    onToast('Copied "purgo --clean" to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="hero"
      className="relative pt-8 sm:pt-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center scroll-mt-24"
    >
      {/* Top Status Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        <a
          href="https://github.com/Mananwebdev160408/purgo/releases/download/v1.0.0/Purgo-Setup-1.0.0.exe"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono hover:bg-emerald-500/20 transition backdrop-blur-md"
        >
          <IconDeviceDesktop size={16} className="text-emerald-400" />
          <span>Purgo Desktop App v1.0.0</span>
          <IconArrowUpRight size={14} className="text-emerald-400/70" />
        </a>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-sans font-medium backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Windows 10 & 11 Optimized</span>
        </div>
      </div>

      {/* Main Headline (Retained) */}
      <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.08] mb-6 max-w-4xl mx-auto font-display">
        Single-Click <span className="text-emerald-400">Windows Debloater</span>{" "}
        & System Optimizer
      </h1>

      {/* Subtitle (Retained) */}
      <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 font-sans">
        Reclaim memory, strip unwanted diagnostic telemetry, and eliminate pre-installed Windows bloatware instantly — 100% open source, lightweight & safe with automatic restore points.
      </p>

      {/* Brand New Interactive Desktop App Window Shell (Replaces Old Card) */}
      <div className="max-w-4xl mx-auto rounded-3xl border border-white/15 bg-[#090d16]/95 p-2 sm:p-3 shadow-[0_25px_60px_rgba(0,0,0,0.85)] text-left backdrop-blur-2xl relative overflow-hidden">
        
        {/* Subtle Top Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.15),transparent_70%)] pointer-events-none" />

        {/* Window Titlebar Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0e1320]/80 rounded-2xl border border-white/5 mb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 mr-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="font-mono text-xs font-semibold text-slate-300 flex items-center gap-2">
              <IconTerminal size={14} className="text-emerald-400" />
              Purgo-v1.0.0.exe [Administrator]
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              System Restore Ready
            </span>
          </div>
        </div>

        {/* Inner Window Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          
          {/* Left Column: Interactive Terminal Preview & Status Tabs */}
          <div className="lg:col-span-7 bg-[#05070d]/90 rounded-2xl border border-white/5 p-4 sm:p-5 flex flex-col justify-between font-mono space-y-4">
            
            {/* Terminal Tab Switcher Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={() => setActiveTab("terminal")}
                  className={`px-3 py-1 rounded-lg transition ${
                    activeTab === "terminal"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Live Console
                </button>
                <button
                  onClick={() => setActiveTab("shield")}
                  className={`px-3 py-1 rounded-lg transition ${
                    activeTab === "shield"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Telemetry Shield
                </button>
                <button
                  onClick={() => setActiveTab("vault")}
                  className={`px-3 py-1 rounded-lg transition ${
                    activeTab === "vault"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Safety Vault
                </button>
              </div>

              <span className="text-[10px] text-slate-500">NTFS 64-bit</span>
            </div>

            {/* Terminal Log Output Window */}
            <div className="text-xs space-y-2 min-h-[140px] text-slate-300">
              {activeTab === "terminal" && (
                <>
                  <div className="text-slate-500">[00:00:01] Initializing Purgo Core Engine v1.0.0...</div>
                  <div className="text-emerald-400">[00:00:02] ✔ Created Windows System Restore Point #3842</div>
                  <div className="text-slate-300">[00:00:03] Scanning bloatware: XboxLive, Cortana, OneDrive...</div>
                  <div className="text-emerald-300 font-bold">[00:00:04] Purged 24 packages. RAM Freed: +1.8 GB</div>
                  <div className="text-slate-400 flex items-center gap-1.5 pt-1">
                    <span className="text-emerald-400 font-bold">$</span>
                    <span className="text-white animate-pulse">purgo --clean --restore-point=auto</span>
                  </div>
                </>
              )}

              {activeTab === "shield" && (
                <>
                  <div className="text-slate-400">[SHIELD] Diagnostic Telemetry Beacon Inspection:</div>
                  <div className="text-emerald-400">✔ DiagTrack (Connected User Experiences): DISABLED</div>
                  <div className="text-emerald-400">✔ dmwappushservice (Routing Service): DISABLED</div>
                  <div className="text-emerald-400">✔ Feedback Hub & Diagnostic Data: BLOCKED</div>
                  <div className="text-slate-300 pt-1">Privacy Level: 100% Shielded (Zero Outbound Beacons)</div>
                </>
              )}

              {activeTab === "vault" && (
                <>
                  <div className="text-slate-400">[VAULT] Purgo Safety Quarantine Staging:</div>
                  <div className="text-emerald-300">✔ 14 Temp Cache Files staged in Isolated Vault</div>
                  <div className="text-emerald-300">✔ Reversible threshold: Single-click instant restore</div>
                  <div className="text-slate-500 pt-1">Status: Zero risk of permanent system loss</div>
                </>
              )}
            </div>

            {/* Live Performance Quick Meter */}
            <div className="pt-3 border-t border-white/5 grid grid-cols-3 gap-2 text-[11px]">
              <div className="bg-white/[0.03] p-2 rounded-lg border border-white/5">
                <span className="text-slate-400 block">RAM Freed</span>
                <span className="text-emerald-400 font-bold text-xs">+1.8 GB</span>
              </div>
              <div className="bg-white/[0.03] p-2 rounded-lg border border-white/5">
                <span className="text-slate-400 block">Bloat Purged</span>
                <span className="text-emerald-400 font-bold text-xs">24 Apps</span>
              </div>
              <div className="bg-white/[0.03] p-2 rounded-lg border border-white/5">
                <span className="text-slate-400 block">Restore Point</span>
                <span className="text-emerald-400 font-bold text-xs">Verified</span>
              </div>
            </div>
          </div>

          {/* Right Column: High Conversion App Launcher CTA & Quick Copy */}
          <div className="lg:col-span-5 bg-[#0e1320]/90 rounded-2xl border border-white/10 p-5 flex flex-col justify-between space-y-4">
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <IconDeviceDesktop size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm font-sans flex items-center gap-2">
                    <span>Purgo Desktop GUI</span>
                    <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      Standalone .exe
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 font-sans mt-0.5">
                    Windows 10 & 11 • Installer & Portable
                  </p>
                </div>
              </div>

              <p className="text-slate-300 text-xs font-sans leading-relaxed">
                Lightweight open-source desktop utility. One click creates a system restore snapshot and purges bloat safely.
              </p>
            </div>

            {/* Primary Download Button */}
            <div className="space-y-2">
              <button
                onClick={handleDownload}
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-sans font-bold text-xs transition flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/25"
              >
                {downloading ? (
                  <IconCheck size={18} className="text-slate-950 animate-bounce" />
                ) : (
                  <IconDownload size={18} className="text-slate-950" />
                )}
                <span>{downloading ? "Opening Release..." : "Download Purgo Desktop App"}</span>
              </button>

              {/* Quick CLI Copy Snippet */}
              <button
                onClick={handleCopyCommand}
                className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-300 font-mono text-[11px] transition flex items-center justify-between"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-400 font-bold">$</span>
                  <span>purgo --clean</span>
                </div>
                {copied ? <IconCheck size={14} className="text-emerald-400" /> : <IconCopy size={14} className="text-slate-400" />}
              </button>
            </div>

            {/* Safeguard Footnote */}
            <div className="text-[11px] text-slate-400 font-sans flex items-center gap-2 pt-1 border-t border-white/5">
              <IconShieldCheck size={16} className="text-emerald-400 shrink-0" />
              <span>100% Reversible • Automatic Restore Snapshots</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
