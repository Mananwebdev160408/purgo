import React, { useMemo } from 'react';
import { useScanStore } from '../../store/useScanStore';
import { useTrashStore } from '../../store/useTrashStore';
import { useNavigationStore } from '../../store/useNavigationStore';
import { ProgressRing } from '../common/ProgressRing';
import {
  HardDrive,
  FolderGit2,
  ShieldCheck,
  Trash2,
  Lightbulb,
  ArrowRight,
  Sparkles,
  ChevronRight,
  TrendingDown,
  Layers,
  ScanLine,
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { projects, largeFiles, isScanning, activeScanLocation, lastScanTime } = useScanStore();
  const { trashItems } = useTrashStore();
  const { setActiveTab, openConfirmModal } = useNavigationStore();

  const totalProjectSize = useMemo(() => projects.reduce((acc, p) => acc + p.totalSizeBytes, 0), [projects]);
  const totalReclaimable = useMemo(() => projects.reduce((acc, p) => acc + p.reclaimableSizeBytes, 0), [projects]);
  const totalArtifactsCount = useMemo(() => projects.reduce((acc, p) => acc + p.artifacts.length, 0), [projects]);
  const totalTrashBytes = useMemo(() => trashItems.reduce((acc, item) => acc + item.sizeBytes, 0), [trashItems]);

  const reclaimPercentage = useMemo(() => {
    if (totalProjectSize === 0) return 0;
    return Math.min(100, Math.round((totalReclaimable / totalProjectSize) * 100));
  }, [totalReclaimable, totalProjectSize]);

  const formatSize = (bytes: number) => {
    if (bytes >= 1024 * 1024 * 1024) return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    return (bytes / (1024 * 1024)).toFixed(0) + ' MB';
  };

  const getEcosystemBadge = (ecosystem: string) => {
    const map: Record<string, { label: string; bg: string; text: string }> = {
      'Node.js':  { label: 'Node',  bg: 'bg-emerald-500/15 border-emerald-500/30', text: 'text-emerald-400' },
      'React':    { label: 'React', bg: 'bg-cyan-500/15 border-cyan-500/30',       text: 'text-cyan-400' },
      'Next.js':  { label: 'Next',  bg: 'bg-zinc-500/15 border-zinc-500/30',       text: 'text-zinc-200' },
      'Vite':     { label: 'Vite',  bg: 'bg-purple-500/15 border-purple-500/30',   text: 'text-purple-400' },
      'Vue':      { label: 'Vue',   bg: 'bg-emerald-500/15 border-emerald-500/30', text: 'text-emerald-400' },
      'Nuxt':     { label: 'Nuxt',  bg: 'bg-green-500/15 border-green-500/30',     text: 'text-green-400' },
      'Python':   { label: 'Py',    bg: 'bg-amber-500/15 border-amber-500/30',     text: 'text-amber-400' },
      'Rust':     { label: 'Rust',  bg: 'bg-orange-500/15 border-orange-500/30',   text: 'text-orange-400' },
      'Java':     { label: 'Java',  bg: 'bg-red-500/15 border-red-500/30',         text: 'text-red-400' },
      'Go':       { label: 'Go',    bg: 'bg-cyan-500/15 border-cyan-500/30',       text: 'text-cyan-400' },
      'Flutter':  { label: 'Dart',  bg: 'bg-sky-500/15 border-sky-500/30',         text: 'text-sky-400' },
      'C#':       { label: 'C#',    bg: 'bg-violet-500/15 border-violet-500/30',   text: 'text-violet-400' },
      'C++':      { label: 'C++',   bg: 'bg-blue-500/15 border-blue-500/30',       text: 'text-blue-400' },
      'Electron': { label: 'Elec',  bg: 'bg-teal-500/15 border-teal-500/30',       text: 'text-teal-400' },
    };
    return map[ecosystem] || { label: ecosystem.substring(0, 4), bg: 'bg-fluent-cardDark border-fluent-cardBorderDark', text: 'text-fluent-green' };
  };

  // Sort top storage consumers
  const topConsumers = useMemo(() => [...projects].sort((a, b) => b.reclaimableSizeBytes - a.reclaimableSizeBytes).slice(0, 4), [projects]);

  // Build real insights from scan data
  const heaviestProject = topConsumers[0];
  const heaviestLargeFile = useMemo(() => [...largeFiles].sort((a, b) => b.sizeBytes - a.sizeBytes)[0], [largeFiles]);
  const isElectron = typeof window !== 'undefined' && !!(window as { purgoAPI?: unknown }).purgoAPI;

  const handleCleanAllSafe = () => {
    const allSafe: {
      projectId: string;
      artifactId: string;
      path: string;
      projectName: string;
      folderName: string;
      sizeBytes: number;
      safetyReason: string;
    }[] = [];

    projects.forEach(p => {
      p.artifacts.forEach(art => {
        if (art.safety === 'safe') {
          allSafe.push({
            projectId: p.id,
            artifactId: art.id,
            path: art.path,
            projectName: p.name,
            folderName: art.name,
            sizeBytes: art.sizeBytes,
            safetyReason: art.safetyReason,
          });
        }
      });
    });

    if (allSafe.length > 0) {
      openConfirmModal(allSafe);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto animate-in fade-in duration-200">
      {/* Top Metrics Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Reclaimable */}
        <div className="bg-fluent-cardDark border border-fluent-cardBorderDark rounded-xl p-5 flex items-center justify-between shadow-xs">
          <div>
            <div className="text-xs text-fluent-textSecondaryDark font-medium">Reclaimable Storage</div>
            <div className="text-2xl font-bold text-emerald-400 mt-1">{formatSize(totalReclaimable)}</div>
            <div className="text-[11px] text-fluent-textSecondaryDark mt-1 flex items-center gap-1">
              <TrendingDown className="w-3 h-3 text-emerald-400" />
              <span>{totalArtifactsCount} recreatable folders</span>
            </div>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
            <HardDrive className="w-6 h-6" />
          </div>
        </div>

        {/* Detected Projects */}
        <div className="bg-fluent-cardDark border border-fluent-cardBorderDark rounded-xl p-5 flex items-center justify-between shadow-xs">
          <div>
            <div className="text-xs text-fluent-textSecondaryDark font-medium">Detected Projects</div>
            <div className="text-2xl font-bold text-fluent-textDark mt-1">{projects.length}</div>
            <div className="text-[11px] text-fluent-textSecondaryDark mt-1">
              across JavaScript, Rust, Java, Python
            </div>
          </div>
          <div className="p-3 bg-fluent-green/10 text-fluent-green rounded-xl border border-fluent-green/20">
            <FolderGit2 className="w-6 h-6" />
          </div>
        </div>

        {/* Safe Build Artifacts */}
        <div className="bg-fluent-cardDark border border-fluent-cardBorderDark rounded-xl p-5 flex items-center justify-between shadow-xs">
          <div>
            <div className="text-xs text-fluent-textSecondaryDark font-medium">Build Artifacts</div>
            <div className="text-2xl font-bold text-fluent-textDark mt-1">{totalArtifactsCount}</div>
            <div className="text-[11px] text-fluent-textSecondaryDark mt-1">
              node_modules, target, .next, dist
            </div>
          </div>
          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        {/* Purgo Trash */}
        <div className="bg-fluent-cardDark border border-fluent-cardBorderDark rounded-xl p-5 flex items-center justify-between shadow-xs">
          <div>
            <div className="text-xs text-fluent-textSecondaryDark font-medium">Purgo Trash Size</div>
            <div className="text-2xl font-bold text-amber-400 mt-1">{formatSize(totalTrashBytes)}</div>
            <div className="text-[11px] text-fluent-textSecondaryDark mt-1">
              {trashItems.length} items (30-day retention)
            </div>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
            <Trash2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Grid: Storage Gauge + Quick Action & Top Consumers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Storage Ring Gauge & Quick Action */}
        <div className="bg-fluent-cardDark border border-fluent-cardBorderDark rounded-xl p-6 flex flex-col justify-between space-y-6">
          <div>
            <h3 className="font-semibold text-sm text-fluent-textDark mb-1">Disk Reclaim Gauge</h3>
            <p className="text-xs text-fluent-textSecondaryDark">Potential storage savings after cleaning safe build folders.</p>
          </div>

          <div className="flex flex-col items-center justify-center py-2">
            <ProgressRing
              percentage={reclaimPercentage}
              size={170}
              strokeWidth={12}
              label={formatSize(totalReclaimable)}
              sublabel={`${reclaimPercentage}% Safe Reclaimable`}
            />
          </div>

          <div className="space-y-3">
            <button
              onClick={handleCleanAllSafe}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-fluent-green hover:bg-fluent-greenHover text-white text-xs font-semibold rounded-lg shadow-md transition-all active:scale-[0.99]"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Clean All Safe Build Artifacts ({formatSize(totalReclaimable)})</span>
            </button>
            <button
              onClick={() => setActiveTab('artifacts')}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-4 bg-fluent-bgDark hover:bg-fluent-hoverDark text-fluent-textSecondaryDark hover:text-fluent-textDark text-xs font-medium border border-fluent-cardBorderDark rounded-lg transition-colors"
            >
              <span>View Artifacts Breakdown</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Top Storage Consumers List */}
        <div className="lg:col-span-2 bg-fluent-cardDark border border-fluent-cardBorderDark rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-sm text-fluent-textDark">Largest Storage Consumers</h3>
                <p className="text-xs text-fluent-textSecondaryDark">Projects consuming the highest amount of recreatable disk space.</p>
              </div>
              <button
                onClick={() => setActiveTab('analyzer')}
                className="text-xs text-fluent-green hover:underline font-medium flex items-center gap-1"
              >
                <span>WinDirStat View</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3">
              {topConsumers.map((proj) => (
                <div
                  key={proj.id}
                  className="flex items-center justify-between p-3.5 bg-fluent-bgDark border border-fluent-cardBorderDark rounded-xl hover:border-fluent-green/40 transition-all"
                >
                  <div className="flex items-center gap-3">
                    {(() => {
                      const badge = getEcosystemBadge(proj.ecosystem);
                      return (
                        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center font-bold text-[11px] font-mono shadow-xs ${badge.bg} ${badge.text}`}>
                          {badge.label}
                        </div>
                      );
                    })()}
                    <div>
                      <div className="text-xs font-semibold text-fluent-textDark">{proj.name}</div>
                      <div className="text-[11px] text-fluent-textSecondaryDark font-mono mt-0.5">{proj.path}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-emerald-400 font-mono">{formatSize(proj.reclaimableSizeBytes)}</div>
                    <div className="text-[10px] text-fluent-textSecondaryDark mt-0.5">
                      {proj.artifacts.length} safe folders
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-fluent-cardBorderDark flex items-center justify-between text-xs text-fluent-textSecondaryDark">
            <span>Showing top 4 of {projects.length} scanned developer projects</span>
            <button onClick={() => setActiveTab('artifacts')} className="text-fluent-green font-medium hover:underline">
              View all project artifacts &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Smart Insights Cards */}
      <div className="bg-fluent-cardDark border border-fluent-cardBorderDark rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          <h3 className="font-semibold text-sm text-fluent-textDark">Smart Developer Insights</h3>
        </div>

        {!isElectron && (
          <div className="flex items-center gap-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs text-amber-300">
            <ScanLine className="w-4 h-4 shrink-0" />
            <span>Purgo is running in browser preview mode. Launch via <code className="font-mono bg-amber-500/10 px-1 rounded">npm run electron:dev</code> to enable real filesystem scanning.</span>
          </div>
        )}

        {isScanning && (
          <div className="flex items-center gap-3 p-3 bg-fluent-green/10 border border-fluent-green/30 rounded-lg text-xs text-fluent-green">
            <ScanLine className="w-4 h-4 shrink-0 animate-pulse" />
            <span>Scanning <code className="font-mono">{activeScanLocation}</code> — results will appear as scan completes.</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {heaviestProject ? (
            <div className="p-4 bg-fluent-bgDark border border-fluent-cardBorderDark rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-fluent-textDark">
                <Sparkles className="w-3.5 h-3.5 text-fluent-green" />
                <span>Largest Build Folder</span>
              </div>
              <p className="text-xs text-fluent-textSecondaryDark">
                <span className="text-fluent-textDark font-medium">{heaviestProject.name}</span> holds{' '}
                <strong className="text-emerald-400">{formatSize(heaviestProject.reclaimableSizeBytes)}</strong> in{' '}
                {heaviestProject.artifacts.length} artifact {heaviestProject.artifacts.length === 1 ? 'folder' : 'folders'}. All safely removable.
              </p>
            </div>
          ) : (
            <div className="p-4 bg-fluent-bgDark border border-fluent-cardBorderDark rounded-xl space-y-2 opacity-50">
              <div className="flex items-center gap-2 text-xs font-semibold text-fluent-textDark">
                <Sparkles className="w-3.5 h-3.5 text-fluent-green" />
                <span>Largest Build Folder</span>
              </div>
              <p className="text-xs text-fluent-textSecondaryDark">Run a scan to detect developer build artifacts on this machine.</p>
            </div>
          )}

          {heaviestLargeFile ? (
            <div className="p-4 bg-fluent-bgDark border border-fluent-cardBorderDark rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-fluent-textDark">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Heaviest Single File</span>
              </div>
              <p className="text-xs text-fluent-textSecondaryDark">
                <span className="text-fluent-textDark font-medium">{heaviestLargeFile.name}</span> is{' '}
                <strong className="text-amber-400">{formatSize(heaviestLargeFile.sizeBytes)}</strong>.
                {' '}Review it in <button onClick={() => setActiveTab('large-files')} className="text-fluent-green hover:underline">Large File Finder</button>.
              </p>
            </div>
          ) : (
            <div className="p-4 bg-fluent-bgDark border border-fluent-cardBorderDark rounded-xl space-y-2 opacity-50">
              <div className="flex items-center gap-2 text-xs font-semibold text-fluent-textDark">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Heaviest Single File</span>
              </div>
              <p className="text-xs text-fluent-textSecondaryDark">No large files found yet. Scan a directory to detect them.</p>
            </div>
          )}

          <div className="p-4 bg-fluent-bgDark border border-fluent-cardBorderDark rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-fluent-textDark">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Purgo Trash Safety Guarantee</span>
            </div>
            <p className="text-xs text-fluent-textSecondaryDark">
              {trashItems.length > 0
                ? <>You have <strong className="text-amber-400">{trashItems.length} item{trashItems.length !== 1 ? 's' : ''}</strong> ({formatSize(totalTrashBytes)}) safely stored in Purgo Trash — restorable for 30 days.</>
                : <>Purgo never permanently deletes files immediately. All items remain restorable for 30 days in <span className="text-fluent-green font-medium">Purgo Trash</span>.</>
              }
            </p>
          </div>
        </div>
        {lastScanTime && (
          <div className="text-[11px] text-fluent-textSecondaryDark pt-1">
            Last scan: {new Date(lastScanTime).toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
};
