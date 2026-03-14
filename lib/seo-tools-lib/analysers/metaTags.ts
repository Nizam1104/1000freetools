/**
 * Meta Tags Analyser
 * Extracts and validates meta tags: title, description, robots, canonical, OG, Twitter, hreflang
 */

import type { Issue, HreflangTag } from '../types';

export interface MetaTagsResult {
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
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogType: string;
  twitterCard: string;
  twitterTitle: string;
  twitterImage: string;
  issues: Issue[];
}

function getMeta(doc: Document, selector: string, attr = 'content'): string {
  return (doc.querySelector(selector) as HTMLMetaElement | null)?.getAttribute(attr)?.trim() ?? '';
}

export function analyseMetaTags(doc: Document, url: string): MetaTagsResult {
  const issues: Issue[] = [];
  const origin = new URL(url).origin;

  // Title
  const title = doc.querySelector('title')?.textContent?.trim() ?? '';
  const titleLength = title.length;

  if (!title) {
    issues.push({ code: 'MISSING_TITLE', message: 'Missing <title> tag', severity: 'critical' });
  } else if (titleLength < 30) {
    issues.push({ code: 'TITLE_TOO_SHORT', message: `Title too short (${titleLength} chars, recommended 30-60)`, severity: 'warning' });
  } else if (titleLength > 60) {
    issues.push({ code: 'TITLE_TOO_LONG', message: `Title too long (${titleLength} chars, recommended 30-60)`, severity: 'warning' });
  }

  // Meta Description
  const metaDescription = getMeta(doc, 'meta[name="description"]');
  const metaDescriptionLength = metaDescription.length;

  if (!metaDescription) {
    issues.push({ code: 'MISSING_META_DESCRIPTION', message: 'Missing meta description', severity: 'critical' });
  } else if (metaDescriptionLength < 120) {
    issues.push({ code: 'META_DESCRIPTION_TOO_SHORT', message: `Meta description too short (${metaDescriptionLength} chars, recommended 120-160)`, severity: 'warning' });
  } else if (metaDescriptionLength > 160) {
    issues.push({ code: 'META_DESCRIPTION_TOO_LONG', message: `Meta description too long (${metaDescriptionLength} chars, recommended 120-160)`, severity: 'warning' });
  }

  // Meta Keywords (legacy)
  const metaKeywords = getMeta(doc, 'meta[name="keywords"]');
  if (!metaKeywords) {
    issues.push({ code: 'MISSING_META_KEYWORDS', message: 'Missing meta keywords (legacy, optional)', severity: 'notice' });
  }

  // Canonical URL
  const canonicalUrl = getMeta(doc, 'link[rel="canonical"]', 'href');
  const canonicalIsSelf = canonicalUrl ? (canonicalUrl === url || canonicalUrl === url.replace(/\/$/, '')) : false;

  if (!canonicalUrl) {
    issues.push({ code: 'MISSING_CANONICAL', message: 'No canonical URL specified', severity: 'warning' });
  } else if (!canonicalIsSelf && canonicalUrl.startsWith(origin)) {
    // Self-referencing but different format (e.g., with/without trailing slash)
    issues.push({ code: 'CANONICAL_URL_MISMATCH', message: 'Canonical URL differs from page URL', severity: 'warning' });
  }

  // Robots Meta
  const robotsMeta = getMeta(doc, 'meta[name="robots"]');
  const robotsLower = robotsMeta.toLowerCase();
  const noindex = robotsLower.includes('noindex');
  const nofollow = robotsLower.includes('nofollow');

  if (noindex) {
    issues.push({ code: 'NOINDEX_DIRECTIVE', message: 'Page has noindex directive - will not be indexed', severity: 'critical', field: 'robotsMeta' });
  }
  if (nofollow) {
    issues.push({ code: 'NOFOLLOW_DIRECTIVE', message: 'Page has nofollow directive - links will not be followed', severity: 'warning', field: 'robotsMeta' });
  }

  // Lang Attribute
  const langAttr = doc.documentElement.getAttribute('lang')?.trim() ?? '';
  if (!langAttr) {
    issues.push({ code: 'MISSING_LANG_ATTRIBUTE', message: 'Missing lang attribute on <html>', severity: 'warning' });
  }

  // Charset
  const charsetFromContent = getMeta(doc, 'meta[http-equiv="Content-Type"]', 'content').split(';')[1]?.split('=')[1];
  const charset = getMeta(doc, 'meta[charset]', 'charset') || charsetFromContent || '';
  if (!charset) {
    issues.push({ code: 'MISSING_CHARSET', message: 'Missing charset declaration', severity: 'warning' });
  }

  // Hreflang Tags
  const hreflangTags: HreflangTag[] = [];
  const hreflangLinks = Array.from(doc.querySelectorAll('link[rel="alternate"][hreflang]'));
  for (const link of hreflangLinks) {
    const lang = link.getAttribute('hreflang') ?? '';
    const href = link.getAttribute('href') ?? '';
    if (lang && href) {
      hreflangTags.push({ lang, href });
    }
  }

  // Viewport Meta
  const viewportMeta = getMeta(doc, 'meta[name="viewport"]');
  const hasMobileViewport = viewportMeta.toLowerCase().includes('width=device-width');

  if (!viewportMeta) {
    issues.push({ code: 'MISSING_VIEWPORT', message: 'Missing viewport meta tag', severity: 'warning' });
  } else if (!hasMobileViewport) {
    issues.push({ code: 'NON_RESPONSIVE_VIEWPORT', message: 'Viewport not configured for mobile devices', severity: 'warning' });
  }

  // Open Graph Tags
  const ogTitle = getMeta(doc, 'meta[property="og:title"]');
  const ogDescription = getMeta(doc, 'meta[property="og:description"]');
  const ogImage = getMeta(doc, 'meta[property="og:image"]');
  const ogType = getMeta(doc, 'meta[property="og:type"]') || 'website';

  if (!ogTitle) {
    issues.push({ code: 'MISSING_OG_TITLE', message: 'Missing og:title', severity: 'notice' });
  }
  if (!ogDescription) {
    issues.push({ code: 'MISSING_OG_DESCRIPTION', message: 'Missing og:description', severity: 'notice' });
  }
  if (!ogImage) {
    issues.push({ code: 'MISSING_OG_IMAGE', message: 'Missing og:image', severity: 'notice' });
  }

  // Twitter Card Tags
  const twitterCard = getMeta(doc, 'meta[name="twitter:card"]');
  const twitterTitle = getMeta(doc, 'meta[name="twitter:title"]');
  const twitterImage = getMeta(doc, 'meta[name="twitter:image"]');

  if (!twitterCard) {
    issues.push({ code: 'MISSING_TWITTER_CARD', message: 'Missing twitter:card', severity: 'notice' });
  }

  return {
    title,
    titleLength,
    metaDescription,
    metaDescriptionLength,
    metaKeywords,
    canonicalUrl,
    canonicalIsSelf,
    robotsMeta,
    noindex,
    nofollow,
    langAttr,
    charset,
    hreflangTags,
    viewportMeta,
    ogTitle,
    ogDescription,
    ogImage,
    ogType,
    twitterCard,
    twitterTitle,
    twitterImage,
    issues,
  };
}
