"use client";

import {
  IconShieldCheck,
  IconLock,
  IconHistory,
  IconCode,
  IconRefresh,
  IconCheck,
} from "@tabler/icons-react";

export default function SafetyArchitecture() {
  const SAFETY_PILLARS = [
    {
      title: "Automatic Windows Restore Point",
      description:
        "Before modifying registry flags, turning off services, or stripping bloat packages, Purgo initializes a native Windows System Restore Point snapshot. You can roll back anytime with zero hassle.",
      icon: IconHistory,
      badge: "Pre-Execution Snapshot",
    },
    {
      title: "Isolated Purgo Staging Vault",
      description:
        "Files deleted by Purgo's cache cleaner, duplicate hunter, or dev cleaner do not bypass safety. They are quarantined in an isolated, encrypted staging bin for easy single-click restoration.",
      icon: IconLock,
      badge: "100% Reversible",
    },
    {
      title: "Transparent Dry-Run Preview",
      description:
        "Preview every script action, registry tweak, and target path BEFORE committing to execution. You maintain 100% granular checkmark control over every single package.",
      icon: IconRefresh,
      badge: "Zero Hidden Actions",
    },
    {
      title: "100% Open Source Auditability",
      description:
        "No hidden telemetry, no third-party installers, no bundled adware. Purgo is 100% open-source software built transparently on GitHub for total privacy and trust.",
      icon: IconCode,
      badge: "MIT Licensed",
    },
  ];

  return (
    <section
      id="safety"
      className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28"
    >
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4">
          <IconShieldCheck size={16} />
          <span>Uncompromising System Protection</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight font-display mb-4">
          Built with <span className="text-emerald-400">Zero-Risk Safety</span> Guarantees
        </h2>
        <p className="text-slate-300 text-base sm:text-lg font-sans leading-relaxed">
          Most system debloaters risk breaking Windows updates or bricking core OS services. Purgo enforces 4 stringent safety layers to ensure your PC remains rock-solid.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SAFETY_PILLARS.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div
              key={idx}
              className="glass-panel rounded-2xl border border-white/10 border-t-white/20 p-6 sm:p-8 bg-[#0a0d16]/80 backdrop-blur-xl relative overflow-hidden group hover:border-emerald-500/40 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition">
                  <Icon size={24} />
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[11px] font-mono font-medium">
                  {pillar.badge}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white font-sans mb-2 group-hover:text-emerald-300 transition">
                {pillar.title}
              </h3>
              <p className="text-slate-300 text-sm font-sans leading-relaxed">
                {pillar.description}
              </p>

              <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-emerald-400/90">
                <IconCheck size={14} />
                <span>Verified Active Safeguard</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
