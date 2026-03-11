import React from "react"

export default function SvgBackgroundRemoverSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste your SVG code into the input area. The tool identifies common background elements - typically large rectangles with white or light fills that sit behind your main graphics.
          </p>
          <p>
            Choose between "Remove Background" to make it transparent, or "Change Background" to replace with a different color. For removal, the tool sets background fills to "none". For changing, it replaces the color values.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">What gets modified:</p>
            <ul className="text-sm space-y-1">
              <li><strong>White backgrounds:</strong> #fff, #ffffff, white</li>
              <li><strong>Light backgrounds:</strong> Common light gray values</li>
              <li><strong>Background rectangles:</strong> Full-width/height rect elements</li>
            </ul>
          </div>
          <p>
            The preview shows your SVG on a checkerboard pattern indicating transparency. Download the modified SVG or copy the code for use in your projects.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing logos for different backgrounds</h3>
            <p className="text-sm text-muted-foreground">
              Your logo has a white background but needs to go on a dark header. Remove the background to make it transparent. Works on any colored surface.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating icon variants for themes</h3>
            <p className="text-sm text-muted-foreground">
              Need the same icon on light and dark backgrounds? Remove the original background, then add theme-appropriate backgrounds. One source, multiple outputs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Fixing exported SVG from design tools</h3>
            <p className="text-sm text-muted-foreground">
              Figma and Sketch often export with artboard backgrounds. Remove these unwanted backgrounds without re-exporting. Quick fix for clean SVGs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Making stickers and decals</h3>
            <p className="text-sm text-muted-foreground">
              Print services need transparent backgrounds for die-cut stickers. Remove the SVG background before sending to print. Clean cut lines every time.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating overlay graphics</h3>
            <p className="text-sm text-muted-foreground">
              Graphics with backgrounds block content underneath. Remove backgrounds for overlay effects. Perfect for watermarks, UI overlays, and composite images.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Adapting stock graphics</h3>
            <p className="text-sm text-muted-foreground">
              Downloaded SVG icons often have backgrounds. Remove them to match your design style. Make stock graphics look custom.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Background detection is heuristic.</strong>
              The tool looks for common patterns. Complex backgrounds or non-standard elements may not be detected. Manual editing might be needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some graphics need their background.</strong>
              If your design includes intentional background elements, don't remove them. The tool can't distinguish intentional from automatic backgrounds.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Changing color affects all matching fills.</strong>
              If your graphic uses white for both background and foreground elements, both will change. Use selective editing for complex cases.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Transparency shows as checkerboard.</strong>
              The preview checkerboard indicates transparent areas. Downloaded SVG will have true transparency, not the checkerboard pattern.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For logos, also create a version with your brand background color. Some platforms require solid backgrounds. Have both versions ready.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why wasn't my background removed?</h3>
            <p className="text-sm text-muted-foreground">
              The background might not match common patterns. Check if it's a grouped element, uses unusual colors, or is defined as a clip path. Manual editing may be needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I remove non-white backgrounds?</h3>
            <p className="text-sm text-muted-foreground">
              The tool focuses on white/light backgrounds. For other colors, use the SVG Color Changer to replace specific colors with transparent.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Will this work on all SVG files?</h3>
            <p className="text-sm text-muted-foreground">
              Works best on simple SVGs with rectangular backgrounds. Complex compositions, masked backgrounds, or embedded images may need manual editing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I add a new background color?</h3>
            <p className="text-sm text-muted-foreground">
              Use the "Change Background" option and pick your color. Or add a new rectangle element as the first child of your SVG with the desired fill.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is the background completely gone?</h3>
            <p className="text-sm text-muted-foreground">
              The fill is set to "none", making it transparent. The element may still exist in the code but won't render. For complete removal, edit the SVG manually.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I undo the background removal?</h3>
            <p className="text-sm text-muted-foreground">
              Keep your original SVG file. The tool doesn't modify the input. Re-paste the original to start over or use the Change option to restore a color.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why use this instead of a design tool?</h3>
            <p className="text-sm text-muted-foreground">
              Faster for simple backgrounds. No software to open, no learning curve. Perfect for quick fixes when you don't have design tools available.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
