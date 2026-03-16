export default function PasswordStrengthCheckerSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This password strength checker analyzes your password against
            multiple security criteria to give you a comprehensive assessment of
            its resilience against attacks.
          </p>
          <p className="text-muted-foreground">The analysis evaluates:</p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li>
              <strong className="text-foreground">Length scoring:</strong>{" "}
              Passwords under 8 characters are flagged as too short. Each
              additional character beyond 12 adds meaningful security.
            </li>
            <li>
              <strong className="text-foreground">Character diversity:</strong>{" "}
              Checks for lowercase, uppercase, numbers, and symbols. Using all
              four types significantly increases complexity.
            </li>
            <li>
              <strong className="text-foreground">Pattern detection:</strong>{" "}
              Identifies common passwords ("password123"), sequential characters
              ("abc123"), repeated characters ("aaa"), and keyboard walks
              ("qwerty").
            </li>
            <li>
              <strong className="text-foreground">Leet speak detection:</strong>{" "}
              Catches predictable substitutions like @ for 'a', 0 for 'o', or 1
              for 'i' that don't add real security.
            </li>
            <li>
              <strong className="text-foreground">Entropy calculation:</strong>{" "}
              Computes the mathematical randomness in bits, factoring in length
              and character set size.
            </li>
            <li>
              <strong className="text-foreground">
                Crack time estimation:
              </strong>{" "}
              Estimates how long brute-force attacks would take at modern GPU
              speeds (10 billion guesses/second).
            </li>
          </ol>
          <p className="text-muted-foreground">
            The result is a strength rating from "Very Weak" to "Very Strong"
            along with specific suggestions for improvement tailored to your
            password's weaknesses.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">
          When You'd Actually Use This
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Before Creating Important Accounts",
              description:
                "Test your password before using it for email, banking, or other critical services to ensure it's actually strong.",
            },
            {
              title: "After Data Breach Notifications",
              description:
                "When forced to change a password, use the checker to verify your new one is genuinely better than the compromised one.",
            },
            {
              title: "Corporate Password Policy Enforcement",
              description:
                "IT teams can use this to validate that employee passwords meet security requirements before account creation.",
            },
            {
              title: "Security Awareness Training",
              description:
                "Show employees why their 'clever' password modifications (P@ssw0rd!) aren't as secure as they think.",
            },
            {
              title: "Personal Security Audit",
              description:
                "Test all your frequently used passwords to identify which accounts need immediate password upgrades.",
            },
            {
              title: "Password Manager Migration",
              description:
                "When moving to a password manager, check which existing passwords are weak and prioritize changing those first.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="rounded-lg border bg-muted/30 p-4 space-y-2"
            >
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">
          What to Know Before Using
        </h2>
        <div className="space-y-3">
          {[
            {
              caveat: "This tool doesn't store your password",
              explanation:
                "All analysis happens in your browser. Your password is never sent to any server or stored anywhere. You can verify this by checking that the page works offline.",
            },
            {
              caveat: "Strength doesn't guarantee safety",
              explanation:
                "A 'Very Strong' password can still be compromised through phishing, keyloggers, data breaches, or reuse across sites. Strength is just one layer of security.",
            },
            {
              caveat: "Pattern detection has limits",
              explanation:
                "The checker catches common patterns but can't detect personal information (birthdays, pet names) that attackers might guess through social engineering.",
            },
            {
              caveat: "Don't test passwords you're actively using",
              explanation:
                "While this tool is safe, it's better practice to test variations or similar passwords rather than typing your actual live password into any web tool.",
            },
            {
              caveat: "Crack times are estimates",
              explanation:
                "Real-world cracking depends on the hash algorithm, available hardware, and whether your password is in a dictionary. Use times as relative comparisons, not absolute guarantees.",
            },
          ].map((item, idx) => (
            <div key={idx} className="rounded-lg border bg-muted/30 p-4">
              <h3 className="font-semibold text-foreground mb-1">
                {item.caveat}
              </h3>
              <p className="text-sm text-muted-foreground">
                {item.explanation}
              </p>
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
              question: "What makes a password 'Very Strong'?",
              answer:
                "A Very Strong password typically has 16+ characters, uses all four character types (lowercase, uppercase, numbers, symbols), contains no patterns or dictionary words, and scores 80+ bits of entropy.",
            },
            {
              question:
                "Is a long passphrase better than a short complex password?",
              answer:
                "Usually yes. 'correct horse battery staple' (25 characters, all lowercase) is stronger and more memorable than 'Tr0ub4dor&3' (11 characters). Length often beats complexity.",
            },
            {
              question: "Why does the checker flag my 'clever' substitutions?",
              answer:
                "Attackers know about leet speak (@ for a, 0 for o, etc.). These substitutions add almost no security because they're included in cracking dictionaries. Real randomness is better.",
            },
            {
              question: "How often should I check my password strength?",
              answer:
                "Check when creating new passwords or changing existing ones. There's no benefit to repeatedly testing the same password - focus on using unique, strong passwords everywhere.",
            },
            {
              question: "What's the minimum strength for important accounts?",
              answer:
                "For email, banking, and other critical accounts, aim for 'Strong' or 'Very Strong' ratings. 'Moderate' might suffice for low-risk accounts, but never use 'Weak' or 'Very Weak' passwords.",
            },
            {
              question: "Does adding symbols always make passwords stronger?",
              answer:
                "Symbols increase the character set size, which helps. But adding 4 random characters is often better than adding 4 symbols to a short password. Prioritize length first, then diversity.",
            },
            {
              question:
                "Can I use this to test my password manager's generated passwords?",
              answer:
                "Absolutely! It's a great way to verify your password manager is creating genuinely strong passwords. Most reputable managers will consistently produce 'Very Strong' results.",
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
  );
}
