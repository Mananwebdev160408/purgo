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
import crypto from 'crypto';
// Safe-to-remove definitions and rules
var RECREATABLE_FOLDERS = {
    'node_modules': { safety: 'safe', reason: 'Recreatable via npm i / pnpm i / yarn' },
    '.next': { safety: 'safe', reason: 'Next.js build cache. Regenerated on next build' },
    'dist': { safety: 'safe', reason: 'Compiled distribution output' },
    'build': { safety: 'safe', reason: 'Build output folder' },
    'target': { safety: 'safe', reason: 'Rust / Cargo / Java build target' },
    '.cache': { safety: 'safe', reason: 'Project framework cache' },
    '.parcel-cache': { safety: 'safe', reason: 'Parcel bundler cache' },
    '.vite': { safety: 'safe', reason: 'Vite dev server cache' },
    '.nuxt': { safety: 'safe', reason: 'Nuxt build directory' },
    '.svelte-kit': { safety: 'safe', reason: 'SvelteKit build cache' },
    '.angular': { safety: 'safe', reason: 'Angular build cache' },
    'coverage': { safety: 'safe', reason: 'Test coverage reports' },
    'out': { safety: 'safe', reason: 'Output build directory' },
    'obj': { safety: 'safe', reason: 'C# / C++ intermediate build output' },
    'bin': { safety: 'review', reason: 'Compiled executable binaries' },
    '.gradle': { safety: 'safe', reason: 'Gradle build cache' },
    '.dart_tool': { safety: 'safe', reason: 'Flutter / Dart build metadata' },
    '__pycache__': { safety: 'safe', reason: 'Python bytecode cache' },
    '.pytest_cache': { safety: 'safe', reason: 'Pytest cache' },
    'venv': { safety: 'review', reason: 'Python virtual environment (re-installable)' },
    '.venv': { safety: 'review', reason: 'Python virtual environment' },
    'vendor': { safety: 'review', reason: 'Composer / Go vendor directory' },
    'Library': { safety: 'review', reason: 'Unity project Library folder' },
    'Temp': { safety: 'safe', reason: 'Unity temporary build assets' },
};
var PROJECT_INDICATORS = [
    { file: 'package.json', ecosystem: 'Node.js' },
    { file: 'Cargo.toml', ecosystem: 'Rust' },
    { file: 'go.mod', ecosystem: 'Go' },
    { file: 'pom.xml', ecosystem: 'Java' },
    { file: 'build.gradle', ecosystem: 'Java' },
    { file: 'build.gradle.kts', ecosystem: 'Kotlin' },
    { file: 'requirements.txt', ecosystem: 'Python' },
    { file: 'pyproject.toml', ecosystem: 'Python' },
    { file: 'pubspec.yaml', ecosystem: 'Flutter' },
    { file: 'Composer.json', ecosystem: 'PHP' },
];
var SYSTEM_DIRECTORIES = [
    '$recycle.bin',
    'system volume information',
    'windows',
    'program files',
    'program files (x86)',
    'appdata\\local\\temp',
];
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
export function calculateFolderSize(folderPath) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, withNoAsar(function () { return __awaiter(_this, void 0, void 0, function () {
                    var totalSize, totalCount, entries, BATCH_SIZE, i, batch, results, _i, results_1, res, _a;
                    var _this = this;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                totalSize = 0;
                                totalCount = 0;
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 7, , 8]);
                                return [4 /*yield*/, fs.promises.readdir(folderPath, { withFileTypes: true })];
                            case 2:
                                entries = _b.sent();
                                BATCH_SIZE = 64;
                                i = 0;
                                _b.label = 3;
                            case 3:
                                if (!(i < entries.length)) return [3 /*break*/, 6];
                                batch = entries.slice(i, i + BATCH_SIZE);
                                return [4 /*yield*/, Promise.all(batch.map(function (entry) { return __awaiter(_this, void 0, void 0, function () {
                                        var fullPath, stats, _a;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    // Skip symbolic links & junctions to prevent infinite loops
                                                    if (entry.isSymbolicLink()) {
                                                        return [2 /*return*/, { size: 0, count: 0 }];
                                                    }
                                                    fullPath = path.join(folderPath, entry.name);
                                                    if (!entry.isDirectory()) return [3 /*break*/, 2];
                                                    return [4 /*yield*/, calculateFolderSize(fullPath)];
                                                case 1: return [2 /*return*/, _b.sent()];
                                                case 2:
                                                    if (!entry.isFile()) return [3 /*break*/, 6];
                                                    _b.label = 3;
                                                case 3:
                                                    _b.trys.push([3, 5, , 6]);
                                                    return [4 /*yield*/, fs.promises.stat(fullPath)];
                                                case 4:
                                                    stats = _b.sent();
                                                    return [2 /*return*/, { size: stats.size, count: 1 }];
                                                case 5:
                                                    _a = _b.sent();
                                                    return [2 /*return*/, { size: 0, count: 0 }];
                                                case 6: return [2 /*return*/, { size: 0, count: 0 }];
                                            }
                                        });
                                    }); }))];
                            case 4:
                                results = _b.sent();
                                for (_i = 0, results_1 = results; _i < results_1.length; _i++) {
                                    res = results_1[_i];
                                    totalSize += res.size;
                                    totalCount += res.count;
                                }
                                _b.label = 5;
                            case 5:
                                i += BATCH_SIZE;
                                return [3 /*break*/, 3];
                            case 6: return [3 /*break*/, 8];
                            case 7:
                                _a = _b.sent();
                                return [3 /*break*/, 8];
                            case 8: return [2 /*return*/, { size: totalSize, count: totalCount }];
                        }
                    });
                }); })];
        });
    });
}
export function detectEcosystem(projectPath) {
    return __awaiter(this, void 0, void 0, function () {
        var files, content, _i, PROJECT_INDICATORS_1, item, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, fs.promises.readdir(projectPath)];
                case 1:
                    files = _b.sent();
                    if (!files.includes('package.json')) return [3 /*break*/, 3];
                    return [4 /*yield*/, fs.promises.readFile(path.join(projectPath, 'package.json'), 'utf-8')];
                case 2:
                    content = _b.sent();
                    if (content.includes('next'))
                        return [2 /*return*/, 'Next.js'];
                    if (content.includes('vite'))
                        return [2 /*return*/, 'Vite'];
                    if (content.includes('react'))
                        return [2 /*return*/, 'React'];
                    if (content.includes('vue'))
                        return [2 /*return*/, 'Vue'];
                    if (content.includes('nuxt'))
                        return [2 /*return*/, 'Nuxt'];
                    if (content.includes('angular'))
                        return [2 /*return*/, 'Angular'];
                    if (content.includes('@sveltejs/kit'))
                        return [2 /*return*/, 'Svelte'];
                    if (content.includes('electron'))
                        return [2 /*return*/, 'Electron'];
                    if (content.includes('@tauri-apps/api'))
                        return [2 /*return*/, 'Tauri'];
                    if (content.includes('nest'))
                        return [2 /*return*/, 'NestJS'];
                    if (content.includes('express'))
                        return [2 /*return*/, 'Express'];
                    return [2 /*return*/, 'Node.js'];
                case 3:
                    for (_i = 0, PROJECT_INDICATORS_1 = PROJECT_INDICATORS; _i < PROJECT_INDICATORS_1.length; _i++) {
                        item = PROJECT_INDICATORS_1[_i];
                        if (files.includes(item.file)) {
                            return [2 /*return*/, item.ecosystem];
                        }
                    }
                    return [3 /*break*/, 5];
                case 4:
                    _a = _b.sent();
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/, 'Node.js'];
            }
        });
    });
}
function getRealGitMetadata(projectPath) {
    return __awaiter(this, void 0, void 0, function () {
        var gitDir, branch, lastCommitDate, remoteUrl, uncommittedChanges, headPath, headContent, stat, configPath, configContent, match, indexPath, indexStat, headStat, _a, now, commitTime, isStale;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    gitDir = path.join(projectPath, '.git');
                    if (!fs.existsSync(gitDir))
                        return [2 /*return*/, undefined];
                    branch = 'main';
                    lastCommitDate = new Date().toISOString();
                    remoteUrl = undefined;
                    uncommittedChanges = false;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 10, , 11]);
                    headPath = path.join(gitDir, 'HEAD');
                    if (!fs.existsSync(headPath)) return [3 /*break*/, 4];
                    return [4 /*yield*/, fs.promises.readFile(headPath, 'utf-8')];
                case 2:
                    headContent = _b.sent();
                    if (headContent.includes('refs/heads/')) {
                        branch = headContent.split('refs/heads/')[1].trim();
                    }
                    else {
                        branch = headContent.substring(0, 7);
                    }
                    return [4 /*yield*/, fs.promises.stat(headPath)];
                case 3:
                    stat = _b.sent();
                    lastCommitDate = stat.mtime.toISOString();
                    _b.label = 4;
                case 4:
                    configPath = path.join(gitDir, 'config');
                    if (!fs.existsSync(configPath)) return [3 /*break*/, 6];
                    return [4 /*yield*/, fs.promises.readFile(configPath, 'utf-8')];
                case 5:
                    configContent = _b.sent();
                    match = configContent.match(/url\s*=\s*(.+)/);
                    if (match)
                        remoteUrl = match[1].trim();
                    _b.label = 6;
                case 6:
                    indexPath = path.join(gitDir, 'index');
                    if (!fs.existsSync(indexPath)) return [3 /*break*/, 9];
                    return [4 /*yield*/, fs.promises.stat(indexPath)];
                case 7:
                    indexStat = _b.sent();
                    return [4 /*yield*/, fs.promises.stat(headPath)];
                case 8:
                    headStat = _b.sent();
                    uncommittedChanges = indexStat.mtimeMs > headStat.mtimeMs + 2000;
                    _b.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    _a = _b.sent();
                    return [3 /*break*/, 11];
                case 11:
                    now = Date.now();
                    commitTime = new Date(lastCommitDate).getTime();
                    isStale = (now - commitTime) > 60 * 24 * 60 * 60 * 1000;
                    return [2 /*return*/, {
                            branch: branch,
                            uncommittedChanges: uncommittedChanges,
                            remoteUrl: remoteUrl,
                            lastCommitDate: lastCommitDate,
                            isStale: isStale,
                        }];
            }
        });
    });
}
function getFileHeaderHash(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var handle, buffer, bytesRead, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, fs.promises.open(filePath, 'r')];
                case 1:
                    handle = _b.sent();
                    buffer = Buffer.alloc(64 * 1024);
                    return [4 /*yield*/, handle.read(buffer, 0, buffer.length, 0)];
                case 2:
                    bytesRead = (_b.sent()).bytesRead;
                    return [4 /*yield*/, handle.close()];
                case 3:
                    _b.sent();
                    return [2 /*return*/, crypto.createHash('md5').update(buffer.subarray(0, bytesRead)).digest('hex')];
                case 4:
                    _a = _b.sent();
                    return [2 /*return*/, filePath];
                case 5: return [2 /*return*/];
            }
        });
    });
}
export function scanDirectoryForProjects(startDir_1) {
    return __awaiter(this, arguments, void 0, function (startDir, optionsInput, progressCallback) {
        function walk(currentDir_1) {
            return __awaiter(this, arguments, void 0, function (currentDir, depth) {
                var lowerDir, entries, _a, fileNames, isProjectRoot, ecosystem, artifacts, totalReclaimable, artifactPromises, artifactResults, _i, artifactResults_1, res, nonArtifactSize, _b, entries_1, entry, stat, _c, totalProjectSize, lastMod, stat, _d, gitInfo, subPromises, _e, entries_2, entry, fullPath, stat, _f;
                var _this = this;
                if (depth === void 0) { depth = 0; }
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            if (depth > maxDepth)
                                return [2 /*return*/];
                            lowerDir = currentDir.toLowerCase();
                            // Check user-configured ignore paths
                            if (ignorePaths.some(function (ip) { return lowerDir.startsWith(ip.toLowerCase()); }))
                                return [2 /*return*/];
                            // Check system directory exclusions
                            if (ignoreSystemDirectories) {
                                if (SYSTEM_DIRECTORIES.some(function (sys) { return lowerDir.includes(sys); }))
                                    return [2 /*return*/];
                            }
                            throttledProgress(currentDir);
                            entries = [];
                            _g.label = 1;
                        case 1:
                            _g.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, fs.promises.readdir(currentDir, { withFileTypes: true })];
                        case 2:
                            entries = _g.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            _a = _g.sent();
                            return [2 /*return*/];
                        case 4:
                            fileNames = entries.map(function (e) { return e.name; });
                            isProjectRoot = PROJECT_INDICATORS.some(function (ind) { return fileNames.includes(ind.file); }) || fileNames.includes('.git');
                            if (!isProjectRoot) return [3 /*break*/, 18];
                            return [4 /*yield*/, detectEcosystem(currentDir)];
                        case 5:
                            ecosystem = _g.sent();
                            artifacts = [];
                            totalReclaimable = 0;
                            artifactPromises = entries
                                .filter(function (entry) { return entry.isDirectory() && !entry.isSymbolicLink() && RECREATABLE_FOLDERS[entry.name]; })
                                .map(function (entry) { return __awaiter(_this, void 0, void 0, function () {
                                var artPath, rule, _a, size, count, lastMod_1, stat, _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            artPath = path.join(currentDir, entry.name);
                                            rule = RECREATABLE_FOLDERS[entry.name];
                                            return [4 /*yield*/, calculateFolderSize(artPath)];
                                        case 1:
                                            _a = _c.sent(), size = _a.size, count = _a.count;
                                            if (!(size > 0)) return [3 /*break*/, 6];
                                            lastMod_1 = new Date().toISOString();
                                            _c.label = 2;
                                        case 2:
                                            _c.trys.push([2, 4, , 5]);
                                            return [4 /*yield*/, fs.promises.stat(artPath)];
                                        case 3:
                                            stat = _c.sent();
                                            lastMod_1 = stat.mtime.toISOString();
                                            return [3 /*break*/, 5];
                                        case 4:
                                            _b = _c.sent();
                                            return [3 /*break*/, 5];
                                        case 5: return [2 /*return*/, {
                                                art: {
                                                    id: artPath,
                                                    name: entry.name,
                                                    path: artPath,
                                                    sizeBytes: size,
                                                    safety: rule.safety,
                                                    safetyReason: rule.reason,
                                                    lastModified: lastMod_1,
                                                    itemCount: count,
                                                },
                                                size: size,
                                            }];
                                        case 6: return [2 /*return*/, null];
                                    }
                                });
                            }); });
                            return [4 /*yield*/, Promise.all(artifactPromises)];
                        case 6:
                            artifactResults = _g.sent();
                            for (_i = 0, artifactResults_1 = artifactResults; _i < artifactResults_1.length; _i++) {
                                res = artifactResults_1[_i];
                                if (res) {
                                    artifacts.push(res.art);
                                    totalReclaimable += res.size;
                                }
                            }
                            nonArtifactSize = 0;
                            _b = 0, entries_1 = entries;
                            _g.label = 7;
                        case 7:
                            if (!(_b < entries_1.length)) return [3 /*break*/, 12];
                            entry = entries_1[_b];
                            if (!(!RECREATABLE_FOLDERS[entry.name] && !entry.name.startsWith('.git') && !entry.isSymbolicLink())) return [3 /*break*/, 11];
                            if (!entry.isFile()) return [3 /*break*/, 11];
                            _g.label = 8;
                        case 8:
                            _g.trys.push([8, 10, , 11]);
                            return [4 /*yield*/, fs.promises.stat(path.join(currentDir, entry.name))];
                        case 9:
                            stat = _g.sent();
                            nonArtifactSize += stat.size;
                            return [3 /*break*/, 11];
                        case 10:
                            _c = _g.sent();
                            return [3 /*break*/, 11];
                        case 11:
                            _b++;
                            return [3 /*break*/, 7];
                        case 12:
                            totalProjectSize = totalReclaimable + nonArtifactSize;
                            lastMod = new Date().toISOString();
                            _g.label = 13;
                        case 13:
                            _g.trys.push([13, 15, , 16]);
                            return [4 /*yield*/, fs.promises.stat(currentDir)];
                        case 14:
                            stat = _g.sent();
                            lastMod = stat.mtime.toISOString();
                            return [3 /*break*/, 16];
                        case 15:
                            _d = _g.sent();
                            return [3 /*break*/, 16];
                        case 16: return [4 /*yield*/, getRealGitMetadata(currentDir)];
                        case 17:
                            gitInfo = _g.sent();
                            scannedProjects.push({
                                id: currentDir,
                                name: path.basename(currentDir),
                                path: currentDir,
                                ecosystem: ecosystem,
                                lastModified: lastMod,
                                lastAccessed: lastMod,
                                totalSizeBytes: totalProjectSize,
                                reclaimableSizeBytes: totalReclaimable,
                                artifacts: artifacts,
                                gitInfo: gitInfo,
                            });
                            _g.label = 18;
                        case 18:
                            subPromises = [];
                            _e = 0, entries_2 = entries;
                            _g.label = 19;
                        case 19:
                            if (!(_e < entries_2.length)) return [3 /*break*/, 25];
                            entry = entries_2[_e];
                            if (entry.isSymbolicLink())
                                return [3 /*break*/, 24];
                            fullPath = path.join(currentDir, entry.name);
                            if (!entry.isDirectory()) return [3 /*break*/, 20];
                            // Skip recreatable artifact directories and hidden directories if configured
                            if (RECREATABLE_FOLDERS[entry.name] || entry.name === '.git')
                                return [3 /*break*/, 24];
                            if (ignoreHiddenFolders && entry.name.startsWith('.') && depth > 0)
                                return [3 /*break*/, 24];
                            subPromises.push(walk(fullPath, depth + 1));
                            return [3 /*break*/, 24];
                        case 20:
                            if (!entry.isFile()) return [3 /*break*/, 24];
                            _g.label = 21;
                        case 21:
                            _g.trys.push([21, 23, , 24]);
                            return [4 /*yield*/, fs.promises.stat(fullPath)];
                        case 22:
                            stat = _g.sent();
                            if (stat.size >= 100 * 1024 * 1024) { // 100MB+
                                largeFiles.push({
                                    id: fullPath,
                                    name: entry.name,
                                    path: fullPath,
                                    sizeBytes: stat.size,
                                    extension: path.extname(entry.name).toLowerCase(),
                                    lastModified: stat.mtime.toISOString(),
                                    parentProject: path.basename(currentDir),
                                    category: stat.size > 1024 * 1024 * 1024 ? 'archive' : 'build',
                                });
                                if (!filesBySize[stat.size])
                                    filesBySize[stat.size] = [];
                                filesBySize[stat.size].push({
                                    path: fullPath,
                                    name: entry.name,
                                    mtime: stat.mtime.toISOString(),
                                });
                            }
                            return [3 /*break*/, 24];
                        case 23:
                            _f = _g.sent();
                            return [3 /*break*/, 24];
                        case 24:
                            _e++;
                            return [3 /*break*/, 19];
                        case 25: return [4 /*yield*/, Promise.all(subPromises)];
                        case 26:
                            _g.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
        var options, maxDepth, ignoreHiddenFolders, ignoreSystemDirectories, ignorePaths, largeFiles, filesBySize, scannedProjects, lastProgressEmitted, throttledProgress, duplicates, dupCount, _i, _a, _b, sizeStr, files, sizeBytes, hashGroups, _c, files_1, f, hash, groupKey, _d, _e, groupFiles;
        var _f, _g, _h;
        if (optionsInput === void 0) { optionsInput = {}; }
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    options = Array.isArray(optionsInput)
                        ? { ignorePaths: optionsInput }
                        : optionsInput;
                    maxDepth = (_f = options.maxDepth) !== null && _f !== void 0 ? _f : 6;
                    ignoreHiddenFolders = (_g = options.ignoreHiddenFolders) !== null && _g !== void 0 ? _g : true;
                    ignoreSystemDirectories = (_h = options.ignoreSystemDirectories) !== null && _h !== void 0 ? _h : true;
                    ignorePaths = options.ignorePaths || [];
                    largeFiles = [];
                    filesBySize = {};
                    scannedProjects = [];
                    lastProgressEmitted = 0;
                    throttledProgress = function (pathStr) {
                        var now = Date.now();
                        if (now - lastProgressEmitted > 60) {
                            lastProgressEmitted = now;
                            if (progressCallback)
                                progressCallback(pathStr);
                        }
                    };
                    return [4 /*yield*/, walk(startDir)];
                case 1:
                    _j.sent();
                    duplicates = [];
                    dupCount = 1;
                    _i = 0, _a = Object.entries(filesBySize);
                    _j.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 8];
                    _b = _a[_i], sizeStr = _b[0], files = _b[1];
                    if (!(files.length > 1)) return [3 /*break*/, 7];
                    sizeBytes = Number(sizeStr);
                    hashGroups = {};
                    _c = 0, files_1 = files;
                    _j.label = 3;
                case 3:
                    if (!(_c < files_1.length)) return [3 /*break*/, 6];
                    f = files_1[_c];
                    return [4 /*yield*/, getFileHeaderHash(f.path)];
                case 4:
                    hash = _j.sent();
                    groupKey = "".concat(f.name, "_").concat(hash);
                    if (!hashGroups[groupKey])
                        hashGroups[groupKey] = [];
                    hashGroups[groupKey].push(f);
                    _j.label = 5;
                case 5:
                    _c++;
                    return [3 /*break*/, 3];
                case 6:
                    for (_d = 0, _e = Object.values(hashGroups); _d < _e.length; _d++) {
                        groupFiles = _e[_d];
                        if (groupFiles.length > 1) {
                            duplicates.push({
                                id: "dup_real_".concat(dupCount++),
                                hash: "size_".concat(sizeBytes),
                                name: groupFiles[0].name,
                                sizeBytes: sizeBytes,
                                potentialSavingsBytes: sizeBytes * (groupFiles.length - 1),
                                files: groupFiles.map(function (f, i) { return ({
                                    id: "dup_f_".concat(i, "_").concat(f.path),
                                    path: f.path,
                                    lastModified: f.mtime,
                                }); }),
                            });
                        }
                    }
                    _j.label = 7;
                case 7:
                    _i++;
                    return [3 /*break*/, 2];
                case 8: return [2 /*return*/, { projects: scannedProjects, largeFiles: largeFiles, duplicates: duplicates }];
            }
        });
    });
}
