export default function HmacGeneratorSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            HMAC (Hash-based Message Authentication Code) combines a cryptographic hash function
            with a secret key to verify both message integrity and authenticity. It's widely
            used in API authentication, webhooks, and secure data transmission.
          </p>
          <p className="text-muted-foreground">
            The HMAC generation process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Key preparation:</strong> The secret key is padded or hashed to match the hash function's block size.</li>
            <li><strong className="text-foreground">Inner hash:</strong> The key is XORed with inner padding (0x36), then concatenated with the message and hashed.</li>
            <li><strong className="text-foreground">Outer hash:</strong> The key is XORed with outer padding (0x5c), then concatenated with the inner hash result and hashed again.</li>
            <li><strong className="text-foreground">Final HMAC:</strong> The output is the authentication code that proves both integrity and authenticity.</li>
          </ol>
          <p className="text-muted-foreground">
            The recipient can verify by computing HMAC with their copy of the key and comparing.
            Matching HMACs prove the message wasn't modified and came from someone with the key.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "API Request Authentication",
              description: "Generate HMAC signatures for API requests to prove authenticity (used by AWS, GitHub, Stripe, etc.)."
            },
            {
              title: "Webhook Verification",
              description: "Verify that webhooks actually came from the expected service, not an attacker."
            },
            {
              title: "Testing HMAC Implementations",
              description: "Validate your code produces correct HMAC values by comparing with known test vectors."
            },
            {
              title: "JWT Token Signing",
              description: "Generate HMAC for JWT tokens using HS256, HS384, or HS512 algorithms."
            },
            {
              title: "Data Integrity Verification",
              description: "Ensure data hasn't been tampered with during transmission or storage."
            },
            {
              title: "Learning Cryptographic Authentication",
              description: "Understand how HMAC differs from plain hashing and why the key matters."
            },
          ].map((item, idx) => (
            <div key={idx} className="rounded-lg border bg-muted/30 p-4 space-y-2">
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">What to Know Before Using</h2>
        <div className="space-y-3">
          {[
            {
              caveat: "The secret key must stay secret",
              explanation: "Anyone with the key can forge valid HMACs. Never share it, commit it to version control, or include it in client-side code."
            },
            {
              caveat: "HMAC-SHA256 is the current standard",
              explanation: "HMAC-MD5 is deprecated. HMAC-SHA1 is still secure but SHA-256 is recommended for new applications. SHA-512 provides extra margin."
            },
            {
              caveat: "Timing attacks are a real concern",
              explanation: "When comparing HMACs, use constant-time comparison to prevent timing attacks that could leak information about valid signatures."
            },
            {
              caveat: "Key length matters",
              explanation: "Use keys at least as long as the hash output (256 bits for SHA-256). Shorter keys reduce security. Random bytes are best."
            },
            {
              caveat: "This tool is for testing, not production keys",
              explanation: "Don't enter real production secrets into any online tool. Use test keys only, even though processing happens client-side."
            },
          ].map((item, idx) => (
            <div key={idx} className="rounded-lg border bg-muted/30 p-4">
              <h3 className="font-semibold text-foreground mb-1">{item.caveat}</h3>
              <p className="text-sm text-muted-foreground">{item.explanation}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Common Questions</h2>
        <div className="space-y-6">
          {[
            {
              question: "What's the difference between HMAC and regular hash?",
              answer: "Regular hash (like SHA-256) only verifies integrity. HMAC includes a secret key, so it also verifies authenticity - proving the sender knows the key."
            },
            {
              question: "Why not just hash key + message?",
              answer: "Simple concatenation is vulnerable to length extension attacks. HMAC's specific construction (inner/outer padding) prevents these attacks."
            },
            {
              question: "How long should the HMAC key be?",
              answer: "At least 256 bits (32 bytes) for HMAC-SHA256. Use cryptographically random bytes. Longer keys don't hurt but don't add security beyond the hash output size."
            },
            {
              question: "Can HMAC be reversed to get the message?",
              answer: "No. HMAC uses cryptographic hash functions which are one-way. You can verify a message but can't recover it from the HMAC alone."
            },
            {
              question: "What APIs use HMAC authentication?",
              answer: "AWS Signature, GitHub webhooks, Stripe API, PayPal IPN, and many others. It's the standard for securing API communications without TLS client certificates."
            },
            {
              question: "How do I securely share the HMAC key?",
              answer: "Use secure channels: encrypted email, password managers with sharing, secure messaging apps, or in-person exchange. Never send via plain text."
            },
            {
              question: "What's the difference between HMAC and digital signatures?",
              answer: "HMAC uses symmetric keys (both parties have the same key). Digital signatures use asymmetric keys (sign with private, verify with public). Signatures provide non-repudiation."
            },
          ].map((item, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="font-semibold text-foreground">{item.question}</h3>
              <p className="text-muted-foreground">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
