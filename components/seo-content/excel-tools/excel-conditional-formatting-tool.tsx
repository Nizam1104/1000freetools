import React from "react"

export default function ExcelConditionalFormattingToolSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Excel Conditional Formatting Tool Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Upload your CSV/Excel data or paste it directly. Select the column you want to format. Choose a rule type: highlight cells based on value, find duplicates, or identify top/bottom values.
          </p>
          <p>
            Set your condition: greater than, less than, equal to, or contains a specific value. For top/bottom rules, specify how many items to highlight. The tool applies formatting markers to matching cells.
          </p>
          <p>
            Results show your data with visual markers (🟦) on formatted cells. Download the formatted CSV or copy results. See at a glance which cells meet your criteria. All processing happens locally.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Highlighting sales targets</h3>
            <p className="text-sm text-muted-foreground">
              Mark salespeople who exceeded quota. Highlight values over a threshold. Instantly see top performers in your data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Finding duplicate entries</h3>
            <p className="text-sm text-muted-foreground">
              Identify duplicate IDs, emails, or order numbers. See all occurrences at once. Essential for data quality checks.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Spotting outliers</h3>
            <p className="text-sm text-muted-foreground">
              Highlight top 10 or bottom 10 values. Find unusually high or low numbers. Quick way to spot anomalies in data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Tracking project status</h3>
            <p className="text-sm text-muted-foreground">
              Highlight rows where status contains "urgent" or "overdue". Visual flags for attention-needed items. Never miss critical tasks.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating heat maps</h3>
            <p className="text-sm text-muted-foreground">
              Apply multiple rules for different value ranges. High values one color, low values another. Visual data density at a glance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Quality control checks</h3>
            <p className="text-sm text-muted-foreground">
              Flag values outside acceptable ranges. Products with defects, temperatures out of spec. Immediate visual identification of issues.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Formatting uses emoji markers.</strong>
              Since CSV doesn't support colors, we use 🟦 markers. In Excel, apply actual conditional formatting using these results as reference.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Text comparisons are case-insensitive.</strong>
              "URGENT" matches "urgent". Contains checks find partial matches. "pass" matches "passed", "Passing", etc.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Numeric comparisons need numbers.</strong>
              "100" as text may not compare correctly to 100 as number. Ensure your data types are consistent for accurate results.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Top/Bottom uses actual values.</strong>
              Top 5 means the 5 highest values, not values over 5. Ties may result in more than the specified count.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For actual colored formatting in Excel, use this tool to identify which cells should be formatted, then apply Excel's conditional formatting rules using the same criteria.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use multiple conditions?</h3>
            <p className="text-sm text-muted-foreground">
              This tool applies one rule at a time. For multiple conditions, run the tool multiple times or use Excel's built-in conditional formatting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I remove the formatting markers?</h3>
            <p className="text-sm text-muted-foreground">
              The markers are part of the cell content. Use the original data without formatting, or use Find/Replace to remove 🟦 markers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it work with dates?</h3>
            <p className="text-sm text-muted-foreground">
              Dates work if they're in a consistent format. Use date comparisons like greater than a specific date. ISO format (YYYY-MM-DD) works best.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I format entire rows?</h3>
            <p className="text-sm text-muted-foreground">
              This tool marks only the cells in the selected column. For row formatting, use Excel's conditional formatting with formula rules.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about between ranges?</h3>
            <p className="text-sm text-muted-foreground">
              Use two rules: greater than minimum AND less than maximum. Or use Excel's built-in "between" conditional formatting rule.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I save the formatting?</h3>
            <p className="text-sm text-muted-foreground">
              Download the marked CSV. The markers are preserved. For actual colors, apply conditional formatting in Excel using the same rules.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is this free to use?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, completely free. No registration required. Your data stays in your browser - nothing is uploaded anywhere.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
