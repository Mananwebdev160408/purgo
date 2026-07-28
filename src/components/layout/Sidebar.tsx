import React from 'react';
import { useNavigationStore, ActiveTab } from '../../store/useNavigationStore';
import { useTrashStore } from '../../store/useTrashStore';
import { useScanStore } from '../../store/useScanStore';
import { PurgoLogo } from '../common/PurgoLogo';
import {
  LayoutDashboard,
  PieChart,
  ShieldCheck,
  FileArchive,
  Copy,
  GitBranch,
  Database,
  Trash2,
  BarChart3,
  Settings,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab } = useNavigationStore();
  const { trashItems } = useTrashStore();
  const { projects } = useScanStore();

  const totalArtifacts = projects.reduce((acc, p) => acc + p.artifacts.length, 0);

  const navItems: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }>; badge?: number | string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analyzer', label: 'Storage Analyzer', icon: PieChart },
    { id: 'artifacts', label: 'Safe Build Artifacts', icon: ShieldCheck, badge: totalArtifacts },
    { id: 'large-files', label: 'Large File Finder', icon: FileArchive },
    { id: 'duplicates', label: 'Duplicate Finder', icon: Copy },
    { id: 'git', label: 'Git Repositories', icon: GitBranch },
    { id: 'caches', label: 'Ecosystem Caches', icon: Database },
    { id: 'trash', label: 'Purgo Trash', icon: Trash2, badge: trashItems.length },
    { id: 'reports', label: 'Reports & Stats', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-fluent-cardDark border-r border-fluent-cardBorderDark flex flex-col justify-between py-3 select-none">
      {/* Navigation Group */}
      <div className="space-y-1 px-2">
        <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-fluent-textSecondaryDark">
          Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-fluent-blue text-white shadow-sm'
                  : 'text-fluent-textSecondaryDark hover:text-fluent-textDark hover:bg-fluent-hoverDark'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-fluent-textSecondaryDark'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge !== 0 && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : item.id === 'trash'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-fluent-hoverDark text-fluent-textSecondaryDark'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Branding Info */}
      <div className="px-4 py-3 mx-2 bg-fluent-bgDark/60 border border-fluent-cardBorderDark rounded-lg">
        <div className="flex items-center justify-between text-xs font-semibold text-fluent-textDark">
          <div className="flex items-center gap-2">
            <PurgoLogo className="w-4 h-4 shrink-0" />
            <span>Purgo Safety Engine</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="System Ready" />
        </div>
        <div className="text-[10px] text-fluent-textSecondaryDark mt-0.5 pl-6">
          30-Day Trash Retention Active
        </div>
      </div>
    </aside>
  );
};
