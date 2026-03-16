import React from "react"

export default function ExcelVlookupSimulatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Excel VLOOKUP Simulator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Upload or paste two CSV datasets: your lookup table and your source table. Select the column to match on (like ID or email) and the column to return values from.
          </p>
          <p>
            Choose between exact match (finds identical values only) or approximate match (finds closest lower value). The simulator performs the VLOOKUP operation and shows results instantly.
          </p>
          <p>
            Results display with the new VLOOKUP column added. Download as CSV or copy the results. A syntax reference shows the equivalent Excel formula. All processing happens in your browser.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning VLOOKUP without Excel</h3>
            <p className="text-sm text-muted-foreground">
              Don't have Excel installed? Practice VLOOKUP concepts here. Understand how lookups work before applying in spreadsheets. Great for students and self-learners.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Troubleshooting VLOOKUP errors</h3>
            <p className="text-sm text-muted-foreground">
              Getting #N/A in Excel? Test your data here to understand why. See which rows don't match. Debug your lookup logic without Excel overhead.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Merging datasets programmatically</h3>
            <p className="text-sm text-muted-foreground">
              Need to combine two CSV files by a common key? This simulates what VLOOKUP does. Get results without opening Excel.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Understanding exact vs approximate match</h3>
            <p className="text-sm text-muted-foreground">
              See the difference visually. Exact match finds identical values. Approximate finds ranges. Essential for tax brackets, grading scales, and pricing tiers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing data for Excel import</h3>
            <p className="text-sm text-muted-foreground">
              Pre-join your data before importing to Excel. Add the lookup column here, then work with complete data in your spreadsheet.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Training new Excel users</h3>
            <p className="text-sm text-muted-foreground">
              Teach VLOOKUP concepts without software setup. Show examples interactively. Build confidence before tackling real Excel work.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">VLOOKUP only searches the first column.</strong>
              The lookup value must be in the first column of your source table. Rearrange columns if needed. This is a VLOOKUP limitation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Exact match is usually what you want.</strong>
              Approximate match requires sorted data. It finds the largest value less than or equal to your lookup. Use FALSE for exact match in Excel.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">#N/A means no match found.</strong>
              The lookup value doesn't exist in the source table. Check for typos, extra spaces, or data type mismatches (text vs numbers).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Data types must match.</strong>
              Text "123" doesn't equal number 123. Ensure both tables use the same format for lookup columns. Trim whitespace.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> In modern Excel, use XLOOKUP instead. It's more flexible and doesn't have VLOOKUP's limitations. This simulator helps understand the concepts that apply to both.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the VLOOKUP syntax?</h3>
            <p className="text-sm text-muted-foreground">
              =VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup]). Lookup value to find, table to search, column number to return, TRUE/FALSE for match type.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why do I get #N/A errors?</h3>
            <p className="text-sm text-muted-foreground">
              The lookup value doesn't exist in the source. Common causes: typos, extra spaces, different data types, or the value truly isn't there.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I look up from right to left?</h3>
            <p className="text-sm text-muted-foreground">
              Not with VLOOKUP. It only returns values to the right of the lookup column. Use INDEX/MATCH or XLOOKUP for leftward lookups.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I handle duplicates?</h3>
            <p className="text-sm text-muted-foreground">
              VLOOKUP returns the first match only. If duplicates exist, only the first row's value is returned. Remove duplicates or use FILTER for all matches.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's approximate match used for?</h3>
            <p className="text-sm text-muted-foreground">
              Tax brackets, commission tiers, grading scales. When you need to find which range a value falls into. Data must be sorted ascending.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use wildcards?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, in exact match mode. Use * for multiple characters, ? for single character. "John*" matches "Johnson", "Johnston", etc.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is this tool free?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, completely free. No registration required. Your data stays in your browser - nothing is uploaded to servers.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
