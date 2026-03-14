/**
 * Headings Analyser
 * Extracts and validates heading hierarchy: H1-H6, empty headings, hierarchy violations
 */

import type { Issue } from '../types';

export interface HeadingsResult {
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
  issues: Issue[];
}

export function analyseHeadings(doc: Document): HeadingsResult {
  const issues: Issue[] = [];

  const getTexts = (selector: string): string[] =>
    Array.from(doc.querySelectorAll(selector)).map((el) => el.textContent?.trim() ?? '');

  const h1s = getTexts('h1');
  const h2s = getTexts('h2');
  const h3s = getTexts('h3');
  const h4s = getTexts('h4');
  const h5s = getTexts('h5');
  const h6s = getTexts('h6');

  // H1 Analysis
  if (h1s.length === 0) {
    issues.push({ code: 'MISSING_H1', message: 'No H1 tag found', severity: 'critical' });
  } else if (h1s.length > 1) {
    issues.push({ code: 'MULTIPLE_H1', message: `Multiple H1 tags found (${h1s.length}) - should have only one`, severity: 'warning' });
  } else if (h1s[0] && h1s[0].length < 10) {
    issues.push({ code: 'H1_TOO_SHORT', message: 'H1 tag is too short', severity: 'warning' });
  }

  // Empty Headings
  const allHeadings = [
    ...Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6'))
  ];
  const emptyHeadings: string[] = [];

  for (const heading of allHeadings) {
    const text = heading.textContent?.trim() ?? '';
    if (!text) {
      const tag = heading.tagName.toLowerCase();
      emptyHeadings.push(`<${tag}>`);
    }
  }

  if (emptyHeadings.length > 0) {
    issues.push({
      code: 'EMPTY_HEADINGS',
      message: `${emptyHeadings.length} empty heading(s) found`,
      severity: 'warning',
    });
  }

  // Heading Hierarchy Violations
  const headingHierarchyViolations: string[] = [];
  const headingElements = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6'));

  let lastLevel = 0;
  for (const heading of headingElements) {
    const level = parseInt(heading.tagName.charAt(1), 10);

    // Check for skipped levels (e.g., H3 before H2)
    if (level > lastLevel + 1 && lastLevel > 0) {
      const violation = `Heading level skipped: H${lastLevel} → H${level}`;
      headingHierarchyViolations.push(violation);
    }

    lastLevel = level;
  }

  if (headingHierarchyViolations.length > 0) {
    issues.push({
      code: 'HEADING_HIERARCHY_VIOLATION',
      message: `${headingHierarchyViolations.length} heading hierarchy violation(s)`,
      severity: 'warning',
    });
  }

  return {
    h1Count: h1s.length,
    h1s,
    h2Count: h2s.length,
    h2s,
    h3Count: h3s.length,
    h3s,
    h4Count: h4s.length,
    h4s,
    h5Count: h5s.length,
    h5s,
    h6Count: h6s.length,
    h6s,
    headingHierarchyViolations,
    emptyHeadings,
    issues,
  };
}
