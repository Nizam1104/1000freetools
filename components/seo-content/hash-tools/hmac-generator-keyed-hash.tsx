import React from "react"

export default function HmacGeneratorKeyedHashSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How HMAC Generation Works</h2>

        <div className="space-y-3 text-muted-foreground">
          <p>
            HMAC (Hash-based Message Authentication Code) combines a cryptographic hash function
            with a secret key to produce a signature that proves both message integrity and
            authenticity. Unlike plain hashes, you need the key to generate—or verify—the HMAC.
          </p>

          <p>
            This tool uses the Web Crypto API to generate HMAC signatures. You provide a message
            and a secret key, choose an algorithm (SHA-256, SHA-384, or SHA-512), and it
            computes the HMAC using the standard HMAC construction defined in RFC 2104.
          </p>

          <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
            <p className="text-sm font-medium">The HMAC process:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Your secret key is imported into the Web Crypto API</li>
              <li>The message is encoded to UTF-8 bytes</li>
              <li>HMAC applies the hash function twice with the key mixed in specific ways</li>
              <li>The result is a signature that can only be created with the same key</li>
            </ol>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Key insight:</strong> Anyone can compute
              SHA-256("hello"), but only someone with the secret key can compute
              HMAC-SHA256("hello", key). This is what makes HMAC useful for authentication.
            </p>
          </div>
        </div>
      </section>

      {/* Specific Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">API request authentication</h3>
            <p className="text-sm text-muted-foreground">
              AWS, GitHub, and many other APIs use HMAC signatures to authenticate requests.
              Generate the HMAC of your request data with your API secret key, then include it
              in the Authorization header.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">JWT token signatures</h3>
            <p className="text-sm text-muted-foreground">
              JSON Web Tokens often use HS256 (HMAC-SHA256) for signing. Generate HMAC signatures
              to create or verify JWTs in your authentication system.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Webhook verification</h3>
            <p className="text-sm text-muted-foreground">
              Services like Stripe and GitHub send webhooks with HMAC signatures. Verify incoming
              webhooks by computing the HMAC of the payload and comparing it to the signature
              in the headers.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Secure session cookies</h3>
            <p className="text-sm text-muted-foreground">
              Sign session cookies with HMAC to prevent tampering. The server signs cookie data
              with a secret key; on subsequent requests, it verifies the signature before
              trusting the cookie contents.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Message integrity in distributed systems</h3>
            <p className="text-sm text-muted-foreground">
              Microservices communicating over message queues can use HMAC to ensure messages
              haven't been modified in transit. Each service shares a secret key for signing.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing cryptographic implementations</h3>
            <p className="text-sm text-muted-foreground">
              Building your own HMAC verification code? Generate known test vectors with this
              tool and compare against your implementation's output to verify correctness.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using HMAC</h2>

        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">The key must stay secret.</strong> Anyone with
              the key can forge valid HMACs. Store keys securely, rotate them periodically, and
              never commit them to version control.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Key length matters.</strong> Use keys at least
              as long as the hash output (256 bits for HMAC-SHA256). Shorter keys reduce security.
              Generate keys with a cryptographically secure random generator.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Algorithm choice affects output size.</strong>
              HMAC-SHA256 produces 64 hex characters, HMAC-SHA384 produces 96, and HMAC-SHA512
              produces 128. Match the algorithm to your security requirements and storage
              constraints.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Timing attacks are real.</strong> When verifying
              HMACs, use constant-time comparison to prevent attackers from learning the correct
              signature through response timing. Most crypto libraries handle this automatically.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">HMAC is not encryption.</strong> The message
              itself isn't hidden—HMAC just proves it came from someone with the key and hasn't
              been modified. Use encryption separately if you need confidentiality.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between HMAC and plain hash?</h3>
            <p className="text-sm text-muted-foreground">
              A plain hash (like SHA-256) only proves data integrity—anyone can compute it. HMAC
              requires a secret key, so it proves both integrity and authenticity. Only someone
              with the key could have generated the HMAC.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Which HMAC algorithm should I use?</h3>
            <p className="text-sm text-muted-foreground">
              HMAC-SHA256 is the standard choice—secure and widely supported. Use HMAC-SHA384 or
              HMAC-SHA512 if you need a larger security margin or are working in a
              high-security environment. Avoid HMAC-MD5 and HMAC-SHA1—they're deprecated.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I verify an HMAC?</h3>
            <p className="text-sm text-muted-foreground">
              Compute the HMAC of the received message using your secret key, then compare it to
              the provided signature. If they match exactly, the message is authentic and
              unmodified. Always use constant-time comparison to prevent timing attacks.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can HMAC be reversed to reveal the key?</h3>
            <p className="text-sm text-muted-foreground">
              No. HMAC is one-way like the underlying hash function. Even with many
              message-signature pairs, recovering the key is computationally infeasible with
              proper algorithms like SHA-256.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What happens if the key is compromised?</h3>
            <p className="text-sm text-muted-foreground">
              An attacker can forge valid HMACs for any message. Immediately rotate the key,
              invalidate all existing signatures, and investigate how the compromise occurred.
              This is why key management is critical.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is this tool safe for generating production HMACs?</h3>
            <p className="text-sm text-muted-foreground">
              The tool itself is secure—it uses the browser's Web Crypto API. However, don't
              paste production secrets into web tools. Use it for testing and learning, but
              generate production HMACs in your secure backend environment.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does HMAC use the key twice?</h3>
            <p className="text-sm text-muted-foreground">
              HMAC applies the key in two different ways (inner and outer padding) to prevent
              length extension attacks that affect plain hash functions. This construction,
              defined in RFC 2104, has been proven secure when the underlying hash is secure.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
