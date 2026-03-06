import React from "react";

export function HexToHslConverterSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Why Convert HEX to HSL?
        </h2>
        <p className="text-muted-foreground">
          HEX codes are great for specifying exact colors, but they don't tell you anything about the color itself. #3B82F6 is just six characters — you can't tell it's a blue, or how vibrant it is, or how light. HSL (hue, saturation, lightness) describes what the color actually is.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How the Conversion Works
        </h2>
        <p className="text-muted-foreground mb-4">
          The hex code first converts to RGB (each pair becomes 0-255). Then the RGB values transform to HSL using the standard algorithm: hue is calculated from which channel dominates, saturation from how spread apart the values are, and lightness from their average.
        </p>
        <p className="text-muted-foreground">
          For #3B82F6: RGB is (59, 130, 246). The blue channel dominates, giving a hue around 217°. The spread between channels gives 91% saturation. The average gives 60% lightness.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          When HSL Is More Useful Than HEX
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">CSS Custom Properties</h3>
            <p className="text-sm text-muted-foreground">
              Store hue, saturation, and lightness as separate CSS variables. Change one value to adjust the entire theme. You can't do this with hex codes.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Creating Color Variations</h3>
            <p className="text-sm text-muted-foreground">
              Want a darker version? Reduce the lightness value. Want it more muted? Reduce saturation. With hex, you'd need to manually calculate new values.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Finding Related Colors</h3>
            <p className="text-sm text-muted-foreground">
              Complementary colors are 180° apart in hue. Analogous colors are ±30°. This is trivial in HSL, impossible with hex alone.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Programmatic Adjustments</h3>
            <p className="text-sm text-muted-foreground">
              Building a theme switcher or dark mode? Adjust lightness values across your palette with simple math. Much cleaner than manipulating hex strings.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Understanding HSL Format
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Hue (0-360°):</strong> The actual color on the wheel. 0° is red, 120° is green, 240° is blue. Values wrap around — 360° equals 0°.
          </p>
          <p>
            <strong>Saturation (0-100%):</strong> How vibrant vs. gray. 100% is the purest form of that hue. 0% is completely gray (no hue).
          </p>
          <p>
            <strong>Lightness (0-100%):</strong> How light or dark. 0% is black, 100% is white, 50% is the "normal" color.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Do I need to include the # symbol?</h3>
            <p className="text-sm text-muted-foreground">
              No, both formats work. Enter 3B82F6 or #3B82F6 — the converter handles both identically.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What does hsl(0, 0%, 50%) mean?</h3>
            <p className="text-sm text-muted-foreground">
              Hue 0° (red), but 0% saturation means no actual color — it's gray. 50% lightness makes it medium gray. This is rgb(128, 128, 128) or #808080.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I use HSL in all browsers?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, HSL is supported in all modern browsers including IE9+. It's been part of the CSS specification since CSS Color Module Level 3.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How do I convert HSL back to hex?</h3>
            <p className="text-sm text-muted-foreground">
              Use our HSL to Hex Converter tool. The conversion is fully reversible — you can go back and forth without losing precision.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What's the CSS syntax for HSL?</h3>
            <p className="text-sm text-muted-foreground">
              {`hsl(hue, saturation%, lightness%)`} — for example, {`hsl(217, 91%, 60%)`}. No degree symbol needed for hue, but saturation and lightness require the % sign.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I add transparency to HSL?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, use HSLA: {`hsla(217, 91%, 60%, 0.5)`} for 50% opacity. The alpha value ranges from 0.0 (transparent) to 1.0 (opaque).
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Practical CSS Examples
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Using CSS variables with HSL:</strong>
          </p>
          <pre className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
            {`:root {
  --brand-h: 217;
  --brand-s: 91%;
  --brand-l: 60%;
}
.button {
  background: hsl(var(--brand-h), var(--brand-s), var(--brand-l));
}`}
          </pre>
          <p>
            <strong>Creating a hover state by adjusting lightness:</strong>
          </p>
          <pre className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
            {`.card {
  background: hsl(217, 91%, 60%);
}
.card:hover {
  background: hsl(217, 91%, 50%);
}`}
          </pre>
        </div>
      </div>
    </section>
  );
}

export default HexToHslConverterSEO;
