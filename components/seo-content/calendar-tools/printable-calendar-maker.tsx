import React from "react"

export default function PrintableCalendarMakerSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Printable Calendar Maker Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select any year to create a custom calendar. Choose which months to include by clicking individual month buttons or using Select All. Only selected months will appear in the print output.
          </p>
          <p>
            Configure options like week numbers, holiday display, orientation (portrait or landscape), and paper size (Letter or A4). These settings affect the final printed layout.
          </p>
          <p>
            The preview shows exactly how your calendar will look when printed. Each month displays in a grid format with days of the week and date numbers.
          </p>
          <p>
            Enable week numbers to show ISO week numbers alongside each week. This helps with business planning and project scheduling.
          </p>
          <p>
            Click Print to send directly to your printer. The calendar is formatted for clean printing with proper margins and page breaks between months.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Office wall calendars</h3>
            <p className="text-sm text-muted-foreground">
              Create custom wall calendars for the workplace. Mark company events, deadlines, and meetings. Everyone can see the big picture at a glance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Home family organization</h3>
            <p className="text-sm text-muted-foreground">
              Keep the family schedule visible to everyone. Add activities, appointments, and important dates. Reduce scheduling conflicts and forgotten events.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Classroom management</h3>
            <p className="text-sm text-muted-foreground">
              Display monthly calendars for students. Mark test dates, project deadlines, and school events. Helps students develop time management skills.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Project planning boards</h3>
            <p className="text-sm text-muted-foreground">
              Print calendars for project war rooms. Mark milestones, deliverables, and team availability. Visual timeline keeps projects on track.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Bullet journal inserts</h3>
            <p className="text-sm text-muted-foreground">
              Print calendar pages for bullet journals or planners. Customize which months you need. Leave space for handwritten notes and decorations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Senior care facilities</h3>
            <p className="text-sm text-muted-foreground">
              Large-print calendars help seniors stay oriented. Mark medication schedules, appointments, and social activities. Reduces confusion and anxiety.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Portrait vs landscape affects layout.</strong>
              Portrait orientation shows one month per page, taller format. Landscape shows months wider, potentially fitting more months per page. Choose based on your display space.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Letter and A4 are different sizes.</strong>
              Letter (8.5x11 inches) is standard in the US. A4 (210x297mm) is international standard. Choose based on your location and paper supply.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Week numbers follow ISO standard.</strong>
              ISO week numbers start with the week containing January 4th. Week 1 is the first week with at least 4 days in the new year. Monday is the first day of the week.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Holidays shown are US federal holidays.</strong>
              Major US holidays appear on the calendar. For other countries' holidays, you'll need to handwrite them or use a different calendar source.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Printing tip:</strong> Use your printer's "Fit to Page" or "Scale to Fit" option for best results. Ensure margins are set appropriately for your printer model.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I save the calendar as PDF?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, in the print dialog, select "Save as PDF" or "Microsoft Print to PDF" as your printer. This creates a PDF file you can save, email, or print later.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I add my own events?</h3>
            <p className="text-sm text-muted-foreground">
              Print the calendar first, then handwrite your events. Or use the PDF version and add text digitally before printing. This keeps the calendar clean and customizable.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I print multiple copies?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, in the print dialog, specify the number of copies. Print extras for backup or to share with family members, team members, or colleagues.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What paper weight works best?</h3>
            <p className="text-sm text-muted-foreground">
              Standard 20-24 lb paper works fine. For wall calendars that last all year, consider 28-32 lb paper or cardstock. Heavier paper resists tearing and shows less bleed-through.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I print just one month?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, deselect all months, then click only the month you want. The preview and print will show just that single month. Perfect for monthly planning.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is there a way to bind multiple months?</h3>
            <p className="text-sm text-muted-foreground">
              Print with extra left margin for binding. Use a hole punch and binder, or take to a print shop for spiral binding. Creates a professional flip-calendar.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this commercially?</h3>
            <p className="text-sm text-muted-foreground">
              This tool is for personal use. For commercial calendar production, consider licensing calendar templates or using professional design software with commercial licenses.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
