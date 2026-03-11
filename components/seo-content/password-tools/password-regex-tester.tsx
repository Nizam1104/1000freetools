export default function PasswordRegexTesterSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This tool tests passwords against regular expression (regex) patterns to verify 
            they meet specific format requirements - essential for validating password policies.
          </p>
          <p className="text-muted-foreground">
            The testing process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Pattern input:</strong> Enter a regex pattern that defines your password requirements, or select from common preset patterns.</li>
            <li><strong className="text-foreground">Password testing:</strong> Your password is tested against the pattern using JavaScript's RegExp engine.</li>
            <li><strong className="text-foreground">Match evaluation:</strong> The tool reports whether the password matches the pattern and highlights which parts matched.</li>
            <li><strong className="text-foreground">Pattern library:</strong> Pre-built patterns cover common requirements like minimum length, character types, and complexity rules.</li>
          </ol>
          <p className="text-muted-foreground">
            Regex patterns use special syntax to define rules: <code className="bg-muted px-1 rounded">(?=.*[a-z])</code> requires 
            lowercase, <code className="bg-muted px-1 rounded">.&#123;8,&#125;</code> requires 8+ characters, and <code className="bg-muted px-1 rounded">^...$</code> ensures 
            the entire password is checked.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Password Policy Development",
              description: "Test and refine regex patterns before implementing them in your application's password validation logic."
            },
            {
              title: "Developer Testing",
              description: "Verify that your password validation regex works correctly before deploying to production."
            },
            {
              title: "Security Compliance Verification",
              description: "Ensure passwords meet regulatory requirements (NIST, PCI-DSS) by testing against compliance patterns."
            },
            {
              title: "User Password Validation",
              description: "Help users understand why their password was rejected by showing exactly which requirements it fails."
            },
            {
              title: "Pattern Learning and Education",
              description: "Learn regex syntax by experimenting with different patterns and seeing how they match passwords."
            },
            {
              title: "Legacy System Integration",
              description: "Match password requirements when integrating with systems that have specific, documented password patterns."
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
              caveat: "Regex is powerful but can be complex",
              explanation: "Regular expressions have a learning curve. Start with the preset patterns and modify them gradually as you understand the syntax."
            },
            {
              caveat: "Different systems use different regex flavors",
              explanation: "JavaScript regex (used here) differs slightly from PCRE, Python, or .NET. Patterns may need adjustment when moving between platforms."
            },
            {
              caveat: "Lookahead assertions don't consume characters",
              explanation: "Patterns like (?=.*[A-Z]) check for conditions without advancing through the string. Multiple lookaheads can be combined to require multiple conditions."
            },
            {
              caveat: "Special characters need escaping",
              explanation: "Characters like . * + ? ^ $ ( ) [ ] &#123; &#125; | \\ have special meaning in regex. Use \\ to match them literally (e.g., \\$ to match a dollar sign)."
            },
            {
              caveat: "Testing doesn't guarantee security",
              explanation: "A password can match a complex regex pattern but still be weak (like &quot;Password1!&quot; which meets most requirements but is commonly used)."
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
              question: "What's the most common password regex pattern?",
              answer: "A typical strong password pattern is: ^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).&#123;8,&#125;$ - requiring lowercase, uppercase, digit, symbol, and minimum 8 characters."
            },
            {
              question: "How do I require at least one number?",
              answer: "Use (?=.*\\d) as a lookahead assertion. This checks that anywhere in the password there's at least one digit without consuming any characters."
            },
            {
              question: "Why use ^ and $ in password patterns?",
              answer: "^ matches the start and $ matches the end of the string. Without them, the pattern could match just part of the password. They ensure the entire password is validated."
            },
            {
              question: "How do I allow only specific special characters?",
              answer: "Use a character class with only allowed symbols: [!@#$%^&*] matches only those specific characters. Adjust the list based on your requirements."
            },
            {
              question: "Can I limit maximum password length with regex?",
              answer: "Yes, use &#123;8,20&#125; instead of &#123;8,&#125; to require between 8 and 20 characters. However, length limits are often better enforced outside regex."
            },
            {
              question: "What does the ?= syntax mean?",
              answer: "It&apos;s a positive lookahead assertion. (?=.*[A-Z]) means &quot;from this position, there must be zero or more characters followed by an uppercase letter somewhere ahead.&quot;"
            },
            {
              question: "How do I test multiple patterns at once?",
              answer: "Test each requirement separately with individual patterns, or combine them with lookahead assertions. Multiple small patterns are often easier to debug than one complex pattern."
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
