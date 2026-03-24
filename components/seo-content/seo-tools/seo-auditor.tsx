export default function SEOAuditorSEO() {
  return (
    <>
    <section className="max-w-4xl mx-auto px-4 py-12 space-y-12 mt-[400px]">
        <div>
          <h1 className="text-3xl font-bold mb-6">Free Site SEO Auditor</h1>
          <p className="text-muted-foreground leading-relaxed">
            This tool crawls your entire website and identifies SEO issues across
            every page. Enter a URL and it will scan your site for broken links,
            missing meta tags, duplicate content, redirect chains, status code
            errors, and structural problems that affect search rankings. Unlike
            page-level checkers, this auditor follows internal links to give you a
            complete picture of your site's SEO health.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              <strong className="text-foreground">Step 1: Enter your URL</strong> —
              Type or paste your website URL (e.g., https://example.com). The
              crawler will start from that page and follow all internal links it
              discovers.
            </p>
            <p>
              <strong className="text-foreground">Step 2: Complete verification</strong>
              — Click the Turnstile checkbox to verify you're human. This prevents
              automated abuse and keeps the tool free.
            </p>
            <p>
              <strong className="text-foreground">Step 3: Click "Audit Site"</strong>
              — The crawler begins fetching pages from your site. You'll see
              real-time progress showing how many pages have been visited and how
              many remain in the queue.
            </p>
            <p>
              <strong className="text-foreground">Step 4: Review results</strong> —
              As each page is crawled, the tool checks for SEO issues: missing title
              tags, duplicate meta descriptions, broken links (404s), redirect
              chains, missing alt text, heading structure problems, and more.
            </p>
            <p>
              <strong className="text-foreground">Step 5: Export or dig deeper</strong>
              — Once crawling finishes (or you hit Stop), you can export the full
              results as JSON, view detailed breakdowns by issue severity, inspect
              individual pages, or analyze link structures and content patterns.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">
            What This Tool Checks For
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-medium text-foreground mb-2">
                Technical SEO Issues
              </h3>
              <ul className="space-y-1">
                <li>• HTTP status codes (200, 301, 302, 404, 5xx errors)</li>
                <li>• Redirect chains and loops</li>
                <li>• Page load depth from homepage</li>
                <li>• Broken internal and external links</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-medium text-foreground mb-2">On-Page SEO</h3>
              <ul className="space-y-1">
                <li>• Missing or duplicate title tags</li>
                <li>• Missing or duplicate meta descriptions</li>
                <li>• Heading hierarchy (H1, H2, H3 structure)</li>
                <li>• Missing alt attributes on images</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-medium text-foreground mb-2">
                Content Analysis
              </h3>
              <ul className="space-y-1">
                <li>• Duplicate content detection</li>
                <li>• Keyword cannibalization</li>
                <li>• TF-IDF keyword analysis</li>
                <li>• Word count and content length</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-medium text-foreground mb-2">
                Site Structure
              </h3>
              <ul className="space-y-1">
                <li>• Internal link graph visualization</li>
                <li>• Anchor text distribution</li>
                <li>• Sitemap.xml audit</li>
                <li>• Robots.txt validation</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Who Needs This Tool
          </h2>
          <div className="space-y-3 text-muted-foreground">
            <p>
              <strong className="text-foreground">Small business owners</strong> who
              want to check their website's SEO health before hiring an agency or
              consultant. Run a crawl and you'll have a concrete list of issues to
              fix.
            </p>
            <p>
              <strong className="text-foreground">Freelance SEO auditors</strong> can
              use this as a starting point for client audits. Export the JSON data
              and build your recommendations on top of the technical findings.
            </p>
            <p>
              <strong className="text-foreground">Web developers</strong> launching
              new sites or redesigns. Crawl before and after deployment to catch
              broken links, missing redirects, or accidentally removed pages.
            </p>
            <p>
              <strong className="text-foreground">Content marketers</strong> managing
              large blogs. Find duplicate content, cannibalized keywords, and pages
              with thin content that need expansion.
            </p>
            <p>
              <strong className="text-foreground">E-commerce managers</strong> with
              hundreds or thousands of product pages. Identify category pages with
              no unique content, filter URLs causing duplicate content, or product
              pages returning 404 errors.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Limitations and Tips
          </h2>
          <div className="space-y-3 text-muted-foreground">
            <p>
              <strong className="text-foreground">Crawl depth:</strong> The tool
              follows internal links up to a reasonable depth. Very large sites
              (10,000+ pages) may need to be crawled in sections by starting from
              different subdirectories.
            </p>
            <p>
              <strong className="text-foreground">JavaScript-rendered content:</strong>{" "}
              This crawler fetches HTML directly and may not see content loaded
              dynamically by JavaScript. For SPAs or heavily JS-dependent sites,
              consider using server-side rendering or pre-rendering for accurate
              SEO audits.
            </p>
            <p>
              <strong className="text-foreground">Authentication walls:</strong> The
              crawler cannot access pages behind login forms, paywalls, or
              authentication. Audit public-facing pages only.
            </p>
            <p>
              <strong className="text-foreground">Rate limiting:</strong> To avoid
              overwhelming servers, the crawler includes delays between requests.
              Large sites will take time to complete. You can stop the crawl at any
              point and review partial results.
            </p>
            <p>
              <strong className="text-foreground">External links:</strong> The tool
              checks external links for broken URLs but doesn't crawl external
              sites. Focus is on your domain's internal SEO health.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-foreground mb-2">
                How many pages can this tool crawl?
              </h3>
              <p className="text-muted-foreground">
                There's no hard limit, but the tool is designed for small to
                medium-sized websites (up to a few thousand pages). For very large
                sites, consider crawling sections separately or using enterprise SEO
                platforms built for massive-scale crawling.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-foreground mb-2">
                Does this tool check Core Web Vitals or page speed?
              </h3>
              <p className="text-muted-foreground">
                No, this auditor focuses on technical SEO, content issues, and site
                structure. For Core Web Vitals, use Google PageSpeed Insights or
                Chrome UX Report. This tool complements speed testing by finding
                on-page and structural issues.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-foreground mb-2">
                Can I crawl multiple domains or subdomains?
              </h3>
              <p className="text-muted-foreground">
                Each crawl is scoped to a single domain. To audit subdomains (e.g.,
                blog.example.com, shop.example.com), run separate crawls for each.
                The tool stays within the origin domain of the starting URL.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-foreground mb-2">
                What's the difference between this and Google Search Console?
              </h3>
              <p className="text-muted-foreground">
                Google Search Console shows how Google sees your site (index
                coverage, search queries, manual actions). This tool simulates a
                crawler's perspective and finds issues before they affect rankings.
                Use both: GSC for real-world performance data, this auditor for
                proactive issue detection.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-foreground mb-2">
                How do I fix the issues this tool finds?
              </h3>
              <p className="text-muted-foreground">
                Each issue type requires different fixes. Missing title tags need
                unique, descriptive titles added to each page's HTML head section.
                Broken links require updating or removing the linking pages.
                Duplicate content may need canonical tags or content consolidation.
                The detailed reports show which pages have which issues, making it
                easier to prioritize fixes.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-foreground mb-2">
                Is my crawl data stored or shared?
              </h3>
              <p className="text-muted-foreground">
                No. Crawls run in your browser session and are not stored on servers.
                You can export results as JSON for your own records, but the data is
                not retained or used for any other purpose once you close the page.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-foreground mb-2">
                Why does the crawler need Turnstile verification?
              </h3>
              <p className="text-muted-foreground">
                Turnstile (by Cloudflare) prevents automated bots from abusing the
                tool. Without it, bad actors could run thousands of crawls
                programmatically, slowing down the service for everyone. The
                verification is privacy-friendly and doesn't track you across sites.
              </p>
            </div>
          </div>
        </div>
      </section></>
  )
}
