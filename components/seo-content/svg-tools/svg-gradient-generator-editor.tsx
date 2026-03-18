import React from "react"

export default function SvgGradientGeneratorEditorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the SVG Gradient Generator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool creates SVG gradient definitions (<code>&lt;linearGradient&gt;</code> and <code>&lt;radialGradient&gt;</code>) through a visual interface. Pick colors, adjust stop positions, set angles or center points, and get ready-to-use SVG gradient code.
          </p>
          <p>
            Gradients in SVG are defined in a <code>&lt;defs&gt;</code> block, then referenced by shapes via <code>fill="url(#gradientId)"</code>. The generator builds this structure for you - no need to memorize the syntax for gradient stops, offsets, and color interpolation.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Gradient types supported:</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Linear gradients - color transitions along a straight line (horizontal, vertical, diagonal)</li>
              <li>Radial gradients - color transitions radiating from a center point (circles, ellipses)</li>
              <li>Multiple color stops - add as many colors as needed along the gradient</li>
              <li>Opacity stops - control transparency at each point, not just color</li>
              <li>Gradient units - userSpaceOnUse or objectBoundingBox scaling</li>
            </ul>
          </div>
          <p>
            Adjust the angle for linear gradients (0° = left to right, 90° = top to bottom). For radial gradients, move the center point (cx, cy) and focal point (fx, fy) to create offset lighting effects. Preview updates in real-time as you tweak settings.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating button hover states</h3>
            <p className="text-sm text-muted-foreground">
              Flat buttons feel dull. Add a subtle linear gradient from #4F46E5 to #3730A3 for depth. Generate the gradient, apply to your button SVG, and it instantly looks more tactile.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Designing icon sets with consistent lighting</h3>
            <p className="text-sm text-muted-foreground">
              Your icon set needs a cohesive look. Create one radial gradient simulating top-left lighting, apply it to all icons. Consistent gradients make individual icons feel part of a family.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building background patterns</h3>
            <p className="text-sm text-muted-foreground">
              Subtle gradient backgrounds add polish without distraction. Generate a soft diagonal gradient from near-white to slightly off-white. Use it as a section background in your landing page.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Simulating metallic or glossy effects</h3>
            <p className="text-sm text-muted-foreground">
              Metallic surfaces need complex gradients with multiple stops. Add a highlight stop at 30%, base color at 50%, shadow at 70%. Radial gradients work well for spherical metallic objects.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating sky or water effects in illustrations</h3>
            <p className="text-sm text-muted-foreground">
              Natural gradients rarely go from color A to color B directly. Skies transition through multiple blues. Build a 4-stop gradient for realistic atmospheric effects in vector illustrations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Prototyping UI elements quickly</h3>
            <p className="text-sm text-muted-foreground">
              Need a gradient for a mockup? Don't open Figma. Use this generator, tweak until it looks right, copy the SVG code into your prototype. Faster context switching.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Gradient IDs must be unique.</strong>
              If you're generating multiple gradients for one SVG, each needs a unique id attribute. The generator may use generic names like "grad1" - rename them to avoid conflicts when combining.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Color interpolation method matters.</strong>
              SVG gradients interpolate in RGB space by default. For more natural color transitions, add <code>color-interpolation-filters="sRGB"</code>. Some generators offer this as an option.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Gradient units affect scaling.</strong>
              <code>gradientUnits="objectBoundingBox"</code> (default) scales the gradient relative to the shape. <code>userSpaceOnUse</code> uses absolute coordinates. Choose based on whether you want consistent gradients across different-sized shapes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Browser support is excellent but not perfect.</strong>
              All modern browsers support SVG gradients. However, very old browsers (IE9 and earlier) don't. For critical graphics, provide a solid-color fallback.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For subtle depth, use gradients with minimal color difference - like #FFFFFF to #F5F5F5. The eye perceives it as lighting rather than an obvious gradient.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I animate SVG gradients?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, animate the <code>stop-color</code> or <code>offset</code> attributes of gradient stops using SMIL (<code>&lt;animate&gt;</code>) or CSS animations. Create color-shifting effects or moving highlight positions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I reuse a gradient across multiple shapes?</h3>
            <p className="text-sm text-muted-foreground">
              Define the gradient once in <code>&lt;defs&gt;</code>, give it an id like "myGradient", then reference it with <code>fill="url(#myGradient)"</code> on any shape. One definition, unlimited uses.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between linear and radial gradients?</h3>
            <p className="text-sm text-muted-foreground">
              Linear gradients transition along a line (defined by x1, y1, x2, y2). Radial gradients radiate from a center point (cx, cy) outward. Use linear for surfaces, radial for spheres or spotlights.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I create striped or patterned gradients?</h3>
            <p className="text-sm text-muted-foreground">
              Not with standard gradients - they always smooth-interpolate between stops. For stripes or patterns, use SVG <code>&lt;pattern&gt;</code> elements instead. Patterns tile; gradients blend.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many color stops can I add?</h3>
            <p className="text-sm text-muted-foreground">
              Technically unlimited, but 5-10 stops is practical. Beyond that, gradients become muddy and file sizes grow. If you need complex color transitions, consider using multiple overlapping gradients or patterns.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I export gradients for use in CSS?</h3>
            <p className="text-sm text-muted-foreground">
              This tool outputs SVG gradient definitions. For CSS gradients, use a CSS gradient generator instead. The concepts are similar but syntax differs - SVG uses <code>&lt;stop&gt;</code> elements, CSS uses <code>linear-gradient()</code> functions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does my gradient look banded?</h3>
            <p className="text-sm text-muted-foreground">
              Color banding happens when there aren't enough intermediate colors. Add more stops between existing ones, or use dithering techniques. Also check your display - some monitors show more banding than others.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
