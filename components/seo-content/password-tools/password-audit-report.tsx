export default function PasswordAuditReportSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This password audit tool analyzes your password list to identify security
            weaknesses and provide actionable improvement recommendations.
          </p>
          <p className="text-muted-foreground">
            The audit process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Password import:</strong> Load your password list securely (all processing happens locally).</li>
            <li><strong className="text-foreground">Duplicate detection:</strong> Identifies passwords reused across multiple accounts.</li>
            <li><strong className="text-foreground">Strength analysis:</strong> Evaluates each password against modern security criteria.</li>
            <li><strong className="text-foreground">Age assessment:</strong> Flags old passwords that may need rotation.</li>
            <li><strong className="text-foreground">Report generation:</strong> Creates a detailed summary with prioritized recommendations.</li>
          </ol>
          <p className="text-muted-foreground">
            The result is a clear picture of your password security posture with specific
            steps to improve it, prioritized by risk level.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Personal Security Review",
              description: "Audit your password manager export to find weak or reused passwords that need attention."
            },
            {
              title: "IT Security Assessments",
              description: "Analyze organizational password health (anonymized) to identify training needs and policy gaps."
            },
            {
              title: "Post-Breach Response",
              description: "After a security incident, quickly identify which accounts used compromised passwords."
            },
            {
              title: "Compliance Documentation",
              description: "Generate reports showing password security status for audits and regulatory requirements."
            },
            {
              title: "Migration Planning",
              description: "Before switching password managers, audit your current passwords to prioritize which need updating."
            },
            {
              title: "Security Awareness Baseline",
              description: "Establish a starting point for measuring improvement in password security over time."
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
              caveat: "Never upload passwords to unknown sites",
              explanation: "This tool runs entirely in your browser. Your passwords never leave your device. Verify this before using any audit tool."
            },
            {
              caveat: "Export carefully from password managers",
              explanation: "Password manager exports are sensitive. Delete the export file immediately after auditing."
            },
            {
              caveat: "Focus on high-risk findings first",
              explanation: "Prioritize fixing reused passwords on critical accounts (email, banking) before addressing weaker passwords on low-risk sites."
            },
            {
              caveat: "Audit results are a snapshot",
              explanation: "Password security changes over time. Run audits periodically, especially after breach notifications."
            },
            {
              caveat: "Some weak passwords may be acceptable",
              explanation: "Low-value accounts (forum signups) can have simpler passwords. Focus security effort where it matters."
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
              question: "Is it safe to audit my passwords?",
              answer: "Yes, when done locally. This tool processes everything in your browser. Never use tools that require uploading passwords to servers."
            },
            {
              question: "What format should my password list be in?",
              answer: "Most password managers export to CSV. The tool can parse common formats with columns for site, username, and password."
            },
            {
              question: "How many reused passwords is too many?",
              answer: "Any reuse is risky, but prioritize eliminating reuse on email, banking, and primary accounts first."
            },
            {
              question: "What's a good password age?",
              answer: "Modern guidance says change only when compromised. However, passwords older than 2-3 years on critical accounts deserve review."
            },
            {
              question: "Should I fix all weak passwords at once?",
              answer: "No - that's overwhelming. Fix 5-10 per week, starting with the most important accounts."
            },
            {
              question: "What if I find passwords I don't recognize?",
              answer: "Investigate immediately. It could indicate unauthorized access or old accounts you forgot about."
            },
            {
              question: "How often should I run an audit?",
              answer: "Every 3-6 months is reasonable. Also audit after any breach notification affecting your accounts."
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
