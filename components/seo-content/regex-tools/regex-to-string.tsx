export default function RegexToStringSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This tool converts regular expression patterns into human-readable explanations, 
            making complex regex understandable for learning and documentation.
          </p>
          <p className="text-muted-foreground">
            The conversion process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Pattern parsing:</strong> The regex is analyzed token by token, identifying metacharacters, quantifiers, and groups.</li>
            <li><strong className="text-foreground">Component identification:</strong> Each regex component is identified (character classes, anchors, assertions, etc.).</li>
            <li><strong className="text-foreground">Plain language translation:</strong> Technical regex syntax is translated into clear English explanations.</li>
            <li><strong className="text-foreground">Structured output:</strong> Explanations are organized by pattern section for easy understanding.</li>
          </ol>
          <p className="text-muted-foreground">
            Regular expressions are notoriously difficult to read. This tool bridges the 
            gap between regex syntax and human understanding, making patterns maintainable.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Learning Regular Expressions",
              description: "Understand what complex regex patterns do by reading plain English explanations."
            },
            {
              title: "Code Documentation",
              description: "Generate documentation for regex patterns in codebases for future maintainers."
            },
            {
              title: "Code Review",
              description: "Understand regex patterns in pull requests without manually decoding the syntax."
            },
            {
              title: "Pattern Debugging",
              description: "Verify that a regex pattern does what you think it does by reading the explanation."
            },
            {
              title: "Knowledge Transfer",
              description: "Help team members understand regex patterns without requiring deep regex expertise."
            },
            {
              title: "Pattern Validation",
              description: "Confirm that inherited or copied regex patterns match your requirements."
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
              caveat: "Explanations are approximations",
              explanation: "Natural language can't capture all regex nuances. Use explanations as guides, not definitive specifications."
            },
            {
              caveat: "Complex patterns may have simplified explanations",
              explanation: "Very complex regex with nested groups and lookarounds may have simplified explanations that miss subtle behaviors."
            },
            {
              caveat: "Regex flavor differences aren't always noted",
              explanation: "JavaScript, Python, and PCRE have subtle differences. Explanations may not note flavor-specific behavior."
            },
            {
              caveat: "Context affects meaning",
              explanation: "The same pattern can behave differently with different flags (global, multiline, case-insensitive). Ensure flags are considered."
            },
            {
              caveat: "Examples help understanding",
              explanation: "Good explanations include match examples. Look for tools that provide both explanation and example matches."
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
              question: "What does ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$ mean?",
              answer: "This email pattern matches: start of string, one or more alphanumeric/dot/underscore/percent/plus/hyphen, @, one or more alphanumeric/dot/hyphen, dot, 2+ letters, end of string."
            },
            {
              question: "How do I understand lookahead assertions?",
              answer: "(?=pattern) means 'followed by pattern' without consuming it. (?!pattern) means 'NOT followed by pattern'. They check conditions without matching characters."
            },
            {
              question: "What do quantifiers mean?",
              answer: "* = 0 or more, + = 1 or more, ? = 0 or 1, {n} = exactly n, {n,} = n or more, {n,m} = between n and m. Add ? for lazy (minimum) matching."
            },
            {
              question: "What are character classes?",
              answer: "[abc] matches a, b, or c. [a-z] matches any lowercase letter. [^abc] matches anything except a, b, or c. \\d = digit, \\w = word char, \\s = whitespace."
            },
            {
              question: "How do I learn regex faster?",
              answer: "Start with simple patterns, use explanation tools, practice regularly, and build up complexity gradually. Interactive regex testers help tremendously."
            },
            {
              question: "Can I convert explanations back to regex?",
              answer: "Not reliably. Natural language is ambiguous. Use explanations for understanding, but write regex directly for implementation."
            },
            {
              question: "Why are regex patterns so hard to read?",
              answer: "Regex is a domain-specific language optimized for pattern matching, not human readability. Like any specialized notation, it requires learning and practice."
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
