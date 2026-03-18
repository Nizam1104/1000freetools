export default function XmlFormatterValidatorSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This XML formatter and validator parses your XML code and restructures it with consistent indentation and line breaks.
            It simultaneously checks for well-formedness, ensuring your XML follows W3C standards.
          </p>
          <p className="text-muted-foreground">
            The formatting process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Parse XML:</strong> Your input is parsed into a DOM tree structure, validating syntax as it goes.</li>
            <li><strong className="text-foreground">Validate structure:</strong> The parser checks for proper tag matching, attribute syntax, and entity usage.</li>
            <li><strong className="text-foreground">Reformat output:</strong> The tree is serialized back to text with consistent indentation (2 or 4 spaces, or tabs).</li>
            <li><strong className="text-foreground">Report errors:</strong> Any syntax errors are reported with line and column numbers for easy fixing.</li>
          </ol>
          <p className="text-muted-foreground">
            The validator catches common errors like unclosed tags, mismatched quotes, invalid characters,
            and malformed entity references. Error messages point to the exact location of problems.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Reading minified XML from logs",
              description: "Application logs often contain single-line XML for brevity. Format it to actually read and understand what's in there."
            },
            {
              title: "Fixing XML syntax errors",
              description: "Getting a parse error but can't spot the problem? The validator highlights exactly where the syntax breaks."
            },
            {
              title: "Preparing XML for code review",
              description: "Before submitting XML changes for review, format them consistently. Reviewers can focus on content, not wrestling with indentation."
            },
            {
              title: "Cleaning up hand-edited XML",
              description: "After manually editing complex XML, run it through the formatter to fix any accidental indentation inconsistencies."
            },
            {
              title: "Debugging API responses",
              description: "XML API responses are often compact. Format them in your browser to inspect the structure and values during debugging."
            },
            {
              title: "Validating XML before processing",
              description: "Before feeding XML to your application, validate it first. Catch errors early instead of dealing with cryptic runtime failures."
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
              caveat: "Well-formed vs valid XML",
              explanation: "Well-formed means correct syntax (matching tags, proper nesting). Valid means it also conforms to a schema (XSD or DTD). This tool checks well-formedness."
            },
            {
              caveat: "Comments and processing instructions are preserved",
              explanation: "XML comments (<!-- -->) and processing instructions (<?target?>) are kept during formatting. They're part of the document structure."
            },
            {
              caveat: "CDATA sections maintain content exactly",
              explanation: "Content inside <![CDATA[...]]> is not formatted or escaped. It's preserved byte-for-byte as written."
            },
            {
              caveat: "Attribute order may change",
              explanation: "XML attributes are unordered. The formatter may output them in a different order—this doesn't affect the document's meaning."
            },
            {
              caveat: "Whitespace in text content is preserved",
              explanation: "Significant whitespace inside elements (like in formatted text or code) is preserved. Only ignorable whitespace between elements is normalized."
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
              question: "What makes XML 'well-formed'?",
              answer: "Well-formed XML has: one root element, properly nested tags, quoted attributes, escaped special characters, and valid character encoding."
            },
            {
              question: "How is this different from XML validation against a schema?",
              answer: "This checks syntax only (well-formedness). Schema validation checks if elements and attributes match a predefined structure and data types."
            },
            {
              question: "Can this fix my broken XML automatically?",
              answer: "No, it only formats valid XML. Broken XML needs manual fixes. The error messages help you locate and understand what to fix."
            },
            {
              question: "Does formatting change the XML meaning?",
              answer: "No. Formatting only adds/removes whitespace between elements. The parsed document tree is identical before and after formatting."
            },
            {
              question: "What indentation style should I use?",
              answer: "2 spaces is common for config files. 4 spaces is traditional for documents. Tabs are fine for internal tools. Consistency matters most."
            },
            {
              question: "Can I format partial XML fragments?",
              answer: "Most formatters need a complete document with one root. Wrap fragments in a temporary root element, format, then extract the content."
            },
            {
              question: "Why does my formatted XML look different from the original?",
              answer: "Formatting normalizes whitespace. Line breaks and indentation between elements are adjusted for consistency. Text content inside elements stays the same."
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
