export default function PasswordHistoryGeneratorSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This password history generator demonstrates how predictable password
            rotation patterns create security vulnerabilities that attackers can exploit.
          </p>
          <p className="text-muted-foreground">
            The pattern generation process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Base password input:</strong> Start with an initial password that follows a common pattern.</li>
            <li><strong className="text-foreground">Pattern application:</strong> Apply typical rotation rules like incrementing numbers or changing seasons.</li>
            <li><strong className="text-foreground">Sequence generation:</strong> Create a timeline showing how the password evolves over multiple changes.</li>
            <li><strong className="text-foreground">Vulnerability analysis:</strong> Highlight how each pattern makes passwords predictable to attackers.</li>
          </ol>
          <p className="text-muted-foreground">
            By visualizing these patterns, you'll understand why predictable rotation
            is dangerous and learn to create truly independent passwords instead.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This</h2> */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Security Awareness Training",
              description: "Show employees why 'Spring2024!' to 'Summer2024!' rotation doesn't actually improve security."
            },
            {
              title: "Personal Habit Assessment",
              description: "Recognize your own password rotation patterns and understand their weaknesses."
            },
            {
              title: "Policy Development",
              description: "Demonstrate to management why forced rotation policies can create false security."
            },
            {
              title: "Attacker Education",
              description: "Learn how penetration testers exploit predictable password patterns during assessments."
            },
            {
              title: "Compliance Discussions",
              description: "Understand why modern standards (NIST) recommend against forced periodic rotation."
            },
            {
              title: "Breaking Bad Habits",
              description: "Identify and stop using incremental patterns like Password1, Password2, Password3."
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
              caveat: "This is educational, not prescriptive",
              explanation: "The tool shows weak patterns to avoid, not patterns you should use. Never use generated sequences for real passwords."
            },
            {
              caveat: "Incremental patterns are trivial to crack",
              explanation: "Attackers automatically try sequences like Password1 through Password100. They're essentially the same password."
            },
            {
              caveat: "Seasonal rotations are predictable",
              explanation: "Spring2024, Summer2024, Fall2024 is as weak as numbered sequences. Attackers include these in dictionaries."
            },
            {
              caveat: "Character substitutions don't help patterns",
              explanation: "P@ssw0rd1, P@ssw0rd2 is still predictable. Substitutions are well-known to cracking tools."
            },
            {
              caveat: "Each password should be independent",
              explanation: "Real security comes from unrelated passwords. Use a password manager to handle the complexity."
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
              question: "Why are password rotation patterns bad?",
              answer: "They're predictable. If an attacker knows one password, they can easily guess the next. It's like having the same password."
            },
            {
              question: "Shouldn't I change passwords regularly?",
              answer: "Only if there's evidence of compromise. NIST now recommends against forced rotation because it leads to weak patterns."
            },
            {
              question: "What's a better approach than rotation?",
              answer: "Use unique, strong passwords for each account. Enable breach monitoring and change only when a password is known compromised."
            },
            {
              question: "How do attackers exploit these patterns?",
              answer: "Cracking tools automatically try common sequences. Once they find 'Summer2024', they immediately try 'Fall2024' and 'Winter2024'."
            },
            {
              question: "Are any patterns safe?",
              answer: "Only patterns only you know and that aren't based on public information. But truly random passwords are always better."
            },
            {
              question: "What if my company requires rotation?",
              answer: "Use a password manager to generate completely random passwords each time. Don't create your own patterns."
            },
            {
              question: "How many previous passwords do systems remember?",
              answer: "Many systems prevent reusing the last 5-10 passwords. This is why incremental patterns become obvious quickly."
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
