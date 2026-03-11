export default function JwtDecoderSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            JWT (JSON Web Token) decoder parses and displays the contents of JSON Web Tokens.
            JWTs are compact, URL-safe tokens used for authentication and information exchange.
            This tool decodes the header and payload without verifying the signature.
          </p>
          <p className="text-muted-foreground">
            The decoding process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Split the token:</strong> JWT has three parts separated by dots: header.payload.signature</li>
            <li><strong className="text-foreground">Base64Url decode:</strong> Each part is Base64Url encoded. Decode header and payload to get JSON.</li>
            <li><strong className="text-foreground">Parse JSON:</strong> Convert the decoded strings to JSON objects to display claims and metadata.</li>
            <li><strong className="text-foreground">Validate structure:</strong> Check for required claims like exp (expiration), iat (issued at), and standard fields.</li>
          </ol>
          <p className="text-muted-foreground">
            This tool can also verify HMAC signatures if you have the secret key, or RSA
            signatures with a public key. But remember: decoding doesn't validate authenticity.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Debugging Authentication Issues",
              description: "Inspect JWT tokens from your application to see what claims are being sent and if they're correct."
            },
            {
              title: "API Development",
              description: "Verify that your authentication service is generating tokens with the expected claims and expiration."
            },
            {
              title: "Security Auditing",
              description: "Check JWT tokens for security issues like missing expiration, weak algorithms, or sensitive data exposure."
            },
            {
              title: "Learning JWT Structure",
              description: "Understand what information JWTs contain and how they're structured for authentication systems."
            },
            {
              title: "Troubleshooting Token Errors",
              description: "Decode error tokens to understand why authentication is failing - expired, wrong audience, etc."
            },
            {
              title: "Testing Token-Based Auth",
              description: "Generate and decode test tokens when developing or testing JWT-based authentication flows."
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
              caveat: "Decoding doesn't verify authenticity",
              explanation: "Anyone can decode a JWT. The contents are not secret - they're just encoded. Signature verification proves the token wasn't tampered with."
            },
            {
              caveat: "Never put sensitive data in JWT payload",
              explanation: "JWT payload is not encrypted, just encoded. Don't include passwords, credit cards, or other secrets. Only include what's needed for authorization."
            },
            {
              caveat: "Check the algorithm (alg) field",
              explanation: "The 'none' algorithm means no signature verification - a critical security flaw. Always verify your tokens use proper algorithms like RS256 or HS256."
            },
            {
              caveat: "Expiration times are critical",
              explanation: "Always check the 'exp' claim. Tokens without expiration are valid forever if compromised. Short-lived tokens with refresh are more secure."
            },
            {
              caveat: "Don't paste production tokens into online tools",
              explanation: "Even though decoding happens client-side, using real tokens in any web tool is risky. Use test tokens with fake data for debugging."
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
              question: "What's the difference between HS256 and RS256?",
              answer: "HS256 uses HMAC with a shared secret (symmetric). RS256 uses RSA signatures (asymmetric). RS256 is better for distributed systems where only the auth server has the private key."
            },
            {
              question: "What are standard JWT claims?",
              answer: "iss (issuer), sub (subject), aud (audience), exp (expiration), nbf (not before), iat (issued at), jti (JWT ID). These are registered claims defined in RFC 7519."
            },
            {
              question: "Can JWTs be encrypted?",
              answer: "Yes, that's JWE (JSON Web Encryption). Standard JWTs (JWS) are signed but not encrypted. JWE encrypts the payload for confidentiality, not just integrity."
            },
            {
              question: "Why are JWTs popular for APIs?",
              answer: "They're self-contained - the server doesn't need to look up session data. All user info is in the token. This enables stateless authentication at scale."
            },
            {
              question: "What's a good JWT expiration time?",
              answer: "Short-lived access tokens (15-60 minutes) with longer-lived refresh tokens. This limits damage if a token is compromised while maintaining good UX."
            },
            {
              question: "How do I verify a JWT signature?",
              answer: "Use your library's verify function with the appropriate key (secret for HS256, public key for RS256). Never trust decoded claims without verification."
            },
            {
              question: "Can I modify a JWT?",
              answer: "You can decode and modify the payload, but the signature will become invalid. Any tampering is detected when the signature is verified."
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
