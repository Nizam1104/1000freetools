export default function AesEncryptionToolSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            AES (Advanced Encryption Standard) is the most widely used symmetric encryption
            algorithm. This tool demonstrates AES encryption and decryption with various key
            sizes (128, 192, 256 bits) and operation modes (CBC, GCM).
          </p>
          <p className="text-muted-foreground">
            The encryption process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Key derivation:</strong> Your password is converted to a proper AES key using a key derivation function.</li>
            <li><strong className="text-foreground">IV generation:</strong> A random Initialization Vector ensures identical messages encrypt differently.</li>
            <li><strong className="text-foreground">Block processing:</strong> Data is processed in 128-bit blocks through multiple rounds of substitution, permutation, and mixing.</li>
            <li><strong className="text-foreground">Output:</strong> Ciphertext is combined with the IV (and authentication tag for GCM mode) for decryption.</li>
          </ol>
          <p className="text-muted-foreground">
            AES-256 with GCM mode provides both confidentiality and authenticity. The same
            key encrypts and decrypts, making key management critical for security.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Learning Symmetric Encryption",
              description: "Understand how AES works with different key sizes and modes through hands-on experimentation."
            },
            {
              title: "Testing Encryption Code",
              description: "Generate test vectors to verify your AES implementation produces correct output."
            },
            {
              title: "Secure Note Storage",
              description: "Encrypt sensitive notes before storing them in cloud services or shared locations."
            },
            {
              title: "File Encryption Preparation",
              description: "Understand AES concepts before implementing file encryption in your applications."
            },
            {
              title: "Comparing Encryption Modes",
              description: "See the difference between CBC, GCM, and other modes to choose the right one for your needs."
            },
            {
              title: "Security Education",
              description: "Demonstrate proper encryption practices including IVs, key sizes, and authenticated encryption."
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
              caveat: "Key management is everything",
              explanation: "AES is only as secure as your key. Use strong, random keys. Never reuse keys across different purposes. Store keys separately from encrypted data."
            },
            {
              caveat: "IV must be unique for each encryption",
              explanation: "Reusing an IV with the same key compromises security. IVs don't need to be secret but must be random and never repeated."
            },
            {
              caveat: "GCM mode is preferred over CBC",
              explanation: "GCM provides authenticated encryption (detects tampering). CBC only provides confidentiality. Always use GCM when available."
            },
            {
              caveat: "This tool is educational, not for production secrets",
              explanation: "Don't encrypt real sensitive data with keys generated or used in any online tool. Use established libraries for production."
            },
            {
              caveat: "AES-256 isn't always better than AES-128",
              explanation: "AES-128 is already unbreakable with current technology. AES-256 adds margin but also computational cost. Both are secure."
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
              question: "What's the difference between AES-128, AES-192, and AES-256?",
              answer: "Key size and number of rounds. AES-128 uses 10 rounds, AES-192 uses 12, AES-256 uses 14. All are currently secure; AES-128 has no known practical attacks."
            },
            {
              question: "What's the difference between CBC and GCM mode?",
              answer: "CBC provides confidentiality only. GCM provides confidentiality AND authenticity (detects tampering). GCM is faster and should be preferred for new applications."
            },
            {
              question: "Can AES be cracked?",
              answer: "Not with current technology. Breaking AES-128 would take billions of years with all computers on Earth. The algorithm itself is secure; implementations can have flaws."
            },
            {
              question: "What is an initialization vector (IV)?",
              answer: "A random value that ensures identical plaintexts encrypt to different ciphertexts. Prevents pattern analysis. Must be unique per encryption, stored/transmitted with ciphertext."
            },
            {
              question: "Is AES symmetric or asymmetric encryption?",
              answer: "Symmetric - same key encrypts and decrypts. This makes key distribution challenging but encryption/decryption much faster than asymmetric algorithms like RSA."
            },
            {
              question: "Where is AES used in real life?",
              answer: "Everywhere: HTTPS/TLS, WiFi (WPA2/WPA3), disk encryption (BitLocker, FileVault), messaging apps, password managers, VPNs. It's the global encryption standard."
            },
            {
              question: "Can quantum computers break AES?",
              answer: "Grover's algorithm gives quadratic speedup, effectively halving key strength. AES-128 becomes ~64-bit security. AES-256 remains secure (128-bit post-quantum security)."
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
