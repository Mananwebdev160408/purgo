var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import fs from 'fs';
import path from 'path';
import os from 'os';
import { exec } from 'child_process';
import util from 'util';
var execAsync = util.promisify(exec);
var PURGO_DIR = path.join(os.homedir(), '.purgo');
var TRASH_DIR = path.join(PURGO_DIR, 'trash');
var MANIFEST_PATH = path.join(PURGO_DIR, 'trash_manifest.json');
/**
 * Execute filesystem operations with Electron ASAR interception disabled.
 * This prevents "Invalid package default_app.asar" errors when handling node_modules or build outputs.
 */
function withNoAsar(fn) {
    return __awaiter(this, void 0, void 0, function () {
        var original;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    original = process.noAsar;
                    process.noAsar = true;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 3, 4]);
                    return [4 /*yield*/, fn()];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    process.noAsar = original;
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function clearReadOnlyAttribute(targetPath) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(process.platform === 'win32')) return [3 /*break*/, 4];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, execAsync("attrib -r \"".concat(targetPath, "\\*.*\" /s /d"))];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _a = _b.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function safeRemove(target) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            if (!fs.existsSync(target))
                return [2 /*return*/];
            return [2 /*return*/, withNoAsar(function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a, err_1;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 8]);
                                return [4 /*yield*/, fs.promises.rm(target, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 })];
                            case 1:
                                _b.sent();
                                return [3 /*break*/, 8];
                            case 2:
                                _a = _b.sent();
                                return [4 /*yield*/, clearReadOnlyAttribute(target)];
                            case 3:
                                _b.sent();
                                _b.label = 4;
                            case 4:
                                _b.trys.push([4, 6, , 7]);
                                return [4 /*yield*/, fs.promises.rm(target, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 })];
                            case 5:
                                _b.sent();
                                return [3 /*break*/, 7];
                            case 6:
                                err_1 = _b.sent();
                                console.error("safeRemove failed for ".concat(target, ":"), err_1);
                                throw err_1;
                            case 7: return [3 /*break*/, 8];
                            case 8: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
