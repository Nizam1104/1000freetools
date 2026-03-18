import React from "react"

export default function YamlEditorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Online YAML Editor Works</h2>

        <div className="space-y-3 text-muted-foreground">
          <p>
            This online YAML editor provides a complete editing environment in your browser. It combines syntax highlighting, real-time validation, and formatting tools to help you create and modify YAML files efficiently.
          </p>

          <p>
            The editor parses your YAML as you type, highlighting syntax elements and immediately flagging errors. Built-in tools let you format, validate, and download your YAML without switching between multiple tools.
          </p>

          <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
            <p className="text-sm font-medium">Key features:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Syntax highlighting for keys, values, and structures</li>
              <li>Real-time error detection with line numbers</li>
              <li>Auto-indentation and formatting</li>
              <li>Find and replace functionality</li>
              <li>Download as .yaml or .yml file</li>
            </ul>
          </div>

          <div className="rounded-lg border bg-green-500/30 bg-green-500/10 p-4">
            <p className="text-sm text-green-700 dark:text-green-300">
              <strong>Privacy:</strong> All editing happens locally in your browser. Your YAML is never sent to any server. Work on sensitive configurations with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Specific Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Quick configuration edits</h3>
            <p className="text-sm text-muted-foreground">
              Edit YAML configs without installing editors. Perfect for quick changes on machines where you can't install dedicated YAML editors or IDEs.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning YAML syntax</h3>
            <p className="text-sm text-muted-foreground">
              Practice YAML with immediate feedback. Real-time validation shows errors as you type, helping you learn proper YAML structure and indentation.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging YAML errors</h3>
            <p className="text-sm text-muted-foreground">
              Find and fix YAML syntax errors. Paste broken YAML, see exactly where errors occur, and fix them with guidance from the validator.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating configs from scratch</h3>
            <p className="text-sm text-muted-foreground">
              Build new YAML configurations with confidence. Syntax highlighting and auto-completion help you create valid YAML structure from the start.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Collaborative editing</h3>
            <p className="text-sm text-muted-foreground">
              Share YAML snippets for review. Copy output from the editor to share with team members, or use alongside screen sharing for pair editing sessions.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Format conversion prep</h3>
            <p className="text-sm text-muted-foreground">
              Clean and validate YAML before conversion. Ensure your YAML is valid before converting to JSON, XML, or other formats for reliable results.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know About YAML Editing</h2>

        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Indentation is critical.</strong> YAML uses indentation for structure. Use spaces consistently (2 or 4), never tabs. The editor helps maintain consistent indentation.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Validation catches syntax errors.</strong> The editor identifies missing colons, bad indentation, unclosed quotes, and other syntax issues before they cause problems.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Browser storage is temporary.</strong> Your work exists only while the tab is open. Download important files or copy to clipboard before closing.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Large files may slow down.</strong> Very large YAML files (10MB+) may cause browser slowdown. Use desktop editors for massive files.
            </p>
          </div>

          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Use the format/beautify feature regularly while editing. Consistent formatting makes errors easier to spot and improves readability.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work offline?</h3>
            <p className="text-sm text-muted-foreground">
              After initial page load, yes. The editor runs entirely in your browser. No internet connection needed for editing, but you need to load the page first.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I edit large YAML files?</h3>
            <p className="text-sm text-muted-foreground">
              Files up to 5-10MB work well. Larger files may cause browser slowdown. For very large files, use a desktop editor like VS Code or specialized YAML tools.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it save my work automatically?</h3>
            <p className="text-sm text-muted-foreground">
              No automatic saving. Download your file or copy to clipboard before closing. Some browsers may preserve content on refresh, but don't rely on it.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What file formats can I download?</h3>
            <p className="text-sm text-muted-foreground">
              Download as .yaml or .yml files. Both extensions are equivalent—choose based on your project's convention or tool requirements.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I undo changes?</h3>
            <p className="text-sm text-muted-foreground">
              Standard browser undo (Ctrl+Z / Cmd+Z) works in the editor. Multiple undo levels are supported for recovering from accidental changes.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it support YAML anchors?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. The editor recognizes and highlights YAML anchors (&) and aliases (*). Validation ensures anchors are defined before use.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is my data private?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. All editing happens locally in your browser. Your YAML content is never transmitted to any server. Safe for sensitive configurations.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
