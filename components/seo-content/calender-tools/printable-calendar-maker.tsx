import * as React from "react"

export default function PrintableCalendarMakerSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            Select the year and months you want to include in your printable calendar. Choose from various layout options including single month, quarterly, or full year views. Pick a starting day of the week (Sunday or Monday) based on your regional preference.
          </p>
          <p>
            Add custom events, holidays, or recurring appointments by entering the date and description. The calendar automatically formats everything into a clean, printer-friendly layout with proper spacing for handwritten notes.
          </p>
          <p>
            Preview your calendar before downloading. The generated PDF is optimized for standard letter or A4 paper with appropriate margins. You can also print directly from your browser using the print button, which applies printer-friendly styles automatically.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Home Organization</h3>
            <p className="text-sm text-muted-foreground">
              Create a family command center calendar with everyone's activities, appointments, and important dates visible at a glance.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Office Planning</h3>
            <p className="text-sm text-muted-foreground">
              Print calendars for conference rooms, break areas, or individual desks showing company holidays and team events.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">School Year Planning</h3>
            <p className="text-sm text-muted-foreground">
              Map out the entire school year with holidays, exam periods, and extracurricular activities for easy reference.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Project Timelines</h3>
            <p className="text-sm text-muted-foreground">
              Create visual timeline calendars for projects, marking milestones and deadlines that the whole team can see.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Habit Tracking</h3>
            <p className="text-sm text-muted-foreground">
              Print monthly calendars to track daily habits, moods, or progress toward goals with pen and paper.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Event Planning</h3>
            <p className="text-sm text-muted-foreground">
              Plan weddings, conferences, or large events with a visual calendar showing all tasks and deadlines.
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
              <strong className="text-foreground">Paper size matters:</strong> Select the appropriate paper size (Letter or A4) based on your region and printer. The layout adjusts to fit properly with correct margins.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Ink-saving option:</strong> Choose the minimal or grayscale layout to save printer ink while maintaining readability.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Character limits apply:</strong> Event descriptions have character limits to ensure they fit within calendar cells. Keep notes concise for best results.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Browser print varies:</strong> Print quality depends on your browser's PDF generation. Chrome and Edge typically produce the best results.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Landscape vs portrait:</strong> Full year calendars work best in landscape orientation, while monthly views are fine in portrait.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Can I add my own holidays?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Add custom events for any date, including recurring holidays. These will appear alongside any pre-loaded holiday data in your calendar.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I print multiple months on one page?</h3>
            <p className="text-sm text-muted-foreground">
              Select the quarterly or full year layout option. Quarterly shows 3 months per page, while full year displays all 12 months on a single sheet (best in landscape orientation).
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I save the calendar to edit later?</h3>
            <p className="text-sm text-muted-foreground">
              Currently, calendars must be printed or downloaded immediately. For future editing, save your event data separately and regenerate the calendar when needed.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Is the calendar available in other languages?</h3>
            <p className="text-sm text-muted-foreground">
              Month and day names follow your browser's language settings. For full localization, you may need to use a dedicated calendar application with language support.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I add photos to the calendar?</h3>
            <p className="text-sm text-muted-foreground">
              This tool focuses on clean, minimalist calendars optimized for writing. For photo calendars, consider dedicated photo calendar services.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I make the text larger?</h3>
            <p className="text-sm text-muted-foreground">
              Use your browser's print preview to adjust scale settings. You can also select a layout with fewer months per page for larger individual day boxes.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I share the calendar digitally?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Download as PDF and share via email or cloud storage. Recipients can view on any device or print their own copies.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
