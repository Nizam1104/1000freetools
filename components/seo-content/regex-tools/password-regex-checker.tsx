export default function PasswordRegexCheckerSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This password regex checker validates passwords against customizable regular 
            expression patterns, ensuring they meet specific security requirements.
          </p>
          <p className="text-muted-foreground">
            The checking process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Pattern definition:</strong> A regex pattern defines the password requirements (length, character types, etc.).</li>
            <li><strong className="text-foreground">Password testing:</strong> The input password is tested against the pattern.</li>
            <li><strong className="text-foreground">Match analysis:</strong> The tool reports whether the password matches and which requirements are met or failed.</li>
            <li><strong className="text-foreground">Feedback generation:</strong> Specific suggestions are provided for improving password strength.</li>
          </ol>
          <p className="text-muted-foreground">
            Regex-based password validation gives precise control over requirements, 
            enabling enforcement of complex password policies.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Password Policy Implementation",
              description: "Test and validate regex patterns for password requirements before deploying to production."
            },
            {
              title: "User Password Validation",
              description: "Help users understand why their password was rejected with specific requirement feedback."
            },
            {
              title: "Security Compliance",
              description: "Verify passwords meet regulatory requirements (NIST, PCI-DSS, HIPAA) through pattern matching."
            },
            {
              title: "Developer Testing",
              description: "Test password validation logic during development to ensure patterns work correctly."
            },
            {
              title: "Pattern Learning",
              description: "Understand how regex patterns enforce password requirements through experimentation."
            },
            {
              title: "Legacy System Integration",
              description: "Match password requirements when integrating with systems that have specific regex-based validation."
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
              caveat: "Regex validates format, not security",
              explanation: "A password can match a complex pattern but still be weak (like 'Password1!' which is commonly used). Regex doesn't check breach databases."
            },
            {
              caveat: "Lookahead assertions are key",
              explanation: "Use (?=.*[a-z]) style lookaheads to require multiple conditions without consuming characters. Essential for password patterns."
            },
            {
              caveat: "Length requirements need explicit patterns",
              explanation: ".{8,} enforces minimum length. Combine with other requirements for complete validation."
            },
            {
              caveat: "Special characters need careful escaping",
              explanation: "Character classes like [!@#$%^&*] need proper escaping. Test patterns thoroughly."
            },
            {
              caveat: "User experience matters",
              explanation: "Overly complex requirements frustrate users. Balance security with usability. Consider passphrases as an alternative."
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
              question: "What's a good password regex pattern?",
              answer: "Common pattern: ^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$ requires lowercase, uppercase, digit, symbol, and 8+ characters."
            },
            {
              question: "How do I require at least one number?",
              answer: "Use (?=.*\\d) as a lookahead. This asserts that somewhere in the password there's at least one digit."
            },
            {
              question: "How do I prevent common passwords?",
              answer: "Regex alone can't do this effectively. Use a blocklist of common passwords in addition to regex validation."
            },
            {
              question: "What's the maximum password length?",
              answer: "NIST recommends allowing at least 64 characters. Don't impose arbitrary maximums that prevent passphrases."
            },
            {
              question: "Should I require special characters?",
              answer: "NIST 800-63B no longer requires special characters. Length and uniqueness are more important. Consider allowing passphrases."
            },
            {
              question: "How do I test multiple requirements?",
              answer: "Chain lookahead assertions: ^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d). Each lookahead checks one requirement independently."
            },
            {
              question: "Why did my password fail validation?",
              answer: "Check each requirement individually. Common failures: too short, missing uppercase, no numbers, or no special characters."
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
