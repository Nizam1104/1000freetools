import React from "react"

export default function CsvToTomlConverterSEO() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How the CSV to TOML Converter Works</h2>
        <div className="prose prose-sm dark:prose-invert">
          <p className="text-muted-foreground">
            This tool transforms CSV spreadsheet data into TOML array of tables format. It parses CSV rows
            and headers, infers data types, and generates properly structured TOML with [[table]] syntax.
            Choose your delimiter and table name for customized output.
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <h3 className="text-lg font-semibold">Conversion Process</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Paste your CSV data into the input area</li>
            <li>Select the delimiter (comma, tab, or semicolon)</li>
            <li>Enter a table name for the TOML array of tables</li>
            <li>Click &quot;Convert to TOML&quot; to process</li>
            <li>The first row is used as column headers (keys)</li>
            <li>Each subsequent row becomes a [[table]] entry</li>
            <li>Values are type-inferred (numbers, booleans, strings)</li>
            <li>Copy or download the generated TOML</li>
          </ol>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Specific Use Cases</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Configuration Data Migration</h3>
            <p className="text-sm text-muted-foreground">
              A team migrates configuration data from spreadsheets to TOML config files.
              CSV export from Excel converts directly to TOML array of tables.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Static Site Generation</h3>
            <p className="text-sm text-muted-foreground">
              A developer uses CSV content management with a static site generator.
              Converting to TOML allows integration with Hugo or Zola build processes.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Data Import Preparation</h3>
            <p className="text-sm text-muted-foreground">
              Someone prepares data for a Rust application that uses TOML config.
              CSV data from a database exports cleanly to TOML format.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Localization Files</h3>
            <p className="text-sm text-muted-foreground">
              A translator manages translations in a spreadsheet. Converting to TOML
              creates structured localization files for applications.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Product Catalog Management</h3>
            <p className="text-sm text-muted-foreground">
              An e-commerce team maintains product data in CSV. Converting to TOML
              enables version control and code-based workflows.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using This Tool</h2>
        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <p className="text-muted-foreground">
            Understanding CSV to TOML conversion:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>First row must contain column headers (used as TOML keys)</li>
            <li>Each data row becomes a separate [[table]] entry</li>
            <li>Values are automatically typed (numbers, booleans, strings)</li>
            <li>Quoted fields with commas are handled correctly</li>
            <li>Empty cells become empty strings in TOML</li>
            <li>Table name should be a valid TOML identifier</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What CSV delimiters are supported?</h3>
            <p className="text-sm text-muted-foreground">
              The tool supports comma (standard CSV), tab (TSV), and semicolon
              (common in European locales). Select the delimiter that matches your data.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">How are data types handled?</h3>
            <p className="text-sm text-muted-foreground">
              The converter automatically detects types: &quot;true&quot;/&quot;false&quot; become booleans,
              numeric strings become numbers, and everything else becomes quoted strings.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What if my CSV has no headers?</h3>
            <p className="text-sm text-muted-foreground">
              The first row is always treated as headers. If your CSV lacks headers,
              add a row with column names before converting.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Can I convert multiple tables?</h3>
            <p className="text-sm text-muted-foreground">
              This tool converts one CSV to one TOML table array. For multiple tables,
              convert each CSV separately and combine the TOML output.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">How are special characters handled?</h3>
            <p className="text-sm text-muted-foreground">
              Quotes within fields should be doubled (&quot;&quot;) per CSV standard.
              The converter handles escaped quotes and produces valid TOML strings.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What table name should I use?</h3>
            <p className="text-sm text-muted-foreground">
              Use a descriptive plural name like &quot;users&quot;, &quot;products&quot;, or &quot;items&quot;.
              The name becomes the TOML array identifier: [[users]].
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
