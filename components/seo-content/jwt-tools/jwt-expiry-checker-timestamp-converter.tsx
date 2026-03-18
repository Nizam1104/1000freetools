import React from "react"

export default function JWTExpiryCheckerTimestampConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the JWT Expiry Checker Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste your JWT token and the tool extracts the <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">exp</code>, <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">nbf</code>, and <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">iat</code> claims from the payload. It decodes the base64url-encoded second segment and parses the JSON to find timestamp fields.
          </p>
          <p>
            The checker compares these Unix timestamps against the current time to determine if the token is expired, not yet valid, or actively valid. You get a human-readable countdown showing days, hours, and minutes until expiry (or since expiration).
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">What the timestamps mean:</p>
            <ul className="text-sm space-y-1.5 ml-4 list-disc">
              <li><strong className="text-foreground">exp (Expiration Time)</strong> - When the token becomes invalid</li>
              <li><strong className="text-foreground">nbf (Not Before)</strong> - When the token becomes valid</li>
              <li><strong className="text-foreground">iat (Issued At)</strong> - When the token was created</li>
            </ul>
          </div>
          <p>
            The timestamp converter lets you input any Unix timestamp (in seconds) and see the corresponding human-readable date and time in your local timezone.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging authentication failures</h3>
            <p className="text-sm text-muted-foreground">
              A user reports being logged out unexpectedly. You grab their JWT and check if the expiry time is too short or if server clock skew is causing premature expiration.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing token refresh logic</h3>
            <p className="text-sm text-muted-foreground">
              You're implementing automatic token refresh and need to verify your code triggers refresh at the right time. Check tokens with various expiry windows to test edge cases.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Security audit investigations</h3>
            <p className="text-sm text-muted-foreground">
              During a security review, you find JWTs with unusually long expiration times. The checker reveals tokens valid for months or years, flagging a potential vulnerability.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">API integration troubleshooting</h3>
            <p className="text-sm text-muted-foreground">
              Your API calls start failing with 401 errors. You extract the JWT from the Authorization header and discover it expired during a long-running batch process.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Converting log timestamps</h3>
            <p className="text-sm text-muted-foreground">
              Your logs show Unix timestamps from JWT claims. You paste them into the converter to understand when specific authentication events occurred in human-readable format.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Validating token from third-party service</h3>
            <p className="text-sm text-muted-foreground">
              A partner service sends you a JWT for API access. Before integrating it into your code, you verify the expiration window and ensure it won't expire mid-operation.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Client-side only decoding.</strong>
              The tool runs entirely in your browser using JavaScript's <code className="font-mono text-xs">atob()</code> function. Your token never leaves your machine, but this also means it can't verify the signature.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Timestamps are in seconds, not milliseconds.</strong>
              JWT uses Unix timestamps in seconds (e.g., 1735689600). JavaScript's <code className="font-mono text-xs">Date.now()</code> returns milliseconds. The converter handles this automatically.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Clock skew can cause issues.</strong>
              If your server's clock differs from the client's by even a minute, tokens may appear expired prematurely. Production systems should account for 1-2 minutes of skew.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">No signature verification.</strong>
              This tool only reads the payload. It doesn't check if the token was actually signed by your secret key. A tampered token will still decode successfully.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For production, set expiry times between 15 minutes and 24 hours. Short-lived tokens reduce attack surface; use refresh tokens for longer sessions.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does my token show as expired when it shouldn't be?</h3>
            <p className="text-sm text-muted-foreground">
              Check for timezone mismatches or clock skew. JWT timestamps are UTC. If your server generates tokens using local time instead of UTC, expiry calculations will be wrong.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I modify the expiry time of a JWT?</h3>
            <p className="text-sm text-muted-foreground">
              You can change the payload, but the signature will become invalid. Only the server with the signing key can create a new token with a different expiry.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's a reasonable JWT expiration time?</h3>
            <p className="text-sm text-muted-foreground">
              Access tokens: 15 minutes to 1 hour. Refresh tokens: 7 to 30 days. Shorter windows limit damage if a token is stolen, but require more frequent refreshes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I handle tokens that expire during a long operation?</h3>
            <p className="text-sm text-muted-foreground">
              Implement automatic token refresh before expiry. Check the <code className="font-mono text-xs">exp</code> claim before starting the operation and refresh if less than 5 minutes remain.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between exp and nbf?</h3>
            <p className="text-sm text-muted-foreground">
              <code className="font-mono text-xs">exp</code> marks when the token expires. <code className="font-mono text-xs">nbf</code> (not before) marks when it becomes valid. Both are optional claims that validators can enforce.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this to decode any JWT?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, as long as it's a valid three-part JWT. The tool doesn't validate signatures, so it works with tokens from any provider (Auth0, Firebase, custom backends, etc.).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is it safe to paste my production JWT here?</h3>
            <p className="text-sm text-muted-foreground">
              The tool runs client-side, so your token isn't sent anywhere. However, never paste tokens with sensitive data (PII, passwords) into any online tool. Use test tokens when possible.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
