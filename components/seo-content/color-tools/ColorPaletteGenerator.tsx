import React from "react";

export function ColorPaletteGeneratorSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          What This Generator Creates
        </h2>
        <p className="text-muted-foreground">
          Starting from a single base color, this tool generates a 5-color palette with lighter and darker variations. The palette includes the base color plus two lighter shades and two darker shades — perfect for creating UI states, hover effects, and visual hierarchy.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How the Palette Is Generated
        </h2>
        <p className="text-muted-foreground mb-4">
          The tool adjusts the lightness value in HSL color space. Lighter colors increase lightness by fixed increments. Darker colors decrease it. This keeps the hue and saturation consistent, ensuring all colors feel like they belong to the same family.
        </p>
        <p className="text-muted-foreground">
          For a base of hsl(217, 91%, 60%), the palette might include hsl(217, 91%, 80%), hsl(217, 91%, 70%), hsl(217, 91%, 60%), hsl(217, 91%, 40%), hsl(217, 91%, 20%).
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Using the Generated Palette
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Button States</h3>
            <p className="text-sm text-muted-foreground">
              Base color for the default button. Lighter for hover. Darker for active/pressed. Lightest for disabled. One palette covers all interaction states.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Background Hierarchy</h3>
            <p className="text-sm text-muted-foreground">
              Use the lightest shade for page background. Next lightest for cards. Base for accents. Dark shades for text. Everything feels cohesive.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Data Visualization</h3>
            <p className="text-sm text-muted-foreground">
              Each shade represents a different value range in a choropleth map or heat map. The gradient feels natural because all colors share the same hue.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Typography Scale</h3>
            <p className="text-sm text-muted-foreground">
              Darkest shade for headings. Medium-dark for body text. Lighter shades for secondary text and placeholders. All text colors work together.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Exporting Your Palette
        </h2>
        <p className="text-muted-foreground mb-3">
          The CSS Variables export gives you ready-to-use custom properties:
        </p>
        <pre className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto mb-4">
          {`:root {
  --palette-50: #eff6ff;
  --palette-100: #dbeafe;
  --palette-200: #bfdbfe;
  --palette-300: #93c5fd;
  --palette-400: #60a5fa;
}`}
        </pre>
        <p className="text-muted-foreground">
          Use them directly: {`background: var(--palette-200);`} or integrate into Tailwind by extending the theme.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Can I customize the lightness steps?</h3>
            <p className="text-sm text-muted-foreground">
              This tool uses fixed increments for simplicity. For custom steps, use the Shade Tint Tone Generator or Color Scale Generator tools.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Why do some palettes look muddy?</h3>
            <p className="text-sm text-muted-foreground">
              Highly saturated base colors can become overwhelming when varied in lightness. Try reducing the base saturation, or use the Pastel Palette Generator for softer results.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How do I use this with Tailwind CSS?</h3>
            <p className="text-sm text-muted-foreground">
              Copy the CSS variables export and add them to your global CSS. Or use the Tailwind export format and merge it into your tailwind.config.js theme extension.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What if I need more than 5 colors?</h3>
            <p className="text-sm text-muted-foreground">
              Use the Color Scale Generator, which supports 3-15 steps. Or generate multiple palettes from different base colors and merge them with the Palette Merger tool.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I generate complementary palettes?</h3>
            <p className="text-sm text-muted-foreground">
              This tool creates monochromatic variations. For complementary colors, use the Color Harmony Generator. Then use this tool on each harmony color for full palettes.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Are these palettes accessible?</h3>
            <p className="text-sm text-muted-foreground">
              The palette provides options, but you still need to check contrast. Use the Contrast Checker to verify your specific color combinations meet WCAG requirements.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Tips for Better Palettes
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Start with a mid-lightness base.</strong> If your base is already very light or very dark, there's less room to vary. Aim for 40-60% lightness for the most flexibility.
          </p>
          <p>
            <strong>Test in grayscale.</strong> Convert your palette to black and white. If the steps are still distinguishable, the lightness progression works.
          </p>
          <p>
            <strong>Consider the use case.</strong> UI states need clear differentiation. Background hierarchies can be more subtle. Adjust your base color accordingly.
          </p>
          <p>
            <strong>Export early, export often.</strong> Save your palette as CSS variables before you lose it. It's easy to regenerate, but why risk losing a good combination?
          </p>
        </div>
      </div>
    </section>
  );
}

export default ColorPaletteGeneratorSEO;
