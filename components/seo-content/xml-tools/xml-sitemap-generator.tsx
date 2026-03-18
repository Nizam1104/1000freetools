export default function XmlSitemapGeneratorSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This XML sitemap generator creates standards-compliant sitemap.xml files that help search engines
            discover and index your website's pages. It follows the sitemaps.org protocol used by Google, Bing, and other search engines.
          </p>
          <p className="text-muted-foreground">
            The generation process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Add URLs:</strong> Enter your website URLs manually, paste a list, or import from a file.</li>
            <li><strong className="text-foreground">Set metadata:</strong> Optionally add lastmod (last modified date), changefreq (update frequency), and priority values.</li>
            <li><strong className="text-foreground">Generate XML:</strong> The tool creates properly formatted XML following the sitemaps.org schema.</li>
            <li><strong className="text-foreground">Download:</strong> Save the sitemap.xml file and upload it to your website's root directory.</li>
          </ol>
          <p className="text-muted-foreground">
            For large sites with over 50,000 URLs, the tool can generate sitemap index files that reference
            multiple sitemap files. This is required by search engines for very large websites.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Launching a new website",
              description: "Just deployed a new site? Generate a sitemap and submit it to Google Search Console to speed up indexing of all your pages."
            },
            {
              title: "Adding a blog or news section",
              description: "New content sections might not be well-linked internally. A sitemap ensures search engines find every new post immediately."
            },
            {
              title: "Fixing indexing issues",
              description: "Some pages aren't showing in search results? A sitemap explicitly tells search engines about pages they might have missed."
            },
            {
              title: "Managing large e-commerce sites",
              description: "Product pages come and go. Regular sitemap updates help search engines keep their index current with your inventory."
            },
            {
              title: "Supporting international SEO",
              description: "Sites with multiple language versions can use sitemaps to specify hreflang annotations for each localized page."
            },
            {
              title: "Documenting site structure for clients",
              description: "A sitemap provides a clean list of all indexed URLs. Useful for audits, migrations, or showing clients their site's scope."
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
              caveat: "Sitemaps don't guarantee indexing",
              explanation: "A sitemap is a suggestion, not a command. Search engines may still choose not to index certain URLs based on their own criteria."
            },
            {
              caveat: "50,000 URL limit per sitemap",
              explanation: "The sitemaps.org protocol limits each sitemap file to 50,000 URLs or 50MB uncompressed. Larger sites need sitemap indexes."
            },
            {
              caveat: "Only include canonical URLs",
              explanation: "Don't add duplicate URLs, parameter variations, or non-canonical versions. Only include the primary URL for each page."
            },
            {
              caveat: "Priority is a hint, not a ranking factor",
              explanation: "The priority value (0.0 to 1.0) suggests importance relative to your other pages. Google has stated it doesn't affect rankings."
            },
            {
              caveat: "Place sitemap at root or reference in robots.txt",
              explanation: "Upload to yourdomain.com/sitemap.xml or add 'Sitemap: https://yourdomain.com/sitemap.xml' to your robots.txt file."
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
              question: "Do I need a sitemap for a small website?",
              answer: "Not strictly necessary if all pages are well-linked internally. But it doesn't hurt and can help search engines discover pages faster."
            },
            {
              question: "What's the correct date format for lastmod?",
              answer: "Use ISO 8601 format: YYYY-MM-DD for dates (2024-03-15) or YYYY-MM-DDThh:mm:ss+TZD for timestamps with timezone."
            },
            {
              question: "How often should I update my sitemap?",
              answer: "Update whenever you add, remove, or significantly change pages. Many CMS platforms regenerate sitemaps automatically on content changes."
            },
            {
              question: "Can I include images and videos in the sitemap?",
              answer: "Yes. The sitemaps.org protocol supports image and video extensions with additional metadata like captions, titles, and thumbnails."
            },
            {
              question: "What's the difference between changefreq values?",
              answer: "Values range from 'always' to 'never': always, hourly, daily, weekly, monthly, yearly, never. It's a hint about how often content changes."
            },
            {
              question: "Should I include noindex pages in the sitemap?",
              answer: "No. Pages with noindex meta tags or robots.txt blocks shouldn't be in the sitemap. It sends mixed signals to search engines."
            },
            {
              question: "How do I submit my sitemap to Google?",
              answer: "Use Google Search Console. Go to the Sitemaps section, enter your sitemap URL (like sitemap.xml), and click Submit."
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
