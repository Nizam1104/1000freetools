export default function PasswordHashGeneratorSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This password hash generator creates cryptographic hashes using various algorithms.
            Hashing transforms any input into a fixed-length string that's practically impossible
            to reverse - perfect for storing passwords securely.
          </p>
          <p className="text-muted-foreground">
            The hashing process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Input processing:</strong> Your password text is converted to bytes using UTF-8 encoding.</li>
            <li><strong className="text-foreground">Salt generation (for bcrypt/Argon2):</strong> A random salt is created to ensure identical passwords produce different hashes.</li>
            <li><strong className="text-foreground">Algorithm execution:</strong> The hash function processes the input through multiple rounds of mathematical operations.</li>
            <li><strong className="text-foreground">Output formatting:</strong> The result is encoded as hexadecimal or base64, often including the salt and algorithm parameters.</li>
          </ol>
          <p className="text-muted-foreground">
            Unlike encryption, hashing is one-way. You can verify a password by hashing it and
            comparing, but you can't recover the original password from the hash.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Setting Up User Databases",
              description: "Generate password hashes for initial user accounts or migration scripts when building authentication systems."
            },
            {
              title: "Testing Authentication Code",
              description: "Create known hash values to test your login verification logic without exposing real passwords."
            },
            {
              title: "Comparing Hash Algorithms",
              description: "See how different algorithms produce different outputs for the same input - useful for security decisions."
            },
            {
              title: "Verifying Hash Implementations",
              description: "Check that your code produces the same hashes as known test vectors to confirm correct implementation."
            },
            {
              title: "Security Auditing",
              description: "Generate hashes to test if stored passwords in a database match expected formats and algorithms."
            },
            {
              title: "Learning Cryptography",
              description: "Understand how hashing works, what salts do, and why some algorithms are better than others for passwords."
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
              caveat: "MD5 and SHA-1 are NOT secure for passwords",
              explanation: "These fast hash functions were designed for data integrity, not password storage. They can be brute-forced in seconds. Only use bcrypt, Argon2, or scrypt for passwords."
            },
            {
              caveat: "Salt is essential for password hashing",
              explanation: "Without salt, identical passwords produce identical hashes, enabling rainbow table attacks. Bcrypt and Argon2 include salt automatically."
            },
            {
              caveat: "Hash output includes more than just the hash",
              explanation: "Bcrypt output includes algorithm identifier, cost factor, salt, and hash. Don't try to parse it manually - use library functions for verification."
            },
            {
              caveat: "This tool runs client-side but don't hash real passwords",
              explanation: "While nothing leaves your browser, using real passwords in any online tool is bad practice. Use test passwords only."
            },
            {
              caveat: "Cost factors affect security and performance",
              explanation: "Higher bcrypt cost (like 12 vs 10) means more computation time, making brute force harder. Balance security with acceptable login delay (aim for ~250ms)."
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
              question: "Which algorithm should I use for password storage?",
              answer: "Use Argon2id if available (winner of the Password Hashing Competition). Otherwise bcrypt with cost 12 or higher. Never use MD5, SHA-1, or plain SHA-256 for passwords."
            },
            {
              question: "Why can't I just use SHA-256 for passwords?",
              answer: "SHA-256 is too fast - attackers can try billions of guesses per second. Password hashes like bcrypt are intentionally slow (designed to take ~250ms) to make brute force impractical."
            },
            {
              question: "What's the difference between hashing and encryption?",
              answer: "Hashing is one-way (can't recover original data). Encryption is two-way (can decrypt with the key). Passwords should be hashed, not encrypted."
            },
            {
              question: "How do I verify a password against a stored hash?",
              answer: "Hash the provided password with the same salt and parameters, then compare. Most libraries provide a verify() function that handles this automatically."
            },
            {
              question: "What does the bcrypt cost factor mean?",
              answer: "Cost is the exponent for iterations. Cost 10 = 2^10 iterations. Each +1 doubles the work. Cost 12 is current minimum recommendation; 14+ for high-security applications."
            },
            {
              question: "Can two different passwords produce the same hash?",
              answer: "Theoretically yes (collision), but for good hash functions it's astronomically unlikely. SHA-256 has 2^256 possible outputs - more than atoms in the observable universe."
            },
            {
              question: "Why do bcrypt hashes start with $2a$ or $2b$?",
              answer: "That's the algorithm identifier. $2a$ and $2b$ are bcrypt variants. The full format is $algorithm$cost$salt+hash. This lets verification functions know how to process the hash."
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
