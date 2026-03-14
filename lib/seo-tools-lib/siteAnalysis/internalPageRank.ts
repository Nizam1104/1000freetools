/**
 * Internal PageRank Simulation
 * 
 * Implements the classic PageRank algorithm to simulate
 * link equity distribution across internal pages.
 */

import type { PageData } from '../types';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PageRankResult {
  url: string;
  pageRank: number;       // Raw PageRank score (0-1 before normalization)
  normalizedScore: number; // Normalized to 0-100 scale
  inboundCount: number;    // Number of internal links pointing to this page
  outboundCount: number;   // Number of internal links from this page
}

export interface PageRankOptions {
  dampingFactor?: number;  // Default 0.85
  iterations?: number;     // Default 20
}

// ─── Helper Functions ─────────────────────────────────────────────────────────

/**
 * Normalize URL for consistent comparison
 */
function normalizeUrl(url: string): string {
  try {
    const u = new URL(url);
    u.hash = '';
    let href = u.href;
    if (href.endsWith('/') && u.pathname !== '/') {
      href = href.slice(0, -1);
    }
    return href;
  } catch {
    return url;
  }
}

/**
 * Build adjacency list for PageRank calculation
 * Returns Map<normalizedUrl, normalizedUrls it links to>
 */
function buildGraph(pages: PageData[]): Map<string, string[]> {
  const urlSet = new Set(pages.map(p => normalizeUrl(p.url)));
  const graph = new Map<string, string[]>();
  
  // Initialize all nodes
  for (const page of pages) {
    const normalized = normalizeUrl(page.url);
    graph.set(normalized, []);
  }
  
  // Add edges (only to pages that exist in our crawl)
  for (const page of pages) {
    const source = normalizeUrl(page.url);
    const targets: string[] = [];
    
    for (const linkUrl of page.internalLinksTo) {
      const normalizedTarget = normalizeUrl(linkUrl);
      // Only count links to pages we've crawled
      if (urlSet.has(normalizedTarget)) {
        targets.push(normalizedTarget);
      }
    }
    
    graph.set(source, targets);
  }
  
  return graph;
}

/**
 * Handle dangling nodes (pages with no outbound links)
 * They distribute their PageRank equally to all pages
 */
function findDanglingNodes(graph: Map<string, string[]>): string[] {
  const dangling: string[] = [];
  for (const [url, targets] of graph.entries()) {
    if (targets.length === 0) {
      dangling.push(url);
    }
  }
  return dangling;
}

// ─── PageRank Algorithm ───────────────────────────────────────────────────────

/**
 * Calculate PageRank for all pages
 * 
 * Uses the standard iterative PageRank algorithm:
 * PR(A) = (1-d)/N + d * sum(PR(Ti)/C(Ti))
 * 
 * Where:
 * - d = damping factor (usually 0.85)
 * - N = total number of pages
 * - Ti = pages linking to A
 * - C(Ti) = number of outbound links from Ti
 */
