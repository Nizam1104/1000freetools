export default function UrlEncodeDecodeSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This URL encoder and decoder performs percent-encoding on strings for safe use
            in URLs, and decodes URL-encoded strings back to their original form. It handles
            special characters, spaces, and Unicode characters properly.
          </p>
          <p className="text-muted-foreground">
            The encoding process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Identify special characters:</strong> Find characters that have special meaning in URLs: spaces, &, =, ?, #, /, etc.</li>
            <li><strong className="text-foreground">Percent-encode:</strong> Replace each special character with % followed by its hex ASCII value. Space becomes %20.</li>
            <li><strong className="text-foreground">Handle Unicode:</strong> Non-ASCII characters are UTF-8 encoded first, then each byte is percent-encoded.</li>
            <li><strong className="text-foreground">Preserve safe characters:</strong> Alphanumeric and some punctuation (-, _, ., ~) remain unchanged.</li>
          </ol>
          <p className="text-muted-foreground">
            Decoding reverses this: find %XX sequences, convert hex to characters, and
            reconstruct the original string. This is essential for working with URLs and
            web forms.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Building URLs with Parameters",
              description: "Encode query parameters that contain spaces, special characters, or user input for safe URL inclusion."
            },
            {
              title: "Debugging Web Requests",
              description: "Decode URL-encoded parameters from server logs, network captures, or browser address bars."
            },
            {
              title: "API Development",
              description: "Encode API parameters and decode responses that contain URL-encoded data."
            },
            {
              title: "Form Data Processing",
              description: "Understand how form data is encoded (application/x-www-form-urlencoded) for POST requests."
            },
            {
              title: "SEO and Analytics",
              description: "Encode UTM parameters and campaign URLs properly for tracking without breaking URLs."
            },
            {
              title: "Security Analysis",
              description: "Decode suspicious URLs to analyze potential XSS, injection attacks, or phishing attempts."
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
              caveat: "Space can be + or %20",
              explanation: "In query strings, space is often encoded as +. In path segments, it's %20. Both decode to space."
            },
            {
              caveat: "Not all characters need encoding",
              explanation: "Unreserved characters (A-Z, a-z, 0-9, -, _, ., ~) don't need encoding. Encoding them is harmless but unnecessary."
            },
            {
              caveat: "Double encoding breaks things",
              explanation: "%2520 decodes to %20, not space. Encoding already-encoded text causes problems. Only encode raw text."
            },
            {
              caveat: "Different URL parts have different rules",
              explanation: "Path, query string, and fragment have different reserved characters. Encode appropriately for each section."
            },
            {
              caveat: "Unicode becomes multiple bytes",
              explanation: "Emoji and non-ASCII characters become multiple %XX sequences. 😀 becomes %F0%9F%98%80 (4 bytes)."
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
              question: "What characters must be encoded in URLs?",
              answer: "Spaces, control characters, and reserved characters: ? & = # / : @ ! $ ' ( ) * + , ; % < > [ ] { } \\ \" ^ ` |"
            },
            {
              question: "Why is space encoded as %20?",
              answer: "Space is ASCII 32, which is 0x20 in hex. Percent-encoding uses % followed by hex ASCII value."
            },
            {
              question: "What's the difference between + and %20?",
              answer: "In query strings, + means space (form encoding convention). In paths, only %20 works. When decoding, both become space."
            },
            {
              question: "How do I encode a full URL?",
              answer: "Don't encode the whole URL! Encode only the variable parts (query parameters, path segments). Keep :// and / separators."
            },
            {
              question: "What's URL-safe Base64?",
              answer: "Standard Base64 uses + and / which need URL encoding. URL-safe Base64 uses - and _ instead, avoiding extra encoding."
            },
            {
              question: "Why are some characters already decoded in my browser?",
              answer: "Browsers automatically decode URLs for display. View the actual URL in developer tools or copy from the address bar."
            },
            {
              question: "Can I manually percent-encode?",
              answer: "Yes! Find the ASCII hex value and add %. 'A' is ASCII 65 = 0x41, so %41. But use tools for accuracy."
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
