import React from "react";

export function GradientPaletteGeneratorSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          What This Gradient Tool Creates
        </h2>
        <p className="text-muted-foreground">
          This generator extracts evenly-spaced colors from a multi-stop gradient you define. Set 2 or more color stops at any position, choose how many colors to extract (3-12), and get a palette that captures the smooth transition between your gradient endpoints.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How the Gradient Interpolation Works
        </h2>
        <p className="text-muted-foreground mb-4">
          The tool calculates intermediate colors by finding which two color stops your sample position falls between, then linearly interpolating the RGB values. For a gradient from #3b82f6 (blue) at 0% to #8b5cf6 (purple) at 100%, sampling at position 50% gives you the exact midpoint color.
        </p>
        <div className="p-4 rounded-lg border bg-card">
          <h3 className="font-medium mb-2">The interpolation math</h3>
          <pre className="bg-muted p-3 rounded text-xs font-mono overflow-x-auto">
            {`// For position 50% between blue and purple:
R: (59 × 0.5) + (139 × 0.5) = 99
G: (130 × 0.5) + (92 × 0.5) = 111
B: (246 × 0.5) + (246 × 0.5) = 246
Result: #636ff6`}
          </pre>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          When You Need Gradient-Based Palettes
        </h2>
        <div className="space-y-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Data Visualization Scales</h3>
            <p className="text-sm text-muted-foreground">
              A data analyst needs a sequential color scale for a heat map showing population density. They create a gradient from light yellow to dark red, extract 7 colors, and now have a perceptually ordered scale where each step represents equal value ranges.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">UI Theme Generation</h3>
            <p className="text-sm text-muted-foreground">
              A designer wants a cohesive set of background colors for cards, sections, and surfaces. They define a subtle gradient from their brand color to a neutral gray, extract 5 colors, and use each as a different elevation level.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Progress and Status Indicators</h3>
            <p className="text-sm text-muted-foreground">
              A developer is building a progress bar that changes color as it fills. They create a green-to-orange-to-red gradient, extract 10 colors, and map each percentage range to a specific color for smooth visual feedback.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Brand Gradient Systems</h3>
            <p className="text-sm text-muted-foreground">
              A brand team has a signature gradient for their logo. They recreate it here, extract the intermediate colors, and now have individual color values to use in icons, illustrations, and marketing materials that match their gradient identity.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2"> choropleth Map Coloring</h3>
            <p className="text-sm text-muted-foreground">
              Someone is making a map showing election results by county. They create a blue-to-purple gradient, extract 6 colors, and assign each color to a different vote percentage range. The gradient ensures viewers intuitively understand the scale.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          What to Know Before Using This
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Color stops can overlap.</strong> You can put multiple stops at the same position to create sharp transitions instead of smooth gradients. This is useful for striped effects or hard-edged color bands.
          </p>
          <p>
            <strong>Linear vs radial affects preview only.</strong> The extracted colors are the same regardless of gradient type — only the visual preview changes. Radial gradients show how colors radiate from a center point.
          </p>
          <p>
            <strong>The angle matters for linear gradients.</strong> A 0° gradient goes bottom-to-top, 90° goes left-to-right, 135° goes corner-to-corner. The angle changes which colors appear where in the preview.
          </p>
          <p>
            <strong>More palette colors = smaller steps.</strong> Extracting 12 colors from a gradient gives you finer gradations than extracting 5. Choose based on how subtle you need the transitions.
          </p>
          <p>
            <strong>RGB interpolation can create muddy midpoints.</strong> When interpolating between highly saturated colors, the middle values may appear duller. This is a limitation of RGB color space — for better results, try the Color Scale Generator which uses HSL.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Export Formats Explained
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">CSS Export</h3>
            <pre className="bg-muted p-2 rounded text-xs font-mono overflow-x-auto mt-2">
              {`:root {
  --gradient: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  --gradient-color-1: #3b82f6;
  --gradient-color-2: #5a7af5;
  --gradient-color-3: #7a73f5;
}`}
            </pre>
            <p className="text-sm text-muted-foreground mt-2">
              Includes the full gradient CSS plus individual color variables. Use the gradient directly or reference individual colors.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">JSON Export</h3>
            <pre className="bg-muted p-2 rounded text-xs font-mono overflow-x-auto mt-2">
              {`{
  "gradient": "linear-gradient(...)",
  "colors": ["#3b82f6", "#5a7af5", ...]
}`}
            </pre>
            <p className="text-sm text-muted-foreground mt-2">
              Programmatic access to all colors. Import into design tools, build scripts, or data visualization libraries.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">PNG Export</h3>
            <p className="text-sm text-muted-foreground">
              Downloads a visual preview image of your gradient. Useful for sharing with teammates, including in presentations, or as a reference in design files.
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
            <h3 className="font-medium mb-2">How many color stops can I add?</h3>
            <p className="text-sm text-muted-foreground">
              You can add as many stops as you need — there's no hard limit. However, gradients with more than 5-6 stops can become visually complex. Most smooth transitions work well with 2-4 stops.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I create a stepped gradient instead of smooth?</h3>
            <p className="text-sm text-muted-foreground">
              Yes — place two color stops at the same position with different colors. For example, put red at 50% and blue at 50% to create a hard edge. The extracted palette will show the transition between these sharp boundaries.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What's the difference between this and the Gradient Step Generator?</h3>
            <p className="text-sm text-muted-foreground">
              This tool extracts colors from a gradient you define with custom stops and positions. The Gradient Step Generator creates steps between exactly two colors with equal spacing. Use this for complex multi-stop gradients, use that for simple two-color progressions.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Why do my extracted colors look different from the preview?</h3>
            <p className="text-sm text-muted-foreground">
              The preview shows a continuous gradient, while the extracted colors are discrete samples. If you extract only 3 colors from a complex gradient, you're seeing just the endpoints and midpoint — not the full smooth transition.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I use this for accessibility-compliant color scales?</h3>
            <p className="text-sm text-muted-foreground">
              The tool creates smooth transitions, but doesn't guarantee perceptual uniformity or WCAG compliance. For data visualization scales, consider using tools specifically designed for colorblind-safe palettes, or verify your extracted colors with a contrast checker.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How do I recreate a gradient I saw somewhere?</h3>
            <p className="text-sm text-muted-foreground">
              Use a color picker browser extension to sample the endpoint colors from the gradient you want to recreate. Enter those as your first and last stops, then adjust intermediate stops until the preview matches.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What does the angle control do?</h3>
            <p className="text-sm text-muted-foreground">
              For linear gradients, the angle controls the direction. 0° is bottom-to-top, 90° is left-to-right, 180° is top-to-bottom, 270° is right-to-left. The angle affects the visual preview but not the extracted color values.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Comparison: Gradient Tools
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Use this Gradient Palette Generator when</strong> you need to define custom multi-stop gradients with precise position control and extract discrete colors from them.
          </p>
          <p>
            <strong>Use the Gradient Step Generator when</strong> you want evenly-spaced colors between exactly two endpoint colors without complex stop positioning.
          </p>
          <p>
            <strong>Use the CSS Gradient Generator when</strong> you need the actual CSS gradient code for web implementation rather than extracted color values.
          </p>
          <p>
            <strong>Use the Color Scale Generator when</strong> you need perceptually uniform scales optimized for data visualization, with controls for lightness curves.
          </p>
        </div>
      </div>
    </section>
  );
}

export default GradientPaletteGeneratorSEO;
