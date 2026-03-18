import React from "react"

export default function YamlDiffCheckerSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How YAML Diff and Comparison Works</h2>

        <div className="space-y-3 text-muted-foreground">
          <p>
            YAML diff comparison analyzes two YAML documents and identifies structural differences. Unlike text-based diff tools, this understands YAML structure—detecting value changes, added/removed keys, and modified nested objects.
          </p>

          <p>
            The tool parses both YAML documents into data structures, then performs a deep comparison. Changes are highlighted with color coding: additions in green, deletions in red, and modifications clearly marked.
          </p>

          <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
            <p className="text-sm font-medium">What gets detected:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Added keys (present in new, missing in old)</li>
              <li>Removed keys (present in old, missing in new)</li>
              <li>Changed values (same key, different value)</li>
              <li>Type changes (string to number, etc.)</li>
              <li>Nested structure modifications</li>
            </ul>
          </div>

          <div className="rounded-lg border bg-green-500/30 bg-green-500/10 p-4">
            <p className="text-sm text-green-700 dark:text-green-300">
              <strong>Structural awareness:</strong> Unlike text diff, YAML diff understands that reordering keys or changing whitespace doesn't change the data—only actual value changes are flagged.
            </p>
          </div>
        </div>
      </section>

      {/* Specific Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Configuration change review</h3>
            <p className="text-sm text-muted-foreground">
              Review config changes before deployment. Compare current and proposed YAML configs to understand exactly what will change in production.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Git commit analysis</h3>
            <p className="text-sm text-muted-foreground">
              Understand YAML file changes in commits. See what actually changed in Kubernetes manifests, CI configs, or other YAML files between commits.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Environment comparison</h3>
            <p className="text-sm text-muted-foreground">
              Compare configs across environments. Find differences between dev, staging, and production YAML configurations to identify drift.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Version upgrade planning</h3>
            <p className="text-sm text-muted-foreground">
              Compare old and new version configs. When upgrading software, diff the default configs to see what new settings were added.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Troubleshooting changes</h3>
            <p className="text-sm text-muted-foreground">
              Debug configuration-related issues. Compare working and broken configs to identify what change caused the problem.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Pull request reviews</h3>
            <p className="text-sm text-muted-foreground">
              Review YAML changes in PRs. Structural diff makes it easier to understand config changes than raw git diff output.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know About YAML Diff</h2>

        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Order doesn't matter.</strong> YAML key order is insignificant. The diff tool recognizes that reordered keys are the same data, not a change.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Whitespace is ignored.</strong> Formatting differences (indentation style, blank lines) don't register as changes. Only actual data differences matter.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Arrays are compared by position.</strong> List items are compared by index, not by content. Reordered list items show as changes.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Comments are not compared.</strong> Comments are metadata, not data. Comment changes aren't shown in structural diff.
            </p>
          </div>

          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For Kubernetes configs, consider using specialized tools like kubectl diff for cluster-aware comparison. This tool is for general YAML comparison.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How is this different from text diff?</h3>
            <p className="text-sm text-muted-foreground">
              Text diff compares lines character-by-character. YAML diff understands structure—reordering keys or changing whitespace doesn't show as changes, only actual data changes.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I compare large YAML files?</h3>
            <p className="text-sm text-muted-foreground">
              Files up to 5MB work well. Larger files may slow down the browser. For very large files, use command-line diff tools.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it handle nested structures?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Deep nesting is fully supported. Changes at any level are detected and highlighted with their full path context.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about YAML anchors?</h3>
            <p className="text-sm text-muted-foreground">
              Anchors are resolved before comparison. The diff shows the expanded values, not the anchor references.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I export the diff results?</h3>
            <p className="text-sm text-muted-foreground">
              Copy the diff output or take a screenshot. Some tools offer export options for sharing diff results with team members.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it validate the YAML?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Both documents are validated during parsing. Invalid YAML shows error messages indicating the problem location.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is my data secure?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. All comparison happens locally in your browser. Your YAML documents never leave your computer. Safe for sensitive configs.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
