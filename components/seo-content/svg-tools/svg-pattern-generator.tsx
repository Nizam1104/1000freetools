import React from "react"

export default function SvgPatternGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select a pattern type from stripes, dots, grid, checkerboard, zigzag, or waves. Each pattern type uses different SVG shapes and arrangements to create repeating designs.
          </p>
          <p>
            Adjust the pattern size to control how large each repeat unit appears. Smaller sizes create dense, tight patterns. Larger sizes make bold, spaced-out designs. Use the rotation slider to angle your pattern for dynamic effects.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Pattern types explained:</p>
            <ul className="text-sm space-y-1">
              <li><strong>Stripes:</strong> Parallel lines, great for backgrounds and dividers</li>
              <li><strong>Dots:</strong> Circular polka dots, playful and versatile</li>
              <li><strong>Grid:</strong> Cross-hatched lines, technical and structured</li>
              <li><strong>Checkerboard:</strong> Alternating squares, classic pattern</li>
              <li><strong>Zigzag:</strong> Angular waves, energetic and modern</li>
              <li><strong>Waves:</strong> Smooth curves, organic and flowing</li>
            </ul>
          </div>
          <p>
            Pick your primary and background colors, then click Generate Pattern. The tool creates the SVG pattern definition with a preview. Copy the code and use it as a fill in your SVG elements.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating website backgrounds</h3>
            <p className="text-sm text-muted-foreground">
              Add subtle texture to hero sections or full-page backgrounds. A light dot pattern at 5% opacity creates visual interest without distracting from content. Much lighter than image backgrounds.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Designing custom packaging</h3>
            <p className="text-sm text-muted-foreground">
              Generate unique patterns for product boxes, bags, or labels. Create brand-specific patterns using your brand colors. Export and send to your printer as part of the packaging design.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building UI component libraries</h3>
            <p className="text-sm text-muted-foreground">
              Create consistent patterns for loading states, empty states, or decorative elements in your design system. Patterns scale infinitely without quality loss.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Making social media templates</h3>
            <p className="text-sm text-muted-foreground">
              Design branded backgrounds for Instagram posts, stories, or LinkedIn banners. Patterns look professional and are easy to update by changing colors.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating fabric print designs</h3>
            <p className="text-sm text-muted-foreground">
              Generate repeat patterns for custom fabric printing. Services like Spoonflower accept SVG files. Test different colorways quickly before ordering samples.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Designing presentation slides</h3>
            <p className="text-sm text-muted-foreground">
              Add subtle patterns to slide backgrounds for visual polish. Stripes or grids at low opacity look professional in corporate presentations.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Patterns repeat infinitely.</strong>
              The generated pattern tiles seamlessly in any direction. What you see in the preview is one repeat unit. The actual pattern continues forever when applied.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Pattern ID must be unique.</strong>
              If using multiple patterns in one SVG, each needs a unique pattern ID. The generated code uses "pattern-{"{type}"}". Rename if combining patterns.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Rotation affects tile alignment.</strong>
              Rotating a pattern can create visible seams at tile edges. For seamless rotated patterns, you may need to adjust the pattern tile size.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Color contrast matters.</strong>
              Low contrast between pattern and background colors creates subtle textures. High contrast makes bold, graphic statements. Test both approaches.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For web backgrounds, use patterns at 5-20% opacity. Apply opacity in CSS rather than the SVG for easier adjustments. Example: background-image with opacity in a pseudo-element.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I use the generated pattern?</h3>
            <p className="text-sm text-muted-foreground">
              Copy the entire SVG code. The pattern is defined in the {"<defs>"} section. Reference it with fill={"\"url(#pattern-{type})\""} on any SVG shape.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I change the pattern after generating?</h3>
            <p className="text-sm text-muted-foreground">
              Adjust the settings and regenerate. Each generation creates new code. For fine-tuning, you can also edit the SVG code directly in a text editor.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What size should I make the pattern?</h3>
            <p className="text-sm text-muted-foreground">
              Small patterns (10-30px) work for subtle textures. Medium (30-60px) for visible designs. Large (60px+) for bold statements. Test at your actual display size.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I combine multiple patterns?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but each pattern needs a unique ID. Generate separately, then combine the &lt;defs&gt; sections. Apply different patterns to different elements.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do patterns work in all browsers?</h3>
            <p className="text-sm text-muted-foreground">
              SVG patterns are supported in all modern browsers including Chrome, Firefox, Safari, and Edge. IE11 has limited support for complex patterns.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I animate SVG patterns?</h3>
            <p className="text-sm text-muted-foreground">
              Yes! Animate the patternTransform attribute to create moving patterns. Animate position, rotation, or scale for dynamic background effects.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why use SVG patterns instead of images?</h3>
            <p className="text-sm text-muted-foreground">
              SVG patterns are resolution-independent, smaller file sizes, and editable with code. They scale perfectly on any screen without pixelation.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
