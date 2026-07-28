import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IgnoreRule, ScanSettings } from '../types/settings';

export type ThemeMode = 'dark' | 'light' | 'system';

export const applyThemeToDocument = (theme: ThemeMode) => {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const isDarkSystem = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = theme === 'dark' || (theme === 'system' && isDarkSystem);

  if (isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};

interface SettingsState {
  theme: ThemeMode;
  retentionDays: number; // default 30 days
  ignoreRules: IgnoreRule[];
  scanSettings: ScanSettings;

  // Actions
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  initTheme: () => void;
  setRetentionDays: (days: number) => void;
  addIgnoreRule: (path: string, reason: string) => void;
  removeIgnoreRule: (id: string) => void;
  updateScanSettings: (settings: Partial<ScanSettings>) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      retentionDays: 30,
      ignoreRules: [
        { id: 'rule_1', path: 'C:\\Users\\asus\\Projects\\work-secret-repo', reason: 'Work Confidential', dateAdded: '2026-06-01' },
        { id: 'rule_2', path: 'D:\\Backups\\DevArchives', reason: 'External Backup Drive', dateAdded: '2026-05-15' },
      ],
      scanSettings: {
        maxDepth: 6,
        ignoreHiddenFolders: true,
        ignoreSystemDirectories: true,
        scanSelectedPathsOnly: false,
        selectedPaths: ['C:\\Users\\asus\\Projects', 'C:\\Users\\asus\\Documents'],
        scheduleRecurringScan: true,
        recurringDays: 7,
        autoScanOnStartup: true,
        defaultScanDirectory: '', // Default home directory or custom path
      },

      setTheme: (newTheme: ThemeMode) => {
        applyThemeToDocument(newTheme);
        set({ theme: newTheme });
      },

      toggleTheme: () => {
        const current = get().theme;
        let nextTheme: ThemeMode = 'dark';
        if (current === 'dark') nextTheme = 'light';
        else if (current === 'light') nextTheme = 'system';
        else nextTheme = 'dark';

        applyThemeToDocument(nextTheme);
        set({ theme: nextTheme });
      },

      initTheme: () => {
        const currentTheme = get().theme;
        applyThemeToDocument(currentTheme);

        if (typeof window !== 'undefined' && window.matchMedia) {
          const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
          const handleSystemChange = () => {
            if (get().theme === 'system') {
              applyThemeToDocument('system');
            }
          };
          try {
            mediaQuery.removeEventListener('change', handleSystemChange);
            mediaQuery.addEventListener('change', handleSystemChange);
          } catch {
            // Fallback for older browsers
          }
        }
      },

      setRetentionDays: (days: number) => set({ retentionDays: days }),

      addIgnoreRule: (path: string, reason: string) => {
        set(state => ({
          ignoreRules: [
            ...state.ignoreRules,
            {
              id: 'rule_' + Date.now(),
              path,
              reason,
              dateAdded: new Date().toISOString().split('T')[0],
            },
          ],
        }));
      },

      removeIgnoreRule: (id: string) => {
        set(state => ({
          ignoreRules: state.ignoreRules.filter(r => r.id !== id),
        }));
      },

      updateScanSettings: (settings: Partial<ScanSettings>) => {
        set(state => ({
          scanSettings: { ...state.scanSettings, ...settings },
        }));
      },
    }),
    {
      name: 'purgo-settings-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyThemeToDocument(state.theme);
        }
      },
    }
  )
);

