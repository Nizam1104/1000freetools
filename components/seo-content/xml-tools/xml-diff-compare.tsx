export default function XmlDiffCompareSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This XML diff tool compares two XML documents and highlights the differences between them.
            It uses tree-based comparison algorithms to detect added, removed, and modified elements,
            attributes, and text content.
          </p>
          <p className="text-muted-foreground">
            The comparison process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Parse both XML files:</strong> Each document is parsed into a DOM tree structure.</li>
            <li><strong className="text-foreground">Normalize (optional):</strong> Whitespace, comments, and formatting can be ignored for content-focused comparison.</li>
            <li><strong className="text-foreground">Tree traversal:</strong> Both trees are traversed simultaneously, comparing nodes at each level.</li>
            <li><strong className="text-foreground">Highlight differences:</strong> Changes are color-coded: additions in green, deletions in red, modifications highlighted.</li>
          </ol>
          <p className="text-muted-foreground">
            The tool handles structural changes like moved elements and can compare documents with different
            formatting or indentation. Side-by-side or unified view options help you spot changes quickly.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Reviewing configuration file changes",
              description: "Your team updated the application config.xml. Compare the old and new versions to see exactly what settings changed before deploying."
            },
            {
              title: "Debugging API response differences",
              description: "An API started returning different XML responses. Compare working and broken responses to identify what changed in the data structure."
            },
            {
              title: "Tracking document version changes",
              description: "Legal or technical documents stored as XML need version tracking. Compare revisions to see what text was added, removed, or modified."
            },
            {
              title: "Validating XSLT transformation output",
              description: "After updating an XSLT stylesheet, compare the old and new output to ensure the transformation still produces correct results."
            },
            {
              title: "Merging conflicting XML edits",
              description: "Two team members edited the same XML file. Compare both versions to understand the conflicts before manually merging changes."
            },
            {
              title: "Auditing database export changes",
              description: "Weekly XML exports from your database need auditing. Compare this week's export to last week's to spot unexpected data changes."
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
              caveat: "Element order matters in comparison",
              explanation: "Most XML diff tools consider element order. The same elements in different order may show as deletions and additions rather than moves."
            },
            {
              caveat: "Whitespace handling affects results",
              explanation: "Ignoring whitespace is usually best for content comparison. But if whitespace is significant (like in formatted text), don't ignore it."
            },
            {
              caveat: "Namespace prefixes may differ",
              explanation: "Different namespace prefixes (ns1:elem vs ns2:elem) with the same namespace URI are semantically identical but may show as different."
            },
            {
              caveat: "Attribute order doesn't matter",
              explanation: "XML attributes are unordered. <elem a='1' b='2'/> and <elem b='2' a='1'/> are identical and shouldn't show as different."
            },
            {
              caveat: "Large files may be slow",
              explanation: "Tree comparison is computationally intensive. Files over 10MB may take noticeable time to compare, especially in browsers."
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
              question: "Can this compare XML files of different sizes?",
              answer: "Yes. The tool handles files of any size. One file can be much larger than the other—the diff will show all additions or deletions."
            },
            {
              question: "Does it show moved elements or just add/delete?",
              answer: "Basic diff shows moves as delete+add. Advanced algorithms can detect moves, but this depends on the specific implementation."
            },
            {
              question: "Can I ignore comments in the comparison?",
              answer: "Yes, most XML diff tools have an option to ignore comments. This is useful when comments are added for documentation but don't affect functionality."
            },
            {
              question: "How are attribute changes displayed?",
              answer: "Changed attributes are typically shown with old and new values. Added or removed attributes are highlighted separately from element changes."
            },
            {
              question: "Can I export the diff results?",
              answer: "Some tools let you export diff reports as HTML, XML, or text. This is useful for sharing results or including in documentation."
            },
            {
              question: "What's the difference between side-by-side and unified view?",
              answer: "Side-by-side shows both files next to each other with synchronized scrolling. Unified view shows both files in one scrollable area like git diff."
            },
            {
              question: "Can this handle invalid XML?",
              answer: "No. Both files must be well-formed XML. Invalid XML will fail to parse and cannot be compared. Fix syntax errors first."
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
