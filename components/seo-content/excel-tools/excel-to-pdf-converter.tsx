import React from "react"

export default function ExcelToPdfConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Excel to PDF Converter Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Upload your CSV/Excel data or paste it directly. Choose your page size (A4, Letter, or Legal) and orientation (portrait or landscape). The converter formats your data into a printable layout.
          </p>
          <p>
            The tool generates an HTML preview with styled tables. Headers are highlighted, rows alternate colors for readability. A professional header shows the generation date.
          </p>
          <p>
            Download the HTML file and use your browser's Print function (Ctrl+P) to save as PDF. This gives you full control over PDF settings. All processing happens locally in your browser.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating shareable reports</h3>
            <p className="text-sm text-muted-foreground">
              Spreadsheets are hard to read on mobile. Convert to PDF for easy sharing. Recipients don't need Excel to view your data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Submitting official documents</h3>
            <p className="text-sm text-muted-foreground">
              Many organizations require PDF submissions. Convert financial reports, inventories, or records. Professional format for formal submissions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Archiving data snapshots</h3>
            <p className="text-sm text-muted-foreground">
              Preserve data at a point in time. PDFs don't change accidentally. Perfect for compliance records and historical snapshots.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Printing data for meetings</h3>
            <p className="text-sm text-muted-foreground">
              Prepare handouts for presentations. PDF ensures consistent printing. Everyone sees the same formatted data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Emailing data securely</h3>
            <p className="text-sm text-muted-foreground">
              PDFs are harder to modify than Excel. Send reports that maintain integrity. Recipients can view but not easily alter.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating documentation</h3>
            <p className="text-sm text-muted-foreground">
              Include data tables in reports and manuals. PDF integrates well with other documents. Professional appearance for publications.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">This generates HTML for PDF conversion.</strong>
              The tool creates an HTML file you print to PDF. This gives you more control than direct conversion. Use browser print settings for customization.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Page size affects layout.</strong>
              A4 is standard internationally. Letter is common in the US. Choose based on your audience and printing standards.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Wide tables need landscape.</strong>
              Many columns don't fit portrait orientation. Switch to landscape for better readability. Preview before finalizing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Large datasets span multiple pages.</strong>
              The converter handles pagination automatically. Headers repeat on each page. Review the preview to check page breaks.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> In browser print dialog, enable "Background graphics" for colored headers. Set margins to "Minimum" for more content per page. Save as PDF destination.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why download HTML instead of PDF directly?</h3>
            <p className="text-sm text-muted-foreground">
              Browser print-to-PDF gives better quality and control. You choose margins, scaling, and paper size. More flexible than server-side conversion.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert .xlsx files directly?</h3>
            <p className="text-sm text-muted-foreground">
              Export your Excel file as CSV first, then use this tool. CSV is universal and works reliably. File → Save As → CSV in Excel.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it preserve formulas?</h3>
            <p className="text-sm text-muted-foreground">
              No, PDFs show values only. Formulas are calculated before export. PDFs are for viewing, not editing or recalculating.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I add a custom header?</h3>
            <p className="text-sm text-muted-foreground">
              The generated HTML includes a standard header. For custom headers, edit the HTML file before printing, or add headers in your PDF viewer.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I reduce file size?</h3>
            <p className="text-sm text-muted-foreground">
              In print dialog, reduce quality settings. Fewer pages = smaller file. Consider splitting large datasets into multiple PDFs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I password-protect the PDF?</h3>
            <p className="text-sm text-muted-foreground">
              Not with this tool. Use a PDF editor or Adobe Acrobat to add password protection after conversion. Browser print doesn't support encryption.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is my data secure?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, all processing happens in your browser. No data is uploaded to servers. Safe for sensitive financial or personal information.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
