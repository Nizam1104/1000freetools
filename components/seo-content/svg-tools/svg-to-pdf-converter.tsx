import React from "react"

export default function SvgToPdfConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How SVG to PDF Conversion Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This converter transforms SVG vector graphics into PDF documents while preserving scalability and quality. The conversion happens entirely in your browser using PDF generation libraries that understand SVG markup.
          </p>
          <p>
            The tool parses your SVG XML, extracts shapes, paths, text, and styling information, then recreates these elements in PDF format. Vector data stays vector - no rasterization means your PDF scales to any size without quality loss.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">What gets converted:</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Basic shapes (circles, rectangles, ellipses, polygons, polylines)</li>
              <li>Path elements with all commands (M, L, C, Q, A, Z)</li>
              <li>Text elements with font-family, size, and positioning</li>
              <li>Fill colors, stroke colors, and stroke widths</li>
              <li>Gradients (linear and radial) and patterns</li>
              <li>Transform operations (translate, rotate, scale, skew)</li>
              <li>Opacity and blend modes (where PDF supports them)</li>
            </ul>
          </div>
          <p>
            You can set the PDF page size (A4, Letter, custom dimensions) and choose whether the SVG fills the page or maintains its aspect ratio. Multiple SVGs can be combined into a single multi-page PDF.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating print-ready vector graphics</h3>
            <p className="text-sm text-muted-foreground">
              Designed a logo in SVG but the print shop needs PDF? Convert directly without opening Illustrator. The vector paths remain editable in Acrobat or InDesign.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Generating reports with charts</h3>
            <p className="text-sm text-muted-foreground">
              Your dashboard exports charts as SVG. Convert them to PDF for inclusion in quarterly reports. Vector charts stay crisp when printed or zoomed in presentations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Archiving technical diagrams</h3>
            <p className="text-sm text-muted-foreground">
              Engineering diagrams, flowcharts, and wireframes in SVG format convert cleanly to PDF for documentation. Unlike screenshots, text remains searchable and selectable.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing artwork for professional printing</h3>
            <p className="text-sm text-muted-foreground">
              Print providers often request PDF over SVG. Convert your vector artwork, then use Acrobat to add bleed margins or convert to CMYK color space if needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating scalable templates</h3>
            <p className="text-sm text-muted-foreground">
              Invoice templates, certificates, and labels designed in SVG convert to PDF for distribution. Recipients can view without special software, and the vectors scale for any paper size.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Batch converting icon sets</h3>
            <p className="text-sm text-muted-foreground">
              Have a library of SVG icons? Convert them all to a single PDF reference sheet. Designers can flip through one document instead of opening hundreds of individual files.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Font embedding limitations.</strong>
              If your SVG uses custom fonts, they may not embed in the PDF unless the font is installed on the system or the converter supports font subsetting. Text might fallback to system fonts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some SVG features don't translate.</strong>
              SVG filters (blur, drop shadow), certain blend modes, and external image references may not render in PDF. The converter does its best but PDF has different capabilities than SVG.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Page size affects scaling.</strong>
              An SVG with viewBox="0 0 100 100" on an A4 page will be tiny. Either set a custom page size matching your SVG dimensions or enable "fit to page" scaling.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Transparency is preserved.</strong>
              PDF supports transparency, so SVG opacity and transparent fills carry over. However, very old PDF readers (Acrobat 5 and earlier) may not display transparency correctly.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For text-heavy SVGs, convert to PDF then use Acrobat's "Save As Optimized PDF" to embed font subsets. This ensures text displays correctly on any device without bloating file size.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Will the PDF be editable?</h3>
            <p className="text-sm text-muted-foreground">
              Vector paths remain editable in vector editors like Illustrator or Inkscape. Text may be editable depending on font embedding. However, the PDF structure differs from SVG - don't expect to convert back to SVG perfectly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert multiple SVGs to one PDF?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, upload multiple SVG files and they'll be converted to separate pages in a single PDF. Order is determined by file name or upload sequence.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about SVGs with embedded images?</h3>
            <p className="text-sm text-muted-foreground">
              Base64-encoded images embedded in SVG are included in the PDF. External image references (xlink:href="file.png") won't work - the converter can't access external files.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is there a file size limit?</h3>
            <p className="text-sm text-muted-foreground">
              Browser-based conversion has memory limits. SVGs under 5MB convert reliably. Very complex SVGs with thousands of paths may cause the browser to slow down or crash.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this preserve hyperlinks in SVG?</h3>
            <p className="text-sm text-muted-foreground">
              SVG <code>&lt;a&gt;</code> elements with xlink:href can be converted to PDF links, but support varies by converter. Test your specific file - simple links usually work, complex interactions don't.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I set PDF metadata (title, author)?</h3>
            <p className="text-sm text-muted-foreground">
              Some converters let you set PDF metadata fields. If this tool doesn't offer it, use Acrobat or an online PDF metadata editor after conversion.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does my PDF look different from the SVG?</h3>
            <p className="text-sm text-muted-foreground">
              PDF and SVG render text slightly differently due to font hinting. Colors may shift if your SVG uses P3 wide gamut but PDF converts to sRGB. Check color profiles if exact matching matters.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
