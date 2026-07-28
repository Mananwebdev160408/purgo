"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconShieldCheck,
  IconCpu,
  IconDownload,
  IconArrowUpRight,
  IconSparkles,
  IconTrash,
  IconDeviceDesktop,
  IconCheck,
  IconFolder,
  IconRefresh,
  IconGauge,
  IconBrandGit,
  IconLayersSubtract,
  IconFolderOff,
  IconTerminal,
} from "@tabler/icons-react";

interface HeroProps {
  onToast: (msg: string) => void;
}

export default function Hero({ onToast }: HeroProps) {
  const [downloading, setDownloading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isCleaned, setIsCleaned] = useState(false);
  const [activeTab, setActiveTab] = useState<"artifacts" | "caches" | "trash">(
    "artifacts"
  );

  const handleDownload = () => {
    setDownloading(true);
    onToast("Starting Purgo Setup Wizard Download...");
    setTimeout(() => setDownloading(false), 2500);
    window.open(
      "https://github.com/Mananwebdev160408/purgo/releases/download/v1.0.0/Purgo-Setup-1.0.0.exe",
      "_blank"
    );
  };

  const handleSimulateScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    onToast("Scanning filesystem for recreatable build artifacts...");
    setTimeout(() => {
      setIsScanning(false);
      setIsCleaned(true);
      onToast("Scan Complete: 28.4 GB Reclaimable Space Staged to Purgo Trash!");
    }, 1800);
  };

  const handleResetSimulation = () => {
    setIsCleaned(false);
    onToast("Reset simulation to initial state.");
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
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono hover:bg-emerald-500/20 transition backdrop-blur-xl shadow-[0_0_20px_rgba(16,185,129,0.15)]"
        >
          <IconDeviceDesktop size={16} className="text-emerald-400" />
          <span>Purgo v1.0.0 • Developer Disk Manager</span>
          <IconArrowUpRight size={14} className="text-emerald-400/70" />
        </a>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-sans font-medium backdrop-blur-xl shadow-[0_0_20px_rgba(16,185,129,0.15)]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>10+ Ecosystems Supported • Windows 10 & 11</span>
        </div>
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.08] mb-6 max-w-4xl mx-auto font-display">
        Single-Click <span className="text-emerald-400">Developer Disk Manager</span>{" "}
        & Artifact Cleaner
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 font-sans">
        Reclaim tens of gigabytes from abandoned <code className="text-emerald-300 font-mono text-xs px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">node_modules</code>, Rust <code className="text-emerald-300 font-mono text-xs px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">target/</code>, Python <code className="text-emerald-300 font-mono text-xs px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">venv</code>, and toolchain caches — 100% safe with 30-day recoverable Purgo Trash.
      </p>

      {/* Shredded Glass Interactive App Showcase Card */}
      <div className="max-w-4xl mx-auto rounded-3xl shredded-glass-panel p-3 sm:p-4 text-left">
        {/* Glowing Radial Background Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-44 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.25),transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* GUI Glass Titlebar Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0e1424]/40 rounded-2xl border border-white/10 backdrop-blur-xl mb-4 shadow-inner">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            </div>
            <div className="h-4 w-px bg-white/10 mx-1" />
            <span className="font-sans text-xs font-bold text-white flex items-center gap-2">
              <IconDeviceDesktop size={16} className="text-emerald-400" />
              Purgo Desktop Manager
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono backdrop-blur-md">
              C:\Users\dev\projects
            </span>
          </div>

          <div className="flex items-center gap-2 font-sans text-xs">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-medium backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              30-Day Purgo Trash Active
            </span>
          </div>
        </div>

        {/* GUI Dashboard Translucent Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Column: Translucent Control Deck */}
          <div className="lg:col-span-7 bg-[#060a14]/40 rounded-2xl border border-white/10 p-5 flex flex-col justify-between space-y-5 backdrop-blur-xl shadow-inner">
            {/* View Switcher Tabs */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex flex-wrap items-center gap-1.5 text-xs font-sans">
                <button
                  onClick={() => setActiveTab("artifacts")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition backdrop-blur-md ${
                    activeTab === "artifacts"
                      ? "bg-emerald-500/25 text-emerald-300 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  }`}
                >
                  <IconLayersSubtract size={15} />
                  <span>Build Artifacts</span>
                </button>
                <button
                  onClick={() => setActiveTab("caches")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition backdrop-blur-md ${
                    activeTab === "caches"
                      ? "bg-emerald-500/25 text-emerald-300 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  }`}
                >
                  <IconCpu size={15} />
                  <span>Global Caches</span>
                </button>
                <button
                  onClick={() => setActiveTab("trash")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition backdrop-blur-md ${
                    activeTab === "trash"
                      ? "bg-emerald-500/25 text-emerald-300 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  }`}
                >
                  <IconFolderOff size={15} />
                  <span>Purgo Trash</span>
                </button>
              </div>

              {isCleaned && (
                <button
                  onClick={handleResetSimulation}
                  className="text-[11px] text-slate-400 hover:text-emerald-400 flex items-center gap-1 font-mono transition"
                  title="Reset Demo"
                >
                  <IconRefresh size={13} />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Translucent Tab Content Panels */}
            <div className="min-h-[165px]">
              <AnimatePresence mode="wait">
                {activeTab === "artifacts" && (
                  <motion.div
                    key="artifacts"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="space-y-3 font-sans"
                  >
                    <div className="flex items-center justify-between bg-white/[0.04] p-3 rounded-xl border border-white/10 backdrop-blur-md text-xs hover:border-emerald-500/30 transition">
                      <div>
                        <div className="font-bold text-white flex items-center gap-2">
                          <span>web-app/node_modules</span>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-semibold">
                            ✅ Safe to Reclaim
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          Recreatable with <code className="text-slate-300 font-mono">npm install</code>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-emerald-400">14.2 GB</span>
                    </div>

                    <div className="flex items-center justify-between bg-white/[0.04] p-3 rounded-xl border border-white/10 backdrop-blur-md text-xs hover:border-emerald-500/30 transition">
                      <div>
                        <div className="font-bold text-white flex items-center gap-2">
                          <span>rust-backend/target</span>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-semibold">
                            ✅ Safe to Reclaim
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          Recreatable with <code className="text-slate-300 font-mono">cargo build</code>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-emerald-400">8.6 GB</span>
                    </div>

                    <div className="flex items-center justify-between bg-white/[0.04] p-3 rounded-xl border border-white/10 backdrop-blur-md text-xs hover:border-amber-500/30 transition">
                      <div>
                        <div className="font-bold text-white flex items-center gap-2">
                          <span>ml-service/.venv</span>
                          <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[10px] font-mono font-semibold">
                            🔍 Review Before Clean
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          Python virtual environment
                        </div>
                      </div>
                      <span className="font-mono font-bold text-amber-300">5.6 GB</span>
                    </div>
                  </motion.div>
                )}

                {activeTab === "caches" && (
                  <motion.div
                    key="caches"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="space-y-2.5 text-xs font-sans"
                  >
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
                      <span className="text-slate-200 font-medium">npm Cache (%APPDATA%\npm-cache)</span>
                      <span className="text-emerald-400 font-bold font-mono">6.4 GB</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
                      <span className="text-slate-200 font-medium">Cargo Registry (%USERPROFILE%\.cargo)</span>
                      <span className="text-emerald-400 font-bold font-mono">4.2 GB</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
                      <span className="text-slate-200 font-medium">Gradle Build Caches (%USERPROFILE%\.gradle)</span>
                      <span className="text-emerald-400 font-bold font-mono">3.8 GB</span>
                    </div>
                  </motion.div>
                )}

                {activeTab === "trash" && (
                  <motion.div
                    key="trash"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="space-y-2.5 text-xs font-sans"
                  >
                    <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 backdrop-blur-md">
                      <div className="font-bold flex items-center gap-2">
                        <IconShieldCheck size={16} />
                        <span>30-Day Purgo Trash Retention</span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                        Items moved here retain their original path metadata for instant 1-click restore. Zero risk of accidental permanent data loss.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Interactive Simulation Action Button */}
            <button
              onClick={handleSimulateScan}
              disabled={isScanning}
              className={`w-full py-3 px-4 rounded-xl font-sans font-bold text-xs transition flex items-center justify-center gap-2 border shadow-lg backdrop-blur-md ${
                isCleaned
                  ? "bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                  : "bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.4)]"
              }`}
            >
              {isScanning ? (
                <>
                  <IconRefresh size={16} className="animate-spin" />
                  <span>Scanning Workspace Artifacts...</span>
                </>
              ) : isCleaned ? (
                <>
                  <IconCheck size={16} className="text-emerald-400" />
                  <span>Staged 28.4 GB to Purgo Trash — Click to Re-run</span>
                </>
              ) : (
                <>
                  <IconSparkles size={16} />
                  <span>Simulate Reclaiming 28.4 GB Disk Space</span>
                </>
              )}
            </button>
          </div>

          {/* Right Column: Glassmorphic App Launcher Deck */}
          <div className="lg:col-span-5 bg-[#0c1220]/45 rounded-2xl border border-white/10 p-5 flex flex-col justify-between space-y-5 backdrop-blur-xl shadow-inner">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 shadow-[0_0_20px_rgba(16,185,129,0.35)] backdrop-blur-md">
                  <IconDeviceDesktop size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base font-sans">
                    Purgo Desktop App
                  </h3>
                  <p className="text-xs text-slate-400 font-sans mt-0.5">
                    Windows 10 & 11 • Installer & Portable
                  </p>
                </div>
              </div>

              <p className="text-slate-300 text-xs font-sans leading-relaxed">
                Native Windows developer desktop utility. Scans filesystem, categorizes recreatable build artifacts, and cleans storage safely.
              </p>
            </div>

            {/* Metrics Checklist */}
            <div className="space-y-2 border-t border-white/10 pt-4">
              <div className="flex items-center gap-2 text-xs text-slate-300 font-sans">
                <IconCheck size={16} className="text-emerald-400 shrink-0" />
                <span>100% Non-Destructive (30-day Purgo Trash)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 font-sans">
                <IconCheck size={16} className="text-emerald-400 shrink-0" />
                <span>Detects 10+ Dev Tech Stacks & Caches</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 font-sans">
                <IconCheck size={16} className="text-emerald-400 shrink-0" />
                <span>Byte-for-byte MD5 Duplicate Finder & WinDirStat Map</span>
              </div>
            </div>

            {/* Download CTA Button */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={handleDownload}
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-sans font-black text-xs transition flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(16,185,129,0.35)]"
              >
                {downloading ? (
                  <IconCheck size={18} className="text-emerald-950 animate-pulse" />
                ) : (
                  <IconDownload size={18} className="text-emerald-950" />
                )}
                <span>
                  {downloading ? "Opening Release..." : "Download Purgo Desktop App"}
                </span>
              </button>

              <div className="text-[11px] text-slate-400 font-sans flex items-center justify-center gap-2 pt-1">
                <IconShieldCheck size={15} className="text-emerald-400 shrink-0" />
                <span>100% Free & Open Source (MIT)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
