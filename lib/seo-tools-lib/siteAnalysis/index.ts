/**
 * Site-Wide Analysis Module Exports
 * 
 * Re-exports all site analysis utilities for convenient importing.
 */

// Duplicate Content Detection
export {
  findDuplicateContent,
  arePagesDuplicate,
  extractBodyText,
} from './duplicateContent';

export type { DuplicateCluster } from '../types';

// TF-IDF Analysis
export {
  computeTfIdf,
  getSiteWideTopTerms,
  clusterPagesByTopic,
  findSimilarPages,
} from './tfidf';

export type { TfIdfEntry, PageTfIdf, TopicCluster } from './tfidf';

// Keyword Cannibalization
export {
  detectKeywordCannibalization,
  getPageCannibalizationIssues,
  getCannibalizationRecommendations,
} from './cannibalization';

export type { CannibalizationGroup, CannibalizationPage } from './cannibalization';

// Orphan Pages & Link Depth
export {
  findOrphanPages,
  getPagesAtDepth,
  getOrphanPagesDetails,
  getAverageDepth,
} from './orphanPages';

export type { PageWithDepth, OrphanPagesResult } from './orphanPages';
export type { OrphanPage } from '../types';

// Internal PageRank
export {
  calculatePageRank,
  getTopPagesByPageRank,
  getPageRankStats,
  findUndervaluedPages,
} from './internalPageRank';

export type { PageRankResult, PageRankOptions } from './internalPageRank';

// Sitemap Parser
export {
  fetchAndParseSitemap,
  discoverAndParseSitemap,
  parseRobotsForSitemaps,
  analyzeSitemapCoverage,
  performSitemapAudit,
  getSitemapIssues,
} from './sitemapParser';

export type { SitemapUrl, SitemapParseResult, SitemapAnalysis } from './sitemapParser';
export type { SitemapAudit } from '../types';

// Robots.txt Parser
export {
  fetchAndParseRobots,
  analyzeRobotsTxt,
  performRobotsAudit,
  getRobotsIssues,
  isUrlBlockedByRobots,
} from './robotsParser';

export type { RobotsRule, RobotsParseResult, RobotsAnalysis } from './robotsParser';
export type { RobotsTxtAudit } from '../types';

// Crawl Diff
export {
  compareCrawls,
  saveSnapshot,
  loadSnapshot,
  listSnapshots,
  deleteSnapshot,
  getLatestTwoSnapshots,
  diffLatestSnapshots,
  formatDiffSummary,
  getTopImprovements,
  getTopDeclines,
} from './crawlDiff';

export type { FieldChange, PageChange, CrawlDiffResult } from './crawlDiff';
export type { CrawlSnapshot, CrawlDiff } from '../types';
