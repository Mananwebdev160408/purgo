import React, { useState } from 'react';
import { useScanStore } from '../../store/useScanStore';
import { useNavigationStore } from '../../store/useNavigationStore';
import { ApiBridge } from '../../services/apiBridge';
import { SafetyBadge } from '../common/SafetyBadge';
import { Database, Trash2, Zap, AlertCircle } from 'lucide-react';

export const CacheManagerView: React.FC = () => {
  const { caches, removeCacheFromStore } = useScanStore();
  const {
    openConfirmModal,
    startGlobalOperation,
    updateGlobalOperationProgress,
    finishGlobalOperation,
  } = useNavigationStore();
  const [purgingCacheId, setPurgingCacheId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const totalCacheBytes = caches.reduce((acc, c) => acc + c.sizeBytes, 0);

  const formatSize = (bytes: number) => {
    if (bytes >= 1024 * 1024 * 1024) return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    return (bytes / (1024 * 1024)).toFixed(0) + ' MB';
  };

  const handleDirectPurge = async (cacheId: string, cachePath: string, cacheName: string) => {
    setErrorMessage(null);
    setPurgingCacheId(cacheId);
    startGlobalOperation('Purging Cache Folder', `Removing ${cacheName} from disk...`, 1);
    updateGlobalOperationProgress(1, cacheName);

    try {
      await ApiBridge.purgePathPermanently(cachePath);
      removeCacheFromStore(cacheId);
    } catch (err: any) {
      console.error(`Failed to purge ${cachePath}:`, err);
      setErrorMessage(err?.message || `Failed to purge ${cacheName}. Files may be in use by an active process.`);
    } finally {
      setPurgingCacheId(null);
      setTimeout(() => {
        finishGlobalOperation();
      }, 400);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto animate-in fade-in duration-200">
      <div className="flex items-center justify-between bg-fluent-cardDark border border-fluent-cardBorderDark rounded-xl p-5 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-fluent-blue/10 text-fluent-blue rounded-xl border border-fluent-blue/20">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-base text-fluent-textDark">Ecosystem Cache Manager</h2>
            <p className="text-xs text-fluent-textSecondaryDark">Manage global package manager caches for npm, pnpm, yarn, cargo, gradle, pub, and VS Code extensions.</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-fluent-textSecondaryDark">Total Cache Size</div>
          <div className="text-xl font-bold text-fluent-textDark font-mono">{formatSize(totalCacheBytes)}</div>
        </div>
      </div>

      {errorMessage && (
        <div className="flex items-start gap-3 p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block text-rose-200">Cache Action Interrupted</span>
            <span>{errorMessage}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {caches.map((cache) => (
          <div key={cache.id} className="bg-fluent-cardDark border border-fluent-cardBorderDark rounded-xl p-5 space-y-4 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-fluent-textDark">{cache.name}</span>
                <SafetyBadge safety={cache.safety} />
              </div>
              <p className="text-xs text-fluent-textSecondaryDark mt-1">{cache.description}</p>
              <div className="text-[11px] font-mono text-fluent-textSecondaryDark bg-fluent-bgDark border border-fluent-cardBorderDark rounded px-2 py-1 mt-3 truncate" title={cache.path}>
                {cache.path}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-fluent-cardBorderDark gap-2">
              <span className="text-sm font-bold font-mono text-emerald-400">{formatSize(cache.sizeBytes)}</span>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDirectPurge(cache.id, cache.path, cache.name)}
                  disabled={purgingCacheId === cache.id}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600/20 border border-rose-500/30 hover:bg-rose-600 hover:text-white text-rose-400 text-xs font-semibold rounded-lg transition-colors disabled:opacity-50"
                  title="Directly delete cache folder to instantly free disk space"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>{purgingCacheId === cache.id ? 'Purging...' : 'Purge & Free Storage'}</span>
                </button>

                <button
                  onClick={() =>
                    openConfirmModal([
                      {
                        artifactId: cache.id,
                        path: cache.path,
                        projectName: cache.ecosystem,
                        folderName: cache.name,
                        sizeBytes: cache.sizeBytes,
                        safetyReason: cache.description,
                      },
                    ])
                  }
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-fluent-bgDark border border-fluent-cardBorderDark hover:bg-fluent-hoverDark text-fluent-textSecondaryDark hover:text-fluent-textDark text-xs font-medium rounded-lg transition-colors"
                  title="Move cache to Purgo Trash (Reversible 30-day retention)"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Trash</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
