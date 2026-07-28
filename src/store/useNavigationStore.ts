import { create } from 'zustand';

export type ActiveTab = 
  | 'dashboard'
  | 'analyzer'
  | 'artifacts'
  | 'large-files'
  | 'duplicates'
  | 'git'
  | 'caches'
  | 'trash'
  | 'reports'
  | 'settings';

export interface GlobalOperationState {
  isActive: boolean;
  title: string;
  subtitle?: string;
  currentStep: number;
  totalSteps: number;
  currentItemName: string;
  statusMessage?: string;
}

interface NavigationState {
  activeTab: ActiveTab;
  searchQuery: string;
  isConfirmModalOpen: boolean;
  pendingDeleteItems: {
    projectId?: string;
    artifactId?: string;
    path: string;
    projectName: string;
    folderName: string;
    sizeBytes: number;
    safetyReason: string;
  }[];
  globalOperation: GlobalOperationState;

  // Actions
  setActiveTab: (tab: ActiveTab) => void;
  setSearchQuery: (query: string) => void;
  openConfirmModal: (items: NavigationState['pendingDeleteItems']) => void;
  closeConfirmModal: () => void;
  startGlobalOperation: (title: string, subtitle?: string, totalSteps?: number) => void;
  updateGlobalOperationProgress: (currentStep: number, currentItemName: string, statusMessage?: string) => void;
  finishGlobalOperation: () => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  activeTab: 'dashboard',
  searchQuery: '',
  isConfirmModalOpen: false,
  pendingDeleteItems: [],
  globalOperation: {
    isActive: false,
    title: '',
    subtitle: '',
    currentStep: 0,
    totalSteps: 0,
    currentItemName: '',
    statusMessage: '',
  },

  setActiveTab: (tab: ActiveTab) => set({ activeTab: tab }),
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  openConfirmModal: (items) => set({ isConfirmModalOpen: true, pendingDeleteItems: items }),
  closeConfirmModal: () => set({ isConfirmModalOpen: false, pendingDeleteItems: [] }),
  startGlobalOperation: (title, subtitle = '', totalSteps = 1) =>
    set({
      globalOperation: {
        isActive: true,
        title,
        subtitle,
        currentStep: 0,
        totalSteps,
        currentItemName: 'Initializing...',
        statusMessage: '',
      },
    }),
  updateGlobalOperationProgress: (currentStep, currentItemName, statusMessage = '') =>
    set((state) => ({
      globalOperation: {
        ...state.globalOperation,
        currentStep,
        currentItemName,
        statusMessage,
      },
    })),
  finishGlobalOperation: () =>
    set((state) => ({
      globalOperation: {
        ...state.globalOperation,
        isActive: false,
      },
    })),
}));
