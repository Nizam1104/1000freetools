import React from "react"

export default function JWTAlgorithmConverterSwitcherSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Converting JWT Algorithms Explained</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            The algorithm converter takes an existing JWT and changes the <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">alg</code> field in the header from one algorithm to another (e.g., HS256 to RS256). It re-encodes the header with the new algorithm and regenerates the signature using the appropriate method.
          </p>
          <p>
            For HMAC algorithms (HS256, HS384, HS512), the tool uses the provided secret key to create a new signature. For asymmetric algorithms (RS256, ES256), it marks where a private key would be required—actual signing needs cryptographic libraries that handle RSA or EC keys.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Algorithm families:</p>
            <ul className="text-sm space-y-1.5 ml-4 list-disc">
              <li><strong className="text-foreground">HS256/384/512</strong> - HMAC with SHA-256/384/512. Symmetric (shared secret). Fast, simple.</li>
              <li><strong className="text-foreground">RS256/384/512</strong> - RSA with SHA-256/384/512. Asymmetric (public/private key pair). Better for distributed verification.</li>
              <li><strong className="text-foreground">ES256/384/512</strong> - ECDSA with P-256/P-384/P-521 curves. Asymmetric. Smaller signatures than RSA.</li>
              <li><strong className="text-foreground">none</strong> - No signature. Only for testing. Never use in production.</li>
            </ul>
          </div>
          <p>
            The converter preserves the payload exactly—only the header and signature change. This lets you test how different algorithms affect token size and compatibility.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Migrating from symmetric to asymmetric keys</h3>
            <p className="text-sm text-muted-foreground">
              Your app uses HS256 but you need to distribute verification to multiple services. Convert to RS256 to see what the new token structure looks like before implementing key management.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing algorithm compatibility</h3>
            <p className="text-sm text-muted-foreground">
              Your API gateway supports multiple algorithms. Generate tokens with HS256, RS256, and ES256 to verify your verification code handles all three correctly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Understanding algorithm impact on token size</h3>
            <p className="text-sm text-muted-foreground">
              RS256 signatures are 256 bytes; HS256 is 32 bytes. Convert the same payload with different algorithms to see how signature size affects your HTTP header budget.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Security training demonstrations</h3>
            <p className="text-sm text-muted-foreground">
              Show developers why the <code className="font-mono text-xs">alg: none</code> attack works. Convert a signed token to "none" to demonstrate why servers must validate the algorithm.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging algorithm mismatch errors</h3>
            <p className="text-sm text-muted-foreground">
              Your verifier expects RS256 but receives HS256 tokens. Convert to see the exact header difference and understand why verification fails.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing for compliance requirements</h3>
            <p className="text-sm text-muted-foreground">
              Your security audit requires SHA-512 instead of SHA-256. Convert from HS256 to HS512 to test compatibility before updating production systems.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Converted tokens aren't cryptographically valid.</strong>
              The tool simulates signatures but doesn't perform real cryptographic operations. Use converted tokens for testing structure only, not actual authentication.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Algorithm conversion requires new keys.</strong>
              Switching from HS256 to RS256 isn't just a header change—you need an RSA key pair. The converter shows the format but can't generate valid signatures without proper keys.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">The "none" algorithm is dangerous.</strong>
              Some vulnerable JWT libraries accept <code className="font-mono text-xs">alg: none</code> tokens as unsigned. Never allow this in production—it bypasses all security.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Payload stays identical.</strong>
              Algorithm conversion only changes the header and signature. The payload claims (exp, sub, etc.) remain unchanged. You're not modifying token content.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Critical security note:</strong> Never accept algorithm changes from untrusted sources. Always configure your verifier to expect specific algorithms. The "algorithm confusion" attack exploits servers that accept whatever algorithm the token claims.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why would I convert from HS256 to RS256?</h3>
            <p className="text-sm text-muted-foreground">
              HS256 requires sharing a secret with every service that verifies tokens. RS256 uses a private key for signing and public keys for verification—you can distribute public keys freely without compromising security.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does algorithm conversion affect token expiry?</h3>
            <p className="text-sm text-muted-foreground">
              No. The <code className="font-mono text-xs">exp</code> claim is in the payload, which doesn't change during conversion. A token expiring in 1 hour before conversion still expires in 1 hour after.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Which algorithm should I use?</h3>
            <p className="text-sm text-muted-foreground">
              Single service? HS256 is fine. Multiple verifiers or microservices? RS256 or ES256. Need smallest tokens? ES256 has shorter signatures than RS256. Avoid "none" entirely.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert back to the original algorithm?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, conversion is reversible in theory. However, each conversion creates a new signature—you need the appropriate key for the target algorithm each time.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How does algorithm choice affect performance?</h3>
            <p className="text-sm text-muted-foreground">
              HS256 is fastest (simple HMAC). RS256 is slower (RSA operations). ES256 is in between. For most apps, verification time is negligible compared to network latency.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What happens if my verifier doesn't support the new algorithm?</h3>
            <p className="text-sm text-muted-foreground">
              Verification fails with "unsupported algorithm" or similar error. Always check your JWT library's supported algorithms before converting production tokens.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
