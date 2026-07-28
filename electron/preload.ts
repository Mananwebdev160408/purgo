import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('purgoAPI', {
  // Window controls
  minimizeWindow: () => ipcRenderer.invoke('purgo:minimize'),
  maximizeWindow: () => ipcRenderer.invoke('purgo:maximize'),
  closeWindow: () => ipcRenderer.invoke('purgo:close'),
  quitApp: () => ipcRenderer.invoke('purgo:quitApp'),
  isMaximized: () => ipcRenderer.invoke('purgo:isMaximized'),

  // Startup & Tray
  getAutoLaunch: () => ipcRenderer.invoke('purgo:getAutoLaunch'),
  setAutoLaunch: (enabled: boolean) => ipcRenderer.invoke('purgo:setAutoLaunch', enabled),
  setTrayToolTip: (text: string) => ipcRenderer.invoke('purgo:setTrayToolTip', text),

  // Filesystem scan
  scanDirectory: (dirPath: string, options?: any) =>
    ipcRenderer.invoke('purgo:scanDirectory', dirPath, options),

  // Cache scan
  scanCaches: () =>
    ipcRenderer.invoke('purgo:scanCaches'),

  // Trash management
  moveToTrash: (sourcePath: string, projectName: string, folderName: string, sizeBytes: number) =>
    ipcRenderer.invoke('purgo:moveToTrash', sourcePath, projectName, folderName, sizeBytes),

  restoreFromTrash: (id: string) =>
    ipcRenderer.invoke('purgo:restoreFromTrash', id),

  deletePermanently: (id: string) =>
    ipcRenderer.invoke('purgo:deletePermanently', id),

  emptyTrash: () =>
    ipcRenderer.invoke('purgo:emptyTrash'),

  getTrashManifest: () =>
    ipcRenderer.invoke('purgo:getTrashManifest'),

  purgePathPermanently: (targetPath: string) =>
    ipcRenderer.invoke('purgo:purgePathPermanently', targetPath),

  setRetentionDays: (days: number) =>
    ipcRenderer.invoke('purgo:setRetentionDays', days),

  // System
  getHomeDir: () =>
    ipcRenderer.invoke('purgo:getHomeDir'),

  selectFolder: () =>
    ipcRenderer.invoke('purgo:selectFolder'),

  onScanProgress: (callback: (path: string) => void) =>
    ipcRenderer.on('purgo:scanProgress', (_event, path) => callback(path)),

  removeScanProgressListener: () =>
    ipcRenderer.removeAllListeners('purgo:scanProgress'),
});
