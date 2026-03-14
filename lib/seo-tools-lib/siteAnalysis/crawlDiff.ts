/**
 * Crawl Diff - Compare Two Crawl Snapshots
 * 
 * Compares two CrawlSnapshot objects to identify
 * added, removed, and changed pages.
 */

import type { CrawlSnapshot, CrawlDiff, PageData } from '../types';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FieldChange {
  field: string;
  oldValue: unknown;
  newValue: unknown;
}

export interface PageChange {
  url: string;
  changes: FieldChange[];
  scoreChange: number;
}

export interface CrawlDiffResult extends CrawlDiff {
  pageChanges: PageChange[];
  summary: {
    totalAdded: number;
    totalRemoved: number;
    totalChanged: number;
    avgScoreChange: number;
  };
}

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
    return href;
  } catch {
    return url;
  }
}

/**
 * Get comparable fields from PageData
 */
function getPageFields(page: PageData): Record<string, unknown> {
  return {
    title: page.title,
    titleLength: page.titleLength,
    metaDescription: page.metaDescription,
    metaDescriptionLength: page.metaDescriptionLength,
    statusCode: page.statusCode,
    wordCount: page.wordCount,
    h1Count: page.h1Count,
    h1s: page.h1s,
    h2Count: page.h2Count,
    imageCount: page.imageCount,
    imagesWithoutAlt: page.imagesWithoutAlt,
    internalLinkCount: page.internalLinkCount,
    externalLinkCount: page.externalLinkCount,
    hasStructuredData: page.hasStructuredData,
    schemaTypes: page.schemaTypes,
    canonicalUrl: page.canonicalUrl,
    noindex: page.noindex,
    nofollow: page.nofollow,
    hasMobileViewport: page.hasMobileViewport,
    isHttps: page.isHttps,
    seoScore: page.seoScore,
    issues: page.issues.map(i => i.code),
  };
}

/**
 * Compare two page objects and return field changes
 */
function comparePages(oldPage: PageData, newPage: PageData): FieldChange[] {
  const oldFields = getPageFields(oldPage);
  const newFields = getPageFields(newPage);
  const changes: FieldChange[] = [];
  
  for (const [field, oldValue] of Object.entries(oldFields)) {
    const newValue = newFields[field];
    
    // Skip if same value
    if (JSON.stringify(oldValue) === JSON.stringify(newValue)) {
      continue;
    }
    
    changes.push({
      field,
      oldValue,
      newValue,
    });
  }
  
  return changes;
}

/**
 * Determine if a change is significant
 */
function isSignificantChange(change: FieldChange): boolean {
  // Score changes are always significant
  if (change.field === 'seoScore') {
    const scoreDiff = Math.abs((change.newValue as number) - (change.oldValue as number));
    return scoreDiff >= 5;
  }
  
  // Status code changes are significant
  if (change.field === 'statusCode') {
    return true;
  }
  
  // Title changes
  if (change.field === 'title' || change.field === 'titleLength') {
    return true;
  }
  
  // Meta description changes
  if (change.field === 'metaDescription' || change.field === 'metaDescriptionLength') {
    return true;
  }
  
  // H1 changes
  if (change.field === 'h1Count' || change.field === 'h1s') {
    return true;
  }
  
  // Indexing status changes
  if (change.field === 'noindex' || change.field === 'nofollow') {
    return true;
  }
  
  // Canonical changes
  if (change.field === 'canonicalUrl') {
    return true;
  }
  
  // New issues or resolved issues
  if (change.field === 'issues') {
    return true;
  }
  
  return false;
}

// ─── Storage Helpers ──────────────────────────────────────────────────────────

const STORAGE_PREFIX = 'seo-crawl-snapshot-';

/**
 * Generate storage key from root URL and timestamp
 */
function getStorageKey(rootUrl: string, timestamp?: string): string {
  const ts = timestamp || new Date().toISOString();
  return `${STORAGE_PREFIX}${encodeURIComponent(rootUrl)}-${ts}`;
}

/**
 * Parse storage key to extract root URL and timestamp
 */
