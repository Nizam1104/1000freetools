"use client";

import { useMemo, useState } from "react";
import { PageData } from "@/lib/seo-tools-lib/types";
import { findDuplicateContent } from "@/lib/seo-tools-lib/siteAnalysis/duplicateContent";

interface DuplicateContentPanelProps {
  pages: PageData[];
}

interface DuplicateCluster {
  pages: string[];
  similarity: number;
}

/**
 * DuplicateContentPanel - Displays clusters of near-duplicate pages
 * Uses simhash algorithm for detection (similarity > 0.85)
 */
export function DuplicateContentPanel({ pages }: DuplicateContentPanelProps) {
  const [expandedCluster, setExpandedCluster] = useState<number | null>(null);
  const [minSimilarity, setMinSimilarity] = useState(0.85);

  // Detect duplicate content
  const clusters = useMemo(() => {
    if (pages.length < 2) return [];
    return findDuplicateContent(pages, minSimilarity);
  }, [pages, minSimilarity]);

  const toggleExpand = (idx: number) => {
    setExpandedCluster(expandedCluster === idx ? null : idx);
  };

  // Calculate stats
  const totalDuplicatePages = useMemo(() => {
    const uniqueUrls = new Set<string>();
    clusters.forEach((c: DuplicateCluster) =>
      c.pages.forEach((url: string) => uniqueUrls.add(url)),
    );
    return uniqueUrls.size;
  }, [clusters]);

  const avgSimilarity = useMemo(() => {
    if (clusters.length === 0) return 0;
    const sum = clusters.reduce(
      (acc: number, c: DuplicateCluster) => acc + c.similarity,
      0,
    );
    return sum / clusters.length;
  }, [clusters]);

  return (
    <div className="border border-border rounded-lg bg-card p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">
          Duplicate Content Detection
          {clusters.length > 0 && (
            <span className="ml-2 text-xs text-[var(--chart-3)]">
              {clusters.length} cluster{clusters.length !== 1 ? "s" : ""} found
            </span>
          )}
        </h3>
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Min similarity:</span>
          <input
            type="number"
            value={minSimilarity}
            onChange={(e) => setMinSimilarity(Number(e.target.value))}
            min={0.5}
            max={0.99}
            step={0.01}
            className="w-20 bg-accent border border-border rounded px-2 py-1 text-foreground"
          />
        </label>
      </div>

      {/* Stats */}
      {clusters.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-4 text-xs">
          <div className="bg-accent/50 rounded p-3">
            <div className="text-muted-foreground mb-1">Duplicate Clusters</div>
            <div className="text-2xl font-bold text-[var(--chart-3)]">
              {clusters.length}
            </div>
          </div>
          <div className="bg-accent/50 rounded p-3">
            <div className="text-muted-foreground mb-1">Pages Affected</div>
            <div className="text-2xl font-bold text-foreground">
              {totalDuplicatePages}
            </div>
          </div>
          <div className="bg-accent/50 rounded p-3">
            <div className="text-muted-foreground mb-1">Avg Similarity</div>
            <div className="text-2xl font-bold text-foreground">
              {(avgSimilarity * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      {clusters.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 gap-3 text-muted-foreground">
          <span className="text-3xl">✅</span>
          <p className="text-sm">No duplicate content detected</p>
          <p className="text-xs max-w-md text-center">
            All pages have unique content (similarity below{" "}
            {(minSimilarity * 100).toFixed(0)}%)
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {clusters.map((cluster: DuplicateCluster, idx: number) => {
            const isExpanded = expandedCluster === idx;
            const similarityPercent = (cluster.similarity * 100).toFixed(1);

            return (
              <div
                key={idx}
                className={`border rounded-lg overflow-hidden transition-colors ${
                  cluster.similarity >= 0.95
                    ? "border-destructive/50 bg-destructive/10"
                    : cluster.similarity >= 0.9
                      ? "border-[var(--chart-3)]/50 bg-[var(--chart-3)]/10"
                      : "border-border bg-card/30"
                }`}
              >
                {/* Cluster Summary */}
                <button
                  onClick={() => toggleExpand(idx)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-sm font-bold ${
                        cluster.similarity >= 0.95
                          ? "text-destructive"
                          : cluster.similarity >= 0.9
                            ? "text-[var(--chart-3)]"
                            : "text-muted-foreground"
                      }`}
                    >
                      {cluster.pages.length} pages
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Similarity: {similarityPercent}%
                    </span>
                  </div>
                  <span
                    className={`text-xs transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {/* Expanded Cluster Details */}
                {isExpanded && (
                  <div className="border-t border-border p-4 bg-card/50">
                    <div className="text-xs text-muted-foreground mb-3">
                      <p className="mb-2">
                        <strong>Impact:</strong> Duplicate content can confuse
                        search engines and dilute ranking signals. Consider
                        consolidating these pages or adding canonical tags.
                      </p>
                    </div>
                    <div className="space-y-2">
                      {cluster.pages.map((url: string, pageIdx: number) => {
                        const page = pages.find((p) => p.url === url);
                        return (
                          <div
                            key={url}
                            className="flex items-center gap-3 text-xs p-2 rounded bg-accent/50"
                          >
                            <span className="text-muted-foreground font-mono">
                              {pageIdx + 1}.
                            </span>
                            <span
                              className="text-foreground font-mono truncate flex-1"
                              title={url}
                            >
                              {new URL(url).pathname || url}
                            </span>
                            {page && (
                              <span className="text-muted-foreground">
                                Score: {page.seoScore}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-3 text-xs text-muted-foreground">
                      <p>
                        <strong>Recommendation:</strong>
                        {cluster.similarity >= 0.95
                          ? " These pages are nearly identical. Consider redirecting one to the other or using a canonical tag."
                          : cluster.similarity >= 0.9
                            ? " High similarity detected. Review content and consider consolidating or differentiating."
                            : " Moderate similarity. Ensure each page has a unique purpose and target keywords."}
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
      <div className="mt-4 p-3 bg-accent/30 rounded text-xs text-muted-foreground">
        <p>
          <strong>How it works:</strong> Uses Simhash algorithm with 4-gram
          shingling to detect near-duplicate content. Pages with similarity
          above the threshold are grouped together.
        </p>
      </div>
    </div>
  );
}

export default DuplicateContentPanel;
