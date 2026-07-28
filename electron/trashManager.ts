import fs from 'fs';
import path from 'path';
import os from 'os';
import { exec } from 'child_process';
import util from 'util';
import { TrashItem } from '../src/types/trash';

const execAsync = util.promisify(exec);
const PURGO_DIR = path.join(os.homedir(), '.purgo');
const TRASH_DIR = path.join(PURGO_DIR, 'trash');
const MANIFEST_PATH = path.join(PURGO_DIR, 'trash_manifest.json');

/**
 * Execute filesystem operations with Electron ASAR interception disabled.
 * This prevents "Invalid package default_app.asar" errors when handling node_modules or build outputs.
 */
async function withNoAsar<T>(fn: () => Promise<T>): Promise<T> {
  const original = (process as any).noAsar;
  (process as any).noAsar = true;
  try {
    return await fn();
  } finally {
    (process as any).noAsar = original;
  }
}

async function clearReadOnlyAttribute(targetPath: string) {
  if (process.platform === 'win32') {
    try {
      await execAsync(`attrib -r "${targetPath}\\*.*" /s /d`);
    } catch {}
  }
}

async function safeRemove(target: string) {
  if (!fs.existsSync(target)) return;
  return withNoAsar(async () => {
    try {
      await fs.promises.rm(target, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
    } catch {
      await clearReadOnlyAttribute(target);
      try {
        await fs.promises.rm(target, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
      } catch (err) {
        console.error(`safeRemove failed for ${target}:`, err);
        throw err;
      }
    }
  });
}

async function safeMove(source: string, destination: string) {
  return withNoAsar(async () => {
    // 1. Fast rename attempt loop (instant 0-byte move on same volume)
    for (let attempt = 1; attempt <= 5; attempt++) {
      try {
        await fs.promises.rename(source, destination);
        return;
      } catch (err: any) {
        if (attempt < 5) {
          await new Promise(res => setTimeout(res, 100 * attempt));
        }
      }
    }

    // 2. Retry rename after clearing read-only attributes if initial rename fails
    await clearReadOnlyAttribute(source);
    try {
      await fs.promises.rename(source, destination);
      return;
    } catch {}

    // 3. Fallback copy across drives / filesystems
    try {
      await fs.promises.cp(source, destination, { recursive: true, force: true, verbatimSymlinks: true });
    } catch (cpErr: any) {
      await safeRemove(destination).catch(() => {});
      throw new Error(`Cannot copy folder "${source}" to Purgo Trash. Files may be locked by an active process. (${cpErr.message})`);
    }

    // 4. Rollback destination if original source cannot be removed, PREVENTING DOUBLE DISK SPACE CONSUMPTION!
    try {
      await safeRemove(source);
    } catch (rmErr: any) {
      await safeRemove(destination).catch(() => {});
      throw new Error(`Folder "${source}" is in use by an active background process (e.g. VS Code, Node, or Cargo). Rollback performed to prevent disk space duplication.`);
    }
  });
}

export class PurgoTrashManager {
  private retentionDays: number = 30;

  constructor(retentionDays = 30) {
    this.retentionDays = retentionDays;
    this.ensureDirs();
  }

  private ensureDirs() {
    if (!fs.existsSync(PURGO_DIR)) {
      fs.mkdirSync(PURGO_DIR, { recursive: true });
    }
    if (!fs.existsSync(TRASH_DIR)) {
      fs.mkdirSync(TRASH_DIR, { recursive: true });
    }
    if (!fs.existsSync(MANIFEST_PATH)) {
      fs.writeFileSync(MANIFEST_PATH, JSON.stringify([], null, 2), 'utf-8');
    }
  }

  public getManifest(): TrashItem[] {
    this.ensureDirs();
    try {
      const data = fs.readFileSync(MANIFEST_PATH, 'utf-8');
      const items: TrashItem[] = JSON.parse(data);
      
      const now = Date.now();
      return items.map(item => {
        const expTime = new Date(item.expiresAt).getTime();
        const diffDays = Math.max(0, Math.ceil((expTime - now) / (1000 * 60 * 60 * 24)));
        return {
          ...item,
          daysRemaining: diffDays,
        };
      });
    } catch {
      return [];
    }
  }

  private saveManifest(items: TrashItem[]) {
    this.ensureDirs();
    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(items, null, 2), 'utf-8');
  }

  public setRetentionDays(days: number) {
    this.retentionDays = days;
  }

  public async moveToTrash(
    sourcePath: string,
    projectName: string,
    folderName: string,
    sizeBytes: number
  ): Promise<TrashItem> {
    this.ensureDirs();

    if (!fs.existsSync(sourcePath)) {
      throw new Error(`Source path does not exist: ${sourcePath}`);
    }

    const id = 'trash_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
    const targetFolderInTrash = path.join(TRASH_DIR, id);
    const destinationPath = path.join(targetFolderInTrash, path.basename(sourcePath));

    fs.mkdirSync(targetFolderInTrash, { recursive: true });

    // Move folder into Purgo Trash safely without ASAR error or permission locks
    await safeMove(sourcePath, destinationPath);

    const deletedAt = new Date();
    const expiresAt = new Date(deletedAt.getTime() + this.retentionDays * 24 * 60 * 60 * 1000);

    const newItem: TrashItem = {
      id,
      originalPath: sourcePath,
      trashPath: destinationPath,
      projectName,
      folderName,
      fileType: path.extname(sourcePath) || 'Folder',
      sizeBytes,
      deletedAt: deletedAt.toISOString(),
      expiresAt: expiresAt.toISOString(),
      daysRemaining: this.retentionDays,
    };

    const manifest = this.getManifest();
    manifest.unshift(newItem);
    this.saveManifest(manifest);

    return newItem;
  }

  public async purgePathPermanently(targetPath: string): Promise<boolean> {
    if (!fs.existsSync(targetPath)) return true;
    await safeRemove(targetPath);
    return true;
  }

  public async restoreItem(id: string): Promise<boolean> {
    const manifest = this.getManifest();
    const item = manifest.find(i => i.id === id);
    if (!item) return false;

    if (!fs.existsSync(item.trashPath)) {
      throw new Error(`Trash item not found on disk at ${item.trashPath}`);
    }

    const targetDir = path.dirname(item.originalPath);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Move back to original path safely
    await safeMove(item.trashPath, item.originalPath);

    // Clean up empty container folder in trash
    const container = path.dirname(item.trashPath);
    await safeRemove(container);

    const updatedManifest = manifest.filter(i => i.id !== id);
    this.saveManifest(updatedManifest);

    return true;
  }

  public async deletePermanently(id: string): Promise<boolean> {
    const manifest = this.getManifest();
    const item = manifest.find(i => i.id === id);
    if (!item) return false;

    const container = path.dirname(item.trashPath);
    if (fs.existsSync(container)) {
      await safeRemove(container);
    }

    const updatedManifest = manifest.filter(i => i.id !== id);
    this.saveManifest(updatedManifest);
    return true;
  }

  public async emptyTrash(): Promise<number> {
    const manifest = this.getManifest();
    let deletedCount = 0;
    for (const item of manifest) {
      await this.deletePermanently(item.id);
      deletedCount++;
    }
    return deletedCount;
  }

  public async purgeExpiredItems(): Promise<number> {
    const manifest = this.getManifest();
    const now = Date.now();
    let purgedCount = 0;

    for (const item of manifest) {
      const expTime = new Date(item.expiresAt).getTime();
      if (now >= expTime) {
        await this.deletePermanently(item.id);
        purgedCount++;
      }
    }
    return purgedCount;
  }
}
