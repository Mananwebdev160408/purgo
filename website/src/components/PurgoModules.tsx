"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconShieldCheck,
  IconTrash,
  IconChartPie,
  IconFiles,
  IconFolderOff,
  IconBrandGit,
  IconCheck,
  IconDeviceDesktop,
  IconLock,
} from "@tabler/icons-react";

interface PurgoModulesProps {
  onToast?: (msg: string) => void;
}

const MODULES = [
  {
    id: "debloat",
    title: "Windows Debloater",
    subtitle: "Safe Bloatware & Telemetry Purge",
    icon: IconShieldCheck,
    badge: "System Safety First",
    description:
      "Strip pre-installed Windows apps (Xbox, Cortana, Bing News, Feedback Hub) and disable intrusive diagnostic telemetry with automatic System Restore point creation before any action.",
    highlights: [
      "Disables Windows Diagnostic & Telemetry Beacons",
      "Removes default bloatware apps cleanly without broken dependencies",
      "Automatic Windows Restore Point created prior to execution",
      "One-click restoration of native Windows packages if needed",
    ],
    stats: [
      { label: "RAM Recovered", value: "up to 1.8 GB" },
      { label: "Background Tasks", value: "-34 Services" },
      { label: "Privacy Rating", value: "100% Shielded" },
    ],
  },
  {
    id: "cache",
    title: "Junk & Cache Purge",
    subtitle: "Deep System & Browser Sanitization",
    icon: IconTrash,
    badge: "Smart Deep Scanning",
    description:
      "Locate and purge hidden system logs, prefetch caches, Windows Update residue, and multi-browser temporary files across Chrome, Edge, and Firefox.",
    highlights: [
      "Cleans Windows Temp, Prefetch & System Crash Dumps",
      "Scrubs Chrome, Edge, Firefox browser caches & cookies",
      "Removes obsolete Windows Update download packages",
      "Safe pattern recognition prevents accidental file loss",
    ],
    stats: [
      { label: "Avg Storage Freed", value: "8.5 GB" },
      { label: "Scan Time", value: "< 1.2s" },
      { label: "Safety Level", value: "Zero Critical Files" },
    ],
  },
  {
    id: "storage",
    title: "Storage Visualizer",
    subtitle: "Interactive Disk Space Treemap",
    icon: IconChartPie,
    badge: "Real-time Disk Map",
    description:
      "Analyze disk consumption with interactive visual color-coded block treemaps. Drill down into deep directory structures to instantly spot space hogs.",
    highlights: [
      "Color-coded file and folder size distribution matrix",
      "Deep nested directory exploration with immediate visual feedback",
      "Filters by file types (Videos, Archives, System Logs)",
      "Instant delete or quarantine directly from the visualizer",
    ],
    stats: [
      { label: "Depth Analysis", value: "100% Tree Map" },
      { label: "UI Response", value: "60 FPS Render" },
      { label: "Disk Support", value: "NTFS & FAT32" },
    ],
  },
  {
    id: "duplicates",
    title: "Duplicate & Large File Hunter",
    subtitle: "Byte-for-Byte MD5 Checksum Hunter",
    icon: IconFiles,
    badge: "MD5 Hashing Engine",
    description:
      "Identify duplicate files using exact cryptographic MD5 hash comparison rather than just file names. Easily isolate files larger than 100MB.",
    highlights: [
      "True cryptographic hash matching prevents false duplicate positives",
      "Fast multi-threaded file hashing for multi-terabyte drives",
      "Smart auto-select keeps the newest or original file safe",
      "Supports video, audio, archive, and document scanning",
    ],
    stats: [
      { label: "Duplicate Accuracy", value: "100% MD5 Match" },
      { label: "Min Large File", value: "100 MB Threshold" },
      { label: "Scan Speed", value: "1.5 GB/s" },
    ],
  },
  {
    id: "trash",
    title: "Purgo Vault & Safety Trash",
    subtitle: "Isolated Reversible Quarantine",
    icon: IconFolderOff,
    badge: "Fail-Safe Recovery",
    description:
      "Items purged with Purgo are sent to an isolated, encrypted staging quarantine first. If you need a file back, restore it instantly with a single click.",
    highlights: [
      "Files are safely staged in quarantine before final permanent removal",
      "Single-click instant restoration back to original file path",
      "Configurable auto-purge threshold (e.g. 7 days or 30 days)",
      "Zero risk of accidental permanent data destruction",
    ],
    stats: [
      { label: "Recovery Time", value: "< 1 Second" },
      { label: "Safety Margin", value: "100% Reversible" },
      { label: "Vault Encryption", value: "Isolated Space" },
    ],
  },
  {
    id: "developer",
    title: "Developer Clean Mode",
    subtitle: "Node_Modules & Target Purger",
    icon: IconBrandGit,
    badge: "Built for Engineers",
    description:
      "Reclaim tens of gigabytes of disk space wasted by abandoned node_modules, Rust target directories, .git object caches, and build artifacts.",
    highlights: [
      "Deep recursive scan for node_modules & build directories",
      "Identifies uncommitted git repository changes before cleaning",
      "Clean stale Docker images and local cache builds",
      "Massive time saver for web and full-stack software developers",
    ],
    stats: [
      { label: "Dev Space Saved", value: "25+ GB Avg" },
      { label: "Frameworks", value: "Node, Rust, Python" },
      { label: "Git Safety Check", value: "Active Warning" },
    ],
  },
];

