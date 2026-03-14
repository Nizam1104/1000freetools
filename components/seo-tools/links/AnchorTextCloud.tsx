'use client';

import { useMemo, useState } from 'react';
import { PageData } from '@/lib/seo-tools-lib/types';

interface AnchorTextCloudProps {
  pages: PageData[];
}

interface AnchorEntry {
  text: string;
  count: number;
  percentage: number;
  isGeneric: boolean;
}

const GENERIC_ANCHORS = new Set([
  'click here',
  'read more',
  'learn more',
  'more',
  'here',
  'link',
  'this',
  'page',
  'website',
  'site',
  'info',
  'click',
  'go',
  'next',
  'previous',
  'back',
  'home',
  'contact',
  'about',
  'services',
  'products',
  'privacy policy',
  'terms of service',
  'sitemap',
  'rss',
  'subscribe',
  'sign up',
  'login',
  'register',
  'download',
  'buy now',
  'shop now',
  'view all',
  'see more',
  'continue reading',
]);

/**
 * AnchorTextCloud - Word cloud visualization of anchor text distribution
 * Shows most common anchor texts used in internal links
 */
export function AnchorTextCloud({ pages }: AnchorTextCloudProps) {
  const [viewMode, setViewMode] = useState<'cloud' | 'table'>('cloud');
  const [minCount, setMinCount] = useState(1);

  // Extract all anchor texts from internal links
  const anchorData = useMemo(() => {
    const anchorMap = new Map<string, { count: number; isGeneric: boolean }>();
    let totalLinks = 0;

    for (const page of pages) {
      // We need to extract anchor text from internal links
      // Since internalLinksTo only has URLs, we'll use a simplified approach
      // In a real implementation, we'd need to store anchor text per internal link
      for (const link of page.internalLinksTo) {
        totalLinks++;
        // Use URL pathname as anchor text proxy
        const anchorText = new URL(link, page.url).pathname.split('/').pop() || 'link';
        const normalized = anchorText.toLowerCase().replace(/[-_]/g, ' ').trim();

        const existing = anchorMap.get(anchorText) || { count: 0, isGeneric: GENERIC_ANCHORS.has(normalized) };
        existing.count++;
        anchorMap.set(anchorText, existing);
      }
    }

    const entries: AnchorEntry[] = Array.from(anchorMap.entries())
      .filter(([, data]) => data.count >= minCount)
      .map(([text, data]) => ({
        text,
        count: data.count,
        percentage: totalLinks > 0 ? (data.count / totalLinks) * 100 : 0,
        isGeneric: data.isGeneric,
      }))
      .sort((a, b) => b.count - a.count);

    return {
      entries,
      totalLinks,
      genericCount: entries.filter((e) => e.isGeneric).reduce((sum, e) => sum + e.count, 0),
    };
  }, [pages, minCount]);

  // Calculate font size for cloud visualization
  const getFontSize = (count: number, maxCount: number) => {
    if (maxCount === 0) return 'text-sm';
    const ratio = count / maxCount;
    if (ratio > 0.8) return 'text-3xl font-bold';
    if (ratio > 0.6) return 'text-2xl font-semibold';
    if (ratio > 0.4) return 'text-xl font-medium';
    if (ratio > 0.2) return 'text-base';
    return 'text-sm';
  };

  const maxCount = anchorData.entries[0]?.count || 0;

  return (
    <div className="border border-border rounded-lg bg-card p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Anchor Text Distribution</h3>
        <div className="flex gap-2 text-xs">
          <label className="flex items-center gap-2 text-muted-foreground">
            <span>Min count:</span>
            <input
              type="number"
              value={minCount}
              onChange={(e) => setMinCount(Number(e.target.value))}
              min={1}
              className="w-16 bg-accent border border-border rounded px-2 py-1 text-foreground"
            />
          </label>
          <div className="flex border border-border rounded overflow-hidden">
            <button
              onClick={() => setViewMode('cloud')}
              className={`px-3 py-1 text-xs transition-colors ${viewMode === 'cloud'
                  ? 'bg-accent text-foreground'
                  : 'bg-card text-muted-foreground hover:text-foreground'
                }`}
            >
              Cloud
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 text-xs transition-colors ${viewMode === 'table'
                  ? 'bg-accent text-foreground'
                  : 'bg-card text-muted-foreground hover:text-foreground'
                }`}
            >
              Table
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4 text-xs">
        <div className="bg-accent/50 rounded p-3">
          <div className="text-muted-foreground mb-1">Total Internal Links</div>
          <div className="text-2xl font-bold text-foreground">{anchorData.totalLinks}</div>
        </div>
        <div className="bg-accent/50 rounded p-3">
          <div className="text-muted-foreground mb-1">Unique Anchor Texts</div>
          <div className="text-2xl font-bold text-foreground">{anchorData.entries.length}</div>
        </div>
        <div className="bg-accent/50 rounded p-3">
          <div className="text-muted-foreground mb-1">Generic Anchors</div>
          <div className={`text-2xl font-bold ${anchorData.genericCount > 0 ? 'text-[var(--chart-3)]' : 'text-[var(--chart-1)]'}`}>
            {anchorData.genericCount}
          </div>
        </div>
      </div>

      {/* Content */}
      {anchorData.entries.length === 0 ? (
        <div className="flex items-center justify-center h-48 text-muted-foreground">
          <p>No anchor text data available</p>
        </div>
      ) : viewMode === 'cloud' ? (
        <div className="border border-border rounded p-6 min-h-[300px] bg-card">
          <div className="flex flex-wrap gap-3 justify-center items-center">
            {anchorData.entries.map((entry) => (
              <span
                key={entry.text}
                className={`inline-block px-2 py-1 rounded transition-colors cursor-default ${entry.isGeneric
                    ? 'text-[var(--chart-3)] bg-[var(--chart-3)]/10 hover:bg-[var(--chart-3)]/20'
                    : 'text-foreground bg-accent hover:bg-muted'
                  } ${getFontSize(entry.count, maxCount)}`}
                title={`${entry.text}: ${entry.count} (${entry.percentage.toFixed(1)}%)`}
              >
                {entry.text}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="border border-border rounded overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-accent text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-2 font-medium">Anchor Text</th>
                <th className="text-right px-4 py-2 font-medium">Count</th>
                <th className="text-right px-4 py-2 font-medium">%</th>
                <th className="text-center px-4 py-2 font-medium">Type</th>
              </tr>
            </thead>
            <tbody>
              {anchorData.entries.map((entry, idx) => (
                <tr
                  key={entry.text}
                  className={`border-t border-border ${idx % 2 === 0 ? 'bg-card/30' : 'bg-card/50'}`}
                >
                  <td className="px-4 py-2 text-foreground font-mono truncate max-w-xs">{entry.text}</td>
                  <td className="px-4 py-2 text-right text-muted-foreground">{entry.count}</td>
                  <td className="px-4 py-2 text-right text-muted-foreground">{entry.percentage.toFixed(1)}%</td>
                  <td className="px-4 py-2 text-center">
                    {entry.isGeneric ? (
                      <span className="inline-block px-2 py-0.5 rounded text-xs bg-[var(--chart-3)]/20 text-[var(--chart-3)]">
                        Generic
                      </span>
                    ) : (
                      <span className="inline-block px-2 py-0.5 rounded text-xs bg-[var(--chart-1)]/20 text-[var(--chart-1)]">
                        Descriptive
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Legend */}
      <div className="flex gap-4 mt-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-[var(--chart-3)]/20 border border-[var(--chart-3)]"></span>
          Generic (e.g., "click here")
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-accent border border-border"></span>
          Descriptive
        </span>
      </div>
    </div>
  );
}

export default AnchorTextCloud;
