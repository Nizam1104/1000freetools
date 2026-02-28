// Color utility functions shared across color tools

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export interface HSV {
  h: number;
  s: number;
  v: number;
}

export interface CMYK {
  c: number;
  m: number;
  y: number;
  k: number;
}

export interface LabColor {
  l: number;
  a: number;
  b: number;
}

// Convert HEX to RGB
export const hexToRgb = (hex: string): RGB | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return null;
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
};

// Convert RGB to HEX
export const rgbToHex = (r: number, g: number, b: number): string => {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
};

// Convert RGB to HSL
export const rgbToHsl = (r: number, g: number, b: number): HSL => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

// Convert HSL to RGB
export const hslToRgb = (h: number, s: number, l: number): RGB => {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  return {
    r: Math.round(255 * f(0)),
    g: Math.round(255 * f(8)),
    b: Math.round(255 * f(4)),
  };
};

// Convert HEX to HSL
export const hexToHsl = (hex: string): HSL | null => {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  return rgbToHsl(rgb.r, rgb.g, rgb.b);
};

// Convert HSL to HEX
export const hslToHex = (h: number, s: number, l: number): string => {
  const rgb = hslToRgb(h, s, l);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
};

// Convert RGB to HSV
export const rgbToHsv = (r: number, g: number, b: number): HSV => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  const v = max;
  const s = max === 0 ? 0 : d / max;
  let h = 0;

  if (max !== min) {
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  };
};

// Convert HSV to RGB
export const hsvToRgb = (h: number, s: number, v: number): RGB => {
  s /= 100;
  v /= 100;
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r = 0, g = 0, b = 0;

  if (h < 60) { r = c; g = x; b = 0; }
  else if (h < 120) { r = x; g = c; b = 0; }
  else if (h < 180) { r = 0; g = c; b = x; }
  else if (h < 240) { r = 0; g = x; b = c; }
  else if (h < 300) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
};

// Convert RGB to CMYK
export const rgbToCmyk = (r: number, g: number, b: number): CMYK => {
  r /= 255;
  g /= 255;
  b /= 255;
  const k = 1 - Math.max(r, g, b);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  const c = (1 - r - k) / (1 - k);
  const m = (1 - g - k) / (1 - k);
  const y = (1 - b - k) / (1 - k);
  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100),
  };
};

// Convert HEX to CMYK
export const hexToCmyk = (hex: string): CMYK | null => {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  return rgbToCmyk(rgb.r, rgb.g, rgb.b);
};

// Get luminance of a color (for WCAG contrast)
export const getLuminance = (r: number, g: number, b: number): number => {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

// Calculate contrast ratio between two colors (WCAG)
export const getContrastRatio = (color1: RGB, color2: RGB): number => {
  const l1 = getLuminance(color1.r, color1.g, color1.b);
  const l2 = getLuminance(color2.r, color2.g, color2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
};

// Check if color meets WCAG AA standard
export const meetsWcagAA = (ratio: number, largeText = false): boolean => {
  return largeText ? ratio >= 3 : ratio >= 4.5;
};

// Check if color meets WCAG AAA standard
export const meetsWcagAAA = (ratio: number, largeText = false): boolean => {
  return largeText ? ratio >= 4.5 : ratio >= 7;
};

// Get complementary color
export const getComplementaryColor = (hex: string): string | null => {
  const hsl = hexToHsl(hex);
  if (!hsl) return null;
  const newHue = (hsl.h + 180) % 360;
  return hslToHex(newHue, hsl.s, hsl.l);
};

// Get analogous colors
export const getAnalogousColors = (hex: string, count = 2): string[] => {
  const hsl = hexToHsl(hex);
  if (!hsl) return [];
  const colors: string[] = [hex];
  const step = 30;
  for (let i = 1; i <= count; i++) {
    const hue = (hsl.h + step * i) % 360;
    colors.push(hslToHex(hue, hsl.s, hsl.l));
  }
  return colors;
};

// Get triadic colors
export const getTriadicColors = (hex: string): string[] => {
  const hsl = hexToHsl(hex);
  if (!hsl) return [];
  return [
    hex,
    hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l),
    hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l),
  ];
};

