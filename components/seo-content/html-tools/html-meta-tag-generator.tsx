import React from "react"

export default function HtmlMetaTagGeneratorSEO() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How the HTML Meta Tag Generator Works</h2>
        <div className="prose prose-sm dark:prose-invert">
          <p className="text-muted-foreground">
            This tool generates comprehensive meta tags for web pages through a simple form interface.
            Enter your page details and get properly formatted meta tags for SEO, Open Graph (Facebook),
            and Twitter Card integration. The generator creates all essential tags in one go.
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <h3 className="text-lg font-semibold">Meta Tag Generation Process</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Enter your page title (appears in search results and browser tabs)</li>
            <li>Write a compelling description (150-160 characters recommended)</li>
            <li>Add relevant keywords separated by commas</li>
            <li>Specify the author name for attribution</li>
            <li>Enter the canonical URL for the page</li>
            <li>Provide an Open Graph image URL for social sharing</li>
            <li>Select Twitter Card type (summary or summary with large image)</li>
            <li>Copy the generated meta tags and paste into your HTML &lt;head&gt;</li>
          </ol>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Specific Use Cases</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">New Website Launch</h3>
            <p className="text-sm text-muted-foreground">
              A developer launching a new website generates meta tags for each page.
              Proper meta tags ensure good search engine indexing and attractive social media previews.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Blog Post Optimization</h3>
            <p className="text-sm text-muted-foreground">
              A blogger creates meta tags for each post to improve search visibility.
              Well-crafted descriptions increase click-through rates from search results.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">E-commerce Product Pages</h3>
            <p className="text-sm text-muted-foreground">
              An online store generates unique meta tags for product pages.
              Open Graph tags ensure products display attractively when shared on social media.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Landing Page Creation</h3>
            <p className="text-sm text-muted-foreground">
              A marketer builds campaign landing pages with optimized meta tags.
              Twitter Cards increase engagement when the page is shared on Twitter.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">SEO Audit and Updates</h3>
            <p className="text-sm text-muted-foreground">
              An SEO specialist audits existing pages and regenerates meta tags
              to follow current best practices and improve search rankings.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using This Tool</h2>
        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <p className="text-muted-foreground">
            Understanding meta tags and their purposes:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Title tags should be 50-60 characters for optimal search display</li>
            <li>Meta descriptions should be 150-160 characters</li>
            <li>Keywords meta tag is ignored by most search engines but some CMS use it</li>
            <li>Open Graph tags control how links appear on Facebook and LinkedIn</li>
            <li>Twitter Cards enhance how links display on Twitter</li>
            <li>Canonical URLs help prevent duplicate content issues</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Are meta tags still important for SEO?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, title tags and meta descriptions are crucial for SEO. While the keywords
              meta tag is largely ignored, titles and descriptions directly impact search
              rankings and click-through rates.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What is Open Graph and why use it?</h3>
            <p className="text-sm text-muted-foreground">
              Open Graph is a protocol by Facebook that controls how links appear when shared.
              It defines the title, description, and image shown on Facebook, LinkedIn, and other platforms.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What&apos;s the difference between Twitter Card types?</h3>
            <p className="text-sm text-muted-foreground">
              &quot;Summary&quot; shows a small thumbnail image. &quot;Summary with Large Image&quot;
              displays a full-width image. Large images are more eye-catching but require
              images at least 300x157 pixels.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Do I need a canonical URL?</h3>
            <p className="text-sm text-muted-foreground">
              Canonical URLs are important if the same content is accessible via multiple URLs.
              They tell search engines which version is the &quot;master&quot; copy, preventing
              duplicate content penalties.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What size should my Open Graph image be?</h3>
            <p className="text-sm text-muted-foreground">
              Facebook recommends 1200x630 pixels for optimal display. The image should be
              at least 600x315 pixels. Use JPG for photos, PNG for graphics with text.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Where do I paste the generated meta tags?</h3>
            <p className="text-sm text-muted-foreground">
              Paste the generated code inside the &lt;head&gt; section of your HTML document,
              after the &lt;meta charset&gt; tag and before any scripts or styles.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
