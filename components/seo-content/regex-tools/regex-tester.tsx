export default function RegexTesterSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This regex tester lets you experiment with regular expression patterns against 
            sample text, showing matches in real-time with detailed breakdowns.
          </p>
          <p className="text-muted-foreground">
            The testing process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Pattern input:</strong> Enter your regex pattern with optional flags (global, case-insensitive, multiline).</li>
            <li><strong className="text-foreground">Test text:</strong> Provide sample text to search for pattern matches.</li>
            <li><strong className="text-foreground">Match execution:</strong> The regex engine finds all matches, highlighting them in the text.</li>
            <li><strong className="text-foreground">Detailed results:</strong> View match positions, captured groups, and execution time for each match.</li>
          </ol>
          <p className="text-muted-foreground">
            Regular expressions are powerful but complex. This tool helps you build, test, 
            and debug regex patterns before using them in production code.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Pattern Development",
              description: "Build and refine regex patterns iteratively before deploying to production."
            },
            {
              title: "Debugging Regex Issues",
              description: "Figure out why a regex isn't matching expected text or is matching incorrectly."
            },
            {
              title: "Learning Regular Expressions",
              description: "Experiment with regex syntax to understand how different patterns work."
            },
            {
              title: "Validating Input Formats",
              description: "Test regex patterns for email, phone, password validation before implementation."
            },
            {
              title: "Text Extraction",
              description: "Develop patterns to extract specific data from logs, documents, or structured text."
            },
            {
              title: "Code Review",
              description: "Verify regex patterns in code reviews by testing them against sample inputs."
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
              caveat: "Regex flavors differ between languages",
              explanation: "JavaScript, Python, PHP, and .NET have subtle regex differences. Test in your target environment before deploying."
            },
            {
              caveat: "Global flag affects results",
              explanation: "Without the global (g) flag, only the first match is found. With it, all matches are returned."
            },
            {
              caveat: "Special characters need escaping",
              explanation: "Characters like . * + ? ^ $ ( ) [ ] { } | \\ have special meaning. Escape them with \\ to match literally."
            },
            {
              caveat: "Greedy vs lazy matching matters",
              explanation: "* and + are greedy (match as much as possible). *? and +? are lazy (match as little as possible). This affects results."
            },
            {
              caveat: "Performance can vary dramatically",
              explanation: "Poorly written regex can cause catastrophic backtracking. Test with realistic input sizes."
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
              question: "What do the regex flags mean?",
              answer: "g = global (find all matches), i = case insensitive, m = multiline (^ and $ match line boundaries), s = dot matches newlines, u = unicode, y = sticky."
            },
            {
              question: "How do I match a literal dot or asterisk?",
              answer: "Escape special characters with backslash: \\. matches a literal dot, \\* matches a literal asterisk."
            },
            {
              question: "What's the difference between .* and .+?",
              answer: ".* matches zero or more characters. .+ matches one or more characters. .* can match empty string; .+ requires at least one character."
            },
            {
              question: "How do capture groups work?",
              answer: "Parentheses create capture groups: (pattern) captures the match. Access groups as $1, $2 or match[1], match[2] in code."
            },
            {
              question: "What's a non-capturing group?",
              answer: "(?:pattern) groups without capturing. Use when you need grouping but don't need to reference the match later."
            },
            {
              question: "How do I match start or end of string?",
              answer: "^ matches start, $ matches end. ^pattern$ matches the entire string. In multiline mode, they match line boundaries."
            },
            {
              question: "Why is my regex slow or hanging?",
              answer: "Likely catastrophic backtracking from nested quantifiers like (a+)+. Simplify the pattern or use possessive quantifiers if supported."
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
