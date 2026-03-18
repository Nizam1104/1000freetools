export default function XmlToPdfConverterSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This XML to PDF converter transforms XML data into formatted PDF documents using templates
            that define the layout and styling. It extracts data from your XML and places it into
            predefined positions in the PDF output.
          </p>
          <p className="text-muted-foreground">
            The conversion process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Parse XML:</strong> Your XML data is parsed and made available for template binding.</li>
            <li><strong className="text-foreground">Apply template:</strong> A template (HTML/CSS, XSL-FO, or custom) defines the PDF layout with placeholders for XML data.</li>
            <li><strong className="text-foreground">Render to PDF:</strong> The filled template is rendered using a PDF engine like jsPDF, pdfmake, or server-side tools.</li>
            <li><strong className="text-foreground">Download:</strong> The generated PDF is ready for download with proper formatting preserved.</li>
          </ol>
          <p className="text-muted-foreground">
            Templates can include headers, footers, page numbers, tables, and styled text.
            Dynamic content like repeating elements (order items, line items) creates multiple rows or pages as needed.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Generating invoices from order data",
              description: "Your order system exports XML. Convert each order to a professional PDF invoice with your company branding and line items."
            },
            {
              title: "Creating shipping labels and packing slips",
              description: "Warehouse systems output order XML. Generate PDF packing slips with item lists, quantities, and shipping addresses for each order."
            },
            {
              title: "Producing compliance reports",
              description: "Regulatory data exported as XML needs to be submitted as PDF reports. Apply the required format template and generate compliant documents."
            },
            {
              title: "Generating certificates and diplomas",
              description: "Student or participant data in XML becomes personalized PDF certificates. Merge names and details into a certificate template."
            },
            {
              title: "Creating product catalogs",
              description: "Product data in XML format can be transformed into multi-page PDF catalogs with images, descriptions, and pricing tables."
            },
            {
              title: "Producing bank statements",
              description: "Transaction data exported as XML becomes formatted PDF statements. Include account summaries, transaction tables, and bank branding."
            },
          ].map((item, idx) => (
            <div key={idx} className="rounded-lg border bg-muted/30 p-4 space-y-2">
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">What to Know Before Using</h2>
        <div className="space-y-3">
          {[
            {
              caveat: "Template design affects output quality",
              explanation: "The PDF is only as good as your template. Invest time in designing a clean template with proper margins, fonts, and spacing."
            },
            {
              caveat: "Page breaks need handling",
              explanation: "Long content may span multiple pages. Templates should handle page breaks gracefully, especially for tables and repeating sections."
            },
            {
              caveat: "Font embedding affects file size",
              explanation: "Custom fonts increase PDF file size. Standard fonts (Arial, Times) are smaller. Consider the trade-off for your use case."
            },
            {
              caveat: "Images may need preprocessing",
              explanation: "Images in XML (as base64 or URLs) need proper handling. Large images can bloat PDFs—consider resizing before embedding."
            },
            {
              caveat: "Browser-based PDF has limitations",
              explanation: "Client-side PDF generation works well for simple documents. Complex layouts may need server-side tools like wkhtmltopdf or Puppeteer."
            },
          ].map((item, idx) => (
            <div key={idx} className="rounded-lg border bg-muted/30 p-4">
              <h3 className="font-semibold text-foreground mb-1">{item.caveat}</h3>
              <p className="text-sm text-muted-foreground">{item.explanation}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Common Questions</h2>
        <div className="space-y-6">
          {[
            {
              question: "Can I add my company logo to the PDF?",
              answer: "Yes. Include your logo as an image in the template. It can be embedded as base64 or referenced by URL, depending on the PDF engine."
            },
            {
              question: "How do I handle multi-page output?",
              answer: "Most PDF engines handle pagination automatically. For tables, use CSS like 'page-break-inside: avoid' to keep rows together when possible."
            },
            {
              question: "Can I generate multiple PDFs from one XML file?",
              answer: "Yes, if your XML contains multiple records (like multiple orders). Loop through records and generate a separate PDF for each."
            },
            {
              question: "What's the best format for the template?",
              answer: "HTML/CSS templates are easiest if you know web development. XSL-FO is more powerful for complex layouts but has a steeper learning curve."
            },
            {
              question: "Can I add barcodes or QR codes to the PDF?",
              answer: "Yes. Generate barcode images from XML data (like order numbers) and include them in the template. Many libraries can generate barcodes from text."
            },
            {
              question: "How do I password-protect the generated PDF?",
              answer: "Some PDF libraries support encryption. Set a password during PDF generation. Note that client-side encryption may expose the password in code."
            },
            {
              question: "Is the PDF searchable?",
              answer: "Yes, text-based PDFs are searchable by default. If you embed text as images, it won't be searchable. Keep text as actual text, not images."
            },
          ].map((item, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="font-semibold text-foreground">{item.question}</h3>
              <p className="text-muted-foreground">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
