import React from "react"

export default function YamlLinterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How YAML Linting Works</h2>

        <div className="space-y-3 text-muted-foreground">
          <p>
            YAML linting analyzes your YAML files for syntax errors, style issues, and potential problems. Unlike validation against a schema, linting checks for general best practices, consistency, and common mistakes.
          </p>

          <p>
            This tool parses your YAML and checks for issues like trailing spaces, inconsistent indentation, deprecated syntax, key ordering, line length violations, and other style concerns that affect readability and maintainability.
          </p>

          <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
            <p className="text-sm font-medium">What gets checked:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Syntax errors and parsing issues</li>
              <li>Indentation consistency</li>
              <li>Trailing whitespace</li>
              <li>Line length limits</li>
              <li>Key naming conventions</li>
              <li>Deprecated YAML features</li>
            </ul>
          </div>

          <div className="rounded-lg border bg-green-500/30 bg-green-500/10 p-4">
            <p className="text-sm text-green-700 dark:text-green-300">
              <strong>Auto-fix available:</strong> Some issues can be automatically fixed. The linter suggests or applies fixes for common problems like whitespace and formatting.
            </p>
          </div>
        </div>
      </section>

      {/* Specific Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Pre-commit checks</h3>
            <p className="text-sm text-muted-foreground">
              Lint YAML before committing. Catch style issues and errors before they enter version control.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">CI/CD pipeline validation</h3>
            <p className="text-sm text-muted-foreground">
              Add linting to CI pipelines. Ensure all YAML files meet quality standards before deployment.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Team consistency</h3>
            <p className="text-sm text-muted-foreground">
              Enforce consistent YAML style across team. Everyone follows same conventions for indentation, naming, and formatting.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Legacy file cleanup</h3>
            <p className="text-sm text-muted-foreground">
              Clean up old YAML files. Identify and fix style issues in inherited or legacy configuration files.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning YAML best practices</h3>
            <p className="text-sm text-muted-foreground">
              Learn from lint warnings. Understand YAML best practices through linter feedback on your files.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Code review preparation</h3>
            <p className="text-sm text-muted-foreground">
              Fix lint issues before review. Submit clean YAML for code review, focusing discussion on logic not formatting.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know About YAML Linting</h2>

        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Style rules are configurable.</strong> Different projects have different conventions. Configure lint rules to match your team's style guide.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Warnings vs errors.</strong> Linters report errors (must fix) and warnings (should fix). Errors block deployment, warnings are advisory.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some rules are opinionated.</strong> Style rules (key ordering, quoting) are subjective. Disable rules that don't match your preferences.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Auto-fix is convenient.</strong> Many issues can be auto-fixed. Use auto-fix for mechanical changes, review semantic changes manually.
            </p>
          </div>

          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Integrate linting into your editor for real-time feedback. Fix issues as you write instead of batch-fixing later.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between linting and validation?</h3>
            <p className="text-sm text-muted-foreground">
              Validation checks against a schema (required fields, types). Linting checks style and best practices (formatting, conventions). Both are important for quality.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I customize lint rules?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Enable/disable specific rules, configure thresholds (line length), and set severity levels based on your project needs.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What issues can be auto-fixed?</h3>
            <p className="text-sm text-muted-foreground">
              Trailing whitespace, indentation, line endings, and formatting issues can typically be auto-fixed. Semantic issues require manual fixes.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I fix all warnings?</h3>
            <p className="text-sm text-muted-foreground">
              Fix errors always. Warnings depend on context—some style warnings may be acceptable for your use case. Configure rules to match your needs.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I integrate with CI/CD?</h3>
            <p className="text-sm text-muted-foreground">
              Add lint command to your pipeline. Fail the build on lint errors. Many CI systems have YAML lint actions/plugins available.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does linting catch syntax errors?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Syntax errors are the first thing linters check. Invalid YAML won't pass linting regardless of style rules.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is my data secure?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. All linting happens locally in your browser. Your YAML content never leaves your computer.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
