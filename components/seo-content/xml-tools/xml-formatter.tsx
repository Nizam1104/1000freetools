export default function XmlFormatterSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This XML formatter (beautifier) takes compact or messy XML and adds proper
            indentation, line breaks, and spacing to make it human-readable. It's the opposite
            of minification - trading size for readability.
          </p>
          <p className="text-muted-foreground">
            The formatting process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Parse XML:</strong> The input is parsed to understand the document structure regardless of current formatting.</li>
            <li><strong className="text-foreground">Calculate depth:</strong> Each element's nesting level determines its indentation amount.</li>
            <li><strong className="text-foreground">Apply formatting:</strong> Add consistent indentation (typically 2 or 4 spaces) and line breaks between elements.</li>
            <li><strong className="text-foreground">Output formatted XML:</strong> Result is clean, consistently formatted XML that's easy to read and edit.</li>
          </ol>
          <p className="text-muted-foreground">
            Formatting is essential for debugging, code review, and any situation where humans
            need to read or modify XML. It makes structure and hierarchy immediately visible.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Debugging XML Issues",
              description: "Format minified or compacted XML to understand its structure and locate problems."
            },
            {
              title: "Code Review Preparation",
              description: "Format XML before submitting for review so others can easily read and understand changes."
            },
            {
              title: "API Response Inspection",
              description: "Beautify XML API responses for easier analysis during development and testing."
            },
            {
              title: "Documentation Examples",
              description: "Format XML code samples for documentation, tutorials, or presentations."
            },
            {
              title: "Configuration File Editing",
              description: "Format config files before manual editing to make structure clear and prevent errors."
            },
            {
              title: "Learning XML Structure",
              description: "See how nested elements relate to each other through clear visual indentation."
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
              caveat: "Formatting increases file size significantly",
              explanation: "Don't use formatted XML in production where size matters. Format for development, minify for deployment."
            },
            {
              caveat: "Indentation style is a preference",
              explanation: "2 spaces, 4 spaces, or tabs - all are valid. Choose based on your project's style guide or personal preference."
            },
            {
              caveat: "Some content whitespace is preserved",
              explanation: "Text content with intentional whitespace is preserved. But xml:space='preserve' handling varies by formatter."
            },
            {
              caveat: "Invalid XML can't be formatted",
              explanation: "The XML must be well-formed first. Fix syntax errors before formatting will work."
            },
            {
              caveat: "Comments and processing instructions are preserved",
              explanation: "Good formatters maintain comments, XML declarations, and processing instructions in appropriate positions."
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
              question: "What indentation should I use - spaces or tabs?",
              answer: "Spaces are more consistent across editors. 2 spaces is common for XML. But follow your project's existing style guide."
            },
            {
              question: "Does formatting change the XML data?",
              answer: "No! Formatting only adds whitespace between tokens. Parsers ignore this whitespace, so the data is identical."
            },
            {
              question: "Can I format invalid XML?",
              answer: "No, the XML must be well-formed first. Fix syntax errors like unclosed tags before formatting will work."
            },
            {
              question: "How do I format XML in my code editor?",
              answer: "Most IDEs have built-in XML formatting (Ctrl+Shift+I or similar). Or use online formatters like this one for quick tasks."
            },
            {
              question: "What about attributes - do they get formatted?",
              answer: "Attributes stay on the element's opening tag. Some formatters put each attribute on its own line for elements with many attributes."
            },
            {
              question: "Can I format minified XML?",
              answer: "Yes! That's a common use case. Take single-line minified XML and format it to understand the structure."
            },
            {
              question: "Should formatted XML be used in production?",
              answer: "Generally no. Use minified XML in production for smaller size and faster parsing. Format only for development and debugging."
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