export function calculatePageRank(
  pages: PageData[],
  options: PageRankOptions = {}
): PageRankResult[] {
  const {
    dampingFactor = 0.85,
    iterations = 20,
  } = options;
  
  if (pages.length === 0) return [];
  
  const graph = buildGraph(pages);
  const urls = Array.from(graph.keys());
  const n = urls.length;
  
  if (n === 0) return [];
  
  // Initialize PageRank equally for all pages
  let pageRanks = new Map<string, number>();
  for (const url of urls) {
    pageRanks.set(url, 1 / n);
  }
  
  // Find dangling nodes
  const danglingNodes = findDanglingNodes(graph);
  
  // Build reverse graph (who links to whom)
  const reverseGraph = new Map<string, string[]>();
  for (const url of urls) {
    reverseGraph.set(url, []);
  }
  for (const [source, targets] of graph.entries()) {
    for (const target of targets) {
      reverseGraph.get(target)!.push(source);
    }
  }
  
  // Iterative PageRank calculation
  for (let iter = 0; iter < iterations; iter++) {
    const newRanks = new Map<string, number>();
    
    // Calculate dangling node contribution
    let danglingSum = 0;
    for (const danglingUrl of danglingNodes) {
      danglingSum += pageRanks.get(danglingUrl) || 0;
    }
    
    // Calculate new PageRank for each page
    for (const url of urls) {
      // Base rank from damping factor
      let rank = (1 - dampingFactor) / n;
      
      // Add contribution from dangling nodes (distributed equally)
      rank += (dampingFactor * danglingSum) / n;
      
      // Add contribution from linking pages
      const linkingPages = reverseGraph.get(url) || [];
      for (const linkingPage of linkingPages) {
        const linkingPageRank = pageRanks.get(linkingPage) || 0;
        const outboundCount = graph.get(linkingPage)?.length || 1;
        rank += (dampingFactor * linkingPageRank) / outboundCount;
      }
      
      newRanks.set(url, rank);
    }
    
    pageRanks = newRanks;
  }
  
  // Normalize to 0-100 scale
  const ranks = Array.from(pageRanks.entries());
  const maxRank = Math.max(...ranks.map(([, rank]) => rank));
  const minRank = Math.min(...ranks.map(([, rank]) => rank));
  const range = maxRank - minRank || 1;
  
  // Build results with inbound/outbound counts
  const results: PageRankResult[] = urls.map(url => {
    const rawRank = pageRanks.get(url) || 0;
    
    // Normalize to 0-100
    const normalizedScore = Math.round(((rawRank - minRank) / range) * 100);
    
    // Count inbound links
    const inboundCount = reverseGraph.get(url)?.length || 0;
    
    // Count outbound links
    const outboundCount = graph.get(url)?.length || 0;
    
    return {
      url,
      pageRank: rawRank,
      normalizedScore,
      inboundCount,
      outboundCount,
    };
  });
  
  // Sort by PageRank descending
  return results.sort((a, b) => b.pageRank - a.pageRank);
}

/**
 * Get top pages by PageRank
 */
export function getTopPagesByPageRank(
  pages: PageData[],
  limit = 10,
  options?: PageRankOptions
): PageRankResult[] {
  return calculatePageRank(pages, options).slice(0, limit);
}

/**
 * Get PageRank distribution statistics
 */
export function getPageRankStats(
  results: PageRankResult[]
): {
  mean: number;
  median: number;
  stdDev: number;
  max: number;
  min: number;
} {
  if (results.length === 0) {
    return { mean: 0, median: 0, stdDev: 0, max: 0, min: 0 };
  }
  
  const scores = results.map(r => r.normalizedScore).sort((a, b) => a - b);
  const n = scores.length;
  
  // Mean
  const mean = scores.reduce((sum, s) => sum + s, 0) / n;
  
  // Median
  const median = n % 2 === 0
    ? (scores[n / 2 - 1] + scores[n / 2]) / 2
    : scores[Math.floor(n / 2)];
  
  // Standard deviation
  const variance = scores.reduce((sum, s) => sum + Math.pow(s - mean, 2), 0) / n;
  const stdDev = Math.sqrt(variance);
  
  return {
    mean: Math.round(mean * 100) / 100,
    median: Math.round(median * 100) / 100,
    stdDev: Math.round(stdDev * 100) / 100,
    max: scores[n - 1],
    min: scores[0],
  };
}

/**
 * Identify pages with low PageRank but high importance
 * (e.g., pages deep in the hierarchy that should be promoted)
 */
export function findUndervaluedPages(
  pageRankResults: PageRankResult[],
  pages: PageData[]
): Array<PageRankResult & { depth: number; wordCount: number }> {
  const pageMap = new Map(pages.map(p => [normalizeUrl(p.url), p]));
  
  return pageRankResults
    .filter(result => {
      const page = pageMap.get(result.url);
      if (!page) return false;
      
      // Low PageRank (bottom 50%) but decent content (word count > 300)
      return result.normalizedScore < 50 && page.wordCount > 300;
    })
    .map(result => {
      const page = pageMap.get(result.url)!;
      return {
        ...result,
        depth: page.urlDepth,
        wordCount: page.wordCount,
      };
    })
    .sort((a, b) => b.wordCount - a.wordCount); // Highest content first
}
