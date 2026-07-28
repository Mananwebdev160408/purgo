import { ProjectItem, LargeFileItem, DuplicateGroup } from './project';
import { TrashItem } from './trash';
import { CacheItem } from './cache';
import { ScanOptions } from './settings';

export interface PurgoAPI {
  minimizeWindow: () => Promise<void>;
  maximizeWindow: () => Promise<void>;
  closeWindow: () => Promise<void>;
  quitApp: () => Promise<void>;
  isMaximized: () => Promise<boolean>;
  getAutoLaunch: () => Promise<boolean>;
  setAutoLaunch: (enabled: boolean) => Promise<boolean>;
  setTrayToolTip: (text: string) => Promise<boolean>;
  scanDirectory: (dirPath: string, options?: ScanOptions | string[]) => Promise<{ projects: ProjectItem[]; largeFiles: LargeFileItem[]; duplicates?: DuplicateGroup[] }>;
  scanCaches: () => Promise<CacheItem[]>;
  moveToTrash: (sourcePath: string, projectName: string, folderName: string, sizeBytes: number) => Promise<TrashItem>;
  restoreFromTrash: (id: string) => Promise<boolean>;
  deletePermanently: (id: string) => Promise<boolean>;
  emptyTrash: () => Promise<number>;
  getTrashManifest: () => Promise<TrashItem[]>;
  purgePathPermanently: (targetPath: string) => Promise<boolean>;
  setRetentionDays: (days: number) => Promise<boolean>;
  getHomeDir: () => Promise<string>;
  selectFolder: () => Promise<string | null>;
  onScanProgress: (callback: (path: string) => void) => void;
  removeScanProgressListener: () => void;
}

declare global {
  interface Window {
    purgoAPI?: PurgoAPI;
  }
}

export {};
