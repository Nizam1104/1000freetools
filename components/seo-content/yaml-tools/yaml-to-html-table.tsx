import React from "react"

export default function YamlToHtmlTableSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How YAML to HTML Table Conversion Works</h2>

        <div className="space-y-3 text-muted-foreground">
          <p>
            YAML to HTML table conversion transforms YAML data arrays into styled HTML table markup. Each YAML object becomes a table row, keys become column headers, and values populate table cells with proper HTML escaping.
          </p>

          <p>
            This tool generates semantic HTML table structure with thead for headers and tbody for data rows. Optional CSS styling and JavaScript features like sorting can be included for interactive tables.
          </p>

          <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
            <p className="text-sm font-medium">Here's the process:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>YAML array is parsed for data</li>
              <li>Table headers generated from keys</li>
              <li>Rows created for each object</li>
              <li>HTML with optional styling output</li>
            </ol>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Example conversion:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">{`YAML Input:
- name: John
  age: 30
- name: Jane
  age: 25

HTML Output:
<table>
  <thead>
    <tr><th>name</th><th>age</th></tr>
  </thead>
  <tbody>
    <tr><td>John</td><td>30</td></tr>
    <tr><td>Jane</td><td>25</td></tr>
  </tbody>
</table>`}</pre>
          </div>
        </div>
      </section>

      {/* Specific Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Web page data display</h3>
            <p className="text-sm text-muted-foreground">
              Embed data tables in web pages. Convert YAML data to HTML tables for displaying structured information on websites.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Documentation tables</h3>
            <p className="text-sm text-muted-foreground">
              Create tables for HTML documentation. Generate comparison tables, feature matrices, or data listings for docs.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Email templates</h3>
            <p className="text-sm text-muted-foreground">
              Build HTML email tables. Create data tables for email newsletters or reports that need tabular data display.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Report generation</h3>
            <p className="text-sm text-muted-foreground">
              Generate HTML reports from YAML data. Convert report data to formatted HTML tables for automated report generation.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Dashboard components</h3>
            <p className="text-sm text-muted-foreground">
              Create dashboard table widgets. Generate HTML tables for web dashboards displaying metrics or data summaries.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Static site data</h3>
            <p className="text-sm text-muted-foreground">
              Add data tables to static sites. Convert YAML data files to HTML tables for Jekyll, Hugo, or other static site generators.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know About HTML Tables</h2>

        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Semantic HTML structure.</strong> Output uses proper thead/tbody structure for accessibility and styling. Screen readers and CSS can target table sections appropriately.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Special characters are escaped.</strong> HTML special characters (&lt;, &gt;, &amp;) are properly escaped to prevent XSS and rendering issues.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">CSS styling is optional.</strong> Basic tables have minimal styling. Add your own CSS classes or inline styles for custom appearance.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Responsive design considerations.</strong> Tables may need CSS for mobile responsiveness. Consider adding responsive table classes for small screens.
            </p>
          </div>

          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For large datasets, consider adding pagination or virtualization. HTML tables with hundreds of rows can impact page performance.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I add custom CSS classes?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Add class attributes to the table element. Style with your own CSS or use framework classes like Bootstrap or Tailwind.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it support sorting?</h3>
            <p className="text-sm text-muted-foreground">
              Basic output is static HTML. For sorting, add JavaScript table sorting library like DataTables or implement custom sort functionality.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How are nested values handled?</h3>
            <p className="text-sm text-muted-foreground">
              Nested objects are stringified as JSON or formatted text within cells. For complex data, consider flattening before conversion.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is the output accessible?</h3>
            <p className="text-sm text-muted-foreground">
              Basic semantic structure is accessible. Add caption, scope attributes, and ARIA labels for enhanced accessibility if needed.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I customize column headers?</h3>
            <p className="text-sm text-muted-foreground">
              Headers come from YAML keys. For custom headers, add a header mapping in your YAML or edit the HTML output manually.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it work with large datasets?</h3>
            <p className="text-sm text-muted-foreground">
              Works for moderate datasets. For very large data (1000+ rows), consider pagination or server-side rendering for better performance.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is my data secure?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. All conversion happens locally in your browser. Your YAML data never leaves your computer.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
