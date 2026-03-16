import * as React from "react"

export default function AddSubtractTimeFromTimestampSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            Enter a Unix timestamp (seconds or milliseconds) or a human-readable date. Select whether to add or subtract time, then specify the duration in years, months, days, hours, minutes, or seconds.
          </p>
          <p>
            The calculator performs the arithmetic and displays the resulting timestamp in multiple formats: Unix seconds, Unix milliseconds, ISO 8601 date, and human-readable format with timezone.
          </p>
          <p>
            Chain multiple operations by using the result as input for another calculation. Copy any output format with a single click for use in code, APIs, or documentation.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Token Expiration</h3>
            <p className="text-sm text-muted-foreground">
              Calculate when authentication tokens expire by adding validity duration to issue timestamp.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Scheduled Tasks</h3>
            <p className="text-sm text-muted-foreground">
              Compute future execution times for cron jobs, reminders, or scheduled operations.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Data Retention</h3>
            <p className="text-sm text-muted-foreground">
              Determine deletion dates by adding retention period to creation timestamps.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">SLA Calculations</h3>
            <p className="text-sm text-muted-foreground">
              Calculate response deadlines by adding SLA duration to ticket creation time.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Trial Periods</h3>
            <p className="text-sm text-muted-foreground">
              Find trial expiration dates by adding trial duration to signup timestamp.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Historical Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Calculate past dates for lookback windows in reporting and analytics.
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
              <strong className="text-foreground">Timestamp formats:</strong> Enter Unix seconds (10 digits), milliseconds (13 digits), or any common date format. The tool auto-detects and parses appropriately.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Month arithmetic:</strong> Adding months respects month boundaries. January 31 + 1 month = February 28 (or 29 in leap years).
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">DST handling:</strong> When adding time across daylight saving transitions, the result reflects local time adjustments where applicable.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Negative results:</strong> Subtracting large durations can produce dates before 1970. Negative Unix timestamps are valid and handled correctly.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Timezone awareness:</strong> Input dates without timezone are treated as local time. Results show both local and UTC for clarity.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">How do I add 30 days to a timestamp?</h3>
            <p className="text-sm text-muted-foreground">
              Enter the timestamp, select "Add", enter 30 in the Days field, and calculate. The result shows the new timestamp 30 days later.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What is 90 days from now in Unix time?</h3>
            <p className="text-sm text-muted-foreground">
              Use current timestamp as input, add 90 days. The result is the Unix timestamp for 90 days from today.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I subtract time from a timestamp?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Select "Subtract" mode and enter the duration. Useful for calculating past dates or lookback periods.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I calculate token expiration?</h3>
            <p className="text-sm text-muted-foreground">
              Add the token validity (e.g., 3600 seconds for 1 hour) to the issue timestamp. The result is when the token expires.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What happens at month boundaries?</h3>
            <p className="text-sm text-muted-foreground">
              Adding months preserves the day when possible. January 31 + 1 month = February 28. March 31 + 1 month = April 30.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I add hours and minutes?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Enter values in the Hours and/or Minutes fields. Multiple units are summed before applying to the timestamp.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How precise is the calculation?</h3>
            <p className="text-sm text-muted-foreground">
              Calculations are precise to the second (or millisecond if input is millisecond timestamp). No rounding or approximation in the arithmetic.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
