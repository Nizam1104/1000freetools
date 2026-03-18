import React from "react"

export default function AddSubtractTimeAcrossZonesCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter a base date and time in one timezone, then add or subtract days, hours, and minutes. The calculator shows the adjusted time in both the original timezone and a target timezone.
          </p>
          <p>
            This is useful for calculating deadlines, delivery times, or event durations across timezones. The tool handles daylight saving time and date rollovers automatically.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Example calculation:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">Base: March 15, 2025 2:00 PM EST (New York)
Operation: Add 8 hours 30 minutes
Result in New York: 10:30 PM EST
Result in London: 3:30 AM GMT (next day)
Result in Tokyo: 12:30 PM JST (next day)</pre>
          </div>
          <p>
            The calculator shows the time difference between your base and target timezones. This helps understand how time shifts when coordinating across regions.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Project deadline calculations</h3>
            <p className="text-sm text-muted-foreground">
              A task starts at 9 AM Monday in San Francisco and takes 72 hours. The calculator shows it's due 5 PM Tuesday Pacific Time, but 8 PM Tuesday in New York and 1 AM Wednesday in London.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Shipping and delivery estimates</h3>
            <p className="text-sm text-muted-foreground">
              An e-commerce site promises "delivery within 48 hours" from order time. A customer in Sydney orders at 3 PM their time. The calculator shows delivery by 3 PM two days later Sydney time.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Shift scheduling across timezones</h3>
            <p className="text-sm text-muted-foreground">
              A support team works 8-hour shifts following the sun. When the London shift ends at 5 PM GMT, the calculator shows it's 9 AM in Los Angeles - perfect handoff time for the US West Coast team.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Media embargo timing</h3>
            <p className="text-sm text-muted-foreground">
              A press release lifts at 6 AM EST on launch day. The PR team needs to know when journalists in other timezones can publish. The calculator shows 11 AM in London, 10 PM in Sydney.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Exam and test scheduling</h3>
            <p className="text-sm text-muted-foreground">
              An online course has a 4-hour exam that must start between 8 AM and 8 PM local time. Students in different timezones use the calculator to find their valid start window in UTC.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Server maintenance windows</h3>
            <p className="text-sm text-muted-foreground">
              A 6-hour maintenance starts at 1 AM UTC. The calculator shows it runs until 7 AM UTC, which is 2 AM-8 AM in New York, 9 AM-3 PM in London, 10 AM-4 PM in Berlin.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Date boundaries shift across timezones.</strong>
              Adding 8 hours to 8 PM in New York crosses midnight, making it 4 AM the next day. In London, that same calculation shows 9 AM the next day. The calculator handles these rollovers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Daylight saving can affect duration.</strong>
              If your calculation spans a DST transition, the actual elapsed time may differ by an hour. A "24-hour" period during DST spring-forward is actually 23 hours of wall-clock time.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Subtracting time goes backwards.</strong>
              Need to know what time it was 12 hours ago in another timezone? Subtract 12 hours from the current time. The calculator shows the historical time in both timezones.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Large time additions cross multiple days.</strong>
              Adding 100 hours to a timestamp advances by 4 days and 4 hours. The calculator shows the exact date and time, accounting for all timezone differences.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For SLA calculations, always specify whether the deadline is in the customer's timezone or your company's timezone. "48 hours from order" means different things to different parties.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I calculate a deadline in another timezone?</h3>
            <p className="text-sm text-muted-foreground">
              Enter the start time in your timezone, add the duration (e.g., 5 business days = 120 hours), then view the result in the target timezone. This shows when the deadline occurs locally for them.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if the calculation crosses a DST boundary?</h3>
            <p className="text-sm text-muted-foreground">
              The calculator uses the timezone rules for each date. If you add time across a DST transition, the result accounts for the clock change. Spring forward loses an hour, fall back gains an hour.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I subtract time to find past events?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, select "Subtract" and enter the duration. This is useful for finding when something started given its end time, or calculating timestamps for logs and audit trails.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I handle business hours vs calendar hours?</h3>
            <p className="text-sm text-muted-foreground">
              This calculator uses calendar hours (24 hours per day). For business hours (8 hours per day, excluding weekends), multiply business days by 8 and add any partial days manually.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the maximum time I can add or subtract?</h3>
            <p className="text-sm text-muted-foreground">
              You can add or subtract any reasonable duration. Adding 365 days advances by one year. Adding 8760 hours (365 × 24) also advances by one year. The calculator handles large numbers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does the target timezone show a different date?</h3>
            <p className="text-sm text-muted-foreground">
              Timezones on opposite sides of the International Date Line can be a day apart. When it's Monday evening in the US, it's already Tuesday morning in Asia and Australia.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this for recurring calculations?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, use the same duration repeatedly. For daily standups at the same time, calculate once then use that time daily. For weekly meetings, add 168 hours (7 × 24) to find next week's time.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
