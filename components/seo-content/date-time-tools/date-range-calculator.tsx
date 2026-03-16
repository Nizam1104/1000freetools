import React from "react"

export default function DateRangeCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Choose between two modes: calculate an end date from a start date and duration, or find the duration between two dates. Select your time unit (days, weeks, months, years) for flexible calculations.
          </p>
          <p>
            The calculator handles month and year boundaries correctly. Adding 1 month to January 31st gives February 28th (or 29th in leap years), not March 3rd. This follows calendar logic, not simple day counting.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">End date calculation example:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">Start: January 15, 2024
Duration: 3 months
End: April 15, 2024</pre>
          </div>
          <p>
            Quick preset buttons provide common durations like 7 days, 30 days, 1 month, and 1 year. Perfect for subscription renewals, trial periods, and project deadlines.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Subscription management</h3>
            <p className="text-sm text-muted-foreground">
              Track renewal dates for services. Calculate trial end dates. Budget for upcoming charges. Never miss a cancellation deadline.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Project deadline planning</h3>
            <p className="text-sm text-muted-foreground">
              Set milestones from project start. Calculate delivery dates. Work backward from deadlines. Manage client expectations with real dates.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Lease and rental agreements</h3>
            <p className="text-sm text-muted-foreground">
              Determine lease end dates. Calculate notice periods. Plan move-out timelines. Track security deposit return windows.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Warranty and return tracking</h3>
            <p className="text-sm text-muted-foreground">
              Know when warranties expire. Calculate return windows. Track service contract periods. File claims before deadlines.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Billing cycle calculations</h3>
            <p className="text-sm text-muted-foreground">
              Understand invoice periods. Calculate prorated charges. Verify billing accuracy. Plan for large periodic payments.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Academic term planning</h3>
            <p className="text-sm text-muted-foreground">
              Calculate semester end dates. Plan assignment schedules. Track add/drop deadlines. Schedule study periods effectively.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Month addition follows calendar rules.</strong>
              Adding months preserves the day number when possible. January 31 + 1 month = February 28/29. This is standard date arithmetic.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Business days exclude weekends.</strong>
              Business day calculations skip Saturday and Sunday. 10 business days from Monday is 2 weeks later. Holidays are not automatically excluded.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Duration direction matters.</strong>
              Positive durations move forward in time. Negative durations go backward. Use negative values to find past dates.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Approximate vs exact months.</strong>
              "30 days" differs from "1 month". Months vary from 28-31 days. Choose the unit that matches your use case.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For legal deadlines, always verify with the specific rules. Some contracts specify "calendar days" vs "business days" with different implications.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do you handle end-of-month dates?</h3>
            <p className="text-sm text-muted-foreground">
              When adding months to month-end dates, the result is the last day of the target month. January 31 + 1 month = February 28/29.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between days and business days?</h3>
            <p className="text-sm text-muted-foreground">
              Days count every calendar day. Business days skip weekends. 5 business days typically equals 7 calendar days.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I calculate negative durations?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, enter negative numbers to go backward. -30 days from today shows the date 30 days ago. Useful for lookback calculations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How accurate is the month calculation?</h3>
            <p className="text-sm text-muted-foreground">
              Very accurate for calendar purposes. It uses actual month lengths. February is handled correctly including leap years.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this account for holidays?</h3>
            <p className="text-sm text-muted-foreground">
              No, holidays vary by country and organization. Business days only exclude weekends. Use the business days calculator for holiday-aware calculations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this for time calculations?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, hours and minutes are supported. Add 8 hours to a timestamp. Calculate shift end times. Plan time-based deadlines.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the maximum duration?</h3>
            <p className="text-sm text-muted-foreground">
              JavaScript dates handle centuries reliably. Very large durations may have precision limits. Typical use cases work without issues.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
