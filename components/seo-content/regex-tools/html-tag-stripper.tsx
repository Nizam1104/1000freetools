export default function HtmlTagStripperSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This HTML tag stripper removes HTML markup from content, leaving only the 
            plain text - useful for extracting readable content from web pages and HTML documents.
          </p>
          <p className="text-muted-foreground">
            The stripping process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Tag detection:</strong> HTML tags are identified using regex patterns that match opening, closing, and self-closing tags.</li>
            <li><strong className="text-foreground">Content preservation:</strong> Text content between tags is preserved while tag markup is removed.</li>
            <li><strong className="text-foreground">Entity decoding:</strong> HTML entities (&amp;, &lt;, &nbsp;) are converted to their character equivalents.</li>
            <li><strong className="text-foreground">Whitespace normalization:</strong> Multiple spaces and line breaks from removed tags are cleaned up.</li>
          </ol>
          <p className="text-muted-foreground">
            HTML stripping is essential for text analysis, content extraction, 
            search indexing, and converting web content to plain text formats.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Web Scraping",
              description: "Extract readable text content from HTML pages for analysis or storage."
            },
            {
              title: "Search Indexing",
              description: "Prepare HTML content for search indexing by removing markup."
            },
            {
              title: "Content Analysis",
              description: "Analyze text content without HTML interference for word counts, readability, etc."
            },
            {
              title: "Email Processing",
              description: "Convert HTML emails to plain text for systems that don't support HTML."
            },
            {
              title: "Accessibility",
              description: "Generate plain text alternatives for screen readers and assistive technologies."
            },
            {
              title: "Data Export",
              description: "Export web content to plain text formats like CSV or TXT."
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
              caveat: "Regex isn't perfect for HTML",
              explanation: "HTML is not a regular language. Complex nested structures may not strip perfectly. For production, use proper HTML parsers."
            },
            {
              caveat: "Script and style content is removed",
              explanation: "JavaScript and CSS inside <script> and <style> tags is removed along with the tags. This is usually desired."
            },
            {
              caveat: "Structure information is lost",
              explanation: "Headings, paragraphs, and lists all become plain text. Formatting and structure information is discarded."
            },
            {
              caveat: "Entities need decoding",
              explanation: "&amp; becomes &, &lt; becomes <. Good strippers decode HTML entities automatically."
            },
            {
              caveat: "Whitespace may need cleanup",
              explanation: "Block elements create line breaks. Multiple spaces may appear. Post-processing may be needed for clean output."
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
              question: "What's the regex for stripping HTML?",
              answer: "Basic: /<[^>]*>/g matches and removes all tags. For production, use DOM parsers like DOMDocument (PHP) or BeautifulSoup (Python)."
            },
            {
              question: "How do I preserve line breaks?",
              answer: "Replace <br> and </p> with newlines before stripping: html.replace(/<br\\s*\\/?>/g, '\\n').replace(/<\\/p>/g, '\\n\\n')"
            },
            {
              question: "Can I keep some tags?",
              answer: "Yes, strip selectively. Remove script/style first, then optionally keep formatting tags like <b>, <i>, or convert them to markdown."
            },
            {
              question: "What about HTML entities?",
              answer: "Decode after stripping: &amp; → &, &lt; → <, &nbsp; → space. Most languages have built-in entity decoding functions."
            },
            {
              question: "Why use a parser instead of regex?",
              answer: "HTML parsers handle malformed HTML, nested tags, and edge cases correctly. Regex can fail on complex or broken HTML."
            },
            {
              question: "How do I extract specific elements?",
              answer: "Use DOM parsing with CSS selectors or XPath. Query for specific elements (h1, p, .content) before extracting text."
            },
            {
              question: "Can I convert HTML to Markdown?",
              answer: "Yes, specialized tools convert HTML to Markdown, preserving structure. This is different from plain text stripping."
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
