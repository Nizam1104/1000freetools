export default function LineFilterSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This line filter processes text line-by-line, keeping only lines that match 
            (or don't match) a specified pattern - perfect for extracting relevant data from logs and text files.
          </p>
          <p className="text-muted-foreground">
            The filtering process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Line splitting:</strong> Input text is split into individual lines based on line break characters.</li>
            <li><strong className="text-foreground">Pattern matching:</strong> Each line is tested against the specified regex pattern or text filter.</li>
            <li><strong className="text-foreground">Filter operation:</strong> Lines are either kept (include mode) or removed (exclude mode) based on match results.</li>
            <li><strong className="text-foreground">Result assembly:</strong> Filtered lines are rejoined and presented as output.</li>
          </ol>
          <p className="text-muted-foreground">
            Line filtering is essential for log analysis, data extraction, and processing 
            large text files where you only need specific portions of the content.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Log File Analysis",
              description: "Extract error messages, warnings, or specific event types from application logs."
            },
            {
              title: "Data Extraction",
              description: "Pull specific records from CSV or structured text files based on content patterns."
            },
            {
              title: "Code Search",
              description: "Find lines containing specific patterns like TODO comments, function definitions, or imports."
            },
            {
              title: "Email Filtering",
              description: "Extract emails from mailing list archives that match certain criteria."
            },
            {
              title: "Report Generation",
              description: "Filter data exports to include only relevant rows for specific reports."
            },
            {
              title: "Debugging",
              description: "Isolate relevant debug output from verbose logging by filtering for specific patterns."
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
              caveat: "Large files may cause memory issues",
              explanation: "Processing very large files (100MB+) in the browser may cause performance problems. Use command-line tools for huge files."
            },
            {
              caveat: "Regex is powerful but complex",
              explanation: "Simple text matching works for basic filters. Regex enables complex patterns but requires understanding of regex syntax."
            },
            {
              caveat: "Case sensitivity matters",
              explanation: "ERROR won't match error unless case-insensitive mode is enabled. Choose the appropriate sensitivity for your use case."
            },
            {
              caveat: "Line order is preserved",
              explanation: "Filtered output maintains the original line order. For sorted output, apply sorting after filtering."
            },
            {
              caveat: "Empty lines may be included",
              explanation: "Empty lines don't match most patterns. Decide whether to keep or remove empty lines in output."
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
              question: "What's the difference between include and exclude mode?",
              answer: "Include mode keeps lines that match the pattern. Exclude mode removes lines that match. Use include to find specific content, exclude to remove unwanted content."
            },
            {
              question: "Can I use multiple filter patterns?",
              answer: "This tool handles one pattern at a time. For multiple patterns, chain multiple filter operations or use regex alternation (pattern1|pattern2)."
            },
            {
              question: "How do I match the start of a line?",
              answer: "Use ^ at the beginning of your pattern: ^ERROR matches lines starting with ERROR. Similarly, $ matches end of line."
            },
            {
              question: "Can I filter based on line numbers?",
              answer: "This tool filters by content. For line number-based filtering (every Nth line, lines X-Y), use different tools or scripts."
            },
            {
              question: "What about multi-line patterns?",
              answer: "Line filtering works on individual lines. For patterns spanning multiple lines, use different tools that support multi-line matching."
            },
            {
              question: "How do I count matching lines?",
              answer: "Filter first, then count the output lines. Many tools show line count automatically, or use wc -l on the output."
            },
            {
              question: "Can I save the filtered output?",
              answer: "Yes, copy the filtered results and save to a file, or use tools with direct file output for automated workflows."
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
