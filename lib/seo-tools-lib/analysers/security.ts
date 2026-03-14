/**
 * Security Analyser
 * Analyzes HTTPS, mixed content, and security-related headers/attributes
 */

import type { Issue } from '../types';

export interface SecurityResult {
  isHttps: boolean;
  mixedContent: boolean;
  insecureResourceCount: number;
  issues: Issue[];
}

export function analyseSecurity(doc: Document, url: string): SecurityResult {
  const issues: Issue[] = [];
  const isHttps = url.startsWith('https://');

  // Mixed Content Detection
  const insecureResources = Array.from(
    doc.querySelectorAll(
      'img[src^="http://"], script[src^="http://"], link[href^="http://"], iframe[src^="http://"], video[src^="http://"], audio[src^="http://"], source[src^="http://"]'
    )
  );

  const mixedContent = isHttps && insecureResources.length > 0;

  // Check for insecure form actions
  const insecureForms = Array.from(doc.querySelectorAll('form[action^="http://"]'));

  // Check for CSP meta tag
  const hasCspMeta = !!doc.querySelector('meta[http-equiv="Content-Security-Policy"]');

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
      message: `${insecureResources.length} insecure resource(s) loaded on HTTPS page`,
      severity: 'critical',
    });
  }

  if (insecureForms.length > 0) {
    issues.push({
      code: 'INSECURE_FORM_ACTION',
      message: `${insecureForms.length} form(s) with insecure HTTP action URL`,
      severity: 'critical',
    });
  }

  if (!hasCspMeta) {
    issues.push({
      code: 'MISSING_CSP',
      message: 'No Content-Security-Policy meta tag found',
      severity: 'notice',
    });
  }

  return {
    isHttps,
    mixedContent,
    insecureResourceCount: insecureResources.length,
    issues,
  };
}
