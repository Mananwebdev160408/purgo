export default function ComparisonMatrix() {
  return (
    <section id="matrix" className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white tracking-tight mb-3 font-display">
          Feature Comparison & <span className="text-emerald-400">Benchmarks</span>
        </h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto font-sans">
          Comparison between Purgo open-source debloater and generic system maintenance software.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#1e2638]/50 bg-[#0b0e17]/30 backdrop-blur-md">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-[#0e121e]/40 border-b border-[#1e2638]/50 text-slate-300 font-mono">
            <tr>
              <th className="p-4 font-sans">Feature</th>
              <th className="p-4 text-emerald-400 bg-emerald-950/30 border-x border-emerald-500/30 font-bold">Purgo</th>
              <th className="p-4 text-slate-400 font-sans">Default Windows 11</th>
              <th className="p-4 text-slate-400 font-sans">Legacy Cleaners (CCleaner)</th>
              <th className="p-4 text-slate-400 font-sans">Random PS Scripts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e2638] text-slate-300 font-mono">
            <tr>
              <td className="p-4 font-semibold text-white font-sans">System Restore Backup</td>
              <td className="p-4 text-emerald-300 bg-emerald-950/20 border-x border-emerald-500/20 font-bold">✔ Automated Checkpoint</td>
              <td className="p-4 text-slate-400">Manual Only</td>
              <td className="p-4 text-amber-400">Prompt Only</td>
              <td className="p-4 text-rose-400">❌ Rare / Risky</td>
            </tr>
            <tr>
              <td className="p-4 font-semibold text-white font-sans">Diagnostic Telemetry Shield</td>
              <td className="p-4 text-emerald-300 bg-emerald-950/20 border-x border-emerald-500/20 font-bold">✔ Deep DiagTrack Block</td>
              <td className="p-4 text-rose-400">❌ Always On</td>
              <td className="p-4 text-rose-400">❌ Contains Ad Telemetry</td>
              <td className="p-4 text-amber-400">Partial</td>
            </tr>
            <tr>
              <td className="p-4 font-semibold text-white font-sans">Adware & Bundleware</td>
              <td className="p-4 text-emerald-400 bg-emerald-950/20 border-x border-emerald-500/20 font-bold">0% Adware (Clean)</td>
              <td className="p-4 text-slate-400">N/A</td>
              <td className="p-4 text-rose-400">❌ Contains Bundled Software</td>
              <td className="p-4 text-emerald-400">✔ Clean</td>
            </tr>
            <tr>
              <td className="p-4 font-semibold text-white font-sans">Open-Source Code</td>
              <td className="p-4 text-emerald-400 bg-emerald-950/20 border-x border-emerald-500/20 font-bold">✔ 100% MIT Transparent</td>
              <td className="p-4 text-rose-400">❌ Closed Source</td>
              <td className="p-4 text-rose-400">❌ Closed Source</td>
              <td className="p-4 text-emerald-400">✔ Text Script</td>
            </tr>
            <tr>
              <td className="p-4 font-semibold text-white font-sans">GUI & CLI Both Available</td>
              <td className="p-4 text-emerald-400 bg-emerald-950/20 border-x border-emerald-500/20 font-bold">✔ Dual Interface</td>
              <td className="p-4 text-slate-400">Settings Only</td>
              <td className="p-4 text-rose-400">❌ Heavy GUI Only</td>
              <td className="p-4 text-rose-400">❌ CLI Only</td>
            </tr>
            <tr>
              <td className="p-4 font-semibold text-white font-sans">Dry-Run Simulation</td>
              <td className="p-4 text-emerald-400 bg-emerald-950/20 border-x border-emerald-500/20 font-bold">✔ Safe Inspection</td>
              <td className="p-4 text-slate-400">N/A</td>
              <td className="p-4 text-rose-400">❌ No</td>
              <td className="p-4 text-amber-400">Rare</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
