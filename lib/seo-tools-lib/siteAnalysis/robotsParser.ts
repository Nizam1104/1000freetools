/**
 * Robots.txt Parser and Auditor
 * 
 * Fetches and parses robots.txt, extracts disallow rules,
 * and checks if important crawled pages are blocked.
 */

import type { PageData, RobotsTxtAudit } from '../types';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RobotsRule {
  userAgent: string;
  disallow: string[];
  allow: string[];
  sitemap?: string;
}

export interface RobotsParseResult {
  rules: RobotsRule[];
  raw: string;
  parseError?: string;
  sitemaps: string[];
}

export interface RobotsAnalysis {
  audit: RobotsTxtAudit;
  rules: RobotsRule[];
  sitemaps: string[];
  blockedPages: Array<{ url: string; matchedRule: string }>;
}

// ─── Helper Functions ─────────────────────────────────────────────────────────

/**
 * Normalize URL path for robots.txt matching
 */
function normalizePath(url: string): string {
  try {
    const u = new URL(url);
    return u.pathname + (u.search || '');
  } catch {
    return url;
  }
}

/**
 * Check if a URL path matches a robots.txt pattern
 * 
 * Implements basic robots.txt pattern matching:
 * - * matches any sequence of characters
 * - $ at end matches end of URL
 */
function matchesPattern(path: string, pattern: string): boolean {
  if (!pattern) return false;
  
  // Exact match for empty pattern (means allow all)
  if (pattern === '/') return path === '/';
  
  // Convert robots.txt pattern to regex
  let regexPattern = pattern
    .replace(/[.+^${}()|[\]\\]/g, '\\$&')  // Escape special regex chars
    .replace(/\*/g, '.*');                  // * becomes .*
  
  // Handle $ at end (exact end match)
  if (regexPattern.endsWith('$')) {
    regexPattern = regexPattern.slice(0, -1) + '$';
  } else {
    // Pattern matches if it's a prefix
    regexPattern = '^' + regexPattern;
  }
  
  const regex = new RegExp(regexPattern);
  return regex.test(path);
}

/**
 * Parse a single robots.txt line
 */
function parseLine(line: string): {
  directive?: string;
  value?: string;
  comment?: string;
} {
  const trimmed = line.trim();
  
  // Empty line or comment
  if (!trimmed) return {};
  
  // Extract comment
  const commentIndex = trimmed.indexOf('#');
  const noComment = commentIndex >= 0 ? trimmed.slice(0, commentIndex) : trimmed;
  const comment = commentIndex >= 0 ? trimmed.slice(commentIndex + 1).trim() : undefined;
  
  // Parse directive
  const colonIndex = noComment.indexOf(':');
  if (colonIndex === -1) {
    return { comment };
  }
  
  const directive = noComment.slice(0, colonIndex).trim().toLowerCase();
  const value = noComment.slice(colonIndex + 1).trim();
  
  return { directive, value, comment };
}

/**
 * Parse robots.txt content
 */
function parseRobotsTxt(content: string): RobotsParseResult {
  const rules: RobotsRule[] = [];
  const sitemaps: string[] = [];
  let currentRule: RobotsRule | null = null;
  
  const lines = content.split('\n');
  
  for (const line of lines) {
    const { directive, value, comment } = parseLine(line);
    
    if (!directive || !value) continue;
    
    // Handle sitemap directive (global, not user-agent specific)
    if (directive === 'sitemap') {
      sitemaps.push(value);
      continue;
    }
    
    // Handle user-agent directive
    if (directive === 'user-agent') {
      // Save previous rule if exists
      if (currentRule) {
        rules.push(currentRule);
      }
      
      // Start new rule
      currentRule = {
        userAgent: value,
        disallow: [],
        allow: [],
        sitemap: undefined,
      };
      continue;
    }
    
    // Handle disallow directive
    if (directive === 'disallow' && currentRule) {
      if (value) {  // Empty value means allow all
        currentRule.disallow.push(value);
      }
      continue;
    }
    
    // Handle allow directive
    if (directive === 'allow' && currentRule) {
      currentRule.allow.push(value);
      continue;
    }
  }
  
  // Don't forget the last rule
  if (currentRule) {
    rules.push(currentRule);
  }
  
  return {
    rules,
    raw: content,
    sitemaps,
  };
}

/**
 * Find the most specific matching rule for a user agent
 */
function findRuleForUserAgent(
  rules: RobotsRule[],
  userAgent = '*'
): RobotsRule | undefined {
  // First try exact match
  let rule = rules.find(r => r.userAgent.toLowerCase() === userAgent.toLowerCase());
  
  // Fall back to wildcard
  if (!rule) {
    rule = rules.find(r => r.userAgent === '*');
  }
  
  return rule;
}

/**
 * Check if a URL is allowed by robots.txt rules
 */
