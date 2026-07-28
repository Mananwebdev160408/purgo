function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function ArrowUpRightIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
  );
}

function HeartIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function KanbanIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M8 7v7M12 7v4M16 7v9" />
    </svg>
  );
}

export default function Community() {
  return (
    <section id="community" className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-24">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-sans font-medium mb-3">
          <HeartIcon className="w-3.5 h-3.5 text-emerald-400" />
          <span>Open-Source Ecosystem</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3 font-display">
          Community & Contributions
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base font-sans">
          <code className="text-emerald-300 font-mono">Purgo</code> is an open-source Windows Debloater & System Optimizer.
        </p>
      </div>

      {/* 3-Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Card 1: GitHub */}
        <div className="glass-card p-6 flex flex-col justify-between space-y-5">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <GithubIcon className="w-5 h-5 text-emerald-300" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-sans">Star on GitHub</h3>
            <p className="text-slate-400 text-xs leading-relaxed font-sans">
              Audit the codebase, report issues, and contribute feature presets on GitHub.
            </p>
          </div>
          <a
            href="https://github.com/Mananwebdev160408/purgo"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-200 font-bold text-xs transition flex items-center justify-center gap-2 border border-emerald-500/30 shadow-sm"
          >
            <span>GitHub Repository</span>
            <ArrowUpRightIcon className="w-3.5 h-3.5 text-emerald-300" />
          </a>
        </div>

        {/* Card 2: Release Download */}
        <div className="glass-card p-6 flex flex-col justify-between space-y-5">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <GithubIcon className="w-5 h-5 text-emerald-300" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-sans">Download App</h3>
            <p className="text-slate-400 text-xs leading-relaxed font-sans">
              Get the latest release binaries for Windows 10 & Windows 11.
            </p>
          </div>
          <a
            href="https://github.com/Mananwebdev160408/purgo/releases/download/v1.0.0/Purgo-Setup-1.0.0.exe"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 border border-emerald-400/40"
          >
            <span>Download Purgo</span>
            <ArrowUpRightIcon className="w-3.5 h-3.5 text-slate-950" />
          </a>
        </div>

        {/* Card 3: Roadmap & Issues */}
        <div className="glass-card p-6 flex flex-col justify-between space-y-5">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <KanbanIcon className="w-5 h-5 text-emerald-300" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-sans">Feature Roadmap</h3>
            <p className="text-slate-400 text-xs leading-relaxed font-sans">
              Track upcoming debloater features, UI improvements, and new system tweak modules.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/Mananwebdev160408/purgo/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-200 border border-emerald-500/30 font-bold text-xs transition flex items-center justify-center gap-1.5"
            >
              <span>View Issues</span>
            </a>
          </div>
        </div>
      </div>


      {/* Maintainer Footer */}
      <div className="glass-panel rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3 font-sans">
        <div className="flex items-center gap-2">
          <span>Maintained with care by</span>
          <a
            href="https://github.com/Mananwebdev160408"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-emerald-300 font-bold transition underline underline-offset-4"
          >
            Manan Gupta
          </a>
          <span>& contributors</span>
        </div>
        <div className="flex items-center gap-4 text-slate-500 font-mono text-[11px]">
          <span>License: MIT</span>
          <span>Version: 1.0.0</span>
        </div>
      </div>
    </section>
  );
}
