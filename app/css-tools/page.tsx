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
    <div className="w-full mx-auto">
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

      <section className="mt-12 space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">About These CSS Tools</h2>
          <p className="text-muted-foreground mb-4">
            I built this collection after wasting too many hours tweaking box-shadow values by hand and
            refreshing CSS gradient generators that wanted me to sign up for a newsletter. Every tool here
            does one thing: generates the CSS you need, shows you what it looks like, and gets out of the way.
          </p>
          <p className="text-muted-foreground">
            No accounts. No tracking. Just copy the code and move on with your day.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">When You'd Actually Use These</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">You're stuck on a specific CSS problem</h3>
                <p className="text-sm text-muted-foreground">
                  Need a neumorphic button that doesn't look terrible? Want to see what 17px border-radius
                  actually does? These tools skip the theory and show you the code.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">You're learning CSS layouts</h3>
                <p className="text-sm text-muted-foreground">
                  Grid and flexbox make sense until you need them. The visual builders here let you
                  poke at values and see what breaks before you paste it into production.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">You need accessible color combinations</h3>
                <p className="text-sm text-muted-foreground">
                  The contrast checker runs WCAG math so you don't have to. Plug in your colors,
                  see if they pass, adjust until they do.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">You're building a design system</h3>
                <p className="text-sm text-muted-foreground">
                  Spacing scales, fluid typography, color palettes - these generators output
                  consistent values you can drop into tokens or CSS variables.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">What Makes These Different</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold">1</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">No bloat</h3>
                <p className="text-sm text-muted-foreground">
                  These aren't full IDEs pretending to be tools. Each one does a single job and loads fast.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold">2</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Code you can actually use</h3>
                <p className="text-sm text-muted-foreground">
                  The output isn't some abstract example. You get the exact CSS property, a complete class,
                  and Tailwind equivalents where it makes sense.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold">3</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Built for how you work</h3>
                <p className="text-sm text-muted-foreground">
                  Tweak values, watch the preview update, copy, paste. If you need to come back later,
                  the URL preserves your settings for most tools.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Common Questions</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Are these really free?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes. No paywall, no premium tier, no "upgrade for more gradients." If you find them
                  useful, that's payment enough.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Can I use the generated CSS in commercial projects?</h3>
                <p className="text-sm text-muted-foreground">
                  Absolutely. The CSS is yours. Use it in client work, side projects, whatever.
                  No attribution required.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Do these work offline?</h3>
                <p className="text-sm text-muted-foreground">
                  Once the page loads, yes. Everything runs in your browser - no server calls,
                  no API requests. Your settings stay local.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Something broken or missing a feature?</h3>
                <p className="text-sm text-muted-foreground">
                  These tools are actively maintained. If a generator doesn't cover your use case
                  or you spot a bug, it's worth reporting.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
