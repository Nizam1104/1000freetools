import React from "react"

export default function LeapYearCheckerSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter any year to check if it's a leap year. The calculator applies the standard leap year rules: divisible by 4, except centuries unless divisible by 400.
          </p>
          <p>
            Results show the number of days in the year (365 or 366) and list the next five upcoming leap years. This helps with long-term planning and pattern recognition.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Leap year rules:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">1. Divisible by 4? Yes → Leap year
2. Divisible by 100? Yes → Not leap year
3. Divisible by 400? Yes → Leap year

2000: Div by 4, 100, 400 → Leap year
1900: Div by 4, 100, not 400 → Not leap
2024: Div by 4, not 100 → Leap year</pre>
          </div>
          <p>
            The 400-year cycle ensures calendar accuracy. Without leap years, seasons would drift by about 6 hours annually. After 100 years, we'd be off by 24 days.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Birthday planning for Feb 29</h3>
            <p className="text-sm text-muted-foreground">
              Leaplings celebrate on Feb 28 or Mar 1 in non-leap years. Plan parties for actual birth date. Legal documents handle the date specially.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Financial year calculations</h3>
            <p className="text-sm text-muted-foreground">
              Interest calculations need exact days. Leap years add one day to accruals. Annual rates adjust for 366-day years.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Software development</h3>
            <p className="text-sm text-muted-foreground">
              Test date handling code. Verify leap year logic. Prevent February 29 bugs. Handle edge cases in applications.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Academic calendar planning</h3>
            <p className="text-sm text-muted-foreground">
              Schools schedule around leap years. Semester lengths vary slightly. Graduation dates account for extra day.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Scientific data analysis</h3>
            <p className="text-sm text-muted-foreground">
              Time series data needs accurate dates. Climate studies track yearly cycles. Astronomical observations use precise timing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Historical research</h3>
            <p className="text-sm text-muted-foreground">
              Verify historical dates. Understand old calendar systems. Calculate ages across leap years. Genealogy needs accuracy.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Century years are special cases.</strong>
              1900 was NOT a leap year despite being divisible by 4. 2000 WAS a leap year because it's divisible by 400. This exception keeps the calendar accurate.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Leap years occur every 4 years mostly.</strong>
              The pattern is regular except for century years. 2020, 2024, 2028 are leap years. 2100 will not be a leap year.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">The extra day is February 29.</strong>
              Leap day inserts between February 28 and March 1. It's the 60th day of leap years. Some cultures have special traditions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Different calendars have different rules.</strong>
              This tool uses the Gregorian calendar. Jewish, Islamic, and Chinese calendars have different leap systems. Historical dates may vary.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> People born on Feb 29 legally age on Feb 28 or Mar 1 in non-leap years. Check local laws for official purposes.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why do we have leap years?</h3>
            <p className="text-sm text-muted-foreground">
              Earth orbits the Sun in 365.2422 days, not 365. Without leap years, seasons drift. After 4 years, we'd be almost a day behind.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">When is the next leap year?</h3>
            <p className="text-sm text-muted-foreground">
              2024 is a leap year. Next are 2028, 2032, 2036, and 2040. The calculator shows upcoming leap years for any input year.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What happens if you're born on Feb 29?</h3>
            <p className="text-sm text-muted-foreground">
              You're a "leapling." Legal birthday is Feb 28 or Mar 1 in non-leap years. Some celebrate both days. Driver's licenses handle it specially.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Was 1900 a leap year?</h3>
            <p className="text-sm text-muted-foreground">
              No. 1900 is divisible by 100 but not 400. It was NOT a leap year. 2000 was divisible by 400, so it WAS a leap year.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many days in a leap year?</h3>
            <p className="text-sm text-muted-foreground">
              366 days instead of 365. The extra day is February 29. All other months remain unchanged. Total hours: 8,784.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do other planets have leap years?</h3>
            <p className="text-sm text-muted-foreground">
              Mars has leap sols in its calendar. Other planets have different orbital periods. Earth's system is specific to our orbit.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Will 2100 be a leap year?</h3>
            <p className="text-sm text-muted-foreground">
              No. 2100 is divisible by 100 but not 400. It will NOT be a leap year. Next century leap year is 2400.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
