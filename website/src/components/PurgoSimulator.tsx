"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconSparkles,
  IconFolder,
  IconCheck,
  IconTrash,
  IconRefresh,
  IconShieldCheck,
  IconLayersSubtract,
  IconFolderOff,
  IconArrowRight,
} from "@tabler/icons-react";

interface PurgoSimulatorProps {
  onToast: (msg: string) => void;
}

interface SimulatedArtifact {
  id: string;
  project: string;
  path: string;
  ecosystem: string;
  sizeGB: number;
  safety: "Safe" | "Review" | "Caution";
  recreatableWith: string;
  selected: boolean;
  cleaned: boolean;
}

const INITIAL_ARTIFACTS: SimulatedArtifact[] = [
  {
    id: "1",
    project: "nextjs-dashboard-web",
    path: "C:\\projects\\nextjs-dashboard-web\\node_modules",
    ecosystem: "Node.js (npm)",
    sizeGB: 14.2,
    safety: "Safe",
    recreatableWith: "npm install",
    selected: true,
    cleaned: false,
  },
  {
    id: "2",
    project: "rust-game-engine",
    path: "C:\\projects\\rust-game-engine\\target",
    ecosystem: "Rust (Cargo)",
    sizeGB: 8.6,
    safety: "Safe",
    recreatableWith: "cargo build",
    selected: true,
    cleaned: false,
  },
  {
    id: "3",
    project: "python-ml-pipeline",
    path: "C:\\projects\\python-ml-pipeline\\.venv",
    ecosystem: "Python (venv)",
    sizeGB: 5.6,
    safety: "Review",
    recreatableWith: "pip install -r requirements.txt",
    selected: false,
    cleaned: false,
  },
  {
    id: "4",
    project: "flutter-mobile-app",
    path: "C:\\projects\\flutter-mobile-app\\.dart_tool",
    ecosystem: "Flutter / Dart",
    sizeGB: 3.4,
    safety: "Safe",
    recreatableWith: "flutter pub get",
    selected: true,
    cleaned: false,
  },
  {
    id: "5",
    project: "global-toolchain-caches",
    path: "%APPDATA%\\npm-cache",
    ecosystem: "Global npm Cache",
    sizeGB: 6.4,
    safety: "Safe",
    recreatableWith: "Automatic background refetch",
    selected: true,
    cleaned: false,
  },
];

