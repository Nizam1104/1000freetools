/**
 * Duplicate Content Detection using Simhash Algorithm
 * 
 * Detects near-duplicate pages by computing simhash fingerprints
 * and grouping pages with similarity > 0.85.
 */

import type { PageData, DuplicateCluster } from '../types';

// ─── Simhash Implementation ───────────────────────────────────────────────────

/**
 * Generate 4-gram shingles from text
 */
function generateShingles(text: string, k = 4): string[] {
  const normalized = text
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
  
  if (normalized.length < k) return [normalized];
  
  const shingles: string[] = [];
  for (let i = 0; i <= normalized.length - k; i++) {
    shingles.push(normalized.slice(i, i + k));
  }
  return shingles;
}

/**
 * Simple hash function producing a 64-bit hash
 * Uses djb2 algorithm variant
 */
function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32-bit
  }
  return Math.abs(hash);
}

/**
 * Compute simhash fingerprint for a text
 * Returns a 64-bit integer represented as a number
 */
function computeSimhash(text: string): number {
  const shingles = generateShingles(text);
  const v = new Array(64).fill(0);
  
  for (const shingle of shingles) {
    const hash = hashString(shingle);
    for (let i = 0; i < 64; i++) {
      if ((hash & (1 << i)) !== 0) {
        v[i]++;
      } else {
        v[i]--;
      }
    }
  }
  
  let fingerprint = 0;
  for (let i = 0; i < 64; i++) {
    if (v[i] > 0) {
      fingerprint |= (1 << i);
    }
  }
  
  return fingerprint;
}

/**
 * Count number of set bits (Hamming weight)
 */
function countSetBits(n: number): number {
  let count = 0;
  while (n > 0) {
    count += n & 1;
    n >>>= 1;
  }
  return count;
}

/**
 * Calculate Hamming distance between two fingerprints
 */
function hammingDistance(a: number, b: number): number {
  return countSetBits(a ^ b);
}

/**
 * Calculate similarity between two fingerprints (0-1)
 * Based on Hamming distance over total bits
 */
function fingerprintSimilarity(a: number, b: number): number {
  const distance = hammingDistance(a, b);
  // 64 bits total, distance of 0 = identical, distance of 64 = completely different
  return 1 - distance / 64;
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Extract body text from PageData for comparison
 */
export function extractBodyText(page: PageData): string {
  // Combine meaningful content fields
  const parts = [
    page.title,
    page.metaDescription,
    ...page.h1s,
    ...page.h2s,
    ...page.h3s,
  ].filter(Boolean).join(' ');
  
  return parts.toLowerCase().trim();
}

/**
 * Find duplicate content clusters among crawled pages
 * 
 * @param pages - Array of PageData to analyze
 * @param threshold - Similarity threshold (0-1), default 0.85
 * @returns Array of DuplicateCluster groups
 */
export function findDuplicateContent(
  pages: PageData[],
  threshold = 0.85
): DuplicateCluster[] {
  if (pages.length < 2) return [];
  
  // Compute fingerprints for all pages
  const fingerprints = pages.map(page => ({
    url: page.url,
    fingerprint: computeSimhash(extractBodyText(page)),
  }));
  
  // Track which pages have been clustered
  const clustered = new Set<string>();
  const clusters: DuplicateCluster[] = [];
  
  // Compare all pairs
  for (let i = 0; i < fingerprints.length; i++) {
    const a = fingerprints[i];
    if (clustered.has(a.url)) continue;
    
    const clusterPages = [a.url];
    let minSimilarity = 1;
    
    for (let j = i + 1; j < fingerprints.length; j++) {
      const b = fingerprints[j];
      if (clustered.has(b.url)) continue;
      
      const similarity = fingerprintSimilarity(a.fingerprint, b.fingerprint);
      if (similarity >= threshold) {
        clusterPages.push(b.url);
        minSimilarity = Math.min(minSimilarity, similarity);
      }
    }
    
    // Only create cluster if more than one page
    if (clusterPages.length > 1) {
      clusterPages.forEach(url => clustered.add(url));
      clusters.push({
        pages: clusterPages,
        similarity: minSimilarity,
      });
    }
  }
  
  // Sort by similarity (highest first)
  return clusters.sort((a, b) => b.similarity - a.similarity);
}

/**
 * Check if two specific pages are duplicates
 */
export function arePagesDuplicate(
  pageA: PageData,
  pageB: PageData,
  threshold = 0.85
): { isDuplicate: boolean; similarity: number } {
  const hashA = computeSimhash(extractBodyText(pageA));
  const hashB = computeSimhash(extractBodyText(pageB));
  const similarity = fingerprintSimilarity(hashA, hashB);
  
  return {
    isDuplicate: similarity >= threshold,
    similarity,
  };
}
