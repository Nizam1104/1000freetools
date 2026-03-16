import React from "react"

export default function HtmlIframeCodeGeneratorSEO() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How the HTML Iframe Code Generator Works</h2>
        <div className="prose prose-sm dark:prose-invert">
          <p className="text-muted-foreground">
            This tool generates properly configured iframe embed code for embedding external content.
            Set dimensions, security options, and accessibility attributes through a visual interface.
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <h3 className="text-lg font-semibold">Iframe Generation Process</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Enter the source URL of the content you want to embed</li>
            <li>Set the width and height (pixels or percentage)</li>
            <li>Configure frameborder and scrolling options</li>
            <li>Add a title for accessibility (required for WCAG compliance)</li>
            <li>Enable advanced options: fullscreen, lazy loading, sandbox mode</li>
            <li>Preview the embedded content in real-time</li>
            <li>Copy the generated iframe code for your website</li>
          </ol>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Specific Use Cases</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Embedding YouTube Videos</h3>
            <p className="text-sm text-muted-foreground">
              A blogger wants to add a tutorial video to their post. They paste the YouTube embed URL,
              set dimensions to 560×315, enable fullscreen, and get the code to paste into their CMS.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Google Maps Integration</h3>
            <p className="text-sm text-muted-foreground">
              A restaurant owner adds a location map to their contact page. They get the embed URL
              from Google Maps, configure the size to fit their sidebar, and embed the interactive map.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Third-Party Form Embedding</h3>
            <p className="text-sm text-muted-foreground">
              A marketer embeds a Typeform or Google Form for lead capture. They use sandbox mode
              to restrict what the embedded content can do, improving security.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Dashboard Widget Integration</h3>
            <p className="text-sm text-muted-foreground">
              A developer embeds analytics dashboards from external tools. Lazy loading ensures
              the iframes only load when visible, improving page performance.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Payment Processor Integration</h3>
            <p className="text-sm text-muted-foreground">
              An e-commerce site embeds secure payment forms from Stripe or PayPal.
              Sandbox mode with specific permissions ensures the payment form works while
              preventing unauthorized access to the parent page.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using This Tool</h2>
        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <p className="text-muted-foreground">
            Understanding iframe options and security:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Some websites block embedding via X-Frame-Options header</li>
            <li>Title attribute is required for accessibility (screen readers)</li>
            <li>Lazy loading improves performance by deferring off-screen iframes</li>
            <li>Sandbox mode restricts iframe capabilities for security</li>
            <li>Allowfullscreen enables video players to go fullscreen</li>
            <li>Width can be percentage (responsive) or fixed pixels</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Why isn&apos;t my iframe showing content?</h3>
            <p className="text-sm text-muted-foreground">
              The target website may block embedding with X-Frame-Options or Content-Security-Policy headers.
              Many sites (like Google homepage) don&apos;t allow embedding for security reasons.
              Use official embed URLs from platforms like YouTube instead.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What does sandbox mode do?</h3>
            <p className="text-sm text-muted-foreground">
              Sandbox restricts what the embedded content can do. Options include:
              allow-scripts (run JavaScript), allow-forms (submit forms),
              allow-same-origin (access parent origin), allow-popups (open windows).
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">How do I make iframes responsive?</h3>
            <p className="text-sm text-muted-foreground">
              Set width to &quot;100%&quot; and use a fixed aspect ratio container.
              For videos, use the padding-bottom hack or CSS aspect-ratio property
              to maintain proportions on different screen sizes.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What is lazy loading for iframes?</h3>
            <p className="text-sm text-muted-foreground">
              Lazy loading (loading=&quot;lazy&quot;) defers iframe loading until it&apos;s near the viewport.
              This improves initial page load time, especially for pages with multiple iframes.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Why is the title attribute important?</h3>
            <p className="text-sm text-muted-foreground">
              The title describes the iframe content for screen reader users.
              It&apos;s required for WCAG accessibility compliance.
              Example: &quot;YouTube video player&quot; or &quot;Contact form&quot;.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Can I communicate between iframe and parent page?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, using the postMessage API. However, this requires cooperation from both
              the parent page and the embedded content. Cross-origin communication has
              security considerations.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
