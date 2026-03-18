export default function SqlRegularExpressionTesterRegexpSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This SQL regular expression tester lets you experiment with REGEXP and LIKE patterns
            against sample data before using them in production queries, helping you get the syntax right.
          </p>
          <p className="text-muted-foreground">
            The testing process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Sample data input:</strong> Enter or paste test data that represents the kind of strings you'll be matching in your database.</li>
            <li><strong className="text-foreground">Pattern definition:</strong> Write your regular expression or LIKE pattern using SQL regex syntax for your database dialect.</li>
            <li><strong className="text-foreground">Match simulation:</strong> The tool applies your pattern to the sample data, showing which rows would match in an actual query.</li>
            <li><strong className="text-foreground">Pattern refinement:</strong> Adjust your regex based on results until you get the exact matches you need.</li>
          </ol>
          <p className="text-muted-foreground">
            Regular expressions in SQL are powerful but tricky. Testing patterns beforehand prevents
            failed queries and ensures you're matching exactly what you intend.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Email Validation Queries",
              description: "Test regex patterns for finding valid or invalid email addresses in user data."
            },
            {
              title: "Phone Number Extraction",
              description: "Build patterns that match various phone number formats stored inconsistently in your database."
            },
            {
              title: "Data Cleaning",
              description: "Identify records with malformed data (bad dates, invalid codes, inconsistent formats) for cleanup."
            },
            {
              title: "Log Analysis",
              description: "Create patterns to extract specific information from log entries stored in database tables."
            },
            {
              title: "Product Code Matching",
              description: "Test patterns for complex SKU or product code formats with specific structure requirements."
            },
            {
              title: "Learning SQL Regex",
              description: "Experiment with regex syntax to understand how different patterns work in SQL context."
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
              caveat: "Regex syntax varies between databases",
              explanation: "MySQL uses REGEXP, PostgreSQL uses ~ and ~*, SQL Server uses LIKE with wildcards. Patterns may need adjustment for different databases."
            },
            {
              caveat: "Performance can be poor on large tables",
              explanation: "Regex matching is CPU-intensive and often can't use indexes. Use for targeted queries, not full-table scans on millions of rows."
            },
            {
              caveat: "Case sensitivity matters",
              explanation: "Some databases have case-sensitive regex (PostgreSQL ~) and case-insensitive variants (~*). MySQL REGEXP is case-insensitive by default for text columns."
            },
            {
              caveat: "Special characters need escaping",
              explanation: "Characters like ., *, +, ?, [, ] have special meaning in regex. Escape them with backslash when you want literal matches."
            },
            {
              caveat: "NULL values don't match",
              explanation: "REGEXP operations on NULL columns return NULL (unknown), not true or false. Use IS NULL checks separately if needed."
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
              question: "What's the difference between LIKE and REGEXP?",
              answer: "LIKE uses simple wildcards (% for any characters, _ for single character). REGEXP supports full regular expressions with character classes, quantifiers, and alternation. REGEXP is more powerful but slower."
            },
            {
              question: "How do I match the start or end of a string?",
              answer: "Use ^ for start of string and $ for end. Example: '^A' matches strings starting with A, 'z$' matches strings ending with z."
            },
            {
              question: "Can I use regex in WHERE and HAVING clauses?",
              answer: "Yes. REGEXP works anywhere you can use a boolean expression: WHERE, HAVING, CASE statements, and even in SELECT for conditional logic."
            },
            {
              question: "What regex features are supported in SQL?",
              answer: "Basic features (character classes, quantifiers, alternation) are widely supported. Advanced features (lookahead, backreferences) vary by database. Check your database documentation."
            },
            {
              question: "How do I match digits or letters specifically?",
              answer: "Use character classes: [0-9] or \\d for digits, [a-zA-Z] for letters, [[:alpha:]] for alphabetic characters (POSIX syntax in some databases)."
            },
            {
              question: "Why is my regex query so slow?",
              answer: "Regex can't typically use indexes, forcing full table scans. Consider adding a computed column with extracted values, or use LIKE for simple prefix matches."
            },
            {
              question: "Can I extract matched portions, not just test for matches?",
              answer: "Some databases support REGEXP_SUBSTR or SUBSTRING with regex to extract matched portions. MySQL 8+ and PostgreSQL have good regex extraction functions."
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
