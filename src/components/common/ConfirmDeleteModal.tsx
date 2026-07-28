import React, { useState } from 'react';
import { useNavigationStore } from '../../store/useNavigationStore';
import { useTrashStore } from '../../store/useTrashStore';
import { useScanStore } from '../../store/useScanStore';
import { ShieldCheck, Trash2, X, RefreshCw, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';

export const ConfirmDeleteModal: React.FC = () => {
  const { isConfirmModalOpen, pendingDeleteItems, closeConfirmModal } = useNavigationStore();
  const { moveToTrash } = useTrashStore();
  const { removeArtifactFromStore, removeLargeFileFromStore, removeCacheFromStore, removePathFromStore } = useScanStore();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentItemName, setCurrentItemName] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isConfirmModalOpen || pendingDeleteItems.length === 0) return null;

  const totalBytes = pendingDeleteItems.reduce((acc, item) => acc + item.sizeBytes, 0);

  const formatSize = (bytes: number) => {
    if (bytes >= 1024 * 1024 * 1024) return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleClose = () => {
    setErrorMessage(null);
    setIsProcessing(false);
    setCurrentIndex(0);
    setCurrentItemName('');
    setIsCompleted(false);
    closeConfirmModal();
  };

  const handleConfirm = async () => {
    setErrorMessage(null);
    setIsProcessing(true);
    setIsCompleted(false);
    let successCount = 0;

    for (let i = 0; i < pendingDeleteItems.length; i++) {
      const item = pendingDeleteItems[i];
      setCurrentIndex(i + 1);
      setCurrentItemName(item.folderName || item.projectName || 'Item');

      try {
        await moveToTrash(item.path, item.projectName, item.folderName, item.sizeBytes);
        removePathFromStore(item.path);
        if (item.projectId && item.artifactId) {
          removeArtifactFromStore(item.projectId, item.artifactId);
        } else if (item.artifactId) {
          removeLargeFileFromStore(item.artifactId);
          removeCacheFromStore(item.artifactId);
        }
        successCount++;
      } catch (err: any) {
        console.error(`Failed to move ${item.path} to Purgo Trash:`, err);
        setErrorMessage(err?.message || `Failed to move ${item.folderName} (${item.path}) to Purgo Trash.`);
      }
    }

    if (successCount === pendingDeleteItems.length) {
      setIsCompleted(true);
      setTimeout(() => {
        handleClose();
      }, 600);
    } else {
      setIsProcessing(false);
    }
  };

  const progressPct = pendingDeleteItems.length > 0
    ? Math.min(100, Math.round((currentIndex / pendingDeleteItems.length) * 100))
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-fluent-cardDark border border-fluent-cardBorderDark text-fluent-textDark w-full max-w-xl rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-fluent-cardBorderDark bg-fluent-hoverDark/40">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-fluent-blue/20 text-fluent-blue rounded-lg">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg tracking-tight">Confirm Move to Purgo Trash</h3>
              <p className="text-xs text-fluent-textSecondaryDark">No permanent deletion will occur immediately.</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isProcessing}
            className="p-1.5 rounded-lg hover:bg-fluent-hoverDark text-fluent-textSecondaryDark hover:text-fluent-textDark transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {isProcessing ? (
          <div className="p-8 text-center space-y-5 flex flex-col items-center">
            {isCompleted ? (
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-base text-fluent-textDark">Items Moved to Purgo Trash!</h4>
                <p className="text-xs text-fluent-textSecondaryDark">Updating workspace statistics...</p>
              </div>
            ) : (
              <>
                <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-fluent-blue/10 border border-fluent-blue/30 text-fluent-blue">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-fluent-textDark">Moving Items to Purgo Trash</h4>
                  <p className="text-xs text-fluent-textSecondaryDark mt-1">Please wait while folder references are safely relocated...</p>
                </div>
                <div className="w-full space-y-2 max-w-md">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-fluent-textDark truncate max-w-[240px]" title={currentItemName}>
                      {currentItemName || 'Processing...'}
                    </span>
                    <span className="font-mono text-emerald-400 font-bold">{progressPct}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-fluent-bgDark rounded-full overflow-hidden border border-fluent-cardBorderDark">
                    <div
                      className="h-full bg-gradient-to-r from-fluent-blue to-emerald-400 transition-all duration-200 rounded-full"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-fluent-textSecondaryDark font-mono">
                    Item {currentIndex} of {pendingDeleteItems.length}
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="p-6 space-y-5 overflow-y-auto max-h-[60vh]">
            {/* Error Notice */}
            {errorMessage && (
              <div className="flex items-start gap-3 p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-lg text-xs text-rose-300">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-semibold block text-rose-200">Move Operation Incomplete</span>
                  <span>{errorMessage}</span>
                </div>
              </div>
            )}

            {/* Reclaimable Banner */}
            <div className="flex items-center justify-between p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                <div>
                  <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">Reclaimable Storage</div>
                  <div className="text-xl font-bold text-emerald-300">{formatSize(totalBytes)}</div>
                </div>
              </div>
              <div className="text-right text-xs text-emerald-400/80">
                {pendingDeleteItems.length} {pendingDeleteItems.length === 1 ? 'item' : 'items'} selected
              </div>
            </div>

            {/* Safety Notice */}
            <div className="flex items-start gap-3 p-3.5 bg-fluent-blue/10 border border-fluent-blue/30 rounded-lg text-xs text-fluent-textSecondaryDark">
              <RefreshCw className="w-4 h-4 text-fluent-blue shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-fluent-textDark">Reversible Action: </span>
                These files will be safely moved into <span className="text-fluent-blue font-medium">Purgo Trash</span> with a 30-day retention period. You can restore them to their original location anytime before auto-purge.
              </div>
            </div>

            {/* Items List */}
            <div>
              <div className="text-xs font-semibold uppercase text-fluent-textSecondaryDark mb-2">Target Artifacts / Caches:</div>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {pendingDeleteItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg bg-fluent-bgDark border border-fluent-cardBorderDark text-xs"
                  >
                    <div className="truncate mr-4">
                      <span className="font-medium text-fluent-textDark">{item.projectName}</span>
                      <span className="text-fluent-textSecondaryDark"> / {item.folderName}</span>
                      <div className="text-[11px] font-mono text-fluent-textSecondaryDark truncate mt-0.5" title={item.path}>
                        {item.path}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-semibold font-mono text-fluent-textDark">{formatSize(item.sizeBytes)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        {!isProcessing && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-fluent-cardBorderDark bg-fluent-hoverDark/20">
            <button
              onClick={handleClose}
              disabled={isProcessing}
              className="px-4 py-2 text-sm font-medium text-fluent-textSecondaryDark hover:text-fluent-textDark hover:bg-fluent-hoverDark rounded-lg transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={isProcessing}
              className="flex items-center gap-2 px-5 py-2 text-sm font-semibold bg-fluent-blue hover:bg-fluent-blueHover text-white rounded-lg shadow-md transition-all active:scale-[0.98] disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
              <span>Move to Purgo Trash</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

