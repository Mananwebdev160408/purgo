export type SafetyLevel = 'safe' | 'review' | 'caution';
export type EcosystemType = 'Node.js' | 'React' | 'Next.js' | 'Vite' | 'Vue' | 'Nuxt' | 'Angular' | 'Svelte' | 'Remix' | 'Astro' | 'Electron' | 'Tauri' | 'Express' | 'NestJS' | 'Bun' | 'Deno' | 'Python' | 'Java' | 'Kotlin' | 'Rust' | 'Go' | 'Flutter' | 'C#' | 'C++' | 'Unity' | 'PHP';
export interface ArtifactFolder {
    id: string;
    name: string;
    path: string;
    sizeBytes: number;
    safety: SafetyLevel;
    safetyReason: string;
    lastModified: string;
    itemCount: number;
    isSelected?: boolean;
}
export interface ProjectItem {
    id: string;
    name: string;
    path: string;
    ecosystem: EcosystemType;
    frameworkIcon?: string;
    lastModified: string;
    lastAccessed: string;
    totalSizeBytes: number;
    reclaimableSizeBytes: number;
    artifacts: ArtifactFolder[];
    gitInfo?: {
        branch: string;
        uncommittedChanges: boolean;
        remoteUrl?: string;
        lastCommitDate: string;
        isStale: boolean;
    };
}
export interface LargeFileItem {
    id: string;
    name: string;
    path: string;
    sizeBytes: number;
    extension: string;
    lastModified: string;
    parentProject?: string;
    category: 'build' | 'archive' | 'media' | 'installer' | 'virtual_env' | 'other';
    isSelected?: boolean;
}
export interface DuplicateGroup {
    id: string;
    hash: string;
    name: string;
    sizeBytes: number;
    potentialSavingsBytes: number;
    files: {
        id: string;
        path: string;
        lastModified: string;
        parentProject?: string;
        isSelected?: boolean;
    }[];
}
