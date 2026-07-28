import React, { useState, useMemo } from 'react';
import { useScanStore } from '../../store/useScanStore';
import { useNavigationStore } from '../../store/useNavigationStore';
import { SafetyBadge } from '../common/SafetyBadge';
import { SafetyLevel } from '../../types/project';
import { ShieldCheck, Trash2, Filter, CheckSquare, Square, RefreshCw, Info } from 'lucide-react';

export const SafeArtifactsView: React.FC = () => {
  const { projects, toggleArtifactSelection, toggleSelectAllSafeArtifacts, clearArtifactSelections } = useScanStore();
  const { searchQuery, openConfirmModal } = useNavigationStore();

  const [filterSafety, setFilterSafety] = useState<string>('all');
  const [filterFramework, setFilterFramework] = useState<string>('all');

  // Flatten all artifacts across projects memoized
  const allArtifacts = useMemo(() => {
    return projects.flatMap(p => 
      p.artifacts.map(art => ({
        projectId: p.id,
        projectName: p.name,
        ecosystem: p.ecosystem,
        artifact: art,
      }))
    );
  }, [projects]);

  const filteredArtifacts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return allArtifacts.filter(item => {
      const matchesSearch = !query ||
        item.projectName.toLowerCase().includes(query) ||
        item.artifact.name.toLowerCase().includes(query) ||
        item.artifact.path.toLowerCase().includes(query);
      
      const matchesSafety = filterSafety === 'all' || item.artifact.safety === filterSafety;
      const matchesFramework = filterFramework === 'all' || item.ecosystem === filterFramework;

      return matchesSearch && matchesSafety && matchesFramework;
    });
  }, [allArtifacts, searchQuery, filterSafety, filterFramework]);

  const selectedItems = useMemo(() => filteredArtifacts.filter(item => item.artifact.isSelected), [filteredArtifacts]);
  const selectedBytes = useMemo(() => selectedItems.reduce((acc, item) => acc + item.artifact.sizeBytes, 0), [selectedItems]);

  const formatSize = (bytes: number) => {
    if (bytes >= 1024 * 1024 * 1024) return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    return (bytes / (1024 * 1024)).toFixed(0) + ' MB';
  };

  const handleSelectOver1GB = () => {
    projects.forEach(p => {
      p.artifacts.forEach(art => {
        if (art.sizeBytes >= 1024 * 1024 * 1024) {
          if (!art.isSelected) {
            toggleArtifactSelection(p.id, art.id);
          }
        }
      });
    });
  };

  const handleBulkTrash = () => {
    if (selectedItems.length === 0) return;
    const itemsToTrash = selectedItems.map(item => ({
      projectId: item.projectId,
      artifactId: item.artifact.id,
      path: item.artifact.path,
      projectName: item.projectName,
      folderName: item.artifact.name,
      sizeBytes: item.artifact.sizeBytes,
      safetyReason: item.artifact.safetyReason,
    }));
    openConfirmModal(itemsToTrash);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto animate-in fade-in duration-200">
      {/* Header Info */}
      <div className="flex items-center justify-between bg-fluent-cardDark border border-fluent-cardBorderDark rounded-xl p-5 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-base text-fluent-textDark">Safe Build Artifact Cleaner</h2>
            <p className="text-xs text-fluent-textSecondaryDark">Recreatable build outputs and dependency caches safe for removal.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {selectedItems.length > 0 && (
            <button
              onClick={handleBulkTrash}
              className="flex items-center gap-2 px-4 py-2 bg-fluent-blue hover:bg-fluent-blueHover text-white text-xs font-semibold rounded-lg shadow-md transition-all"
            >
              <Trash2 className="w-4 h-4" />
              <span>Move Selected to Purgo Trash ({formatSize(selectedBytes)})</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Toolbar & Bulk Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-fluent-cardDark border border-fluent-cardBorderDark rounded-xl p-4 text-xs">
        {/* Quick Selection Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleSelectAllSafeArtifacts(true)}
            className="px-3 py-1.5 bg-fluent-bgDark border border-fluent-cardBorderDark hover:bg-fluent-hoverDark text-fluent-textDark rounded-lg font-medium transition-colors"
          >
            Select All Safe
          </button>
          <button
            onClick={handleSelectOver1GB}
            className="px-3 py-1.5 bg-fluent-bgDark border border-fluent-cardBorderDark hover:bg-fluent-hoverDark text-fluent-textDark rounded-lg font-medium transition-colors"
          >
            Select &gt; 1 GB
          </button>
          <button
            onClick={clearArtifactSelections}
            className="px-3 py-1.5 bg-fluent-bgDark border border-fluent-cardBorderDark hover:bg-fluent-hoverDark text-fluent-textSecondaryDark hover:text-fluent-textDark rounded-lg font-medium transition-colors"
          >
            Deselect All
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-fluent-textSecondaryDark" />
            <span className="text-fluent-textSecondaryDark font-medium">Safety:</span>
            <select
              value={filterSafety}
              onChange={(e) => setFilterSafety(e.target.value)}
              className="bg-fluent-bgDark border border-fluent-cardBorderDark text-fluent-textDark rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-fluent-blue"
            >
              <option value="all">All Ratings</option>
              <option value="safe">Safe Only</option>
              <option value="review">Review Only</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-fluent-textSecondaryDark font-medium">Ecosystem:</span>
            <select
              value={filterFramework}
              onChange={(e) => setFilterFramework(e.target.value)}
              className="bg-fluent-bgDark border border-fluent-cardBorderDark text-fluent-textDark rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-fluent-blue"
            >
              <option value="all">All Ecosystems</option>
              <option value="Next.js">Next.js</option>
              <option value="Rust">Rust</option>
              <option value="Java">Java</option>
              <option value="Flutter">Flutter</option>
              <option value="Python">Python</option>
            </select>
          </div>
        </div>
      </div>

      {/* High Density Data Table */}
      <div className="bg-fluent-cardDark border border-fluent-cardBorderDark rounded-xl overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-fluent-hoverDark/50 border-b border-fluent-cardBorderDark text-fluent-textSecondaryDark font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4 w-10">Select</th>
              <th className="py-3 px-4">Project & Artifact Folder</th>
              <th className="py-3 px-4">Ecosystem</th>
              <th className="py-3 px-4">Safety Rating</th>
              <th className="py-3 px-4 text-right">Size</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-fluent-cardBorderDark">
            {filteredArtifacts.map(({ projectId, projectName, ecosystem, artifact }) => (
              <tr key={artifact.id} className="hover:bg-fluent-hoverDark/40 transition-colors group">
                <td className="py-3 px-4">
                  <button
                    onClick={() => toggleArtifactSelection(projectId, artifact.id)}
                    className="text-fluent-textSecondaryDark hover:text-fluent-blue transition-colors"
                  >
                    {artifact.isSelected ? (
                      <CheckSquare className="w-4 h-4 text-fluent-blue" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </td>
                <td className="py-3 px-4">
                  <div>
                    <span className="font-semibold text-fluent-textDark">{projectName}</span>
                    <span className="text-fluent-textSecondaryDark font-mono font-medium"> / {artifact.name}</span>
                    <div className="text-[11px] font-mono text-fluent-textSecondaryDark truncate max-w-md mt-0.5" title={artifact.path}>
                      {artifact.path}
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded bg-fluent-bgDark border border-fluent-cardBorderDark font-mono text-[11px] text-fluent-textSecondaryDark">
                    {ecosystem}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <SafetyBadge safety={artifact.safety} reason={artifact.safetyReason} />
                </td>
                <td className="py-3 px-4 text-right font-mono font-bold text-emerald-400">
                  {formatSize(artifact.sizeBytes)}
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() =>
                      openConfirmModal([
                        {
                          projectId,
                          artifactId: artifact.id,
                          path: artifact.path,
                          projectName,
                          folderName: artifact.name,
                          sizeBytes: artifact.sizeBytes,
                          safetyReason: artifact.safetyReason,
                        },
                      ])
                    }
                    className="p-1.5 text-fluent-textSecondaryDark hover:text-amber-400 hover:bg-fluent-hoverDark rounded-lg transition-colors"
                    title="Move to Purgo Trash"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
