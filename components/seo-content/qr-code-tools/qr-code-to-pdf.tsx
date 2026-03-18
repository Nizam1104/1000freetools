import React from "react"

export default function QrCodeToPdfSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the QR Code to PDF Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter the data for your QR code - URL, text, or contact information. This content will be encoded in the QR code.
          </p>
          <p>
            Set a title for your PDF document. This appears at the top of the generated PDF page.
          </p>
          <p>
            Add an optional description that appears in the PDF. Provide context about what the QR code links to.
          </p>
          <p>
            Choose page size (A4, Letter, Legal, A5) and orientation (portrait or landscape). Select based on your distribution needs.
          </p>
          <p>
            Configure QR code size, add a caption, and optionally include a border. Generate and download the PDF document.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Instruction manual inserts</h3>
            <p className="text-sm text-muted-foreground">
              Include QR codes in product manuals. Link to video tutorials or support. Enhanced customer experience.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Conference handouts</h3>
            <p className="text-sm text-muted-foreground">
              Distribute PDFs with QR codes to resources. Attendees keep PDFs for reference. Easy resource access.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Educational worksheets</h3>
            <p className="text-sm text-muted-foreground">
              Teachers create worksheets with QR codes. Students scan for additional resources. Interactive learning.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Real estate flyers</h3>
            <p className="text-sm text-muted-foreground">
              Property flyers with QR codes to virtual tours. PDFs easy to email and print. Professional presentation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Menu distribution</h3>
            <p className="text-sm text-muted-foreground">
              Email PDF menus with QR codes. Customers save and scan for ordering. Contactless dining support.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Certificate generation</h3>
            <p className="text-sm text-muted-foreground">
              Certificates with verification QR codes. Employers scan to verify credentials. Fraud prevention.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">PDF size affects distribution.</strong>
              Larger pages (Letter, A4) print better. Smaller sizes (A5) email easier. Choose based on use case.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">QR size impacts scannability.</strong>
              Larger QR codes scan from farther away. 200px minimum for print. 300px+ for posters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Captions guide user action.</strong>
              "Scan for Video Tutorial" tells users what to expect. Clear captions increase scan rates.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Borders create professional look.</strong>
              Page borders frame content nicely. Optional but adds polish. Matches formal documents.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Print tip:</strong> Test print one copy before mass printing. Verify QR code scans from the printed page. Check margins and alignment.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What PDF viewer works best?</h3>
            <p className="text-sm text-muted-foreground">
              All major PDF viewers work - Adobe, Preview, browsers. QR codes display consistently. Mobile PDF apps also work.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I edit the PDF after generating?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, use PDF editors like Adobe Acrobat. Add more content or modify existing. QR code remains functional.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I combine multiple QR codes?</h3>
            <p className="text-sm text-muted-foreground">
              Generate separate PDFs and merge them. Or use a PDF editor to add multiple QR codes to one document.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I add my logo to the PDF?</h3>
            <p className="text-sm text-muted-foreground">
              This basic generator doesn't support logos. Add logos using a PDF editor after generation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What resolution are the QR codes?</h3>
            <p className="text-sm text-muted-foreground">
              PDFs are vector-based, so QR codes scale without quality loss. Print at any size with sharp edges.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I password-protect the PDF?</h3>
            <p className="text-sm text-muted-foreground">
              Use PDF security tools after generation. Adobe Acrobat and online tools add password protection.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I reduce PDF file size?</h3>
            <p className="text-sm text-muted-foreground">
              Use PDF compression tools. Reduce image quality if present. QR codes themselves are small.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
