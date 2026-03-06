import React from "react";

export function ComplementaryColorFinderSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          What Is a Complementary Color?
        </h2>
        <p className="text-muted-foreground">
          A complementary color sits directly opposite another color on the color wheel — exactly 180 degrees apart. This creates maximum contrast and visual tension. Red complements green, blue complements orange, yellow complements purple.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How the Finder Works
        </h2>
        <p className="text-muted-foreground mb-4">
          The tool converts your input color to HSL, adds 180 to the hue value (wrapping around at 360), and converts back to display formats. It also calculates analogous colors (±30 degrees) and triadic colors (±120 degrees) for additional options.
        </p>
        <p className="text-muted-foreground">
          For example, if your base is hsl(217, 91%, 60%) — a blue — the complement is hsl(37, 91%, 60%) — an orange.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          When to Use Complementary Colors
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Call-to-Action Buttons</h3>
            <p className="text-sm text-muted-foreground">
              Your site is mostly blue. An orange CTA button (blue's complement) will stand out more than any other color. The contrast draws the eye naturally.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Highlighting Important Elements</h3>
            <p className="text-sm text-muted-foreground">
              Error messages in red pop against a green success indicator. Warning icons in orange stand out against blue interfaces. Complementary colors create instant visual hierarchy.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Sports Team Branding</h3>
            <p className="text-muted-foreground text-sm">
              Many sports teams use complementary colors for their uniforms and logos. The high contrast looks dynamic on TV and makes the team instantly recognizable.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Creating Visual Energy</h3>
            <p className="text-sm text-muted-foreground">
              A poster for a music festival uses purple and yellow throughout. The complementary tension feels energetic and exciting — perfect for the event's vibe.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Using Complementary Colors Without Overwhelming
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Use one as the dominant color.</strong> If your design is 80% blue and 20% orange, it feels balanced. At 50/50, it feels chaotic and competing.
          </p>
          <p>
            <strong>Adjust saturation for subtlety.</strong> A muted orange (like terracotta) complements blue without screaming. Lower saturation reduces visual tension while keeping the relationship.
          </p>
          <p>
            <strong>Try split complementary instead.</strong> Use your base color plus the two colors adjacent to its complement. You get variety with less direct tension.
          </p>
          <p>
            <strong>Consider lightness differences.</strong> A dark blue with a light orange (or vice versa) adds contrast in both hue and value, making the combination more readable.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Why does my complement look wrong?</h3>
            <p className="text-sm text-muted-foreground">
              The mathematical complement is always 180° apart, but perceptual complement (what looks opposite) can vary based on context, surrounding colors, and individual vision. Trust your eyes over the formula.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can complementary colors be accessible?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but check the contrast ratio. Complementary colors can have similar lightness, resulting in poor contrast. Use our Contrast Checker to verify text-background combinations meet WCAG standards.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What about red-green color blindness?</h3>
            <p className="text-sm text-muted-foreground">
              Red and green are complements, but they're indistinguishable for many people with red-green color blindness. Don't rely solely on this pair to convey information — add labels, icons, or patterns.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How is this different from the Color Harmony Generator?</h3>
            <p className="text-sm text-muted-foreground">
              This tool focuses specifically on complementary colors plus analogous and triadic options. The Harmony Generator offers more harmony types (tetradic, square, split) with export functionality.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I use complements for text and background?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but ensure sufficient lightness contrast. A dark blue background with light orange text can work well. Two medium-lightness complements might fail accessibility requirements.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What are analogous colors?</h3>
            <p className="text-sm text-muted-foreground">
              Analogous colors sit next to your base color on the wheel (±30°). They share similar undertones and create harmonious, low-contrast palettes. Blue, blue-green, and green are analogous.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Common Complementary Pairs
        </h2>
        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          <div className="p-3 rounded border">
            <p className="font-medium">Red ↔ Green</p>
            <p className="text-muted-foreground text-xs">0° ↔ 120°</p>
          </div>
          <div className="p-3 rounded border">
            <p className="font-medium">Orange ↔ Blue</p>
            <p className="text-muted-foreground text-xs">30° ↔ 210°</p>
          </div>
          <div className="p-3 rounded border">
            <p className="font-medium">Yellow ↔ Purple</p>
            <p className="text-muted-foreground text-xs">60° ↔ 240°</p>
          </div>
          <div className="p-3 rounded border">
            <p className="font-medium">Yellow-Green ↔ Red-Purple</p>
            <p className="text-muted-foreground text-xs">90° ↔ 270°</p>
          </div>
          <div className="p-3 rounded border">
            <p className="font-medium">Green ↔ Magenta</p>
            <p className="text-muted-foreground text-xs">120° ↔ 300°</p>
          </div>
          <div className="p-3 rounded border">
            <p className="font-medium">Blue-Green ↔ Red-Orange</p>
            <p className="text-muted-foreground text-xs">150° ↔ 330°</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ComplementaryColorFinderSEO;
