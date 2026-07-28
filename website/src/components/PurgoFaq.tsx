"use client";

import { useState } from "react";
import { IconHelpCircle, IconChevronDown } from "@tabler/icons-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "Is Purgo safe to run on my main Windows PC?",
    answer:
      "Yes, 100%. Before applying any debloat modifications or package removals, Purgo automatically triggers a native Windows System Restore Point. Additionally, deleted files go into Purgo's isolated staging trash, allowing single-click restoration anytime.",
  },
  {
    question: "Which Windows versions are supported?",
    answer:
      "Purgo is fully tested and optimized for Windows 10 (64-bit) and Windows 11 (64-bit). It works on Home, Pro, Enterprise, and Education editions.",
  },
  {
    question: "Does Purgo require installation or Administrator rights?",
    answer:
      "Purgo is available both as a standalone portable executable (no installer needed) and a standard installer. Administrator privilege is requested only when applying System Restore creation or turning off Windows diagnostic services.",
  },
  {
    question: "Can I undo a debloat operation if I need Xbox or OneDrive later?",
    answer:
      "Absolutely. Purgo includes an instant rollback feature that allows you to reinstall native Windows apps or re-enable Xbox services with a single click.",
  },
  {
    question: "How does the Developer Clean Mode work?",
    answer:
      "Developer mode recursively scans your projects for node_modules folders, Rust target directories, Python venvs, and build caches. It checks git status to ensure you don't delete anything uncommitted.",
  },
  {
    question: "Is Purgo open-source?",
    answer:
      "Yes, Purgo is 100% open-source under the MIT license on GitHub. You can inspect all source code, script commands, and safety routines directly.",
  },
];

export default function PurgoFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className="relative px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto scroll-mt-28"
    >
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4">
          <IconHelpCircle size={16} />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight font-display mb-4">
          Got Questions? <span className="text-emerald-400">We've Got Answers</span>
        </h2>
        <p className="text-slate-300 text-base font-sans">
          Everything you need to know about Purgo safety, debloating, and system restoration.
        </p>
      </div>

      <div className="space-y-4 font-sans">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "bg-[#0e1320] border-emerald-500/40 shadow-lg shadow-emerald-500/5"
                  : "bg-[#0a0d16]/70 border-white/10 hover:border-white/20"
              }`}
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
              >
                <span className="font-bold text-slate-100 text-base sm:text-lg">
                  {faq.question}
                </span>
                <IconChevronDown
                  size={20}
                  className={`text-emerald-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-emerald-300" : "text-slate-400"
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-6 text-slate-300 text-sm leading-relaxed border-t border-white/5 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
