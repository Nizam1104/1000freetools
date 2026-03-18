import React from "react"

export default function MarkdownToPdfConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This converter transforms Markdown documents into PDF files using a
            two-step process. First, it parses your Markdown and converts it to
            HTML. Then, it renders that HTML into a PDF using browser-based
            printing capabilities.
          </p>
          <p>
            The tool runs entirely in your browser using JavaScript libraries.
            Your Markdown never leaves your device. The conversion happens
            client-side, generating a PDF that preserves formatting, typography,
            and layout.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Conversion process:</p>
            <ol className="space-y-2 text-sm list-decimal list-inside">
              <li>Parse Markdown syntax into structured content</li>
              <li>Apply CSS styling based on selected template</li>
              <li>Render the styled HTML in a hidden container</li>
              <li>Generate PDF using browser print-to-PDF APIs</li>
              <li>Download the resulting PDF file</li>
            </ol>
          </div>
          <p>
            Choose from available templates to match your document type. Each
            template includes different fonts, margins, and styling optimized
            for specific use cases like resumes, reports, or documentation.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When you'd actually use this</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating professional resumes from Markdown</h3>
            <p className="text-sm text-muted-foreground">
              A job seeker maintains their resume in Markdown for version
              control. Before applying, they convert it to PDF using a clean
              resume template, ensuring consistent formatting across all
              applications.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Generating technical documentation PDFs</h3>
            <p className="text-sm text-muted-foreground">
              A developer writes API documentation in Markdown for their GitHub
              repo. They convert it to PDF for stakeholders who prefer
              downloadable documents or need offline access to the docs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Producing client reports from Markdown notes</h3>
            <p className="text-sm text-muted-foreground">
              A consultant takes meeting notes and analysis in Markdown. At
              project end, they convert their structured notes into a polished
              PDF report using a professional template for client delivery.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating ebooks from Markdown manuscripts</h3>
            <p className="text-sm text-muted-foreground">
              An author writes their ebook in Markdown for simplicity. They use
              this converter with a book-style template to generate PDFs for
              readers who want a printable or tablet-friendly format.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Exporting README files for presentations</h3>
            <p className="text-sm text-muted-foreground">
              Someone needs to present their project's README in a meeting.
              Instead of showing GitHub live, they convert it to PDF for a
              clean, offline-ready document that works in any presentation
              software.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Archiving Markdown content as immutable records</h3>
            <p className="text-sm text-muted-foreground">
              A team lead converts important Markdown decisions and specs to PDF
              for archival. PDFs serve as timestamped, unchangeable records for
              compliance or future reference.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to know before using it</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">PDF generation happens in your browser.</strong>
              No files are uploaded to servers. Everything processes locally
              using JavaScript. This means large documents may take longer to
              convert depending on your device's performance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Template choice affects output significantly.</strong>
              Each template includes different fonts, spacing, and layout rules.
              Preview before downloading. A resume template won't suit a
              technical document and vice versa.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Images require accessible URLs.</strong>
              Images in your Markdown must be hosted online with public URLs.
              Local file paths won't work in the generated PDF. Use absolute
              URLs for reliable image rendering.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Page breaks can be controlled with HTML.</strong>
              For multi-page documents, you can insert page break hints using
              HTML comments or specific Markdown patterns, depending on the
              template's support.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For code-heavy documents, choose a
              template with monospace fonts and syntax highlighting support.
              Plain templates will render code blocks but without color
              highlighting.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is there a file size limit?</h3>
            <p className="text-sm text-muted-foreground">
              Since conversion happens in your browser, limits depend on your
              device's memory. Very large documents (100+ pages) may cause
              slowdowns or crashes. Split large documents into sections for best
              results.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I customize the PDF styling?</h3>
            <p className="text-sm text-muted-foreground">
              This tool provides preset templates. For custom styling, you'd
              need to use a Markdown-to-PDF tool that accepts custom CSS, or
              modify the generated HTML before converting to PDF.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does the PDF include clickable links?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. All Markdown links become clickable hyperlinks in the PDF.
              Table of contents entries (if supported by the template) also
              link to their sections within the document.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about tables and complex formatting?</h3>
            <p className="text-sm text-muted-foreground">
              Standard Markdown tables convert well. Complex tables with merged
              cells or unusual formatting may not render perfectly. Test your
              specific table structure before relying on it for important
              documents.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I add page numbers?</h3>
            <p className="text-sm text-muted-foreground">
              Some templates include automatic page numbering. Check the
              template preview. If your chosen template doesn't include numbers,
              you may need to add them using a PDF editor after generation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is the PDF searchable?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. The generated PDF contains actual text, not images. You can
              search within the PDF, select and copy text, and use screen
              readers to access the content.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I include a cover page?</h3>
            <p className="text-sm text-muted-foreground">
              Add a title section at the top of your Markdown. Some templates
              style the first page as a cover automatically. For custom covers,
              use front matter or HTML to structure cover content separately.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert multiple files at once?</h3>
            <p className="text-sm text-muted-foreground">
              This tool handles one document at a time. For batch conversion,
              consider command-line tools like pandoc or markdown-pdf that
              support processing multiple files in a single run.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
