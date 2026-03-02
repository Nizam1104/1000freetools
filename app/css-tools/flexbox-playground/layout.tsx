import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Flexbox Playground",
  description: "Experiment with Flexbox properties interactively. Generate flex container and item CSS with live preview. Free online Flexbox learning tool.",
  alternates: {
    canonical: "https://1000freetools.com/css-tools/flexbox-playground",
  },
};

const tools = [
  {
    "name": "CSS Grid Generator",
    "description": "Create CSS Grid layouts visually. Generate grid-template-areas, gap, and responsive breakpoints. Free online CSS Grid layout builder.",
    "href": "/css-tools/css-grid-generator"
  },
  {
    "name": "Media Query Builder",
    "description": "Generate responsive CSS media queries visually. Pick breakpoints for mobile, tablet, and desktop. Free online media query generator.",
    "href": "/css-tools/media-query-builder"
  },
  {
    "name": "CSS Spacing Scale Generator",
    "description": "Generate consistent spacing and size scales for design tokens. Create 4px, 8px, 16px base scales. Free online spacing scale generator.",
    "href": "/css-tools/css-spacing-scale-generator"
  },
  {
    "name": "Fluid Space Calculator",
    "description": "Generate clamp()-based responsive spacing that scales with viewport. Create fluid design systems. Free online fluid space calculator.",
    "href": "/css-tools/fluid-space-calculator"
  },
  {
    "name": "Fluid Typography Calculator",
    "description": "Create responsive font sizes using CSS clamp() for smooth scaling between breakpoints. Free online fluid typography generator.",
    "href": "/css-tools/fluid-typography-calculator"
  },
  {
    "name": "PX to REM Converter",
    "description": "Convert pixels to REM and EM units with configurable root font size. Generate accessible, scalable CSS. Free online px to rem converter.",
    "href": "/css-tools/px-rem-converter"
  },
  {
    "name": "Viewport Unit Converter",
    "description": "Convert between vw, vh, vmin, vmax, and px units. Generate responsive viewport-based CSS. Free online viewport unit converter.",
    "href": "/css-tools/viewport-unit-converter"
  },
  {
    "name": "CSS calc() Builder",
    "description": "Build complex CSS calc() expressions visually. Create responsive calculations for widths, heights, margins, and more. Free online CSS calc builder.",
    "href": "/css-tools/css-calc-builder"
  },
  {
    "name": "Aspect Ratio Calculator",
    "description": "Calculate equivalent aspect ratios and generate CSS snippets for responsive design. Free online aspect ratio calculator for images, videos, and layouts.",
    "href": "/css-tools/aspect-ratio-calculator"
  },
  {
    "name": "Area Converter",
    "description": "Convert area units — square meters, acres, hectares, square feet, square kilometers, and more. Ideal for real estate and construction.",
    "href": "/css-tools/area"
  },
  {
    "name": "Length Converter",
    "description": "Convert length units instantly — meters, feet, inches, kilometers, miles, yards, and more. Free online length converter for everyday and scientific use.",
    "href": "/css-tools/length"
  },
  {
    "name": "Floor Area Converter",
    "description": "Convert floor area between square meters, square feet, square yards, and more. Free online floor area converter for real estate, interior design, and construction planning.",
    "href": "/css-tools/floor-area-converter"
  },
  {
    "name": "Roofing Sheet Coverage Calculator",
    "description": "Calculate how many roofing sheets you need for your roof area. Enter roof dimensions, sheet size, and overlap to get an accurate sheet count. Free online roofing coverage calculator.",
    "href": "/css-tools/roofing-sheet-coverage-converter"
  },
  {
    "name": "CSS Minifier & Beautifier",
    "description": "Minify CSS to reduce file size or beautify/format compressed CSS. Free online CSS minifier and prettifier for web developers.",
    "href": "/css-tools/css-minifier"
  },
  {
    "name": "CSS Variable Extractor",
    "description": "Extract custom properties (CSS variables) from existing CSS code. Auto-generate :root declarations. Free online CSS variable extractor.",
    "href": "/css-tools/css-variable-extractor"
  },
  {
    "name": "CSS Specificity Calculator",
    "description": "Calculate CSS selector specificity scores instantly. Understand cascade priority and debug style conflicts. Free online specificity calculator.",
    "href": "/css-tools/css-specificity-calculator"
  },
  {
    "name": "CSS Counter Generator",
    "description": "Create custom counters for ordered and unordered lists. Generate CSS counter-reset and counter-increment code. Free online CSS counter tool.",
    "href": "/css-tools/css-counter-generator"
  },
  {
    "name": "Print CSS Helper",
    "description": "Generate @print media query boilerplate for printer-friendly stylesheets. Free online print CSS generator.",
    "href": "/css-tools/print-css-helper"
  },
  {
    "name": "Scroll Snap Builder",
    "description": "Configure CSS scroll-snap properties for smooth scrolling sections. Generate scroll-snap-type and alignment code. Free online scroll snap generator.",
    "href": "/css-tools/scroll-snap-builder"
  },
  {
    "name": "CSS Filter Generator",
    "description": "Apply blur, brightness, contrast, hue-rotate, and more filters visually. Generate CSS filter code instantly. Free online CSS filter generator.",
    "href": "/css-tools/css-filter-generator"
  },
  {
    "name": "CSS Gradient Generator",
    "description": "Create linear, radial, and conic gradients with live preview. Generate CSS gradient code for backgrounds and UI. Free online gradient maker.",
    "href": "/css-tools/gradient-generator"
  },
  {
    "name": "CSS Mesh Gradient Generator",
    "description": "Create stunning multi-point mesh gradients with smooth color transitions. Generate CSS and SVG mesh gradients. Free online mesh gradient tool.",
    "href": "/css-tools/css-mesh-gradient-generator"
  },
  {
    "name": "CSS Pattern Generator",
    "description": "Generate repeating patterns — stripes, dots, checkerboard, waves — using CSS and SVG. Free online CSS pattern generator for backgrounds.",
    "href": "/css-tools/css-pattern-generator"
  },
  {
    "name": "CSS Background Noise Generator",
    "description": "Generate subtle noise and grain textures using CSS and SVG filters. Add depth and texture to backgrounds with this free online CSS noise generator.",
    "href": "/css-tools/background-noise-generator"
  },
  {
    "name": "CSS Border Radius Generator",
    "description": "Create asymmetric border-radius values with live preview. Generate organic, smooth corner shapes for modern UI design. Free online border radius tool.",
    "href": "/css-tools/border-radius-generator"
  },
  {
    "name": "CSS Box Shadow Generator",
    "description": "Create multi-layer box shadows with blur, spread, and inset options. Generate beautiful shadows for buttons, cards, and UI elements. Free online CSS shadow tool.",
    "href": "/css-tools/box-shadow-generator"
  },
  {
    "name": "Glassmorphism Generator",
    "description": "Create glassmorphism effects with backdrop-filter, blur, and transparency. Generate modern frosted glass CSS. Free online glassmorphism generator.",
    "href": "/css-tools/glassmorphism-generator"
  },
  {
    "name": "Neumorphism Generator",
    "description": "Create soft UI neumorphic effects with subtle shadows and highlights. Generate modern soft design CSS. Free online neumorphism generator.",
    "href": "/css-tools/neumorphism-generator"
  },
  {
    "name": "CSS Button Generator",
    "description": "Design beautiful buttons with hover effects, gradients, and shadows. Generate production-ready CSS button styles. Free online CSS button maker.",
    "href": "/css-tools/css-button-generator"
  },
  {
    "name": "CSS Loader Generator",
    "description": "Create pure CSS loading spinners, dots, and bars. Customize size, color, and animation speed. Free online CSS loader generator.",
    "href": "/css-tools/css-loader-generator"
  }
];

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
