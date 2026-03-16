export default function MatchCounterSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This regex match counter finds and counts all occurrences of a pattern in text, 
            providing quick quantification of pattern frequency.
          </p>
          <p className="text-muted-foreground">
            The counting process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Pattern compilation:</strong> The regex pattern is compiled with specified flags (global, case-insensitive, etc.).</li>
            <li><strong className="text-foreground">Text scanning:</strong> The entire text is scanned for all non-overlapping matches of the pattern.</li>
            <li><strong className="text-foreground">Match enumeration:</strong> Each match is recorded with its position and content.</li>
            <li><strong className="text-foreground">Count aggregation:</strong> Total count is calculated along with optional statistics like match density.</li>
          </ol>
          <p className="text-muted-foreground">
            Counting pattern occurrences is useful for text analysis, quality assurance, 
            content auditing, and understanding data distribution.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Word Frequency Analysis",
              description: "Count occurrences of specific words or phrases in documents for content analysis."
            },
            {
              title: "Code Quality Metrics",
              description: "Count TODO comments, console.log statements, or code patterns for quality assessment."
            },
            {
              title: "SEO Keyword Density",
              description: "Measure how often target keywords appear in content for SEO optimization."
            },
            {
              title: "Data Validation",
              description: "Verify expected counts of patterns (e.g., exactly one email per record)."
            },
            {
              title: "Log Analysis",
              description: "Count error occurrences, specific events, or patterns in log files."
            },
            {
              title: "Content Auditing",
              description: "Count instances of specific terms for compliance or style guide adherence."
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
              caveat: "Overlapping matches aren't counted",
              explanation: "Standard regex finds non-overlapping matches. Pattern 'aa' in 'aaa' finds 1 match, not 2. Use lookahead for overlapping counts."
            },
            {
              caveat: "Case sensitivity affects counts",
              explanation: "'the' and 'The' are different without case-insensitive flag. Choose the appropriate sensitivity for accurate counts."
            },
            {
              caveat: "Word boundaries matter",
              explanation: "'cat' matches in 'category' without word boundaries. Use \\bcat\\b to match whole words only."
            },
            {
              caveat: "Whitespace patterns can be tricky",
              explanation: "'\\s+' matches any whitespace run as one match. Counting spaces individually requires different patterns."
            },
            {
              caveat: "Large texts may be slow",
              explanation: "Very large texts with complex patterns may take time to process. Simple patterns on large texts are usually fast."
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
              question: "How do I count overlapping matches?",
              answer: "Use lookahead: (?=pattern) finds overlapping matches. For 'aa' in 'aaa', use (?=aa) to find 2 matches instead of 1."
            },
            {
              question: "Can I count multiple patterns at once?",
              answer: "Use alternation: (pattern1|pattern2|pattern3) counts all patterns together. For separate counts, run multiple searches."
            },
            {
              question: "How do I count unique matches?",
              answer: "Extract all matches, then count unique values. Some tools have built-in unique count options."
            },
            {
              question: "What's match density?",
              answer: "Matches per unit of text (e.g., per 1000 characters). Useful for comparing pattern frequency across texts of different lengths."
            },
            {
              question: "Can I count lines containing matches?",
              answer: "Yes, count lines where pattern appears at least once. This differs from total match count if lines can have multiple matches."
            },
            {
              question: "How do I count words in text?",
              answer: "Use \\b\\w+\\b pattern to match words. This counts sequences of word characters separated by boundaries."
            },
            {
              question: "Why is my count different from expected?",
              answer: "Check case sensitivity, word boundaries, and overlapping matches. These are common causes of count discrepancies."
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
