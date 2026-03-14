'use client';

import React, { useMemo } from 'react';
import type { PageData } from '../../lib/types';

interface IssuesSeverityChartProps {
  pages: PageData[];
}

/**
 * IssuesSeverityChart component
 * Horizontal bar chart showing issue counts by severity
 */
export function IssuesSeverityChart({ pages }: IssuesSeverityChartProps) {
  const { critical, warning, notice, max } = useMemo(() => {
    let criticalCount = 0;
    let warningCount = 0;
    let noticeCount = 0;

    pages.forEach((page) => {
      page.issues.forEach((issue) => {
        if (issue.severity === 'critical') criticalCount++;
        else if (issue.severity === 'warning') warningCount++;
        else if (issue.severity === 'notice') noticeCount++;
      });
    });

    const maxCount = Math.max(criticalCount, warningCount, noticeCount, 1);

    return {
      critical: criticalCount,
      warning: warningCount,
      notice: noticeCount,
      max: maxCount,
    };
  }, [pages]);

  const Bar = ({
    label,
    value,
    colorClass,
    maxValue,
  }: {
    label: string;
    value: number;
    colorClass: string;
    maxValue: number;
  }) => {
    const widthPercent = maxValue > 0 ? (value / maxValue) * 100 : 0;

    return (
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-muted-foreground">{label}</span>
          <span className="text-xs font-semibold text-foreground">{value}</span>
        </div>
        <div className="h-6 bg-border rounded overflow-hidden">
          <div
            className={`h-full ${colorClass} transition-all duration-500 ease-out`}
            style={{ width: `${widthPercent}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="text-sm font-semibold text-foreground mb-4">Issues by Severity</h3>

      {critical === 0 && warning === 0 && notice === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
          <span className="text-2xl mb-2">✓</span>
          <span className="text-xs">No issues detected</span>
        </div>
      ) : (
        <div>
          <Bar
            label="Critical"
            value={critical}
            colorClass="bg-[var(--chart-4)]"
            maxValue={max}
          />
          <Bar
            label="Warning"
            value={warning}
            colorClass="bg-[var(--chart-3)]"
            maxValue={max}
          />
          <Bar
            label="Notice"
            value={notice}
            colorClass="bg-[var(--chart-2)]"
            maxValue={max}
          />
        </div>
      )}
    </div>
  );
}
