export default function JsonToSqlConverterSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This tool converts JSON data arrays into SQL INSERT statements, bridging the gap 
            between modern API data formats and traditional database storage.
          </p>
          <p className="text-muted-foreground">
            The conversion process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">JSON parsing:</strong> The input JSON is parsed and validated to ensure it's a valid array of objects.</li>
            <li><strong className="text-foreground">Schema inference:</strong> Column names are extracted from the object keys across all items.</li>
            <li><strong className="text-foreground">Value formatting:</strong> Each value is formatted based on its type - strings are quoted, numbers are raw, nulls become NULL.</li>
            <li><strong className="text-foreground">SQL generation:</strong> INSERT statements are created with proper syntax for the target table.</li>
          </ol>
          <p className="text-muted-foreground">
            This is essential for importing data from REST APIs, NoSQL exports, or modern 
            application data stores into relational databases.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "API Data Import",
              description: "Convert JSON responses from REST APIs into SQL for storing in relational databases."
            },
            {
              title: "NoSQL to SQL Migration",
              description: "Migrate data from MongoDB or document stores to PostgreSQL, MySQL, or other SQL databases."
            },
            {
              title: "Application Data Export",
              description: "Import data exported from modern applications that use JSON as their native format."
            },
            {
              title: "Testing and Seeding",
              description: "Convert JSON test fixtures into SQL for populating test databases."
            },
            {
              title: "Data Integration",
              description: "Combine data from JSON-based sources with existing SQL database systems."
            },
            {
              title: "Backup Conversion",
              description: "Transform JSON backups into SQL for restoration into relational database systems."
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
              caveat: "JSON structure must be consistent",
              explanation: "All objects should have the same keys for clean SQL generation. Missing keys become NULL values in the output."
            },
            {
              caveat: "Nested objects need flattening",
              explanation: "This tool handles flat JSON objects. Nested objects and arrays need to be flattened or handled with separate tables."
            },
            {
              caveat: "Data types are inferred",
              explanation: "Strings, numbers, booleans, and nulls are handled. Complex types (dates, binary) may need post-processing."
            },
            {
              caveat: "Table schema must be created",
              explanation: "Generate the CREATE TABLE statement separately based on your JSON structure before running the INSERT statements."
            },
            {
              caveat: "Large JSON may cause memory issues",
              explanation: "Very large JSON files (10MB+) may cause browser memory problems. Use command-line tools for large-scale conversions."
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
              question: "What JSON format does this accept?",
              answer: "An array of objects: [{\"name\": \"John\", \"age\": 30}, {\"name\": \"Jane\", \"age\": 25}]. Single objects are wrapped in an array automatically."
            },
            {
              question: "How are different data types handled?",
              answer: "Strings are quoted, numbers are inserted as-is, booleans become TRUE/FALSE (or 1/0), null becomes SQL NULL. Dates as strings need casting."
            },
            {
              question: "What if objects have different keys?",
              answer: "All unique keys across all objects become columns. Objects missing a key get NULL for that column in the INSERT statement."
            },
            {
              question: "Can I specify the table name?",
              answer: "Yes, you can set the target table name. The generated SQL will use this name in all INSERT statements."
            },
            {
              question: "How are special characters in strings handled?",
              answer: "String values are properly escaped - quotes are doubled, backslashes are escaped, making the SQL safe and valid."
            },
            {
              question: "Can this handle nested JSON?",
              answer: "Basic nesting may be stringified. For proper relational import, flatten nested structures or create separate related tables."
            },
            {
              question: "What about arrays in JSON values?",
              answer: "Arrays are typically converted to JSON strings for storage in a single column. For relational storage, create junction tables."
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
