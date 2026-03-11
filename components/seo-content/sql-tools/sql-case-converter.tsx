export default function SqlCaseConverterSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This SQL case converter transforms SQL keywords between UPPERCASE, lowercase, 
            and Proper Case formats, helping you match your team's coding standards or personal preferences.
          </p>
          <p className="text-muted-foreground">
            The conversion process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Keyword recognition:</strong> The tool identifies SQL keywords (SELECT, FROM, WHERE, JOIN, etc.) using pattern matching.</li>
            <li><strong className="text-foreground">Case transformation:</strong> Based on your selection, keywords are converted to the target case while preserving string literals and identifiers.</li>
            <li><strong className="text-foreground">Context preservation:</strong> Table names, column names, and string values maintain their original case to avoid breaking queries.</li>
            <li><strong className="text-foreground">Output generation:</strong> The transformed SQL is displayed ready for copying or further editing.</li>
          </ol>
          <p className="text-muted-foreground">
            Consistent SQL formatting improves readability and maintainability. 
            Whether your team prefers uppercase keywords or lowercase, this tool ensures consistency.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Team Code Standardization",
              description: "Convert SQL from different team members to match your organization's coding standards."
            },
            {
              title: "Legacy Code Modernization",
              description: "Update old SQL code to match current formatting conventions during refactoring projects."
            },
            {
              title: "Documentation Preparation",
              description: "Format SQL queries consistently for technical documentation, reports, or presentations."
            },
            {
              title: "Learning SQL",
              description: "Experiment with different case styles to find what helps you read and write SQL more effectively."
            },
            {
              title: "Code Review Preparation",
              description: "Standardize formatting before code reviews so reviewers focus on logic, not style inconsistencies."
            },
            {
              title: "Cross-Platform Migration",
              description: "Adapt SQL from one database system to match the conventions of another platform."
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
              caveat: "String literals are preserved",
              explanation: "Text values in quotes maintain their original case. 'Hello World' won't become 'HELLO WORLD' - only SQL keywords are transformed."
            },
            {
              caveat: "Identifiers may be case-sensitive",
              explanation: "Table and column names keep their original case. On case-sensitive databases (Linux MySQL), changing identifier case can break queries."
            },
            {
              caveat: "Not all SQL dialects are covered",
              explanation: "The tool recognizes common SQL keywords. Vendor-specific functions or newer keywords may not be detected for case conversion."
            },
            {
              caveat: "Comments are preserved as-is",
              explanation: "SQL comments (-- and /* */) maintain their original formatting. Only executable SQL keywords are transformed."
            },
            {
              caveat: "Case is a style choice, not functional",
              explanation: "SQL executes the same regardless of keyword case. Choose based on readability and team standards, not functionality."
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
              question: "Which case style is best for SQL?",
              answer: "There's no technical best. UPPERCASE keywords are traditional and make keywords stand out. lowercase is modern and easier to type. Proper Case is a compromise. Choose what your team prefers."
            },
            {
              question: "Does SQL keyword case affect performance?",
              answer: "No. SQL is case-insensitive for keywords. SELECT, select, and Select all execute identically. Case is purely for human readability."
            },
            {
              question: "What about table and column names?",
              answer: "Keep their original case. While SQL keywords are case-insensitive, identifiers may be case-sensitive depending on your database and operating system."
            },
            {
              question: "Should I convert existing queries to a new style?",
              answer: "For new projects, establish a standard. For existing code, consider the cost of conversion vs. benefit. Consistency within a file matters more than global consistency."
            },
            {
              question: "Do SQL formatters change case automatically?",
              answer: "Most do. SQL formatters typically include case conversion as part of formatting. This tool focuses specifically on case transformation."
            },
            {
              question: "What case do database vendors recommend?",
              answer: "Vendor documentation varies. Oracle and SQL Server docs often use UPPERCASE. PostgreSQL docs use lowercase. Follow your specific database's convention if working primarily with one."
            },
            {
              question: "Can I convert only specific keywords?",
              answer: "This tool converts all recognized keywords. For selective conversion, use find-and-replace in your code editor with case transformation options."
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
