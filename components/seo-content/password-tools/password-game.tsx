export default function PasswordGameSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This password security game teaches you about strong password creation
            through interactive challenges and real-time feedback.
          </p>
          <p className="text-muted-foreground">
            The learning process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Interactive challenges:</strong> Complete password creation tasks with specific security goals.</li>
            <li><strong className="text-foreground">Real-time scoring:</strong> See how your password choices affect security strength instantly.</li>
            <li><strong className="text-foreground">Pattern recognition:</strong> Learn to identify weak patterns like keyboard walks and common substitutions.</li>
            <li><strong className="text-foreground">Progressive difficulty:</strong> Challenges increase in complexity as you master each concept.</li>
          </ol>
          <p className="text-muted-foreground">
            By gamifying password education, you'll develop intuition for creating
            strong, memorable passwords without relying on obvious patterns.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Security Awareness Training",
              description: "Engage employees with fun, interactive password security education instead of boring presentations."
            },
            {
              title: "Personal Skill Building",
              description: "Improve your own password creation abilities through practice and immediate feedback."
            },
            {
              title: "Teaching Kids Online Safety",
              description: "Introduce children to password concepts in an age-appropriate, engaging way."
            },
            {
              title: "Team Competitions",
              description: "Run password security challenges during security awareness weeks or team building events."
            },
            {
              title: "Breaking Bad Habits",
              description: "Identify and correct your own weak password patterns through guided practice."
            },
            {
              title: "Understanding Attack Methods",
              description: "Learn how attackers think by seeing which passwords fall to different cracking techniques."
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
              caveat: "Never use game passwords in real life",
              explanation: "Passwords created during the game are for learning only. Never reuse them for actual accounts."
            },
            {
              caveat: "Scores are educational, not absolute",
              explanation: "Game scoring simplifies real-world security. Actual password strength depends on many factors."
            },
            {
              caveat: "Patterns matter more than length alone",
              explanation: "A 20-character password with predictable patterns is weaker than a random 12-character one."
            },
            {
              caveat: "Common substitutions don't help much",
              explanation: "Replacing 'a' with '@' or 'e' with '3' is well-known to attackers. These add minimal security."
            },
            {
              caveat: "Memorability is part of security",
              explanation: "The strongest password is useless if you write it on a sticky note. Balance strength with recall."
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
              question: "How long does it take to learn good password habits?",
              answer: "Most people see improvement after 15-20 minutes of practice. The key is understanding principles, not memorizing rules."
            },
            {
              question: "What's the hardest password to crack?",
              answer: "A truly random string of 16+ characters. But passphrases (4+ random words) are nearly as strong and much easier to remember."
            },
            {
              question: "Are password patterns ever okay?",
              answer: "Personal patterns only you know can work, but avoid anything based on public info (birthdays, pet names, etc.)."
            },
            {
              question: "Why are keyboard walks so weak?",
              answer: "'qwerty' and 'asdfgh' are in every cracking dictionary. They're as predictable as 'password123'."
            },
            {
              question: "Can I use this game with my team?",
              answer: "Absolutely! It's designed for group learning. Consider running it during security awareness training sessions."
            },
            {
              question: "What's the point of the scoring system?",
              answer: "Scores provide immediate feedback on security choices, helping you develop intuition for strong passwords."
            },
            {
              question: "Should I use a password manager instead?",
              answer: "Use both! A password manager handles storage; this game teaches you to create strong master passwords and understand security."
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
