import React from "react"

export default function UnicodeCsvTsvEscaperSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Unicode CSV/TSV Escaper Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select CSV or TSV format. Choose whether to escape (add quotes) or unescape (remove quotes). Paste your data into the input field and click the process button.
          </p>
          <p>
            Escaping follows RFC 4180 for CSV and standard TSV conventions. Fields containing delimiters, quotes, or newlines get wrapped in double quotes. Internal quotes are doubled ("") to escape them.
          </p>
          <p>
            Unescaping reverses the process. Quoted fields have their quotes removed, doubled quotes become single quotes. The result is plain text ready for display or further processing.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing data for Excel import</h3>
            <p className="text-sm text-muted-foreground">
              Excel expects properly escaped CSV. Fields with commas need quotes. Your product description "Widget, large" becomes "Widget, large" in CSV.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Exporting database records</h3>
            <p className="text-sm text-muted-foreground">
              Database dumps to CSV need proper escaping. User input may contain commas or quotes. Escape before export so the CSV parses correctly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Processing user-uploaded spreadsheets</h3>
            <p className="text-sm text-muted-foreground">
              Users upload CSV files with messy data. Unescape to get clean values for your application. Handle quoted fields with embedded delimiters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Working with international data</h3>
            <p className="text-sm text-muted-foreground">
              Unicode characters in CSV need proper handling. Names like "M" or addresses with special characters must be preserved through escaping.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Generating reports from code</h3>
            <p className="text-sm text-muted-foreground">
              Your script outputs CSV for analysts to use. Escape all fields properly. Don't assume data is clean - escape everything that might contain delimiters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Migrating data between systems</h3>
            <p className="text-sm text-muted-foreground">
              CSV is a common migration format. Escape source data, import to target. Verify unescaping on the other end produces identical values.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">CSV escaping isn't universal.</strong>
              Different programs have slight variations. Excel, Google Sheets, and database tools mostly agree on RFC 4180, but edge cases may differ.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Newlines in fields are tricky.</strong>
              A field can contain actual line breaks if quoted. "Line 1\nLine 2" is valid CSV. Some parsers handle this poorly. TSV avoids this issue.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">TSV is simpler but not perfect.</strong>
              Tabs are less common than commas in data, so TSV needs fewer escapes. But tabs do appear in copied text and code snippets.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Encoding matters for Unicode.</strong>
              Save CSV files as UTF-8 for international characters. Excel on Windows may need a BOM. Mac and Linux handle UTF-8 without BOM.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> When in doubt, quote everything. Always quoting all fields is valid CSV and avoids edge cases. It's slightly larger but more reliable.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between CSV and TSV?</h3>
            <p className="text-sm text-muted-foreground">
              CSV uses commas as delimiters, TSV uses tabs. TSV is better for data that contains commas. CSV is more widely supported by applications.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How are quotes escaped in CSV?</h3>
            <p className="text-sm text-muted-foreground">
              Double them. A quote inside a quoted field becomes two quotes. "He said ""Hello""" represents the value: He said "Hello"
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I process multi-line CSV?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, paste the entire CSV including newlines. The escaper handles quoted fields that span multiple lines correctly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about semicolon-separated values?</h3>
            <p className="text-sm text-muted-foreground">
              European CSV often uses semicolons. This tool handles CSV (comma) and TSV (tab). For semicolons, use a text editor with find/replace.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this validate CSV structure?</h3>
            <p className="text-sm text-muted-foreground">
              No, it just escapes or unescapes fields. Malformed CSV may produce unexpected results. Check your input has consistent column counts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I handle very large CSV files?</h3>
            <p className="text-sm text-muted-foreground">
              This tool works in the browser with memory limits. For large files, use command-line tools like csvkit, or process in chunks with a script.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I download the escaped data?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, use the Download button to save as a .csv or .tsv file. The file is UTF-8 encoded and ready to open in spreadsheet applications.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
