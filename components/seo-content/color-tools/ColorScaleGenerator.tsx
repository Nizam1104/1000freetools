import React from "react";

export function ColorScaleGeneratorSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          What Is a Color Scale?
        </h2>
        <p className="text-muted-foreground">
          A color scale is a sequence of colors progressing from light to dark (or vice versa) in consistent steps. Unlike a simple gradient, a scale gives you discrete color values you can use individually — perfect for design systems, data visualization, and UI states.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Scale Types Explained
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Lightness Scale</h3>
            <p className="text-sm text-muted-foreground">
              Adjusts only the L in HSL. Creates a progression from near-white through your base color to near-black. Most common for UI design.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Saturation Scale</h3>
            <p className="text-sm text-muted-foreground">
              Adjusts only the S in HSL. Goes from gray (0% saturation) to fully vibrant (100% saturation). Useful for showing intensity.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Hue Scale</h3>
            <p className="text-sm text-muted-foreground">
              Rotates through the color wheel. Creates a rainbow effect. Good for categorical data where each value needs a distinct color.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Diverging Scale</h3>
            <p className="text-sm text-muted-foreground">
              Two colors meeting in the middle. Useful for showing positive/negative, hot/cold, or any bipolar data range.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How Many Steps Do You Need?
        </h2>
        <p className="text-muted-foreground mb-4">
          The step count determines granularity:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><strong>3-5 steps:</strong> Simple states (light, base, dark) or (low, medium, high)</li>
          <li><strong>6-8 steps:</strong> Standard design system scales (like Tailwind's 50-900)</li>
          <li><strong>9-12 steps:</strong> Fine-grained control for data visualization</li>
          <li><strong>13-15 steps:</strong> Maximum precision for specialized applications</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Real Use Cases
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Design System Color Tokens</h3>
            <p className="text-sm text-muted-foreground">
              Generate a 10-step scale for your primary brand color. Name them primary-50 through primary-900. Use consistently across all components.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Data Visualization</h3>
            <p className="text-sm text-muted-foreground">
              A choropleth map showing population density uses a 7-step lightness scale. Light colors for low density, dark for high density.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Interactive States</h3>
            <p className="text-sm text-muted-foreground">
              Button states: 100 for disabled, 300 for hover, 500 for default, 700 for active. All from the same scale, guaranteed to work together.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Tailwind CSS Extension</h3>
            <p className="text-sm text-muted-foreground">
              Export as Tailwind config and get classes like bg-brand-400, text-brand-600. Matches Tailwind's naming convention perfectly.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Export Formats
        </h2>
        <p className="text-muted-foreground mb-3">
          CSS Variables export:
        </p>
        <pre className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto mb-4">
          {`:root {
  --scale-50: #eff6ff;
  --scale-100: #dbeafe;
  --scale-200: #bfdbfe;
  --scale-300: #93c5fd;
  --scale-400: #60a5fa;
  --scale-500: #3b82f6;
  --scale-600: #2563eb;
  --scale-700: #1d4ed8;
  --scale-800: #1e40af;
  --scale-900: #1e3a8a;
}`}
        </pre>
        <p className="text-muted-foreground">
          Tailwind export integrates directly into your tailwind.config.js for utility class generation.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Why do some steps look uneven?</h3>
            <p className="text-sm text-muted-foreground">
              Human perception of lightness isn't linear. Equal HSL lightness steps might not look equally spaced. For perceptually uniform scales, consider using LAB or LCH color spaces (not yet supported).
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I create a custom range?</h3>
            <p className="text-sm text-muted-foreground">
              This tool generates full scales from your base. For custom start/end points, use the Gradient Step Generator which lets you specify exact boundary colors.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How do I use diverging scales?</h3>
            <p className="text-sm text-muted-foreground">
              Select "Diverging" scale type, pick two endpoint colors (like blue for cold, red for hot), and choose your step count. The middle step will be a neutral blend.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What's the difference between this and Shade Tint Tone Generator?</h3>
            <p className="text-sm text-muted-foreground">
              Shade/Tint/Tone generates three separate lists (darker, lighter, muted). This tool creates one continuous scale with consistent steps between each color.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I export for React or Vue?</h3>
            <p className="text-sm text-muted-foreground">
              Export as JSON and import directly into your component library. The JSON format works with any JavaScript framework.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How do I name my scale colors?</h3>
            <p className="text-sm text-muted-foreground">
              Follow Tailwind's convention: 50 (lightest) to 900 (darkest) in steps of 50. The 500 step should be your base color.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Tips for Better Color Scales
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Test in grayscale.</strong> Convert your scale to black and white. If you can still distinguish the steps, the lightness progression works.
          </p>
          <p>
            <strong>Consider accessibility.</strong> Ensure adjacent steps have enough contrast for users with low vision. Check critical combinations with the Contrast Checker.
          </p>
          <p>
            <strong>Start with a good base.</strong> A base color around 50-60% lightness gives you room to go both lighter and darker.
          </p>
          <p>
            <strong>Use the right scale type.</strong> Lightness scales for UI, hue scales for categories, diverging scales for bipolar data. Match the scale to your use case.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ColorScaleGeneratorSEO;
