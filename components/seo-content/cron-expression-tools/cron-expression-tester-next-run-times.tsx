import React from "react"

export default function CronExpressionTesterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Testing Cron Expressions with Next Run Times</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            The cron tester calculates the next scheduled execution times for any cron expression. Instead of mentally parsing <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">*/15 * * * *</code>, you see actual dates: "2026-03-18 10:00:00", "2026-03-18 10:15:00", "2026-03-18 10:30:00".
          </p>
          <p>
            The tool parses your cron expression, validates the format (5-field or 6-field with seconds), then iterates forward from a start date to find matching times. It handles all cron syntax: wildcards (<code className="font-mono text-xs">*</code>), ranges (<code className="font-mono text-xs">1-5</code>), lists (<code className="font-mono text-xs">1,15,30</code>), and step values (<code className="font-mono text-xs">*/10</code>).
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Cron field reference:</p>
            <div className="text-sm space-y-1 font-mono">
              <div className="flex justify-between"><span>Minute</span> <span>0-59</span></div>
              <div className="flex justify-between"><span>Hour</span> <span>0-23</span></div>
              <div className="flex justify-between"><span>Day of month</span> <span>1-31</span></div>
              <div className="flex justify-between"><span>Month</span> <span>1-12</span></div>
              <div className="flex justify-between"><span>Day of week</span> <span>0-7 (0 or 7 = Sunday)</span></div>
            </div>
          </div>
          <p>
            Testing catches mistakes before they cause production issues. That expression meant to run at 9 AM on weekdays? The tester reveals it actually runs at 9 PM, or on weekends too.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Verifying complex cron expressions</h3>
            <p className="text-sm text-muted-foreground">
              You wrote <code className="font-mono text-xs">0 0 1,15 * 1</code> expecting "1st and 15th plus Mondays". The tester shows it runs on the 1st, 15th, AND every Monday—revealing the OR logic you forgot about.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging missed cron executions</h3>
            <p className="text-sm text-muted-foreground">
              Your backup didn't run last night. Test the expression to confirm it was supposed to run, or discover the cron syntax was wrong and never matched.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Planning job frequency</h3>
            <p className="text-sm text-muted-foreground">
              Deciding between <code className="font-mono text-xs">*/5</code> and <code className="font-mono text-xs">*/10</code> minute intervals? Run both through the tester to see how many executions per day each produces.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Validating expressions from documentation</h3>
            <p className="text-sm text-muted-foreground">
              Copying a cron expression from Stack Overflow? Test it first to ensure it does what the answer claims, not what it literally says.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Teaching cron syntax</h3>
            <p className="text-sm text-muted-foreground">
              New to cron? Experiment with different expressions and immediately see the schedule. Much faster than memorizing field positions and operator meanings.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Pre-deployment validation</h3>
            <p className="text-sm text-muted-foreground">
              Before adding a cron job to production crontab, test the expression. Catch typos like <code className="font-mono text-xs">0 25 * * *</code> (invalid hour) before they cause confusion.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Day-of-month and day-of-week use OR logic.</strong>
              If both fields are restricted (not <code className="font-mono text-xs">*</code>), the job runs when EITHER matches. <code className="font-mono text-xs">0 0 15 * 1</code> runs on the 15th AND every Monday, not just Mondays that fall on the 15th.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Timezone depends on your system.</strong>
              Cron uses the server's timezone, not UTC (unless configured). The tester shows times in your local timezone—verify your server uses the same.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Step values start from the minimum.</strong>
              <code className="font-mono text-xs">*/15</code> in minutes means 0, 15, 30, 45—not 15, 30, 45, 60. Step ranges like <code className="font-mono text-xs">5-55/10</code> give you 5, 15, 25, 35, 45, 55.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some cron implementations differ.</strong>
              Standard cron uses 5 fields. Some systems (Systemd, Quartz) support 6 fields with seconds. The tester handles both—select the appropriate mode.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Test edge cases—midnight (<code className="font-mono text-xs">0 0 * * *</code>), month boundaries, and day-of-week transitions. Many bugs hide in off-by-one errors around midnight or Sunday/Monday.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I run a cron job every 10 minutes?</h3>
            <p className="text-sm text-muted-foreground">
              Use <code className="font-mono text-xs">*/10 * * * *</code>. This runs at :00, :10, :20, :30, :40, :50 every hour. Not <code className="font-mono text-xs">0/10</code>—that's invalid syntax.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does 0 0 * * 0 mean?</h3>
            <p className="text-sm text-muted-foreground">
              Midnight (00:00) every Sunday. The last <code className="font-mono text-xs">0</code> is Sunday (both 0 and 7 represent Sunday). Some systems use 1-7 for Mon-Sun instead.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I schedule a job for the last day of each month?</h3>
            <p className="text-sm text-muted-foreground">
              Standard cron can't directly express "last day". Workarounds: run daily and check in-script if it's month-end, or use <code className="font-mono text-xs">0 0 28-31 * *</code> and filter months with fewer days in the script.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why isn't my cron job running?</h3>
            <p className="text-sm text-muted-foreground">
              Common issues: wrong timezone, script not executable, missing PATH in crontab, or the expression doesn't match when you expect. Test the expression first, then check system logs (<code className="font-mono text-xs">grep CRON /var/log/syslog</code>).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I run a job every weekday at 9 AM?</h3>
            <p className="text-sm text-muted-foreground">
              <code className="font-mono text-xs">0 9 * * 1-5</code> — minute 0, hour 9, any day of month, any month, days 1-5 (Monday through Friday).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between 5-field and 6-field cron?</h3>
            <p className="text-sm text-muted-foreground">
              Standard cron uses 5 fields (minute through day-of-week). Extended formats add a seconds field at the start (6 fields) or year field at the end (7 fields). Match your system's expected format.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
