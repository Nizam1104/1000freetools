import React from "react";

export function DuotonePaletteGeneratorSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          What Is a Duotone Color Palette
        </h2>
        <p className="text-muted-foreground">
          Duotone uses two base colors to create a cohesive palette with smooth transitions between them. Unlike full-spectrum gradients, duotone restricts the color range to mixes of just two hues — creating a modern, minimalist aesthetic that works well for branding, posters, and UI design.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How the Duotone Generator Works
        </h2>
        <p className="text-muted-foreground mb-4">
          The tool takes your primary and secondary colors, then calculates three intermediate mixes at 25%, 50%, and 75% ratios. This gives you a 5-color palette that transitions smoothly from one hue to the other.
        </p>
        <div className="p-4 rounded-lg border bg-card">
          <h3 className="font-medium mb-2">The Math Behind the Mix</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Each mixed color is calculated by blending the RGB values of your two colors. For a 50% mix of #3b82f6 (blue) and #1e293b (slate):
          </p>
          <pre className="bg-muted p-3 rounded text-xs font-mono overflow-x-auto">
            {`R: (59 × 0.5) + (30 × 0.5) = 44.5 → 44
G: (130 × 0.5) + (41 × 0.5) = 85.5 → 85
B: (246 × 0.5) + (59 × 0.5) = 152.5 → 152
Result: #2c5598`}
          </pre>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Where Duotone Palettes Work Best
        </h2>
        <div className="space-y-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Brand Identity Systems</h3>
            <p className="text-sm text-muted-foreground">
              A startup picks their brand blue and a contrasting dark slate. The duotone palette becomes their visual signature — used across their website gradients, presentation decks, and social media templates. The restricted palette feels cohesive and professional.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Music and Event Posters</h3>
            <p className="text-sm text-muted-foreground">
              A designer creates a festival poster using vibrant pink and deep purple. The duotone gradient background makes typography pop while keeping the design unified. Print costs stay low since the palette is limited.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">SaaS Landing Pages</h3>
            <p className="text-sm text-muted-foreground">
              A B2B company uses a teal-to-indigo gradient for their hero section. The intermediate mix colors become button states, badge backgrounds, and progress indicators. Everything feels connected because all colors come from the same two-source palette.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Social Media Templates</h3>
            <p className="text-sm text-muted-foreground">
              A content creator builds Instagram story templates using their brand's duotone palette. They use the primary color for text, the secondary for backgrounds, and the mixed colors for decorative elements. Their feed looks consistent without being repetitive.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Data Visualization</h3>
            <p className="text-sm text-muted-foreground">
              A data analyst creates a choropleth map using the five duotone steps. Each shade represents a different value range. The gradient feels natural because all colors share the same underlying hue transition.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">App Icon Design</h3>
            <p className="text-sm text-muted-foreground">
              An indie developer designs their iOS app icon using a duotone gradient. The restricted palette stands out in the App Store while maintaining visual clarity at small sizes.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Choosing Primary and Secondary Colors
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">High Contrast Combinations</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Pair a vibrant color with a dark neutral for maximum impact:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Bright blue + charcoal gray</li>
              <li>• Hot pink + deep navy</li>
              <li>• Electric green + black</li>
              <li>• Orange + dark brown</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Analogous Harmony</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Use adjacent colors for a softer, more blended look:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Teal + blue</li>
              <li>• Coral + orange</li>
              <li>• Purple + magenta</li>
              <li>• Yellow + lime green</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Complementary Tension</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Opposite colors create energy through the middle mixes:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Blue + orange</li>
              <li>• Red + cyan</li>
              <li>• Purple + yellow</li>
              <li>• Magenta + green</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">What to Avoid</h3>
            <p className="text-sm text-muted-foreground">
              Two equally dark colors produce muddy midtones. Two equally light colors lack contrast. Aim for one vibrant or light color paired with one darker anchor color.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Export Formats and How to Use Them
        </h2>
        <div className="space-y-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">CSS Variables</h3>
            <pre className="bg-muted p-3 rounded text-xs font-mono overflow-x-auto mb-3">
              {`:root {
  --duotone-primary: #3b82f6;
  --duotone-secondary: #1e293b;
  --duotone-mix-1: #5a6fa8;
  --duotone-mix-2: #7a89b5;
  --duotone-mix-3: #99a3c2;
}`}
            </pre>
            <p className="text-sm text-muted-foreground">
              Import into your global stylesheet. Use as {`background: var(--duotone-primary);`}. Works with any CSS framework.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">JSON</h3>
            <pre className="bg-muted p-3 rounded text-xs font-mono overflow-x-auto mb-3">
              {`{
  "primary": "#3b82f6",
  "secondary": "#1e293b",
  "mix1": "#5a6fa8",
  "mix2": "#7a89b5",
  "mix3": "#99a3c2"
}`}
            </pre>
            <p className="text-sm text-muted-foreground">
              Import into design token systems, build tools, or JavaScript projects. Programmatically accessible.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">PNG Image</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Downloads a visual preview of your gradient. Use for:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Quick mockups and presentations</li>
              <li>• Sharing with clients or teammates</li>
              <li>• Reference images for design tools</li>
              <li>• Social media previews</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">What makes a good duotone combination?</h3>
            <p className="text-sm text-muted-foreground">
              Good duotone pairs have clear contrast — either in lightness (one light, one dark) or in hue (distinctly different colors). Test combinations using the preset colors, then fine-tune with the color picker. If the gradient looks muddy in the middle, try increasing the contrast between your two base colors.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I use duotone for accessibility?</h3>
            <p className="text-sm text-muted-foreground">
              Duotone itself is a stylistic choice, not an accessibility feature. You still need to verify that text has sufficient contrast against background colors. Use the Contrast Checker tool to test your specific combinations. Generally, use the darkest color for text on light backgrounds, or the lightest color for text on dark backgrounds.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How is duotone different from a gradient?</h3>
            <p className="text-sm text-muted-foreground">
              A gradient is the visual transition effect. Duotone refers to the restricted color palette — only two base hues. This tool generates both: a duotone palette (5 discrete colors) and gradient previews showing how they blend. You can use the discrete colors for UI elements or the gradient for backgrounds.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Why are there exactly 5 colors in the palette?</h3>
            <p className="text-sm text-muted-foreground">
              Five colors give you the two endpoints plus three evenly-spaced intermediate mixes. This provides enough variety for most design systems (primary, secondary, hover states, active states, backgrounds) without overwhelming complexity. For more steps, use the Color Scale Generator tool.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I create tritone or multitone palettes?</h3>
            <p className="text-sm text-muted-foreground">
              This tool is specifically for duotone (two-color) palettes. For three-color gradients, try the Gradient Step Generator. For full palettes with multiple independent colors, use the Color Palette Generator or Custom Color Palette Generator.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How do I use duotone in Tailwind CSS?</h3>
            <p className="text-sm text-muted-foreground">
              Copy the CSS variables export and add them to your global CSS file. Then reference them using arbitrary values like {`bg-[var(--duotone-primary)]`}. For a cleaner setup, extend your tailwind.config.js theme with your duotone colors as named utilities.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What's the best way to pick colors if I'm not a designer?</h3>
            <p className="text-sm text-muted-foreground">
              Start with the preset combinations — click through the primary and secondary preset grids to see instant previews. Look for combinations where you can clearly distinguish all five steps in the gradient. If in doubt, pick a bright color you like and pair it with a dark gray or navy.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I save my duotone palette for later?</h3>
            <p className="text-sm text-muted-foreground">
              This tool doesn't have built-in save functionality. Export as JSON to keep a digital copy, or bookmark the page with your colors in the URL if that feature is available. For palette management, use the Favorite Colors Manager or Palette Export Tool.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Duotone vs. Other Color Palette Approaches
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Use this duotone generator when</strong> you want a cohesive gradient-based palette from exactly two colors. Ideal for modern branding, hero sections, and anywhere you need smooth color transitions.
          </p>
          <p>
            <strong>Use the Color Harmony Generator when</strong> you need multiple independent colors based on color theory rules (complementary, triadic, analogous). Better for full UI palettes with distinct semantic colors.
          </p>
          <p>
            <strong>Use the Gradient Step Generator when</strong> you need more control over the number of steps between two colors, or when you want to generate gradients between multiple color stops.
          </p>
          <p>
            <strong>Use the Complementary Color Finder when</strong> you have one color and just need to find its opposite on the color wheel — without the intermediate mixes.
          </p>
        </div>
      </div>
    </section>
  );
}

export default DuotonePaletteGeneratorSEO;
