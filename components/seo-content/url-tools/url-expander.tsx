export default function UrlExpanderSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This URL expander reveals the final destination of shortened URLs, helping you 
            see where shortened links actually lead before clicking them.
          </p>
          <p className="text-muted-foreground">
            The expansion process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Redirect following:</strong> The tool makes HTTP requests to the short URL.</li>
            <li><strong className="text-foreground">Chain tracing:</strong> Each redirect (301, 302, etc.) is followed to the next location.</li>
            <li><strong className="text-foreground">Final destination:</strong> The process continues until a non-redirect response is reached.</li>
            <li><strong className="text-foreground">Result display:</strong> The final, expanded URL is shown along with the redirect chain.</li>
          </ol>
          <p className="text-muted-foreground">
            URL expansion is crucial for security - shortened links can hide malicious destinations, 
            and this tool lets you verify where a link leads without risking your safety.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Security Verification",
              description: "Check shortened links in emails, messages, or social media before clicking to avoid phishing and malware."
            },
            {
              title: "Social Media Management",
              description: "Verify where your own shortened links redirect to ensure they're configured correctly."
            },
            {
              title: "Affiliate Link Auditing",
              description: "Confirm that affiliate links redirect to the correct product pages."
            },
            {
              title: "Content Moderation",
              description: "Screen user-submitted links to ensure they don't redirect to prohibited content."
            },
            {
              title: "Link Analysis",
              description: "Understand the redirect chains used in marketing campaigns or by competitors."
            },
            {
              title: "Broken Link Detection",
              description: "Identify shortened links that no longer redirect to valid destinations."
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
              caveat: "Some shorteners use JavaScript redirects",
              explanation: "This tool follows HTTP redirects. Shorteners that use intermediate pages with JavaScript redirects may not fully expand."
            },
            {
              caveat: "Click tracking may be triggered",
              explanation: "Some services count a 'click' when the short URL is accessed, even if you don't visit the destination. This may affect analytics."
            },
            {
              caveat: "Geo-targeted redirects vary",
              explanation: "Some shorteners redirect based on location. The expanded URL may differ depending on where the expansion occurs."
            },
            {
              caveat: "Time-limited links may expire",
              explanation: "Some shortened URLs are temporary and expire after a certain time or number of clicks."
            },
            {
              caveat: "Malicious links are still dangerous to expand",
              explanation: "While safer than clicking, expanding malicious URLs still contacts the servers. Use caution with highly suspicious links."
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
              question: "Is it safe to expand suspicious URLs?",
              answer: "Safer than clicking, but not risk-free. The expansion makes HTTP requests but doesn't execute page content. For highly suspicious links, use sandboxed environments."
            },
            {
              question: "Why would someone use a shortened URL?",
              answer: "Common reasons: character limits (Twitter), aesthetics, click tracking, affiliate links, or to hide the actual destination (sometimes maliciously)."
            },
            {
              question: "Can expanded URLs still be dangerous?",
              answer: "The expanded URL itself is just text. The danger is in visiting it. Expansion reveals the destination so you can make an informed decision."
            },
            {
              question: "What shorteners does this support?",
              answer: "Most common shorteners: bit.ly, tinyurl.com, t.co, goo.gl, ow.ly, and many others. Any service using standard HTTP redirects works."
            },
            {
              question: "Why does the expanded URL look different than expected?",
              answer: "The short URL may redirect through multiple hops, add tracking parameters, or go to a landing page before the final destination. The full chain is shown."
            },
            {
              question: "Can I expand multiple URLs at once?",
              answer: "This tool handles one URL at a time. For bulk expansion, use API-based services or specialized batch tools."
            },
            {
              question: "Do expanded URLs preserve UTM parameters?",
              answer: "It depends on the shortener. Some preserve all parameters, others may strip or modify them. The expanded URL shows exactly what you'll receive."
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
