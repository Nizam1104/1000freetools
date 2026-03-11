import React from "react"

export default function HtmlEscapeUnescapeSEO() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How the HTML Escape and Unescape Tool Works</h2>
        <div className="prose prose-sm dark:prose-invert">
          <p className="text-muted-foreground">
            This tool converts between plain text and HTML-encoded text. Escape mode converts special
            characters to HTML entities (like &amp;lt; for &lt;). Unescape mode converts entities back
            to their original characters. It handles both named entities and numeric character references.
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <h3 className="text-lg font-semibold">Escape and Unescape Process</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Select escape mode (text to entities) or unescape mode (entities to text)</li>
            <li>Enter your content in the input area</li>
            <li>Click the convert button to process</li>
            <li>Escape mode converts: &amp;, &lt;, &gt;, &quot;, &apos;, and more</li>
            <li>Unescape mode handles named (&amp;nbsp;) and numeric (&amp;#160;) entities</li>
            <li>Copy the converted result for use in your project</li>
            <li>Use the swap button to quickly switch modes</li>
          </ol>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Specific Use Cases</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Code Example Display</h3>
            <p className="text-sm text-muted-foreground">
              A developer writing a tutorial needs to show HTML tags as text on a webpage.
              Escaping &lt;script&gt; prevents the browser from executing it as actual code.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">XSS Prevention</h3>
            <p className="text-sm text-muted-foreground">
              A web application escapes user input before displaying it. This prevents
              malicious scripts from executing, protecting against cross-site scripting attacks.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">XML Data Preparation</h3>
            <p className="text-sm text-muted-foreground">
              Someone preparing data for XML export escapes special characters.
              This ensures ampersands and angle brackets don&apos;t break the XML structure.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Database Content Recovery</h3>
            <p className="text-sm text-muted-foreground">
              A developer finds HTML entities stored in a database instead of plain text.
              Unescaping converts &amp;copy; back to © for proper display.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">API Response Processing</h3>
            <p className="text-sm text-muted-foreground">
              An API returns HTML-encoded content. Unescaping before display ensures
              users see proper characters instead of entity codes.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using This Tool</h2>
        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <p className="text-muted-foreground">
            Understanding HTML encoding:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Five characters must be escaped in HTML: &amp; &lt; &gt; &quot; &apos;</li>
            <li>Named entities (&amp;copy;) are more readable than numeric (&amp;#169;)</li>
            <li>Escaping is essential for displaying code examples safely</li>
            <li>Double-escaping can occur if already-encoded text is encoded again</li>
            <li>Some entities represent special symbols (currency, math, punctuation)</li>
            <li>UTF-8 encoding reduces the need for character entities</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What&apos;s the difference between escape and encode?</h3>
            <p className="text-sm text-muted-foreground">
              In this context, they&apos;re the same - converting special characters to HTML entities.
              &quot;Escape&quot; emphasizes preventing interpretation, while &quot;encode&quot;
              emphasizes format conversion.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Why escape ampersands specifically?</h3>
            <p className="text-sm text-muted-foreground">
              Ampersands start entity references in HTML. An unescaped &amp; in &quot;Tom &amp; Jerry&quot;
              could be misinterpreted as the start of an entity. Always escape as &amp;amp;.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">When should I unescape HTML entities?</h3>
            <p className="text-sm text-muted-foreground">
              Unescape when you need actual characters for processing, storing in databases,
              or displaying in non-HTML contexts like plain text files or terminal output.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Does escaping affect SEO?</h3>
            <p className="text-sm text-muted-foreground">
              Search engines decode entities before indexing. &quot;caf&#233;&quot; and
              &quot;caf&eacute;&quot; are treated the same as &quot;caf&#233;&quot;.
              Use entities for HTML validity, not SEO.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What about non-ASCII characters?</h3>
            <p className="text-sm text-muted-foreground">
              Modern HTML5 with UTF-8 handles most characters directly. Entities are mainly
              needed for the five special characters or when character encoding is uncertain.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Can I escape JavaScript with this tool?</h3>
            <p className="text-sm text-muted-foreground">
              This tool is for HTML entities only. For JavaScript escaping, use dedicated
              JSON.stringify() or JavaScript-specific escaping tools.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
