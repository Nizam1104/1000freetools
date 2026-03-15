/**
 * Images Analyser
 * Analyzes alt text, filenames, formats, lazy loading, decorative images
 */

import type { Issue, ImageInfo } from '../types';

export interface ImagesResult {
  imageCount: number;
  imagesWithoutAlt: number;
  images: ImageInfo[];
  issues: Issue[];
}

const NON_DESCRIPTIVE_PATTERNS = [
  /^(img|image|photo|dsc|pic|screenshot|capture|untitled|default|placeholder|banner|hero|logo)[-_]?\d*$/i,
  /^[\da-f]{8,}$/i, // Hash-like filenames (e.g., a1b2c3d4.jpg)
  /^[_-]{2,}/, // Files starting with multiple underscores or dashes
  /^\d{4}[-_]?\d{2}[-_]?\d{2}/i, // Date-based filenames (e.g., 2024-01-15)
  /^copy[\d]*_?/i, // Copy, copy1, copy2, etc.
  /^new[-_]?/i, // new, new-image, etc.
  /^temp[-_]?/i, // temp, temp-file, etc.
  /^test[-_]?/i, // test, test-image, etc.
  /^upload[-_]?/i, // upload, upload-file, etc.
  /^download[-_]?/i, // download, download-file, etc.
];

function getImageFormat(src: string): string {
  try {
    const url = new URL(src, 'http://example.com');
    const pathname = url.pathname.toLowerCase();
    const ext = pathname.split('.').pop() ?? '';
    return ext || 'unknown';
  } catch {
    return 'unknown';
  }
}

function hasDescriptiveFilename(src: string): boolean {
  try {
    const url = new URL(src, 'http://example.com');
    const pathname = url.pathname;
    const filename = pathname.split('/').pop()?.split('.')[0] ?? '';
    
    if (!filename || filename.length === 0) {
      return false;
    }
    
    // Check against all non-descriptive patterns
    for (const pattern of NON_DESCRIPTIVE_PATTERNS) {
      if (pattern.test(filename)) {
        return false;
      }
    }
    
    return true;
  } catch {
    return false;
  }
}

export function analyseImages(doc: Document): ImagesResult {
  const issues: Issue[] = [];
  const imgElements = Array.from(doc.querySelectorAll('img'));

  const images: ImageInfo[] = imgElements.map((el) => {
    const src = el.getAttribute('src') ?? '';
    const alt = el.getAttribute('alt') ?? '';
    const hasAlt = el.hasAttribute('alt');
    const altLength = alt.length;
    const isDecorative = hasAlt && alt === '';
    const filename = src.split('/').pop()?.split('?')[0] ?? '';
    const descriptiveFilename = hasDescriptiveFilename(src);
    const hasLazyLoad = el.getAttribute('loading') === 'lazy';
    const format = getImageFormat(src);
    // Read width/height from HTML attributes, not DOM properties (which return 0 in parsed DOM)
    const widthAttr = el.getAttribute('width');
    const heightAttr = el.getAttribute('height');
    const width = widthAttr ? parseInt(widthAttr, 10) || undefined : undefined;
    const height = heightAttr ? parseInt(heightAttr, 10) || undefined : undefined;

    return {
      src,
      alt,
      hasAlt,
      altLength,
      isDecorative,
      filename,
      hasDescriptiveFilename: descriptiveFilename,
      hasLazyLoad,
      format,
      width,
      height,
    };
  });

  const imagesWithoutAlt = images.filter((img) => !img.hasAlt).length;
  const imagesWithEmptyAlt = images.filter((img) => img.isDecorative).length;
  const imagesWithNonDescriptiveFilename = images.filter((img) => !img.hasDescriptiveFilename && !img.isDecorative).length;
  const imagesWithoutLazyLoad = images.filter((img) => !img.hasLazyLoad).length;
  const nonOptimizedFormats = images.filter((img) =>
    !img.isDecorative &&
    img.format !== 'unknown' &&
    !['webp', 'avif', 'svg'].includes(img.format)
  ).length;

  // Issues
  if (imagesWithoutAlt > 0) {
    issues.push({
      code: 'MISSING_ALT_TEXT',
      message: `${imagesWithoutAlt} image(s) missing alt attribute`,
      severity: 'critical',
    });
  }

  // Check for very short alt text (< 10 chars, excluding decorative)
  const shortAltImages = images.filter((img) =>
    img.hasAlt && !img.isDecorative && img.altLength > 0 && img.altLength < 10
  );
  if (shortAltImages.length > 0) {
    issues.push({
      code: 'SHORT_ALT_TEXT',
      message: `${shortAltImages.length} image(s) with very short alt text (< 10 characters)`,
      severity: 'warning',
    });
  }

  // Check for very long alt text (> 125 chars)
  const longAltImages = images.filter((img) => img.altLength > 125);
  if (longAltImages.length > 0) {
    issues.push({
      code: 'LONG_ALT_TEXT',
      message: `${longAltImages.length} image(s) with very long alt text (> 125 characters)`,
      severity: 'notice',
    });
  }

  if (imagesWithNonDescriptiveFilename > 0) {
    issues.push({
      code: 'NON_DESCRIPTIVE_IMAGE_FILENAME',
      message: `${imagesWithNonDescriptiveFilename} image(s) with non-descriptive filenames`,
      severity: 'notice',
    });
  }

  if (imagesWithoutLazyLoad > 5 && images.length > 5) {
    issues.push({
      code: 'MISSING_LAZY_LOADING',
      message: `${imagesWithoutLazyLoad} images could benefit from lazy loading`,
      severity: 'notice',
    });
  }

  if (nonOptimizedFormats > 0) {
    issues.push({
      code: 'NON_OPTIMIZED_IMAGE_FORMAT',
      message: `${nonOptimizedFormats} image(s) not in modern format (WebP/AVIF)`,
      severity: 'notice',
    });
  }

  return {
    imageCount: images.length,
    imagesWithoutAlt,
    images,
    issues,
  };
}
