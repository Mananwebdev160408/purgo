import { contextBridge, ipcRenderer } from 'electron';
contextBridge.exposeInMainWorld('purgoAPI', {
    // Window controls
    minimizeWindow: function () { return ipcRenderer.invoke('purgo:minimize'); },
    maximizeWindow: function () { return ipcRenderer.invoke('purgo:maximize'); },
    closeWindow: function () { return ipcRenderer.invoke('purgo:close'); },
    isMaximized: function () { return ipcRenderer.invoke('purgo:isMaximized'); },
    // Filesystem scan
    scanDirectory: function (dirPath, options) {
        return ipcRenderer.invoke('purgo:scanDirectory', dirPath, options);
    },
    // Cache scan
    scanCaches: function () {
        return ipcRenderer.invoke('purgo:scanCaches');
    },
    // Trash management
    moveToTrash: function (sourcePath, projectName, folderName, sizeBytes) {
        return ipcRenderer.invoke('purgo:moveToTrash', sourcePath, projectName, folderName, sizeBytes);
    },
    restoreFromTrash: function (id) {
        return ipcRenderer.invoke('purgo:restoreFromTrash', id);
    },
    deletePermanently: function (id) {
        return ipcRenderer.invoke('purgo:deletePermanently', id);
    },
    emptyTrash: function () {
        return ipcRenderer.invoke('purgo:emptyTrash');
    },
    getTrashManifest: function () {
        return ipcRenderer.invoke('purgo:getTrashManifest');
    },
    purgePathPermanently: function (targetPath) {
        return ipcRenderer.invoke('purgo:purgePathPermanently', targetPath);
    },
    setRetentionDays: function (days) {
        return ipcRenderer.invoke('purgo:setRetentionDays', days);
    },
    // System
    getHomeDir: function () {
        return ipcRenderer.invoke('purgo:getHomeDir');
    },
    selectFolder: function () {
        return ipcRenderer.invoke('purgo:selectFolder');
    },
    onScanProgress: function (callback) {
        return ipcRenderer.on('purgo:scanProgress', function (_event, path) { return callback(path); });
    },
    removeScanProgressListener: function () {
        return ipcRenderer.removeAllListeners('purgo:scanProgress');
    },
});
