export default function SqlEscapeUnescapeToolSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This SQL escape tool converts special characters in strings to safe representations
            that won't break SQL syntax, and can also unescape previously escaped strings back to their original form.
          </p>
          <p className="text-muted-foreground">
            The escaping process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Input analysis:</strong> The tool scans your string for characters that have special meaning in SQL (quotes, backslashes, null bytes).</li>
            <li><strong className="text-foreground">Character replacement:</strong> Special characters are replaced with escape sequences (single quotes become doubled, backslashes are escaped).</li>
            <li><strong className="text-foreground">SQL dialect consideration:</strong> Different databases have slightly different escaping rules - the tool adapts to your chosen database.</li>
            <li><strong className="text-foreground">Output generation:</strong> The escaped string is ready to safely embed in SQL queries without syntax errors.</li>
          </ol>
          <p className="text-muted-foreground">
            Proper escaping prevents SQL injection attacks and syntax errors when incorporating
            user input or external data into queries.
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
              description: "Safely include user-provided strings in ad-hoc SQL queries without breaking syntax."
            },
            {
              title: "Data Migration Scripts",
              description: "Escape special characters in legacy data before generating INSERT statements."
            },
            {
              title: "SQL Injection Prevention Education",
              description: "Demonstrate how escaping works and why parameterized queries are better."
            },
            {
              title: "Debugging Query Errors",
              description: "Identify if special characters in data are causing unexpected SQL syntax errors."
            },
            {
              title: "Import/Export Operations",
              description: "Prepare text data for safe inclusion in SQL dump files or import scripts."
            },
            {
              title: "String Literal Testing",
              description: "Verify how strings with quotes, backslashes, or newlines will behave in SQL."
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
              caveat: "Parameterized queries are better than escaping",
              explanation: "Prepared statements with parameters handle escaping automatically and are more secure. Use escaping only when parameters aren't available."
            },
            {
              caveat: "Different databases escape differently",
              explanation: "MySQL doubles single quotes (''), SQL Server uses brackets or N prefix, PostgreSQL uses standard SQL escaping. Choose your database dialect."
            },
            {
              caveat: "Unicode and multibyte characters need care",
              explanation: "Some characters may need special handling depending on database encoding. UTF-8 is generally safe but verify for your setup."
            },
            {
              caveat: "NULL bytes can truncate strings",
              explanation: "Some databases treat \\0 as string terminator. Escape or remove null bytes before including in queries."
            },
            {
              caveat: "Escaping doesn't validate data",
              explanation: "Escaping makes strings syntactically safe but doesn't validate content. Still validate data types, lengths, and business rules."
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
              question: "Why do I need to escape single quotes?",
              answer: "Single quotes delimit string literals in SQL. An unescaped quote inside a string would end the string prematurely, causing syntax errors or enabling SQL injection."
            },
            {
              question: "What's the difference between escaping and parameterized queries?",
              answer: "Escaping manually modifies strings to be safe. Parameterized queries send data separately from SQL code, letting the database handle escaping. Parameters are safer and preferred."
            },
            {
              question: "How do I escape a backslash in SQL?",
              answer: "In MySQL with backslash escaping enabled, use \\\\. In standard SQL, backslashes typically don't need escaping unless in specific string literal modes."
            },
            {
              question: "Can escaping prevent all SQL injection?",
              answer: "Proper escaping prevents most injection attacks, but it's error-prone. Parameterized queries are the gold standard. Never rely solely on escaping for security-critical code."
            },
            {
              question: "What about LIKE queries with wildcards?",
              answer: "In LIKE patterns, % and _ are wildcards. Escape them with a backslash or ESCAPE clause if you want literal matches: '50\\%' ESCAPE '\\\\'."
            },
            {
              question: "How do I unescape a string?",
              answer: "Unescaping reverses the process: doubled quotes become single quotes, escape sequences become literal characters. Use this tool's unescape function for that."
            },
            {
              question: "Do I need to escape numbers?",
              answer: "Numeric values don't need escaping if they're actually numbers. But if numbers come as strings from user input, validate them as numbers first, then use without quotes."
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