export default function PurgoModules({ onToast }: PurgoModulesProps) {
  const [activeTab, setActiveTab] = useState("debloat");
  const activeModule = MODULES.find((m) => m.id === activeTab) || MODULES[0];

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    if (onToast) {
      const mod = MODULES.find((m) => m.id === id);
      if (mod) onToast(`Selected ${mod.title} view`);
    }
  };

  return (
    <section
      id="modules"
      className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4">
          <IconDeviceDesktop size={15} />
          <span>Core System Architecture</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight font-display mb-4">
          Purpose-Built Tools for <br />
          <span className="text-emerald-400">Peak Windows Performance</span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg font-sans leading-relaxed">
          Purgo is built from the ground up to replace fragmented cleanup tools with a single unified, secure, open-source utility suite.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
        {MODULES.map((mod) => {
          const Icon = mod.icon;
          const isActive = activeTab === mod.id;
          return (
            <button
              key={mod.id}
              onClick={() => handleTabChange(mod.id)}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl font-sans text-xs sm:text-sm font-semibold transition-all whitespace-nowrap border shrink-0 ${
                isActive
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                  : "bg-[#0e1320]/60 text-slate-400 border-white/5 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              <Icon size={18} className={isActive ? "text-emerald-400" : "text-slate-400"} />
              <span>{mod.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Showcase Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeModule.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="glass-panel rounded-3xl border border-white/10 border-t-white/20 p-6 sm:p-10 shadow-2xl relative overflow-hidden bg-[#0a0d16]/90 backdrop-blur-2xl"
        >
          {/* Subtle Ambient Radial Backdrop */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(16,185,129,0.1),transparent_70%)] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 shadow-lg shadow-emerald-500/10">
                  <activeModule.icon size={26} />
                </div>
                <div>
                  <span className="px-2.5 py-1 text-[11px] font-mono rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {activeModule.badge}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-sans mt-1">
                    {activeModule.title}
                  </h3>
                </div>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
                {activeModule.description}
              </p>

              {/* Bullet Highlights */}
              <div className="space-y-3 pt-2">
                {activeModule.highlights.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200 font-sans">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/40">
                      <IconCheck size={13} stroke={2.5} />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Metrics & Graphical Card */}
            <div className="lg:col-span-5 bg-[#080a11]/90 rounded-2xl border border-white/10 p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
                  <IconLock size={14} className="text-emerald-400" /> Live Benchmark Metrics
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <div className="grid grid-cols-1 gap-4">
                {activeModule.stats.map((stat, idx) => (
                  <div key={idx} className="bg-white/[0.03] border border-white/5 rounded-xl p-4 flex items-center justify-between">
                    <span className="text-xs font-sans text-slate-400 font-medium">
                      {stat.label}
                    </span>
                    <span className="text-sm font-mono font-bold text-emerald-300">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
                <IconShieldCheck size={22} className="text-emerald-400 shrink-0" />
                <div className="text-xs text-slate-300 font-sans">
                  <strong className="text-white block font-semibold">100% Reversible Execution</strong>
                  Protected by Purgo System Restore safeguards.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
