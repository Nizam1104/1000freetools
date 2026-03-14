/**
 * TF-IDF Analysis and Topic Clustering
 * 
 * Computes Term Frequency-Inverse Document Frequency across all crawled pages
 * to identify important terms and topic clusters.
 */

import type { PageData } from '../types';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TfIdfEntry {
  term: string;
  tf: number;        // Term frequency in this document
  idf: number;       // Inverse document frequency
  tfidf: number;     // TF-IDF score
}

export interface PageTfIdf {
  url: string;
  terms: TfIdfEntry[];
  topTerms: string[];
}

export interface TopicCluster {
  topic: string;
  pages: string[];
  avgScore: number;
}

// ─── Stop Words ───────────────────────────────────────────────────────────────

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he',
  'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'were', 'will',
  'with', 'this', 'but', 'they', 'have', 'had', 'what', 'when', 'where', 'who',
  'which', 'why', 'how', 'all', 'each', 'every', 'both', 'few', 'more', 'most',
  'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so',
  'than', 'too', 'very', 'can', 'just', 'should', 'now', 'also', 'into', 'then',
  'there', 'their', 'them', 'these', 'those', 'through', 'would', 'about', 'after',
  'again', 'against', 'before', 'below', 'between', 'during', 'out', 'over',
  'under', 'above', 'further', 'once', 'here', 'until', 'while', 'up', 'down',
  'off', 'or', 'and', 'if', 'because', 'until', 'although', 'though', 'since',
  'unless', 'whether', 'while', 'where', 'whereas', 'wherever', 'everywhere',
  'somewhere', 'anywhere', 'nowhere', 'anyway', 'however', 'therefore', 'thus',
  'hence', 'accordingly', 'consequently', 'nevertheless', 'nonetheless',
  'notwithstanding', 'meanwhile', 'otherwise', 'instead', 'rather', 'either',
  'neither', 'both', 'whether', 'among', 'alongside', 'amid', 'amidst',
]);

// ─── Helper Functions ─────────────────────────────────────────────────────────

/**
 * Tokenize text into words
 */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')  // Remove punctuation
    .split(/\s+/)               // Split on whitespace
    .filter(word => 
      word.length > 2 && !STOP_WORDS.has(word) && !/^\d+$/.test(word)
    );
}

/**
 * Calculate term frequency for a document
 */
function calculateTermFrequency(tokens: string[]): Map<string, number> {
  const tf = new Map<string, number>();
  
  for (const token of tokens) {
    tf.set(token, (tf.get(token) || 0) + 1);
  }
  
  // Normalize by document length
  const totalTokens = tokens.length;
  if (totalTokens > 0) {
    for (const [term, count] of tf.entries()) {
      tf.set(term, count / totalTokens);
    }
  }
  
  return tf;
}

/**
 * Calculate inverse document frequency
 */
function calculateIdf(
  term: string,
  documentTokens: Map<string, number>[]
): number {
  const numDocumentsContainingTerm = documentTokens.filter(doc =>
    doc.has(term)
  ).length;
  
  if (numDocumentsContainingTerm === 0) return 0;
  
  // IDF = log(N / df) where N = total docs, df = docs containing term
  return Math.log(documentTokens.length / numDocumentsContainingTerm);
}

/**
 * Calculate cosine similarity between two TF-IDF vectors
 */
function cosineSimilarity(
  vecA: Map<string, number>,
  vecB: Map<string, number>
): number {
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;
  
  // Calculate dot product and magnitude of A
  for (const [term, score] of vecA.entries()) {
    dotProduct += score * (vecB.get(term) || 0);
    magnitudeA += score * score;
  }
  
  // Calculate magnitude of B
  for (const score of vecB.values()) {
    magnitudeB += score * score;
  }
  
  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);
  
  if (magnitudeA === 0 || magnitudeB === 0) return 0;
  
  return dotProduct / (magnitudeA * magnitudeB);
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Compute TF-IDF for all pages
 */
