export default function SqlDateFunctionPlaygroundSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This SQL date function playground lets you experiment with date and time functions
            interactively, testing different operations and seeing results instantly without connecting to a database.
          </p>
          <p className="text-muted-foreground">
            The playground process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Function selection:</strong> Choose from common date functions like DATE_ADD, DATEDIFF, DATE_FORMAT, EXTRACT, NOW, etc.</li>
            <li><strong className="text-foreground">Input configuration:</strong> Enter sample dates, intervals, or format strings as function parameters.</li>
            <li><strong className="text-foreground">Database dialect selection:</strong> Pick MySQL, PostgreSQL, SQL Server, or Oracle to see dialect-specific syntax and behavior.</li>
            <li><strong className="text-foreground">Result preview:</strong> See the function output immediately, along with the equivalent SQL query you can use in your code.</li>
          </ol>
          <p className="text-muted-foreground">
            Date handling is notoriously tricky in SQL due to varying formats, time zones, and
            database-specific functions. This playground helps you get it right before writing production queries.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Date Calculation Queries",
              description: "Figure out how to calculate dates like '30 days ago' or 'next Monday' in SQL."
            },
            {
              title: "Report Generation",
              description: "Build queries for monthly reports, year-to-date summaries, or period comparisons."
            },
            {
              title: "Data Filtering",
              description: "Create WHERE clauses that filter records by date ranges, age, or relative time periods."
            },
            {
              title: "Learning SQL Date Functions",
              description: "Understand how different date functions work and what parameters they accept."
            },
            {
              title: "Cross-Database Migration",
              description: "Find equivalent date functions when migrating queries between different database systems."
            },
            {
              title: "Debugging Date Issues",
              description: "Troubleshoot why date comparisons or calculations aren't producing expected results."
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
              caveat: "Function names vary by database",
              explanation: "DATE_ADD (MySQL) vs INTERVAL + (PostgreSQL) vs DATEADD (SQL Server). This tool shows the correct syntax for each database."
            },
            {
              caveat: "Date formats differ significantly",
              explanation: "MySQL uses %Y-%m-%d, PostgreSQL uses ISO format, SQL Server depends on settings. Always specify format explicitly for portability."
            },
            {
              caveat: "Time zones complicate things",
              explanation: "NOW() returns server time. For UTC, use UTC_NOW or equivalent. Time zone handling varies greatly between databases."
            },
            {
              caveat: "Date arithmetic has edge cases",
              explanation: "Adding months to Jan 31 produces different results in different databases. End-of-month handling isn't standardized."
            },
            {
              caveat: "NULL handling in date functions",
              explanation: "Most date functions return NULL if any input is NULL. Use COALESCE to provide defaults when needed."
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
              question: "How do I get the current date and time?",
              answer: "MySQL: NOW() or CURRENT_TIMESTAMP. PostgreSQL: NOW() or CURRENT_TIMESTAMP. SQL Server: GETDATE(). Oracle: SYSDATE. All return the database server's current date and time."
            },
            {
              question: "How do I add days, months, or years to a date?",
              answer: "MySQL: DATE_ADD(date, INTERVAL 1 MONTH). PostgreSQL: date + INTERVAL '1 month'. SQL Server: DATEADD(MONTH, 1, date). Oracle: ADD_MONTHS(date, 1)."
            },
            {
              question: "How do I calculate the difference between two dates?",
              answer: "MySQL: DATEDIFF(date1, date2) returns days. PostgreSQL: date1 - date2 returns an interval. SQL Server: DATEDIFF(DAY, date2, date1). Results vary by database."
            },
            {
              question: "How do I extract year, month, or day from a date?",
              answer: "Most databases support EXTRACT(YEAR FROM date), EXTRACT(MONTH FROM date). MySQL also has YEAR(date), MONTH(date), DAY(date) functions."
            },
            {
              question: "How do I format dates for display?",
              answer: "MySQL: DATE_FORMAT(date, '%Y-%m-%d'). PostgreSQL: TO_CHAR(date, 'YYYY-MM-DD'). SQL Server: FORMAT(date, 'yyyy-MM-dd'). Format strings vary significantly."
            },
            {
              question: "How do I find records from the last N days?",
              answer: "WHERE date_column >= DATE_SUB(NOW(), INTERVAL 7 DAY) in MySQL. Adjust syntax for your database. This is common for recent activity queries."
            },
            {
              question: "What's the difference between DATE, DATETIME, and TIMESTAMP?",
              answer: "DATE stores only date. DATETIME stores date and time without timezone. TIMESTAMP stores date and time with timezone conversion. Choose based on your needs."
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
