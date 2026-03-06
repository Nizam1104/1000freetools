import React from "react";

export function ImageToPdfSEO() {
  return (
    <>
      <section>
        <h2 className="text-2xl font-bold mb-4">What this tool does</h2>
        <p className="mb-4">
          This tool combines multiple images into a single PDF document. Upload
          JPG, PNG, or WebP files, arrange them in order, choose your page size
          and orientation, then download a compiled PDF. You can also convert
          each image to a separate PDF file. Everything processes in your
          browser.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">How it works</h2>
        <p className="mb-4">
          <strong>1. Upload your images</strong>
          <br />
          Drag files into the upload area or select them from your device.
          Thumbnails appear in the order they'll appear in the PDF.
        </p>
        <p className="mb-4">
          <strong>2. Configure the PDF settings</strong>
          <br />
          Choose between a single multi-page PDF or individual PDFs per image.
          Select page size (A4, Letter, Legal) and orientation (portrait or
          landscape).
        </p>
        <p className="mb-4">
          <strong>3. Convert and download</strong>
          <br />
          Click the convert button. When processing finishes, download the PDF
          file or a ZIP containing multiple PDFs.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">When you'd use this</h2>
        <p className="mb-4">
          <strong>Submitting identity documents for verification</strong>
          <br />
          Visa applications and KYC processes often require multiple scans
          (passport, ID, utility bill) as a single PDF. This tool merges them
          into one compliant file without uploading sensitive documents to a
          server.
        </p>
        <p className="mb-4">
          <strong>Creating design portfolios</strong>
          <br />
          Sending 15 loose image files to a potential employer looks
          disorganized. Combining your artwork into a single scrolling PDF
          creates a professional presentation they can review easily.
        </p>
        <p className="mb-4">
          <strong>Digitizing receipts for expense reports</strong>
          <br />
          Freelancers photograph dining receipts throughout the month. Merge
          them into one chronological PDF for your accountant instead of
          attaching two dozen individual files.
        </p>
        <p className="mb-4">
          <strong>Preparing educational materials</strong>
          <br />
          Teachers can combine textbook scans, diagrams, and comic strips into
          a single PDF worksheet. Students get one file to download instead of
          a confusing mess of attachments.
        </p>
        <p className="mb-4">
          <strong>Standardizing blueprint distribution</strong>
          <br />
          Contractors receive architectural drawings in various formats.
          Converting everything to PDF ensures consistent viewing across all
          devices on the construction site.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">What to know before using it</h2>
        <p className="mb-4">
          <strong>Image quality is preserved</strong>
          <br />
          The tool embeds your original images into the PDF without
          compression. The visual quality in the PDF matches your uploaded
          files exactly.
        </p>
        <p className="mb-4">
          <strong>Page size affects printing</strong>
          <br />
          If the PDF will be printed, choose the correct page size upfront. A4
          is standard internationally, Letter (8.5x11) is standard in the US.
          Mismatched sizes cause scaling issues when printing.
        </p>
        <p className="mb-4">
          <strong>Orientation should match your content</strong>
          <br />
          Portrait photos look best in portrait orientation, wide landscapes in
          landscape. Mixing orientations in a single PDF can cause awkward
          white space.
        </p>
        <p className="mb-4">
          <strong>File order matters</strong>
          <br />
          Images are placed in the PDF in the order they appear in the upload
          list. Rearrange them before converting if needed.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">FAQs</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Is this converter really free?
            </h3>
            <p>
              Yes. No signup, no watermarks, no page limits. You can create as
              many PDFs as you need directly in your browser.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Does the PDF reduce image quality?
            </h3>
            <p>
              No. The images are embedded at their original resolution. The PDF
              file will be larger, but the visual quality stays identical to
              your uploads.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Are my images uploaded anywhere?
            </h3>
            <p>
              No. All processing happens locally in your browser. Sensitive
              documents like IDs and financial records never leave your device.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Can I combine different image formats?
            </h3>
            <p>
              Yes. You can mix JPG, PNG, WebP, GIF, and BMP files in the same
              PDF. The tool handles all formats seamlessly.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              What's the difference between single and individual PDF mode?
            </h3>
            <p>
              Single PDF puts all images into one multi-page document.
              Individual PDFs create a separate one-page PDF for each image,
              then packages them in a ZIP file.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Can I rearrange the image order?
            </h3>
            <p>
              Yes, drag and drop the thumbnails to reorder them before
              converting. The PDF pages will follow your arranged sequence.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
