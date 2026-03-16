export default function PasswordTimeToCrackEstimatorSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This tool estimates how long it would take an attacker to crack your password through 
            brute force - trying every possible combination until they find the right one.
          </p>
          <p className="text-muted-foreground">
            The calculation works in three steps:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Calculate combinations:</strong> Based on your password length and character types, it determines the total number of possible passwords. For example, an 8-character password using all character types has about 6.6 quadrillion combinations.</li>
            <li><strong className="text-foreground">Apply attack speed:</strong> Different attack scenarios allow different guess rates - from 100 guesses/second for rate-limited online attacks to 100 trillion/second for specialized hardware.</li>
            <li><strong className="text-foreground">Compute time:</strong> Divide total combinations by guesses per second to get estimated crack time.</li>
          </ol>
          <p className="text-muted-foreground">
            The tool shows results across multiple attack scenarios because a password that's safe 
            from online attacks might crumble in seconds against offline GPU cracking.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Evaluating Existing Passwords",
              description: "Check how long your current passwords would survive against different attack methods before deciding whether to change them."
            },
            {
              title: "Setting Password Policies",
              description: "Security teams use crack time estimates to define minimum password requirements that provide meaningful protection."
            },
            {
              title: "Understanding Threat Models",
              description: "See the dramatic difference between online attacks (rate-limited) and offline attacks (unlimited) to prioritize defenses."
            },
            {
              title: "Password Generator Validation",
              description: "After generating a random password, verify it would take centuries to crack before using it for important accounts."
            },
            {
              title: "Security Awareness Training",
              description: "Show employees concrete time estimates - 'your password cracks in 3 seconds' is more impactful than 'weak password'."
            },
            {
              title: "Incident Response Planning",
              description: "After a breach, estimate how much time you have before attackers crack stolen password hashes and force resets accordingly."
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
              caveat: "Times assume pure brute force attacks",
              explanation: "Real attackers use dictionary attacks, rainbow tables, and pattern-based cracking first. A password like 'Summer2024!' might have decent entropy but crack instantly because it's a common pattern."
            },
            {
              caveat: "Hash algorithm matters enormously",
              explanation: "MD5 hashes can be cracked billions of times per second. bcrypt with cost 12 might allow only hundreds. The same password has vastly different crack times depending on how it's stored."
            },
            {
              caveat: "GPU and ASIC hardware changes everything",
              explanation: "Modern GPU clusters can try hundreds of billions of passwords per second. What took years on a CPU now takes hours. Always check the 'fast offline' scenario."
            },
            {
              caveat: "Online rate limiting is your friend",
              explanation: "Services that limit login attempts (like 5 per minute) make online brute force impractical even for weak passwords. This is why offline attacks on stolen databases are the real threat."
            },
            {
              caveat: "Quantum computing isn't a concern yet",
              explanation: "While quantum computers could theoretically crack passwords faster using Grover's algorithm, practical quantum password cracking is likely decades away. Don't lose sleep over it today."
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
              question: "What crack time should I aim for?",
              answer: "For important accounts, aim for 'centuries' at the fast offline (10B/s) speed. For less critical accounts, at least 'years' provides reasonable protection. If it shows 'days' or less, change the password immediately."
            },
            {
              question: "Why does adding one character make such a big difference?",
              answer: "Password cracking is exponential, not linear. Adding one character to a mixed-case password multiplies the combinations by 94 (all printable ASCII characters). That's why 'password1' cracks in seconds but 'password12' takes years."
            },
            {
              question: "Are online attacks still a threat?",
              answer: "For well-designed services, no - rate limiting and account lockouts make online brute force impractical. The real danger is offline attacks after data breaches, which is why unique passwords per site matter."
            },
            {
              question: "How do rainbow tables affect crack times?",
              answer: "Rainbow tables are precomputed hash databases that can crack common passwords instantly. They're effective for passwords up to about 10-12 characters. Longer, random passwords aren't vulnerable to rainbow tables."
            },
            {
              question: "What's the fastest password cracking hardware?",
              answer: "Specialized password cracking rigs with multiple high-end GPUs can exceed 100 billion guesses per second for fast hash algorithms. Nation-state actors likely have even more powerful custom hardware."
            },
            {
              question: "Does password age affect crack time?",
              answer: "No - a password's crack resistance doesn't degrade over time. However, older passwords have had more time to leak in breaches, and attack hardware keeps getting faster. Regular rotation helps for other reasons."
            },
            {
              question: "Can I trust these time estimates?",
              answer: "They're mathematically accurate for pure brute force, but real-world cracking is often faster due to smart attacks. Use these estimates as best-case scenarios - if a password shows '1 year', assume it might crack in a month with smarter techniques."
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
