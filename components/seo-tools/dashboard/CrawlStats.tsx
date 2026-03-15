"use client";

import React from "react";

interface CrawlStatsProps {
  visitedCount: number;
  queueCount: number;
  isCrawling: boolean;
  elapsedMs?: number;
}

/**
 * CrawlStats component
 * Displays crawl statistics: pages crawled, queue remaining, time
 */
export function CrawlStats({
  visitedCount,
  queueCount,
  isCrawling,
  elapsedMs,
}: CrawlStatsProps) {
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);

    if (minutes > 0) {
      const remainingSeconds = seconds % 60;
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${seconds}s`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="text-sm font-semibold text-foreground mb-4">
        Crawl Stats
      </h3>

      <div className="grid grid-cols-3 gap-4">
        {/* Pages Crawled */}
        <div className="flex flex-col items-center p-3 bg-accent/30 rounded">
          <span className="text-xl font-bold text-foreground">
            {visitedCount}
          </span>
          <span className="text-xs text-muted-foreground mt-1">
            Pages Crawled
          </span>
        </div>

        {/* Queue Remaining */}
        <div className="flex flex-col items-center p-3 bg-accent/30 rounded">
          <span
            className={`text-xl font-bold ${queueCount > 0 ? "text-[var(--chart-3)]" : "text-muted-foreground"}`}
          >
            {queueCount}
          </span>
          <span className="text-xs text-muted-foreground mt-1">In Queue</span>
        </div>

        {/* Status / Time */}
        <div className="flex flex-col items-center p-3 bg-accent/30 rounded">
          {isCrawling ? (
            <>
              <span className="text-xl font-bold">●</span>
              <span className="text-xs text-muted-foreground mt-1">
                Crawling...
              </span>
            </>
          ) : elapsedMs !== undefined ? (
            <>
              <span className="text-lg font-bold text-foreground">
                {formatTime(elapsedMs)}
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                Completed
              </span>
            </>
          ) : (
            <>
              <span className="text-2xl font-bold text-muted-foreground/50">
                —
              </span>
              <span className="text-xs text-muted-foreground mt-1">Ready</span>
            </>
          )}
        </div>
      </div>

      {/* Progress indicator */}
      {isCrawling && (
        <div className="mt-3">
          <div className="h-1 bg-accent rounded overflow-hidden">
            <div
              className="h-full bg-[var(--chart-1)] transition-all duration-300"
              style={{
                width: `${visitedCount > 0 ? Math.min((visitedCount / (visitedCount + queueCount)) * 100, 95) : 0}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
