/**
 * URL Structure Analyser
 * Analyzes URL length, depth, parameters, casing, trailing slash, keywords
 */

import type { Issue } from '../types';

export interface UrlAnalyserResult {
  urlLength: number;
  urlDepth: number;
  urlHasParams: boolean;
  urlHasUppercase: boolean;
  urlHasUnderscores: boolean;
  urlHasTrailingSlash: boolean;
  urlKeywords: string[];
  issues: Issue[];
}

export function analyseUrl(url: string): UrlAnalyserResult {
  const issues: Issue[] = [];

  const urlLength = url.length;
  const parsed = new URL(url);
  const pathname = parsed.pathname;

  // URL Depth (count slashes)
  const urlDepth = pathname.split('/').filter((p) => p.length > 0).length;

  // URL Parameters
  const urlHasParams = parsed.searchParams.toString().length > 0;

  // Uppercase in URL
  const urlHasUppercase = /[A-Z]/.test(url);

  // Underscores in URL
  const urlHasUnderscores = url.includes('_');

  // Trailing Slash
  const urlHasTrailingSlash = url.endsWith('/') && url.length > 1;

  // Extract keywords from URL slug
  const urlKeywords = pathname
    .split('/')
    .filter((p) => p.length > 0)
    .flatMap((segment) => segment.split(/[-_]/))
    .filter((word) => word.length >= 3 && /^[a-z0-9]+$/i.test(word));

  // Issues

  // URL Length
  if (urlLength > 115) {
    issues.push({
      code: 'URL_TOO_LONG',
      message: `URL too long (${urlLength} characters, recommended < 115)`,
      severity: 'warning',
    });
  }

  // URL Depth
  if (urlDepth > 4) {
    issues.push({
      code: 'URL_TOO_DEEP',
      message: `URL too deep (${urlDepth} levels, recommended ≤ 4)`,
      severity: 'warning',
    });
  }

  // Dynamic Parameters
  if (urlHasParams) {
    issues.push({
      code: 'URL_HAS_PARAMETERS',
      message: 'URL contains dynamic parameters',
      severity: 'notice',
    });
  }

  // Uppercase Characters
  if (urlHasUppercase) {
    issues.push({
      code: 'URL_HAS_UPPERCASE',
      message: 'URL contains uppercase characters (should be lowercase)',
      severity: 'notice',
    });
  }

  // Underscores (hyphens preferred)
  if (urlHasUnderscores) {
    issues.push({
      code: 'URL_HAS_UNDERSCORES',
      message: 'URL contains underscores (hyphens preferred for word separation)',
      severity: 'notice',
    });
  }

  return {
    urlLength,
    urlDepth,
    urlHasParams,
    urlHasUppercase,
    urlHasUnderscores,
    urlHasTrailingSlash,
    urlKeywords,
    issues,
  };
}
