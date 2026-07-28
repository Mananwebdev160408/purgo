import React from 'react';
import { useScanStore } from '../../store/useScanStore';
import { useNavigationStore } from '../../store/useNavigationStore';
import { Copy, Trash2, ShieldCheck } from 'lucide-react';

export const DuplicatesView: React.FC = () => {
  const { duplicates } = useScanStore();
  const { openConfirmModal } = useNavigationStore();

  const totalPotentialSavings = duplicates.reduce((acc, d) => acc + d.potentialSavingsBytes, 0);

  const formatSize = (bytes: number) => {
    if (bytes >= 1024 * 1024 * 1024) return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    return (bytes / (1024 * 1024)).toFixed(0) + ' MB';
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto animate-in fade-in duration-200">
      <div className="flex items-center justify-between bg-fluent-cardDark border border-fluent-cardBorderDark rounded-xl p-5 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-fluent-green/10 text-fluent-green rounded-xl border border-fluent-green/20">
            <Copy className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-base text-fluent-textDark">Duplicate File & Repository Detector</h2>
            <p className="text-xs text-fluent-textSecondaryDark">Identify identical archives, redundant cloned repositories, and duplicate installers.</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-fluent-textSecondaryDark">Potential Storage Savings</div>
          <div className="text-xl font-bold text-emerald-400 font-mono">{formatSize(totalPotentialSavings)}</div>
        </div>
      </div>

      <div className="space-y-4">
        {duplicates.map((group) => (
          <div key={group.id} className="bg-fluent-cardDark border border-fluent-cardBorderDark rounded-xl overflow-hidden shadow-xs">
            <div className="px-5 py-3.5 bg-fluent-hoverDark/40 border-b border-fluent-cardBorderDark flex items-center justify-between">
              <div>
                <span className="font-semibold text-xs text-fluent-textDark">{group.name}</span>
                <span className="ml-3 text-[11px] text-fluent-textSecondaryDark font-mono">({group.files.length} duplicate copies)</span>
              </div>
              <div className="text-xs font-mono font-bold text-emerald-400">
                Savings: {formatSize(group.potentialSavingsBytes)}
              </div>
            </div>

            <div className="divide-y divide-fluent-cardBorderDark text-xs">
              {group.files.map((file, idx) => (
                <div key={file.id} className="px-5 py-3 flex items-center justify-between hover:bg-fluent-hoverDark/30">
                  <div className="flex items-center gap-3">
                    <span className="w-5 text-center text-fluent-textSecondaryDark font-mono">{idx + 1}.</span>
                    <div>
                      <div className="font-mono text-fluent-textDark truncate max-w-xl" title={file.path}>{file.path}</div>
                      <div className="text-[10px] text-fluent-textSecondaryDark mt-0.5">Modified: {new Date(file.lastModified).toLocaleDateString()}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-mono font-semibold text-fluent-textDark">{formatSize(group.sizeBytes)}</span>
                    <button
                      onClick={() =>
                        openConfirmModal([
                          {
                            artifactId: file.id,
                            path: file.path,
                            projectName: 'Duplicate Copy',
                            folderName: group.name,
                            sizeBytes: group.sizeBytes,
                            safetyReason: 'Duplicate file copy',
                          },
                        ])
                      }
                      className="px-2.5 py-1 bg-fluent-bgDark border border-fluent-cardBorderDark hover:bg-rose-500/20 hover:text-rose-400 text-fluent-textSecondaryDark rounded transition-colors text-[11px]"
                    >
                      Trash Duplicate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
