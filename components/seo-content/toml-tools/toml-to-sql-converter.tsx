import React from "react"

export default function TomlToSqlConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the TOML to SQL Converter Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool converts TOML configuration data into SQL statements. Generate CREATE TABLE schemas based on TOML structure, and INSERT statements to populate tables with your TOML data. Supports MySQL, PostgreSQL, and SQLite dialects.
          </p>
          <p>
            The converter analyzes TOML tables and creates corresponding database tables. TOML keys become column names, values determine column types. Arrays can become multiple rows or JSON columns depending on your choice.
          </p>
          <p>
            Output includes proper SQL syntax with quoted identifiers, type mappings, and escaped values. Copy the generated SQL into migration files, run it directly in your database, or use it as a starting point for schema design.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating database seed data</h3>
            <p className="text-sm text-muted-foreground">
              Define seed data in TOML, convert to INSERT statements. Run during database setup to populate initial records. Easier than writing SQL by hand.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Migrating configs to database</h3>
            <p className="text-sm text-muted-foreground">
              Moving from file-based configs to database storage? Convert TOML to SQL, create tables, insert existing config data. Smooth migration path.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Generating database schemas</h3>
            <p className="text-sm text-muted-foreground">
              Prototype your data structure in TOML, generate initial schema. Refine the SQL, add indexes and constraints. Faster than writing DDL from scratch.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating test data fixtures</h3>
            <p className="text-sm text-muted-foreground">
              Define test data in TOML, convert to SQL for database tests. Reset database to known state before each test run. Reproducible test environments.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building data import tools</h3>
            <p className="text-sm text-muted-foreground">
              Accept TOML from users, convert to SQL for import. Build admin tools that let non-technical users manage database content through TOML files.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Documenting database structure</h3>
            <p className="text-sm text-muted-foreground">
              TOML provides a readable representation of your data. Generate SQL for the database, keep TOML as human-readable documentation of expected structure.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">SQL dialects have differences.</strong>
              MySQL uses backticks, PostgreSQL uses double quotes, SQLite is flexible. Choose your target dialect for proper identifier quoting and type names.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Type mapping is approximate.</strong>
              TOML strings → VARCHAR/TEXT, integers → INT/BIGINT, floats → DOUBLE/FLOAT, booleans → BOOLEAN/TINYINT. You may need to adjust types for your use case.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Primary keys aren't automatic.</strong>
              Generated tables may need primary key columns added manually. Add AUTO_INCREMENT or SERIAL columns as needed for your database.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Arrays need special handling.</strong>
              TOML arrays can become multiple rows, JSON columns, or separate tables. Choose the strategy that fits your query patterns and database design.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Always review generated SQL before running in production. Add indexes, foreign keys, and constraints that the converter can't infer from TOML alone.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Which SQL dialect should I choose?</h3>
            <p className="text-sm text-muted-foreground">
              Match your database: MySQL for MariaDB/MySQL, PostgreSQL for Postgres, SQLite for local/embedded. Syntax varies slightly between them.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How are nested tables handled?</h3>
            <p className="text-sm text-muted-foreground">
              Options: flatten into one table with prefixed columns, create separate tables with foreign keys, or store as JSON. Choose based on your query needs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I handle large TOML files?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but large files generate many INSERT statements. Consider batch inserts or LOAD DATA for better performance. Generated SQL may be large.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I escape special characters?</h3>
            <p className="text-sm text-muted-foreground">
              The converter escapes quotes, backslashes, and newlines in values. Generated SQL should be safe to run. Always test with your actual data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about NULL values?</h3>
            <p className="text-sm text-muted-foreground">
              TOML doesn't have null, but missing keys in some tables might imply optional fields. Generated columns may need NULL allowance added manually.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert back from SQL to TOML?</h3>
            <p className="text-sm text-muted-foreground">
              This tool does TOML to SQL. For SQL to TOML, export query results and use a script to format as TOML. Not a direct conversion but achievable.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I run the generated SQL?</h3>
            <p className="text-sm text-muted-foreground">
              Use your database client: mysql command, psql, SQLite browser, or GUI tools like DBeaver. Copy/paste the SQL or save to .sql file and execute.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
