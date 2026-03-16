export default function UrlSocialMediaPreviewSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This tool previews how your URL will appear when shared on social media platforms, 
            helping you optimize Open Graph and Twitter Card metadata for maximum engagement.
          </p>
          <p className="text-muted-foreground">
            The preview process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">URL fetching:</strong> The tool retrieves the HTML content of your page.</li>
            <li><strong className="text-foreground">Meta tag extraction:</strong> Open Graph (og:), Twitter Card, and standard meta tags are parsed.</li>
            <li><strong className="text-foreground">Platform simulation:</strong> Previews show how the link appears on Facebook, Twitter, LinkedIn, etc.</li>
            <li><strong className="text-foreground">Issue detection:</strong> Missing or incorrect metadata is flagged for optimization.</li>
          </ol>
          <p className="text-muted-foreground">
            Social previews significantly impact click-through rates. A well-optimized preview 
            with compelling title, description, and image can double engagement compared to auto-generated previews.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Content Publishing",
              description: "Preview how blog posts and articles will look before sharing to ensure optimal presentation."
            },
            {
              title: "Marketing Campaigns",
              description: "Verify that campaign landing pages display compelling previews that drive clicks."
            },
            {
              title: "Website Launches",
              description: "Test social previews before launching new sites to ensure proper metadata implementation."
            },
            {
              title: "Troubleshooting Shares",
              description: "Diagnose why links are showing incorrect titles, descriptions, or images when shared."
            },
            {
              title: "A/B Testing Previews",
              description: "Test different og:title and og:description combinations to optimize click-through rates."
            },
            {
              title: "Client Deliverables",
              description: "Show clients how their website will appear on social media as part of SEO/SEM reports."
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
              caveat: "Social platforms cache previews",
              explanation: "Facebook, Twitter, and LinkedIn cache link previews. Changes to metadata may not appear immediately. Use platform-specific debuggers to force refresh."
            },
            {
              caveat: "Image requirements vary by platform",
              explanation: "Facebook recommends 1200x630px, Twitter has different sizes for summary vs. summary cards. Use the largest common size for best results."
            },
            {
              caveat: "Previews may differ from actual display",
              explanation: "Platforms update their display formats. Previews are approximations. Always test with actual shares for critical campaigns."
            },
            {
              caveat: "Some platforms ignore certain tags",
              explanation: "LinkedIn may prioritize different tags than Facebook. Twitter has its own card system. Implement both Open Graph and Twitter Card tags."
            },
            {
              caveat: "Dynamic content may not render",
              explanation: "JavaScript-rendered content isn't always captured in previews. Ensure critical meta tags are in the initial HTML response."
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
              question: "What are the essential Open Graph tags?",
              answer: "At minimum: og:title, og:description, og:image, and og:url. Add og:type (article, website) and og:site_name for complete implementation."
            },
            {
              question: "Why isn't my image showing in previews?",
              answer: "Common causes: image too small (min 200x200), wrong format, blocked by robots.txt, or cached old version. Use platform debuggers to refresh cache."
            },
            {
              question: "How do I refresh Facebook's cache?",
              answer: "Use Facebook's Sharing Debugger (developers.facebook.com/tools/debug). Enter your URL and click \"Scrape Again\" to force Facebook to re-fetch metadata."
            },
            {
              question: "What's the ideal image size for social shares?",
              answer: "1200x630px works well across platforms. For Twitter, also add twitter:image with same size. Keep file size under 5MB for fastest loading."
            },
            {
              question: "Can I have different previews for different platforms?",
              answer: "Yes. Use og: tags for Facebook/LinkedIn and twitter: tags for Twitter. This lets you optimize titles and images per platform."
            },
            {
              question: "Why do some links show different content than expected?",
              answer: "Platforms may fall back to page content if meta tags are missing, or use cached versions. Ensure complete, accurate Open Graph implementation."
            },
            {
              question: "Do social previews affect SEO?",
              answer: "Not directly - social signals aren't a Google ranking factor. But better previews drive more clicks and shares, indirectly benefiting visibility."
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
