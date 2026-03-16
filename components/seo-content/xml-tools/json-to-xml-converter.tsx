export default function JsonToXmlConverterSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This JSON to XML converter transforms JSON objects into valid XML documents.
            It handles nested objects, arrays, and primitive values, creating well-formed
            XML suitable for systems that require XML input.
          </p>
          <p className="text-muted-foreground">
            The conversion process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Parse JSON:</strong> The input JSON is parsed into a JavaScript object structure.</li>
            <li><strong className="text-foreground">Create root element:</strong> A root XML element is created (customizable name).</li>
            <li><strong className="text-foreground">Transform recursively:</strong> Each JSON key becomes an XML element. Nested objects become child elements.</li>
            <li><strong className="text-foreground">Handle arrays:</strong> Array items become repeated elements with the same name, or wrapped in a parent element.</li>
          </ol>
          <p className="text-muted-foreground">
            The converter handles edge cases like special characters (automatically escaped),
            null values, and mixed content. Options let you customize the output structure.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Legacy System Integration",
              description: "Convert modern JSON API responses to XML for integration with older systems that only accept XML."
            },
            {
              title: "SOAP API Requests",
              description: "Transform JSON data into XML format required for SOAP web service calls."
            },
            {
              title: "Configuration File Generation",
              description: "Create XML configuration files from JSON settings or templates."
            },
            {
              title: "Data Export Compliance",
              description: "Generate XML exports when regulations or partners require XML format."
            },
            {
              title: "Testing XML Parsers",
              description: "Generate test XML data from JSON fixtures for XML parser testing."
            },
            {
              title: "Feed Generation",
              description: "Convert JSON content data to XML for RSS, Atom, or other XML-based feed formats."
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
              caveat: "JSON to XML isn't perfectly reversible",
              explanation: "XML has features (attributes, namespaces) that JSON doesn't. Conversion loses some XML-specific information."
            },
            {
              caveat: "Array handling varies",
              explanation: "Arrays can become repeated elements or wrapped elements. Choose based on what the receiving system expects."
            },
            {
              caveat: "Root element name matters",
              explanation: "Some systems expect specific root element names. Customize this to match your target system's requirements."
            },
            {
              caveat: "Special characters are escaped",
              explanation: "Characters like &, <, > are automatically encoded as XML entities. This is correct behavior for valid XML."
            },
            {
              caveat: "Null values need handling",
              explanation: "JSON null can become empty element, element with nil attribute, or be omitted. Choose based on your schema."
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
              question: "How are JSON arrays converted to XML?",
              answer: "Typically as repeated elements: [1,2,3] becomes <item>1</item><item>2</item><item>3</item>. Some converters add a wrapper element."
            },
            {
              question: "Can I add attributes to the XML output?",
              answer: "Some converters support special JSON keys that become attributes (like @id). Check the tool's convention for attribute syntax."
            },
            {
              question: "What happens to nested objects?",
              answer: "They become nested XML elements. {a: {b: 1}} becomes <a><b>1</b></a>. Structure is preserved."
            },
            {
              question: "How are numbers and booleans handled?",
              answer: "They become text content in XML elements. XML doesn't distinguish types - <true> and <123> are both strings."
            },
            {
              question: "Can I convert JSON with special characters?",
              answer: "Yes! Characters like &, <, > are automatically escaped as XML entities. The output is valid XML."
            },
            {
              question: "What root element name should I use?",
              answer: "Depends on your target system. Common choices: 'root', 'data', or domain-specific names like 'order', 'user', etc."
            },
            {
              question: "Is the conversion lossless?",
              answer: "Data-wise, yes. But XML has features (attributes, namespaces, mixed content) that can't be represented in pure JSON."
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
