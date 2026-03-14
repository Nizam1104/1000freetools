/**
 * Keyword Cannibalization Detection
 * 
 * Identifies pages competing for the same keywords,
 * which can dilute SEO performance.
 */

import type { PageData } from '../types';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CannibalizationGroup {
  keyword: string;
  pages: CannibalizationPage[];
  severity: 'critical' | 'warning' | 'notice';
}

export interface CannibalizationPage {
  url: string;
  title: string;
  keywordDensity: number;
  seoScore: number;
  rank: number;
}

// ─── Helper Functions ─────────────────────────────────────────────────────────

/**
 * Normalize keyword for comparison
 */
function normalizeKeyword(keyword: string): string {
  return keyword
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');
}

/**
 * Determine cannibalization severity based on number of competing pages
 * and their scores
 */
function determineSeverity(pageCount: number, avgScore: number): 'critical' | 'warning' | 'notice' {
  if (pageCount >= 4 || avgScore < 50) {
    return 'critical';
  }
  if (pageCount >= 3 || avgScore < 70) {
    return 'warning';
  }
  return 'notice';
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Detect keyword cannibalization across crawled pages
 * 
 * Groups pages by their top keywords and identifies when
 * multiple pages target the same keyword.
 * 
 * @param pages - Array of PageData to analyze
 * @param minKeywordDensity - Minimum keyword density to consider (default 0.01 = 1%)
 * @param topN - Number of top keywords per page to consider (default 5)
 * @returns Array of CannibalizationGroup objects
 */
export function detectKeywordCannibalization(
  pages: PageData[],
  minKeywordDensity = 0.01,
  topN = 5
): CannibalizationGroup[] {
  if (pages.length < 2) return [];
  
  // Map: keyword -> array of pages targeting that keyword
  const keywordMap = new Map<string, CannibalizationPage[]>();
  
  for (const page of pages) {
    // Get top keywords from keywordDensity
    const topKeywords = page.keywordDensity
      .filter(kd => kd.density >= minKeywordDensity)
      .slice(0, topN);
    
    for (const kd of topKeywords) {
      const normalized = normalizeKeyword(kd.word);
      if (!normalized || normalized.length < 3) continue;
      
      if (!keywordMap.has(normalized)) {
        keywordMap.set(normalized, []);
      }
      
      keywordMap.get(normalized)!.push({
        url: page.url,
        title: page.title || '(No title)',
        keywordDensity: kd.density,
        seoScore: page.seoScore,
        rank: 0, // Will be set below
      });
    }
  }
  
  // Filter to only keywords with 2+ pages (cannibalization)
  const groups: CannibalizationGroup[] = [];
  
  for (const [keyword, pageList] of keywordMap.entries()) {
    if (pageList.length < 2) continue;
    
    // Sort by keyword density (highest = best rank for this keyword)
    pageList.sort((a, b) => b.keywordDensity - a.keywordDensity);
    
    // Assign ranks
    pageList.forEach((page, index) => {
      page.rank = index + 1;
    });
    
    // Calculate average score for severity
    const avgScore = pageList.reduce((sum, p) => sum + p.seoScore, 0) / pageList.length;
    
    groups.push({
      keyword,
      pages: pageList,
      severity: determineSeverity(pageList.length, avgScore),
    });
  }
  
  // Sort by severity and number of pages
  const severityOrder = { critical: 0, warning: 1, notice: 2 };
  return groups.sort((a, b) => {
    if (a.severity !== b.severity) {
      return severityOrder[a.severity] - severityOrder[b.severity];
    }
    return b.pages.length - a.pages.length;
  });
}

/**
 * Get cannibalization issues for a specific page
 */
export function getPageCannibalizationIssues(
  page: PageData,
  allPages: PageData[],
  minKeywordDensity = 0.01
): CannibalizationGroup[] {
  const allGroups = detectKeywordCannibalization(allPages, minKeywordDensity);
  return allGroups.filter(group =>
    group.pages.some(p => p.url === page.url)
  );
}

/**
 * Get recommendations for fixing cannibalization
 */
export function getCannibalizationRecommendations(
  group: CannibalizationGroup
): string[] {
  const recommendations: string[] = [];
  
  if (group.pages.length >= 4) {
    recommendations.push(
      `Consider consolidating these ${group.pages.length} pages into a single comprehensive resource.`
    );
  }
  
  // Find the best performing page
  const bestPage = group.pages.reduce((best, current) =>
    current.seoScore > best.seoScore ? current : best
  );
  
  recommendations.push(
    `"${bestPage.title}" ranks best for "${group.keyword}". Consider making this the primary page.`
  );
  
  // Recommend canonical or noindex for lower performers
  const lowerPerformers = group.pages.filter(p => p.url !== bestPage.url);
  if (lowerPerformers.length > 0) {
    recommendations.push(
      `For the other ${lowerPerformers.length} page(s), consider:`
    );
    
    lowerPerformers.forEach(page => {
      if (page.seoScore < 50) {
        recommendations.push(
          `  • Add canonical tag from "${page.url}" to "${bestPage.url}"`
        );
      } else {
        recommendations.push(
          `  • Differentiate "${page.title}" to target a different keyword`
        );
      }
    });
  }
  
  return recommendations;
}
