export default function UrlDecoderSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This URL decoder reverses percent-encoding, converting encoded URLs back to their 
            original, human-readable form for easier inspection and debugging.
          </p>
          <p className="text-muted-foreground">
            The decoding process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Pattern recognition:</strong> The tool identifies percent-encoded sequences (%XX where XX is hexadecimal).</li>
            <li><strong className="text-foreground">Byte conversion:</strong> Each %XX sequence is converted back to its original character using the ASCII/UTF-8 value.</li>
            <li><strong className="text-foreground">Plus sign handling:</strong> In query strings, + characters are converted to spaces (legacy form encoding convention).</li>
            <li><strong className="text-foreground">UTF-8 reconstruction:</strong> Multi-byte sequences are properly combined to reconstruct non-ASCII characters.</li>
          </ol>
          <p className="text-muted-foreground">
            For example, "Hello%20World%21" decodes back to "Hello World!" - making it 
            easy to read and understand what the URL actually contains.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Debugging URL Parameters",
              description: "Read encoded query parameters to understand what data is being passed in URLs."
            },
            {
              title: "Analyzing Tracking Links",
              description: "Decode marketing URLs to see the actual UTM parameters and tracking data."
            },
            {
              title: "Security Investigation",
              description: "Reveal hidden content in suspicious URLs that may be obfuscated through encoding."
            },
            {
              title: "API Response Analysis",
              description: "Decode URLs returned by APIs to understand the actual endpoints and parameters."
            },
            {
              title: "Log File Analysis",
              description: "Make server logs readable by decoding the encoded URLs in access logs."
            },
            {
              title: "Reverse Engineering",
              description: "Understand how applications construct URLs by decoding and analyzing the patterns."
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
              caveat: "Decoded URLs may contain dangerous content",
              explanation: "Malicious URLs often use encoding to hide their true destination. Decoding reveals the actual target - be cautious about visiting decoded URLs from untrusted sources."
            },
            {
              caveat: "Double-encoded URLs exist",
              explanation: "Some URLs are encoded multiple times (%2520 instead of %20). You may need to decode multiple times to get the final result."
            },
            {
              caveat: "Invalid encoding causes errors",
              explanation: "Malformed percent sequences (%ZZ where ZZ isn't valid hex) will cause decoding errors. The tool will indicate where problems occur."
            },
            {
              caveat: "Context affects decoding",
              explanation: "Query strings treat + as space, but path segments don't. The tool uses standard decoding that works for most cases."
            },
            {
              caveat: "Some encoding is intentional",
              explanation: "URLs may be encoded to prevent manipulation or for security reasons. Decoding doesn't make them safe to modify or use."
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
              question: "Why are URLs encoded in the first place?",
              answer: "URLs are encoded to safely transmit special characters that have meaning in URL syntax. Without encoding, characters like spaces, ampersands, and question marks would break the URL structure."
            },
            {
              question: "Is it safe to click decoded URLs?",
              answer: "Decoding itself is safe - it just reveals what's there. But the decoded URL might lead to malicious sites. Always verify the destination before visiting, especially for URLs from untrusted sources."
            },
            {
              question: "What does %20 mean in a URL?",
              answer: "%20 represents a space character (ASCII code 32 in hex is 20). It's the most common encoding you'll see in URLs since spaces aren't allowed in raw form."
            },
            {
              question: "Can I re-encode a decoded URL?",
              answer: "Yes, use a URL encoder tool. However, be aware that encoding and decoding aren't always perfectly reversible if the original had non-standard encoding."
            },
            {
              question: "Why do some characters stay encoded after decoding?",
              answer: "Some characters must remain encoded to preserve URL structure. If everything decoded, the URL might become invalid. The tool preserves necessary encoding."
            },
            {
              question: "How do I decode URLs in my browser?",
              answer: "Browser consoles can decode with decodeURIComponent(). Bookmarklets and extensions also exist. This tool provides a simple interface without installation."
            },
            {
              question: "What's the difference between URL decoding and HTML decoding?",
              answer: "URL decoding handles %XX sequences. HTML decoding handles &entity; sequences like &amp; and &lt;. They're different encoding systems for different contexts."
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
