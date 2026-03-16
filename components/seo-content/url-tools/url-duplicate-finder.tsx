export default function UrlDuplicateFinderSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This tool identifies duplicate URLs in a list, helping you clean up data, 
            consolidate analytics, and improve website organization.
          </p>
          <p className="text-muted-foreground">
            The duplicate detection process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">URL normalization:</strong> URLs are standardized (lowercase, trailing slashes, default ports) for accurate comparison.</li>
            <li><strong className="text-foreground">Hash generation:</strong> Each normalized URL is converted to a hash for efficient comparison.</li>
            <li><strong className="text-foreground">Duplicate identification:</strong> URLs with matching hashes are flagged as duplicates.</li>
            <li><strong className="text-foreground">Grouping:</strong> Duplicate groups are displayed together, showing all variations of the same URL.</li>
          </ol>
          <p className="text-muted-foreground">
            URL duplicates cause analytics fragmentation, SEO issues, and data management 
            problems. This tool helps identify and consolidate duplicate entries.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Analytics Data Cleanup",
              description: "Find duplicate page URLs in analytics exports to consolidate traffic data accurately."
            },
            {
              title: "Sitemap Optimization",
              description: "Identify duplicate URLs before submitting sitemaps to search engines."
            },
            {
              title: "Link List Management",
              description: "Clean up bookmark collections, resource lists, or link databases by removing duplicates."
            },
            {
              title: "SEO Audits",
              description: "Find duplicate content URLs that may cause SEO issues and dilute ranking signals."
            },
            {
              title: "Crawl Data Analysis",
              description: "Process crawler output to identify URLs that are accessible through multiple paths."
            },
            {
              title: "Database Deduplication",
              description: "Clean URL fields in databases before imports or migrations to prevent duplicate records."
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
              caveat: "URL variations may be intentional",
              explanation: "Some duplicates are legitimate (different language versions, pagination). Review before removing. Not all duplicates should be eliminated."
            },
            {
              caveat: "Query parameters affect uniqueness",
              explanation: "?id=1 and ?id=2 are different pages. But ?utm_source=x and ?utm_source=y are the same page with different tracking. Consider parameter handling."
            },
            {
              caveat: "Trailing slashes create duplicates",
              explanation: "/page and /page/ are often the same content. Decide on a convention and use redirects to enforce it consistently."
            },
            {
              caveat: "WWW vs non-WWW matters",
              explanation: "www.example.com and example.com should redirect to one canonical version. Both appearing indicates a configuration issue."
            },
            {
              caveat: "HTTP vs HTTPS should be consolidated",
              explanation: "Secure and non-secure versions should redirect to HTTPS. Both appearing suggests missing redirect configuration."
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
              question: "What counts as a duplicate URL?",
              answer: "URLs that differ only in case, trailing slashes, default ports, or session IDs are typically duplicates. URLs with different query parameters may or may not be duplicates depending on the parameters."
            },
            {
              question: "How do I fix duplicate URL issues?",
              answer: "Implement 301 redirects from duplicate versions to the canonical version. Use rel=canonical tags. Update internal links to point to the preferred version."
            },
            {
              question: "Do duplicate URLs hurt SEO?",
              answer: "Yes, they can split ranking signals between versions, waste crawl budget, and potentially trigger duplicate content filters. Consolidate to a single canonical version."
            },
            {
              question: "What about URLs with UTM parameters?",
              answer: "UTM parameters create technically different URLs but the same content. Use Google Search Console's URL Parameters tool or canonical tags to handle these."
            },
            {
              question: "How do I prevent duplicates in the future?",
              answer: "Enforce consistent URL conventions (trailing slashes, www/non-www, HTTPS). Use canonical tags. Configure your CMS to generate consistent URLs."
            },
            {
              question: "Can subdomains be duplicates?",
              answer: "Yes, if they serve the same content. But subdomains are often treated as separate sites by search engines. Evaluate case by case."
            },
            {
              question: "Should I remove duplicates from my sitemap?",
              answer: "Yes, sitemaps should only include canonical URLs. Duplicate URLs in sitemaps waste crawl budget and may confuse search engines."
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
