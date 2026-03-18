export default function SqlQueryParserTokenizerSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This SQL query parser breaks down SQL statements into their constituent tokens and structural
            components, showing you exactly how databases interpret your queries at a fundamental level.
          </p>
          <p className="text-muted-foreground">
            The parsing process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Lexical analysis:</strong> The SQL string is scanned character by character, identifying tokens like keywords, identifiers, operators, literals, and punctuation.</li>
            <li><strong className="text-foreground">Token classification:</strong> Each token is categorized by type (keyword, string literal, number, identifier, operator, comment, etc.).</li>
            <li><strong className="text-foreground">Structural parsing:</strong> Tokens are organized into clauses (SELECT, FROM, WHERE, GROUP BY, etc.) showing the query's hierarchical structure.</li>
            <li><strong className="text-foreground">Visual output:</strong> Results display as a token stream with color-coded types and a tree structure showing clause relationships.</li>
          </ol>
          <p className="text-muted-foreground">
            Understanding how SQL is parsed helps with debugging complex queries, learning SQL internals,
            and building SQL-related tools like formatters, validators, or query analyzers.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "SQL Education and Learning",
              description: "Students can see how queries are broken down, helping understand SQL grammar and structure."
            },
            {
              title: "Debugging Complex Queries",
              description: "Identify exactly how the database interprets ambiguous or failing queries by examining the token stream."
            },
            {
              title: "Building SQL Tools",
              description: "Developers creating SQL formatters, linters, or analyzers can use this to understand tokenization."
            },
            {
              title: "Understanding Query Behavior",
              description: "See why certain queries behave unexpectedly by examining how keywords and identifiers are parsed."
            },
            {
              title: "SQL Injection Analysis",
              description: "Security researchers can examine how malicious input gets tokenized to understand injection mechanisms."
            },
            {
              title: "Code Review and Documentation",
              description: "Document complex queries by showing their parsed structure for team understanding."
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
              caveat: "Parsing is different from execution",
              explanation: "This shows syntactic structure, not how the query executes. Execution plans are a separate analysis."
            },
            {
              caveat: "Dialect differences exist",
              explanation: "MySQL, PostgreSQL, SQL Server, and Oracle have different SQL extensions. Parser may not recognize all vendor-specific syntax."
            },
            {
              caveat: "Comments are tokens too",
              explanation: "SQL comments (-- and /* */) are parsed as tokens but don't affect query execution. They're preserved in the token stream."
            },
            {
              caveat: "Quoted identifiers are special",
              explanation: "Backtick-quoted (MySQL) or double-quoted (PostgreSQL) identifiers are treated differently from unquoted names."
            },
            {
              caveat: "Case sensitivity varies",
              explanation: "Keywords are typically case-insensitive in SQL, but identifiers may be case-sensitive depending on the database and quoting."
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
              question: "What's the difference between a token and a clause?",
              answer: "Tokens are the smallest units (keywords, names, operators). Clauses are logical groups of tokens (SELECT clause, WHERE clause) that form the query structure."
            },
            {
              question: "Why are some keywords highlighted differently?",
              answer: "Different keyword types have different colors: SQL commands (SELECT, INSERT), functions (COUNT, SUM), data types (VARCHAR, INT), etc. This helps identify token types at a glance."
            },
            {
              question: "Can this parse stored procedures?",
              answer: "Basic procedure syntax parses, but complex procedural logic (loops, conditionals, cursors) may not fully parse. This tool focuses on DML queries."
            },
            {
              question: "How does this handle subqueries?",
              answer: "Subqueries appear as nested structures in the parse tree. They're tokenized separately but shown in context of the parent query."
            },
            {
              question: "What happens with invalid SQL?",
              answer: "The parser will tokenize what it can and indicate where parsing fails. This helps identify syntax errors by showing where the parser got confused."
            },
            {
              question: "Can I use this to validate SQL syntax?",
              answer: "Partial validation is possible - if parsing fails, there's likely a syntax error. But use a dedicated validator for comprehensive syntax checking."
            },
            {
              question: "How are string literals with quotes handled?",
              answer: "String literals are tokenized as single units, including their content. Embedded quotes (escaped or doubled) are part of the string token."
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
