import React from "react"

export default function CronExpressionEditorGuiSEO() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How the CRON Expression Editor Works</h2>
        <div className="prose prose-sm dark:prose-invert">
          <p className="text-muted-foreground">
            This interactive GUI builder lets you construct CRON expressions using visual controls instead of memorizing syntax.
            Each of the five CRON fields (minute, hour, day of month, month, day of week) has dedicated controls with sliders, buttons, and presets.
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <h3 className="text-lg font-semibold">Building Your Schedule</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Select the field you want to configure (minute, hour, day, month, or weekday)</li>
            <li>Choose a mode: &quot;Every&quot; for all values, &quot;Every N&quot; for step intervals, &quot;Specific&quot; for exact values, or &quot;Range&quot; for a span</li>
            <li>Use sliders to adjust ranges or click buttons to select specific values</li>
            <li>Watch the live preview update as you make changes</li>
            <li>Copy the generated CRON expression or read the human-readable explanation</li>
          </ol>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Who Uses This Tool</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">DevOps Engineers Setting Up New Jobs</h3>
            <p className="text-sm text-muted-foreground">
              Instead of looking up CRON syntax documentation, they use the GUI to visually build schedules for backup jobs, health checks, or deployment triggers.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Developers Testing Scheduled Tasks</h3>
            <p className="text-sm text-muted-foreground">
              When debugging why a cron job isn&apos;t running as expected, they use this tool to verify their expression matches the intended schedule.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">System Administrators Managing Multiple Servers</h3>
            <p className="text-sm text-muted-foreground">
              They need to coordinate cron jobs across different machines without having them all run simultaneously and overload shared resources.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Students Learning CRON Syntax</h3>
            <p className="text-sm text-muted-foreground">
              The visual interface helps them understand how each field affects the schedule, making it easier to memorize the syntax over time.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using This Tool</h2>
        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <p className="text-muted-foreground">
            Understanding the tool&apos;s capabilities and limitations helps you use it effectively:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Uses standard 5-field CRON format (minute, hour, day, month, weekday)</li>
            <li>Minute field supports values 0-59, hour 0-23, day 1-31, month 1-12, weekday 0-6 (0=Sunday)</li>
            <li>Step values (*/15) are available for minute and hour fields</li>
            <li>Range selections create hyphenated expressions (9-17 for business hours)</li>
            <li>Specific value selections create comma-separated lists (1,15 for twice monthly)</li>
            <li>The human-readable explanation updates in real-time as you change fields</li>
            <li>Quick presets are available for common schedules like &quot;Every 5 minutes&quot; or &quot;Weekdays at 9 AM&quot;</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What does the &quot;Every N&quot; option do?</h3>
            <p className="text-sm text-muted-foreground">
              It creates a step value using the / syntax. For example, &quot;Every 15 minutes&quot; generates &quot;*/15&quot; in the minute field,
              meaning the job runs at minutes 0, 15, 30, and 45 of every hour.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Can I specify both day of month AND day of week?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but be aware that standard CRON uses OR logic between these fields. If you set day=15 AND weekday=1 (Monday),
              the job runs on the 15th of any month OR any Monday, not just Mondays that fall on the 15th.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">How do I schedule something for the last day of the month?</h3>
            <p className="text-sm text-muted-foreground">
              Standard CRON doesn&apos;t support &quot;last day&quot; directly. A common workaround is to use day 28-31 and have your script check
              if tomorrow is the 1st of the month, exiting early if it&apos;s not.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What timezone does CRON use?</h3>
            <p className="text-sm text-muted-foreground">
              CRON expressions themselves don&apos;t include timezone information. The cron daemon uses the system&apos;s local timezone.
              For cloud schedulers, check their documentation - some use UTC by default.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Can I use this for GitHub Actions or GitLab CI schedules?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, both GitHub Actions and GitLab CI use standard 5-field CRON syntax for their scheduled workflows.
              The expressions generated here work directly in their schedule configuration.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What&apos;s the difference between &quot;0 9 * * *&quot; and &quot;0 9 * * 1-5&quot;?</h3>
            <p className="text-sm text-muted-foreground">
              The first runs every day at 9 AM. The second runs only on weekdays (Monday through Friday) at 9 AM.
              The fifth field controls which days of the week the job executes.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
