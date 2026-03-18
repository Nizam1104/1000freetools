export default function SqlExecutionPlanVisualizerSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This SQL execution plan visualizer transforms database EXPLAIN output into visual
            flowcharts that show how your queries are executed, helping you identify performance bottlenecks.
          </p>
          <p className="text-muted-foreground">
            The visualization process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">EXPLAIN output input:</strong> Paste the output from EXPLAIN, EXPLAIN ANALYZE, or query plan commands from your database.</li>
            <li><strong className="text-foreground">Plan parsing:</strong> The tool extracts operation types (scan, join, sort), estimated costs, row counts, and access methods.</li>
            <li><strong className="text-foreground">Visual mapping:</strong> Operations are converted to nodes in a flowchart, with arrows showing data flow from tables to final result.</li>
            <li><strong className="text-foreground">Performance highlighting:</strong> Expensive operations (full table scans, large sorts, nested loops) are visually emphasized for quick identification.</li>
          </ol>
          <p className="text-muted-foreground">
            Understanding execution plans is essential for query optimization. Visual representation
            makes it easier to spot inefficient operations that slow down your queries.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Slow Query Investigation",
              description: "Diagnose why a specific query is taking seconds or minutes instead of milliseconds."
            },
            {
              title: "Index Effectiveness Review",
              description: "Verify that your indexes are actually being used instead of full table scans."
            },
            {
              title: "Join Optimization",
              description: "See which join algorithm is chosen (nested loop, hash join, merge join) and whether it's appropriate."
            },
            {
              title: "Query Refactoring Validation",
              description: "Compare execution plans before and after query changes to confirm improvements."
            },
            {
              title: "Database Tuning",
              description: "Identify queries that would benefit from statistics updates, index creation, or query rewrites."
            },
            {
              title: "Learning Query Optimization",
              description: "Students and junior developers can visually understand how databases execute queries."
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
              caveat: "EXPLAIN format varies by database",
              explanation: "MySQL, PostgreSQL, SQL Server, and Oracle all have different EXPLAIN output formats. This tool supports the most common formats."
            },
            {
              caveat: "Estimated vs actual plans differ",
              explanation: "EXPLAIN shows estimated costs. EXPLAIN ANALYZE shows actual runtime. Both are useful - estimates for planning, actual for debugging."
            },
            {
              caveat: "Plans depend on statistics",
              explanation: "Outdated table statistics lead to suboptimal plans. Run ANALYZE or UPDATE STATISTICS regularly for accurate plans."
            },
            {
              caveat: "Visual complexity grows with query complexity",
              explanation: "Simple queries produce clean diagrams. Complex queries with many joins may produce dense visualizations that require careful study."
            },
            {
              caveat: "Some operations are database-specific",
              explanation: "Proprietary operations (Oracle's CONNECT BY, PostgreSQL's GIN scans) may display generically without database-specific explanations."
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
              question: "How do I get EXPLAIN output from my database?",
              answer: "Prefix your query with EXPLAIN (MySQL/PostgreSQL) or SET SHOWPLAN_TEXT ON (SQL Server). For actual runtime, use EXPLAIN ANALYZE in PostgreSQL or enable actual execution plan in SSMS."
            },
            {
              question: "What's the most important thing to look for?",
              answer: "Full table scans on large tables are usually the biggest problem. Look for Seq Scan (PostgreSQL) or TABLE SCAN (SQL Server) on tables with millions of rows."
            },
            {
              question: "What does a good execution plan look like?",
              answer: "Index scans instead of table scans, appropriate join types for data sizes, sorts on indexed columns, and low estimated costs relative to result size."
            },
            {
              question: "Why does the optimizer choose a nested loop join?",
              answer: "Nested loops are efficient for small datasets or when one side is very selective. For large tables, hash joins or merge joins are usually better."
            },
            {
              question: "Can I force a different execution plan?",
              answer: "Yes, using query hints (FORCE INDEX, OPTION HASH JOIN) or by rewriting the query. But understand why the optimizer chose the original plan first."
            },
            {
              question: "What are the numbers in the plan?",
              answer: "Cost estimates show relative expense. Row estimates show expected rows at each step. Actual rows (from ANALYZE) show what really happened. Compare estimates to actuals."
            },
            {
              question: "How do I share execution plans with my team?",
              answer: "Export the visualization as an image or share the EXPLAIN output text. Many teams include execution plans in performance review documentation."
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
