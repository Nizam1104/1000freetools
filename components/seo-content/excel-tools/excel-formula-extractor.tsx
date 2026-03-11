import React from "react"

export default function ExcelFormulaExtractorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Excel Formula Extractor Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Upload your CSV data or paste cells containing formulas. The extractor scans for Excel formula patterns like SUM, VLOOKUP, IF, and more. It identifies cells that contain formulas.
          </p>
          <p>
            Choose to detect formulas or generate JavaScript equivalents. Detection lists all formulas with their cell references. Generation creates JavaScript functions that replicate common Excel formulas.
          </p>
          <p>
            Results show formula location, the formula itself, and description. Copy the list or download as a text file. Understand complex spreadsheets by seeing all formulas at once. All processing happens locally.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Auditing complex spreadsheets</h3>
            <p className="text-sm text-muted-foreground">
              Inherited a workbook you didn't create? Extract all formulas to understand the logic. Map dependencies before making changes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Documenting spreadsheet logic</h3>
            <p className="text-sm text-muted-foreground">
              Create documentation for your workbooks. List all formulas for future reference. Essential for handover and compliance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Migrating to code</h3>
            <p className="text-sm text-muted-foreground">
              Moving from Excel to an application? Extract formulas to understand business logic. Generate JavaScript equivalents as starting point.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning Excel formulas</h3>
            <p className="text-sm text-muted-foreground">
              Study formulas from template workbooks. See how experts structure complex calculations. Learn by examining real examples.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Finding formula errors</h3>
            <p className="text-sm text-muted-foreground">
              Something's calculating wrong. List all formulas to spot issues. Find circular references or incorrect ranges.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating formula libraries</h3>
            <p className="text-sm text-muted-foreground">
              Build a reference of useful formulas. Extract from working spreadsheets. Create a personal formula cookbook.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">CSV doesn't preserve formulas.</strong>
              CSV exports show values, not formulas. For formula extraction, you need the actual Excel file. This tool simulates formula detection from patterns.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">JavaScript equivalents are approximations.</strong>
              Generated code mimics Excel behavior but may differ in edge cases. Use as starting point, not production-ready code.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Cell references are estimated.</strong>
              Without actual Excel file, cell positions are approximated. For accurate references, use Excel's Formula Auditor.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Array formulas aren't detected specially.</strong>
              CSE (Ctrl+Shift+Enter) formulas look like regular formulas in text. Special handling requires Excel inspection.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For real Excel files, use Excel's built-in "Show Formulas" (Ctrl+`) or Formula Auditor. This tool works best with formula text you've copied from Excel.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it work with .xlsx files?</h3>
            <p className="text-sm text-muted-foreground">
              Upload requires CSV format. Export your Excel file as CSV first. For direct .xlsx formula extraction, use Excel's built-in tools.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What formulas are detected?</h3>
            <p className="text-sm text-muted-foreground">
              Common functions: SUM, AVERAGE, VLOOKUP, IF, COUNT, MAX, MIN, CONCATENATE, and many more. Any cell starting with = is flagged.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can it extract macros?</h3>
            <p className="text-sm text-muted-foreground">
              No, macros (VBA code) are separate from formulas. This tool only extracts cell formulas. Use Excel's VBA editor for macro extraction.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How accurate is JavaScript generation?</h3>
            <p className="text-sm text-muted-foreground">
              Basic formulas translate well. Complex Excel-specific functions may need manual adjustment. Use generated code as a template.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can it handle nested formulas?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, nested formulas like IF(VLOOKUP(...),..., ...) are detected as single formulas. The full nested structure is preserved.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it show formula dependencies?</h3>
            <p className="text-sm text-muted-foreground">
              This tool lists formulas but doesn't map dependencies. Use Excel's Trace Precedents/Dependents for dependency visualization.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is this tool free?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, completely free with no registration. Your data stays in your browser. Safe for proprietary spreadsheet analysis.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
