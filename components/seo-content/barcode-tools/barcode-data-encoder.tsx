import * as React from "react"

export default function BarcodeDataEncoderSEO() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 text-foreground">
      {/* How It Works Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How the Barcode Data Encoder Works</h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            Our barcode data encoder structures information using GS1 Application Identifiers (AIs) for standardized supply chain communication. The tool formats data according to GS1-128, GS1 Data Matrix, and GS1 QR Code specifications used globally in logistics, healthcare, and retail.
          </p>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Encoding Process</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Select GS1 Application Identifiers for your data elements</li>
              <li>Enter the corresponding data values for each identifier</li>
              <li>The encoder structures data with proper formatting and separators</li>
              <li>Human-readable format displays with AI prefixes in parentheses</li>
              <li>Barcode image is generated with GS1-compliant encoding</li>
              <li>Decode mode parses existing GS1 barcodes into readable elements</li>
            </ol>
          </div>
          <p>
            GS1 Application Identifiers are standardized prefixes that define the meaning and format of encoded data. Common AIs include (01) for GTIN, (10) for batch number, (17) for expiration date, and (21) for serial number. The encoder ensures proper formatting including variable-length field separators.
          </p>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Common Use Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Supply Chain Tracking</h3>
            <p className="text-sm text-muted-foreground">
              Encode product identification, batch numbers, and expiration dates for end-to-end supply chain visibility.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Pharmaceutical Compliance</h3>
            <p className="text-sm text-muted-foreground">
              Meet DSCSA and FMD requirements with serialized barcodes containing product, batch, and expiry information.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Food Safety</h3>
            <p className="text-sm text-muted-foreground">
              Track production dates, best-before dates, and batch codes for food products and recalls.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Logistics and Shipping</h3>
            <p className="text-sm text-muted-foreground">
              Create SSCC (Serial Shipping Container Code) labels for pallet and carton tracking.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Medical Device Tracking</h3>
            <p className="text-sm text-muted-foreground">
              Comply with UDI requirements by encoding device identification, lot numbers, and expiration dates.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Returns Management</h3>
            <p className="text-sm text-muted-foreground">
              Process product returns efficiently with encoded GTIN, serial numbers, and original shipment data.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">What to Know Before Using This Tool</h2>
        <div className="space-y-4 text-muted-foreground">
          <div className="rounded-lg border p-4 space-y-3">
            <h3 className="font-semibold text-foreground">Common GS1 Application Identifiers</h3>
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                <div className="p-2 rounded border bg-muted/30">
                  <span className="text-primary">(01)</span> GTIN
                </div>
                <div className="p-2 rounded border bg-muted/30">
                  <span className="text-primary">(10)</span> Batch/Lot
                </div>
                <div className="p-2 rounded border bg-muted/30">
                  <span className="text-primary">(11)</span> Production Date
                </div>
                <div className="p-2 rounded border bg-muted/30">
                  <span className="text-primary">(15)</span> Best Before
                </div>
                <div className="p-2 rounded border bg-muted/30">
                  <span className="text-primary">(17)</span> Expiration Date
                </div>
                <div className="p-2 rounded border bg-muted/30">
                  <span className="text-primary">(21)</span> Serial Number
                </div>
                <div className="p-2 rounded border bg-muted/30">
                  <span className="text-primary">(310x)</span> Net Weight
                </div>
                <div className="p-2 rounded border bg-muted/30">
                  <span className="text-primary">(410)</span> Ship To
                </div>
                <div className="p-2 rounded border bg-muted/30">
                  <span className="text-primary">(91)</span> Internal Use
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg border p-4 space-y-3">
            <h3 className="font-semibold text-foreground">Date Format</h3>
            <p className="text-sm">
              GS1 dates use YYMMDD format (6 digits). For example, December 31, 2025 is encoded as 251231. The encoder automatically formats dates for human readability while maintaining GS1 compliance in the barcode.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-3">
            <h3 className="font-semibold text-foreground">Variable vs Fixed Length</h3>
            <p className="text-sm">
              Some AIs have fixed data lengths (like (01) GTIN = 14 digits) while others are variable length (like (10) Batch). Variable-length fields require special separator characters (FNC1) when followed by another AI. The encoder handles this automatically.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">What is GS1-128?</h3>
            <p className="text-sm text-muted-foreground">
              GS1-128 (formerly UCC/EAN-128) is a barcode standard based on Code 128 that encodes GS1 Application Identifiers. It is widely used in supply chain, healthcare, and logistics for structured data exchange.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Do I need a GS1 company prefix?</h3>
            <p className="text-sm text-muted-foreground">
              For commercial use, yes. GS1 company prefixes are required for GTIN, SSCC, and other global identifiers. Obtain prefixes from your local GS1 organization. Internal AIs like (91) can be used without GS1 membership for company-specific data.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">How do I decode a GS1 barcode?</h3>
            <p className="text-sm text-muted-foreground">
              Use the decode mode to parse GS1 barcode data. Enter the raw barcode content, and the tool identifies each AI element, displays the human-readable name, and formats values appropriately (dates, weights, etc.).
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">What is the difference between GS1-128 and Code 128?</h3>
            <p className="text-sm text-muted-foreground">
              Code 128 is a general-purpose barcode symbology. GS1-128 is Code 128 with specific rules for encoding GS1 Application Identifiers, including mandatory start characters and data formatting conventions.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Can I encode multiple data elements?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, GS1 barcodes commonly encode multiple AIs in a single barcode. For example, a pharmaceutical package might include (01) GTIN, (17) expiration date, (10) batch number, and (21) serial number in one barcode.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">What is HIBC?</h3>
            <p className="text-sm text-muted-foreground">
              HIBC (Health Industry Bar Code) is a specialized standard for healthcare products. It uses GS1 formats with specific formatting for medical devices, pharmaceuticals, and healthcare supplies. HIBC codes begin with a labeler ID prefix.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
