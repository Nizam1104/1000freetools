export default function WhitespaceNormalizerSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This whitespace normalizer cleans up inconsistent spacing in text, converting 
            multiple spaces, tabs, and line breaks into consistent, predictable whitespace.
          </p>
          <p className="text-muted-foreground">
            The normalization process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Whitespace detection:</strong> All whitespace characters are identified - spaces, tabs, newlines, carriage returns, and Unicode whitespace.</li>
            <li><strong className="text-foreground">Collapse operation:</strong> Consecutive whitespace characters are collapsed into single spaces (or your chosen separator).</li>
            <li><strong className="text-foreground">Trim operation:</strong> Leading and trailing whitespace is removed from the text and optionally from each line.</li>
            <li><strong className="text-foreground">Line normalization:</strong> Line endings are standardized (LF, CRLF, or CR) for consistent cross-platform handling.</li>
          </ol>
          <p className="text-muted-foreground">
            Clean, consistent whitespace improves text processing, search accuracy, 
            and data quality in applications that handle user-generated content.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "User Input Cleaning",
              description: "Normalize text from form inputs before storage to prevent whitespace-related issues."
            },
            {
              title: "Search Index Preparation",
              description: "Clean text before indexing so searches match regardless of whitespace variations."
            },
            {
              title: "Data Import Standardization",
              description: "Normalize whitespace in imported data for consistent processing and comparison."
            },
            {
              title: "Code Formatting",
              description: "Clean up inconsistent indentation and spacing in code snippets."
            },
            {
              title: "Content Publishing",
              description: "Ensure published content has consistent spacing for professional appearance."
            },
            {
              title: "Text Comparison",
              description: "Normalize text before comparison to ignore insignificant whitespace differences."
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
              caveat: "Some whitespace is significant",
              explanation: "In code (Python indentation), formatted text (poetry), and data (fixed-width formats), whitespace has meaning. Don't normalize blindly."
            },
            {
              caveat: "Multiple spaces may be intentional",
              explanation: "Some text uses multiple spaces for alignment or emphasis. Normalization removes these intentional spacings."
            },
            {
              caveat: "Non-breaking spaces are special",
              explanation: "Unicode non-breaking spaces ( ) prevent line breaks. Normalizing them to regular spaces may affect text layout."
            },
            {
              caveat: "Line breaks have meaning",
              explanation: "Paragraph breaks, list items, and structured text rely on line breaks. Choose normalization options carefully."
            },
            {
              caveat: "Tabs vs spaces debate",
              explanation: "Code formatting often has strong preferences for tabs vs spaces. Know your context before normalizing."
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
              question: "What's the difference between trimming and normalizing?",
              answer: "Trimming removes leading/trailing whitespace. Normalizing also collapses internal multiple spaces into single spaces. Use both for clean text."
            },
            {
              question: "Should I preserve paragraph breaks?",
              answer: "For prose, yes - normalize within paragraphs but preserve blank lines between them. For single-line inputs, remove all line breaks."
            },
            {
              question: "What about whitespace in strings?",
              answer: "In programming, string literals may intentionally contain specific whitespace. Only normalize user input, not code."
            },
            {
              question: "How do I handle tabs?",
              answer: "Options: convert to spaces (specify how many), convert to single space, or preserve. Depends on your use case."
            },
            {
              question: "What's a zero-width space?",
              answer: "Unicode character U+200B that's invisible but affects text processing. Often appears in copied web text. Should typically be removed."
            },
            {
              question: "Why does copied text have weird whitespace?",
              answer: "Web pages use various Unicode whitespace characters for formatting. Copying brings these along. Normalization cleans them up."
            },
            {
              question: "Should I normalize before or after validation?",
              answer: "Normalize first, then validate. Users shouldn't fail validation due to extra spaces. Clean input, then check content."
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
