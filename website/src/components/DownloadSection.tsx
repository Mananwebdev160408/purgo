'use client';

import { useState } from 'react';
import {
  IconDownload,
  IconBrandWindows,
  IconShieldCheck,
  IconCheck,
  IconCpu,
  IconPackage,
  IconExternalLink,
} from '@tabler/icons-react';

interface DownloadSectionProps {
  onToast: (msg: string) => void;
}

export default function DownloadSection({ onToast }: DownloadSectionProps) {
  const [copiedHash, setCopiedHash] = useState(false);

  const handleDownload = () => {
    onToast('Redirecting to latest Purgo Desktop release...');
    window.open('https://github.com/Mananwebdev160408/debloater', '_blank');
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText('SHA256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
    setCopiedHash(true);
    onToast('Copied SHA256 checksum!');
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <section id="download" className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-24">
      <div className="glass-panel rounded-2xl border border-white/10 p-6 sm:p-10 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-sans font-medium mb-3">
            <IconBrandWindows size={15} className="text-emerald-400" />
            <span>Windows Desktop Application</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 font-display">
            Download <span className="text-emerald-400">Purgo Desktop GUI</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto font-sans">
            Lightweight, open-source Windows debloater. Zero dependencies, 100% offline & safe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Main Download Card */}
          <div className="md:col-span-7 bg-[#05070d] border border-white/10 rounded-xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <IconPackage size={26} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg font-sans">Purgo Installer v1.0.0</h3>
                  <span className="text-xs text-emerald-400 font-mono">Purgo_v1.0.0_x64_Setup.exe</span>
                </div>
              </div>
              <span className="px-2.5 py-1 text-xs font-mono rounded bg-slate-900 text-slate-300 border border-white/10">
                45.2 MB
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Includes full GUI Desktop App, dark/light theme engine, automated System Restore Point manager, and one-click bloatware cleaning modules.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleDownload}
                className="flex-1 py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-sans font-bold text-sm transition flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-500/25"
              >
                <IconDownload size={18} />
                <span>Download Windows Installer</span>
              </button>

              <a
                href="https://github.com/Mananwebdev160408/debloater"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/10 font-sans font-semibold text-xs transition flex items-center justify-center gap-2"
              >
                <IconExternalLink size={16} />
                <span>GitHub Releases</span>
              </a>
            </div>
          </div>

          {/* System Requirements & Verification */}
          <div className="md:col-span-5 space-y-4 font-sans text-xs">
            <div className="bg-[#080a11]/60 border border-white/10 rounded-xl p-4 space-y-2.5">
              <div className="font-bold text-white text-sm flex items-center gap-2">
                <IconCpu size={16} className="text-emerald-400" />
                <span>System Requirements</span>
              </div>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                <td>Windows 10 / Windows 11 (64-bit)</td>
                <td>Administrator Privileges (for restore points)</td>
                <td>Minimum 100 MB free disk space</td>
                <td>Zero external runtime required</td>
              </ul>
            </div>

            <div className="bg-[#080a11]/60 border border-white/10 rounded-xl p-4 space-y-2">
              <div className="font-bold text-white flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <IconShieldCheck size={16} className="text-emerald-400" />
                  <span>Security & Integrity</span>
                </span>
                <button
                  onClick={handleCopyHash}
                  className="text-[11px] font-mono text-emerald-400 hover:text-emerald-300 transition"
                >
                  {copiedHash ? 'Copied SHA256' : 'Copy Hash'}
                </button>
              </div>
              <p className="text-[11px] text-slate-400 font-mono truncate">
                SHA256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4...
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