// Get split complementary colors
export const getSplitComplementaryColors = (hex: string): string[] => {
  const hsl = hexToHsl(hex);
  if (!hsl) return [];
  return [
    hex,
    hslToHex((hsl.h + 150) % 360, hsl.s, hsl.l),
    hslToHex((hsl.h + 210) % 360, hsl.s, hsl.l),
  ];
};

// Get tetradic colors
export const getTetradicColors = (hex: string): string[] => {
  const hsl = hexToHsl(hex);
  if (!hsl) return [];
  return [
    hex,
    hslToHex((hsl.h + 90) % 360, hsl.s, hsl.l),
    hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l),
    hslToHex((hsl.h + 270) % 360, hsl.s, hsl.l),
  ];
};

// Generate shades (darker versions)
export const generateShades = (hex: string, count = 5): string[] => {
  const hsl = hexToHsl(hex);
  if (!hsl) return [];
  const shades: string[] = [];
  const step = hsl.l / (count + 1);
  for (let i = 1; i <= count; i++) {
    shades.push(hslToHex(hsl.h, hsl.s, Math.round(hsl.l - step * i)));
  }
  return shades;
};

// Generate tints (lighter versions)
export const generateTints = (hex: string, count = 5): string[] => {
  const hsl = hexToHsl(hex);
  if (!hsl) return [];
  const tints: string[] = [];
  const step = (100 - hsl.l) / (count + 1);
  for (let i = 1; i <= count; i++) {
    tints.push(hslToHex(hsl.h, hsl.s, Math.round(hsl.l + step * i)));
  }
  return tints;
};

// Generate tones (desaturated versions)
export const generateTones = (hex: string, count = 5): string[] => {
  const hsl = hexToHsl(hex);
  if (!hsl) return [];
  const tones: string[] = [];
  const step = hsl.s / (count + 1);
  for (let i = 1; i <= count; i++) {
    tones.push(hslToHex(hsl.h, Math.round(hsl.s - step * i), hsl.l));
  }
  return tones;
};

// Determine if a color is warm or cool
export const isWarmColor = (hex: string): boolean => {
  const hsl = hexToHsl(hex);
  if (!hsl) return false;
  // Warm colors: red, orange, yellow (0-60 and 300-360)
  // Cool colors: green, blue, purple (60-300)
  return hsl.h < 60 || hsl.h > 300;
};

// Get color temperature description
export const getColorTemperature = (hex: string): {
  isWarm: boolean;
  description: string;
  hueRange: string;
} => {
  const hsl = hexToHsl(hex);
  if (!hsl) {
    return { isWarm: false, description: "Unknown", hueRange: "" };
  }

  const hue = hsl.h;
  let description = "";
  let hueRange = "";

  if (hue >= 0 && hue < 15) {
    description = "Warm - Red";
    hueRange = "0°-15°";
  } else if (hue >= 15 && hue < 45) {
    description = "Warm - Orange";
    hueRange = "15°-45°";
  } else if (hue >= 45 && hue < 60) {
    description = "Warm - Yellow";
    hueRange = "45°-60°";
  } else if (hue >= 60 && hue < 150) {
    description = "Cool - Green";
    hueRange = "60°-150°";
  } else if (hue >= 150 && hue < 270) {
    description = "Cool - Blue";
    hueRange = "150°-270°";
  } else if (hue >= 270 && hue < 300) {
    description = "Cool - Purple";
    hueRange = "270°-300°";
  } else {
    description = "Warm - Magenta/Red";
    hueRange = "300°-360°";
  }

  return {
    isWarm: isWarmColor(hex),
    description,
    hueRange,
  };
};

// Get readable text color for a background
export const getReadableTextColor = (bgHex: string): string => {
  const rgb = hexToRgb(bgHex);
  if (!rgb) return "#000000";
  const luminance = getLuminance(rgb.r, rgb.g, rgb.b);
  return luminance > 0.179 ? "#000000" : "#FFFFFF";
};

