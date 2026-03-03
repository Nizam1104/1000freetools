const fs = require("fs");
const path = require("path");

const toolMetadata = {
  // CSS Tools
  "animation-generator": {
    h1: "CSS Animation Generator",
    p: "Create CSS keyframe animations with live preview. Generate smooth, performant animations for web projects with customizable easing, duration, and iteration. Free online CSS animation builder.",
  },
  "aspect-ratio-calculator": {
    h1: "Aspect Ratio Calculator",
    p: "Calculate equivalent aspect ratios and generate CSS snippets for responsive design. Free online aspect ratio calculator for images, videos, and layouts.",
  },
  "background-noise-generator": {
    h1: "CSS Background Noise Generator",
    p: "Generate subtle noise and grain textures using CSS and SVG filters. Add depth and texture to backgrounds with this free online CSS noise generator.",
  },
  "border-radius-generator": {
    h1: "CSS Border Radius Generator",
    p: "Create asymmetric border-radius values with live preview. Generate organic, smooth corner shapes for modern UI design. Free online border radius tool.",
  },
  "box-shadow-generator": {
    h1: "CSS Box Shadow Generator",
    p: "Create multi-layer box shadows with blur, spread, and inset options. Generate beautiful shadows for buttons, cards, and UI elements. Free online CSS shadow tool.",
  },
  "clip-path-maker": {
    h1: "CSS Clip Path Maker",
    p: "Draw custom clip-path shapes — polygons, circles, ellipses — with visual editor. Generate CSS clip-path code instantly. Free online clip path generator.",
  },
  "color-contrast-checker": {
    h1: "Color Contrast Checker",
    p: "Test color combinations for WCAG AA and AAA accessibility compliance. Ensure readable text and UI colors. Free online color contrast checker for web designers.",
  },
  "color-converter": {
    h1: "CSS Color Converter",
    p: "Convert colors between HEX, RGB, HSL, HSV, OKLCH, and more. Get CSS-ready color values instantly. Free online CSS color converter for designers and developers.",
  },
  "color-palette-generator": {
    h1: "CSS Color Palette Generator",
    p: "Generate harmonious color palettes from images or color theory rules. Export CSS variables and Tailwind config. Free online color palette generator for web design.",
  },
  "css-button-generator": {
    h1: "CSS Button Generator",
    p: "Design beautiful buttons with hover effects, gradients, and shadows. Generate production-ready CSS button styles. Free online CSS button maker.",
  },
  "css-calc-builder": {
    h1: "CSS calc() Builder",
    p: "Build complex CSS calc() expressions visually. Create responsive calculations for widths, heights, margins, and more. Free online CSS calc builder.",
  },
  "css-counter-generator": {
    h1: "CSS Counter Generator",
    p: "Create custom counters for ordered and unordered lists. Generate CSS counter-reset and counter-increment code. Free online CSS counter tool.",
  },
  "css-filter-generator": {
    h1: "CSS Filter Generator",
    p: "Apply blur, brightness, contrast, hue-rotate, and more filters visually. Generate CSS filter code instantly. Free online CSS filter generator.",
  },
  "css-font-face-generator": {
    h1: "CSS @font-face Generator",
    p: "Upload custom fonts and generate @font-face CSS with all formats. Get cross-browser font embedding code. Free online font-face generator.",
  },
  "css-grid-generator": {
    h1: "CSS Grid Generator",
    p: "Create CSS Grid layouts visually. Generate grid-template-areas, gap, and responsive breakpoints. Free online CSS Grid layout builder.",
  },
  "css-loader-generator": {
    h1: "CSS Loader Generator",
    p: "Create pure CSS loading spinners, dots, and bars. Customize size, color, and animation speed. Free online CSS loader generator.",
  },
  "css-mesh-gradient-generator": {
    h1: "CSS Mesh Gradient Generator",
    p: "Create stunning multi-point mesh gradients with smooth color transitions. Generate CSS and SVG mesh gradients. Free online mesh gradient tool.",
  },
  "css-minifier": {
    h1: "CSS Minifier & Beautifier",
    p: "Minify CSS to reduce file size or beautify/format compressed CSS. Free online CSS minifier and prettifier for web developers.",
  },
  "css-pattern-generator": {
    h1: "CSS Pattern Generator",
    p: "Generate repeating patterns — stripes, dots, checkerboard, waves — using CSS and SVG. Free online CSS pattern generator for backgrounds.",
  },
  "css-playground": {
    h1: "CSS Playground",
    p: "Experiment with CSS properties in a live sandbox environment. Test styles, see instant results, and learn CSS interactively. Free online CSS playground.",
  },
  "css-shape-generator": {
    h1: "CSS Shape Generator",
    p: "Create triangles, arrows, speech bubbles, and more using pure CSS. Generate shape code instantly. Free online CSS shape maker.",
  },
  "css-spacing-scale-generator": {
    h1: "CSS Spacing Scale Generator",
    p: "Generate consistent spacing and size scales for design tokens. Create 4px, 8px, 16px base scales. Free online spacing scale generator.",
  },
  "css-specificity-calculator": {
    h1: "CSS Specificity Calculator",
    p: "Calculate CSS selector specificity scores instantly. Understand cascade priority and debug style conflicts. Free online specificity calculator.",
  },
  "css-transition-previewer": {
    h1: "CSS Transition Previewer",
    p: "Preview and compare CSS transition easing functions. Test built-in and custom cubic-bezier curves. Free online transition previewer.",
  },
  "css-variable-extractor": {
    h1: "CSS Variable Extractor",
    p: "Extract custom properties (CSS variables) from existing CSS code. Auto-generate :root declarations. Free online CSS variable extractor.",
  },
  "cubic-bezier-editor": {
    h1: "Cubic Bezier Editor",
    p: "Visually create custom cubic-bezier easing functions. Generate smooth, natural animations. Free online cubic-bezier editor for CSS transitions.",
  },
  "dark-mode-css-generator": {
    h1: "Dark Mode CSS Generator",
    p: "Generate prefers-color-scheme dark mode CSS from your color palette. Create accessible dark themes instantly. Free online dark mode CSS generator.",
  },
  "flexbox-playground": {
    h1: "Flexbox Playground",
    p: "Experiment with Flexbox properties interactively. Generate flex container and item CSS with live preview. Free online Flexbox learning tool.",
  },
  "fluid-space-calculator": {
    h1: "Fluid Space Calculator",
    p: "Generate clamp()-based responsive spacing that scales with viewport. Create fluid design systems. Free online fluid space calculator.",
  },
  "fluid-typography-calculator": {
    h1: "Fluid Typography Calculator",
    p: "Create responsive font sizes using CSS clamp() for smooth scaling between breakpoints. Free online fluid typography generator.",
  },
  "glassmorphism-generator": {
    h1: "Glassmorphism Generator",
    p: "Create glassmorphism effects with backdrop-filter, blur, and transparency. Generate modern frosted glass CSS. Free online glassmorphism generator.",
  },
  "google-fonts-pairing-tool": {
    h1: "Google Fonts Pairing Tool",
    p: "Discover and preview harmonious Google Fonts combinations. Find perfect heading and body pairings. Free online font pairing tool.",
  },
  "gradient-generator": {
    h1: "CSS Gradient Generator",
    p: "Create linear, radial, and conic gradients with live preview. Generate CSS gradient code for backgrounds and UI. Free online gradient maker.",
  },
  "letter-spacing-line-height-visualizer": {
    h1: "Letter Spacing & Line Height Visualizer",
    p: "Adjust and preview letter-spacing and line-height values for perfect typography rhythm. Free online type visualizer.",
  },
  "media-query-builder": {
    h1: "Media Query Builder",
    p: "Generate responsive CSS media queries visually. Pick breakpoints for mobile, tablet, and desktop. Free online media query generator.",
  },
  "neumorphism-generator": {
    h1: "Neumorphism Generator",
    p: "Create soft UI neumorphic effects with subtle shadows and highlights. Generate modern soft design CSS. Free online neumorphism generator.",
  },
  "print-css-helper": {
    h1: "Print CSS Helper",
    p: "Generate @print media query boilerplate for printer-friendly stylesheets. Free online print CSS generator.",
  },
  "px-rem-converter": {
    h1: "PX to REM Converter",
    p: "Convert pixels to REM and EM units with configurable root font size. Generate accessible, scalable CSS. Free online px to rem converter.",
  },
  "scroll-snap-builder": {
    h1: "Scroll Snap Builder",
    p: "Configure CSS scroll-snap properties for smooth scrolling sections. Generate scroll-snap-type and alignment code. Free online scroll snap generator.",
  },
  "text-shadow-generator": {
    h1: "CSS Text Shadow Generator",
    p: "Create multi-layer text shadows with blur, spread, and color. Generate beautiful text effects. Free online CSS text shadow generator.",
  },
  "tint-shade-generator": {
    h1: "Tint & Shade Generator",
    p: "Generate tints (lighter) and shades (darker) of any color across multiple steps. Build color scales for design systems. Free online tint shade tool.",
  },
  "viewport-unit-converter": {
    h1: "Viewport Unit Converter",
    p: "Convert between vw, vh, vmin, vmax, and px units. Generate responsive viewport-based CSS. Free online viewport unit converter.",
  },
};

