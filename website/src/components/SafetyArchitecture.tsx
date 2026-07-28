"use client";

import {
  IconShieldCheck,
  IconFolderOff,
  IconBrandGit,
  IconCheck,
  IconLock,
  IconRefresh,
  IconDeviceDesktop,
} from "@tabler/icons-react";

export default function SafetyArchitecture() {
  const SAFETY_PILLARS = [
    {
      icon: IconFolderOff,
      title: "30-Day Recoverable Purgo Trash",
      description:
        "No item is ever permanently wiped immediately. All cleaned build artifacts are moved to an isolated Purgo Trash retention folder with full original path preservation for 1-click restore.",
    },
    {
      icon: IconShieldCheck,
      title: "Ecosystem Safety Ratings",
      description:
        "Purgo inspects project manifests (`package.json`, `Cargo.toml`, `go.mod`, `pom.xml`) and rates every build folder as Safe, Review, or Caution before cleaning.",
    },
    {
      icon: IconBrandGit,
      title: "Uncommitted Changes Safeguard",
      description:
        "Directly parses `.git/` metadata to verify repository health and warn if uncommitted work or unpushed branches exist near build directories.",
    },
    {
      icon: IconLock,
      title: "Zero Automatic Wipes",
      description:
        "Purgo never runs background deletions without your explicit confirmation. You maintain 100% control over what gets cleaned and when.",
    },
  ];

  return (
    <section
      id="safety"
      className="relative px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-28"
    >
      <div className="shredded-glass-panel rounded-3xl p-6 sm:p-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4 backdrop-blur-xl shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <IconShieldCheck size={15} />
            <span>Developer Safety Policy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display mb-3">
            Built with <span className="text-emerald-400">Absolute Safety & Reversibility</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-sans leading-relaxed">
            Purgo enforces a strict non-destructive policy designed specifically to keep your developer projects safe from accidental data loss.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SAFETY_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-[#060912]/45 border border-white/10 rounded-2xl p-6 hover:border-emerald-500/40 hover:bg-emerald-500/[0.06] transition space-y-3 backdrop-blur-xl shadow-inner"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-white font-sans">
                  {pillar.title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm font-sans leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
