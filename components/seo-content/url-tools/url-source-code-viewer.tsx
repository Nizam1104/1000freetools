export default function UrlSourceCodeViewerSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This tool fetches and displays the HTML source code of any publicly accessible 
            webpage, letting you inspect the underlying structure, meta tags, and implementation details.
          </p>
          <p className="text-muted-foreground">
            The viewing process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">URL input:</strong> Enter the web address of the page you want to inspect.</li>
            <li><strong className="text-foreground">Content fetching:</strong> The tool makes an HTTP request to retrieve the page's HTML.</li>
            <li><strong className="text-foreground">Code formatting:</strong> Raw HTML is formatted with proper indentation for readability.</li>
            <li><strong className="text-foreground">Display and export:</strong> Source code is displayed with syntax highlighting and can be copied or downloaded.</li>
          </ol>
          <p className="text-muted-foreground">
            This is similar to "View Page Source" in your browser but works for any URL 
            and provides additional features like search, formatting, and export options.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "SEO Analysis",
              description: "Inspect meta tags, structured data, and heading structure to understand how pages are optimized."
            },
            {
              title: "Competitor Research",
              description: "Analyze how competing websites implement features, track analytics, or structure their content."
            },
            {
              title: "Learning Web Development",
              description: "Study how experienced developers structure HTML, implement features, and organize code."
            },
            {
              title: "Debugging Integration Issues",
              description: "Verify that tracking codes, widgets, or embeds are correctly installed on pages."
            },
            {
              title: "Security Auditing",
              description: "Check for exposed sensitive information, outdated libraries, or security misconfigurations."
            },
            {
              title: "Content Extraction",
              description: "Access page content when normal viewing is blocked or for archival purposes."
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
              caveat: "You only see server-side HTML",
              explanation: "This shows the initial HTML sent by the server. Content loaded dynamically by JavaScript after page load won't appear in the source."
            },
            {
              caveat: "Some sites block source viewing",
              explanation: "Websites can implement measures to prevent automated source fetching. Some may return different content to bots than to browsers."
            },
            {
              caveat: "Respect robots.txt and terms of service",
              explanation: "Just because you can view source doesn't mean you should scrape or copy content. Respect intellectual property and website terms."
            },
            {
              caveat: "Minified code is hard to read",
              explanation: "Production websites often serve minified CSS and JavaScript. The source may be functional but difficult to understand without beautification."
            },
            {
              caveat: "Sensitive data shouldn't be in source",
              explanation: "If you find API keys, passwords, or internal URLs in page source, that's a security vulnerability. Report it responsibly to the site owner."
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
              question: "What's the difference between view source and inspect element?",
              answer: "View Source shows the original HTML from the server. Inspect Element shows the current DOM, including changes made by JavaScript. This tool shows view source."
            },
            {
              question: "Why doesn't the source match what I see in the browser?",
              answer: "Modern websites use JavaScript to modify content after loading. The source shows the starting point; the browser shows the final rendered result after scripts run."
            },
            {
              question: "Can I view source of password-protected pages?",
              answer: "No, this tool can only access publicly available pages. Authentication cookies and sessions aren't available to external tools."
            },
            {
              question: "Is viewing source code legal?",
              answer: "Yes, viewing HTML source of public webpages is legal and expected. HTML is sent to your browser to render, so viewing it is normal. Copying content for reuse may violate copyright."
            },
            {
              question: "How do I find meta tags in the source?",
              answer: 'Look for {"<meta>"} tags in the {"<head>"} section. Search for "meta description", "meta keywords", or "og:" for Open Graph social media tags.'
            },
            {
              question: "Can I see the CSS and JavaScript files too?",
              answer: "This tool shows the main HTML. Linked CSS and JS files are referenced in the HTML but displayed separately. Use browser DevTools to see all resources."
            },
            {
              question: "Why would source code be minified?",
              answer: "Minification removes whitespace and shortens variable names to reduce file size, improving page load speed. It makes code harder to read but faster to download."
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
