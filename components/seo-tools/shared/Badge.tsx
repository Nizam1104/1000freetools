import React from 'react';

interface BadgeProps {
  severity: 'critical' | 'warning' | 'notice' | 'pass';
  children: React.ReactNode;
  className?: string;
}

const SEVERITY_STYLES: Record<BadgeProps['severity'], string> = {
  critical: 'bg-destructive/20 text-destructive border-destructive/30',
  warning: 'bg-[var(--chart-3)]/20 text-[var(--chart-3)] border-[var(--chart-3)]/30',
  notice: 'bg-[var(--chart-2)]/20 text-[var(--chart-2)] border-[var(--chart-2)]/30',
  pass: 'bg-[var(--chart-1)]/20 text-[var(--chart-1)] border-[var(--chart-1)]/30',
};

export function Badge({ severity, children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${SEVERITY_STYLES[severity]} ${className}`}
    >
      {children}
    </span>
  );
}

interface ScoreBadgeProps {
  score: number;
  className?: string;
}

export function ScoreBadge({ score, className = '' }: ScoreBadgeProps) {
  let severity: 'pass' | 'warning' | 'critical';
  
  if (score >= 80) {
    severity = 'pass';
  } else if (score >= 50) {
    severity = 'warning';
  } else {
    severity = 'critical';
  }

  return (
    <Badge severity={severity} className={className}>
      {score}
    </Badge>
  );
}
