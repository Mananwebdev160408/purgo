'use client';

import { useState } from 'react';
import {
  IconTrash,
  IconShieldCheck,
  IconCpu,
  IconCheck,
  IconPlayerPlay,
  IconRefresh,
  IconSparkles,
  IconActivity,
  IconBrandWindows,
  IconAlertCircle,
} from '@tabler/icons-react';

interface SimulatorProps {
  onToast: (msg: string) => void;
}

interface BloatItem {
  id: string;
  name: string;
  category: 'App' | 'Telemetry' | 'Service' | 'Cache';
  ramMb: number;
  diskMb: number;
  enabled: boolean;
  risk: 'Safe' | 'Recommended';
  description: string;
}

export default function Simulator({ onToast }: SimulatorProps) {
  const [bloatItems, setBloatItems] = useState<BloatItem[]>([
    {
      id: 'xbox',
      name: 'Xbox Live & Game DVR',
      category: 'App',
      ramMb: 350,
      diskMb: 1200,
      enabled: true,
      risk: 'Recommended',
      description: 'Background game broadcasting, overlay services & Xbox app telemetry.',
    },
    {
      id: 'onedrive',
      name: 'OneDrive Background Sync',
      category: 'Service',
      ramMb: 220,
      diskMb: 850,
      enabled: true,
      risk: 'Safe',
      description: 'Cloud synchronization daemons, background telemetry & auto-updater.',
    },
    {
      id: 'telemetry',
      name: 'Diagnostic Tracking (DiagTrack)',
      category: 'Telemetry',
      ramMb: 180,
      diskMb: 450,
      enabled: true,
      risk: 'Recommended',
      description: 'Windows customer experience improvement, keylogging telemetry & error reports.',
    },
    {
      id: 'cortana',
      name: 'Cortana & Speech Services',
      category: 'Service',
      ramMb: 140,
      diskMb: 300,
      enabled: true,
      risk: 'Safe',
      description: 'Voice recognition listener, background indexing & web search hooks.',
    },
    {
      id: 'widgets',
      name: 'News, Weather & Feeds Widget',
      category: 'App',
      ramMb: 110,
      diskMb: 250,
      enabled: true,
      risk: 'Safe',
      description: 'Taskbar web widgets, Bing ad trackers & feed updates.',
    },
    {
      id: 'edge_bg',
      name: 'Edge Prelaunch & Auto-Update',
      category: 'Service',
      ramMb: 95,
      diskMb: 400,
      enabled: true,
      risk: 'Safe',
      description: 'Background Edge process pre-loading and telemetry beacons.',
    },
    {
      id: 'temp_cache',
      name: 'Windows Update & Temp Cache',
      category: 'Cache',
      ramMb: 0,
      diskMb: 2400,
      enabled: true,
      risk: 'Safe',
      description: 'Stale installer packages, prefetch files & update logs.',
    },
  ]);

  const [isExecuting, setIsExecuting] = useState(false);
  const [consoleLog, setConsoleLog] = useState<string[]>([
    '⚡ Purgo Sandbox Initialized. Select bloatware targets above.',
  ]);

  const toggleItem = (id: string) => {
    setBloatItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.enabled;
          onToast(`${item.name} ${nextState ? 'queued for removal' : 'kept'}`);
          return { ...item, enabled: nextState };
        }
        return item;
      })
    );
  };

  const selectAll = (enable: boolean) => {
    setBloatItems((prev) => prev.map((item) => ({ ...item, enabled: enable })));
    onToast(enable ? 'All bloatware items selected' : 'Deselected all items');
  };

  const selectedItems = bloatItems.filter((i) => i.enabled);
  const totalRamFreed = selectedItems.reduce((acc, i) => acc + i.ramMb, 0);
  const totalDiskFreedMb = selectedItems.reduce((acc, i) => acc + i.diskMb, 0);
  const totalDiskFreedGb = (totalDiskFreedMb / 1024).toFixed(2);
  const privacyScore = Math.min(
    45 + Math.round((selectedItems.length / bloatItems.length) * 54),
    99
  );

  const runDebloatSimulation = () => {
    setIsExecuting(true);
    setConsoleLog([
      '🚀 Starting Purgo Debloat Dry-Run Process...',
      '🛡️ Creating System Restore Point "Purgo_Safety_Backup"... [OK]',
    ]);

    let step = 0;
    const interval = setInterval(() => {
      if (step < selectedItems.length) {
        const item = selectedItems[step];
        setConsoleLog((prev) => [
          ...prev,
          `✔ Removed [${item.category}] ${item.name} (-${item.ramMb}MB RAM, -${item.diskMb}MB Disk)`,
        ]);
        step++;
      } else {
        clearInterval(interval);
        setConsoleLog((prev) => [
          ...prev,
          `🎉 Cleanup Complete! Freed ${totalRamFreed} MB RAM and ${totalDiskFreedGb} GB Disk Space. Privacy Score: ${privacyScore}%.`,
        ]);
        setIsExecuting(false);
        onToast(`Cleanup finished! Freed ${totalDiskFreedGb} GB space.`);
      }
    }, 450);
  };

  return (
    <section id="simulator" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-3">
          <IconSparkles size={14} />
          <span>Interactive Sandbox</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display mb-3">
          Simulate Your System <span className="text-emerald-400">Optimization</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto font-sans">
          Toggle pre-installed bloatware packages below to see live estimated RAM, storage, and privacy score gains.
        </p>
      </div>

      {/* Main Glassmorphic Simulator Container */}
      <div className="glass-panel rounded-2xl border border-white/10 border-t-white/20 p-5 sm:p-8 shadow-2xl">
        {/* Top Metric Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#080a11]/80 border border-white/10 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <IconCpu size={20} />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-sans">RAM Reclaimed</div>
              <div className="text-lg sm:text-xl font-bold font-mono text-white">
                +{totalRamFreed} <span className="text-emerald-400 text-xs">MB</span>
              </div>
            </div>
          </div>

          <div className="bg-[#080a11]/80 border border-white/10 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <IconTrash size={20} />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-sans">Storage Freed</div>
              <div className="text-lg sm:text-xl font-bold font-mono text-white">
                +{totalDiskFreedGb} <span className="text-emerald-400 text-xs">GB</span>
              </div>
            </div>
          </div>

          <div className="bg-[#080a11]/80 border border-white/10 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <IconShieldCheck size={20} />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-sans">Privacy Score</div>
              <div className="text-lg sm:text-xl font-bold font-mono text-emerald-400">
                {privacyScore}% <span className="text-slate-400 text-xs font-sans">Shielded</span>
              </div>
            </div>
          </div>

          <div className="bg-[#080a11]/80 border border-white/10 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <IconActivity size={20} />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-sans">Safety Backup</div>
              <div className="text-xs font-bold text-emerald-300 font-mono flex items-center gap-1 mt-1">
                <IconCheck size={14} className="text-emerald-400" />
                <span>Auto Restore Point</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Interactive Packages List */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Select Targets ({selectedItems.length}/{bloatItems.length})
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => selectAll(true)}
                  className="text-xs font-sans text-emerald-400 hover:text-emerald-300 transition underline"
                >
                  Select All
                </button>
                <span className="text-slate-600">|</span>
                <button
                  onClick={() => selectAll(false)}
                  className="text-xs font-sans text-slate-400 hover:text-slate-200 transition"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {bloatItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`p-3.5 rounded-xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                    item.enabled
                      ? 'bg-emerald-500/10 border-emerald-500/40 hover:bg-emerald-500/15'
                      : 'bg-[#080a11]/60 border-white/5 hover:border-white/15 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center border transition ${
                        item.enabled
                          ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                          : 'border-slate-600 bg-slate-900'
                      }`}
                    >
                      {item.enabled && <IconCheck size={14} stroke={3} />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white font-sans">{item.name}</span>
                        <span className="px-1.5 py-0.2 text-[10px] font-mono rounded bg-slate-900 text-slate-300 border border-white/10">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1">{item.description}</p>
                    </div>
                  </div>

                  <div className="text-right font-mono text-xs shrink-0">
                    <div className="text-emerald-400 font-bold">
                      {item.ramMb > 0 ? `-${item.ramMb} MB RAM` : 'Cache Clean'}
                    </div>
                    <div className="text-slate-400 text-[11px]">-{item.diskMb} MB Storage</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Simulated PowerShell Output */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <IconBrandWindows size={14} className="text-emerald-400" />
                Live PowerShell Engine Output
              </span>
              <span className="text-[11px] font-mono text-emerald-400/80">Dry-Run Safe</span>
            </div>

            <div className="flex-1 bg-[#05070d] border border-white/10 rounded-xl p-4 font-mono text-xs text-slate-300 flex flex-col justify-between min-h-[300px]">
              <div className="space-y-2 overflow-y-auto max-h-[280px]">
                {consoleLog.map((log, idx) => (
                  <div
                    key={idx}
                    className={`leading-relaxed ${
                      log.startsWith('✔')
                        ? 'text-emerald-400'
                        : log.startsWith('🎉')
                        ? 'text-emerald-300 font-bold bg-emerald-500/10 p-2 rounded border border-emerald-500/30'
                        : 'text-slate-300'
                    }`}
                  >
                    {log}
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 mt-4">
                <button
                  onClick={runDebloatSimulation}
                  disabled={isExecuting || selectedItems.length === 0}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-sans font-bold text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <IconPlayerPlay size={15} />
                  <span>{isExecuting ? 'Cleaning System...' : 'Run Debloat Simulation'}</span>
                </button>

                <button
                  onClick={() => {
                    setConsoleLog(['⚡ Console reset. Safe dry-run ready.']);
                    onToast('Console reset');
                  }}
                  className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-400 hover:text-slate-200 transition"
                  title="Reset Console"
                >
                  <IconRefresh size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
