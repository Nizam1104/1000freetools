import React from "react"

export default function MarkdownToNotionConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool transforms standard Markdown syntax into formatting that
            Notion recognizes when pasted. It handles the conversion by
            processing your Markdown and outputting content optimized for
            Notion's block-based editor.
          </p>
          <p>
            Notion supports a subset of Markdown for quick formatting. When you
            paste Markdown-formatted text, Notion automatically converts certain
            patterns into blocks. This tool ensures your content uses patterns
            Notion reliably recognizes.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">What gets converted:</p>
            <ul className="space-y-2 text-sm list-disc list-inside">
              <li>Headers (<code className="font-mono bg-background px-1.5 py-0.5 rounded">#</code> to <code className="font-mono bg-background px-1.5 py-0.5 rounded">######</code>) become heading blocks</li>
              <li>Bullet lists (<code className="font-mono bg-background px-1.5 py-0.5 rounded">-</code> or <code className="font-mono bg-background px-1.5 py-0.5 rounded">*</code>) become toggle or bullet blocks</li>
              <li>Numbered lists become numbered blocks</li>
              <li>Code blocks (<code className="font-mono bg-background px-1.5 py-0.5 rounded">```</code>) become code blocks with language</li>
              <li>Blockquotes (<code className="font-mono bg-background px-1.5 py-0.5 rounded">&gt;</code>) become quote blocks</li>
              <li>Checkboxes (<code className="font-mono bg-background px-1.5 py-0.5 rounded">- [ ]</code>) become to-do blocks</li>
            </ul>
          </div>
          <p>
            Paste your Markdown into the input area, and the tool processes it
            for Notion compatibility. Copy the output and paste directly into
            Notion for instant formatting.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When you'd actually use this</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Migrating GitHub READMEs to Notion docs</h3>
            <p className="text-sm text-muted-foreground">
              A developer wants to move project documentation from GitHub to
              Notion for internal team access. They paste the README Markdown
              through this tool, then into Notion, preserving all formatting
              without manual reformatting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Converting Obsidian notes for team sharing</h3>
            <p className="text-sm text-muted-foreground">
              Someone uses Obsidian for personal knowledge management but needs
              to share specific notes with teammates in Notion. This tool
              converts their Markdown notes into Notion-ready format instantly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating meeting notes from Markdown templates</h3>
            <p className="text-sm text-muted-foreground">
              A project manager has meeting note templates in Markdown. They
              convert them through this tool before each meeting, pasting the
              formatted structure into Notion for collaborative note-taking.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Moving technical documentation to Notion</h3>
            <p className="text-sm text-muted-foreground">
              An engineering team stores API docs in Markdown files but wants a
              searchable Notion workspace. They batch convert their Markdown
              docs and paste them into Notion pages, keeping code blocks and
              formatting intact.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Formatting blog drafts for editorial workflows</h3>
            <p className="text-sm text-muted-foreground">
              A content writer drafts posts in Markdown for speed, then converts
              them to Notion format for the editorial review process. The
              converted formatting makes review and collaboration smoother.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building Notion databases from Markdown lists</h3>
            <p className="text-sm text-muted-foreground">
              Someone has structured data in Markdown tables and lists. They
              convert it through this tool, paste into Notion, and the tables
              convert properly, ready to be turned into database entries.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to know before using it</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Notion supports limited Markdown on paste.</strong>
              Notion recognizes basic Markdown patterns when pasting, but not
              all syntax converts. Complex elements like footnotes or definition
              lists won't transform into Notion blocks.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Code blocks need language hints.</strong>
              Notion supports syntax highlighting in code blocks. Include the
              language after the opening triple backticks (like{" "}
              <code className="font-mono bg-background px-1.5 py-0.5 rounded">```javascript</code>)
              for proper highlighting in Notion.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Images may need re-uploading.</strong>
              Markdown image links reference external URLs. When pasting into
              Notion, images load from the URL but won't be uploaded to Notion's
              servers unless you manually re-upload them.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Nested lists have depth limits.</strong>
              Notion supports nested bullet and numbered lists, but very deep
              nesting (more than 4-5 levels) may not paste correctly. Flatten
              deeply nested structures before converting.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For tables, Notion works best with
              simple Markdown tables. Complex tables with merged cells or
              unusual formatting should be recreated as Notion database views
              after pasting.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work with all Markdown syntax?</h3>
            <p className="text-sm text-muted-foreground">
              It handles common Markdown that Notion recognizes on paste:
              headers, lists, code blocks, blockquotes, bold, italic, links,
              and checkboxes. Advanced syntax like footnotes or HTML won't
              convert to Notion blocks.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I paste directly into Notion databases?</h3>
            <p className="text-sm text-muted-foreground">
              You can paste converted Markdown into database page content, but
              table structures won't automatically become database properties.
              Create the database structure first, then paste content into pages.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why don't my images show up in Notion?</h3>
            <p className="text-sm text-muted-foreground">
              Images reference external URLs. If the URL is broken, private, or
              blocked, the image won't load. For reliable images, upload them
              directly to Notion after pasting your content.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this preserve formatting like bold and italic?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Inline formatting like <code className="font-mono bg-background px-1.5 py-0.5 rounded">**bold**</code> and{" "}
              <code className="font-mono bg-background px-1.5 py-0.5 rounded">*italic*</code> converts properly when pasted into
              Notion. Notion recognizes these Markdown patterns inline.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert Notion content back to Markdown?</h3>
            <p className="text-sm text-muted-foreground">
              This tool only converts Markdown to Notion format. For the reverse,
              export from Notion as Markdown (File → Export → Markdown & CSV)
              or use a third-party Notion-to-Markdown converter.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Will checkboxes become interactive in Notion?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Markdown checkbox syntax (<code className="font-mono bg-background px-1.5 py-0.5 rounded">- [ ]</code> and{" "}
              <code className="font-mono bg-background px-1.5 py-0.5 rounded">- [x]</code>) converts to Notion's to-do blocks,
              which you can check and uncheck interactively.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I handle large documents?</h3>
            <p className="text-sm text-muted-foreground">
              For large documents, convert and paste in sections. Notion handles
              long pages well, but breaking content into multiple linked pages
              often works better for organization and performance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work with Notion API?</h3>
            <p className="text-sm text-muted-foreground">
              This tool is for manual paste workflows. For programmatic imports,
              use the Notion API directly with Markdown-to-block conversion
              logic in your code.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
