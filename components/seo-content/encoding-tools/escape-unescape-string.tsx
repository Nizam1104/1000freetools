import React from "react"

export default function EscapeUnescapeStringSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Escape/Unescape String Tool Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste your string to escape special characters, or input an escaped string to unescape it. Choose the escaping format: JavaScript, JSON, HTML, XML, or URL encoding.
          </p>
          <p>
            Escaping converts special characters to safe sequences. Quotes become \", newlines become \n, angle brackets become &lt; and &gt;. The exact conversion depends on the target format.
          </p>
          <p>
            Unescaping reverses the process, converting escape sequences back to original characters. The tool auto-detects the escape format or uses your selection. Preview changes in real-time.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Writing JavaScript string literals</h3>
            <p className="text-sm text-muted-foreground">
              Need to include quotes or newlines in JS strings? Escape them properly. Prevents syntax errors and security issues in your code.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating JSON payloads</h3>
            <p className="text-sm text-muted-foreground">
              JSON requires proper escaping of strings. Quotes, backslashes, and control characters must be escaped. Generate valid JSON for APIs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preventing XSS attacks</h3>
            <p className="text-sm text-muted-foreground">
              User input in HTML needs escaping. Convert &lt; to &amp;lt; to prevent script injection. Essential security practice for web applications.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Embedding code in documentation</h3>
            <p className="text-sm text-muted-foreground">
              Documentation with code examples needs escaping. HTML entities prevent browsers from interpreting code as markup. Clean documentation display.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Processing log files</h3>
            <p className="text-sm text-muted-foreground">
              Log entries may contain special characters. Escape for safe storage and display. Unescape when analyzing or displaying logs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Working with template engines</h3>
            <p className="text-sm text-muted-foreground">
              Template variables may need escaping. Prevent injection attacks and rendering issues. Most templates auto-escape, but manual control is sometimes needed.
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
              HTML escaping differs from JavaScript. JSON has its own rules. URL encoding is different still. Choose the right format for your context.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Double escaping causes problems.</strong>
              Escaping already-escaped text produces \\&amp;lt; instead of &amp;lt;. Track what's already escaped. Unescape before re-escaping.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some characters are always safe.</strong>
              Alphanumeric characters never need escaping. Only special characters and control codes require escaping. Know which characters are special in your context.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Unicode needs consideration.</strong>
              Some contexts require Unicode escaping. JavaScript supports \uXXXX. JSON requires escaping certain Unicode. Know your format's Unicode rules.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For HTML, escape at the last moment before output. Store raw data, escape when displaying. This prevents double-escaping and preserves data integrity.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What characters need HTML escaping?</h3>
            <p className="text-sm text-muted-foreground">
              At minimum: &amp; &lt; &gt; " and '. &amp; becomes &amp;amp;, &lt; becomes &amp;lt;, etc. Prevents HTML injection and XSS attacks.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I escape newlines in JavaScript?</h3>
            <p className="text-sm text-muted-foreground">
              Use \n for newline, \r for carriage return, \t for tab. In template literals (backticks), you can use actual newlines.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference from URL encoding?</h3>
            <p className="text-sm text-muted-foreground">
              URL encoding uses %XX hex format. Space becomes %20. HTML uses &amp;name; entities. Different purposes: URLs vs markup vs code strings.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I escape entire files?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, paste file contents or upload. The tool processes the entire text. Useful for preparing code snippets or documentation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about SQL escaping?</h3>
            <p className="text-sm text-muted-foreground">
              SQL uses different escaping (quotes doubled or backslash). This tool focuses on web formats. For SQL, use parameterized queries instead of manual escaping.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I unescape HTML entities?</h3>
            <p className="text-sm text-muted-foreground">
              Select HTML unescape mode. &amp;amp; becomes &amp;, &amp;lt; becomes &lt;. Named entities (&amp;nbsp;) and numeric (&amp;#160;) both work.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is escaping enough for security?</h3>
            <p className="text-sm text-muted-foreground">
              Escaping is necessary but not sufficient. Use Content Security Policy, input validation, and other defenses. Defense in depth is essential.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
