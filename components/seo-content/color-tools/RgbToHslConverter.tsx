import React from "react";

export function RgbToHslConverterSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Why Convert RGB to HSL?
        </h2>
        <p className="text-muted-foreground">
          RGB tells you what goes into a color (red, green, blue intensities). HSL tells you what the color actually is (hue), how vibrant it is (saturation), and how light or dark it is (lightness). For CSS work, HSL is often more intuitive — you can adjust lightness without changing the base hue.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How the Conversion Works
        </h2>
        <p className="text-muted-foreground mb-4">
          The algorithm finds the maximum and minimum RGB values to calculate lightness as their average. Saturation depends on how far apart max and min are relative to lightness. Hue is determined by which channel dominates and how the other two compare.
        </p>
        <p className="text-muted-foreground">
          For example, rgb(255, 87, 51) becomes hsl(11, 100%, 60%). The hue of 11° puts it in the orange-red range, 100% saturation means it's fully vibrant, and 60% lightness puts it in the medium-bright range.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          When HSL Is More Useful Than RGB
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Creating Color Variations</h3>
            <p className="text-sm text-muted-foreground">
              Want a darker version of hsl(217, 91%, 60%)? Just reduce lightness: hsl(217, 91%, 40%). In RGB, you'd need to calculate proportional reductions across all three channels.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">CSS Hover States</h3>
            <p className="text-sm text-muted-foreground">
              Define your base color as a CSS variable in HSL. On hover, use the same hue and saturation but adjust lightness. No need to define separate colors.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Finding Complementary Colors</h3>
            <p className="text-sm text-muted-foreground">
              Add 180 to the hue value. hsl(200, 80%, 50%) becomes hsl(380, 80%, 50%), which wraps to hsl(20, 80%, 50%) — a warm orange complement to the cool blue.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Programmatic Color Adjustments</h3>
            <p className="text-sm text-muted-foreground">
              Building a theme switcher? Adjust lightness values across your entire palette programmatically. Much cleaner than manipulating RGB triples.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Understanding HSL Values
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Hue (0-360°):</strong> The actual color on the color wheel. 0° is red, 120° is green, 240° is blue. Values wrap around, so 360° equals 0°.
          </p>
          <p>
            <strong>Saturation (0-100%):</strong> How vibrant vs. gray the color is. 100% is the purest form of that hue. 0% is a shade of gray (no hue at all).
          </p>
          <p>
            <strong>Lightness (0-100%):</strong> How light or dark. 0% is black, 100% is white, 50% is the "normal" version of the color.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Why is my hue value 0 when the color looks red?</h3>
            <p className="text-sm text-muted-foreground">
              Because 0° is pure red. A hue of 0 and a hue of 360 are identical — both are red. The scale is circular.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What does 0% saturation look like?</h3>
            <p className="text-sm text-muted-foreground">
              Pure gray, with no color tint. The lightness value determines whether it's dark gray, medium gray, or light gray. rgb(128, 128, 128) converts to hsl(0, 0%, 50%) — the hue is undefined (shown as 0) because there's no actual hue.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I use decimal values in HSL?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, CSS accepts decimals: hsl(217.5, 91.3%, 60.2%). This tool rounds to whole numbers for simplicity, but you can manually add precision if needed.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How do I convert HSL back to RGB?</h3>
            <p className="text-sm text-muted-foreground">
              Use our HSL to RGB Converter tool. The conversion is reversible — you can go back and forth without losing information.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Does CSS support HSL in all browsers?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, HSL is supported in all modern browsers including IE9+. It's part of the CSS Color Module Level 3 specification and has been standard for over a decade.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What's the difference between HSL and HSV?</h3>
            <p className="text-muted-foreground text-sm">
              Both use hue and saturation, but HSL uses "lightness" (average of max and min) while HSV uses "value" (just the max). HSL is more intuitive for CSS work. Use our HSL to HSV Converter if you need to translate between them.
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
            <strong>Button with hover state:</strong>
          </p>
          <pre className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
            {`.btn {
  background: hsl(217, 91%, 60%);
}
.btn:hover {
  background: hsl(217, 91%, 50%);
}`}
          </pre>
          <p>
            <strong>Theme-aware colors with CSS variables:</strong>
          </p>
          <pre className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
            {`:root {
  --primary-h: 217;
  --primary-s: 91%;
  --primary-l: 60%;
}
.element {
  background: hsl(var(--primary-h), var(--primary-s), var(--primary-l));
}`}
          </pre>
        </div>
      </div>
    </section>
  );
}

export default RgbToHslConverterSEO;
