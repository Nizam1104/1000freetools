import React from "react"

export default function HtmlValidatorLinterSEO() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How the HTML Validator and Linter Works</h2>
        <div className="prose prose-sm dark:prose-invert">
          <p className="text-muted-foreground">
            This tool analyzes HTML code for syntax errors and common issues. It checks for unclosed tags,
            deprecated elements, missing accessibility attributes, and best practice violations.
            Errors and warnings are reported with line numbers for easy correction.
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <h3 className="text-lg font-semibold">Validation Process</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Paste your HTML code into the input area</li>
            <li>Click &quot;Validate HTML&quot; to start analysis</li>
            <li>The tool parses tags and tracks opening/closing pairs</li>
            <li>Unclosed tags are flagged as errors</li>
            <li>Deprecated tags trigger warnings</li>
            <li>Missing accessibility attributes are noted</li>
            <li>Review errors (must fix) and warnings (should fix)</li>
            <li>Correct issues and re-validate until clean</li>
          </ol>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Specific Use Cases</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Pre-Deployment Quality Check</h3>
            <p className="text-sm text-muted-foreground">
              A developer validates HTML before deploying to production.
              Catching errors early prevents rendering issues and broken layouts.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Accessibility Compliance</h3>
            <p className="text-sm text-muted-foreground">
              A team checks for missing alt attributes and lang declarations.
              Fixing these warnings improves accessibility for users with disabilities.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Learning HTML Best Practices</h3>
            <p className="text-sm text-muted-foreground">
              A student learning web development uses the validator to understand
              proper HTML structure. Warnings explain what needs improvement.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Legacy Code Modernization</h3>
            <p className="text-sm text-muted-foreground">
              A developer updates old HTML files. The validator identifies deprecated
              tags like &lt;font&gt; and &lt;center&gt; that need replacement.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Code Review Automation</h3>
            <p className="text-sm text-muted-foreground">
              A team lead uses the validator during code reviews. It catches
              common mistakes automatically, letting reviewers focus on logic.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using This Tool</h2>
        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <p className="text-muted-foreground">
            Understanding validation results:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Errors are critical issues that break HTML structure</li>
            <li>Warnings are best practice recommendations</li>
            <li>Unclosed tags cause rendering problems</li>
            <li>Deprecated tags still work but should be avoided</li>
            <li>Missing DOCTYPE triggers quirks mode in browsers</li>
            <li>Inline styles aren&apos;t errors but reduce maintainability</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What&apos;s the difference between errors and warnings?</h3>
            <p className="text-sm text-muted-foreground">
              Errors are structural problems that break HTML (unclosed tags, mismatched tags).
              Warnings are best practice issues (deprecated tags, missing attributes) that
              don&apos;t break rendering but should be fixed.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Why is missing DOCTYPE a warning?</h3>
            <p className="text-sm text-muted-foreground">
              Without DOCTYPE, browsers use quirks mode, which emulates old browser behavior.
              This can cause inconsistent rendering. Always include &lt;!DOCTYPE html&gt;.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What tags are considered deprecated?</h3>
            <p className="text-sm text-muted-foreground">
              Deprecated tags include: &lt;acronym&gt;, &lt;applet&gt;, &lt;basefont&gt;,
              &lt;big&gt;, &lt;center&gt;, &lt;font&gt;, &lt;frame&gt;, &lt;frameset&gt;,
              &lt;marquee&gt;, &lt;s&gt;, &lt;strike&gt;, &lt;tt&gt;, &lt;u&gt;.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Why warn about inline styles?</h3>
            <p className="text-sm text-muted-foreground">
              Inline styles mix content and presentation, making maintenance harder.
              External CSS is preferred for separation of concerns and reusability.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What accessibility checks are performed?</h3>
            <p className="text-sm text-muted-foreground">
              The validator checks for missing alt attributes on images and missing lang
              attribute on the html tag. These are essential for screen reader users.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Does valid HTML guarantee correct rendering?</h3>
            <p className="text-sm text-muted-foreground">
              No, valid HTML is necessary but not sufficient. CSS errors, JavaScript bugs,
              and browser differences can still cause rendering issues. Validation is
              the first step in quality assurance.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
