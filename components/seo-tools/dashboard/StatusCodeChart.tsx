'use client';

import React, { useMemo } from 'react';
import type { PageData } from '@/lib/seo-tools-lib/types';

interface StatusCodeChartProps {
  pages: PageData[];
}

/**
 * StatusCodeChart component
 * Donut chart showing HTTP status code distribution
 */
export function StatusCodeChart({ pages }: StatusCodeChartProps) {
  const { distribution, total } = useMemo(() => {
    const dist: Record<string, number> = {
      '200': 0,
      '301': 0,
      '302': 0,
      '404': 0,
      '5xx': 0,
      'other': 0,
    };

    pages.forEach((page) => {
      const code = page.statusCode;
      if (code === 200) dist['200']++;
      else if (code === 301) dist['301']++;
      else if (code === 302) dist['302']++;
      else if (code === 404) dist['404']++;
      else if (code >= 500) dist['5xx']++;
      else dist['other']++;
    });

    const totalCount = pages.length;

    return { distribution: dist, total: totalCount };
  }, [pages]);

  const size = 160;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const colors: Record<string, string> = {
    '200': 'var(--chart-1)',   // green - OK
    '301': 'var(--chart-2)',   // indigo - Redirect permanent
    '302': 'var(--chart-5)',   // orange - Redirect temporary
    '404': 'var(--chart-3)',   // amber - Not found
    '5xx': 'var(--chart-4)',   // pink/red - Server error
    'other': 'var(--muted-foreground)', // gray - Other
  };

  const labels: Record<string, string> = {
    '200': 'OK (200)',
    '301': 'Moved (301)',
    '302': 'Found (302)',
    '404': 'Not Found (404)',
    '5xx': 'Error (5xx)',
    'other': 'Other',
  };

  // Calculate segments
  let cumulativeOffset = 0;
  const segments = Object.entries(distribution)
    .filter(([_, count]) => count > 0)
    .map(([code, count]) => {
      const percentage = total > 0 ? count / total : 0;
      const segmentLength = circumference * percentage;
      const offset = cumulativeOffset;
      cumulativeOffset += segmentLength;

      return {
        code,
        count,
        color: colors[code],
        label: labels[code],
        segmentLength,
        offset,
      };
    });

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="text-sm font-semibold text-foreground mb-4">HTTP Status Codes</h3>

      {total === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
          <span className="text-xs">No pages crawled</span>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="transform -rotate-90 flex-shrink-0"
          >
            {segments.map((segment) => (
              <circle
                key={segment.code}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={segment.color}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={`${segment.segmentLength} ${circumference - segment.segmentLength}`}
                strokeDashoffset={-segment.offset}
                className="transition-all duration-300"
              />
            ))}
          </svg>

          <div className="flex flex-col gap-1.5 text-xs">
            {Object.entries(distribution).map(([code, count]) => (
              <div key={code} className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: colors[code] }}
                />
                <span className="text-muted-foreground w-20">{labels[code]}</span>
                <span className="text-foreground font-semibold w-6 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
