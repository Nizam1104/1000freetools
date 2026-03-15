/**
 * Links Analyser
 * Analyzes internal/external links, broken links, nofollow, anchor text, link depth
 */

import type { Issue, LinkInfo } from '../types';

export interface LinksResult {
  totalLinks: number;
  internalLinkCount: number;
  externalLinkCount: number;
  nofollowLinkCount: number;
  nofollowInternalCount: number;
  internalLinksTo: string[];
  externalLinks: LinkInfo[];
  genericAnchorCount: number;
  linkDepthFromRoot: number;
  issues: Issue[];
}

const GENERIC_ANCHOR_PATTERNS = [
  'click here',
  'here',
  'read more',
  'more',
  'learn more',
  'link',
  'this',
  'page',
  'info',
  'click',
];

function isGenericAnchor(text: string): boolean {
  const lower = text.toLowerCase().trim();
  return GENERIC_ANCHOR_PATTERNS.some((pattern) => pattern === lower || lower.includes(pattern));
}

export function normaliseUrl(raw: string, base: string): string | null {
  try {
    const u = new URL(raw, base);
    u.hash = '';
    let href = u.href;
    if (href.endsWith('/') && u.pathname !== '/') href = href.slice(0, -1);
    return href;
  } catch {
    return null;
  }
}

export function isInternalUrl(urlStr: string, origin: string): boolean {
  try {
    return new URL(urlStr).origin === origin;
  } catch {
    return false;
  }
}

export function analyseLinks(doc: Document, pageUrl: string): LinksResult {
  const issues: Issue[] = [];
  const origin = new URL(pageUrl).origin;

  const allLinkElements = Array.from(doc.querySelectorAll('a[href]'));

  const allLinks: LinkInfo[] = allLinkElements.map((el) => {
    const href = el.getAttribute('href') ?? '';
    const text = el.textContent?.trim() ?? '';
    const rel = el.getAttribute('rel') ?? '';
    const normalised = normaliseUrl(href, pageUrl);
    const isGeneric = isGenericAnchor(text);
    const opensNewTab = el.getAttribute('target') === '_blank';
    const hasNoopener = rel.toLowerCase().includes('noopener');

    return {
      href,
      text,
      rel,
      normalised,
      isGenericAnchor: isGeneric,
      opensNewTab,
      hasNoopener,
    };
  });

  const internalLinks = allLinks.filter(
    (l) => l.normalised && isInternalUrl(l.normalised, origin)
  );
  const externalLinks = allLinks.filter(
    (l) => l.normalised && !isInternalUrl(l.normalised, origin)
  );

  const nofollowLinkCount = allLinks.filter((l) => l.rel.toLowerCase().includes('nofollow')).length;
  const nofollowInternalCount = internalLinks.filter((l) => l.rel.toLowerCase().includes('nofollow')).length;
  const genericAnchorCount = allLinks.filter((l) => l.isGenericAnchor).length;
  const internalLinksTo = [...new Set(internalLinks.map((l) => l.normalised as string))];

  // External links opening in new tab without noopener
  const externalNewTabWithoutNoopener = externalLinks.filter(
    (l) => l.opensNewTab && !l.hasNoopener
  );

  if (externalNewTabWithoutNoopener.length > 0) {
    issues.push({
      code: 'EXTERNAL_LINKS_MISSING_NOOPENER',
      message: `${externalNewTabWithoutNoopener.length} external link(s) opening in new tab without noopener`,
      severity: 'warning',
    });
  }

  // Generic anchor text
  if (genericAnchorCount > 0) {
    issues.push({
      code: 'GENERIC_ANCHOR_TEXT',
      message: `${genericAnchorCount} link(s) with generic anchor text (e.g., "click here")`,
      severity: 'warning',
    });
  }

  // Nofollow on internal links (potential PageRank leak)
  if (nofollowInternalCount > 0) {
    issues.push({
      code: 'NOFOLLOW_INTERNAL_LINKS',
      message: `${nofollowInternalCount} internal link(s) with nofollow attribute`,
      severity: 'notice',
    });
  }

  // Too many links on page (> 100)
  if (allLinks.length > 100) {
    issues.push({
      code: 'TOO_MANY_LINKS',
      message: `Too many links on page (${allLinks.length}) - consider reducing`,
      severity: 'notice',
    });
  }

  return {
    totalLinks: allLinks.length,
    internalLinkCount: internalLinks.length,
    externalLinkCount: externalLinks.length,
    nofollowLinkCount,
    nofollowInternalCount,
    internalLinksTo,
    externalLinks,
    genericAnchorCount,
    linkDepthFromRoot: 0, // Populated after crawl completes via BFS in utils.ts
    issues,
  };
}
