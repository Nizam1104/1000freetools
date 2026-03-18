export default function UrlCaseConverterSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This URL case converter transforms text between different letter case formats
            instantly, right in your browser.
          </p>
          <p className="text-muted-foreground">
            The conversion process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Input analysis:</strong> Your URL or text is analyzed character by character.</li>
            <li><strong className="text-foreground">Case transformation:</strong> Depending on the selected format, each letter is converted to uppercase, lowercase, or a combination.</li>
            <li><strong className="text-foreground">Pattern recognition:</strong> For formats like camelCase or snake_case, the tool identifies word boundaries (spaces, hyphens, underscores).</li>
            <li><strong className="text-foreground">Output generation:</strong> The transformed text is displayed instantly, ready to copy.</li>
          </ol>
          <p className="text-muted-foreground">
            For example, "HTTPS://EXAMPLE.COM/My-Page" can become "https://example.com/my-page"
            (lowercase) or "https://example.com/my_page" (snake_case) with a single click.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "SEO URL Optimization",
              description: "Convert URLs to lowercase for SEO best practices. Search engines treat uppercase and lowercase URLs differently."
            },
            {
              title: "Code Variable Naming",
              description: "Transform URLs into camelCase or snake_case for use as JavaScript variables or database column names."
            },
            {
              title: "Server Path Normalization",
              description: "Ensure URLs work on case-sensitive servers (Linux) by converting paths to consistent lowercase."
            },
            {
              title: "Bulk URL Cleanup",
              description: "Fix inconsistent URL casing in spreadsheets or databases before importing or migrating data."
            },
            {
              title: "API Endpoint Formatting",
              description: "Convert endpoint URLs to match API documentation standards, which often specify exact casing."
            },
            {
              title: "File Path Conversion",
              description: "Transform file paths between different operating system conventions (Windows vs Unix casing)."
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
              caveat: "URL paths are case-sensitive",
              explanation: "On Linux servers, /Page and /page are different URLs. Converting to lowercase is safest for web URLs."
            },
            {
              caveat: "Domain names are case-insensitive",
              explanation: "EXAMPLE.com and example.com resolve to the same site. Only the path portion matters for casing."
            },
            {
              caveat: "Query parameters may be case-sensitive",
              explanation: "Some APIs treat ?User=1 and ?user=1 differently. Know your API's conventions before converting."
            },
            {
              caveat: "camelCase removes separators",
              explanation: "Converting to camelCase strips hyphens and underscores. This is great for variables but breaks URL paths."
            },
            {
              caveat: "Special characters are preserved",
              explanation: "Characters like /, ?, =, & remain unchanged. Only letters (A-Z, a-z) are affected by case conversion."
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
              question: "Should URLs always be lowercase?",
              answer: "For SEO and consistency, yes. Google recommends lowercase URLs. It prevents duplicate content issues and makes URLs easier to type and share."
            },
            {
              question: "What's the difference between snake_case and kebab-case?",
              answer: "snake_case uses underscores (my_variable_name), kebab-case uses hyphens (my-variable-name). URLs typically use kebab-case; code variables often use snake_case or camelCase."
            },
            {
              question: "Does case conversion affect URL functionality?",
              answer: "The domain portion works either way. The path might break on case-sensitive servers if you change it. Always test converted URLs."
            },
            {
              question: "Can I convert multiple URLs at once?",
              answer: "Paste multiple URLs separated by newlines - each will be converted. For bulk operations, consider a spreadsheet with formulas."
            },
            {
              question: "What is Title Case for URLs?",
              answer: "Title Case capitalizes the first letter of each word. It's rarely used in URLs (keeps them looking unprofessional) but useful for display text."
            },
            {
              question: "Is Sentence case different from Title Case?",
              answer: "Yes. Sentence case only capitalizes the first letter (like a sentence). Title Case capitalizes most words. Both are uncommon in actual URL paths."
            },
            {
              question: "Will this break my existing links?",
              answer: "If you change URL casing on your website, set up 301 redirects from old URLs to new ones. Otherwise, you'll get 404 errors and lose SEO value."
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
