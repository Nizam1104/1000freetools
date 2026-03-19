export default function XmlEntityEncoderDecoderSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This XML entity encoder/decoder converts special characters to their XML entity equivalents and vice versa.
            It ensures your text is safe for inclusion in XML documents without breaking the structure.
          </p>
          <p className="text-muted-foreground">
            The encoding process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Scan input:</strong> Text is scanned for characters that have special meaning in XML.</li>
            <li><strong className="text-foreground">Replace with entities:</strong> Special characters are replaced with their entity equivalents (&amp; becomes &amp;amp;, {"<"} becomes &amp;lt;, etc.).</li>
            <li><strong className="text-foreground">Output safe text:</strong> The result is safe to include in XML element content or attributes.</li>
          </ol>
          <p className="text-muted-foreground">
            Decoding reverses the process, converting entities back to their original characters.
            The tool handles both named entities (&amp;amp;, &amp;lt;, &amp;gt;, &amp;quot;, &amp;apos;) and numeric character references (&amp;#60;, &amp;#x3C;).
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Including code examples in XML documentation",
              description: "Your XML docs need to show code with < and > characters. Encode them so the XML parser doesn't confuse them with tags."
            },
            {
              title: "Storing user-generated content in XML",
              description: "User comments or posts may contain special characters. Encode before storing in XML to prevent parsing errors or injection issues."
            },
            {
              title: "Creating XML with mathematical formulas",
              description: "Math expressions use <, >, and &. Encode these characters so formulas display correctly when the XML is rendered."
            },
            {
              title: "Debugging malformed XML errors",
              description: "Getting 'invalid character' errors? Decode the XML to see if unescaped special characters are causing the parsing failure."
            },
            {
              title: "Preparing data for RSS/Atom feeds",
              description: "Feed item descriptions often contain HTML or special chars. Encode content properly to ensure feed validators pass."
            },
            {
              title: "Working with legacy XML systems",
              description: "Older systems may not handle CDATA sections. Encode special characters the traditional way for maximum compatibility."
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
              caveat: "Five predefined entities in XML",
              explanation: "XML defines five named entities: &amp;amp; (ampersand), &amp;lt; (less than), &amp;gt; (greater than), &amp;quot; (quote), &amp;apos; (apostrophe)."
            },
            {
              caveat: "CDATA sections avoid encoding",
              explanation: "Wrap text in <![CDATA[...]]> to include special characters without encoding. But CDATA can't contain ]]> sequence."
            },
            {
              caveat: "Attributes need different handling",
              explanation: "In attributes, quotes must be encoded (&amp;quot; or &amp;apos;). Element content doesn't need quote encoding unless quotes appear there."
            },
            {
              caveat: "Numeric entities work everywhere",
              explanation: "&#60; (decimal) and &#x3C; (hex) both represent <. Numeric entities work even when named entities aren't recognized."
            },
            {
              caveat: "Double encoding breaks data",
              explanation: "Encoding already-encoded text creates &amp;amp;amp; instead of &amp;amp;. Check if text is already encoded before running again."
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
              question: "What's the difference between encoding and escaping?",
              answer: "In XML context, they're the same thing—replacing special characters with entity references. 'Escaping' is more common in programming contexts."
            },
            {
              question: "Do I need to encode numbers and letters?",
              answer: "No. Only the five special characters (&, <, >, \", ') need encoding. Regular text, numbers, and most symbols are safe as-is."
            },
            {
              question: "When should I use CDATA instead of encoding?",
              answer: "Use CDATA for large blocks of text with many special characters (like code or HTML). Use encoding for short snippets or when CDATA isn't supported."
            },
            {
              question: "Can I encode all characters as numeric entities?",
              answer: "Yes, but it's verbose. &#60;hello&#62; works but is harder to read than &lt;hello&gt;. Use numeric entities mainly for non-ASCII characters."
            },
            {
              question: "Why does & need to be encoded?",
              answer: "& starts entity references in XML. An unencoded & looks like the start of an entity. Encode as &amp; to include a literal ampersand."
            },
            {
              question: "How do I handle non-ASCII characters?",
              answer: "UTF-8 encoded XML handles most characters directly. For special cases, use numeric entities like &#233; for é or &#x416; for Cyrillic Ж."
            },
            {
              question: "What happens if I don't encode special characters?",
              answer: "XML parsers will fail with errors like 'invalid character' or 'unexpected token'. The document becomes malformed and unreadable."
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
