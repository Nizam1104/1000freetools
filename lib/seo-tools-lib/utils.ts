/**
 * Crawl utilities shared across the SEO Analytics app.
 * Extracted from page.tsx so the component stays thin.
 */

import {
  analysePage,
  normaliseUrl,
  isInternalUrl,
  type PageData,
} from "./seoAnalyser";
import type { CrawlState } from "./types";
import { findOrphanPages } from "./siteAnalysis/orphanPages";

const CF_WORKER_BASE_URL = process.env.NEXT_PUBLIC_CF_WORKER_BASE_URL;

export { type CrawlState } from "./types";

// Rate limiting constants
const LOCALHOST_CONCURRENCY = 10; // 10 URLs per second for localhost
const REMOTE_BATCH_SIZE = 10; // Send 10 URLs at a time to worker for remote sites
const REMOTE_COOLDOWN_MS = 5000; // 5 second cooldown between batches
const UI_UPDATE_RATE = 2; // 2 UI updates per second during cooldown

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
  fetchError: string | null,
): PageData {
  return {
    url,
    statusCode,
    contentType,
    responseTimeMs,
    crawledAt: new Date().toISOString(),
    error: fetchError,

    title: "",
    titleLength: 0,
    metaDescription: "",
    metaDescriptionLength: 0,
    metaKeywords: "",
    canonicalUrl: "",
    canonicalIsSelf: false,
    robotsMeta: "",
    noindex: false,
    nofollow: false,
    langAttr: "",
    charset: "",
    hreflangTags: [],
    viewportMeta: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    ogType: "",
    twitterCard: "",
    twitterTitle: "",
    twitterImage: "",

    h1Count: 0,
    h1s: [],
    h2Count: 0,
    h2s: [],
    h3Count: 0,
    h3s: [],
    h4Count: 0,
    h4s: [],
    h5Count: 0,
    h5s: [],
    h6Count: 0,
    h6s: [],
    headingHierarchyViolations: [],
    emptyHeadings: [],

    wordCount: 0,
    charCount: 0,
    paragraphCount: 0,
    avgSentenceLength: 0,
    textToHtmlRatio: 0,
    readabilityScore: null,
    keywordDensity: [],

    imageCount: 0,
    imagesWithoutAlt: 0,
    images: [],

    totalLinks: 0,
    internalLinkCount: 0,
    externalLinkCount: 0,
    nofollowLinkCount: 0,
    nofollowInternalCount: 0,
    internalLinksTo: [],
    externalLinks: [],
    genericAnchorCount: 0,
    linkDepthFromRoot: 0,

    urlLength: 0,
    urlDepth: 0,
    urlHasParams: false,
    urlHasUppercase: false,
    urlHasUnderscores: false,
    urlHasTrailingSlash: false,

    hasStructuredData: false,
    schemaTypes: [],
    schemaRaw: [],
    hasBreadcrumbSchema: false,
    hasAmpVersion: false,
    renderBlockingScripts: 0,
    inlineStyleCount: 0,
    externalScriptCount: 0,
    hasPreload: false,
    hasPreconnect: false,
    mixedContent: false,
    isHttps: url.startsWith("https://"),

    hasMobileViewport: false,
    hasInterstitials: false,
    pageSizeBytes: 0,

    issues: fetchError
      ? [
          {
            code: "FETCH_ERROR",
            message: `Fetch error: ${fetchError}`,
            severity: "critical" as const,
          },
        ]
      : [],
    seoScore: 0,
  };
}

/** Check if a URL is localhost */
function isLocalhostUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.hostname === "localhost" ||
      parsed.hostname === "127.0.0.1" ||
      parsed.hostname === "::1" ||
      parsed.hostname.startsWith("192.168.") ||
      parsed.hostname.startsWith("10.") ||
      parsed.hostname.endsWith(".local")
    );
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
  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; SEOAuditTool/1.0)" },
      redirect: "follow",
    });
    const html = await response.text();
    return {
      url,
      finalUrl: response.url,
      statusCode: response.status,
      contentType: response.headers.get("content-type") || "",
      html,
    };
  } catch (err: any) {
    return {
      url,
      finalUrl: url,
      statusCode: 0,
      contentType: "",
      html: "",
      error: err.message || "Network error",
    };
  }
}

