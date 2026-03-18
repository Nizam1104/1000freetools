import React from "react"

export default function MarkdownDiffCheckerSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool compares two versions of a Markdown document and shows
            exactly what changed between them. It highlights additions,
            deletions, and modifications in a clear visual diff view.
          </p>
          <p>
            The diff checker uses text comparison algorithms to identify
            differences at the line level and sometimes word level. Changes are
            displayed with color coding: green for additions, red for
            deletions, and highlighting for modifications.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Diff view types:</p>
            <ul className="space-y-2 text-sm list-disc list-inside">
              <li>Side-by-side: Original on left, modified on right</li>
              <li>Inline: Changes shown in a single unified view</li>
              <li>Word-level: Shows exact word changes within lines</li>
              <li>Line-level: Shows which lines were added or removed</li>
            </ul>
          </div>
          <p>
            Paste the original Markdown in one panel and the modified version
            in the other. The tool instantly shows differences, making it easy
            to review edits, track changes, or understand what was modified.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When you'd actually use this</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Reviewing documentation edits from teammates</h3>
            <p className="text-sm text-muted-foreground">
              A tech writer receives an edited doc from a reviewer. They run a
              diff to see exactly what changed before accepting the edits,
              ensuring no unintended modifications slipped in.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Tracking changes before committing to git</h3>
            <p className="text-sm text-muted-foreground">
              A developer edits documentation and wants to review changes
              before committing. They diff the current version against the
              committed version to verify only intended changes will be
              committed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Comparing draft versions of articles</h3>
            <p className="text-sm text-muted-foreground">
              A blogger keeps multiple drafts of an article. They diff versions
              to see how the article evolved, helping them decide which changes
              to keep in the final version.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Verifying automated doc updates</h3>
            <p className="text-sm text-muted-foreground">
              Someone uses a script to auto-update documentation. They diff
              before and after to verify the script made correct changes and
              didn't break anything unexpectedly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Merging conflicting documentation edits</h3>
            <p className="text-sm text-muted-foreground">
              Two team members edit the same doc independently. They diff both
              versions to identify conflicts and manually merge the changes,
              ensuring no edits are lost.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Auditing content changes over time</h3>
            <p className="text-sm text-muted-foreground">
              A compliance officer needs to track how policy docs changed. They
              diff versions from different dates to create an audit trail of
              what was modified and when.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to know before using it</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Whitespace changes can clutter diffs.</strong>
              Trailing spaces, indentation changes, and line ending differences
              show up as changes. Some tools offer options to ignore whitespace
              for cleaner diffs focusing on content.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Large files may be slow to compare.</strong>
              Very long documents take more processing time. For huge files,
              consider command-line diff tools optimized for performance or
              compare in sections.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Markdown structure changes can look dramatic.</strong>
              Reformatting (like changing list markers) shows as many changes
              even though rendered output is identical. Focus on content
              changes, not formatting-only diffs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Binary or image references won't show content diffs.</strong>
              If your Markdown references images or files, the diff only shows
              path changes, not image content changes. Check referenced files
              separately.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For ongoing documentation work, use git
              for version control. Git's diff tools are powerful and track
              history automatically. This tool is great for quick one-off
              comparisons.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between side-by-side and inline diff?</h3>
            <p className="text-sm text-muted-foreground">
              Side-by-side shows original and modified versions next to each
              other, making it easy to compare. Inline shows changes in a
              single view with additions and deletions marked. Choose based on
              your preference and screen space.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I merge changes from the diff view?</h3>
            <p className="text-sm text-muted-foreground">
              This tool shows differences but doesn't support merging. For
              merging, use a proper merge tool or git's merge functionality.
              Copy desired changes manually from the diff view.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work with GitHub Flavored Markdown?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. The diff checker compares raw text, so it works with any
              Markdown variant. GFM-specific syntax like tables and task lists
              are compared like any other text.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I ignore whitespace changes?</h3>
            <p className="text-sm text-muted-foreground">
              Some diff tools have an "ignore whitespace" option. If this tool
              doesn't, consider normalizing whitespace before comparing, or use
              a tool that supports whitespace-ignoring diffs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I save or export the diff results?</h3>
            <p className="text-sm text-muted-foreground">
              This tool displays diffs in the browser. For saving, take a
              screenshot or copy the diff output. Some tools offer export to
              patch files or HTML reports.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if the files are very similar?</h3>
            <p className="text-sm text-muted-foreground">
              Small changes show up clearly. The diff highlights exactly what
              changed, even if it's just a word or character. This precision
              helps catch subtle edits or typos.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I compare more than two versions?</h3>
            <p className="text-sm text-muted-foreground">
              This tool compares two versions at a time. For multiple versions,
              compare sequentially or use version control tools like git that
              can show diffs between any two commits in history.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this preserve Markdown formatting in the diff?</h3>
            <p className="text-sm text-muted-foreground">
              The diff shows raw Markdown source, not rendered output. This is
              intentional - you're comparing the source code, not the rendered
              result. This helps identify exact source changes.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
