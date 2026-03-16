import React from "react"

export default function CronExpressionCheatSheetSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How to Use This CRON Cheat Sheet</h2>

        <div className="space-y-3 text-muted-foreground">
          <p>
            This reference collects common CRON patterns organized by frequency and use case.
            Instead of building expressions from scratch, find a pattern close to what you
            need and copy it directly.
          </p>

          <p>
            The syntax rules section explains what each special character does. Understanding
            these five characters lets you modify any pattern or build custom expressions:
            asterisk (*), comma (,), hyphen (-), slash (/), and question mark (?).
          </p>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Quick reference for special characters:</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">*</code>
                <span>Any value - matches everything in that field</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">,</code>
                <span>Value separator - specifies multiple discrete values</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">-</code>
                <span>Range - specifies a continuous span of values</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-muted">
                <code className="font-mono bg-background px-2 py-1 rounded">/</code>
                <span>Step - specifies increments within a range</span>
              </div>
            </div>
          </div>

          <p>
            Search filters patterns by CRON expression, description, use case, or category.
            Type "hourly" to see all hourly patterns, or "Monday" to find Monday-specific
            schedules.
          </p>
        </div>
      </section>

      {/* Specific Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Quick lookup during incident response</h3>
            <p className="text-sm text-muted-foreground">
              At 2 AM debugging why a job didn't run, an on-call engineer searches "daily
              midnight" to confirm the expression should have triggered. The cheat sheet
              provides instant answers without digging through documentation.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building a new scheduling configuration</h3>
            <p className="text-sm text-muted-foreground">
              A developer setting up automated tasks browses the "Daily Patterns" section,
              finds "0 9 * * *" for 9 AM execution, and copies it directly instead of
              calculating the fields manually.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Code review for CRON expressions</h3>
            <p className="text-sm text-muted-foreground">
              A reviewer sees "0 */6 * * *" in a pull request and wants to verify it's
              correct. They check the cheat sheet to confirm it means "every 6 hours"
              before approving the change.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Writing deployment documentation</h3>
            <p className="text-sm text-muted-foreground">
              A technical writer creates setup instructions that include recommended
              schedules. They reference the cheat sheet to ensure all example expressions
              are correct and follow best practices.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning CRON syntax by example</h3>
            <p className="text-sm text-muted-foreground">
              A junior developer studying scheduled tasks looks at patterns like "*/15 * * * *"
              and "0 0 1 * *" to understand how different combinations of special characters
              create different schedules.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Migrating schedules between systems</h3>
            <p className="text-sm text-muted-foreground">
              An ops team moves from Windows Task Scheduler to Linux CRON. They use the
              cheat sheet to find equivalent expressions for their existing schedules,
              ensuring nothing changes during the migration.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know About CRON Patterns</h2>

        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Field order is fixed and easy to mix up.</strong>
              The order is: minute, hour, day-of-month, month, day-of-week. It's not
              intuitive—many people expect hour before minute or day before month.
              Remember: smallest unit to largest (mostly).
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Step values start from the minimum, not zero.</strong>
              "*/15" in minutes gives 0, 15, 30, 45. But "10-50/10" gives 10, 20, 30, 40, 50—
              it starts from the range start, not zero. This matters for off-peak scheduling.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Day fields use OR logic when both specified.</strong>
              If you set both day-of-month (15) and day-of-week (1), the job runs on the
              15th of any month AND every Monday. Use "*" in one field if you want both
              conditions to be required.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some patterns look similar but behave differently.</strong>
              "0 * * * *" (every hour at :00) vs "0 */1 * * *" (also every hour at :00) vs
              "* * * * *" (every minute). The middle one is redundant—*/1 is the same as *.
            </p>
          </div>

          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> When combining ranges and steps like "0-30/10",
              the step applies within the range. This gives 0, 10, 20, 30—not 0, 10, 20,
              30, 40, 50. The range bounds the step.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the most common CRON expression?</h3>
            <p className="text-sm text-muted-foreground">
              "0 0 * * *" (daily at midnight) and "0 * * * *" (every hour) are extremely
              common. For development and testing, "* * * * *" (every minute) is frequently
              used despite being aggressive for production.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I schedule something every 2 hours?</h3>
            <p className="text-sm text-muted-foreground">
              Use "0 */2 * * *". This runs at minute 0 of every 2nd hour: 12 AM, 2 AM, 4 AM,
              6 AM, 8 AM, 10 AM, noon, 2 PM, 4 PM, 6 PM, 8 PM, 10 PM. For every 2 hours
              during business hours only, use "0 */2 9-17 * * 1-5".
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does "0 0 L * *" mean?</h3>
            <p className="text-sm text-muted-foreground">
              The "L" stands for "last" and means the last day of the month. However, this
              is a non-standard extension supported by some CRON implementations like
              Quartz. Standard Unix CRON doesn't support "L"—you'd need to use "0 0 28-31 * *"
              and check the date in your script.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I run something every weekday at 9 AM?</h3>
            <p className="text-sm text-muted-foreground">
              Use "0 9 * * 1-5". This breaks down as: minute 0, hour 9 (9 AM), any day of
              month, any month, days 1-5 (Monday through Friday). It's one of the most
              common business scheduling patterns.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I combine multiple times in one expression?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, use commas to list specific values. "0 9,14,17 * * *" runs at 9 AM, 2 PM,
              and 5 PM daily. "0 9 * * 1,3,5" runs at 9 AM on Monday, Wednesday, and Friday.
              You can combine this with ranges: "0 9-12,14-17 * * 1-5" for business hours.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between daily and every 24 hours?</h3>
            <p className="text-sm text-muted-foreground">
              There's no practical difference in CRON—"0 0 * * *" runs once per day at
              midnight. CRON is calendar-based, not interval-based. There's no way to say
              "24 hours after the last run"—it's always tied to clock time.
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I schedule quarterly tasks?</h3>
            <p className="text-sm text-muted-foreground">
              Use "0 0 1 1,4,7,10 *" which runs at midnight on January 1st, April 1st,
              July 1st, and October 1st—the first day of each quarter. For end-of-quarter,
              you'd need to handle the varying last dates in your script.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
