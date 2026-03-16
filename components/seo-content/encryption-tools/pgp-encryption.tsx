export default function PgpEncryptionSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This PGP encryption tool demonstrates OpenPGP standard operations for secure
            messaging. PGP combines symmetric and asymmetric encryption to provide both
            security and efficiency for email and file protection.
          </p>
          <p className="text-muted-foreground">
            The encryption workflow:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Generate session key:</strong> A random symmetric key is created for this message only.</li>
            <li><strong className="text-foreground">Encrypt message:</strong> The actual message is encrypted with the session key using a fast algorithm like AES.</li>
            <li><strong className="text-foreground">Encrypt session key:</strong> The session key is encrypted with the recipient's public RSA/ECC key.</li>
            <li><strong className="text-foreground">Package together:</strong> The encrypted message and encrypted session key are combined into the final PGP message.</li>
          </ol>
          <p className="text-muted-foreground">
            This hybrid approach gives you the speed of symmetric encryption with the key
            distribution benefits of asymmetric encryption. Digital signatures work similarly
            but in reverse - signing with private key, verifying with public key.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Secure Email Communication",
              description: "Encrypt sensitive emails containing confidential information like financial data or personal records."
            },
            {
              title: "File Encryption for Sharing",
              description: "Protect files before sending them via email or cloud storage where you don't control the servers."
            },
            {
              title: "Software Distribution",
              description: "Sign software releases so users can verify authenticity and detect tampering."
            },
            {
              title: "Journalist-Source Communication",
              description: "Protect whistleblower communications and sensitive source information from interception."
            },
            {
              title: "Legal and Medical Data",
              description: "Encrypt privileged communications that require confidentiality under professional ethics rules."
            },
            {
              title: "Learning PGP Workflow",
              description: "Understand the complete PGP process before using command-line GPG or email plugins like Enigmail."
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
              caveat: "Key management is critical",
              explanation: "Lose your private key = lose access to all encrypted messages. Backup your keys securely. Use strong passphrases to protect private keys."
            },
            {
              caveat: "Verify key fingerprints before trusting",
              explanation: "Anyone can publish a key claiming to be someone else. Always verify fingerprints through a trusted channel before encrypting to someone."
            },
            {
              caveat: "PGP doesn't hide metadata",
              explanation: "Recipients, subject lines, and timestamps are visible. Only the message body is encrypted. Consider this for threat modeling."
            },
            {
              caveat: "Both parties need PGP setup",
              explanation: "PGP requires both sender and recipient to have keys and compatible software. This adoption barrier limits its practical use."
            },
            {
              caveat: "This tool is educational",
              explanation: "For real security, use established tools like GnuPG, GPG Suite, or email clients with built-in PGP support."
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
              answer: "PGP was the original commercial software. GPG (GNU Privacy Guard) is the free, open-source implementation of the OpenPGP standard. They're interoperable."
            },
            {
              question: "How do I get someone's public key?",
              answer: "They can email it, post it on their website, or upload it to a key server (keys.openpgp.org, keyserver.ubuntu.com). Always verify the fingerprint!"
            },
            {
              question: "What is ASCII armor?",
              answer: "ASCII armor encodes binary PGP data as text using Base64. Makes it safe to send via email or paste in text. Look for BEGIN PGP MESSAGE markers."
            },
            {
              question: "Can PGP-encrypted messages be cracked?",
              answer: "Not with current technology, if properly implemented with strong keys. The encryption itself is secure. Attacks target key management, not the crypto."
            },
            {
              question: "What's a digital signature and why use it?",
              answer: "A signature proves you sent a message and it wasn't modified. You sign with your private key; anyone can verify with your public key. Provides authenticity and integrity."
            },
            {
              question: "Should I use RSA or ECC keys?",
              answer: "ECC (Ed25519) is modern, faster, and uses smaller keys. RSA is more widely compatible. For new keys, ECC is recommended. 3072+ bit RSA is also fine."
            },
            {
              question: "How do I revoke a compromised key?",
              answer: "Generate a revocation certificate when you create your key. Store it safely. If your key is compromised, publish the revocation certificate to key servers."
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