/** Fetch URLs via the worker */
async function fetchUrlsViaWorker(
  urls: string[],
  sessionToken: string,
): Promise<{
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
  console.log(urls);
  try {
    const resp = await fetch(`${CF_WORKER_BASE_URL}/get-html-page`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken}`,
      },
      body: JSON.stringify({ urls }),
    });

    if (resp.status === 401) {
      const body = (await resp.json().catch(() => ({}))) as {
        errorCode?: string;
      };
      const isExpired =
        body.errorCode === "AUTH_INVALID" || body.errorCode === "AUTH_MISSING";
      const isIpMismatch = body.errorCode === "AUTH_IP_MISMATCH";

      return {
        results: [],
        isLocalhost: false,
        error: isIpMismatch
          ? "Session rejected: IP mismatch. Please refresh and re-verify."
          : isExpired
            ? "Session expired. Please complete Turnstile again."
            : "Authentication failed. Please refresh the page.",
      };
    }

    if (!resp.ok) {
      return {
        results: [],
        isLocalhost: false,
        error: `Worker error: HTTP ${resp.status}`,
      };
    }

    const data = (await resp.json()) as {
      success: boolean;
      isLocalhost: boolean;
      results?: Array<{
        url: string;
        finalUrl: string;
        statusCode: number;
        contentType: string;
        html: string;
      }>;
      error?: string;
    };

    if (!data.success || !data.results || data.results.length === 0) {
      return {
        results: [],
        isLocalhost: false,
        error: `Worker returned no results: ${data.error ?? "success=false"}`,
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
      error: err.message || "Network error",
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
  onCountsUpdate: (visited: number, queue: number) => void,
): Promise<void> {
  if (state.stopped) return;

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

    if (result.error || !result.contentType.includes("text/html")) {
      const errData = makeErrorPageData(
        url,
        result.statusCode,
        result.contentType,
        responseTimeMs,
        result.error || null,
      );
      state.results = [...state.results, errData];
      onResult(errData);
      return;
    }

    if (result.finalUrl !== url) {
      const normFinal = normaliseUrl(result.finalUrl, result.finalUrl);
      if (
        normFinal &&
        isInternalUrl(normFinal, origin) &&
        !state.visited.has(normFinal)
      ) {
        state.queue.push(normFinal);
      }
    }

    const data = analysePage(
      url,
      result.html,
      result.statusCode,
      responseTimeMs,
      result.contentType,
    );
    state.results = [...state.results, data];
    onResult(data);

    for (const target of data.internalLinksTo) {
      // console.log(target, 'target utils 264 line')
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

/**
 * Process a batch of URLs for remote sites via the CF worker.
 * Sends up to REMOTE_BATCH_SIZE URLs at once, then analyzes results
 * and updates the UI during the cooldown period.
 * Returns the number of new internal links discovered.
 */
async function processRemoteBatch(
  urls: string[],
  origin: string,
  state: CrawlState,
  onResult: (data: PageData) => void,
  onLog: (msg: string) => void,
  sessionToken: string,
): Promise<number> {
  if (state.stopped || urls.length === 0) return 0;

  onLog(`Fetching batch of ${urls.length} URLs...`);

  const t0 = Date.now();
  const fetchResult = await fetchUrlsViaWorker(urls, sessionToken);
  const responseTimeMs = Date.now() - t0;

  if (fetchResult.error) {
    onLog(`Worker error for batch: ${fetchResult.error}`);
    // Create error entries for all URLs in the batch
    for (const url of urls) {
      const errData = makeErrorPageData(
        url,
        0,
        "",
        responseTimeMs,
        fetchResult.error,
      );
      state.visited.add(url);
      state.results = [...state.results, errData];
      onResult(errData);
    }
    return 0;
  }

  let totalNewLinksFound = 0;

  // Process each result in the batch
  for (const result of fetchResult.results) {
    if (state.stopped) break;

    const url = result.url;
    state.visited.add(url);
    onLog(`Analyzing: ${url.substring(0, 80)}`);

    if (!result.contentType.includes("text/html")) {
      const errData = makeErrorPageData(
        result.url,
        result.statusCode,
        result.contentType,
        responseTimeMs,
        "Not an HTML page",
      );
      state.results = [...state.results, errData];
      onResult(errData);
      continue;
    }

    // Handle redirect — enqueue the final URL if it's internal and unvisited
    if (result.finalUrl !== url) {
      const normFinal = normaliseUrl(result.finalUrl, result.finalUrl);
      if (
        normFinal &&
        isInternalUrl(normFinal, origin) &&
        !state.visited.has(normFinal)
      ) {
        state.queue.push(normFinal);
        onLog(`Discovered via redirect: ${normFinal.substring(0, 80)}`);
      }
    }

    const data = analysePage(
      result.url,
      result.html,
      result.statusCode,
      responseTimeMs,
      result.contentType,
    );
    console.log("page data", data);
    state.results = [...state.results, data];
    onResult(data);

    // Discover and enqueue new internal links
    let newLinksFound = 0;
    for (const target of data.internalLinksTo) {
      if (target && isInternalUrl(target, origin)) {
        if (!state.referrers[target]) state.referrers[target] = new Set();
        state.referrers[target].add(url);
        if (!state.visited.has(target) && !state.queue.includes(target)) {
          state.queue.push(target);
          newLinksFound++;
        }
      }
    }

    if (newLinksFound > 0) {
      onLog(
        `Found ${newLinksFound} new internal links on ${url.substring(0, 60)}`,
      );
      totalNewLinksFound += newLinksFound;
    }
  }

  // Handle any URLs that didn't get results (mark as visited with error)
  const processedUrls = new Set(fetchResult.results.map((r) => r.url));
  for (const url of urls) {
    if (!processedUrls.has(url) && !state.visited.has(url)) {
      state.visited.add(url);
      const errData = makeErrorPageData(
        url,
        0,
        "",
        responseTimeMs,
        "No result from worker",
      );
      state.results = [...state.results, errData];
      onResult(errData);
    }
  }

  return totalNewLinksFound;
}

/**
 * Main crawl orchestration function.
 * - Localhost: fast parallel fetching directly from the browser (10/sec)
 * - Remote: sequential URL-by-URL via CF worker with a cooldown every 10 URLs
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
  buildBrokenLinks: (
    results: PageData[],
    referrers: Record<string, Set<string>>,
  ) => any[],
): Promise<void> {
  const s = state;
  const isLocalhost = isLocalhostUrl(origin);

  /** Shared finish-up logic — called at the end of both crawl paths */
  function finishCrawl() {
    // Calculate link depths from root using BFS
    const { pagesWithDepth } = findOrphanPages(s.results, origin);
    
    // Create a map for quick lookup: normalized URL -> depth
    const depthMap = new Map<string, number>();
    for (const page of pagesWithDepth) {
      try {
        const u = new URL(page.url);
        u.hash = '';
        let href = u.href;
        if (href.endsWith('/') && u.pathname !== '/') {
          href = href.slice(0, -1);
        }
        depthMap.set(href.toLowerCase(), page.depth === Infinity ? -1 : page.depth);
      } catch {
        depthMap.set(page.url.toLowerCase(), page.depth === Infinity ? -1 : page.depth);
      }
    }
    
    // Update each PageData with its calculated depth
    for (const page of s.results) {
      try {
        const u = new URL(page.url);
        u.hash = '';
        let href = u.href;
        if (href.endsWith('/') && u.pathname !== '/') {
          href = href.slice(0, -1);
        }
        const normalized = href.toLowerCase();
        const depth = depthMap.get(normalized);
        if (depth !== undefined && depth >= 0) {
          page.linkDepthFromRoot = depth;
        }
      } catch {
        const normalized = page.url.toLowerCase();
        const depth = depthMap.get(normalized);
        if (depth !== undefined && depth >= 0) {
          page.linkDepthFromRoot = depth;
        }
      }
    }
    
    const bl = buildBrokenLinks(s.results, s.referrers);
    setBroken(bl);
    setIsCrawling(false);
    onLog(
      `Done — ${s.visited.size} pages crawled, ${s.results.length} results.`,
    );
    setFinalResults([...s.results]);
    setFinalRootUrl(origin);
  }

  // ─── Localhost path ────────────────────────────────────────────────────────
  async function runLocalhostCrawl() {
    try {
      while (!s.stopped) {
        if (s.queue.length === 0 && s.active === 0) break;

        if (s.queue.length > 0) {
          await processLocalhostBatch(
            s.queue,
            origin,
            s,
            onResult,
            onLog,
            onCountsUpdate,
          );
          s.queue = s.queue.filter((u) => !s.visited.has(u));
        }

        await new Promise((r) => setTimeout(r, 100));
      }
    } catch (err: any) {
      onLog(`Localhost crawl error: ${err?.message ?? err}`);
    } finally {
      finishCrawl();
    }
  }

  // ─── Remote path ───────────────────────────────────────────────────────────
  async function runRemoteCrawl() {
    try {
      while (!s.stopped) {
        // Always drain already-visited entries from the queue first
        s.queue = s.queue.filter((u) => !s.visited.has(u));

        if (s.queue.length === 0) {
          onLog("Queue empty — crawl complete.");
          break;
        }

        // ── Take a batch of up to REMOTE_BATCH_SIZE URLs ────────────────────
        const batchSize = Math.min(s.queue.length, REMOTE_BATCH_SIZE);
        const batch = s.queue.slice(0, batchSize);

        // Mark all URLs in batch as visited before fetching
        for (const url of batch) {
          s.visited.add(url);
        }
        onCountsUpdate(s.visited.size, s.queue.length);

        // ── Fetch and process the batch ─────────────────────────────────────
        await processRemoteBatch(
          batch,
          origin,
          s,
          onResult,
          onLog,
          sessionToken,
        );
        onCountsUpdate(s.visited.size, s.queue.length);

        // Remove processed URLs from queue
        s.queue = s.queue.slice(batchSize);

        // ── Cooldown if there are more URLs to process ──────────────────────
        if (!s.stopped && s.queue.length > 0) {
          onLog(
            `Batch complete — cooling down for ${REMOTE_COOLDOWN_MS / 1000}s...`,
          );

          const ticks = UI_UPDATE_RATE * (REMOTE_COOLDOWN_MS / 1000); // e.g. 10 ticks
          for (let i = 0; i < ticks; i++) {
            if (s.stopped) break;
            await new Promise((r) => setTimeout(r, REMOTE_COOLDOWN_MS / ticks));
            onCountsUpdate(s.visited.size, s.queue.length);
          }

          // Re-filter after cooldown in case stop was triggered
          s.queue = s.queue.filter((u) => !s.visited.has(u));
          if (s.queue.length === 0 || s.stopped) break;
        }
      }
    } catch (err: any) {
      onLog(`Remote crawl error: ${err?.message ?? err}`);
    } finally {
      finishCrawl();
    }
  }

  if (isLocalhost) {
    onLog("Detected localhost — using fast crawl mode (10 URLs/sec)");
    await runLocalhostCrawl();
  } else {
    onLog(
      `Detected remote site — using batched crawl mode (${REMOTE_BATCH_SIZE} URLs per batch, ${REMOTE_COOLDOWN_MS / 1000}s cooldown)`,
    );
    await runRemoteCrawl();
  }
}
