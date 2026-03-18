import React from "react"

export default function JWTBase64URLEncoderDecoderSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How Base64URL Encoding Works in JWTs</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            JWT uses Base64URL encoding instead of standard Base64 to make tokens URL-safe. The tool converts between these formats by replacing problematic characters: <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">+</code> becomes <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">-</code>, <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">/</code> becomes <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">_</code>, and padding <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">=</code> is removed.
          </p>
          <p>
            When encoding, your JSON payload gets stringified, then converted to Base64, then transformed to Base64URL. Decoding reverses this: Base64URL to Base64 (adding back padding), then <code className="font-mono text-xs">atob()</code> to get the original string.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Character replacement table:</p>
            <div className="grid grid-cols-2 gap-2 text-sm font-mono">
              <div className="flex justify-between"><span>Standard Base64:</span> <span>+</span></div>
              <div className="flex justify-between"><span>Base64URL:</span> <span>-</span></div>
              <div className="flex justify-between"><span>Standard Base64:</span> <span>/</span></div>
              <div className="flex justify-between"><span>Base64URL:</span> <span>_</span></div>
            </div>
          </div>
          <p>
            This encoding ensures JWTs work safely in URLs, HTTP headers, and HTML forms without additional URL encoding overhead.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Real-World Use Cases</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Manual JWT construction</h3>
            <p className="text-sm text-muted-foreground">
              You're building a JWT by hand for testing. After creating the header and payload JSON objects, you encode each segment to Base64URL before joining them with dots.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging token parsing issues</h3>
            <p className="text-sm text-muted-foreground">
              Your backend rejects a JWT with "invalid encoding" errors. You decode the Base64URL segments to check for stray characters or missing padding.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Converting logs for analysis</h3>
            <p className="text-sm text-muted-foreground">
              Your application logs contain Base64URL-encoded JWT segments. You decode them to extract user IDs and timestamps for debugging session issues.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating test fixtures</h3>
            <p className="text-sm text-muted-foreground">
              Writing unit tests for JWT validation? Encode known payloads to Base64URL to create predictable test tokens with specific claims.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">API documentation examples</h3>
            <p className="text-sm text-muted-foreground">
              You're writing API docs and need to show example JWT structures. Encode sample payloads to create realistic-looking tokens for documentation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Validating token format before signing</h3>
            <p className="text-sm text-muted-foreground">
              Before sending a payload to your signing service, you encode it to Base64URL to verify the JSON structure is correct and fits size limits.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Base64URL is not encryption.</strong>
              Anyone can decode Base64URL-encoded data. It's just a transport format, not security. Never put sensitive data (passwords, PII) in JWT payloads.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Padding matters for decoding.</strong>
              Base64URL removes <code className="font-mono text-xs">=</code> padding, but standard Base64 decoding requires it. The tool adds padding back automatically when decoding.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">UTF-8 characters need care.</strong>
              JavaScript's <code className="font-mono text-xs">btoa()</code> only handles ASCII. For Unicode payloads, you need to UTF-8 encode first (using <code className="font-mono text-xs">TextEncoder</code> or similar).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">JWT has three segments.</strong>
              A complete JWT is <code className="font-mono text-xs">header.payload.signature</code>. This tool encodes/decodes individual segments, not the full token structure.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> When manually constructing JWTs, always validate your encoded payload by decoding it back. A single character error in Base64URL breaks the entire token.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does JWT use Base64URL instead of regular Base64?</h3>
            <p className="text-sm text-muted-foreground">
              Standard Base64 uses <code className="font-mono text-xs">+</code> and <code className="font-mono text-xs">/</code>, which have special meaning in URLs. Base64URL replaces these with <code className="font-mono text-xs">-</code> and <code className="font-mono text-xs">_</code> so JWTs work in URLs without percent-encoding.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I decode a full JWT with this tool?</h3>
            <p className="text-sm text-muted-foreground">
              Decode each segment separately. Split the JWT on dots, then decode the header (first segment) and payload (second segment). The signature stays encoded.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What happens if my JSON has special characters?</h3>
            <p className="text-sm text-muted-foreground">
              JSON.stringify handles escaping automatically. Quotes become <code className="font-mono text-xs">\"</code>, newlines become <code className="font-mono text-xs">\n</code>. The resulting string encodes cleanly to Base64URL.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is Base64URL encoding reversible?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, completely. Base64URL is a bijection—every input maps to exactly one output, and decoding always recovers the original data (assuming no transmission errors).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why are there no equals signs in JWT tokens?</h3>
            <p className="text-sm text-muted-foreground">
              Base64URL omits padding (<code className="font-mono text-xs">=</code>) to keep tokens shorter. The decoder can infer the needed padding from the string length modulo 4.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this for non-JWT Base64URL encoding?</h3>
            <p className="text-sm text-muted-foreground">
              Absolutely. Any data that needs URL-safe Base64 encoding works—OAuth state parameters, secure random tokens, or any binary data in URLs.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
