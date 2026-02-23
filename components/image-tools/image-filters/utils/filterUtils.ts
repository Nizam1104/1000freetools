/**
 * Utility functions for image filtering operations
 */

// Helper function for clamping values
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(max, Math.max(min, value));
};

// Apply improved Matrix Movie Green Effect
export const applyMatrixEffect = (data: Uint8ClampedArray) => {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // Very light desaturation (keep 95% original color)
    const gray = 0.3 * r + 0.59 * g + 0.11 * b;
    const r1 = r * 0.95 + gray * 0.05;
    const g1 = g * 0.95 + gray * 0.05;
    const b1 = b * 0.95 + gray * 0.05;
    
    // Extremely subtle green shift
    const r2 = r1 * 0.97;
    const g2 = g1 * 1.20; // Just 3% more green
    const b2 = b1 * 0.97;
    
    // Tiny green overlay
    data[i] = clamp(r2, 0, 255);
    data[i + 1] = clamp(g2 + 5, 0, 255); // Just +5 green
    data[i + 2] = clamp(b2, 0, 255);
  }
};


// Apply improved Mexico/Warm Desert Hollywood Filter
export const applyMexicoEffect = (data: Uint8ClampedArray) => {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // Step 1 — Boost warmth (orange/yellow tones) - reduced
    const rNew = r * 1.075 + g * 0.05;  // Less red boost
    const gNew = g * 1.025 + r * 0.025; // Minimal green boost
    const bNew = b * 0.875;              // Less blue reduction
    
    // Step 2 — Add warm orange overlay - halved
    data[i] = clamp(rNew + 12, 0, 255);     // Red + light orange overlay
    data[i + 1] = clamp(gNew + 8, 0, 255);  // Green + slight yellow
    data[i + 2] = clamp(bNew - 5, 0, 255);  // Blue - cool tones out
  }
  
  // Step 3 — Increase contrast slightly - reduced
  for (let i = 0; i < data.length; i += 4) {
    data[i] = clamp((data[i] - 128) * 1.05 + 128, 0, 255);
    data[i + 1] = clamp((data[i + 1] - 128) * 1.05 + 128, 0, 255);
    data[i + 2] = clamp((data[i + 2] - 128) * 1.05 + 128, 0, 255);
  }
};
