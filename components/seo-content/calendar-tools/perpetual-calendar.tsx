import React from "react"

export default function PerpetualCalendarSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Perpetual Calendar Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Navigate through months using the arrow buttons or select any month from the dropdown. Change the year by typing directly or using the +/- year buttons.
          </p>
          <p>
            Click any date to see detailed information including the full date name, day of year, week number, and whether it's a weekend.
          </p>
          <p>
            The "Today" button instantly returns to the current month and year, highlighting today's date. Quick navigation for reference.
          </p>
          <p>
            The year overview shows all 12 months with their day counts. Click any month to jump directly to it. Visual year-at-a-glance planning.
          </p>
          <p>
            Today's date is highlighted in the calendar grid. Selected dates show with a different highlight. Clear visual feedback for navigation.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Historical date research</h3>
            <p className="text-sm text-muted-foreground">
              Find what day of the week historical events occurred. Check birth dates of ancestors. Verify dates for genealogy research projects.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Future event planning</h3>
            <p className="text-sm text-muted-foreground">
              Check what day your wedding anniversary falls on in 10 years. Plan milestone birthdays. Schedule recurring events years in advance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Contract and lease planning</h3>
            <p className="text-sm text-muted-foreground">
              Calculate end dates for multi-year contracts. Check if lease expiration falls on a weekend. Plan renewals and notifications accurately.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">School and academic planning</h3>
            <p className="text-sm text-muted-foreground">
              Plan school years, semesters, or quarters. Check what day classes start in future years. Coordinate with academic calendars.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Retirement and financial planning</h3>
            <p className="text-sm text-muted-foreground">
              Calculate dates for retirement eligibility. Plan Social Security claiming dates. Visualize long-term financial timelines.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Birthday and anniversary tracking</h3>
            <p className="text-sm text-muted-foreground">
              Find what day family birthdays fall on in future years. Plan big celebrations that need advance booking. Never miss an important date.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Calendar works for any year.</strong>
              Navigate to past or future years without limits. Check dates centuries ago or far in the future. Uses the proleptic Gregorian calendar.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Week numbers follow ISO standard.</strong>
              Week 1 is the first week containing at least 4 days of the new year. Monday is the first day of the week. Standard for business and international use.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Day of year counts from January 1.</strong>
              January 1 is day 1, December 31 is day 365 (or 366 in leap years). Useful for project tracking and annual planning.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Leap years are calculated automatically.</strong>
              Years divisible by 4 are leap years, except century years must be divisible by 400. February has 29 days in leap years.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Historical note:</strong> The Gregorian calendar was adopted in 1582. Dates before this may vary by country. This calendar uses the proleptic Gregorian calendar for all years.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What is a perpetual calendar?</h3>
            <p className="text-sm text-muted-foreground">
              A perpetual calendar can display any date from any year, past or future. Unlike annual calendars, it doesn't need yearly adjustment. Works indefinitely.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How accurate is this for historical dates?</h3>
            <p className="text-sm text-muted-foreground">
              Accurate for the Gregorian calendar system. However, different countries adopted it at different times (1582-1927). For historical research, verify which calendar was used locally.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this for planning decades ahead?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, navigate to any future year. Perfect for long-term planning, milestone tracking, or curiosity about future dates. No practical year limit.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's a leap year?</h3>
            <p className="text-sm text-muted-foreground">
              A leap year has 366 days instead of 365, with February 29 added. Occurs every 4 years to keep the calendar aligned with Earth's orbit around the Sun.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I find the same calendar for a different year?</h3>
            <p className="text-sm text-muted-foreground">
              Years with the same calendar have the same day-date pattern. This repeats every 28 years typically. Non-leap years repeat more frequently.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I print calendar pages?</h3>
            <p className="text-sm text-muted-foreground">
              Use your browser's print function on the current month view. For better print quality, consider dedicated calendar printing tools or export options.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why do some months have different days?</h3>
            <p className="text-sm text-muted-foreground">
              The Roman calendar had 10 months. Later additions and adjustments created our 12-month system. Month lengths were set to total 365 days with variations for leap years.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
