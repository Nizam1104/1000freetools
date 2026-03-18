export default function PasswordManagerSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This browser-based password manager securely stores and manages your
            passwords locally with master password encryption and auto-fill capabilities.
          </p>
          <p className="text-muted-foreground">
            The secure management process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Master password setup:</strong> Create a strong master password that encrypts your entire vault.</li>
            <li><strong className="text-foreground">Local encryption:</strong> All passwords are encrypted with AES-256 before being stored in your browser.</li>
            <li><strong className="text-foreground">Secure storage:</strong> Encrypted data is saved in browser storage, accessible only with your master password.</li>
            <li><strong className="text-foreground">Auto-fill integration:</strong> Unlock your vault to automatically fill login forms on websites.</li>
          </ol>
          <p className="text-muted-foreground">
            Since everything happens locally in your browser, your passwords never
            leave your device or get uploaded to any cloud server.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Replacing Password Reuse",
              description: "Generate and store unique passwords for every account without the burden of remembering them all."
            },
            {
              title: "Privacy-Focused Users",
              description: "Manage passwords without trusting cloud services or third-party servers with your credentials."
            },
            {
              title: "Offline Access Needs",
              description: "Access your passwords even without internet connectivity, since everything is stored locally."
            },
            {
              title: "Security-Conscious Individuals",
              description: "Maintain full control over your encrypted password data with no external dependencies."
            },
            {
              title: "Temporary Password Management",
              description: "Use while evaluating password managers or as a secondary vault for specific purposes."
            },
            {
              title: "Learning Password Security",
              description: "Understand how password managers work before committing to a long-term solution."
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
              caveat: "Browser storage has risks",
              explanation: "Local storage can be cleared accidentally. Export backups regularly and store them securely."
            },
            {
              caveat: "Master password is critical",
              explanation: "If you forget your master password, there's no recovery. Your passwords are permanently inaccessible."
            },
            {
              caveat: "No cloud sync means no cross-device access",
              explanation: "Passwords are stored on one device. For multiple devices, consider a cloud-synced password manager."
            },
            {
              caveat: "Browser extensions offer better integration",
              explanation: "Dedicated password managers have browser extensions that auto-fill more reliably than manual copy-paste."
            },
            {
              caveat: "Device loss means password loss",
              explanation: "Without cloud backup, losing your device means losing access. Maintain encrypted backups."
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
              question: "Is a browser-based password manager safe?",
              answer: "Yes, with proper encryption. This tool uses AES-256 encryption locally. However, dedicated managers offer more features and backup options."
            },
            {
              question: "What makes a good master password?",
              answer: "A passphrase of 4+ random words (16+ characters) that you can remember but others can't guess. Never reuse it elsewhere."
            },
            {
              question: "How do I backup my passwords?",
              answer: "Use the export feature to create an encrypted backup file. Store it on a USB drive or secure cloud storage."
            },
            {
              question: "Can I use this on multiple devices?",
              answer: "Not directly - data is stored locally. You'd need to export/import between devices, which is cumbersome."
            },
            {
              question: "What's the advantage over cloud password managers?",
              answer: "Complete privacy - your passwords never leave your device. The trade-off is no automatic sync or cross-device access."
            },
            {
              question: "Should I switch from my current password manager?",
              answer: "Established managers (Bitwarden, 1Password) offer better features. This is good for learning or specific privacy needs."
            },
            {
              question: "How often should I backup?",
              answer: "After adding important passwords and monthly thereafter. Set a calendar reminder for regular backups."
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
