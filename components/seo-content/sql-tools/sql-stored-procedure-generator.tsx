export default function SqlStoredProcedureGeneratorSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This SQL stored procedure generator builds boilerplate CREATE PROCEDURE and CREATE FUNCTION statements
            by letting you define parameters, return types, and procedural logic blocks without manually typing
            the syntax.
          </p>
          <p className="text-muted-foreground">
            The generation process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Define procedure metadata:</strong> Enter the procedure name and select your target database (MySQL, SQL Server, PostgreSQL).</li>
            <li><strong className="text-foreground">Add parameters:</strong> Specify input and output parameters with their data types (INT, VARCHAR, DATE, etc.).</li>
            <li><strong className="text-foreground">Build the body:</strong> Add BEGIN/END blocks, variable declarations, and SQL statements that make up the procedure logic.</li>
            <li><strong className="text-foreground">Generate code:</strong> The tool assembles a complete CREATE PROCEDURE statement with proper syntax for your chosen database.</li>
          </ol>
          <p className="text-muted-foreground">
            Stored procedures encapsulate business logic in the database layer, reducing network traffic and
            providing a consistent interface for applications to interact with data.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Building Data Access Layers",
              description: "Generate standardized procedures for CRUD operations that applications call instead of writing raw SQL."
            },
            {
              title: "Batch Processing Jobs",
              description: "Create procedures that perform nightly data cleanup, aggregation, or ETL operations on schedule."
            },
            {
              title: "Complex Validation Logic",
              description: "Encapsulate multi-step validation rules in the database to ensure data integrity across all applications."
            },
            {
              title: "Report Generation",
              description: "Build procedures that aggregate data from multiple tables and return formatted result sets for dashboards."
            },
            {
              title: "API Backend Development",
              description: "Generate procedure templates when building database-backed APIs that need consistent data operations."
            },
            {
              title: "Migration Script Creation",
              description: "Quickly scaffold stored procedures when migrating business logic from application code to the database layer."
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
              caveat: "Syntax varies significantly between databases",
              explanation: "MySQL, SQL Server, PostgreSQL, and Oracle all have different stored procedure syntax. This generator targets specific dialects - choose carefully."
            },
            {
              caveat: "Error handling is database-specific",
              explanation: "TRY/CATCH (SQL Server), DECLARE HANDLER (MySQL), and EXCEPTION blocks (PostgreSQL) work differently. The generated code reflects your chosen platform."
            },
            {
              caveat: "Permissions need to be granted separately",
              explanation: "Generated procedures don't include GRANT statements. You'll need to explicitly grant EXECUTE permissions to users or roles."
            },
            {
              caveat: "Complex logic may need manual adjustment",
              explanation: "The generator creates boilerplate structure. Complex business logic, cursors, and dynamic SQL require manual customization."
            },
            {
              caveat: "Testing is still required",
              explanation: "Generated code is syntactically correct but may not match your exact business requirements. Always test with real data."
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
              question: "What's the difference between a stored procedure and a function?",
              answer: "Procedures perform actions and can return multiple result sets but can't be used in SELECT statements. Functions return a single value or table and can be called from queries. Procedures use CREATE PROCEDURE, functions use CREATE FUNCTION."
            },
            {
              question: "Should I put business logic in stored procedures or application code?",
              answer: "It depends. Procedures are faster for data-heavy operations and ensure consistency across apps. Application code is easier to version control and test. Many teams split logic: data validation in procedures, business rules in code."
            },
            {
              question: "How do I debug a stored procedure?",
              answer: "Most database IDEs (SSMS, MySQL Workbench, pgAdmin) have built-in debuggers. You can also add logging tables or use PRINT/SELECT statements to trace execution flow."
            },
            {
              question: "Can stored procedures improve security?",
              answer: "Yes. They provide a layer of abstraction - users get EXECUTE permission without direct table access. This prevents SQL injection and limits exposure of underlying schema."
            },
            {
              question: "What are OUT parameters used for?",
              answer: "OUT parameters return single values from procedures (like status codes or calculated values). For multiple rows, use result sets or return cursors instead."
            },
            {
              question: "How do I deploy stored procedures to production?",
              answer: "Include CREATE PROCEDURE scripts in your migration system (Flyway, Liquibase, etc.). Use IF EXISTS checks to handle updates. Version your procedures like any other code."
            },
            {
              question: "Can I call one stored procedure from another?",
              answer: "Yes, most databases support nested procedure calls using CALL or EXEC statements. Be careful with transaction management and error propagation in nested calls."
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
