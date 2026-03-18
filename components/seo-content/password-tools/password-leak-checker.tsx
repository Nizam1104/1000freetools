export default function PasswordLeakCheckerSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This password leak checker securely verifies if your password has appeared
            in known data breaches using the k-anonymity privacy model.
          </p>
          <p className="text-muted-foreground">
            The privacy-safe checking process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">SHA-1 hashing:</strong> Your password is converted to a SHA-1 hash locally in your browser.</li>
            <li><strong className="text-foreground">Prefix extraction:</strong> Only the first 5 characters of the hash are sent to the API.</li>
            <li><strong className="text-foreground">Range query:</strong> The API returns all breached hashes starting with those 5 characters (hundreds of results).</li>
            <li><strong className="text-foreground">Local matching:</strong> Your browser checks if your full hash appears in the returned list.</li>
          </ol>
          <p className="text-muted-foreground">
            This means your actual password never leaves your device, and the API
            can't determine which specific hash you're checking among the hundreds returned.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "After Breach Notifications",
              description: "Verify if your password was exposed when a service you use reports a data breach."
            },
            {
              title: "New Account Setup",
              description: "Check if a password you're considering has already been compromised before using it."
            },
            {
              title: "Regular Security Audits",
              description: "Periodically test your important passwords to ensure they haven't appeared in new breaches."
            },
            {
              title: "Password Manager Migration",
              description: "Audit existing passwords before importing them into a new password manager."
            },
            {
              title: "Corporate Security Reviews",
              description: "Check if employee passwords (hashed) have appeared in breaches without storing them."
            },
            {
              title: "Peace of Mind",
              description: "Quickly verify the security status of passwords you use frequently."
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
              caveat: "Finding your password means change it immediately",
              explanation: "If your password appears in a breach, it's in the hands of attackers. Change it on all accounts where you used it."
            },
            {
              caveat: "No match doesn't guarantee safety",
              explanation: "The breach database isn't comprehensive. A clean result means it's not in known breaches, not that it's strong."
            },
            {
              caveat: "Your password isn't stored or transmitted",
              explanation: "The k-anonymity model ensures your password never leaves your browser. Only a 5-character hash prefix is shared."
            },
            {
              caveat: "Reuse multiplies the risk",
              explanation: "If a reused password appears in any breach, all accounts using that password are compromised."
            },
            {
              caveat: "Check email addresses too",
              explanation: "Use 'Have I Been Pwned' to check if your email appears in breaches, even if passwords weren't exposed."
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
              question: "Is it safe to check my password?",
              answer: "Yes. The k-anonymity model means your full password hash is never sent. Only the first 5 characters of the hash leave your browser."
            },
            {
              question: "What should I do if my password is found?",
              answer: "Change it immediately on every account where you used it. Enable two-factor authentication and use a password manager."
            },
            {
              question: "How often are breach databases updated?",
              answer: "Major services update within days of new breaches being discovered. Check periodically, especially after news of large breaches."
            },
            {
              question: "Why SHA-1 if it's considered broken?",
              answer: "For this use case (checking against a list), SHA-1 is still secure. The k-anonymity model adds additional protection."
            },
            {
              question: "Can the API see which password I'm checking?",
              answer: "No. They see hundreds of hash queries for each request and can't determine which one is yours."
            },
            {
              question: "What's the difference between this and 'Have I Been Pwned'?",
              answer: "HIBP checks if your email appears in breaches. This checks if your specific password hash is in the breached password database."
            },
            {
              question: "Should I check all my passwords?",
              answer: "Prioritize passwords on critical accounts (email, banking, primary services). Then check others as you update them."
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
