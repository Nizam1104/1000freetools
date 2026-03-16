import React from "react"

export default function DayCounterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select a start date and end date to count the days between them. The calculator shows total days plus a breakdown into weeks and remaining days for easy understanding.
          </p>
          <p>
            Toggle the "include end date" option to add one day for inclusive counting. This matters for legal periods, hotel stays, and event durations where both endpoints count.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Inclusive vs exclusive:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">Jan 1 to Jan 5 (exclusive): 4 days
Jan 1 to Jan 5 (inclusive): 5 days

Hotel: Check-in Jan 1, checkout Jan 5
Nights: 4 (exclusive counting)</pre>
          </div>
          <p>
            Quick preset buttons set common ranges like 1 week, 1 month, or 1 year from today. Use "Today to Today" for zero-day calculations or same-day event planning.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Hotel and rental bookings</h3>
            <p className="text-sm text-muted-foreground">
              Count nights for hotel stays. Calculate rental car periods. Verify vacation rental charges. Understand booking terms.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Simple project tracking</h3>
            <p className="text-sm text-muted-foreground">
              Track days since project start. Count days until launch. Monitor sprint duration. Report simple day counts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Challenge and habit tracking</h3>
            <p className="text-sm text-muted-foreground">
              Count days in fitness challenges. Track habit streaks. Measure diet program length. Monitor sobriety milestones.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">School semester counting</h3>
            <p className="text-sm text-muted-foreground">
              Count school days remaining. Track attendance periods. Calculate instructional days. Plan academic schedules.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Legal notice periods</h3>
            <p className="text-sm text-muted-foreground">
              Verify 30-day notice requirements. Calculate cure periods. Track response deadlines. Ensure compliance with timelines.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Event duration planning</h3>
            <p className="text-sm text-muted-foreground">
              Plan conference lengths. Schedule festival days. Coordinate multi-day events. Book venues for correct duration.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Inclusive counting adds one day.</strong>
              When both start and end dates count, add 1. "Days 1-5" is 5 days inclusive. Hotel nights count exclusively (4 nights for 5 days).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Week breakdown helps visualization.</strong>
              45 days is hard to grasp. "6 weeks, 3 days" is clearer. The breakdown shows both total and structured views.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Negative results show reversed dates.</strong>
              End date before start date gives negative days. Absolute value displays. Swap dates for positive count.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Hours calculation assumes full days.</strong>
              Days multiply by 24 for hours. Time of day is not considered. Use time duration calculator for hour precision.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For legal notices, always use inclusive counting and verify local rules. When mailing notices, add days for delivery time.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I include the end date?</h3>
            <p className="text-sm text-muted-foreground">
              Depends on context. Hotel stays: no (count nights). Event days: yes (count all days). Legal periods: usually yes. Check your specific use case.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do you count business days?</h3>
            <p className="text-sm text-muted-foreground">
              This tool counts all calendar days. For business days only, use the business days calculator. It excludes weekends and holidays.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference from date difference?</h3>
            <p className="text-sm text-muted-foreground">
              Day counter is simpler - just total days. Date difference shows years, months breakdown. Use day counter for straightforward counts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I count days from today?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, use the quick preset buttons. "Today to Today" sets both dates. Other presets calculate from today forward.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why show weeks and days?</h3>
            <p className="text-sm text-muted-foreground">
              Weeks are easier to visualize. "8 weeks, 2 days" is clearer than "58 days". Helps with planning and mental math.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work for past dates?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, any date combination works. Past to present shows elapsed days. Past to future shows total span. Order doesn't affect absolute count.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How accurate is the month approximation?</h3>
            <p className="text-sm text-muted-foreground">
              Months use 30.44 day average. Good for estimation. Not precise for calendar months. Use for rough planning only.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
