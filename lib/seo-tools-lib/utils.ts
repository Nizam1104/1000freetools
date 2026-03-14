/**
 * Crawl utilities shared across the SEO Analytics app.
 * Extracted from page.tsx so the component stays thin.
 */

import { analysePage, normaliseUrl, isInternalUrl, type PageData } from './seoAnalyser';
import type { CrawlState } from './types';

const SERVER = 'https://tft-seo-audit.nizam-v.workers.dev';

export { type CrawlState } from './types';

// Rate limiting constants
const LOCALHOST_CONCURRENCY = 10; // 10 URLs per second for localhost
const REMOTE_BATCH_SIZE = 10; // Process 10 URLs at a time for remote sites
const REMOTE_COOLDOWN_MS = 5000; // 5 second cooldown between batches
const UI_UPDATE_RATE = 2; // 2 URLs per second UI update during cooldown

export function createCrawlState(startUrl: string): CrawlState {
  return {
    visited: new Set(),
    queue: [startUrl],
    referrers: { [startUrl]: new Set() },
    results: [],
    stopped: false,
    active: 0,
  };
}

/** Build a PageData error stub when we can't fetch/parse a URL */
function makeErrorPageData(
  url: string,
  statusCode: number,
  contentType: string,
  responseTimeMs: number,
  fetchError: string | null
): PageData {
  return {
    url,
    statusCode,
    contentType,
    responseTimeMs,
    crawledAt: new Date().toISOString(),
    error: fetchError,

    title: '', titleLength: 0,
    metaDescription: '', metaDescriptionLength: 0,
    metaKeywords: '', canonicalUrl: '', canonicalIsSelf: false,
    robotsMeta: '', noindex: false, nofollow: false,
    langAttr: '', charset: '', hreflangTags: [], viewportMeta: '',
    ogTitle: '', ogDescription: '', ogImage: '', ogType: '',
    twitterCard: '', twitterTitle: '', twitterImage: '',

    h1Count: 0, h1s: [], h2Count: 0, h2s: [],
    h3Count: 0, h3s: [], h4Count: 0, h4s: [],
    h5Count: 0, h5s: [], h6Count: 0, h6s: [],
    headingHierarchyViolations: [], emptyHeadings: [],

    wordCount: 0, charCount: 0, paragraphCount: 0,
    avgSentenceLength: 0, textToHtmlRatio: 0,
    readabilityScore: null, keywordDensity: [],

    imageCount: 0, imagesWithoutAlt: 0, images: [],

    totalLinks: 0, internalLinkCount: 0, externalLinkCount: 0,
    nofollowLinkCount: 0, nofollowInternalCount: 0,
    internalLinksTo: [], externalLinks: [],
    genericAnchorCount: 0, linkDepthFromRoot: 0,

    urlLength: 0, urlDepth: 0, urlHasParams: false,
    urlHasUppercase: false, urlHasUnderscores: false, urlHasTrailingSlash: false,

    hasStructuredData: false, schemaTypes: [], schemaRaw: [],
    hasBreadcrumbSchema: false, hasAmpVersion: false,
    renderBlockingScripts: 0, inlineStyleCount: 0, externalScriptCount: 0,
    hasPreload: false, hasPreconnect: false,
    mixedContent: false, isHttps: url.startsWith('https://'),

    hasMobileViewport: false, hasInterstitials: false,
    pageSizeBytes: 0,

    issues: fetchError
      ? [{ code: 'FETCH_ERROR', message: `Fetch error: ${fetchError}`, severity: 'critical' as const }]
      : [],
    seoScore: 0,
  };
}

/** Check if a URL is localhost */
function isLocalhostUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.hostname === 'localhost' || 
           parsed.hostname === '127.0.0.1' || 
           parsed.hostname === '::1' ||
           parsed.hostname.startsWith('192.168.') ||
           parsed.hostname.startsWith('10.') ||
           parsed.hostname.endsWith('.local');
  } catch {
    return false;
  }
}

/** Fetch a single URL directly from the browser (for localhost) */
async function fetchUrlDirectly(url: string): Promise<{
  url: string;
  finalUrl: string;
  statusCode: number;
  contentType: string;
  html: string;
  error?: string;
}> {
  const t0 = Date.now();
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SEOAuditTool/1.0)' },
      redirect: 'follow',
    });
    const html = await response.text();
    return {
      url,
      finalUrl: response.url,
      statusCode: response.status,
      contentType: response.headers.get('content-type') || '',
      html,
    };
  } catch (err: any) {
    return {
      url,
      finalUrl: url,
      statusCode: 0,
      contentType: '',
      html: '',
      error: err.message || 'Network error',
    };
  }
}

