import React from "react"

export default function JavascriptDiffCheckerSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the JavaScript Diff Checker Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste the original code in the left panel and the modified version in the right panel. Click Compare to see the differences highlighted line by line.
          </p>
          <p>
            Added lines appear with green highlighting and a plus sign. Removed lines show in red with a minus sign. Unchanged lines provide context with no highlighting.
          </p>
          <p>
            Statistics show the count of additions, deletions, and unchanged lines. Copy the diff output in standard unified diff format for sharing or documentation.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Reviewing code changes</h3>
            <p className="text-sm text-muted-foreground">
              Before committing, see exactly what changed. Catch accidental modifications. Verify your edits match your intentions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging regression issues</h3>
            <p className="text-sm text-muted-foreground">
              Code worked yesterday, broken today. Compare the two versions to find what changed. Pinpoint the exact line causing issues.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Merging conflicting changes</h3>
            <p className="text-sm text-muted-foreground">
              Two developers edited the same file. Compare both versions to understand conflicts. Decide which changes to keep.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning from code reviews</h3>
            <p className="text-sm text-muted-foreground">
              See what changed between your draft and the reviewed version. Understand suggested improvements. Learn better coding patterns.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Documenting API changes</h3>
            <p className="text-sm text-muted-foreground">
              Show stakeholders exactly what changed in the new version. Generate changelogs from diffs. Clear communication of updates.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Comparing configuration files</h3>
            <p className="text-sm text-muted-foreground">
              Server configs drift over time. Compare production vs staging. Find the one setting causing different behavior.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Comparison is line-by-line.</strong>
              The diff checker compares complete lines, not individual characters. A changed word marks the whole line as different.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Whitespace changes count as differences.</strong>
              Added spaces or tabs show as changes. Reformatting code creates many diffs. Consider normalizing whitespace first.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Order matters for comparison.</strong>
              Original goes on the left, modified on the right. Swapping them reverses what's shown as added vs removed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Large files may be slow.</strong>
              Very large code files take time to compare. Browser performance limits apply. Consider specialized diff tools for huge files.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For ongoing development, use Git for version control. It provides powerful diff capabilities integrated with your workflow. This tool is great for quick comparisons.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can it compare non-code text?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, any text works. Documents, configs, data files - the diff checker treats everything as plain text lines.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it ignore whitespace?</h3>
            <p className="text-sm text-muted-foreground">
              No, whitespace differences are shown. Leading/trailing spaces count. For code comparison, this helps catch formatting changes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I compare more than two versions?</h3>
            <p className="text-sm text-muted-foreground">
              This tool compares two versions at a time. For multiple versions, compare sequentially or use a version control system.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What format is the output?</h3>
            <p className="text-sm text-muted-foreground">
              Unified diff format with + for additions and - for deletions. Standard format understood by patch tools and diff viewers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it support syntax highlighting?</h3>
            <p className="text-sm text-muted-foreground">
              No, the diff output is plain text with color highlighting for changes. Syntax highlighting would require language-specific parsing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I save the comparison?</h3>
            <p className="text-sm text-muted-foreground">
              Copy the diff output and save it as a .diff or .patch file. Or paste into a document for records and sharing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is my code sent anywhere?</h3>
            <p className="text-sm text-muted-foreground">
              No, comparison happens entirely in your browser. Your code never leaves your computer. Safe for proprietary code.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
