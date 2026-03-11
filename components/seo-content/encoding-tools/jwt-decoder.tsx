import * as React from "react"

export default function JwtDecoderSEO() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 text-foreground">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How the JWT Decoder Works</h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            Our JWT (JSON Web Token) decoder parses and displays the contents of JWT tokens without verification. JWTs are compact, URL-safe tokens used for authentication and information exchange, consisting of three Base64-encoded parts: header, payload, and signature.
          </p>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">JWT Structure</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Header: Algorithm and token type (Base64 encoded JSON)</li>
              <li>Payload: Claims and data (Base64 encoded JSON)</li>
              <li>Signature: Verification hash (Base64 encoded)</li>
              <li>Format: header.payload.signature (dot-separated)</li>
            </ol>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Decoding Process</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Token is split at the dots into three parts</li>
              <li>Header and payload are Base64URL decoded</li>
              <li>JSON is parsed and formatted for display</li>
              <li>Claims are analyzed for expiration and validity</li>
              <li>Token information is displayed in readable format</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Common Use Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Debugging Authentication</h3>
            <p className="text-sm text-muted-foreground">
              Inspect JWT tokens during development to verify claims, expiration, and token structure.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Security Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Analyze tokens for security issues like weak algorithms, missing claims, or excessive permissions.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">API Development</h3>
            <p className="text-sm text-muted-foreground">
              Verify JWT tokens received from authentication services contain expected claims and format.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Token Troubleshooting</h3>
            <p className="text-sm text-muted-foreground">
              Diagnose authentication failures by examining token contents and expiration times.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Learning and Education</h3>
            <p className="text-sm text-muted-foreground">
              Understand JWT structure and claims by decoding real tokens and examining their contents.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Integration Testing</h3>
            <p className="text-sm text-muted-foreground">
              Verify token generation and claims during integration testing of authentication flows.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">What to Know Before Using This Tool</h2>
        <div className="space-y-4 text-muted-foreground">
          <div className="rounded-lg border p-4 space-y-3">
            <h3 className="font-semibold text-foreground">JWT Components</h3>
            <div className="space-y-2 text-sm">
              <div className="p-3 rounded border bg-muted/30">
                <div className="font-medium text-foreground">Header</div>
                <div className="text-muted-foreground text-xs">Specifies algorithm (HS256, RS256) and token type (JWT)</div>
              </div>
              <div className="p-3 rounded border bg-muted/30">
                <div className="font-medium text-foreground">Payload</div>
                <div className="text-muted-foreground text-xs">Contains claims (user data, permissions, expiration)</div>
              </div>
              <div className="p-3 rounded border bg-muted/30">
                <div className="font-medium text-foreground">Signature</div>
                <div className="text-muted-foreground text-xs">Verifies token integrity (not decoded, verified)</div>
              </div>
            </div>
          </div>
          <div className="rounded-lg border p-4 space-y-3">
            <h3 className="font-semibold text-foreground">Security Warning</h3>
            <p className="text-sm">
              This tool decodes tokens WITHOUT verifying signatures. Decoded data should not be trusted without signature verification. Never share tokens containing sensitive data.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-3">
            <h3 className="font-semibold text-foreground">Common Claims</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><strong>iss:</strong> Issuer of the token</li>
              <li><strong>sub:</strong> Subject (user ID)</li>
              <li><strong>exp:</strong> Expiration time</li>
              <li><strong>iat:</strong> Issued at time</li>
              <li><strong>aud:</strong> Audience</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Is it safe to decode JWTs online?</h3>
            <p className="text-sm text-muted-foreground">
              Decoding reveals token contents but does not verify authenticity. Never paste tokens with sensitive data into online tools. Use locally for production tokens.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Can I modify JWT tokens?</h3>
            <p className="text-sm text-muted-foreground">
              You can decode and see the data, but modifying tokens requires the signing key. Modified tokens will fail signature verification on the server.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">What does "token expired" mean?</h3>
            <p className="text-sm text-muted-foreground">
              The exp claim indicates when the token is no longer valid. Expired tokens should be rejected by servers. Request a new token through the authentication flow.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">What algorithms are commonly used?</h3>
            <p className="text-sm text-muted-foreground">
              HS256 (HMAC with SHA-256) is common for symmetric signing. RS256 (RSA with SHA-256) is used for asymmetric signing. ES256 (ECDSA) is gaining popularity.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold text-foreground">How long should JWTs be valid?</h3>
            <p className="text-sm text-muted-foreground">
              Short-lived tokens (15-60 minutes) are more secure. Use refresh tokens for longer sessions. Balance security with user experience based on your application needs.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
