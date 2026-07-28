import { create } from 'zustand';
import { ProjectItem, LargeFileItem, DuplicateGroup } from '../types/project';
import { CacheItem } from '../types/cache';
import { ApiBridge } from '../services/apiBridge';
import { useSettingsStore } from './useSettingsStore';

interface ScanState {
  isScanning: boolean;
  scanProgressPath: string;
  activeScanLocation: string;
  lastScanTime: string | null;
  projects: ProjectItem[];
  largeFiles: LargeFileItem[];
  duplicates: DuplicateGroup[];
  caches: CacheItem[];

  // Actions
  initLiveScan: () => Promise<void>;
  startScan: (dirPath?: string) => Promise<void>;
  toggleArtifactSelection: (projectId: string, artifactId: string) => void;
  toggleSelectAllArtifactsInProject: (projectId: string, select: boolean) => void;
  toggleSelectAllSafeArtifacts: (select: boolean) => void;
  clearArtifactSelections: () => void;
  removeArtifactFromStore: (projectId: string, artifactId: string) => void;
  removeLargeFileFromStore: (fileId: string) => void;
  removeCacheFromStore: (cacheId: string) => void;
  removePathFromStore: (targetPath: string) => void;
}

const normalizePath = (p: string | undefined): string => {
  if (!p) return '';
  return p.replace(/\\/g, '/').toLowerCase();
};

export const useScanStore = create<ScanState>((set, get) => ({
  isScanning: false,
  scanProgressPath: '',
  activeScanLocation: '',
  lastScanTime: null,
  projects: [],
  largeFiles: [],
  duplicates: [],
  caches: [],

  initLiveScan: async () => {
    const { scanSettings } = useSettingsStore.getState();
    const homeDir = await ApiBridge.getHomeDir();
    const targetDir = (scanSettings.defaultScanDirectory && scanSettings.defaultScanDirectory.trim() !== '')
      ? scanSettings.defaultScanDirectory
      : homeDir;

    set({ activeScanLocation: targetDir });

    // Start cache scanning asynchronously so filesystem scan triggers UI progress immediately
    const cachesPromise = ApiBridge.scanCaches().then(caches => set({ caches }));

    // Automatically scan target directory on startup if enabled
    if (scanSettings.autoScanOnStartup !== false) {
      await get().startScan(targetDir);
    }

    await cachesPromise;
  },

  startScan: async (dirPath?: string) => {
    const targetPath = dirPath || get().activeScanLocation;
    const { ignoreRules, scanSettings } = useSettingsStore.getState();
    const ignorePaths = ignoreRules.map(r => r.path);

    const scanOptions = {
      maxDepth: scanSettings.maxDepth,
      ignoreHiddenFolders: scanSettings.ignoreHiddenFolders,
      ignoreSystemDirectories: scanSettings.ignoreSystemDirectories,
      ignorePaths,
    };

    set({ isScanning: true, scanProgressPath: targetPath, activeScanLocation: targetPath });

    try {
      const { projects, largeFiles, duplicates } = await ApiBridge.scanDirectory(
        targetPath,
        scanOptions,
        (path) => set({ scanProgressPath: path })
      );
      set({
        projects: projects || [],
        largeFiles: largeFiles || [],
        duplicates: duplicates || [],
        lastScanTime: new Date().toISOString(),
      });
    } catch {
      set({ projects: [], largeFiles: [], duplicates: [] });
    } finally {
      set({ isScanning: false, scanProgressPath: '' });
    }
  },

  toggleArtifactSelection: (projectId: string, artifactId: string) => {
    set(state => ({
      projects: state.projects.map(proj => {
        if (proj.id !== projectId) return proj;
        return {
          ...proj,
          artifacts: proj.artifacts.map(art => {
            if (art.id !== artifactId) return art;
            return { ...art, isSelected: !art.isSelected };
          }),
        };
      }),
    }));
  },

  toggleSelectAllArtifactsInProject: (projectId: string, select: boolean) => {
    set(state => ({
      projects: state.projects.map(proj => {
        if (proj.id !== projectId) return proj;
        return {
          ...proj,
          artifacts: proj.artifacts.map(art => ({ ...art, isSelected: select })),
        };
      }),
    }));
  },

  toggleSelectAllSafeArtifacts: (select: boolean) => {
    set(state => ({
      projects: state.projects.map(proj => ({
        ...proj,
        artifacts: proj.artifacts.map(art => {
          if (art.safety === 'safe') {
            return { ...art, isSelected: select };
          }
          return art;
        }),
      })),
    }));
  },

  clearArtifactSelections: () => {
    set(state => ({
      projects: state.projects.map(proj => ({
        ...proj,
        artifacts: proj.artifacts.map(art => ({ ...art, isSelected: false })),
      })),
    }));
  },

  removeArtifactFromStore: (projectId: string, artifactId: string) => {
    const normTarget = normalizePath(artifactId);
    set(state => ({
      projects: state.projects.map(proj => {
        if (proj.id !== projectId) return proj;
        const filtered = proj.artifacts.filter(art => art.id !== artifactId && normalizePath(art.path) !== normTarget);
        const removed = proj.artifacts.find(art => art.id === artifactId || normalizePath(art.path) === normTarget);
        const removedBytes = removed ? removed.sizeBytes : 0;
        return {
          ...proj,
          reclaimableSizeBytes: Math.max(0, proj.reclaimableSizeBytes - removedBytes),
          totalSizeBytes: Math.max(0, proj.totalSizeBytes - removedBytes),
          artifacts: filtered,
        };
      }),
    }));
  },

  removeLargeFileFromStore: (fileId: string) => {
    const normTarget = normalizePath(fileId);
    set(state => ({
      largeFiles: state.largeFiles.filter(lf => lf.id !== fileId && normalizePath(lf.path) !== normTarget),
    }));
  },

  removeCacheFromStore: (cacheId: string) => {
    const normTarget = normalizePath(cacheId);
    set(state => ({
      caches: state.caches.filter(c => c.id !== cacheId && normalizePath(c.path) !== normTarget),
    }));
  },

  removePathFromStore: (targetPath: string) => {
    const normTarget = normalizePath(targetPath);
    set(state => ({
      // 1. Remove from projects artifacts
      projects: state.projects.map(proj => {
        const removed = proj.artifacts.find(art => normalizePath(art.path) === normTarget || art.id === targetPath);
        if (!removed) return proj;
        const filtered = proj.artifacts.filter(art => normalizePath(art.path) !== normTarget && art.id !== targetPath);
        return {
          ...proj,
          reclaimableSizeBytes: Math.max(0, proj.reclaimableSizeBytes - removed.sizeBytes),
          totalSizeBytes: Math.max(0, proj.totalSizeBytes - removed.sizeBytes),
          artifacts: filtered,
        };
      }),
      // 2. Remove from largeFiles
      largeFiles: state.largeFiles.filter(lf => normalizePath(lf.path) !== normTarget && lf.id !== targetPath),
      // 3. Remove from duplicates
      duplicates: state.duplicates.map(group => ({
        ...group,
        files: group.files.filter(f => normalizePath(f.path) !== normTarget && f.id !== targetPath),
      })).filter(group => group.files.length > 1),
      // 4. Remove from caches
      caches: state.caches.filter(c => normalizePath(c.path) !== normTarget && c.id !== targetPath),
    }));
  },
}));
