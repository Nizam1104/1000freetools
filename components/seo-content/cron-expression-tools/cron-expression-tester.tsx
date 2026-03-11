import React from "react"

export default function CronExpressionTesterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the CRON Expression Tester Works</h2>

        <div className="space-y-3 text-muted-foreground">
          <p>
            This tester simulates CRON expression execution to show you exactly when your
            scheduled task will run. It calculates the next N execution times starting from
            a date you specify.
          </p>

          <p>
            The tool parses your CRON expression field by field, then iterates through
            calendar time checking if each minute matches all five field constraints. When
            all fields align, that's a scheduled execution time.
          </p>

          <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
            <p className="text-sm font-medium">The testing process:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Parse the CRON expression into minute, hour, day, month, and weekday constraints</li>
              <li>Start from your selected date and move forward minute by minute</li>
              <li>Check if current time matches all five field constraints</li>
              <li>When all fields match, record that as an execution time</li>
              <li>Continue until we find the requested number of runs</li>
            </ol>
          </div>

          <p>
            The 5-field format (minute, hour, day, month, weekday) is standard Unix CRON.
            Toggle to 6-field mode if your system includes seconds as the first field.
          </p>
        </div>
      </section>

      {/* Specific Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Verifying complex CRON expressions before deployment</h3>
            <p className="text-sm text-muted-foreground">
              A DevOps engineer wrote "0 0 1,15 * 1" for twice-monthly reports but wants to
              confirm it doesn't conflict with Mondays. The tester shows the exact run dates
              so they can spot issues before it breaks production.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging why a job ran at unexpected times</h3>
            <p className="text-sm text-muted-foreground">
              A scheduled task ran on Saturday when it should only run weekdays. The tester
              reveals the CRON expression had both day-of-month and day-of-week specified,
              creating OR logic instead of AND.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Planning maintenance windows around scheduled jobs</h3>
            <p className="text-sm text-muted-foreground">
              A system administrator needs to schedule downtime without interrupting critical
              jobs. They test their expressions to see all run times for the month and find
              gaps where maintenance is safe.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Confirming business-hours-only scheduling</h3>
            <p className="text-sm text-muted-foreground">
              A developer set up "*/30 9-17 * * 1-5" for half-hourly weekday business hours
              execution. The tester confirms it runs at 9:00, 9:30, 10:00... through 17:00
              and skips evenings and weekends.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing edge cases around month boundaries</h3>
            <p className="text-sm text-muted-foreground">
              Someone scheduled a task for the 31st of each month. The tester shows it only
              runs in months that have 31 days (Jan, Mar, May, Jul, Aug, Oct, Dec), revealing
              a gap they didn't anticipate.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Validating quarterly or annual schedules</h3>
            <p className="text-sm text-muted-foreground">
              A finance team needs reports on the first day of each quarter. Testing
              "0 0 1 1,4,7,10 *" shows exactly four run dates per year, confirming the
              quarterly cadence before they rely on it for compliance reporting.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Testing CRON Expressions</h2>

        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">This is a simulation, not your actual scheduler.</strong>
              The tester shows what SHOULD run based on the expression. Your actual CRON daemon
              might have different behavior due to system configuration, time zone settings, or
              daylight saving time handling.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Day-of-month and day-of-week use OR logic.</strong>
              When both fields are specified (not *), the job runs when EITHER condition is met.
              This catches many people off guard—"0 0 15 * 1" runs on the 15th AND every Monday.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Time zone matters.</strong> CRON uses server time.
              If you're testing in your local timezone but deploying to a UTC server, the actual
              run times will differ. Always verify against your deployment environment's timezone.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">February and short months affect scheduling.</strong>
              Expressions like "0 0 30 * *" only run in months with 30+ days. "0 0 29 2 *" only
              runs in leap years. The tester shows these gaps clearly.
            </p>
          </div>

          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Testing tip:</strong> Start your test from different dates to catch edge
              cases. A schedule might look fine starting from today but behave differently
              near month or year boundaries.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does the tester show different times than my server?</h3>
            <p className="text-sm text-muted-foreground">
              Time zone differences are the most common cause. The tester uses your browser's
              local time. Your server might run UTC or a different timezone. Also check if
              your server observes daylight saving time differently.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many runs should I test?</h3>
            <p className="text-sm text-muted-foreground">
              For daily jobs, test 30+ runs to see a full month. For weekly jobs, test 12+
              runs to cover a quarter. For monthly jobs, test 12 runs to see a full year.
              More runs help catch edge cases around holidays and DST changes.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does "next run" being in the past mean?</h3>
            <p className="text-sm text-muted-foreground">
              If the next scheduled time is before your current time, the job won't run again
              today. This happens with expressions like "0 8 * * *" when it's already past
              8 AM. The next execution will be tomorrow at 8 AM.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I test 6-field CRON expressions with seconds?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, toggle the 5-field/6-field switch. Six-field format adds seconds as the
              first field: "30 * * * * *" runs at 30 seconds past every minute. This format
              is used by some Node.js libraries and enterprise schedulers.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why aren't step values like */15 showing correctly?</h3>
            <p className="text-sm text-muted-foreground">
              Step values divide the valid range. "*/15" in minutes means 0, 15, 30, 45.
              "10-50/10" means 10, 20, 30, 40, 50. If your results don't match, double-check
              the field range—hours are 0-23, not 1-24, which affects step calculations.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I test what ran in the past?</h3>
            <p className="text-sm text-muted-foreground">
              Set the start date to a past date and the tester will calculate forward from
              there. This helps debug historical issues like "why did the job run on that
              Saturday?" by seeing all scheduled times from that period.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What happens at daylight saving time boundaries?</h3>
            <p className="text-sm text-muted-foreground">
              CRON behavior during DST transitions varies by system. Some skip the missing
              hour, some run twice during the repeated hour. The tester shows nominal times
              but your actual system may differ. Test around March and November boundaries.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
