import React from "react";

export function ColorWheelSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          What Is a Color Wheel?
        </h2>
        <p className="text-muted-foreground">
          A color wheel arranges all 360 degrees of hue in a circle, showing how colors relate to each other. Primary colors (red, green, blue) are evenly spaced. Secondary and tertiary colors fill the gaps. It's the foundation for understanding color harmony and relationships.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How to Use This Interactive Wheel
        </h2>
        <p className="text-muted-foreground mb-4">
          Click anywhere on the wheel to select that hue. Adjust saturation and lightness with the sliders below. The tool instantly generates harmony colors (complementary, analogous, triadic, etc.) based on your selection.
        </p>
        <p className="text-muted-foreground">
          The preview shows your color alongside its harmony partners, so you can see how they work together before committing to a palette.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Understanding Color Relationships
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Complementary (180° apart)</h3>
            <p className="text-sm text-muted-foreground">
              Colors directly opposite each other. Maximum contrast, high energy. Blue and orange, red and green, yellow and purple.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Analogous (±30°)</h3>
            <p className="text-sm text-muted-foreground">
              Colors next to each other on the wheel. Low contrast, harmonious and serene. Blue, blue-green, and green work well together.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Triadic (120° apart)</h3>
            <p className="text-sm text-muted-foreground">
              Three colors forming an equilateral triangle. Balanced contrast with variety. Red, yellow, and blue form the classic primary triad.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Split Complementary</h3>
            <p className="text-sm text-muted-foreground">
              Your base color plus the two colors adjacent to its complement. High contrast without the tension of direct complementary.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Real Use Cases
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Finding a Complementary Accent</h3>
            <p className="text-sm text-muted-foreground">
              Your website is mostly blue, but the CTA buttons feel invisible. The wheel shows orange is 180° from blue. You try an orange button — suddenly it pops.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Building a Cohesive Palette</h3>
            <p className="text-sm text-muted-foreground">
              A designer picks a base green, then uses the analogous harmony to find neighboring hues. The resulting palette feels unified because the colors share undertones.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Understanding Why Colors Clash</h3>
            <p className="text-sm text-muted-foreground">
              Two colors feel "off" together. The wheel reveals they're about 45° apart — too close to be complementary, too far to be analogous. Adjusting one fixes the tension.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Learning Color Theory</h3>
            <p className="text-sm text-muted-foreground">
              A student explores the wheel, seeing firsthand how triadic harmony creates balance, or how analogous colors feel calm. Visual learning beats memorizing rules.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Primary, Secondary, and Tertiary Colors
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Primary (0°, 120°, 240°):</strong> Red, green, blue. These can't be created by mixing other colors. All other hues derive from these three.
          </p>
          <p>
            <strong>Secondary (60°, 180°, 300°):</strong> Yellow, cyan, magenta. Each is a mix of two primaries. Yellow = red + green, cyan = green + blue, magenta = blue + red.
          </p>
          <p>
            <strong>Tertiary (30°, 90°, 150°, 210°, 270°, 330°):</strong> Red-orange, yellow-green, blue-green, blue-purple, red-purple, yellow-orange. Mixes of primary and secondary.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Why are the primaries red, green, and blue?</h3>
            <p className="text-sm text-muted-foreground">
              This is the RGB color model for light (additive color). Screens emit red, green, and blue light to create all other colors. Print uses different primaries (cyan, magenta, yellow).
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What's the difference between this and the Color Harmony Generator?</h3>
            <p className="text-sm text-muted-foreground">
              This tool shows the full wheel and lets you explore all harmonies visually. The Harmony Generator focuses on one base color and outputs exportable palettes. Use this for exploration, that for production.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I use this for print design?</h3>
            <p className="text-sm text-muted-foreground">
              The wheel uses RGB/RYB models for screens. For print, the relationships still apply, but the actual colors will shift when converted to CMYK. Use it for harmony planning, then verify in CMYK.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Why does the wheel show different colors at different saturations?</h3>
            <p className="text-sm text-muted-foreground">
              The outer edge is 100% saturation (pure hues). Moving inward reduces saturation toward gray. This helps you see how a hue looks at different intensities.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What about warm and cool colors?</h3>
            <p className="text-sm text-muted-foreground">
              Warm colors (reds, oranges, yellows) occupy roughly 0-60° and 300-360°. Cool colors (greens, blues, purples) occupy 60-300°. Use our Warm or Cool Color Detector for precise classification.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How do I save a color from the wheel?</h3>
            <p className="text-sm text-muted-foreground">
              Copy the hex code shown below the wheel. Then use the Color Picker, Favorite Colors Manager, or Palette Export Tool to save and organize it.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Tips for Using the Color Wheel
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Start with the mood.</strong> Want energy? Look at complementary pairs. Want calm? Try analogous. Want balance? Go triadic.
          </p>
          <p>
            <strong>Adjust saturation and lightness.</strong> Two colors might clash at full saturation but work beautifully when one is muted. The sliders let you fine-tune.
          </p>
          <p>
            <strong>Consider context.</strong> A color that looks good on the wheel might not work in your actual design. Always test in context.
          </p>
          <p>
            <strong>Use the wheel as a starting point.</strong> Color theory provides guidelines, not rules. If something feels right but breaks the "rules," trust your eyes.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ColorWheelSEO;
