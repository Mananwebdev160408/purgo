import React from 'react';
import { useNavigationStore } from '../../store/useNavigationStore';
import { useScanStore } from '../../store/useScanStore';
import { useSettingsStore } from '../../store/useSettingsStore';
import { ApiBridge } from '../../services/apiBridge';
import { Search, FolderOpen, Play, Moon, Sun, Monitor } from 'lucide-react';

export const Header: React.FC = () => {
  const { activeTab, searchQuery, setSearchQuery } = useNavigationStore();
  const { isScanning, activeScanLocation, startScan } = useScanStore();
  const { theme, toggleTheme } = useSettingsStore();

  const titleMap: Record<string, string> = {
    dashboard: 'Dashboard Overview',
    analyzer: 'Storage Analyzer (WinDirStat View)',
    artifacts: 'Safe Build Artifacts',
    'large-files': 'Large File Finder',
    duplicates: 'Duplicate Detection',
    git: 'Git Repository Manager',
    caches: 'Ecosystem Cache Manager',
    trash: 'Purgo Trash Center (30-Day Retention)',
    reports: 'Storage Reports & Statistics',
    settings: 'Settings & Ignore Rules',
  };

  const handleSelectFolder = async () => {
    const selected = await ApiBridge.selectFolder();
    if (selected) {
      startScan(selected);
    }
  };

  const getThemeTooltip = () => {
    if (theme === 'dark') return 'Theme: Dark Mode (Click for Light)';
    if (theme === 'light') return 'Theme: Light Mode (Click for System)';
    return 'Theme: System Default (Click for Dark)';
  };

  return (
    <header className="h-14 bg-fluent-cardDark border-b border-fluent-cardBorderDark px-6 flex items-center justify-between gap-4 select-none">
      {/* Title */}
      <div>
        <h1 className="font-bold text-base text-fluent-textDark tracking-tight">
          {titleMap[activeTab] || 'Purgo'}
        </h1>
        <p className="text-[11px] text-fluent-textSecondaryDark font-mono truncate max-w-sm" title={activeScanLocation}>
          Active scan target: {activeScanLocation}
        </p>
      </div>

      {/* Center Search Bar */}
      <div className="flex-1 max-w-md relative">
        <Search className="w-4 h-4 text-fluent-textSecondaryDark absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Global search projects, artifacts, paths, frameworks..."
          className="w-full pl-9 pr-4 py-1.5 bg-fluent-bgDark border border-fluent-cardBorderDark rounded-lg text-xs text-fluent-textDark placeholder-fluent-textSecondaryDark focus:outline-none focus:border-fluent-green transition-colors"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleSelectFolder}
          disabled={isScanning}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-fluent-bgDark border border-fluent-cardBorderDark hover:bg-fluent-hoverDark text-fluent-textDark rounded-lg transition-colors"
        >
          <FolderOpen className="w-3.5 h-3.5 text-fluent-textSecondaryDark" />
          <span>Change Location</span>
        </button>

        <button
          onClick={() => startScan()}
          disabled={isScanning}
          className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg shadow-sm transition-all ${
            isScanning
              ? 'bg-fluent-hoverDark text-fluent-textSecondaryDark cursor-not-allowed'
              : 'bg-fluent-green hover:bg-fluent-greenHover text-white active:scale-95'
          }`}
        >
          {isScanning ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Scanning...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Scan Disk</span>
            </>
          )}
        </button>

        <button
          onClick={toggleTheme}
          className="p-2 text-fluent-textSecondaryDark hover:text-fluent-textDark hover:bg-fluent-hoverDark rounded-lg transition-colors flex items-center justify-center"
          title={getThemeTooltip()}
        >
          {theme === 'dark' && <Sun className="w-4 h-4 text-amber-400" />}
          {theme === 'light' && <Moon className="w-4 h-4 text-indigo-400" />}
          {theme === 'system' && <Monitor className="w-4 h-4 text-fluent-green" />}
        </button>
      </div>
    </header>
  );
};
