import React from "react"

export default function TomlDiffCompareSEO() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How the TOML Diff and Compare Tool Works</h2>
        <div className="prose prose-sm dark:prose-invert">
          <p className="text-muted-foreground">
            This tool compares two TOML files and identifies exactly what changed. It parses both files,
            compares all keys and values, and categorizes changes as added, removed, or modified.
            The visual diff output makes it easy to understand configuration changes.
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <h3 className="text-lg font-semibold">Comparison Process</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Paste the original TOML in the first input area</li>
            <li>Paste the modified TOML in the second input area</li>
            <li>Click &quot;Compare TOML&quot; to analyze differences</li>
            <li>Both files are parsed and validated</li>
            <li>Keys and values are compared recursively</li>
            <li>Changes are categorized: added (green), removed (red), modified (yellow)</li>
            <li>Review the diff results or copy/download them</li>
          </ol>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Specific Use Cases</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Configuration Change Review</h3>
            <p className="text-sm text-muted-foreground">
              A DevOps engineer reviews config changes before deployment.
              The diff shows exactly what settings changed between versions.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Version Control Analysis</h3>
            <p className="text-sm text-muted-foreground">
              A developer compares TOML files from different Git commits.
              Understanding config changes helps debug issues.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Environment Comparison</h3>
            <p className="text-sm text-muted-foreground">
              A team compares staging and production configurations.
              The diff reveals environment-specific differences.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Dependency Update Verification</h3>
            <p className="text-sm text-muted-foreground">
              After updating a package manager lock file, compare before and after.
              Verify only expected dependencies changed.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Troubleshooting Config Issues</h3>
            <p className="text-sm text-muted-foreground">
              When something breaks, compare working and broken configs.
              The diff quickly identifies the problematic change.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using This Tool</h2>
        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <p className="text-muted-foreground">
            Understanding TOML comparison:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Added items exist in modified but not original (green)</li>
            <li>Removed items exist in original but not modified (red)</li>
            <li>Modified items exist in both but have different values (yellow)</li>
            <li>Nested keys are compared using dot notation</li>
            <li>Array order matters - reordered arrays show as modified</li>
            <li>Both files must be valid TOML for comparison</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">How are nested keys compared?</h3>
            <p className="text-sm text-muted-foreground">
              Nested keys use dot notation (database.host). The tool compares
              the full path to identify exactly which nested value changed.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What if both files are identical?</h3>
            <p className="text-sm text-muted-foreground">
              All three categories will show zero changes. This confirms
              the files are functionally identical.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Does key order matter?</h3>
            <p className="text-sm text-muted-foreground">
              No, TOML key order doesn&apos;t affect equality. The tool compares
              key-value pairs regardless of their order in the file.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">How are arrays compared?</h3>
            <p className="text-sm text-muted-foreground">
              Arrays are compared by value and order. A reordered array
              shows as modified even if values are the same.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Can I compare more than two files?</h3>
            <p className="text-sm text-muted-foreground">
              This tool compares two files at a time. For multiple files,
              compare them pairwise or use a dedicated multi-file diff tool.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What happens with invalid TOML?</h3>
            <p className="text-sm text-muted-foreground">
              The tool validates both files before comparing. If either
              file is invalid, you&apos;ll see an error message.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
