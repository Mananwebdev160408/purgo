'use client';

import { useState } from 'react';
import { IconShieldCheck, IconCopy, IconCheck, IconTrash, IconCpu, IconSparkles, IconDeviceDesktop, IconBolt } from '@tabler/icons-react';

interface ProtocolsProps {
  onToast: (msg: string) => void;
}

export default function Protocols({ onToast }: ProtocolsProps) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const modules = [
    {
      name: 'UWP & System Apps Purge',
      command: 'purgo --clean uwp-apps',
      example: 'removes Xbox, OneDrive, Maps, Cortana, Weather & News widgets',
      badge: 'Disk & RAM',
      color: 'text-emerald-300 border-emerald-500/40 bg-emerald-500/10',
      icon: IconTrash,
    },
    {
      name: 'Diagnostic Telemetry Shield',
      command: 'purgo --shield telemetry',
      example: 'blocks DiagTrack, WerSvc, Advertising ID & error telemetry',
      badge: '100% Privacy',
      color: 'text-emerald-300 border-emerald-500/40 bg-emerald-500/10',
      icon: IconShieldCheck,
    },
    {
      name: 'Gaming & CPU Boost',
      command: 'purgo --preset gaming-fps',
      example: 'disables Game DVR recording & background update throttles',
      badge: 'Max FPS',
      color: 'text-emerald-300 border-emerald-500/40 bg-emerald-500/10',
      icon: IconCpu,
    },
    {
      name: 'Cache & Update Cleaner',
      command: 'purgo --clean storage-cache',
      example: 'clears WinUpdate cache, prefetch data, logs & temp files',
      badge: 'Space Saver',
      color: 'text-emerald-300 border-emerald-500/40 bg-emerald-500/10',
      icon: IconBolt,
    },
    {
      name: 'Windows 11 Context Menu Fix',
      command: 'purgo --tweak win11-classic-menu',
      example: 'restores fast legacy right-click context menus without delay',
      badge: 'UX Polish',
      color: 'text-emerald-300 border-emerald-500/40 bg-emerald-500/10',
      icon: IconDeviceDesktop,
    },
    {
      name: 'System Restore Guarantee',
      command: 'purgo --restore-point create',
      example: 'generates automated Windows Restore Point before changes',
      badge: '100% Safe',
      color: 'text-emerald-300 border-emerald-500/40 bg-emerald-500/10',
      icon: IconSparkles,
    },
  ];

  const handleCopy = (str: string, idx: number) => {
    navigator.clipboard.writeText(str);
    setCopiedIdx(idx);
    onToast(`Copied command preset!`);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <section id="protocols" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3 font-display">
          Optimization <span className="text-emerald-400">Modules & Presets</span>
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base font-sans">
          Execute targeted debloat modules via Purgo GUI or run command presets directly in your terminal.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono">
        {modules.map((m, idx) => {
          const IconComp = m.icon;
          return (
            <div key={m.name} className="tech-card p-5 sm:p-6 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-white text-sm sm:text-base font-sans flex items-center gap-2.5">
                    <IconComp className="w-5 h-5 text-emerald-400" stroke={1.8} /> {m.name}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${m.color}`}>
                    {m.badge}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mb-3 font-sans">
                  Target: <span className="text-slate-300">{m.example}</span>
                </div>
                <div className="bg-[#080a11]/60 p-3 rounded-lg border border-[#1e2638]/50 text-xs text-emerald-400 break-all select-all font-mono">
                  $ {m.command}
                </div>
              </div>

              <button
                onClick={() => handleCopy(m.command, idx)}
                className="w-full py-2.5 rounded bg-[#080a11]/45 hover:bg-[#080a11]/70 text-slate-300 border border-[#1e2638]/60 hover:border-emerald-500/40 text-xs transition flex items-center justify-center gap-2 font-sans font-medium"
              >
                {copiedIdx === idx ? <IconCheck className="w-4 h-4 text-emerald-400" stroke={2} /> : <IconCopy className="w-4 h-4 text-slate-400" stroke={1.8} />}
                <span>{copiedIdx === idx ? 'Copied' : 'Copy Command'}</span>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
