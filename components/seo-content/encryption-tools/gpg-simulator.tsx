export default function GpgSimulatorSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This GPG simulator demonstrates GNU Privacy Guard operations in a safe, interactive
            environment. GPG implements OpenPGP standards for encrypting, decrypting, signing,
            and verifying messages and files.
          </p>
          <p className="text-muted-foreground">
            The simulated workflow:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Key generation:</strong> Creates a public/private key pair. Public key encrypts; private key decrypts.</li>
            <li><strong className="text-foreground">Encryption:</strong> Uses recipient's public key to encrypt data. Only their private key can decrypt it.</li>
            <li><strong className="text-foreground">Signing:</strong> Uses your private key to create a digital signature. Proves you sent the message.</li>
            <li><strong className="text-foreground">Verification:</strong> Checks signatures against public keys to confirm authenticity and integrity.</li>
          </ol>
          <p className="text-muted-foreground">
            This educational tool shows what each GPG command does without requiring terminal
            access or risking mistakes with real cryptographic keys.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Learning GPG Before Real Use",
              description: "Practice GPG commands safely before working with actual sensitive data or production keys."
            },
            {
              title: "Teaching Cryptography Concepts",
              description: "Demonstrate public-key encryption, digital signatures, and key management to students or team members."
            },
            {
              title: "Understanding Email Encryption",
              description: "Learn how PGP/GPG secures email communications before setting up encrypted email with tools like Enigmail."
            },
            {
              title: "Preparing for Security Certifications",
              description: "Study GPG operations for certifications like Security+, CISSP, or CEH that cover encryption and digital signatures."
            },
            {
              title: "Troubleshooting GPG Issues",
              description: "Understand what each operation should do when debugging real GPG problems in your workflow."
            },
            {
              title: "Evaluating GPG for Your Workflow",
              description: "Explore GPG capabilities to decide if it fits your security needs before committing to implementation."
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
              caveat: "This is a simulator, not real GPG",
              explanation: "No actual cryptographic operations occur. Don't use this for real security - install GnuPG for production use."
            },
            {
              caveat: "Real GPG requires careful key management",
              explanation: "Private keys must be protected with strong passphrases and backed up securely. Lost private keys mean lost access to encrypted data."
            },
            {
              caveat: "Key servers and web of trust are complex",
              explanation: "Real GPG involves publishing keys, verifying fingerprints, and building trust networks. This simulator simplifies those concepts."
            },
            {
              caveat: "GPG has a steep learning curve",
              explanation: "Command-line GPG can be confusing. GUI tools like Kleopatra or GPG Suite make it more accessible for beginners."
            },
            {
              caveat: "Encryption and signing serve different purposes",
              explanation: "Encryption protects confidentiality (only recipient can read). Signing proves authenticity (you sent it) and integrity (unchanged)."
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
              question: "What's the difference between PGP and GPG?",
              answer: "PGP (Pretty Good Privacy) was the original software. GPG (GNU Privacy Guard) is the free, open-source implementation of the OpenPGP standard. They're compatible."
            },
            {
              question: "How do I get started with real GPG?",
              answer: "Install GnuPG (gpg command) or a GUI like Kleopatra. Generate a key pair with 'gpg --gen-key'. Share your public key; keep private key secret."
            },
            {
              question: "What's a passphrase and why do I need one?",
              answer: "A passphrase encrypts your private key on disk. Even if someone steals your key file, they can't use it without the passphrase. Use a strong, unique passphrase."
            },
            {
              question: "Can I encrypt a message to multiple recipients?",
              answer: "Yes! GPG can encrypt to multiple public keys. Each recipient can decrypt with their own private key. Useful for team communications."
            },
            {
              question: "What's ASCII armor?",
              answer: "ASCII armor encodes binary GPG data as text (like Base64). Makes keys and encrypted messages safe to email or paste in text files. Look for BEGIN/END PGP markers."
            },
            {
              question: "How do I verify someone's public key is genuine?",
              answer: "Compare fingerprints in person or through trusted channels. The fingerprint is a short hash of the key. Never trust keys from unverified sources."
            },
            {
              question: "What happens if I lose my private key?",
              answer: "You lose access to all messages encrypted to that key. Always backup your private key and revocation certificate in secure locations."
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
