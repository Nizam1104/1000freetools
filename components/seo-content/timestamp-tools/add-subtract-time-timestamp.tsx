export default function AddSubtractTimeTimestampSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This timestamp calculator adds or subtracts time durations from Unix timestamps,
            helping you calculate future or past dates programmatically.
          </p>
          <p className="text-muted-foreground">
            The calculation process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Timestamp input:</strong> Enter a Unix timestamp (seconds or milliseconds since January 1, 1970).</li>
            <li><strong className="text-foreground">Duration selection:</strong> Choose the time unit (seconds, minutes, hours, days, weeks, months, years).</li>
            <li><strong className="text-foreground">Operation choice:</strong> Select whether to add (future) or subtract (past) the duration.</li>
            <li><strong className="text-foreground">Result calculation:</strong> The tool performs the arithmetic and displays the new timestamp with human-readable date.</li>
          </ol>
          <p className="text-muted-foreground">
            For example, adding 7 days to a timestamp gives you the exact moment one week later,
            useful for calculating expiry dates, reminders, or scheduling events.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Session Expiry Calculation",
              description: "Calculate when user sessions expire by adding session duration to login timestamps."
            },
            {
              title: "Deadline Planning",
              description: "Determine exact timestamps for project deadlines by adding days or weeks to start dates."
            },
            {
              title: "Log File Analysis",
              description: "Find events that occurred a specific time before or after a known incident timestamp."
            },
            {
              title: "Subscription Management",
              description: "Calculate renewal dates by adding subscription periods to purchase timestamps."
            },
            {
              title: "Data Retention Policies",
              description: "Determine when old data should be deleted by adding retention periods to creation dates."
            },
            {
              title: "Testing Time-Based Code",
              description: "Generate test timestamps for future or past dates when testing time-dependent functionality."
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
              caveat: "Know your timestamp unit",
              explanation: "Unix timestamps can be in seconds (10 digits) or milliseconds (13 digits). Using the wrong unit gives wildly incorrect results."
            },
            {
              caveat: "Month and year calculations vary",
              explanation: "Adding '1 month' isn't always 30 days - months have different lengths. The tool accounts for this correctly."
            },
            {
              caveat: "Timezone awareness matters",
              explanation: "Unix timestamps are UTC-based. The human-readable output may vary based on your local timezone settings."
            },
            {
              caveat: "Negative results are valid",
              explanation: "Subtracting enough time can produce negative timestamps, representing dates before January 1, 1970."
            },
            {
              caveat: "Leap seconds aren't counted",
              explanation: "Unix time ignores leap seconds. For most applications this doesn't matter, but precision systems need to account for them."
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
              question: "What's the difference between seconds and milliseconds?",
              answer: "Seconds: 10-digit timestamps (e.g., 1700000000). Milliseconds: 13-digit (e.g., 1700000000000). JavaScript uses milliseconds; Unix systems use seconds."
            },
            {
              question: "Can I add fractional time units?",
              answer: "Most tools accept decimal values. For example, 1.5 hours = 90 minutes. Check if the specific tool supports decimals."
            },
            {
              question: "How does adding months work?",
              answer: "Adding 1 month to January 31 gives February 28 (or 29 in leap years). The tool adjusts for month length automatically."
            },
            {
              question: "What's the maximum timestamp?",
              answer: "For 32-bit systems: January 19, 2038 (the Y2K38 problem). For 64-bit: about 292 billion years from now."
            },
            {
              question: "Can I chain multiple operations?",
              answer: "Use the result as input for another calculation, or do the math yourself: adding 2 hours then 30 minutes equals adding 150 minutes."
            },
            {
              question: "Why would I subtract time?",
              answer: "Finding past dates: when did something happen 30 days ago? What was the timestamp at the start of last week?"
            },
            {
              question: "Is this accurate for scheduling?",
              answer: "Yes for most purposes. For critical systems, consider timezone changes (DST) and leap seconds in your application logic."
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