export default function PurgoSimulator({ onToast }: PurgoSimulatorProps) {
  const [artifacts, setArtifacts] = useState<SimulatedArtifact[]>(INITIAL_ARTIFACTS);
  const [isCleaning, setIsCleaning] = useState(false);

  const toggleSelect = (id: string) => {
    setArtifacts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const selectedSize = artifacts
    .filter((a) => a.selected && !a.cleaned)
    .reduce((sum, a) => sum + a.sizeGB, 0);

  const cleanedSize = artifacts
    .filter((a) => a.cleaned)
    .reduce((sum, a) => sum + a.sizeGB, 0);

  const handleSimulateClean = () => {
    const toClean = artifacts.filter((a) => a.selected && !a.cleaned);
    if (toClean.length === 0) {
      onToast("Select at least one build artifact to simulate clean!");
      return;
    }

    setIsCleaning(true);
    onToast(`Staging ${toClean.length} artifacts (${selectedSize.toFixed(1)} GB) to Purgo Trash...`);

    setTimeout(() => {
      setArtifacts((prev) =>
        prev.map((item) =>
          item.selected ? { ...item, cleaned: true, selected: false } : item
        )
      );
      setIsCleaning(false);
      onToast(`Staged ${toClean.length} artifacts to Purgo Trash! All items recoverable for 30 days.`);
    }, 1500);
  };

  const handleRestoreAll = () => {
    setArtifacts(INITIAL_ARTIFACTS);
    onToast("Restored all simulated artifacts from Purgo Trash.");
  };

  return (
    <section
      id="simulator"
      className="relative px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-28"
    >
      <div className="shredded-glass-panel rounded-3xl p-6 sm:p-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4 backdrop-blur-xl shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <IconSparkles size={15} />
            <span>Interactive Developer Sandbox</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display mb-3">
            Simulate <span className="text-emerald-400">Purgo Developer Scanner</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-sans leading-relaxed">
            Test how Purgo categorizes recreatable build folders across your workspace and stages them safely in 30-day recoverable Purgo Trash.
          </p>
        </div>

        {/* Dashboard Simulation Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#060912]/40 p-4 rounded-2xl border border-white/10 backdrop-blur-xl flex items-center justify-between shadow-inner">
            <div>
              <span className="text-xs text-slate-300 block font-sans">Selected to Clean</span>
              <span className="text-xl font-bold font-mono text-emerald-400">
                {selectedSize.toFixed(1)} GB
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
              <IconLayersSubtract size={20} />
            </div>
          </div>

          <div className="bg-[#060912]/40 p-4 rounded-2xl border border-white/10 backdrop-blur-xl flex items-center justify-between shadow-inner">
            <div>
              <span className="text-xs text-slate-300 block font-sans">Staged in Purgo Trash</span>
              <span className="text-xl font-bold font-mono text-emerald-300">
                {cleanedSize.toFixed(1)} GB
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
              <IconFolderOff size={20} />
            </div>
          </div>

          <div className="bg-[#060912]/40 p-4 rounded-2xl border border-white/10 backdrop-blur-xl flex items-center justify-between shadow-inner">
            <div>
              <span className="text-xs text-slate-300 block font-sans">Purgo Trash Status</span>
              <span className="text-xs font-bold font-sans text-emerald-400 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 inline-block mt-1">
                100% Reversible
              </span>
            </div>
            {cleanedSize > 0 && (
              <button
                onClick={handleRestoreAll}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-mono transition flex items-center gap-1 border border-white/15 backdrop-blur-md"
              >
                <IconRefresh size={14} />
                <span>Restore All</span>
              </button>
            )}
          </div>
        </div>

        {/* Artifact List Grid */}
        <div className="space-y-3 mb-8">
          {artifacts.map((item) => (
            <div
              key={item.id}
              onClick={() => !item.cleaned && toggleSelect(item.id)}
              className={`p-4 rounded-2xl border transition cursor-pointer flex flex-wrap items-center justify-between gap-4 backdrop-blur-xl ${
                item.cleaned
                  ? "bg-slate-900/30 border-white/5 opacity-50 cursor-not-allowed"
                  : item.selected
                  ? "bg-emerald-500/15 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                  : "bg-[#060a14]/40 border-white/10 hover:border-emerald-500/30 hover:bg-emerald-500/[0.05]"
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-[240px]">
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition ${
                    item.cleaned
                      ? "bg-slate-700 border-slate-600 text-slate-400"
                      : item.selected
                      ? "bg-emerald-500 border-emerald-400 text-slate-950 shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                      : "border-slate-500 bg-transparent"
                  }`}
                >
                  {(item.selected || item.cleaned) && <IconCheck size={14} stroke={3} />}
                </div>

                <div>
                  <div className="font-bold text-white text-sm font-sans flex items-center gap-2">
                    <span>{item.path}</span>
                  </div>
                  <div className="text-xs text-slate-400 font-sans mt-0.5 flex items-center gap-2">
                    <span>{item.ecosystem}</span>
                    <span>•</span>
                    <span className="text-slate-300 font-mono">Recreatable via {item.recreatableWith}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full border backdrop-blur-md ${
                    item.safety === "Safe"
                      ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                      : "bg-amber-500/15 text-amber-300 border-amber-500/30"
                  }`}
                >
                  {item.safety === "Safe" ? "✅ Safe" : "🔍 Review"}
                </span>

                <span className="font-mono font-bold text-sm text-white min-w-[65px] text-right">
                  {item.cleaned ? "Staged" : `${item.sizeGB.toFixed(1)} GB`}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
          <div className="text-xs text-slate-300 font-sans flex items-center gap-2">
            <IconShieldCheck size={16} className="text-emerald-400 shrink-0" />
            <span>Cleaned items are moved to Purgo Trash (30-day retention with 1-click restore)</span>
          </div>

          <button
            onClick={handleSimulateClean}
            disabled={isCleaning}
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-sans font-black text-xs transition flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] backdrop-blur-md"
          >
            {isCleaning ? (
              <>
                <IconRefresh size={16} className="animate-spin" />
                <span>Staging to Trash...</span>
              </>
            ) : (
              <>
                <IconTrash size={16} />
                <span>Simulate Staging Selected Artifacts ({selectedSize.toFixed(1)} GB)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
