/**
 * Scoring Engine
 * Unified SEO score engine with Critical/Warning/Notice tiers
 */

import type { Issue, PageData } from './types';

export interface ScoringRule {
  code: string;
  severity: 'critical' | 'warning' | 'notice';
  deduction: number;
  check: (page: PageData) => boolean;
  message: (page: PageData) => string;
}

// Deduction values by severity
const DEDUCTIONS = {
  critical: { min: 10, max: 20 },
  warning: { min: 4, max: 9 },
  notice: { min: 1, max: 3 },
};

// Built-in scoring rules
export const SCORING_RULES: ScoringRule[] = [
  // Critical Issues
  {
    code: 'MISSING_TITLE',
    severity: 'critical',
    deduction: 15,
    check: (page) => !page.title,
    message: () => 'Missing <title> tag',
  },
  {
    code: 'MISSING_META_DESCRIPTION',
    severity: 'critical',
    deduction: 12,
    check: (page) => !page.metaDescription,
    message: () => 'Missing meta description',
  },
  {
    code: 'MISSING_H1',
    severity: 'critical',
    deduction: 10,
    check: (page) => page.h1Count === 0,
    message: () => 'No H1 tag found',
  },
  {
    code: 'HTTP_ERROR',
    severity: 'critical',
    deduction: 20,
    check: (page) => page.statusCode >= 400,
    message: (page) => `HTTP ${page.statusCode} error`,
  },
  {
    code: 'NOINDEX_DIRECTIVE',
    severity: 'critical',
    deduction: 15,
    check: (page) => page.noindex,
    message: () => 'Page has noindex directive',
  },
  {
    code: 'NOT_HTTPS',
    severity: 'critical',
    deduction: 15,
    check: (page) => !page.isHttps,
    message: () => 'Page is not served over HTTPS',
  },
  {
    code: 'MIXED_CONTENT',
    severity: 'critical',
    deduction: 15,
    check: (page) => page.mixedContent,
    message: () => 'Mixed content detected',
  },
  {
    code: 'MISSING_ALT_TEXT',
    severity: 'critical',
    deduction: 10,
    check: (page) => page.imagesWithoutAlt > 0,
    message: (page) => `${page.imagesWithoutAlt} image(s) missing alt text`,
  },

  // Warning Issues
  {
    code: 'TITLE_TOO_SHORT',
    severity: 'warning',
    deduction: 5,
    check: (page) => page.titleLength > 0 && page.titleLength < 30,
    message: (page) => `Title too short (${page.titleLength} chars)`,
  },
  {
    code: 'TITLE_TOO_LONG',
    severity: 'warning',
    deduction: 5,
    check: (page) => page.titleLength > 60,
    message: (page) => `Title too long (${page.titleLength} chars)`,
  },
  {
    code: 'META_DESCRIPTION_TOO_SHORT',
    severity: 'warning',
    deduction: 4,
    check: (page) => page.metaDescriptionLength > 0 && page.metaDescriptionLength < 120,
    message: (page) => `Meta description too short (${page.metaDescriptionLength} chars)`,
  },
  {
    code: 'META_DESCRIPTION_TOO_LONG',
    severity: 'warning',
    deduction: 4,
    check: (page) => page.metaDescriptionLength > 160,
    message: (page) => `Meta description too long (${page.metaDescriptionLength} chars)`,
  },
  {
    code: 'MULTIPLE_H1',
    severity: 'warning',
    deduction: 5,
    check: (page) => page.h1Count > 1,
    message: (page) => `Multiple H1 tags (${page.h1Count})`,
  },
  {
    code: 'LOW_WORD_COUNT',
    severity: 'warning',
    deduction: 8,
    check: (page) => page.wordCount < 300,
    message: (page) => `Low word count (${page.wordCount} words)`,
  },
  {
    code: 'MISSING_VIEWPORT',
    severity: 'warning',
    deduction: 5,
    check: (page) => !page.viewportMeta,
    message: () => 'Missing viewport meta tag',
  },
  {
    code: 'MISSING_CANONICAL',
    severity: 'warning',
    deduction: 4,
    check: (page) => !page.canonicalUrl,
    message: () => 'No canonical URL specified',
  },
  {
    code: 'MISSING_LANG_ATTRIBUTE',
    severity: 'warning',
    deduction: 3,
    check: (page) => !page.langAttr,
    message: () => 'Missing lang attribute on <html>',
  },
  {
    code: 'URL_TOO_LONG',
    severity: 'warning',
    deduction: 4,
    check: (page) => page.urlLength > 115,
    message: (page) => `URL too long (${page.urlLength} characters)`,
  },
  {
    code: 'URL_TOO_DEEP',
    severity: 'warning',
    deduction: 4,
    check: (page) => page.urlDepth > 4,
    message: (page) => `URL too deep (${page.urlDepth} levels)`,
  },
  {
    code: 'RENDER_BLOCKING_SCRIPTS',
    severity: 'warning',
    deduction: 5,
    check: (page) => page.renderBlockingScripts > 0,
    message: (page) => `${page.renderBlockingScripts} render-blocking script(s)`,
  },
  {
    code: 'GENERIC_ANCHOR_TEXT',
    severity: 'warning',
    deduction: 3,
    check: (page) => page.genericAnchorCount > 0,
    message: (page) => `${page.genericAnchorCount} link(s) with generic anchor`,
  },
  {
    code: 'HEADING_HIERARCHY_VIOLATION',
    severity: 'warning',
    deduction: 4,
    check: (page) => page.headingHierarchyViolations.length > 0,
    message: (page) => `${page.headingHierarchyViolations.length} heading hierarchy violation(s)`,
  },
  {
    code: 'LOW_TEXT_TO_HTML_RATIO',
    severity: 'warning',
    deduction: 5,
    check: (page) => page.textToHtmlRatio < 10,
    message: (page) => `Low text-to-HTML ratio (${page.textToHtmlRatio}%)`,
  },

  // Notice Issues
  {
    code: 'MISSING_OG_TITLE',
    severity: 'notice',
    deduction: 2,
    check: (page) => !page.ogTitle,
    message: () => 'Missing og:title',
  },
  {
    code: 'MISSING_OG_DESCRIPTION',
    severity: 'notice',
    deduction: 2,
    check: (page) => !page.ogDescription,
    message: () => 'Missing og:description',
  },
  {
    code: 'MISSING_OG_IMAGE',
    severity: 'notice',
    deduction: 2,
    check: (page) => !page.ogImage,
    message: () => 'Missing og:image',
  },
  {
    code: 'MISSING_TWITTER_CARD',
    severity: 'notice',
    deduction: 2,
    check: (page) => !page.twitterCard,
    message: () => 'Missing twitter:card',
  },
  {
    code: 'NO_STRUCTURED_DATA',
    severity: 'notice',
    deduction: 3,
    check: (page) => !page.hasStructuredData,
    message: () => 'No structured data (JSON-LD)',
  },
  {
    code: 'MISSING_META_KEYWORDS',
    severity: 'notice',
    deduction: 1,
    check: (page) => !page.metaKeywords,
    message: () => 'Missing meta keywords (legacy)',
  },
  {
    code: 'URL_HAS_PARAMETERS',
    severity: 'notice',
    deduction: 2,
    check: (page) => page.urlHasParams,
    message: () => 'URL contains dynamic parameters',
  },
  {
    code: 'URL_HAS_UPPERCASE',
    severity: 'notice',
    deduction: 2,
    check: (page) => page.urlHasUppercase,
    message: () => 'URL contains uppercase characters',
  },
  {
    code: 'URL_HAS_UNDERSCORES',
    severity: 'notice',
    deduction: 2,
    check: (page) => page.urlHasUnderscores,
    message: () => 'URL contains underscores',
  },
  {
    code: 'NOFOLLOW_INTERNAL_LINKS',
    severity: 'notice',
    deduction: 2,
    check: (page) => page.nofollowInternalCount > 0,
    message: (page) => `${page.nofollowInternalCount} internal nofollow link(s)`,
  },
];

