/**
 * Sitemap Audit Component
 *
 * Displays sitemap coverage analysis:
 * - URLs in sitemap but not crawled
 * - URLs crawled but not in sitemap
 * - Coverage percentage
 */

"use client";

import { useMemo, useState } from "react";
import type { PageData, SitemapAudit } from "@/lib/seo-tools-lib/types";
import {
  performSitemapAudit,
  getSitemapIssues,
  type SitemapAnalysis,
} from "@/lib/seo-tools-lib/siteAnalysis/sitemapParser";
import { Badge } from "../shared/Badge";

interface SitemapAuditPanelProps {
  pages: PageData[];
  rootUrl: string;
  sessionToken: string;
}

export function SitemapAuditPanel({
  pages,
  rootUrl,
  sessionToken,
}: SitemapAuditPanelProps) {
  const [analysis, setAnalysis] = useState<SitemapAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<"missing" | "extra" | null>(null);

  // Run audit on mount
  useMemo(() => {
    if (pages.length === 0 || !rootUrl) return;

    const runAudit = async () => {
      setLoading(true);
      try {
        const result = await performSitemapAudit(rootUrl, pages, sessionToken);
        setAnalysis(result);
      } catch (error) {
        console.error("Sitemap audit failed:", error);
      } finally {
        setLoading(false);
      }
    };

    runAudit();
  }, [pages, rootUrl]);

  if (loading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <div className="animate-pulse">Analyzing sitemap...</div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        No sitemap analysis available
      </div>
    );
  }

  const { audit, coveragePercentage } = analysis;
  const issues = getSitemapIssues(analysis);

  const missingCount = audit.inSitemapNotCrawled.length;
  const extraCount = audit.crawledNotInSitemap.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Sitemap Audit</h2>
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            Sitemap: <code className="text-foreground">{audit.sitemapUrl}</code>
          </div>
          <div
            className={`text-2xl font-bold ${coveragePercentage >= 80 ? "text-[var(--chart-1)]" : coveragePercentage >= 50 ? "text-[var(--chart-3)]" : "text-destructive"}`}
          >
            {coveragePercentage}%
          </div>
          <div className="text-sm text-muted-foreground">Coverage</div>
        </div>
      </div>

      {/* Issues */}
      {issues.length > 0 && (
        <div className="rounded-lg border border-[var(--chart-3)]/20 bg-[var(--chart-3)]/5 p-4">
          <h3 className="mb-2 text-sm font-medium text-[var(--chart-3)]">
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
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="text-2xl font-bold text-foreground">
            {audit.total}
          </div>
          <div className="text-sm text-muted-foreground">URLs in Sitemap</div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="text-2xl font-bold text-destructive">
            {missingCount}
          </div>
          <div className="text-sm text-muted-foreground">
            In Sitemap, Not Crawled
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="text-2xl font-bold text-[var(--chart-3)]">
            {extraCount}
          </div>
          <div className="text-sm text-muted-foreground">
            Crawled, Not in Sitemap
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-6">
        {/* In Sitemap but Not Crawled */}
        <div className="rounded-lg border border-border bg-card">
          <div
            className="flex items-center justify-between border-b border-border p-4 cursor-pointer hover:bg-accent/50"
            onClick={() =>
              setExpanded(expanded === "missing" ? null : "missing")
            }
          >
            <h3 className="font-medium text-red-400">
              In Sitemap but Not Crawled ({missingCount})
            </h3>
            <span className="text-muted-foreground">
              {expanded === "missing" ? "▼" : "▶"}
            </span>
          </div>

          {expanded === "missing" && (
            <div className="p-4 max-h-96 overflow-y-auto">
              {missingCount === 0 ? (
                <div className="text-sm text-muted-foreground">
                  All sitemap URLs were crawled successfully
                </div>
              ) : (
                <ul className="space-y-2">
                  {audit.inSitemapNotCrawled.map((url) => (
                    <li key={url} className="text-sm">
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline break-all"
                      >
                        {url}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Crawled but Not in Sitemap */}
        <div className="rounded-lg border border-border bg-card">
          <div
            className="flex items-center justify-between border-b border-border p-4 cursor-pointer hover:bg-accent/50"
            onClick={() => setExpanded(expanded === "extra" ? null : "extra")}
          >
            <h3 className="font-medium text-[var(--chart-3)]">
              Crawled but Not in Sitemap ({extraCount})
            </h3>
            <span className="text-muted-foreground">
              {expanded === "extra" ? "▼" : "▶"}
            </span>
          </div>

          {expanded === "extra" && (
            <div className="p-4 max-h-96 overflow-y-auto">
              {extraCount === 0 ? (
                <div className="text-sm text-muted-foreground">
                  All crawled URLs are in the sitemap
                </div>
              ) : (
                <ul className="space-y-2">
                  {audit.crawledNotInSitemap.map((url) => (
                    <li key={url} className="text-sm">
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline break-all"
                      >
                        {url}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SitemapAuditPanel;
