export default function SqlEscapeStringSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This tool escapes special characters in strings for safe use in SQL queries, 
            preventing syntax errors and protecting against SQL injection attacks.
          </p>
          <p className="text-muted-foreground">
            The escaping process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Character scanning:</strong> Each character in the input string is checked against characters that have special meaning in SQL.</li>
            <li><strong className="text-foreground">Escape sequence insertion:</strong> Special characters are prefixed with escape characters (single quotes become two single quotes, backslashes are doubled).</li>
            <li><strong className="text-foreground">Control character handling:</strong> Newlines, tabs, and null bytes are converted to their escaped representations.</li>
            <li><strong className="text-foreground">Output generation:</strong> The escaped string is safe to include directly in SQL queries.</li>
          </ol>
          <p className="text-muted-foreground">
            Proper escaping is essential for security. Unescaped user input in SQL queries 
            is the primary cause of SQL injection vulnerabilities.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Manual Query Construction",
              description: "Safely include user-provided values in SQL queries you're writing by hand."
            },
            {
              title: "Data Migration Scripts",
              description: "Escape string data before inserting it into databases during migration processes."
            },
            {
              title: "Debugging SQL Issues",
              description: "Verify that strings are properly escaped when troubleshooting query syntax errors."
            },
            {
              title: "Learning SQL Security",
              description: "Understand how SQL injection works and how proper escaping prevents it."
            },
            {
              title: "Quick Data Inserts",
              description: "Prepare string values for INSERT statements without worrying about special characters."
            },
            {
              title: "Legacy Code Maintenance",
              description: "Fix SQL injection vulnerabilities in older code that builds queries with string concatenation."
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
              caveat: "Prepared statements are better",
              explanation: "While escaping helps, parameterized queries (prepared statements) are the gold standard for SQL injection prevention. Use escaping when prepared statements aren't available."
            },
            {
              caveat: "Different databases escape differently",
              explanation: "MySQL, PostgreSQL, SQL Server, and Oracle have slightly different escaping rules. This tool uses common standard escaping that works across most databases."
            },
            {
              caveat: "LIKE wildcards need special handling",
              explanation: "In LIKE clauses, % and _ are wildcards. Escape them as \\% and \\_ if you want to match them literally."
            },
            {
              caveat: "Binary data needs different handling",
              explanation: "This tool handles text strings. Binary data should be hex-encoded or use database-specific binary literal syntax."
            },
            {
              caveat: "Escaping doesn't validate data",
              explanation: "Escaping makes strings safe for SQL but doesn't validate content. Still validate data types, lengths, and formats separately."
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
              question: "Why do single quotes need escaping?",
              answer: "Single quotes delimit string literals in SQL. An unescaped quote inside a string would end the string prematurely, causing syntax errors or enabling injection attacks."
            },
            {
              question: "How does SQL injection work?",
              answer: "Attackers input malicious SQL like ' OR '1'='1. Without escaping, this becomes part of the query logic. Escaping turns it into harmless text: '' OR ''1''=''1'."
            },
            {
              question: "What's the difference between escaping and parameterization?",
              answer: "Escaping modifies the string to be safe. Parameterization sends the query and data separately, so data can never be interpreted as SQL. Parameterization is more secure."
            },
            {
              question: "Do I need to escape numbers?",
              answer: "Numbers don't need escaping, but they should be validated. Ensure they're actually numbers before including in queries. Never trust user input."
            },
            {
              question: "What about NULL values?",
              answer: "NULL is a SQL keyword, not a string. Use the literal NULL (unquoted) in SQL, not the string 'NULL' or 'null'."
            },
            {
              question: "Can escaped strings still cause problems?",
              answer: "Escaping prevents SQL injection but not all issues. Very long strings might exceed field limits. Invalid data types still cause errors. Escape plus validation is best."
            },
            {
              question: "Should I escape before or after validation?",
              answer: "Validate first, then escape. Validation ensures the data is acceptable. Escaping makes it safe for SQL. Both steps are important for security and correctness."
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
