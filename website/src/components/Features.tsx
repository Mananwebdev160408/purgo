import {
  IconTrash,
  IconShieldCheck,
  IconCpu,
  IconTerminal,
  IconBolt,
  IconCode,
} from '@tabler/icons-react';

export default function Features() {
  return (
    <section id="features" className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      <div className="text-center mb-14">
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3 font-display">
          Engineered for System <span className="text-emerald-400">Speed & Privacy</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base font-sans">
          No ad-trackers, no hidden telemetry, zero background daemon overhead. 100% open-source & transparent.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Row 1 - Card 1: One-Click Bloatware Purge (spans 2 cols) */}
        <div className="tech-card p-6 md:col-span-2 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <IconTrash size={20} stroke={1.75} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-sans">One-Click UWP Bloatware Purge</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-4 font-sans max-w-xl">
              Eliminate unnecessary Windows pre-installed apps safely. Remove Xbox App, OneDrive background services, Cortana, News & Weather widgets, Maps, and Edge updater services without breaking Windows OS stability.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 font-mono text-[11px] mt-2">
            <span className="px-3 py-1 rounded bg-[#080a11]/40 text-emerald-300 border border-[#1e2638]/50">Xbox Game Bar</span>
            <span className="px-3 py-1 rounded bg-[#080a11]/40 text-slate-300 border border-[#1e2638]/50">OneDrive Sync</span>
            <span className="px-3 py-1 rounded bg-[#080a11]/40 text-slate-300 border border-[#1e2638]/50">Cortana Voice</span>
            <span className="px-3 py-1 rounded bg-[#080a11]/40 text-slate-300 border border-[#1e2638]/50">News Widgets</span>
            <span className="px-3 py-1 rounded bg-[#080a11]/40 text-emerald-300 border border-[#1e2638]/50">Edge Auto-Update</span>
            <span className="px-3 py-1 rounded bg-[#080a11]/40 text-slate-300 border border-[#1e2638]/50">Feedback Hub</span>
          </div>
        </div>

        {/* Row 1 - Card 2: System Restore Point Safety (spans 1 col) */}
        <div className="tech-card p-6 md:col-span-1 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <IconShieldCheck size={20} stroke={1.75} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-sans">System Restore Point Guarantee</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-4 font-sans">
              Purgo automatically triggers a Windows System Restore point before performing cleanup operations, ensuring 100% reversible, risk-free debloating.
            </p>
          </div>
          <div className="text-xs font-mono text-emerald-400 font-bold bg-[#080a11]/40 border border-[#1e2638]/40 p-2.5 rounded-lg">
            ✓ 100% Reversible Safety
          </div>
        </div>

        {/* Row 2 - Card 3: Diagnostic Telemetry Shield (spans 1 col) */}
        <div className="tech-card p-6 md:col-span-1 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <IconCpu size={20} stroke={1.75} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-sans">Telemetry & Privacy Shield</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-4 font-sans">
              Disables Microsoft DiagTrack (Connected User Experiences and Telemetry), Advertising ID trackers, diagnostic logging, and background telemetry daemons.
            </p>
          </div>
          <div className="text-xs font-mono text-emerald-300 flex items-center gap-2 font-semibold bg-[#080a11]/40 border border-[#1e2638]/40 p-2.5 rounded-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span> 
            <span>Active Tracking Shield</span>
          </div>
        </div>

        {/* Row 2 - Card 4: Gaming & High Performance Tweaks (spans 2 cols) */}
        <div className="tech-card p-6 md:col-span-2 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row gap-6 justify-between items-start">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                <IconBolt size={20} stroke={1.75} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-sans">Gaming & Performance Tuning</h3>
              <p className="text-slate-400 text-xs leading-relaxed font-sans max-w-md">
                Disables Game DVR background screen recording overhead, optimizes CPU scheduling priority, disables background update throttles, and frees system RAM for max FPS.
              </p>
            </div>
            {/* Visual Tweaks Card */}
            <div className="w-full sm:w-48 bg-[#080a11]/40 border border-[#1e2638]/50 rounded-lg p-3 font-mono text-[9px] text-slate-400 space-y-1.5 shrink-0 self-center">
              <div className="flex items-center justify-between border-b border-[#1e2638]/50 pb-1 text-white font-bold">
                <span>🎮 Gaming_Mode</span>
                <span className="text-emerald-400 font-bold">ACTIVE</span>
              </div>
              <div>Game DVR: Disabled</div>
              <div>Background Sync: Off</div>
              <div className="text-emerald-300">CPU Priority: High</div>
            </div>
          </div>
        </div>

        {/* Row 3 - Card 5: PowerShell Script Exporter (spans 1 col) */}
        <div className="tech-card p-6 md:col-span-1 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <IconCode size={20} stroke={1.75} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-sans">PowerShell Preset Exporter</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-4 font-sans">
              Export custom standalone <code className="text-emerald-300 font-mono">.ps1</code> scripts for debloating multiple PCs or headless IT fleets instantly.
            </p>
          </div>
          <div className="text-[10px] font-mono text-emerald-400 space-y-1 bg-[#080a11]/40 border border-[#1e2638]/40 p-2.5 rounded-lg">
            <div>$ purgo --export-script custom.ps1</div>
          </div>
        </div>

        {/* Row 3 - Card 6: Storage Reclamation Engine (spans 2 cols) */}
        <div className="tech-card p-6 md:col-span-2 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row gap-6 justify-between items-start">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                <IconTerminal size={20} stroke={1.75} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-sans">Deep Storage Cache Reclamation</h3>
              <p className="text-slate-400 text-xs leading-relaxed font-sans max-w-md">
                Purge leftover Windows Update distribution caches, temp folders, crash dumps, and prefetch files to reclaim gigabytes of precious SSD/NVMe disk space.
              </p>
            </div>
            <div className="w-full sm:w-48 bg-[#080a11]/40 border border-[#1e2638]/50 rounded-lg p-3 font-mono text-[9px] text-slate-500 space-y-1 shrink-0 self-center">
              <div><span className="text-emerald-300">cache_cleaner:</span></div>
              <div className="pl-3"><span className="text-white">win_update:</span> 1.8 GB</div>
              <div className="pl-3">temp_files: 450 MB</div>
              <div className="pl-3">prefetch: 120 MB</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
