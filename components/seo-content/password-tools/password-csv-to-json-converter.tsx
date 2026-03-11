export default function PasswordCsvToJsonConverterSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This tool converts password data between CSV (Comma-Separated Values) and JSON 
            (JavaScript Object Notation) formats - two common ways to store and exchange structured data.
          </p>
          <p className="text-muted-foreground">
            The conversion process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">CSV to JSON:</strong> The first row is treated as headers (column names). Each subsequent row becomes a JSON object with those headers as keys. Values are trimmed and preserved as strings.</li>
            <li><strong className="text-foreground">JSON to CSV:</strong> Each object in the JSON array becomes a row. Object keys become column headers. Values containing commas or quotes are properly escaped according to CSV standards.</li>
            <li><strong className="text-foreground">Data validation:</strong> The tool checks for common issues like mismatched column counts, invalid JSON syntax, or empty inputs.</li>
            <li><strong className="text-foreground">Download support:</strong> Converted data can be downloaded as a file for easy import into other applications.</li>
          </ol>
          <p className="text-muted-foreground">
            All processing happens locally in your browser - no password data is ever sent to 
            external servers, making this safe for sensitive credential exports.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Password Manager Migration",
              description: "Export from one password manager in CSV format and convert to JSON for import into another that requires JSON."
            },
            {
              title: "Bulk Password Import/Export",
              description: "Convert credential exports to the format required by your target system when switching password management solutions."
            },
            {
              title: "Security Audit Preparation",
              description: "Transform password audit logs into JSON for analysis with security tools that require structured data formats."
            },
            {
              title: "Developer Testing",
              description: "Generate test data in the format needed for application testing - CSV for spreadsheet review, JSON for API testing."
            },
            {
              title: "Compliance Reporting",
              description: "Convert password audit data to the format required by compliance tools and reporting systems."
            },
            {
              title: "Data Analysis",
              description: "Transform password metadata (not actual passwords) into formats suitable for analysis in different tools."
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
              caveat: "Never convert actual password data in production",
              explanation: "While this tool runs locally, converting files containing real passwords introduces risk. Use this for testing, metadata, or encrypted exports only."
            },
            {
              caveat: "CSV has limitations with special characters",
              explanation: "Fields containing commas, quotes, or newlines need proper escaping. This tool handles standard CSV escaping, but complex data may need manual review."
            },
            {
              caveat: "JSON requires valid syntax",
              explanation: "Input JSON must be properly formatted with quoted keys, proper commas, and matching brackets. Invalid JSON will produce errors."
            },
            {
              caveat: "Data types become strings in CSV",
              explanation: "When converting JSON to CSV, all values become strings. Numbers, booleans, and null values lose their type information."
            },
            {
              caveat: "Column order may change",
              explanation: "JSON objects don't guarantee key order. When converting to CSV, columns may appear in a different order than the original export."
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
              question: "Is it safe to convert password data with this tool?",
              answer: "The tool runs entirely in your browser with no server communication. However, best practice is to only convert encrypted exports or test data, never plaintext passwords in production environments."
            },
            {
              question: "What CSV format does this support?",
              answer: "Standard RFC 4180 CSV with comma delimiters, quoted fields for special characters, and CRLF or LF line endings. The first row must contain column headers."
            },
            {
              question: "Can I convert large password exports?",
              answer: "Yes, but browser memory limits apply. For exports with thousands of entries, consider splitting into smaller files. Most password manager exports are well within browser limits."
            },
            {
              question: "What happens to special characters in passwords?",
              answer: "In CSV output, special characters are properly escaped with quotes. In JSON, they're escaped according to JSON standards. The data integrity is preserved through conversion."
            },
            {
              question: "Can I customize the column names?",
              answer: "For CSV to JSON, column names come from the CSV header row. For JSON to CSV, they come from object keys. Edit the source data to change column names before conversion."
            },
            {
              question: "Why would I need to convert password data formats?",
              answer: "Different password managers and security tools use different formats. Conversion is essential when migrating between tools, integrating systems, or preparing data for analysis."
            },
            {
              question: "Does this tool store my data?",
              answer: "No. All conversion happens in your browser's memory. When you close the page or refresh, the data is gone. Nothing is transmitted or stored on any server."
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
