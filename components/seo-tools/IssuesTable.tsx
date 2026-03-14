'use client';

import { PageData } from '../lib/seoAnalyser';
import type { Issue } from '../lib/types';

interface AggregatedIssue {
  code: string;
  message: string;
  severity: 'critical' | 'warning' | 'notice';
  count: number;
  pages: string[];
}

interface Props {
  results: PageData[];
}

export default function IssuesTable({ results }: Props) {
  // Aggregate issues across all pages
  const issueMap: Record<string, AggregatedIssue> = {};

  for (const r of results) {
    for (const issue of r.issues ?? []) {
      const key = issue.code;
      if (!issueMap[key]) {
        issueMap[key] = {
          code: issue.code,
          message: issue.message,
          severity: issue.severity,
          count: 0,
          pages: [],
        };
      }
      issueMap[key].count++;
      if (!issueMap[key].pages.includes(r.url)) {
        issueMap[key].pages.push(r.url);
      }
    }
  }

  const sorted = Object.values(issueMap).sort((a, b) => {
    // Sort by severity first, then by count
    const severityOrder = { critical: 0, warning: 1, notice: 2 };
    if (severityOrder[a.severity] !== severityOrder[b.severity]) {
      return severityOrder[a.severity] - severityOrder[b.severity];
    }
    return b.count - a.count;
  });

  function severityClasses(severity: 'critical' | 'warning' | 'notice'): string {
    switch (severity) {
      case 'critical':
        return 'text-destructive bg-destructive/10 border-destructive/30';
      case 'warning':
        return 'text-[var(--chart-3)] bg-[var(--chart-3)]/10 border-[var(--chart-3)]/30';
      case 'notice':
        return 'text-[var(--chart-2)] bg-[var(--chart-2)]/10 border-[var(--chart-2)]/30';
    }
  }

  function severityBadge(severity: 'critical' | 'warning' | 'notice'): string {
    return severity.charAt(0).toUpperCase() + severity.slice(1);
  }

  return (
    <div>
      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-destructive/10 border border-destructive/30 rounded p-3">
          <p className="text-xs text-destructive">Critical</p>
          <p className="text-2xl font-bold text-destructive-foreground">
            {results.flatMap((r) => r.issues ?? []).filter((i) => i.severity === 'critical').length}
          </p>
        </div>
        <div className="bg-[var(--chart-3)]/10 border border-[var(--chart-3)]/30 rounded p-3">
          <p className="text-xs text-[var(--chart-3)]">Warning</p>
          <p className="text-2xl font-bold text-foreground">
            {results.flatMap((r) => r.issues ?? []).filter((i) => i.severity === 'warning').length}
          </p>
        </div>
        <div className="bg-[var(--chart-2)]/10 border border-[var(--chart-2)]/30 rounded p-3">
          <p className="text-xs text-[var(--chart-2)]">Notice</p>
          <p className="text-2xl font-bold text-foreground">
            {results.flatMap((r) => r.issues ?? []).filter((i) => i.severity === 'notice').length}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded border border-border">
        <table className="w-full text-sm">
          <thead className="bg-card border-b border-border">
            <tr>
              <th className="px-3 py-2 text-left text-xs text-muted-foreground">Severity</th>
              <th className="px-3 py-2 text-left text-xs text-muted-foreground">Issue</th>
              <th className="px-3 py-2 text-left text-xs text-muted-foreground">Count</th>
              <th className="px-3 py-2 text-left text-xs text-muted-foreground">Affected Pages</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((item) => (
              <tr key={item.code} className="border-b border-border hover:bg-accent/50">
                <td className="px-3 py-2">
                  <span className={`text-xs px-2 py-0.5 rounded border ${severityClasses(item.severity)}`}>
                    {severityBadge(item.severity)}
                  </span>
                </td>
                <td className={`px-3 py-2 text-xs ${severityClasses(item.severity).split(' ')[0]}`}>
                  {item.message}
                </td>
                <td className="px-3 py-2 text-xs font-mono text-foreground">
                  {item.count}
                </td>
                <td className="px-3 py-2 text-xs text-muted-foreground">
                  <details>
                    <summary className="cursor-pointer hover:text-foreground">
                      {item.pages.length} page(s)
                    </summary>
                    <ul className="mt-1 space-y-0.5 ml-2">
                      {item.pages.slice(0, 8).map((p) => (
                        <li key={p} className="font-mono truncate max-w-xs text-muted-foreground/70">
                          {p}
                        </li>
                      ))}
                      {item.pages.length > 8 && (
                        <li className="text-muted-foreground/50">…and {item.pages.length - 8} more</li>
                      )}
                    </ul>
                  </details>
                </td>
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={4} className="px-3 py-6 text-center text-[var(--chart-1)] text-sm">
                  ✓ No issues detected
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground/70 mt-1">{sorted.length} unique issue types across {results.length} pages</p>
    </div>
  );
}
