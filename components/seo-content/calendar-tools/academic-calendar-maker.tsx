import React from "react"

export default function AcademicCalendarMakerSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Academic Calendar Maker Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter your school or institution name and set the academic year format (e.g., 2024-2025). This creates a customized calendar header for your organization.
          </p>
          <p>
            Add events by selecting the event type (holiday, exam period, break, school event, or deadline), entering a name, and choosing start and end dates. Each type has a distinct color.
          </p>
          <p>
            Events appear immediately in the monthly grid preview. The 12-month overview shows all events distributed across the academic year with color coding by type.
          </p>
          <p>
            The events list displays all entries chronologically with their type badges. Remove individual events or clear all to start fresh.
          </p>
          <p>
            Export the calendar as a JSON file for backup or sharing. Import this file later to restore or modify your academic calendar.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">School year planning</h3>
            <p className="text-sm text-muted-foreground">
              Map out the entire school year before it starts. Include holidays, exam periods, and professional development days. Share with teachers and staff.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">University semester scheduling</h3>
            <p className="text-sm text-muted-foreground">
              Plan fall and spring semesters with breaks. Add registration periods, add/drop deadlines, and finals weeks. Coordinate across departments.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Homeschool year structuring</h3>
            <p className="text-sm text-muted-foreground">
              Create a flexible academic calendar for homeschooling. Schedule field trips, co-op days, and assessment periods. Balance learning with family activities.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Training program coordination</h3>
            <p className="text-sm text-muted-foreground">
              Plan corporate training programs or certification courses. Schedule modules, assessments, and graduation. Track multiple cohorts simultaneously.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Sports season alignment</h3>
            <p className="text-sm text-muted-foreground">
              Coordinate athletic seasons with academic calendars. Avoid scheduling conflicts between games and exams. Plan pep rallies and sports banquets.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Parent communication</h3>
            <p className="text-sm text-muted-foreground">
              Share the school calendar with parents at year start. They can plan family vacations around breaks and prepare for important dates. Reduces scheduling conflicts.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Event types are color-coded for clarity.</strong>
              Holidays appear in green, exams in red, breaks in blue, events in orange, and deadlines in purple. This visual system helps quickly identify event types at a glance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Academic years span two calendar years.</strong>
              Most schools use formats like 2024-2025, starting in one year and ending in the next. The calendar displays all 12 months of the starting year.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">JSON export preserves all data.</strong>
              The exported file contains your school name, academic year, and all events. Save it to restore your calendar later or share with colleagues.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Multi-day events show start date only.</strong>
              Enter both start and end dates for events spanning multiple days. The preview shows the start date. The full date range appears in the events list.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Create separate calendars for different purposes - one for academics, one for athletics, one for arts. This prevents overcrowding and makes each calendar more readable.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I print this calendar?</h3>
            <p className="text-sm text-muted-foreground">
              Take a screenshot or use your browser's print function on the preview. For better print quality, consider copying events to a spreadsheet or calendar application.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I share this with others?</h3>
            <p className="text-sm text-muted-foreground">
              Export as JSON and share the file. Recipients can import it to view all events. Alternatively, screenshot the preview or manually share key dates.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I edit events after creating them?</h3>
            <p className="text-sm text-muted-foreground">
              This version doesn't support editing. Remove the event and add a new one with corrected information. Plan carefully before adding events.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the maximum number of events?</h3>
            <p className="text-sm text-muted-foreground">
              No strict limit, but very large calendars (200+ events) may become difficult to read. Consider splitting into semester or quarterly calendars for clarity.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I import from other calendar formats?</h3>
            <p className="text-sm text-muted-foreground">
              This tool doesn't support importing from ICS or other formats. Enter events manually or use the JSON export/import feature for backups.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is there a way to add recurring events?</h3>
            <p className="text-sm text-muted-foreground">
              Add each occurrence separately. For weekly meetings or monthly events, create individual entries. This gives you control over exceptions and cancellations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this for non-school purposes?</h3>
            <p className="text-sm text-muted-foreground">
              Absolutely. Use it for any year-long planning - church programs, community organizations, or personal goal tracking. The event types work for many scenarios.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
