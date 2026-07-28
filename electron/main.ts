import { app, BrowserWindow, ipcMain, dialog, Tray, Menu, nativeImage } from 'electron';
import path from 'path';
import os from 'os';
import { scanDirectoryForProjects } from './scanner';
import { scanSystemCaches } from './cacheScanner';
import { PurgoTrashManager } from './trashManager';

let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;
let isQuitting = false;
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
  const isHiddenLaunch = process.argv.includes('--hidden') || app.getLoginItemSettings().wasOpenedAtLogin;

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 840,
    minWidth: 1024,
    minHeight: 700,
    frame: false,
    titleBarStyle: 'hidden',
    backgroundColor: '#202020',
    show: false, // Don't show immediately until ready or if not hidden
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
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Show window when ready if not background startup
  mainWindow.once('ready-to-show', () => {
    if (!isHiddenLaunch) {
      mainWindow?.show();
    }
  });

  // Intercept window close to minimize to tray instead of quitting
  mainWindow.on('close', (event) => {
    if (!isQuitting) {
      event.preventDefault();
      mainWindow?.hide();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function updateTrayMenu() {
  if (!tray) return;
  const isAutoLaunch = app.getLoginItemSettings().openAtLogin;

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Purgo — Developer Disk Manager', enabled: false },
    { type: 'separator' },
    {
      label: 'Open Purgo',
      click: () => {
        mainWindow?.show();
        mainWindow?.focus();
      },
    },
    {
      label: 'Run on Windows Startup',
      type: 'checkbox',
      checked: isAutoLaunch,
      click: (item) => {
        app.setLoginItemSettings({
          openAtLogin: item.checked,
          openAsHidden: true,
          path: app.getPath('exe'),
          args: ['--hidden'],
        });
        updateTrayMenu();
      },
    },
    { type: 'separator' },
    {
      label: 'Quit Purgo',
      click: () => {
        isQuitting = true;
        app.quit();
      },
    },
  ]);
  tray.setContextMenu(contextMenu);
}

function createTray() {
  try {
    const appIcon = getAppIcon();
    const trayIcon = appIcon.isEmpty() ? appIcon : appIcon.resize({ width: 32, height: 32 });
    tray = new Tray(trayIcon);
    tray.setToolTip('Purgo — Developer Disk Manager');
    updateTrayMenu();

    tray.on('double-click', () => {
      mainWindow?.show();
      mainWindow?.focus();
    });

    tray.on('click', () => {
      mainWindow?.show();
      mainWindow?.focus();
    });
  } catch (err) {
    console.error('Tray initialization error:', err);
  }
}

app.whenReady().then(() => {
  createWindow();
  createTray();
  trashManager.purgeExpiredItems().catch(() => {});

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    } else {
      mainWindow?.show();
      mainWindow?.focus();
    }
  });
});

app.on('before-quit', () => {
  isQuitting = true;
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin' && isQuitting) {
    app.quit();
  }
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
  // Hide window to system tray instead of destroying
  if (!isQuitting && mainWindow) {
    mainWindow.hide();
  } else {
    mainWindow?.close();
  }
});

ipcMain.handle('purgo:quitApp', () => {
  isQuitting = true;
  app.quit();
});

ipcMain.handle('purgo:isMaximized', () => {
  return mainWindow?.isMaximized() ?? false;
});

// ─── Auto Launch & System Tray Controls ───────────────────────────────────────
ipcMain.handle('purgo:getAutoLaunch', () => {
  return app.getLoginItemSettings().openAtLogin;
});

ipcMain.handle('purgo:setAutoLaunch', (_, enabled: boolean) => {
  app.setLoginItemSettings({
    openAtLogin: enabled,
    openAsHidden: true,
    path: app.getPath('exe'),
    args: ['--hidden'],
  });
  updateTrayMenu();
  return true;
});

ipcMain.handle('purgo:setTrayToolTip', (_, text: string) => {
  if (tray) {
    tray.setToolTip(`Purgo — ${text}`);
  }
  return true;
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
  if (tray) tray.setToolTip(`Purgo — Scanning: ${path.basename(dirPath)}...`);
  try {
    const result = await scanDirectoryForProjects(dirPath, options, (currentPath) => {
      mainWindow?.webContents.send('purgo:scanProgress', currentPath);
    });
    if (tray) tray.setToolTip('Purgo — System Ready');
    return result;
  } catch (err) {
    if (tray) tray.setToolTip('Purgo — System Ready');
    throw err;
  }
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
