import React from "react";

export function PastelPaletteGeneratorSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          What Makes a Color "Pastel"
        </h2>
        <p className="text-muted-foreground">
          Pastel colors have low saturation (25-45%) and high lightness (80-95%). They're created by taking a pure hue and mixing it with a lot of white — resulting in soft, muted tones that feel gentle and approachable. Think baby blue, blush pink, mint green, and lavender.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How the Pastel Generator Works
        </h2>
        <p className="text-muted-foreground mb-4">
          The tool generates colors in HSL space with carefully constrained ranges. Hue is random (or based on harmony rules), saturation stays between 25-45%, and lightness between 80-95%. The softness control blends colors further toward white for an even more muted effect.
        </p>
        <div className="p-4 rounded-lg border bg-card">
          <h3 className="font-medium mb-2">Understanding the controls</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li><strong>Palette Size:</strong> How many colors to generate (3-8 colors)</li>
            <li><strong>Color Harmony:</strong> Random, analogous (neighbors), complementary (opposites), or triadic (triangle on color wheel)</li>
            <li><strong>Softness:</strong> Additional blending toward white. 0% = standard pastels, 100% = extremely muted, almost-white tones</li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Where Pastel Palettes Work Best
        </h2>
        <div className="space-y-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Baby and Children's Products</h3>
            <p className="text-sm text-muted-foreground">
              A nursery brand needs colors for their website and packaging. Pastels feel gentle, safe, and age-appropriate. Soft blues, pinks, and yellows create a calming environment that parents associate with baby products.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Wellness and Self-Care Brands</h3>
            <p className="text-sm text-muted-foreground">
              A meditation app uses pastel gradients for their backgrounds. The muted tones don't overstimulate — they support the calm, centered feeling the app promises. Bright colors would feel jarring in this context.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Lifestyle and Home Decor</h3>
            <p className="text-sm text-muted-foreground">
              An interior design blog uses pastels for their brand palette. The colors feel homey, comfortable, and aspirational without being aggressive. Pastel walls, textiles, and decor are trending in modern minimalism.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Spring and Easter Themes</h3>
            <p className="text-sm text-muted-foreground">
              Seasonal marketing materials lean heavily on pastels — they evoke spring flowers, Easter eggs, and renewal. A retailer generates a pastel palette for their spring campaign landing pages.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Feminine Branding</h3>
            <p className="text-sm text-muted-foreground">
              While not exclusive to feminine brands, pastels are often chosen for products targeting women. Soft pinks, lavenders, and mint greens signal gentleness and approachability in beauty, fashion, and lifestyle spaces.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Background Colors for UI</h3>
            <p className="text-sm text-muted-foreground">
              Pastels work beautifully as background colors — they add subtle color without competing with content. A SaaS dashboard uses pastel blues and greens for section backgrounds, keeping the interface friendly but professional.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Harmony Modes Explained
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Random</h3>
            <p className="text-sm text-muted-foreground">
              Each color is independently generated with random hue. Results are playful and varied — great for eclectic, fun designs. May need multiple generations to find a cohesive set.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Analogous</h3>
            <p className="text-sm text-muted-foreground">
              Colors are neighbors on the color wheel (within ~90°). Creates harmonious, cohesive palettes that feel intentional. Think mint, seafoam, and soft teal together.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Complementary</h3>
            <p className="text-sm text-muted-foreground">
              Alternates between opposite hues (180° apart). Creates gentle contrast — soft pink paired with soft mint. More visual interest than analogous while staying subtle.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Triadic</h3>
            <p className="text-sm text-muted-foreground">
              Three colors evenly spaced on the wheel (120° apart). Balanced variety with good coverage. A triadic pastel palette might include soft pink, soft yellow, and soft blue.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Tips for Using Pastels Effectively
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Watch your text contrast.</strong> Pastels are light, which means dark text is essential. White text on pastel backgrounds often fails accessibility checks. Use the Contrast Checker to verify your combinations.
          </p>
          <p>
            <strong>Don't overdo it.</strong> All-pastel interfaces can feel washed out or juvenile. Use pastels as accents or backgrounds, with some neutral grays or darker colors for grounding.
          </p>
          <p>
            <strong>Consider your audience.</strong> Pastels read differently across cultures and demographics. What feels calming to one audience might feel childish to another. Know your users.
          </p>
          <p>
            <strong>Use the softness control.</strong> If generated colors feel too saturated, increase softness. If they're too washed out, decrease it. Small adjustments make noticeable differences.
          </p>
          <p>
            <strong>Test in context.</strong> Pastels look different on different screens and in different lighting. Preview your palette on actual devices before committing.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Export Options
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">CSS Variables</h3>
            <pre className="bg-muted p-2 rounded text-xs font-mono overflow-x-auto mt-2">
              {`:root {
  --pastel-1: #fecdd3;
  --pastel-2: #fed7aa;
  --pastel-3: #fef3c7;
}`}
            </pre>
            <p className="text-sm text-muted-foreground mt-2">
              Ready for web use. Reference as {`var(--pastel-1)`}.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">SCSS Variables</h3>
            <pre className="bg-muted p-2 rounded text-xs font-mono overflow-x-auto mt-2">
              {`$pastel-1: #fecdd3;
$pastel-2: #fed7aa;
$pastel-3: #fef3c7;`}
            </pre>
            <p className="text-sm text-muted-foreground mt-2">
              For Sass/SCSS projects. Import into your stylesheets.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">JSON</h3>
            <pre className="bg-muted p-2 rounded text-xs font-mono overflow-x-auto mt-2">
              {`[{"hex": "#fecdd3", "name": "Blush 350"}, ...]`}
            </pre>
            <p className="text-sm text-muted-foreground mt-2">
              Programmatic access with generated color names.
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
            <h3 className="font-medium mb-2">Why do my pastel colors look different on different screens?</h3>
            <p className="text-sm text-muted-foreground">
              Pastels are subtle — small variations in display calibration show more noticeably in low-saturation colors. A color that looks like soft gray on your monitor might look slightly pink on someone else's. This is inherent to pastels, not a tool issue.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I generate pastels from a specific base color?</h3>
            <p className="text-sm text-muted-foreground">
              This tool generates random pastels. For pastels based on a specific hue, use the Color Palette Generator with high lightness values, or manually create tints by mixing your base color with white in a color picker.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How do I make pastels that aren't too childish?</h3>
            <p className="text-sm text-muted-foreground">
              Pair pastels with sophisticated neutrals (charcoal, warm gray, navy). Use them sparingly as accents rather than dominant colors. Choose analogous harmony for a more refined, intentional feel versus random generation.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What's the best pastel combination for accessibility?</h3>
            <p className="text-sm text-muted-foreground">
              Use pastels only for backgrounds and large decorative elements. Always pair with dark text (not white). For critical UI elements, use darker, more saturated colors. Pastels alone rarely meet WCAG contrast requirements for text.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I save my favorite pastel palettes?</h3>
            <p className="text-sm text-muted-foreground">
              This tool doesn't have built-in save functionality. Copy the colors using the export buttons, or use the Favorite Colors Manager to store palettes you want to reuse.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Why does increasing softness make colors look washed out?</h3>
            <p className="text-sm text-muted-foreground">
              That's the point — softness blends colors toward white, reducing saturation further. If colors look too washed out, decrease the softness slider. 30-50% is usually a good range for visible-but-muted pastels.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Are pastel colors trend-dependent?</h3>
            <p className="text-sm text-muted-foreground">
              Pastel popularity cycles — they're associated with certain eras (1950s kitchens, 1980s Miami Vice, 2010s millennial pink). If you're building a long-term brand, consider whether pastels align with your timeless identity or if they're a trend play.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          When to Use This vs. Other Palette Tools
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Use this Pastel Generator when</strong> you specifically need soft, muted colors with high lightness and low saturation for gentle, approachable designs.
          </p>
          <p>
            <strong>Use the Color Palette Generator when</strong> you want full control over lightness steps from a base color — including but not limited to pastel ranges.
          </p>
          <p>
            <strong>Use the Custom Color Palette Generator when</strong> you want color theory-based harmonies (complementary, analogous, etc.) without the pastel constraint.
          </p>
          <p>
            <strong>Use the Shade Tint Tone Generator when</strong> you want to manually create pastel tints by mixing a specific base color with white.
          </p>
        </div>
      </div>
    </section>
  );
}

export default PastelPaletteGeneratorSEO;
