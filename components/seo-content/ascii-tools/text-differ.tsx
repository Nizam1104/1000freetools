import React from "react"

export default function TextDifferSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How It Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool compares two versions of text line by line using the Longest Common
            Subsequence (LCS) algorithm. It identifies which lines appear in both versions,
            which lines were added in the modified text, and which lines were removed from
            the original.
          </p>

          <p>
            The diff engine splits both inputs by newline characters, then computes the
            optimal alignment between them. Lines that match exactly are marked as unchanged.
            Lines only in the original are marked as removed (shown in red). Lines only in
            the modified version are marked as added (shown in green).
          </p>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Diff view options:</p>
            <div className="space-y-2 text-sm">
              <div className="p-2 rounded bg-muted">
                <strong>Side-by-side:</strong> Original on the left, modified on the right.
                Best for detailed line-by-line comparison with line numbers visible.
              </div>
              <div className="p-2 rounded bg-muted">
                <strong>Inline:</strong> Both versions in a single column with + and -
                prefixes. Compact view similar to git diff output.
              </div>
            </div>
          </div>

          <p>
            You can enable "Ignore whitespace" to treat multiple spaces as one, or
            "Ignore case" to make the comparison case-insensitive. These options help
            when formatting changes aren't relevant to your comparison.
          </p>
        </div>
      </section>

      {/* Specific Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Reviewing code changes before committing</h3>
            <p className="text-sm text-muted-foreground">
              A developer finishes a feature and wants to see exactly what changed before
              committing. They paste the original file content and their modified version
              to verify they didn't accidentally delete important lines or introduce
              formatting errors.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Comparing document revisions</h3>
            <p className="text-sm text-muted-foreground">
              A writer receives an edited draft from their editor. Instead of wrestling
              with Track Changes, they paste both versions into the differ to quickly
              see what paragraphs were rewritten, added, or removed entirely.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Verifying configuration file updates</h3>
            <p className="text-sm text-muted-foreground">
              An ops team member updates a production config file. Before deploying, they
              compare the old and new versions to ensure only intended changes were made
              and no critical settings were accidentally modified or deleted.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Checking plagiarism or content duplication</h3>
            <p className="text-sm text-muted-foreground">
              A teacher suspects a student copied content. They paste the original source
              and the student's submission to identify matching passages and determine
              how much was directly copied versus paraphrased.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Merging conflicting edits from teammates</h3>
            <p className="text-sm text-muted-foreground">
              Two developers edited the same configuration file independently. Before
              merging, one pastes both versions to understand what each person changed,
              then manually combines the edits without losing either person's work.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging why output changed</h3>
            <p className="text-sm text-muted-foreground">
              A data analyst's report output looks different after a code change. They
              compare the old and new output files to pinpoint exactly which numbers or
              formatting changed, helping them trace the bug to its source.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>

        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Comparison is line-based, not character-based.</strong>
              The tool highlights entire lines that differ, not individual characters
              within lines. If you change one word in a 100-character line, the whole
              line shows as changed. For character-level diffs, use a specialized tool.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Line order affects the diff output.</strong>
              Moving a block of lines from one position to another shows as deletions
              and additions, not moves. The LCS algorithm finds the longest matching
              sequence, so large reorganizations may show more changes than expected.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Whitespace ignoring affects all comparisons.</strong>
              When "Ignore whitespace" is enabled, tabs vs spaces don't matter, and
              multiple spaces equal one space. This is useful for formatting changes
              but can hide meaningful whitespace differences in code.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Empty lines are significant.</strong>
              Adding or removing blank lines shows as changes. This is usually correct
              for code (where blank lines affect readability) but can clutter diffs
              for plain text where blank lines are decorative.
            </p>
          </div>

          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For code reviews, use side-by-side view with line
              numbers to reference specific changes. For quick "what changed" checks,
              inline view is faster. The stats counter helps you gauge the scope of
              changes at a glance.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How is this different from git diff?</h3>
            <p className="text-sm text-muted-foreground">
              Git diff works on files in a repository and shows character-level changes
              within lines. This tool works on any pasted text without needing version
              control. It's line-based and better for quick comparisons outside of git
              workflows.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I compare more than two versions?</h3>
            <p className="text-sm text-muted-foreground">
              No, this tool compares exactly two texts. For three-way merges or comparing
              multiple versions, use git's three-way merge tool or specialized diff
              software like Beyond Compare or KDiff3.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What happens with very large files?</h3>
            <p className="text-sm text-muted-foreground">
              The LCS algorithm has O(m*n) complexity, so comparing files with thousands
              of lines each may be slow. For large codebases, use command-line diff tools
              or IDE built-in comparison features optimized for performance.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it support binary file comparison?</h3>
            <p className="text-sm text-muted-foreground">
              No, this tool is designed for text only. Binary files (images, executables,
              etc.) need hex-based comparison tools. For binary diffs, use specialized
              tools like diffoscope or binary comparison utilities.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I export or save the diff results?</h3>
            <p className="text-sm text-muted-foreground">
              The diff is displayed in your browser but isn't directly exportable. You
              can screenshot the results or copy the highlighted output. For permanent
              records, consider using command-line diff with output redirection.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why do some lines show as changed when they look identical?</h3>
            <p className="text-sm text-muted-foreground">
              Hidden characters like trailing spaces, tabs vs spaces, or different line
              endings (CRLF vs LF) can cause apparent matches to show as different.
              Enable "Ignore whitespace" to filter out these formatting differences.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is my data sent to a server?</h3>
            <p className="text-sm text-muted-foreground">
              No, all comparison happens locally in your browser. Your text never leaves
              your computer. This makes the tool safe for comparing sensitive code,
              confidential documents, or proprietary configurations.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