function safeMove(source, destination) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, withNoAsar(function () { return __awaiter(_this, void 0, void 0, function () {
                    var _loop_1, attempt, state_1, _a, cpErr_1, rmErr_1;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _loop_1 = function (attempt) {
                                    var err_2;
                                    return __generator(this, function (_c) {
                                        switch (_c.label) {
                                            case 0:
                                                _c.trys.push([0, 2, , 5]);
                                                return [4 /*yield*/, fs.promises.rename(source, destination)];
                                            case 1:
                                                _c.sent();
                                                return [2 /*return*/, { value: void 0 }];
                                            case 2:
                                                err_2 = _c.sent();
                                                if (!(attempt < 5)) return [3 /*break*/, 4];
                                                return [4 /*yield*/, new Promise(function (res) { return setTimeout(res, 100 * attempt); })];
                                            case 3:
                                                _c.sent();
                                                _c.label = 4;
                                            case 4: return [3 /*break*/, 5];
                                            case 5: return [2 /*return*/];
                                        }
                                    });
                                };
                                attempt = 1;
                                _b.label = 1;
                            case 1:
                                if (!(attempt <= 5)) return [3 /*break*/, 4];
                                return [5 /*yield**/, _loop_1(attempt)];
                            case 2:
                                state_1 = _b.sent();
                                if (typeof state_1 === "object")
                                    return [2 /*return*/, state_1.value];
                                _b.label = 3;
                            case 3:
                                attempt++;
                                return [3 /*break*/, 1];
                            case 4: 
                            // 2. Retry rename after clearing read-only attributes if initial rename fails
                            return [4 /*yield*/, clearReadOnlyAttribute(source)];
                            case 5:
                                // 2. Retry rename after clearing read-only attributes if initial rename fails
                                _b.sent();
                                _b.label = 6;
                            case 6:
                                _b.trys.push([6, 8, , 9]);
                                return [4 /*yield*/, fs.promises.rename(source, destination)];
                            case 7:
                                _b.sent();
                                return [2 /*return*/];
                            case 8:
                                _a = _b.sent();
                                return [3 /*break*/, 9];
                            case 9:
                                _b.trys.push([9, 11, , 13]);
                                return [4 /*yield*/, fs.promises.cp(source, destination, { recursive: true, force: true, verbatimSymlinks: true })];
                            case 10:
                                _b.sent();
                                return [3 /*break*/, 13];
                            case 11:
                                cpErr_1 = _b.sent();
                                return [4 /*yield*/, safeRemove(destination).catch(function () { })];
                            case 12:
                                _b.sent();
                                throw new Error("Cannot copy folder \"".concat(source, "\" to Purgo Trash. Files may be locked by an active process. (").concat(cpErr_1.message, ")"));
                            case 13:
                                _b.trys.push([13, 15, , 17]);
                                return [4 /*yield*/, safeRemove(source)];
                            case 14:
                                _b.sent();
                                return [3 /*break*/, 17];
                            case 15:
                                rmErr_1 = _b.sent();
                                return [4 /*yield*/, safeRemove(destination).catch(function () { })];
                            case 16:
                                _b.sent();
                                throw new Error("Folder \"".concat(source, "\" is in use by an active background process (e.g. VS Code, Node, or Cargo). Rollback performed to prevent disk space duplication."));
                            case 17: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
var PurgoTrashManager = /** @class */ (function () {
    function PurgoTrashManager(retentionDays) {
        if (retentionDays === void 0) { retentionDays = 30; }
        this.retentionDays = 30;
        this.retentionDays = retentionDays;
        this.ensureDirs();
    }
    PurgoTrashManager.prototype.ensureDirs = function () {
        if (!fs.existsSync(PURGO_DIR)) {
            fs.mkdirSync(PURGO_DIR, { recursive: true });
        }
        if (!fs.existsSync(TRASH_DIR)) {
            fs.mkdirSync(TRASH_DIR, { recursive: true });
        }
        if (!fs.existsSync(MANIFEST_PATH)) {
            fs.writeFileSync(MANIFEST_PATH, JSON.stringify([], null, 2), 'utf-8');
        }
    };
    PurgoTrashManager.prototype.getManifest = function () {
        this.ensureDirs();
        try {
            var data = fs.readFileSync(MANIFEST_PATH, 'utf-8');
            var items = JSON.parse(data);
            var now_1 = Date.now();
            return items.map(function (item) {
                var expTime = new Date(item.expiresAt).getTime();
                var diffDays = Math.max(0, Math.ceil((expTime - now_1) / (1000 * 60 * 60 * 24)));
                return __assign(__assign({}, item), { daysRemaining: diffDays });
            });
        }
        catch (_a) {
            return [];
        }
    };
    PurgoTrashManager.prototype.saveManifest = function (items) {
        this.ensureDirs();
        fs.writeFileSync(MANIFEST_PATH, JSON.stringify(items, null, 2), 'utf-8');
    };
    PurgoTrashManager.prototype.setRetentionDays = function (days) {
        this.retentionDays = days;
    };
    PurgoTrashManager.prototype.moveToTrash = function (sourcePath, projectName, folderName, sizeBytes) {
        return __awaiter(this, void 0, void 0, function () {
            var id, targetFolderInTrash, destinationPath, deletedAt, expiresAt, newItem, manifest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.ensureDirs();
                        if (!fs.existsSync(sourcePath)) {
                            throw new Error("Source path does not exist: ".concat(sourcePath));
                        }
                        id = 'trash_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
                        targetFolderInTrash = path.join(TRASH_DIR, id);
                        destinationPath = path.join(targetFolderInTrash, path.basename(sourcePath));
                        fs.mkdirSync(targetFolderInTrash, { recursive: true });
                        // Move folder into Purgo Trash safely without ASAR error or permission locks
                        return [4 /*yield*/, safeMove(sourcePath, destinationPath)];
                    case 1:
                        // Move folder into Purgo Trash safely without ASAR error or permission locks
                        _a.sent();
                        deletedAt = new Date();
                        expiresAt = new Date(deletedAt.getTime() + this.retentionDays * 24 * 60 * 60 * 1000);
                        newItem = {
                            id: id,
                            originalPath: sourcePath,
                            trashPath: destinationPath,
                            projectName: projectName,
                            folderName: folderName,
                            fileType: path.extname(sourcePath) || 'Folder',
                            sizeBytes: sizeBytes,
                            deletedAt: deletedAt.toISOString(),
                            expiresAt: expiresAt.toISOString(),
                            daysRemaining: this.retentionDays,
                        };
                        manifest = this.getManifest();
                        manifest.unshift(newItem);
                        this.saveManifest(manifest);
                        return [2 /*return*/, newItem];
                }
            });
        });
    };
    PurgoTrashManager.prototype.purgePathPermanently = function (targetPath) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!fs.existsSync(targetPath))
                            return [2 /*return*/, true];
                        return [4 /*yield*/, safeRemove(targetPath)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    PurgoTrashManager.prototype.restoreItem = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var manifest, item, targetDir, container, updatedManifest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        manifest = this.getManifest();
                        item = manifest.find(function (i) { return i.id === id; });
                        if (!item)
                            return [2 /*return*/, false];
                        if (!fs.existsSync(item.trashPath)) {
                            throw new Error("Trash item not found on disk at ".concat(item.trashPath));
                        }
                        targetDir = path.dirname(item.originalPath);
                        if (!fs.existsSync(targetDir)) {
                            fs.mkdirSync(targetDir, { recursive: true });
                        }
                        // Move back to original path safely
                        return [4 /*yield*/, safeMove(item.trashPath, item.originalPath)];
                    case 1:
                        // Move back to original path safely
                        _a.sent();
                        container = path.dirname(item.trashPath);
                        return [4 /*yield*/, safeRemove(container)];
                    case 2:
                        _a.sent();
                        updatedManifest = manifest.filter(function (i) { return i.id !== id; });
                        this.saveManifest(updatedManifest);
                        return [2 /*return*/, true];
                }
            });
        });
    };
    PurgoTrashManager.prototype.deletePermanently = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var manifest, item, container, updatedManifest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        manifest = this.getManifest();
                        item = manifest.find(function (i) { return i.id === id; });
                        if (!item)
                            return [2 /*return*/, false];
                        container = path.dirname(item.trashPath);
                        if (!fs.existsSync(container)) return [3 /*break*/, 2];
                        return [4 /*yield*/, safeRemove(container)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        updatedManifest = manifest.filter(function (i) { return i.id !== id; });
                        this.saveManifest(updatedManifest);
                        return [2 /*return*/, true];
                }
            });
        });
    };
    PurgoTrashManager.prototype.emptyTrash = function () {
        return __awaiter(this, void 0, void 0, function () {
            var manifest, deletedCount, _i, manifest_1, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        manifest = this.getManifest();
                        deletedCount = 0;
                        _i = 0, manifest_1 = manifest;
                        _a.label = 1;
                    case 1:
                        if (!(_i < manifest_1.length)) return [3 /*break*/, 4];
                        item = manifest_1[_i];
                        return [4 /*yield*/, this.deletePermanently(item.id)];
                    case 2:
                        _a.sent();
                        deletedCount++;
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, deletedCount];
                }
            });
        });
    };
    PurgoTrashManager.prototype.purgeExpiredItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var manifest, now, purgedCount, _i, manifest_2, item, expTime;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        manifest = this.getManifest();
                        now = Date.now();
                        purgedCount = 0;
                        _i = 0, manifest_2 = manifest;
                        _a.label = 1;
                    case 1:
                        if (!(_i < manifest_2.length)) return [3 /*break*/, 4];
                        item = manifest_2[_i];
                        expTime = new Date(item.expiresAt).getTime();
                        if (!(now >= expTime)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.deletePermanently(item.id)];
                    case 2:
                        _a.sent();
                        purgedCount++;
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, purgedCount];
                }
            });
        });
    };
    return PurgoTrashManager;
}());
export { PurgoTrashManager };
