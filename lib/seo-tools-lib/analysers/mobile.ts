/**
 * Mobile SEO Analyser
 * Analyzes viewport, font size, tap targets, interstitials, horizontal scroll
 */

import type { Issue } from '../types';

export interface MobileResult {
  viewportMeta: string;
  hasMobileViewport: boolean;
  hasInterstitials: boolean;
  issues: Issue[];
}

export function analyseMobile(doc: Document): MobileResult {
  const issues: Issue[] = [];

  // Viewport Meta
  const viewportMeta =
    (doc.querySelector('meta[name="viewport"]') as HTMLMetaElement | null)?.content ?? '';

  const hasMobileViewport = viewportMeta.toLowerCase().includes('width=device-width');

  // Check for problematic viewport settings
  if (viewportMeta && !hasMobileViewport) {
    if (viewportMeta.includes('user-scalable=no')) {
      issues.push({
        code: 'VIEWPORT_ZOOM_DISABLED',
        message: 'Viewport disables user scaling (user-scalable=no)',
        severity: 'warning',
      });
    }
    if (viewportMeta.includes('maximum-scale=1') || viewportMeta.includes('maximum-scale=1.0')) {
      issues.push({
        code: 'VIEWPORT_MAX_SCALE_1',
        message: 'Viewport restricts maximum scale to 1',
        severity: 'warning',
      });
    }
  }

  // Interstitial/Popup Detection (heuristic)
  // Look for fixed/sticky position elements with high z-index that likely cover the viewport
  // Since we're in a parsed DOM (no layout engine), we check for common interstitial patterns
  const allElements = Array.from(doc.querySelectorAll('*'));
  let hasInterstitials = false;

  for (const el of allElements) {
    const style = (el as HTMLElement).style;
    const position = style.position;
    const zIndex = parseInt(style.zIndex || '0', 10);

    // Check for fixed/sticky elements with high z-index (common interstitial pattern)
    if (position === 'fixed' || position === 'sticky') {
      // High z-index suggests overlay behavior
      const hasHighZIndex = zIndex > 999;
      
      // Check for full-width/height coverage via inline styles
      const hasFullWidth = style.width === '100%' || style.width === '100vw' || 
                          style.minWidth === '100%' || style.minWidth === '100vw';
      const hasFullHeight = style.height === '100%' || style.height === '100vh' ||
                           style.minHeight === '100%' || style.minHeight === '100vh';
      
      // Check for common interstitial indicators
      const hasOverlayBackground = style.backgroundColor || style.background;
      const hasTopLeft = style.top === '0' || style.top === '0px';
      const hasLeftRight = style.left === '0' || style.left === '0px' || 
                          style.right === '0' || style.right === '0px';

      if (hasHighZIndex && (hasFullWidth || hasTopLeft) && (hasFullHeight || hasLeftRight)) {
        hasInterstitials = true;
        break;
      }
    }
  }

  // Also check for common interstitial HTML patterns (modal overlays, popups)
  if (!hasInterstitials) {
    const interstitialIndicators = doc.querySelectorAll(
      '[class*="modal"], [class*="overlay"], [class*="popup"], [class*="interstitial"], ' +
      '[class*="lightbox"], [class*="dialog"], [role="dialog"], [aria-modal="true"]'
    );
    if (interstitialIndicators.length > 0) {
      hasInterstitials = true;
    }
  }

  // Small Tap Targets Detection (heuristic based on inline styles)
  const clickableElements = Array.from(
    doc.querySelectorAll('a, button, [role="button"], input[type="button"], input[type="submit"]')
  );

  let smallTapTargets = 0;
  for (const el of clickableElements) {
    const style = (el as HTMLElement).style;
    const width = parseInt(style.width || '0', 10);
    const height = parseInt(style.height || '0', 10);

    if ((width > 0 && width < 44) || (height > 0 && height < 44)) {
      smallTapTargets++;
    }
  }

  if (smallTapTargets > 0) {
    issues.push({
      code: 'SMALL_TAP_TARGETS',
      message: `${smallTapTargets} clickable element(s) may be too small (< 44px)`,
      severity: 'warning',
    });
  }

  // Horizontal Scroll Detection (elements with fixed width > typical mobile viewport)
  let hasHorizontalScrollRisk = false;
  for (const el of allElements) {
    const style = (el as HTMLElement).style;
    const minWidth = parseInt(style.minWidth || '0', 10);
    const width = parseInt(style.width || '0', 10);

    if (minWidth > 768 || width > 768) {
      hasHorizontalScrollRisk = true;
      break;
    }
  }

  if (hasHorizontalScrollRisk) {
    issues.push({
      code: 'HORIZONTAL_SCROLL_RISK',
      message: 'Elements with fixed width may cause horizontal scrolling on mobile',
      severity: 'warning',
    });
  }

  return {
    viewportMeta,
    hasMobileViewport,
    hasInterstitials,
    issues,
  };
}
