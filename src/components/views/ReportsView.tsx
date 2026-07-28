import React, { useMemo } from 'react';
import { useScanStore } from '../../store/useScanStore';
import { useTrashStore } from '../../store/useTrashStore';
import { BarChart3, CheckCircle2, Inbox } from 'lucide-react';
import { EcosystemType } from '../../types/project';

// Map ecosystem types to display groups and bar colours
const ECOSYSTEM_GROUP: Record<EcosystemType, { label: string; color: string }> = {
  'Node.js':   { label: 'JavaScript / Node.js', color: 'bg-fluent-green' },
  'React':     { label: 'JavaScript / Node.js', color: 'bg-fluent-green' },
  'Next.js':   { label: 'JavaScript / Node.js', color: 'bg-fluent-green' },
  'Vite':      { label: 'JavaScript / Node.js', color: 'bg-fluent-green' },
  'Vue':       { label: 'JavaScript / Node.js', color: 'bg-fluent-green' },
  'Nuxt':      { label: 'JavaScript / Node.js', color: 'bg-fluent-green' },
  'Angular':   { label: 'JavaScript / Node.js', color: 'bg-fluent-green' },
  'Svelte':    { label: 'JavaScript / Node.js', color: 'bg-fluent-green' },
  'Remix':     { label: 'JavaScript / Node.js', color: 'bg-fluent-green' },
  'Astro':     { label: 'JavaScript / Node.js', color: 'bg-fluent-green' },
  'Electron':  { label: 'JavaScript / Node.js', color: 'bg-fluent-green' },
  'Bun':       { label: 'JavaScript / Node.js', color: 'bg-fluent-green' },
  'Deno':      { label: 'JavaScript / Node.js', color: 'bg-fluent-green' },
  'Express':   { label: 'JavaScript / Node.js', color: 'bg-fluent-green' },
  'NestJS':    { label: 'JavaScript / Node.js', color: 'bg-fluent-green' },
  'Tauri':     { label: 'Rust / Tauri',         color: 'bg-purple-500' },
  'Rust':      { label: 'Rust / Cargo',         color: 'bg-purple-500' },
  'Python':    { label: 'Python',               color: 'bg-emerald-500' },
  'Java':      { label: 'Java / Gradle',        color: 'bg-amber-500' },
  'Kotlin':    { label: 'Java / Gradle',        color: 'bg-amber-500' },
  'Go':        { label: 'Go',                   color: 'bg-cyan-500' },
  'Flutter':   { label: 'Flutter / Dart',       color: 'bg-sky-400' },
  'C#':        { label: 'C# / .NET',            color: 'bg-violet-500' },
  'C++':       { label: 'C++',                  color: 'bg-red-400' },
  'Unity':     { label: 'C# / .NET',            color: 'bg-violet-500' },
  'PHP':       { label: 'PHP',                  color: 'bg-indigo-400' },
};

const COLORS = [
  'bg-fluent-green',
  'bg-purple-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-cyan-500',
  'bg-sky-400',
  'bg-violet-500',
  'bg-red-400',
  'bg-indigo-400',
];

