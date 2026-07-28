import { app, BrowserWindow, ipcMain, dialog, Tray, Menu, nativeImage } from 'electron';
import path from 'path';
import os from 'os';
import { scanDirectoryForProjects } from './scanner';
import { scanSystemCaches } from './cacheScanner';
import { PurgoTrashManager } from './trashManager';

let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;
const trashManager = new PurgoTrashManager(30);

function getAppIcon() {
  const possiblePaths = [
    path.join(__dirname, '../public/icon.png'),
    path.join(__dirname, '../dist/icon.png'),
    path.join(app.getAppPath(), 'public/icon.png'),
    path.join(app.getAppPath(), 'dist/icon.png'),
  ];

  for (const p of possiblePaths) {
    const img = nativeImage.createFromPath(p);
    if (!img.isEmpty()) {
      return img;
    }
  }
  return nativeImage.createEmpty();
}

function createWindow() {
  const appIcon = getAppIcon();

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 840,
    minWidth: 1024,
    minHeight: 700,
    frame: false,
    titleBarStyle: 'hidden',
    backgroundColor: '#202020',
    icon: appIcon,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
    },
  });

  const isDev = process.env.NODE_ENV === 'development';

  if (isDev) {
    mainWindow.loadURL('http://localhost:4173');
    // mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function createTray() {
  try {
    const appIcon = getAppIcon();
    tray = new Tray(appIcon);
    const contextMenu = Menu.buildFromTemplate([
      { label: 'Purgo — Developer Disk Manager', enabled: false },
      { type: 'separator' },
      { label: 'Open Purgo', click: () => { mainWindow?.show(); mainWindow?.focus(); } },
      { type: 'separator' },
      { label: 'Quit', click: () => app.quit() },
    ]);
    tray.setToolTip('Purgo — Developer Disk Manager');
    tray.setContextMenu(contextMenu);
    tray.on('double-click', () => { mainWindow?.show(); mainWindow?.focus(); });
  } catch (err) {
    console.error('Tray initialization error:', err);
  }
}

app.whenReady().then(() => {
  createWindow();
  createTray();
  trashManager.purgeExpiredItems().catch(() => {});

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// ─── Window Controls ──────────────────────────────────────────────────────────
ipcMain.handle('purgo:minimize', () => {
  mainWindow?.minimize();
});

ipcMain.handle('purgo:maximize', () => {
  if (mainWindow?.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow?.maximize();
  }
});

ipcMain.handle('purgo:close', () => {
  mainWindow?.close();
});

ipcMain.handle('purgo:isMaximized', () => {
  return mainWindow?.isMaximized() ?? false;
});

// ─── System ───────────────────────────────────────────────────────────────────
ipcMain.handle('purgo:getHomeDir', () => os.homedir());

ipcMain.handle('purgo:selectFolder', async () => {
  if (!mainWindow) return null;
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory'],
  });
  if (result.canceled || result.filePaths.length === 0) return null;
  return result.filePaths[0];
});

// ─── Filesystem Scanner ───────────────────────────────────────────────────────
ipcMain.handle('purgo:scanDirectory', async (_, dirPath: string, options?: any) => {
  return await scanDirectoryForProjects(dirPath, options, (currentPath) => {
    mainWindow?.webContents.send('purgo:scanProgress', currentPath);
  });
});

// ─── Cache Scanner ────────────────────────────────────────────────────────────
ipcMain.handle('purgo:scanCaches', async () => {
  return await scanSystemCaches();
});

// ─── Purgo Trash ──────────────────────────────────────────────────────────────
ipcMain.handle('purgo:moveToTrash', async (_, sourcePath: string, projectName: string, folderName: string, sizeBytes: number) => {
  return await trashManager.moveToTrash(sourcePath, projectName, folderName, sizeBytes);
});

ipcMain.handle('purgo:restoreFromTrash', async (_, id: string) => {
  return await trashManager.restoreItem(id);
});

ipcMain.handle('purgo:deletePermanently', async (_, id: string) => {
  return await trashManager.deletePermanently(id);
});

ipcMain.handle('purgo:emptyTrash', async () => {
  return await trashManager.emptyTrash();
});

ipcMain.handle('purgo:getTrashManifest', async () => {
  return trashManager.getManifest();
});

ipcMain.handle('purgo:purgePathPermanently', async (_, targetPath: string) => {
  return await trashManager.purgePathPermanently(targetPath);
});

ipcMain.handle('purgo:setRetentionDays', async (_, days: number) => {
  trashManager.setRetentionDays(days);
  return true;
});
