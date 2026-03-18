import React from "react"

export default function YamlToMarkdownTableSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How YAML to Markdown Table Conversion Works</h2>

        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool transforms YAML arrays and lists into Markdown-formatted tables. It extracts keys from your YAML objects to create table headers, then populates rows with the corresponding values from each array item.
          </p>

          <p>
            The converter handles nested structures by flattening them or creating nested table cells. Column alignment is automatically calculated based on content length, producing clean, readable Markdown tables compatible with GitHub, GitLab, and other Markdown renderers.
          </p>

          <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
            <p className="text-sm font-medium">Here's the process:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>YAML array is parsed to extract objects</li>
              <li>Keys from first object become table headers</li>
              <li>Each object becomes a table row</li>
              <li>Markdown pipe syntax generates the final table</li>
            </ol>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Example conversion:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">{`YAML Input:
- name: John
  age: 30
- name: Jane
  age: 25

Markdown Output:
| name | age |
|------|-----|
| John | 30  |
| Jane | 25  |`}</pre>
          </div>
        </div>
      </section>

      {/* Specific Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">README documentation</h3>
            <p className="text-sm text-muted-foreground">
              Create tables for GitHub README files. Convert configuration lists, feature matrices, or comparison data into clean Markdown tables for project documentation.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">API documentation</h3>
            <p className="text-sm text-muted-foreground">
              Document API endpoints or response schemas. Transform YAML API specs into readable tables showing parameters, types, and descriptions.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Data export for reports</h3>
            <p className="text-sm text-muted-foreground">
              Generate tables for technical reports. Convert YAML data exports into Markdown tables that render nicely in documentation generators like MkDocs or Docusaurus.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Configuration documentation</h3>
            <p className="text-sm text-muted-foreground">
              Document available configuration options. Show default values, types, and descriptions in a table format that's easy to scan and reference.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Comparison tables</h3>
            <p className="text-sm text-muted-foreground">
              Create product or feature comparison tables. Structure comparison data in YAML, then generate formatted tables for blogs, docs, or marketing materials.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Changelog formatting</h3>
            <p className="text-sm text-muted-foreground">
              Format release notes or changelogs. Convert YAML-structured change data into tables showing version, date, and changes for clean release documentation.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know About Markdown Tables</h2>

        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Works best with flat arrays.</strong> YAML arrays of simple objects convert cleanly. Deeply nested structures may require flattening or produce complex table cells.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Headers come from keys.</strong> First object's keys become column headers. Ensure consistent keys across all array items for uniform tables.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Special characters are escaped.</strong> Pipes (|) and other Markdown-special characters in values are automatically escaped to prevent table breaking.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Column alignment is automatic.</strong> The tool calculates optimal column widths. Headers and separators are generated with appropriate dash counts.
            </p>
          </div>

          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For long values, consider truncating in YAML before conversion. Very long cell content can make tables hard to read in raw Markdown.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What YAML structure works best?</h3>
            <p className="text-sm text-muted-foreground">
              Arrays of objects with consistent keys work best. Each array item becomes a row, each key becomes a column. Simple values (strings, numbers) convert cleanly.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I customize column alignment?</h3>
            <p className="text-sm text-muted-foreground">
              Basic Markdown tables use left alignment. Some renderers support alignment markers (:--- for left, :---: for center, ---: for right) in the separator row.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How are nested objects handled?</h3>
            <p className="text-sm text-muted-foreground">
              Nested objects are typically stringified as JSON or YAML within the cell. For better results, flatten nested structures before conversion.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work with GitHub Flavored Markdown?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. The output is standard Markdown table syntax supported by GitHub, GitLab, Bitbucket, and most Markdown renderers.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I handle empty values?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Missing or null values become empty cells in the table. The table structure remains valid even with sparse data.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is the output editable?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. The Markdown table is plain text. Copy it into any Markdown editor, README file, or documentation system and edit as needed.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this tool store my data?</h3>
            <p className="text-sm text-muted-foreground">
              No. All conversion happens in your browser. Your YAML is never sent to any server. The tool works completely offline after page load.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
