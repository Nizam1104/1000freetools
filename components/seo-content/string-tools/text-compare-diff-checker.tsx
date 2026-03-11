export default function TextCompareDiffCheckerSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This text compare and diff checker analyzes two text blocks and highlights the
            differences between them. It uses diff algorithms to identify additions, deletions,
            and modifications, displaying changes in an easy-to-understand format.
          </p>
          <p className="text-muted-foreground">
            The comparison process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Tokenize input:</strong> Both texts are split into comparable units (lines, words, or characters).</li>
            <li><strong className="text-foreground">Run diff algorithm:</strong> Uses algorithms like LCS (Longest Common Subsequence) to find differences efficiently.</li>
            <li><strong className="text-foreground">Classify changes:</strong> Each difference is categorized as addition, deletion, or modification.</li>
            <li><strong className="text-foreground">Display results:</strong> Side-by-side or inline view shows changes with color coding (green for additions, red for deletions).</li>
          </ol>
          <p className="text-muted-foreground">
            Options like "ignore whitespace" and "ignore case" allow flexible comparison
            based on your needs. Summary statistics show total changes at a glance.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Code Review",
              description: "Compare code versions to see exactly what changed between commits or branches."
            },
            {
              title: "Document Version Comparison",
              description: "Track changes between document drafts, contracts, or manuscript revisions."
            },
            {
              title: "Configuration File Auditing",
              description: "Identify what changed in config files between deployments or environments."
            },
            {
              title: "Plagiarism Detection",
              description: "Compare texts to identify copied content or unauthorized modifications."
            },
            {
              title: "Data Reconciliation",
              description: "Find discrepancies between data exports, CSV files, or database dumps."
            },
            {
              title: "Content Editing",
              description: "Review edits made by others or track changes in collaborative writing."
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
              caveat: "Line-by-line vs word-by-word differs",
              explanation: "Line diff shows changed lines. Word diff shows changed words within lines. Choose based on your content type."
            },
            {
              caveat: "Whitespace can be significant or not",
              explanation: "Code cares about indentation. Prose doesn't. Use 'ignore whitespace' option for text, keep it for code."
            },
            {
              caveat: "Large files may be slow",
              explanation: "Comparing very large texts (thousands of lines) takes time. Consider splitting large files."
            },
            {
              caveat: "Binary files won't work",
              explanation: "This tool compares text. Binary files (images, executables) need specialized binary diff tools."
            },
            {
              caveat: "Order matters for diff",
              explanation: "Original vs Modified shows what was removed and added. Reversing the order inverts the diff."
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
              question: "What do the colors mean?",
              answer: "Green/highlighted = additions (new in second text). Red/strikethrough = deletions (removed from first text). Unchanged = same in both."
            },
            {
              question: "How does 'ignore whitespace' work?",
              answer: "Treats multiple spaces as one, ignores leading/trailing spaces, and treats tabs as spaces. Useful for comparing prose."
            },
            {
              question: "Can I compare more than two texts?",
              answer: "This tool compares two texts. For multiple versions, compare sequentially or use version control systems like Git."
            },
            {
              question: "What's the difference between inline and side-by-side view?",
              answer: "Inline shows changes in a single column (deletions then additions). Side-by-side shows original left, modified right. Choose your preference."
            },
            {
              question: "How do I compare code files?",
              answer: "Use line-by-line diff, keep whitespace significant. For Git-style diffs, consider using git diff command directly."
            },
            {
              question: "Can this detect moved text?",
              answer: "Basic diff shows moved text as deletion + addition. Advanced tools can detect moves, but simple diff treats it as separate changes."
            },
            {
              question: "What algorithm does diff use?",
              answer: "Most use variations of LCS (Longest Common Subsequence) or Myers diff algorithm. These find the minimum edit distance efficiently."
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
