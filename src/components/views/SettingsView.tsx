import React, { useState } from 'react';
import { useSettingsStore, ThemeMode } from '../../store/useSettingsStore';
import { useTrashStore } from '../../store/useTrashStore';
import { ApiBridge } from '../../services/apiBridge';
import { Settings, ShieldOff, Clock, HardDrive, Plus, Trash2, FolderOpen, RefreshCw, Sun, Moon, Monitor, Palette } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { theme, setTheme, retentionDays, ignoreRules, scanSettings, setRetentionDays, addIgnoreRule, removeIgnoreRule, updateScanSettings } = useSettingsStore();
  const { setRetentionDays: setTrashRetention } = useTrashStore();

  const [newRulePath, setNewRulePath] = useState('');
  const [newRuleReason, setNewRuleReason] = useState('');
  const [autoLaunchOnBoot, setAutoLaunchOnBoot] = useState(false);

  React.useEffect(() => {
    ApiBridge.getAutoLaunch().then(setAutoLaunchOnBoot);
  }, []);

  const handleAutoLaunchToggle = async (enabled: boolean) => {
    setAutoLaunchOnBoot(enabled);
    await ApiBridge.setAutoLaunch(enabled);
  };

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRulePath.trim()) return;
    addIgnoreRule(newRulePath.trim(), newRuleReason.trim() || 'User Excluded');
    setNewRulePath('');
    setNewRuleReason('');
  };

  const handleRetentionChange = (days: number) => {
    setRetentionDays(days);
    setTrashRetention(days);
  };

  const handleSelectDefaultDirectory = async () => {
    const selected = await ApiBridge.selectFolder();
    if (selected) {
      updateScanSettings({ defaultScanDirectory: selected });
    }
  };

  const handleResetDefaultDirectory = async () => {
    const homeDir = await ApiBridge.getHomeDir();
    updateScanSettings({ defaultScanDirectory: homeDir });
  };

  const themeOptions: { mode: ThemeMode; label: string; icon: React.ReactNode; description: string }[] = [
    {
      mode: 'dark',
      label: 'Dark Mode',
      icon: <Moon className="w-4 h-4 text-indigo-400" />,
      description: 'Sleek dark theme optimized for low-light environments',
    },
    {
      mode: 'light',
      label: 'Light Mode',
      icon: <Sun className="w-4 h-4 text-amber-500" />,
      description: 'Clean, high-contrast light theme for bright spaces',
    },
    {
      mode: 'system',
      label: 'System Preference',
      icon: <Monitor className="w-4 h-4 text-fluent-green" />,
      description: 'Automatically match your operating system theme',
    },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto animate-in fade-in duration-200">
      <div className="flex items-center justify-between bg-fluent-cardDark border border-fluent-cardBorderDark rounded-xl p-5 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-fluent-green/10 text-fluent-green rounded-xl border border-fluent-green/20">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-base text-fluent-textDark">Settings & Ignore Rules</h2>
            <p className="text-xs text-fluent-textSecondaryDark">Configure appearance theme, permanent ignore lists, retention policies, and scan settings.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Retention Policy, Appearance & Scan Settings */}
        <div className="space-y-6">
          {/* Appearance / Theme Selector */}
          <div className="bg-fluent-cardDark border border-fluent-cardBorderDark rounded-xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-fluent-green" />
              <h3 className="font-semibold text-sm text-fluent-textDark">Appearance & Theme</h3>
            </div>
            <p className="text-xs text-fluent-textSecondaryDark">
              Select your preferred visual style or sync automatically with system appearance settings.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {themeOptions.map(opt => (
                <button
                  key={opt.mode}
                  onClick={() => setTheme(opt.mode)}
                  className={`p-3.5 rounded-xl text-left border flex flex-col justify-between transition-all ${
                    theme === opt.mode
                      ? 'bg-fluent-green/10 border-fluent-green text-fluent-textDark shadow-xs ring-1 ring-fluent-green/30'
                      : 'bg-fluent-bgDark border-fluent-cardBorderDark text-fluent-textSecondaryDark hover:text-fluent-textDark hover:bg-fluent-hoverDark'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className="font-semibold text-xs text-fluent-textDark flex items-center gap-2">
                      {opt.icon}
                      {opt.label}
                    </span>
                    {theme === opt.mode && (
                      <span className="w-2 h-2 rounded-full bg-fluent-green" />
                    )}
                  </div>
                  <p className="text-[10px] text-fluent-textSecondaryDark leading-relaxed">
                    {opt.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
          <div className="bg-fluent-cardDark border border-fluent-cardBorderDark rounded-xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <h3 className="font-semibold text-sm text-fluent-textDark">Purgo Trash Retention Policy</h3>
            </div>
            <p className="text-xs text-fluent-textSecondaryDark">
              Specify how long deleted items remain recoverable in Purgo Trash before automatic permanent purge.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-2">
              {[14, 30, 60].map((days) => (
                <button
                  key={days}
                  onClick={() => handleRetentionChange(days)}
                  className={`py-2.5 px-3 rounded-lg text-xs font-semibold border transition-all ${
                    retentionDays === days
                      ? 'bg-fluent-green text-white border-fluent-green shadow-sm'
                      : 'bg-fluent-bgDark border-fluent-cardBorderDark text-fluent-textSecondaryDark hover:text-fluent-textDark hover:bg-fluent-hoverDark'
                  }`}
                >
                  {days} Days {days === 30 && '(Default)'}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-fluent-cardDark border border-fluent-cardBorderDark rounded-xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-fluent-green" />
              <h3 className="font-semibold text-sm text-fluent-textDark">Filesystem Scanner Settings</h3>
            </div>

            <div className="space-y-3 text-xs">
              {/* Launch on Windows Startup */}
              <label className="flex items-center justify-between p-3 bg-fluent-bgDark border border-fluent-cardBorderDark rounded-lg cursor-pointer">
                <div>
                  <span className="text-fluent-textDark font-medium block">Run on System Startup (Background)</span>
                  <span className="text-[10px] text-fluent-textSecondaryDark block mt-0.5">Start Purgo silently in the system tray when Windows boots up</span>
                </div>
                <input
                  type="checkbox"
                  checked={autoLaunchOnBoot}
                  onChange={(e) => handleAutoLaunchToggle(e.target.checked)}
                  className="rounded border-fluent-cardBorderDark accent-fluent-green w-4 h-4"
                />
              </label>

              {/* Auto Scan on App Bootup */}
              <label className="flex items-center justify-between p-3 bg-fluent-bgDark border border-fluent-cardBorderDark rounded-lg cursor-pointer">
                <div>
                  <span className="text-fluent-textDark font-medium block">Auto-Scan on App Startup</span>
                  <span className="text-[10px] text-fluent-textSecondaryDark block mt-0.5">Automatically scan target directory when Purgo boots up</span>
                </div>
                <input
                  type="checkbox"
                  checked={scanSettings.autoScanOnStartup}
                  onChange={(e) => updateScanSettings({ autoScanOnStartup: e.target.checked })}
                  className="rounded border-fluent-cardBorderDark accent-fluent-green w-4 h-4"
                />
              </label>

              {/* Default Scan Directory */}
              <div className="p-3 bg-fluent-bgDark border border-fluent-cardBorderDark rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-fluent-textDark font-medium">Default Scan Target Directory</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleSelectDefaultDirectory}
                      className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-fluent-green hover:bg-fluent-greenHover text-white rounded transition-colors"
                    >
                      <FolderOpen className="w-3 h-3" />
                      <span>Change Folder</span>
                    </button>
                    {scanSettings.defaultScanDirectory && (
                      <button
                        type="button"
                        onClick={handleResetDefaultDirectory}
                        title="Reset to User Home Directory"
                        className="p-1 text-fluent-textSecondaryDark hover:text-fluent-textDark hover:bg-fluent-hoverDark rounded transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="font-mono text-[11px] text-fluent-textSecondaryDark bg-fluent-cardDark p-2 rounded border border-fluent-cardBorderDark truncate" title={scanSettings.defaultScanDirectory || 'System Default (Home Directory)'}>
                  {scanSettings.defaultScanDirectory || 'System Default (Home Directory / User Root)'}
                </div>
              </div>

              <label className="flex items-center justify-between p-3 bg-fluent-bgDark border border-fluent-cardBorderDark rounded-lg cursor-pointer">
                <span className="text-fluent-textDark">Ignore Hidden Folders (e.g. .git, .vscode)</span>
                <input
                  type="checkbox"
                  checked={scanSettings.ignoreHiddenFolders}
                  onChange={(e) => updateScanSettings({ ignoreHiddenFolders: e.target.checked })}
                  className="rounded border-fluent-cardBorderDark accent-fluent-green"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-fluent-bgDark border border-fluent-cardBorderDark rounded-lg cursor-pointer">
                <span className="text-fluent-textDark">Ignore System Directories (e.g. Windows, Program Files)</span>
                <input
                  type="checkbox"
                  checked={scanSettings.ignoreSystemDirectories}
                  onChange={(e) => updateScanSettings({ ignoreSystemDirectories: e.target.checked })}
                  className="rounded border-fluent-cardBorderDark accent-fluent-green"
                />
              </label>

              <div className="p-3 bg-fluent-bgDark border border-fluent-cardBorderDark rounded-lg flex items-center justify-between">
                <span className="text-fluent-textDark">Maximum Scan Folder Depth</span>
                <select
                  value={scanSettings.maxDepth}
                  onChange={(e) => updateScanSettings({ maxDepth: Number(e.target.value) })}
                  className="bg-fluent-cardDark border border-fluent-cardBorderDark text-fluent-textDark rounded px-2 py-1 focus:outline-none"
                >
                  <option value={4}>4 levels</option>
                  <option value={6}>6 levels (Default)</option>
                  <option value={8}>8 levels</option>
                  <option value={10}>10 levels</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Permanent Ignore List */}
        <div className="bg-fluent-cardDark border border-fluent-cardBorderDark rounded-xl p-6 space-y-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldOff className="w-4 h-4 text-rose-400" />
              <h3 className="font-semibold text-sm text-fluent-textDark">Permanent Ignore List</h3>
            </div>
            <p className="text-xs text-fluent-textSecondaryDark mb-4">
              Folders added here will be completely skipped during future scans (e.g. work repositories, confidential drives).
            </p>

            <form onSubmit={handleAddRule} className="space-y-3 mb-4">
              <input
                type="text"
                value={newRulePath}
                onChange={(e) => setNewRulePath(e.target.value)}
                placeholder="Enter full directory path (e.g. C:\Users\asus\Work)"
                className="w-full px-3 py-2 bg-fluent-bgDark border border-fluent-cardBorderDark rounded-lg text-xs text-fluent-textDark placeholder-fluent-textSecondaryDark focus:outline-none focus:border-fluent-green"
              />
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newRuleReason}
                  onChange={(e) => setNewRuleReason(e.target.value)}
                  placeholder="Reason / Tag (e.g. Work Confidential)"
                  className="flex-1 px-3 py-2 bg-fluent-bgDark border border-fluent-cardBorderDark rounded-lg text-xs text-fluent-textDark placeholder-fluent-textSecondaryDark focus:outline-none focus:border-fluent-green"
                />
                <button
                  type="submit"
                  className="flex items-center gap-1 px-4 py-2 bg-fluent-green hover:bg-fluent-greenHover text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
            </form>

            <div className="space-y-2">
              {ignoreRules.map((rule) => (
                <div key={rule.id} className="p-3 bg-fluent-bgDark border border-fluent-cardBorderDark rounded-lg flex items-center justify-between text-xs">
                  <div className="truncate mr-3">
                    <div className="font-mono font-medium text-fluent-textDark truncate" title={rule.path}>{rule.path}</div>
                    <div className="text-[10px] text-fluent-textSecondaryDark mt-0.5">{rule.reason} • Added {rule.dateAdded}</div>
                  </div>
                  <button
                    onClick={() => removeIgnoreRule(rule.id)}
                    className="p-1.5 text-fluent-textSecondaryDark hover:text-rose-400 hover:bg-fluent-hoverDark rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
