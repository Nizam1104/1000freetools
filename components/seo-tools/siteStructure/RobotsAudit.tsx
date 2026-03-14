/**
 * Robots.txt Audit Component
 *
 * Displays robots.txt analysis:
 * - Parsed rules
 * - Blocked pages
 * - Recommendations
 */

"use client";

import { useMemo, useState } from "react";
import type { PageData } from "@/lib/seo-tools-lib/types";
import {
  performRobotsAudit,
  getRobotsIssues,
  type RobotsAnalysis,
} from "@/lib/seo-tools-lib/siteAnalysis/robotsParser";
import { Badge } from "../shared/Badge";

interface RobotsAuditPanelProps {
  pages: PageData[];
  rootUrl: string;
  sessionToken: string;
}

export function RobotsAuditPanel({
  pages,
  rootUrl,
  sessionToken,
}: RobotsAuditPanelProps) {
  const [analysis, setAnalysis] = useState<RobotsAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [expandedRules, setExpandedRules] = useState(false);
  const [expandedBlocked, setExpandedBlocked] = useState(false);

  // Run audit on mount
  useMemo(() => {
    if (pages.length === 0 || !rootUrl) return;

    const runAudit = async () => {
      setLoading(true);
      try {
        const result = await performRobotsAudit(
          rootUrl,
          pages,
          "*",
          sessionToken,
        );
        setAnalysis(result);
      } catch (error) {
        console.error("Robots audit failed:", error);
      } finally {
        setLoading(false);
      }
    };

    runAudit();
  }, [pages, rootUrl]);

  if (loading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <div className="animate-pulse">Analyzing robots.txt...</div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        No robots.txt analysis available
      </div>
    );
  }

  const { audit, rules, sitemaps, blockedPages } = analysis;
  const issues = getRobotsIssues(analysis);

  const hasRobots = audit.raw.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          Robots.txt Audit
        </h2>
        <Badge severity={hasRobots ? "pass" : "notice"}>
          {hasRobots ? "Found" : "Not Found"}
        </Badge>
      </div>

      {/* Issues */}
      {issues.length > 0 && (
        <div
          className={`rounded-lg border p-4 ${issues.some((i) => i.includes("blocked")) ? "border-[var(--chart-4)]/30 bg-[var(--chart-4)]/10" : "border-[var(--chart-3)]/30 bg-[var(--chart-3)]/10"}`}
        >
          <h3
            className={`mb-2 text-sm font-medium ${issues.some((i) => i.includes("blocked")) ? "text-[var(--chart-4)]" : "text-[var(--chart-3)]"}`}
          >
            Recommendations
          </h3>
          <ul className="space-y-1 text-sm text-foreground">
            {issues.map((issue, i) => (
              <li key={i}>• {issue}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="text-2xl font-bold text-foreground">
            {rules.length}
          </div>
          <div className="text-sm text-muted-foreground">User-Agents</div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="text-2xl font-bold text-foreground">
            {rules.reduce((sum, r) => sum + r.disallow.length, 0)}
          </div>
          <div className="text-sm text-muted-foreground">Disallow Rules</div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="text-2xl font-bold text-foreground">
            {sitemaps.length}
          </div>
          <div className="text-sm text-muted-foreground">
            Sitemaps Referenced
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="text-2xl font-bold text-[var(--chart-4)]">
            {blockedPages.length}
          </div>
          <div className="text-sm text-muted-foreground">Blocked Pages</div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-6">
        {/* Disallow Rules */}
        <div className="rounded-lg border border-border bg-card">
          <div
            className="flex items-center justify-between border-b border-border p-4 cursor-pointer hover:bg-muted/50"
            onClick={() => setExpandedRules(!expandedRules)}
          >
            <h3 className="font-medium text-foreground">Disallow Rules</h3>
            <span className="text-muted-foreground">
              {expandedRules ? "▼" : "▶"}
            </span>
          </div>

          {expandedRules && (
            <div className="p-4 max-h-96 overflow-y-auto">
              {rules.length === 0 ? (
                <div className="text-sm text-muted-foreground">
                  {hasRobots
                    ? "No disallow rules found - all pages are allowed"
                    : "No robots.txt found"}
                </div>
              ) : (
                <div className="space-y-4">
                  {rules.map((rule, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <code className="text-sm text-[var(--primary)]">
                          User-agent: {rule.userAgent}
                        </code>
                        {rule.userAgent === "*" && (
                          <Badge severity="notice">Default</Badge>
                        )}
                      </div>
                      {rule.disallow.length > 0 && (
                        <ul className="space-y-1 ml-4">
                          {rule.disallow.map((path, i) => (
                            <li
                              key={i}
                              className="text-sm text-muted-foreground"
                            >
                              <code>Disallow: {path}</code>
                            </li>
                          ))}
                        </ul>
                      )}
                      {rule.allow.length > 0 && (
                        <ul className="space-y-1 ml-4">
                          {rule.allow.map((path, i) => (
                            <li
                              key={i}
                              className="text-sm text-[var(--chart-1)]"
                            >
                              <code>Allow: {path}</code>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Blocked Pages */}
        <div className="rounded-lg border border-border bg-card">
          <div
            className="flex items-center justify-between border-b border-border p-4 cursor-pointer hover:bg-muted/50"
            onClick={() => setExpandedBlocked(!expandedBlocked)}
          >
            <h3 className="font-medium text-[var(--chart-4)]">
              Blocked Pages ({blockedPages.length})
            </h3>
            <span className="text-muted-foreground">
              {expandedBlocked ? "▼" : "▶"}
            </span>
          </div>

          {expandedBlocked && (
            <div className="p-4 max-h-96 overflow-y-auto">
              {blockedPages.length === 0 ? (
                <div className="text-sm text-muted-foreground">
                  No crawled pages are blocked by robots.txt
                </div>
              ) : (
                <ul className="space-y-3">
                  {blockedPages.map((blocked, idx) => (
                    <li key={idx} className="text-sm">
                      <a
                        href={blocked.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--primary)] hover:underline break-all"
                      >
                        {blocked.url}
                      </a>
                      <div className="text-xs text-muted-foreground mt-1">
                        {blocked.matchedRule}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Raw robots.txt */}
      {hasRobots && (
        <div className="rounded-lg border border-border bg-card">
          <div className="border-b border-border p-4">
            <h3 className="font-medium text-foreground">Raw robots.txt</h3>
          </div>
          <pre className="p-4 text-sm text-muted-foreground overflow-x-auto max-h-64 overflow-y-auto font-mono">
            {audit.raw}
          </pre>
        </div>
      )}
    </div>
  );
}

export default RobotsAuditPanel;
