import React from "react"

export default function SvgGradientGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Choose between linear or radial gradient types. Linear gradients transition colors along a straight line. Radial gradients radiate colors outward from a center point.
          </p>
          <p>
            Add color stops to define your gradient. Each stop has a color and position (0-100%). Drag the sliders to adjust positions, click the color picker to change colors. Minimum two stops required.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">For linear gradients:</p>
            <p className="text-sm">
              Use the angle slider to set gradient direction. 0 degrees = left to right, 90 degrees = bottom to top, 180 degrees = right to left, 270 degrees = top to bottom.
            </p>
          </div>
          <p>
            Click Generate Gradient to create the SVG code. The output includes the gradient definition in &lt;defs&gt; and a preview rectangle showing the result. Copy the code and use the gradient ID to fill any SVG shape.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Designing modern button styles</h3>
            <p className="text-sm text-muted-foreground">
              Create eye-catching gradient buttons for websites and apps. Linear gradients at 45 degrees with vibrant colors look modern and clickable.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating logo backgrounds</h3>
            <p className="text-sm text-muted-foreground">
              Add gradient fills to logo shapes for depth and visual interest. Radial gradients work well for circular badges and emblems.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building data visualization</h3>
            <p className="text-sm text-muted-foreground">
              Apply gradients to chart bars, pie slices, or map regions. Gradients make data visualizations more engaging than flat colors.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Designing social media graphics</h3>
            <p className="text-sm text-muted-foreground">
              Create gradient backgrounds for Instagram stories, YouTube thumbnails, or LinkedIn posts. Trending gradient styles grab attention in feeds.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Making UI mockups realistic</h3>
            <p className="text-sm text-muted-foreground">
              Add gradient fills to mockup screens, cards, and panels. Gradients simulate lighting and depth in interface designs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating text effects</h3>
            <p className="text-sm text-muted-foreground">
              Apply gradients to SVG text for metallic, rainbow, or sunset effects. Gradient text stands out in headers and logos.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Color stops must be ordered.</strong>
              The tool automatically sorts stops by position. Stops at 0%, 50%, 100% create smooth transitions. Clustered stops create sharp color changes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Gradient IDs must be unique.</strong>
              If using multiple gradients in one SVG, each needs a unique ID. The generated code uses "gradient". Rename when combining.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Linear angle uses trigonometry.</strong>
              The angle converts to x2/y2 coordinates. 45 degrees creates a diagonal gradient. Experiment to find the perfect angle for your design.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Radial gradients have fixed centers.</strong>
              Current implementation uses center (50%, 50%). For offset radial gradients, edit the cx/cy attributes in the output code.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For subtle gradients, use colors close in hue and saturation. For bold statements, use contrasting colors. Test gradients at different sizes - some look great large but muddy when small.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many color stops can I add?</h3>
            <p className="text-sm text-muted-foreground">
              Up to 10 stops are supported. Most gradients look best with 2-4 stops. More stops create complex transitions but can look muddy.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I add transparency to gradient colors?</h3>
            <p className="text-sm text-muted-foreground">
              Use RGBA or HSLA color values. Enter "rgba(255,0,0,0.5)" for semi-transparent red. The tool accepts any valid CSS color format.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I use the gradient in my SVG?</h3>
            <p className="text-sm text-muted-foreground">
              Copy the entire SVG code. Reference the gradient with fill="url(#gradient)" on any shape. The gradient is defined in the &lt;defs&gt; section.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I animate SVG gradients?</h3>
            <p className="text-sm text-muted-foreground">
              Yes! Animate the stop-color or offset attributes with SMIL or CSS. Create flowing, shifting gradient effects for dynamic backgrounds.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between linear and radial?</h3>
            <p className="text-sm text-muted-foreground">
              Linear blends colors in a straight line. Radial blends colors in circles from a center point. Linear for backgrounds, radial for highlights and spheres.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I save my gradient presets?</h3>
            <p className="text-sm text-muted-foreground">
              Copy the gradient code to save it. Create a library of gradient definitions for reuse. Name them descriptively for easy reference.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does my gradient look banded?</h3>
            <p className="text-sm text-muted-foreground">
              Color banding happens with subtle gradients on low-color displays. Add a tiny noise texture or use more color stops to smooth transitions.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
