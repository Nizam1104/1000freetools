import * as React from "react"

export default function PerpetualCalendarSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            This perpetual calendar displays any month from any year between 1900 and 2100. Simply select the year and month using the dropdown menus or navigation arrows to instantly see the calendar layout with correct day-of-week alignments.
          </p>
          <p>
            The calendar automatically accounts for leap years, showing February 29th when appropriate. Each date cell shows the day number, and you can click on any date to see additional information like day of year, week number, and remaining days in the year.
          </p>
          <p>
            Navigate quickly using keyboard shortcuts, jump to today with a single click, or use the "Jump to Year" feature to skip directly to a specific year. The calendar maintains consistent styling whether viewing past, present, or future dates.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Historical Research</h3>
            <p className="text-sm text-muted-foreground">
              Determine what day of the week historical events occurred on for genealogy, research, or writing projects.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Future Planning</h3>
            <p className="text-sm text-muted-foreground">
              Check what day of the week future dates fall on for long-term planning, anniversaries, or milestone events.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Legal and Contract Review</h3>
            <p className="text-sm text-muted-foreground">
              Verify dates on historical documents or calculate when future contract obligations will fall.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Birthday Planning</h3>
            <p className="text-sm text-muted-foreground">
              Find out what day of the week you were born on, or plan milestone birthday parties years in advance.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Astronomical Events</h3>
            <p className="text-sm text-muted-foreground">
              Cross-reference historical or predicted astronomical events with calendar dates for observation planning.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Education</h3>
            <p className="text-sm text-muted-foreground">
              Teach students about calendar systems, leap years, and how dates align across different years.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Gregorian calendar rules:</strong> This calendar uses the Gregorian calendar system (introduced in 1582) with its leap year rules: divisible by 4, except centuries must be divisible by 400.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Year range limits:</strong> The calendar supports years from 1900 to 2100. This covers most practical use cases while maintaining calculation accuracy.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Historical calendar changes:</strong> Different countries adopted the Gregorian calendar at different times. For historical dates before your country's adoption, the actual calendar used may differ.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Day of week accuracy:</strong> The day-of-week calculations are mathematically accurate for the Gregorian calendar system throughout the supported range.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">No timezone considerations:</strong> This is a pure calendar display. Time zones don't affect which day of the week a date falls on.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">What day was January 1, 2000?</h3>
            <p className="text-sm text-muted-foreground">
              Navigate to January 2000 to see that January 1, 2000 was a Saturday. The Y2K millennium date is a common reference point.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I find my birth day of week?</h3>
            <p className="text-sm text-muted-foreground">
              Select your birth year and month, then look at the date you were born. The day of the week is shown in the column header for that date.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Why does February sometimes have 29 days?</h3>
            <p className="text-sm text-muted-foreground">
              Leap years occur every 4 years (with exceptions for century years) to keep the calendar aligned with Earth's orbit. The calendar shows 29 days automatically for leap years.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I print this calendar?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Use your browser's print function (Ctrl+P or Cmd+P) to print the current month view. The calendar is styled for clean printing.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What's special about the year 2000?</h3>
            <p className="text-sm text-muted-foreground">
              Year 2000 was a leap year (divisible by 400), unlike 1900 which was not. This is why the calendar correctly shows February 29, 2000.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How far into the future can I look?</h3>
            <p className="text-sm text-muted-foreground">
              You can view any month through December 2100. This covers planning for most lifetime events and long-term projects.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Does this work for ancient dates?</h3>
            <p className="text-sm text-muted-foreground">
              The calendar starts at 1900. For earlier dates, the Gregorian calendar rules may not apply historically, as different regions used different calendar systems.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
