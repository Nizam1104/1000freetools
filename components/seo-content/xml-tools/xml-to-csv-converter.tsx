export default function XmlToCsvConverterSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This XML to CSV converter extracts repeating elements from your XML structure and flattens them
            into a tabular format suitable for spreadsheets. It handles nested data by creating columns for
            each element path or attribute.
          </p>
          <p className="text-muted-foreground">
            The conversion process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Parse XML:</strong> Your XML is parsed into a DOM structure for traversal.</li>
            <li><strong className="text-foreground">Identify repeating nodes:</strong> The tool finds the repeating element pattern (like rows in a table).</li>
            <li><strong className="text-foreground">Extract columns:</strong> Child elements and attributes become CSV columns. You can select which ones to include.</li>
            <li><strong className="text-foreground">Generate CSV:</strong> Each repeating node becomes a row. Values are properly escaped for CSV format.</li>
          </ol>
          <p className="text-muted-foreground">
            The converter handles special characters by quoting fields and escaping internal quotes.
            You can choose delimiters (comma, semicolon, tab) based on your regional settings or target application.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Exporting database query results",
              description: "Your legacy system exports data as XML but you need it in Excel for analysis. Convert the XML result set to CSV for immediate spreadsheet use."
            },
            {
              title: "Processing e-commerce product feeds",
              description: "Suppliers send product catalogs in XML format. Convert to CSV to import into your inventory management system or compare prices in a spreadsheet."
            },
            {
              title: "Analyzing application logs",
              description: "Some logging frameworks output structured XML logs. Convert to CSV to filter, sort, and create pivot tables in Excel or Google Sheets."
            },
            {
              title: "Migrating data between systems",
              description: "Moving from an XML-based system to a SQL database? Convert to CSV first as an intermediate step for bulk import tools."
            },
            {
              title: "Creating reports from API responses",
              description: "REST APIs sometimes return XML. Convert the response data to CSV for sharing with stakeholders who prefer spreadsheet formats."
            },
            {
              title: "Cleaning and transforming survey data",
              description: "Survey platforms export responses as XML. Flatten to CSV to use standard data cleaning tools and statistical software."
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
              caveat: "Deeply nested XML may not flatten well",
              explanation: "CSV is flat by nature. Very nested XML structures might need multiple passes or custom column mapping to represent properly."
            },
            {
              caveat: "Mixed content gets simplified",
              explanation: "Elements with both text and child elements (mixed content) will only capture the text value. Child elements are ignored in that field."
            },
            {
              caveat: "Empty elements become empty cells",
              explanation: "If an XML element is empty or missing in some rows, the corresponding CSV cell will be empty. This is expected behavior."
            },
            {
              caveat: "Special characters are escaped",
              explanation: "Commas, quotes, and newlines in values are handled by quoting the field. Double quotes inside are escaped as two quotes."
            },
            {
              caveat: "Choose the right repeating element",
              explanation: "For nested data, selecting which element level becomes 'rows' affects the output. Pick the element that represents one record."
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
              question: "Can this handle large XML files?",
              answer: "Files up to about 50MB work well in most browsers. Larger files may cause performance issues since parsing happens in memory."
            },
            {
              question: "How are XML attributes handled?",
              answer: "Attributes can be included as columns. They're typically prefixed with @ to distinguish them from element values, like @id or @status."
            },
            {
              question: "What delimiter should I use?",
              answer: "Comma is standard, but use semicolon in European locales where comma is the decimal separator. Tab works well for importing into Excel."
            },
            {
              question: "Can I convert nested arrays to CSV?",
              answer: "Nested repeating elements create multiple rows per parent. For example, an order with multiple items becomes multiple CSV rows, one per item."
            },
            {
              question: "Does this preserve data types?",
              answer: "CSV is text-only. Numbers, dates, and booleans become text strings. Your spreadsheet application may auto-detect and reformat them on import."
            },
            {
              question: "What encoding does the CSV use?",
              answer: "UTF-8 is standard and handles international characters. Excel may need you to specify UTF-8 when opening, or add a BOM for automatic detection."
            },
            {
              question: "Can I go back from CSV to XML?",
              answer: "Yes, but you'll lose the original structure. Use a CSV to XML converter and define how columns map to elements and attributes."
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
