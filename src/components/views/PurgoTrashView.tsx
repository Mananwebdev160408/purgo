import React from 'react';
import { useTrashStore } from '../../store/useTrashStore';
import { useNavigationStore } from '../../store/useNavigationStore';
import { Trash2, RotateCcw, Trash, ShieldCheck, Clock, AlertTriangle, AlertCircle } from 'lucide-react';

export const PurgoTrashView: React.FC = () => {
  const {
    trashItems,
    retentionDays,
    restoreItem,
    deletePermanently,
    emptyTrash,
    toggleItemSelection,
    selectAll,
  } = useTrashStore();

  const {
    startGlobalOperation,
    updateGlobalOperationProgress,
    finishGlobalOperation,
  } = useNavigationStore();

  const selectedItems = trashItems.filter((i) => i.isSelected);
  const totalTrashBytes = trashItems.reduce((acc, item) => acc + item.sizeBytes, 0);

  const formatSize = (bytes: number) => {
    if (bytes >= 1024 * 1024 * 1024) return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    return (bytes / (1024 * 1024)).toFixed(0) + ' MB';
  };

  const handleRestoreSelected = async () => {
    if (selectedItems.length === 0) return;
    startGlobalOperation(
      'Restoring Selected Items',
      'Moving folders back to their original disk locations...',
      selectedItems.length
    );

    for (let i = 0; i < selectedItems.length; i++) {
      const item = selectedItems[i];
      updateGlobalOperationProgress(i + 1, `${item.projectName} / ${item.folderName}`);
      await restoreItem(item.id);
    }

    setTimeout(() => {
      finishGlobalOperation();
    }, 400);
  };

  const handleDeletePermanentlySelected = async () => {
    if (selectedItems.length === 0) return;
    startGlobalOperation(
      'Deleting Items Permanently',
      'Removing selected items from disk storage...',
      selectedItems.length
    );

    for (let i = 0; i < selectedItems.length; i++) {
      const item = selectedItems[i];
      updateGlobalOperationProgress(i + 1, `${item.projectName} / ${item.folderName}`);
      await deletePermanently(item.id);
    }

    setTimeout(() => {
      finishGlobalOperation();
    }, 400);
  };

  const handleEmptyTrash = async () => {
    if (trashItems.length === 0) return;
    startGlobalOperation(
      'Emptying Purgo Trash',
      'Permanently clearing all items stored in Purgo Trash...',
      trashItems.length
    );

    for (let i = 0; i < trashItems.length; i++) {
      const item = trashItems[i];
      updateGlobalOperationProgress(i + 1, `${item.projectName} / ${item.folderName}`);
      await deletePermanently(item.id);
    }

    setTimeout(() => {
      finishGlobalOperation();
    }, 400);
  };

  const handleRestoreSingle = async (id: string, name: string) => {
    startGlobalOperation('Restoring Item', 'Relocating item to original folder path...', 1);
    updateGlobalOperationProgress(1, name);
    await restoreItem(id);
    setTimeout(() => {
      finishGlobalOperation();
    }, 400);
  };

  const handleDeleteSingle = async (id: string, name: string) => {
    startGlobalOperation('Permanently Deleting Item', 'Removing item from disk...', 1);
    updateGlobalOperationProgress(1, name);
    await deletePermanently(id);
    setTimeout(() => {
      finishGlobalOperation();
    }, 400);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="flex items-center justify-between bg-fluent-cardDark border border-fluent-cardBorderDark rounded-xl p-5 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
            <Trash2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-base text-fluent-textDark">Purgo Trash Center</h2>
            <p className="text-xs text-fluent-textSecondaryDark">
              Reversible storage management. Items auto-purge after {retentionDays} days unless restored.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {selectedItems.length > 0 && (
            <>
              <button
                onClick={handleRestoreSelected}
                className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restore Selected ({selectedItems.length})</span>
              </button>
              <button
                onClick={handleDeletePermanentlySelected}
                className="flex items-center gap-1.5 px-3 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
              >
                <Trash className="w-3.5 h-3.5" />
                <span>Delete Permanently</span>
              </button>
            </>
          )}

          {trashItems.length > 0 && (
            <button
              onClick={handleEmptyTrash}
              className="flex items-center gap-1.5 px-4 py-2 bg-fluent-bgDark border border-fluent-cardBorderDark hover:bg-rose-500/20 hover:text-rose-400 text-fluent-textSecondaryDark text-xs font-medium rounded-lg transition-colors"
            >
              <Trash className="w-3.5 h-3.5" />
              <span>Empty Purgo Trash ({formatSize(totalTrashBytes)})</span>
            </button>
          )}
        </div>
      </div>

      {/* Reversibility Assurance Box */}
      <div className="p-4 bg-fluent-blue/10 border border-fluent-blue/30 rounded-xl flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-fluent-blue" />
          <div>
            <span className="font-semibold text-fluent-textDark">Safety Guarantee: </span>
            Restoring an item reinstates the exact original folder structure and path on your computer.
          </div>
        </div>
        <div className="text-fluent-textSecondaryDark font-mono">
          Total Trash Size: <strong className="text-amber-400">{formatSize(totalTrashBytes)}</strong>
        </div>
      </div>

      {/* Trash Items Table */}
      <div className="bg-fluent-cardDark border border-fluent-cardBorderDark rounded-xl overflow-hidden shadow-xs">
        {trashItems.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Trash2 className="w-10 h-10 text-fluent-textSecondaryDark mx-auto opacity-50" />
            <div className="text-sm font-semibold text-fluent-textDark">Purgo Trash is Empty</div>
            <p className="text-xs text-fluent-textSecondaryDark max-w-sm mx-auto">
              Any build artifacts or folders moved to trash will appear here for up to {retentionDays} days.
            </p>
          </div>
        ) : (
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-fluent-hoverDark/50 border-b border-fluent-cardBorderDark text-fluent-textSecondaryDark font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 w-10">Select</th>
                <th className="py-3 px-4">Project & Trash Folder</th>
                <th className="py-3 px-4">Original Path</th>
                <th className="py-3 px-4">Retention Status</th>
                <th className="py-3 px-4 text-right">Size</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-fluent-cardBorderDark">
              {trashItems.map((item) => (
                <tr key={item.id} className="hover:bg-fluent-hoverDark/40 transition-colors">
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={!!item.isSelected}
                      onChange={() => toggleItemSelection(item.id)}
                      className="rounded border-fluent-cardBorderDark accent-fluent-blue cursor-pointer"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-fluent-textDark">{item.projectName}</div>
                    <div className="text-fluent-textSecondaryDark font-mono">{item.folderName}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-[11px] font-mono text-fluent-textSecondaryDark truncate max-w-xs" title={item.originalPath}>
                      {item.originalPath}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5 text-amber-400 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{item.daysRemaining} days left</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-fluent-textDark">
                    {formatSize(item.sizeBytes)}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => handleRestoreSingle(item.id, `${item.projectName} / ${item.folderName}`)}
                      className="px-2.5 py-1 bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white rounded border border-emerald-500/30 transition-colors font-medium text-[11px]"
                      title="Restore folder to original location"
                    >
                      Restore
                    </button>
                    <button
                      onClick={() => handleDeleteSingle(item.id, `${item.projectName} / ${item.folderName}`)}
                      className="px-2.5 py-1 bg-rose-600/20 text-rose-400 hover:bg-rose-600 hover:text-white rounded border border-rose-500/30 transition-colors font-medium text-[11px]"
                      title="Permanently remove item"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

