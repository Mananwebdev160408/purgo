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
import { calculateFolderSize } from './scanner';
export function scanSystemCaches() {
    return __awaiter(this, void 0, void 0, function () {
        var homeDir, localAppData, potentialCaches, cacheResults;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    homeDir = os.homedir();
                    localAppData = process.env.LOCALAPPDATA || path.join(homeDir, 'AppData', 'Local');
                    potentialCaches = [
                        {
                            id: 'npm_global_cache',
                            name: 'npm Cache',
                            ecosystem: 'npm',
                            path: path.join(localAppData, 'npm-cache'),
                            description: 'Tarballs, index files, and package metadata cached by npm',
                            safety: 'safe',
                        },
                        {
                            id: 'npm_home_cache',
                            name: 'npm User Cache',
                            ecosystem: 'npm',
                            path: path.join(homeDir, '.npm'),
                            description: 'User home directory npm package cache',
                            safety: 'safe',
                        },
                        {
                            id: 'pnpm_store',
                            name: 'pnpm Content-Addressable Store',
                            ecosystem: 'pnpm',
                            path: path.join(localAppData, 'pnpm', 'store'),
                            description: 'Global hard-linked package store for pnpm projects',
                            safety: 'review',
                        },
                        {
                            id: 'yarn_cache',
                            name: 'Yarn Global Cache',
                            ecosystem: 'Yarn',
                            path: path.join(localAppData, 'Yarn', 'Cache'),
                            description: 'Downloaded npm package archives cached by Yarn',
                            safety: 'safe',
                        },
                        {
                            id: 'bun_cache',
                            name: 'Bun Install Cache',
                            ecosystem: 'Bun',
                            path: path.join(localAppData, 'bun', 'install', 'cache'),
                            description: 'Package binaries and tarballs cached by Bun',
                            safety: 'safe',
                        },
                        {
                            id: 'cargo_registry',
                            name: 'Cargo Registry & Git Cache',
                            ecosystem: 'Cargo',
                            path: path.join(homeDir, '.cargo', 'registry'),
                            description: 'Downloaded crates.io registry indexes and crate archives',
                            safety: 'safe',
                        },
                        {
                            id: 'gradle_cache',
                            name: 'Gradle Cache',
                            ecosystem: 'Gradle',
                            path: path.join(homeDir, '.gradle', 'caches'),
                            description: 'Downloaded JAR dependencies, wrappers, and task outputs',
                            safety: 'safe',
                        },
                        {
                            id: 'maven_repo',
                            name: 'Maven Local Repository',
                            ecosystem: 'Maven',
                            path: path.join(homeDir, '.m2', 'repository'),
                            description: 'Downloaded Java artifacts and POM dependencies',
                            safety: 'review',
                        },
                        {
                            id: 'pub_cache',
                            name: 'Flutter Pub Cache',
                            ecosystem: 'Pub',
                            path: path.join(localAppData, 'Pub', 'Cache'),
                            description: 'Downloaded Dart & Flutter packages',
                            safety: 'safe',
                        },
                        {
                            id: 'vscode_extensions',
                            name: 'VS Code Extensions Cache',
                            ecosystem: 'VS Code',
                            path: path.join(homeDir, '.vscode', 'extensions'),
                            description: 'Installed VS Code extension packages & language servers',
                            safety: 'review',
                        },
                    ];
                    return [4 /*yield*/, Promise.all(potentialCaches.map(function (cache) { return __awaiter(_this, void 0, void 0, function () {
                            var size, _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!fs.existsSync(cache.path)) return [3 /*break*/, 4];
                                        _b.label = 1;
                                    case 1:
                                        _b.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, calculateFolderSize(cache.path)];
                                    case 2:
                                        size = (_b.sent()).size;
                                        if (size > 0) {
                                            return [2 /*return*/, {
                                                    id: cache.id,
                                                    name: cache.name,
                                                    ecosystem: cache.ecosystem,
                                                    path: cache.path,
                                                    sizeBytes: size,
                                                    description: cache.description,
                                                    safety: cache.safety,
                                                }];
                                        }
                                        return [3 /*break*/, 4];
                                    case 3:
                                        _a = _b.sent();
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/, null];
                                }
                            });
                        }); }))];
                case 1:
                    cacheResults = _a.sent();
                    return [2 /*return*/, cacheResults.filter(function (c) { return c !== null; })];
            }
        });
    });
}
