export default function SqlDiffCompareSchemasQueriesSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This SQL diff tool compares two SQL scripts or database schemas side-by-side,
            highlighting exactly what changed between versions - added tables, modified columns, altered queries.
          </p>
          <p className="text-muted-foreground">
            The comparison process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Input preparation:</strong> Paste or upload two SQL files - the original version and the modified version you want to compare.</li>
            <li><strong className="text-foreground">Structural parsing:</strong> Both SQL scripts are parsed to understand their structure (tables, columns, constraints, queries).</li>
            <li><strong className="text-foreground">Difference detection:</strong> The tool identifies additions (green), deletions (red), and modifications (yellow) between the two versions.</li>
            <li><strong className="text-foreground">Visual presentation:</strong> Changes are displayed in a side-by-side or unified diff view, making it easy to see what changed.</li>
          </ol>
          <p className="text-muted-foreground">
            Tracking SQL changes is essential for version control, code reviews, database migrations,
            and understanding what changed between application versions or database schema updates.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Database Migration Reviews",
              description: "Compare schema versions before and after migrations to verify all expected changes were applied."
            },
            {
              title: "Code Review Process",
              description: "Review SQL changes in pull requests by comparing the original and modified query files."
            },
            {
              title: "Schema Version Control",
              description: "Track changes to database schemas over time by comparing successive versions."
            },
            {
              title: "Debugging Production Issues",
              description: "Compare working vs. broken SQL scripts to identify what change caused the problem."
            },
            {
              title: "Documentation Updates",
              description: "Generate change logs by documenting differences between schema versions."
            },
            {
              title: "Team Collaboration",
              description: "When multiple developers modify SQL files, compare versions to identify and resolve conflicts."
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
              caveat: "Formatting differences may show as changes",
              explanation: "Whitespace, indentation, and keyword case differences appear as changes. Use SQL formatter on both files first for cleaner diffs."
            },
            {
              caveat: "Semantic changes may not be detected",
              explanation: "The tool shows textual differences. Logically equivalent but textually different queries (SELECT * vs SELECT col1, col2) show as complete changes."
            },
            {
              caveat: "Large files may be slow to compare",
              explanation: "Very large SQL files (thousands of lines) may take time to process. Consider comparing specific sections for large schemas."
            },
            {
              caveat: "Order matters for some comparisons",
              explanation: "Table column order, constraint order, etc. may show as differences even if logically equivalent. Focus on meaningful changes."
            },
            {
              caveat: "Comments are compared too",
              explanation: "Changes to comments show up in the diff. This is useful for documentation tracking but may add noise to structural comparisons."
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
              question: "What's the difference between text diff and schema diff?",
              answer: "Text diff compares raw SQL text. Schema diff understands database structure and can detect equivalent changes (renamed columns, reordered constraints). This tool does text-based diff."
            },
            {
              question: "Can I compare schemas from different databases?",
              answer: "Yes, but syntax differences between MySQL, PostgreSQL, SQL Server, etc. will show as many changes. Best for comparing same-dialect versions."
            },
            {
              question: "How do I ignore formatting changes?",
              answer: "Run both SQL files through a formatter first to normalize indentation and spacing. Then compare the formatted outputs."
            },
            {
              question: "Can this generate migration scripts?",
              answer: "This tool shows differences but doesn't generate ALTER TABLE statements. Use dedicated schema comparison tools for automatic migration generation."
            },
            {
              question: "What file formats are supported?",
              answer: "Any text-based SQL files work: .sql, .txt, or pasted SQL text. Binary database files need to be exported to SQL first."
            },
            {
              question: "How do I compare live database schemas?",
              answer: "Export both database schemas to SQL (using mysqldump, pg_dump, etc.), then compare the exported SQL files with this tool."
            },
            {
              question: "Can I save or export the diff results?",
              answer: "Copy the diff output or take a screenshot. Some tools offer export to HTML, PDF, or patch file formats for documentation."
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
