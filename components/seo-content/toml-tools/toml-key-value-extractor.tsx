import React from "react"

export default function TomlKeyValueExtractorSEO() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How the TOML Key-Value Extractor Works</h2>
        <div className="prose prose-sm dark:prose-invert">
          <p className="text-muted-foreground">
            This tool queries and extracts specific values from TOML files. Use dot-notation paths
            or regex patterns to find matching keys. Export results as JSON, TOML, or CSV for
            further processing or analysis.
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <h3 className="text-lg font-semibold">Extraction Process</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Paste your TOML content into the input area</li>
            <li>Enter a query pattern (dot-notation or regex)</li>
            <li>Select export format: JSON, TOML, or CSV</li>
            <li>Click &quot;Extract Values&quot; to search</li>
            <li>Matching keys and values are collected</li>
            <li>Results are formatted in your chosen export format</li>
            <li>Copy or download the extracted data</li>
          </ol>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Specific Use Cases</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Configuration Auditing</h3>
            <p className="text-sm text-muted-foreground">
              A security team extracts all password-related keys from configs.
              Query pattern &quot;.*password.*&quot; finds sensitive fields.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Environment Variable Extraction</h3>
            <p className="text-sm text-muted-foreground">
              A developer extracts database settings for deployment scripts.
              Query &quot;database.*&quot; gets all database configuration.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Documentation Generation</h3>
            <p className="text-sm text-muted-foreground">
              Auto-generate documentation by extracting all config keys.
              Export to JSON for processing into documentation.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Config Validation</h3>
            <p className="text-sm text-muted-foreground">
              Extract required keys to verify they exist in a config file.
              Missing keys indicate incomplete configuration.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Data Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Extract numeric values from TOML for statistical analysis.
              Export to CSV for import into spreadsheet tools.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using This Tool</h2>
        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <p className="text-muted-foreground">
            Understanding query patterns:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Dot-notation: database.host matches exactly that key</li>
            <li>Partial match: host matches any key ending with .host</li>
            <li>Regex: ^.*\.port$ matches all port keys</li>
            <li>Empty query returns all keys</li>
            <li>Export formats: JSON (structured), TOML (config), CSV (tabular)</li>
            <li>Nested values are flattened in CSV export</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What query formats are supported?</h3>
            <p className="text-sm text-muted-foreground">
              Exact dot-notation (database.host), partial matches (host),
              and regex patterns (start with ^ for regex mode).
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">How do I match all keys in a section?</h3>
            <p className="text-sm text-muted-foreground">
              Use the section name as query: &quot;database&quot; matches
              database and all nested keys like database.host.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What export format should I use?</h3>
            <p className="text-sm text-muted-foreground">
              JSON for programmatic processing, TOML for config reuse,
              CSV for spreadsheet analysis or data import.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Can I extract nested values?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, nested values are extracted with their full path.
              database.connection.host extracts the nested host value.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What if no keys match my query?</h3>
            <p className="text-sm text-muted-foreground">
              The result will be empty. Try a broader pattern or check
              your query syntax for errors.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">How does regex mode work?</h3>
            <p className="text-sm text-muted-foreground">
              Start your query with ^ to enable regex mode.
              Example: ^.*\.port$ matches all keys ending in .port.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
