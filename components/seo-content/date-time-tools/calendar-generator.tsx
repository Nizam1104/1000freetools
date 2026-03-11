import React from "react"

export default function CalendarGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select any month and year to generate a printable calendar. Choose whether weeks start on Sunday or Monday based on your regional preference or organizational standard.
          </p>
          <p>
            Mark special dates with custom labels and colors. Add birthdays, meetings, deadlines, and events directly on the calendar. Each marked date displays with its label for quick reference.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Calendar features:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">Month: January 2024
Week start: Sunday
Marked dates:
- Jan 1: New Year's Day (red)
- Jan 15: MLK Day (blue)
- Jan 20: Project Deadline (green)</pre>
          </div>
          <p>
            Print directly from the browser with optimized formatting. The calendar adjusts to standard paper sizes. Weekend highlighting helps visualize non-working days at a glance.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Office wall calendars</h3>
            <p className="text-sm text-muted-foreground">
              Print monthly calendars for the break room. Mark company holidays. Track team birthdays. Everyone sees important dates.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Classroom scheduling</h3>
            <p className="text-sm text-muted-foreground">
              Teachers post monthly calendars. Mark test dates and deadlines. Students track assignments. Parents stay informed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Event planning</h3>
            <p className="text-sm text-muted-foreground">
              Visualize event timelines. Mark venue bookings. Track vendor deadlines. Coordinate multiple events.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Family organization</h3>
            <p className="text-sm text-muted-foreground">
              Post on the refrigerator. Mark kids' activities. Track appointments. Coordinate family schedules.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Project timeline visualization</h3>
            <p className="text-sm text-muted-foreground">
              Mark milestone dates. Visualize project phases. Track deliverable deadlines. Share with stakeholders.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Historical calendar reference</h3>
            <p className="text-sm text-muted-foreground">
              Generate calendars for past years. Research historical dates. Verify day-of-week for events. Genealogy work.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Sunday vs Monday start affects layout.</strong>
              US calendars typically start Sunday. Europe and ISO start Monday. Choose based on your audience. Affects which column shows weekends.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Marked dates are browser-local.</strong>
              Dates save in your browser only. Clearing data removes them. Print to preserve. Consider screenshot for backup.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Print formatting is optimized.</strong>
              Calendar adjusts for paper size. Margins set for home printers. Use landscape for wider view. Check print preview first.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Weekend highlighting is optional.</strong>
              Toggle to emphasize non-working days. Useful for business planning. Disable for clean look. Personal preference setting.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Generate all 12 months at once for a full year calendar. Print and bind for a custom planner. Mark recurring events across months.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I print a full year?</h3>
            <p className="text-sm text-muted-foreground">
              Generate each month separately. Print all 12. Staple or bind together. Creates a custom yearly calendar.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I save marked dates?</h3>
            <p className="text-sm text-muted-foreground">
              Dates save in browser storage. They persist between visits. Clear cache removes them. Print to preserve permanently.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I export to PDF?</h3>
            <p className="text-sm text-muted-foreground">
              Use browser print to PDF. Select "Save as PDF" destination. Creates digital copy. Email or share the PDF file.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What years are available?</h3>
            <p className="text-sm text-muted-foreground">
              Any year from 1950 to 2050+. Historical and future calendars work. Gregorian calendar rules apply. Leap years handled correctly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I customize colors?</h3>
            <p className="text-sm text-muted-foreground">
              Marked dates get random colors. Each event has unique color. Helps distinguish event types. Manual color selection not available.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it show holidays?</h3>
            <p className="text-sm text-muted-foreground">
              No automatic holidays. Mark them manually. Add your country's holidays. Personalize for your needs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I share the calendar?</h3>
            <p className="text-sm text-muted-foreground">
              Print and distribute physically. Or save as PDF to email. Recipients can generate their own. Share the tool link.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
