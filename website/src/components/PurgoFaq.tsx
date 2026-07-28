"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconChevronDown, IconHelpCircle, IconShieldCheck } from "@tabler/icons-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "Will Purgo delete my actual source code files?",
    answer:
      "Never. Purgo only scans for recreatable build artifacts (such as node_modules, target/, dist/, .next/, venv, .gradle/) and global toolchain caches. Your source code files, Git history, and project configuration files are 100% untouched.",
  },
  {
    question: "What happens if I accidentally delete a build folder I still needed?",
    answer:
      "Every single deletion goes directly into the 30-Day Purgo Trash retention folder. Purgo preserves original path metadata, allowing you to restore any folder or file back to its original location with a single click.",
  },
  {
    question: "What developer ecosystems does Purgo auto-detect?",
    answer:
      "Purgo supports 10+ ecosystems out of the box: Node.js (npm, yarn, pnpm, bun), Rust (Cargo), Python (venv, pip), Java (Maven, Gradle), Go, Flutter/Dart, PHP (Composer), Unity, C#/C++, and Docker.",
  },
  {
    question: "How does Purgo handle global package manager caches?",
    answer:
      "Purgo scans global toolchain caches stored outside your project directories — such as %APPDATA%\\npm-cache, Cargo registry caches, Gradle build caches, Pub cache, and VS Code data — allowing you to reclaim tens of gigabytes safely.",
  },
  {
    question: "Does Purgo require Git CLI installed to analyze repositories?",
    answer:
      "No. Purgo parses .git/ directory metadata directly. It identifies stale repositories (>60 days since last commit), active branches, remote providers, and warns if uncommitted local changes exist.",
  },
  {
    question: "Is Purgo free and open source?",
    answer:
      "Yes! Purgo is 100% open source under the MIT License, built with Electron, React, and TypeScript. Zero hidden telemetry, zero background ads, and zero telemetry tracking.",
  },
];

export default function PurgoFaq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className="relative px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto scroll-mt-28"
    >
      <div className="shredded-glass-panel rounded-3xl p-6 sm:p-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4 backdrop-blur-xl shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <IconHelpCircle size={15} />
            <span>Developer FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display mb-3">
            Frequently Asked <span className="text-emerald-400">Questions</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-sans leading-relaxed">
            Everything you need to know about Purgo Developer Disk Manager and safety protocols.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border border-white/10 rounded-2xl bg-[#060912]/45 backdrop-blur-xl overflow-hidden transition hover:border-emerald-500/30"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 text-left font-sans text-sm sm:text-base font-bold text-white flex items-center justify-between gap-4 hover:bg-white/[0.03] transition"
                >
                  <span>{faq.question}</span>
                  <IconChevronDown
                    size={18}
                    className={`text-emerald-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-white/10 px-4 sm:px-5 pb-5 pt-3 text-slate-300 text-xs sm:text-sm font-sans leading-relaxed"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
