import React from "react"

export default function ExcelFormulaGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Excel Formula Generator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Browse formulas by category: Logical, Text, Math & Stats, Date & Time, Lookup, and Statistical. Each category contains commonly used Excel formulas with explanations.
          </p>
          <p>
            Click any formula to see its syntax, description, and a practical example. Copy the formula with one click. Use as a reference while building your spreadsheets.
          </p>
          <p>
            Filter formulas by category to find what you need quickly. From simple SUM to complex INDEX/MATCH combinations. Your Excel formula cheat sheet, always available. All content loads instantly.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning Excel formulas</h3>
            <p className="text-sm text-muted-foreground">
              New to Excel? Browse formulas by category. Understand what each does before using. Build your formula vocabulary systematically.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Finding the right formula</h3>
            <p className="text-sm text-muted-foreground">
              Know what you want to do, not which formula to use. Browse categories to discover options. Find VLOOKUP when you need to search.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Remembering syntax</h3>
            <p className="text-sm text-muted-foreground">
              Know the formula, forget the argument order. Quick reference for SUMIF range vs criteria. No need to search documentation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Discovering new functions</h3>
            <p className="text-sm text-muted-foreground">
              Find formulas you didn't know existed. TEXTJOIN for concatenation. IFS for multiple conditions. Expand your Excel toolkit.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Training others</h3>
            <p className="text-sm text-muted-foreground">
              Teach Excel formulas to team members. Use this as a reference guide. Consistent formula usage across the organization.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Quick lookup during work</h3>
            <p className="text-sm text-muted-foreground">
              Building a complex spreadsheet. Need a formula fast. Quick search and copy. Keep your workflow uninterrupted.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Formulas are categorized by function.</strong>
              Logical for IF statements. Text for string manipulation. Math for calculations. Lookup for finding data. Choose the right category.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Examples show typical usage.</strong>
              Cell references like A1, B2 are examples. Replace with your actual cell references. Adapt the pattern to your data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some formulas need newer Excel.</strong>
              XLOOKUP, IFS, TEXTJOIN require Excel 2019 or 365. Older versions need alternatives. Check your Excel version.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Formula syntax is standardized.</strong>
              Equals sign starts the formula. Function name, parentheses, arguments separated by commas. Consistent across all formulas.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For complex formulas, build them step by step. Test each part in a separate cell. Combine once each piece works correctly.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between VLOOKUP and XLOOKUP?</h3>
            <p className="text-sm text-muted-foreground">
              XLOOKUP is newer and more flexible. Can look left, has built-in error handling. VLOOKUP is older but widely compatible. Use XLOOKUP if available.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">When should I use INDEX/MATCH instead of VLOOKUP?</h3>
            <p className="text-sm text-muted-foreground">
              INDEX/MATCH is more flexible. Can look left, handles inserted columns better. Slightly more complex but more robust. Preferred by power users.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does the dollar sign mean in formulas?</h3>
            <p className="text-sm text-muted-foreground">
              Dollar signs create absolute references. $A$1 stays fixed when copying. A1 changes relatively. Mix like $A1 for column-fixed, row-relative.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I combine multiple conditions?</h3>
            <p className="text-sm text-muted-foreground">
              Use AND() or OR() inside IF. Or use IFS for multiple conditions. SUMIFS and COUNTIFS handle multiple criteria directly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use formulas across sheets?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, use SheetName!CellReference. Like =SUM(Sheet2!A1:A10). Works across workbooks too with proper file path references.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What are array formulas?</h3>
            <p className="text-sm text-muted-foreground">
              Formulas that operate on ranges. In newer Excel, dynamic arrays spill automatically. Older Excel needs Ctrl+Shift+Enter. Powerful for complex calculations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Are these formulas compatible with Google Sheets?</h3>
            <p className="text-sm text-muted-foreground">
              Most formulas work in both. Some Excel-specific functions don't exist in Sheets. Google has some unique functions too. Check compatibility for your needs.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
