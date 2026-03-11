export default function UrlEncoderSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This URL encoder converts special characters in URLs to their percent-encoded 
            equivalents, making them safe for transmission over the internet.
          </p>
          <p className="text-muted-foreground">
            The encoding process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Character analysis:</strong> Each character is checked against the set of "safe" URL characters (alphanumerics and a few symbols).</li>
            <li><strong className="text-foreground">Percent encoding:</strong> Unsafe characters are converted to % followed by their two-digit hexadecimal ASCII code.</li>
            <li><strong className="text-foreground">Mode selection:</strong> Different encoding modes handle different use cases - full encoding for query values, URI encoding for full URLs.</li>
            <li><strong className="text-foreground">Output generation:</strong> The encoded string is safe to use in URLs, forms, and HTTP requests.</li>
          </ol>
          <p className="text-muted-foreground">
            For example, "Hello World!" becomes "Hello%20World%21" - spaces become %20, 
            exclamation marks become %21, ensuring the URL works correctly everywhere.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Query Parameter Values",
              description: "Encode user input before adding it to URL query strings to prevent breaking the URL structure."
            },
            {
              title: "API Request Construction",
              description: "Properly encode parameters when building API URLs programmatically."
            },
            {
              title: "Dynamic Link Generation",
              description: "Create shareable links that include user-generated content or special characters."
            },
            {
              title: "Form Action URLs",
              description: "Encode URL parameters in form actions to ensure proper submission."
            },
            {
              title: "Bookmark and Redirect URLs",
              description: "Prepare URLs containing special characters for bookmarks or redirect chains."
            },
            {
              title: "Data in URL Fragments",
              description: "Encode data passed in URL hash fragments for single-page applications."
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
              caveat: "Don't encode the entire URL",
              explanation: "Only encode specific parts like query values. Encoding the protocol, slashes, or path separators will break the URL."
            },
            {
              caveat: "Different contexts need different encoding",
              explanation: "Query parameters need encodeURIComponent, while full URLs need encodeURI. Using the wrong one can over- or under-encode."
            },
            {
              caveat: "Already-encoded text gets double-encoded",
              explanation: 'Encoding "%20" produces "%2520". Make sure input isn\'t already encoded before applying encoding again.'
            },
            {
              caveat: "Some characters should never be encoded",
              explanation: "Characters like : / ? # [ ] @ are URL delimiters. Encoding them changes their meaning and breaks URL parsing."
            },
            {
              caveat: "UTF-8 characters expand to multiple bytes",
              explanation: 'Non-ASCII characters (emoji, accented letters) encode to multiple %XX sequences. "é" becomes "%C3%A9".'
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
              question: "What's the difference between encodeURI and encodeURIComponent?",
              answer: "encodeURI preserves URL structure characters (: / ? #). encodeURIComponent encodes everything except alphanumerics and - _ . ! ~ * ' (). Use encodeURIComponent for query values."
            },
            {
              question: "Why do spaces become %20 and not +?",
              answer: "In query strings, + traditionally represents spaces (application/x-www-form-urlencoded). But %20 is the proper percent-encoding. Both work in query values, but %20 is more universal."
            },
            {
              question: "Do I need to encode ampersands in URLs?",
              answer: "In query values, yes - & separates parameters so it must be encoded as %26. In the base URL structure, & should be written as &amp; in HTML but & in actual HTTP requests."
            },
            {
              question: "What characters are safe in URLs without encoding?",
              answer: "A-Z, a-z, 0-9, hyphen (-), underscore (_), period (.), and tilde (~) are always safe. Everything else should be encoded for maximum compatibility."
            },
            {
              question: "Can I manually decode percent-encoded URLs?",
              answer: "Yes, use a URL decoder tool. Each %XX sequence represents one byte - %20 is space (ASCII 32), %21 is ! (ASCII 33), etc."
            },
            {
              question: "Why does my encoded URL look so long?",
              answer: "Each special character becomes three characters (%XX). Non-ASCII characters become even longer. This is normal and necessary for URL safety."
            },
            {
              question: "Should I encode URLs in email?",
              answer: "Yes, especially if the URL might be line-wrapped. Long encoded URLs are less likely to break at awkward points that invalidate the link."
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
