export default function PasswordExpiryReminderSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This password expiry reminder tool helps you track when to change passwords
            across your various accounts with customizable notifications and schedules.
          </p>
          <p className="text-muted-foreground">
            The reminder management process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Account entry:</strong> Add accounts with names, URLs, and optional notes (never store actual passwords).</li>
            <li><strong className="text-foreground">Schedule configuration:</strong> Set change intervals based on account importance (30, 60, 90 days, or custom).</li>
            <li><strong className="text-foreground">Notification setup:</strong> Choose how far in advance to be reminded (1 week, 2 weeks, 1 month before).</li>
            <li><strong className="text-foreground">Local tracking:</strong> All data is stored locally in your browser with no server transmission.</li>
          </ol>
          <p className="text-muted-foreground">
            The tool provides a dashboard view of all your accounts with color-coded
            status indicators showing which passwords need attention soon.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Compliance Requirements",
              description: "Meet organizational or regulatory requirements for periodic password changes on specific accounts."
            },
            {
              title: "High-Security Accounts",
              description: "Ensure critical accounts (email, banking, primary services) get regular password attention."
            },
            {
              title: "Shared Account Management",
              description: "Coordinate password changes for accounts shared with team members or family."
            },
            {
              title: "Post-Breach Vigilance",
              description: "After a security incident, set shorter intervals for affected or similar accounts."
            },
            {
              title: "Habit Building",
              description: "Develop regular password maintenance habits until using a password manager becomes routine."
            },
            {
              title: "Legacy System Accounts",
              description: "Track passwords for systems that don't support modern authentication or password managers."
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
              caveat: "Never store actual passwords here",
              explanation: "This tool tracks metadata only (account names, dates). Store passwords in a dedicated password manager."
            },
            {
              caveat: "Browser storage has limitations",
              explanation: "Data is stored locally. Clearing browser data will delete your reminders. Export backups regularly."
            },
            {
              caveat: "Modern guidance questions rotation",
              explanation: "NIST now recommends changing passwords only when compromised. Use this tool if required, but prioritize unique passwords."
            },
            {
              caveat: "Prioritize by account importance",
              explanation: "Set shorter intervals for critical accounts. Low-risk accounts can have longer or no rotation schedules."
            },
            {
              caveat: "Notifications require active checking",
              explanation: "This tool doesn't send push notifications. You need to check the dashboard or enable browser notifications."
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
              question: "How often should I actually change passwords?",
              answer: "Only when there's evidence of compromise. Forced rotation is no longer recommended by security experts unless required by policy."
            },
            {
              question: "What accounts deserve the shortest rotation?",
              answer: "Email (controls password resets), financial accounts, and primary cloud services. These have the highest breach impact."
            },
            {
              question: "Can I export my reminder list?",
              answer: "Check if the tool supports CSV or JSON export. Regular backups protect against browser data loss."
            },
            {
              question: "What if I forget to check the reminders?",
              answer: "Enable browser notifications if available, or set a recurring calendar reminder to check the dashboard weekly."
            },
            {
              question: "Should all accounts have the same rotation schedule?",
              answer: "No. Risk-based scheduling makes sense: high-value accounts more frequently, low-risk accounts less often or not at all."
            },
            {
              question: "Is this better than a password manager's built-in reminders?",
              answer: "Password managers are more convenient. This tool is useful if you can't use a password manager for certain accounts."
            },
            {
              question: "What happens when I change a password?",
              answer: "Mark the account as updated in the tool, and the rotation timer resets. Update your password manager too."
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
