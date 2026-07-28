import React from 'react';
import { useNavigationStore } from '../../store/useNavigationStore';
import { Loader2 } from 'lucide-react';

export const GlobalOperationOverlay: React.FC = () => {
  const { globalOperation } = useNavigationStore();

  if (!globalOperation.isActive) return null;

  const { title, subtitle, currentStep, totalSteps, currentItemName, statusMessage } = globalOperation;

  const percentage = totalSteps > 0 ? Math.min(100, Math.round((currentStep / totalSteps) * 100)) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-fluent-cardDark border border-fluent-cardBorderDark text-fluent-textDark w-full max-w-md rounded-2xl shadow-2xl overflow-hidden p-6 space-y-5 flex flex-col items-center text-center">
        {/* Animated Loader Circle */}
        <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-fluent-green/10 border border-fluent-green/30 text-fluent-green">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>

        {/* Header Text */}
        <div className="space-y-1">
          <h3 className="font-bold text-lg text-fluent-textDark tracking-tight">{title}</h3>
          {subtitle && <p className="text-xs text-fluent-textSecondaryDark">{subtitle}</p>}
        </div>

        {/* Progress Bar & Counters */}
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-fluent-textDark truncate max-w-[240px]" title={currentItemName}>
              {currentItemName || 'Processing...'}
            </span>
            <span className="font-mono text-emerald-400 font-bold">{percentage}%</span>
          </div>

          <div className="w-full h-2 bg-fluent-bgDark rounded-full overflow-hidden border border-fluent-cardBorderDark">
            <div
              className="h-full bg-gradient-to-r from-fluent-green to-emerald-300 transition-all duration-300 rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </div>

          {totalSteps > 1 && (
            <div className="text-[11px] text-fluent-textSecondaryDark font-mono">
              Item {currentStep} of {totalSteps} processed
            </div>
          )}
        </div>

        {/* Status Message */}
        {statusMessage && (
          <div className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5 w-full">
            {statusMessage}
          </div>
        )}
      </div>
    </div>
  );
};