function parseStorageKey(key: string): { rootUrl: string; timestamp: string } | null {
  if (!key.startsWith(STORAGE_PREFIX)) return null;
  
  const remainder = key.slice(STORAGE_PREFIX.length);
  const lastDash = remainder.lastIndexOf('-');
  
  if (lastDash === -1) return null;
  
  return {
    rootUrl: decodeURIComponent(remainder.slice(0, lastDash)),
    timestamp: remainder.slice(lastDash + 1),
  };
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Compare two crawl snapshots
 */
export function compareCrawls(
  oldSnapshot: CrawlSnapshot,
  newSnapshot: CrawlSnapshot
): CrawlDiffResult {
  // Build URL maps for quick lookup
  const oldUrls = new Map(oldSnapshot.pages.map(p => [normalizeUrl(p.url), p]));
  const newUrls = new Map(newSnapshot.pages.map(p => [normalizeUrl(p.url), p]));
  
  const added: string[] = [];
  const removed: string[] = [];
  const changed: { url: string; fieldChanges: string[] }[] = [];
  const pageChanges: PageChange[] = [];
  
  // Find added and changed pages
  for (const [normalizedUrl, newPage] of newUrls.entries()) {
    const oldPage = oldUrls.get(normalizedUrl);
    
    if (!oldPage) {
      added.push(newPage.url);
    } else {
      const changes = comparePages(oldPage, newPage);
      const significantChanges = changes.filter(isSignificantChange);
      
      if (significantChanges.length > 0) {
        changed.push({
          url: newPage.url,
          fieldChanges: significantChanges.map(c => c.field),
        });
        
        pageChanges.push({
          url: newPage.url,
          changes: significantChanges,
          scoreChange: newPage.seoScore - oldPage.seoScore,
        });
      }
    }
  }
  
  // Find removed pages
  for (const [normalizedUrl, oldPage] of oldUrls.entries()) {
    if (!newUrls.has(normalizedUrl)) {
      removed.push(oldPage.url);
    }
  }
  
  // Calculate summary statistics
  const totalScoreChange = pageChanges.reduce(
    (sum, pc) => sum + pc.scoreChange,
    0
  );
  const avgScoreChange = pageChanges.length > 0
    ? Math.round((totalScoreChange / pageChanges.length) * 100) / 100
    : 0;
  
  return {
    added: added.sort(),
    removed: removed.sort(),
    changed: changed.sort((a, b) => a.url.localeCompare(b.url)),
    pageChanges,
    summary: {
      totalAdded: added.length,
      totalRemoved: removed.length,
      totalChanged: changed.length,
      avgScoreChange,
    },
  };
}

/**
 * Save a crawl snapshot to localStorage
 */
export function saveSnapshot(snapshot: CrawlSnapshot): string {
  const key = getStorageKey(snapshot.rootUrl, snapshot.crawledAt);
  localStorage.setItem(key, JSON.stringify(snapshot));
  return key;
}

/**
 * Load a crawl snapshot from localStorage
 */
export function loadSnapshot(key: string): CrawlSnapshot | null {
  const data = localStorage.getItem(key);
  if (!data) return null;
  
  try {
    return JSON.parse(data) as CrawlSnapshot;
  } catch {
    return null;
  }
}

/**
 * List all stored snapshots for a root URL
 */
export function listSnapshots(rootUrl?: string): Array<{
  key: string;
  rootUrl: string;
  timestamp: string;
  pageCount: number;
}> {
  const snapshots: Array<{
    key: string;
    rootUrl: string;
    timestamp: string;
    pageCount: number;
  }> = [];
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key || !key.startsWith(STORAGE_PREFIX)) continue;
    
    const parsed = parseStorageKey(key);
    if (!parsed) continue;
    
    if (rootUrl && parsed.rootUrl !== rootUrl) continue;
    
    try {
      const snapshot = JSON.parse(localStorage.getItem(key)!) as CrawlSnapshot;
      snapshots.push({
        key,
        rootUrl: parsed.rootUrl,
        timestamp: parsed.timestamp,
        pageCount: snapshot.pages.length,
      });
    } catch {
      // Skip invalid snapshots
    }
  }
  
  // Sort by timestamp descending
  return snapshots.sort((a, b) =>
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

/**
 * Delete a snapshot from localStorage
 */
export function deleteSnapshot(key: string): void {
  localStorage.removeItem(key);
}

/**
 * Get the two most recent snapshots for comparison
 */
export function getLatestTwoSnapshots(
  rootUrl: string
): { older: CrawlSnapshot; newer: CrawlSnapshot } | null {
  const snapshots = listSnapshots(rootUrl).slice(0, 2);
  
  if (snapshots.length < 2) return null;
  
  const newer = loadSnapshot(snapshots[0].key);
  const older = loadSnapshot(snapshots[1].key);
  
  if (!newer || !older) return null;
  
  return { older, newer };
}

/**
 * Create a diff from the two most recent snapshots
 */
export function diffLatestSnapshots(rootUrl: string): CrawlDiffResult | null {
  const snapshots = getLatestTwoSnapshots(rootUrl);
  if (!snapshots) return null;
  
  return compareCrawls(snapshots.older, snapshots.newer);
}

/**
 * Format diff for display
 */
export function formatDiffSummary(diff: CrawlDiffResult): string {
  const parts: string[] = [];
  
  if (diff.summary.totalAdded > 0) {
    parts.push(`+${diff.summary.totalAdded} new page(s)`);
  }
  
  if (diff.summary.totalRemoved > 0) {
    parts.push(`-${diff.summary.totalRemoved} removed page(s)`);
  }
  
  if (diff.summary.totalChanged > 0) {
    parts.push(`${diff.summary.totalChanged} changed page(s)`);
  }
  
  if (diff.summary.avgScoreChange !== 0) {
    const sign = diff.summary.avgScoreChange > 0 ? '+' : '';
    parts.push(`${sign}${diff.summary.avgScoreChange} avg score change`);
  }
  
  return parts.join(' • ') || 'No changes detected';
}

/**
 * Get pages with biggest score improvements
 */
export function getTopImprovements(diff: CrawlDiffResult, limit = 5): PageChange[] {
  return diff.pageChanges
    .filter(pc => pc.scoreChange > 0)
    .sort((a, b) => b.scoreChange - a.scoreChange)
    .slice(0, limit);
}

/**
 * Get pages with biggest score declines
 */
export function getTopDeclines(diff: CrawlDiffResult, limit = 5): PageChange[] {
  return diff.pageChanges
    .filter(pc => pc.scoreChange < 0)
    .sort((a, b) => a.scoreChange - b.scoreChange)
    .slice(0, limit);
}