// Data from pasted_text_1.txt
const converters = {
  // CSS Tools
  "animation-generator": { id: 114 },
  "aspect-ratio-calculator": { id: 115 },
  "background-noise-generator": { id: 116 },
  "border-radius-generator": { id: 117 },
  "box-shadow-generator": { id: 118 },
  "clip-path-maker": { id: 119 },
  "color-contrast-checker": { id: 120 },
  "color-converter": { id: 121 },
  "color-palette-generator": { id: 122 },
  "css-button-generator": { id: 123 },
  "css-calc-builder": { id: 124 },
  "css-counter-generator": { id: 125 },
  "css-filter-generator": { id: 126 },
  "css-font-face-generator": { id: 127 },
  "css-grid-generator": { id: 128 },
  "css-loader-generator": { id: 129 },
  "css-mesh-gradient-generator": { id: 130 },
  "css-minifier": { id: 131 },
  "css-pattern-generator": { id: 132 },
  "css-playground": { id: 133 },
  "css-shape-generator": { id: 134 },
  "css-spacing-scale-generator": { id: 135 },
  "css-specificity-calculator": { id: 136 },
  "css-transition-previewer": { id: 137 },
  "css-variable-extractor": { id: 138 },
  "cubic-bezier-editor": { id: 139 },
  "dark-mode-css-generator": { id: 140 },
  "flexbox-playground": { id: 141 },
  "fluid-space-calculator": { id: 142 },
  "fluid-typography-calculator": { id: 143 },
  "glassmorphism-generator": { id: 144 },
  "google-fonts-pairing-tool": { id: 145 },
  "gradient-generator": { id: 146 },
  "letter-spacing-line-height-visualizer": { id: 147 },
  "media-query-builder": { id: 148 },
  "neumorphism-generator": { id: 149 },
  "print-css-helper": { id: 150 },
  "px-rem-converter": { id: 151 },
  "scroll-snap-builder": { id: 152 },
  "text-shadow-generator": { id: 153 },
  "tint-shade-generator": { id: 154 },
  "viewport-unit-converter": { id: 155 },
};

