/**
 * XML Sitemap Parser and Auditor
 * 
 * Fetches and parses XML sitemaps, then cross-references
 * with crawled URLs to identify missing or extra pages.
 */

import type { PageData, SitemapAudit } from '../types';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: number;
}

export interface SitemapParseResult {
  urls: SitemapUrl[];
  sitemapUrl: string;
  parseError?: string;
}

export interface SitemapAnalysis {
  audit: SitemapAudit;
  sitemapUrls: SitemapUrl[];
  coveragePercentage: number;
}
const CF_WORKER_BASE_URL = process.env.NEXT_PUBLIC_CF_WORKER_BASE_URL;

// ─── Helper Functions ─────────────────────────────────────────────────────────

/**
 * Normalize URL for comparison
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
 * Parse XML string to extract sitemap URLs
 */
function parseSitemapXml(xmlString: string): SitemapUrl[] {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

  // Check for parse errors
  const parseError = xmlDoc.querySelector('parsererror');
  if (parseError) {
    throw new Error('Invalid XML in sitemap');
  }

  const urls: SitemapUrl[] = [];

  // Handle sitemap index (contains other sitemaps)
  const sitemapIndex = xmlDoc.querySelector('sitemapindex');
  if (sitemapIndex) {
    const sitemaps = sitemapIndex.querySelectorAll('sitemap');
    for (const sitemap of Array.from(sitemaps)) {
      const loc = sitemap.querySelector('loc');
      if (loc?.textContent) {
        // For sitemap indexes, we just collect the sitemap URLs
        // Actual parsing would require fetching each sub-sitemap
        urls.push({ loc: loc.textContent.trim() });
      }
    }
    return urls;
  }

  // Handle regular URL set
  const urlElements = xmlDoc.querySelectorAll('url');
  for (const urlEl of Array.from(urlElements)) {
    const loc = urlEl.querySelector('loc');
    if (!loc?.textContent) continue;

    const lastmod = urlEl.querySelector('lastmod')?.textContent;
    const changefreq = urlEl.querySelector('changefreq')?.textContent;
    const priorityStr = urlEl.querySelector('priority')?.textContent;

    urls.push({
      loc: loc.textContent.trim(),
      lastmod: lastmod?.trim(),
      changefreq: changefreq?.trim() as SitemapUrl['changefreq'],
      priority: priorityStr ? parseFloat(priorityStr) : undefined,
    });
  }

  return urls;
}

/**
 * Try to discover sitemap URL from common locations
 */
function getSitemapCandidates(origin: string): string[] {
  return [
    `${origin}/sitemap.xml`,
    `${origin}/sitemap_index.xml`,
    `${origin}/sitemap-index.xml`,
    `${origin}/sitemap.xml.gz`,
  ];
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Fetch and parse a sitemap XML file
 * 
 * @param sitemapUrl - URL of the sitemap to fetch
 * @returns Parsed sitemap URLs or error
 */
export async function fetchAndParseSitemap(
  sitemapUrl: string,
  sessionToken: string
): Promise<SitemapParseResult> {
  try {
    const response = await fetch(`${CF_WORKER_BASE_URL}/get-html-page?url=${encodeURIComponent(sitemapUrl)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sessionToken}`
      }
    });

    if (!response.ok) {
      return {
        urls: [],
        sitemapUrl,
        parseError: `HTTP ${response.status}`,
      };
    }

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('xml') && !contentType.includes('text')) {
      return {
        urls: [],
        sitemapUrl,
        parseError: 'Not an XML document',
      };
    }

    const xmlText = await response.text();
    const urls = parseSitemapXml(xmlText);

    return {
      urls,
      sitemapUrl,
    };
  } catch (error) {
    return {
      urls: [],
      sitemapUrl,
      parseError: error instanceof Error ? error.message : 'Fetch failed',
    };
  }
}

/**
 * Try to find and parse sitemap from common locations
 */
