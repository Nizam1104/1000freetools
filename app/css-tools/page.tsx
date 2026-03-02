import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Palette, Box, Type, Film, Ruler, Image, Code, Gauge, Scissors, Layers, Monitor, Printer } from "lucide-react";

const toolCategories = [
  {
    icon: Palette,
    name: "Color & Gradient Tools",
    description: "Generate and work with colors, gradients, and palettes",
    tools: [
      { name: "Gradient Generator", href: "/css-tools/gradient-generator", description: "Create linear, radial, and conic gradients" },
      { name: "Color Palette Generator", href: "/css-tools/color-palette-generator", description: "Extract and generate color harmonies" },
      { name: "Color Contrast Checker", href: "/css-tools/color-contrast-checker", description: "Check WCAG compliance" },
      { name: "Tint & Shade Generator", href: "/css-tools/tint-shade-generator", description: "Generate color variations" },
      { name: "CSS Color Converter", href: "/css-tools/color-converter", description: "Convert between color formats" },
      { name: "Mesh Gradient Generator", href: "/css-tools/css-mesh-gradient-generator", description: "Create multi-point gradient meshes" },
    ],
  },
  {
    icon: Box,
    name: "Box & Layout Tools",
    description: "Create and visualize CSS layouts and effects",
    tools: [
      { name: "Box Shadow Generator", href: "/css-tools/box-shadow-generator", description: "Generate multi-layer shadows" },
      { name: "Border Radius Generator", href: "/css-tools/border-radius-generator", description: "Create custom rounded corners" },
      { name: "CSS Grid Generator", href: "/css-tools/css-grid-generator", description: "Build grid layouts visually" },
      { name: "Flexbox Playground", href: "/css-tools/flexbox-playground", description: "Interactive flexbox builder" },
      { name: "Aspect Ratio Calculator", href: "/css-tools/aspect-ratio-calculator", description: "Calculate and convert ratios" },
      { name: "Clip Path Maker", href: "/css-tools/clip-path-maker", description: "Draw polygon, circle, ellipse paths" },
    ],
  },
  {
    icon: Type,
    name: "Typography Tools",
    description: "Work with fonts, text effects, and sizing",
    tools: [
      { name: "Text Shadow Generator", href: "/css-tools/text-shadow-generator", description: "Create text shadow effects" },
      { name: "Google Fonts Pairing Tool", href: "/css-tools/google-fonts-pairing-tool", description: "Preview font combinations" },
      { name: "CSS @font-face Generator", href: "/css-tools/css-font-face-generator", description: "Upload font, get CSS" },
      { name: "Fluid Typography Calculator", href: "/css-tools/fluid-typography-calculator", description: "clamp()-based responsive fonts" },
      { name: "Letter Spacing / Line Height", href: "/css-tools/letter-spacing-line-height-visualizer", description: "Tweak and preview type rhythm" },
    ],
  },
  {
    icon: Film,
    name: "Animation & Effects",
    description: "Generate animations and visual effects",
    tools: [
      { name: "CSS Animation Generator", href: "/css-tools/animation-generator", description: "Build keyframe animations" },
      { name: "Cubic Bezier Editor", href: "/css-tools/cubic-bezier-editor", description: "Create custom easing functions" },
      { name: "CSS Transition Previewer", href: "/css-tools/css-transition-previewer", description: "Compare easing functions" },
      { name: "Glassmorphism Generator", href: "/css-tools/glassmorphism-generator", description: "Generate glass effects" },
      { name: "Neumorphism Generator", href: "/css-tools/neumorphism-generator", description: "Soft-UI shadow styler" },
      { name: "CSS Loader Generator", href: "/css-tools/css-loader-generator", description: "Create loading animations" },
      { name: "CSS Button Generator", href: "/css-tools/css-button-generator", description: "Styles, hover effects, gradients" },
    ],
  },
  {
    icon: Ruler,
    name: "Spacing & Sizing Tools",
    description: "Calculate and convert CSS units",
    tools: [
      { name: "PX to REM Converter", href: "/css-tools/px-rem-converter", description: "Convert between px and rem" },
      { name: "CSS Spacing Scale Generator", href: "/css-tools/css-spacing-scale-generator", description: "Generate spacing tokens" },
      { name: "Fluid Space Calculator", href: "/css-tools/fluid-space-calculator", description: "clamp()-based responsive spacing" },
      { name: "CSS calc() Builder", href: "/css-tools/css-calc-builder", description: "Visual CSS math calculator" },
      { name: "Viewport Unit Converter", href: "/css-tools/viewport-unit-converter", description: "vw/vh/vmin/vmax to px" },
    ],
  },
  {
    icon: Image,
    name: "Background & Pattern Tools",
    description: "Create backgrounds and patterns",
    tools: [
      { name: "CSS Pattern Generator", href: "/css-tools/css-pattern-generator", description: "Stripes, dots, checkerboard" },
      { name: "Background Noise Generator", href: "/css-tools/background-noise-generator", description: "Subtle grain texture" },
      { name: "CSS Shape Generator", href: "/css-tools/css-shape-generator", description: "Triangles, arrows, bubbles" },
    ],
  },
  {
    icon: Code,
    name: "Code & Workflow Tools",
    description: "Utilities for CSS development",
    tools: [
      { name: "CSS Minifier", href: "/css-tools/css-minifier", description: "Compress or beautify CSS" },
      { name: "CSS Specificity Calculator", href: "/css-tools/css-specificity-calculator", description: "Calculate selector specificity" },
      { name: "CSS Variable Extractor", href: "/css-tools/css-variable-extractor", description: "Auto-list custom properties" },
      { name: "Media Query Builder", href: "/css-tools/media-query-builder", description: "Build responsive breakpoints" },
    ],
  },
  {
    icon: Layers,
    name: "Layout & Scroll Tools",
    description: "Advanced layout utilities",
    tools: [
      { name: "Scroll Snap Builder", href: "/css-tools/scroll-snap-builder", description: "Configure scroll snap" },
      { name: "CSS Counter Generator", href: "/css-tools/css-counter-generator", description: "Auto-numbering for elements" },
    ],
  },
  {
    icon: Gauge,
    name: "Utility Tools",
    description: "Additional CSS utilities",
    tools: [
      { name: "CSS Filter Generator", href: "/css-tools/css-filter-generator", description: "Apply visual filters" },
      { name: "Print CSS Helper", href: "/css-tools/print-css-helper", description: "@print media query boilerplate" },
      { name: "Dark Mode CSS Generator", href: "/css-tools/dark-mode-css-generator", description: "prefers-color-scheme styles" },
    ],
  },
];

export default function CssToolsPage() {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-semibold mb-4">CSS Tools</h1>
        <p className="text-lg text-muted-foreground">
          A comprehensive collection of free CSS generators, converters, and utilities for web developers.
          Create gradients, shadows, animations, and more with live preview and instant code generation.
        </p>
      </div>

      <div className="space-y-12">
        {toolCategories.map((category) => (
          <section key={category.name}>
            <div className="flex items-center gap-3 mb-6">
              <category.icon className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">{category.name}</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {category.tools.map((tool) => (
                <Link key={tool.name} href={tool.href}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Click to open →
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Why Use CSS Tools?</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">⚡ Faster Development</h3>
              <p className="text-sm text-muted-foreground">
                Generate production-ready CSS code instantly without manual calculations or trial-and-error.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">👁️ Visual Preview</h3>
              <p className="text-sm text-muted-foreground">
                See changes in real-time with live previews before copying the final CSS code.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">🎨 Creative Exploration</h3>
              <p className="text-sm text-muted-foreground">
                Experiment with different values and effects to discover new design possibilities.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
