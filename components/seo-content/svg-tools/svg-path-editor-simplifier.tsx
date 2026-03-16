import React from "react"

export default function SvgPathEditorSimplifierSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste SVG path data (the d attribute content) into the input area. This is the string of commands like "M10 10 L50 50 L90 10 Z" that defines the shape.
          </p>
          <p>
            Adjust the simplification tolerance slider. Higher values remove more points, creating simpler paths. Lower values preserve more detail. The tool uses the Ramer-Douglas-Peucker algorithm to intelligently reduce points.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Available operations:</p>
            <ul className="text-sm space-y-1">
              <li><strong>Simplify Path:</strong> Reduce points while preserving shape</li>
              <li><strong>Relative to Absolute:</strong> Convert lowercase commands to uppercase</li>
              <li><strong>Reverse:</strong> Reverse the path direction</li>
            </ul>
          </div>
          <p>
            Click Simplify Path to process. Stats show original point count, simplified count, and reduction percentage. Copy the optimized path data for use in your SVG.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Optimizing traced bitmap paths</h3>
            <p className="text-sm text-muted-foreground">
              Image trace creates paths with thousands of points. Simplify reduces point count 90%+ while maintaining visual quality. Essential for usable file sizes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Cleaning up hand-drawn vectors</h3>
            <p className="text-sm text-muted-foreground">
              Tablet drawing creates excessive anchor points. Simplify smooths the paths while keeping the artistic intent. Cleaner code, smoother curves.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing SVG for animation</h3>
            <p className="text-sm text-muted-foreground">
              Complex paths with many points animate slowly. Simplified paths perform better in CSS and JavaScript animations. Critical for smooth motion.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Reducing plotter/cutter files</h3>
            <p className="text-sm text-muted-foreground">
              Vinyl cutters and plotters process each point. Fewer points mean faster cutting. Simplify paths before sending to production equipment.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning path command structure</h3>
            <p className="text-sm text-muted-foreground">
              Convert relative commands to absolute to understand coordinate systems. See how paths are constructed. Educational for SVG beginners.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Fixing path direction issues</h3>
            <p className="text-sm text-muted-foreground">
              Some operations require specific path directions. Reverse the path for correct fill behavior or boolean operations.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Simplification changes the path shape.</strong>
              Higher tolerance = more deviation from original. Always preview at actual size. What looks fine zoomed out may show artifacts at 100%.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Not all path commands are simplified.</strong>
              The tool focuses on line and curve commands. Complex paths with many command types may not simplify as much.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Closed paths may not stay closed.</strong>
              The Z (closepath) command handling varies. Check that simplified paths still close properly for filled shapes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Tolerance is scene-dependent.</strong>
              A tolerance of 1.0 might be perfect for a 1000px icon but destroy detail in a 50px icon. Scale tolerance to your coordinate system.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Start with tolerance 0.5 and adjust. For print graphics, use lower values (0.1-0.3). For web icons, higher values (1.0-3.0) work well.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How much can I simplify without quality loss?</h3>
            <p className="text-sm text-muted-foreground">
              Depends on the path. Simple shapes can reduce 80-90%. Complex curves may only reduce 30-50%. Test at actual display size to find the sweet spot.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between relative and absolute?</h3>
            <p className="text-sm text-muted-foreground">
              Relative commands (lowercase) use offsets from current position. Absolute (uppercase) use fixed coordinates. Both produce identical shapes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I undo simplification?</h3>
            <p className="text-sm text-muted-foreground">
              No, simplification discards points permanently. Keep your original path data. Simplification is a one-way optimization.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why would I reverse a path?</h3>
            <p className="text-sm text-muted-foreground">
              Path direction affects fill rules and boolean operations. Some tools require consistent winding order. Reversing fixes inside-out fills.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work on all SVG paths?</h3>
            <p className="text-sm text-muted-foreground">
              Works on standard path data. Paths with unusual commands or embedded in complex structures may need manual extraction first.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I simplify multiple paths at once?</h3>
            <p className="text-sm text-muted-foreground">
              This tool handles one path at a time. For multi-path SVGs, extract each path's d attribute and process separately.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What algorithm is used?</h3>
            <p className="text-sm text-muted-foreground">
              Ramer-Douglas-Peucker algorithm. It's the standard for line simplification. Preserves overall shape while removing redundant points.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
