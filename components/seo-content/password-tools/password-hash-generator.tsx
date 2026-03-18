export default function PasswordHashGeneratorSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This password hash generator creates cryptographic hash values from your
            input text using various algorithms like MD5, SHA-256, SHA-512, and bcrypt.
          </p>
          <p className="text-muted-foreground">
            The hashing process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Input processing:</strong> Your text is converted to bytes using UTF-8 encoding.</li>
            <li><strong className="text-foreground">Algorithm application:</strong> The selected hash function processes the input through multiple rounds of mathematical operations.</li>
            <li><strong className="text-foreground">Fixed-length output:</strong> Regardless of input size, the output is always the same length for each algorithm.</li>
            <li><strong className="text-foreground">Hex encoding:</strong> The binary hash result is displayed as hexadecimal characters for easy copying.</li>
          </ol>
          <p className="text-muted-foreground">
            Hash functions are one-way - you can't reverse a hash to get the original
            text. This makes them perfect for password storage and data integrity verification.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Database Password Storage",
              description: "Generate secure hashes for storing user passwords in databases without keeping plaintext."
            },
            {
              title: "File Integrity Verification",
              description: "Create checksums to verify files haven't been corrupted or tampered with during transfer."
            },
            {
              title: "API Authentication Tokens",
              description: "Generate hash-based tokens for API authentication and request signing."
            },
            {
              title: "Blockchain and Crypto",
              description: "Create hash values for blockchain transactions, wallet addresses, and proof-of-work calculations."
            },
            {
              title: "Digital Signatures",
              description: "Hash documents before signing to create compact, secure digital signatures."
            },
            {
              title: "Learning Cryptography",
              description: "Experiment with different algorithms to understand how hash functions work and their output differences."
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
              caveat: "MD5 and SHA-1 are broken",
              explanation: "These older algorithms have known collision vulnerabilities. Use SHA-256 or better for security applications."
            },
            {
              caveat: "Hashing isn't encryption",
              explanation: "Hashes can't be reversed. If you need to retrieve the original data, use encryption instead."
            },
            {
              caveat: "Always salt password hashes",
              explanation: "Add random data to passwords before hashing to prevent rainbow table attacks. bcrypt does this automatically."
            },
            {
              caveat: "bcrypt is for passwords",
              explanation: "Unlike SHA algorithms, bcrypt is intentionally slow, making it resistant to brute force attacks on passwords."
            },
            {
              caveat: "Same input = same hash",
              explanation: "Hash functions are deterministic. The same input always produces the same output for a given algorithm."
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
              question: "Which hash algorithm should I use?",
              answer: "For general purposes: SHA-256. For passwords: bcrypt or Argon2. Avoid MD5 and SHA-1 for any security-sensitive application."
            },
            {
              question: "Why are hash outputs different lengths?",
              answer: "Each algorithm produces a fixed output size. MD5 = 32 chars, SHA-1 = 40 chars, SHA-256 = 64 chars, SHA-512 = 128 chars."
            },
            {
              question: "Can two different inputs produce the same hash?",
              answer: "Theoretically yes (collision), but with SHA-256 it's so improbable it's considered impossible for practical purposes."
            },
            {
              question: "What's the difference between SHA-256 and bcrypt?",
              answer: "SHA-256 is fast (good for data integrity). bcrypt is slow (good for passwords - slows down attackers)."
            },
            {
              question: "How do I verify a password against a hash?",
              answer: "Hash the entered password with the same algorithm (and salt), then compare the hashes. If they match, the password is correct."
            },
            {
              question: "What's a rainbow table?",
              answer: "A precomputed table of hashes for common passwords. Salting prevents rainbow table attacks by making each hash unique."
            },
            {
              question: "Is it safe to hash passwords in the browser?",
              answer: "For transmission yes, but always hash again on the server. Browser hashing alone doesn't protect against database breaches."
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
