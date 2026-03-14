/**
 * Technical SEO Analyser
 * Analyzes structured data, schema validation, render-blocking scripts, preload hints, mixed content
 */

import type { Issue } from '../types';

export interface TechnicalResult {
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
  issues: Issue[];
}

const KNOWN_SCHEMA_TYPES = new Set([
  'Article', 'NewsArticle', 'BlogPosting', 'Product', 'Offer', 'AggregateOffer',
  'Review', 'AggregateRating', 'BreadcrumbList', 'ListItem', 'Organization',
  'Person', 'LocalBusiness', 'Restaurant', 'Store', 'Service', 'Event',
  'Course', 'JobPosting', 'Recipe', 'VideoObject', 'ImageObject', 'FAQPage',
  'HowTo', 'QAPage', 'SoftwareApplication', 'WebSite', 'WebPage', 'SearchAction',
  'SpeakableSpecification', 'Occupation', 'Resume', 'JobPosting', 'Event',
]);

export function analyseTechnical(doc: Document, url: string): TechnicalResult {
  const issues: Issue[] = [];
  const isHttps = url.startsWith('https://');

  // JSON-LD Structured Data
  const jsonLdScripts = Array.from(
    doc.querySelectorAll('script[type="application/ld+json"]')
  ).map((el) => {
    try {
      return JSON.parse(el.textContent ?? '');
    } catch {
      return null;
    }
  }).filter(Boolean);

  const schemaTypes = jsonLdScripts.flatMap((schema: Record<string, unknown>) => {
    const type = schema['@type'];
    if (Array.isArray(type)) return type.map((t) => String(t));
    if (typeof type === 'string') return [type];
    return [];
  });

  const hasBreadcrumbSchema = schemaTypes.some((t) =>
    t.toLowerCase().includes('breadcrumb')
  );

  // AMP Detection
  const hasAmpVersion =
    doc.documentElement.hasAttribute('amp') ||
    !!doc.querySelector('link[rel="amphtml"]');

  // Render-blocking Scripts in <head>
  const headScripts = Array.from(doc.querySelectorAll('head script[src]'));
  const renderBlockingScripts = headScripts.filter((el) => {
    const hasDefer = el.hasAttribute('defer');
    const hasAsync = el.hasAttribute('async');
    const type = el.getAttribute('type') ?? '';
    const isModule = type === 'module';
    return !hasDefer && !hasAsync && !isModule;
  }).length;

  // Inline Styles
  const inlineStyleCount = doc.querySelectorAll('head style').length;

  // External Scripts Count
  const externalScriptCount = doc.querySelectorAll('script[src]').length;

  // Preload / Preconnect
  const hasPreload = !!doc.querySelector('link[rel="preload"]');
  const hasPreconnect = !!doc.querySelector('link[rel="preconnect"]');

  // Mixed Content Detection
  let mixedContent = false;
  const insecureResources = doc.querySelectorAll(
    'img[src^="http://"], script[src^="http://"], link[href^="http://"], iframe[src^="http://"]'
  );
  if (isHttps && insecureResources.length > 0) {
    mixedContent = true;
  }

  // Issues

  if (!isHttps) {
    issues.push({
      code: 'NOT_HTTPS',
      message: 'Page is not served over HTTPS',
      severity: 'critical',
    });
  }

  if (mixedContent) {
    issues.push({
      code: 'MIXED_CONTENT',
      message: `${insecureResources.length} insecure resource(s) on HTTPS page`,
      severity: 'critical',
    });
  }

  if (jsonLdScripts.length === 0) {
    issues.push({
      code: 'NO_STRUCTURED_DATA',
      message: 'No structured data (JSON-LD) found',
      severity: 'notice',
    });
  } else {
    // Validate schema types
    const unknownTypes = schemaTypes.filter((t) => !KNOWN_SCHEMA_TYPES.has(t));
    if (unknownTypes.length > 0) {
      issues.push({
        code: 'UNKNOWN_SCHEMA_TYPE',
        message: `Unknown schema type(s): ${unknownTypes.join(', ')}`,
        severity: 'notice',
      });
    }
  }

  if (renderBlockingScripts > 0) {
    issues.push({
      code: 'RENDER_BLOCKING_SCRIPTS',
      message: `${renderBlockingScripts} render-blocking script(s) in <head>`,
      severity: 'warning',
    });
  }

  if (inlineStyleCount > 5) {
    issues.push({
      code: 'EXCESSIVE_INLINE_STYLES',
      message: `${inlineStyleCount} inline style block(s) in <head>`,
      severity: 'notice',
    });
  }

  if (!hasPreload && externalScriptCount > 3) {
    issues.push({
      code: 'MISSING_PRELOAD_HINTS',
      message: 'Consider using <link rel="preload"> for critical resources',
      severity: 'notice',
    });
  }

  return {
    hasStructuredData: jsonLdScripts.length > 0,
    schemaTypes,
    schemaRaw: jsonLdScripts,
    hasBreadcrumbSchema,
    hasAmpVersion,
    renderBlockingScripts,
    inlineStyleCount,
    externalScriptCount,
    hasPreload,
    hasPreconnect,
    mixedContent,
    isHttps,
    issues,
  };
}
