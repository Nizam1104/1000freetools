/**
 * Content Analyser
 * Analyzes word count, text-to-HTML ratio, readability, keyword density
 */

import type { Issue, KeywordDensityEntry } from '../types';

export interface ContentResult {
  wordCount: number;
  charCount: number;
  paragraphCount: number;
  avgSentenceLength: number;
  textToHtmlRatio: number;
  readabilityScore: number | null;
  keywordDensity: KeywordDensityEntry[];
  issues: Issue[];
}

const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
  'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
  'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'shall',
  'can', 'that', 'this', 'these', 'those', 'it', 'its', 'as', 'if', 'not', 'no', 'so',
  'up', 'out', 'than', 'then', 'there', 'when', 'where', 'which', 'who', 'while', 'i',
  'we', 'you', 'he', 'she', 'they', 'my', 'our', 'your', 'his', 'her', 'their', 'about',
]);

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter((w) => w.length > 0).length;
}

function calculateReadabilityScore(text: string): number | null {
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const words = text.trim().split(/\s+/).filter((w) => w.length > 0);

  if (sentences.length === 0 || words.length === 0) return null;

  const avgWordsPerSentence = words.length / sentences.length;
  const avgCharsPerWord = words.reduce((sum, w) => sum + w.length, 0) / words.length;

  // Flesch Reading Ease Score
  const score = 206.835 - 1.015 * avgWordsPerSentence - 84.6 * (avgCharsPerWord / 4.5);
  return Math.round(Math.max(0, Math.min(100, score)) * 10) / 10;
}

function calculateKeywordDensity(text: string): KeywordDensityEntry[] {
  const words = text.toLowerCase().match(/\b[a-z]{3,}\b/g) ?? [];
  const total = words.length;

  if (total === 0) return [];

  const freq: Record<string, number> = {};
  for (const word of words) {
    if (!STOP_WORDS.has(word)) {
      freq[word] = (freq[word] ?? 0) + 1;
    }
  }

  return Object.entries(freq)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([word, count]) => ({
      word,
      count,
      density: Math.round((count / total) * 1000) / 10,
    }));
}

export function analyseContent(doc: Document, html: string): ContentResult {
  const issues: Issue[] = [];

  // Extract body text (remove scripts, styles, nav, header, footer for cleaner analysis)
  const bodyClone = doc.body?.cloneNode(true) as HTMLElement;
  if (bodyClone) {
    bodyClone.querySelectorAll('script,style,noscript,header,nav,footer').forEach((el) => el.remove());
  }

  const bodyText = (bodyClone?.textContent ?? '').replace(/\s+/g, ' ').trim();
  const wordCount = countWords(bodyText);
  const charCount = bodyText.length;

  // Paragraph count
  const paragraphCount = doc.querySelectorAll('p').length;

  // Average sentence length
  const sentences = bodyText.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const avgSentenceLength = sentences.length > 0
    ? Math.round((wordCount / sentences.length) * 10) / 10
    : 0;

  // Text-to-HTML ratio
  const htmlLength = html.length;
  const textToHtmlRatio = htmlLength > 0
    ? Math.round((charCount / htmlLength) * 1000) / 10
    : 0;

  if (textToHtmlRatio < 10) {
    issues.push({
      code: 'LOW_TEXT_TO_HTML_RATIO',
      message: `Low text-to-HTML ratio (${textToHtmlRatio}%) - consider adding more content`,
      severity: 'warning',
    });
  }

  // Readability score
  const readabilityScore = calculateReadabilityScore(bodyText);

  // Keyword density
  const keywordDensity = calculateKeywordDensity(bodyText);

  // Check for keyword stuffing (density > 5%)
  for (const entry of keywordDensity) {
    if (entry.density > 5) {
      issues.push({
        code: 'KEYWORD_STUFFING',
        message: `Possible keyword stuffing: "${entry.word}" (${entry.density}% density)`,
        severity: 'warning',
        field: 'keywordDensity',
      });
    }
  }

  // Word count check
  if (wordCount < 300) {
    issues.push({
      code: 'LOW_WORD_COUNT',
      message: `Low word count (${wordCount} words) - consider adding more content (minimum 300 words recommended)`,
      severity: 'warning',
    });
  }

  return {
    wordCount,
    charCount,
    paragraphCount,
    avgSentenceLength,
    textToHtmlRatio,
    readabilityScore,
    keywordDensity,
    issues,
  };
}
