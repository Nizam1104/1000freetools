export default function MarkdownToHtmlConverterSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This Markdown to HTML converter transforms Markdown text into clean, semantic HTML.
            It processes all standard Markdown syntax plus GitHub Flavored Markdown extensions,
            producing valid HTML ready for web publishing.
          </p>
          <p className="text-muted-foreground">
            The conversion process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Parse Markdown:</strong> The input is analyzed and tokenized into Markdown elements (headers, paragraphs, lists, etc.).</li>
            <li><strong className="text-foreground">Transform to HTML:</strong> Each Markdown element is converted to its HTML equivalent (## becomes &lt;h2&gt;, etc.).</li>
            <li><strong className="text-foreground">Apply options:</strong> Configure whether to include full HTML document structure or just content, line break handling, etc.</li>
            <li><strong className="text-foreground">Output HTML:</strong> Generate clean, indented HTML with proper nesting and semantic tags.</li>
          </ol>
          <p className="text-muted-foreground">
            The live preview shows exactly how the HTML will render, so you can verify the
            conversion before copying or downloading the output.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Publishing Blog Posts",
              description: "Convert Markdown blog drafts to HTML for CMS platforms that don't support Markdown natively."
            },
            {
              title: "Email Newsletter Creation",
              description: "Write in Markdown, convert to HTML for email clients that require HTML formatting."
            },
            {
              title: "Website Content Migration",
              description: "Batch convert Markdown documentation to HTML when migrating to a new platform or CMS."
            },
            {
              title: "Creating Static Pages",
              description: "Generate HTML files from Markdown for static site deployment without a build process."
            },
            {
              title: "Content Management Systems",
              description: "Prepare content in Markdown, convert to HTML for pasting into WYSIWYG editors or CMS fields."
            },
            {
              title: "Learning HTML Structure",
              description: "See how Markdown syntax maps to HTML tags - educational for understanding both formats."
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
              caveat: "HTML output may need CSS styling",
              explanation: "The converter produces semantic HTML but no CSS. Add your own stylesheets for proper visual presentation."
            },
            {
              caveat: "Some Markdown features have multiple HTML representations",
              explanation: "Line breaks can be &lt;br&gt; or &lt;p&gt; tags. Choose based on your needs. The converter offers options for this."
            },
            {
              caveat: "Images need absolute URLs",
              explanation: "Relative image paths in Markdown won't work when HTML is used elsewhere. Use absolute URLs or update paths after conversion."
            },
            {
              caveat: "Code blocks need syntax highlighting CSS",
              explanation: "Converted code blocks have class attributes but need a highlighting library (like Prism or Highlight.js) for colors."
            },
            {
              caveat: "Full document vs content-only output",
              explanation: "Choose based on your needs: full HTML document with &lt;html&gt;&lt;body&gt; or just the content for embedding in existing pages."
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
              question: "Does this support tables and GFM features?",
              answer: "Yes! Full GitHub Flavored Markdown support including tables, task lists, strikethrough, autolinks, and syntax-highlighted code blocks."
            },
            {
              question: "Can I convert HTML back to Markdown?",
              answer: "This tool only converts Markdown to HTML. For HTML to Markdown, you'd need a separate converter or reverse tool."
            },
            {
              question: "How do I add custom CSS to the output?",
              answer: "The HTML output is clean and semantic. Link your own CSS file or add styles to your website. The converter focuses on structure, not styling."
            },
            {
              question: "Will the HTML be valid?",
              answer: "Yes, the converter produces valid, semantic HTML5. It properly nests tags, escapes special characters, and follows HTML standards."
            },
            {
              question: "Can I batch convert multiple files?",
              answer: "This tool handles one document at a time. For batch conversion, use command-line tools like pandoc or build scripts."
            },
            {
              question: "How are special characters handled?",
              answer: "Automatically escaped! & becomes &amp;, < becomes &lt;, > becomes &gt;. This ensures valid HTML and prevents injection issues."
            },
            {
              question: "What's the difference between <p> and <br> for line breaks?",
              answer: "<p> creates paragraph blocks with spacing. <br> creates line breaks within paragraphs. Choose based on your content structure needs."
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
