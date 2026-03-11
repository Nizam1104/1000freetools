import React from "react"

export default function FontConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Font Converter Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Upload your font file in any common format: TTF, OTF, WOFF, WOFF2, or EOT. Select your target format for conversion.
          </p>
          <p>
            The converter processes your font and generates the new format. Download the converted font file. Copy the CSS @font-face code for immediate implementation.
          </p>
          <p>
            Reference the font format guide to understand when to use each format. WOFF2 is best for modern browsers. TTF for maximum compatibility. All processing happens locally.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Web font optimization</h3>
            <p className="text-sm text-muted-foreground">
              Desktop fonts (TTF/OTF) are too large for web. Convert to WOFF2 for best compression. Faster page loads.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Cross-browser support</h3>
            <p className="text-sm text-muted-foreground">
              Different browsers prefer different formats. Provide WOFF2, WOFF, and TTF fallbacks. Maximum compatibility.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Legacy system support</h3>
            <p className="text-sm text-muted-foreground">
              Old IE needs EOT. Convert for enterprise support. Modern formats for everyone else. Progressive enhancement.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Design to development handoff</h3>
            <p className="text-sm text-muted-foreground">
              Designers work with OTF/TTF. Developers need web fonts. Convert for smooth handoff. No format confusion.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Font library management</h3>
            <p className="text-sm text-muted-foreground">
              Standardize your font collection. Convert everything to consistent formats. Easier management and deployment.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning font formats</h3>
            <p className="text-sm text-muted-foreground">
              Understand format differences hands-on. See file size variations. Build web typography knowledge.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">WOFF2 is the modern standard.</strong>
              Best compression, supported by all modern browsers. Use WOFF2 as primary format. Include WOFF for older browsers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">TTF has universal support.</strong>
              Works everywhere but larger file size. Use as fallback. Not optimal for performance-focused sites.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">EOT is legacy only.</strong>
              Internet Explorer only. Don't include unless you support IE. Most sites can skip EOT now.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">OTF has advanced features.</strong>
              Better typography features than TTF. Larger file size. Consider if you need advanced OpenType features.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For production, use multiple formats with @font-face. List WOFF2 first, then WOFF, then TTF. Browsers use the first they support.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Which format is smallest?</h3>
            <p className="text-sm text-muted-foreground">
              WOFF2 is typically 30% smaller than WOFF. TTF is largest. Always prefer WOFF2 for web performance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do I need all formats?</h3>
            <p className="text-sm text-muted-foreground">
              For modern sites, WOFF2 + WOFF is enough. Add TTF for very old devices. Skip EOT unless supporting IE.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does conversion affect quality?</h3>
            <p className="text-sm text-muted-foreground">
              No, font data is preserved. Formats are containers for the same glyph data. Visual quality remains identical.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about font licensing?</h3>
            <p className="text-sm text-muted-foreground">
              Check your font license for web use. Some licenses restrict format conversion. Respect font creator terms.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert variable fonts?</h3>
            <p className="text-sm text-muted-foreground">
              Variable fonts require specific support. Not all converters handle them. Check tool compatibility first.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I use converted fonts?</h3>
            <p className="text-sm text-muted-foreground">
              Copy the @font-face CSS. Upload font files to your server. Reference in your stylesheet. Standard web font setup.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is this tool free?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, completely free. Convert as many fonts as you need. No registration or limitations.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
