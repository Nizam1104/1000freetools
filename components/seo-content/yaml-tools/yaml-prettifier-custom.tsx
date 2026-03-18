import React from "react"

export default function YamlPrettifierCustomSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How Custom YAML Prettifying Works</h2>

        <div className="space-y-3 text-muted-foreground">
          <p>
            YAML prettifying transforms compact or inconsistently formatted YAML into a clean, readable structure. This tool goes beyond basic formatting by letting you customize indentation, line width, quoting style, and other formatting rules.
          </p>

          <p>
            The prettifier parses your YAML into a data structure, then regenerates it according to your specified rules. This ensures consistent formatting across your team's configuration files and documentation.
          </p>

          <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
            <p className="text-sm font-medium">Here's the process:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>YAML is parsed into an abstract syntax tree</li>
              <li>Your formatting rules are applied to each node</li>
              <li>Output is generated with consistent styling</li>
              <li>Result is valid YAML with your preferred format</li>
            </ol>
          </div>

          <div className="rounded-lg border bg-green-500/30 bg-green-500/10 p-4">
            <p className="text-sm text-green-700 dark:text-green-300">
              <strong>Team benefit:</strong> Custom formatting rules ensure everyone on your team produces identical YAML style, eliminating formatting debates in code reviews.
            </p>
          </div>
        </div>
      </section>

      {/* Specific Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Team style enforcement</h3>
            <p className="text-sm text-muted-foreground">
              Enforce consistent YAML formatting across your team. Set indentation (2 vs 4 spaces), quoting rules, and line width. Everyone's configs look identical.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Code review preparation</h3>
            <p className="text-sm text-muted-foreground">
              Format YAML before submitting pull requests. Clean, consistent formatting makes reviews focus on actual changes rather than whitespace differences.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Legacy file modernization</h3>
            <p className="text-sm text-muted-foreground">
              Update old YAML files to match current standards. Reformat inherited configs to your team's style guide without manual editing.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Documentation generation</h3>
            <p className="text-sm text-muted-foreground">
              Create publication-ready YAML examples. Format configs for documentation, books, or tutorials with consistent, readable styling.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">CI/CD pipeline standardization</h3>
            <p className="text-sm text-muted-foreground">
              Auto-format YAML in continuous integration. Add prettifying to your pipeline to catch and fix formatting issues before deployment.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Multi-project consistency</h3>
            <p className="text-sm text-muted-foreground">
              Maintain identical YAML style across multiple repositories. Use the same formatting rules for all projects in your organization.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know About YAML Formatting</h2>

        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Indentation must be consistent.</strong> YAML requires consistent indentation within a file. Choose 2 spaces (common) or 4 spaces (traditional), but never mix tabs and spaces.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Quoting affects readability.</strong> Quotes around strings are optional in many cases. Consistent quoting rules (always quote, never quote, or quote-only-when-needed) improve visual consistency.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Line width impacts readability.</strong> Long lines are hard to read. Set a max width (80 or 120 characters) to ensure YAML displays well in editors and terminals.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Comments are preserved.</strong> Unlike minification, prettifying keeps all comments intact. Your documentation stays with the formatted output.
            </p>
          </div>

          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Save your formatting rules as a config file. Many YAML tools support configuration files so your team can share and enforce the same formatting automatically.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the standard YAML indentation?</h3>
            <p className="text-sm text-muted-foreground">
              Two spaces is the modern convention, especially in DevOps tools like Kubernetes and Ansible. Four spaces was common historically. Avoid tabs—YAML parsers may reject them.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I quote all strings?</h3>
            <p className="text-sm text-muted-foreground">
              It depends on your style guide. Quoting everything is explicit and safe. Quoting only when needed (special characters, numbers that look like strings) is cleaner. Be consistent.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does formatting change the data?</h3>
            <p className="text-sm text-muted-foreground">
              No. Prettifying only changes whitespace and formatting. All data values, structure, and comments remain identical. The YAML is semantically unchanged.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I format invalid YAML?</h3>
            <p className="text-sm text-muted-foreground">
              No. The YAML must be valid to parse. Fix syntax errors first, then prettify. This tool will show error messages if your YAML has issues.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I enforce formatting in my team?</h3>
            <p className="text-sm text-muted-foreground">
              Use pre-commit hooks or CI checks. Run the prettifier automatically on YAML files before commits. Reject PRs with formatting issues until they're fixed.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work with YAML anchors?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Anchors (&) and aliases (*) are preserved and formatted correctly. The prettifier maintains all YAML features including custom tags.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is my YAML sent to a server?</h3>
            <p className="text-sm text-muted-foreground">
              No. All formatting happens locally in your browser. Your YAML never leaves your computer. This tool works offline after the initial page load.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
