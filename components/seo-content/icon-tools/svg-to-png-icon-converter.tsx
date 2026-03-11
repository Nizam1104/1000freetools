import React from "react"

export default function SvgToPngIconConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the SVG to PNG Converter Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Upload your SVG icon file using the file picker or drag-and-drop area. The converter reads the vector data and prepares it for rasterization.
          </p>
          <p>
            Set your desired output size using the slider. Choose from 16px for favicons up to 1024px for high-resolution displays. The scale multiplier lets you create multiple sizes from one conversion.
          </p>
          <p>
            Toggle transparent background if you need the PNG to overlay on different colors. Click Convert to PNG and the tool renders your SVG onto a canvas, then exports it as a downloadable PNG file. Preview appears instantly so you can verify quality before downloading.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing icons for mobile apps</h3>
            <p className="text-sm text-muted-foreground">
              App stores require PNG icons at specific sizes. Convert your master SVG to 1024px PNG for App Store Connect, then generate smaller sizes for Android.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Adding icons to presentations</h3>
            <p className="text-sm text-muted-foreground">
              PowerPoint and Google Slides work better with PNG than SVG. Convert your icon library to PNG for reliable display across all devices.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating social media graphics</h3>
            <p className="text-sm text-muted-foreground">
              Canva and similar tools prefer PNG. Convert your brand icons to PNG before importing. Transparent background ensures clean integration.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Email template development</h3>
            <p className="text-sm text-muted-foreground">
              Email clients have poor SVG support. Convert icons to PNG for reliable display in Gmail, Outlook, and Apple Mail. Use 2x size for retina displays.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building print materials</h3>
            <p className="text-sm text-muted-foreground">
              Print shops need high-resolution PNG files. Convert SVG icons to 300 DPI PNG at the exact print size. Ensures crisp output in brochures and business cards.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Sharing icons with non-designers</h3>
            <p className="text-sm text-muted-foreground">
              Clients and stakeholders often can't open SVG files. Convert to PNG for easy viewing. They can use it immediately in documents and presentations.
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
              Unlike SVG, PNG has fixed resolution. Enlarging beyond the exported size causes pixelation. Export at the largest size you might need.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Transparent backgrounds work best.</strong>
              Keep transparency enabled unless you need a specific background color. Transparent PNGs work on any background color in your designs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">File size increases with dimensions.</strong>
              A 512px PNG is 4x larger than 256px. For web use, export only the sizes you need. Don't use 1024px icons for 32px display areas.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Complex SVGs may render differently.</strong>
              Advanced SVG features like filters or animations won't transfer to PNG. The converter captures the visual appearance at export time.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Export icons at 2x or 3x their display size for retina screens. A 24px icon should be exported at 48px or 72px. This ensures crisp display on high-DPI devices.
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
              Maximum export size is 1024x1024 pixels. This covers most use cases including app icons and print materials. For larger sizes, use a vector editor.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert multiple SVGs at once?</h3>
            <p className="text-sm text-muted-foreground">
              This tool processes one file at a time. For batch conversion, use command-line tools like ImageMagick or dedicated batch converters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why is my PNG larger than the SVG?</h3>
            <p className="text-sm text-muted-foreground">
              SVG stores mathematical paths (small file). PNG stores pixel data (larger file). This is normal. PNG size depends on dimensions and color complexity.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does the converter preserve transparency?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. When you enable transparent background, the PNG preserves all transparent areas from the SVG. Perfect for overlaying on any background.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert PNG back to SVG?</h3>
            <p className="text-sm text-muted-foreground">
              No. This tool only converts SVG to PNG. Converting PNG to SVG requires vectorization (tracing), which is a different process entirely.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What quality is the exported PNG?</h3>
            <p className="text-sm text-muted-foreground">
              PNG uses lossless compression. Quality is identical to the SVG rendering at that size. No quality degradation from compression artifacts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Are there any SVG features that won't convert?</h3>
            <p className="text-sm text-muted-foreground">
              Animations, interactivity, and external references won't convert. Static visual elements (shapes, paths, gradients) convert perfectly.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
