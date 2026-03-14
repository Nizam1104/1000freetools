'use client';

import { useMemo, useState } from 'react';
import { PageData } from '../../lib/types';

interface RedirectChain {
  fromUrl: string;
  toUrl: string;
  chain: string[];
  hops: number;
  finalStatusCode: number;
}

interface RedirectChainListProps {
  pages: PageData[];
}

/**
 * RedirectChainList - Detects and displays redirect chains
 * A redirect chain is when URL A redirects to B, which redirects to C, etc.
 */
export function RedirectChainList({ pages }: RedirectChainListProps) {
  const [expandedChain, setExpandedChain] = useState<string | null>(null);
  const [minHops, setMinHops] = useState(1);

  // Detect redirect chains from status codes and URLs
  const redirectChains = useMemo(() => {
    const chains: RedirectChain[] = [];
    const pageMap = new Map<string, PageData>();

    // Build page map for quick lookup
    for (const page of pages) {
      pageMap.set(page.url, page);
    }

    // Detect redirects based on status codes (301, 302, 307, 308)
    // In a real implementation, we'd need to track redirect destinations
    // For now, we'll simulate based on common patterns

    // Look for pages that might be redirects
    for (const page of pages) {
      if ([301, 302, 307, 308].includes(page.statusCode)) {
        // This is a redirect page - try to find the destination
        // In practice, the destination would be in the Location header
        // We'll use a heuristic: look for similar URLs or canonical

        const chain: string[] = [page.url];
        let currentUrl = page.canonicalUrl || page.url;
        let hops = 0;
        const visited = new Set([page.url]);

        // Follow the chain (max 10 hops to prevent infinite loops)
        while (hops < 10) {
          // Normalize URL
          try {
            const normalized = currentUrl.replace(/\/$/, '');
            if (visited.has(normalized)) break;

            const nextPage = pageMap.get(normalized);
            if (!nextPage) break;

            chain.push(normalized);
            visited.add(normalized);

            // If this page is also a redirect, continue
            if ([301, 302, 307, 308].includes(nextPage.statusCode) && nextPage.canonicalUrl) {
              currentUrl = nextPage.canonicalUrl;
              hops++;
            } else {
              break;
            }
          } catch {
            break;
          }
        }

        // Only add if chain has multiple hops
        if (chain.length >= 2 + minHops) {
          const lastPage = pageMap.get(chain[chain.length - 1]);
          chains.push({
            fromUrl: page.url,
            toUrl: chain[chain.length - 1],
            chain,
            hops: chain.length - 1,
            finalStatusCode: lastPage?.statusCode || 200,
          });
        }
      }
    }

    // Also detect potential redirect chains from URL patterns
    // (e.g., http -> https, www -> non-www, trailing slash variations)
    const urlGroups = new Map<string, string[]>();
    for (const page of pages) {
      try {
        const url = new URL(page.url);
        // Group by normalized path (without protocol, www, or trailing slash)
        const normalized = url.pathname.replace(/\/$/, '').toLowerCase();
        const key = url.host + normalized;

        if (!urlGroups.has(key)) {
          urlGroups.set(key, []);
        }
        urlGroups.get(key)!.push(page.url);
      } catch {
        // Skip invalid URLs
      }
    }

    // Find groups with multiple URLs (potential redirect chains)
    for (const [key, urls] of urlGroups.entries()) {
      if (urls.length > 1) {
        // Check if we already have this chain
        const existingChain = chains.find(
          (c) => c.chain.includes(urls[0]) || c.chain.includes(urls[urls.length - 1])
        );

        if (!existingChain && urls.length >= 2 + minHops) {
          const firstPage = pageMap.get(urls[0]);
          const lastPage = pageMap.get(urls[urls.length - 1]);
          chains.push({
            fromUrl: urls[0],
            toUrl: urls[urls.length - 1],
            chain: urls,
            hops: urls.length - 1,
            finalStatusCode: lastPage?.statusCode || 200,
          });
        }
      }
    }

    return chains.sort((a, b) => b.hops - a.hops);
  }, [pages, minHops]);

  const toggleExpand = (chainKey: string) => {
    setExpandedChain(expandedChain === chainKey ? null : chainKey);
  };

  return (
    <div className="border border-border rounded-lg bg-card p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">
          Redirect Chains
          {redirectChains.length > 0 && (
            <span className="ml-2 text-xs text-[var(--chart-3)]">
              {redirectChains.length} chain{redirectChains.length !== 1 ? 's' : ''} detected
            </span>
          )}
        </h3>
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Min hops:</span>
          <input
            type="number"
            value={minHops}
            onChange={(e) => setMinHops(Number(e.target.value))}
            min={1}
            max={5}
            className="w-16 bg-accent border border-border rounded px-2 py-1 text-foreground"
          />
        </label>
      </div>

      {/* Content */}
      {redirectChains.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 gap-3 text-muted-foreground">
          <span className="text-3xl">✅</span>
          <p className="text-sm">No redirect chains detected</p>
          <p className="text-xs">Redirect chains can slow down page loading and dilute link equity</p>
        </div>
      ) : (
        <div className="space-y-3">
          {redirectChains.map((chain, idx) => {
            const chainKey = `${chain.fromUrl}-${idx}`;
            const isExpanded = expandedChain === chainKey;
            const isLongChain = chain.hops >= 3;

            return (
              <div
                key={chainKey}
                className={`border rounded-lg overflow-hidden transition-colors ${
                  isLongChain
                    ? 'border-[var(--chart-3)]/50 bg-[var(--chart-3)]/10'
                    : 'border-border bg-card/30'
                }`}
              >
                {/* Chain Summary */}
                <button
                  onClick={() => toggleExpand(chainKey)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-lg font-bold ${
                        isLongChain ? 'text-[var(--chart-3)]' : 'text-muted-foreground'
                      }`}
                    >
                      {chain.hops} hop{chain.hops !== 1 ? 's' : ''}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono truncate max-w-md">
                      {chain.fromUrl}
                    </span>
                    <span className="text-muted-foreground">→</span>
                    <span className="text-xs text-muted-foreground font-mono truncate max-w-md">
                      {chain.toUrl}
                    </span>
                  </div>
                  <span
                    className={`text-xs transition-transform ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {/* Expanded Chain Details */}
                {isExpanded && (
                  <div className="border-t border-border p-4 bg-card/50">
                    <div className="flex items-center gap-2 mb-3 text-xs">
                      <span className="text-muted-foreground">Full chain:</span>
                      {isLongChain && (
                        <span className="px-2 py-0.5 rounded bg-[var(--chart-3)]/20 text-[var(--chart-3)]">
                          ⚠ Long chain - consider simplifying
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded bg-accent text-muted-foreground">
                        Final status: {chain.finalStatusCode}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                      {chain.chain.map((url, urlIdx) => (
                        <>
                          <span
                            key={url}
                            className="px-2 py-1 rounded bg-accent text-foreground truncate max-w-xs"
                            title={url}
                          >
                            {new URL(url).pathname || url}
                          </span>
                          {urlIdx < chain.chain.length - 1 && (
                            <span className="text-muted-foreground">→</span>
                          )}
                        </>
                      ))}
                    </div>
                    <div className="mt-3 text-xs text-muted-foreground">
                      <p>
                        <strong>Impact:</strong> Each redirect hop adds latency and can dilute PageRank.
                      </p>
                      <p className="mt-1">
                        <strong>Recommendation:</strong> Update internal links to point directly to the final destination.
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
          <strong>Why it matters:</strong> Redirect chains increase page load time and can cause search engines to
          drop URLs from the chain. Each hop also potentially loses some link equity.
        </p>
      </div>
    </div>
  );
}

export default RedirectChainList;
