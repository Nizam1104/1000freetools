/**
 * Client-side SEO Analyser
 * All processing happens in the browser using DOMParser.
 * Uses modular analysers for comprehensive SEO analysis.
 */

import type {
  PageData,
  BrokenLink,
  UrlTreeNode,
  ImageInfo as ImageInfoType,
  LinkInfo as LinkInfoType,
  Issue,
} from "./types";

import {
  analyseMetaTags,
  analyseHeadings,
  analyseContent,
  analyseImages,
  analyseLinks,
  analyseUrl,
  analyseTechnical,
  analyseMobile,
  analyseSecurity,
} from "./analysers";

import { scorePageData } from "./scoring";

// Re-export types for backward compatibility
export type { ImageInfo, LinkInfo } from "./types";
export type { PageData, BrokenLink, UrlTreeNode } from "./types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function normaliseUrl(raw: string, base: string): string | null {
  try {
    const u = new URL(raw, base);
    u.hash = "";
    let href = u.href;
    if (href.endsWith("/") && u.pathname !== "/") href = href.slice(0, -1);
    return href;
  } catch {
    return null;
  }
}

export function isInternalUrl(urlStr: string, origin: string): boolean {
  try {
    const parsedOrigin = new URL(urlStr).origin;
    // Normalize both origins by removing trailing slashes for comparison
    const normalizedOrigin = origin.replace(/\/$/, "");
    const normalizedParsedOrigin = parsedOrigin.replace(/\/$/, "");
    return normalizedParsedOrigin === normalizedOrigin;
  } catch {
    return false;
  }
}

// ─── Core Analyser ────────────────────────────────────────────────────────────

export function analysePage(
  url: string,
  html: string,
  statusCode: number,
  responseTimeMs: number,
  contentType: string,
): PageData {
  console.log("analyze page called");
  const doc = new DOMParser().parseFromString(html, "text/html");

  // Run all analysers
  const metaResult = analyseMetaTags(doc, url);
  const headingsResult = analyseHeadings(doc);
  const contentResult = analyseContent(doc, html);
  const imagesResult = analyseImages(doc);
  const linksResult = analyseLinks(doc, url);
  const urlResult = analyseUrl(url);
  const technicalResult = analyseTechnical(doc, url);
  const mobileResult = analyseMobile(doc);
  const securityResult = analyseSecurity(doc, url);

  // Combine all issues from analysers
  const allIssues: Issue[] = [
    ...metaResult.issues,
    ...headingsResult.issues,
    ...contentResult.issues,
    ...imagesResult.issues,
    ...linksResult.issues,
    ...urlResult.issues,
    ...technicalResult.issues,
    ...mobileResult.issues,
    ...securityResult.issues,
  ];

  // Calculate score and get final issues
  const { score, issues } = scorePageData({
    url,
    statusCode,
    contentType,
    responseTimeMs,
    crawledAt: new Date().toISOString(),
    error: null,
    ...metaResult,
    ...headingsResult,
    ...contentResult,
    ...imagesResult,
    ...linksResult,
    ...urlResult,
    ...technicalResult,
    hasMobileViewport: mobileResult.hasMobileViewport,
    hasInterstitials: mobileResult.hasInterstitials,
    mixedContent: technicalResult.mixedContent,
    isHttps: technicalResult.isHttps,
    pageSizeBytes: new TextEncoder().encode(html).length,
    issues: allIssues,
    seoScore: 0, // Will be set below
  });

  // Page size (rough estimate from html string length)
  const pageSizeBytes = new TextEncoder().encode(html).length;

  return {
    url,
    statusCode,
    contentType,
    responseTimeMs,
    crawledAt: new Date().toISOString(),
    error: null,

    // Meta tags
    ...metaResult,

    // Headings
    ...headingsResult,

    // Content
    ...contentResult,

    // Images
    ...imagesResult,

    // Links
    ...linksResult,

    // URL
    ...urlResult,

    // Technical
    ...technicalResult,

    // Mobile
    hasMobileViewport: mobileResult.hasMobileViewport,
    hasInterstitials: mobileResult.hasInterstitials,

    // Security (merge with technical)
    isHttps: securityResult.isHttps,
    mixedContent: securityResult.mixedContent || technicalResult.mixedContent,

    // Performance proxy
    pageSizeBytes,

    // Issues & Score
    issues,
    seoScore: score,
  };
}

// ─── Broken Links ─────────────────────────────────────────────────────────────

export function buildBrokenLinks(
  results: PageData[],
  referrers: Record<string, Set<string>>,
): BrokenLink[] {
  return results
    .filter((r) => r.statusCode >= 400 || r.statusCode === 0 || r.error)
    .map((r) => {
      const sources = referrers[r.url] ? [...referrers[r.url]] : [];
      return {
        brokenUrl: r.url,
        statusCode: r.statusCode,
        error: r.error ?? null,
        referrerCount: sources.length,
        referrers: sources,
      };
    })
    .sort((a, b) => b.referrerCount - a.referrerCount);
}

// ─── URL Tree ─────────────────────────────────────────────────────────────────

export function buildUrlTree(urls: string[], origin: string): UrlTreeNode {
  const root: UrlTreeNode = { name: origin, path: "/", children: [], urls: [] };
  const childMap: Record<string, UrlTreeNode> = {};

  function getOrCreate(
    parent: UrlTreeNode,
    mapKey: string,
    name: string,
    path: string,
    fullUrl: string,
  ): UrlTreeNode {
    if (!childMap[mapKey]) {
      const node: UrlTreeNode = { name, path, fullUrl, children: [], urls: [] };
      childMap[mapKey] = node;
      parent.children.push(node);
    }
    return childMap[mapKey];
  }

  for (const url of urls) {
    try {
      const u = new URL(url);
      const parts = u.pathname.split("/").filter((p) => p.length > 0);
      let node = root;
      let currentPath = "";
      for (const part of parts) {
        currentPath += "/" + part;
        const key = origin + currentPath;
        node = getOrCreate(node, key, part, currentPath, key);
      }
      node.urls.push(url);
    } catch {
      /* skip invalid */
    }
  }
  return root;
}
