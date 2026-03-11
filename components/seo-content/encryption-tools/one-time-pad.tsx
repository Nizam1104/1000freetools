export default function OneTimePadSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            The one-time pad (OTP) is the only provably unbreakable encryption system when used
            correctly. It uses a random key as long as the message, combined with XOR operations.
            This tool demonstrates the theory behind perfect secrecy.
          </p>
          <p className="text-muted-foreground">
            The encryption process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Generate random pad:</strong> A truly random key is created, exactly as long as your message.</li>
            <li><strong className="text-foreground">Convert to binary:</strong> Both message and pad are converted to binary representation.</li>
            <li><strong className="text-foreground">XOR operation:</strong> Each bit of the message is XORed with the corresponding pad bit.</li>
            <li><strong className="text-foreground">Result is ciphertext:</strong> The output is completely random-looking without the pad.</li>
          </ol>
          <p className="text-muted-foreground">
            Decryption is identical: XOR the ciphertext with the same pad to recover the original
            message. Security relies on the pad being truly random, used only once, and kept secret.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Learning Cryptographic Theory",
              description: "Understand the concept of perfect secrecy and why OTP is theoretically unbreakable."
            },
            {
              title: "Teaching Information Security",
              description: "Demonstrate the gold standard of encryption to students studying cryptography."
            },
            {
              title: "Exploring Historical Ciphers",
              description: "Study how OTP was used in espionage (Cold War) and secure communications before modern crypto."
            },
            {
              title: "Understanding Key Distribution Problems",
              description: "Learn why OTP isn't practical despite perfect security - the key distribution challenge."
            },
            {
              title: "CTF and Puzzle Solving",
              description: "Solve cryptography challenges that use XOR-based encryption or OTP concepts."
            },
            {
              title: "Comparing Encryption Methods",
              description: "Appreciate why modern algorithms make trade-offs between theoretical security and practical usability."
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
              caveat: "OTP is impractical for most real-world use",
              explanation: "You need a random key as long as your message, used only once. For gigabytes of data, you need gigabytes of key material. Key distribution is the killer problem."
            },
            {
              caveat: "Randomness must be truly random",
              explanation: "Pseudo-random generators (like computer RNG) don't provide true randomness. Real OTP requires hardware random number generators or physical randomness."
            },
            {
              caveat: "Key reuse destroys security completely",
              explanation: "If the same pad encrypts two messages, attackers can XOR the ciphertexts to eliminate the key, revealing information about both messages."
            },
            {
              caveat: "This tool uses pseudo-random generation",
              explanation: "Browser crypto.getRandomValues() is cryptographically secure but not truly random. Real OTP needs physical randomness sources."
            },
            {
              caveat: "Key distribution is the fundamental challenge",
              explanation: "You need a secure channel to share the pad - but if you have that, why not just send the message? This is why OTP is rarely used practically."
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
              question: "Why is one-time pad considered unbreakable?",
              answer: "With a truly random key used once, every possible plaintext is equally likely for any ciphertext. Without the key, there's no way to determine which is correct - even with infinite computing power."
            },
            {
              question: "Was one-time pad actually used in real operations?",
              answer: "Yes! The Moscow-Washington hotline used OTP. Soviet spies used it (Venona project). It's still used for highest-security diplomatic communications where key distribution is feasible."
            },
            {
              question: "What happens if I reuse a one-time pad?",
              answer: "Catastrophic failure. If C1 = M1 XOR K and C2 = M2 XOR K, then C1 XOR C2 = M1 XOR M2. Attackers can use statistical analysis to recover both messages."
            },
            {
              question: "How do you securely distribute one-time pads?",
              answer: "Physical delivery by trusted courier is the traditional method. Modern approaches use quantum key distribution (QKD). The distribution channel must be as secure as the communication needs to be."
            },
            {
              question: "What's the difference between OTP and stream ciphers?",
              answer: "Stream ciphers generate a pseudo-random keystream from a short key. OTP uses truly random keys as long as the message. Stream ciphers are practical but not provably secure."
            },
            {
              question: "Can quantum computers break one-time pad?",
              answer: "No. OTP's security is information-theoretic, not computational. It doesn't rely on mathematical problems that quantum computers can solve. OTP remains secure even against quantum attacks."
            },
            {
              question: "Why don't we use OTP for everything if it's unbreakable?",
              answer: "Key distribution and key length requirements make it impractical. For every GB of data, you need 1 GB of key material, securely distributed and never reused. Modern crypto is 'good enough' and far more practical."
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
