import React from "react"

export default function JwtGeneratorSignerSEO() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How the JWT Generator and Signer Works</h2>
        <div className="prose prose-sm dark:prose-invert">
          <p className="text-muted-foreground">
            This tool creates signed JSON Web Tokens from custom header and payload claims.
            You define the token contents, select a signing algorithm, provide a secret key, and get a ready-to-use JWT.
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <h3 className="text-lg font-semibold">Token Creation Process</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Configure the header - select algorithm (HS256, HS384, HS512, or none)</li>
            <li>Add payload claims - standard claims (sub, name, iat) are pre-filled</li>
            <li>Add custom claims by entering a key-value pair and clicking &quot;Add&quot;</li>
            <li>Enter your secret key for signing (not needed for &quot;none&quot; algorithm)</li>
            <li>Click &quot;Generate JWT&quot; to create the signed token</li>
            <li>Copy the generated token for use in Authorization headers or cookies</li>
          </ol>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Specific Use Cases</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">API Testing with Custom Tokens</h3>
            <p className="text-sm text-muted-foreground">
              A QA engineer needs to test API endpoints with different user roles. They generate tokens with custom &quot;role&quot;
              and &quot;permissions&quot; claims to verify access control works correctly.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Prototyping Authentication Flows</h3>
            <p className="text-sm text-muted-foreground">
              A frontend developer building a demo needs valid JWTs without setting up a full auth backend.
              They generate tokens with realistic claims to test token handling in their application.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Creating Service-to-Service Tokens</h3>
            <p className="text-sm text-muted-foreground">
              A backend engineer sets up inter-service authentication. They generate tokens with &quot;iss&quot; (issuer)
              and &quot;aud&quot; (audience) claims to ensure tokens are only accepted by intended services.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Testing Token Expiration Handling</h3>
            <p className="text-sm text-muted-foreground">
              A developer tests how their app handles expired tokens. They manually set the &quot;exp&quot; claim to a past timestamp
              and verify the application correctly rejects the token.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Generating Tokens for Documentation Examples</h3>
            <p className="text-sm text-muted-foreground">
              A technical writer creates API documentation with realistic JWT examples. They generate properly signed tokens
              that readers can decode to understand the claim structure.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using This Tool</h2>
        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <p className="text-muted-foreground">
            Important details about JWT generation and signing:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Supports HS256, HS384, HS512 (HMAC-SHA) algorithms for signing</li>
            <li>The &quot;none&quot; algorithm creates unsigned tokens - useful for testing only</li>
            <li>Standard claims like &quot;iat&quot; (issued at) are auto-populated with current timestamp</li>
            <li>Custom claims can be any string key with string values</li>
            <li>The &quot;sub&quot; claim typically holds the user ID or subject identifier</li>
            <li>Tokens are base64url-encoded and ready for Authorization: Bearer headers</li>
            <li>Generated tokens are valid until the &quot;exp&quot; claim time (if set)</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What claims should I include in a JWT?</h3>
            <p className="text-sm text-muted-foreground">
              Common claims: &quot;sub&quot; (subject/user ID), &quot;iat&quot; (issued at), &quot;exp&quot; (expiration).
              Optional: &quot;name&quot;, &quot;email&quot;, &quot;role&quot;, &quot;permissions&quot;. Avoid sensitive data like passwords.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">How do I set token expiration?</h3>
            <p className="text-sm text-muted-foreground">
              Add an &quot;exp&quot; claim with a Unix timestamp (seconds since 1970). For example, for 1-hour expiration,
              set exp to current time + 3600 seconds. The tool auto-fills &quot;iat&quot; but you must set &quot;exp&quot; manually.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What&apos;s the difference between HS256, HS384, and HS512?</h3>
            <p className="text-sm text-muted-foreground">
              They use different SHA hash lengths: 256, 384, and 512 bits respectively. HS256 is secure for most uses.
              HS384 and HS512 provide higher security margins but produce slightly larger signatures.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Can I create tokens that work with my production system?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, if you use the same secret key and algorithm as your production system. However, be careful -
              tokens created this way are valid credentials. Only do this in secure development environments.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What does the &quot;typ&quot; header field mean?</h3>
            <p className="text-sm text-muted-foreground">
              &quot;typ&quot; stands for &quot;type&quot; and is typically set to &quot;JWT&quot;. It identifies the token format.
              This is a standard header field along with &quot;alg&quot; (algorithm).
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Why would I use the &quot;none&quot; algorithm?</h3>
            <p className="text-sm text-muted-foreground">
              The &quot;none&quot; algorithm creates unsigned tokens - anyone can verify them without a secret.
              This is only for testing and development. Never use &quot;none&quot; in production as tokens can be forged.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">How do I add numeric or boolean claims?</h3>
            <p className="text-sm text-muted-foreground">
              This tool currently supports string values for custom claims. For numeric or boolean claims,
              you&apos;ll need to modify the token payload directly or use a more advanced JWT editor.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
