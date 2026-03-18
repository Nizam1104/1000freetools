export default function SqlToJsonConverterSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This SQL to JSON converter transforms database query results into JSON format,
            making it easy to integrate SQL data with web applications, APIs, and modern development workflows.
          </p>
          <p className="text-muted-foreground">
            The conversion process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Query input:</strong> Provide your SQL query results either by pasting tabular data or connecting to a database.</li>
            <li><strong className="text-foreground">Structure analysis:</strong> Column names become JSON keys, and each row becomes a JSON object in an array.</li>
            <li><strong className="text-foreground">Type mapping:</strong> SQL data types are converted to appropriate JSON types (numbers stay numbers, dates become strings, NULL becomes null).</li>
            <li><strong className="text-foreground">JSON generation:</strong> Output is formatted as a valid JSON array, with options for pretty-printing or minification.</li>
          </ol>
          <p className="text-muted-foreground">
            JSON has become the universal data interchange format for web APIs and JavaScript applications.
            Converting SQL results to JSON bridges the gap between relational databases and modern application architectures.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "API Response Preparation",
              description: "Convert database query results to JSON format for REST API responses."
            },
            {
              title: "Frontend Development",
              description: "Transform SQL data into JSON that JavaScript frameworks (React, Vue, Angular) can consume directly."
            },
            {
              title: "Data Export for Analysis",
              description: "Export database data as JSON for use in data science tools that prefer JSON over CSV."
            },
            {
              title: "Configuration Generation",
              description: "Create JSON configuration files from database-stored settings or content."
            },
            {
              title: "NoSQL Migration",
              description: "Convert relational data to JSON documents when migrating to MongoDB or similar databases."
            },
            {
              title: "Testing and Mocking",
              description: "Generate realistic JSON test data from production database queries for development environments."
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
              caveat: "Relational structure flattens",
              explanation: "SQL's relational nature (multiple tables, joins) becomes a flat JSON array. Nested relationships require additional processing."
            },
            {
              caveat: "Date formatting varies",
              explanation: "SQL dates convert to ISO 8601 strings by default. Some applications may expect different date formats or timestamps."
            },
            {
              caveat: "Large result sets create large JSON",
              explanation: "Exporting thousands of rows produces large JSON files. Consider pagination or streaming for large datasets."
            },
            {
              caveat: "Binary data needs encoding",
              explanation: "BLOBs and binary columns convert to base64-encoded strings in JSON, increasing size by about 33%."
            },
            {
              caveat: "NULL vs empty string distinction",
              explanation: "SQL NULL becomes JSON null. Empty strings remain empty strings. This distinction is preserved but may need handling in your application."
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
              question: "Can I create nested JSON from joined tables?",
              answer: "Basic conversion produces flat objects. For nested JSON (e.g., orders with line items), use database-specific JSON functions (JSON_OBJECT, JSON_ARRAY) in your SQL query."
            },
            {
              question: "How do I handle special characters in JSON?",
              answer: "The converter automatically escapes quotes, backslashes, and control characters per JSON specification. Output is valid JSON ready for parsing."
            },
            {
              question: "What's the difference between pretty-printed and minified JSON?",
              answer: "Pretty-printed adds indentation and newlines for readability. Minified removes all whitespace for smaller file size. Use pretty for development, minified for production."
            },
            {
              question: "Can I convert JSON back to SQL?",
              answer: "Yes, use a JSON to SQL converter tool. It parses JSON and generates INSERT statements. However, complex nested JSON may require custom parsing logic."
            },
            {
              question: "How are SQL data types mapped to JSON?",
              answer: "INT/DECIMAL become JSON numbers, VARCHAR/TEXT become strings, DATE/TIMESTAMP become ISO strings, BOOLEAN becomes true/false, NULL becomes null."
            },
            {
              question: "Can I filter which columns become JSON keys?",
              answer: "Select only the columns you need in your SQL query. The converter uses whatever columns are in the result set."
            },
            {
              question: "Is the output valid for all JSON parsers?",
              answer: "Yes, the output follows RFC 8259 JSON standard and works with JavaScript's JSON.parse(), Python's json module, and all standard JSON libraries."
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
