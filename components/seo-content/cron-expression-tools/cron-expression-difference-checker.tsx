import React from "react"

export default function CronExpressionDifferenceCheckerSEO() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How the CRON Difference Checker Works</h2>
        <div className="prose prose-sm dark:prose-invert">
          <p className="text-muted-foreground">
            This tool compares two CRON expressions side-by-side and identifies exactly where they differ.
            It breaks down each of the five fields and shows whether the schedules overlap, conflict, or run at completely different times.
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <h3 className="text-lg font-semibold">Comparison Analysis</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Enter two CRON expressions to compare</li>
            <li>Each field (minute, hour, day, month, weekday) is parsed and compared</li>
            <li>The tool generates a 24-hour timeline showing when each expression executes</li>
            <li>Overlapping execution times are highlighted</li>
            <li>A summary explains whether the expressions are identical, different, or partially overlapping</li>
          </ol>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Specific Use Cases</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Migrating Scheduled Jobs</h3>
            <p className="text-sm text-muted-foreground">
              A DevOps engineer is moving from Jenkins to GitHub Actions and needs to verify the new schedule matches the old one exactly.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Debugging Duplicate Runs</h3>
            <p className="text-sm text-muted-foreground">
              A developer notices their backup script runs twice on some days. They compare the two cron entries to find the overlap.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Coordinating Multiple Services</h3>
            <p className="text-sm text-muted-foreground">
              A system administrator manages cron jobs across three servers and needs to ensure they don&apos;t all hit the database simultaneously.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Code Review for Schedule Changes</h3>
            <p className="text-sm text-muted-foreground">
              During a PR review, a teammate changes a cron schedule from &quot;0 9 * * 1-5&quot; to &quot;0 10 * * 1-5&quot;. The reviewer uses this tool to confirm the one-hour shift.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Audit Compliance Checks</h3>
            <p className="text-sm text-muted-foreground">
              An auditor needs to verify that security scans run at different times than backup jobs to avoid resource contention.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using This Tool</h2>
        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <p className="text-muted-foreground">
            Understanding the comparison results helps you make better scheduling decisions:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Identical expressions will show &quot;no difference&quot; across all fields</li>
            <li>Expressions with different fields may still overlap (e.g., &quot;0 9 * * *&quot; and &quot;0 9 * * 1-5&quot; overlap on weekdays)</li>
            <li>The 24-hour timeline only shows hour-level granularity, not minute-level</li>
            <li>Complex expressions with lists (1,3,5) or ranges (1-5) are fully parsed</li>
            <li>Step values (*/15) are expanded for comparison</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What does &quot;overlapping execution times&quot; mean?</h3>
            <p className="text-sm text-muted-foreground">
              Two CRON expressions overlap when they both trigger at the same time. For example, &quot;0 9 * * *&quot; (daily at 9 AM)
              and &quot;0 9 * * 1-5&quot; (weekdays at 9 AM) overlap every weekday at 9 AM.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Can this compare expressions with different field counts?</h3>
            <p className="text-sm text-muted-foreground">
              No, both expressions must use the same format (standard 5-field CRON). Six-field expressions with seconds aren&apos;t supported.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">How accurate is the overlap detection?</h3>
            <p className="text-sm text-muted-foreground">
              The tool analyzes the hour field to determine overlaps. For minute-level precision, you&apos;ll need to manually check expressions that share the same hours.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What if one expression uses &quot;*&quot; and the other uses specific values?</h3>
            <p className="text-sm text-muted-foreground">
              The tool will show them as different and indicate that the &quot;*&quot; expression encompasses the specific one.
              For example, &quot;* 9 * * *&quot; runs every minute from 9:00-9:59, overlapping with &quot;30 9 * * *&quot; at 9:30.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Can I compare more than two expressions at once?</h3>
            <p className="text-sm text-muted-foreground">
              This tool compares two expressions at a time. For multiple comparisons, run separate comparisons or use a scheduling visualization tool.
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
