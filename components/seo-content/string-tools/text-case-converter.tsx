export default function TextCaseConverterSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This text case converter transforms text between various letter case formats
            including uppercase, lowercase, sentence case, title case, and programming cases
            like camelCase and snake_case. It handles large text blocks with instant preview.
          </p>
          <p className="text-muted-foreground">
            The conversion process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Analyze input:</strong> Text is analyzed to identify word boundaries, existing case patterns, and special characters.</li>
            <li><strong className="text-foreground">Apply transformation:</strong> Each character is transformed according to the selected case rules.</li>
            <li><strong className="text-foreground">Handle edge cases:</strong> Acronyms, proper nouns, and special characters are handled appropriately for each case type.</li>
            <li><strong className="text-foreground">Output result:</strong> Transformed text is displayed with the option to copy or convert to another case.</li>
          </ol>
          <p className="text-muted-foreground">
            Supported cases include: UPPERCASE, lowercase, Sentence case, Title Case,
            camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, and more.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Code Variable Naming",
              description: "Convert between camelCase, snake_case, and kebab-case for different programming languages and frameworks."
            },
            {
              title: "Content Formatting",
              description: "Fix inconsistent capitalization in documents, emails, or content before publishing."
            },
            {
              title: "Data Normalization",
              description: "Standardize text data case for database storage, search indexing, or comparison operations."
            },
            {
              title: "Writing and Editing",
              description: "Convert text to title case for headings or sentence case for body text."
            },
            {
              title: "CSS Class Names",
              description: "Generate properly formatted CSS class names (kebab-case) from natural language descriptions."
            },
            {
              title: "API Development",
              description: "Convert between naming conventions for API fields, database columns, and code variables."
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
              caveat: "Word boundaries vary by case type",
              explanation: "snake_case uses underscores. kebab-case uses hyphens. camelCase uses capital letters. Spaces are handled differently."
            },
            {
              caveat: "Title case rules vary",
              explanation: "Different style guides have different title case rules (which words to capitalize). This tool uses common conventions."
            },
            {
              caveat: "Acronyms may be affected",
              explanation: "Some converters preserve ALLCAPS acronyms. Others normalize them. Check results for important acronyms."
            },
            {
              caveat: "Non-letter characters are preserved",
              explanation: "Numbers, punctuation, and special characters remain unchanged. Only letter case is modified."
            },
            {
              caveat: "Unicode letters are supported",
              explanation: "Accented characters and non-English letters are handled correctly for case conversion."
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
              question: "What's the difference between camelCase and PascalCase?",
              answer: "camelCase starts lowercase (myVariable). PascalCase starts uppercase (MyVariable). Also called lowerCamelCase and UpperCamelCase."
            },
            {
              question: "When should I use snake_case vs camelCase?",
              answer: "snake_case: Python, Ruby, databases, URLs. camelCase: JavaScript, Java, C#. Follow your language/framework conventions."
            },
            {
              question: "What is sentence case?",
              answer: "Only the first word and proper nouns are capitalized. Like normal sentences. 'The quick brown fox jumps over the lazy dog.'"
            },
            {
              question: "What is title case?",
              answer: "Major words are capitalized. Minor words (a, an, the, in, on) are lowercase unless first. 'The Quick Brown Fox Jumps Over the Lazy Dog.'"
            },
            {
              question: "How do I convert CSS class names?",
              answer: "Use kebab-case (also called spinal-case): 'my-class-name'. Hyphens separate words. CSS is case-insensitive but kebab-case is standard."
            },
            {
              question: "What's CONSTANT_CASE?",
              answer: "All uppercase with underscores. Used for constants and environment variables: 'MAX_RETRY_COUNT', 'DATABASE_URL'."
            },
            {
              question: "Can I convert large text blocks?",
              answer: "Yes! The tool handles paragraphs and documents. For very large texts (books), consider batch processing."
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
