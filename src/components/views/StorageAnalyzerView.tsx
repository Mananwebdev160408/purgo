import React, { useState, useMemo } from 'react';
import { useScanStore } from '../../store/useScanStore';
import { SafetyBadge } from '../common/SafetyBadge';
import { PieChart, HardDrive, Folder, ChevronRight, ChevronDown, Layers } from 'lucide-react';

export const StorageAnalyzerView: React.FC = () => {
  const { projects } = useScanStore();
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});

  // Sort projects by total size descending for true proportional treemap hierarchy
  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => b.totalSizeBytes - a.totalSizeBytes);
  }, [projects]);

  const totalBytes = useMemo(() => {
    return projects.reduce((acc, p) => acc + p.totalSizeBytes, 0);
  }, [projects]);

  const formatSize = (bytes: number) => {
    if (bytes >= 1024 * 1024 * 1024) return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    if (bytes >= 1024) return (bytes / 1024).toFixed(0) + ' KB';
    return bytes + ' B';
  };

  const toggleExpand = (id: string) => {
    setExpandedProjects(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const ecosystemColors = [
    'bg-fluent-green hover:bg-fluent-greenHover',
    'bg-purple-600 hover:bg-purple-500',
    'bg-emerald-600 hover:bg-emerald-500',
    'bg-amber-600 hover:bg-amber-500',
    'bg-rose-600 hover:bg-rose-500',
    'bg-cyan-600 hover:bg-cyan-500',
    'bg-indigo-600 hover:bg-indigo-500',
    'bg-teal-600 hover:bg-teal-500',
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto animate-in fade-in duration-200">
      {/* Header Info */}
      <div className="flex items-center justify-between bg-fluent-cardDark border border-fluent-cardBorderDark rounded-xl p-5 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-fluent-green/10 text-fluent-green rounded-xl border border-fluent-green/20">
            <PieChart className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-base text-fluent-textDark">Storage Analyzer (WinDirStat View)</h2>
            <p className="text-xs text-fluent-textSecondaryDark">Interactive hierarchical breakdown of disk space by drive, project, and safe artifact folders.</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-fluent-textSecondaryDark">Total Analyzed Storage</div>
          <div className="text-xl font-bold text-fluent-textDark font-mono">{formatSize(totalBytes)}</div>
        </div>
      </div>

      {/* Visual Treemap Blocks */}
      <div className="bg-fluent-cardDark border border-fluent-cardBorderDark rounded-xl p-5 space-y-3 shadow-xs">
        <div className="text-xs font-semibold uppercase text-fluent-textSecondaryDark tracking-wider flex items-center justify-between">
          <span>Proportional Storage Treemap</span>
          <span>Proportions calculated by actual disk usage</span>
        </div>

        {totalBytes === 0 ? (
          <div className="h-24 w-full rounded-lg bg-fluent-bgDark border border-fluent-cardBorderDark flex items-center justify-center text-xs text-fluent-textSecondaryDark font-medium">
            No active project storage detected. Run a scan to populate treemap.
          </div>
        ) : (
          <div className="h-24 w-full rounded-lg overflow-hidden flex border border-fluent-cardBorderDark bg-fluent-bgDark shadow-inner">
            {sortedProjects.map((proj, idx) => {
              const realPct = totalBytes > 0 ? (proj.totalSizeBytes / totalBytes) * 100 : 0;
              const colorClass = ecosystemColors[idx % ecosystemColors.length];

              // Skip rendering zero-byte items or extremely tiny items (<0.01%) so graph remains accurate
              if (proj.totalSizeBytes === 0 || realPct < 0.01) {
                return null;
              }

              const showText = realPct >= 3.5;

              return (
                <div
                  key={proj.id}
                  style={{
                    width: `${realPct}%`,
                  }}
                  className={`${colorClass} transition-all p-2 flex flex-col justify-between border-r border-black/20 cursor-pointer group relative overflow-hidden shrink-0`}
                  title={`${proj.name} (${formatSize(proj.totalSizeBytes)}) - ${realPct < 0.1 ? realPct.toFixed(2) : realPct.toFixed(1)}% of total scanned storage`}
                >
                  {showText ? (
                    <>
                      <div className="text-xs font-bold text-white truncate drop-shadow-xs">{proj.name}</div>
                      <div className="text-[10px] font-mono text-white/90 font-medium drop-shadow-xs truncate">
                        {formatSize(proj.totalSizeBytes)} ({realPct.toFixed(1)}%)
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 text-[9px] font-mono text-white font-bold transition-opacity truncate px-0.5">
                        {proj.name}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Quick Legend for Top Storage Projects */}
        {sortedProjects.length > 0 && totalBytes > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-fluent-textSecondaryDark font-medium">
            <span className="text-[10px] uppercase font-semibold text-fluent-textSecondaryDark tracking-wider mr-1">Top Disk Consumers:</span>
            {sortedProjects.slice(0, 5).map((proj, idx) => {
              const pct = ((proj.totalSizeBytes / totalBytes) * 100).toFixed(1);
              if (proj.totalSizeBytes === 0) return null;
              const colorBg = ecosystemColors[idx % ecosystemColors.length].split(' ')[0];
              return (
                <div key={proj.id} className="flex items-center gap-1.5 bg-fluent-bgDark px-2.5 py-1 rounded-md border border-fluent-cardBorderDark">
                  <span className={`w-2 h-2 rounded-full ${colorBg}`} />
                  <span className="font-semibold text-fluent-textDark truncate max-w-[120px]">{proj.name}:</span>
                  <span className="font-mono text-fluent-textSecondaryDark">{formatSize(proj.totalSizeBytes)} ({pct}%)</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Hierarchical Drill-Down Tree Table */}
      <div className="bg-fluent-cardDark border border-fluent-cardBorderDark rounded-xl overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-fluent-cardBorderDark bg-fluent-hoverDark/30 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-fluent-textDark">
            <HardDrive className="w-4 h-4 text-fluent-green" />
            <span>Developer Projects Directory</span>
          </div>
          <div className="text-xs text-fluent-textSecondaryDark font-mono">
            {projects.length} Projects Tracked
          </div>
        </div>

        <div className="divide-y divide-fluent-cardBorderDark text-xs">
          {sortedProjects.map((proj) => {
            const isExpanded = !!expandedProjects[proj.id];
            const pctOfTotal = totalBytes > 0 ? ((proj.totalSizeBytes / totalBytes) * 100).toFixed(1) : '0.0';

            return (
              <div key={proj.id} className="bg-fluent-cardDark">
                {/* Project Level */}
                <div
                  onClick={() => toggleExpand(proj.id)}
                  className="px-6 py-3.5 flex items-center justify-between hover:bg-fluent-hoverDark/60 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button className="text-fluent-textSecondaryDark shrink-0">
                      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                    <Folder className="w-4 h-4 text-fluent-green shrink-0" />
                    <div className="min-w-0 truncate">
                      <span className="font-semibold text-fluent-textDark truncate">{proj.name}</span>
                      <span className="ml-2.5 text-[10px] px-2 py-0.5 rounded bg-fluent-bgDark border border-fluent-cardBorderDark text-fluent-textSecondaryDark font-mono">
                        {proj.ecosystem}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 shrink-0">
                    {/* Real Size Bar */}
                    <div className="w-36 flex items-center gap-2">
                      <div className="flex-1 h-2 bg-fluent-bgDark rounded-full overflow-hidden">
                        <div
                          className="h-full bg-fluent-green rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, Math.max(0, parseFloat(pctOfTotal)))}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-fluent-textSecondaryDark font-mono w-12 text-right">{pctOfTotal}%</span>
                    </div>

                    <div className="text-right w-28 font-mono">
                      <span className="font-bold text-fluent-textDark">{formatSize(proj.totalSizeBytes)}</span>
                    </div>
                  </div>
                </div>

                {/* Sub-Artifacts Drill Down */}
                {isExpanded && (
                  <div className="bg-fluent-bgDark/80 border-t border-b border-fluent-cardBorderDark/60 divide-y divide-fluent-cardBorderDark/40">
                    {proj.artifacts.length === 0 ? (
                      <div className="pl-14 pr-6 py-2.5 text-fluent-textSecondaryDark text-[11px]">
                        No recreatable build artifact folders found in this project.
                      </div>
                    ) : (
                      proj.artifacts.map((art) => {
                        const artPctOfProj = proj.totalSizeBytes > 0
                          ? ((art.sizeBytes / proj.totalSizeBytes) * 100).toFixed(1)
                          : '0.0';

                        return (
                          <div key={art.id} className="pl-14 pr-6 py-3 flex items-center justify-between hover:bg-fluent-hoverDark/40 transition-colors">
                            <div className="flex items-center gap-3 min-w-0">
                              <Layers className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                              <div className="min-w-0">
                                <span className="font-medium text-fluent-textDark">{art.name}</span>
                                <span className="ml-3 text-[11px] font-mono text-fluent-textSecondaryDark truncate" title={art.path}>
                                  {art.path}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-6 shrink-0">
                              <SafetyBadge safety={art.safety} reason={art.safetyReason} />

                              <div className="w-28 text-right font-mono font-semibold text-emerald-400">
                                {formatSize(art.sizeBytes)} ({artPctOfProj}%)
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
