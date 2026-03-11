import React from "react"

export default function JavascriptObjectToJsonConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Object to JSON Converter Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste your JavaScript object literal or JSON string. The converter handles both directions: object to JSON and JSON to object. Toggle between modes with a single click.
          </p>
          <p>
            For object-to-JSON conversion, the tool parses JavaScript syntax including single quotes and unquoted keys. The output is valid JSON with proper double quotes and escaping.
          </p>
          <p>
            JSON-to-object mode converts valid JSON into JavaScript object literal syntax. Choose pretty-printed output with customizable indentation. Copy the result for immediate use.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Converting config objects</h3>
            <p className="text-sm text-muted-foreground">
              Your JavaScript config uses single quotes and unquoted keys. Need JSON for a config file? Convert instantly without manual reformatting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing API payloads</h3>
            <p className="text-sm text-muted-foreground">
              Have a JavaScript object but API needs JSON string? Convert before sending with fetch or axios. Ensures proper serialization.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging serialization issues</h3>
            <p className="text-sm text-muted-foreground">
              JSON.stringify behaving unexpectedly? See exactly what the JSON output looks like. Identify undefined values, functions, and circular references.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning JSON vs objects</h3>
            <p className="text-sm text-muted-foreground">
              Understand the differences between JavaScript objects and JSON. See how quotes, functions, and undefined values are handled differently.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating test data</h3>
            <p className="text-sm text-muted-foreground">
              Write test data as JavaScript objects, convert to JSON for fixtures. Or start with JSON from an API, convert to objects for test code.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Fixing copy-paste errors</h3>
            <p className="text-sm text-muted-foreground">
              Copied JSON into JavaScript but it has double quotes everywhere? Convert to object literal syntax for cleaner, more idiomatic code.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Functions can't be serialized.</strong>
              JSON doesn't support functions. Object-to-JSON conversion drops any function properties. This is a JSON limitation, not a tool issue.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Undefined becomes null or is omitted.</strong>
              JSON has no undefined. In arrays, undefined becomes null. In objects, undefined properties are omitted entirely.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Dates become ISO strings.</strong>
              Date objects serialize to ISO 8601 strings. They don't remain as Date objects. Parse them back if you need Date functionality.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Circular references cause errors.</strong>
              Objects that reference themselves can't be serialized to JSON. JSON.stringify throws an error. Restructure your data to avoid cycles.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For complex serialization needs, consider libraries like flatted or custom toJSON methods. They handle circular references and special types better.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between objects and JSON?</h3>
            <p className="text-sm text-muted-foreground">
              Objects are JavaScript data structures with methods and prototypes. JSON is a text format for data exchange. JSON is a subset of object literal syntax.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can it handle nested objects?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, deeply nested structures work fine. Arrays of objects, objects in arrays - any valid JavaScript structure converts correctly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why are my quotes changing?</h3>
            <p className="text-sm text-muted-foreground">
              JSON requires double quotes. JavaScript allows single quotes. Conversion standardizes to JSON's double-quote requirement.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it preserve property order?</h3>
            <p className="text-sm text-muted-foreground">
              Modern JavaScript preserves insertion order for string keys. JSON maintains this order. But don't rely on order for logic - use arrays for ordered data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert Map or Set objects?</h3>
            <p className="text-sm text-muted-foreground">
              Not directly. Maps and Sets serialize to empty objects. Convert them to arrays first: Array.from(map) or [...set].
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about Symbol keys?</h3>
            <p className="text-sm text-muted-foreground">
              Symbols aren't supported in JSON. They're omitted during serialization. Use string keys if you need JSON compatibility.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is the conversion lossless?</h3>
            <p className="text-sm text-muted-foreground">
              For plain data objects, yes. For objects with methods, dates, or special types, some information is lost. JSON is for data, not behavior.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
