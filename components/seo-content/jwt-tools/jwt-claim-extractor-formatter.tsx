import React from "react"

export default function JWTClaimExtractorFormatterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Extracting Claims from JWT Payloads</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            The claim extractor parses a JWT and pulls out all claims from the payload segment. It separates standard registered claims (<code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">iss</code>, <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">sub</code>, <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">exp</code>, etc.) from custom claims your application adds.
          </p>
          <p>
            The tool decodes the Base64URL-encoded payload, parses the JSON, and displays each claim with its value. Timestamp claims (<code className="font-mono text-xs">exp</code>, <code className="font-mono text-xs">nbf</code>, <code className="font-mono text-xs">iat</code>) get formatted as human-readable dates alongside the raw Unix timestamp.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Standard claims extracted:</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between"><span className="font-mono">iss</span> <span>Issuer</span></div>
              <div className="flex justify-between"><span className="font-mono">sub</span> <span>Subject</span></div>
              <div className="flex justify-between"><span className="font-mono">aud</span> <span>Audience</span></div>
              <div className="flex justify-between"><span className="font-mono">exp</span> <span>Expiration</span></div>
              <div className="flex justify-between"><span className="font-mono">nbf</span> <span>Not Before</span></div>
              <div className="flex justify-between"><span className="font-mono">iat</span> <span>Issued At</span></div>
              <div className="flex justify-between"><span className="font-mono">jti</span> <span>JWT ID</span></div>
            </div>
          </div>
          <p>
            Custom claims appear below standard ones. Arrays and objects display as formatted JSON. You can copy individual claim values or export the entire payload as JSON.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging authentication issues</h3>
            <p className="text-sm text-muted-foreground">
              A user can't access a resource they should have permission for. Extract claims to verify their <code className="font-mono text-xs">roles</code> array includes the required role.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Auditing token contents</h3>
            <p className="text-sm text-muted-foreground">
              Security review requires documenting what data your tokens contain. Extract claims from production tokens (carefully!) to create an inventory.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Verifying expiry times</h3>
            <p className="text-sm text-muted-foreground">
              Tokens expire sooner than expected. Extract the <code className="font-mono text-xs">exp</code> claim to see the exact timestamp and convert it to your timezone.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Checking for sensitive data leakage</h3>
            <p className="text-sm text-muted-foreground">
              Concerned about PII in tokens? Extract all claims to audit whether passwords, emails, or other sensitive data accidentally made it into the payload.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building token-based logging</h3>
            <p className="text-sm text-muted-foreground">
              Adding user IDs to log entries? Extract the <code className="font-mono text-xs">sub</code> claim from incoming tokens to correlate logs with specific users.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing claim propagation</h3>
            <p className="text-sm text-muted-foreground">
              Your auth service adds custom claims. Extract them from generated tokens to verify claims like <code className="font-mono text-xs">tenant_id</code> or <code className="font-mono text-xs">permissions</code> appear correctly.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Extraction doesn't verify signatures.</strong>
              The tool reads the payload without checking if the token is valid. Anyone can create a fake token with any claims. Always verify signatures in production code.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Timestamps are Unix format (seconds since 1970).</strong>
              JWT uses Unix timestamps, not JavaScript milliseconds. The extractor shows both the raw timestamp and the converted date for clarity.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Array and object claims display as JSON.</strong>
              Complex claims like <code className="font-mono text-xs">{"roles: [\"admin\", \"user\"]"}</code> appear formatted. Copy the JSON directly for use in your code.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some claims may be missing.</strong>
              Only <code className="font-mono text-xs">sub</code> is required by the JWT spec. Your tokens might not have <code className="font-mono text-xs">iss</code>, <code className="font-mono text-xs">aud</code>, or other standard claims depending on your issuer.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Privacy warning:</strong> Never paste tokens containing real user data into online tools. Use test tokens or tokens from development environments only.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between iss and sub?</h3>
            <p className="text-sm text-muted-foreground">
              <code className="font-mono text-xs">iss</code> identifies the token issuer (e.g., "auth.example.com"). <code className="font-mono text-xs">sub</code> identifies the subject—usually the user ID. Same user logged into different apps would have the same <code className="font-mono text-xs">sub</code> but different <code className="font-mono text-xs">iss</code> values.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why is my exp claim showing a past date?</h3>
            <p className="text-sm text-muted-foreground">
              The token has expired. Extract the timestamp and compare it to the current time. Expired tokens should be rejected by your verification code and refreshed if needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I modify claims and re-sign the token?</h3>
            <p className="text-sm text-muted-foreground">
              This tool only extracts—it doesn't modify or re-sign. To change claims, you need access to the signing key and must create a new token through your auth system.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does the aud claim mean?</h3>
            <p className="text-sm text-muted-foreground">
              <code className="font-mono text-xs">aud</code> (audience) specifies which services should accept this token. Prevents token confusion attacks where a token meant for Service A is used with Service B.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I extract claims in my code?</h3>
            <p className="text-sm text-muted-foreground">
              Most JWT libraries provide claim access: Node.js (<code className="font-mono text-xs">jwt.decode(token)</code>), Python (<code className="font-mono text-xs">jwt.decode(token, options={"verify_signature": False})</code>). Always verify the signature first in production.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Are custom claims safe to use?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but keep them small. Every claim adds to token size. Avoid PII. Use namespaced names (e.g., <code className="font-mono text-xs">{"com.example.role"}</code>) to prevent conflicts with future standard claims.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
