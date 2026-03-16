export default function XmlEntityEncoderSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This XML entity encoder converts special characters in text to their XML entity
            equivalents, making the text safe to include in XML documents. It prevents parsing
            errors and security issues like XML injection.
          </p>
          <p className="text-muted-foreground">
            The encoding process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Identify special characters:</strong> Find characters with special meaning in XML: &lt;, &gt;, &, ", '.</li>
            <li><strong className="text-foreground">Replace with entities:</strong> Replace each with its entity: & becomes &amp;amp;, &lt; becomes &amp;lt;, etc.</li>
            <li><strong className="text-foreground">Handle Unicode:</strong> Optionally encode non-ASCII characters as numeric entities (&#128512; for emoji).</li>
            <li><strong className="text-foreground">Output safe XML:</strong> Result is text that can be safely embedded in XML without breaking structure.</li>
          </ol>
          <p className="text-muted-foreground">
            Decoding reverses this process, converting entities back to their original characters.
            This is essential when reading XML content that was previously encoded.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Generating XML Documents",
              description: "Encode user-provided content before inserting it into XML templates or feeds."
            },
            {
              title: "Creating RSS/Atom Feeds",
              description: "Ensure post titles and descriptions with special characters don't break feed XML."
            },
            {
              title: "XML Configuration Files",
              description: "Safely include special characters in config values without breaking XML parsing."
            },
            {
              title: "Preventing XML Injection",
              description: "Sanitize untrusted input before including it in XML to prevent injection attacks."
            },
            {
              title: "Debugging XML Issues",
              description: "Decode XML entities to see the actual content when troubleshooting parsing errors."
            },
            {
              title: "Data Export/Import",
              description: "Encode data for XML export, decode when importing from XML sources."
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
              caveat: "Don't double-encode",
              explanation: "Encoding already-encoded text creates &amp;amp; instead of &amp;. Only encode raw text, not content that's already in XML."
            },
            {
              caveat: "Five characters must always be encoded",
              explanation: "& (ampersand), < (less-than), > (greater-than), \" (quote), ' (apostrophe). These have special meaning in XML."
            },
            {
              caveat: "Context matters for quotes",
              explanation: "Quotes only need encoding inside attribute values. In element text content, they're optional but safe to encode."
            },
            {
              caveat: "Numeric entities for special characters",
              explanation: "Characters like emoji can be encoded as &#128512; (decimal) or &#x1F600; (hex). Useful for systems with encoding limitations."
            },
            {
              caveat: "CDATA sections avoid encoding",
              explanation: "Wrap content in <![CDATA[...]]> to include raw text without encoding. But CDATA can't contain ]]> sequence."
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
              question: "What's the difference between named and numeric entities?",
              answer: "Named entities use names like &amp;lt;. Numeric use code points like &#60; or &#x3C;. Named are more readable; numeric work for any Unicode character."
            },
            {
              question: "Do I need to encode everything?",
              answer: "Only the five special characters (&, <, >, \", '). Regular text, numbers, and most punctuation don't need encoding."
            },
            {
              question: "What about encoding in attributes vs element content?",
              answer: "In attributes, always encode quotes. In element content, quotes are optional. Always encode &, <, and > in both contexts."
            },
            {
              question: "Can I use HTML entities in XML?",
              answer: "Only five are predefined in XML: &amp;lt;, &amp;gt;, &amp;amp;, &amp;quot;, &amp;apos;. HTML has many more, but they require DTD declaration in XML."
            },
            {
              question: "How do I handle ampersands in URLs within XML?",
              answer: "Encode them as &amp;amp;! A URL like ?a=1&b=2 becomes ?a=1&amp;amp;b=2 in XML. This is a common source of XML errors."
            },
            {
              question: "What's CDATA and when should I use it?",
              answer: "CDATA sections (<![CDATA[raw text]]>) let you include unencoded text. Great for code samples or content with many special characters."
            },
            {
              question: "Why does my XML parser complain about entity errors?",
              answer: "Common causes: unencoded &, using undefined named entities, or malformed entity syntax (&name without semicolon). Check these first."
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
