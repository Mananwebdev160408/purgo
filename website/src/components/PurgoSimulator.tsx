"use client";

import { useState } from "react";
import {
  IconSparkles,
  IconShieldCheck,
  IconCpu,
  IconTrash,
  IconBrandWindows,
  IconCheck,
  IconRefresh,
  IconActivity,
  IconArrowUpRight,
} from "@tabler/icons-react";

interface PurgoSimulatorProps {
  onToast?: (msg: string) => void;
}

interface DebloatOption {
  id: string;
  name: string;
  category: "Bloatware" | "Privacy" | "Cache" | "Dev";
  ramSavingsMB: number;
  diskSavingsMB: number;
  selected: boolean;
}

const INITIAL_OPTIONS: DebloatOption[] = [
  { id: "telemetry", name: "Disable Diagnostic Telemetry", category: "Privacy", ramSavingsMB: 420, diskSavingsMB: 1200, selected: true },
  { id: "xbox", name: "Purge Xbox Live & Overlay", category: "Bloatware", ramSavingsMB: 280, diskSavingsMB: 3400, selected: true },
  { id: "cortana", name: "Disable Cortana & Search Beacons", category: "Bloatware", ramSavingsMB: 350, diskSavingsMB: 1800, selected: true },
  { id: "onedrive", name: "Remove OneDrive Background Sync", category: "Bloatware", ramSavingsMB: 190, diskSavingsMB: 2100, selected: true },
  { id: "cache", name: "Flush System Temp & Prefetch Caches", category: "Cache", ramSavingsMB: 0, diskSavingsMB: 6800, selected: true },
  { id: "browser", name: "Purge Multi-Browser Junk Logs", category: "Cache", ramSavingsMB: 0, diskSavingsMB: 4200, selected: true },
  { id: "node_modules", name: "Clean Stale node_modules & Builds", category: "Dev", ramSavingsMB: 0, diskSavingsMB: 18500, selected: false },
  { id: "feedback", name: "Remove Feedback Hub & Diagnostic", category: "Privacy", ramSavingsMB: 110, diskSavingsMB: 850, selected: true },
];

