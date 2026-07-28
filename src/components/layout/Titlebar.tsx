import React, { useState, useEffect, useMemo } from 'react';
import { Minus, Square, X, Copy } from 'lucide-react';
import { PurgoLogo } from '../common/PurgoLogo';
import { useScanStore } from '../../store/useScanStore';
import '../../types/purgoAPI.d.ts';

export const Titlebar: React.FC = () => {
  const [isMaximized, setIsMaximized] = useState(false);
  const isElectron = typeof window !== 'undefined' && !!window.purgoAPI;
  const { projects, isScanning, activeScanLocation } = useScanStore();

  const totalReclaimable = useMemo(
    () => projects.reduce((acc, p) => acc + p.reclaimableSizeBytes, 0),
    [projects]
  );

  const formatSize = (bytes: number) => {
    if (bytes >= 1024 * 1024 * 1024) return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
    return (bytes / (1024 * 1024)).toFixed(0) + ' MB';
  };

  useEffect(() => {
    if (!isElectron) return;
    window.purgoAPI!.isMaximized().then(setIsMaximized).catch(() => {});
  }, [isElectron]);

  const handleMinimize = async () => {
    if (isElectron) await window.purgoAPI!.minimizeWindow();
  };

  const handleMaximize = async () => {
    if (isElectron) {
      await window.purgoAPI!.maximizeWindow();
      const maxed = await window.purgoAPI!.isMaximized();
      setIsMaximized(maxed);
    }
  };

  const handleClose = async () => {
    if (isElectron) await window.purgoAPI!.closeWindow();
  };

  return (
    <div className="h-9 bg-fluent-bgDark border-b border-fluent-cardBorderDark flex items-center justify-between px-3 select-none drag-region shrink-0">
      {/* App Logo & Title */}
      <div className="flex items-center gap-2.5 text-fluent-textDark no-drag my-auto">
        <PurgoLogo className="w-5 h-5 shrink-0 self-center" />
        <span className="font-semibold text-xs tracking-wide leading-none self-center">Purgo</span>
        <span className="text-[10px] text-fluent-textSecondaryDark font-medium px-1.5 py-0.5 rounded bg-fluent-cardDark border border-fluent-cardBorderDark self-center">
          Developer Disk Manager
        </span>
      </div>

      {/* Center: live status */}
      <div className="pointer-events-none">
        {isScanning ? (
          <div className="flex items-center gap-1.5 text-[10px] text-fluent-textSecondaryDark font-mono max-w-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-fluent-green animate-pulse shrink-0" />
            <span className="truncate">{activeScanLocation || 'Scanning…'}</span>
          </div>
        ) : totalReclaimable > 0 ? (
          <div className="flex items-center gap-1.5 text-[10px] text-fluent-textSecondaryDark font-mono">
            <span className="text-fluent-green font-semibold">{formatSize(totalReclaimable)}</span>
            <span>reclaimable</span>
          </div>
        ) : null}
      </div>

      {/* Window Controls */}
      <div className="flex items-center no-drag">
        <button
          onClick={handleMinimize}
          className="w-9 h-9 flex items-center justify-center text-fluent-textSecondaryDark hover:text-fluent-textDark hover:bg-fluent-hoverDark transition-colors"
          title="Minimize"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleMaximize}
          className="w-9 h-9 flex items-center justify-center text-fluent-textSecondaryDark hover:text-fluent-textDark hover:bg-fluent-hoverDark transition-colors"
          title={isMaximized ? 'Restore' : 'Maximize'}
        >
          {isMaximized ? <Copy className="w-3 h-3" /> : <Square className="w-3.5 h-3.5" />}
        </button>
        <button
          onClick={handleClose}
          className="w-9 h-9 flex items-center justify-center text-fluent-textSecondaryDark hover:text-white hover:bg-rose-600 transition-colors"
          title="Close"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
