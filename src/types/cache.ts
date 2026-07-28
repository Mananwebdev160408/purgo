export type CacheEcosystem = 
  | 'npm' | 'pnpm' | 'Yarn' | 'Bun' | 'Cargo' | 'Gradle' | 'Maven' | 'Pub' | 'VS Code' | 'Android Studio';

export interface CacheItem {
  id: string;
  name: string;
  ecosystem: CacheEcosystem;
  path: string;
  sizeBytes: number;
  description: string;
  safety: 'safe' | 'review';
  lastCleaned?: string;
  isSelected?: boolean;
}
