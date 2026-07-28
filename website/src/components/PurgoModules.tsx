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
  IconCpu,
  IconLayersSubtract,
} from "@tabler/icons-react";

interface PurgoModulesProps {
  onToast?: (msg: string) => void;
}

const MODULES = [
  {
    id: "artifacts",
    title: "Safe Build Artifacts",
    subtitle: "Recreatable Build Folder Discovery",
    icon: IconLayersSubtract,
    badge: "Safety Ratings Included",
    description:
      "Locate gigabytes of recreatable build folders (`node_modules`, `target/`, `dist/`, `.next/`, `venv`, `.gradle/`, `.dart_tool/`) across all scanned developer projects.",
    highlights: [
      "Automatically rates artifacts: Safe, Review, Caution",
      "Confirms folder is recreatable via standard package managers",
      "Calculates total recoverable storage before taking action",
      "Sends all clean actions directly to the 30-day Purgo Trash",
    ],
    stats: [
      { label: "Avg Space Recovered", value: "28.4 GB" },
      { label: "Supported Tech Stacks", value: "10+ Ecosystems" },
      { label: "Safety Confidence", value: "100% Reversible" },
    ],
  },
  {
    id: "caches",
    title: "Global Cache Manager",
    subtitle: "Toolchain & Package Cache Sanitization",
    icon: IconCpu,
    badge: "Global Toolchain Scan",
    description:
      "Clean global package manager and toolchain caches stored outside individual projects — npm, pnpm, yarn, Cargo (Rust), Gradle, Flutter Pub, Android Studio, and VS Code data.",
    highlights: [
      "Cleans `%APPDATA%\\npm-cache` & `%LOCALAPPDATA%\\pnpm\\store`",
      "Scrubs Cargo registry caches (`.cargo\\registry`) and Gradle caches",
      "Purges Pub cache and VS Code extension language server data",
      "Safe pattern checks ensure active project dependencies remain intact",
    ],
    stats: [
      { label: "Global Caches Cleaned", value: "12+ Tools" },
      { label: "Scan Time", value: "< 1.5s" },
      { label: "Safety Level", value: "Zero Local Code Wipes" },
    ],
  },
  {
    id: "analyzer",
    title: "WinDirStat Storage Map",
    subtitle: "Interactive Visual Treemap",
    icon: IconChartPie,
    badge: "Real-time Disk Map",
    description:
      "Analyze disk consumption with interactive visual color-coded block treemaps. Drill down from Drive → Project Group → Project → Folder to spot space hogs visually.",
    highlights: [
      "Color-coded file and folder size distribution matrix",
      "Deep nested directory exploration with immediate visual feedback",
      "Filters by file types (Archives, Virtual Envs, Build Binaries)",
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
    title: "Large Files & MD5 Duplicates",
    subtitle: "Byte-for-Byte Cryptographic Hashing",
    icon: IconFiles,
    badge: "MD5 Hashing Engine",
    description:
      "Identify duplicate files using exact cryptographic MD5 hash comparison rather than just file names. Easily isolate files larger than 100 MB, 500 MB, or 1 GB.",
    highlights: [
      "True cryptographic hash matching prevents false duplicate positives",
      "Fast multi-threaded file hashing for multi-terabyte drives",
      "Smart auto-select keeps the newest or original file safe",
      "Supports video, archive, ISO, and dataset scanning",
    ],
    stats: [
      { label: "Duplicate Accuracy", value: "100% MD5 Match" },
      { label: "Min Large File", value: "100 MB Threshold" },
      { label: "Scan Speed", value: "1.5 GB/s" },
    ],
  },
  {
    id: "git",
    title: "Git Repository Manager",
    subtitle: "Direct .git Metadata Parser",
    icon: IconBrandGit,
    badge: "No Git CLI Required",
    description:
      "Reads `.git/` metadata directly to list all discovered repositories with active branch, last commit date, remote URL, uncommitted changes indicator, and stale repo detection (>60 days inactive).",
    highlights: [
      "Parses `.git` directly without launching expensive `git` subprocesses",
      "Identifies stale repositories untouched for 60+ days",
      "Warns if uncommitted local changes exist before taking action",
      "Quick shortcut to open repository in Explorer or VS Code",
    ],
    stats: [
      { label: "Git Scan Speed", value: "Instant" },
      { label: "Stale Threshold", value: "60 Days" },
      { label: "Safety Alert", value: "Uncommitted Check" },
    ],
  },
  {
    id: "trash",
    title: "30-Day Purgo Trash",
    subtitle: "Isolated Recoverable Safety Net",
    icon: IconFolderOff,
    badge: "100% Reversible",
    description:
      "Items cleaned with Purgo are sent to an isolated Purgo Trash retention folder with full original path preservation. Restore any file with a single click.",
    highlights: [
      "Items are staged in Purgo Trash before permanent removal",
      "Single-click instant restoration back to original directory path",
      "Configurable retention period (e.g. 7 days, 30 days, or manual)",
      "Zero risk of accidental permanent data destruction",
    ],
    stats: [
      { label: "Recovery Speed", value: "< 1 Second" },
      { label: "Safety Guarantee", value: "100% Reversible" },
      { label: "Retention Window", value: "30 Days Default" },
    ],
  },
];

export default function PurgoModules({ onToast }: PurgoModulesProps) {
  const [activeTab, setActiveTab] = useState("artifacts");
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4 backdrop-blur-xl shadow-[0_0_15px_rgba(16,185,129,0.15)]">
          <IconDeviceDesktop size={15} />
          <span>Core Developer Architecture</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight font-display mb-4">
          Purpose-Built Tools for <br />
          <span className="text-emerald-400">Developer Disk Optimization</span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg font-sans leading-relaxed">
          Purgo is built specifically for software engineers to discover, analyze, and clean recreatable developer artifacts safely.
        </p>
      </div>

      {/* Glassmorphic Tabs Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8 px-2">
        {MODULES.map((mod) => {
          const Icon = mod.icon;
          const isActive = activeTab === mod.id;
          return (
            <button
              key={mod.id}
              onClick={() => handleTabChange(mod.id)}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl font-sans text-xs sm:text-sm font-semibold transition-all whitespace-nowrap border shrink-0 backdrop-blur-xl ${
                isActive
                  ? "bg-emerald-500/25 text-emerald-300 border-emerald-500/50 shadow-[0_0_25px_rgba(16,185,129,0.3)]"
                  : "bg-[#0e1424]/40 text-slate-400 border-white/10 hover:text-slate-200 hover:bg-emerald-500/10 hover:border-emerald-500/30"
              }`}
            >
              <Icon size={18} className={isActive ? "text-emerald-400" : "text-slate-400"} />
              <span>{mod.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Glassmorphic Showcase Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeModule.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="shredded-glass-panel rounded-3xl p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Module Information */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-semibold backdrop-blur-md">
                  {activeModule.badge}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Module ID: {activeModule.id}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans flex items-center gap-3 mb-2">
                  <span>{activeModule.title}</span>
                </h3>
                <p className="text-sm font-mono text-emerald-400 mb-4">
                  {activeModule.subtitle}
                </p>
                <p className="text-slate-300 text-sm sm:text-base font-sans leading-relaxed">
                  {activeModule.description}
                </p>
              </div>

              {/* Highlights List */}
              <div className="space-y-2.5 pt-2">
                {activeModule.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-slate-200 font-sans">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                      <IconCheck size={13} stroke={2.5} />
                    </div>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Module Translucent Specs Card */}
            <div className="lg:col-span-5 bg-[#060912]/45 border border-white/10 rounded-2xl p-6 space-y-4 backdrop-blur-xl shadow-inner">
              <div className="text-xs font-mono text-slate-400 border-b border-white/10 pb-3 flex items-center justify-between">
                <span>MODULE SPECIFICATIONS</span>
                <span className="text-emerald-400 font-bold">ACTIVE</span>
              </div>

              <div className="space-y-3">
                {activeModule.stats.map((s, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
                    <span className="text-xs text-slate-300 font-sans font-medium">{s.label}</span>
                    <span className="text-sm font-mono font-bold text-emerald-400">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
