export interface IgnoreRule {
  id: string;
  path: string;
  reason: string;
  dateAdded: string;
}

export interface ScanSettings {
  maxDepth: number;
  ignoreHiddenFolders: boolean;
  ignoreSystemDirectories: boolean;
  scanSelectedPathsOnly: boolean;
  selectedPaths: string[];
  scheduleRecurringScan: boolean;
  recurringDays: number;
  autoScanOnStartup: boolean;
  defaultScanDirectory: string;
}

export interface ScanOptions {
  maxDepth?: number;
  ignoreHiddenFolders?: boolean;
  ignoreSystemDirectories?: boolean;
  ignorePaths?: string[];
}

export interface PurgoSettings {
  retentionDays: number; // default 30
  autoPurgeExpired: boolean;
  theme: 'dark' | 'light' | 'system';
  ignoreRules: IgnoreRule[];
  scanSettings: ScanSettings;
}

