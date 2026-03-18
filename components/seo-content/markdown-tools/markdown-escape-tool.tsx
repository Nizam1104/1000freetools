import React from "react"

export default function MarkdownEscapeToolSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool adds or removes backslash escapes for Markdown special
            characters. When you need to display a character literally instead
            of having it trigger formatting, you escape it with a backslash.
          </p>
          <p>
            Markdown uses certain characters for formatting: asterisks for
            bold, underscores for italic, hashes for headers, etc. To show
            these characters as plain text, you prefix them with a backslash
            (<code className="font-mono bg-background px-1.5 py-0.5 rounded">\</code>).
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Characters that need escaping:</p>
            <ul className="space-y-2 text-sm list-disc list-inside">
              <li><code className="font-mono bg-background px-1.5 py-0.5 rounded">\</code> backslash itself</li>
              <li><code className="font-mono bg-background px-1.5 py-0.5 rounded">`</code> backtick for code</li>
              <li><code className="font-mono bg-background px-1.5 py-0.5 rounded">*</code> asterisk for emphasis</li>
              <li><code className="font-mono bg-background px-1.5 py-0.5 rounded">_</code> underscore for emphasis</li>
              <li><code className="font-mono bg-background px-1.5 py-0.5 rounded">#</code> hash for headers</li>
              <li><code className="font-mono bg-background px-1.5 py-0.5 rounded">[</code>, <code className="font-mono bg-background px-1.5 py-0.5 rounded">]</code> brackets for links</li>
              <li><code className="font-mono bg-background px-1.5 py-0.5 rounded">(</code>, <code className="font-mono bg-background px-1.5 py-0.5 rounded">)</code> parentheses for links</li>
              <li><code className="font-mono bg-background px-1.5 py-0.5 rounded">&gt;</code> angle bracket for blockquotes</li>
            </ul>
          </div>
          <p>
            Paste text containing special characters, choose to escape or
            unescape, and the tool adds or removes backslashes as needed.
            Perfect for writing tutorials about Markdown itself.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When you'd actually use this</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Writing Markdown tutorials</h3>
            <p className="text-sm text-muted-foreground">
              Someone writes a guide explaining Markdown syntax. They need to
              show examples like <code className="font-mono bg-background px-1.5 py-0.5 rounded">**bold**</code> without it rendering as bold.
              They escape the characters so readers see the actual syntax.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Documenting code with Markdown-like strings</h3>
            <p className="text-sm text-muted-foreground">
              A developer documents code that contains strings with asterisks
              or underscores. They escape these characters so the
              documentation displays the strings correctly without triggering
              formatting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating keyboard shortcut guides</h3>
            <p className="text-sm text-muted-foreground">
              Someone documents keyboard shortcuts that include special
              characters. They escape the characters to show the exact key
              combinations without Markdown interpreting them as formatting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Writing regex patterns in docs</h3>
            <p className="text-sm text-muted-foreground">
              A developer writes documentation with regex patterns containing
              backslashes and special characters. They escape them to display
              the patterns literally for readers to copy.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Showing file paths with special characters</h3>
            <p className="text-sm text-muted-foreground">
              Someone documents file paths that contain underscores or other
              special characters. They escape them to show the exact paths
              without Markdown formatting interfering.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Fixing accidentally formatted text</h3>
            <p className="text-sm text-muted-foreground">
              A writer notices their text is being formatted unexpectedly
              (words becoming italic due to underscores). They use this tool
              to escape the problematic characters and fix the rendering.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to know before using it</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Not all characters need escaping in all contexts.</strong>
              An underscore in the middle of a word usually doesn't trigger
              italic. Escape characters only when they're causing unwanted
              formatting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Code blocks don't need escaping.</strong>
              Content inside backtick code blocks (<code className="font-mono bg-background px-1.5 py-0.5 rounded">`code`</code> or{" "}
              <code className="font-mono bg-background px-1.5 py-0.5 rounded">```</code>) is displayed literally. No escaping needed inside
              code blocks.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Escaping adds backslashes to your source.</strong>
              The escaped text shows backslashes in the rendered output. Use
              escaping only when you want to display the special character
              itself, not when you want formatting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some platforms have different escape rules.</strong>
              Most Markdown follows standard escaping, but some platforms may
              have quirks. Test escaped characters in your target platform if
              rendering looks wrong.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For showing multiple Markdown examples,
              use code blocks instead of escaping. Code blocks display content
              literally without any formatting interpretation.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I show a backslash in Markdown?</h3>
            <p className="text-sm text-muted-foreground">
              Escape it with another backslash: <code className="font-mono bg-background px-1.5 py-0.5 rounded">\\</code> displays as{" "}
              <code className="font-mono bg-background px-1.5 py-0.5 rounded">\</code>. Backslashes are escape characters, so you need to
              escape the escape character itself.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do I need to escape characters in links?</h3>
            <p className="text-sm text-muted-foreground">
              URLs in links usually don't need escaping. However, if a URL
              contains parentheses, you may need to escape them or use angle
              brackets: <code className="font-mono bg-background px-1.5 py-0.5 rounded">&lt;https://example.com/(path)&gt;</code>.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I escape multiple characters at once?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, this tool escapes all special characters in your text. Each
              character that could trigger formatting gets a backslash prefix.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I unescape text?</h3>
            <p className="text-sm text-muted-foreground">
              Use the unescape function. It removes backslash escapes from
              special characters, converting <code className="font-mono bg-background px-1.5 py-0.5 rounded">\*</code> back to{" "}
              <code className="font-mono bg-background px-1.5 py-0.5 rounded">*</code>. Useful for cleaning up over-escaped text.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does escaping work inside code blocks?</h3>
            <p className="text-sm text-muted-foreground">
              No need. Code blocks display everything literally. Escaping
              inside code blocks just shows the backslashes, which is usually
              not what you want.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about HTML entities?</h3>
            <p className="text-sm text-muted-foreground">
              HTML entities (<code className="font-mono bg-background px-1.5 py-0.5 rounded">&amp;lt;</code> for <code className="font-mono bg-background px-1.5 py-0.5 rounded">&lt;</code>) also work in
              Markdown. They're an alternative to backslash escaping for some
              characters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why isn't my escaping working?</h3>
            <p className="text-sm text-muted-foreground">
              Check if you're in a code block (no escaping needed) or if the
              character actually triggers formatting in that context. Some
              characters only format in specific positions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I escape only specific characters?</h3>
            <p className="text-sm text-muted-foreground">
              This tool escapes all special characters. For selective escaping,
              manually add backslashes only before the characters you want to
              display literally.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
