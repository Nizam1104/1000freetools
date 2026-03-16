export default function PasswordGeneratorSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This password generator creates cryptographically random passwords using your browser's 
            built-in secure random number generator - the same technology that secures HTTPS connections.
          </p>
          <p className="text-muted-foreground">
            Here's the generation process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Build character pool:</strong> Based on your selections, it combines character sets - lowercase (26 chars), uppercase (26), numbers (10), and symbols (32).</li>
            <li><strong className="text-foreground">Ensure coverage:</strong> The generator guarantees at least one character from each selected type, preventing passwords that accidentally lack diversity.</li>
            <li><strong className="text-foreground">Fill randomly:</strong> Using crypto.getRandomValues(), it selects random characters from the pool until reaching your desired length.</li>
            <li><strong className="text-foreground">Shuffle thoroughly:</strong> The final password is shuffled to ensure the guaranteed characters aren't predictable (like always having a number at the end).</li>
          </ol>
          <p className="text-muted-foreground">
            Unlike many online generators, this tool runs entirely in your browser. 
            Generated passwords never leave your device - they're not sent to any server or stored anywhere.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Setting Up New Accounts",
              description: "Generate a unique, strong password for every new signup. Never reuse passwords across sites."
            },
            {
              title: "Replacing Compromised Passwords",
              description: "After a data breach notification, quickly generate a replacement password that's completely unrelated to the old one."
            },
            {
              title: "Populating Password Managers",
              description: "Bulk-generate strong passwords when migrating to a password manager or doing a security overhaul of all your accounts."
            },
            {
              title: "Creating Service Accounts",
              description: "Generate passwords for API keys, database connections, and other machine-to-machine authentication that humans won't type."
            },
            {
              title: "Temporary Access Credentials",
              description: "Create one-time passwords for contractors, temporary employees, or shared access that can be changed later."
            },
            {
              title: "Security Policy Compliance",
              description: "Meet organizational requirements for minimum length and character complexity without thinking about it."
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
              caveat: "You must save the generated password",
              explanation: "Once you navigate away or refresh, the password is gone forever. Always copy it to a password manager or secure storage immediately. There's no 'recover password' feature."
            },
            {
              caveat: "Longer isn't always better for usability",
              explanation: "A 64-character password is incredibly secure but painful to paste on devices without clipboard access. For most uses, 16-20 characters provides excellent security with reasonable usability."
            },
            {
              caveat: "Some sites have weird password limits",
              explanation: "Surprisingly, some services still limit passwords to 16 characters or ban certain symbols. You might need to regenerate if your password gets rejected."
            },
            {
              caveat: "Exclude ambiguous characters for manual entry",
              explanation: "If you'll ever need to type the password (not just paste), enable 'exclude ambiguous' to avoid confusing characters like I/l/1 and O/0."
            },
            {
              caveat: "Symbols can cause issues in some contexts",
              explanation: "Passwords with special characters sometimes break in command-line tools, URLs, or legacy systems. Consider your use case before including all symbol types."
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
              question: "How long should my generated password be?",
              answer: "For most accounts, 16 characters provides excellent security. For high-value targets (email, banking, password manager), use 20-24 characters. For service accounts that never get typed, 32+ characters is reasonable."
            },
            {
              question: "Should I include all character types?",
              answer: "Yes for maximum security, but there's a tradeoff. A 20-character lowercase-only password (about 94 bits) is stronger than a 12-character mixed password (about 78 bits) and easier to type. Prioritize length first."
            },
            {
              question: "Is it safe to use an online password generator?",
              answer: "This generator runs entirely in your browser using secure random number generation - no data leaves your device. Be cautious of generators that might log or transmit your passwords."
            },
            {
              question: "Can I use these passwords for WiFi networks?",
              answer: "Yes, but consider excluding ambiguous characters since you'll likely need to type them on multiple devices. A 20-character password without I/l/1/O/0 is still extremely secure."
            },
            {
              question: "What if the generator creates a password I can't pronounce?",
              answer: "That's actually ideal for security! Unpronounceable passwords are less likely to be modified or remembered (which tempts reuse). Save it in a password manager and never try to memorize it."
            },
            {
              question: "How often should I regenerate passwords?",
              answer: "Only when necessary: after a breach, if you suspect compromise, or when setting up new accounts. Modern security guidance discourages routine rotation of strong, unique passwords."
            },
            {
              question: "Can I generate multiple passwords at once?",
              answer: "Yes! The 'Generate 5' button creates multiple options. This is useful when you need several passwords (like setting up multiple accounts) or want to pick one that works with a site's specific requirements."
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
