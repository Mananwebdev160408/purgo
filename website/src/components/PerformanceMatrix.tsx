"use client";

import { IconCheck, IconX, IconShieldCheck, IconChartBar } from "@tabler/icons-react";

export default function PerformanceMatrix() {
  const FEATURES = [
    { name: "Single-Click Windows Debloater", purgo: true, stockWin: false, ccleaner: false },
    { name: "Automatic Windows Restore Point", purgo: true, stockWin: false, ccleaner: false },
    { name: "Diagnostic Telemetry & Tracking Shield", purgo: true, stockWin: false, ccleaner: false },
    { name: "Isolated Reversible Staging Trash", purgo: true, stockWin: false, ccleaner: false },
    { name: "Interactive Visual Storage Treemap", purgo: true, stockWin: false, ccleaner: false },
    { name: "Cryptographic MD5 Duplicate Hunter", purgo: true, stockWin: false, ccleaner: true },
    { name: "Developer Node_Modules & Target Purger", purgo: true, stockWin: false, ccleaner: false },
    { name: "100% Open Source & Zero Adware / Bundles", purgo: true, stockWin: false, ccleaner: false },
  ];

  return (
    <section
      id="benchmarks"
      className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28"
    >
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4">
          <IconChartBar size={16} />
          <span>Feature Comparison Matrix</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight font-display mb-4">
          Why Engineers Choose <span className="text-emerald-400">Purgo</span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg font-sans leading-relaxed">
          See how Purgo stacks up against native Windows and third-party legacy utility software.
        </p>
      </div>

      <div className="glass-panel rounded-3xl border border-white/10 p-6 sm:p-8 bg-[#0a0d16]/90 backdrop-blur-2xl shadow-2xl overflow-x-auto scrollbar-none">
        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-4 px-4 text-xs font-mono text-slate-400 uppercase tracking-wider">
                System Feature / Capability
              </th>
              <th className="py-4 px-4 text-center text-sm font-sans font-bold text-emerald-400 bg-emerald-500/10 rounded-t-xl border-t border-x border-emerald-500/30">
                <div className="flex items-center justify-center gap-1.5">
                  <IconShieldCheck size={18} />
                  <span>Purgo Desktop</span>
                </div>
              </th>
              <th className="py-4 px-4 text-center text-xs font-sans font-medium text-slate-400">
                Stock Windows 11
              </th>
              <th className="py-4 px-4 text-center text-xs font-sans font-medium text-slate-400">
                Generic System Cleaners
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-sans">
            {FEATURES.map((item, idx) => (
              <tr key={idx} className="hover:bg-white/[0.02] transition">
                <td className="py-4 px-4 text-xs sm:text-sm font-medium text-slate-200">
                  {item.name}
                </td>

                <td className="py-4 px-4 text-center bg-emerald-500/5 border-x border-emerald-500/20">
                  {item.purgo ? (
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto">
                      <IconCheck size={14} stroke={3} />
                    </span>
                  ) : (
                    <IconX size={16} className="text-slate-600 mx-auto" />
                  )}
                </td>

                <td className="py-4 px-4 text-center">
                  {item.stockWin ? (
                    <IconCheck size={16} className="text-emerald-400 mx-auto" />
                  ) : (
                    <IconX size={16} className="text-slate-600 mx-auto" />
                  )}
                </td>

                <td className="py-4 px-4 text-center">
                  {item.ccleaner ? (
                    <IconCheck size={16} className="text-emerald-400 mx-auto" />
                  ) : (
                    <IconX size={16} className="text-slate-600 mx-auto" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
