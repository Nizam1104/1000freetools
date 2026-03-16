export default function RegexEscapeSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This regex escape tool converts literal text into a regex-safe pattern by 
            escaping all special characters, allowing you to match text exactly as written.
          </p>
          <p className="text-muted-foreground">
            The escaping process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Character scanning:</strong> Each character in the input is checked against regex metacharacters.</li>
            <li><strong className="text-foreground">Escape insertion:</strong> Special characters (. * + ? ^ $ ( ) [ ] { } | \ /) are prefixed with backslash.</li>
            <li><strong className="text-foreground">Output generation:</strong> The escaped string can be safely used as a literal match in regex patterns.</li>
          </ol>
          <p className="text-muted-foreground">
            This is essential when you need to match text that might contain regex 
            special characters - like file paths, user input, or code snippets.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Dynamic Regex Construction",
              description: "Safely include user input or variables in regex patterns without breaking the pattern."
            },
            {
              title: "File Path Matching",
              description: "Match file paths in regex without worrying about forward slashes and dots."
            },
            {
              title: "Code Search and Replace",
              description: "Search for literal code snippets that contain regex special characters."
            },
            {
              title: "URL Matching",
              description: "Match specific URLs that contain query parameters with & and ? characters."
            },
            {
              title: "Mathematical Expression Parsing",
              description: "Match expressions containing operators like + * ^ that are also regex metacharacters."
            },
            {
              title: "Security Input Validation",
              description: "Prevent regex injection by escaping user input before using it in patterns."
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
              caveat: "Only escape literal text portions",
              explanation: "Don't escape the entire pattern if you want regex functionality. Only escape the parts that should match literally."
            },
            {
              caveat: "Different languages escape differently",
              explanation: "Most languages use backslash escaping. Some have built-in functions (Python's re.escape, JavaScript needs manual escaping)."
            },
            {
              caveat: "Whitespace may need special handling",
              explanation: "Spaces don't need escaping but \\s matches any whitespace. Choose based on whether you want literal space or any whitespace."
            },
            {
              caveat: "Unicode characters are usually safe",
              explanation: "Most Unicode characters don't need escaping. Only ASCII metacharacters require escaping in standard regex."
            },
            {
              caveat: "Escaped patterns are longer",
              explanation: "Escaping adds characters. Very long escaped patterns may hit regex length limits in some systems."
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
              question: "Which characters need escaping in regex?",
              answer: "Main metacharacters: . * + ? ^ $ ( ) [ ] { } | \\ and sometimes / as delimiter. These have special meaning and need \\ prefix to match literally."
            },
            {
              question: "Do I need to escape spaces?",
              answer: "No, spaces match literally by default. But \\s matches any whitespace (space, tab, newline). Choose based on your needs."
            },
            {
              question: "What about letters and numbers?",
              answer: "Alphanumeric characters never need escaping. They always match literally in regex patterns."
            },
            {
              question: "How do I match a literal backslash?",
              answer: "Escape it twice: \\\\ in your code becomes \\ in the regex, which matches a single literal backslash."
            },
            {
              question: "Can I escape an already-escaped string?",
              answer: "Yes, but you'll double-escape. \\\\ becomes \\\\\\\\. Only escape unescaped literal text."
            },
            {
              question: "What's the difference between escaping and quoting?",
              answer: "Escaping adds \\ before special chars. Quoting (\\Q...\\E in some flavors) treats everything between as literal. Same result, different syntax."
            },
            {
              question: "How do I do this in code?",
              answer: "Python: re.escape(text). JavaScript: text.replace(/[.*+?^${}()|[\\]\\/\\\\]/g, '\\\\$&'). PHP: preg_quote($text). Other languages need manual escaping."
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
