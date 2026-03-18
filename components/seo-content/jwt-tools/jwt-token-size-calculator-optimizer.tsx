import React from "react"

export default function JwtTokenSizeCalculatorOptimizerSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste a JWT token to analyze its size in bytes and characters. The calculator breaks down the size by section (header, payload, signature) and shows the base64-encoded and decoded sizes.
          </p>
          <p>
            Optimization suggestions identify oversized claims, recommend compression strategies, and flag unnecessary data. Reducing JWT size improves performance, especially for mobile apps and high-traffic APIs.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Example analysis:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Size Breakdown:
Total encoded: 342 characters (342 bytes)
Header: 36 chars (alg, typ)
Payload: 256 chars (claims)
Signature: 43 chars

Decoded payload: 189 bytes
Compression ratio: 1.8x

Optimization suggestions:
- Remove "iat" if not needed (-15 bytes)
- Shorten claim names ("user_id" → "uid") (-45 bytes)
- Use numeric status codes (-12 bytes)</pre>
          </div>
          <p>
            The analyzer considers HTTP header overhead since JWTs typically travel in Authorization headers. Every byte counts when tokens are sent with every API request.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Mobile app optimization</h3>
            <p className="text-sm text-muted-foreground">
              Mobile networks have higher latency and data costs. A 2KB JWT sent with every request adds up. Reducing to 500 bytes saves bandwidth and improves response times on cellular connections.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">High-traffic API scaling</h3>
            <p className="text-sm text-muted-foreground">
              At 10,000 requests/second, a 1KB reduction per JWT saves 10MB/s of bandwidth. Over a month, that's 26TB less data transfer. Significant cost savings for large-scale services.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Cookie storage limits</h3>
            <p className="text-sm text-muted-foreground">
              Browser cookies have a 4KB limit per cookie. If your JWT exceeds this, it won't fit in a cookie. The analyzer helps you stay under the limit while maintaining necessary claims.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">URL parameter tokens</h3>
            <p className="text-sm text-muted-foreground">
              Some systems pass JWTs in URLs. Long URLs get truncated by proxies, email clients, and some browsers. Keeping JWTs compact ensures reliable delivery through all channels.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Microservice communication</h3>
            <p className="text-sm text-muted-foreground">
              JWTs passed between services accumulate latency. In a chain of 10 services, a large JWT adds up. Optimized tokens reduce inter-service communication overhead.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Security audit and compliance</h3>
            <p className="text-sm text-muted-foreground">
              Large JWTs might contain unnecessary sensitive data. The analyzer reveals what's in your tokens, helping identify PII that shouldn't be stored in client-side tokens.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Base64 encoding adds overhead.</strong>
              Base64 increases size by ~33%. A 100-byte payload becomes ~136 bytes encoded. This is why decoded size matters for understanding actual data volume.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Claim names contribute to size.</strong>
              "user_authentication_id" takes 22 bytes. "uid" takes 3 bytes. Short claim names save space but reduce readability. Balance brevity with maintainability.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Signature size depends on algorithm.</strong>
              HS256 produces 64-character signatures. RS256 produces longer signatures (344 chars for 2048-bit keys). Algorithm choice affects total token size.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Don't optimize away necessary claims.</strong>
              Removing "exp" (expiration) saves bytes but creates tokens that never expire. Security should trump size optimization. Only remove truly unnecessary data.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Store large data server-side, reference by ID in the JWT. Instead of embedding user permissions, store a "permission_set_id" and look up permissions server-side.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's a reasonable JWT size?</h3>
            <p className="text-sm text-muted-foreground">
              Aim for under 1KB for optimal performance. 1-2KB is acceptable. Over 4KB may exceed cookie limits. Over 8KB risks URL truncation and performance issues.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I compress JWT payloads?</h3>
            <p className="text-sm text-muted-foreground">
              JWT compression (DEFLATE) is possible but rarely used. It adds CPU overhead and complexity. Better to reduce payload content than compress. Most JWTs are small enough without compression.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How does algorithm choice affect size?</h3>
            <p className="text-sm text-muted-foreground">
              HS256: 64-char signature. HS512: 86-char signature. RS256 (2048-bit): 344-char signature. ES256: ~64-char signature. For size-sensitive apps, prefer HMAC or ECDSA over RSA.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use JWT compression?</h3>
            <p className="text-sm text-muted-foreground">
              RFC 7516 defines JWE compression, but it's rarely implemented. Most JWT libraries don't support it. Focus on payload optimization instead of compression.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What data shouldn't be in JWTs?</h3>
            <p className="text-sm text-muted-foreground">
              Avoid: passwords, full addresses, long text fields, large arrays, frequently changing data. JWTs are client-visible and hard to revoke. Keep them minimal and stable.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I reduce JWT size without losing functionality?</h3>
            <p className="text-sm text-muted-foreground">
              Use short claim names, remove optional claims (iat, jti), store references instead of data, choose compact algorithms (ES256), avoid nested objects, use arrays sparingly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does JWT size affect security?</h3>
            <p className="text-sm text-muted-foreground">
              Indirectly. Large JWTs tempt developers to skip signature verification for performance. Also, large tokens may contain excessive sensitive data. Smaller, focused JWTs are safer.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
