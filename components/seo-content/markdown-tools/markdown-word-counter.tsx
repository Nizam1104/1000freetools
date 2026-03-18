import React from "react"

export default function MarkdownWordCounterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool analyzes your Markdown document and provides detailed
            statistics about its content. It counts words, characters, and
            estimates reading time while tracking Markdown-specific elements
            like headers and links.
          </p>
          <p>
            The counter parses your Markdown intelligently, distinguishing
            between actual content and Markdown syntax. This gives more accurate
            counts than plain text counters that include formatting characters
            in their totals.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">What gets counted:</p>
            <ul className="space-y-2 text-sm list-disc list-inside">
              <li>Words in paragraphs, lists, and content (not syntax)</li>
              <li>Characters with and without spaces</li>
              <li>Headers by level (H1, H2, H3, etc.)</li>
              <li>Links (internal and external)</li>
              <li>Code blocks and inline code</li>
              <li>Reading time based on average reading speed</li>
            </ul>
          </div>
          <p>
            As you type or paste Markdown, statistics update in real-time. This
            helps you track document length, meet word count requirements, or
            optimize content for specific platforms with length limits.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When you'd actually use this</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Meeting blog post word count requirements</h3>
            <p className="text-sm text-muted-foreground">
              A blogger needs posts between 800-1200 words for SEO. They write
              in Markdown and monitor the word count live, knowing exactly when
              they've hit their target without switching to another tool.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Estimating reading time for articles</h3>
            <p className="text-sm text-muted-foreground">
              A technical writer adds reading time estimates to their docs. They
              check the counter's reading time calculation and display it at the
              top of articles so readers know the time commitment upfront.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Tracking documentation growth</h3>
            <p className="text-sm text-muted-foreground">
              A team lead monitors their API documentation's size. The word
              counter helps them track how much content they've added over time
              and identify sections that might need splitting into separate
              pages.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Optimizing content for platforms with limits</h3>
            <p className="text-sm text-muted-foreground">
              Someone writes Markdown content for platforms with character
              limits (like certain CMS fields or social platforms). They use the
              counter to stay within limits while maximizing their message.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Analyzing link density in content</h3>
            <p className="text-sm text-muted-foreground">
              An SEO specialist checks how many links their Markdown content
              contains. The link count helps them ensure proper internal linking
              without over-optimizing or creating a spammy link profile.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Balancing heading structure</h3>
            <p className="text-sm text-muted-foreground">
              A content strategist reviews their heading distribution. The
              counter shows how many H1, H2, H3 tags they have, helping them
              create proper document hierarchy for accessibility and SEO.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to know before using it</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Reading time is an estimate.</strong>
              Reading speed calculations assume 200-250 words per minute for
              average readers. Technical content with code may take longer to
              read than the estimate suggests.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Code blocks affect word counts.</strong>
              Words inside code blocks are counted separately from prose.
              Depending on your needs, you may want to exclude code from total
              word counts for accurate content length.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Front matter may be included.</strong>
              If your Markdown includes YAML front matter (common in static
              site generators), it may be counted. Check if the tool excludes
              front matter from content statistics.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Link counts include all link types.</strong>
              The counter tracks all Markdown links regardless of destination.
              For SEO analysis, you may need to manually distinguish between
              internal and external links.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For academic or professional writing
              with strict word limits, count words after finishing your draft.
              Real-time counting can interrupt flow and lead to awkward
              padding.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this count words in code blocks?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but they're typically tracked separately from prose. Code
              words don't contribute to reading time the same way natural
              language does. Check the breakdown for code-specific counts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How accurate is the reading time estimate?</h3>
            <p className="text-sm text-muted-foreground">
              It's based on average reading speeds (200-250 WPM). Technical
              content, non-native readers, or dense material will take longer.
              Use it as a rough guide, not a precise measurement.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I track multiple documents?</h3>
            <p className="text-sm text-muted-foreground">
              This tool analyzes one document at a time. For tracking multiple
              files, you'd need to combine them or use a tool that processes
              entire directories of Markdown files.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does character count include spaces?</h3>
            <p className="text-sm text-muted-foreground">
              Most counters show both: characters with spaces and without
              spaces. This helps when platforms have different counting methods
              (some count spaces, some don't).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How are hyphenated words counted?</h3>
            <p className="text-sm text-muted-foreground">
              Hyphenated words like "well-known" are typically counted as one
              word. This follows standard word counting conventions used by
              most writing software and platforms.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I export the statistics?</h3>
            <p className="text-sm text-muted-foreground">
              This tool displays statistics in real-time. For exporting, you'd
              need to copy the numbers manually or use a tool with export
              functionality for batch analysis reports.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work with GitHub Flavored Markdown?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. The counter handles GFM extensions like tables, task lists,
              and strikethrough. These elements are parsed and counted
              appropriately in the statistics.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why is my word count different from Word or Google Docs?</h3>
            <p className="text-sm text-muted-foreground">
              Different tools use different counting algorithms. Markdown
              counters may exclude syntax while word processors count
              everything. Small variations are normal across tools.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
