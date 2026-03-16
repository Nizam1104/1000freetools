export default function UrlSlugGeneratorSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This tool converts titles or text into URL-friendly slugs - clean, readable strings 
            perfect for web addresses, file names, and database identifiers.
          </p>
          <p className="text-muted-foreground">
            The slug generation process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Lowercase conversion:</strong> All text is converted to lowercase for consistency.</li>
            <li><strong className="text-foreground">Special character removal:</strong> Accents, symbols, and non-ASCII characters are removed or transliterated.</li>
            <li><strong className="text-foreground">Space replacement:</strong> Spaces and separators are replaced with hyphens (or your chosen delimiter).</li>
            <li><strong className="text-foreground">Cleanup:</strong> Multiple consecutive separators are collapsed, and leading/trailing separators are trimmed.</li>
          </ol>
          <p className="text-muted-foreground">
            For example, "The Quick Brown Fox!" becomes "the-quick-brown-fox" - 
            a clean, URL-safe string that's both human and search-engine friendly.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Blog Post URLs",
              description: "Generate SEO-friendly slugs for blog posts and articles that include keywords."
            },
            {
              title: "E-commerce Product Pages",
              description: "Create clean product URLs that include product names for better search visibility."
            },
            {
              title: "Content Management Systems",
              description: "Auto-generate URL slugs when creating new pages or posts in your CMS."
            },
            {
              title: "File Naming",
              description: "Convert document titles to safe file names for downloads and attachments."
            },
            {
              title: "Database Identifiers",
              description: "Generate consistent, unique identifiers from titles for database records."
            },
            {
              title: "API Endpoint Design",
              description: "Create readable resource identifiers for RESTful API endpoints."
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
              caveat: "Slugs should be unique",
              explanation: "Multiple pages can't have the same slug. Add numbers or dates to differentiate (my-post, my-post-2, my-post-3)."
            },
            {
              caveat: "Shorter isn't always better",
              explanation: "While concise slugs are good, removing all keywords hurts SEO. Keep important descriptive words even if it makes the slug longer."
            },
            {
              caveat: "Changing slugs breaks links",
              explanation: "Once a slug is published and linked, changing it creates broken links. Use 301 redirects if you must change published slugs."
            },
            {
              caveat: "Non-English characters need handling",
              explanation: "Accented characters (é, ñ, ü) should be transliterated (e, n, u) for maximum compatibility. Some systems handle Unicode slugs."
            },
            {
              caveat: "Stop words are optional",
              explanation: "Words like 'the', 'a', 'and' can be removed to shorten slugs, but keeping them can improve readability and SEO."
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
              question: "Should I use hyphens or underscores in slugs?",
              answer: "Use hyphens. Google treats hyphens as word separators but underscores as connectors. \"blue-widget\" is two words; \"blue_widget\" is one word to search engines."
            },
            {
              question: "How long should URL slugs be?",
              answer: "Aim for 50-60 characters maximum. Google may truncate longer slugs in search results. Include key terms early in the slug for best SEO impact."
            },
            {
              question: "Should slugs include the date?",
              answer: "For time-sensitive content (news), yes. For evergreen content, no - dates make content seem outdated. Consider /blog/slug vs /2024/01/slug."
            },
            {
              question: "Do slugs affect SEO?",
              answer: "Yes, but modestly. Keywords in slugs are a minor ranking factor. More importantly, clean slugs improve click-through rates and user experience."
            },
            {
              question: "Can slugs contain numbers?",
              answer: "Absolutely. Numbers are useful for lists (\"10-tips\"), versions (\"v2-guide\"), or differentiating similar content (\"iphone-15-review\")."
            },
            {
              question: "What about non-Latin alphabets?",
              answer: "For international sites, Unicode slugs work in modern browsers. However, ASCII slugs have better compatibility. Consider your audience and platform."
            },
            {
              question: "Should I remove stop words from slugs?",
              answer: "It depends. Removing \"the\", \"and\", \"of\" shortens slugs but can hurt readability. Test both approaches. \"guide-to-seo\" reads better than \"guide-seo\"."
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
