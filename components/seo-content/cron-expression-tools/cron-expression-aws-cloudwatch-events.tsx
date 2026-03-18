import React from "react"

export default function CronExpressionAwsCloudwatchEventsSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How AWS CloudWatch Events Cron Expressions Work</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool generates and validates cron expressions specifically for AWS CloudWatch Events (EventBridge). AWS uses a slightly different cron format than standard Unix cron - understanding the differences ensures your scheduled events trigger correctly.
          </p>
          <p>
            AWS cron expressions have 6 fields: Minute, Hour, Day-of-month, Month, Day-of-week, and Year. The Year field is unique to AWS - standard cron doesn't have it. AWS also uses different special characters and has specific rules for wildcards.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">AWS cron expression format:</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li><strong>Minute:</strong> 0-59</li>
              <li><strong>Hour:</strong> 0-23</li>
              <li><strong>Day-of-month:</strong> 1-31</li>
              <li><strong>Month:</strong> 1-12 or JAN-DEC</li>
              <li><strong>Day-of-week:</strong> 1-7 or SUN-SAT (1=Sunday)</li>
              <li><strong>Year:</strong> 1970-2199</li>
            </ul>
          </div>
          <p>
            Common use cases include running Lambda functions on schedules, triggering ECS tasks, automating backups, and periodic data processing. The generator helps you create correct expressions for these scenarios.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Scheduling Lambda functions</h3>
            <p className="text-sm text-muted-foreground">
              Need to run a Lambda every day at 3 AM UTC? Generate the cron expression: <code>cron(0 3 * * ? *)</code>. Use in EventBridge rule to trigger your function automatically.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Automating RDS snapshots</h3>
            <p className="text-sm text-muted-foreground">
              Schedule automated database backups. Create snapshots every 6 hours: <code>cron(0 0/6 ? * * *)</code>. Ensures point-in-time recovery options throughout the day.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Running periodic data exports</h3>
            <p className="text-sm text-muted-foreground">
              Export data to S3 every Monday at 6 AM: <code>cron(0 6 ? * MON *)</code>. Weekly reports, data warehouse syncs, and compliance exports all use scheduled events.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Cleanup and maintenance tasks</h3>
            <p className="text-sm text-muted-foreground">
              Delete old temp files on 1st of each month: <code>cron(0 0 1 * ? *)</code>. Automated cleanup prevents storage bloat and reduces costs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Business hours notifications</h3>
            <p className="text-sm text-muted-foreground">
              Send daily digest at 9 AM on weekdays only: <code>cron(0 9 ? * MON-FRI *)</code>. Weekend suppression ensures no unnecessary notifications.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">End-of-month processing</h3>
            <p className="text-sm text-muted-foreground">
              Run billing calculations on last day of month: <code>cron(0 23 L * ? *)</code>. The 'L' wildcard means last day of month, handling 28-31 day variations automatically.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">AWS uses ? for either day field.</strong>
              You can't specify both Day-of-month and Day-of-week. Use ? in one field when specifying the other. <code>cron(0 0 1 * ? *)</code> (1st of month) not <code>cron(0 0 1 * 1 *)</code>.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Day-of-week: 1=Sunday in AWS.</strong>
              Unlike some systems where 1=Monday, AWS uses 1=Sunday, 7=Saturday. This trips up many users. Use SUN-SAT names for clarity.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Year field is required.</strong>
              Standard cron has 5 fields, AWS has 6. Don't forget the Year field. Use * for every year, or specify a range like 2024-2025.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Timezone is UTC only.</strong>
              CloudWatch Events always use UTC. A 9 AM schedule runs at 9 AM UTC, not your local time. Convert your local time to UTC for the expression.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Test cron expressions in the EventBridge console before deploying. Use "Matched events" to verify your expression triggers at expected times.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between AWS cron and Unix cron?</h3>
            <p className="text-sm text-muted-foreground">
              AWS has 6 fields (includes Year), Unix has 5. AWS uses ? for "no specific value". AWS day-of-week starts with 1=Sunday. AWS supports L (last) and W (nearest weekday) wildcards.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I run something every 5 minutes?</h3>
            <p className="text-sm text-muted-foreground">
              Use <code>rate(5 minutes)</code> instead of cron for sub-hour intervals. For cron: <code>cron(0/5 * ? * * *)</code> but rate expressions are simpler for this use case.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I schedule at specific times on specific days?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. 9 AM on Mondays and Fridays: <code>cron(0 9 ? * MON,FRI *)</code>. Multiple values use commas. Ranges use hyphens (MON-FRI).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does the ? wildcard mean?</h3>
            <p className="text-sm text-muted-foreground">
              ? means "no specific value". Use it in Day-of-month when you specify Day-of-week, or vice versa. You can't have specific values in both fields.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I run on the last day of each month?</h3>
            <p className="text-sm text-muted-foreground">
              Use L in Day-of-month field: <code>cron(0 23 L * ? *)</code> runs at 11 PM on the last day of every month. Works for 28, 29, 30, and 31 day months.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use cron for one-time events?</h3>
            <p className="text-sm text-muted-foreground">
              Cron is for recurring schedules. For one-time events, use EventBridge scheduled events with a specific date/time, or use EventBridge Pipes with a schedule.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What timezone does AWS cron use?</h3>
            <p className="text-sm text-muted-foreground">
              Always UTC. There's no timezone field in AWS cron expressions. Convert your local time to UTC before creating the expression. Consider DST changes when scheduling.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
