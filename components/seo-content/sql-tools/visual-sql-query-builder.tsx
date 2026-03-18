export default function VisualSqlQueryBuilderSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This visual SQL query builder lets you construct complex SQL queries using a drag-and-drop
            interface, generating proper SELECT statements with joins, filters, and sorting without writing code.
          </p>
          <p className="text-muted-foreground">
            The visual building process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Table selection:</strong> Add tables to your query canvas from your database schema. Tables appear as visual blocks showing available columns.</li>
            <li><strong className="text-foreground">Join creation:</strong> Drag connections between tables to create JOINs. Choose join types (INNER, LEFT, RIGHT) and specify join conditions.</li>
            <li><strong className="text-foreground">Column selection:</strong> Check boxes to include columns in your SELECT clause. Add aliases and aggregate functions as needed.</li>
            <li><strong className="text-foreground">Filter and sort configuration:</strong> Add WHERE conditions using a visual builder, and specify ORDER BY columns with sort directions.</li>
          </ol>
          <p className="text-muted-foreground">
            The tool translates your visual configuration into syntactically correct SQL that you can
            copy, execute, or further customize. Perfect for learning SQL or quickly prototyping queries.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Learning SQL Fundamentals",
              description: "Beginners can see how visual query elements translate to SQL syntax, building understanding faster."
            },
            {
              title: "Quick Query Prototyping",
              description: "Rapidly build test queries to explore data without typing out full SQL statements."
            },
            {
              title: "Complex Join Visualization",
              description: "Understand relationships between multiple tables by visually mapping join paths."
            },
            {
              title: "Non-Technical Team Members",
              description: "Enable analysts or business users to build their own queries without learning SQL syntax."
            },
            {
              title: "Query Documentation",
              description: "Create visual representations of complex queries for documentation or team communication."
            },
            {
              title: "Avoiding Syntax Errors",
              description: "Build queries visually to eliminate typos and syntax mistakes in complex multi-table queries."
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
              caveat: "Schema import required",
              explanation: "You need to load your database schema first. Some tools connect directly, others import schema definitions."
            },
            {
              caveat: "Advanced SQL features may not be supported",
              explanation: "CTEs, window functions, subqueries in SELECT, and complex expressions often require manual SQL editing."
            },
            {
              caveat: "Generated SQL may not be optimal",
              explanation: "Visual builders produce correct but not always efficient SQL. Review execution plans for performance-critical queries."
            },
            {
              caveat: "Database-specific syntax varies",
              explanation: "Functions, date handling, and string operations differ between MySQL, PostgreSQL, SQL Server, etc. Verify generated SQL for your database."
            },
            {
              caveat: "Not all join types may be available",
              explanation: "Basic INNER and LEFT joins are standard. FULL OUTER joins, CROSS joins, and complex join conditions may need manual SQL."
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
              question: "Can I edit the generated SQL manually?",
              answer: "Yes. The visual builder generates SQL that you can copy and modify. However, changes won't sync back to the visual representation."
            },
            {
              question: "How do I create a subquery?",
              answer: "Basic visual builders may not support subqueries directly. Build the subquery separately, then reference it in your main query, or switch to manual SQL."
            },
            {
              question: "Can I save my visual queries?",
              answer: "Some tools allow saving query definitions. Otherwise, save the generated SQL or export the visual diagram as an image."
            },
            {
              question: "What's the maximum number of tables I can join?",
              answer: "Technically there's no limit, but queries with more than 5-6 tables become hard to visualize and maintain. Consider breaking into smaller queries or using views."
            },
            {
              question: "How do I add calculated columns?",
              answer: "Look for a 'calculated field' or 'expression' option. Enter SQL expressions like CONCAT(first_name, ' ', last_name) or price * quantity."
            },
            {
              question: "Can I build INSERT, UPDATE, or DELETE queries?",
              answer: "Most visual builders focus on SELECT queries. For data modification, you'll typically write SQL manually or use database-specific GUI tools."
            },
            {
              question: "Is this suitable for production queries?",
              answer: "Visual builders are great for exploration and prototyping. For production, review and optimize the generated SQL, add proper error handling, and test thoroughly."
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
