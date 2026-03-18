export default function SqlQueryValidatorSyntaxCheckerSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This SQL query validator analyzes your SQL code for syntax errors, missing keywords,
            and structural problems before you run queries against your database.
          </p>
          <p className="text-muted-foreground">
            The validation process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Lexical analysis:</strong> The query is tokenized into keywords, identifiers, operators, literals, and punctuation.</li>
            <li><strong className="text-foreground">Syntax parsing:</strong> Tokens are checked against SQL grammar rules to ensure proper clause ordering and structure.</li>
            <li><strong className="text-foreground">Error detection:</strong> Missing keywords (SELECT without FROM), unmatched parentheses, incomplete statements, and invalid constructs are flagged.</li>
            <li><strong className="text-foreground">Detailed reporting:</strong> Errors are reported with line numbers, descriptions, and suggestions for fixes.</li>
          </ol>
          <p className="text-muted-foreground">
            Catching syntax errors early saves time debugging failed queries and prevents accidental
            execution of malformed statements that could cause unexpected behavior.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Before Running Production Queries",
              description: "Validate critical UPDATE or DELETE statements before execution to prevent costly mistakes."
            },
            {
              title: "Learning SQL Syntax",
              description: "Students can check their practice queries for errors and learn correct SQL structure."
            },
            {
              title: "Debugging Failed Queries",
              description: "When a query fails with a cryptic database error, this tool provides clearer explanations."
            },
            {
              title: "Code Review Process",
              description: "Reviewers can quickly validate SQL snippets in pull requests without setting up a database."
            },
            {
              title: "Building Dynamic Queries",
              description: "Verify programmatically generated SQL strings before executing them in applications."
            },
            {
              title: "Migrating Between Databases",
              description: "Check if queries written for one database dialect have syntax issues in another."
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
              caveat: "Syntax validation doesn't check semantics",
              explanation: "The validator confirms correct structure, not whether tables or columns exist. A syntactically correct query can still fail at runtime."
            },
            {
              caveat: "Database-specific syntax may not be fully supported",
              explanation: "Standard SQL is well-covered. Vendor-specific extensions (Oracle's CONNECT BY, PostgreSQL's ON CONFLICT) may have limited validation."
            },
            {
              caveat: "Complex queries may have false positives",
              explanation: "Very complex nested queries or CTEs might trigger warnings that aren't actual errors. Use judgment when reviewing results."
            },
            {
              caveat: "No execution happens",
              explanation: "This is a static analyzer only. Your query is never executed against any database - it's purely structural validation."
            },
            {
              caveat: "Error messages are suggestions",
              explanation: "The validator provides likely fixes, but context matters. Some suggestions may not apply to your specific situation."
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
              question: "What's the difference between syntax and semantics in SQL?",
              answer: "Syntax is the grammatical structure - are keywords in the right order? Semantics is the meaning - do the referenced tables exist? This tool checks syntax only."
            },
            {
              question: "Why does my query show as valid but fail in the database?",
              answer: "The query may be syntactically correct but reference non-existent tables, have type mismatches, or violate constraints. Those are runtime errors, not syntax errors."
            },
            {
              question: "Does this validate stored procedures?",
              answer: "Basic procedure syntax is checked, but procedural logic (loops, conditionals, cursors) has limited validation. Use database-specific tools for complex procedural code."
            },
            {
              question: "Can this catch SQL injection vulnerabilities?",
              answer: "No. This is a syntax checker, not a security scanner. SQL injection is a code construction issue, not a syntax problem."
            },
            {
              question: "What SQL dialects are supported?",
              answer: "Standard SQL (ANSI) is fully supported. MySQL, PostgreSQL, SQL Server, and Oracle have partial support for their specific extensions."
            },
            {
              question: "How accurate is the error detection?",
              answer: "Common errors (missing FROM, unmatched quotes, wrong keyword order) are caught reliably. Edge cases and complex queries may have reduced accuracy."
            },
            {
              question: "Should I use this instead of my IDE's SQL validation?",
              answer: "Use both. IDEs provide real-time feedback during coding. This tool offers a second opinion and works without database connections or IDE setup."
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
