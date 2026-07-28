import React from 'react';
import { useScanStore } from '../../store/useScanStore';
import { GitBranch, Clock, AlertCircle, ShieldCheck } from 'lucide-react';

export const GitManagerView: React.FC = () => {
  const { projects } = useScanStore();

  const gitProjects = projects.filter((p) => p.gitInfo);

  const formatSize = (bytes: number) => {
    if (bytes >= 1024 * 1024 * 1024) return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    return (bytes / (1024 * 1024)).toFixed(0) + ' MB';
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto animate-in fade-in duration-200">
      <div className="flex items-center justify-between bg-fluent-cardDark border border-fluent-cardBorderDark rounded-xl p-5 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-orange-500/10 text-orange-400 rounded-xl border border-orange-500/20">
            <GitBranch className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-base text-fluent-textDark">Git Repository Manager</h2>
            <p className="text-xs text-fluent-textSecondaryDark">Discover local Git repositories, track stale projects, branches, and clean heavy build targets.</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-fluent-textSecondaryDark">Repositories Tracked</div>
          <div className="text-xl font-bold text-fluent-textDark font-mono">{gitProjects.length}</div>
        </div>
      </div>

      <div className="bg-fluent-cardDark border border-fluent-cardBorderDark rounded-xl overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-fluent-hoverDark/50 border-b border-fluent-cardBorderDark text-fluent-textSecondaryDark font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4">Repository & Remote</th>
              <th className="py-3 px-4">Branch</th>
              <th className="py-3 px-4">Last Commit</th>
              <th className="py-3 px-4 text-right">Reclaimable Space</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-fluent-cardBorderDark">
            {gitProjects.map((proj) => (
              <tr key={proj.id} className="hover:bg-fluent-hoverDark/40 transition-colors">
                <td className="py-3 px-4">
                  <div className="font-semibold text-fluent-textDark flex items-center gap-2">
                    <span>{proj.name}</span>
                    {proj.gitInfo?.isStale && (
                      <span className="px-2 py-0.2 rounded bg-amber-500/20 text-amber-400 text-[10px] font-mono border border-amber-500/30">
                        Stale (&gt;60 days)
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] font-mono text-fluent-textSecondaryDark truncate max-w-md mt-0.5" title={proj.gitInfo?.remoteUrl || proj.path}>
                    {proj.gitInfo?.remoteUrl || proj.path}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded bg-fluent-bgDark border border-fluent-cardBorderDark font-mono text-[11px] text-fluent-green">
                    {proj.gitInfo?.branch || 'main'}
                  </span>
                </td>
                <td className="py-3 px-4 text-fluent-textSecondaryDark">
                  {new Date(proj.gitInfo?.lastCommitDate || proj.lastModified).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 text-right font-mono font-bold text-emerald-400">
                  {formatSize(proj.reclaimableSizeBytes)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
