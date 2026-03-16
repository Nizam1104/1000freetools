export default function DiffieHellmanSimulatorSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This Diffie-Hellman simulator demonstrates how two parties can establish a shared secret
            over an insecure channel without ever transmitting the secret itself. It's the foundation
            of modern secure communications.
          </p>
          <p className="text-muted-foreground">
            The key exchange process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Agree on public parameters:</strong> Both parties use a large prime number (p) and a generator (g) - these can be public.</li>
            <li><strong className="text-foreground">Generate private keys:</strong> Each party secretly chooses a random private key (a and b).</li>
            <li><strong className="text-foreground">Calculate public keys:</strong> Each computes their public key: A = g^a mod p and B = g^b mod p.</li>
            <li><strong className="text-foreground">Exchange public keys:</strong> They swap public keys over the insecure channel.</li>
            <li><strong className="text-foreground">Derive shared secret:</strong> Each computes the shared secret: s = B^a mod p = A^b mod p.</li>
          </ol>
          <p className="text-muted-foreground">
            The magic: even though an eavesdropper sees p, g, A, and B, they cannot feasibly
            compute the shared secret without knowing either private key (the discrete logarithm problem).
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Learning Cryptography Concepts",
              description: "Understand how secure key exchange works without getting lost in complex math. Visual learning for students."
            },
            {
              title: "Teaching Network Security",
              description: "Demonstrate to students or colleagues how HTTPS establishes secure connections before encrypting data."
            },
            {
              title: "Protocol Design Review",
              description: "Verify your understanding of DH when reviewing or implementing secure communication protocols."
            },
            {
              title: "Security Audit Preparation",
              description: "Refresh your knowledge of key exchange mechanisms before auditing systems that use DH or ECDH."
            },
            {
              title: "Explaining to Non-Technical Stakeholders",
              description: "Show how two parties can share secrets without meeting beforehand - useful for business discussions."
            },
            {
              title: "Comparing Key Exchange Methods",
              description: "Understand DH fundamentals before learning variants like ECDH (elliptic curve) or authenticated DH."
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
              caveat: "Classic DH is vulnerable to man-in-the-middle attacks",
              explanation: "Without authentication, an attacker can intercept and impersonate both parties. Real implementations use signatures or certificates to authenticate."
            },
            {
              caveat: "Prime size matters for security",
              explanation: "Small primes (like under 1024 bits) can be broken with enough computing power. Modern systems use 2048+ bits or switch to elliptic curve DH."
            },
            {
              caveat: "The generator must be chosen carefully",
              explanation: "Not all generators work with all primes. Poor choices can create small subgroups that leak information about private keys."
            },
            {
              caveat: "This is educational, not for production",
              explanation: "Real implementations use carefully vetted libraries with proper random number generation, timing attack protections, and authenticated variants."
            },
            {
              caveat: "ECDH is more common in modern systems",
              explanation: "Elliptic Curve Diffie-Hellman provides equivalent security with much smaller key sizes, making it faster and more efficient for mobile and IoT."
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
              question: "Why can't an eavesdropper just compute the shared secret from the public values?",
              answer: "They'd need to solve the discrete logarithm problem: given g, p, and A = g^a mod p, find a. For large primes (2048+ bits), this is computationally infeasible with current technology."
            },
            {
              question: "What's the difference between DH and ECDH?",
              answer: "ECDH uses elliptic curve mathematics instead of modular exponentiation. It provides equivalent security with much smaller keys (256-bit EC vs 3072-bit DH), making it faster and more efficient."
            },
            {
              question: "Is Diffie-Hellman used in HTTPS?",
              answer: "Yes! TLS uses DH or ECDH for key exchange in many cipher suites. When you see 'ECDHE' in a cipher suite name, that's Elliptic Curve Diffie-Hellman Ephemeral providing forward secrecy."
            },
            {
              question: "What is forward secrecy and why does DH provide it?",
              answer: "Forward secrecy means past communications stay secure even if long-term keys are compromised later. Ephemeral DH generates new key pairs for each session, so compromising one session doesn't affect others."
            },
            {
              question: "Can quantum computers break Diffie-Hellman?",
              answer: "Yes. Shor's algorithm can solve the discrete logarithm problem efficiently on a sufficiently powerful quantum computer. Post-quantum cryptography is being developed to address this threat."
            },
            {
              question: "What are 'safe primes' and why do they matter?",
              answer: "A safe prime p is where (p-1)/2 is also prime. Using safe primes prevents certain attacks that exploit small subgroups. Modern DH implementations carefully select primes to avoid these vulnerabilities."
            },
            {
              question: "Why do both parties end up with the same shared secret?",
              answer: "Mathematically: Alice computes B^a = (g^b)^a = g^(ab) mod p. Bob computes A^b = (g^a)^b = g^(ab) mod p. They're the same because multiplication is commutative: ab = ba."
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
