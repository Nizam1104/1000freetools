import React from "react"

export default function SvgColorChangerSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste your SVG code into the input area. The tool scans the SVG for color attributes including fill, stroke, and stop-color values used in gradients.
          </p>
          <p>
            Use the color pickers to select which color to find and what to replace it with. You can enter hex codes directly or use the visual color picker. Click Replace to change only the specified color, or Replace All to swap every color in the SVG.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">What gets replaced:</p>
            <ul className="text-sm space-y-1">
              <li><strong>fill attributes:</strong> Shape fill colors</li>
              <li><strong>stroke attributes:</strong> Outline and border colors</li>
              <li><strong>stop-color:</strong> Gradient color stops</li>
            </ul>
          </div>
          <p>
            The preview updates instantly showing your color changes. Download the modified SVG or copy the code for use in your projects.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating dark mode icon variants</h3>
            <p className="text-sm text-muted-foreground">
              Quickly generate dark theme versions of your icons. Replace white backgrounds with dark colors, adjust light elements for contrast. Maintain two icon sets effortlessly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Branding icon customization</h3>
            <p className="text-sm text-muted-foreground">
              Adapt stock icons to match brand colors. Change a blue icon set to your brand's purple without opening a vector editor. Perfect for client work with specific color requirements.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Generating icon state variations</h3>
            <p className="text-sm text-muted-foreground">
              Create hover, active, and disabled states from base icons. Replace the primary color with hover shades. Faster than designing each state from scratch.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing icons for different backgrounds</h3>
            <p className="text-sm text-muted-foreground">
              Adjust icon colors for use on light vs dark backgrounds, colored sections, or images. Ensure sufficient contrast for accessibility compliance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating seasonal theme variants</h3>
            <p className="text-sm text-muted-foreground">
              Update your app icons for holidays or seasons. Change colors to match Halloween orange, Christmas red/green, or spring pastels. Quick thematic updates.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Fixing exported icon colors</h3>
            <p className="text-sm text-muted-foreground">
              Icons exported from design tools sometimes have wrong colors. Batch-fix hex codes without re-exporting. Correct designer mistakes in seconds.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Color matching is exact.</strong>
              The tool matches exact hex codes. #000000 and #000 won't match each other. Normalize your colors first if you have mixed formats.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Replace All affects everything.</strong>
              Every color in the SVG gets replaced with your new color. Use for monochrome conversions. For selective changes, use the specific Replace function.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Named colors aren't detected.</strong>
              Colors like "red", "blue", "transparent" won't be found. The tool searches for hex codes only. Convert named colors to hex first.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Gradients may need multiple changes.</strong>
              Each gradient stop color must be changed individually. Replace All will change gradient colors too, which may not be desired.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For icons with multiple colors, change one color at a time. Start with the dominant color, then adjust accent colors. This gives you more control over the final appearance.
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
              Use Replace All for a single target color. For multiple different colors, run the tool multiple times or edit the SVG code directly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work with RGB or HSL colors?</h3>
            <p className="text-sm text-muted-foreground">
              Currently the tool focuses on hex colors. For RGB/HSL, convert to hex first or edit the SVG code directly in a text editor.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if my icon uses currentColor?</h3>
            <p className="text-sm text-muted-foreground">
              currentColor inherits from CSS and won't be changed by this tool. That's intentional - it allows dynamic coloring via CSS.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I undo color changes?</h3>
            <p className="text-sm text-muted-foreground">
              Keep your original SVG file. The tool doesn't modify the input, only creates new output. Re-paste the original to start over.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Will this affect opacity values?</h3>
            <p className="text-sm text-muted-foreground">
              No, opacity attributes are preserved. Only color values (fill, stroke, stop-color) are modified. Transparency settings remain unchanged.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I batch process multiple icons?</h3>
            <p className="text-sm text-muted-foreground">
              This tool handles one SVG at a time. For batch processing, consider command-line tools like svgo with custom plugins or desktop software.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why use this instead of a design tool?</h3>
            <p className="text-sm text-muted-foreground">
              Faster for simple color swaps. No software to open, no learning curve. Perfect for developers who need quick color adjustments without design tools.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
