export default function XmlViewerEditorSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This XML viewer and editor provides a dual-pane interface with a collapsible tree
            view on one side and syntax-highlighted text editor on the other. It makes
            navigating and editing complex XML documents intuitive and efficient.
          </p>
          <p className="text-muted-foreground">
            The editing workflow:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Load XML:</strong> Paste or upload your XML document. It's parsed and displayed in both tree and text views.</li>
            <li><strong className="text-foreground">Navigate with tree:</strong> Expand/collapse nodes to explore the document structure visually.</li>
            <li><strong className="text-foreground">Edit in either view:</strong> Changes in the tree or text editor sync automatically with real-time validation.</li>
            <li><strong className="text-foreground">Validate and export:</strong> Built-in validation catches errors. Download the edited XML when finished.</li>
          </ol>
          <p className="text-muted-foreground">
            Features like search, XPath queries, and line numbers make working with large
            XML files manageable. The tree view shows element hierarchy at a glance.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Editing Configuration Files",
              description: "Modify XML config files for applications, servers, or development tools with visual structure guidance."
            },
            {
              title: "Debugging API Responses",
              description: "Inspect and modify XML API responses to understand structure and test different values."
            },
            {
              title: "Working with SOAP Messages",
              description: "View and edit SOAP envelopes with complex nested structures and namespaces."
            },
            {
              title: "Creating Test Data",
              description: "Build XML test fixtures with proper structure for unit tests and integration testing."
            },
            {
              title: "Learning XML Structure",
              description: "Understand document hierarchy and relationships through the visual tree representation."
            },
            {
              title: "Validating XML Documents",
              description: "Check XML for syntax errors, unclosed tags, and structural issues before using in production."
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
              caveat: "Changes aren't auto-saved",
              explanation: "This runs in your browser. Copy your work or download before navigating away. Refresh loses unsaved changes."
            },
            {
              caveat: "Very large files may be slow",
              explanation: "Documents with thousands of nodes may cause performance issues in the tree view. Consider splitting large files."
            },
            {
              caveat: "Validation is syntax-only",
              explanation: "The tool checks well-formedness but doesn't validate against XSD schemas. Schema validation requires additional tools."
            },
            {
              caveat: "Tree and text views sync",
              explanation: "Editing in one view updates the other. Invalid XML in text view may temporarily break the tree until fixed."
            },
            {
              caveat: "Namespaces are preserved",
              explanation: "The editor maintains namespace declarations and prefixes. Be careful when editing prefixed elements."
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
              question: "Can I edit XML with namespaces?",
              answer: "Yes! The editor preserves namespace declarations and handles prefixed elements correctly. Just be careful not to break namespace references."
            },
            {
              question: "How do I search for specific elements?",
              answer: "Use the search function to find text anywhere in the document. Some editors also support XPath queries for structural searches."
            },
            {
              question: "Can I format/pretty-print my XML?",
              answer: "Yes, use the format/beautify function to add proper indentation and line breaks. Makes XML much more readable."
            },
            {
              question: "What happens if I create invalid XML?",
              answer: "Real-time validation highlights errors like unclosed tags or invalid characters. Fix errors before the tree view can display properly."
            },
            {
              question: "Can I collapse all nodes at once?",
              answer: "Most XML viewers have 'collapse all' and 'expand all' buttons for quickly changing the tree view density."
            },
            {
              question: "How do I add new elements?",
              answer: "In text view, just type. In tree view, right-click a node and select 'add child' or similar. Both methods sync automatically."
            },
            {
              question: "Can I view binary XML files?",
              answer: "No, this editor handles text-based XML. Binary XML formats require specialized tools to decode first."
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
