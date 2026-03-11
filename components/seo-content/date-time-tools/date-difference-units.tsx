import React from "react"

export default function DateDifferenceUnitsSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select two dates to calculate the precise difference between them. The calculator breaks down the duration into years, months, weeks, days, hours, minutes, and seconds.
          </p>
          <p>
            Unlike simple day counters, this tool accounts for varying month lengths and leap years. The precise breakdown shows exactly how many complete years, months, and days fit between your dates.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Example calculation:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">From: March 15, 2020
To: June 20, 2024
Result: 4 years, 3 months, 5 days
Total: 1,558 days</pre>
          </div>
          <p>
            Additional calculations show total weeks, approximate months, total hours, minutes, and seconds. The percentage of year helps contextualize longer durations.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Age difference calculations</h3>
            <p className="text-sm text-muted-foreground">
              Find exact age gaps between people. Siblings compare ages precisely. Genealogy research tracks generational spans.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Historical period analysis</h3>
            <p className="text-sm text-muted-foreground">
              Measure duration of wars, reigns, and eras. Historians quantify periods accurately. Students understand timeline scales.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Employment tenure tracking</h3>
            <p className="text-sm text-muted-foreground">
              HR calculates years of service. Employees verify vacation accrual. Retirement planning needs precise tenure.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Relationship milestones</h3>
            <p className="text-sm text-muted-foreground">
              Couples track anniversaries precisely. Dating apps show relationship duration. Wedding planning counts down exactly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Scientific research periods</h3>
            <p className="text-sm text-muted-foreground">
              Studies track observation periods. Clinical trials measure treatment duration. Researchers report exact timeframes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Legal deadline calculations</h3>
            <p className="text-sm text-muted-foreground">
              Statutes of limitation need precise dates. Contract periods require exact measurement. Legal documents specify durations.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Month lengths vary.</strong>
              Months have 28-31 days. The calculator accounts for this. "3 months" from January 31st lands on April 30th, not May 1st.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Leap years add complexity.</strong>
              February has 29 days every 4 years. The year 2024 is a leap year. Calculations spanning February account for this.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Total months are approximate.</strong>
              Average month is 30.44 days. Total months use this average. Precise breakdown uses actual calendar months.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Order matters for sign.</strong>
              Earlier date first shows positive duration. Later date first shows negative. Absolute values display for clarity.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For age calculations, use birth date as start and today as end. The precise breakdown shows years, months, and days of age.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why isn't it just total days divided by 30?</h3>
            <p className="text-sm text-muted-foreground">
              Calendar months vary in length. Simple division gives inaccurate results. The precise method counts actual calendar months.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do you handle leap years?</h3>
            <p className="text-sm text-muted-foreground">
              The calculator uses actual dates. February 29th exists in leap years. Duration calculations include or exclude it naturally.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I calculate time of day differences?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, include time for hours, minutes, seconds. Date-only inputs show zero for time components. Full datetime gives complete breakdown.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the maximum date range?</h3>
            <p className="text-sm text-muted-foreground">
              JavaScript dates range from 1970 to 2100+ reliably. Historical dates work but may have timezone quirks. Future dates calculate normally.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why do total months differ from breakdown?</h3>
            <p className="text-sm text-muted-foreground">
              Total months use 30.44-day average. Breakdown counts actual calendar months. Both are correct for different purposes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is the percentage of year accurate?</h3>
            <p className="text-sm text-muted-foreground">
              It uses 365.25 days per year average. Good for estimation. Leap year effects average out over long periods.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this for countdown calculations?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, put future date as end date. The breakdown shows time remaining. Use the time until calculator for live countdowns.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
