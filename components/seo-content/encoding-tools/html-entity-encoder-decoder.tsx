import * as React from "react"

export default function HtmlEntityEncoderDecoderSEO() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 text-foreground">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How the HTML Entity Encoder/Decoder Works</h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            Our HTML entity encoder/decoder converts special characters to and from HTML entities, allowing safe display of reserved characters in HTML documents. Entities prevent characters like &lt;, &gt;, and &amp; from being interpreted as HTML markup.
          </p>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Encoding Process</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Input text is scanned for special characters</li>
              <li>Reserved HTML characters are replaced with entities</li>
              <li>&amp; becomes &amp;amp; (must be first to avoid double-encoding)</li>
              <li>&lt; becomes &amp;lt; and &gt; becomes &amp;gt;</li>
              <li>Quotes become &amp;quot; or &amp;apos; for attributes</li>
              <li>Non-ASCII characters can use numeric entities</li>
            </ol>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Decoding Process</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>HTML entity patterns are identified (&name; or &#num;)</li>
              <li>Named entities are mapped to their characters</li>
              <li>Numeric entities (decimal and hex) are converted</li>
              <li>Result is plain text with original characters</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Common Use Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">XSS Prevention</h3>
            <p className="text-sm text-muted-foreground">
              Encode user input before displaying to prevent cross-site scripting attacks in web applications.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Code Display</h3>
            <p className="text-sm text-muted-foreground">
              Show HTML, XML, or code examples on websites without the browser interpreting them as markup.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Content Management</h3>
            <p className="text-sm text-muted-foreground">
              Safely store and display user-generated content containing special characters in CMS platforms.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">XML Data Handling</h3>
            <p className="text-sm text-muted-foreground">
              Encode special characters in XML content to maintain well-formed documents.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Email Templates</h3>
            <p className="text-sm text-muted-foreground">
              Ensure special characters display correctly in HTML email templates across email clients.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Mathematical Symbols</h3>
            <p className="text-sm text-muted-foreground">
              Use HTML entities for mathematical and scientific symbols not available on standard keyboards.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">What to Know Before Using This Tool</h2>
        <div className="space-y-4 text-muted-foreground">
          <div className="rounded-lg border p-4 space-y-3">
            <h3 className="font-semibold text-foreground">Essential HTML Entities</h3>
            <div className="grid grid-cols-2 gap-2 text-sm font-mono bg-muted/30 p-3 rounded">
              <div>&amp;lt; - Less than (&lt;)</div>
              <div>&amp;gt; - Greater than (&gt;)</div>
              <div>&amp;amp; - Ampersand (&amp;)</div>
              <div>&amp;quot; - Double quote (")</div>
              <div>&amp;apos; - Single quote (')</div>
              <div>&amp;nbsp; - Non-breaking space</div>
            </div>
          </div>
          <div className="rounded-lg border p-4 space-y-3">
            <h3 className="font-semibold text-foreground">Entity Types</h3>
            <p className="text-sm">
              Named entities (&amp;lt;) are more readable. Numeric entities (&amp;#60; or &amp;#x3C;) support all Unicode characters. Hex entities (&amp;#x...) use hexadecimal notation.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-3">
            <h3 className="font-semibold text-foreground">Context Matters</h3>
            <p className="text-sm">
              Encode differently for HTML body content vs. attribute values. Attribute values need quote encoding. JavaScript and CSS contexts require different escaping.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Why encode ampersands first?</h3>
            <p className="text-sm text-muted-foreground">
              Ampersands start entity references. If you encode other characters first, you might create invalid entities. Always encode &amp; to &amp;amp; before other characters.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Do I need to encode all special characters?</h3>
            <p className="text-sm text-muted-foreground">
              Only encode characters that have special meaning in HTML context: &amp;, &lt;, &gt;, and quotes in attributes. Other characters display fine without encoding.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">What about Unicode characters?</h3>
            <p className="text-sm text-muted-foreground">
              Modern browsers handle UTF-8 directly. You can use Unicode characters directly or encode them as numeric entities (&amp;#x...;) for maximum compatibility.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Is HTML encoding the same as URL encoding?</h3>
            <p className="text-sm text-muted-foreground">
              No. HTML encoding uses entities (&amp;lt;) for HTML context. URL encoding uses percent-encoding (%3C) for URLs. They are not interchangeable.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
