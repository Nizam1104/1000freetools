import React from "react"

export default function SvgToBase64EncoderSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How SVG to Base64 Encoding Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This converter transforms SVG files into base64-encoded data strings. The result is a single line of text that represents your entire SVG - ready to embed directly in HTML, CSS, or JavaScript without external file references.
          </p>
          <p>
            Base64 encoding converts binary data (or in SVG's case, text data) into ASCII characters. The SVG markup gets transformed into a string using only A-Z, a-z, 0-9, +, /, and = characters. This encoded string can safely travel through systems that might corrupt raw SVG markup.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Output formats available:</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Raw base64 string - just the encoded data</li>
              <li>Data URI for HTML - <code>data:image/svg+xml;base64,...</code></li>
              <li>CSS background syntax - <code>url('data:image/svg+xml;base64,...')</code></li>
              <li>JavaScript string - escaped and quoted for direct use in code</li>
              <li>URL-encoded SVG - alternative to base64, sometimes shorter</li>
            </ul>
          </div>
          <p>
            The encoded SVG is about 33% larger than the original file (base64 overhead), but you gain the benefit of a single HTTP request instead of separate file fetches. For small icons and graphics, this tradeoff usually improves performance.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Inlining icons for performance</h3>
            <p className="text-sm text-muted-foreground">
              Each external SVG file is an HTTP request. Encode 20 icons as base64, embed them in your CSS, and reduce 20 requests to zero. Critical for above-the-fold icons where every millisecond counts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Embedding SVGs in email templates</h3>
            <p className="text-sm text-muted-foreground">
              Email clients block external resources. Inline SVGs as base64 data URIs and your graphics render reliably across Gmail, Outlook, and Apple Mail. No broken image placeholders.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Using SVGs in CSS backgrounds</h3>
            <p className="text-sm text-muted-foreground">
              Need an SVG as a CSS background image? Encode to base64, drop into <code>background-image: url('data:...')</code>. No separate file, no path management, works in any context.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Passing SVGs through APIs</h3>
            <p className="text-sm text-muted-foreground">
              Sending SVG data through JSON APIs? Base64 encoding ensures special characters don't break JSON parsing. Decode on the receiving end and reconstruct the SVG.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Storing SVGs in databases</h3>
            <p className="text-sm text-muted-foreground">
              Some databases handle text fields better than binary blobs. Store base64-encoded SVGs in VARCHAR columns. Decode when retrieving for display.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating self-contained HTML documents</h3>
            <p className="text-sm text-muted-foreground">
              Building a portable HTML report? Embed all graphics as base64. The single HTML file contains everything - no asset folders to manage, no broken links when sharing.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Base64 adds 33% size overhead.</strong>
              A 3KB SVG becomes ~4KB as base64. For large SVGs, this overhead might outweigh the HTTP request benefit. Use base64 for small graphics (under 10KB), keep larger files external.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">URL encoding is an alternative.</strong>
              Instead of base64, you can URL-encode the SVG (<code>%3Csvg%3E...</code>). For simple SVGs, URL encoding produces shorter strings than base64. Try both and compare.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Browser caching doesn't apply.</strong>
              Inline base64 SVGs can't be cached separately from the HTML/CSS containing them. If the same SVG appears on multiple pages, external files might be more efficient overall.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some characters need escaping.</strong>
              When embedding base64 in HTML attributes or CSS, certain characters might need escaping. The tool should provide properly escaped output for your target context.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For CSS backgrounds, URL-encoded SVGs are often shorter than base64. Use <code>url('data:image/svg+xml;utf8,&lt;svg&gt;...&lt;/svg&gt;')</code> with proper escaping.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I decode base64 back to SVG?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, base64 encoding is reversible. Use an online base64 decoder, or in JavaScript: <code>atob(base64String)</code>. For data URIs, strip the <code>data:image/svg+xml;base64,</code> prefix first.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why is my base64 SVG not rendering?</h3>
            <p className="text-sm text-muted-foreground">
              Check the data URI prefix - it must be exactly <code>data:image/svg+xml;base64,</code>. Verify the base64 string has no line breaks or spaces. Ensure the original SVG was valid before encoding.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I use base64 or inline SVG markup?</h3>
            <p className="text-sm text-muted-foreground">
              Inline SVG markup (<code>&lt;svg&gt;...&lt;/svg&gt;</code>) is smaller and allows CSS/JS manipulation. Base64 is better when you need a single string (CSS background, data attribute). Choose based on use case.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does base64 encoding affect SVG quality?</h3>
            <p className="text-sm text-muted-foreground">
              No, base64 is a lossless encoding. The decoded SVG is byte-for-byte identical to the original. Quality only changes if you modify the SVG before encoding (simplifying paths, removing metadata, etc.).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I encode multiple SVGs at once?</h3>
            <p className="text-sm text-muted-foreground">
              This tool handles one SVG at a time. For batch encoding, use a build tool like webpack with url-loader, or a Node.js script with the Buffer API to process multiple files.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the maximum SVG size for base64?</h3>
            <p className="text-sm text-muted-foreground">
              No hard limit, but practical considerations apply. Data URIs over 100KB can cause performance issues in some browsers. For large graphics, keep them as external files.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do all browsers support base64 SVGs?</h3>
            <p className="text-sm text-muted-foreground">
              All modern browsers support base64-encoded SVGs in data URIs. IE8 and earlier don't - but they don't support inline SVG either. If you need IE8 support, use PNG fallbacks.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
