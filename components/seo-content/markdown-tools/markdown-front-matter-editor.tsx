import React from "react"

export default function MarkdownFrontMatterEditorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool lets you edit the front matter metadata in Markdown files.
            Front matter is the YAML or TOML block at the top of a Markdown file
            that contains metadata like title, date, tags, and custom fields.
          </p>
          <p>
            Static site generators like Jekyll, Hugo, and Gatsby use front
            matter to configure how pages are generated. This editor provides a
            user-friendly interface for modifying that metadata without manually
            editing the raw YAML or TOML syntax.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Common front matter fields:</p>
            <ul className="space-y-2 text-sm list-disc list-inside">
              <li><code className="font-mono bg-background px-1.5 py-0.5 rounded">title</code> - Page or post title</li>
              <li><code className="font-mono bg-background px-1.5 py-0.5 rounded">date</code> - Publication date</li>
              <li><code className="font-mono bg-background px-1.5 py-0.5 rounded">tags</code> and <code className="font-mono bg-background px-1.5 py-0.5 rounded">categories</code> - Content classification</li>
              <li><code className="font-mono bg-background px-1.5 py-0.5 rounded">description</code> - Meta description for SEO</li>
              <li><code className="font-mono bg-background px-1.5 py-0.5 rounded">layout</code> - Template to use for rendering</li>
              <li><code className="font-mono bg-background px-1.5 py-0.5 rounded">draft</code> - Whether the content is a draft</li>
            </ul>
          </div>
          <p>
            Paste your Markdown with front matter, edit fields in the visual
            editor, and the tool updates the YAML or TOML while preserving your
            content. No more worrying about indentation errors or syntax
            mistakes.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When you'd actually use this</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Updating blog post metadata in bulk</h3>
            <p className="text-sm text-muted-foreground">
              A blogger maintains posts in Markdown for their Jekyll site. They
              use this editor to update tags, categories, and descriptions
              across multiple posts without risking YAML syntax errors in each
              file.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Adding SEO metadata to existing content</h3>
            <p className="text-sm text-muted-foreground">
              Someone realizes their Hugo site lacks meta descriptions. They
              open each Markdown file in this editor and add description fields
              to front matter, improving SEO without touching the raw YAML.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Converting between YAML and TOML</h3>
            <p className="text-sm text-muted-foreground">
              A developer switches from Jekyll (YAML) to Hugo (TOML preferred).
              They paste YAML front matter into this tool and export as TOML,
              avoiding manual conversion of their entire content library.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Managing custom fields for content types</h3>
            <p className="text-sm text-muted-foreground">
              A team uses custom front matter fields for content workflows
              (author, review status, target audience). This editor makes it
              easy to add and update custom fields consistently across files.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Fixing broken front matter syntax</h3>
            <p className="text-sm text-muted-foreground">
              Someone's static site build fails due to YAML indentation errors.
              They paste the broken front matter into this editor, which
              validates and fixes the syntax automatically before exporting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing content for migration</h3>
            <p className="text-sm text-muted-foreground">
              A content team migrates from one CMS to a static site generator.
              They use this editor to add the front matter structure their new
              platform requires to existing Markdown content.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to know before using it</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Front matter must be at the file's start.</strong>
              Static site generators expect front matter as the very first
              thing in the file, delimited by <code className="font-mono bg-background px-1.5 py-0.5 rounded">---</code> for YAML or{" "}
              <code className="font-mono bg-background px-1.5 py-0.5 rounded">+++</code> for TOML. Content after the closing delimiter
              is treated as Markdown body.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Field names are case-sensitive.</strong>
              <code className="font-mono bg-background px-1.5 py-0.5 rounded">title</code> and <code className="font-mono bg-background px-1.5 py-0.5 rounded">Title</code> are different fields. Use the exact
              field names your static site generator expects. Common conventions
              use lowercase for standard fields.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Dates have specific formats.</strong>
              YAML and TOML handle dates differently. YAML often uses ISO 8601
              format (<code className="font-mono bg-background px-1.5 py-0.5 rounded">2024-01-15T10:30:00Z</code>). TOML has native datetime
              types. The editor handles format conversion between them.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Arrays can be written multiple ways.</strong>
              Tags can be a flow array (<code className="font-mono bg-background px-1.5 py-0.5 rounded">[tag1, tag2]</code>) or block array
              (each on its own line with <code className="font-mono bg-background px-1.5 py-0.5 rounded">-</code>). Both are valid. Choose
              based on readability and your project's style.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Keep front matter minimal. Only include
              fields your site actually uses. Extra fields clutter your files
              and can cause unexpected behavior in some generators.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between YAML and TOML?</h3>
            <p className="text-sm text-muted-foreground">
              YAML uses indentation and <code className="font-mono bg-background px-1.5 py-0.5 rounded">---</code> delimiters. TOML uses{" "}
              <code className="font-mono bg-background px-1.5 py-0.5 rounded">+++</code> delimiters and has a more explicit syntax. Hugo
              prefers TOML; Jekyll uses YAML. Both accomplish the same thing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I add custom fields not listed?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. You can add any custom field your static site generator
              supports. Common custom fields include author, thumbnail, series,
              or workflow status. The editor handles arbitrary key-value pairs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this validate my front matter?</h3>
            <p className="text-sm text-muted-foreground">
              The editor parses your front matter, which catches syntax errors.
              Invalid YAML or TOML won't parse correctly. If the editor loads
              your fields, the syntax is valid.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What happens to my Markdown content?</h3>
            <p className="text-sm text-muted-foreground">
              Your content is preserved exactly as-is. The editor only modifies
              the front matter block. Everything after the closing delimiter
              passes through unchanged.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I remove fields from front matter?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Delete fields in the editor and they'll be removed from the
              output. This is useful for cleaning up unused fields or migrating
              between platforms with different requirements.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I handle multi-line values?</h3>
            <p className="text-sm text-muted-foreground">
              For descriptions or long text, use block strings in YAML (with{" "}
              <code className="font-mono bg-background px-1.5 py-0.5 rounded">|</code> or <code className="font-mono bg-background px-1.5 py-0.5 rounded">></code>) or multi-line strings in TOML. The editor
              provides text areas that handle multi-line content properly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work with nested front matter?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Both YAML and TOML support nested structures. The editor
              displays nested fields in a hierarchical view, making it easier
              to manage complex metadata configurations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this without a static site generator?</h3>
            <p className="text-sm text-muted-foreground">
              Absolutely. Front matter is just metadata. You can use it for any
              purpose: content management, documentation systems, or custom
              workflows that need structured data attached to Markdown files.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
