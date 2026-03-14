'use client';

import React, { useMemo } from 'react';
import type { PageData } from '@/lib/seo-tools-lib/types';

interface PageDepthChartProps {
  pages: PageData[];
}

/**
 * PageDepthChart component
 * Bar chart showing count of pages at each click-depth from root
 */
export function PageDepthChart({ pages }: PageDepthChartProps) {
  const { depthDistribution, maxDepth, maxCount } = useMemo(() => {
    const distribution: Record<number, number> = {};
    let maximumDepth = 0;

    pages.forEach((page) => {
      const depth = page.linkDepthFromRoot || 0;
      distribution[depth] = (distribution[depth] || 0) + 1;
      maximumDepth = Math.max(maximumDepth, depth);
    });

    const counts = Object.values(distribution);
    const maximumCount = Math.max(...counts, 1);

    return {
      depthDistribution: distribution,
      maxDepth: maximumDepth,
      maxCount: maximumCount,
    };
  }, [pages]);

  const entries = Object.entries(depthDistribution)
    .map(([depth, count]) => ({ depth: parseInt(depth), count }))
    .sort((a, b) => a.depth - b.depth);

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="text-sm font-semibold text-foreground mb-4">Page Depth Distribution</h3>

      {pages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
          <span className="text-xs">No pages crawled</span>
        </div>
      ) : (
        <div className="space-y-2">
          {/* Bar chart */}
          <div className="flex items-end gap-1 h-32">
            {entries.map(({ depth, count }) => {
              const heightPercent = maxCount > 0 ? (count / maxCount) * 100 : 0;

              return (
                <div
                  key={depth}
                  className="flex-1 flex flex-col items-center justify-end gap-1"
                >
                  <div className="w-full relative flex items-end justify-center h-full">
                    <div
                      className="w-full max-w-[40px] bg-[var(--chart-2)] hover:bg-[var(--chart-2)]/80 transition-all duration-200 rounded-t"
                      style={{ height: `${heightPercent}%` }}
                    >
                      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs text-foreground font-semibold">
                        {count}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{depth}</span>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="pt-3 border-t border-border flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Depth from homepage</span>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">
                Avg: {pages.length > 0
                  ? (entries.reduce((sum, { depth, count }) => sum + depth * count, 0) / pages.length).toFixed(1)
                  : '0'
                }
              </span>
              <span className="text-xs text-muted-foreground">
                Max: {maxDepth}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
