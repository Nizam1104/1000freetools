import React from "react"

export default function DateCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Choose between two modes: calculate the difference between two dates, or add/subtract time from a date. The difference mode shows total days, weeks, months, and years between dates.
          </p>
          <p>
            The add/subtract mode lets you add or remove days, weeks, months, years, or business days from any date. Business days automatically skip weekends for accurate workday calculations.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Date difference example:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">From: January 1, 2024
To: December 31, 2024
Result: 365 days, 52 weeks, 12 months</pre>
          </div>
          <p>
            Results display in multiple formats for flexibility. Copy dates directly for use in documents. The breakdown shows years, months, and days separately for precise understanding.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Project timeline management</h3>
            <p className="text-sm text-muted-foreground">
              Calculate project duration. Set milestone dates. Track phase lengths. Report progress in meaningful units.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Contract period verification</h3>
            <p className="text-sm text-muted-foreground">
              Verify lease durations. Check employment periods. Calculate notice windows. Ensure compliance with term requirements.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Deadline planning</h3>
            <p className="text-sm text-muted-foreground">
              Work backward from due dates. Add buffer time for reviews. Schedule deliverables. Manage client expectations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Age and tenure calculations</h3>
            <p className="text-sm text-muted-foreground">
              Calculate years of service. Determine eligibility dates. Track membership duration. Verify qualification periods.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Financial period analysis</h3>
            <p className="text-sm text-muted-foreground">
              Compare fiscal periods. Calculate investment horizons. Track loan terms. Analyze payment schedules.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Event countdown planning</h3>
            <p className="text-sm text-muted-foreground">
              Plan wedding timelines. Schedule conference prep. Coordinate travel. Manage pre-event tasks.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Business days exclude weekends only.</strong>
              Business day calculations skip Saturday and Sunday. Holidays are not automatically excluded. Add custom holidays for accuracy.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Month calculations preserve day numbers.</strong>
              Adding 1 month to January 31 gives February 28/29. This follows calendar conventions. Not all months have same days.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Negative values go backward.</strong>
              Subtracting time uses negative numbers. -30 days goes into the past. Useful for lookback calculations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Approximate vs exact calculations.</strong>
              Months and years are approximate in totals. 30.44 days per month average. Breakdown uses actual calendar math.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For legal deadlines, always verify business day rules. Some jurisdictions count differently. When in doubt, add buffer days.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do you calculate months between dates?</h3>
            <p className="text-sm text-muted-foreground">
              Full months are counted first. Remaining days show separately. January 15 to March 10 is 1 month, 24 days. Not 1.8 months.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What counts as a business day?</h3>
            <p className="text-sm text-muted-foreground">
              Monday through Friday, excluding weekends. Holidays vary by location. The basic calculator doesn't include holidays. Use business days tool for that.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I calculate time differences?</h3>
            <p className="text-sm text-muted-foreground">
              This tool handles dates only. For time calculations, use the time duration calculator. Combine both for full datetime math.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why are months approximate?</h3>
            <p className="text-sm text-muted-foreground">
              Months vary from 28-31 days. Total months use 30.44 average. The breakdown shows exact calendar months. Both views are useful.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How far in the future can I calculate?</h3>
            <p className="text-sm text-muted-foreground">
              JavaScript dates handle centuries reliably. Very distant dates may have precision limits. Typical planning horizons work fine.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this handle leap years?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, February 29 is handled correctly. Adding years across leap years works properly. Date math accounts for all calendar rules.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I copy the result date?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, click the copy button next to result dates. Formats include ISO and local. Paste directly into documents or spreadsheets.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
