import '../types/purgoAPI.d.ts';
import { ProjectItem, LargeFileItem, DuplicateGroup } from '../types/project';
import { TrashItem } from '../types/trash';
import { CacheItem } from '../types/cache';
import { ScanOptions } from '../types/settings';

export class ApiBridge {
  public static isElectron(): boolean {
    return typeof window !== 'undefined' && !!window.purgoAPI;
  }

  public static async getHomeDir(): Promise<string> {
    if (this.isElectron()) {
      return await window.purgoAPI!.getHomeDir();
    }
    return 'C:\\Users';
  }

  public static async selectFolder(): Promise<string | null> {
    if (this.isElectron()) {
      return await window.purgoAPI!.selectFolder();
    }
    return null;
  }

  public static async getAutoLaunch(): Promise<boolean> {
    if (this.isElectron()) {
      return await window.purgoAPI!.getAutoLaunch();
    }
    return false;
  }

  public static async setAutoLaunch(enabled: boolean): Promise<boolean> {
    if (this.isElectron()) {
      return await window.purgoAPI!.setAutoLaunch(enabled);
    }
    return false;
  }

  public static async quitApp(): Promise<void> {
    if (this.isElectron()) {
      await window.purgoAPI!.quitApp();
    }
  }

  public static async setTrayToolTip(text: string): Promise<boolean> {
    if (this.isElectron()) {
      return await window.purgoAPI!.setTrayToolTip(text);
    }
    return false;
  }

  public static async scanDirectory(
    dirPath: string,
    options: ScanOptions | string[] = {},
    onProgress?: (path: string) => void
  ): Promise<{ projects: ProjectItem[]; largeFiles: LargeFileItem[]; duplicates: DuplicateGroup[] }> {
    if (this.isElectron()) {
      if (onProgress) {
        window.purgoAPI!.onScanProgress(onProgress);
      }
      const res = await window.purgoAPI!.scanDirectory(dirPath, options);
      if (onProgress) {
        window.purgoAPI!.removeScanProgressListener();
      }
      return {
        projects: res.projects || [],
        largeFiles: res.largeFiles || [],
        duplicates: res.duplicates || [],
      };
    }
    return { projects: [], largeFiles: [], duplicates: [] };
  }

  public static async scanCaches(): Promise<CacheItem[]> {
    if (this.isElectron()) {
      return await window.purgoAPI!.scanCaches();
    }
    return [];
  }

  public static async moveToTrash(
    sourcePath: string,
    projectName: string,
    folderName: string,
    sizeBytes: number
  ): Promise<TrashItem> {
    if (this.isElectron()) {
      return await window.purgoAPI!.moveToTrash(sourcePath, projectName, folderName, sizeBytes);
    }
    throw new Error('Purgo requires Electron to move items to trash.');
  }

  public static async restoreFromTrash(id: string): Promise<boolean> {
    if (this.isElectron()) return await window.purgoAPI!.restoreFromTrash(id);
    return false;
  }

  public static async deletePermanently(id: string): Promise<boolean> {
    if (this.isElectron()) return await window.purgoAPI!.deletePermanently(id);
    return false;
  }

  public static async emptyTrash(): Promise<number> {
    if (this.isElectron()) return await window.purgoAPI!.emptyTrash();
    return 0;
  }

  public static async getTrashManifest(): Promise<TrashItem[]> {
    if (this.isElectron()) return await window.purgoAPI!.getTrashManifest();
    return [];
  }

  public static async purgePathPermanently(targetPath: string): Promise<boolean> {
    if (this.isElectron()) return await window.purgoAPI!.purgePathPermanently(targetPath);
    return true;
  }

  public static async setRetentionDays(days: number): Promise<boolean> {
    if (this.isElectron()) return await window.purgoAPI!.setRetentionDays(days);
    return true;
  }
}
