import React from "react"

export default function MarkdownLinterFormatterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool analyzes your Markdown files for style issues and
            formatting inconsistencies. It checks against a set of configurable
            rules and can automatically fix many common problems.
          </p>
          <p>
            The linter parses your Markdown and checks for issues like
            inconsistent heading styles, trailing whitespace, improper list
            formatting, line length violations, and more. It reports each issue
            with its location and can apply fixes automatically.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Common rules checked:</p>
            <ul className="space-y-2 text-sm list-disc list-inside">
              <li>Consistent heading style (ATX <code className="font-mono bg-background px-1.5 py-0.5 rounded">#</code> vs setid <code className="font-mono bg-background px-1.5 py-0.5 rounded">===</code>)</li>
              <li>No trailing whitespace at line ends</li>
              <li>Consistent list marker style (<code className="font-mono bg-background px-1.5 py-0.5 rounded">-</code> vs <code className="font-mono bg-background px-1.5 py-0.5 rounded">*</code>)</li>
              <li>Maximum line length (typically 80-120 characters)</li>
              <li>Proper spacing around emphasis (<code className="font-mono bg-background px-1.5 py-0.5 rounded">**bold**</code> not <code className="font-mono bg-background px-1.5 py-0.5 rounded">** bold **</code>)</li>
              <li>Single blank line between sections</li>
            </ul>
          </div>
          <p>
            Run the linter to see issues listed with line numbers. Apply
            automatic fixes for common problems, then manually review any
            remaining warnings that need human judgment.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When you'd actually use this</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Enforcing team documentation standards</h3>
            <p className="text-sm text-muted-foreground">
              A team has a style guide for Markdown docs. They run the linter
              on all contributions to ensure consistent formatting across the
              documentation, regardless of who wrote it.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Cleaning up legacy documentation</h3>
            <p className="text-sm text-muted-foreground">
              Someone inherits a docs repo with inconsistent formatting from
              multiple authors over years. They run the linter with auto-fix to
              standardize everything before taking over maintenance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Pre-commit checks for Markdown files</h3>
            <p className="text-sm text-muted-foreground">
              A developer sets up the linter as a pre-commit hook. Before any
              Markdown changes are committed, the linter runs automatically,
              catching formatting issues before they reach the repo.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing docs for open source release</h3>
            <p className="text-sm text-muted-foreground">
              Before open-sourcing internal docs, a team runs the linter to
              ensure professional, consistent formatting. Clean docs make a
              better first impression on potential contributors.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning Markdown best practices</h3>
            <p className="text-sm text-muted-foreground">
              A junior developer writes docs and runs the linter to learn what
              issues it finds. The warnings teach them proper Markdown style
              through practical feedback on their writing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Maintaining large documentation sets</h3>
            <p className="text-sm text-muted-foreground">
              A tech writer manages hundreds of Markdown files. The linter
              helps them maintain consistency across the entire set, catching
              formatting drift that happens over time with many edits.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to know before using it</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Not all rules apply to every project.</strong>
              Some rules are opinionated. Line length limits, heading styles,
              and list markers are matters of preference. Configure rules to
              match your project's style guide.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Auto-fix can change intended formatting.</strong>
              Automatic fixes are safe for mechanical issues (trailing spaces,
              spacing around emphasis) but review changes. Some "issues" may be
              intentional stylistic choices.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some issues require manual fixes.</strong>
              The linter can't fix everything automatically. Content issues,
              structural problems, and ambiguous cases need human judgment. Use
              the linter report as a checklist for manual review.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Different linters have different rules.</strong>
              markdownlint, remark-lint, and other tools have different default
              rules. This tool provides common rules, but may differ from what
              your CI/CD pipeline expects.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Create a configuration file for your
              project that specifies which rules to enable/disable. This
              ensures consistent linting across all contributors and CI runs.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between linting and formatting?</h3>
            <p className="text-sm text-muted-foreground">
              Linting finds issues; formatting fixes them. This tool does both:
              it identifies problems and can automatically fix mechanical
              issues. Some tools separate these functions, but they work well
              together.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I disable specific rules?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, most linters allow rule configuration. Disable rules that
              don't fit your style. You can also disable rules for specific
              lines or sections using comments in your Markdown.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work with GitHub Flavored Markdown?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, modern linters support GFM extensions like tables, task
              lists, and strikethrough. Rules account for these features when
              checking formatting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I integrate this into my workflow?</h3>
            <p className="text-sm text-muted-foreground">
              Use it as a pre-commit hook, in CI/CD pipelines, or as part of
              your editor setup. Many editors have Markdown linting extensions
              that show issues as you write.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I lint multiple files at once?</h3>
            <p className="text-sm text-muted-foreground">
              This tool handles one file at a time. For batch linting, use
              command-line linters like markdownlint-cli that can process
              entire directories and output summary reports.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about front matter?</h3>
            <p className="text-sm text-muted-foreground">
              Most linters skip YAML front matter by default, as it has its own
              syntax rules. Some linters have separate rules for front matter
              validation if needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does linting affect content meaning?</h3>
            <p className="text-sm text-muted-foreground">
              No. Linting only affects formatting and style, not content
              meaning. Proper linting makes your Markdown cleaner without
              changing what it says or how it renders.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I fix every warning?</h3>
            <p className="text-sm text-muted-foreground">
              Fix style violations for consistency. Some warnings are
              suggestions, not errors. Prioritize fixes that improve
              readability and match your team's agreed-upon style.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
