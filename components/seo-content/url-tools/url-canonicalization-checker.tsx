export default function UrlCanonicalizationCheckerSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This tool checks if a website properly implements canonical URLs - a critical SEO 
            feature that tells search engines which version of a page is the "master" version to index.
          </p>
          <p className="text-muted-foreground">
            The checking process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Page fetching:</strong> The tool retrieves the HTML content of the specified URL.</li>
            <li><strong className="text-foreground">Canonical tag extraction:</strong> Searches for the rel="canonical" link element in the page head.</li>
            <li><strong className="text-foreground">URL comparison:</strong> Compares the canonical URL with the current URL to identify discrepancies.</li>
            <li><strong className="text-foreground">Issue detection:</strong> Identifies common problems like missing canonicals, self-referencing issues, or cross-domain canonicals.</li>
          </ol>
          <p className="text-muted-foreground">
            Canonical tags prevent duplicate content issues when the same content is accessible 
            through multiple URLs (with parameters, www vs non-www, HTTP vs HTTPS, etc.).
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "SEO Audits",
              description: "Verify canonical implementation across your website as part of regular SEO health checks."
            },
            {
              title: "Site Migrations",
              description: "Ensure canonical tags point to the correct URLs after restructuring or moving to a new domain."
            },
            {
              title: "E-commerce Product Pages",
              description: "Check that product variants (different colors, sizes) canonicalize to the main product page."
            },
            {
              title: "CMS Configuration",
              description: "Verify your content management system generates correct canonical tags for all page types."
            },
            {
              title: "Competitor Analysis",
              description: "Understand how competitors handle duplicate content through canonicalization."
            },
            {
              title: "Troubleshooting Index Issues",
              description: "Diagnose why certain pages aren't appearing in search results - incorrect canonicals are a common culprit."
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
              caveat: "Canonical tags are hints, not directives",
              explanation: "Search engines may ignore canonical tags if they disagree with the suggestion. They're strong signals but not absolute commands."
            },
            {
              caveat: "Self-referencing canonicals are best practice",
              explanation: "Every page should have a canonical pointing to itself (or the preferred version). Missing self-referencing canonicals aren't errors but are recommended."
            },
            {
              caveat: "Cross-domain canonicals have limitations",
              explanation: "You can canonicalize to a different domain, but search engines scrutinize these more carefully. Both domains should be under your control."
            },
            {
              caveat: "Canonicals don't redirect users",
              explanation: "Unlike 301 redirects, canonical tags only affect search engines. Users still land on the original URL."
            },
            {
              caveat: "Pagination needs special handling",
              explanation: "Paginated content (page 1, 2, 3) should typically canonicalize to the first page or use rel=prev/next instead of self-canonical."
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
              question: "What's the correct canonical tag format?",
              answer: "<link rel=\"canonical\" href=\"https://example.com/preferred-url\" /> placed in the <head> section. The href should be an absolute URL with https."
            },
            {
              question: "Should www and non-www versions have canonicals?",
              answer: "Yes, pick one as preferred (typically www or non-www consistently) and have the other version canonicalize to it. Also set up 301 redirects for consistency."
            },
            {
              question: "What happens if I don't use canonical tags?",
              answer: "Search engines will pick a canonical version themselves, which might not be your preference. This can split ranking signals across duplicate URLs and hurt visibility."
            },
            {
              question: "Can canonical tags hurt SEO if implemented wrong?",
              answer: "Yes. Canonicalizing all pages to homepage, pointing to 404 pages, or creating canonical chains can cause indexing problems. Always verify implementation."
            },
            {
              question: "Do I need canonicals on AMP pages?",
              answer: "Yes, AMP pages should canonicalize to their non-AMP counterparts. The non-AMP page should also reference the AMP version with rel=\"amphtml\"."
            },
            {
              question: "How is canonical different from noindex?",
              answer: "Canonical says \"index this other URL instead.\" Noindex says \"don't index this page at all.\" They solve different problems and can be used together."
            },
            {
              question: "Can I use canonical for syndicated content?",
              answer: "Yes, if you republish content, canonicalize to the original source. This helps the original rank while avoiding duplicate content penalties."
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
