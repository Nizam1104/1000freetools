export default function XmlSchemaXsdGeneratorSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This XSD generator analyzes your XML document and automatically creates an XML Schema Definition (XSD)
            that describes the structure, elements, attributes, and data types present in your XML.
          </p>
          <p className="text-muted-foreground">
            The generation process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Parse XML:</strong> Your XML document is parsed and its structure is analyzed.</li>
            <li><strong className="text-foreground">Infer types:</strong> Element and attribute values are analyzed to determine appropriate XSD data types (string, integer, date, etc.).</li>
            <li><strong className="text-foreground">Build schema structure:</strong> Complex types are created for nested elements. Sequences define element order.</li>
            <li><strong className="text-foreground">Generate XSD:</strong> A complete XSD file is output with proper namespaces, type definitions, and constraints.</li>
          </ol>
          <p className="text-muted-foreground">
            The generated schema can be used to validate other XML documents, document your XML structure,
            or serve as a starting point for manually refining constraints and adding documentation.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Documenting legacy XML formats",
              description: "Inherited an XML format with no documentation? Generate an XSD to understand and document the expected structure for your team."
            },
            {
              title: "Creating validation for API responses",
              description: "Your API returns XML and you need to validate it in downstream systems. Generate an XSD to use with XML validators in your pipeline."
            },
            {
              title: "Setting up XML editing in IDEs",
              description: "IDEs like Visual Studio and IntelliJ use XSD files for XML autocomplete and validation. Generate an XSD to enable these features."
            },
            {
              title: "Enforcing data contracts with partners",
              description: "Sharing XML data with external partners? Provide an XSD schema that defines exactly what structure and data types they should expect."
            },
            {
              title: "Migrating to stricter XML processing",
              description: "Moving from loose XML parsing to schema-validated processing? Generate an XSD as the first step toward formal validation."
            },
            {
              title: "Creating test data generators",
              description: "Tools can generate valid test XML from an XSD. Create a schema from your sample data, then use it to generate diverse test cases."
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
              caveat: "Inferred types may be too general",
              explanation: "The generator sees '2024-03-15' as a string, not a date. You may need to manually change types to xs:date, xs:integer, etc."
            },
            {
              caveat: "Optional vs required elements",
              explanation: "Based on a single sample, the generator can't know which elements are optional. Review minOccurs and maxOccurs attributes."
            },
            {
              caveat: "Pattern constraints aren't inferred",
              explanation: "If an element should match a specific pattern (like email format), you'll need to add xs:pattern restrictions manually."
            },
            {
              caveat: "Enumeration values need manual addition",
              explanation: "If an element only accepts specific values (like 'active' or 'inactive'), add xs:enumeration constraints after generation."
            },
            {
              caveat: "One sample may not represent all cases",
              explanation: "If your XML has optional elements or varying structures, provide multiple samples or manually adjust the generated schema."
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
              question: "What's the difference between XSD and DTD?",
              answer: "XSD (XML Schema Definition) is more powerful than DTD. XSD supports data types, namespaces, and is itself XML. DTD is older and less expressive."
            },
            {
              question: "Can I validate XML against the generated XSD?",
              answer: "Yes. Use any XSD-validating parser or online validator. The generated schema should validate the original XML that created it."
            },
            {
              question: "How are namespaces handled in the XSD?",
              answer: "The generator creates a targetNamespace for your schema. Elements in your XML should use this namespace for validation to work correctly."
            },
            {
              question: "What data types does the generator recognize?",
              answer: "Basic inference recognizes strings, integers, decimals, and booleans. Dates, times, and specialized types usually need manual adjustment."
            },
            {
              question: "Can I generate XSD from multiple XML samples?",
              answer: "Some tools support this. Multiple samples help infer optional elements and varying structures. Otherwise, merge samples manually first."
            },
            {
              question: "How do I add documentation to the XSD?",
              answer: "Add xs:annotation and xs:documentation elements to schema components. This provides human-readable descriptions for each element and type."
            },
            {
              question: "What if my XML has mixed content?",
              answer: "Mixed content (text and elements together) requires xs:complexType with mixed='true'. The generator may need manual adjustment for this case."
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
