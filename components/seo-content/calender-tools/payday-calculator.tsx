import React from "react"

export default function PaydayCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Payday Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool generates your complete pay date schedule for the year. Enter your pay frequency (weekly, bi-weekly, semi-monthly, or monthly), your first pay date, and get a full list of paydays.
          </p>
          <p>
            The calculator projects forward from your start date, applying your pay frequency consistently. It can adjust for weekends and holidays—moving paydays to the preceding business day if your employer does this.
          </p>
          <p>
            Export your pay schedule as a calendar file, CSV, or printable list. Import into your calendar app for reminders, or use for budget planning. Know exactly when money hits your account all year long.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating an annual budget</h3>
            <p className="text-sm text-muted-foreground">
              Map out your income for the year. Know exactly how many paychecks you'll receive and when. Essential for accurate budget planning and cash flow management.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Scheduling bill payments</h3>
            <p className="text-sm text-muted-foreground">
              Align bill due dates with your pay schedule. Set up automatic payments to occur right after payday. Avoid overdrafts by timing payments with income.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Planning for months with three paychecks</h3>
            <p className="text-sm text-muted-foreground">
              Bi-weekly pay means two months per year have three paychecks. Identify these bonus months in advance and plan to use the extra check for savings or debt.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Coordinating with a partner's schedule</h3>
            <p className="text-sm text-muted-foreground">
              Managing household finances with a partner? Compare pay schedules to optimize bill splitting and joint account funding throughout the month.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Setting up automatic savings</h3>
            <p className="text-sm text-muted-foreground">
              Schedule automatic transfers right after each payday. "Pay yourself first" by moving savings before you're tempted to spend. Consistency builds wealth.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">New job orientation</h3>
            <p className="text-sm text-muted-foreground">
              Starting a new job? Calculate your pay schedule from your start date. Plan your finances around when you'll actually receive your first and subsequent paychecks.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Know your actual pay frequency.</strong>
              Weekly = 52 paychecks/year. Bi-weekly = 26 paychecks/year. Semi-monthly = 24 paychecks/year. Monthly = 12 paychecks/year. These aren't interchangeable.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Bi-weekly and semi-monthly are different.</strong>
              Bi-weekly = every 2 weeks (same weekday). Semi-monthly = 15th and last day (varies by weekday). Different frequencies affect budgeting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Holiday adjustments vary by employer.</strong>
              Some employers pay early when payday falls on a holiday; others pay late. Check your HR policy and adjust the calculator settings accordingly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">First paycheck may be delayed.</strong>
              Many employers have a lag between starting work and receiving first pay. Your first pay date might be 2-3 weeks after your start date.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> In bi-weekly pay, mark the "three paycheck months" in your calendar. These happen twice a year. Plan to use the extra check for catch-up savings or debt acceleration.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many paychecks do I get per year?</h3>
            <p className="text-sm text-muted-foreground">
              Weekly: 52 (sometimes 53). Bi-weekly: 26 (sometimes 27). Semi-monthly: 24. Monthly: 12. The "sometimes" years happen due to calendar quirks.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between bi-weekly and semi-monthly?</h3>
            <p className="text-sm text-muted-foreground">
              Bi-weekly: Every 2 weeks on the same day (e.g., every other Friday) = 26/year. Semi-monthly: 15th and last day of month = 24/year. Different for budgeting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why do some months have 3 paychecks?</h3>
            <p className="text-sm text-muted-foreground">
              With bi-weekly pay (26/year), most months get 2 paychecks. But 26 doesn't divide evenly by 12, so 2 months get 3 paychecks. These are "bonus" months.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if my payday falls on a holiday?</h3>
            <p className="text-sm text-muted-foreground">
              Employers handle this differently. Some pay the day before, some the day after, some the next business day. Check your employee handbook for your company's policy.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this for freelance or irregular income?</h3>
            <p className="text-sm text-muted-foreground">
              This tool is for regular pay schedules. Freelancers with irregular income should use a different approach—perhaps averaging monthly income and budgeting accordingly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I import paydates into my calendar?</h3>
            <p className="text-sm text-muted-foreground">
              Export as ICS/Calendar file and import into Google Calendar, Outlook, or Apple Calendar. Set reminders for the day before to prepare for deposits.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I budget per paycheck or per month?</h3>
            <p className="text-sm text-muted-foreground">
              If paid bi-weekly or weekly, budget per paycheck. Monthly budgeting with non-monthly pay causes confusion. Match your budget cycle to your pay cycle.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
