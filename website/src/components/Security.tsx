import {
  IconLock,
  IconShieldCheck,
  IconWifiOff,
  IconCpu,
  IconKey,
  IconFileCheck,
} from '@tabler/icons-react';

export default function Security() {
  return (
    <section id="security" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      <div className="text-center mb-14">
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3 font-display">
          Safety & Transparent <span className="text-emerald-400">Architecture</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base font-sans">
          Built with an unyielding local-first safety stance. Optimize Windows without risking OS stability or data loss.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: System Restore Point Safety - Spans 2 columns */}
        <div className="tech-card p-6 md:col-span-2 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <IconShieldCheck size={20} stroke={1.75} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-sans">System Restore Point Safety Guarantee</h3>
            <p className="text-slate-400 text-xs leading-relaxed font-sans max-w-xl">
              Purgo generates an automated native Windows System Restore point before applying any package removal or service tweaks. If you ever want to revert system changes, restore points are available instantly.
            </p>
          </div>
          <div className="text-[10px] font-mono text-emerald-300 mt-4 bg-[#080a11]/40 border border-[#1e2638]/40 p-2.5 rounded-lg inline-flex items-center gap-2 self-start">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>100% Reversible Operations</span>
          </div>
        </div>

        {/* Card 2: Safe Dry-Run Simulation Mode - Spans 1 column */}
        <div className="tech-card p-6 md:col-span-1 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <IconLock size={20} stroke={1.75} />
            </div>
            <h3 className="text-base font-bold text-white mb-2 font-sans">Dry-Run Simulation Mode</h3>
            <p className="text-slate-400 text-xs leading-relaxed font-sans">
              Test debloating presets in dry-run mode before modifying system registries or removing packages to verify exact targets.
            </p>
          </div>
        </div>

        {/* Card 3: Zero Cloud Telemetry & 100% Offline - Spans 1 column */}
        <div className="tech-card p-6 md:col-span-1 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <IconWifiOff size={20} stroke={1.75} />
            </div>
            <h3 className="text-base font-bold text-white mb-2 font-sans">Zero Analytics / Zero Telemetry</h3>
            <p className="text-slate-400 text-xs leading-relaxed font-sans">
              Zero tracking scripts, zero background telemetry pings, zero third-party software bundles. Pure local performance.
            </p>
          </div>
        </div>

        {/* Card 4: Native Windows API Execution - Spans 1 column */}
        <div className="tech-card p-6 md:col-span-1 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <IconCpu size={20} stroke={1.75} />
            </div>
            <h3 className="text-base font-bold text-white mb-2 font-sans">Native Windows API Calls</h3>
            <p className="text-slate-400 text-xs leading-relaxed font-sans">
              Utilizes native PowerShell AppX commands and Windows service managers without installing unverified third-party drivers.
            </p>
          </div>
        </div>

        {/* Card 5: Non-Destructive App Removal - Spans 1 column */}
        <div className="tech-card p-6 md:col-span-1 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <IconKey size={20} stroke={1.75} />
            </div>
            <h3 className="text-base font-bold text-white mb-2 font-sans">Non-Destructive App Target</h3>
            <p className="text-slate-400 text-xs leading-relaxed font-sans">
              App removal is isolated per-user or provisioned package, keeping essential Windows system components intact.
            </p>
          </div>
        </div>

        {/* Card 6: Open Source Transparency - Spans 3 columns */}
        <div className="tech-card p-6 md:col-span-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex gap-4 items-start max-w-2xl">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <IconFileCheck size={20} stroke={1.75} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2 font-sans">100% Open Source Transparency</h3>
              <p className="text-slate-400 text-xs leading-relaxed font-sans">
                Every PowerShell command, script template, and GUI action is fully open source. Inspect the code on GitHub.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 shrink-0 font-mono text-xs">
            <a
              href="https://github.com/Mananwebdev160408/debloater"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#080a11]/45 hover:bg-[#080a11]/70 border border-[#1e2638]/60 hover:border-emerald-500/40 text-slate-300 rounded transition"
            >
              GitHub Repository
            </a>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <span className="text-slate-400">License: MIT</span>
          </div>
        </div>

      </div>
    </section>
  );
}
