import React, { useEffect } from 'react';
import { Titlebar } from './components/layout/Titlebar';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { StatusBar } from './components/layout/StatusBar';
import { ConfirmDeleteModal } from './components/common/ConfirmDeleteModal';
import { GlobalOperationOverlay } from './components/common/GlobalOperationOverlay';
import { useNavigationStore } from './store/useNavigationStore';
import { useTrashStore } from './store/useTrashStore';
import { useScanStore } from './store/useScanStore';
import { useSettingsStore } from './store/useSettingsStore';

import { DashboardView } from './components/views/DashboardView';
import { StorageAnalyzerView } from './components/views/StorageAnalyzerView';
import { SafeArtifactsView } from './components/views/SafeArtifactsView';
import { LargeFilesView } from './components/views/LargeFilesView';
import { DuplicatesView } from './components/views/DuplicatesView';
import { GitManagerView } from './components/views/GitManagerView';
import { CacheManagerView } from './components/views/CacheManagerView';
import { PurgoTrashView } from './components/views/PurgoTrashView';
import { ReportsView } from './components/views/ReportsView';
import { SettingsView } from './components/views/SettingsView';

export const App: React.FC = () => {
  const { activeTab } = useNavigationStore();
  const { loadTrash } = useTrashStore();
  const { initLiveScan } = useScanStore();
  const { initTheme } = useSettingsStore();

  useEffect(() => {
    initTheme();
    loadTrash();
    initLiveScan();
  }, [initTheme, loadTrash, initLiveScan]);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'analyzer':
        return <StorageAnalyzerView />;
      case 'artifacts':
        return <SafeArtifactsView />;
      case 'large-files':
        return <LargeFilesView />;
      case 'duplicates':
        return <DuplicatesView />;
      case 'git':
        return <GitManagerView />;
      case 'caches':
        return <CacheManagerView />;
      case 'trash':
        return <PurgoTrashView />;
      case 'reports':
        return <ReportsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-fluent-bgDark text-fluent-textDark overflow-hidden select-none">
      {/* Windows Frameless Titlebar */}
      <Titlebar />

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar />

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-fluent-bgDark">
          <Header />
          <main className="flex-1 overflow-y-auto bg-fluent-bgDark/40 scrollbar-thin scrollbar-thumb-fluent-cardBorderDark">
            {renderActiveView()}
          </main>
          <StatusBar />
        </div>
      </div>

      {/* Reversible Purgo Trash Delete Modal & Global Progress Overlay */}
      <ConfirmDeleteModal />
      <GlobalOperationOverlay />
    </div>
  );
};

export default App;