export const ReportsView: React.FC = () => {
  const { projects } = useScanStore();
  const { trashItems } = useTrashStore();

  const formatSize = (bytes: number) => {
    if (bytes >= 1024 * 1024 * 1024) return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(0) + ' MB';
    return (bytes / 1024).toFixed(0) + ' KB';
  };

  const formatRelativeTime = (isoString: string) => {
    const diff = Date.now() - new Date(isoString).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  // ── Ecosystem breakdown computed from real scan data ──────────────────────
  const ecosystemBreakdown = useMemo(() => {
    const totals: Record<string, { bytes: number; color: string }> = {};

    for (const project of projects) {
      const group = ECOSYSTEM_GROUP[project.ecosystem];
      const label = group?.label ?? project.ecosystem;
      const color = group?.color ?? COLORS[Object.keys(totals).length % COLORS.length];
      const size = project.reclaimableSizeBytes;
      if (!totals[label]) totals[label] = { bytes: 0, color };
      totals[label].bytes += size;
    }

    const totalBytes = Object.values(totals).reduce((s, v) => s + v.bytes, 0);

    return Object.entries(totals)
      .sort((a, b) => b[1].bytes - a[1].bytes)
      .slice(0, 6)
      .map(([name, { bytes, color }]) => ({
        name,
        bytes,
        color,
        pct: totalBytes > 0 ? Math.round((bytes / totalBytes) * 100) : 0,
      }));
  }, [projects]);

  // ── Total reclaimable from current scan ──────────────────────────────────
  const totalReclaimed = useMemo(
    () => projects.reduce((acc, p) => acc + p.reclaimableSizeBytes, 0),
    [projects]
  );

  // ── Recent activity from real trash store ────────────────────────────────
  const recentActivity = useMemo(
    () =>
      [...trashItems]
        .sort((a, b) => new Date(b.deletedAt).getTime() - new Date(a.deletedAt).getTime())
        .slice(0, 8),
    [trashItems]
  );

  const totalTrashed = useMemo(
    () => trashItems.reduce((acc, i) => acc + i.sizeBytes, 0),
    [trashItems]
  );

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto animate-in fade-in duration-200">
      {/* Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between bg-fluent-cardDark border border-fluent-cardBorderDark rounded-xl p-5 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-base text-fluent-textDark">Reports &amp; Cleanup Statistics</h2>
            <p className="text-xs text-fluent-textSecondaryDark">
              Live analytics from your last scan and Purgo Trash history.
            </p>
          </div>
        </div>
        <div className="flex gap-8 text-right">
          <div>
            <div className="text-xs text-fluent-textSecondaryDark">Reclaimable Space</div>
            <div className="text-xl font-bold text-emerald-400 font-mono">{formatSize(totalReclaimed)}</div>
          </div>
          <div>
            <div className="text-xs text-fluent-textSecondaryDark">Total Trashed</div>
            <div className="text-xl font-bold text-amber-400 font-mono">{formatSize(totalTrashed)}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ecosystem Breakdown ──────────────────────────────────────────── */}
        <div className="bg-fluent-cardDark border border-fluent-cardBorderDark rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-sm text-fluent-textDark">Ecosystem Storage Breakdown</h3>

          {ecosystemBreakdown.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 gap-2 text-fluent-textSecondaryDark">
              <Inbox className="w-8 h-8 opacity-40" />
              <p className="text-xs">No scan data yet — run a scan first.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {ecosystemBreakdown.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-fluent-textDark">{item.name}</span>
                    <span className="font-mono text-fluent-textSecondaryDark">
                      {formatSize(item.bytes)} ({item.pct}%)
                    </span>
                  </div>
                  <div className="h-2 bg-fluent-bgDark rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all duration-500`}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity ─────────────────────────────────────────────── */}
        <div className="bg-fluent-cardDark border border-fluent-cardBorderDark rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-sm text-fluent-textDark">Recent Purgo Activity History</h3>

          {recentActivity.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 gap-2 text-fluent-textSecondaryDark">
              <Inbox className="w-8 h-8 opacity-40" />
              <p className="text-xs">No items in Purgo Trash yet.</p>
            </div>
          ) : (
            <div className="space-y-2 text-xs overflow-y-auto max-h-64 pr-1">
              {recentActivity.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-fluent-bgDark border border-fluent-cardBorderDark rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="font-medium text-fluent-textDark truncate">
                        Moved {item.projectName} {item.folderName} to Purgo Trash
                      </div>
                      <div className="text-[11px] text-fluent-textSecondaryDark">
                        {formatRelativeTime(item.deletedAt)}
                      </div>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-amber-400 flex-shrink-0 ml-3">
                    {formatSize(item.sizeBytes)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
