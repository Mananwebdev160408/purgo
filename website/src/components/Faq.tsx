'use client';

import { useState } from 'react';
import { IconChevronDown, IconHelpCircle } from '@tabler/icons-react';

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is Purgo and how does it debloat Windows?',
      a: 'Purgo is an open-source Windows debloater and system optimizer. It removes unwanted pre-installed UWP apps (Xbox Services, OneDrive, News & Weather, Cortana), disables diagnostic tracking telemetry, and frees up system memory and storage.',
    },
    {
      q: 'Is Purgo safe to use on Windows 10 and Windows 11?',
      a: 'Yes. Purgo is built with a safety-first architecture. It automatically triggers a native Windows System Restore point before applying changes and supports a Dry-Run simulation mode to preview all actions.',
    },
    {
      q: 'How do I revert changes if I need an app back?',
      a: 'Because Purgo creates an automated System Restore point ("Purgo_Safety_Backup"), you can easily revert your system back to its exact state using Windows System Restore or re-install individual AppX packages.',
    },
    {
      q: 'Does Purgo require Administrator privileges?',
      a: 'Yes. Modifying system telemetry services, removing provisioned AppX packages, and creating System Restore points require Administrator rights in Windows PowerShell or CMD.',
    },
    {
      q: 'Is Purgo open-source and free from adware/telemetry?',
      a: '100% open source under the MIT license. Purgo contains zero third-party bundled software, zero ad trackers, and zero telemetry reporting.',
    },
    {
      q: 'Can I run Purgo headlessly or export PowerShell scripts?',
      a: 'Yes. Purgo includes both an interactive GUI and a command-line interface (CLI). You can also use the built-in Script Generator to export standalone .ps1 scripts for automated deployment across multiple PCs.',
    },
  ];

  return (
    <section id="faq" className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto scroll-mt-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white tracking-tight mb-3 font-display">
          Frequently Asked <span className="text-emerald-400">Questions</span>
        </h2>
        <p className="text-slate-400 text-sm font-sans">
          Everything you need to know about Purgo debloater safety, presets, and architecture.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((f, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={f.q}
              className="tech-card rounded-xl overflow-hidden border border-[#1e2638]/50"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-sans text-sm sm:text-base font-semibold text-white hover:text-emerald-300 transition"
              >
                <span className="flex items-center gap-2.5">
                  <IconHelpCircle size={18} stroke={1.75} className="text-emerald-400 shrink-0" />
                  <span>{f.q}</span>
                </span>
                <IconChevronDown
                  size={18}
                  stroke={1.75}
                  className={`text-slate-400 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-emerald-400' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-[#1e2638]/50 bg-[#080a11]/40 font-sans">
                  {f.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
