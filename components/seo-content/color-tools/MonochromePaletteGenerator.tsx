import React from "react";

export function MonochromePaletteGeneratorSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          What Is a Monochrome Color Palette
        </h2>
        <p className="text-muted-foreground">
          Monochrome palettes use variations of a single hue — different shades (darker), tints (lighter), and tones (muted) of one base color. Because all colors share the same hue, monochromatic schemes are inherently harmonious and work well for clean, minimal designs.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How the Monochrome Generator Works
        </h2>
        <p className="text-muted-foreground mb-4">
          The tool converts your base color to HSL (Hue, Saturation, Lightness), then generates variations by adjusting the lightness value while keeping hue and saturation constant. A base of hsl(217, 91%, 55%) might produce shades ranging from hsl(217, 91%, 15%) to hsl(217, 91%, 95%).
        </p>
        <div className="p-4 rounded-lg border bg-card">
          <h3 className="font-medium mb-2">Understanding the controls</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li><strong>Shade Count:</strong> How many colors to generate (3-11, odd numbers work best for a centered base)</li>
            <li><strong>Lightness Range:</strong> How far to extend from your base color (±10% to ±50%)</li>
            <li><strong>Base Color:</strong> The central color in your palette — all other shades derive from this</li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Where Monochrome Palettes Excel
        </h2>
        <div className="space-y-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Minimalist UI Design</h3>
            <p className="text-sm text-muted-foreground">
              A SaaS dashboard uses a blue monochrome palette for its entire interface. The lightest shade becomes the page background, medium shades for cards and inputs, and the darkest for text. The result feels cohesive without being boring.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Data Visualization</h3>
            <p className="text-sm text-muted-foreground">
              Someone is creating a single-series bar chart. They use a monochrome palette so viewers focus on the data values, not color differences. Each bar is a different shade, making the chart readable even when printed in grayscale.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Brand Consistency</h3>
            <p className="text-sm text-muted-foreground">
              A company with a brand blue needs colors for buttons, hover states, disabled states, and backgrounds. A monochrome palette ensures all UI states feel like they belong to the same family — no clashing accent colors.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Typography Hierarchy</h3>
            <p className="text-sm text-muted-foreground">
              A designer uses a gray monochrome palette for text: darkest for headings, medium-dark for body, lighter for captions, lightest for placeholders. The hierarchy is clear without introducing multiple hues.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Accessibility-Friendly Design</h3>
            <p className="text-sm text-muted-foreground">
              Monochrome palettes work well for users with color vision deficiencies. Since all colors share the same hue, the primary differentiator is lightness — which is perceivable by virtually everyone.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Tips for Better Monochrome Palettes
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Start with a mid-lightness base.</strong> If your base is already at 90% lightness, you can't go much lighter. Aim for 40-60% lightness to have room for both shades and tints.
          </p>
          <p>
            <strong>Wider range = more contrast.</strong> A ±40% range gives you dramatic contrast between lightest and darkest. A ±20% range creates subtle, sophisticated variations. Choose based on your design needs.
          </p>
          <p>
            <strong>More shades aren't always better.</strong> 5-7 colors is usually enough for a complete UI system. More than 9 becomes hard to distinguish, especially on lower-quality displays.
          </p>
          <p>
            <strong>Test in grayscale.</strong> Convert your monochrome palette to pure black and white. If you can still distinguish each shade, the lightness progression is working.
          </p>
          <p>
            <strong>Consider your background.</strong> If your UI background is white, you need lighter shades for subtle elements. If it's dark, you need darker shades. Adjust the range accordingly.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Export Options
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">CSS Variables</h3>
            <pre className="bg-muted p-2 rounded text-xs font-mono overflow-x-auto mt-2">
              {`:root {
  --monochrome-base: #3b82f6;
  --monochrome-1: #eff6ff;
  --monochrome-2: #dbeafe;
  --monochrome-3: #bfdbfe;
  --monochrome-4: #93c5fd;
  --monochrome-5: #60a5fa;
}`}
            </pre>
            <p className="text-sm text-muted-foreground mt-2">
              Drop into your global CSS. Reference as {`background: var(--monochrome-2);`}. Works with any framework.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Tailwind Config</h3>
            <pre className="bg-muted p-2 rounded text-xs font-mono overflow-x-auto mt-2">
              {`module.exports = {
  theme: {
    extend: {
      colors: {
        monochrome: {
          1: '#eff6ff',
          2: '#dbeafe',
          // ...
        }
      }
    }
  }
}`}
            </pre>
            <p className="text-sm text-muted-foreground mt-2">
              Extend Tailwind's theme. Use as {`bg-monochrome-2`}, {`text-monochrome-4`}, etc.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">JSON Export</h3>
            <pre className="bg-muted p-2 rounded text-xs font-mono overflow-x-auto mt-2">
              {`{
  "base": "#3b82f6",
  "shades": [
    {"hex": "#eff6ff", "lightness": 95},
    {"hex": "#dbeafe", "lightness": 85}
  ]
}`}
            </pre>
            <p className="text-sm text-muted-foreground mt-2">
              Programmatic access with lightness metadata. Import into design systems or build tools.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">PNG Preview</h3>
            <p className="text-sm text-muted-foreground">
              Downloads a visual strip showing all shades side-by-side. Useful for sharing with teammates or including in design documentation.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Why are some shades hard to distinguish?</h3>
            <p className="text-sm text-muted-foreground">
              If your lightness range is too narrow (like ±10%), adjacent shades may look identical. Increase the range to ±30% or more for clearer differentiation. Also, human eyes are less sensitive to lightness differences at extreme ends (very light or very dark).
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I create a monochrome palette from an image?</h3>
            <p className="text-sm text-muted-foreground">
              Use the Extract Colors from Image tool to pull colors from a photo, then pick the dominant hue as your base color here. Or use the Dominant Color Finder to get the primary color, then generate monochrome variations from it.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How is this different from the Shade Tint Tone Generator?</h3>
            <p className="text-sm text-muted-foreground">
              This tool generates a full range of lightness variations automatically. The Shade Tint Tone Generator gives you manual control over individual shade, tint, and tone adjustments. Use this for quick complete palettes, use that for fine-tuned control.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What's the best base color for monochrome UIs?</h3>
            <p className="text-sm text-muted-foreground">
              Blues and grays are safest for professional interfaces. Greens work well for finance or health apps. Avoid highly saturated reds or purples as your base — they can feel overwhelming when used throughout an entire UI.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I add an accent color to a monochrome palette?</h3>
            <p className="text-sm text-muted-foreground">
              Absolutely. Monochrome doesn't mean you can only use one color — it means one color dominates. Add a complementary accent for CTAs, links, or important states. The Complementary Color Finder can help you choose an accent that pops.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Why does my base color shift when I change the range?</h3>
            <p className="text-sm text-muted-foreground">
              The base color stays fixed — but the tool recalculates which shade is considered "base" based on the total number of shades. With 7 shades, the 4th is the base. With 5 shades, the 3rd is the base. The actual base color value doesn't change.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How do I ensure WCAG compliance with monochrome colors?</h3>
            <p className="text-sm text-muted-foreground">
              Monochrome palettes make contrast easier to manage since you're only adjusting lightness. Use the Contrast Checker to verify your text/background combinations. Generally, you need at least 3-4 lightness steps between text and background for AA compliance.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          When to Use This vs. Other Tools
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Use this Monochrome Generator when</strong> you need a complete range of lightness variations from a single base color for UI systems or data visualization.
          </p>
          <p>
            <strong>Use the Color Palette Generator when</strong> you want a simpler 5-color scale with fixed lightness steps (less customization, faster workflow).
          </p>
          <p>
            <strong>Use the Shade Tint Tone Generator when</strong> you need manual control over individual shade, tint, and tone adjustments rather than automatic generation.
          </p>
          <p>
            <strong>Use the Custom Color Palette Generator when</strong> you want multiple colors with color theory harmonies (complementary, analogous, etc.) instead of monochromatic variations.
          </p>
        </div>
      </div>
    </section>
  );
}

export default MonochromePaletteGeneratorSEO;
