import React from "react"

export default function CronToEnglishTranslatorSEO() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How the CRON to English Translator Works</h2>
        <div className="prose prose-sm dark:prose-invert">
          <p className="text-muted-foreground">
            This tool parses CRON expressions and converts them into plain English sentences.
            It analyzes each of the five (or six) fields and translates the technical syntax into human-readable schedule descriptions.
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <h3 className="text-lg font-semibold">Translation Process</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Paste or enter a CRON expression (e.g., &quot;0 9 * * 1-5&quot;)</li>
            <li>The parser breaks down each field: minute, hour, day, month, weekday</li>
            <li>Special syntax like */15 (step), 1-5 (range), or 1,15 (list) is interpreted</li>
            <li>The tool generates a natural English sentence describing the schedule</li>
            <li>A detailed breakdown shows what each field means individually</li>
          </ol>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Specific Use Cases</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Code Review for Schedule Changes</h3>
            <p className="text-sm text-muted-foreground">
              A developer reviewing a pull request sees a cron expression changed from &quot;0 0 * * *&quot; to &quot;0 0 * * 0&quot;.
              They use this tool to quickly confirm it changed from &quot;daily at midnight&quot; to &quot;weekly on Sunday at midnight&quot;.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Documentation Writing</h3>
            <p className="text-sm text-muted-foreground">
              A technical writer needs to explain scheduled job timings in user documentation without confusing readers with CRON syntax.
              They paste the expressions and copy the English translations directly into the docs.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">On-Call Engineer Investigating Alerts</h3>
            <p className="text-sm text-muted-foreground">
              During an incident, an engineer finds multiple cron jobs in the system. They quickly translate each expression to understand
              which jobs might have run during the incident window.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Learning CRON Syntax</h3>
            <p className="text-sm text-muted-foreground">
              A junior developer studying for a certification exam uses this tool to check their understanding.
              They guess what an expression means, then verify with the translation.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Migration Planning</h3>
            <p className="text-sm text-muted-foreground">
              A team migrating from one scheduler to another needs to document all existing cron schedules.
              This tool helps them create a readable inventory of when each job runs.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using This Tool</h2>
        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <p className="text-muted-foreground">
            Understanding how the translator handles different CRON patterns:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Supports standard 5-field CRON (minute, hour, day, month, weekday)</li>
            <li>Optional 6-field mode includes seconds for systems that support it</li>
            <li>Step values (*/15) translate to &quot;every 15 minutes/hours&quot;</li>
            <li>Ranges (9-17) become &quot;from 9 to 17&quot; or &quot;9 AM to 5 PM&quot;</li>
            <li>Lists (1,15) translate to &quot;on days 1 and 15&quot; or &quot;at minutes 1 and 15&quot;</li>
            <li>Complex expressions with multiple special characters are fully parsed</li>
            <li>The detailed breakdown shows each field&apos;s contribution to the schedule</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What does &quot;*/15 * * * *&quot; mean?</h3>
            <p className="text-sm text-muted-foreground">
              This runs every 15 minutes. The */15 in the minute field means &quot;every 15 minutes starting from 0&quot;,
              so the job executes at :00, :15, :30, and :45 of every hour.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">How do I read &quot;0 9-17 * * 1-5&quot;?</h3>
            <p className="text-sm text-muted-foreground">
              This runs every hour from 9 AM to 5 PM (17:00), Monday through Friday.
              It&apos;s commonly used for business-hours monitoring or weekday-only tasks.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What&apos;s the difference between &quot;0 0 1 * *&quot; and &quot;0 0 * * 1&quot;?</h3>
            <p className="text-sm text-muted-foreground">
              The first (&quot;0 0 1 * *&quot;) runs on the 1st day of every month at midnight.
              The second (&quot;0 0 * * 1&quot;) runs every Monday at midnight.
              Field 3 is day-of-month, field 5 is day-of-week.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Can this handle 6-field CRON expressions?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, toggle the &quot;6-field mode&quot; switch to include seconds as the first field.
              This is used by some schedulers like Spring @Scheduled or certain CI/CD platforms.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What does &quot;30 4 1,15 * *&quot; translate to?</h3>
            <p className="text-sm text-muted-foreground">
              This runs at 4:30 AM on the 1st and 15th of every month.
              The comma-separated values in the day field create a list of specific days.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Why does my translation say &quot;every minute&quot;?</h3>
            <p className="text-sm text-muted-foreground">
              If all five fields are asterisks (&quot;* * * * *&quot;), the job runs every minute of every hour of every day.
              This is valid but often unintentional - double-check your expression.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">CRON Field Reference</h2>
        <div className="rounded-lg border bg-muted/30 p-6">
          <div className="grid sm:grid-cols-5 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Field 1</div>
              <div className="font-mono font-bold">Minute</div>
              <div className="text-xs text-muted-foreground">0-59</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Field 2</div>
              <div className="font-mono font-bold">Hour</div>
              <div className="text-xs text-muted-foreground">0-23</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Field 3</div>
              <div className="font-mono font-bold">Day</div>
              <div className="text-xs text-muted-foreground">1-31</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Field 4</div>
              <div className="font-mono font-bold">Month</div>
              <div className="text-xs text-muted-foreground">1-12</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Field 5</div>
              <div className="font-mono font-bold">Weekday</div>
              <div className="text-xs text-muted-foreground">0-6</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
