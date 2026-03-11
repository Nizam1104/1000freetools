export default function MarkdownPreviewEditorSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This live Markdown preview editor provides a split-pane interface where you write
            Markdown on one side and see the rendered HTML output in real-time on the other.
            It supports GitHub Flavored Markdown (GFM) with all common extensions.
          </p>
          <p className="text-muted-foreground">
            The editing workflow:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Write Markdown:</strong> Type or paste your Markdown content in the left editor pane with syntax highlighting.</li>
            <li><strong className="text-foreground">Instant preview:</strong> As you type, the right pane renders the HTML output in real-time.</li>
            <li><strong className="text-foreground">Use toolbar shortcuts:</strong> Quick buttons for common formatting like bold, italic, links, code blocks, and lists.</li>
            <li><strong className="text-foreground">Export:</strong> Download your content as raw Markdown or rendered HTML when finished.</li>
          </ol>
          <p className="text-muted-foreground">
            The editor handles all GFM features: tables, task lists, strikethrough, autolinks,
            syntax-highlighted code blocks, and emoji. Word and character counts update live.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Writing README Files",
              description: "Draft and preview your project README with live formatting before committing to GitHub."
            },
            {
              title: "Creating Documentation",
              description: "Write technical docs with code blocks, tables, and links while seeing exactly how they'll render."
            },
            {
              title: "Blog Post Drafting",
              description: "Compose blog posts in Markdown for static site generators like Jekyll, Hugo, or Gatsby."
            },
            {
              title: "GitHub Issues and PRs",
              description: "Draft well-formatted issues and pull request descriptions before submitting them."
            },
            {
              title: "Learning Markdown Syntax",
              description: "See immediately how Markdown syntax translates to formatted output - great for beginners."
            },
            {
              title: "Content Creation",
              description: "Write articles, notes, or any formatted content that needs to be exported as Markdown or HTML."
            },
          ].map((item, idx) => (
            <div key={idx} className="rounded-lg border bg-muted/30 p-4 space-y-2">
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">What to Know Before Using</h2>
        <div className="space-y-3">
          {[
            {
              caveat: "Content isn't automatically saved",
              explanation: "This runs in your browser. Refresh or close the tab and you'll lose your work. Copy your content or export before leaving."
            },
            {
              caveat: "Rendering may differ from your target platform",
              explanation: "GitHub, GitLab, Stack Overflow, and others have slight Markdown variations. Preview is GFM-standard but may not match exactly."
            },
            {
              caveat: "Large documents may slow rendering",
              explanation: "Very long documents with complex formatting might cause slight delays in preview updates. Consider breaking into smaller files."
            },
            {
              caveat: "Some HTML may be sanitized",
              explanation: "For security, certain HTML tags might be stripped from the preview. Raw Markdown export preserves everything."
            },
            {
              caveat: "Images use external URLs",
              explanation: "Images in your Markdown need to be hosted somewhere. Local file paths won't work when the Markdown is used elsewhere."
            },
          ].map((item, idx) => (
            <div key={idx} className="rounded-lg border bg-muted/30 p-4">
              <h3 className="font-semibold text-foreground mb-1">{item.caveat}</h3>
              <p className="text-sm text-muted-foreground">{item.explanation}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Common Questions</h2>
        <div className="space-y-6">
          {[
            {
              question: "What Markdown features are supported?",
              answer: "All GitHub Flavored Markdown: headers, lists, tables, code blocks with syntax highlighting, task lists, strikethrough, tables, autolinks, and emoji."
            },
            {
              question: "Can I edit existing Markdown files?",
              answer: "Yes! Paste your existing Markdown into the editor, make changes with live preview, then copy or export the updated version."
            },
            {
              question: "How do I insert code blocks?",
              answer: "Use triple backticks (```) with optional language identifier: ```python for syntax highlighting. Or use the toolbar button."
            },
            {
              question: "Can I customize the editor theme?",
              answer: "Yes, toggle between light and dark themes using the theme switcher. Your preference is remembered for next time."
            },
            {
              question: "How do I create a table of contents?",
              answer: "Some platforms auto-generate TOC from headers. Or manually create links: [Section](#section-name) using lowercase with hyphens."
            },
            {
              question: "What's the difference between Markdown and HTML export?",
              answer: "Markdown export gives you the source (.md file). HTML export gives you rendered web page (.html). Use Markdown for version control, HTML for publishing."
            },
            {
              question: "Can I collaborate with others in real-time?",
              answer: "No, this is a single-user editor. For collaboration, use platforms like GitHub, GitLab, or dedicated collaborative Markdown editors."
            },
          ].map((item, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="font-semibold text-foreground">{item.question}</h3>
              <p className="text-muted-foreground">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
