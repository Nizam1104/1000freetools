import React from "react"

export default function UnicodeUrlEncoderDecoderSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Unicode URL Encoder Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter the text you want to encode or paste a percent-encoded URL to decode. Select Encode or Decode mode. Click the convert button to process your text.
          </p>
          <p>
            Encoding converts each character to its UTF-8 byte sequence, then represents each byte as %XX where XX is the hexadecimal value. Spaces can optionally become + instead of %20 for form data.
          </p>
          <p>
            Decoding reverses the process. Percent-encoded sequences like %E4%B8%96 are converted back to UTF-8 bytes, then decoded to Unicode characters. Plus signs become spaces in decode mode.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating URLs with international text</h3>
            <p className="text-sm text-muted-foreground">
              Building a URL with Chinese, Arabic, or emoji? Encode it first. "example.com/search=日本" becomes "example.com/search=%E6%97%A5%E6%9C%AC".
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging API query parameters</h3>
            <p className="text-sm text-muted-foreground">
              API returns a URL with encoded parameters you can't read. Decode it to see what was actually sent. "name=Jos%C3%A9" reveals "name=José".
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building HTML forms programmatically</h3>
            <p className="text-sm text-muted-foreground">
              Generating form submissions in code? Encode field values properly. Special characters and Unicode need percent-encoding for valid form data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Working with redirect URLs</h3>
            <p className="text-sm text-muted-foreground">
              Redirect URLs often contain encoded parameters. Decode to understand where you're being sent. Re-encode if you need to modify and redirect again.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Processing web scraping data</h3>
            <p className="text-sm text-muted-foreground">
              Scraped URLs come encoded. Decode them for storage or display. Re-encode when constructing new requests to maintain proper URL format.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing URL handling in applications</h3>
            <p className="text-sm text-muted-foreground">
              Verify your app handles encoded URLs correctly. Test with various Unicode characters, edge cases like %00, and double-encoded strings.
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
              Alphanumeric characters and some symbols (-, _, ., ~) are safe in URLs. Only encode reserved characters and non-ASCII. Over-encoding makes URLs unreadable.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Space encoding depends on context.</strong>
              In query strings, spaces often become +. In path segments, they're %20. The "space as plus" option handles form-encoded data specifically.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">UTF-8 is the standard encoding.</strong>
              Modern web uses UTF-8 for URL encoding. Older systems might use other encodings. A character may encode differently in Latin-1 vs UTF-8.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Double-encoding causes problems.</strong>
              Encoding an already-encoded string produces %25XX instead of %XX. "Hello%20World" becomes "Hello%2520World". Decode first if unsure.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Never manually construct URLs by concatenation. Use URL-building APIs in your language. They handle encoding automatically and prevent injection vulnerabilities.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between encode and encodeURIComponent?</h3>
            <p className="text-sm text-muted-foreground">
              encodeURI leaves URL structure characters alone (:, /, ?, #). encodeURIComponent encodes everything except alphanumerics. Use encodeURIComponent for parameter values.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does emoji take so many characters?</h3>
            <p className="text-sm text-muted-foreground">
              Emoji are 4 bytes in UTF-8. Each byte becomes 3 characters (%XX). So "" becomes %F0%9F%98%80 - twelve characters for one emoji.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I encode an entire URL?</h3>
            <p className="text-sm text-muted-foreground">
              You can, but don't encode the whole thing. Encode only the parameter values. The structure (://, ?, &, =) should remain unencoded.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about plus signs in the original text?</h3>
            <p className="text-sm text-muted-foreground">
              Real plus signs encode to %2B. The + shortcut is only for spaces in form data. Decoding converts + to space, %2B to actual plus.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is this safe for passwords in URLs?</h3>
            <p className="text-sm text-muted-foreground">
              No. Never put passwords in URLs, encoded or not. URLs are logged and cached. Use proper authentication headers or form POST requests.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why do some URLs have %2F and others have /?</h3>
            <p className="text-sm text-muted-foreground">
              / in the path is fine. / in a parameter value must be %2F. Context matters. Path separators stay literal, data gets encoded.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I decode partial URLs?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, decode any percent-encoded segment. Just make sure you're decoding complete sequences. %E4%B8%96 must stay together as one character.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
