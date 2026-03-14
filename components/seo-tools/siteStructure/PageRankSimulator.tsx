/**
 * PageRank Simulator Component
 *
 * Displays internal PageRank distribution:
 * - Bar chart of PageRank scores
 * - Top pages by PageRank
 * - Undervalued pages (low PR but high content)
 */

"use client";

import { useMemo } from "react";
import type { PageData } from "@/lib/seo-tools-lib/types";
import {
  calculatePageRank,
  getPageRankStats,
  findUndervaluedPages,
  type PageRankResult,
} from "@/lib/seo-tools-lib/siteAnalysis/internalPageRank";
import { Badge } from "../shared/Badge";
import { ScoreRing } from "../shared/ScoreRing";

interface PageRankSimulatorProps {
  pages: PageData[];
}

export function PageRankSimulator({ pages }: PageRankSimulatorProps) {
  const results = useMemo(() => {
    if (pages.length === 0) return [];
    return calculatePageRank(pages);
  }, [pages]);

  const stats = useMemo(() => {
    return getPageRankStats(results);
  }, [results]);

  const undervalued = useMemo(() => {
    return findUndervaluedPages(results, pages).slice(0, 10);
  }, [results, pages]);

  const topPages = useMemo(() => {
    return results.slice(0, 10);
  }, [results]);

  if (results.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        No pages to analyze
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          Internal PageRank
        </h2>
        <div className="text-sm text-muted-foreground">
          {results.length} pages analyzed
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-5 gap-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="text-2xl font-bold text-foreground">{stats.max}</div>
          <div className="text-sm text-muted-foreground">Max Score</div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="text-2xl font-bold text-foreground">{stats.min}</div>
          <div className="text-sm text-muted-foreground">Min Score</div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="text-2xl font-bold text-foreground">
            {stats.mean.toFixed(1)}
          </div>
          <div className="text-sm text-muted-foreground">Mean Score</div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="text-2xl font-bold text-foreground">
            {stats.median.toFixed(1)}
          </div>
          <div className="text-sm text-muted-foreground">Median Score</div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="text-2xl font-bold text-foreground">
            {stats.stdDev.toFixed(1)}
          </div>
          <div className="text-sm text-muted-foreground">Std Dev</div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-6">
        {/* Top Pages by PageRank */}
        <div className="rounded-lg border border-border bg-card">
          <div className="border-b border-border p-4">
            <h3 className="font-medium text-foreground">
              Top Pages by PageRank
            </h3>
          </div>
          <div className="p-4 space-y-3">
            {topPages.map((result, idx) => (
              <PageRankBar
                key={result.url}
                result={result}
                rank={idx + 1}
                maxScore={stats.max}
              />
            ))}
          </div>
        </div>

        {/* Undervalued Pages */}
        <div className="rounded-lg border border-border bg-card">
          <div className="border-b border-border p-4">
            <h3 className="font-medium text-[var(--chart-3)]">
              Undervalued Pages
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Low PageRank but good content - consider internal linking
            </p>
          </div>
          <div className="p-4 space-y-3">
            {undervalued.length === 0 ? (
              <div className="text-sm text-muted-foreground text-center py-4">
                No undervalued pages found
              </div>
            ) : (
              undervalued.map((result) => (
                <UndervaluedPageCard key={result.url} result={result} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Full Distribution Chart */}
      <div className="rounded-lg border border-border bg-card">
        <div className="border-b border-border p-4">
          <h3 className="font-medium text-foreground">PageRank Distribution</h3>
          <p className="text-xs text-muted-foreground mt-1">
            All pages sorted by PageRank score
          </p>
        </div>
        <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
          {results.map((result, idx) => (
            <PageRankBar
              key={result.url}
              result={result}
              rank={idx + 1}
              maxScore={stats.max}
              compact
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface PageRankBarProps {
  result: PageRankResult;
  rank: number;
  maxScore: number;
  compact?: boolean;
}

function PageRankBar({ result, rank, maxScore, compact }: PageRankBarProps) {
  const barWidth = maxScore > 0 ? (result.normalizedScore / maxScore) * 100 : 0;

  return (
    <div
      className={`flex items-center gap-3 ${compact ? "text-xs" : "text-sm"}`}
    >
      <div className={`w-6 text-muted-foreground text-right font-mono`}>
        #{rank}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <div className="flex-1 min-w-0">
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--primary)] hover:underline truncate block"
              title={result.url}
            >
              {new URL(result.url).pathname}
            </a>
          </div>
          <Badge
            severity={
              result.normalizedScore >= 70
                ? "pass"
                : result.normalizedScore >= 40
                  ? "warning"
                  : "notice"
            }
          >
            {result.normalizedScore}
          </Badge>
        </div>
        <div className="relative h-2 bg-border rounded-full mt-1">
          <div
            className={`absolute h-full rounded-full transition-all ${
              result.normalizedScore >= 70
                ? "bg-[var(--chart-1)]"
                : result.normalizedScore >= 40
                  ? "bg-[var(--chart-3)]"
                  : "bg-[var(--chart-4)]"
            }`}
            style={{ width: `${barWidth}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>In: {result.inboundCount}</span>
          <span>Out: {result.outboundCount}</span>
        </div>
      </div>
    </div>
  );
}

interface UndervaluedPageCardProps {
  result: PageRankResult & { depth: number; wordCount: number };
}

function UndervaluedPageCard({ result }: UndervaluedPageCardProps) {
  return (
    <div className="rounded border border-[var(--chart-3)]/30 bg-[var(--chart-3)]/10 p-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <a
            href={result.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--primary)] hover:underline text-sm truncate block"
            title={result.url}
          >
            {new URL(result.url).pathname}
          </a>
          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <span>PR: {result.normalizedScore}</span>
            <span>Depth: {result.depth}</span>
            <span>Words: {result.wordCount}</span>
          </div>
        </div>
        <ScoreRing score={result.normalizedScore} size={60} />
      </div>
    </div>
  );
}

export default PageRankSimulator;