function isUrlAllowed(
  url: string,
  rule?: RobotsRule
): { allowed: boolean; matchedRule?: string } {
  if (!rule) return { allowed: true };
  
  const path = normalizePath(url);
  
  // Check allow rules first (more specific)
  for (const allowPattern of rule.allow) {
    if (matchesPattern(path, allowPattern)) {
      return { allowed: true, matchedRule: `Allow: ${allowPattern}` };
    }
  }
  
  // Check disallow rules
  for (const disallowPattern of rule.disallow) {
    if (matchesPattern(path, disallowPattern)) {
      return { allowed: false, matchedRule: `Disallow: ${disallowPattern}` };
    }
  }
  
  // Default: allowed
  return { allowed: true };
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Fetch and parse robots.txt
 */
export async function fetchAndParseRobots(
  origin: string,
  sessionToken: string
): Promise<RobotsParseResult> {
  const robotsUrl = `${origin}/robots.txt`;
  
  try {
    const response = await fetch(`https://tft-seo-audit.nizam-v.workers.dev/get-html-page?url=${encodeURIComponent(robotsUrl)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sessionToken}`
      }
    });
    
    // 404 means no robots.txt - that's OK, everything is allowed
    if (response.status === 404) {
      return {
        rules: [],
        raw: '',
        sitemaps: [],
      };
    }
    
    if (!response.ok) {
      return {
        rules: [],
        raw: '',
        parseError: `HTTP ${response.status}`,
        sitemaps: [],
      };
    }
    
    const text = await response.text();
    return parseRobotsTxt(text);
  } catch (error) {
    return {
      rules: [],
      raw: '',
      parseError: error instanceof Error ? error.message : 'Fetch failed',
      sitemaps: [],
    };
  }
}

/**
 * Analyze robots.txt rules against crawled pages
 */
export function analyzeRobotsTxt(
  parseResult: RobotsParseResult,
  crawledPages: PageData[],
  userAgent = '*'
): RobotsAnalysis {
  const rule = findRuleForUserAgent(parseResult.rules, userAgent);
  
  const blockedPages: Array<{ url: string; matchedRule: string }> = [];
  const disallowedPaths = rule?.disallow || [];
  
  // Check each crawled page
  for (const page of crawledPages) {
    const check = isUrlAllowed(page.url, rule);
    if (!check.allowed && check.matchedRule) {
      blockedPages.push({
        url: page.url,
        matchedRule: check.matchedRule,
      });
    }
  }
  
  return {
    audit: {
      raw: parseResult.raw,
      disallowedPaths,
      blockedImportantPages: blockedPages.map(b => b.url),
    },
    rules: parseResult.rules,
    sitemaps: parseResult.sitemaps,
    blockedPages,
  };
}

/**
 * Full robots.txt audit workflow
 */
export async function performRobotsAudit(
  origin: string,
  crawledPages: PageData[],
  userAgent = '*',
  sessionToken: string
): Promise<RobotsAnalysis> {
  const parseResult = await fetchAndParseRobots(origin, sessionToken);
  
  if (parseResult.parseError) {
    return {
      audit: {
        raw: parseResult.raw,
        disallowedPaths: [],
        blockedImportantPages: [],
      },
      rules: [],
      sitemaps: [],
      blockedPages: [],
    };
  }
  
  return analyzeRobotsTxt(parseResult, crawledPages, userAgent);
}

/**
 * Get robots.txt issues as human-readable messages
 */
export function getRobotsIssues(analysis: RobotsAnalysis): string[] {
  const issues: string[] = [];
  
  if (!analysis.audit.raw) {
    issues.push('No robots.txt found - consider adding one for better crawl control');
    return issues;
  }
  
  if (analysis.blockedPages.length > 0) {
    const criticalPages = analysis.blockedPages.filter(b => {
      // Consider pages with good SEO scores as important
      return true; // Could add more sophisticated logic here
    });
    
    if (criticalPages.length > 0) {
      issues.push(
        `${criticalPages.length} crawled page(s) are blocked by robots.txt`
      );
    }
  }
  
  // Check for overly broad disallow rules
  const broadRules = analysis.rules.flatMap(r =>
    r.disallow.filter(d => d === '/' || d === '/*')
  );
  
  if (broadRules.length > 0) {
    issues.push('robots.txt contains broad disallow rules that may block important content');
  }
  
  // Check if sitemap is referenced
  if (analysis.sitemaps.length === 0) {
    const hasSitemapDirective = analysis.rules.some(r => r.sitemap);
    if (!hasSitemapDirective) {
      issues.push('No sitemap referenced in robots.txt');
    }
  }
  
  return issues;
}

/**
 * Check if a specific URL would be blocked
 */
export function isUrlBlockedByRobots(
  url: string,
  robotsText: string,
  userAgent = '*'
): { blocked: boolean; reason?: string } {
  const parseResult = parseRobotsTxt(robotsText);
  const rule = findRuleForUserAgent(parseResult.rules, userAgent);
  const check = isUrlAllowed(url, rule);
  
  return {
    blocked: !check.allowed,
    reason: check.matchedRule,
  };
}
