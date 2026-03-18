export default function SqlCaseConverterSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This SQL case converter transforms the capitalization of SQL keywords in your queries
            between UPPERCASE, lowercase, and Proper Case formats with a single click.
          </p>
          <p className="text-muted-foreground">
            The conversion process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Keyword detection:</strong> The tool identifies SQL reserved words (SELECT, FROM, WHERE, JOIN, etc.) while preserving table names, column names, and string literals.</li>
            <li><strong className="text-foreground">Case transformation:</strong> Based on your selection, keywords are converted to all caps, all lowercase, or title case (first letter capitalized).</li>
            <li><strong className="text-foreground">Preservation of context:</strong> String values, comments, identifiers, and user-defined names remain unchanged - only SQL keywords are affected.</li>
            <li><strong className="text-foreground">Instant output:</strong> The transformed query appears immediately, ready to copy and use.</li>
          </ol>
          <p className="text-muted-foreground">
            Consistent keyword casing improves code readability and helps teams maintain uniform
            SQL style across projects and organizations.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Enforcing Team Style Guides",
              description: "Convert queries to match your organization's SQL coding standards before committing to version control."
            },
            {
              title: "Preparing Code Examples",
              description: "Format SQL snippets for documentation, presentations, or Stack Overflow posts with consistent keyword casing."
            },
            {
              title: "Legacy Code Modernization",
              description: "Update old queries with inconsistent casing to match modern team conventions during refactoring."
            },
            {
              title: "Learning SQL",
              description: "Beginners often find UPPERCASE keywords easier to distinguish from table and column names."
            },
            {
              title: "Cross-Team Collaboration",
              description: "Standardize queries when merging code from teams with different casing preferences."
            },
            {
              title: "Automated Code Formatting",
              description: "Pre-process SQL before running through formatters that expect specific keyword casing."
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
              caveat: "SQL is case-insensitive for keywords",
              explanation: "Databases treat SELECT, select, and Select identically. Case conversion is purely for human readability, not functional differences."
            },
            {
              caveat: "String literals are preserved",
              explanation: "Text inside quotes won't be changed. 'Hello World' stays 'Hello World' regardless of keyword case setting."
            },
            {
              caveat: "Identifiers may be affected on some systems",
              explanation: "Table and column names are usually preserved, but case-sensitive databases (like PostgreSQL with quoted identifiers) may behave differently."
            },
            {
              caveat: "Comments remain unchanged",
              explanation: "SQL comments (-- and /* */) keep their original casing to preserve any intentional formatting or emphasis."
            },
            {
              caveat: "Function names follow keyword rules",
              explanation: "Built-in functions (COUNT, SUM, DATE_ADD) are treated as keywords and will be converted along with SELECT, FROM, etc."
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
              question: "Does keyword case affect query performance?",
              answer: "No. The database query optimizer treats all case variations identically. Performance depends on query structure, indexes, and data distribution - not capitalization."
            },
            {
              question: "What's the most common SQL keyword casing style?",
              answer: "UPPERCASE is traditional and widely used in enterprise environments. It makes keywords visually distinct. Many modern teams prefer lowercase for faster typing. Both are correct."
            },
            {
              question: "Should table and column names match keyword case?",
              answer: "Most style guides recommend lowercase for identifiers (users, order_date) with uppercase keywords (SELECT * FROM users). This creates clear visual distinction."
            },
            {
              question: "Can I convert only specific keywords?",
              answer: "This tool converts all keywords uniformly. For selective changes, use a text editor with regex find/replace to target specific keywords."
            },
            {
              question: "What about database-specific functions?",
              answer: "Vendor-specific functions (NVL, ISNULL, COALESCE) are treated as keywords and will be converted. The underlying function behavior remains unchanged."
            },
            {
              question: "How do I maintain consistent case across my team?",
              answer: "Document your style choice in a coding standards guide. Use linters or formatters (like sqlfmt) in CI/CD to enforce consistency automatically."
            },
            {
              question: "Does this work with stored procedures?",
              answer: "Yes, but only for SQL keywords inside the procedure body. Procedural elements (variable declarations, flow control) may need separate formatting."
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
