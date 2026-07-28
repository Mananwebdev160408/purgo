var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { app, BrowserWindow, ipcMain, dialog, Tray, Menu, nativeImage } from 'electron';
import path from 'path';
import os from 'os';
import { scanDirectoryForProjects } from './scanner';
import { scanSystemCaches } from './cacheScanner';
import { PurgoTrashManager } from './trashManager';
var mainWindow = null;
var tray = null;
var trashManager = new PurgoTrashManager(30);
function getAppIcon() {
    var possiblePaths = [
        path.join(__dirname, '../public/icon.png'),
        path.join(__dirname, '../dist/icon.png'),
        path.join(app.getAppPath(), 'public/icon.png'),
        path.join(app.getAppPath(), 'dist/icon.png'),
    ];
    for (var _i = 0, possiblePaths_1 = possiblePaths; _i < possiblePaths_1.length; _i++) {
        var p = possiblePaths_1[_i];
        var img = nativeImage.createFromPath(p);
        if (!img.isEmpty()) {
            return img;
        }
    }
    return nativeImage.createEmpty();
}
function createWindow() {
    var appIcon = getAppIcon();
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
    var isDev = process.env.NODE_ENV === 'development';
    if (isDev) {
        mainWindow.loadURL('http://localhost:4173');
        // mainWindow.webContents.openDevTools();
    }
    else {
        mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    }
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}
function createTray() {
    try {
        var appIcon = getAppIcon();
        tray = new Tray(appIcon);
        var contextMenu = Menu.buildFromTemplate([
            { label: 'Purgo — Developer Disk Manager', enabled: false },
            { type: 'separator' },
            { label: 'Open Purgo', click: function () { mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.show(); mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.focus(); } },
            { type: 'separator' },
            { label: 'Quit', click: function () { return app.quit(); } },
        ]);
        tray.setToolTip('Purgo — Developer Disk Manager');
        tray.setContextMenu(contextMenu);
        tray.on('double-click', function () { mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.show(); mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.focus(); });
    }
    catch (err) {
        console.error('Tray initialization error:', err);
    }
}
app.whenReady().then(function () {
    createWindow();
    createTray();
    trashManager.purgeExpiredItems().catch(function () { });
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        app.quit();
});
// ─── Window Controls ──────────────────────────────────────────────────────────
ipcMain.handle('purgo:minimize', function () {
    mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.minimize();
});
ipcMain.handle('purgo:maximize', function () {
    if (mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.isMaximized()) {
        mainWindow.unmaximize();
    }
    else {
        mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.maximize();
    }
});
ipcMain.handle('purgo:close', function () {
    mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.close();
});
ipcMain.handle('purgo:isMaximized', function () {
    var _a;
    return (_a = mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.isMaximized()) !== null && _a !== void 0 ? _a : false;
});
// ─── System ───────────────────────────────────────────────────────────────────
ipcMain.handle('purgo:getHomeDir', function () { return os.homedir(); });
ipcMain.handle('purgo:selectFolder', function () { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!mainWindow)
                    return [2 /*return*/, null];
                return [4 /*yield*/, dialog.showOpenDialog(mainWindow, {
                        properties: ['openDirectory'],
                    })];
            case 1:
                result = _a.sent();
                if (result.canceled || result.filePaths.length === 0)
                    return [2 /*return*/, null];
                return [2 /*return*/, result.filePaths[0]];
        }
    });
}); });
// ─── Filesystem Scanner ───────────────────────────────────────────────────────
ipcMain.handle('purgo:scanDirectory', function (_, dirPath, options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, scanDirectoryForProjects(dirPath, options, function (currentPath) {
                    mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.webContents.send('purgo:scanProgress', currentPath);
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); });
// ─── Cache Scanner ────────────────────────────────────────────────────────────
ipcMain.handle('purgo:scanCaches', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, scanSystemCaches()];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); });
// ─── Purgo Trash ──────────────────────────────────────────────────────────────
ipcMain.handle('purgo:moveToTrash', function (_, sourcePath, projectName, folderName, sizeBytes) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, trashManager.moveToTrash(sourcePath, projectName, folderName, sizeBytes)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); });
ipcMain.handle('purgo:restoreFromTrash', function (_, id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, trashManager.restoreItem(id)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); });
ipcMain.handle('purgo:deletePermanently', function (_, id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, trashManager.deletePermanently(id)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); });
ipcMain.handle('purgo:emptyTrash', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, trashManager.emptyTrash()];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); });
ipcMain.handle('purgo:getTrashManifest', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, trashManager.getManifest()];
    });
}); });
ipcMain.handle('purgo:purgePathPermanently', function (_, targetPath) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, trashManager.purgePathPermanently(targetPath)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); });
ipcMain.handle('purgo:setRetentionDays', function (_, days) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        trashManager.setRetentionDays(days);
        return [2 /*return*/, true];
    });
}); });
