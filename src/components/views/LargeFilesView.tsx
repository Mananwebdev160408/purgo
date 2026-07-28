import React, { useState } from 'react';
import { useScanStore } from '../../store/useScanStore';
import { useNavigationStore } from '../../store/useNavigationStore';
import { FileArchive, Trash2, Filter, HardDrive } from 'lucide-react';

export const LargeFilesView: React.FC = () => {
  const { largeFiles } = useScanStore();
  const { searchQuery, openConfirmModal } = useNavigationStore();
  const [minSizeMB, setMinSizeMB] = useState<number>(100);

  const filteredFiles = largeFiles.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) || f.path.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSize = f.sizeBytes >= minSizeMB * 1024 * 1024;
    return matchesSearch && matchesSize;
  });

  const formatSize = (bytes: number) => {
    if (bytes >= 1024 * 1024 * 1024) return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    return (bytes / (1024 * 1024)).toFixed(0) + ' MB';
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto animate-in fade-in duration-200">
      <div className="flex items-center justify-between bg-fluent-cardDark border border-fluent-cardBorderDark rounded-xl p-5 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20">
            <FileArchive className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-base text-fluent-textDark">Large File Finder</h2>
            <p className="text-xs text-fluent-textSecondaryDark">Locate large archives, ISOs, virtual disks, and build artifacts exceeding size thresholds.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Filter className="w-3.5 h-3.5 text-fluent-textSecondaryDark" />
          <span className="text-fluent-textSecondaryDark font-medium">Minimum Threshold:</span>
          <select
            value={minSizeMB}
            onChange={(e) => setMinSizeMB(Number(e.target.value))}
            className="bg-fluent-bgDark border border-fluent-cardBorderDark text-fluent-textDark rounded-lg px-3 py-1.5 focus:outline-none focus:border-fluent-blue font-medium"
          >
            <option value={100}>&gt; 100 MB</option>
            <option value={500}>&gt; 500 MB</option>
            <option value={1024}>&gt; 1 GB</option>
            <option value={5120}>&gt; 5 GB</option>
          </select>
        </div>
      </div>

      <div className="bg-fluent-cardDark border border-fluent-cardBorderDark rounded-xl overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-fluent-hoverDark/50 border-b border-fluent-cardBorderDark text-fluent-textSecondaryDark font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4">File Name & Path</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Last Modified</th>
              <th className="py-3 px-4 text-right">Size</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-fluent-cardBorderDark">
            {filteredFiles.map((file) => (
              <tr key={file.id} className="hover:bg-fluent-hoverDark/40 transition-colors">
                <td className="py-3 px-4">
                  <div className="font-semibold text-fluent-textDark">{file.name}</div>
                  <div className="text-[11px] font-mono text-fluent-textSecondaryDark truncate max-w-lg mt-0.5" title={file.path}>
                    {file.path}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded bg-fluent-bgDark border border-fluent-cardBorderDark text-[11px] font-mono text-purple-400 capitalize">
                    {file.category}
                  </span>
                </td>
                <td className="py-3 px-4 text-fluent-textSecondaryDark">
                  {new Date(file.lastModified).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 text-right font-mono font-bold text-fluent-textDark">
                  {formatSize(file.sizeBytes)}
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() =>
                      openConfirmModal([
                        {
                          artifactId: file.id,
                          path: file.path,
                          projectName: file.parentProject || 'Disk File',
                          folderName: file.name,
                          sizeBytes: file.sizeBytes,
                          safetyReason: 'User selected large file',
                        },
                      ])
                    }
                    className="p-1.5 text-fluent-textSecondaryDark hover:text-amber-400 hover:bg-fluent-hoverDark rounded-lg transition-colors"
                    title="Move file to Purgo Trash"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
