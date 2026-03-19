import React from "react"

export default function MarkdownToJiraConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This converter transforms Markdown formatting into Jira Wiki markup.
            Jira uses its own markup language (Wiki Markup or now Markdown in
            newer versions) for formatting tickets, comments, and documentation.
          </p>
          <p>
            The converter maps standard Markdown syntax to Jira's equivalent
            markup. While similar, there are key differences in how headers,
            code blocks, lists, and other elements are formatted between the
            two systems.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Common conversions:</p>
            <ul className="space-y-2 text-sm list-disc list-inside">
              <li>Headers: <code className="font-mono bg-background px-1.5 py-0.5 rounded"># H1</code> becomes <code className="font-mono bg-background px-1.5 py-0.5 rounded">h1. H1</code></li>
              <li>Bold: <code className="font-mono bg-background px-1.5 py-0.5 rounded">**text**</code> becomes <code className="font-mono bg-background px-1.5 py-0.5 rounded">*text*</code></li>
              <li>Italic: <code className="font-mono bg-background px-1.5 py-0.5 rounded">*text*</code> becomes <code className="font-mono bg-background px-1.5 py-0.5 rounded">_text_</code></li>
              <li>Code: <code className="font-mono bg-background px-1.5 py-0.5 rounded">{"`code`"}</code> becomes <code className="font-mono bg-background px-1.5 py-0.5 rounded">{"{code}"}</code></li>
              <li>Code blocks: <code className="font-mono bg-background px-1.5 py-0.5 rounded">```</code> becomes <code className="font-mono bg-background px-1.5 py-0.5 rounded">{`{code}`}</code></li>
              <li>Lists: <code className="font-mono bg-background px-1.5 py-0.5 rounded">-</code> becomes <code className="font-mono bg-background px-1.5 py-0.5 rounded">*</code> for bullets</li>
            </ul>
          </div>
          <p>
            Paste your Markdown, see a preview of the Jira-formatted output,
            and copy for pasting into Jira tickets, comments, or Confluence
            pages. The preview helps verify formatting before submitting.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When you'd actually use this</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Writing detailed bug reports</h3>
            <p className="text-sm text-muted-foreground">
              A QA engineer writes bug reports in Markdown for clarity. They
              convert to Jira markup before creating tickets, ensuring code
              blocks, steps to reproduce, and expected results format correctly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating technical task descriptions</h3>
            <p className="text-sm text-muted-foreground">
              A developer creates tasks with technical details. They draft in
              Markdown with code examples and convert to Jira markup so the
              formatting displays properly for the assignee.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Documenting incident post-mortems</h3>
            <p className="text-sm text-muted-foreground">
              After an incident, an engineer writes a post-mortem in Markdown.
              They convert to Jira markup for the incident ticket, preserving
              formatting for timelines, root cause analysis, and action items.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Sharing code snippets in comments</h3>
            <p className="text-sm text-muted-foreground">
              Someone needs to share code in a Jira comment. They write the
              comment in Markdown with code blocks, convert to Jira markup, and
              paste for properly formatted code in the comment thread.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Migrating documentation to Confluence</h3>
            <p className="text-sm text-muted-foreground">
              A team moves docs from a Markdown-based system to Confluence.
              They convert Markdown pages to Jira/Confluence markup as part of
              the migration process.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating formatted sprint reports</h3>
            <p className="text-sm text-muted-foreground">
              A Scrum Master writes sprint summaries in Markdown. They convert
              to Jira markup for posting to sprint tickets or Confluence pages,
              maintaining clean formatting for stakeholders.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to know before using it</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Jira has multiple markup versions.</strong>
              Older Jira uses Wiki Markup. Newer versions support Markdown
              natively. Check which your instance uses. This tool converts to
              Wiki Markup for older Jira versions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some Markdown features don't have Jira equivalents.</strong>
              Tables, task lists, and some advanced Markdown features may not
              convert perfectly. Jira's markup is simpler. Complex formatting
              may need manual adjustment.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Code blocks need language specification.</strong>
              Jira code blocks can include language hints for syntax
              highlighting: <code className="font-mono bg-background px-1.5 py-0.5 rounded">{`{code:java}`}</code>. The converter can add
              these based on Markdown language hints.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Links may need adjustment.</strong>
              Jira has special link syntax for issues (<code className="font-mono bg-background px-1.5 py-0.5 rounded">[PROJ-123]</code>)
              and Confluence pages. Standard URLs convert, but Jira-specific
              links need manual formatting.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Newer Jira Cloud instances support
              Markdown directly. If your Jira accepts Markdown, you may not
              need conversion. Test with a simple formatted comment first.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does my Jira instance support Markdown?</h3>
            <p className="text-sm text-muted-foreground">
              Jira Cloud (newer versions) supports Markdown. Jira Server/Data
              Center often uses Wiki Markup. Test by creating a comment with
              simple Markdown. If it doesn't render, you need Wiki Markup.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I reference Jira issues in converted text?</h3>
            <p className="text-sm text-muted-foreground">
              Jira issue links use square brackets: <code className="font-mono bg-background px-1.5 py-0.5 rounded">[PROJ-123]</code>. These
              auto-link in Jira. Add them after conversion or use the converter
              if it supports Jira issue detection.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert tables?</h3>
            <p className="text-sm text-muted-foreground">
              Jira Wiki Markup supports tables with a different syntax than
              Markdown. Simple tables convert, but complex tables with merged
              cells may not. Check table output carefully after conversion.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I add attachments or images?</h3>
            <p className="text-sm text-muted-foreground">
              Jira uses <code className="font-mono bg-background px-1.5 py-0.5 rounded">!image.png!</code> for images. After conversion, you may
              need to manually adjust image syntax. Attachments are uploaded
              separately in Jira's UI.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work with Confluence?</h3>
            <p className="text-sm text-muted-foreground">
              Confluence uses similar Wiki Markup to Jira. Conversions often
              work for both. However, Confluence has additional macros and
              features that may need manual addition after conversion.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert Jira markup back to Markdown?</h3>
            <p className="text-sm text-muted-foreground">
              This tool only converts Markdown to Jira. For the reverse, you'd
              need a separate converter or manually convert using Jira's markup
              reference.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I create numbered lists?</h3>
            <p className="text-sm text-muted-foreground">
              Jira uses <code className="font-mono bg-background px-1.5 py-0.5 rounded">#</code> for numbered lists: <code className="font-mono bg-background px-1.5 py-0.5 rounded"># Item 1</code>,{" "}
              <code className="font-mono bg-background px-1.5 py-0.5 rounded">## Sub-item</code>. The converter transforms Markdown numbered
              lists to Jira's hash-based numbering.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about colored text or macros?</h3>
            <p className="text-sm text-muted-foreground">
              Jira supports color macros and other features not in standard
              Markdown. Add these manually after conversion using Jira's macro
              syntax like <code className="font-mono bg-background px-1.5 py-0.5 rounded">{`{color:red}`}</code>text<code className="font-mono bg-background px-1.5 py-0.5 rounded">{`{color}`}</code>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
