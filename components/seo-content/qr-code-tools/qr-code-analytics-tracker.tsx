import React from "react"

export default function QrCodeAnalyticsTrackerSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the QR Code Analytics Tracker Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter your base URL - the landing page where users should arrive after scanning. This is your destination without tracking parameters.
          </p>
          <p>
            Add UTM campaign name to identify the marketing campaign. This appears in Google Analytics as the campaign source.
          </p>
          <p>
            Specify UTM source (where traffic comes from) and medium (marketing medium). Examples: source=instagram, medium=social.
          </p>
          <p>
            Add UTM content to differentiate similar links. Useful for A/B testing different QR code placements.
          </p>
          <p>
            Generate a unique tracking ID for QR-specific analytics. The complete tracked URL includes all parameters for detailed reporting.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Multi-location campaign tracking</h3>
            <p className="text-sm text-muted-foreground">
              Different QR codes for each store location. Track which locations drive most traffic. Optimize placement strategy.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Print ad ROI measurement</h3>
            <p className="text-sm text-muted-foreground">
              Unique codes for each publication. See which magazines drive conversions. Justify ad spend with data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Event marketing analysis</h3>
            <p className="text-sm text-muted-foreground">
              Track scans from different event materials. Booth signs vs. handouts vs. badges. Understand what works.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Product packaging insights</h3>
            <p className="text-sm text-muted-foreground">
              QR codes on different product lines. See which products drive engagement. Inform product strategy.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Direct mail campaign tracking</h3>
            <p className="text-sm text-muted-foreground">
              Unique codes for each mailer version. Track response rates by demographic. Optimize future mailings.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Billboard effectiveness</h3>
            <p className="text-sm text-muted-foreground">
              Different codes for different billboard locations. Measure location performance. Negotiate better rates with data.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">UTM parameters appear in analytics.</strong>
              Google Analytics, Adobe Analytics, and most platforms recognize UTM parameters. Data appears in campaign reports.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Consistent naming matters.</strong>
              Use consistent casing and spelling. "instagram" and "Instagram" appear as separate sources. Create a naming convention.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Tracking IDs enable granular analysis.</strong>
              Unique QR IDs let you track individual code performance. Compare placements, designs, and distributions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Longer URLs create larger QR codes.</strong>
              Many parameters increase QR code complexity. Consider URL shorteners after adding parameters.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Privacy note:</strong> UTM parameters track campaign data, not personal information. Comply with privacy regulations. Disclose tracking in privacy policy.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What are UTM parameters?</h3>
            <p className="text-sm text-muted-foreground">
              URL parameters that identify traffic sources. utm_source, utm_medium, utm_campaign, utm_content, and utm_term. Standard for marketing attribution.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Where do I see the analytics?</h3>
            <p className="text-sm text-muted-foreground">
              Google Analytics: Acquisition > Campaigns. Your UTM parameters appear in reports. Set up goals to track conversions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I track without Google Analytics?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, use any analytics platform that supports UTM parameters. Adobe Analytics, Matomo, and others work similarly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many parameters should I use?</h3>
            <p className="text-sm text-muted-foreground">
              Minimum: source, medium, campaign. Add content for A/B testing. Term is mainly for paid search. More isn't always better.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do UTM parameters affect SEO?</h3>
            <p className="text-sm text-muted-foreground">
              No, search engines ignore UTM parameters. They're for analytics only. Use canonical URLs if concerned about duplicates.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I edit parameters after printing?</h3>
            <p className="text-sm text-muted-foreground">
              No, parameters are encoded in the QR code. To change them, generate and print new codes. Plan parameters carefully.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I use URL shorteners with tracking?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, shorteners create cleaner QR codes. Many provide additional analytics. Layer shortener stats with UTM data.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
