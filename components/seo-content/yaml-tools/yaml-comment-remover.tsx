import React from "react"

export default function YamlCommentRemoverSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How YAML Comment Removal Works</h2>

        <div className="space-y-3 text-muted-foreground">
          <p>
            YAML comment removal strips all comments (lines starting with # and inline # comments) while preserving the actual configuration data. The tool parses your YAML, identifies comment tokens, and regenerates the document without them.
          </p>

          <p>
            This is different from simple text search-and-replace because it understands YAML syntax. It won't accidentally remove # characters inside quoted strings, which are literal values, not comments.
          </p>

          <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
            <p className="text-sm font-medium">Here's the process:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>YAML is tokenized to identify comments vs data</li>
              <li>Comment tokens are filtered out</li>
              <li>Remaining tokens are serialized back to YAML</li>
              <li>Output is valid YAML without any comments</li>
            </ol>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Example:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">{`# Database config
database:
  host: localhost  # Default host
  port: 5432

Becomes:
database:
  host: localhost
  port: 5432`}</pre>
          </div>
        </div>
      </section>

      {/* Specific Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Sharing configs publicly</h3>
            <p className="text-sm text-muted-foreground">
              Remove internal notes before sharing configuration files. Comments often contain sensitive information about infrastructure, credentials hints, or internal URLs.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Production deployment</h3>
            <p className="text-sm text-muted-foreground">
              Deploy clean configs without development comments. Production configurations should be minimal—comments add noise without value in deployed environments.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Reducing file size</h3>
            <p className="text-sm text-muted-foreground">
              Strip comments to reduce configuration file size. Heavily commented files can be significantly larger than necessary for runtime use.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Automated processing</h3>
            <p className="text-sm text-muted-foreground">
              Prepare YAML for tools that don't handle comments well. Some parsers or processors work better with comment-free YAML.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Security auditing</h3>
            <p className="text-sm text-muted-foreground">
              Review what information comments reveal. Strip comments before external audits to ensure no accidental information disclosure through inline notes.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Template generation</h3>
            <p className="text-sm text-muted-foreground">
              Create clean template files from configured examples. Remove specific comments to create generic templates for others to customize.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know About Comment Removal</h2>

        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Comments are permanently removed.</strong> Once stripped, comments cannot be recovered. Always keep a backup of your original commented file for reference.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Quoted # characters are preserved.</strong> Hash symbols inside quoted strings (like URLs or regex patterns) are not removed—they're data, not comments.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Structure remains unchanged.</strong> Only comments are removed. All data values, nesting, and YAML structure stay exactly the same.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Formatting may change slightly.</strong> Without comments, some whitespace may be adjusted. The data is identical, but exact formatting might differ.
            </p>
          </div>

          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Use version control to track both commented (source) and uncommented (generated) versions. Generate comment-free YAML as a build step, not a manual process.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What counts as a YAML comment?</h3>
            <p className="text-sm text-muted-foreground">
              Comments start with # and continue to end of line. Full-line comments have # at the start. Inline comments have # after data. Both types are removed.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Will this break my YAML?</h3>
            <p className="text-sm text-muted-foreground">
              No. Comments are ignored by YAML parsers anyway. Removing them produces equivalent YAML that works identically in all applications.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it handle # in strings?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Hash symbols inside quoted strings are preserved. The tool understands YAML syntax and only removes actual comments, not literal # characters.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I remove only some comments?</h3>
            <p className="text-sm text-muted-foreground">
              This tool removes all comments. For selective removal, edit manually or use a more advanced tool that supports comment filtering rules.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why remove comments at all?</h3>
            <p className="text-sm text-muted-foreground">
              Comments add size, can leak information, and aren't needed at runtime. Production configs benefit from being minimal and focused on actual configuration.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is this tool secure?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Processing happens entirely in your browser. Your YAML is never uploaded to any server. All operations are local and private.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I process multiple files?</h3>
            <p className="text-sm text-muted-foreground">
              This tool processes one file at a time. For batch operations, use command-line tools or scripts that can iterate over multiple YAML files.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
