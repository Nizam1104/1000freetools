import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const colorTools = [
  // Image-based Tools
  {
    name: "Extract Colors from Image",
    description: "Upload an image and extract dominant colors using browser canvas.",
    href: "/color-tools/extract-colors-from-image",
    category: "Image",
  },
  {
    name: "Dominant Color Finder",
    description: "Find the most dominant color present in an image.",
    href: "/color-tools/dominant-color-finder",
    category: "Image",
  },

  // Accessibility & Readability
  {
    name: "Contrast Checker",
    description: "Check text and background color contrast using WCAG rules.",
    href: "/color-tools/contrast-checker",
    category: "Accessibility",
  },
  {
    name: "Text Color Suggestion Tool",
    description: "Suggest readable text colors for a given background.",
    href: "/color-tools/text-color-suggestion-tool",
    category: "Accessibility",
  },
  {
    name: "Palette Contrast Viewer",
    description: "View contrast levels between all colors in your palette.",
    href: "/color-tools/palette-contrast-viewer",
    category: "Accessibility",
  },

  // Color Theory & Analysis
  {
    name: "Color Wheel",
    description: "Interactive color wheel to visualize color relationships.",
    href: "/color-tools/color-wheel",
    category: "Theory",
  },
  {
    name: "Complementary Color Finder",
    description: "Find the complementary color of a given color.",
    href: "/color-tools/complementary-color-finder",
    category: "Theory",
  },
  {
    name: "Shade Tint Tone Generator",
    description: "Generate shades, tints, and tones of a color.",
    href: "/color-tools/shade-tint-tone-generator",
    category: "Theory",
  },
  {
    name: "Warm or Cool Color Detector",
    description: "Detect whether a color feels warm or cool.",
    href: "/color-tools/warm-or-cool-color-detector",
    category: "Theory",
  },

  // Color Pickers
  {
    name: "Color Picker",
    description: "Pick a color using a palette or input HEX, RGB, or HSL values and copy instantly.",
    href: "/color-tools/color-picker",
    category: "Picker",
  },
  {
    name: "Advanced Color Picker",
    description: "Color wheel with RGB, HSL, HSV sliders, alpha control, and live preview.",
    href: "/color-tools/advanced-color-picker",
    category: "Picker",
  },
  {
    name: "Web Safe Color Picker",
    description: "Pick colors that are safe across browsers and devices.",
    href: "/color-tools/web-safe-color-picker",
    category: "Picker",
  },

  // Converters
  {
    name: "Hex to RGB Converter",
    description: "Convert HEX color codes to RGB values instantly.",
    href: "/color-tools/hex-to-rgb-converter",
    category: "Converter",
  },
  {
    name: "RGB to Hex Converter",
    description: "Convert RGB color values to HEX format.",
    href: "/color-tools/rgb-to-hex-converter",
    category: "Converter",
  },
  {
    name: "Hex to HSL Converter",
    description: "Convert HEX color values into HSL format.",
    href: "/color-tools/hex-to-hsl-converter",
    category: "Converter",
  },
  {
    name: "HSL to Hex Converter",
    description: "Convert HSL color values into HEX format.",
    href: "/color-tools/hsl-to-hex-converter",
    category: "Converter",
  },
  {
    name: "RGB to HSL Converter",
    description: "Convert RGB color values into HSL format.",
    href: "/color-tools/rgb-to-hsl-converter",
    category: "Converter",
  },
  {
    name: "HSL to HSV Converter",
    description: "Convert HSL color values into HSV format.",
    href: "/color-tools/hsl-to-hsv-converter",
    category: "Converter",
  },
  {
    name: "RGB to CMYK Converter",
    description: "Convert RGB color values into CMYK format.",
    href: "/color-tools/rgb-to-cmyk-converter",
    category: "Converter",
  },
  {
    name: "Hex to CMYK Converter",
    description: "Convert HEX color values into CMYK format.",
    href: "/color-tools/hex-to-cmyk-converter",
    category: "Converter",
  },
  {
    name: "CSS Color Name Converter",
    description: "Convert CSS color names to HEX, RGB, and HSL values.",
    href: "/color-tools/css-color-name-converter",
    category: "Converter",
  },
  {
    name: "Color Temperature to RGB",
    description: "Convert color temperature in Kelvin to RGB values.",
    href: "/color-tools/color-temperature-to-rgb",
    category: "Converter",
  },
  {
    name: "CSS Variables Generator",
    description: "Convert color palettes into CSS custom properties.",
    href: "/color-tools/css-variables-generator",
    category: "Converter",
  },
  {
    name: "Palette Export Tool",
    description: "Export color palettes as CSS, JSON, Tailwind, and more.",
    href: "/color-tools/palette-export-tool",
    category: "Converter",
  },

  // UX Helpers (Local Storage)
  {
    name: "Color History Tool",
    description: "Store recently used colors locally in the browser.",
    href: "/color-tools/color-history-tool",
    category: "Utility",
  },
  {
    name: "Favorite Colors Manager",
    description: "Save and manage favorite color swatches using local storage.",
    href: "/color-tools/favorite-colors-manager",
    category: "Utility",
  },
  {
    name: "Dark Light Mode Preview",
    description: "Preview how colors appear in dark and light UI modes.",
    href: "/color-tools/dark-light-mode-preview",
    category: "Utility",
  },
];

const categories = [
  { id: "all", name: "All Tools" },
  { id: "Image", name: "Image" },
  { id: "Accessibility", name: "Accessibility" },
  { id: "Theory", name: "Color Theory" },
  { id: "Picker", name: "Pickers" },
  { id: "Converter", name: "Converters" },
  { id: "Utility", name: "Utilities" },
];

export default function ColorToolsPage() {
  return (
    <div className="min-h-screen bg-background w-full">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Color Tools
          </h1>
          <p className="text-muted-foreground">
            A collection of color utilities for designers and developers
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.id === "all" ? "/color-tools" : `/color-tools?category=${category.id}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category.id === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              {category.name}
            </Link>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {colorTools.map((tool) => (
            <Link key={tool.name} href={tool.href}>
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                    <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                      {tool.category}
                    </span>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-primary">Open Tool →</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
