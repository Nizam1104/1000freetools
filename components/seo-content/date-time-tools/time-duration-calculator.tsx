import React from "react"

export default function TimeDurationCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter a start time and end time to calculate the duration between them. Choose between 12-hour (AM/PM) or 24-hour format based on your preference or industry standard.
          </p>
          <p>
            The calculator automatically handles overnight durations. If end time is before start time, it assumes the end is on the following day. Perfect for shift work and overnight events.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Duration calculation example:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">Start: 9:00 AM
End: 5:00 PM
Duration: 8 hours, 0 minutes

Overnight example:
Start: 11:00 PM
End: 7:00 AM
Duration: 8 hours (crosses midnight)</pre>
          </div>
          <p>
            Results show hours, minutes, total minutes, decimal hours, and seconds. Decimal hours are essential for payroll calculations where time converts to monetary values.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Timesheet and payroll</h3>
            <p className="text-sm text-muted-foreground">
              Calculate work hours for pay. Track overtime accurately. Convert to decimal for payroll systems. Verify time card entries.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Shift scheduling</h3>
            <p className="text-sm text-muted-foreground">
              Plan shift lengths. Calculate handover times. Ensure proper coverage. Track break deductions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Meeting duration tracking</h3>
            <p className="text-sm text-muted-foreground">
              Schedule meeting lengths. Calculate available time slots. Plan agenda timing. Avoid overbooking rooms.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Cooking and baking</h3>
            <p className="text-sm text-muted-foreground">
              Time recipe steps. Calculate total cook time. Plan meal prep. Coordinate multiple dishes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Travel time estimation</h3>
            <p className="text-sm text-muted-foreground">
              Calculate flight durations. Plan drive times. Estimate arrival. Coordinate connections.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Media and content length</h3>
            <p className="text-sm text-muted-foreground">
              Time video segments. Calculate podcast length. Plan broadcast slots. Edit to exact duration.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Overnight shifts are automatic.</strong>
              End time before start time assumes next day. 10 PM to 6 AM calculates as 8 hours. No special setting needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Decimal hours matter for payroll.</strong>
              7 hours 30 minutes = 7.5 hours. Payroll systems use decimals. 15 minutes = 0.25 hours. Essential for accurate pay.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Breaks are not automatically deducted.</strong>
              Calculator shows total elapsed time. Subtract break time manually. 8 hours minus 30 min lunch = 7.5 work hours.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">12-hour vs 24-hour format.</strong>
              12-hour needs AM/PM selection. 24-hour is unambiguous. Military, medical, and international use 24-hour.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For payroll, always verify company rounding rules. Some round to nearest 15 minutes. Others use exact time. Know your policy.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I calculate overnight shifts?</h3>
            <p className="text-sm text-muted-foreground">
              Just enter the times normally. 11 PM to 7 AM works automatically. The calculator detects overnight and adds 24 hours.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's decimal hours?</h3>
            <p className="text-sm text-muted-foreground">
              Hours as a decimal number. 30 minutes = 0.5 hours. 15 minutes = 0.25 hours. Used for payroll and billing calculations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I handle lunch breaks?</h3>
            <p className="text-sm text-muted-foreground">
              Calculate total time first. Then subtract break separately. 9 AM to 5 PM is 8 hours. Minus 30 min lunch = 7.5 hours worked.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I add multiple time periods?</h3>
            <p className="text-sm text-muted-foreground">
              Calculate each period separately. Add the decimal hours together. Monday 8 + Tuesday 7.5 = 15.5 total hours.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What format should I use?</h3>
            <p className="text-sm text-muted-foreground">
              Use whatever matches your input. US typically uses 12-hour. International and technical fields use 24-hour. Both work equally well.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How accurate is this for payroll?</h3>
            <p className="text-sm text-muted-foreground">
              Mathematically exact. But verify company policies. Some round to 6-minute increments. Others use exact time. Check your handbook.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I calculate time spans over multiple days?</h3>
            <p className="text-sm text-muted-foreground">
              For multi-day spans, use the date calculator. This tool handles same-day or overnight. Multi-day needs date context.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
