import React from "react"

export default function YamlFormatterBeautifierSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste your YAML content into the editor. The formatter parses and re-emits it with consistent indentation, proper spacing, and clean structure. Minified or messy YAML becomes readable and well-organized.
          </p>
          <p>
            Options control indentation (2 or 4 spaces), line width for wrapping, quote style, and null representation. Choose settings that match your project's style guide or team conventions.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Formatting example:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">{`Before:
name:John,age:30,address:{city:NYC,zip:10001}

After:
name: John
age: 30
address:
  city: NYC
  zip: 10001`}</pre>
          </div>
          <p>
            The beautifier also sorts keys alphabetically if desired, removes unnecessary quotes, and normalizes line endings. Output is clean, consistent, and ready for version control.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Code review preparation</h3>
            <p className="text-sm text-muted-foreground">
              Format configs before PR. Consistent style across team. Easier to review changes. Professional appearance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Minified YAML recovery</h3>
            <p className="text-sm text-muted-foreground">
              Received minified config? Beautify for editing. Debug production configs. Understand structure. Make modifications.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Team standardization</h3>
            <p className="text-sm text-muted-foreground">
              Enforce consistent formatting. Project style guide compliance. Automated formatting. Reduce merge conflicts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Documentation generation</h3>
            <p className="text-sm text-muted-foreground">
              Pretty configs for README. Example files in docs. Clean appearance matters. Professional documentation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Legacy config cleanup</h3>
            <p className="text-sm text-muted-foreground">
              Old configs with bad formatting. Standardize inherited projects. Improve maintainability. Fresh start.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning YAML structure</h3>
            <p className="text-sm text-muted-foreground">
              See proper formatting. Understand indentation. Learn best practices. Educational value.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Formatting doesn't change data.</strong>
              Structure and values preserved. Only whitespace and style change. Semantically identical output. Safe to apply.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Comments may be repositioned.</strong>
              Inline comments stay with their lines. Block comments may move. Content preserved, position may vary.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Key sorting is optional.</strong>
              Alphabetical order helps find keys. But may change logical grouping. Choose based on preference.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Quote style affects appearance.</strong>
              Single, double, or minimal quotes. Strings without special chars unquoted. Configurable for project needs.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Add YAML formatting to your CI pipeline. Catch formatting issues automatically. Enforce team standards consistently.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between format and validate?</h3>
            <p className="text-sm text-muted-foreground">
              Format changes appearance, validates checks correctness. Format assumes valid YAML. Validate finds errors. Use both for best results.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it work with large files?</h3>
            <p className="text-sm text-muted-foreground">
              Browser-based, so memory limits apply. Most configs format quickly. Very large files may be slow. Split if needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I customize indentation?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, 2 or 4 spaces typically. Choose based on project. 2 spaces is YAML convention. Match existing files.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it preserve anchors?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, anchors and aliases preserved. Structure maintained. References stay intact. Complex YAML supported.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I minify YAML?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, minify option removes whitespace. Single line where possible. Smaller file size. Less readable.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I download formatted output?</h3>
            <p className="text-sm text-muted-foreground">
              Copy button copies to clipboard. Download button saves as file. Direct use in projects. Ready for commit.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is my data sent anywhere?</h3>
            <p className="text-sm text-muted-foreground">
              No, formatting happens in browser. Your YAML stays local. Safe for sensitive configs. Client-side processing.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
