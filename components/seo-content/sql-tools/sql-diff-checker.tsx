export default function SqlDiffCheckerSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This SQL diff tool compares two SQL statements or schemas to identify differences, 
            helping you understand what changed between versions.
          </p>
          <p className="text-muted-foreground">
            The comparison process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">SQL parsing:</strong> Both SQL inputs are parsed into structured representations, normalizing whitespace and formatting.</li>
            <li><strong className="text-foreground">Element extraction:</strong> Key SQL elements (tables, columns, constraints, queries) are identified and extracted.</li>
            <li><strong className="text-foreground">Difference detection:</strong> Elements are compared to find additions, deletions, and modifications.</li>
            <li><strong className="text-foreground">Change reporting:</strong> Differences are presented in a clear format showing what was added, removed, or changed.</li>
          </ol>
          <p className="text-muted-foreground">
            SQL diff is essential for database version control, migration script review, 
            and understanding schema evolution over time.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Migration Script Review",
              description: "Compare database schemas before and after migrations to verify changes are correct."
            },
            {
              title: "Version Control for Databases",
              description: "Track schema changes over time by comparing successive versions of SQL files."
            },
            {
              title: "Code Review for SQL Changes",
              description: "Show reviewers exactly what SQL changes are included in a pull request."
            },
            {
              title: "Environment Comparison",
              description: "Compare schemas between development, staging, and production to identify drift."
            },
            {
              title: "Query Optimization Analysis",
              description: "Compare original and optimized queries to verify changes are correct."
            },
            {
              title: "Troubleshooting Schema Issues",
              description: "Identify what changed when a working system starts having database-related problems."
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
              caveat: "Formatting differences are normalized",
              explanation: "Whitespace, indentation, and keyword case differences are ignored. The tool focuses on structural and semantic differences."
            },
            {
              caveat: "Semantic equivalence isn't detected",
              explanation: "Queries that are logically equivalent but written differently (WHERE vs JOIN) may show as different even though they produce same results."
            },
            {
              caveat: "Order may affect comparison",
              explanation: "Column order in CREATE TABLE or SELECT * may show as differences even when the actual data structure is functionally equivalent."
            },
            {
              caveat: "Complex SQL may have limitations",
              explanation: "Very complex stored procedures, triggers, or vendor-specific syntax may not diff perfectly. Review results carefully."
            },
            {
              caveat: "Data isn't compared",
              explanation: "This tool compares SQL structure, not actual data. For data comparison, use database-specific data diff tools."
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
              question: "What types of SQL can be compared?",
              answer: "DDL (CREATE, ALTER, DROP), DML (SELECT, INSERT, UPDATE, DELETE), and schema definitions. Stored procedures and complex queries may have limited support."
            },
            {
              question: "Does this work across different database systems?",
              answer: "Standard SQL compares well. Vendor-specific syntax (T-SQL, PL/SQL) may show more differences due to dialect variations."
            },
            {
              question: "How are renames detected?",
              answer: "Simple renames may show as delete + add. Some advanced tools detect renames by similarity. Verify rename operations manually."
            },
            {
              question: "Can I generate migration scripts from the diff?",
              answer: "Some tools can generate ALTER statements from schema diffs. This tool shows differences - you may need to write migration SQL manually."
            },
            {
              question: "What about comments in SQL?",
              answer: "Comments may or may not be compared depending on the tool. Structural changes are the priority; comment changes are typically cosmetic."
            },
            {
              question: "How do I compare live database schemas?",
              answer: "Export schemas from both databases (using mysqldump, pg_dump, etc.) then compare the exported SQL files with this tool."
            },
            {
              question: "Is there a way to ignore certain differences?",
              answer: "Advanced tools allow ignoring whitespace, case, or specific object types. For this tool, manually review and filter irrelevant differences."
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
