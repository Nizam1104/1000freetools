import React from "react"

export default function IconColorChangerPaletteToolSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Icon Color Changer Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Upload your SVG icon file. The tool reads the SVG code and identifies all color values - fills, strokes, and gradients. It displays the detected original colors for reference.
          </p>
          <p>
            Choose a new color using the color picker or enter a hex code directly. Select from preset colors for quick changes. The tool replaces all instances of the original color with your new selection.
          </p>
          <p>
            Preview shows the original and recolored icons side by side. Download the modified SVG or copy the code directly. The color change preserves all vector paths and maintains icon quality at any size.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Matching icons to brand colors</h3>
            <p className="text-sm text-muted-foreground">
              Downloaded a free icon but it's blue and your brand is purple? Recolor it to match your brand hex code exactly. Maintains consistency across all assets.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating icon variants for themes</h3>
            <p className="text-sm text-muted-foreground">
              Need light and dark mode icons? Create a white version for dark backgrounds and black version for light backgrounds from one source file.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Customizing icon packs</h3>
            <p className="text-sm text-muted-foreground">
              Bought an icon pack but want different colors? Recolor all icons to your preferred palette. Much cheaper than commissioning custom icons.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating state-based icon colors</h3>
            <p className="text-sm text-muted-foreground">
              Need icons for active, inactive, error states? Duplicate your icon and recolor each version - gray for disabled, red for errors, green for success.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Adapting icons for different clients</h3>
            <p className="text-sm text-muted-foreground">
              Same dashboard for multiple clients? Recolor the icon set to match each client's brand. One design, multiple color variations for different projects.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing color accessibility</h3>
            <p className="text-sm text-muted-foreground">
              Wondering if your icon color has enough contrast? Try different colors quickly. Test high-contrast versions for accessibility compliance.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Works only with SVG files.</strong>
              PNG and JPG icons can't be recolored with this tool. SVG stores colors as editable code. Convert raster icons to SVG first if needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Multi-color icons need multiple changes.</strong>
              Icons with several colors require changing each color separately. The tool replaces one color at a time for precise control.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Gradients may need special handling.</strong>
              Icons with gradient fills have multiple color stops. Changing gradient colors requires editing each stop individually in the SVG code.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some icons use currentColor.</strong>
              Icons with "currentColor" inherit the text color. These automatically match surrounding text - no recoloring needed for basic color changes.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Before recoloring, check if the icon uses CSS classes or inline styles. Class-based icons are easier to recolor with CSS. Inline styles need SVG editing.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I change multiple colors at once?</h3>
            <p className="text-sm text-muted-foreground">
              This tool changes one color at a time. For multiple colors, run the conversion multiple times or edit the SVG code directly in a text editor.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Will recoloring affect icon quality?</h3>
            <p className="text-sm text-muted-foreground">
              No. SVG is vector-based. Changing colors only modifies color values in the code. All paths, curves, and shapes remain perfectly sharp.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I recolor PNG icons?</h3>
            <p className="text-sm text-muted-foreground">
              Not with this tool. PNG colors are pixel data, not editable code. Use image editing software like Photoshop to recolor PNG icons.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if the icon has strokes and fills?</h3>
            <p className="text-sm text-muted-foreground">
              The tool replaces both stroke and fill colors. If you need different colors for each, edit the SVG code manually after the initial conversion.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I save my custom color palette?</h3>
            <p className="text-sm text-muted-foreground">
              This tool doesn't save palettes. For repeated use, note your hex codes externally. Consider creating a design system document with approved colors.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work with icon fonts?</h3>
            <p className="text-sm text-muted-foreground">
              No. Icon fonts are font files, not SVG. Change icon font colors with CSS color property, not by modifying the font file itself.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I undo a color change?</h3>
            <p className="text-sm text-muted-foreground">
              Keep the original SVG file as backup. The tool doesn't modify your original. Just re-upload the original if you want to start over.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
