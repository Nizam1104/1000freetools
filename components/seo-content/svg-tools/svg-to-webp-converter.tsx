import React from "react"

export default function SvgToWebpConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste your SVG code into the input area. Set your desired output dimensions in pixels. WEBP supports both lossy and lossless compression - adjust the quality slider to find your balance.
          </p>
          <p>
            The tool renders your SVG on an HTML5 canvas, then exports as WEBP format. Modern browsers handle WEBP encoding natively. The preview shows exactly what you'll get.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Quality recommendations:</p>
            <ul className="text-sm space-y-1">
              <li><strong>90-100%:</strong> Near-lossless, maximum quality</li>
              <li><strong>75-89%:</strong> Excellent quality, smaller files</li>
              <li><strong>60-74%:</strong> Good quality for web use</li>
              <li><strong>Below 60%:</strong> Noticeable compression artifacts</li>
            </ul>
          </div>
          <p>
            Click Convert to generate your WEBP image. Preview the result, then download the .webp file or copy the data URL for embedding in your code.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Optimizing website images</h3>
            <p className="text-sm text-muted-foreground">
              WEBP files are 25-35% smaller than PNG at similar quality. Convert SVG graphics to WEBP for faster page loads. Google recommends WEBP for Core Web Vitals.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating responsive image sets</h3>
            <p className="text-sm text-muted-foreground">
              Export your SVG at multiple sizes as WEBP. Use with the picture element to serve appropriate sizes. Smaller files mean faster mobile experiences.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building progressive web apps</h3>
            <p className="text-sm text-muted-foreground">
              PWAs benefit from every kilobyte saved. WEBP's efficient compression reduces bundle size. Faster installs and updates for your users.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing e-commerce product images</h3>
            <p className="text-sm text-muted-foreground">
              Product graphics converted to WEBP load faster on shopping sites. Faster pages correlate with higher conversion rates. Every second matters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating email-safe images</h3>
            <p className="text-sm text-muted-foreground">
              Some email clients now support WEBP. For those that do, you get smaller emails that load faster. Include PNG fallbacks for compatibility.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Reducing CDN bandwidth costs</h3>
            <p className="text-sm text-muted-foreground">
              Smaller files mean lower bandwidth bills. At scale, WEBP's size savings translate to real cost reductions. Pay less for the same traffic.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">WEBP browser support is excellent but not universal.</strong>
              All modern browsers support WEBP. IE11 and very old browsers don't. Use the picture element with PNG fallbacks for full compatibility.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">WEBP supports transparency.</strong>
              Unlike JPEG, WEBP has an alpha channel. Transparent SVGs convert cleanly. Check the preview to confirm transparency is preserved.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Quality setting affects file size significantly.</strong>
              Dropping from 100% to 80% can halve file size with minimal visual difference. Test different settings for your use case.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">WEBP encoding varies by browser.</strong>
              Chrome, Firefox, and Safari may produce slightly different WEBP files. The differences are minor but noticeable in exact byte comparisons.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Use WEBP with the HTML picture element for automatic fallback. Modern browsers get WEBP, older browsers get PNG. Best of both worlds.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How much smaller is WEBP than PNG?</h3>
            <p className="text-sm text-muted-foreground">
              Typically 25-35% smaller at equivalent quality. Complex graphics with gradients see bigger savings. Simple graphics see modest savings.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does WEBP support transparency?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, WEBP supports full alpha transparency like PNG. Transparent areas in your SVG are preserved in the WEBP output.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use WEBP everywhere?</h3>
            <p className="text-sm text-muted-foreground">
              Most modern browsers support WEBP. For older browsers, use the picture element with PNG fallback. Safari 14+, Chrome, Firefox, and Edge all support WEBP.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What quality setting should I use?</h3>
            <p className="text-sm text-muted-foreground">
              80-85% is the sweet spot for web use. Nearly indistinguishable from 100% but significantly smaller files. Test at your actual display size.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is WEBP lossy or lossless?</h3>
            <p className="text-sm text-muted-foreground">
              WEBP supports both. This tool uses lossy compression for smaller files. For lossless WEBP, use dedicated tools like cwebp with the -lossless flag.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert WEBP back to SVG?</h3>
            <p className="text-sm text-muted-foreground">
              No, WEBP is raster (pixels), SVG is vector (math). You can't recover vector data from a raster image. Keep your original SVG files.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why not just use SVG directly?</h3>
            <p className="text-sm text-muted-foreground">
              SVG is great, but some platforms don't support it. Email clients, some social platforms, and older systems need raster formats. WEBP is the modern choice.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
