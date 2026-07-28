"use client";

import { IconCheck, IconX, IconShieldCheck } from "@tabler/icons-react";

export default function PerformanceMatrix() {
  const COMPARISONS = [
    {
      feature: "Developer Ecosystem Intelligence (10+ Stacks)",
      purgo: true,
      manual: false,
      generic: false,
    },
    {
      feature: "Recreatable Build Folder Detection (node_modules, target/, venv)",
      purgo: true,
      manual: false,
      generic: false,
    },
    {
      feature: "Safety Ratings (Safe / Review / Caution)",
      purgo: true,
      manual: false,
      generic: false,
    },
    {
      feature: "30-Day Recoverable Purgo Trash (1-Click Restore)",
      purgo: true,
      manual: false,
      generic: false,
    },
    {
      feature: "Global Toolchain Cache Cleaning (npm, Cargo, Gradle, Pub)",
      purgo: true,
      manual: false,
      generic: false,
    },
    {
      feature: "WinDirStat-Style Visual Storage Treemap",
      purgo: true,
      manual: false,
      generic: true,
    },
    {
      feature: "Byte-for-Byte MD5 Duplicate Detector",
      purgo: true,
      manual: false,
      generic: false,
    },
    {
      feature: "Stale Git Repo Manager (>60 Days Inactive)",
      purgo: true,
      manual: false,
      generic: false,
    },
  ];

  return (
    <section
      id="benchmarks"
      className="relative px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-28"
    >
      <div className="shredded-glass-panel rounded-3xl p-6 sm:p-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4 backdrop-blur-xl shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <IconShieldCheck size={15} />
            <span>Developer Comparison</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display mb-3">
            Why Developers Choose <span className="text-emerald-400">Purgo</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-sans leading-relaxed">
            Unlike dangerous manual terminal commands or blind generic scrubbers, Purgo understands developer projects and protects your code.
          </p>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto scrollbar-none">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-white/10 text-xs font-mono text-slate-400">
                <th className="pb-4 font-semibold text-slate-200">FEATURE / CAPABILITY</th>
                <th className="pb-4 font-bold text-emerald-400 text-center bg-emerald-500/15 rounded-t-xl px-4 py-2 border-t border-x border-emerald-500/40 backdrop-blur-md">
                  Purgo
                </th>
                <th className="pb-4 font-semibold text-center px-4">Manual Terminal (`rm -rf`)</th>
                <th className="pb-4 font-semibold text-center px-4">Generic Disk Cleaners</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs sm:text-sm font-sans">
              {COMPARISONS.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.03] transition backdrop-blur-md">
                  <td className="py-3.5 pr-4 text-slate-200 font-medium">{row.feature}</td>

                  {/* Purgo Column */}
                  <td className="py-3.5 text-center bg-emerald-500/10 border-x border-emerald-500/20 font-bold backdrop-blur-md">
                    {row.purgo ? (
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                        <IconCheck size={15} stroke={3} />
                      </div>
                    ) : (
                      <IconX size={16} className="text-slate-600 mx-auto" />
                    )}
                  </td>

                  {/* Manual rm -rf Column */}
                  <td className="py-3.5 text-center text-slate-400">
                    {row.manual ? (
                      <IconCheck size={16} className="text-slate-300 mx-auto" />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 flex items-center justify-center mx-auto">
                        <IconX size={13} stroke={2.5} />
                      </div>
                    )}
                  </td>

                  {/* Generic Cleaners Column */}
                  <td className="py-3.5 text-center text-slate-400">
                    {row.generic ? (
                      <IconCheck size={16} className="text-slate-300 mx-auto" />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-slate-800/60 text-slate-500 flex items-center justify-center mx-auto">
                        <IconX size={13} stroke={2.5} />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
