export default function PatternExtractorSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This pattern extractor finds and extracts all text matching a regex pattern, 
            collecting specific data from larger text documents.
          </p>
          <p className="text-muted-foreground">
            The extraction process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Pattern definition:</strong> A regex pattern specifies what data to extract.</li>
            <li><strong className="text-foreground">Text scanning:</strong> The entire input is scanned for all pattern matches.</li>
            <li><strong className="text-foreground">Match collection:</strong> Each match is recorded with its content, position, and captured groups.</li>
            <li><strong className="text-foreground">Result presentation:</strong> Extracted data is displayed in a list, optionally with context and metadata.</li>
          </ol>
          <p className="text-muted-foreground">
            Pattern extraction is essential for data mining, information retrieval, 
            and automated data collection from unstructured text.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Email Extraction",
              description: "Collect all email addresses from documents, web pages, or text files."
            },
            {
              title: "Phone Number Collection",
              description: "Extract phone numbers from contact pages, documents, or databases."
            },
            {
              title: "Link Harvesting",
              description: "Extract all URLs from HTML content or text documents."
            },
            {
              title: "Data Mining",
              description: "Collect specific data patterns from large text corpora for analysis."
            },
            {
              title: "Log Analysis",
              description: "Extract error codes, timestamps, or IP addresses from log files."
            },
            {
              title: "Content Analysis",
              description: "Extract keywords, mentions, or specific patterns for content auditing."
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
              caveat: "Extraction isn't validation",
              explanation: "Extracted data matches the pattern but may not be valid (e.g., formatted like an email but not a real address)."
            },
            {
              caveat: "Context may be important",
              explanation: "Extracted data without context may be meaningless. Some tools show surrounding text for verification."
            },
            {
              caveat: "Duplicates may occur",
              explanation: "The same data appearing multiple times will be extracted multiple times. Deduplicate if needed."
            },
            {
              caveat: "Captured groups provide structure",
              explanation: "Use capturing groups to extract structured data (area code, number, extension for phones)."
            },
            {
              caveat: "Large texts may produce many results",
              explanation: "Broad patterns on large texts can extract thousands of matches. Use specific patterns for targeted extraction."
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
              question: "What's the best pattern for email extraction?",
              answer: "Basic: /\\b[\\w.-]+@[\\w.-]+\\.[\\w]{2,}\\b/. More comprehensive patterns exist but this catches most valid emails."
            },
            {
              question: "How do I extract with context?",
              answer: "Include surrounding text in your pattern or use tools that show context. Pattern like /.{20}pattern.{20}/ shows 20 chars around."
            },
            {
              question: "Can I extract to a file?",
              answer: "Copy extracted results and save to file, or use tools with direct export functionality (CSV, TXT, JSON)."
            },
            {
              question: "How do I extract unique values only?",
              answer: "Use a Set or unique filter on results. Some tools have built-in deduplication options."
            },
            {
              question: "What about nested or overlapping patterns?",
              answer: "Standard extraction finds non-overlapping matches. For overlapping, use lookahead patterns or specialized tools."
            },
            {
              question: "Can I extract from multiple files?",
              answer: "Process files one at a time or use command-line tools (grep, ripgrep) for batch extraction across files."
            },
            {
              question: "How do I verify extracted data?",
              answer: "Spot-check samples against source. For critical data, implement additional validation beyond pattern matching."
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
