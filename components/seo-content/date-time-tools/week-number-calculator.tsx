import React from "react"

export default function WeekNumberCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter any date to find its week number, or enter a week number to see its date range. Choose between ISO 8601 (Monday start) or US system (Sunday start) based on your needs.
          </p>
          <p>
            The calculator shows the exact start and end dates for any week. Week 1 definitions differ between systems - ISO uses the week containing January 4th, while US starts counting from January 1st.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">ISO 8601 example:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">Date: January 15, 2024
Week: 3 of 2024
Range: Mon Jan 8 - Sun Jan 14</pre>
          </div>
          <p>
            Browse all weeks of a year with the interactive grid. Click any week to see its date range. Current week highlighting helps with quick reference for planning and reporting.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Manufacturing production schedules</h3>
            <p className="text-sm text-muted-foreground">
              Factories plan by week numbers. Production runs reference week 23, not June 5th. Supply chains coordinate using standard week identifiers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Pregnancy tracking</h3>
            <p className="text-sm text-muted-foreground">
              Doctors track pregnancy in weeks. Week 20 ultrasound, week 40 due date. Parents understand timeline in weekly increments.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Academic semester planning</h3>
            <p className="text-sm text-muted-foreground">
              Universities schedule by week. Week 1 orientation, week 15 finals. Students track progress through the term.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">European business reporting</h3>
            <p className="text-sm text-muted-foreground">
              EU companies report by ISO week. Financial quarters break into weeks. Cross-border teams use standard week numbers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Project sprint planning</h3>
            <p className="text-sm text-muted-foreground">
              Agile teams plan in week sprints. Sprint 23 runs week 23-24. Retrospectives reference specific week numbers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Payroll processing</h3>
            <p className="text-sm text-muted-foreground">
              Weekly payroll uses week numbers. Timesheets reference specific weeks. HR systems track pay periods by week.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">ISO week 1 can start in previous year.</strong>
              If January 1st is Friday-Sunday, week 1 starts next Monday. Late December dates may belong to week 1 of next year. This is correct ISO behavior.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some years have 53 weeks.</strong>
              ISO years with 53 weeks occur every 5-6 years. 2020, 2026, and 2032 have week 53. Most years have 52 weeks.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">US system is simpler but less standard.</strong>
              Week 1 always starts January 1st. No cross-year complications. Common in North America but not internationally recognized.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Week numbers reset every year.</strong>
              Week 52 of 2024 differs from week 52 of 2025. Always include the year when referencing week numbers. Prevents scheduling confusion.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For international projects, always specify ISO 8601. It's the global standard. US system confuses European partners.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between ISO and US?</h3>
            <p className="text-sm text-muted-foreground">
              ISO starts weeks on Monday, US on Sunday. ISO week 1 contains January 4th. US week 1 starts January 1st. ISO is international standard.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does week 1 sometimes start in December?</h3>
            <p className="text-sm text-muted-foreground">
              ISO rule: week 1 contains the first Thursday. If January 1st is late in the week, week 1 starts the previous Monday. This ensures consistent week definitions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I find week numbers in Excel?</h3>
            <p className="text-sm text-muted-foreground">
              Use =WEEKNUM(date,2) for ISO weeks. The ,2 parameter sets Monday as week start. US system uses =WEEKNUM(date) or =WEEKNUM(date,1).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What week number is today?</h3>
            <p className="text-sm text-muted-foreground">
              The calculator shows current week information automatically. Check the "Current Week" section for this week's number and date range.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can week numbers be negative?</h3>
            <p className="text-sm text-muted-foreground">
              No, week numbers range from 1 to 52 or 53. Invalid dates return no result. The calculator validates all inputs before computing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do week numbers affect payroll?</h3>
            <p className="text-sm text-muted-foreground">
              Weekly payroll often uses week numbers. Some years have 53 pay periods instead of 52. Budget for the extra pay period in 53-week years.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Which countries use ISO week numbers?</h3>
            <p className="text-sm text-muted-foreground">
              Most European countries use ISO 8601. UK, Germany, France, and Scandinavia all use it. US and Canada typically use Sunday-start weeks.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
