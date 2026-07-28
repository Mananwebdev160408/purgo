import fs from 'fs';
import path from 'path';
import os from 'os';
import { CacheItem } from '../src/types/cache';
import { calculateFolderSize } from './scanner';

export async function scanSystemCaches(): Promise<CacheItem[]> {
  const homeDir = os.homedir();
  const localAppData = process.env.LOCALAPPDATA || path.join(homeDir, 'AppData', 'Local');

  const potentialCaches: { id: string; name: string; ecosystem: CacheItem['ecosystem']; path: string; description: string; safety: 'safe' | 'review' }[] = [
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

  // Scan all system caches in parallel for max throughput
  const cacheResults = await Promise.all(
    potentialCaches.map(async (cache) => {
      if (fs.existsSync(cache.path)) {
        try {
          const { size } = await calculateFolderSize(cache.path);
          if (size > 0) {
            return {
              id: cache.id,
              name: cache.name,
              ecosystem: cache.ecosystem,
              path: cache.path,
              sizeBytes: size,
              description: cache.description,
              safety: cache.safety,
            } as CacheItem;
          }
        } catch {
          // Skip if inaccessible
        }
      }
      return null;
    })
  );

  return cacheResults.filter((c): c is CacheItem => c !== null);
}
