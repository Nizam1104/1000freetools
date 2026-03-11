export default function RsaKeyGeneratorSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This RSA key generator creates public/private key pairs using the RSA algorithm.
            RSA is an asymmetric cryptosystem - one key encrypts, the other decrypts. The public
            key can be shared; the private key must remain secret.
          </p>
          <p className="text-muted-foreground">
            The key generation process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Generate prime numbers:</strong> Two large random prime numbers (p and q) are generated. For 2048-bit keys, each is ~1024 bits.</li>
            <li><strong className="text-foreground">Calculate modulus:</strong> n = p × q. This becomes part of both public and private keys.</li>
            <li><strong className="text-foreground">Compute totient:</strong> φ(n) = (p-1)(q-1). Used to generate the exponents.</li>
            <li><strong className="text-foreground">Generate exponents:</strong> Public exponent e (commonly 65537) and private exponent d are calculated so that e×d ≡ 1 (mod φ(n)).</li>
          </ol>
          <p className="text-muted-foreground">
            The public key is (n, e) and the private key is (n, d). Security relies on the
            difficulty of factoring n back into p and q - computationally infeasible for large keys.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Setting Up SSH Key Authentication",
              description: "Generate RSA keys for secure SSH login to servers without passwords."
            },
            {
              title: "Creating TLS/SSL Certificates",
              description: "Generate keys for web server certificates, code signing, or document signing."
            },
            {
              title: "Learning Public-Key Cryptography",
              description: "Understand asymmetric encryption by generating and experimenting with real key pairs."
            },
            {
              title: "Testing Encryption Implementations",
              description: "Create test keys for developing or debugging RSA encryption/decryption code."
            },
            {
              title: "Secure File Exchange Setup",
              description: "Generate keys for encrypting files that only specific recipients can decrypt."
            },
            {
              title: "API Authentication Configuration",
              description: "Create key pairs for services that use RSA for API request signing or authentication."
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
              caveat: "Key size determines security level",
              explanation: "1024-bit is deprecated (breakable). 2048-bit is minimum for current security. 3072-4096 bit recommended for long-term security. Larger keys are slower."
            },
            {
              caveat: "Private keys must be kept secret",
              explanation: "Anyone with your private key can decrypt messages and impersonate you. Store it securely, encrypted with a strong passphrase."
            },
            {
              caveat: "This tool runs in-browser but use caution",
              explanation: "While keys are generated locally (not sent to servers), for production use, generate keys on secure, offline systems using trusted tools."
            },
            {
              caveat: "PEM format is widely compatible",
              explanation: "PEM format (BEGIN RSA PRIVATE KEY markers) works with most tools. DER is binary. PKCS#12 (.p12) bundles keys with certificates."
            },
            {
              caveat: "RSA is being replaced by elliptic curves",
              explanation: "For new applications, consider ECDSA or Ed25519. They provide equivalent security with smaller keys and faster operations."
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
              question: "What key size should I use?",
              answer: "2048-bit minimum for current security. 3072-bit or 4096-bit for long-term security or sensitive applications. 1024-bit is deprecated and should not be used."
            },
            {
              question: "Can I use the same RSA key for encryption and signing?",
              answer: "Technically yes, but it's not recommended. Best practice uses separate keys: one for encryption, one for signing. This limits damage if one key is compromised."
            },
            {
              question: "How do I share my public key?",
              answer: "Public keys are meant to be shared! Upload to key servers, add to your website, include in email signatures, or send directly. Just verify the fingerprint to prevent impersonation."
            },
            {
              question: "What's the difference between RSA and ECC keys?",
              answer: "ECC (Elliptic Curve Cryptography) provides equivalent security with much smaller keys. A 256-bit ECC key ≈ 3072-bit RSA. ECC is faster and more efficient, especially on mobile."
            },
            {
              question: "Can quantum computers break RSA?",
              answer: "Yes. Shor's algorithm can factor large numbers efficiently on a sufficiently powerful quantum computer. Post-quantum cryptography is being standardized to address this."
            },
            {
              question: "How do I protect my private key?",
              answer: "Encrypt it with a strong passphrase. Store it on encrypted storage. Never share it. Consider hardware security modules (HSM) or smart cards for high-security applications."
            },
            {
              question: "What does PEM format look like?",
              answer: "PEM is Base64-encoded text between markers: -----BEGIN RSA PRIVATE KEY----- and -----END RSA PRIVATE KEY-----. Easy to copy/paste and works with most tools."
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
