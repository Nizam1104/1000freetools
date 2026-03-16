import React from "react"

export default function HtmlEntityEncoderSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How It Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            HTML entity encoding converts special characters into their HTML entity
            equivalents so they display as text instead of being interpreted as HTML
            markup by browsers.
          </p>

          <p>
            The encoder replaces characters like &lt;, &gt;, &, ", and ' with their
            corresponding HTML entities: &amp;lt;, &amp;gt;, &amp;amp;, &amp;quot;,
            and &amp;apos;. This prevents XSS attacks and ensures special characters
            render correctly in HTML documents.
          </p>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Common HTML entity mappings:</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">&lt;</code>
                <span>becomes</span>
                <code className="font-mono bg-background px-2 py-1 rounded">&amp;lt;</code>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">&gt;</code>
                <span>becomes</span>
                <code className="font-mono bg-background px-2 py-1 rounded">&amp;gt;</code>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">&</code>
                <span>becomes</span>
                <code className="font-mono bg-background px-2 py-1 rounded">&amp;amp;</code>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">"</code>
                <span>becomes</span>
                <code className="font-mono bg-background px-2 py-1 rounded">&amp;quot;</code>
              </div>
            </div>
          </div>

          <p>
            The tool processes your text instantly as you type. Encoded output can
            be copied directly into HTML files, database entries, or CMS content
            fields. A decode function reverses the process when needed.
          </p>
        </div>
      </section>

      {/* Specific Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Displaying code snippets in blog posts</h3>
            <p className="text-sm text-muted-foreground">
              A technical blogger wants to show HTML examples in their tutorial.
              Without encoding, &lt;script&gt; tags would execute. They encode the
              code snippet so readers see the actual tags instead of rendered HTML.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preventing XSS attacks in user input</h3>
            <p className="text-sm text-muted-foreground">
              A developer builds a comment system and needs to sanitize user input.
              They encode all special characters before storing comments, preventing
              malicious scripts from executing when comments display on the page.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating HTML documentation about HTML</h3>
            <p className="text-sm text-muted-foreground">
              Someone writes a guide about HTML tags and needs to reference the
              tags themselves. They encode examples like &amp;lt;div&amp;gt; so
              the documentation shows the tags without actually creating div elements.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Storing mathematical expressions in HTML</h3>
            <p className="text-sm text-muted-foreground">
              A math teacher creates online exercises with inequalities like x &lt; y.
              Without encoding, the browser interprets &lt; as an unclosed tag.
              HTML entities preserve the mathematical meaning.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Embedding JSON with special characters</h3>
            <p className="text-sm text-muted-foreground">
              A developer needs to display JSON examples containing quotes and
              ampersands in an HTML page. They encode the JSON string so it renders
              correctly without breaking the surrounding HTML structure.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing HTML parsers and sanitizers</h3>
            <p className="text-sm text-muted-foreground">
              A QA engineer tests whether their HTML sanitizer properly handles
              encoded entities. They generate test cases with various entity
              combinations to verify correct parsing behavior.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>

        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">HTML encoding is different from URL encoding.</strong>
              HTML entities use &amp;name; or &amp;#number; format for HTML context.
              URL encoding uses %XX hex codes for URLs. Don't mix them up—using
              HTML entities in URLs will break links.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Not all characters need encoding.</strong>
              Only five characters must be encoded in HTML: &lt;, &gt;, &, ", and '.
              Other characters like parentheses, periods, and numbers can appear
              unencoded safely.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Named entities vs numeric entities.</strong>
              This tool uses named entities like &amp;lt; which are more readable.
              Numeric entities like &amp;#60; work too but are harder to read.
              Both render identically in browsers.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Double encoding breaks content.</strong>
              Encoding already-encoded text turns &amp;lt; into &amp;amp;lt;, which
              displays as &amp;lt; literally. Always check if text is already
              encoded before applying encoding again.
            </p>
          </div>

          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Security note:</strong> HTML encoding prevents XSS in HTML
              context but not in JavaScript or CSS context. For JavaScript, use
              JSON encoding. For CSS, use CSS-specific escaping. Context matters
              for security.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between encoding and escaping?</h3>
            <p className="text-sm text-muted-foreground">
              In HTML context, they mean the same thing—converting special characters
              to safe representations. "Encoding" is more common for HTML entities.
              "Escaping" is used for strings in code or regex patterns.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do I need to encode spaces and line breaks?</h3>
            <p className="text-sm text-muted-foreground">
              No, spaces and newlines are safe in HTML. However, multiple spaces
              collapse to one in HTML rendering. Use &amp;nbsp; for non-breaking
              spaces if you need to preserve exact spacing.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I encode an entire HTML page?</h3>
            <p className="text-sm text-muted-foreground">
              You could, but then the browser would display the HTML source code
              as text instead of rendering it. Only encode the content that should
              display as text, not the HTML structure itself.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about emoji and Unicode characters?</h3>
            <p className="text-sm text-muted-foreground">
              Modern HTML5 handles Unicode natively. Emoji and international
              characters don't need encoding if your page uses UTF-8 encoding
              (which it should). Only the five special HTML characters require
              entity encoding.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I decode HTML entities back?</h3>
            <p className="text-sm text-muted-foreground">
              Use the decode function in this tool or let the browser do it
              automatically. When HTML with entities renders, the browser converts
              them back to the original characters for display.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Are HTML entities case-sensitive?</h3>
            <p className="text-sm text-muted-foreground">
              Named entities are case-sensitive in XHTML but most browsers accept
              mixed case in HTML5. &amp;LT; works in practice but &amp;lt; is the
              standard. Numeric entities like &amp;#60; are not case-sensitive.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the semicolon for in &amp;lt;?</h3>
            <p className="text-sm text-muted-foreground">
              The semicolon marks the end of the entity reference. Without it,
              browsers might not recognize the entity correctly, especially if
              followed by letters. Always include the semicolon for proper parsing.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
