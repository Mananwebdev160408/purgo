import { create } from 'zustand';
import { TrashItem } from '../types/trash';
import { ApiBridge } from '../services/apiBridge';

interface TrashState {
  trashItems: TrashItem[];
  retentionDays: number;
  isLoading: boolean;
  
  // Actions
  loadTrash: () => Promise<void>;
  moveToTrash: (sourcePath: string, projectName: string, folderName: string, sizeBytes: number) => Promise<TrashItem>;
  restoreItem: (id: string) => Promise<boolean>;
  deletePermanently: (id: string) => Promise<boolean>;
  emptyTrash: () => Promise<number>;
  setRetentionDays: (days: number) => Promise<void>;
  toggleItemSelection: (id: string) => void;
  selectAll: (select: boolean) => void;
}

export const useTrashStore = create<TrashState>((set, get) => ({
  trashItems: [],
  retentionDays: 30,
  isLoading: false,

  loadTrash: async () => {
    set({ isLoading: true });
    try {
      const manifest = await ApiBridge.getTrashManifest();
      set({ trashItems: manifest || [] });
    } catch {
      set({ trashItems: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  moveToTrash: async (sourcePath: string, projectName: string, folderName: string, sizeBytes: number) => {
    const newItem = await ApiBridge.moveToTrash(sourcePath, projectName, folderName, sizeBytes);
    set(state => ({
      trashItems: [newItem, ...state.trashItems],
    }));
    return newItem;
  },

  restoreItem: async (id: string) => {
    const success = await ApiBridge.restoreFromTrash(id);
    if (success) {
      set(state => ({
        trashItems: state.trashItems.filter(item => item.id !== id),
      }));
    }
    return success;
  },

  deletePermanently: async (id: string) => {
    const success = await ApiBridge.deletePermanently(id);
    if (success) {
      set(state => ({
        trashItems: state.trashItems.filter(item => item.id !== id),
      }));
    }
    return success;
  },

  emptyTrash: async () => {
    const count = await ApiBridge.emptyTrash();
    set({ trashItems: [] });
    return count;
  },

  setRetentionDays: async (days: number) => {
    await ApiBridge.setRetentionDays(days);
    set({ retentionDays: days });
  },

  toggleItemSelection: (id: string) => {
    set(state => ({
      trashItems: state.trashItems.map(item => {
        if (item.id !== id) return item;
        return { ...item, isSelected: !item.isSelected };
      }),
    }));
  },

  selectAll: (select: boolean) => {
    set(state => ({
      trashItems: state.trashItems.map(item => ({ ...item, isSelected: select })),
    }));
  },
}));