/**
 * Calculate SEO score for a page based on issues
 */
export function scorePageData(page: PageData): { score: number; issues: Issue[] } {
  const issues: Issue[] = [];
  let score = 100;

  for (const rule of SCORING_RULES) {
    if (rule.check(page)) {
      const issue: Issue = {
        code: rule.code,
        message: rule.message(page),
        severity: rule.severity,
      };
      issues.push(issue);
      score -= rule.deduction;
    }
  }

  // Ensure score is between 0 and 100
  score = Math.max(0, Math.min(100, score));

  return { score, issues };
}

/**
 * Calculate site-wide health score (weighted average of all pages)
 */
export function scoreSiteHealth(pages: PageData[]): number {
  if (pages.length === 0) return 0;

  const totalScore = pages.reduce((sum, page) => sum + page.seoScore, 0);
  return Math.round((totalScore / pages.length) * 10) / 10;
}

/**
 * Get issue counts by severity
 */
export function getIssueCounts(pages: PageData[]): {
  critical: number;
  warning: number;
  notice: number;
  total: number;
} {
  const counts = { critical: 0, warning: 0, notice: 0, total: 0 };

  for (const page of pages) {
    for (const issue of page.issues) {
      counts[issue.severity]++;
      counts.total++;
    }
  }

  return counts;
}

/**
 * Get status code distribution
 */
export function getStatusCodeDistribution(pages: PageData[]): Record<number, number> {
  const distribution: Record<number, number> = {};

  for (const page of pages) {
    const code = page.statusCode;
    distribution[code] = (distribution[code] ?? 0) + 1;
  }

  return distribution;
}

/**
 * Get page depth distribution
 */
export function getPageDepthDistribution(pages: PageData[]): Record<number, number> {
  const distribution: Record<number, number> = {};

  for (const page of pages) {
    const depth = page.linkDepthFromRoot;
    distribution[depth] = (distribution[depth] ?? 0) + 1;
  }

  return distribution;
}
