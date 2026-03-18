export default function PasswordPolicyGeneratorSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This password policy generator helps you create comprehensive security rules
            for your organization or personal use.
          </p>
          <p className="text-muted-foreground">
            The policy creation process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Length requirements:</strong> Set minimum and maximum password length based on your security needs.</li>
            <li><strong className="text-foreground">Complexity rules:</strong> Define character type requirements - uppercase, lowercase, numbers, and special symbols.</li>
            <li><strong className="text-foreground">Expiry settings:</strong> Configure password rotation intervals and advance notification periods.</li>
            <li><strong className="text-foreground">Lockout policies:</strong> Set failed attempt limits and account lockout durations.</li>
          </ol>
          <p className="text-muted-foreground">
            The generated policy provides clear, actionable rules that balance security
            with usability, making it easier for users to create and maintain strong passwords.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Corporate IT Security",
              description: "Create standardized password policies for employee accounts across your organization."
            },
            {
              title: "Compliance Requirements",
              description: "Generate policies that meet SOC 2, HIPAA, PCI-DSS, or other regulatory standards."
            },
            {
              title: "Application Development",
              description: "Define password validation rules for user registration and password reset features."
            },
            {
              title: "Security Audits",
              description: "Document and review existing password policies against industry best practices."
            },
            {
              title: "Employee Training",
              description: "Educate staff on password requirements and the reasoning behind security rules."
            },
            {
              title: "Personal Security Planning",
              description: "Create a structured approach to managing passwords across your personal accounts."
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
              caveat: "Longer isn't always better",
              explanation: "While 12+ characters is recommended, extremely long passwords (50+) can cause usability issues and may be truncated by some systems."
            },
            {
              caveat: "Complexity can backfire",
              explanation: "Overly complex requirements lead to predictable patterns (P@ssw0rd!). Consider passphrases as an alternative."
            },
            {
              caveat: "Rotation policies are evolving",
              explanation: "NIST now recommends against forced periodic changes unless there's evidence of compromise. Focus on breach detection instead."
            },
            {
              caveat: "Lockout thresholds need balance",
              explanation: "Too strict locks out legitimate users; too loose enables brute force. Consider progressive delays instead of hard lockouts."
            },
            {
              caveat: "Industry standards vary",
              explanation: "Financial services, healthcare, and government have specific requirements. Check your regulatory obligations."
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
              question: "What's the minimum secure password length?",
              answer: "12 characters is the modern minimum. 16+ is recommended for sensitive accounts. Length matters more than complexity."
            },
            {
              question: "Should I require special characters?",
              answer: "It helps, but don't make it the only requirement. A 16-character passphrase without symbols is stronger than 8 characters with symbols."
            },
            {
              question: "How often should passwords be changed?",
              answer: "Only when there's evidence of compromise. Forced rotation leads to weaker passwords (Password1, Password2, etc.)."
            },
            {
              question: "What about password managers?",
              answer: "Encourage them! Password managers enable unique, complex passwords for every account without the memory burden."
            },
            {
              question: "Is two-factor authentication enough?",
              answer: "2FA adds critical protection but shouldn't replace strong passwords. Use both for defense in depth."
            },
            {
              question: "What's a password blacklist?",
              answer: "A list of commonly used or breached passwords (like '123456' or 'password') that should be rejected during creation."
            },
            {
              question: "How do I enforce this policy?",
              answer: "Implement validation at registration/reset, educate users on the 'why', and consider password manager recommendations."
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
