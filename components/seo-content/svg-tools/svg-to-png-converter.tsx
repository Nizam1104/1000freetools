import React from "react"

export default function SvgToPngConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste your SVG code or upload an SVG file. Set the output dimensions in pixels - width and height determine the final PNG size. The scale multiplier lets you export at higher resolutions for retina displays.
          </p>
          <p>
            Choose whether you need a transparent background. PNG supports transparency, so uncheck this option to preserve transparent areas in your SVG. If you need a solid background, pick a color.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Resolution tips:</p>
            <ul className="text-sm space-y-1">
              <li><strong>Scale 1x:</strong> Standard resolution for web</li>
              <li><strong>Scale 2x:</strong> Retina/HiDPI displays</li>
              <li><strong>Scale 3-4x:</strong> Print-quality output</li>
            </ul>
          </div>
          <p>
            Click Convert to render your SVG on a canvas and export as PNG. Preview the result with a checkerboard pattern showing transparency. Download the PNG or copy the data URL.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating app icons from vector logos</h3>
            <p className="text-sm text-muted-foreground">
              Convert your SVG logo to PNG at exact icon sizes (1024x1024, 512x512, etc.). Export multiple sizes for iOS, Android, and web app manifests. Transparent backgrounds work perfectly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Generating social media images</h3>
            <p className="text-sm text-muted-foreground">
              Turn SVG graphics into PNG posts for platforms that don't support SVG. Set dimensions to match platform requirements - 1080x1080 for Instagram, 1200x630 for Facebook links.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing images for email campaigns</h3>
            <p className="text-sm text-muted-foreground">
              Email clients don't support SVG. Convert your SVG email graphics to PNG with transparent backgrounds. They display consistently across Gmail, Outlook, and Apple Mail.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Making print-ready files</h3>
            <p className="text-sm text-muted-foreground">
              Some print services require PNG. Export at 300 DPI equivalent (scale 3-4x) for quality printing. Transparent PNGs work great for overlaying on printed materials.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating documentation screenshots</h3>
            <p className="text-sm text-muted-foreground">
              Include crisp diagrams and icons in documentation. PNG format works in all documentation tools. Transparent backgrounds blend seamlessly with any page design.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building image sprites</h3>
            <p className="text-sm text-muted-foreground">
              Convert multiple SVG icons to PNG, then combine into a sprite sheet. PNG sprites work in older browsers that don't support SVG sprites.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">PNG is raster, not vector.</strong>
              Unlike SVG, PNG can't scale without quality loss. Export at the largest size you'll need. You can always scale down, but upscaling creates blur.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Transparency requires PNG.</strong>
              JPEG doesn't support transparency. If your SVG has transparent areas and you need to preserve them, PNG is the right choice.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">File size increases with dimensions.</strong>
              A 2000x2000 PNG is much larger than 500x500. Balance quality needs with file size. Use compression tools for web optimization.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Complex SVGs may render differently.</strong>
              Some SVG features (filters, blend modes) may not render identically in all browsers. Preview before using in production.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For web use, run exported PNGs through an optimizer like TinyPNG or ImageOptim. You can reduce file size 50-80% without visible quality loss.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the maximum size I can export?</h3>
            <p className="text-sm text-muted-foreground">
              Browser canvas limits apply, typically around 16000x16000 pixels. For most uses, 4096x4096 works reliably. Larger sizes may fail on some devices.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why choose PNG over JPG?</h3>
            <p className="text-sm text-muted-foreground">
              PNG supports transparency and uses lossless compression. Better for graphics with text, sharp edges, or transparent backgrounds. JPG is smaller for photos.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert multiple SVGs at once?</h3>
            <p className="text-sm text-muted-foreground">
              This tool processes one SVG at a time. For batch conversion, use desktop tools like ImageMagick or online batch converters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I get a transparent background?</h3>
            <p className="text-sm text-muted-foreground">
              Check the "Transparent Background" option. The preview shows a checkerboard pattern indicating transparency. Downloaded PNG will have transparent areas.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What scale should I use for retina?</h3>
            <p className="text-sm text-muted-foreground">
              Use 2x scale for retina displays. If your display size is 200x200, export at 400x400. This ensures crisp rendering on high-DPI screens.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is the conversion done locally?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, all processing happens in your browser. Your SVG code never leaves your computer. Safe for sensitive or proprietary graphics.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I edit the PNG after conversion?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, open the PNG in any image editor like Photoshop, GIMP, or online tools. Keep your original SVG for future edits and re-export.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
