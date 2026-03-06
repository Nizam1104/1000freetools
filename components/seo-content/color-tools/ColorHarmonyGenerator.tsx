import React from "react";

export function ColorHarmonyGeneratorSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          What Is a Color Harmony Generator?
        </h2>
        <p className="text-muted-foreground">
          A color harmony generator applies color theory rules to create balanced palettes from a single base color. Instead of guessing which colors work together, you get mathematically proven combinations based on their positions on the color wheel.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How Color Harmony Works
        </h2>
        <p className="text-muted-foreground mb-4">
          The tool uses the HSL color model to calculate relationships between hues. Each harmony type follows a specific geometric pattern on the 360-degree color wheel:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><strong>Complementary:</strong> Two colors 180° apart — maximum contrast</li>
          <li><strong>Analogous:</strong> Three colors within 30° of each other — serene and cohesive</li>
          <li><strong>Triadic:</strong> Three colors 120° apart — vibrant but balanced</li>
          <li><strong>Tetradic:</strong> Four colors forming a rectangle — rich with two dominant pairs</li>
          <li><strong>Split Complementary:</strong> Base color plus two colors adjacent to its complement — less tension than direct complementary</li>
          <li><strong>Square:</strong> Four colors 90° apart — works best when one color dominates</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Real Use Cases
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Brand Identity Design</h3>
            <p className="text-sm text-muted-foreground">
              A designer receives a client's logo in a single brand color. Using the harmony generator, they quickly build a full palette for business cards, website accents, and marketing materials that feel cohesive.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">UI Component Systems</h3>
            <p className="text-sm text-muted-foreground">
              A frontend developer needs consistent colors for buttons, alerts, and badges. They pick a primary blue and generate an analogous harmony for subtle variations across states.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Interior Design Mood Boards</h3>
            <p className="text-sm text-muted-foreground">
              Someone redecorating their living room starts with a favorite accent chair fabric. They extract its hex code and use triadic harmony to find throw pillow and curtain colors that complement without matching exactly.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Social Media Graphics</h3>
            <p className="text-sm text-muted-foreground">
              A content creator wants their Instagram posts to look cohesive. They lock in a signature color and rotate through different harmony types to keep visuals fresh while maintaining brand recognition.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          What to Know Before Using This Tool
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>It's math, not magic.</strong> The generator calculates exact angular relationships on the color wheel. If your base color is muddy, the harmony will be muddy too — start with a hue you actually like.
          </p>
          <p>
            <strong>Saturation and lightness matter.</strong> Two colors can be perfectly harmonious by hue but clash if one is neon and the other is pastel. Adjust saturation and lightness sliders after generating to fine-tune.
          </p>
          <p>
            <strong>One color should dominate.</strong> Especially with tetradic and square harmonies, using all four colors equally can feel chaotic. Pick a primary, use others for accents.
          </p>
          <p>
            <strong>Export formats are developer-ready.</strong> CSS output gives you custom properties you can drop into a stylesheet. JSON is useful for design tokens. PNG is handy for sharing with non-technical stakeholders.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">What's the difference between complementary and split complementary?</h3>
            <p className="text-sm text-muted-foreground">
              Complementary uses two colors directly opposite each other (180° apart), creating maximum contrast. Split complementary uses the base color plus the two colors adjacent to its complement (150° and 210° from the base). It keeps the visual interest of high contrast but feels less aggressive.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I use these harmonies for accessibility?</h3>
            <p className="text-sm text-muted-foreground">
              Color harmony ensures colors work together aesthetically, but it doesn't guarantee sufficient contrast for readability. Use our Contrast Checker tool to verify text-background combinations meet WCAG AA (4.5:1) or AAA (7:1) standards.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Why do my analogous colors sometimes look too similar?</h3>
            <p className="text-sm text-muted-foreground">
              Analogous colors sit next to each other on the wheel (within 30°), so they share similar undertones. To create more distinction, vary the saturation or lightness significantly — try a muted sage green next to a vibrant emerald.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How do I export colors for Tailwind CSS?</h3>
            <p className="text-sm text-muted-foreground">
              Export as JSON, then add the hex values to your tailwind.config.js under theme.extend.colors. For example: {`{ brand: { 500: "#3b82f6", 600: "#2563eb" } }`}. You can then use classes like bg-brand-500.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What if I don't know what base color to start with?</h3>
            <p className="text-sm text-muted-foreground">
              Click the Random Color button to explore different starting points. Or pull a hex code from a photo, logo, or product you're designing around. The harmony will adapt to whatever you choose.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Does this tool work in both light and dark mode?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, the generated colors display accurately regardless of your UI theme. However, remember that colors appear differently on light vs. dark backgrounds — always preview your palette in the actual context where it'll be used.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How This Compares to Other Tools
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>vs. Adobe Color:</strong> This tool is simpler and faster — no login required, no cloud sync, just instant harmony generation. It runs entirely in your browser with no server calls.
          </p>
          <p>
            <strong>vs. Coolors:</strong> Coolors focuses on random palette generation. This tool gives you precise control based on color theory rules, starting from a specific base color you choose.
          </p>
          <p>
            <strong>vs. Manual calculation:</strong> You could calculate complementary colors by adding 180 to the hue value yourself. This tool automates the math and shows you all six harmony types instantly.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ColorHarmonyGeneratorSEO;
