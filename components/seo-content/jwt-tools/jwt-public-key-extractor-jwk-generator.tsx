import React from "react"

export default function JWTPublicKeyExtractorJWKGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Extracting Public Keys and Generating JWKs</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            The JWK generator creates JSON Web Key structures from JWT headers. When a token uses asymmetric algorithms (RS256, ES256), the header contains a <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">kid</code> (key ID) that references the public key needed for verification.
          </p>
          <p>
            The tool parses the JWT header to extract the algorithm (<code className="font-mono text-xs">alg</code>) and key ID (<code className="font-mono text-xs">kid</code>). It then generates a JWK template with the appropriate structure for RSA or EC keys.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">JWK structure by key type:</p>
            <div className="text-sm space-y-3">
              <div className="bg-background rounded p-3">
                <p className="font-mono text-xs mb-1"><strong>RSA (RS256/RS384/RS512):</strong></p>
                <code className="text-xs">{`{ kty: "RSA", use: "sig", alg: "RS256", kid: "...", n: "MODULUS", e: "AQAB" }`}</code>
              </div>
              <div className="bg-background rounded p-3">
                <p className="font-mono text-xs mb-1"><strong>EC (ES256/ES384):</strong></p>
                <code className="text-xs">{`{ kty: "EC", use: "sig", alg: "ES256", crv: "P-256", kid: "...", x: "...", y: "..." }`}</code>
              </div>
            </div>
          </div>
          <p>
            For complete verification, you need the actual key material (the <code className="font-mono text-xs">n</code> modulus for RSA, or <code className="font-mono text-xs">x</code>/<code className="font-mono text-xs">y</code> coordinates for EC). The generator creates the structure; you populate it with keys from your JWKS endpoint.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Real-World Use Cases</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Setting up JWT verification</h3>
            <p className="text-sm text-muted-foreground">
              Your backend needs to verify tokens from Auth0. You extract the <code className="font-mono text-xs">kid</code> from incoming tokens and generate matching JWKs to configure your verification library.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating a JWKS endpoint</h3>
            <p className="text-sm text-muted-foreground">
              You're building an auth server that issues JWTs. The generator helps you structure the public keys for your <code className="font-mono text-xs">/.well-known/jwks.json</code> endpoint.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging signature verification failures</h3>
            <p className="text-sm text-muted-foreground">
              Token verification fails with "key not found". You generate a JWK from the token header to confirm the <code className="font-mono text-xs">kid</code> matches what your JWKS endpoint returns.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Migrating between key providers</h3>
            <p className="text-sm text-muted-foreground">
              Switching from Auth0 to AWS Cognito? Generate JWKs for both providers' tokens to compare key structures and ensure your verification code handles both formats.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Documenting key requirements</h3>
            <p className="text-sm text-muted-foreground">
              Your API docs need to explain what key types you support. Generate example JWKs for RSA and EC keys to show developers the expected format.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing key rotation scenarios</h3>
            <p className="text-sm text-muted-foreground">
              Simulate key rotation by generating JWKs with different <code className="font-mono text-xs">kid</code> values. Test that your verification logic correctly selects the matching key.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">This generates templates, not actual keys.</strong>
              The tool creates the JWK structure with placeholder values. You must replace <code className="font-mono text-xs">MODULUS_PLACEHOLDER</code> with the actual RSA modulus from your key pair.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Symmetric keys (HS256) don't use JWKs.</strong>
              If your JWT uses HS256, there's no public/private key pair. Both parties share a secret. JWKs only apply to asymmetric algorithms (RS256, ES256, etc.).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Key material must come from a trusted source.</strong>
              Never extract keys from untrusted tokens. Always fetch JWKs from a verified JWKS endpoint (HTTPS with certificate validation).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">JWKS contains multiple keys.</strong>
              Production JWKS endpoints return multiple keys for rotation. The generator can create JWKS structures with primary and backup keys.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Security critical:</strong> Never share private keys. JWKs for public verification only contain public key material. Private keys (used for signing) must remain secret.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between JWK and JWKS?</h3>
            <p className="text-sm text-muted-foreground">
              A JWK (JSON Web Key) is a single key. A JWKS (JSON Web Key Set) is a collection of JWKs in a <code className="font-mono text-xs">{"{ keys: [...] }"}</code> structure. JWKS endpoints return sets to support key rotation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Where do I get the actual key values?</h3>
            <p className="text-sm text-muted-foreground">
              For third-party providers (Auth0, Firebase), fetch from their JWKS endpoint (e.g., <code className="font-mono text-xs">https://auth0.com/.well-known/jwks.json</code>). For your own keys, extract from your key management system.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does the "use" field mean?</h3>
            <p className="text-sm text-muted-foreground">
              <code className="font-mono text-xs">use: "sig"</code> means the key is for signature verification. <code className="font-mono text-xs">use: "enc"</code> would indicate encryption keys. Most JWT implementations use signature keys.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How often should keys be rotated?</h3>
            <p className="text-sm text-muted-foreground">
              Industry practice: every 30-90 days for high-security systems. Rotation requires publishing new JWKs while keeping old keys available to verify existing tokens until they expire.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this for HS256 tokens?</h3>
            <p className="text-sm text-muted-foreground">
              HS256 uses symmetric keys (shared secrets), not key pairs. There's no JWK structure for HS256—just configure your verification library with the shared secret string.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the "kid" used for?</h3>
            <p className="text-sm text-muted-foreground">
              The key ID tells verifiers which key in the JWKS to use. Without it, verifiers would need to try every key. Include <code className="font-mono text-xs">kid</code> in headers when you have multiple active keys.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
