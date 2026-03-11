import React from "react"

export default function UrlEncoderDecoderSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the URL Encoder/Decoder Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select encode mode to convert text to URL-encoded format, or decode mode to convert URL-encoded strings back to readable text. Enter your content in the input field and the conversion happens instantly.
          </p>
          <p>
            URL encoding (percent encoding) replaces special characters with % followed by two hexadecimal digits. Spaces become %20, ampersands become %26, and non-ASCII characters use multiple encoded bytes.
          </p>
          <p>
            Decoding reverses the process, converting %XX sequences back to their original characters. Invalid sequences trigger an error message. The tool handles multi-byte UTF-8 sequences correctly.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building URL query parameters</h3>
            <p className="text-sm text-muted-foreground">
              Your search term has spaces and special chars. Encode "hello world&test" to "hello%20world%26test" for safe inclusion in URLs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging webhook payloads</h3>
            <p className="text-sm text-muted-foreground">
              Received URL-encoded POST data in logs. Decode it to see the actual content. Useful for troubleshooting API integrations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating shareable links with parameters</h3>
            <p className="text-sm text-muted-foreground">
              Your link includes user names or titles with special characters. Encode them properly so the link works when shared.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Parsing server logs</h3>
            <p className="text-sm text-muted-foreground">
              Web server logs show URL-encoded requests. Decode them to understand what users actually searched for or submitted.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Working with OAuth callbacks</h3>
            <p className="text-sm text-muted-foreground">
              OAuth redirect URLs contain encoded parameters. Decode the state and redirect_uri parameters to verify they're correct.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Handling form submissions</h3>
            <p className="text-sm text-muted-foreground">
              HTML forms encode data as application/x-www-form-urlencoded. Decode received data to process user input correctly.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Not all characters need encoding.</strong>
              Letters, numbers, and some symbols (-, _, ., ~) are safe in URLs. Spaces, &, =, ?, and # must be encoded in query strings.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Space can be + or %20.</strong>
              In query strings, spaces often become +. In path segments, spaces become %20. This tool uses %20 (standard percent encoding).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Non-ASCII uses multiple bytes.</strong>
              "café" encodes to "caf%C3%A9" in UTF-8. The é character is two bytes in UTF-8, each encoded separately.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Don't encode entire URLs blindly.</strong>
              Only encode parameter values, not the URL structure. Encoding :// or / breaks the URL. Encode just the query parameter values.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Use encodeURIComponent() for parameter values, not encodeURI(). The first encodes everything special, the second preserves URL structure. This tool uses encodeURIComponent behavior.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between encodeURI and encodeURIComponent?</h3>
            <p className="text-sm text-muted-foreground">
              encodeURI preserves URL structure (://, ?, &, =). encodeURIComponent encodes everything except alphanumerics. Use encodeURIComponent for parameter values.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why are some characters encoded and others not?</h3>
            <p className="text-sm text-muted-foreground">
              Reserved characters have special meaning in URLs. & separates parameters, = assigns values, ? starts query string. They must be encoded when used as data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I encode a full URL?</h3>
            <p className="text-sm text-muted-foreground">
              You can, but don't. Encode only the parameter values. A fully encoded URL becomes unusable. Keep the structure, encode just the data parts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about emoji in URLs?</h3>
            <p className="text-sm text-muted-foreground">
              Emoji encode to multiple %XX sequences. A single emoji can become 8+ encoded characters. It works but makes very long URLs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is URL encoding the same as percent encoding?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, they're the same thing. "Percent encoding" describes the format (%XX). "URL encoding" describes the purpose. Both terms refer to the same scheme.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does my decoded text look wrong?</h3>
            <p className="text-sm text-muted-foreground">
              The encoding might use a different character set than UTF-8. Most modern systems use UTF-8. Older systems might use Latin-1 or Windows-1252.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I encode line breaks?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Newline becomes %0A (LF) or %0D%0A (CRLF). Carriage return becomes %0D. These are rarely valid in URLs and usually indicate a problem.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
