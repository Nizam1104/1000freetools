/**
 * Shared TypeScript interfaces for SEO Analytics
 */

// ─── Core Page Data ───────────────────────────────────────────────────────────

export interface PageData {
  // ── Identity
  url: string;
  statusCode: number;
  contentType: string;
  responseTimeMs: number;
  crawledAt: string;
  error?: string | null;

  // ── Meta & Head Tags
  title: string;
  titleLength: number;
  metaDescription: string;
  metaDescriptionLength: number;
  metaKeywords: string;
  canonicalUrl: string;
  canonicalIsSelf: boolean;
  robotsMeta: string;
  noindex: boolean;
  nofollow: boolean;
  langAttr: string;
  charset: string;
  hreflangTags: HreflangTag[];
  viewportMeta: string;

  // ── Open Graph / Social
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogType: string;
  twitterCard: string;
  twitterTitle: string;
  twitterImage: string;

  // ── Headings
  h1Count: number;
  h1s: string[];
  h2Count: number;
  h2s: string[];
  h3Count: number;
  h3s: string[];
  h4Count: number;
  h4s: string[];
  h5Count: number;
  h5s: string[];
  h6Count: number;
  h6s: string[];
  headingHierarchyViolations: string[];
  emptyHeadings: string[];

  // ── Content
  wordCount: number;
  charCount: number;
  paragraphCount: number;
  avgSentenceLength: number;
  textToHtmlRatio: number;
  readabilityScore: number | null;
  keywordDensity: KeywordDensityEntry[];

  // ── Images
  imageCount: number;
  imagesWithoutAlt: number;
  images: ImageInfo[];

  // ── Links
  totalLinks: number;
  internalLinkCount: number;
  externalLinkCount: number;
  nofollowLinkCount: number;
  nofollowInternalCount: number;
  internalLinksTo: string[];
  externalLinks: LinkInfo[];
  genericAnchorCount: number;
  linkDepthFromRoot: number;

  // ── URL
  urlLength: number;
  urlDepth: number;
  urlHasParams: boolean;
  urlHasUppercase: boolean;
  urlHasUnderscores: boolean;
  urlHasTrailingSlash: boolean;

  // ── Technical / Structured Data
  hasStructuredData: boolean;
  schemaTypes: string[];
  schemaRaw: Record<string, unknown>[];
  hasBreadcrumbSchema: boolean;
  hasAmpVersion: boolean;
  renderBlockingScripts: number;
  inlineStyleCount: number;
  externalScriptCount: number;
  hasPreload: boolean;
  hasPreconnect: boolean;
  mixedContent: boolean;
  isHttps: boolean;

  // ── Mobile
  hasMobileViewport: boolean;
  hasInterstitials: boolean;

  // ── Performance proxy
  pageSizeBytes: number;

  // ── Issues & Score
  issues: Issue[];
  seoScore: number;
}

// ─── Issue Types ──────────────────────────────────────────────────────────────

export interface Issue {
  code: string;
  message: string;
  severity: 'critical' | 'warning' | 'notice';
  field?: string;
}

// ─── Image Types ──────────────────────────────────────────────────────────────

export interface ImageInfo {
  src: string;
  alt: string;
  hasAlt: boolean;
  altLength: number;
  isDecorative: boolean;
  filename: string;
  hasDescriptiveFilename: boolean;
  hasLazyLoad: boolean;
  format: string;
  width?: number;
  height?: number;
}

// ─── Link Types ───────────────────────────────────────────────────────────────

export interface LinkInfo {
  href: string;
  text: string;
  rel: string;
  normalised: string | null;
  isGenericAnchor: boolean;
  opensNewTab: boolean;
  hasNoopener: boolean;
}

// ─── Hreflang Types ───────────────────────────────────────────────────────────

export interface HreflangTag {
  lang: string;
  href: string;
}

// ─── Content Types ────────────────────────────────────────────────────────────

export interface KeywordDensityEntry {
  word: string;
  count: number;
  density: number;
}

// ─── Broken Link Types ────────────────────────────────────────────────────────

export interface BrokenLink {
  brokenUrl: string;
  statusCode: number;
  error: string | null;
  referrerCount: number;
  referrers: string[];
}

// ─── URL Tree Types ───────────────────────────────────────────────────────────

export interface UrlTreeNode {
  name: string;
  path: string;
  fullUrl?: string;
  children: UrlTreeNode[];
  urls: string[];
}

// ─── Crawl State Types ────────────────────────────────────────────────────────

export interface CrawlState {
  visited: Set<string>;
  queue: string[];
  referrers: Record<string, Set<string>>;
  results: PageData[];
  stopped: boolean;
  active: number;
}

// ─── Site-Wide Analysis Types ─────────────────────────────────────────────────

export interface DuplicateCluster {
  pages: string[];
  similarity: number;
}

export interface CrawlSnapshot {
  crawledAt: string;
  rootUrl: string;
  pages: PageData[];
}

export interface CrawlDiff {
  added: string[];
  removed: string[];
  changed: { url: string; fieldChanges: string[] }[];
}

export interface OrphanPage {
  url: string;
  inboundCount: number;
}

export interface SitemapAudit {
  sitemapUrl: string;
  inSitemapNotCrawled: string[];
  crawledNotInSitemap: string[];
  total: number;
}

export interface RobotsTxtAudit {
  raw: string;
  disallowedPaths: string[];
  blockedImportantPages: string[];
}
