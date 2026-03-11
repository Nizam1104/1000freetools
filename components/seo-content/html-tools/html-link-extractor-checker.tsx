import React from "react"

export default function HtmlLinkExtractorCheckerSEO() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How the HTML Link Extractor and Checker Works</h2>
        <div className="prose prose-sm dark:prose-invert">
          <p className="text-muted-foreground">
            This tool parses HTML content to find all anchor (&lt;a&gt;) tags and extract their URLs.
            It categorizes links as internal or external and can check the status of external links.
            The tool uses DOM parsing to accurately identify all hyperlinks in the provided HTML.
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <h3 className="text-lg font-semibold">Link Extraction and Checking Process</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Paste HTML content containing links into the input area</li>
            <li>Click &quot;Extract Links&quot; to parse and identify all anchor tags</li>
            <li>Links are categorized as internal or external based on URL format</li>
            <li>Review the extracted list showing link text and URL</li>
            <li>Click &quot;Check Links&quot; to verify external link status</li>
            <li>Status indicators show which links are working or broken</li>
            <li>Copy all URLs or click individual links to open them</li>
          </ol>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Specific Use Cases</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Website Link Audit</h3>
            <p className="text-sm text-muted-foreground">
              A webmaster extracts all links from a page to audit external resources.
              They check for broken links before a site redesign or migration.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">SEO Link Analysis</h3>
            <p className="text-sm text-muted-foreground">
              An SEO specialist analyzes a competitor&apos;s page to understand their
              linking strategy. Extracting links reveals partnerships and resource references.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Content Migration Planning</h3>
            <p className="text-sm text-muted-foreground">
              Before migrating content, a team extracts all links to plan redirects.
              This ensures no broken links after the migration is complete.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Resource List Compilation</h3>
            <p className="text-sm text-muted-foreground">
              A researcher extracts links from multiple pages to compile a resource list.
              The tool quickly gathers all URLs for further analysis.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Link Building Verification</h3>
            <p className="text-sm text-muted-foreground">
              A marketer verifies that backlinks are properly placed on partner sites.
              They extract links to confirm placement and check if they&apos;re still active.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using This Tool</h2>
        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <p className="text-muted-foreground">
            Understanding link extraction:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Internal links typically start with / or # or are relative paths</li>
            <li>External links start with http:// or https://</li>
            <li>Link status checking uses HEAD requests where possible</li>
            <li>CORS restrictions may limit status checking for some domains</li>
            <li>Links without href attributes are not extracted</li>
            <li>JavaScript-generated links won&apos;t be found in static HTML</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What types of links are extracted?</h3>
            <p className="text-sm text-muted-foreground">
              All anchor tags with href attributes are extracted. This includes absolute URLs,
              relative paths, anchor links (#section), mailto: links, and tel: links.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">How does internal vs external classification work?</h3>
            <p className="text-sm text-muted-foreground">
              Links starting with http:// or https:// are classified as external.
              Relative paths, root-relative paths (/page), and anchors (#section)
              are classified as internal.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Why can&apos;t some links be checked?</h3>
            <p className="text-sm text-muted-foreground">
              Browser security (CORS) prevents checking some external links.
              Internal links and links without proper HTTP protocols can&apos;t be checked.
              Some servers block automated requests.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Can this check links across multiple pages?</h3>
            <p className="text-sm text-muted-foreground">
              This tool processes one HTML input at a time. For site-wide link checking,
              you&apos;d need to extract HTML from each page and process them separately,
              or use a dedicated crawler tool.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What does a &quot;Failed&quot; status mean?</h3>
            <p className="text-sm text-muted-foreground">
              Failed means the link check couldn&apos;t complete successfully.
              This could be due to network issues, CORS restrictions, or the server
              blocking the request. The link may still work in a browser.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Can I export the link list?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, use the &quot;Copy URLs&quot; button to copy all extracted URLs
              to your clipboard. Paste them into a spreadsheet or document for further use.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
