export default function UuidCollisionCheckerSEO() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How the UUID Collision Checker Works</h2>
        <p className="text-muted-foreground">
          This tool analyzes a list of UUIDs to find duplicates (collisions) and invalid entries. It normalizes each UUID to lowercase for case-insensitive comparison, then counts occurrences of each unique value.
        </p>
        <p className="text-muted-foreground">
          The collision detection uses a hash map internally for O(n) performance, making it efficient even for large lists. Invalid UUIDs are identified using RFC 4122 format validation and reported separately.
        </p>
        <div className="rounded-lg border bg-muted/30 p-4">
          <p className="text-sm font-medium mb-2">What counts as a collision:</p>
          <p className="text-sm text-muted-foreground">
            Two UUIDs are considered identical if they match character-for-character after converting to lowercase. <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">550E8400...</code> and <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">550e8400...</code> are the same UUID, not a collision.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Real Use Cases</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Database integrity verification</p>
            <p className="text-sm text-muted-foreground">
              After a data migration, a DBA checks that no two records ended up with the same UUID primary key, which would indicate corruption.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Import validation</p>
            <p className="text-sm text-muted-foreground">
              Before importing 10,000 user records from a CSV, someone verifies there are no duplicate UUIDs that would cause constraint violations.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Random generator testing</p>
            <p className="text-sm text-muted-foreground">
              A developer testing their UUID generation code collects a million outputs and checks for any collisions that would indicate a broken random number generator.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Log deduplication</p>
            <p className="text-sm text-muted-foreground">
              An analyst notices the same request IDs appearing multiple times in logs and uses this tool to identify which UUIDs are genuinely duplicated vs. just appearing in multiple log files.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Data quality audit</p>
            <p className="text-sm text-muted-foreground">
              A data engineer auditing a customer database finds unexpected duplicate UUIDs, revealing a bug in the record creation logic.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Merge conflict resolution</p>
            <p className="text-sm text-muted-foreground">
              After merging datasets from two acquired companies, an engineer identifies overlapping UUID ranges that need to be remapped to avoid conflicts.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">What to Know Before Using</h2>
        <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">True collisions are rare:</strong> With properly generated v4 UUIDs, collisions are astronomically unlikely. If you find duplicates, it's almost always due to copy-paste errors, bad random number generators, or data import mistakes—not mathematical chance.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Case-insensitive comparison:</strong> UUIDs that differ only in letter case (uppercase vs. lowercase) are NOT duplicates—they're the same UUID written differently. This tool correctly treats them as identical.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Input flexibility:</strong> Paste UUIDs one per line, comma-separated, or in any mixed format. The tool extracts valid UUIDs and ignores other text.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Export unique only:</strong> If duplicates are found, click "Export Unique Only" to generate a cleaned list with each UUID appearing exactly once.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">FAQ</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-base font-semibold">How likely are UUID collisions?</h3>
            <p className="text-sm text-muted-foreground">
              For v4 (random) UUIDs, you'd need to generate about 2.71 quintillion UUIDs to have a 1 in a billion chance of a single collision. In practice, if you're seeing duplicates, something is wrong with your generation code or data handling—not probability.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">What causes UUID collisions in real systems?</h3>
            <p className="text-sm text-muted-foreground">
              Common causes: using weak random number generators (like Math.random() instead of crypto.getRandomValues()), copying the same UUID multiple times, database replication errors, or buggy UUID libraries that don't properly implement RFC 4122.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">Does this tool work with UUID v1, v3, v4, and v5?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, the collision checker works with any UUID version. It only compares the 128-bit value, not how it was generated. A collision is a collision regardless of version.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">What should I do if I find duplicates?</h3>
            <p className="text-sm text-muted-foreground">
              First, verify they're genuine duplicates (same value, not just similar). Then trace where the duplicates originated. If they're in a database, you may need to regenerate UUIDs for affected records and update all foreign key references.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">Can I check for collisions across multiple files?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, copy all UUIDs from all files and paste them together into this tool. It will find duplicates across the entire combined list. For very large datasets, consider using command-line tools like <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">sort | uniq -d</code>.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">How many UUIDs can I check at once?</h3>
            <p className="text-sm text-muted-foreground">
              The tool runs entirely in your browser, so limits depend on your available memory. Lists of tens of thousands of UUIDs should process quickly. For millions of UUIDs, use a dedicated script or database query instead.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
