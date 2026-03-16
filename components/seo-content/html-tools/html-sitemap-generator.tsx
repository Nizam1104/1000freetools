import React from "react"

export default function HtmlSitemapGeneratorSEO() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How the HTML Sitemap Generator Works</h2>
        <div className="prose prose-sm dark:prose-invert">
          <p className="text-muted-foreground">
            This tool creates XML or HTML sitemaps from a list of URLs. XML sitemaps help search engines
            discover and index your pages. HTML sitemaps provide human-readable navigation for visitors.
            Simply paste your URLs and choose the format you need.
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <h3 className="text-lg font-semibold">Sitemap Generation Process</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Paste your URLs, one per line, into the input area</li>
            <li>Choose XML Sitemap (for search engines) or HTML Sitemap (for users)</li>
            <li>For XML, configure optional metadata (lastmod, changefreq, priority)</li>
            <li>Click &quot;Generate Sitemap&quot; to create the output</li>
            <li>Review the generated sitemap in the output area</li>
            <li>Copy the code or download as a file</li>
            <li>For XML: upload to your website root and submit to search consoles</li>
          </ol>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Specific Use Cases</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Search Engine Submission</h3>
            <p className="text-sm text-muted-foreground">
              A website owner creates an XML sitemap and submits it to Google Search Console.
              This helps Google discover all pages, especially those not easily found through links.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Large Website Organization</h3>
            <p className="text-sm text-muted-foreground">
              A large site with hundreds of pages creates an HTML sitemap for users.
              Visitors can quickly find content that might be buried in navigation.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">New Site Launch</h3>
            <p className="text-sm text-muted-foreground">
              A developer launching a new website creates an XML sitemap before launch.
              This ensures search engines can immediately discover all pages after indexing.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Accessibility Compliance</h3>
            <p className="text-sm text-muted-foreground">
              An organization adds an HTML sitemap to improve site accessibility.
              It provides an alternative navigation method for users with disabilities.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Content Audit</h3>
            <p className="text-sm text-muted-foreground">
              A content team exports all URLs to a sitemap for auditing.
              The sitemap serves as a master list for reviewing and updating content.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using This Tool</h2>
        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <p className="text-muted-foreground">
            Understanding sitemap formats and best practices:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>XML sitemaps follow the sitemaps.org protocol</li>
            <li>Place XML sitemap at your domain root (example.com/sitemap.xml)</li>
            <li>HTML sitemaps should be linked from your footer or main navigation</li>
            <li>lastmod indicates when a page was last modified (YYYY-MM-DD format)</li>
            <li>changefreq hints at update frequency (always, hourly, daily, weekly, monthly, yearly, never)</li>
            <li>priority ranges from 0.0 to 1.0, indicating relative importance</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What&apos;s the difference between XML and HTML sitemaps?</h3>
            <p className="text-sm text-muted-foreground">
              XML sitemaps are for search engines, containing metadata about URLs.
              HTML sitemaps are for human visitors, providing clickable navigation links.
              Most sites benefit from having both.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Do I need to submit my sitemap to Google?</h3>
            <p className="text-sm text-muted-foreground">
              Submitting via Google Search Console is recommended but not required.
              Google can discover sitemaps through robots.txt or by finding links to them.
              Submission ensures Google knows about your sitemap.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">How often should I update my sitemap?</h3>
            <p className="text-sm text-muted-foreground">
              Update your sitemap whenever you add, remove, or significantly change pages.
              For dynamic sites, consider generating sitemaps automatically.
              The lastmod tag helps search engines know what changed.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What is the priority value used for?</h3>
            <p className="text-sm text-muted-foreground">
              Priority (0.0-1.0) indicates a page&apos;s relative importance on your site.
              It doesn&apos;t affect search rankings but helps crawlers prioritize which
              pages to crawl first.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Can I have multiple sitemaps?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, large sites can use sitemap index files to reference multiple sitemaps.
              Each sitemap can contain up to 50,000 URLs. Use separate sitemaps for
              different content types (pages, posts, products).
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Where should I place my HTML sitemap?</h3>
            <p className="text-sm text-muted-foreground">
              Link your HTML sitemap from the footer so it&apos; accessible from every page.
              Common URLs are /sitemap or /site-map. Make sure it&apos;s linked in your
              main navigation structure.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
