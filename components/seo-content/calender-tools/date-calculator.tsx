import * as React from "react"

export default function DateCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            This calculator performs arithmetic operations on dates. Add or subtract specific amounts of time (years, months, weeks, days, hours, minutes, seconds) from any starting date to find the resulting date and time.
          </p>
          <p>
            Enter a start date, select whether to add or subtract time, then specify the duration in any combination of time units. The calculator handles month-end edge cases intelligently - adding one month to January 31st results in February 28th (or 29th in leap years).
          </p>
          <p>
            The tool also calculates the difference between two dates, showing the duration broken down into years, months, days, and smaller units. Toggle between "business days only" mode to exclude weekends and holidays from calculations.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Contract Deadlines</h3>
            <p className="text-sm text-muted-foreground">
              Calculate contract end dates, notice periods, or renewal deadlines based on start dates and term lengths.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Project Planning</h3>
            <p className="text-sm text-muted-foreground">
              Determine project milestones and delivery dates by adding estimated durations to start dates.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Pregnancy Due Dates</h3>
            <p className="text-sm text-muted-foreground">
              Calculate estimated due dates by adding 40 weeks to the last menstrual period or conception date.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Visa and Passport Expiry</h3>
            <p className="text-sm text-muted-foreground">
              Find expiration dates for travel documents and plan renewals before they expire.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Loan and Mortgage Terms</h3>
            <p className="text-sm text-muted-foreground">
              Calculate loan maturity dates, payment schedules, or when a mortgage will be paid off.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Age Calculations</h3>
            <p className="text-sm text-muted-foreground">
              Determine exact age in years, months, and days, or find what date someone will turn a specific age.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Month arithmetic varies:</strong> Adding "one month" means the same day next month, not 30 days. January 31 + 1 month = February 28/29, not March 2 or 3.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Business days exclude weekends:</strong> When using business day mode, Saturdays and Sundays are skipped. Optional holiday lists can also be excluded.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Leap years handled automatically:</strong> The calculator correctly accounts for leap years when calculating across February or multi-year periods.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Time zone considerations:</strong> All calculations use the date values as entered without time zone conversion. For precise time calculations across zones, use a dedicated time zone tool.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Negative results supported:</strong> Subtracting a larger duration from a date can result in dates far in the past. There's no lower limit on how far back you can calculate.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">How many days until a specific date?</h3>
            <p className="text-sm text-muted-foreground">
              Use the "difference between dates" mode. Enter today's date and your target date to see the exact number of days, weeks, months, and years between them.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What date is 90 days from now?</h3>
            <p className="text-sm text-muted-foreground">
              Select "Add" mode, enter today's date, and add 90 days. The result shows the exact date 90 days in the future, accounting for month boundaries.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I calculate business days only?</h3>
            <p className="text-sm text-muted-foreground">
              Enable the "Business days only" toggle. This excludes weekends from the calculation. Some versions also allow you to specify holidays to exclude.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I add hours and minutes to a date?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Enter the starting date and time, then add any combination of hours, minutes, or seconds. Useful for calculating shift end times or event durations.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What's the exact age between two dates?</h3>
            <p className="text-sm text-muted-foreground">
              Enter the birth date as the start date and today (or another date) as the end date. The result shows age in years, months, days, and total days.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I find a date from X years ago?</h3>
            <p className="text-sm text-muted-foreground">
              Use "Subtract" mode and enter the number of years. For example, to find the date 5 years ago from today, subtract 5 years from today's date.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Does this work for historical dates?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. You can calculate dates in the past or future without limit. The Gregorian calendar rules are applied consistently, though historical calendar changes aren't accounted for.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
