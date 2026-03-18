import React from "react"

export default function BarcodeToBase64Seo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Barcode to Base64 Converter Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool converts barcode images to Base64 data URIs. Upload a PNG or JPG barcode image and get a Base64 string you can embed directly in HTML, CSS, or code without hosting the image file.
          </p>
          <p>
            Base64 encoding converts binary image data into text characters. The resulting data URI starts with "data:image/png;base64," followed by the encoded data. This string can be used anywhere an image URL would go.
          </p>
          <p>
            The converter also works in reverse—paste a Base64 string to preview and download the barcode image. Copy the output with one click. Perfect for embedding barcodes in emails, PDFs, or code repositories.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Embedding barcodes in HTML emails</h3>
            <p className="text-sm text-muted-foreground">
              Email clients block external images. Embed barcodes as Base64 to ensure they display reliably in ticket confirmations, shipping notices, and event invitations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Including barcodes in code repositories</h3>
            <p className="text-sm text-muted-foreground">
              Store test barcodes directly in code files without separate image assets. Base64 strings work in JavaScript, CSS, and many configuration formats.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating self-contained HTML reports</h3>
            <p className="text-sm text-muted-foreground">
              Generate reports that include barcode images without external dependencies. Single-file reports are easier to archive, share, and version control.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building offline-capable web apps</h3>
            <p className="text-sm text-muted-foreground">
              Embed barcode images in your app's code for offline functionality. No server requests needed—the barcode data is part of the application bundle.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Generating PDF documents programmatically</h3>
            <p className="text-sm text-muted-foreground">
              Many PDF libraries accept Base64 images. Convert barcodes to Base64 for inclusion in invoices, shipping labels, and identification documents.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Sharing barcodes in chat or documentation</h3>
            <p className="text-sm text-muted-foreground">
              Paste Base64 strings in documentation, issue trackers, or chat. Recipients can decode and use the barcode without file transfer complications.
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
              Base64 encoding adds overhead. A 10KB image becomes ~13KB as Base64. For large images or high-traffic sites, separate image files are more efficient.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Base64 strings are long.</strong>
              Even small barcodes produce lengthy strings. This can make code harder to read. Consider storing in separate files or using build tools to manage.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">PNG is usually best for barcodes.</strong>
              PNG supports lossless compression, preserving sharp barcode edges. JPEG compression can blur barcode boundaries and cause scanning issues.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Browser caching doesn't work for inline Base64.</strong>
              Base64 images are part of the HTML, not cached separately. For frequently-used barcodes, external images with caching may be better.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Use Base64 for small barcodes (under 50KB) and critical images that must always display. Use external files for large images or when caching benefits outweigh embedding advantages.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I use Base64 in HTML?</h3>
            <p className="text-sm text-muted-foreground">
              Use the data URI as the src attribute: &lt;img src="data:image/png;base64,iVBOR..."&gt;. The browser decodes and displays it like any image.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use Base64 in CSS?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, in background-image: background-image: url('data:image/png;base64,...'). Useful for barcode icons or decorative elements in stylesheets.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I convert Base64 back to image?</h3>
            <p className="text-sm text-muted-foreground">
              Paste the Base64 string into this tool's decode section. It shows a preview and provides a download link. Or use JavaScript's atob() function.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does Base64 affect barcode scannability?</h3>
            <p className="text-sm text-muted-foreground">
              No, Base64 is just encoding. When decoded, the image is identical to the original. Scannability depends on the source image quality, not the encoding.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the maximum image size?</h3>
            <p className="text-sm text-muted-foreground">
              Browser memory limits apply. Very large images (10MB+) may cause issues. Barcodes are typically small, so this rarely matters in practice.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I embed Base64 barcodes in JSON?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, Base64 strings are valid JSON string values. Common in APIs that return images. Remember to escape any special characters if needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is Base64 secure?</h3>
            <p className="text-sm text-muted-foreground">
              Base64 is encoding, not encryption. Anyone can decode it. Don't use Base64 to hide sensitive data. It's purely for data transport convenience.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
