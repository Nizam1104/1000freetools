import React from "react"

export default function JavascriptStringEscapeUnescapeSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the String Escape & Unescape Tool Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter your string and select the context: JavaScript, JSON, HTML, or URL. Each context has different special characters that need escaping. Click Escape to encode or Unescape to decode.
          </p>
          <p>
            JavaScript escaping handles quotes, newlines, and backslashes. JSON wrapping adds quotes and escapes appropriately. HTML converts special characters to entities. URL encoding handles spaces and special chars.
          </p>
          <p>
            Results appear instantly with copy functionality. The tool handles Unicode characters correctly. All processing happens locally in your browser.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Embedding strings in code</h3>
            <p className="text-sm text-muted-foreground">
              User input contains quotes or backslashes. Escape before embedding in JavaScript strings. Prevent syntax errors in generated code.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating JSON payloads</h3>
            <p className="text-sm text-muted-foreground">
              String values need proper JSON escaping. Wrap and escape in one step. Ensure valid JSON for API requests.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preventing XSS attacks</h3>
            <p className="text-sm text-muted-foreground">
              Escape user input before displaying in HTML. Converts &lt;script&gt; to safe entities. Essential security practice.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building URL query strings</h3>
            <p className="text-sm text-muted-foreground">
              Spaces and special chars break URLs. URL encode parameter values. Ensure valid, working links.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging encoded data</h3>
            <p className="text-sm text-muted-foreground">
              Received escaped strings in logs or APIs. Unescape to see actual content. Understand what data really contains.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Generating template literals</h3>
            <p className="text-sm text-muted-foreground">
              Create JavaScript template strings dynamically. Escape backticks and dollar signs. Prevent template injection issues.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Different contexts need different escaping.</strong>
              HTML escaping won't protect in JavaScript context. URL encoding is different from HTML entities. Match the escape to the context.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Double-escaping causes problems.</strong>
              Escaping already-escaped text breaks it. &amp;amp; becomes &amp; when unescaped, not &. Track what's already escaped.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">HTML escaping isn't enough for JavaScript.</strong>
              Even HTML-escaped content can be dangerous in script contexts. Use context-appropriate escaping for each situation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">URL encoding uses percent notation.</strong>
              Spaces become %20, ampersands become %26. Different from HTML entities (&amp;). Don't mix the formats.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Security note:</strong> For production, use established libraries (DOMPurify for HTML, proper templating for JS). This tool is for quick tasks and understanding escaping concepts.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What characters does JavaScript escape?</h3>
            <p className="text-sm text-muted-foreground">
              Backslash, single/double quotes, newline, carriage return, tab, and other control characters. Each gets a backslash escape sequence.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How is JSON escaping different?</h3>
            <p className="text-sm text-muted-foreground">
              JSON requires double quotes for strings. The tool wraps your input in quotes and escapes internal quotes. Ready for JSON.stringify output.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What are HTML entities?</h3>
            <p className="text-sm text-muted-foreground">
              Special character codes like &amp;lt; for &lt;, &amp;amp; for &. Browsers render entities as characters, not HTML.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">When should I use URL encoding?</h3>
            <p className="text-sm text-muted-foreground">
              For query parameters and URL path segments. Any user input going into a URL needs encoding. Prevents broken links and injection.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it handle Unicode?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, Unicode characters are preserved. Some may be escaped depending on context. Non-ASCII chars work correctly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I escape entire files?</h3>
            <p className="text-sm text-muted-foreground">
              Paste file contents directly. Large files work but may be slow. For batch processing, use command-line tools.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between encodeURI and encodeURIComponent?</h3>
            <p className="text-sm text-muted-foreground">
              encodeURIComponent escapes more characters. Use it for query parameter values. encodeURI is for complete URLs. This tool uses encodeURIComponent.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
