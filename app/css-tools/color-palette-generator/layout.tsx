import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "CSS Color Palette Generator",
  description: "Generate harmonious color palettes from images or color theory rules. Export CSS variables and Tailwind config. Free online color palette generator for web design.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/color-palette-generator",
  },
};

const tools = [
  {
    "name": "CSS Color Converter",
    "description": "Convert colors between HEX, RGB, HSL, HSV, OKLCH, and more. Get CSS-ready color values instantly. Free online CSS color converter for designers and developers.",
    "href": "/css-tools/color-converter"
  },
  {
    "name": "Color Contrast Checker",
    "description": "Test color combinations for WCAG AA and AAA accessibility compliance. Ensure readable text and UI colors. Free online color contrast checker for web designers.",
    "href": "/css-tools/color-contrast-checker"
  },
  {
    "name": "Tint & Shade Generator",
    "description": "Generate tints (lighter) and shades (darker) of any color across multiple steps. Build color scales for design systems. Free online tint shade tool.",
    "href": "/css-tools/tint-shade-generator"
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
    "name": "Dark Mode CSS Generator",
    "description": "Generate prefers-color-scheme dark mode CSS from your color palette. Create accessible dark themes instantly. Free online dark mode CSS generator.",
    "href": "/css-tools/dark-mode-css-generator"
  },
  {
    "name": "Google Fonts Pairing Tool",
    "description": "Discover and preview harmonious Google Fonts combinations. Find perfect heading and body pairings. Free online font pairing tool.",
    "href": "/css-tools/google-fonts-pairing-tool"
  },
  {
    "name": "Letter Spacing & Line Height Visualizer",
    "description": "Adjust and preview letter-spacing and line-height values for perfect typography rhythm. Free online type visualizer.",
    "href": "/css-tools/letter-spacing-line-height-visualizer"
  },
  {
    "name": "CSS Filter Generator",
    "description": "Apply blur, brightness, contrast, hue-rotate, and more filters visually. Generate CSS filter code instantly. Free online CSS filter generator.",
    "href": "/css-tools/css-filter-generator"
  },
  {
    "name": "CSS Button Generator",
    "description": "Design beautiful buttons with hover effects, gradients, and shadows. Generate production-ready CSS button styles. Free online CSS button maker.",
    "href": "/css-tools/css-button-generator"
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
    "name": "CSS Text Shadow Generator",
    "description": "Create multi-layer text shadows with blur, spread, and color. Generate beautiful text effects. Free online CSS text shadow generator.",
    "href": "/css-tools/text-shadow-generator"
  },
  {
    "name": "CSS Shape Generator",
    "description": "Create triangles, arrows, speech bubbles, and more using pure CSS. Generate shape code instantly. Free online CSS shape maker.",
    "href": "/css-tools/css-shape-generator"
  },
  {
    "name": "CSS Clip Path Maker",
    "description": "Draw custom clip-path shapes — polygons, circles, ellipses — with visual editor. Generate CSS clip-path code instantly. Free online clip path generator.",
    "href": "/css-tools/clip-path-maker"
  },
  {
    "name": "CSS Transition Previewer",
    "description": "Preview and compare CSS transition easing functions. Test built-in and custom cubic-bezier curves. Free online transition previewer.",
    "href": "/css-tools/css-transition-previewer"
  },
  {
    "name": "Cubic Bezier Editor",
    "description": "Visually create custom cubic-bezier easing functions. Generate smooth, natural animations. Free online cubic-bezier editor for CSS transitions.",
    "href": "/css-tools/cubic-bezier-editor"
  },
  {
    "name": "CSS Animation Generator",
    "description": "Create CSS keyframe animations with live preview. Generate smooth, performant animations for web projects with customizable easing, duration, and iteration. Free online CSS animation builder.",
    "href": "/css-tools/animation-generator"
  },
  {
    "name": "CSS Loader Generator",
    "description": "Create pure CSS loading spinners, dots, and bars. Customize size, color, and animation speed. Free online CSS loader generator.",
    "href": "/css-tools/css-loader-generator"
  },
  {
    "name": "CSS Grid Generator",
    "description": "Create CSS Grid layouts visually. Generate grid-template-areas, gap, and responsive breakpoints. Free online CSS Grid layout builder.",
    "href": "/css-tools/css-grid-generator"
  },
  {
    "name": "Flexbox Playground",
    "description": "Experiment with Flexbox properties interactively. Generate flex container and item CSS with live preview. Free online Flexbox learning tool.",
    "href": "/css-tools/flexbox-playground"
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
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4 max-w-6xl">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/css-tools">Css Tools</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/css-tools/color-palette-generator">Color Palette Generator</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {children}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
