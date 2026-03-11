import React from "react"

export default function UrlEncoderDecoderSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            URL encoding (percent encoding) converts special characters into
            a format safe for URLs. Characters outside the unreserved set
            (A-Z, a-z, 0-9, -, _, ., ~) become % followed by two hex digits.
          </p>
          <p>
            The encoder replaces spaces with + (in query strings) or %20 (in
            paths), and converts special characters like &amp;, =, and ? to
            their percent-encoded equivalents. Decoding reverses this process.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Example encoding:</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">Hello World!</code>
                <span>becomes</span>
                <code className="font-mono bg-background px-2 py-1 rounded">Hello%20World%21</code>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">a=b&amp;c</code>
                <span>becomes</span>
                <code className="font-mono bg-background px-2 py-1 rounded">a%3Db%26c</code>
              </div>
            </div>
          </div>
          <p>
            Paste a URL or text to encode, or encoded URL to decode. The tool
            handles both component encoding (for individual parts) and full
            URL encoding.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When you'd actually use this</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building URLs with query parameters</h3>
            <p className="text-sm text-muted-foreground">
              A developer constructs an API URL with user-provided search terms.
              They encode the query string so spaces and special characters
              don't break the URL structure.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging broken links</h3>
            <p className="text-sm text-muted-foreground">
              Someone clicks a link and gets a 404 error. They decode the URL
              to see the actual path, discovering that double-encoding turned
              %20 into %2520, breaking the link.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating shareable links with text</h3>
            <p className="text-sm text-muted-foreground">
              A web app lets users share content via URL parameters. The
              developer encodes the shared text so it survives copy-paste
              through email, chat, and social media without corruption.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Processing webhook callbacks</h3>
            <p className="text-sm text-muted-foreground">
              A backend receives webhook data with URL-encoded payloads. The
              developer decodes the parameters to extract the actual data
              for processing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing URL parsing libraries</h3>
            <p className="text-sm text-muted-foreground">
              A QA engineer tests whether their URL parser handles edge cases.
              They generate URLs with various encoded characters to verify
              correct decoding behavior.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Fixing form submission issues</h3>
            <p className="text-sm text-muted-foreground">
              A user's form submission fails because their input contains
              ampersands that get interpreted as parameter separators.
              Encoding the form data fixes the issue.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to know before using it</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Don't encode the entire URL at once.</strong>
              Encode each component separately (path segments, query values).
              Encoding slashes or colons breaks the URL structure. / becomes
              %2F and your path won't work.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Space encoding depends on context.</strong>
              In query strings, spaces often become +. In URL paths, spaces
              become %20. Both decode to space, but encoding differs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Double encoding causes bugs.</strong>
              Encoding already-encoded text turns %20 into %2520. This is a
              common bug. Check if text is already encoded before applying
              encoding again.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some characters must stay encoded.</strong>
              ? starts the query string, &amp; separates parameters, = assigns
              values. If these appear in your data, they must be encoded.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Security note:</strong> URL encoding isn't security
              encoding. It doesn't prevent XSS or injection attacks. Use
              proper output encoding for your context (HTML, JavaScript, SQL).
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between encodeURI and encodeURIComponent?</h3>
            <p className="text-sm text-muted-foreground">
              encodeURI encodes a full URL, preserving :, /, ?, &amp;.
              encodeURIComponent encodes a URL component, encoding everything
              except unreserved characters. Use encodeURIComponent for query
              values.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why is %20 sometimes +?</h3>
            <p className="text-sm text-muted-foreground">
              In application/x-www-form-urlencoded data (query strings and
              form POSTs), + represents space. In URL paths, %20 is used.
              Both decode to space.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I decode a partial URL?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, decoding works on any percent-encoded text. You don't need
              a complete URL. Paste just the encoded portion to decode it.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What characters are safe in URLs?</h3>
            <p className="text-sm text-muted-foreground">
              Unreserved characters need no encoding: A-Z, a-z, 0-9, hyphen
              (-), underscore (_), period (.), and tilde (~). Everything
              else should be encoded.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I encode a URL in JavaScript?</h3>
            <p className="text-sm text-muted-foreground">
              Use encodeURIComponent() for query values:
              encodeURIComponent("Hello World!") returns "Hello%20World%21".
              For full URLs, use encodeURI() but be careful with query strings.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why are my encoded URLs so long?</h3>
            <p className="text-sm text-muted-foreground">
              Each special character becomes 3 characters (%XX). Non-ASCII
              characters in UTF-8 become multiple bytes, each encoded as %XX.
              A single emoji can become 12+ characters when encoded.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can URL encoding handle emoji?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, emoji encode as their UTF-8 bytes. 😀 (U+1F600) becomes
              %F0%9F%98%80. Each of the 4 UTF-8 bytes becomes %XX.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