export default function PurgoSimulator({ onToast }: PurgoSimulatorProps) {
  const [options, setOptions] = useState<DebloatOption[]>(INITIAL_OPTIONS);
  const [isSimulating, setIsSimulating] = useState(false);
  const [executed, setExecuted] = useState(false);

  const toggleOption = (id: string) => {
    setOptions((prev) =>
      prev.map((opt) => (opt.id === id ? { ...opt, selected: !opt.selected } : opt))
    );
  };

  const selectedCount = options.filter((o) => o.selected).length;
  const totalRamMB = options.filter((o) => o.selected).reduce((acc, curr) => acc + curr.ramSavingsMB, 0);
  const totalDiskMB = options.filter((o) => o.selected).reduce((acc, curr) => acc + curr.diskSavingsMB, 0);

  const totalRamGB = (totalRamMB / 1024).toFixed(2);
  const totalDiskGB = (totalDiskMB / 1024).toFixed(1);

  const handleSimulate = () => {
    setIsSimulating(true);
    if (onToast) onToast("Simulating Purgo Debloat Optimization...");

    setTimeout(() => {
      setIsSimulating(false);
      setExecuted(true);
      if (onToast) onToast(`Optimization Complete! Recovered ${totalRamGB} GB RAM & ${totalDiskGB} GB Disk space!`);
    }, 1800);
  };

  const handleReset = () => {
    setOptions(INITIAL_OPTIONS);
    setExecuted(false);
    if (onToast) onToast("Reset simulator settings");
  };

  return (
    <section
      id="simulator"
      className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28"
    >
      <div className="glass-panel rounded-3xl border border-white/10 border-t-white/20 p-6 sm:p-10 shadow-2xl bg-[#0e1320]/90 backdrop-blur-2xl relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[radial-gradient(circle,rgba(16,185,129,0.12),transparent_70%)] pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-2">
              <IconSparkles size={14} />
              <span>Interactive Debloat Simulator</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-display">
              Calculate Your System <span className="text-emerald-400">Resource Recovery</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-sans mt-1">
              Select debloat rules below to see immediate estimated RAM, CPU, and Disk space savings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 hover:bg-slate-800 text-slate-300 text-xs font-sans font-semibold transition flex items-center gap-2"
            >
              <IconRefresh size={15} />
              <span>Reset</span>
            </button>
            <button
              onClick={handleSimulate}
              disabled={isSimulating || selectedCount === 0}
              className={`px-5 py-2.5 rounded-xl font-sans text-xs font-bold transition flex items-center gap-2 shadow-lg ${
                isSimulating
                  ? "bg-emerald-500/50 text-slate-900 cursor-not-allowed"
                  : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/25"
              }`}
            >
              {isSimulating ? (
                <IconActivity size={16} className="animate-spin" />
              ) : (
                <IconShieldCheck size={16} />
              )}
              <span>{isSimulating ? "Running Clean..." : "Run Simulated Debloat"}</span>
            </button>
          </div>
        </div>

        {/* Real-time Dashboard Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#080a11]/80 border border-white/10 rounded-2xl p-5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-sans text-slate-400 font-medium">Memory Recovered</span>
              <IconCpu size={18} className="text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-black text-emerald-300">
              +{totalRamGB} <span className="text-xs font-sans text-slate-400 font-normal">GB RAM</span>
            </div>
            <div className="text-[11px] text-slate-500 font-mono mt-1">
              {totalRamMB} MB background footprint freed
            </div>
          </div>

          <div className="bg-[#080a11]/80 border border-white/10 rounded-2xl p-5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-sans text-slate-400 font-medium">Storage Reclaimed</span>
              <IconTrash size={18} className="text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-black text-emerald-300">
              +{totalDiskGB} <span className="text-xs font-sans text-slate-400 font-normal">GB Disk</span>
            </div>
            <div className="text-[11px] text-slate-500 font-mono mt-1">
              Junk, bloat & build cache space
            </div>
          </div>

          <div className="bg-[#080a11]/80 border border-white/10 rounded-2xl p-5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-sans text-slate-400 font-medium">Rules Active</span>
              <IconCheck size={18} className="text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-black text-white">
              {selectedCount} <span className="text-xs font-sans text-slate-400 font-normal">/ {options.length} Selected</span>
            </div>
            <div className="text-[11px] text-emerald-400/80 font-mono mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              100% System Restore Protected
            </div>
          </div>
        </div>

        {/* Options Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {options.map((opt) => (
            <div
              key={opt.id}
              onClick={() => toggleOption(opt.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                opt.selected
                  ? "bg-emerald-500/10 border-emerald-500/40 text-white"
                  : "bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.05]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                    opt.selected
                      ? "bg-emerald-500 border-emerald-400 text-slate-950"
                      : "border-slate-600 bg-slate-900"
                  }`}
                >
                  {opt.selected && <IconCheck size={14} stroke={3} />}
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-sans font-semibold text-slate-100 flex items-center gap-2">
                    <span>{opt.name}</span>
                    <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-900 text-slate-400 border border-white/10">
                      {opt.category}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                    {opt.ramSavingsMB > 0 && `RAM: ~${opt.ramSavingsMB}MB `}
                    {opt.diskSavingsMB > 0 && `Disk: ~${(opt.diskSavingsMB / 1024).toFixed(1)}GB`}
                  </div>
                </div>
              </div>

              <span className="text-xs font-mono text-emerald-400 font-bold shrink-0">
                +{((opt.ramSavingsMB + opt.diskSavingsMB) / 1024).toFixed(1)} GB
              </span>
            </div>
          ))}
        </div>

        {/* Execution Banner */}
        {executed && (
          <div className="mt-6 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-sans flex items-center justify-between backdrop-blur-md animate-fade-in">
            <div className="flex items-center gap-3">
              <IconShieldCheck size={22} className="text-emerald-400" />
              <span>Simulated debloat complete. Download Purgo Desktop app to run on your PC safely!</span>
            </div>
            <a
              href="https://github.com/Mananwebdev160408/debloater"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs font-sans hover:bg-emerald-400 transition flex items-center gap-1 shrink-0"
            >
              <span>Get App</span>
              <IconArrowUpRight size={14} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
