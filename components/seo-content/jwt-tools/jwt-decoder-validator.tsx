import React from "react"

export default function JwtDecoderValidatorSEO() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How the JWT Decoder and Validator Works</h2>
        <div className="prose prose-sm dark:prose-invert">
          <p className="text-muted-foreground">
            This tool decodes JSON Web Tokens (JWTs) client-side, displaying the header and payload in readable JSON format.
            It also verifies the signature using your secret key or public key, helping you confirm token authenticity.
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <h3 className="text-lg font-semibold">Decoding Process</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Paste your JWT token (the three-part base64url-encoded string)</li>
            <li>The tool splits the token into header, payload, and signature segments</li>
            <li>Each segment is decoded from base64url to reveal the JSON content</li>
            <li>Header shows the algorithm (alg) and token type (typ)</li>
            <li>Payload displays claims like sub, exp, iat, and custom data</li>
            <li>Optionally verify the signature by providing the secret or public key</li>
          </ol>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Specific Use Cases</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Debugging Authentication Issues</h3>
            <p className="text-sm text-muted-foreground">
              A developer&apos;s login works but API calls fail with &quot;invalid token&quot;. They decode the JWT to check if the exp claim has passed
              or if the sub claim matches the expected user ID.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Security Audit of Token Contents</h3>
            <p className="text-sm text-muted-foreground">
              A security engineer reviews what sensitive data is stored in JWTs. They discover email addresses and roles are included
              and recommend removing unnecessary claims to reduce token size and exposure.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Verifying Third-Party Tokens</h3>
            <p className="text-sm text-muted-foreground">
              An integration engineer receives JWTs from an OAuth provider. They decode tokens to understand the claim structure
              and map them to their application&apos;s user model.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Testing Token Expiration Behavior</h3>
            <p className="text-sm text-muted-foreground">
              A QA engineer generates test tokens with different exp values to verify their application correctly handles
              expired tokens, tokens about to expire, and fresh tokens.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Algorithm Security Review</h3>
            <p className="text-sm text-muted-foreground">
              A security analyst checks if any tokens use the &quot;none&quot; algorithm (a known vulnerability) or weak algorithms.
              The tool highlights algorithm security levels with visual indicators.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using This Tool</h2>
        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <p className="text-muted-foreground">
            Important considerations when decoding and validating JWTs:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>All decoding happens client-side - tokens are never sent to any server</li>
            <li>Signature verification requires the exact secret key or matching public key</li>
            <li>HS256/HS384/HS512 use HMAC with a shared secret key</li>
            <li>RS256/ES256 use asymmetric keys - you need the public key to verify</li>
            <li>The &quot;none&quot; algorithm is insecure and should never be used in production</li>
            <li>Time claims (exp, iat, nbf) are Unix timestamps in seconds</li>
            <li>Expired tokens show a visual warning with &quot;(EXPIRED)&quot; indicator</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What are the three parts of a JWT?</h3>
            <p className="text-sm text-muted-foreground">
              A JWT consists of: Header (algorithm and token type), Payload (claims/data), and Signature (verification hash).
              They&apos;re separated by dots: header.payload.signature. Each part is base64url-encoded.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Why does signature verification fail?</h3>
            <p className="text-sm text-muted-foreground">
              Common causes: wrong secret key, token was modified after signing, using public key for HMAC verification,
              or the token uses a different algorithm than expected. Verify you&apos;re using the correct key for the algorithm.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What does &quot;alg: none&quot; mean?</h3>
            <p className="text-sm text-muted-foreground">
              The &quot;none&quot; algorithm means the token has no signature - anyone can create or modify it.
              This is a critical security vulnerability. Never accept tokens with alg:none in production systems.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">How do I read the exp and iat claims?</h3>
            <p className="text-sm text-muted-foreground">
              These are Unix timestamps (seconds since Jan 1, 1970). The tool converts them to readable dates.
              &quot;exp&quot; is expiration time - the token is invalid after this. &quot;iat&quot; is issued-at time.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Can I decode a JWT without the secret key?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, decoding the header and payload doesn&apos;t require the key - they&apos;re just base64-encoded, not encrypted.
              However, you need the key to verify the signature and confirm the token hasn&apos;t been tampered with.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Is it safe to paste my JWT into this tool?</h3>
            <p className="text-sm text-muted-foreground">
              The tool runs entirely in your browser - tokens never leave your device. However, avoid pasting production tokens
              with sensitive data. Use test tokens or tokens from development environments when possible.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What&apos;s the difference between HS256 and RS256?</h3>
            <p className="text-sm text-muted-foreground">
              HS256 uses HMAC with a shared secret - both signer and verifier have the same key.
              RS256 uses RSA - the signer has a private key, and anyone with the public key can verify.
              RS256 is better for distributed systems where you can&apos;t share secrets.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
