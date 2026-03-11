import React from "react"

export default function YamlValidatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste your YAML content into the editor. The validator parses the content and checks for syntax errors, indentation issues, and structural problems. Results appear instantly as you type.
          </p>
          <p>
            Error messages indicate the exact line and column where problems occur. Common issues include incorrect indentation, missing colons, invalid characters, and malformed structures.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Validation example:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">Invalid YAML:
name: John
  age: 30  # Wrong indentation

Error: Line 2, Column 3
Bad indentation: expected 0 spaces</pre>
          </div>
          <p>
            The validator supports YAML 1.2 specification including anchors, aliases, and multi-document streams. Large files process efficiently with helpful error localization.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">CI/CD pipeline debugging</h3>
            <p className="text-sm text-muted-foreground">
              GitHub Actions YAML failing? Validate before commit. Catch syntax errors early. Fix workflow issues quickly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Kubernetes manifest validation</h3>
            <p className="text-sm text-muted-foreground">
              Verify deployment configs. Catch YAML errors before kubectl apply. Prevent cluster issues. Ensure valid manifests.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Docker Compose files</h3>
            <p className="text-sm text-muted-foreground">
              Validate compose.yaml syntax. Check service definitions. Verify volume mounts. Prevent container startup failures.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Configuration file editing</h3>
            <p className="text-sm text-muted-foreground">
              Ansible playbooks, Helm charts. Any YAML config benefits. Catch typos and formatting. Ensure valid syntax.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">API response debugging</h3>
            <p className="text-sm text-muted-foreground">
              Validate YAML API responses. Check webhook payloads. Debug integration issues. Verify data structures.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning YAML syntax</h3>
            <p className="text-sm text-muted-foreground">
              Students learning configuration. Practice YAML formatting. Get instant feedback. Build correct habits.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Indentation must be consistent.</strong>
              YAML uses spaces, not tabs. Mixing causes errors. Standard is 2 spaces per level. Be consistent throughout file.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Colons need space after.</strong>
              key: value not key:value. Space after colon is required. Exception: empty values allowed. Common source of errors.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Strings may need quotes.</strong>
              Special characters require quoting. Booleans and numbers as strings need quotes. When in doubt, quote it.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Comments start with hash.</strong>
              # begins a comment line. Inline comments after values. Don't put comments inside strings. Can cause parse errors.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Use a YAML-aware editor with linting. VS Code, Sublime, Atom have extensions. Catch errors as you type, not after.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the most common YAML error?</h3>
            <p className="text-sm text-muted-foreground">
              Indentation errors. Mixing tabs and spaces. Inconsistent indentation levels. Always use spaces, be consistent.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this support YAML anchors?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, anchors (&) and aliases (*) are valid YAML. Validator checks their proper usage. References must point to defined anchors.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can it validate multi-document YAML?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, documents separated by ---. Each validates independently. Errors show per document. Useful for Helm charts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How large a file can I validate?</h3>
            <p className="text-sm text-muted-foreground">
              Browser handles moderate files well. Very large files may be slow. Split huge configs if needed. Most configs are small.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it check semantic validity?</h3>
            <p className="text-sm text-muted-foreground">
              Syntax only, not semantics. Valid YAML may not be valid for your app. Schema validation is separate concern.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I validate JSON with this?</h3>
            <p className="text-sm text-muted-foreground">
              JSON is valid YAML subset. Works for JSON too. But use JSON validator for JSON-specific errors. Better error messages.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is my data sent to a server?</h3>
            <p className="text-sm text-muted-foreground">
              No, validation happens in browser. Your YAML never leaves your computer. Safe for sensitive configurations. Client-side only.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
