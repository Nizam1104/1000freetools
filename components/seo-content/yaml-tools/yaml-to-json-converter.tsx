import React from "react"

export default function YamlToJsonConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste your YAML configuration into the input area. The converter parses the YAML structure and transforms it into equivalent JSON format. Nested objects and arrays convert naturally to JSON's brace-based syntax.
          </p>
          <p>
            Options control output style: prettify for readable multi-line JSON with indentation, or minify for compact single-line output. Choose based on your use case - readability or file size.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Conversion example:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">{`YAML Input:
name: John
age: 30
hobbies:
  - reading
  - gaming

JSON Output:
{
  "name": "John",
  "age": 30,
  "hobbies": ["reading", "gaming"]
}`}</pre>
          </div>
          <p>
            The converter preserves data types: numbers stay numbers, booleans remain true/false, null converts to JSON null. Complex nested structures maintain their hierarchy through JSON's object and array syntax.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">API development</h3>
            <p className="text-sm text-muted-foreground">
              REST APIs typically use JSON. Convert YAML specs. Transform config to API format. Client compatibility.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">JavaScript applications</h3>
            <p className="text-sm text-muted-foreground">
              Node.js prefers JSON configs. Package.json format. Convert YAML settings. Native JavaScript compatibility.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Data interchange</h3>
            <p className="text-sm text-muted-foreground">
              JSON is universal data format. Convert for external systems. Webhook payloads. Third-party integrations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Database imports</h3>
            <p className="text-sm text-muted-foreground">
              MongoDB uses JSON-like format. Import YAML data. Transform for NoSQL. Data migration tasks.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Configuration comparison</h3>
            <p className="text-sm text-muted-foreground">
              JSON diff tools more common. Convert for comparison. Version control diffs. Change tracking.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing and mocking</h3>
            <p className="text-sm text-muted-foreground">
              Test fixtures often JSON. Convert YAML test data. Mock API responses. Test data preparation.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">JSON requires quoted keys.</strong>
              All keys become quoted strings. YAML's unquoted keys convert properly. Valid JSON output guaranteed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some YAML features don't map.</strong>
              Anchors and aliases expand. Multi-document becomes array. Comments are lost. Data preserved, metadata not.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Prettify adds readability.</strong>
              Indented output easier to read. 2-space standard indentation. Choose minify for size.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">JSON is stricter than YAML.</strong>
              No trailing commas allowed. Requires double quotes. Converter handles this automatically.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> JSON doesn't support comments. If you need comments in output, keep YAML or use JSON5. Consider your requirements.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is the conversion reversible?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, JSON to YAML converter available. Data preserved both ways. Round-trip conversion works. Structure maintained.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it handle large files?</h3>
            <p className="text-sm text-muted-foreground">
              Browser-based conversion. Most files work fine. Very large files may be slow. Split if needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about YAML comments?</h3>
            <p className="text-sm text-muted-foreground">
              JSON doesn't support comments. They're lost in conversion. Add comments back if needed. Or keep YAML format.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I download the JSON?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, download button saves as .json file. Or copy to clipboard. Direct use in projects. Ready for commit.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it validate YAML first?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, invalid YAML shows error. Fix before conversion. Ensures valid JSON output. Clear error messages.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What encoding is used?</h3>
            <p className="text-sm text-muted-foreground">
              UTF-8 encoding standard. Supports Unicode characters. International text preserved. Emoji and special chars work.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is this secure for sensitive data?</h3>
            <p className="text-sm text-muted-foreground">
              Conversion happens in browser. Data doesn't leave your computer. Safe for configs. Still remove secrets before sharing.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
