import React from "react"

export default function HtmlBase64ImageEncoderSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How HTML Base64 Image Encoding Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool converts image files (PNG, JPG, GIF, WebP, SVG) into base64-encoded data strings that can be embedded directly in HTML. Instead of <code>&lt;img src="image.png"&gt;</code>, you get <code>&lt;img src="data:image/png;base64,iVBORw0KG..."&gt;</code>.
          </p>
          <p>
            Base64 encoding transforms binary image data into ASCII text using 64 characters (A-Z, a-z, 0-9, +, /). The encoded string is about 33% larger than the original file but can be embedded inline without external file references.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Supported formats:</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>PNG - lossless, supports transparency</li>
              <li>JPEG/JPG - lossy compression, photos</li>
              <li>GIF - animation support, limited colors</li>
              <li>WebP - modern format, better compression</li>
              <li>SVG - vector graphics, text-encoded already</li>
              <li>AVIF - next-gen format, excellent compression</li>
            </ul>
          </div>
          <p>
            The tool generates ready-to-use HTML with the data URI already in the src attribute. Copy the output and paste directly into your HTML - no file uploads, no path management.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Inlining critical above-the-fold images</h3>
            <p className="text-sm text-muted-foreground">
              Your hero image or logo loads before the page renders. Inline as base64 to eliminate the HTTP request. The image displays immediately, no flash of missing content.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating self-contained HTML emails</h3>
            <p className="text-sm text-muted-foreground">
              Email clients block external images by default. Inline all images as base64 and your email displays correctly without recipients enabling "load images". Higher engagement, fewer broken layouts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Embedding icons in CSS or HTML</h3>
            <p className="text-sm text-muted-foreground">
              Small icons (under 5KB each) are perfect for base64. Inline a dozen icons without a single HTTP request. Faster than icon fonts, more flexible than SVG sprites for simple use cases.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building portable HTML documents</h3>
            <p className="text-sm text-muted-foreground">
              Creating a report or documentation that needs to travel as a single file? Embed all images as base64. Share one HTML file - no asset folders, no broken links when moving between devices.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Passing images through APIs</h3>
            <p className="text-sm text-muted-foreground">
              Sending images through JSON APIs? Base64 encoding ensures binary data travels safely in text-based JSON. Decode on the server, process or store as needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Prototyping without asset management</h3>
            <p className="text-sm text-muted-foreground">
              Quick prototype needs images but you don't want to set up a file structure. Encode images, paste into your prototype HTML. Iterate fast, organize assets later.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Base64 increases file size by ~33%.</strong>
              A 100KB image becomes ~133KB as base64. For large images, this overhead hurts performance. Use base64 for small images (under 10-20KB), keep larger images as external files.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Browser caching doesn't apply.</strong>
              Inline base64 images can't be cached separately from the HTML. If the same image appears on multiple pages, external files allow browser caching across page views.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Not ideal for responsive images.</strong>
              Responsive images use <code>&lt;picture&gt;</code> or <code>srcset</code> with multiple files. Base64 encoding each variant bloats HTML significantly. Use external files for responsive image sets.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">SVG might not need base64.</strong>
              SVG is already text-based. Instead of base64 encoding, inline the SVG markup directly (<code>&lt;svg&gt;...&lt;/svg&gt;</code>). Smaller than base64 and allows CSS/JS manipulation.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For images 1-5KB, base64 inline is usually faster. For 10KB+, external files with caching win. Between 5-10KB, test both approaches with your specific use case.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I decode base64 back to an image file?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, use an online base64 to image decoder, or in JavaScript create a Blob from the base64 data and download it. Many image editors can also import base64 data URIs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why is my base64 image not displaying?</h3>
            <p className="text-sm text-muted-foreground">
              Check the data URI prefix matches the image format (data:image/png;base64, for PNG). Verify the base64 string is complete - truncated strings won't decode. Ensure no spaces or line breaks in the string.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does base64 affect image quality?</h3>
            <p className="text-sm text-muted-foreground">
              No, base64 encoding is lossless. The decoded image is byte-for-byte identical to the original. Quality only changes if you compress the image before encoding.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use base64 images in CSS backgrounds?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, use <code>background-image: url('data:image/png;base64,...')</code>. Same benefits and tradeoffs as HTML img tags. Useful for small decorative backgrounds and icons.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the maximum image size for base64?</h3>
            <p className="text-sm text-muted-foreground">
              No hard limit, but practical constraints apply. Very long data URIs (hundreds of KB) can cause performance issues in some browsers. Keep individual base64 images under 100KB for best results.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do all browsers support base64 images?</h3>
            <p className="text-sm text-muted-foreground">
              All modern browsers support base64 data URIs in img tags and CSS. IE8+ has support. For very old browsers (IE6-7), use external image files with PNG fix hacks if needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I animate base64 GIFs?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, base64-encoded GIFs animate normally. The browser decodes the data URI and treats it like any other GIF. Same for APNG and animated WebP formats.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
