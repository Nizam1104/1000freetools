export default function SqlIndexAdvisorSuggestToolSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This SQL index advisor analyzes your SELECT queries and recommends database indexes
            that could improve query performance by reducing scan times and speeding up lookups.
          </p>
          <p className="text-muted-foreground">
            The analysis process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Query parsing:</strong> The tool examines your SQL to identify tables, columns used in WHERE clauses, JOIN conditions, and ORDER BY statements.</li>
            <li><strong className="text-foreground">Access pattern detection:</strong> Columns frequently used for filtering, joining, or sorting are flagged as index candidates.</li>
            <li><strong className="text-foreground">Index recommendation:</strong> Based on query patterns, the tool suggests single-column or composite indexes that would benefit performance.</li>
            <li><strong className="text-foreground">CREATE INDEX generation:</strong> Ready-to-execute CREATE INDEX statements are produced for your specific database dialect.</li>
          </ol>
          <p className="text-muted-foreground">
            Proper indexing is the single most effective way to improve query performance.
            This tool helps identify which indexes will have the biggest impact on your specific queries.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Slow Query Optimization",
              description: "Analyze queries that are taking too long and get specific index recommendations to speed them up."
            },
            {
              title: "New Feature Development",
              description: "Before deploying new queries, check what indexes they would benefit from and create them proactively."
            },
            {
              title: "Database Performance Audits",
              description: "Review all application queries to identify missing indexes across your entire codebase."
            },
            {
              title: "Learning Database Optimization",
              description: "Understand which query patterns benefit from indexes and how composite indexes work."
            },
            {
              title: "Migration Planning",
              description: "When moving to a new database, analyze queries to design an optimal indexing strategy from the start."
            },
            {
              title: "Index Cleanup",
              description: "Identify which indexes are actually useful vs. which ones are never used by your queries."
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
              caveat: "Indexes speed up reads but slow down writes",
              explanation: "Every INSERT, UPDATE, DELETE must also update indexes. Don't over-index tables with heavy write loads."
            },
            {
              caveat: "Composite index column order matters",
              explanation: "For indexes on multiple columns, the leftmost columns are most selective. Order columns by filter frequency and selectivity."
            },
            {
              caveat: "Existing indexes may already cover your query",
              explanation: "Check what indexes already exist before adding new ones. Some queries can use existing indexes in unexpected ways."
            },
            {
              caveat: "Small tables don't need indexes",
              explanation: "Tables with fewer than 1000 rows often scan faster than using an index. Indexing benefits grow with table size."
            },
            {
              caveat: "Query optimizer may not use your index",
              explanation: "The database optimizer decides whether to use an index based on statistics. Outdated statistics can lead to poor index usage."
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
              question: "What's the difference between a clustered and non-clustered index?",
              answer: "Clustered indexes determine the physical order of data in a table (one per table). Non-clustered indexes are separate structures pointing to data rows. Primary keys are often clustered."
            },
            {
              question: "How many indexes should a table have?",
              answer: "There's no fixed limit, but 5-10 indexes per table is common. More indexes increase write overhead. Each index should serve a clear query pattern."
            },
            {
              question: "When should I use a composite index?",
              answer: "Use composite indexes when queries frequently filter on multiple columns together. The index should match the most common column combinations in your WHERE clauses."
            },
            {
              question: "Do foreign keys need indexes?",
              answer: "Yes, foreign key columns should typically be indexed. This speeds up JOINs and prevents lock escalation during parent table updates/deletes."
            },
            {
              question: "What's a covering index?",
              answer: "A covering index includes all columns needed by a query, so the database doesn't need to look up the actual table rows. This is very fast but requires careful design."
            },
            {
              question: "How do I know if an index is being used?",
              answer: "Use EXPLAIN or execution plan tools to see if your query uses the index. Database statistics views (like sys.dm_db_index_usage_stats in SQL Server) show index usage over time."
            },
            {
              question: "Should I index boolean or low-cardinality columns?",
              answer: "Generally no. Columns with few distinct values (gender, status flags) rarely benefit from indexing unless combined with other columns in a composite index."
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
