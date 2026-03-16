import * as React from "react"

export default function DataUriConverterSEO() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 text-foreground">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How the Data URI Converter Works</h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            Our Data URI converter transforms files (images, documents, etc.) into Data URI format - a scheme that allows embedding file data directly within HTML, CSS, and JavaScript using a text-based representation. This eliminates external file dependencies by including data inline.
          </p>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Conversion Process</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Upload a file (image, font, document, etc.)</li>
              <li>File is read and converted to Base64 encoding</li>
              <li>MIME type is detected from file extension or content</li>
              <li>Data URI is constructed: data:[MIME];base64,[encoded-data]</li>
              <li>Result can be used directly in HTML, CSS, or JavaScript</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Common Use Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Inline Images in HTML</h3>
            <p className="text-sm text-muted-foreground">
              Embed small images directly in HTML to reduce HTTP requests and improve page load performance.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">CSS Background Images</h3>
            <p className="text-sm text-muted-foreground">
              Include icons and small graphics directly in CSS files without external image dependencies.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Email Templates</h3>
            <p className="text-sm text-muted-foreground">
              Embed images in HTML emails to ensure they display correctly without external hosting.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Web Fonts</h3>
            <p className="text-sm text-muted-foreground">
              Embed custom fonts directly in CSS for reliable font loading without external requests.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Single-File Applications</h3>
            <p className="text-sm text-muted-foreground">
              Create self-contained HTML files with all resources embedded for offline use or distribution.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">SVG Inline Embedding</h3>
            <p className="text-sm text-muted-foreground">
              Convert SVG files to Data URIs for use in CSS backgrounds and HTML img tags.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">What to Know Before Using This Tool</h2>
        <div className="space-y-4 text-muted-foreground">
          <div className="rounded-lg border p-4 space-y-3">
            <h3 className="font-semibold text-foreground">Data URI Format</h3>
            <p className="text-sm font-mono bg-muted/30 p-3 rounded">
              data:[&lt;media-type&gt;][;base64],&lt;data&gt;
            </p>
            <p className="text-sm mt-2">
              Example: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-3">
            <h3 className="font-semibold text-foreground">Size Considerations</h3>
            <p className="text-sm">
              Data URIs increase file size by ~33% due to Base64 encoding. Best suited for small files (under 50KB). Large files should remain as external resources.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-3">
            <h3 className="font-semibold text-foreground">Browser Support</h3>
            <p className="text-sm">
              Data URIs are supported by all modern browsers. Some older browsers have length limits (IE8 supports up to 32KB). Most browsers handle Data URIs up to several megabytes.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">When should I use Data URIs?</h3>
            <p className="text-sm text-muted-foreground">
              Use Data URIs for small, frequently-used resources like icons, small images, and fonts. Avoid for large files as they increase page size and cannot be cached separately.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Can I convert Data URI back to file?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, use the decoder function to extract the Base64 data and download it as the original file format. This tool supports both encoding and decoding.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Are Data URIs SEO-friendly?</h3>
            <p className="text-sm text-muted-foreground">
              Search engines can index content within Data URIs, but images embedded this way may not appear in image search. Use external images for important SEO content images.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">What file types are supported?</h3>
            <p className="text-sm text-muted-foreground">
              Any file type can be converted to Data URI. Common uses include images (PNG, JPG, GIF, SVG), fonts (WOFF, TTF), and documents. MIME type must be specified correctly.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
