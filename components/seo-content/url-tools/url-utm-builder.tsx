export default function UrlUtmBuilderSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This UTM builder helps you create trackable URLs by adding UTM (Urchin Tracking Module) 
            parameters to any web address. These parameters tell Google Analytics and other tools exactly 
            where your traffic came from.
          </p>
          <p className="text-muted-foreground">
            The builder works by:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Base URL input:</strong> Enter the destination URL you want people to visit.</li>
            <li><strong className="text-foreground">Parameter collection:</strong> Fill in the UTM fields - source (where traffic comes from), medium (how it arrives), and campaign (which promotion).</li>
            <li><strong className="text-foreground">URL construction:</strong> The tool properly encodes and appends parameters using the correct query string format.</li>
            <li><strong className="text-foreground">Validation:</strong> Ensures the resulting URL is properly formatted and ready to use.</li>
          </ol>
          <p className="text-muted-foreground">
            The result is a URL like <code className="bg-muted px-1 rounded">https://example.com?utm_source=newsletter&utm_medium=email&utm_campaign=spring_sale</code> 
            that tracks exactly which campaign drove each visitor.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Email Marketing Campaigns",
              description: "Tag links in newsletters to see which emails drive the most traffic and conversions."
            },
            {
              title: "Social Media Posts",
              description: "Track which social platforms and individual posts generate the most engagement."
            },
            {
              title: "Paid Advertising",
              description: "Measure ROI across different ad platforms, campaigns, and even individual ad variations."
            },
            {
              title: "Affiliate Marketing",
              description: "Provide affiliates with trackable links so you can attribute sales to the right partners."
            },
            {
              title: "Content Marketing",
              description: "Understand which blog posts, guest articles, or content pieces drive qualified traffic."
            },
            {
              title: "A/B Testing",
              description: "Use utm_content to differentiate between link variations and measure which performs better."
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
              caveat: "UTM parameters are visible to users",
              explanation: "Anyone can see your UTM tags in the URL. Don't include sensitive information in campaign names. Use internal codes if needed."
            },
            {
              caveat: "Consistency matters for reporting",
              explanation: 'Use consistent naming conventions (all lowercase, consistent spelling) or your analytics will show "facebook" and "Facebook" as separate sources.'
            },
            {
              caveat: "Three parameters are essential",
              explanation: "Source, medium, and campaign are the core three. Term and content are optional but valuable for paid search and A/B testing respectively."
            },
            {
              caveat: "UTM parameters affect caching",
              explanation: "Different UTM URLs may bypass CDN caching. For high-traffic campaigns, consider using a URL shortener or parameter handling on your server."
            },
            {
              caveat: "Don't tag internal links",
              explanation: "Only use UTMs for external traffic sources. Tagging internal navigation will overwrite the original source data in analytics."
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
              question: "What's the difference between source and medium?",
              answer: "Source is the specific platform (google, facebook, newsletter). Medium is the category of traffic (cpc, social, email). Together they tell you both where and how traffic arrived."
            },
            {
              question: "Do I need all five UTM parameters?",
              answer: "No. Source, medium, and campaign are the essentials. Use term for paid search keywords and content to differentiate similar links (like two CTAs in the same email)."
            },
            {
              question: "Can I use UTM parameters for offline campaigns?",
              answer: "Yes! Use UTMs in QR codes, printed materials with short URLs, or anywhere you can include a trackable link. Just make the URL accessible (like a landing page)."
            },
            {
              question: "Will UTM parameters affect SEO?",
              answer: "No, search engines ignore UTM parameters for ranking. However, use rel=canonical if the same content is accessible with and without UTMs to avoid duplicate content issues."
            },
            {
              question: "How do I view UTM data in Google Analytics?",
              answer: `In GA4, go to Reports > Acquisition > Traffic acquisition. You'll see dimensions for Session source, Session medium, and Session campaign showing your UTM data.`
            },
            {
              question: "Should I use uppercase or lowercase in UTM values?",
              answer: 'Always lowercase. Analytics platforms treat "Facebook" and "facebook" as different sources. Create a naming convention document and stick to it.'
            },
            {
              question: "Can UTM parameters break my website?",
              answer: "Rarely, but some poorly configured sites might have issues with query parameters. Test your tagged URLs before launching campaigns. Most modern sites handle UTMs without problems."
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
