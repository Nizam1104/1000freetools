export default function CaseConverterSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This case converter transforms text between various letter case formats, from 
            UPPERCASE to camelCase to snake_case and many more, helping you match any coding or writing standard.
          </p>
          <p className="text-muted-foreground">
            The conversion process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Word detection:</strong> The input text is analyzed to identify word boundaries - spaces, capital letters, underscores, hyphens, and other separators.</li>
            <li><strong className="text-foreground">Word extraction:</strong> Individual words are extracted and normalized to a consistent base form.</li>
            <li><strong className="text-foreground">Case transformation:</strong> Based on your selected format, each word is transformed (uppercase, lowercase, capitalized).</li>
            <li><strong className="text-foreground">Reassembly:</strong> Words are joined with the appropriate separator (none, space, underscore, hyphen, dot).</li>
          </ol>
          <p className="text-muted-foreground">
            Whether you're naming variables in code, formatting headings, or standardizing 
            data entry, this tool ensures consistent case across your text.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Variable Naming in Code",
              description: "Convert between camelCase, snake_case, and PascalCase for different programming language conventions."
            },
            {
              title: "CSS Class Names",
              description: "Transform text to kebab-case for CSS class names or BEM naming conventions."
            },
            {
              title: "Database Column Names",
              description: "Convert to snake_case for database columns or PascalCase for C# properties."
            },
            {
              title: "Title Formatting",
              description: "Apply title case to headings, article titles, or document headers."
            },
            {
              title: "URL Slug Creation",
              description: "Convert titles to lowercase with hyphens for SEO-friendly URL slugs."
            },
            {
              title: "Data Standardization",
              description: "Normalize inconsistent text data to a uniform case format for cleaning datasets."
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
              caveat: "Word boundaries aren't always perfect",
              explanation: "The tool guesses word boundaries. Acronyms (XMLParser) and compound words may not split as expected. Review results for accuracy."
            },
            {
              caveat: "Some formats lose information",
              explanation: "Converting from camelCase to UPPERCASE loses word boundary information. Converting back may not restore the original exactly."
            },
            {
              caveat: "Special characters are preserved",
              explanation: "Punctuation and special characters outside words are kept intact. They're not considered part of word transformations."
            },
            {
              caveat: "Language-specific rules aren't applied",
              explanation: "Title case follows simple rules, not complex style guides (APA, Chicago). Manual adjustment may be needed for formal writing."
            },
            {
              caveat: "Programming conventions vary",
              explanation: "Different languages and teams have different naming conventions. Follow your specific project's style guide."
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
              answer: "camelCase starts lowercase (myVariable), PascalCase starts uppercase (MyVariable). JavaScript uses camelCase for variables, PascalCase for classes. C# uses PascalCase for both."
            },
            {
              question: "When should I use snake_case vs camelCase?",
              answer: "snake_case is common in Python, Ruby, and database columns. camelCase dominates JavaScript, Java, and C#. Follow your language's convention."
            },
            {
              question: "What is kebab-case used for?",
              answer: "kebab-case (with hyphens) is standard for CSS classes, HTML attributes, and URL slugs. It's readable and URL-safe."
            },
            {
              question: "How does title case work?",
              answer: "Title case capitalizes the first letter of major words. Articles (a, an, the) and short prepositions are typically lowercase unless they start the title."
            },
            {
              question: "What's CONSTANT_CASE for?",
              answer: "UPPER_SNAKE_CASE is conventionally used for constants and configuration values in many languages (Python, C, PHP) to distinguish them from variables."
            },
            {
              question: "Can I convert between all formats?",
              answer: "Yes, you can convert between any supported formats. Some round-trips may not be perfect (especially with acronyms), but most conversions work well."
            },
            {
              question: "Does this handle non-English characters?",
              answer: "Basic accented characters work, but case conversion for non-Latin scripts may not be fully supported. Results vary by character set."
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
