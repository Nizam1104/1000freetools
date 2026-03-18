export default function AesEncryptionSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This AES encryption tool uses the Advanced Encryption Standard with Galois/Counter Mode (GCM)
            to securely encrypt and decrypt your data directly in your browser.
          </p>
          <p className="text-muted-foreground">
            The encryption process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Key generation:</strong> Create a random hex key of 128, 192, or 256 bits, or enter your own.</li>
            <li><strong className="text-foreground">IV creation:</strong> A unique initialization vector (12 bytes) is generated for each encryption.</li>
            <li><strong className="text-foreground">AES-GCM encryption:</strong> Your data is encrypted using AES in GCM mode, which provides both confidentiality and authenticity.</li>
            <li><strong className="text-foreground">Output formatting:</strong> The IV and encrypted data are combined and output as a hex string.</li>
          </ol>
          <p className="text-muted-foreground">
            Decryption reverses this process: the IV is extracted from the encrypted data,
            then AES-GCM decrypts using your key. If the key is wrong or data is corrupted,
            decryption fails - ensuring data integrity.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Secure Password Storage",
              description: "Encrypt sensitive passwords before storing them in databases or configuration files."
            },
            {
              title: "Private Message Exchange",
              description: "Encrypt messages that you'll share through insecure channels - only recipients with the key can read them."
            },
            {
              title: "Configuration File Protection",
              description: "Encrypt API keys, tokens, and secrets in config files that might be exposed in version control."
            },
            {
              title: "Backup Encryption",
              description: "Encrypt sensitive data before backing it up to cloud storage or external drives."
            },
            {
              title: "Secure Data Transmission",
              description: "Pre-encrypt data before sending it over networks where additional security layers might be needed."
            },
            {
              title: "Learning Cryptography",
              description: "Understand how symmetric encryption works by experimenting with different keys and observing the output."
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
              caveat: "Key security is everything",
              explanation: "AES is symmetric - the same key encrypts and decrypts. Anyone with the key can read your data. Store keys separately from encrypted data."
            },
            {
              caveat: "256-bit is the strongest option",
              explanation: "While 128-bit AES is still considered secure, 256-bit provides maximum protection against future advances in computing power."
            },
            {
              caveat: "Each encryption produces different output",
              explanation: "Even with the same key and text, encryption generates a random IV each time. This is normal and actually improves security."
            },
            {
              caveat: "Encrypted data is larger than original",
              explanation: "The output includes the 12-byte IV plus authentication tags, making it about 24-32 bytes larger than the original text."
            },
            {
              caveat: "Lost key means lost data forever",
              explanation: "There's no backdoor or recovery. If you lose the encryption key, your data is permanently inaccessible. Back up your keys!"
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
              question: "Is AES-256 really unbreakable?",
              answer: "AES-256 has never been cracked through brute force. With 2^256 possible keys, even the world's fastest supercomputers would take billions of years to try all combinations."
            },
            {
              question: "What's the difference between AES-GCM and AES-CBC?",
              answer: "GCM (Galois/Counter Mode) provides both encryption and authentication - it detects tampering. CBC only encrypts. GCM is faster and more secure for most use cases."
            },
            {
              question: "Can I use the same key for multiple encryptions?",
              answer: "Yes, but each encryption uses a different random IV. Never reuse the same IV with the same key - that compromises security. This tool handles IV generation automatically."
            },
            {
              question: "Why is the encrypted output in hexadecimal?",
              answer: "Encrypted data is binary (raw bytes). Hex encoding makes it safe to copy, paste, and store as text. Each pair of hex characters represents one byte."
            },
            {
              question: "Is my data sent to a server?",
              answer: "No. All encryption happens in your browser using the Web Crypto API. Your data and keys never leave your device."
            },
            {
              question: "How long should my key be?",
              answer: "For 128-bit: 32 hex characters. For 192-bit: 48 hex characters. For 256-bit: 64 hex characters. Use the Generate button for cryptographically secure random keys."
            },
            {
              question: "Can I encrypt files with this tool?",
              answer: "This tool encrypts text. For files, you'd need to convert them to base64 first, then encrypt the resulting string. Consider dedicated file encryption tools for large files."
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
