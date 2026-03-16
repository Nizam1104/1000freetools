import React from "react"

export default function EnglishToCronConverterSEO() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How the English to CRON Converter Works</h2>
        <div className="prose prose-sm dark:prose-invert">
          <p className="text-muted-foreground">
            This tool parses natural language descriptions and converts them into valid CRON expressions.
            Instead of memorizing the five-field CRON format, you describe when you want a task to run in plain English.
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <h3 className="text-lg font-semibold">The Conversion Process</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Enter your schedule description (e.g., &quot;Every day at 3:30 PM&quot;)</li>
            <li>The parser identifies time patterns: hours, minutes, days, months</li>
            <li>Special phrases like &quot;midnight&quot;, &quot;noon&quot;, &quot;weekdays&quot; are recognized</li>
            <li>The tool builds the five-field CRON expression: minute, hour, day, month, weekday</li>
            <li>Results show both the CRON expression and a breakdown of each field</li>
          </ol>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Who Needs This Tool</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">DevOps Engineers</h3>
            <p className="text-sm text-muted-foreground">
              Setting up cron jobs for server maintenance, log rotation, or backup scripts without looking up CRON syntax.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">System Administrators</h3>
            <p className="text-sm text-muted-foreground">
              Configuring automated tasks like database cleanup, report generation, or monitoring checks.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Developers</h3>
            <p className="text-sm text-muted-foreground">
              Writing scheduled jobs in applications using node-cron, node-schedule, or similar libraries.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Data Engineers</h3>
            <p className="text-sm text-muted-foreground">
              Scheduling ETL pipelines, data sync jobs, or API polling tasks that run at specific intervals.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using This Tool</h2>
        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <p className="text-muted-foreground">
            The converter handles common scheduling patterns but has limitations:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Supports standard 5-field CRON format (minute, hour, day, month, weekday)</li>
            <li>Recognizes phrases like &quot;every 15 minutes&quot;, &quot;at 9 AM&quot;, &quot;on Mondays&quot;</li>
            <li>Complex patterns like &quot;last Friday of the month&quot; may not translate correctly</li>
            <li>Time zone information is not included in CRON expressions</li>
            <li>Always verify the generated expression matches your intended schedule</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What is a CRON expression?</h3>
            <p className="text-sm text-muted-foreground">
              A CRON expression is a 5-field string that defines when a scheduled task runs.
              The fields represent: minute (0-59), hour (0-23), day of month (1-31), month (1-12), and day of week (0-6, where 0 is Sunday).
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Can I use this for non-English schedules?</h3>
            <p className="text-sm text-muted-foreground">
              Currently, the tool only parses English descriptions. For other languages, you&apos;ll need to translate the schedule concept first.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What about special characters like * or /?</h3>
            <p className="text-sm text-muted-foreground">
              The converter automatically generates these. &quot;Every 5 minutes&quot; becomes &quot;*/5&quot;, and &quot;every hour&quot; uses &quot;*&quot; for the minute field.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Does this work with systemd timers or cloud schedulers?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, the generated CRON expressions work with standard cron daemons, systemd timer OnCalendar directives (with some syntax differences),
              GitHub Actions schedules, and cloud provider schedulers like AWS EventBridge.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">How do I schedule something for the last day of the month?</h3>
            <p className="text-sm text-muted-foreground">
              Standard CRON doesn&apos;t support &quot;last day&quot; directly. You&apos;d need to use day 28-31 with a script that checks if the next day is the 1st,
              or use a more advanced scheduler that supports this syntax.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
