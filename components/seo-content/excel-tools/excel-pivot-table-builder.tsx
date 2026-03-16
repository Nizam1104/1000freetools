import React from "react"

export default function ExcelPivotTableBuilderSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Excel Pivot Table Builder Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Upload your CSV/Excel data or paste it directly. Select which field to use for rows (grouping), which for columns (optional), and which numeric field to aggregate.
          </p>
          <p>
            Choose your aggregation method: Sum adds values, Count counts occurrences, Average calculates mean, Min/Max find extremes. The pivot table summarizes your data instantly.
          </p>
          <p>
            Results display as a cross-tabulated table. Download as CSV or copy for use elsewhere. See patterns and summaries that aren't visible in raw data. All processing happens locally.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Summarizing sales data</h3>
            <p className="text-sm text-muted-foreground">
              Total sales by region and product. See which combinations perform best. Quick insights without complex formulas.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Analyzing survey responses</h3>
            <p className="text-sm text-muted-foreground">
              Count responses by demographic groups. Cross-tabulate age vs satisfaction. Understand patterns in feedback data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating management reports</h3>
            <p className="text-sm text-muted-foreground">
              Executives need summaries, not raw data. Pivot tables provide high-level views. Professional reports in minutes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning pivot table concepts</h3>
            <p className="text-sm text-muted-foreground">
              Understand rows, columns, values, and aggregation. Practice without Excel complexity. Build confidence for real pivot tables.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Quick data exploration</h3>
            <p className="text-sm text-muted-foreground">
              Explore new datasets interactively. Change groupings to find insights. Faster than writing multiple formulas.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Inventory analysis</h3>
            <p className="text-sm text-muted-foreground">
              Sum quantities by category and supplier. Identify stock patterns. Plan reordering based on aggregated data.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Row field groups your data.</strong>
              Each unique value becomes a row. Categories, names, dates - whatever you want to group by. Choose meaningful groupings.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Values field must be numeric.</strong>
              Sum, Average, etc. require numbers. Text fields can't be aggregated (except by Count). Select appropriate numeric columns.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Column field is optional.</strong>
              Adding columns creates a cross-tabulation. Without columns, you get a simple grouped summary. Use columns for two-dimensional analysis.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Empty cells show as blank.</strong>
              If no data exists for a combination, the cell is empty. This differs from zero. Empty means no data, zero means data with value 0.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For complex pivot tables with filters, calculated fields, and drill-down, use Excel's built-in pivot tables. This tool is great for learning and quick summaries.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between Count and Sum?</h3>
            <p className="text-sm text-muted-foreground">
              Sum adds up the values. Count counts how many rows exist. Use Sum for totals, Count for frequency analysis.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I filter the data?</h3>
            <p className="text-sm text-muted-foreground">
              This tool doesn't have filters. Filter your data before uploading, or use Excel pivot tables for interactive filtering.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I handle dates?</h3>
            <p className="text-sm text-muted-foreground">
              Dates work as row fields for grouping. Each unique date becomes a row. For month/year grouping, add helper columns first.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I create calculated fields?</h3>
            <p className="text-sm text-muted-foreground">
              Not directly. Add calculated columns to your source data first. Then use those columns in the pivot table.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why are some cells empty?</h3>
            <p className="text-sm text-muted-foreground">
              No data exists for that row/column combination. It's not an error - just means that combination doesn't occur in your data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I refresh the data?</h3>
            <p className="text-sm text-muted-foreground">
              This tool creates static tables. For refreshable pivot tables, use Excel. Upload new data here to create a new pivot.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is this free to use?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, completely free with no registration. Your data stays in your browser. Safe for business data analysis.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
