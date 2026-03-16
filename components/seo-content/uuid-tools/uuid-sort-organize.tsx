export default function UuidSortOrganizeSEO() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How the UUID Sort & Organize Tool Works</h2>
        <p className="text-muted-foreground">
          This tool processes lists of UUIDs entirely in your browser. It validates each line, separates valid UUIDs from invalid entries, and applies sorting based on your selected method.
        </p>
        <p className="text-muted-foreground">
          Two sorting modes are available: lexicographical (alphabetical string comparison) and timestamp-based (extracts the time component from version 1 UUIDs). The tool also optionally removes duplicates using case-insensitive comparison.
        </p>
        <div className="rounded-lg border bg-muted/30 p-4">
          <p className="text-sm font-medium mb-2">Sorting modes explained:</p>
          <div className="space-y-2 text-sm">
            <div>
              <p className="font-medium">Lexicographical (alphabetical)</p>
              <p className="text-muted-foreground">Treats UUIDs as strings and sorts them character by character. Fast and works with any UUID version.</p>
            </div>
            <div>
              <p className="font-medium">Timestamp (v1 only)</p>
              <p className="text-muted-foreground">Extracts the 60-bit timestamp from version 1 UUIDs and sorts chronologically. For non-v1 UUIDs, results are undefined.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Real Use Cases</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Database export cleanup</p>
            <p className="text-sm text-muted-foreground">
              A data analyst exports UUID-based records from a database and needs them sorted for comparison with another export.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Log file analysis</p>
            <p className="text-sm text-muted-foreground">
              DevOps engineers extract request IDs from distributed logs and sort them chronologically to trace execution flow.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Duplicate detection in imports</p>
            <p className="text-sm text-muted-foreground">
              Before importing a CSV of user records, someone checks for duplicate UUIDs that could cause primary key conflicts.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Test data preparation</p>
            <p className="text-sm text-muted-foreground">
              A QA engineer generates UUIDs for test fixtures and needs them in a predictable order for reproducible test runs.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Audit trail reconstruction</p>
            <p className="text-sm text-muted-foreground">
              Security analysts sort v1 UUIDs from access logs by timestamp to rebuild the sequence of events during an incident.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Data deduplication</p>
            <p className="text-sm text-muted-foreground">
              After merging datasets from multiple sources, an engineer removes duplicate UUIDs to create a clean master list.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">What to Know Before Using</h2>
        <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Input format:</strong> Paste UUIDs one per line or in any text format. The tool extracts valid UUIDs and reports invalid entries separately.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Case-insensitive deduplication:</strong> <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">550e8400...</code> and <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">550E8400...</code> are treated as the same UUID when removing duplicates.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Timestamp sorting limitation:</strong> Only works correctly with version 1 UUIDs (time-based). Version 4 (random) UUIDs sorted by timestamp will produce meaningless results.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Output options:</strong> Add line numbers for easy reference in documentation or reports. Download as a text file for use in other tools.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">FAQ</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-base font-semibold">What's the difference between lexicographical and timestamp sorting?</h3>
            <p className="text-sm text-muted-foreground">
              Lexicographical sorts UUIDs alphabetically as strings (like dictionary order). Timestamp sorting extracts the embedded time value from version 1 UUIDs and sorts by actual generation time. Use lexicographical for general purposes, timestamp for chronological ordering of v1 UUIDs.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">How do I know if my UUIDs are version 1?</h3>
            <p className="text-sm text-muted-foreground">
              Check the 13th character (after the second hyphen). If it's "1", it's version 1. For example: <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">6ba7b810-9dad-<strong className="text-primary">1</strong>1d1-80b4-00c04fd430c8</code>. If it's "4", it's random (v4) and timestamp sorting won't work.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">Can this handle large lists?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but performance depends on your browser. Lists with thousands of UUIDs should process quickly. For extremely large files (100,000+), consider using command-line tools instead.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">What happens to invalid entries?</h3>
            <p className="text-sm text-muted-foreground">
              Invalid entries are separated from valid UUIDs and shown in a warning section. They're excluded from the sorted output but you can see what was skipped and fix them.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">Does sorting change the UUID values?</h3>
            <p className="text-sm text-muted-foreground">
              No, sorting only reorders the list. Each UUID keeps its original format (case and hyphenation). If you need to normalize format, use the UUID Case Formatter tool.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">Can I export the sorted list?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, click the Download button to save as a text file, or use Copy to paste into another application. Line numbers are included if you enabled that option.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
