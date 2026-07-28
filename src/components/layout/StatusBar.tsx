import React from 'react';
import { useScanStore } from '../../store/useScanStore';
import { useTrashStore } from '../../store/useTrashStore';
import { ShieldCheck, HardDrive, Cpu } from 'lucide-react';

export const StatusBar: React.FC = () => {
  const { isScanning, scanProgressPath, projects, lastScanTime } = useScanStore();
  const { trashItems } = useTrashStore();

  const totalReclaimable = projects.reduce((acc, p) => acc + p.reclaimableSizeBytes, 0);
  const totalTrashBytes = trashItems.reduce((acc, item) => acc + item.sizeBytes, 0);

  const formatSize = (bytes: number) => {
    if (bytes >= 1024 * 1024 * 1024) return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    return (bytes / (1024 * 1024)).toFixed(0) + ' MB';
  };

  return (
    <div className="h-7 bg-fluent-cardDark border-t border-fluent-cardBorderDark px-4 flex items-center justify-between text-[11px] text-fluent-textSecondaryDark select-none">
      {/* Left Progress or Status */}
      <div className="flex items-center gap-3 truncate max-w-lg">
        {isScanning ? (
          <div className="flex items-center gap-2 text-fluent-green">
            <div className="w-2.5 h-2.5 border-2 border-fluent-green border-t-transparent rounded-full animate-spin" />
            <span className="font-mono truncate">Scanning: {scanProgressPath}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-fluent-textDark font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ready. {projects.length} Projects Analyzed</span>
          </div>
        )}
      </div>

      {/* Right Metrics */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-1.5">
          <HardDrive className="w-3.5 h-3.5 text-fluent-textSecondaryDark" />
          <span>Reclaimable: <strong className="text-emerald-400 font-mono">{formatSize(totalReclaimable)}</strong></span>
        </div>
        <div className="flex items-center gap-1.5">
          <span>Purgo Trash: <strong className="text-amber-400 font-mono">{formatSize(totalTrashBytes)}</strong></span>
        </div>
        {lastScanTime && (
          <div className="text-[10px] opacity-75">
            Last scan: {new Date(lastScanTime).toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  );
};
