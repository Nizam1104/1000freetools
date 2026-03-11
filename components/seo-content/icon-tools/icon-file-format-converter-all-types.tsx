import React from "react"

export default function IconFileFormatConverterAllTypesSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Icon File Format Converter Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Upload your icon file in any supported format - PNG, JPG, SVG, ICO, WEBP, or GIF. The converter reads the image data and prepares it for format transformation.
          </p>
          <p>
            Select your target format from the available options. Each format has specific use cases: ICO for Windows favicons, PNG for web with transparency, SVG for scalable graphics, WEBP for modern web optimization.
          </p>
          <p>
            Adjust the output size if needed. Set quality for lossy formats like JPG and WEBP. Click Convert and the tool processes your icon, then provides a download link. Preview shows the converted result before you download.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating favicons from logos</h3>
            <p className="text-sm text-muted-foreground">
              Have a PNG logo but need an ICO favicon? Convert PNG to ICO format. The tool generates proper multi-size ICO files that work in all browsers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Optimizing icons for web performance</h3>
            <p className="text-sm text-muted-foreground">
              Large PNG icons slow down your site. Convert to WEBP for 30% smaller files with same quality. Modern browsers support WEBP natively.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing icons for different platforms</h3>
            <p className="text-sm text-muted-foreground">
              iOS needs PNG, Android accepts WEBP, Windows prefers ICO. Convert your master icon to each format for cross-platform app deployment.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Converting client files to usable formats</h3>
            <p className="text-sm text-muted-foreground">
              Client sent a BMP icon but you need SVG for the website. Convert BMP to SVG (with tracing) or to PNG for immediate use in designs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating print-ready icon files</h3>
            <p className="text-sm text-muted-foreground">
              Web icons are RGB but print needs CMYK. Convert to TIFF or high-quality PNG for print vendors. Set appropriate DPI for print resolution.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Archiving icons in universal formats</h3>
            <p className="text-sm text-muted-foreground">
              Old icons in obscure formats? Convert to PNG for long-term archival. PNG is widely supported and will remain readable for decades.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Format choice affects quality.</strong>
              PNG and SVG are lossless. JPG and WEBP use compression. For icons with sharp edges, PNG preserves quality better than JPG.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Transparency support varies.</strong>
              PNG, SVG, WEBP, and GIF support transparency. JPG and ICO have limited transparency support. Choose format based on transparency needs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">SVG conversion has limitations.</strong>
              Converting raster (PNG) to vector (SVG) requires tracing. Results vary based on image complexity. Simple icons trace better than detailed images.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">ICO files contain multiple sizes.</strong>
              ICO format stores several sizes in one file (16px, 32px, 48px, etc.). This ensures icons look sharp at any display size in Windows.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For web icons, use PNG with WEBP fallback. Serve WEBP to supporting browsers, PNG as fallback. This gives best compression with universal compatibility.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Which format is best for website icons?</h3>
            <p className="text-sm text-muted-foreground">
              PNG is the safest choice - universal support, transparency, lossless. WEBP is smaller but check browser support. SVG for simple icons that need scaling.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert ICO to PNG?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. ICO to PNG conversion extracts one size from the ICO file. Choose the size you need (usually 256px for modern use) during conversion.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What quality setting should I use for JPG?</h3>
            <p className="text-sm text-muted-foreground">
              For icons, use 90-95% quality. Icons have sharp edges that show compression artifacts. Higher quality preserves edge clarity.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does converting reduce image quality?</h3>
            <p className="text-sm text-muted-foreground">
              Lossless formats (PNG, SVG, BMP) maintain quality. Lossy formats (JPG, WEBP) compress and lose some data. Use lossless for icons when possible.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I batch convert multiple icons?</h3>
            <p className="text-sm text-muted-foreground">
              This tool handles one file at a time. For batch conversion, use command-line tools like ImageMagick or desktop batch converters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the maximum file size?</h3>
            <p className="text-sm text-muted-foreground">
              Most browsers handle uploads up to 10-20MB. For larger files, use desktop conversion software. Icons are typically small enough for web conversion.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is the converted file safe to use commercially?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. The conversion doesn't change licensing. If you have rights to use the original icon, you have rights to use the converted version.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
