export default function PatternReplacerSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This pattern replacer finds text matching a regex pattern and replaces it 
            with specified content, enabling powerful search-and-replace operations.
          </p>
          <p className="text-muted-foreground">
            The replacement process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Pattern definition:</strong> A regex pattern specifies what text to find.</li>
            <li><strong className="text-foreground">Replacement template:</strong> The replacement string can include literal text and backreferences to captured groups.</li>
            <li><strong className="text-foreground">Match and replace:</strong> All matches are found and replaced with the template.</li>
            <li><strong className="text-foreground">Result output:</strong> The transformed text is displayed with optional statistics.</li>
          </ol>
          <p className="text-muted-foreground">
            Regex replacement is far more powerful than simple find-and-replace, 
            enabling transformations based on patterns rather than exact text.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Data Transformation",
              description: "Reformat dates, phone numbers, or other structured data from one format to another."
            },
            {
              title: "Code Refactoring",
              description: "Update variable names, function calls, or patterns across codebases."
            },
            {
              title: "Content Cleanup",
              description: "Remove or replace unwanted patterns like extra spaces, specific words, or formatting."
            },
            {
              title: "Log Processing",
              description: "Redact sensitive information or normalize log formats."
            },
            {
              title: "Text Normalization",
              description: "Standardize variations (colors/colours, organize/organise) to consistent forms."
            },
            {
              title: "Template Processing",
              description: "Replace placeholders with actual values using pattern matching."
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
              caveat: "Backreferences use captured groups",
              explanation: "$1, $2, etc. refer to captured groups in the pattern. \\1, \\2 in some languages. Use parentheses to create groups."
            },
            {
              caveat: "Special characters in replacement need escaping",
              explanation: "$ and \\ have special meaning in replacement strings. Use $$ for literal $, \\\\ for literal backslash."
            },
            {
              caveat: "Global flag replaces all occurrences",
              explanation: "Without global flag, only the first match is replaced. With global, all matches are replaced."
            },
            {
              caveat: "Overlapping matches aren't replaced twice",
              explanation: "After a replacement, scanning continues after the replacement. Overlapping patterns won't match again."
            },
            {
              caveat: "Test before bulk operations",
              explanation: "Always test replacement patterns on sample data before applying to large files or production data."
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
              question: "How do I swap word order?",
              answer: "Capture both words, reference in reverse: pattern /(\\w+) (\\w+)/ replacement '$2 $1' swaps 'Hello World' to 'World Hello'."
            },
            {
              question: "How do I add text around matches?",
              answer: "Use $& to reference the entire match: pattern /\\bword\\b/ replacement '<strong>$&</strong>' wraps matches in HTML tags."
            },
            {
              question: "Can I use conditions in replacement?",
              answer: "Not directly in regex. Use a function as replacement (in supported languages) to apply logic based on matched content."
            },
            {
              question: "How do I remove matches?",
              answer: "Use empty replacement string: pattern /unwanted/g replacement '' removes all matches."
            },
            {
              question: "What's the difference between $& and $0?",
              answer: "Both reference the entire match. $& is JavaScript/Perl style, $0 is some other languages. Check your language's convention."
            },
            {
              question: "How do I increment numbers in replacement?",
              answer: "Use a function replacement that captures the number, increments it, and returns the new value. Static replacement can't do math."
            },
            {
              question: "Can I chain multiple replacements?",
              answer: "Yes, apply replacements sequentially. Each replacement operates on the output of the previous one."
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
