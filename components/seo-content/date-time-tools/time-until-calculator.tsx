import React from "react"

export default function TimeUntilCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter a target date and time for your event. The calculator shows a live countdown with years, days, hours, minutes, and seconds remaining. The display updates every second.
          </p>
          <p>
            Name your event for personalized tracking. Quick preset buttons set common events like New Year's, Christmas, and Halloween. The milestone section shows upcoming markers like "100 days left."
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Countdown example:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">Event: Wedding Day
Target: June 15, 2024 at 2:00 PM
Remaining: 45 days, 12 hours, 34 minutes

Milestones:
100 days: March 7, 2024
50 days: April 26, 2024
30 days: May 16, 2024</pre>
          </div>
          <p>
            When the countdown reaches zero, a celebration message appears. The detailed breakdown shows total days, hours, and minutes for perspective on the timeline.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Wedding planning</h3>
            <p className="text-sm text-muted-foreground">
              Track days until the big day. Share countdown with wedding party. Coordinate final preparations. Build excitement gradually.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Project deadlines</h3>
            <p className="text-sm text-muted-foreground">
              Monitor time until deliverables. Keep teams focused. Plan final push timing. Avoid last-minute rushes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Vacation anticipation</h3>
            <p className="text-sm text-muted-foreground">
              Count down to travel days. Plan packing schedules. Coordinate time off. Build excitement for trips.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Product launches</h3>
            <p className="text-sm text-muted-foreground">
              Track launch dates. Coordinate marketing campaigns. Time announcements. Build customer anticipation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Exam preparation</h3>
            <p className="text-sm text-muted-foreground">
              Monitor study time remaining. Plan review schedules. Track preparation progress. Manage test anxiety.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Special occasions</h3>
            <p className="text-sm text-muted-foreground">
              Count to anniversaries. Track birthday surprises. Plan holiday preparations. Remember important dates.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Time zone uses your local time.</strong>
              Countdown is based on your device's clock. Share with others in different zones? They'll see different remaining times. Specify time zone for remote teams.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Milestones help with planning.</strong>
              100-day, 50-day, 30-day markers aid preparation. Use them for task deadlines. Break big goals into milestone chunks.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Browser must stay open for live updates.</strong>
              Countdown updates while page is open. Closed browser stops updates. Reopen to see current remaining time.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Past events show completion message.</strong>
              When target passes, countdown shows "arrived" message. Reset with new date for next occurrence. Annual events need yearly updates.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For recurring annual events, create multiple timers. One for this year, one for next. Helps with long-term planning.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I count down to multiple events?</h3>
            <p className="text-sm text-muted-foreground">
              Create separate timers for each event. Open multiple browser tabs. Or use the countdown timer tool for managing multiple events simultaneously.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I share the countdown?</h3>
            <p className="text-sm text-muted-foreground">
              Copy the event details and date. Share via message or email. Recipients can set up their own countdown. Some browsers allow page sharing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What happens at zero?</h3>
            <p className="text-sm text-muted-foreground">
              Celebration message appears. Timer stops at zero. Reset with new date for next occurrence. Perfect for annual events.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I get notifications?</h3>
            <p className="text-sm text-muted-foreground">
              Enable browser notifications for alerts. The countdown timer tool supports notifications. Get alerted when events arrive.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why do seconds keep changing?</h3>
            <p className="text-sm text-muted-foreground">
              Live countdown updates every second. Shows real-time remaining. Creates urgency and excitement. Refreshes automatically.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How far in advance can I set?</h3>
            <p className="text-sm text-muted-foreground">
              Any future date works. Years in advance is fine. Great for long-term planning. Weddings, graduations, retirements.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I embed this on my site?</h3>
            <p className="text-sm text-muted-foreground">
              This is a standalone tool. For website embedding, look for countdown widgets. Many free options exist for blogs and sites.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
