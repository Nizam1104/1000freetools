import React from "react";

export function CustomColorPaletteGeneratorSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          What Makes This Generator Different
        </h2>
        <p className="text-muted-foreground">
          This tool generates color palettes using actual color theory rules — analogous, complementary, triadic, split complementary, tetradic, and monochromatic harmonies. Unlike random palette generators, you can lock individual colors you like and regenerate only the ones you don't, then export directly to CSS, SCSS, JSON, or Tailwind config format.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How the Harmony Modes Work
        </h2>
        <p className="text-muted-foreground mb-4">
          Each harmony mode uses specific angle offsets on the color wheel. The tool converts your base color to HSL, applies the offset to the hue value, then converts back to hex.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Analogous (±30°)</h3>
            <p className="text-sm text-muted-foreground">
              Three colors next to each other on the wheel. Creates serene, comfortable designs. Think sunset gradients or ocean themes.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Complementary (180°)</h3>
            <p className="text-sm text-muted-foreground">
              Two opposite colors. Maximum contrast, maximum vibrancy. Works well for call-to-action buttons against neutral backgrounds.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Triadic (120° apart)</h3>
            <p className="text-sm text-muted-foreground">
              Three evenly spaced colors. Balanced but vibrant. Common in children's products and playful branding.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Split Complementary (150° + 210°)</h3>
            <p className="text-sm text-muted-foreground">
              Base color plus two colors adjacent to its complement. Strong visual contrast without the tension of direct complementary.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Tetradic (90° intervals)</h3>
            <p className="text-sm text-muted-foreground">
              Four colors forming a rectangle on the wheel. Rich and complex. Best when one color dominates and others accent.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Monochromatic</h3>
            <p className="text-sm text-muted-foreground">
              Same hue, varied saturation and lightness. Clean and cohesive. Ideal for minimalist designs and professional interfaces.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Real Workflows This Tool Handles
        </h2>
        <div className="space-y-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Matching a Brand Color</h3>
            <p className="text-sm text-muted-foreground">
              A designer has a client's logo hex code. They paste it as the base color, select complementary harmony, and instantly get accent colors that work with the existing brand. Lock the brand color, regenerate the accents until they find the right balance.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Building a Design System</h3>
            <p className="text-sm text-muted-foreground">
              A frontend developer needs a consistent color system for their component library. They generate a triadic palette, lock the primary and secondary colors, then use the monochromatic mode to create shade variations for each. Export as CSS variables for the entire team.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Fixing a Muddy Dashboard</h3>
            <p className="text-sm text-muted-foreground">
              Someone's admin panel uses random colors that clash. They pick one dominant color from their existing UI, run analogous harmony, and replace the scattered colors with a cohesive family. The dashboard suddenly feels intentional.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Creating Dark Mode Variants</h3>
            <p className="text-sm text-muted-foreground">
              A developer has a light theme palette. They lock the hue values, switch to monochromatic mode, and adjust lightness for each color to create dark mode equivalents. Same brand feel, different brightness.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Quick Social Media Graphics</h3>
            <p className="text-sm text-muted-foreground">
              A content creator needs consistent colors for Instagram posts. They pick their brand color, generate a tetradic palette for variety, save it, and now have go-to colors for backgrounds, text, and accents across all their graphics.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          What You Should Know Before Using It
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Harmony modes work best with mid-saturation colors.</strong> Highly saturated neons can produce jarring combinations. If your base is #00ff00, consider reducing saturation first.
          </p>
          <p>
            <strong>Locked colors stay locked during regeneration.</strong> This is intentional — lock colors you want to keep, hit regenerate, and only unlocked slots change.
          </p>
          <p>
            <strong>The UI preview shows approximate contrast.</strong> Use the dedicated Contrast Checker tool to verify WCAG compliance for actual text. This preview is for visual estimation only.
          </p>
          <p>
            <strong>Saved palettes are stored locally.</strong> Clear your browser cache and they're gone. Export important palettes as JSON or CSS for backup.
          </p>
          <p>
            <strong>Random mode ignores the base color.</strong> When set to Random, the base color picker disappears — it's not used. Switch to a harmony mode to leverage base color relationships.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Export Formats Explained
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">CSS Variables</h3>
            <pre className="bg-muted p-2 rounded text-xs font-mono overflow-x-auto mt-2">
              {`:root {
  --color-1: #3b82f6;
  --color-2: #f97316;
}`}
            </pre>
            <p className="text-sm text-muted-foreground mt-2">
              Drop into global CSS. Access via {`var(--color-1)`}. Works everywhere CSS works.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">SCSS Variables</h3>
            <pre className="bg-muted p-2 rounded text-xs font-mono overflow-x-auto mt-2">
              {`$color-1: #3b82f6;
$color-2: #f97316;`}
            </pre>
            <p className="text-sm text-muted-foreground mt-2">
              For Sass projects. Import into your stylesheets.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Tailwind Config</h3>
            <pre className="bg-muted p-2 rounded text-xs font-mono overflow-x-auto mt-2">
              {`colors: {
  custom: {
    1: "#3b82f6",
    2: "#f97316"
  }
}`}
            </pre>
            <p className="text-sm text-muted-foreground mt-2">
              Paste into tailwind.config.js theme extension. Use as {`bg-custom-1`}, {`text-custom-2`}, etc.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">JSON</h3>
            <pre className="bg-muted p-2 rounded text-xs font-mono overflow-x-auto mt-2">
              {`{
  "name": "My Palette",
  "colors": ["#3b82f6", "#f97316"]
}`}
            </pre>
            <p className="text-sm text-muted-foreground mt-2">
              For programmatic use. Import into build tools or design token systems.
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
            <h3 className="font-medium mb-2">Why do some harmony modes show fewer colors than others?</h3>
            <p className="text-sm text-muted-foreground">
              Each harmony type has a fixed number of base colors — complementary has 2, triadic has 3, tetradic has 4. If you have more color slots than the harmony provides, the tool cycles through the harmony colors and varies their lightness/saturation to fill the gaps.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I use this for accessibility-compliant palettes?</h3>
            <p className="text-sm text-muted-foreground">
              The harmony rules ensure colors work together aesthetically, but they don't guarantee WCAG contrast ratios. After generating a palette, copy your text/background pairs into the Contrast Checker to verify they meet AA or AAA standards.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What's the maximum number of colors I can generate?</h3>
            <p className="text-sm text-muted-foreground">
              The interface supports 2-10 colors per palette. You can add or remove slots using the Add Color button. For larger palettes, generate multiple smaller ones and merge them manually.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How do I recreate a color I saw somewhere?</h3>
            <p className="text-muted-foreground text-sm mb-2">
              Use the color picker input on any color slot:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
              <li>Click the color picker icon on any slot</li>
              <li>Enter the hex code you want to match</li>
              <li>Lock that color</li>
              <li>Select a harmony mode to generate matching colors around it</li>
            </ol>
          </div>
          <div>
            <h3 className="font-medium mb-2">Why does monochromatic mode look different from the lightness-based generator?</h3>
            <p className="text-sm text-muted-foreground">
              This monochromatic mode varies both lightness and saturation across the range for visual interest. The dedicated Color Palette Generator tool uses fixed lightness steps only. Use that one if you need predictable, evenly-spaced shades.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I share my saved palettes with teammates?</h3>
            <p className="text-sm text-muted-foreground">
              Saved palettes are stored in your browser only. To share, export as JSON and send the file. Your teammate can import it using the Palette Import tool or manually recreate the colors.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What happens if I regenerate with all colors locked?</h3>
            <p className="text-sm text-muted-foreground">
              Nothing changes — locked colors are protected from regeneration. Unlock at least one slot, or use the color picker to manually adjust a locked color first.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Is there a way to see what the palette looks like in use?</h3>
            <p className="text-sm text-muted-foreground">
              The UI Preview section shows your colors applied to sample cards, buttons, and text. It's not a full mockup, but it gives you a sense of how the colors interact in a typical interface.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          When to Use This vs. Other Color Tools
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Use this generator when</strong> you need harmonically related colors based on color theory rules. It's ideal for building complete palettes from a single starting point.
          </p>
          <p>
            <strong>Use the Color Palette Generator instead</strong> if you just need lighter/darker shades of one color without harmony relationships.
          </p>
          <p>
            <strong>Use the Advanced Color Picker when</strong> you need fine-grained control over individual color values in multiple formats (RGB, HSL, CMYK).
          </p>
          <p>
            <strong>Use the Contrast Checker alongside this tool</strong> to validate that your generated palette meets accessibility requirements for text readability.
          </p>
        </div>
      </div>
    </section>
  );
}

export default CustomColorPaletteGeneratorSEO;