// Extract dominant colors from image data
export const extractDominantColors = (
  imageData: ImageData,
  colorCount = 5
): { hex: string; percentage: number }[] => {
  const colorMap = new Map<string, number>();
  const totalPixels = imageData.width * imageData.height;

  // Sample pixels (skip some for performance)
  const sampleRate = Math.max(1, Math.floor(totalPixels / 10000));

  for (let i = 0; i < imageData.data.length; i += 4 * sampleRate) {
    const r = imageData.data[i];
    const g = imageData.data[i + 1];
    const b = imageData.data[i + 2];
    const a = imageData.data[i + 3];

    // Skip transparent pixels
    if (a < 128) continue;

    // Quantize colors to reduce variations
    const qr = Math.round(r / 16) * 16;
    const qg = Math.round(g / 16) * 16;
    const qb = Math.round(b / 16) * 16;

    const hex = rgbToHex(qr, qg, qb);
    colorMap.set(hex, (colorMap.get(hex) || 0) + 1);
  }

  // Sort by frequency
  const sorted = Array.from(colorMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, colorCount * 3);

  // Further refine by clustering similar colors
  const dominantColors: { hex: string; count: number }[] = [];

  for (const [hex, count] of sorted) {
    const rgb = hexToRgb(hex);
    if (!rgb) continue;

    let foundSimilar = false;
    for (const existing of dominantColors) {
      const existingRgb = hexToRgb(existing.hex);
      if (!existingRgb) continue;

      const distance = Math.sqrt(
        Math.pow(rgb.r - existingRgb.r, 2) +
          Math.pow(rgb.g - existingRgb.g, 2) +
          Math.pow(rgb.b - existingRgb.b, 2)
      );

      if (distance < 50) {
        existing.count += count;
        foundSimilar = true;
        break;
      }
    }

    if (!foundSimilar) {
      dominantColors.push({ hex, count });
    }
  }

  // Sort and calculate percentages
  const total = dominantColors.reduce((sum, c) => sum + c.count, 0);
  return dominantColors
    .sort((a, b) => b.count - a.count)
    .slice(0, colorCount)
    .map((c) => ({
      hex: c.hex,
      percentage: Math.round((c.count / total) * 100),
    }));
};

// Convert RGB to Lab color space
export const rgbToLab = (r: number, g: number, b: number): LabColor => {
  // First convert to XYZ
  let rs = r / 255;
  let gs = g / 255;
  let bs = b / 255;

  rs = rs > 0.04045 ? Math.pow((rs + 0.055) / 1.055, 2.4) : rs / 12.92;
  gs = gs > 0.04045 ? Math.pow((gs + 0.055) / 1.055, 2.4) : gs / 12.92;
  bs = bs > 0.04045 ? Math.pow((bs + 0.055) / 1.055, 2.4) : bs / 12.92;

  rs *= 100;
  gs *= 100;
  bs *= 100;

  const x = rs * 0.4124 + gs * 0.3576 + bs * 0.1805;
  const y = rs * 0.2126 + gs * 0.7152 + bs * 0.0722;
  const z = rs * 0.0193 + gs * 0.1192 + bs * 0.9505;

  // Then convert XYZ to Lab
  const refX = 95.047;
  const refY = 100.0;
  const refZ = 108.883;

  const xr = x / refX;
  const yr = y / refY;
  const zr = z / refZ;

  const fx = xr > 0.008856 ? Math.pow(xr, 1 / 3) : 7.787 * xr + 16 / 116;
  const fy = yr > 0.008856 ? Math.pow(yr, 1 / 3) : 7.787 * yr + 16 / 116;
  const fz = zr > 0.008856 ? Math.pow(zr, 1 / 3) : 7.787 * zr + 16 / 116;

  return {
    l: 116 * fy - 16,
    a: 500 * (fx - fy),
    b: 200 * (fy - fz),
  };
};

// Calculate color distance (Delta E)
export const deltaE = (color1: RGB, color2: RGB): number => {
  const lab1 = rgbToLab(color1.r, color1.g, color1.b);
  const lab2 = rgbToLab(color2.r, color2.g, color2.b);

  return Math.sqrt(
    Math.pow(lab2.l - lab1.l, 2) +
      Math.pow(lab2.a - lab1.a, 2) +
      Math.pow(lab2.b - lab1.b, 2)
  );
};
