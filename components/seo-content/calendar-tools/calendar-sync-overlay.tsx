import React from "react"

export default function CalendarSyncOverlaySeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Calendar Sync Overlay Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Add events by entering a title, selecting a date, and choosing a color. Each event appears immediately in the calendar preview. Add optional URLs for event details or video calls.
          </p>
          <p>
            The calendar displays a monthly view with color-coded events. Multiple events on the same day stack visually. Click color swatches to categorize events by type or priority.
          </p>
          <p>
            Export your calendar as an ICS file compatible with Google Calendar, Apple Calendar, Outlook, and other calendar applications. The file contains all your events with dates and colors.
          </p>
          <p>
            Generate a Google Calendar URL to add events directly with one click. The URL pre-fills event details in Google Calendar's event creation interface.
          </p>
          <p>
            Copy the ICS data to clipboard for pasting into calendar applications that support direct import. Manage events with add, edit, and delete functions.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Family calendar coordination</h3>
            <p className="text-sm text-muted-foreground">
              Combine everyone's schedules in one view. Color-code by family member. Export to share with the whole household. No more scheduling conflicts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Project milestone tracking</h3>
            <p className="text-sm text-muted-foreground">
              Map out project deadlines and deliverables. Visual timeline keeps team aligned. Export to integrate with existing project calendars.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Content calendar planning</h3>
            <p className="text-sm text-muted-foreground">
              Schedule blog posts, social media, and videos. Color-code by platform or content type. Export to your team's shared calendar.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Event planning coordination</h3>
            <p className="text-sm text-muted-foreground">
              Track vendor deadlines, venue bookings, and guest list milestones. Keep wedding or conference planning organized. Share with co-planners.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Academic semester overview</h3>
            <p className="text-sm text-muted-foreground">
              Plot assignment due dates, exam periods, and breaks. Visual semester view helps with time management. Import to student calendar apps.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Travel itinerary compilation</h3>
            <p className="text-sm text-muted-foreground">
              Combine flights, hotels, tours, and reservations. One calendar shows the entire trip. Share with travel companions automatically.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">ICS files work with most calendar apps.</strong>
              The iCalendar format (.ics) is a universal standard. Google Calendar, Apple Calendar, Outlook, and Thunderbird all support it. Import is usually a simple drag-and-drop.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Events are all-day by default.</strong>
              Created events don't include specific times. They appear as all-day events in calendar applications. Add time details after importing if needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Colors may not transfer to all apps.</strong>
              Some calendar applications preserve event colors from the ICS file. Others use default colors. Google Calendar typically maintains colors.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Updates require re-exporting.</strong>
              This creates a static calendar file. Changes to events require generating a new ICS file and re-importing. For dynamic sync, use calendar subscription features.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Name your calendar descriptively before exporting. The calendar name appears in your calendar app's sidebar, making it easier to identify and manage.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I import the ICS file to Google Calendar?</h3>
            <p className="text-sm text-muted-foreground">
              Open Google Calendar. Click the gear icon, select Settings. In the left sidebar, click Import & Export. Choose your ICS file and select which calendar to add events to.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I add recurring events?</h3>
            <p className="text-sm text-muted-foreground">
              This basic version creates single-date events. For recurring events, add each occurrence separately or use your calendar app's recurrence features after importing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the maximum number of events?</h3>
            <p className="text-sm text-muted-foreground">
              No hard limit, but very large calendars (500+ events) may be slow to import. For extensive event lists, consider splitting into multiple calendar files.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I edit events after importing?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, once imported, events become part of your calendar. Edit them directly in your calendar application. Changes won't sync back to this tool.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work with Outlook?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, Outlook supports ICS files. Go to File, Open & Export, Import/Export. Select Import an iCalendar (.ics) or vCalendar file (.vcf).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I share the calendar with others?</h3>
            <p className="text-sm text-muted-foreground">
              Share the ICS file directly, or import to a cloud calendar and share from there. Google Calendar allows sharing entire calendars with specific people or via public link.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What happens to event URLs?</h3>
            <p className="text-sm text-muted-foreground">
              URLs are included in the ICS file as event properties. Some calendar apps display them as clickable links. Others may not show them - test with your specific application.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
