import React from "react"

export default function QrCodeFileSizeOptimizerSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the QR Code File Size Optimizer Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter the data for your QR code - URL, text, or other content. The optimizer analyzes the data length to calculate optimal settings.
          </p>
          <p>
            Select error correction level: Low (7%), Medium (15%), Quartile (25%), or High (30%). Lower levels create smaller files but less damage resistance.
          </p>
          <p>
            Choose QR version (size) or let it auto-select based on your data. Higher versions hold more data but create larger images.
          </p>
          <p>
            Set output format (PNG, JPG, WebP, SVG) and quality level. SVG is smallest for simple codes. WebP offers best compression for raster images.
          </p>
          <p>
            Adjust scale factor and margin to control final dimensions. The optimizer shows estimated file sizes before and after optimization.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Email newsletter optimization</h3>
            <p className="text-sm text-muted-foreground">
              Reduce QR code file sizes for email. Smaller files load faster. Improve email deliverability and user experience.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Mobile app asset optimization</h3>
            <p className="text-sm text-muted-foreground">
              Optimize QR codes bundled in apps. Reduce app download size. Every kilobyte matters for user acquisition.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">High-volume printing</h3>
            <p className="text-sm text-muted-foreground">
              Optimize files for mass printing. Smaller files process faster through RIP software. Reduce printing costs and time.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Website performance</h3>
            <p className="text-sm text-muted-foreground">
              Optimize QR codes on web pages. Smaller images improve page load speed. Better Core Web Vitals scores.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">SMS/MMS campaigns</h3>
            <p className="text-sm text-muted-foreground">
              Include QR codes in multimedia messages. Carrier file size limits require optimization. Ensure message delivery.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">API response optimization</h3>
            <p className="text-sm text-muted-foreground">
              Generate optimized QR codes via API. Reduce bandwidth costs. Improve response times for high-volume services.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Error correction affects scannability.</strong>
              Lower error correction means smaller files but less damage tolerance. Don't go below Medium for printed codes that may wear.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Format choice impacts size.</strong>
              SVG is smallest for simple codes (vector). WebP offers best compression for photos. PNG is good balance of size and compatibility.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Scale affects print quality.</strong>
              Higher scale factors create larger images. For print, ensure sufficient resolution. 300 DPI minimum for professional printing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Data length determines QR version.</strong>
              Longer data requires larger QR codes. Use URL shorteners to reduce data. Shorter URLs = smaller QR codes = smaller files.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Optimization tip:</strong> Test optimized codes on actual devices. Ensure they scan reliably after compression. Don't sacrifice functionality for file size.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the smallest QR code file size possible?</h3>
            <p className="text-sm text-muted-foreground">
              Simple QR codes in SVG format can be under 1KB. PNG codes typically 2-10KB. Depends on data complexity and error correction level.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Which format is best for web?</h3>
            <p className="text-sm text-muted-foreground">
              WebP offers best compression with good quality. SVG for simple codes. PNG for maximum compatibility. Avoid JPG for QR codes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does compression affect scannability?</h3>
            <p className="text-sm text-muted-foreground">
              Lossless compression (PNG, SVG) doesn't affect scanning. Lossy compression (JPG, WebP) can if too aggressive. Test after optimization.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How does error correction affect size?</h3>
            <p className="text-sm text-muted-foreground">
              Higher error correction adds more data modules. Level H (30%) creates larger files than Level L (7%). Balance protection with size.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I optimize existing QR code images?</h3>
            <p className="text-sm text-muted-foreground">
              Use image optimization tools like TinyPNG or ImageOptim. Or regenerate with optimized settings. Re-encoding often produces better results.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What margin size is recommended?</h3>
            <p className="text-sm text-muted-foreground">
              Minimum 4 modules (quiet zone). Larger margins improve scanning reliability. Don't reduce below 4 modules even for size optimization.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I use vector or raster?</h3>
            <p className="text-sm text-muted-foreground">
              Vector (SVG) for print and scalability. Raster (PNG, WebP) for web and apps. SVG is often smallest for simple QR codes.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
