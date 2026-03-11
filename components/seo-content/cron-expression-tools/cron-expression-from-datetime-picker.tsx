import React from "react"

export default function CronExpressionFromDateTimePickerSEO() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How the CRON from Date/Time Picker Works</h2>
        <div className="prose prose-sm dark:prose-invert">
          <p className="text-muted-foreground">
            This visual scheduler lets you build CRON expressions using familiar date and time pickers instead of manual syntax entry.
            Select a date, choose a time, pick a recurrence pattern, and the tool generates the corresponding CRON expression automatically.
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <h3 className="text-lg font-semibold">Schedule Building Process</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Choose between &quot;Recurring Schedule&quot; or &quot;One-Time Execution&quot; mode</li>
            <li>Select the date using the calendar picker (for reference or one-time execution)</li>
            <li>Pick the time using the time picker or quick-select buttons (Midnight, 9 AM, Noon, etc.)</li>
            <li>For recurring schedules, select the pattern: Daily, Weekly, Monthly, or Yearly</li>
            <li>Configure pattern-specific options (days of week, day of month, specific date)</li>
            <li>View the generated CRON expression and human-readable description in the Preview tab</li>
          </ol>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Specific Use Cases</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Setting Up Monthly Reports</h3>
            <p className="text-sm text-muted-foreground">
              A business analyst needs to generate reports on the 1st and 15th of each month at 6 AM.
              They select &quot;Monthly&quot;, pick the 1st, and get the CRON expression without memorizing day-field syntax.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Configuring Weekday-Only Jobs</h3>
            <p className="text-sm text-muted-foreground">
              A DevOps engineer needs backups to run only on weekdays at 11 PM.
              They click the &quot;Weekly&quot; option, select Monday through Friday, and instantly get &quot;0 23 * * 1-5&quot;.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Annual Maintenance Windows</h3>
            <p className="text-sm text-muted-foreground">
              A system administrator schedules annual certificate renewals for January 15th at 2 AM.
              The &quot;Yearly&quot; pattern lets them pick the exact month and day visually.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Testing Scheduled Jobs Before Deployment</h3>
            <p className="text-sm text-muted-foreground">
              A developer wants to verify their cron job timing before deploying to production.
              They use the picker to confirm the expression matches their intended schedule.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Quick Daily Task Setup</h3>
            <p className="text-sm text-muted-foreground">
              Someone needs a daily sync job at 3 PM. They select &quot;Daily&quot;, click the &quot;3 PM&quot; quick button,
              and copy the generated expression without thinking about CRON fields.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using This Tool</h2>
        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <p className="text-muted-foreground">
            Important details about how the picker generates CRON expressions:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>One-time execution still generates a recurring CRON (CRON doesn&apos;t support true one-time jobs)</li>
            <li>For true one-time execution, you&apos;ll need to disable the job after it runs</li>
            <li>The &quot;Next 5 Execution Times&quot; preview helps verify the schedule is correct</li>
            <li>Weekly pattern lets you select multiple days (e.g., Mon/Wed/Fri for MWF schedules)</li>
            <li>Monthly pattern supports any day from 1-31 (be aware months have different lengths)</li>
            <li>Quick time buttons provide common times: Midnight, 6 AM, 9 AM, Noon, 3 PM, 6 PM, 9 PM</li>
            <li>The Preview tab shows both the CRON expression and a human-readable explanation</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Can I schedule a job for a specific one-time date?</h3>
            <p className="text-sm text-muted-foreground">
              CRON itself doesn&apos;t support one-time execution - it&apos;s designed for recurring schedules.
              This tool generates a daily CRON for one-time mode. For true one-time jobs, use &quot;at&quot; commands or cloud scheduler one-time features.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What happens if I schedule for the 31st but the month has 30 days?</h3>
            <p className="text-sm text-muted-foreground">
              CRON simply skips months that don&apos;t have the specified day. A job scheduled for the 31st runs only in months with 31 days
              (January, March, May, July, August, October, December).
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">How do I schedule something for the last Friday of each month?</h3>
            <p className="text-sm text-muted-foreground">
              Standard CRON doesn&apos;t support &quot;last Friday&quot; directly. You&apos;d need to use a script that checks if the current Friday
              is the last one, or use a more advanced scheduler that supports this syntax.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What timezone does the generated CRON use?</h3>
            <p className="text-sm text-muted-foreground">
              CRON expressions don&apos;t include timezone information. The cron daemon uses the system&apos;s local timezone.
              For cloud schedulers, check their documentation - many use UTC by default.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Can I select multiple days for weekly schedules?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, click individual day buttons to select multiple days. Quick-select buttons are also available for &quot;Weekdays&quot; (Mon-Fri),
              &quot;Weekends&quot; (Sat-Sun), or &quot;Every Day&quot;.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">How accurate is the &quot;Next 5 Execution Times&quot; preview?</h3>
            <p className="text-sm text-muted-foreground">
              The preview calculates based on the daily recurrence of the selected time. For simple schedules (daily, weekly, monthly),
              it&apos;s accurate. Complex expressions with multiple field constraints may need manual verification.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