export function computeTfIdf(pages: PageData[]): PageTfIdf[] {
  if (pages.length === 0) return [];
  
  // Tokenize all pages
  const documentTokens = pages.map(page => {
    const text = [
      page.title,
      page.metaDescription,
      ...page.h1s,
      ...page.h2s,
      ...page.h3s,
    ].join(' ');
    return tokenize(text);
  });
  
  // Calculate TF for each document
  const termFrequencies = documentTokens.map(tokens =>
    calculateTermFrequency(tokens)
  );
  
  // Get all unique terms across all documents
  const allTerms = new Set<string>();
  for (const tf of termFrequencies) {
    for (const term of tf.keys()) {
      allTerms.add(term);
    }
  }
  
  // Calculate IDF for each term
  const idfMap = new Map<string, number>();
  for (const term of allTerms) {
    idfMap.set(term, calculateIdf(term, termFrequencies));
  }
  
  // Calculate TF-IDF for each page
  const results: PageTfIdf[] = pages.map((page, docIndex) => {
    const tf = termFrequencies[docIndex];
    const tfidfEntries: TfIdfEntry[] = [];
    
    for (const [term, termFreq] of tf.entries()) {
      const idf = idfMap.get(term) || 0;
      tfidfEntries.push({
        term,
        tf: termFreq,
        idf,
        tfidf: termFreq * idf,
      });
    }
    
    // Sort by TF-IDF score descending
    tfidfEntries.sort((a, b) => b.tfidf - a.tfidf);
    
    return {
      url: page.url,
      terms: tfidfEntries,
      topTerms: tfidfEntries.slice(0, 10).map(e => e.term),
    };
  });
  
  return results;
}

/**
 * Get site-wide top terms by average TF-IDF
 */
export function getSiteWideTopTerms(
  pageTfIdfs: PageTfIdf[],
  limit = 20
): TfIdfEntry[] {
  const termScores = new Map<string, { total: number; count: number }>();
  
  // Aggregate TF-IDF scores across all pages
  for (const pageTfIdf of pageTfIdfs) {
    for (const entry of pageTfIdf.terms) {
      const existing = termScores.get(entry.term) || { total: 0, count: 0 };
      existing.total += entry.tfidf;
      existing.count += 1;
      termScores.set(entry.term, existing);
    }
  }
  
  // Calculate average TF-IDF per term
  const averaged: TfIdfEntry[] = [];
  for (const [term, { total, count }] of termScores.entries()) {
    averaged.push({
      term,
      tf: 0,
      idf: 0,
      tfidf: total / count,
    });
  }
  
  // Sort and return top terms
  return averaged
    .sort((a, b) => b.tfidf - a.tfidf)
    .slice(0, limit);
}

/**
 * Cluster pages by topic similarity using cosine similarity on TF-IDF vectors
 */
export function clusterPagesByTopic(
  pages: PageData[],
  pageTfIdfs: PageTfIdf[],
  similarityThreshold = 0.6
): TopicCluster[] {
  if (pages.length < 2) return [];
  
  // Build TF-IDF vectors map
  const vectors = new Map<string, Map<string, number>>();
  for (const pageTfIdf of pageTfIdfs) {
    const vector = new Map<string, number>();
    for (const entry of pageTfIdf.terms) {
      vector.set(entry.term, entry.tfidf);
    }
    vectors.set(pageTfIdf.url, vector);
  }
  
  // Track clustered pages
  const clustered = new Set<string>();
  const clusters: TopicCluster[] = [];
  
  // Group similar pages
  for (const pageTfIdf of pageTfIdfs) {
    if (clustered.has(pageTfIdf.url)) continue;
    
    const clusterPages = [pageTfIdf.url];
    const vecA = vectors.get(pageTfIdf.url)!;
    
    for (const other of pageTfIdfs) {
      if (clustered.has(other.url) || other.url === pageTfIdf.url) continue;
      
      const vecB = vectors.get(other.url)!;
      const similarity = cosineSimilarity(vecA, vecB);
      
      if (similarity >= similarityThreshold) {
        clusterPages.push(other.url);
      }
    }
    
    if (clusterPages.length > 1) {
      clusterPages.forEach(url => clustered.add(url));
      
      // Determine topic name from most common top term
      const topic = pageTfIdf.topTerms[0] || 'General';
      
      clusters.push({
        topic,
        pages: clusterPages,
        avgScore: 0, // Could calculate average similarity
      });
    }
  }
  
  return clusters;
}

/**
 * Find pages most similar to a target page based on TF-IDF
 */
export function findSimilarPages(
  targetUrl: string,
  pageTfIdfs: PageTfIdf[],
  limit = 5
): { url: string; similarity: number }[] {
  const target = pageTfIdfs.find(p => p.url === targetUrl);
  if (!target) return [];
  
  const targetVector = new Map<string, number>();
  for (const entry of target.terms) {
    targetVector.set(entry.term, entry.tfidf);
  }
  
  const similarities: { url: string; similarity: number }[] = [];
  
  for (const pageTfIdf of pageTfIdfs) {
    if (pageTfIdf.url === targetUrl) continue;
    
    const otherVector = new Map<string, number>();
    for (const entry of pageTfIdf.terms) {
      otherVector.set(entry.term, entry.tfidf);
    }
    
    const similarity = cosineSimilarity(targetVector, otherVector);
    similarities.push({ url: pageTfIdf.url, similarity });
  }
  
  return similarities
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);
}
