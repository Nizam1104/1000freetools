import React from "react"

export default function MarkdownToSlackConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This converter transforms Markdown formatting into Slack's message
            formatting syntax. Slack uses a markup language similar to but
            different from Markdown, and this tool handles the conversion
            automatically.
          </p>
          <p>
            The converter maps Markdown elements to their Slack equivalents.
            Bold, italic, code, links, and lists all have specific Slack
            syntax. The tool ensures your formatted messages display correctly
            when pasted into Slack.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Common conversions:</p>
            <ul className="space-y-2 text-sm list-disc list-inside">
              <li>Bold: <code className="font-mono bg-background px-1.5 py-0.5 rounded">**text**</code> becomes <code className="font-mono bg-background px-1.5 py-0.5 rounded">*text*</code></li>
              <li>Italic: <code className="font-mono bg-background px-1.5 py-0.5 rounded">*text*</code> becomes <code className="font-mono bg-background px-1.5 py-0.5 rounded">_text_</code></li>
              <li>Strikethrough: <code className="font-mono bg-background px-1.5 py-0.5 rounded">~~text~~</code> becomes <code className="font-mono bg-background px-1.5 py-0.5 rounded">~text~</code></li>
              <li>Inline code: <code className="font-mono bg-background px-1.5 py-0.5 rounded">`code`</code> stays <code className="font-mono bg-background px-1.5 py-0.5 rounded">`code`</code></li>
              <li>Links: <code className="font-mono bg-background px-1.5 py-0.5 rounded">[text](url)</code> becomes <code className="font-mono bg-background px-1.5 py-0.5 rounded">&lt;url|text&gt;</code></li>
              <li>Code blocks: <code className="font-mono bg-background px-1.5 py-0.5 rounded">```</code> becomes triple backticks (same)</li>
            </ul>
          </div>
          <p>
            Paste your Markdown, see a preview of how it will look in Slack,
            and copy the converted text. The preview helps you catch formatting
            issues before sending to your channel.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When you'd actually use this</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Sharing formatted status updates</h3>
            <p className="text-sm text-muted-foreground">
              A team lead writes status updates in Markdown for consistency.
              They convert to Slack format before posting to ensure bold
              headers, code snippets, and links display correctly in the
              channel.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Posting code snippets with explanation</h3>
            <p className="text-sm text-muted-foreground">
              A developer needs to share code with context in Slack. They write
              the explanation in Markdown with code blocks, convert to Slack
              format, and paste for properly formatted technical messages.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating formatted announcements</h3>
            <p className="text-sm text-muted-foreground">
              Someone posts company announcements in Slack. They draft in
              Markdown with clear headers and bullet points, then convert to
              Slack format for professional-looking announcements with proper
              formatting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Sharing documentation excerpts</h3>
            <p className="text-sm text-muted-foreground">
              A tech writer shares doc snippets in Slack channels. They copy
              Markdown sections from their docs, convert to Slack format, and
              share with formatting intact for better readability.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Sending formatted incident reports</h3>
            <p className="text-sm text-muted-foreground">
              During incidents, an engineer documents timeline and actions in
              Markdown. They convert to Slack format for clear, formatted
              updates in the incident channel that are easy to scan.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating recurring meeting agendas</h3>
            <p className="text-sm text-muted-foreground">
              A manager keeps meeting agendas in Markdown. Before each meeting,
              they convert to Slack format and post to the team channel with
              proper formatting for agenda items and action points.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to know before using it</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Slack's formatting is more limited than Markdown.</strong>
              Slack doesn't support all Markdown features. Tables, nested lists,
              and some advanced formatting won't convert. Keep messages simple
              for best results.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Slack uses angle brackets for links.</strong>
              Slack links use <code className="font-mono bg-background px-1.5 py-0.5 rounded">&lt;url|text&gt;</code> format, which looks different
              from Markdown. The converter handles this, but it's good to
              understand Slack's syntax for manual edits.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Code blocks work but have limitations.</strong>
              Slack supports code blocks with triple backticks and language
              hints. However, very long code may be truncated. Keep code
              snippets concise for Slack messages.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Block quotes use single angle brackets.</strong>
              Slack blockquotes use <code className="font-mono bg-background px-1.5 py-0.5 rounded">&gt;</code> like Markdown, but nested quotes
              may not render as expected. Use simple quotes for reliability.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Use Slack's built-in formatting shortcuts
              too. Type <code className="font-mono bg-background px-1.5 py-0.5 rounded">/code</code> for a code block or use Ctrl+B for bold.
              The converter is best for preparing longer formatted messages
              outside Slack.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does Slack support tables?</h3>
            <p className="text-sm text-muted-foreground">
              No, Slack doesn't support Markdown tables. For tabular data, use
              code blocks with monospace formatting to align columns, or share
              a screenshot of the table.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use emojis in converted messages?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, emojis work normally. You can use emoji shortcodes like{" "}
              <code className="font-mono bg-background px-1.5 py-0.5 rounded">:thumbsup:</code> in Slack, and they'll render as emojis.
              The converter doesn't affect emoji handling.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I mention people or channels?</h3>
            <p className="text-sm text-muted-foreground">
              Mentions use Slack's syntax: <code className="font-mono bg-background px-1.5 py-0.5 rounded">&lt;@USERID&gt;</code> or{" "}
              <code className="font-mono bg-background px-1.5 py-0.5 rounded">&lt;!channel&gt;</code>. These aren't standard Markdown, so
              add them after conversion or use Slack's @ mention feature
              directly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do lists convert properly?</h3>
            <p className="text-sm text-muted-foreground">
              Simple bullet and numbered lists convert, but Slack may not
              render them as true lists. They'll appear as lines with bullets
              or numbers. Complex nested lists may not format correctly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I schedule formatted messages?</h3>
            <p className="text-sm text-muted-foreground">
              Slack doesn't have native scheduling. Use Slack's scheduled
              messages feature (if available in your workspace) or third-party
              tools. Paste your converted formatted text when scheduling.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I include line breaks?</h3>
            <p className="text-sm text-muted-foreground">
              Slack respects line breaks in messages. Press Shift+Enter in
              Slack for line breaks within a message. The converter preserves
              paragraph breaks from your Markdown.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert Slack messages back to Markdown?</h3>
            <p className="text-sm text-muted-foreground">
              This tool only converts Markdown to Slack. For the reverse, you'd
              need to manually convert or use a separate tool. Slack's format
              is simpler, so conversion back to Markdown is straightforward.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work with Slack threads?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, formatted messages work the same in threads as in main
              channels. Convert your Markdown and paste into any Slack message
              input, including thread replies.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
