export interface TrashItem {
    id: string;
    originalPath: string;
    trashPath: string;
    projectName: string;
    folderName: string;
    fileType: string;
    sizeBytes: number;
    deletedAt: string;
    expiresAt: string;
    daysRemaining: number;
    isSelected?: boolean;
}
export interface TrashSummary {
    totalItems: number;
    totalSizeBytes: number;
    oldestItemDate: string | null;
}