const links = {
  // 1: Length
  1: [
    2, 5, 11, 17, 110, 76, 91, 92, 47, 84, 49, 12, 3, 10, 13, 25, 69, 70, 75,
    109, 94, 16, 18, 22, 23, 37, 55, 51, 32, 57,
  ],
  // 2: Weight and Mass
  2: [
    1, 19, 20, 37, 35, 107, 110, 78, 82, 69, 74, 94, 108, 24, 104, 31, 30, 3, 5,
    17, 42, 40, 41, 27, 9, 23, 36, 39, 95, 113,
  ],
  // 3: Volume
  3: [
    2, 15, 34, 1, 78, 79, 82, 19, 20, 70, 71, 74, 5, 81, 35, 36, 39, 40, 41, 83,
    25, 13, 31, 53, 76, 101, 102, 17, 30, 38,
  ],
  // 4: Temperature
  4: [
    26, 80, 29, 28, 30, 27, 33, 32, 103, 102, 6, 7, 10, 1, 2, 3, 31, 95, 5, 25,
    13, 40, 41, 42, 19, 9, 11, 22, 34, 8,
  ],
  // 5: Area
  5: [
    1, 76, 3, 73, 72, 70, 77, 2, 47, 84, 75, 69, 74, 32, 37, 52, 56, 104, 19,
    20, 17, 12, 101, 11, 10, 91, 92, 43, 55, 31,
  ],
  // 6: Pressure
  6: [
    9, 7, 8, 4, 17, 40, 41, 42, 43, 33, 32, 34, 35, 36, 1, 2, 3, 11, 22, 23, 57,
    58, 59, 19, 28, 29, 30, 31, 37, 5,
  ],
  // 7: Energy
  7: [
    8, 6, 9, 4, 17, 30, 31, 32, 29, 28, 95, 96, 97, 11, 2, 1, 3, 22, 23, 33, 10,
    5, 108, 113, 58, 57, 48, 49, 98, 27,
  ],
  // 8: Power
  8: [
    7, 6, 9, 17, 11, 34, 35, 22, 23, 32, 33, 29, 31, 4, 2, 1, 3, 58, 57, 48,
    113, 108, 10, 5, 30, 40, 41, 19, 28, 27,
  ],
  // 9: Force
  9: [
    6, 8, 7, 22, 23, 17, 1, 2, 11, 4, 16, 18, 21, 42, 19, 37, 32, 35, 40, 41, 3,
    5, 57, 55, 28, 29, 30, 27, 34, 113,
  ],
  // 10: Time
  10: [
    87, 88, 89, 90, 11, 16, 48, 85, 17, 18, 1, 2, 3, 99, 109, 86, 13, 34, 35,
    36, 25, 108, 91, 92, 4, 5, 7, 8, 12, 19,
  ],
  // 11: Speed
  11: [
    1, 10, 17, 16, 109, 100, 13, 25, 91, 92, 94, 12, 2, 5, 3, 18, 22, 23, 34,
    35, 48, 85, 108, 9, 6, 19, 40, 41, 37, 4,
  ],
  // 12: Angle
  12: [
    16, 18, 1, 11, 17, 9, 22, 23, 21, 48, 99, 5, 49, 47, 84, 10, 2, 3, 91, 92,
    93, 19, 42, 55, 56, 57, 65, 66, 85, 13,
  ],
  // 13: Fuel Consumption
  13: [
    25, 24, 11, 1, 2, 3, 10, 5, 17, 8, 7, 34, 35, 19, 40, 41, 22, 23, 100, 109,
    6, 9, 113, 76, 70, 75, 4, 20, 31, 36,
  ],
  // 14: Data Storage
  14: [
    47, 84, 85, 86, 48, 87, 88, 10, 1, 2, 3, 5, 7, 8, 58, 59, 60, 61, 62, 63,
    64, 54, 50, 11, 17, 19, 34, 35, 99, 36,
  ],
  // 15: Dry Volume
  15: [
    3, 2, 1, 78, 82, 79, 5, 19, 34, 35, 81, 83, 70, 71, 74, 39, 38, 36, 40, 41,
    20, 31, 101, 104, 10, 17, 42, 30, 25, 13,
  ],
  // 16: Angular Velocity
  16: [
    18, 12, 11, 17, 9, 22, 23, 21, 48, 10, 1, 2, 8, 65, 66, 67, 68, 41, 42, 55,
    56, 57, 85, 99, 34, 35, 5, 3, 19, 40,
  ],
  // 17: Acceleration
  17: [
    11, 16, 18, 9, 1, 2, 10, 12, 22, 23, 6, 7, 8, 94, 35, 34, 5, 3, 21, 41, 40,
    42, 19, 37, 55, 57, 49, 91, 92, 113,
  ],
  // 18: Angular Acceleration
  18: [
    16, 12, 17, 9, 22, 23, 21, 11, 10, 1, 8, 48, 65, 66, 67, 68, 42, 41, 55, 56,
    57, 85, 99, 34, 35, 5, 19, 40, 2, 3,
  ],
  // 19: Density
  19: [
    2, 20, 3, 1, 5, 40, 41, 42, 43, 39, 38, 35, 37, 34, 30, 31, 29, 28, 27, 22,
    9, 6, 7, 17, 82, 104, 55, 56, 52, 53,
  ],
  // 20: Specific Volume
  20: [
    19, 3, 2, 40, 41, 30, 29, 28, 27, 34, 35, 36, 6, 7, 4, 33, 32, 31, 42, 43,
    1, 5, 17, 22, 9, 37, 55, 82, 39, 38,
  ],
  // 21: Moment of Inertia
  21: [
    22, 23, 9, 16, 18, 17, 12, 8, 7, 6, 1, 2, 5, 11, 10, 42, 40, 41, 19, 37, 55,
    65, 66, 67, 68, 34, 35, 57, 58, 113,
  ],
  // 22: Moment of Force
  22: [
    23, 9, 21, 17, 16, 18, 8, 7, 6, 12, 1, 2, 5, 11, 10, 42, 40, 41, 19, 37, 55,
    65, 66, 35, 34, 57, 58, 113, 3, 4,
  ],
  // 23: Torque
  23: [
    22, 9, 21, 17, 16, 18, 8, 7, 6, 12, 1, 2, 5, 11, 10, 42, 40, 41, 19, 37, 55,
    65, 66, 35, 34, 57, 58, 113, 3, 4,
  ],
  // 24: Fuel Efficiency Mass
  24: [
    25, 13, 2, 1, 11, 10, 35, 34, 19, 40, 41, 8, 7, 6, 3, 5, 17, 22, 23, 100,
    109, 36, 20, 31, 9, 82, 78, 70, 76, 113,
  ],
  // 25: Fuel Efficiency Volume
  25: [
    13, 24, 3, 1, 11, 10, 34, 35, 19, 40, 41, 8, 7, 6, 2, 5, 17, 22, 23, 100,
    109, 36, 20, 31, 9, 82, 70, 76, 39, 113,
  ],
  // 26: Temperature Interval
  26: [
    4, 28, 29, 30, 27, 33, 32, 31, 103, 102, 80, 7, 6, 8, 1, 2, 3, 5, 10, 19,
    40, 41, 9, 22, 34, 35, 36, 38, 42, 95,
  ],
  // 27: Thermal Expansion
  27: [
    28, 29, 30, 26, 4, 33, 32, 31, 19, 42, 40, 41, 6, 7, 8, 9, 1, 2, 3, 5, 17,
    22, 23, 35, 34, 43, 55, 57, 95, 103,
  ],
  // 28: Thermal Resistance
  28: [
    29, 30, 26, 27, 4, 33, 32, 31, 7, 8, 6, 19, 42, 40, 41, 1, 2, 3, 5, 17, 22,
    23, 35, 34, 43, 55, 57, 63, 64, 103,
  ],
  // 29: Thermal Conductivity
  29: [
    28, 30, 26, 27, 4, 33, 32, 31, 7, 8, 6, 19, 42, 40, 41, 1, 2, 3, 5, 17, 22,
    23, 35, 34, 43, 55, 57, 63, 64, 103,
  ],
  // 30: Specific Heat Capacity
  30: [
    29, 28, 26, 27, 4, 33, 32, 31, 7, 8, 6, 19, 42, 40, 41, 2, 38, 39, 3, 5, 35,
    34, 36, 20, 82, 78, 103, 95, 55, 17,
  ],
  // 31: Heat Density
  31: [
    32, 33, 29, 28, 30, 26, 27, 4, 7, 8, 6, 19, 3, 34, 35, 36, 2, 42, 40, 41, 1,
    5, 13, 25, 24, 95, 82, 20, 38, 39,
  ],
  // 32: Heat Flux Density
  32: [
    31, 33, 29, 28, 30, 26, 27, 4, 7, 8, 6, 19, 5, 34, 35, 37, 2, 42, 40, 41, 1,
    3, 52, 56, 57, 55, 95, 20, 101, 103,
  ],
  // 33: Heat Transfer Coefficient
  33: [
    32, 31, 29, 28, 30, 26, 27, 4, 7, 8, 6, 19, 5, 34, 35, 37, 2, 42, 40, 41, 1,
    3, 52, 56, 57, 55, 95, 102, 103, 20,
  ],
  // 34: Volumetric Flow Rate
  34: [
    35, 36, 37, 3, 11, 17, 1, 2, 5, 40, 41, 42, 43, 19, 20, 6, 8, 9, 22, 23, 13,
    25, 24, 32, 33, 55, 56, 57, 101, 102,
  ],
  // 35: Mass Flow Rate
  35: [
    34, 36, 37, 2, 11, 17, 1, 3, 5, 40, 41, 42, 43, 19, 20, 6, 8, 9, 22, 23, 13,
    25, 24, 32, 33, 55, 56, 57, 38, 39,
  ],
  // 36: Molar Flow Rate
  36: [
    35, 34, 37, 38, 39, 3, 2, 11, 17, 1, 5, 40, 41, 42, 43, 19, 20, 6, 8, 9, 30,
    32, 33, 55, 56, 57, 24, 25, 13, 15,
  ],
  // 37: Mass Flux Density
  37: [
    35, 34, 36, 32, 33, 2, 19, 40, 41, 42, 43, 5, 1, 3, 11, 17, 6, 8, 9, 22, 23,
    52, 56, 57, 55, 20, 30, 38, 39, 31,
  ],
  // 38: Molar Concentration
  38: [
    39, 36, 30, 19, 3, 2, 40, 41, 42, 34, 35, 37, 20, 5, 1, 6, 7, 8, 9, 17, 31,
    32, 33, 55, 56, 57, 52, 53, 95, 96,
  ],
  // 39: Solution Concentration
  39: [
    38, 36, 30, 19, 3, 2, 40, 41, 42, 34, 35, 37, 20, 5, 1, 6, 7, 8, 9, 17, 31,
    32, 33, 102, 103, 101, 52, 53, 95, 96,
  ],
  // 40: Dynamic Viscosity
  40: [
    41, 19, 20, 42, 43, 34, 35, 37, 6, 3, 2, 1, 5, 11, 17, 9, 8, 22, 23, 30, 29,
    28, 31, 32, 33, 36, 38, 39, 55, 57,
  ],
  // 41: Kinematic Viscosity
  41: [
    40, 19, 20, 42, 43, 34, 35, 37, 6, 3, 2, 1, 5, 11, 17, 9, 8, 22, 23, 30, 29,
    28, 31, 32, 33, 36, 38, 39, 55, 57,
  ],
  // 42: Surface Tension
  42: [
    40, 41, 19, 6, 9, 22, 23, 32, 33, 34, 35, 3, 2, 1, 5, 17, 43, 20, 37, 30,
    29, 28, 31, 38, 39, 55, 57, 27, 11, 8,
  ],
  // 43: Permeability
  43: [
    40, 41, 19, 3, 34, 35, 5, 6, 42, 37, 20, 1, 2, 17, 9, 22, 23, 31, 32, 33,
    38, 39, 29, 28, 30, 55, 57, 36, 11, 8,
  ],
  // 44: Luminance
  44: [
    45, 46, 47, 84, 5, 48, 49, 1, 2, 3, 10, 17, 11, 85, 12, 19, 42, 57, 58, 59,
    60, 61, 62, 63, 64, 98, 99, 32, 33, 55,
  ],
  // 45: Luminous Intensity
  45: [
    44, 46, 47, 84, 5, 48, 49, 1, 2, 3, 10, 17, 11, 85, 12, 19, 42, 57, 58, 59,
    60, 61, 62, 63, 64, 98, 99, 32, 33, 55,
  ],
  // 46: Illuminance
  46: [
    44, 45, 47, 84, 5, 48, 49, 1, 2, 3, 10, 17, 11, 85, 12, 19, 42, 57, 58, 59,
    60, 61, 62, 63, 64, 98, 99, 32, 33, 55,
  ],
  // 47: Digital Image Resolution
  47: [
    84, 85, 86, 14, 5, 1, 44, 45, 46, 48, 49, 10, 17, 11, 12, 2, 3, 87, 88, 58,
    59, 63, 64, 99, 98, 19, 42, 55, 57, 32,
  ],
  // 48: Frequency
  48: [
    49, 99, 16, 12, 98, 86, 85, 47, 10, 1, 2, 3, 5, 17, 11, 8, 7, 58, 59, 60,
    61, 62, 63, 64, 57, 55, 44, 45, 46, 87,
  ],
  // 49: Wavelength
  49: [
    48, 99, 16, 12, 98, 86, 85, 47, 10, 1, 2, 3, 5, 17, 11, 8, 7, 58, 59, 60,
    61, 62, 63, 64, 57, 55, 44, 45, 46, 91,
  ],
  // 50: Electric Charge
  50: [
    54, 58, 59, 60, 61, 62, 63, 64, 51, 52, 53, 57, 55, 56, 65, 66, 67, 68, 48,
    7, 8, 6, 10, 1, 2, 3, 17, 11, 96, 95,
  ],
  // 51: Linear Charge Density
  51: [
    50, 52, 53, 54, 57, 55, 56, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 48,
    7, 8, 6, 1, 2, 5, 17, 11, 10, 42, 37,
  ],
  // 52: Surface Charge Density
  52: [
    50, 51, 53, 54, 57, 55, 56, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 48,
    7, 8, 6, 5, 2, 1, 17, 37, 32, 42, 10,
  ],
  // 53: Volume Charge Density
  53: [
    50, 51, 52, 54, 57, 55, 56, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 48,
    7, 8, 6, 3, 19, 38, 17, 10, 34, 35, 42,
  ],
  // 54: Electric Current
  54: [
    58, 59, 60, 61, 62, 63, 64, 50, 55, 56, 57, 65, 66, 67, 68, 48, 7, 8, 6, 10,
    1, 2, 3, 17, 11, 96, 95, 32, 33, 42,
  ],
  // 55: Linear Current Density
  55: [
    54, 56, 57, 58, 59, 60, 61, 62, 63, 64, 50, 51, 52, 53, 65, 66, 67, 68, 48,
    7, 8, 6, 1, 2, 5, 17, 11, 10, 37, 42,
  ],
  // 56: Surface Current Density
  56: [
    54, 55, 57, 58, 59, 60, 61, 62, 63, 64, 50, 51, 52, 53, 65, 66, 67, 68, 48,
    7, 8, 6, 5, 2, 1, 17, 32, 37, 42, 10,
  ],
  // 57: Electric Field Strength
  57: [
    58, 59, 60, 61, 62, 54, 55, 56, 50, 51, 52, 53, 63, 64, 65, 66, 67, 68, 48,
    6, 7, 8, 1, 2, 5, 17, 11, 10, 9, 42,
  ],
  // 58: Electric Potential
  58: [
    59, 60, 61, 62, 54, 55, 56, 57, 50, 51, 52, 53, 63, 64, 65, 66, 67, 68, 48,
    7, 8, 6, 1, 2, 5, 17, 11, 10, 9, 42,
  ],
  // 59: Electric Resistance
  59: [
    60, 61, 62, 58, 54, 55, 56, 57, 50, 51, 52, 53, 63, 64, 65, 66, 67, 68, 48,
    7, 8, 6, 1, 2, 5, 17, 11, 10, 9, 42,
  ],
  // 60: Electric Resistivity
  60: [
    59, 61, 62, 58, 54, 55, 56, 57, 50, 51, 52, 53, 63, 64, 65, 66, 67, 68, 48,
    7, 8, 6, 19, 27, 29, 5, 1, 2, 17, 42,
  ],
  // 61: Electric Conductance
  61: [
    62, 59, 60, 58, 54, 55, 56, 57, 50, 51, 52, 53, 63, 64, 65, 66, 67, 68, 48,
    7, 8, 6, 1, 2, 5, 17, 11, 10, 39, 42,
  ],
  // 62: Electric Conductivity
  62: [
    61, 59, 60, 58, 54, 55, 56, 57, 50, 51, 52, 53, 63, 64, 65, 66, 67, 68, 48,
    7, 8, 6, 19, 39, 29, 5, 1, 2, 17, 42,
  ],
  // 63: Capacitance
  63: [
    64, 59, 60, 61, 62, 58, 54, 55, 56, 57, 50, 51, 52, 53, 65, 66, 67, 68, 48,
    7, 8, 6, 1, 2, 5, 17, 11, 10, 42, 28,
  ],
  // 64: Inductance
  64: [
    63, 59, 60, 61, 62, 58, 54, 55, 56, 57, 50, 51, 52, 53, 65, 66, 67, 68, 48,
    7, 8, 6, 1, 2, 5, 17, 11, 10, 42, 28,
  ],
  // 65: Magnetomotive Force
  65: [
    66, 67, 68, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 50, 51, 52, 53, 48,
    7, 8, 6, 16, 18, 21, 9, 1, 2, 5, 17,
  ],
  // 66: Magnetic Field Strength
  66: [
    67, 68, 65, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 50, 51, 52, 53, 48,
    7, 8, 6, 16, 18, 21, 9, 1, 2, 5, 17,
  ],
  // 67: Magnetic Flux
  67: [
    68, 66, 65, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 50, 51, 52, 53, 48,
    7, 8, 6, 16, 18, 21, 9, 5, 1, 2, 17,
  ],
  // 68: Magnetic Flux Density
  68: [
    67, 66, 65, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 50, 51, 52, 53, 48,
    7, 8, 6, 16, 18, 21, 9, 5, 1, 2, 17,
  ],
  // 69: Rebar Weight Calculator
  69: [
    2, 1, 70, 71, 72, 73, 74, 75, 76, 77, 5, 3, 9, 22, 23, 17, 19, 40, 41, 42,
    43, 6, 8, 7, 27, 29, 28, 30, 34, 35,
  ],
  // 70: Concrete Volume
  70: [
    71, 74, 72, 73, 69, 75, 76, 77, 3, 5, 1, 2, 19, 40, 41, 34, 35, 6, 8, 9, 22,
    23, 17, 27, 29, 28, 30, 42, 43, 20,
  ],
  // 71: Concrete Mix Ratio
  71: [
    70, 74, 72, 73, 69, 75, 76, 77, 3, 5, 1, 2, 19, 40, 41, 34, 35, 6, 8, 9, 22,
    23, 17, 30, 38, 39, 27, 29, 28, 42,
  ],
  // 72: Brick Calculator
  72: [
    73, 70, 71, 74, 69, 75, 76, 77, 5, 1, 2, 3, 19, 40, 41, 34, 35, 6, 8, 9, 22,
    23, 17, 27, 29, 28, 30, 42, 43, 20,
  ],
  // 73: Tile Calculator
  73: [
    72, 76, 5, 1, 2, 70, 71, 74, 69, 75, 77, 3, 19, 40, 41, 34, 35, 6, 8, 9, 22,
    23, 17, 27, 29, 28, 30, 42, 43, 20,
  ],
  // 74: Cement Sand Aggregate
  74: [
    71, 70, 72, 73, 69, 75, 76, 77, 3, 5, 1, 2, 19, 40, 41, 34, 35, 6, 8, 9, 22,
    23, 17, 30, 38, 39, 27, 29, 28, 42,
  ],
  // 75: Lumber Board Feet
  75: [
    1, 5, 76, 77, 69, 70, 71, 72, 73, 74, 2, 3, 9, 22, 23, 17, 19, 40, 41, 42,
    43, 6, 8, 7, 27, 29, 28, 30, 34, 35,
  ],
  // 76: Floor Area
  76: [
    5, 73, 72, 1, 70, 71, 74, 69, 75, 77, 2, 3, 19, 40, 41, 34, 35, 6, 8, 9, 22,
    23, 17, 27, 29, 28, 30, 42, 43, 20,
  ],
  // 77: Roofing Sheet Coverage
  77: [
    5, 76, 72, 73, 70, 71, 74, 69, 75, 1, 2, 3, 19, 40, 41, 34, 35, 6, 8, 9, 22,
    23, 17, 27, 29, 28, 30, 42, 43, 20,
  ],
  // 78: Cups to Grams
  78: [
    79, 82, 83, 80, 81, 2, 3, 15, 19, 30, 38, 39, 4, 26, 5, 1, 10, 34, 35, 36,
    40, 41, 20, 35, 108, 107, 74, 71, 70, 25,
  ],
  // 79: Cups to ml
  79: [
    78, 82, 83, 80, 81, 3, 15, 2, 19, 30, 38, 39, 4, 26, 5, 1, 10, 34, 35, 36,
    40, 41, 20, 108, 107, 74, 71, 70, 25, 101,
  ],
  // 80: Oven Temperature
  80: [
    4, 26, 78, 79, 82, 83, 81, 2, 3, 15, 19, 30, 38, 39, 5, 1, 10, 34, 35, 29,
    28, 27, 33, 32, 31, 108, 107, 103, 102, 40,
  ],
  // 81: Baking Pan Size
  81: [
    78, 79, 80, 82, 83, 5, 3, 2, 15, 19, 30, 38, 39, 4, 26, 1, 10, 34, 35, 40,
    41, 20, 76, 70, 73, 72, 108, 107, 25, 101,
  ],
  // 82: Ingredient Density
  82: [
    78, 79, 80, 81, 83, 2, 3, 15, 19, 30, 38, 39, 4, 26, 5, 1, 10, 34, 35, 40,
    41, 20, 108, 107, 25, 101, 74, 71, 70, 36,
  ],
  // 83: Sourdough Hydration
  83: [
    78, 79, 80, 81, 82, 2, 3, 15, 19, 30, 38, 39, 4, 26, 5, 1, 10, 34, 35, 40,
    41, 20, 108, 107, 25, 101, 74, 71, 70, 36,
  ],
  // 84: Image DPI
  84: [
    47, 85, 86, 14, 5, 1, 44, 45, 46, 48, 49, 10, 17, 11, 12, 2, 3, 87, 88, 58,
    59, 63, 64, 99, 98, 19, 42, 55, 57, 32,
  ],
  // 85: Video Frame Rate
  85: [
    86, 84, 47, 14, 48, 49, 10, 87, 88, 99, 98, 1, 2, 3, 5, 17, 11, 12, 58, 59,
    63, 64, 44, 45, 46, 19, 42, 55, 57, 32,
  ],
  // 86: Audio Bitrate
  86: [
    85, 84, 47, 14, 48, 49, 10, 87, 88, 99, 98, 1, 2, 3, 5, 17, 11, 12, 58, 59,
    63, 64, 44, 45, 46, 19, 42, 55, 57, 32,
  ],
  // 87: Unix Timestamp
  87: [
    88, 89, 90, 10, 48, 85, 86, 14, 1, 2, 3, 5, 17, 11, 12, 84, 47, 58, 59, 63,
    64, 99, 98, 44, 45, 46, 19, 42, 55, 57,
  ],
  // 88: Time Duration Calculator
  88: [
    87, 89, 90, 10, 48, 85, 86, 14, 1, 2, 3, 5, 17, 11, 12, 84, 47, 58, 59, 63,
    64, 99, 98, 44, 45, 46, 19, 42, 55, 57,
  ],
  // 89: Age Calculator
  89: [
    88, 90, 87, 10, 107, 110, 2, 1, 3, 5, 17, 11, 12, 48, 85, 84, 86, 58, 59,
    63, 64, 99, 98, 44, 45, 46, 19, 42, 55, 57,
  ],
  // 90: Date Difference Calculator
  90: [
    88, 89, 87, 10, 1, 2, 3, 5, 17, 11, 12, 48, 85, 84, 86, 58, 59, 63, 64, 99,
    98, 44, 45, 46, 107, 110, 19, 42, 55, 57,
  ],
  // 91: Light-Years to Parsecs
  91: [
    92, 93, 94, 1, 11, 17, 10, 2, 3, 5, 12, 16, 18, 9, 49, 48, 99, 8, 7, 6, 19,
    40, 41, 42, 37, 55, 57, 65, 67, 68,
  ],
  // 92: Astronomical Unit Converter
  92: [
    91, 93, 94, 1, 11, 17, 10, 2, 3, 5, 12, 16, 18, 9, 49, 48, 99, 8, 7, 6, 19,
    40, 41, 42, 37, 55, 57, 65, 67, 68,
  ],
  // 93: Apparent Magnitude
  93: [
    91, 92, 94, 44, 45, 46, 1, 11, 17, 10, 2, 3, 5, 12, 16, 18, 9, 49, 48, 99,
    8, 7, 6, 19, 40, 41, 42, 37, 55, 57,
  ],
  // 94: Planet Weight Calculator
  94: [
    91, 92, 93, 2, 1, 17, 11, 10, 9, 6, 7, 8, 3, 5, 12, 16, 18, 42, 19, 40, 41,
    37, 55, 57, 107, 110, 65, 67, 68, 22,
  ],
  // 95: Radiation Dose
  95: [
    96, 97, 7, 8, 6, 4, 26, 2, 1, 3, 5, 17, 11, 10, 50, 54, 58, 59, 60, 61, 62,
    63, 64, 65, 66, 67, 68, 19, 42, 40,
  ],
  // 96: Radioactivity
  96: [
    95, 97, 7, 8, 6, 4, 26, 2, 1, 3, 5, 17, 11, 10, 50, 54, 58, 59, 60, 61, 62,
    63, 64, 65, 66, 67, 68, 19, 42, 40,
  ],
  // 97: Exposure Dose
  97: [
    95, 96, 7, 8, 6, 4, 26, 2, 1, 3, 5, 17, 11, 10, 50, 54, 58, 59, 60, 61, 62,
    63, 64, 65, 66, 67, 68, 19, 42, 40,
  ],
  // 98: Sound Pressure Pa to dB
  98: [
    99, 48, 49, 86, 85, 44, 45, 46, 47, 84, 6, 7, 8, 1, 2, 3, 5, 17, 11, 10, 12,
    16, 18, 55, 56, 57, 58, 59, 63, 64,
  ],
  // 99: Frequency to Musical Note
  99: [
    48, 49, 98, 86, 85, 44, 45, 46, 47, 84, 7, 8, 6, 1, 2, 3, 5, 17, 11, 10, 12,
    16, 18, 55, 56, 57, 58, 59, 63, 64,
  ],
  // 100: Wind Speed
  100: [
    11, 1, 17, 101, 102, 103, 10, 2, 3, 5, 12, 16, 18, 9, 13, 25, 6, 7, 8, 19,
    40, 41, 42, 37, 55, 57, 91, 92, 109, 113,
  ],
  // 101: Rainfall
  101: [
    100, 102, 103, 1, 5, 3, 2, 11, 17, 10, 12, 16, 18, 9, 6, 7, 8, 19, 40, 41,
    42, 37, 55, 57, 34, 35, 34, 39, 36, 82,
  ],
  // 102: Humidity Ratio
  102: [
    103, 100, 101, 4, 26, 29, 28, 27, 33, 32, 31, 1, 5, 3, 2, 11, 17, 10, 6, 7,
    8, 19, 40, 41, 42, 37, 55, 39, 38, 82,
  ],
  // 103: Dew Point Calculator
  103: [
    102, 100, 101, 4, 26, 29, 28, 27, 33, 32, 31, 1, 5, 3, 2, 11, 17, 10, 6, 7,
    8, 19, 40, 41, 42, 37, 55, 39, 38, 82,
  ],
  // 104: Fabric GSM
  104: [
    105, 106, 2, 5, 1, 3, 19, 40, 41, 42, 37, 32, 33, 55, 56, 57, 20, 30, 29,
    28, 17, 11, 10, 75, 76, 77, 82, 78, 79, 27,
  ],
  // 105: Thread Count
  105: [
    104, 106, 2, 5, 1, 3, 19, 40, 41, 42, 37, 32, 33, 55, 56, 57, 20, 30, 29,
    28, 17, 11, 10, 75, 76, 77, 82, 78, 79, 27,
  ],
  // 106: Clothing Size
  106: [
    111, 112, 110, 104, 105, 107, 2, 1, 5, 17, 11, 10, 3, 19, 40, 41, 42, 37,
    32, 33, 55, 56, 57, 20, 30, 29, 28, 75, 76, 82,
  ],
  // 107: BMI Calculator
  107: [
    110, 108, 109, 2, 1, 4, 26, 17, 11, 10, 5, 3, 19, 40, 41, 42, 37, 32, 33,
    55, 56, 57, 20, 30, 29, 28, 106, 111, 78, 82,
  ],
  // 108: Calorie Burn Rate
  108: [
    107, 109, 110, 2, 1, 4, 26, 17, 11, 10, 5, 3, 19, 40, 41, 42, 37, 32, 33,
    55, 56, 57, 20, 30, 78, 82, 106, 111, 83, 25,
  ],
  // 109: Running Pace to Speed
  109: [
    11, 108, 107, 110, 17, 1, 2, 10, 5, 3, 12, 16, 18, 13, 25, 100, 91, 92, 19,
    40, 41, 42, 37, 32, 33, 55, 57, 94, 22, 23,
  ],
  // 110: Height Converter
  110: [
    1, 107, 106, 111, 112, 2, 5, 17, 11, 10, 3, 12, 16, 18, 13, 94, 19, 40, 41,
    42, 37, 32, 33, 55, 57, 91, 92, 22, 23, 108,
  ],
  // 111: Shoe Size
  111: [
    106, 112, 110, 107, 1, 2, 5, 17, 11, 10, 3, 12, 16, 18, 13, 94, 19, 40, 41,
    42, 37, 32, 33, 55, 57, 104, 105, 22, 23, 108,
  ],
  // 112: Ring Size
  112: [
    111, 106, 110, 107, 1, 2, 5, 17, 11, 10, 3, 12, 16, 18, 13, 94, 19, 40, 41,
    42, 37, 32, 33, 55, 57, 104, 105, 22, 23, 108,
  ],
  // 113: Horsepower to Animals
  113: [
    8, 9, 22, 23, 7, 6, 17, 16, 18, 11, 1, 2, 10, 5, 3, 12, 21, 94, 91, 92, 40,
    41, 42, 19, 37, 32, 33, 55, 57, 35,
  ],
  // 114: Animation Generator
  114: [
    139, 137, 146, 129, 123, 144, 149, 117, 118, 153, 126, 132, 134, 128, 141,
    119, 147, 143, 142, 135, 124, 151, 148, 152, 155, 131, 138, 136, 125, 150,
  ],
  // 115: Aspect Ratio Calculator
  115: [
    124, 151, 142, 143, 155, 128, 141, 148, 5, 1, 76, 77, 84, 47, 117, 118, 119,
    134, 135, 136, 131, 138, 126, 146, 130, 132, 123, 129, 144, 149,
  ],
  // 116: Background Noise Generator
  116: [
    146, 130, 132, 144, 149, 118, 117, 126, 154, 121, 122, 153, 134, 131, 138,
    136, 125, 150, 148, 152, 155, 124, 142, 143, 135, 151, 128, 141, 119, 123,
  ],
  // 117: Border Radius Generator
  117: [
    118, 144, 149, 123, 146, 130, 132, 116, 119, 134, 153, 126, 121, 122, 154,
    137, 139, 114, 129, 128, 141, 135, 142, 143, 151, 155, 124, 148, 152, 131,
  ],
  // 118: Box Shadow Generator
  118: [
    117, 144, 149, 123, 146, 130, 132, 116, 119, 134, 153, 126, 121, 122, 154,
    137, 139, 114, 129, 128, 141, 135, 142, 143, 151, 155, 124, 148, 152, 131,
  ],
  // 119: Clip Path Maker
  119: [
    134, 117, 118, 146, 130, 132, 144, 149, 123, 126, 153, 121, 122, 154, 137,
    139, 114, 129, 128, 141, 135, 142, 143, 151, 155, 124, 148, 152, 131, 138,
  ],
  // 120: Color Contrast Checker
  120: [
    121, 122, 154, 146, 130, 140, 145, 147, 126, 123, 117, 118, 144, 149, 132,
    116, 153, 134, 119, 137, 139, 114, 129, 128, 141, 135, 142, 143, 151, 155,
  ],
  // 121: Color Converter
  121: [
    122, 120, 154, 146, 130, 140, 145, 147, 126, 123, 117, 118, 144, 149, 132,
    116, 153, 134, 119, 137, 139, 114, 129, 128, 141, 135, 142, 143, 151, 155,
  ],
  // 122: Color Palette Generator
  122: [
    121, 120, 154, 146, 130, 140, 145, 147, 126, 123, 117, 118, 144, 149, 132,
    116, 153, 134, 119, 137, 139, 114, 129, 128, 141, 135, 142, 143, 151, 155,
  ],
  // 123: CSS Button Generator
  123: [
    118, 144, 149, 117, 146, 130, 132, 116, 126, 121, 122, 154, 153, 134, 119,
    137, 139, 114, 129, 128, 141, 135, 142, 143, 151, 155, 124, 148, 152, 131,
  ],
  // 124: CSS Calc Builder
  124: [
    151, 142, 143, 155, 135, 148, 128, 141, 115, 5, 1, 76, 77, 131, 138, 136,
    125, 150, 152, 126, 146, 130, 132, 116, 117, 118, 144, 149, 123, 129,
  ],
  // 125: CSS Counter Generator
  125: [
    148, 128, 141, 131, 138, 136, 124, 151, 142, 143, 155, 150, 152, 135, 126,
    146, 130, 132, 116, 117, 118, 144, 149, 123, 129, 114, 137, 139, 119, 134,
  ],
  // 126: CSS Filter Generator
  126: [
    114, 139, 137, 146, 130, 132, 129, 123, 117, 118, 144, 149, 116, 153, 134,
    119, 121, 122, 154, 128, 141, 135, 142, 143, 151, 155, 124, 148, 152, 131,
  ],
  // 127: CSS Font-face Generator
  127: [
    145, 147, 143, 142, 135, 151, 155, 148, 128, 141, 131, 138, 136, 125, 150,
    152, 126, 146, 130, 132, 116, 117, 118, 144, 149, 123, 129, 114, 137, 139,
  ],
  // 128: CSS Grid Generator
  128: [
    141, 148, 135, 142, 143, 151, 155, 124, 115, 5, 1, 76, 77, 131, 138, 136,
    125, 150, 152, 126, 146, 130, 132, 116, 117, 118, 144, 149, 123, 129,
  ],
  // 129: CSS Loader Generator
  129: [
    114, 139, 137, 146, 130, 132, 126, 123, 117, 118, 144, 149, 116, 153, 134,
    119, 121, 122, 154, 128, 141, 135, 142, 143, 151, 155, 124, 148, 152, 131,
  ],
  // 130: CSS Mesh Gradient Generator
  130: [
    146, 132, 116, 144, 149, 117, 118, 123, 126, 121, 122, 154, 153, 134, 119,
    137, 139, 114, 129, 128, 141, 135, 142, 143, 151, 155, 124, 148, 152, 131,
  ],
  // 131: CSS Minifier
  131: [
    138, 136, 125, 150, 152, 124, 151, 142, 143, 155, 135, 148, 128, 141, 126,
    146, 130, 132, 116, 117, 118, 144, 149, 123, 129, 114, 137, 139, 119, 134,
  ],
  // 132: CSS Pattern Generator
  132: [
    146, 130, 116, 144, 149, 117, 118, 123, 126, 121, 122, 154, 153, 134, 119,
    137, 139, 114, 129, 128, 141, 135, 142, 143, 151, 155, 124, 148, 152, 131,
  ],
  // 133: CSS Playground
  133: [
    141, 128, 148, 135, 142, 143, 151, 155, 124, 115, 5, 1, 76, 77, 131, 138,
    136, 125, 150, 152, 126, 146, 130, 132, 116, 117, 118, 144, 149, 123,
  ],
  // 134: CSS Shape Generator
  134: [
    119, 117, 118, 146, 130, 132, 144, 149, 123, 126, 153, 121, 122, 154, 137,
    139, 114, 129, 128, 141, 135, 142, 143, 151, 155, 124, 148, 152, 131, 138,
  ],
  // 135: CSS Spacing Scale Generator
  135: [
    142, 143, 151, 155, 124, 148, 128, 141, 115, 5, 1, 76, 77, 131, 138, 136,
    125, 150, 152, 126, 146, 130, 132, 116, 117, 118, 144, 149, 123, 129,
  ],
  // 136: CSS Specificity Calculator
  136: [
    138, 131, 125, 150, 152, 124, 151, 142, 143, 155, 135, 148, 128, 141, 126,
    146, 130, 132, 116, 117, 118, 144, 149, 123, 129, 114, 137, 139, 119, 134,
  ],
  // 137: CSS Transition Previewer
  137: [
    139, 114, 146, 130, 132, 129, 126, 123, 117, 118, 144, 149, 116, 153, 134,
    119, 121, 122, 154, 128, 141, 135, 142, 143, 151, 155, 124, 148, 152, 131,
  ],
  // 138: CSS Variable Extractor
  138: [
    136, 131, 125, 150, 152, 124, 151, 142, 143, 155, 135, 148, 128, 141, 126,
    146, 130, 132, 116, 117, 118, 144, 149, 123, 129, 114, 137, 139, 119, 134,
  ],
  // 139: Cubic Bezier Editor
  139: [
    137, 114, 146, 130, 132, 129, 126, 123, 117, 118, 144, 149, 116, 153, 134,
    119, 121, 122, 154, 128, 141, 135, 142, 143, 151, 155, 124, 148, 152, 131,
  ],
  // 140: Dark Mode CSS Generator
  140: [
    146, 130, 144, 149, 117, 118, 123, 126, 121, 122, 154, 132, 116, 153, 134,
    119, 137, 139, 114, 129, 128, 141, 135, 142, 143, 151, 155, 124, 148, 152,
  ],
  // 141: Flexbox Playground
  141: [
    128, 148, 135, 142, 143, 151, 155, 124, 115, 5, 1, 76, 77, 131, 138, 136,
    125, 150, 152, 126, 146, 130, 132, 116, 117, 118, 144, 149, 123, 129,
  ],
  // 142: Fluid Space Calculator
  142: [
    143, 135, 151, 155, 124, 148, 128, 141, 115, 5, 1, 76, 77, 131, 138, 136,
    125, 150, 152, 126, 146, 130, 132, 116, 117, 118, 144, 149, 123, 129,
  ],
  // 143: Fluid Typography Calculator
  143: [
    142, 135, 151, 155, 124, 148, 128, 141, 115, 5, 1, 76, 77, 131, 138, 136,
    125, 150, 152, 126, 146, 130, 132, 116, 117, 118, 144, 149, 123, 129,
  ],
  // 144: Glassmorphism Generator
  144: [
    149, 118, 117, 123, 146, 130, 132, 116, 126, 121, 122, 154, 153, 134, 119,
    137, 139, 114, 129, 128, 141, 135, 142, 143, 151, 155, 124, 148, 152, 131,
  ],
  // 145: Google Fonts Pairing Tool
  145: [
    147, 127, 143, 142, 135, 151, 155, 148, 128, 141, 131, 138, 136, 125, 150,
    152, 126, 146, 130, 132, 116, 117, 118, 144, 149, 123, 129, 114, 137, 139,
  ],
  // 146: Gradient Generator
  146: [
    130, 132, 116, 144, 149, 117, 118, 123, 126, 121, 122, 154, 153, 134, 119,
    137, 139, 114, 129, 128, 141, 135, 142, 143, 151, 155, 124, 148, 152, 131,
  ],
  // 147: Letter Spacing Line Height Visualizer
  147: [
    145, 127, 143, 142, 135, 151, 155, 148, 128, 141, 131, 138, 136, 125, 150,
    152, 126, 146, 130, 132, 116, 117, 118, 144, 149, 123, 129, 114, 137, 139,
  ],
  // 148: Media Query Builder
  148: [
    142, 143, 135, 151, 155, 124, 128, 141, 115, 5, 1, 76, 77, 131, 138, 136,
    125, 150, 152, 126, 146, 130, 132, 116, 117, 118, 144, 149, 123, 129,
  ],
  // 149: Neumorphism Generator
  149: [
    144, 118, 117, 123, 146, 130, 132, 116, 126, 121, 122, 154, 153, 134, 119,
    137, 139, 114, 129, 128, 141, 135, 142, 143, 151, 155, 124, 148, 152, 131,
  ],
  // 150: Print CSS Helper
  150: [
    148, 125, 138, 136, 131, 124, 151, 142, 143, 155, 135, 148, 128, 141, 126,
    146, 130, 132, 116, 117, 118, 144, 149, 123, 129, 114, 137, 139, 119, 134,
  ],
  // 151: PX to REM Converter
  151: [
    124, 142, 143, 155, 135, 148, 128, 141, 115, 5, 1, 76, 77, 131, 138, 136,
    125, 150, 152, 126, 146, 130, 132, 116, 117, 118, 144, 149, 123, 129,
  ],
  // 152: Scroll Snap Builder
  152: [
    114, 139, 137, 148, 128, 141, 135, 142, 143, 151, 155, 124, 131, 138, 136,
    125, 150, 126, 146, 130, 132, 116, 117, 118, 144, 149, 123, 129, 119, 134,
  ],
  // 153: Text Shadow Generator
  153: [
    118, 117, 144, 149, 123, 146, 130, 132, 116, 126, 121, 122, 154, 134, 119,
    137, 139, 114, 129, 128, 141, 135, 142, 143, 151, 155, 124, 148, 152, 131,
  ],
  // 154: Tint Shade Generator
  154: [
    122, 121, 120, 146, 130, 140, 145, 147, 126, 123, 117, 118, 144, 149, 132,
    116, 153, 134, 119, 137, 139, 114, 129, 128, 141, 135, 142, 143, 151, 155,
  ],
  // 155: Viewport Unit Converter
  155: [
    151, 124, 142, 143, 135, 148, 128, 141, 115, 5, 1, 76, 77, 131, 138, 136,
    125, 150, 152, 126, 146, 130, 132, 116, 117, 118, 144, 149, 123, 129,
  ],
};

