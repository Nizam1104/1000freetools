import React from "react"

export default function JsonValidatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the JSON Validator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste your JSON into the input field. Validation happens automatically as you type. Valid JSON shows a green success message. Invalid JSON displays the error with line and column numbers.
          </p>
          <p>
            Choose your output format: pretty-printed with customizable indentation (2, 4, or 8 spaces) or compact minified format. The formatter preserves all data while improving readability.
          </p>
          <p>
            Statistics show the structure of your JSON: top-level keys, total properties, array items, and file size. This helps understand complex nested data at a glance.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging API responses</h3>
            <p className="text-sm text-muted-foreground">
              Your API returns malformed JSON. Paste the response to find the exact error location. Fix syntax issues before parsing in your code.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Formatting minified JSON</h3>
            <p className="text-sm text-muted-foreground">
              Received a single-line JSON blob? Beautify it to readable format. Add proper indentation for code reviews and debugging sessions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Validating configuration files</h3>
            <p className="text-sm text-muted-foreground">
              package.json, tsconfig.json, and other config files must be valid JSON. Check before committing to avoid breaking your build.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning JSON syntax</h3>
            <p className="text-sm text-muted-foreground">
              New to JSON? Experiment with different structures. See exactly what makes JSON invalid. Learn the difference between null, empty strings, and missing values.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing data for import</h3>
            <p className="text-sm text-muted-foreground">
              Importing data into a database or system? Validate the JSON first. Catch errors before the import fails halfway through.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Comparing JSON structures</h3>
            <p className="text-sm text-muted-foreground">
              Format two JSON files identically, then diff them. Consistent formatting makes structural differences obvious, not just whitespace changes.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">JSON requires double quotes.</strong>
              Single quotes are invalid in JSON. Keys and string values must use "double quotes". This differs from JavaScript object literals.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Trailing commas are not allowed.</strong>
              [1, 2, 3,] is invalid. The last item cannot have a trailing comma. This is a common mistake when copying from JavaScript.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Comments are not part of JSON.</strong>
              JSON doesn't support comments. Any // or /* */ will cause validation errors. Remove comments before validating.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Special characters need escaping.</strong>
              Quotes inside strings must be escaped as \". Newlines become \n. Backslashes become \\. The validator catches unescaped characters.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For ongoing development, use a JSON extension in your code editor. They validate as you type. This tool is best for quick checks and formatting external JSON.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between JSON and JavaScript objects?</h3>
            <p className="text-sm text-muted-foreground">
              JSON is a data format with strict syntax rules. JavaScript objects are language constructs. JSON requires double quotes, no trailing commas, and no functions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can it handle large JSON files?</h3>
            <p className="text-sm text-muted-foreground">
              Browser memory limits apply. Files up to a few MB work fine. Very large files may slow down your browser. Consider streaming parsers for huge datasets.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it validate JSON Schema?</h3>
            <p className="text-sm text-muted-foreground">
              No, this validates JSON syntax only. Schema validation checks data structure and types. That requires a separate JSON Schema validator tool.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does my valid JSON show errors?</h3>
            <p className="text-sm text-muted-foreground">
              Common causes: single quotes, trailing commas, unquoted keys, or comments. JSON is stricter than JavaScript. Check the error message for specifics.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I validate JSON arrays?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, JSON can be an object {} or an array []. Both are valid. Arrays of objects, nested arrays - all valid JSON structures work.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about JSON5 or relaxed JSON?</h3>
            <p className="text-sm text-muted-foreground">
              This validates strict JSON only. JSON5 allows comments and trailing commas. Use a JSON5-specific validator for that relaxed syntax.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is my data sent to a server?</h3>
            <p className="text-sm text-muted-foreground">
              No, validation happens entirely in your browser. Your JSON never leaves your computer. Safe for sensitive or private data.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