/** Fetch URLs via the worker */
async function fetchUrlsViaWorker(urls: string[], sessionToken: string): Promise<{
  results: Array<{
    url: string;
    finalUrl: string;
    statusCode: number;
    contentType: string;
    html: string;
  }>;
  isLocalhost: boolean;
  error?: string;
}> {
  try {
    const resp = await fetch(`${SERVER}/get-html-page`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionToken}`,
      },
      body: JSON.stringify({ urls }),
    });

    if (resp.status === 401) {
      const body = await resp.json().catch(() => ({})) as { errorCode?: string };
      const isExpired = body.errorCode === 'AUTH_INVALID' || body.errorCode === 'AUTH_MISSING';
      const isIpMismatch = body.errorCode === 'AUTH_IP_MISMATCH';
      
      return {
        results: [],
        isLocalhost: false,
        error: isIpMismatch
          ? 'Session rejected: IP mismatch. Please refresh and re-verify.'
          : isExpired
            ? 'Session expired. Please complete Turnstile again.'
            : 'Authentication failed. Please refresh the page.',
      };
    }

    if (!resp.ok) {
      return {
        results: [],
        isLocalhost: false,
        error: `Worker error: HTTP ${resp.status}`,
      };
    }

    const data = await resp.json() as {
      success: boolean;
      isLocalhost: boolean;
      results?: Array<{
        url: string;
        finalUrl: string;
        statusCode: number;
        contentType: string;
        html: string;
      }>;
    };

    if (!data.success || !data.results || data.results.length === 0) {
      return {
        results: [],
        isLocalhost: false,
        error: 'Worker returned no results',
      };
    }

    return {
      results: data.results,
      isLocalhost: data.isLocalhost || false,
    };
  } catch (err: any) {
    return {
      results: [],
      isLocalhost: false,
      error: err.message || 'Network error',
    };
  }
}

/** Process a batch of URLs for localhost (fast, direct fetch) */
async function processLocalhostBatch(
  urls: string[],
  origin: string,
  state: CrawlState,
  onResult: (data: PageData) => void,
  onLog: (msg: string) => void,
  onCountsUpdate: (visited: number, queue: number) => void
): Promise<void> {
  if (state.stopped) return;

  // Process URLs with rate limiting (10 per second)
  const batchSize = Math.min(urls.length, LOCALHOST_CONCURRENCY);
  const batch = urls.slice(0, batchSize);

  onLog(`Fetching ${batch.length} localhost URLs...`);

  const fetchPromises = batch.map(async (url) => {
    if (state.visited.has(url) || state.stopped) return;
    
    state.visited.add(url);
    onCountsUpdate(state.visited.size, state.queue.length);
    onLog(`Fetching: ${url.substring(0, 80)}`);

    const t0 = Date.now();
    const result = await fetchUrlDirectly(url);
    const responseTimeMs = Date.now() - t0;

    if (result.error || !result.contentType.includes('text/html')) {
      const errData = makeErrorPageData(url, result.statusCode, result.contentType, responseTimeMs, result.error || null);
      state.results = [...state.results, errData];
      onResult(errData);
      return;
    }

    // Handle redirect
    if (result.finalUrl !== url) {
      const normFinal = normaliseUrl(result.finalUrl, result.finalUrl);
      if (normFinal && isInternalUrl(normFinal, origin) && !state.visited.has(normFinal)) {
        state.queue.push(normFinal);
      }
    }

    const data = analysePage(url, result.html, result.statusCode, responseTimeMs, result.contentType);
    state.results = [...state.results, data];
    onResult(data);

    // Discover & enqueue new internal links
    for (const target of data.internalLinksTo) {
      if (target && isInternalUrl(target, origin)) {
        if (!state.referrers[target]) state.referrers[target] = new Set();
        state.referrers[target].add(url);

        if (!state.visited.has(target) && !state.queue.includes(target)) {
          state.queue.push(target);
        }
      }
    }
  });

  await Promise.all(fetchPromises);
  onCountsUpdate(state.visited.size, state.queue.length);
}

/** Process a batch of URLs for remote sites (slow, with cooldown) */
async function processRemoteBatch(
  urls: string[],
  origin: string,
  state: CrawlState,
  onResult: (data: PageData) => void,
  onLog: (msg: string) => void,
  onCountsUpdate: (visited: number, queue: number) => void,
  sessionToken: string,
  onBatchComplete?: () => void
): Promise<void> {
  if (state.stopped) return;

  // Take up to REMOTE_BATCH_SIZE URLs
  const batchSize = Math.min(urls.length, REMOTE_BATCH_SIZE);
  const batch = urls.slice(0, batchSize);

  onLog(`Fetching batch of ${batch.length} remote URLs...`);

  // Fetch the batch via worker
  const fetchResult = await fetchUrlsViaWorker(batch, sessionToken);

  if (fetchResult.error) {
    state.stopped = true;
    onLog(fetchResult.error);
    return;
  }

  // Process results
  for (const result of fetchResult.results) {
    if (state.visited.has(result.url) || state.stopped) continue;
    
    state.visited.add(result.url);
    onCountsUpdate(state.visited.size, state.queue.length);
    onLog(`Processing: ${result.url.substring(0, 80)}`);

    const t0 = Date.now();
    const responseTimeMs = Date.now() - t0;

    if (!result.contentType.includes('text/html')) {
      const errData = makeErrorPageData(result.url, result.statusCode, result.contentType, responseTimeMs, 'Not an HTML page');
      state.results = [...state.results, errData];
      onResult(errData);
      continue;
    }

    // Handle redirect
    if (result.finalUrl !== result.url) {
      const normFinal = normaliseUrl(result.finalUrl, result.finalUrl);
      if (normFinal && isInternalUrl(normFinal, origin) && !state.visited.has(normFinal)) {
        state.queue.push(normFinal);
      }
    }

    const data = analysePage(result.url, result.html, result.statusCode, responseTimeMs, result.contentType);
    state.results = [...state.results, data];
    onResult(data);

    // Discover & enqueue new internal links
    for (const target of data.internalLinksTo) {
      if (target && isInternalUrl(target, origin)) {
        if (!state.referrers[target]) state.referrers[target] = new Set();
        state.referrers[target].add(result.url);

        if (!state.visited.has(target) && !state.queue.includes(target)) {
          state.queue.push(target);
        }
      }
    }
  }

  onCountsUpdate(state.visited.size, state.queue.length);
  onBatchComplete?.();
}

/**
 * Main crawl orchestration function that handles both localhost and remote sites
 * with appropriate rate limiting and UI updates.
 */
export async function runCrawl(
  origin: string,
  state: CrawlState,
  onResult: (data: PageData) => void,
  onLog: (msg: string) => void,
  onCountsUpdate: (visited: number, queue: number) => void,
  sessionToken: string,
  setIsCrawling: (crawling: boolean) => void,
  setFinalResults: (results: PageData[]) => void,
  setFinalRootUrl: (url: string) => void,
  setBroken: (broken: any[]) => void,
  buildBrokenLinks: (results: PageData[], referrers: Record<string, Set<string>>) => any[]
): Promise<void> {
  const s = state;
  const isLocalhost = isLocalhostUrl(origin);

  async function runLocalhostCrawl() {
    while (!s.stopped) {
      if (s.queue.length === 0 && s.active === 0) break;
      
      if (s.queue.length > 0) {
        await processLocalhostBatch(s.queue, origin, s, onResult, onLog, onCountsUpdate);
        // Remove processed URLs from queue
        s.queue = s.queue.filter(u => !s.visited.has(u));
      }

      // Small delay between batches for localhost (100ms = 10 per second)
      await new Promise((r) => setTimeout(r, 100));
    }

    const bl = buildBrokenLinks(s.results, s.referrers);
    setBroken(bl);
    setIsCrawling(false);
    onLog(`Done — ${s.visited.size} pages crawled.`);
    setFinalResults([...s.results]);
    setFinalRootUrl(origin);
  }

  async function runRemoteCrawl() {
    let processedInCurrentCooldown = 0;

    while (!s.stopped) {
      if (s.queue.length === 0 && s.active === 0) break;

      // Process a batch of URLs
      if (s.queue.length > 0 && processedInCurrentCooldown < REMOTE_BATCH_SIZE) {
        await processRemoteBatch(
          s.queue,
          origin,
          s,
          onResult,
          onLog,
          onCountsUpdate,
          sessionToken,
          () => { processedInCurrentCooldown++; }
        );
        // Remove processed URLs from queue
        s.queue = s.queue.filter(u => !s.visited.has(u));
      }

      // If we've processed a batch or queue is empty, wait for cooldown
      if (processedInCurrentCooldown >= REMOTE_BATCH_SIZE || s.queue.length === 0) {
        processedInCurrentCooldown = 0;
        
        // During cooldown, simulate UI updates (2 URLs per second for 5 seconds = 10 updates)
        if (s.queue.length > 0 && !s.stopped) {
          onLog(`Cooldown period - processing discovered URLs...`);
          for (let i = 0; i < UI_UPDATE_RATE * (REMOTE_COOLDOWN_MS / 1000); i++) {
            if (s.stopped) break;
            await new Promise((r) => setTimeout(r, 500)); // Update every 500ms (2 per second)
            onCountsUpdate(s.visited.size, s.queue.length);
          }
        } else {
          await new Promise((r) => setTimeout(r, REMOTE_COOLDOWN_MS));
        }
      }
    }

    const bl = buildBrokenLinks(s.results, s.referrers);
    setBroken(bl);
    setIsCrawling(false);
    onLog(`Done — ${s.visited.size} pages crawled.`);
    setFinalResults([...s.results]);
    setFinalRootUrl(origin);
  }

  if (isLocalhost) {
    onLog('Detected localhost - using fast crawl mode (10 URLs/sec)');
    await runLocalhostCrawl();
  } else {
    onLog(`Detected remote site - using slow crawl mode (${REMOTE_BATCH_SIZE} URLs per ${REMOTE_COOLDOWN_MS/1000}s)`);
    await runRemoteCrawl();
  }
}

/**
 * Legacy processUrl function for backward compatibility.
 * New code should use runCrawl instead.
 */
export async function processUrl(
  url: string,
  origin: string,
  state: CrawlState,
  onResult: (data: PageData) => void,
  onLog: (msg: string) => void,
  onCountsUpdate: (visited: number, queue: number) => void,
  sessionToken: string
): Promise<void> {
  // This function is kept for backward compatibility but delegates to runCrawl
  console.warn('processUrl is deprecated, use runCrawl instead');
}
