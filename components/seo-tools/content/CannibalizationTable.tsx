"use client";

import { useMemo, useState } from "react";
import { PageData } from "@/lib/seo-tools-lib/types";
import { detectKeywordCannibalization } from "@/lib/seo-tools-lib/siteAnalysis/cannibalization";

interface CannibalizationTableProps {
  pages: PageData[];
}

interface CannibalizationGroup {
  keyword: string;
  pages: CannibalizationPage[];
  severity: "critical" | "warning" | "notice";
}

interface CannibalizationPage {
  url: string;
  title: string;
  keywordDensity: number;
  seoScore: number;
  rank: number;
}

/**
 * CannibalizationTablnpme - Displays pages competing for the same keywords
 * Helps identify keyword cannibalization issues
 */
export function CannibalizationTable({ pages }: CannibalizationTableProps) {
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [minDensity, setMinDensity] = useState(1);
  const [sortBy, setSortBy] = useState<"severity" | "pages" | "keyword">(
    "severity",
  );

  // Detect cannibalization
  const groups = useMemo(() => {
    if (pages.length < 2) return [];
    return detectKeywordCannibalization(pages, minDensity / 100, 5);
  }, [pages, minDensity]);

  // Sort groups
  const sortedGroups = useMemo(() => {
    const sorted = [...groups];
    switch (sortBy) {
      case "severity":
        return sorted.sort((a, b) => {
          const severityOrder = { critical: 0, warning: 1, notice: 2 };
          return severityOrder[a.severity] - severityOrder[b.severity];
        });
      case "pages":
        return sorted.sort((a, b) => b.pages.length - a.pages.length);
      case "keyword":
        return sorted.sort((a, b) => a.keyword.localeCompare(b.keyword));
    }
    return sorted;
  }, [groups, sortBy]);

  const toggleExpand = (keyword: string) => {
    setExpandedGroup(expandedGroup === keyword ? null : keyword);
  };

  // Calculate stats
  const totalAffectedPages = useMemo(() => {
    const uniqueUrls = new Set<string>();
    groups.forEach((g: CannibalizationGroup) =>
      g.pages.forEach((p) => uniqueUrls.add(p.url)),
    );
    return uniqueUrls.size;
  }, [groups]);

  const severityCounts = useMemo(() => {
    const counts = { critical: 0, warning: 0, notice: 0 };
    groups.forEach((g: CannibalizationGroup) => {
      counts[g.severity]++;
    });
    return counts;
  }, [groups]);

  return (
    <div className="border border-border rounded-lg bg-card p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">
          Keyword Cannibalization
          {groups.length > 0 && (
            <span className="ml-2 text-xs text-[var(--chart-3)]">
              {groups.length} keyword{groups.length !== 1 ? "s" : ""} affected
            </span>
          )}
        </h3>
        <div className="flex gap-3 text-xs">
          <label className="flex items-center gap-2 text-muted-foreground">
            <span>Min density:</span>
            <input
              type="number"
              value={minDensity}
              onChange={(e) => setMinDensity(Number(e.target.value))}
              min={0.5}
              max={10}
              step={0.5}
              className="w-16 bg-muted border border-border rounded px-2 py-1 text-foreground"
            />
            <span className="text-muted-foreground">%</span>
          </label>
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "severity" | "pages" | "keyword")
            }
            className="bg-muted border border-border rounded px-2 py-1 text-foreground"
          >
            <option value="severity">Sort: Severity</option>
            <option value="pages">Sort: Pages</option>
            <option value="keyword">Sort: Keyword</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      {groups.length > 0 && (
        <div className="grid grid-cols-4 gap-4 mb-4 text-xs">
          <div className="bg-muted rounded p-3">
            <div className="text-muted-foreground mb-1">Keywords Affected</div>
            <div className="text-2xl font-bold text-[var(--chart-3)]">
              {groups.length}
            </div>
          </div>
          <div className="bg-muted rounded p-3">
            <div className="text-muted-foreground mb-1">Pages Affected</div>
            <div className="text-2xl font-bold text-foreground">
              {totalAffectedPages}
            </div>
          </div>
          <div className="bg-muted rounded p-3">
            <div className="text-muted-foreground mb-1">Critical</div>
            <div className="text-2xl font-bold text-[var(--chart-4)]">
              {severityCounts.critical}
            </div>
          </div>
          <div className="bg-muted rounded p-3">
            <div className="text-muted-foreground mb-1">Warning</div>
            <div className="text-2xl font-bold text-[var(--chart-3)]">
              {severityCounts.warning}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      {groups.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 gap-3 text-muted-foreground">
          <span className="text-3xl">✅</span>
          <p className="text-sm">No keyword cannibalization detected</p>
          <p className="text-xs max-w-md text-center">
            Pages are well-optimized for unique keywords with no significant
            overlap
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedGroups.map((group: CannibalizationGroup) => {
            const isExpanded = expandedGroup === group.keyword;
            const severityColors = {
              critical: "border-[var(--chart-4)]/30 bg-[var(--chart-4)]/10",
              warning: "border-[var(--chart-3)]/30 bg-[var(--chart-3)]/10",
              notice: "border-border bg-muted/30",
            };
            const severityBadgeColors = {
              critical: "bg-[var(--chart-4)]/20 text-[var(--chart-4)]",
              warning: "bg-[var(--chart-3)]/20 text-[var(--chart-3)]",
              notice: "bg-muted text-muted-foreground",
            };

            return (
              <div
                key={group.keyword}
                className={`border rounded-lg overflow-hidden transition-colors ${severityColors[group.severity]}`}
              >
                {/* Group Summary */}
                <button
                  onClick={() => toggleExpand(group.keyword)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-foreground">
                      "{group.keyword}"
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {group.pages.length} page
                      {group.pages.length !== 1 ? "s" : ""}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Top density:{" "}
                      {(group.pages[0]?.keywordDensity * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${severityBadgeColors[group.severity]}`}
                    >
                      {group.severity.toUpperCase()}
                    </span>
                    <span
                      className={`text-xs transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    >
                      ▼
                    </span>
                  </div>
                </button>

                {/* Expanded Group Details */}
                {isExpanded && (
                  <div className="border-t border-border p-4 bg-card/50">
                    <div className="text-xs text-muted-foreground mb-3">
                      <p>
                        <strong>Impact:</strong> Multiple pages targeting the
                        same keyword can confuse search engines and dilute
                        ranking signals. Consider consolidating content or
                        differentiating target keywords.
                      </p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead className="bg-muted text-muted-foreground">
                          <tr>
                            <th className="text-left px-4 py-2 font-medium">
                              Rank
                            </th>
                            <th className="text-left px-4 py-2 font-medium">
                              URL
                            </th>
                            <th className="text-right px-4 py-2 font-medium">
                              Keyword Density
                            </th>
                            <th className="text-right px-4 py-2 font-medium">
                              SEO Score
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {group.pages.map((page: CannibalizationPage) => (
                            <tr
                              key={page.url}
                              className="border-t border-border hover:bg-muted/30"
                            >
                              <td className="px-4 py-2 text-muted-foreground">
                                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-muted text-foreground">
                                  {page.rank}
                                </span>
                              </td>
                              <td className="px-4 py-2">
                                <div
                                  className="text-foreground font-mono truncate max-w-xs"
                                  title={page.url}
                                >
                                  {new URL(page.url).pathname || page.url}
                                </div>
                                <div className="text-muted-foreground truncate max-w-xs">
                                  {page.title}
                                </div>
                              </td>
                              <td className="px-4 py-2 text-right">
                                <span className="text-foreground">
                                  {(page.keywordDensity * 100).toFixed(2)}%
                                </span>
                              </td>
                              <td className="px-4 py-2 text-right">
                                <span
                                  className={`font-medium ${
                                    page.seoScore >= 80
                                      ? "text-[var(--chart-1)]"
                                      : page.seoScore >= 60
                                        ? "text-[var(--chart-3)]"
                                        : "text-[var(--chart-4)]"
                                  }`}
                                >
                                  {page.seoScore}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-3 text-xs text-muted-foreground">
                      <p>
                        <strong>Recommendation:</strong>
                        {group.severity === "critical"
                          ? " Immediate action needed. Consider redirecting lower-performing pages to the top performer, or significantly differentiate content."
                          : group.severity === "warning"
                            ? " Review content strategy. Ensure each page has a unique angle and target different long-tail variations."
                            : " Monitor these pages. Consider adding more unique content to differentiate them."}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Info */}
      <div className="mt-4 p-3 bg-muted/30 rounded text-xs text-muted-foreground">
        <p>
          <strong>What is keyword cannibalization?</strong> When multiple pages
          on your site target the same keyword, they compete against each other
          in search results, potentially lowering rankings for all pages.
        </p>
      </div>
    </div>
  );
}

export default CannibalizationTable;