export async function discoverAndParseSitemap(
  origin: string,
  sessionToken: string
): Promise<SitemapParseResult> {
  const candidates = getSitemapCandidates(origin);

  for (const candidate of candidates) {
    const result = await fetchAndParseSitemap(candidate, sessionToken);
    if (!result.parseError && result.urls.length > 0) {
      return result;
    }
  }

  return {
    urls: [],
    sitemapUrl: candidates[0],
    parseError: 'No sitemap found at common locations',
  };
}

/**
 * Parse robots.txt to find sitemap URL
 * 
 * @param robotsText - Raw robots.txt content
 * @returns Array of sitemap URLs found
 */
export function parseRobotsForSitemaps(robotsText: string): string[] {
  const sitemaps: string[] = [];
  const lines = robotsText.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.toLowerCase().startsWith('sitemap:')) {
      const url = trimmed.substring(8).trim();
      if (url) {
        sitemaps.push(url);
      }
    }
  }

  return sitemaps;
}

/**
 * Compare sitemap URLs with crawled pages
 */
export function analyzeSitemapCoverage(
  sitemapUrls: SitemapUrl[],
  crawledPages: PageData[]
): SitemapAnalysis {
  const sitemapNormalized = new Set(sitemapUrls.map(u => normalizeUrl(u.loc)));
  const crawledNormalized = new Set(crawledPages.map(p => normalizeUrl(p.url)));

  // URLs in sitemap but not crawled
  const inSitemapNotCrawled: string[] = [];
  for (const url of sitemapNormalized) {
    if (!crawledNormalized.has(url)) {
      inSitemapNotCrawled.push(url);
    }
  }

  // URLs crawled but not in sitemap
  const crawledNotInSitemap: string[] = [];
  for (const url of crawledNormalized) {
    if (!sitemapNormalized.has(url)) {
      crawledNotInSitemap.push(url);
    }
  }

  // Calculate coverage percentage
  const totalSitemapUrls = sitemapNormalized.size;
  const coveredUrls = totalSitemapUrls - inSitemapNotCrawled.length;
  const coveragePercentage = totalSitemapUrls > 0
    ? Math.round((coveredUrls / totalSitemapUrls) * 100)
    : 100;

  return {
    audit: {
      sitemapUrl: sitemapUrls[0]?.loc || '',
      inSitemapNotCrawled: inSitemapNotCrawled.sort(),
      crawledNotInSitemap: crawledNotInSitemap.sort(),
      total: totalSitemapUrls,
    },
    sitemapUrls,
    coveragePercentage,
  };
}

/**
 * Full sitemap audit workflow
 */
export async function performSitemapAudit(
  origin: string,
  crawledPages: PageData[],
  sessionToken: string
): Promise<SitemapAnalysis> {
  // Try to discover sitemap
  const discovery = await discoverAndParseSitemap(origin, sessionToken);

  if (discovery.parseError || discovery.urls.length === 0) {
    return {
      audit: {
        sitemapUrl: discovery.sitemapUrl,
        inSitemapNotCrawled: [],
        crawledNotInSitemap: crawledPages.map(p => p.url).sort(),
        total: 0,
      },
      sitemapUrls: [],
      coveragePercentage: 0,
    };
  }

  // Check if we got a sitemap index (list of sitemaps)
  // For now, we'll just use the first level URLs
  const sitemapUrls = discovery.urls.filter(u => u.loc.includes('/'));

  return analyzeSitemapCoverage(sitemapUrls, crawledPages);
}

/**
 * Get sitemap issues as human-readable messages
 */
export function getSitemapIssues(analysis: SitemapAnalysis): string[] {
  const issues: string[] = [];

  if (analysis.audit.total === 0) {
    issues.push('No sitemap found or sitemap is empty');
    return issues;
  }

  if (analysis.coveragePercentage < 100) {
    issues.push(
      `${analysis.audit.inSitemapNotCrawled.length} URLs in sitemap were not crawled`
    );
  }

  if (analysis.audit.crawledNotInSitemap.length > 0) {
    issues.push(
      `${analysis.audit.crawledNotInSitemap.length} crawled URLs are not in sitemap`
    );
  }

  if (analysis.coveragePercentage < 80) {
    issues.push('Sitemap coverage is below 80% - consider updating sitemap');
  }

  return issues;
}
