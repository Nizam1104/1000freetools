import React from "react"

export default function BarcodeToCsvSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Barcode to CSV Exporter Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool scans multiple barcodes and exports the data to CSV or Excel format. Use your device camera or upload barcode images sequentially. Each scanned barcode is added to a list that can be downloaded as a spreadsheet.
          </p>
          <p>
            The scanner decodes each barcode and records the data along with a timestamp. You can add custom fields like location, quantity, or notes for each scan. The tool builds a complete data record as you scan.
          </p>
          <p>
            Export your scanned data as CSV (compatible with Excel, Google Sheets) or direct Excel format. Include headers, timestamps, and any custom fields you added. Perfect for inventory counts, asset audits, and data collection workflows.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Conducting inventory counts</h3>
            <p className="text-sm text-muted-foreground">
              Walk through your warehouse scanning product barcodes. Each scan records the item. Export to CSV and count occurrences to get stock levels without manual counting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Tracking assets and equipment</h3>
            <p className="text-sm text-muted-foreground">
              Audit company assets by scanning barcode tags. Record location and condition for each item. Export the data for asset management systems.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Processing shipments and receiving</h3>
            <p className="text-sm text-muted-foreground">
              Scan incoming packages to log receipts. Export scan data to verify against purchase orders. Creates an audit trail of what arrived and when.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Managing library or media collections</h3>
            <p className="text-sm text-muted-foreground">
              Catalog books, DVDs, or other media by scanning ISBN or custom barcodes. Build a spreadsheet inventory without expensive library software.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Collecting data for research</h3>
            <p className="text-sm text-muted-foreground">
              Research projects often involve tracking labeled samples or specimens. Scan barcodes in the field, export data later for analysis.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Verifying product recalls</h3>
            <p className="text-sm text-muted-foreground">
              Check inventory against recalled product lists. Scan barcodes and export to compare against recall notices. Quickly identify affected items.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Camera quality affects scanning speed.</strong>
              Good lighting and a steady hand make scanning faster. Blurry or dark images may fail to decode. Use a device with autofocus for best results.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Data stays in your browser.</strong>
              Scanned data is stored locally until you export or clear it. Refreshing the page may lose data—export before closing. No data is sent to servers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">CSV is universally compatible.</strong>
              CSV files open in Excel, Google Sheets, Numbers, and database tools. Choose CSV for maximum compatibility, Excel format for advanced features.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Timestamps enable tracking.</strong>
              Each scan records the exact time. Use this for time-based analysis—processing rates, peak scanning times, or audit trail verification.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For large inventories, scan in batches and export frequently. If your browser crashes or you accidentally close the tab, you won't lose all your work.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What barcode types can I scan?</h3>
            <p className="text-sm text-muted-foreground">
              Most common 1D barcodes: UPC, EAN, Code 128, Code 39, ITF. Also 2D codes: QR Code, Data Matrix, PDF417. Covers retail, shipping, and industrial barcodes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I scan from a computer webcam?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but phone cameras work better. Webcams often lack autofocus and have poor close-up performance. For volume scanning, use a phone or dedicated scanner.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I add custom data to scans?</h3>
            <p className="text-sm text-muted-foreground">
              Add fields like quantity, location, or condition before or after scanning. Each scan records the current field values. Customize columns for your workflow.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I edit scanned data before export?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, review the scan list before exporting. Delete duplicate scans, correct errors, or add notes. Clean up data before creating the final CSV.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if a barcode won't scan?</h3>
            <p className="text-sm text-muted-foreground">
              Try better lighting, hold steady, or move closer/farther. Damaged or poorly printed barcodes may not scan. You can manually enter the number if visible.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How large can my scan list be?</h3>
            <p className="text-sm text-muted-foreground">
              Browser memory limits apply. Thousands of scans work fine. For tens of thousands, export in batches. Most inventory counts are well within limits.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I import the CSV into my database?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, CSV is the standard import format for databases. MySQL, PostgreSQL, SQL Server, and Access all import CSV. Map columns to your database fields.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
