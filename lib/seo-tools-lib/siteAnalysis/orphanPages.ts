/**
 * Orphan Pages Detection and Link Depth Calculation
 * 
 * Identifies pages with no internal links pointing to them
 * and calculates the click depth from the root URL.
 */

import type { PageData, OrphanPage } from '../types';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PageWithDepth {
  url: string;
  depth: number;
  inboundCount: number;
  inboundUrls: string[];
}

export interface OrphanPagesResult {
  orphans: OrphanPage[];
  pagesWithDepth: PageWithDepth[];
  depthDistribution: Record<number, number>;
}

// ─── Helper Functions ─────────────────────────────────────────────────────────

/**
 * Normalize URL for comparison (remove trailing slash, lowercase)
 */
function normalizeUrl(url: string): string {
  try {
    const u = new URL(url);
    u.hash = '';
    let href = u.href;
    if (href.endsWith('/') && u.pathname !== '/') {
      href = href.slice(0, -1);
    }
    return href.toLowerCase();
  } catch {
    return url.toLowerCase();
  }
}

/**
 * Build inbound link map from all pages
 * Returns Map<normalizedUrl, array of referrer URLs>
 */
function buildInboundMap(pages: PageData[]): Map<string, string[]> {
  const inboundMap = new Map<string, string[]>();
  
  for (const page of pages) {
    const normalizedTarget = normalizeUrl(page.url);
    
    // Initialize entry for this page
    if (!inboundMap.has(normalizedTarget)) {
      inboundMap.set(normalizedTarget, []);
    }
    
    // Add this page as a referrer for all its internal links
    for (const linkUrl of page.internalLinksTo) {
      const normalizedLink = normalizeUrl(linkUrl);
      if (!inboundMap.has(normalizedLink)) {
        inboundMap.set(normalizedLink, []);
      }
      inboundMap.get(normalizedLink)!.push(page.url);
    }
  }
  
  return inboundMap;
}

/**
 * Build adjacency list for BFS traversal
 * Returns Map<normalizedUrl, array of normalized linked URLs>
 */
function buildAdjacencyList(pages: PageData[]): Map<string, string[]> {
  const adjacency = new Map<string, string[]>();
  
  for (const page of pages) {
    const normalizedSource = normalizeUrl(page.url);
    
    if (!adjacency.has(normalizedSource)) {
      adjacency.set(normalizedSource, []);
    }
    
    for (const linkUrl of page.internalLinksTo) {
      const normalizedTarget = normalizeUrl(linkUrl);
      adjacency.get(normalizedSource)!.push(normalizedTarget);
    }
  }
  
  return adjacency;
}

/**
 * BFS to calculate depth from root for all pages
 */
function calculateDepths(
  adjacency: Map<string, string[]>,
  rootUrl: string,
  allPageUrls: Set<string>
): Map<string, number> {
  const depths = new Map<string, number>();
  const normalizedRoot = normalizeUrl(rootUrl);
  
  // Initialize root
  depths.set(normalizedRoot, 0);
  const queue: [string, number][] = [[normalizedRoot, 0]];
  
  while (queue.length > 0) {
    const [currentUrl, currentDepth] = queue.shift()!;
    
    const neighbors = adjacency.get(currentUrl) || [];
    for (const neighbor of neighbors) {
      if (!depths.has(neighbor) && allPageUrls.has(neighbor)) {
        depths.set(neighbor, currentDepth + 1);
        queue.push([neighbor, currentDepth + 1]);
      }
    }
  }
  
  // For any pages not reached by BFS, mark them as depth -1 (orphaned)
  for (const url of allPageUrls) {
    if (!depths.has(url)) {
      depths.set(url, -1);
    }
  }
  
  return depths;
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Find orphan pages and calculate link depths
 * 
 * @param pages - Array of PageData to analyze
 * @param rootUrl - The root/homepage URL for depth calculation
 * @returns OrphanPagesResult with orphans, depths, and distribution
 */
export function findOrphanPages(
  pages: PageData[],
  rootUrl: string
): OrphanPagesResult {
  if (pages.length === 0) {
    return {
      orphans: [],
      pagesWithDepth: [],
      depthDistribution: {},
    };
  }
  
  // Build data structures
  const inboundMap = buildInboundMap(pages);
  const adjacency = buildAdjacencyList(pages);
  const allPageUrls = new Set(pages.map(p => normalizeUrl(p.url)));
  
  // Calculate depths using BFS from root
  const depths = calculateDepths(adjacency, rootUrl, allPageUrls);
  
  // Build results
  const orphans: OrphanPage[] = [];
  const pagesWithDepth: PageWithDepth[] = [];
  const depthDistribution: Record<number, number> = {};
  
  for (const page of pages) {
    const normalized = normalizeUrl(page.url);
    const inboundUrls = inboundMap.get(normalized) || [];
    const depth = depths.get(normalized) ?? -1;
    
    const pageData: PageWithDepth = {
      url: page.url,
      depth: depth === -1 ? Infinity : depth,
      inboundCount: inboundUrls.length,
      inboundUrls,
    };
    
    pagesWithDepth.push(pageData);
    
    // Track depth distribution (cap at 5+ for display)
    if (depth >= 0) {
      const displayDepth = depth >= 5 ? 5 : depth;
      depthDistribution[displayDepth] = (depthDistribution[displayDepth] || 0) + 1;
    }
    
    // Orphan = no inbound internal links (and not the root)
    if (inboundUrls.length === 0 && normalized !== normalizeUrl(rootUrl)) {
      orphans.push({
        url: page.url,
        inboundCount: 0,
      });
    }
  }
  
  // Sort orphans by URL for consistent output
  orphans.sort((a, b) => a.url.localeCompare(b.url));
  
  return {
    orphans,
    pagesWithDepth,
    depthDistribution,
  };
}

/**
 * Get pages at a specific depth level
 */
export function getPagesAtDepth(
  pagesWithDepth: PageWithDepth[],
  depth: number
): PageWithDepth[] {
  return pagesWithDepth.filter(p => p.depth === depth);
}

/**
 * Get orphan pages with their details
 */
export function getOrphanPagesDetails(
  pages: PageData[],
  rootUrl: string
): Array<OrphanPage & { title: string; seoScore: number }> {
  const { orphans } = findOrphanPages(pages, rootUrl);
  
  return orphans
    .map(orphan => {
      const page = pages.find(p => p.url === orphan.url);
      if (!page) return null;
      return {
        ...orphan,
        title: page.title || '(No title)',
        seoScore: page.seoScore,
      };
    })
    .filter((p): p is NonNullable<typeof p> => p !== null)
    .sort((a, b) => a.seoScore - b.seoScore); // Lowest scores first
}

/**
 * Calculate average depth across all pages
 */
export function getAverageDepth(pagesWithDepth: PageWithDepth[]): number {
  const validDepths = pagesWithDepth
    .map(p => p.depth)
    .filter(d => typeof d === 'number' && d >= 0);
  
  if (validDepths.length === 0) return 0;
  
  return validDepths.reduce((sum, d) => sum + d, 0) / validDepths.length;
}
