import React from "react"

export default function DatePatternFinderSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Date Pattern Finder Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool finds all dates matching your custom pattern within a date range. Specify criteria like "every second Tuesday," "all Fridays the 13th," or "last Sunday of each month" and get a complete list of matching dates.
          </p>
          <p>
            Set your start and end dates, then define the pattern using weekday, week number, and day of month options. The finder scans the entire range and returns every date that matches your criteria.
          </p>
          <p>
            Export results as a list, CSV, or calendar file. Use for scheduling recurring events, planning meetings, or analyzing date patterns. Perfect for complex recurring schedules that standard calendar tools can't handle.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Scheduling recurring meetings</h3>
            <p className="text-sm text-muted-foreground">
              Your team meets every 2nd and 4th Thursday. Generate all meeting dates for the year at once. Import into your calendar and set reminders automatically.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Planning payment schedules</h3>
            <p className="text-sm text-muted-foreground">
              Rent due on the 1st, loan payments on the 15th. Generate all payment dates for budgeting. Identify months where payments cluster together.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Finding Friday the 13th dates</h3>
            <p className="text-sm text-muted-foreground">
              Planning events around superstitions? Or embracing them? Find all Friday the 13th dates in any year range. There are 1-3 per year depending on the calendar.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating maintenance schedules</h3>
            <p className="text-sm text-muted-foreground">
              Equipment maintenance every first Monday of the month. Generate all maintenance dates for the year. Assign to technicians and track completion.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Planning garbage/recycling pickup</h3>
            <p className="text-sm text-muted-foreground">
              Trash collection every other Tuesday. Generate the full schedule for your household. Never miss pickup day again—add all dates to your phone calendar.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Academic semester planning</h3>
            <p className="text-sm text-muted-foreground">
              Classes meet on specific weekdays throughout the semester. Generate all class dates, excluding holidays. Create attendance tracking or assignment schedules.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Week numbers reset each month.</strong>
              "First Tuesday" means the first Tuesday of each month, not the first Tuesday overall. Week 1 is days 1-7, Week 2 is days 8-14, etc.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">"Last" weekday is relative.</strong>
              "Last Friday" means the final Friday in each month. Since months have 28-31 days, the actual date varies (22nd-31st).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some patterns may not match every month.</strong>
              "5th Monday" only occurs in months with 31 days that start on Sunday/Monday. About 7 months per year have a 5th occurrence of any weekday.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Holiday adjustments aren't automatic.</strong>
              The tool finds pattern matches, not business days. If a date falls on a holiday, you'll need to manually adjust for your specific needs.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For bi-weekly schedules (every 2 weeks on a specific day), start from a known date and use "every 14 days" pattern. This maintains consistent 2-week intervals regardless of month boundaries.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many Friday the 13ths are there per year?</h3>
            <p className="text-sm text-muted-foreground">
              Every year has at least 1 and at most 3 Friday the 13ths. The pattern repeats every 400 years in the Gregorian calendar.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does "nth weekday" mean?</h3>
            <p className="text-sm text-muted-foreground">
              "2nd Tuesday" means the second Tuesday of the month (days 8-14). "1st" is days 1-7, "3rd" is days 15-21, "4th" is days 22-28, "5th" is days 29-31.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I find dates for multiple patterns?</h3>
            <p className="text-sm text-muted-foreground">
              Run the finder separately for each pattern, then combine results. Or use a spreadsheet to merge multiple CSV exports from different pattern searches.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I exclude holidays?</h3>
            <p className="text-sm text-muted-foreground">
              Generate your pattern dates first, then manually remove holidays from the list. Or cross-reference with a holiday calendar after exporting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I find dates like "every 3 weeks"?</h3>
            <p className="text-sm text-muted-foreground">
              This tool focuses on monthly patterns. For fixed-interval patterns (every N days), use a date calculator or add-days tool instead.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I import dates into my calendar?</h3>
            <p className="text-sm text-muted-foreground">
              Export as ICS/Calendar file for direct import into Google Calendar, Outlook, or Apple Calendar. CSV works for spreadsheets and some calendar tools.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the maximum date range?</h3>
            <p className="text-sm text-muted-foreground">
              The tool handles ranges of several years efficiently. For very long ranges (decades), results may be extensive. Consider breaking into yearly chunks.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
