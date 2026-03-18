export default function SqlJoinTypesVisualizerSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This SQL JOIN visualizer demonstrates how different types of JOINs work using interactive
            examples with sample data, Venn diagrams, and result set previews.
          </p>
          <p className="text-muted-foreground">
            The visualization process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Sample data display:</strong> Two tables are shown with sample records, making it easy to understand what data each contains.</li>
            <li><strong className="text-foreground">JOIN type selection:</strong> Choose from INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN, and CROSS JOIN to see how each works.</li>
            <li><strong className="text-foreground">Visual representation:</strong> Venn diagrams illustrate which rows from each table are included in the result for each JOIN type.</li>
            <li><strong className="text-foreground">Result preview:</strong> The actual output table shows exactly which rows appear when that JOIN is executed with the sample data.</li>
          </ol>
          <p className="text-muted-foreground">
            JOINs are fundamental to relational databases but can be confusing when learning.
            Visual demonstrations make it much clearer how data from multiple tables combines.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Learning SQL Basics",
              description: "Students and beginners can understand JOIN concepts visually before writing actual queries."
            },
            {
              title: "Interview Preparation",
              description: "Review JOIN types before technical interviews where JOIN questions are common."
            },
            {
              title: "Team Training",
              description: "Use as a teaching aid when onboarding team members who need to learn SQL."
            },
            {
              title: "Query Debugging",
              description: "When a JOIN isn't returning expected results, review the visual to understand what should happen."
            },
            {
              title: "Documentation Creation",
              description: "Reference visual diagrams when documenting complex queries for team understanding."
            },
            {
              title: "Conceptual Clarification",
              description: "Settle debates or confusion about which JOIN type to use for specific scenarios."
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
              caveat: "Visual examples are simplified",
              explanation: "Real-world tables have more columns and complex relationships. The concepts transfer but actual queries may be more complex."
            },
            {
              caveat: "JOIN conditions matter",
              explanation: "The visual shows typical equality joins (ON a.id = b.id). Non-equality joins and complex conditions behave differently."
            },
            {
              caveat: "NULL handling varies",
              explanation: "Rows with NULL in join columns behave specially. LEFT JOIN includes left table rows even when right table has NULL matches."
            },
            {
              caveat: "Database support differs",
              explanation: "INNER, LEFT, RIGHT JOINs are universal. FULL OUTER JOIN isn't supported in MySQL (requires UNION workaround). CROSS JOIN is standard."
            },
            {
              caveat: "Performance varies by JOIN type",
              explanation: "INNER JOINs are typically fastest. OUTER JOINs may be slower. CROSS JOIN on large tables creates cartesian products (very slow)."
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
              question: "What's the difference between INNER JOIN and LEFT JOIN?",
              answer: "INNER JOIN returns only rows that have matches in both tables. LEFT JOIN returns all rows from the left table, with NULLs for unmatched right table rows."
            },
            {
              question: "When should I use RIGHT JOIN vs LEFT JOIN?",
              answer: "They're mirror images. RIGHT JOIN keeps all right table rows. Use whichever makes your query more readable. Many developers standardize on LEFT JOIN for consistency."
            },
            {
              question: "What does FULL OUTER JOIN do?",
              answer: "FULL OUTER JOIN returns all rows from both tables, with NULLs where there's no match. It's the union of LEFT JOIN and RIGHT JOIN results."
            },
            {
              question: "What's a CROSS JOIN and when would I use it?",
              answer: "CROSS JOIN creates a cartesian product - every row from table A combined with every row from table B. Useful for generating combinations, dangerous on large tables."
            },
            {
              question: "Can I JOIN more than two tables?",
              answer: "Yes. Chain JOINs: table1 JOIN table2 ON ... JOIN table3 ON ... Each JOIN adds another table to the result set."
            },
            {
              question: "What's the difference between JOIN and INNER JOIN?",
              answer: "They're identical. JOIN without a qualifier defaults to INNER JOIN. Some style guides prefer explicit INNER JOIN for clarity."
            },
            {
              question: "How do I know which JOIN type to use?",
              answer: "Ask: Do I need rows that don't have matches? If yes, use OUTER JOIN (LEFT/RIGHT/FULL). If no, use INNER JOIN. Think about which table's rows must appear in results."
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
