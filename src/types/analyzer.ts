import { SafetyLevel } from './project';

export interface StorageNode {
  id: string;
  name: string;
  path: string;
  type: 'drive' | 'category' | 'project' | 'folder' | 'artifact' | 'file';
  sizeBytes: number;
  percentageOfParent: number;
  percentageOfTotal: number;
  safety?: SafetyLevel;
  children?: StorageNode[];
}
