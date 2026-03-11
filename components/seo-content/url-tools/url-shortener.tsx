export default function UrlShortenerSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This URL shortener creates compact, shareable aliases for long URLs, making links 
            easier to share, remember, and track across various platforms.
          </p>
          <p className="text-muted-foreground">
            The shortening process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">URL validation:</strong> The input URL is checked for proper format.</li>
            <li><strong className="text-foreground">Alias generation:</strong> A unique short code is created using random characters or custom aliases.</li>
            <li><strong className="text-foreground">Mapping storage:</strong> The short code is mapped to the original URL in a database.</li>
            <li><strong className="text-foreground">Redirect setup:</strong> When someone visits the short URL, they're redirected to the original.</li>
          </ol>
          <p className="text-muted-foreground">
            Short URLs are particularly useful for platforms with character limits (Twitter), 
            print materials where long URLs are impractical, and tracking click-through rates.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Social Media Sharing",
              description: "Shorten URLs for Twitter, Instagram bios, and other platforms with character or display limitations."
            },
            {
              title: "Print and Offline Media",
              description: "Create memorable short URLs for business cards, flyers, presentations, and TV/radio ads."
            },
            {
              title: "Click Tracking",
              description: "Monitor how many people click your links and from which sources with built-in analytics."
            },
            {
              title: "Affiliate Marketing",
              description: "Clean up long affiliate URLs and track performance across different promotion channels."
            },
            {
              title: "QR Code Generation",
              description: "Shorter URLs create simpler QR codes that scan more reliably and look cleaner."
            },
            {
              title: "Link Management",
              description: "Update destination URLs without changing the short link - useful for campaigns that evolve."
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
              caveat: "Short URLs hide the destination",
              explanation: "Users can't see where a short link leads, which reduces trust. Some platforms flag or block short URLs for this reason."
            },
            {
              caveat: "Service dependency risk",
              explanation: "If the shortening service shuts down, all your short links break. Use established services or self-host for critical links."
            },
            {
              caveat: "SEO value passes through redirects",
              explanation: "301 redirects pass link equity, but there can be slight delays in search engines following the chain. Direct links are slightly better for SEO."
            },
            {
              caveat: "Custom aliases can be squatted",
              explanation: "Popular custom aliases may already be taken. Have alternatives ready, or use auto-generated codes."
            },
            {
              caveat: "Analytics require the service",
              explanation: "Click tracking only works while using the shortening service. Export data regularly if you need historical records."
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
              question: "Are short URLs safe to click?",
              answer: "They can be - but you can't see the destination. Use URL expanders to preview where short links lead before clicking, especially from unknown sources."
            },
            {
              question: "Do short URLs affect SEO?",
              answer: "Properly implemented short URLs use 301 redirects which pass SEO value. However, direct links are slightly better. Use short URLs for sharing, not for internal linking."
            },
            {
              question: "Can I change the destination of a short URL?",
              answer: "Most services allow editing the destination. This is useful for updating campaign landing pages without changing the shared short link."
            },
            {
              question: "How short can URLs get?",
              answer: "With 6-character codes using letters and numbers, you get ~56 billion combinations. Most services use 6-8 characters, balancing brevity with capacity."
            },
            {
              question: "Why do some platforms block short URLs?",
              answer: "Spammers abuse short URLs to hide malicious destinations. LinkedIn, some email providers, and security-conscious platforms may block or warn about short links."
            },
            {
              question: "Should I use my own domain for short URLs?",
              answer: "For business use, yes. Branded short domains (your.co/link) build trust, improve click rates, and you control the service. Services like Bitly support custom domains."
            },
            {
              question: "What happens if the shortening service shuts down?",
              answer: "All your short links stop working. For important long-term links, use established services, self-host, or keep a mapping backup to migrate if needed."
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
