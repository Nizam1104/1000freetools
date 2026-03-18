import React from "react"

export default function BusinessHoursCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Business Hours Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Configure your work hours by setting start and end times. Default is 9 AM to 5 PM, but customize for your business schedule. This defines what counts as "business hours."
          </p>
          <p>
            Choose whether to exclude weekends. When enabled, Saturday and Sunday don't count toward business hours. Essential for standard Monday-Friday operations.
          </p>
          <p>
            Add holidays as comma-separated dates in YYYY-MM-DD format. These dates are excluded from calculations. Perfect for company-specific closures.
          </p>
          <p>
            Enter a start date/time and either an end date/time or use quick-add buttons. The calculator shows business hours between the two points.
          </p>
          <p>
            Results display in hours and minutes, plus equivalent business days (8-hour days) and weeks (5-day weeks). Total minutes are also shown for precise calculations.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">SLA deadline calculations</h3>
            <p className="text-sm text-muted-foreground">
              Calculate response time deadlines for support tickets. 48-hour SLA means 6 business days with 8-hour workdays. Set accurate customer expectations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Project timeline estimation</h3>
            <p className="text-sm text-muted-foreground">
              Convert estimated hours into calendar dates. A 160-hour project with 8-hour days is 20 business days or 4 weeks. Plan realistic delivery dates.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Legal filing deadline tracking</h3>
            <p className="text-sm text-muted-foreground">
              Court deadlines often use business days. Calculate exact due dates excluding weekends and holidays. Avoid missed deadlines and penalties.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Shipping and delivery estimates</h3>
            <p className="text-sm text-muted-foreground">
              Provide accurate delivery windows to customers. 3-5 business days doesn't include weekends. Set proper expectations for e-commerce orders.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Employee time tracking</h3>
            <p className="text-sm text-muted-foreground">
              Calculate hours worked between two dates. Exclude lunch breaks and non-working days. Verify timesheet accuracy for payroll processing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Construction project scheduling</h3>
            <p className="text-sm text-muted-foreground">
              Plan construction timelines excluding weather days and holidays. Coordinate subcontractor schedules. Track progress against business-day baselines.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Business days assume 8-hour workdays.</strong>
              Day calculations divide total hours by 8. Adjust interpretation if your workday differs. Weeks assume 5-day work weeks.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Holidays must be in YYYY-MM-DD format.</strong>
              Enter as: 2024-12-25, 2024-01-01, 2024-07-04. Separate multiple dates with commas. No holiday presets - add your specific closures.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Time ranges respect work hours.</strong>
              If work ends at 5 PM and starts at 9 AM, hours outside this range don't count. A task from 4 PM to 10 AM next day is only 1 business hour (4-5 PM).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Quick-add buttons estimate end dates.</strong>
              Adding 8 hours, 1 week, or 1 month calculates the end date based on your work schedule. Accounts for weekends and holidays in the calculation.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Important:</strong> This calculator uses your configured work hours. Verify settings match your actual business operations before using for critical deadlines.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between business hours and calendar hours?</h3>
            <p className="text-sm text-muted-foreground">
              Calendar hours count all 24 hours per day. Business hours only count specified work hours (like 9-5). A 3-day weekend is 72 calendar hours but 0 business hours.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I calculate working days between two dates?</h3>
            <p className="text-sm text-muted-foreground">
              Enter the start and end dates with the same time. The result shows business days. A 5-day business week shows as 5 days or 40 hours.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this for shift work?</h3>
            <p className="text-sm text-muted-foreground">
              Set work hours to match your shift schedule. For rotating shifts, use the calculator for each shift period separately. Results apply to your configured hours.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this handle time zones?</h3>
            <p className="text-sm text-muted-foreground">
              This calculator uses your local time. For cross-timezone calculations, convert times to a common timezone first. Consider timezone differences in deadlines.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How are partial days calculated?</h3>
            <p className="text-sm text-muted-foreground">
              Partial days count actual business hours worked. Starting at 2 PM and ending at 11 AM next day (9-5 schedule) is 3 hours (2-5 PM) plus 2 hours (9-11 AM) = 5 hours.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I save my holiday list?</h3>
            <p className="text-sm text-muted-foreground">
              This version doesn't save data. Copy your holiday list to a document for reuse. Paste it in each time you use the calculator.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if my business is open weekends?</h3>
            <p className="text-sm text-muted-foreground">
              Uncheck "Exclude Weekends." Saturday and Sunday will count as regular business days. Set your actual operating hours for accurate calculations.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