// Create a reverse mapping from ID to slug for easy lookup
const idToSlug = {};
for (const slug in converters) {
  idToSlug[converters[slug].id] = slug;
}

const generateLayout = (toolName, { h1, p }, category = "unit-converters") => {
  const canonical = `https://1000freetools.com/${category}/${toolName}`;

  // Get the ID of the current tool
  const currentToolId = converters[toolName]?.id;

  let linkedToolSlugs = [];
  if (currentToolId && links[currentToolId]) {
    // Map the linked IDs to their corresponding slugs
    linkedToolSlugs = links[currentToolId]
      .map((id) => idToSlug[id])
      .filter(Boolean); // Filter out any undefined slugs if an ID is missing from converters
  }

  // Generate tools array for ToolLinkCards based on the mapping
  const otherTools = linkedToolSlugs.map((slug) => ({
    name: toolMetadata[slug].h1,
    description: toolMetadata[slug].p,
    href: `/${category}/${slug}`,
  }));

  const toolsJson = JSON.stringify(otherTools, null, 2);

  return `import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "${h1}",
  description: "${p}",
  alternates: {
    canonical: "${canonical}",
  },
};

const tools = ${toolsJson};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
`;
};

// CSS Tools slugs
const cssToolSlugs = [
  "animation-generator",
  "aspect-ratio-calculator",
  "background-noise-generator",
  "border-radius-generator",
  "box-shadow-generator",
  "clip-path-maker",
  "color-contrast-checker",
  "color-converter",
  "color-palette-generator",
  "css-button-generator",
  "css-calc-builder",
  "css-counter-generator",
  "css-filter-generator",
  "css-font-face-generator",
  "css-grid-generator",
  "css-loader-generator",
  "css-mesh-gradient-generator",
  "css-minifier",
  "css-pattern-generator",
  "css-playground",
  "css-shape-generator",
  "css-spacing-scale-generator",
  "css-specificity-calculator",
  "css-transition-previewer",
  "css-variable-extractor",
  "cubic-bezier-editor",
  "dark-mode-css-generator",
  "flexbox-playground",
  "fluid-space-calculator",
  "fluid-typography-calculator",
  "glassmorphism-generator",
  "google-fonts-pairing-tool",
  "gradient-generator",
  "letter-spacing-line-height-visualizer",
  "media-query-builder",
  "neumorphism-generator",
  "print-css-helper",
  "px-rem-converter",
  "scroll-snap-builder",
  "text-shadow-generator",
  "tint-shade-generator",
  "viewport-unit-converter",
];

// The rest of the file generation loop remains the same
for (const [toolName, meta] of Object.entries(toolMetadata)) {
  const category = cssToolSlugs.includes(toolName)
    ? "css-tools"
    : "unit-converters";
  const dir = path.join("app", category, toolName);
  const filePath = path.join(dir, "layout.tsx");

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, generateLayout(toolName, meta, category), "utf-8");

  console.log(`✅ Created: ${filePath}`);
}

console.log("\nDone! All layout files generated.");
