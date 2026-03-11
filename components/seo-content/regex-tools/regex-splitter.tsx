export default function RegexSplitterSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This regex splitter divides text into parts based on a pattern, enabling 
            sophisticated text parsing beyond simple character delimiters.
          </p>
          <p className="text-muted-foreground">
            The splitting process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Pattern definition:</strong> A regex pattern defines where splits should occur (not what to split).</li>
            <li><strong className="text-foreground">Pattern matching:</strong> All occurrences of the pattern are found in the input text.</li>
            <li><strong className="text-foreground">Text division:</strong> The text is split at each pattern match, removing the matched content.</li>
            <li><strong className="text-foreground">Result collection:</strong> Split parts are collected into an array, optionally including or excluding empty results.</li>
          </ol>
          <p className="text-muted-foreground">
            Regex splitting is more powerful than simple string splitting, allowing 
            splits on complex patterns like multiple delimiters or variable whitespace.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "CSV Parsing",
              description: "Split on commas while handling quoted fields and escaped delimiters."
            },
            {
              title: "Log File Parsing",
              description: "Split log entries by timestamp patterns or structured delimiters."
            },
            {
              title: "Natural Language Processing",
              description: "Split text into sentences or tokens using punctuation patterns."
            },
            {
              title: "Data Extraction",
              description: "Parse structured text by splitting on known patterns to extract fields."
            },
            {
              title: "Code Tokenization",
              description: "Split source code into tokens based on operators, whitespace, and delimiters."
            },
            {
              title: "Multi-Delimiter Splitting",
              description: "Split on multiple possible delimiters (comma, semicolon, tab) in one operation."
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
              caveat: "The pattern defines split points, not content",
              explanation: "Split pattern matches what to remove, not what to keep. Split on comma keeps the data between commas."
            },
            {
              caveat: "Empty results may occur",
              explanation: "Consecutive delimiters create empty strings. Decide whether to keep or filter empty results."
            },
            {
              caveat: "Capturing groups affect output",
              explanation: "Some languages include captured groups in split results. Others don't. Know your language's behavior."
            },
            {
              caveat: "Zero-width matches split every position",
              explanation: "Patterns like ^ or \\b match positions, not characters. Splitting on them creates many small pieces."
            },
            {
              caveat: "Trailing empty strings may be removed",
              explanation: "Many split functions remove trailing empty strings by default. Check if you need to preserve them."
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
              question: "How do I split on multiple delimiters?",
              answer: "Use alternation: /[,;\\t]/ splits on comma, semicolon, or tab. /[,;\\t]+ splits on one or more of any of these."
            },
            {
              question: "How do I split on whitespace?",
              answer: "Use /\\s+/ to split on any whitespace (spaces, tabs, newlines). The + ensures multiple spaces count as one split."
            },
            {
              question: "Can I split and keep the delimiters?",
              answer: "Standard split removes delimiters. To keep them, use match instead of split, or use capturing groups (behavior varies by language)."
            },
            {
              question: "How do I split CSV properly?",
              answer: "Regex split doesn't handle quoted CSV fields well. Use a proper CSV parser for production. Simple regex: /,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/"
            },
            {
              question: "What's the difference between split and match?",
              answer: "Split returns text BETWEEN matches. Match returns the matches themselves. Use split to get content, match to get delimiters."
            },
            {
              question: "How do I limit the number of splits?",
              answer: "Many split functions accept a limit parameter: split(pattern, limit). This returns at most N pieces."
            },
            {
              question: "Why am I getting empty strings in results?",
              answer: "Consecutive delimiters or delimiters at start/end create empty strings. Filter them out if not needed: results.filter(s => s.length > 0)"
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
