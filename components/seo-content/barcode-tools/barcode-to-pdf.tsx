import * as React from "react"

export default function BarcodeToPDFSEO() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 text-foreground">
      {/* How It Works Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How the Barcode to PDF Converter Works</h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            Our barcode to PDF converter transforms barcode data into printable label sheets formatted for standard label templates. The tool generates high-quality barcodes and arranges them on pages matching popular label sheet formats from Avery and other manufacturers.
          </p>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">PDF Generation Process</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Enter barcode data via text input or CSV file upload</li>
              <li>Select a label template matching your label sheets</li>
              <li>Configure barcode format and display options</li>
              <li>Barcodes are generated and arranged on virtual label pages</li>
              <li>Preview shows exact layout before printing</li>
              <li>Download PDF formatted for precise printing alignment</li>
            </ol>
          </div>
          <p>
            The tool supports both text input for small batches and CSV upload for bulk label generation. Each barcode is generated at optimal resolution for scanning reliability. The PDF output maintains exact dimensions to ensure proper alignment with physical label sheets.
          </p>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Common Use Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Product Labeling</h3>
            <p className="text-sm text-muted-foreground">
              Create barcode labels for retail products, handmade items, or inventory management with professional formatting.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Asset Tagging</h3>
            <p className="text-sm text-muted-foreground">
              Generate durable asset tags for equipment, furniture, and IT inventory with sequential numbering.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Shipping Labels</h3>
            <p className="text-sm text-muted-foreground">
              Print shipping barcodes for packages, manifests, and logistics documentation on adhesive label sheets.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Event Badges</h3>
            <p className="text-sm text-muted-foreground">
              Create attendee badges with barcodes for event check-in, access control, and tracking.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Library Labels</h3>
            <p className="text-sm text-muted-foreground">
              Generate spine labels and catalog barcodes for book collections and media libraries.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Retail Price Tags</h3>
            <p className="text-sm text-muted-foreground">
              Print price tags with barcodes for store merchandise, sales, and inventory tracking.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">What to Know Before Using This Tool</h2>
        <div className="space-y-4 text-muted-foreground">
          <div className="rounded-lg border p-4 space-y-3">
            <h3 className="font-semibold text-foreground">Label Template Selection</h3>
            <p className="text-sm mb-2">
              Choose the template that matches your physical label sheets. Common options include:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><strong>Avery 5160:</strong> Standard address labels (30 per sheet)</li>
              <li><strong>Avery 5161:</strong> Large address labels (20 per sheet)</li>
              <li><strong>Avery 5163:</strong> Shipping labels (10 per sheet)</li>
              <li><strong>Avery L7160:</strong> A4 address labels (21 per sheet)</li>
              <li><strong>Custom:</strong> Define your own label dimensions</li>
            </ul>
          </div>
          <div className="rounded-lg border p-4 space-y-3">
            <h3 className="font-semibold text-foreground">CSV File Format</h3>
            <p className="text-sm">
              For bulk uploads, use CSV format with one barcode per line. Format: <code className="bg-muted px-2 py-1 rounded">data,label</code> where data is the barcode content and label is optional human-readable text. Example: <code className="bg-muted px-2 py-1 rounded">ITEM001,Product A</code>
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-3">
            <h3 className="font-semibold text-foreground">Printing Tips</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Always test print on plain paper before using label sheets</li>
              <li>Set printer to 100% scale (disable fit-to-page)</li>
              <li>Use actual size or 100% scaling in PDF viewer</li>
              <li>Check printer margins and adjust if needed</li>
              <li>Use high-quality label sheets for best scanning results</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">What barcode formats are supported?</h3>
            <p className="text-sm text-muted-foreground">
              The tool supports Code 128 (general purpose), Code 39 (industrial), EAN-13 (retail), and QR Code (2D). Code 128 is recommended for most applications due to its compact size and full character support.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">How many barcodes can I generate at once?</h3>
            <p className="text-sm text-muted-foreground">
              There is no strict limit, but practical considerations apply. For very large batches (1000+), consider splitting into multiple PDFs. The preview shows 20-100 barcodes per page depending on template.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Can I customize label size?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, select the Custom template option to define your own label dimensions, margins, and layout. Enter measurements in millimeters for precise control over label positioning.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Why are my barcodes misaligned when printing?</h3>
            <p className="text-sm text-muted-foreground">
              Misalignment usually results from printer scaling settings. Ensure your PDF viewer is set to 100% or Actual Size, not Fit to Page. Also verify you selected the correct template for your label sheets.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Can I save my label design?</h3>
            <p className="text-sm text-muted-foreground">
              Currently, each session generates a new PDF. For recurring label needs, save your CSV data file and reuse it. Future versions may support template saving and reuse.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">What paper sizes are supported?</h3>
            <p className="text-sm text-muted-foreground">
              The tool supports both US Letter (8.5 x 11 inches) and A4 (210 x 297mm) label sheets. Select templates are available for each standard. Custom templates can be defined for any paper size.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">How do I include product names on labels?</h3>
            <p className="text-sm text-muted-foreground">
              When entering data, include the label text after a comma. For example: <code className="bg-muted px-2 py-1 rounded">ITEM001,Widget Pro</code> displays "ITEM001" as the barcode and "Widget Pro" as human-readable text below it.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
