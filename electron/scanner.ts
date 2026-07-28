import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { ProjectItem, ArtifactFolder, LargeFileItem, DuplicateGroup, EcosystemType } from '../src/types/project';
import { ScanOptions } from '../src/types/settings';

// Safe-to-remove definitions and rules
const RECREATABLE_FOLDERS: Record<string, { safety: 'safe' | 'review' | 'caution'; reason: string }> = {
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

const PROJECT_INDICATORS: { file: string; ecosystem: EcosystemType }[] = [
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

const SYSTEM_DIRECTORIES = [
  '$recycle.bin',
  'system volume information',
  'windows',
  'program files',
  'program files (x86)',
  'appdata\\local\\temp',
];

async function withNoAsar<T>(fn: () => Promise<T>): Promise<T> {
  const original = (process as any).noAsar;
  (process as any).noAsar = true;
  try {
    return await fn();
  } finally {
    (process as any).noAsar = original;
  }
}

export async function calculateFolderSize(folderPath: string): Promise<{ size: number; count: number }> {
  return withNoAsar(async () => {
    let totalSize = 0;
    let totalCount = 0;

    try {
      const entries = await fs.promises.readdir(folderPath, { withFileTypes: true });

      // Process entries in parallel batches with bounded concurrency
      const BATCH_SIZE = 64;
      for (let i = 0; i < entries.length; i += BATCH_SIZE) {
        const batch = entries.slice(i, i + BATCH_SIZE);
        const results = await Promise.all(
          batch.map(async (entry) => {
            // Skip symbolic links & junctions to prevent infinite loops
            if (entry.isSymbolicLink()) {
              return { size: 0, count: 0 };
            }
            const fullPath = path.join(folderPath, entry.name);
            if (entry.isDirectory()) {
              return await calculateFolderSize(fullPath);
            } else if (entry.isFile()) {
              try {
                const stats = await fs.promises.stat(fullPath);
                return { size: stats.size, count: 1 };
              } catch {
                return { size: 0, count: 0 };
              }
            }
            return { size: 0, count: 0 };
          })
        );

        for (const res of results) {
          totalSize += res.size;
          totalCount += res.count;
        }
      }
    } catch {
      // Ignore read or permission errors
    }

    return { size: totalSize, count: totalCount };
  });
}

export async function detectEcosystem(projectPath: string): Promise<EcosystemType> {
  try {
    const files = await fs.promises.readdir(projectPath);
    if (files.includes('package.json')) {
      const content = await fs.promises.readFile(path.join(projectPath, 'package.json'), 'utf-8');
      if (content.includes('next')) return 'Next.js';
      if (content.includes('vite')) return 'Vite';
      if (content.includes('react')) return 'React';
      if (content.includes('vue')) return 'Vue';
      if (content.includes('nuxt')) return 'Nuxt';
      if (content.includes('angular')) return 'Angular';
      if (content.includes('@sveltejs/kit')) return 'Svelte';
      if (content.includes('electron')) return 'Electron';
      if (content.includes('@tauri-apps/api')) return 'Tauri';
      if (content.includes('nest')) return 'NestJS';
      if (content.includes('express')) return 'Express';
      return 'Node.js';
    }

    for (const item of PROJECT_INDICATORS) {
      if (files.includes(item.file)) {
        return item.ecosystem;
      }
    }
  } catch {
    // Ignore
  }
  return 'Node.js';
}

async function getRealGitMetadata(projectPath: string): Promise<ProjectItem['gitInfo']> {
  const gitDir = path.join(projectPath, '.git');
  if (!fs.existsSync(gitDir)) return undefined;

  let branch = 'main';
  let lastCommitDate = new Date().toISOString();
  let remoteUrl: string | undefined = undefined;
  let uncommittedChanges = false;

  try {
    const headPath = path.join(gitDir, 'HEAD');
    if (fs.existsSync(headPath)) {
      const headContent = await fs.promises.readFile(headPath, 'utf-8');
      if (headContent.includes('refs/heads/')) {
        branch = headContent.split('refs/heads/')[1].trim();
      } else {
        branch = headContent.substring(0, 7);
      }
      const stat = await fs.promises.stat(headPath);
      lastCommitDate = stat.mtime.toISOString();
    }

    const configPath = path.join(gitDir, 'config');
    if (fs.existsSync(configPath)) {
      const configContent = await fs.promises.readFile(configPath, 'utf-8');
      const match = configContent.match(/url\s*=\s*(.+)/);
      if (match) remoteUrl = match[1].trim();
    }

    const indexPath = path.join(gitDir, 'index');
    if (fs.existsSync(indexPath)) {
      const indexStat = await fs.promises.stat(indexPath);
      const headStat = await fs.promises.stat(headPath);
      uncommittedChanges = indexStat.mtimeMs > headStat.mtimeMs + 2000;
    }
  } catch {}

  const now = Date.now();
  const commitTime = new Date(lastCommitDate).getTime();
  const isStale = (now - commitTime) > 60 * 24 * 60 * 60 * 1000; // > 60 days

  return {
    branch,
    uncommittedChanges,
    remoteUrl,
    lastCommitDate,
    isStale,
  };
}

async function getFileHeaderHash(filePath: string): Promise<string> {
  try {
    const handle = await fs.promises.open(filePath, 'r');
    const buffer = Buffer.alloc(64 * 1024);
    const { bytesRead } = await handle.read(buffer, 0, buffer.length, 0);
    await handle.close();
    return crypto.createHash('md5').update(buffer.subarray(0, bytesRead)).digest('hex');
  } catch {
    return filePath;
  }
}

export async function scanDirectoryForProjects(
  startDir: string,
  optionsInput: ScanOptions | string[] = {},
  progressCallback?: (path: string) => void
): Promise<{
  projects: ProjectItem[];
  largeFiles: LargeFileItem[];
  duplicates: DuplicateGroup[];
}> {
  const options: ScanOptions = Array.isArray(optionsInput)
    ? { ignorePaths: optionsInput }
    : optionsInput;

  const maxDepth = options.maxDepth ?? 6;
  const ignoreHiddenFolders = options.ignoreHiddenFolders ?? true;
  const ignoreSystemDirectories = options.ignoreSystemDirectories ?? true;
  const ignorePaths = options.ignorePaths || [];

  const largeFiles: LargeFileItem[] = [];
  const filesBySize: Record<number, { path: string; name: string; mtime: string }[]> = {};
  const scannedProjects: ProjectItem[] = [];

  // Throttle IPC updates so renderer main thread is never overloaded
  let lastProgressEmitted = 0;
  const throttledProgress = (pathStr: string) => {
    const now = Date.now();
    if (now - lastProgressEmitted > 60) {
      lastProgressEmitted = now;
      if (progressCallback) progressCallback(pathStr);
    }
  };

  async function walk(currentDir: string, depth = 0) {
    if (depth > maxDepth) return;

    const lowerDir = currentDir.toLowerCase();

    // Check user-configured ignore paths
    if (ignorePaths.some(ip => lowerDir.startsWith(ip.toLowerCase()))) return;

    // Check system directory exclusions
    if (ignoreSystemDirectories) {
      if (SYSTEM_DIRECTORIES.some(sys => lowerDir.includes(sys))) return;
    }

    throttledProgress(currentDir);

    let entries: fs.Dirent[] = [];
    try {
      entries = await fs.promises.readdir(currentDir, { withFileTypes: true });
    } catch {
      return;
    }

    const fileNames = entries.map(e => e.name);
    const isProjectRoot = PROJECT_INDICATORS.some(ind => fileNames.includes(ind.file)) || fileNames.includes('.git');

    if (isProjectRoot) {
      const ecosystem = await detectEcosystem(currentDir);
      const artifacts: ArtifactFolder[] = [];
      let totalReclaimable = 0;

      // Scan recreatable artifact subfolders in parallel
      const artifactPromises = entries
        .filter(entry => entry.isDirectory() && !entry.isSymbolicLink() && RECREATABLE_FOLDERS[entry.name])
        .map(async (entry) => {
          const artPath = path.join(currentDir, entry.name);
          const rule = RECREATABLE_FOLDERS[entry.name];
          const { size, count } = await calculateFolderSize(artPath);

          if (size > 0) {
            let lastMod = new Date().toISOString();
            try {
              const stat = await fs.promises.stat(artPath);
              lastMod = stat.mtime.toISOString();
            } catch {}

            return {
              art: {
                id: artPath,
                name: entry.name,
                path: artPath,
                sizeBytes: size,
                safety: rule.safety,
                safetyReason: rule.reason,
                lastModified: lastMod,
                itemCount: count,
              } as ArtifactFolder,
              size,
            };
          }
          return null;
        });

      const artifactResults = await Promise.all(artifactPromises);
      for (const res of artifactResults) {
        if (res) {
          artifacts.push(res.art);
          totalReclaimable += res.size;
        }
      }

      // Calculate total project directory size (reclaimable artifacts + non-artifact files)
      let nonArtifactSize = 0;
      for (const entry of entries) {
        if (!RECREATABLE_FOLDERS[entry.name] && !entry.name.startsWith('.git') && !entry.isSymbolicLink()) {
          if (entry.isFile()) {
            try {
              const stat = await fs.promises.stat(path.join(currentDir, entry.name));
              nonArtifactSize += stat.size;
            } catch {}
          }
        }
      }

      const totalProjectSize = totalReclaimable + nonArtifactSize;

      let lastMod = new Date().toISOString();
      try {
        const stat = await fs.promises.stat(currentDir);
        lastMod = stat.mtime.toISOString();
      } catch {}

      const gitInfo = await getRealGitMetadata(currentDir);

      scannedProjects.push({
        id: currentDir,
        name: path.basename(currentDir),
        path: currentDir,
        ecosystem,
        lastModified: lastMod,
        lastAccessed: lastMod,
        totalSizeBytes: totalProjectSize,
        reclaimableSizeBytes: totalReclaimable,
        artifacts,
        gitInfo,
      });
    }

    // Continue walk into subdirectories (allows monorepos and sub-projects to be discovered)
    const subPromises: Promise<void>[] = [];

    for (const entry of entries) {
      if (entry.isSymbolicLink()) continue;

      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        // Skip recreatable artifact directories and hidden directories if configured
        if (RECREATABLE_FOLDERS[entry.name] || entry.name === '.git') continue;
        if (ignoreHiddenFolders && entry.name.startsWith('.') && depth > 0) continue;

        subPromises.push(walk(fullPath, depth + 1));
      } else if (entry.isFile()) {
        try {
          const stat = await fs.promises.stat(fullPath);
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

            if (!filesBySize[stat.size]) filesBySize[stat.size] = [];
            filesBySize[stat.size].push({
              path: fullPath,
              name: entry.name,
              mtime: stat.mtime.toISOString(),
            });
          }
        } catch {}
      }
    }

    await Promise.all(subPromises);
  }

  await walk(startDir);

  // Group verified duplicates (using size + header hash verification)
  const duplicates: DuplicateGroup[] = [];
  let dupCount = 1;

  for (const [sizeStr, files] of Object.entries(filesBySize)) {
    if (files.length > 1) {
      const sizeBytes = Number(sizeStr);
      const hashGroups: Record<string, typeof files> = {};

      for (const f of files) {
        const hash = await getFileHeaderHash(f.path);
        const groupKey = `${f.name}_${hash}`;
        if (!hashGroups[groupKey]) hashGroups[groupKey] = [];
        hashGroups[groupKey].push(f);
      }

      for (const groupFiles of Object.values(hashGroups)) {
        if (groupFiles.length > 1) {
          duplicates.push({
            id: `dup_real_${dupCount++}`,
            hash: `size_${sizeBytes}`,
            name: groupFiles[0].name,
            sizeBytes,
            potentialSavingsBytes: sizeBytes * (groupFiles.length - 1),
            files: groupFiles.map((f, i) => ({
              id: `dup_f_${i}_${f.path}`,
              path: f.path,
              lastModified: f.mtime,
            })),
          });
        }
      }
    }
  }

  return { projects: scannedProjects, largeFiles, duplicates };
}
