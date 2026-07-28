import React from 'react';
import { SafetyLevel } from '../../types/project';
import { ShieldCheck, ShieldAlert, AlertTriangle } from 'lucide-react';

interface SafetyBadgeProps {
  safety: SafetyLevel;
  reason?: string;
}

export const SafetyBadge: React.FC<SafetyBadgeProps> = ({ safety, reason }) => {
  const configs = {
    safe: {
      label: 'Safe',
      icon: ShieldCheck,
      classes: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    },
    review: {
      label: 'Review',
      icon: ShieldAlert,
      classes: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    },
    caution: {
      label: 'Caution',
      icon: AlertTriangle,
      classes: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    },
  };

  const config = configs[safety];
  const Icon = config.icon;

  return (
    <span
      title={reason}
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.classes} transition-all`}
    >
      <Icon className="w-3.5 h-3.5" />
      <span>{config.label}</span>
    </span>
  );
};
