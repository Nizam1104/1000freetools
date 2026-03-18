import React from "react"

export default function YamlToSqlInsertSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How YAML to SQL INSERT Conversion Works</h2>

        <div className="space-y-3 text-muted-foreground">
          <p>
            YAML to SQL INSERT conversion transforms YAML data arrays into SQL INSERT statements. Each YAML object becomes an INSERT row, with keys mapping to column names and values properly quoted and escaped.
          </p>

          <p>
            This tool handles SQL-specific requirements: string values are quoted, special characters are escaped, NULL values are handled correctly, and batch options allow multiple rows per statement for efficiency.
          </p>

          <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
            <p className="text-sm font-medium">Here's the process:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>YAML array is parsed for data rows</li>
              <li>Column names extracted from object keys</li>
              <li>Values are escaped for SQL safety</li>
              <li>INSERT statements are generated</li>
            </ol>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Example conversion:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">{`YAML Input:
- name: John
  age: 30
- name: Jane
  age: 25

SQL Output:
INSERT INTO users (name, age) VALUES
('John', 30),
('Jane', 25);`}</pre>
          </div>
        </div>
      </section>

      {/* Specific Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Database seeding</h3>
            <p className="text-sm text-muted-foreground">
              Populate databases with initial data. Convert YAML seed data to SQL INSERT statements for database initialization scripts.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Test data generation</h3>
            <p className="text-sm text-muted-foreground">
              Create test database fixtures. Generate SQL INSERT statements from YAML test data for automated testing and development environments.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Data migration</h3>
            <p className="text-sm text-muted-foreground">
              Migrate data between databases. Export to YAML, transform as needed, convert to SQL INSERT for importing into target database.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Backup restoration</h3>
            <p className="text-sm text-muted-foreground">
              Restore data from YAML backups. Convert backed-up YAML data to SQL INSERT statements for database restoration procedures.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Content deployment</h3>
            <p className="text-sm text-muted-foreground">
              Deploy content to production databases. Manage content in YAML (version control friendly), convert to SQL for production deployment.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Batch data imports</h3>
            <p className="text-sm text-muted-foreground">
              Import data in batches. Generate optimized INSERT statements with multiple values per statement for faster database loading.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know About SQL Generation</h2>

        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">SQL dialect matters.</strong> Different databases (MySQL, PostgreSQL, SQLite) have slight syntax variations. Choose the appropriate dialect for your target database.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Values are properly escaped.</strong> String values are quoted, single quotes are escaped, NULL values handled correctly. SQL injection safe for data values.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Table name is required.</strong> Specify the target table name for INSERT statements. The tool doesn't infer table names from YAML.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Batch size affects performance.</strong> Multiple rows per INSERT statement is faster than individual statements. Configure batch size based on your needs.
            </p>
          </div>

          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Always review generated SQL before running on production databases. Test on a development database first to verify correct behavior.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Which databases are supported?</h3>
            <p className="text-sm text-muted-foreground">
              MySQL, PostgreSQL, SQLite, SQL Server, and more. Basic INSERT syntax is standard, but dialect options handle database-specific features.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How are NULL values handled?</h3>
            <p className="text-sm text-muted-foreground">
              YAML null values become SQL NULL (unquoted). Empty strings remain as empty strings (''). The distinction is preserved correctly.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I batch multiple rows?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Configure rows per INSERT statement. Batching (e.g., 100 rows per statement) is much faster than individual INSERT statements.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Are special characters escaped?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Single quotes, backslashes, and other special characters are properly escaped for SQL string literals to prevent syntax errors.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it handle data types?</h3>
            <p className="text-sm text-muted-foreground">
              Basic type inference: numbers unquoted, strings quoted, booleans as 1/0 or TRUE/FALSE depending on dialect, null as NULL.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I add ON DUPLICATE KEY?</h3>
            <p className="text-sm text-muted-foreground">
              Some dialects support upsert options. MySQL can add ON DUPLICATE KEY UPDATE, PostgreSQL supports ON CONFLICT clauses.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is my data secure?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. All conversion happens locally in your browser. Your data never leaves your computer. Safe for sensitive database content.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
