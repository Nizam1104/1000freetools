import React from "react";

export function AdvancedColorPickerSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          What Makes This a Professional Color Picker?
        </h2>
        <p className="text-muted-foreground">
          This isn't a basic hex input. You get a full color wheel, individual RGB/HSL/HSV sliders, alpha transparency control, and real-time preview across multiple formats. It's designed for designers and developers who need precise control over every aspect of a color.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How the Color Wheel Works
        </h2>
        <p className="text-muted-foreground mb-4">
          The wheel displays all 360 degrees of hue in a circle. Click anywhere to select that hue. The inner ring controls saturation (center = gray, edge = fully saturated). Combined with the lightness/value slider, you have complete control over all three HSL/HSV dimensions.
        </p>
        <p className="text-muted-foreground">
          The alpha channel slider adds transparency control, outputting RGBA, HSLA, or hex with alpha (8-digit format) for modern CSS.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          When You Need This Level of Control
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Fine-Tuning Brand Colors</h3>
            <p className="text-sm text-muted-foreground">
              Your brand blue feels "off" but you can't pinpoint why. Using the individual sliders, you discover the saturation is 5% too high. You adjust and land on the exact shade that feels right.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Creating Transparent Overlays</h3>
            <p className="text-sm text-muted-foreground">
              You need a semi-transparent black overlay for a hero image. The alpha slider lets you dial in exactly 40% opacity and get the RGBA value instantly.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Matching Colors Across Models</h3>
            <p className="text-sm text-muted-foreground">
              Your designer specified an HSV color, but you need RGB for CSS. Adjust the HSV sliders and read the RGB output — no manual calculation needed.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Accessibility Testing</h3>
            <p className="text-sm text-muted-foreground">
              Test how your color appears at different lightness levels. Find the minimum lightness needed to achieve WCAG contrast ratios against your background.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Understanding the Three Color Models
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>RGB (Red, Green, Blue):</strong> Additive color for screens. Each channel ranges 0-255. Best for digital work, CSS, and when you need to match specific RGB values from design files.
          </p>
          <p>
            <strong>HSL (Hue, Saturation, Lightness):</strong> More intuitive for humans. Hue is the color (0-360°), saturation is vibrancy (0-100%), lightness is brightness (0-100%). Best for CSS variables and programmatic adjustments.
          </p>
          <p>
            <strong>HSV (Hue, Saturation, Value):</strong> Similar to HSL but "value" represents brightness differently. Common in design software like Photoshop. Best when working with tools that use HSV internally.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">How do I pick a color with the alpha channel?</h3>
            <p className="text-sm text-muted-foreground">
              Use the alpha slider to set transparency. The output will show RGBA (like rgba(59, 130, 246, 0.5)) or 8-digit hex (#3B82F680 for 50% opacity).
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What's the difference between HSL and HSV?</h3>
            <p className="text-sm text-muted-foreground">
              Both use hue and saturation, but HSL uses "lightness" (average of max/min) while HSV uses "value" (just the max). HSL is symmetric (50% is the pure color), HSV is not (100% value is brightest). Use our HSL to HSV Converter for direct comparison.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I save colors for later?</h3>
            <p className="text-sm text-muted-foreground">
              This picker doesn't have built-in saving. Copy the hex code and use the Favorite Colors Manager or Color History Tool to store it for later use.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Why would I use HSV over HSL?</h3>
            <p className="text-sm text-muted-foreground">
              HSV maps more naturally to certain UI paradigms (like the standard color picker square). Some design tools and game engines use HSV internally. For CSS work, HSL is more practical.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How precise are the sliders?</h3>
            <p className="text-sm text-muted-foreground">
              Sliders use integer values (whole numbers). For finer control, use the numeric input fields next to each slider to enter exact values including decimals.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Does this work for print colors?</h3>
            <p className="text-sm text-muted-foreground">
              This picker outputs screen color formats (RGB, HSL, HSV, hex). For print, you'll need CMYK values. Use our RGB to CMYK or Hex to CMYK converter after picking your color.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Tips for Precise Color Selection
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Start with the wheel, fine-tune with sliders.</strong> Get close using the color wheel, then use individual RGB or HSL sliders for precise adjustments.
          </p>
          <p>
            <strong>Watch the preview.</strong> The live preview shows your color in context. A color that looks right in isolation might need adjustment when you see it at full size.
          </p>
          <p>
            <strong>Use the alpha channel for overlays.</strong> Instead of creating separate semi-transparent colors in your design tool, use the alpha slider and copy the RGBA value directly.
          </p>
          <p>
            <strong>Compare models side-by-side.</strong> Adjusting RGB and watching how HSL changes helps you understand the relationship between color models.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AdvancedColorPickerSEO;
