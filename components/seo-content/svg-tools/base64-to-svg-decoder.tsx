import React from "react"

export default function Base64ToSvgDecoderSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool handles two-way conversion between Base64-encoded SVG data URIs and plain SVG code. Choose Decode mode to convert Base64 strings back to readable SVG, or Encode mode to convert SVG to Base64.
          </p>
          <p>
            For decoding, paste your "data:image/svg+xml;base64,..." string. The tool strips the data URI prefix, decodes the Base64 characters, and returns the original SVG markup. A preview shows the rendered image.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Base64 format explained:</p>
            <p className="text-sm">
              Base64 encoding converts binary data to ASCII text. SVG in Base64 looks like:
            </p>
            <pre className="text-xs font-mono bg-background p-2 rounded mt-2 overflow-x-auto">
data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0MCIvPjwvc3ZnPg==
            </pre>
          </div>
          <p>
            For encoding, paste regular SVG code. The tool converts it to Base64 and wraps it in a data URI format. This is useful for embedding SVG directly in CSS or HTML without external files.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Extracting SVG from CSS files</h3>
            <p className="text-sm text-muted-foreground">
              Found a Base64 SVG in someone's CSS and need to edit it? Decode it to get the original SVG code. Make your changes, then re-encode if needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Embedding icons in HTML emails</h3>
            <p className="text-sm text-muted-foreground">
              Email clients block external images. Encode your SVG icons as Base64 data URIs to embed them directly in email HTML. Ensures icons display reliably.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Inlining SVG for performance</h3>
            <p className="text-sm text-muted-foreground">
              Reduce HTTP requests by embedding small SVGs as Base64 in CSS background-image properties. Critical for above-the-fold icons and UI elements.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Recovering lost SVG files</h3>
            <p className="text-sm text-muted-foreground">
              Only have the Base64 string from a database or API response? Decode it to recover the original SVG file for editing in Illustrator or Figma.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging SVG issues</h3>
            <p className="text-sm text-muted-foreground">
              Base64-encoded SVGs are hard to read. Decode them to inspect the actual SVG code. Find errors, check attributes, or understand what's being rendered.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating data URI favicons</h3>
            <p className="text-sm text-muted-foreground">
              Encode your SVG favicon as Base64 for inline use in HTML. Useful for single-file demos, offline apps, or avoiding extra HTTP requests.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Base64 increases file size.</strong>
              Encoded data is about 33% larger than the original. Only use Base64 for small SVGs where the HTTP request savings outweigh the size increase.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Data URI format includes the prefix.</strong>
              Full format: {"data:image/svg+xml;base64,{encoded-data}"}. The tool handles both with and without the prefix for convenience.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Special characters need URL encoding in CSS.</strong>
              When using Base64 SVG in CSS, some characters may need escaping. The raw Base64 output works in HTML src attributes directly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Large files may cause issues.</strong>
              Very long Base64 strings can slow down browsers or hit input limits. This tool works best with icons and small graphics under 100KB.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For CSS background images, consider using plain SVG with URL encoding instead of Base64. It's often shorter: background-image: url("data:image/svg+xml,{"{encoded}"}").
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between encode and decode?</h3>
            <p className="text-sm text-muted-foreground">
              Encode converts SVG code to Base64. Decode converts Base64 back to SVG code. Use encode for embedding, decode for editing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I decode Base64 from an API response?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, paste the Base64 string directly. If it includes the data URI prefix, the tool strips it automatically. You'll get clean SVG code.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why encode SVG instead of linking the file?</h3>
            <p className="text-sm text-muted-foreground">
              Inline SVG eliminates HTTP requests, works offline, and avoids CORS issues. Trade-off is larger HTML/CSS file size.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does the preview work for all SVGs?</h3>
            <p className="text-sm text-muted-foreground">
              Most SVGs render correctly. Complex SVGs with external references or advanced features may not display fully in the preview.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I download the decoded SVG?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, in decode mode there's a Download button that saves the SVG as a .svg file. Use it to recover files from Base64 strings.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is Base64 encoding secure?</h3>
            <p className="text-sm text-muted-foreground">
              Base64 is encoding, not encryption. Anyone can decode it. Don't use Base64 to hide sensitive data in SVG.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if I get an error decoding?</h3>
            <p className="text-sm text-muted-foreground">
              Check that the string is valid Base64. It should only contain A-Z, a-z, 0-9, +, /, and = padding. Remove any whitespace or line breaks.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
