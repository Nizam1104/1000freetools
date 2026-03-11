import * as React from "react"

export default function CalendarSyncOverlaySeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            Connect multiple calendar sources by providing their iCal/ICS feed URLs or uploading calendar files. Supported sources include Google Calendar, Outlook, Apple Calendar, and any service that provides iCal format exports.
          </p>
          <p>
            Each calendar is assigned a distinct color for easy visual differentiation. The overlay view displays all calendars in a unified timeline, showing overlapping events, conflicts, and free time slots across all sources.
          </p>
          <p>
            Identify scheduling conflicts instantly with visual indicators when events overlap. Find mutual free time by looking for gaps in the overlay. Export the merged view or share a read-only link with others who need to see combined availability.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Team Scheduling</h3>
            <p className="text-sm text-muted-foreground">
              Overlay team members' calendars to find meeting times when everyone is available without back-and-forth emails.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Work-Life Balance</h3>
            <p className="text-sm text-muted-foreground">
              Combine work and personal calendars to see your complete schedule and avoid overcommitting.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Family Coordination</h3>
            <p className="text-sm text-muted-foreground">
              Merge family members' schedules to coordinate activities, appointments, and childcare responsibilities.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Resource Booking</h3>
            <p className="text-sm text-muted-foreground">
              Overlay room or equipment calendars to check availability before booking shared resources.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Freelancer Management</h3>
            <p className="text-sm text-muted-foreground">
              Track multiple client projects and deadlines in one view to manage workload and avoid conflicts.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Event Planning</h3>
            <p className="text-sm text-muted-foreground">
              Coordinate vendor schedules, venue availability, and team commitments for complex event planning.
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
              <strong className="text-foreground">Read-only access:</strong> This tool displays calendar data but doesn't modify source calendars. Changes must be made in the original calendar applications.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Calendar feed URLs:</strong> Most calendar services provide "secret" or "private" iCal URLs for sharing. These are found in calendar settings under sharing or export options.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Sync frequency:</strong> Calendar data is fetched when you load the page. For real-time updates, refresh the page. Some services may cache feed data for a few hours.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Privacy considerations:</strong> Only share calendar feed URLs with trusted parties. Some URLs provide full event details to anyone who has the link.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Time zone handling:</strong> All events are displayed in your local time zone. Events from calendars in other time zones are automatically converted.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">How do I get my Google Calendar iCal URL?</h3>
            <p className="text-sm text-muted-foreground">
              In Google Calendar, go to Settings for your calendar, find "Integrate calendar," and copy the "Secret address in iCal format." This URL provides read-only access.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I edit events in the overlay view?</h3>
            <p className="text-sm text-muted-foreground">
              No. This is a read-only visualization tool. To edit events, open the original calendar application where the event was created.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How many calendars can I overlay?</h3>
            <p className="text-sm text-muted-foreground">
              There's no strict limit, but for clarity, 5-10 calendars work best. Too many overlapping calendars become difficult to read visually.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What happens when events overlap?</h3>
            <p className="text-sm text-muted-foreground">
              Overlapping events are displayed side-by-side or with visual indicators showing the conflict. Hover over events to see full details of each overlapping item.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I share the overlay with others?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Generate a shareable link that shows the combined calendar view. Recipients see the same overlay but cannot access the underlying calendar sources.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Does this work with Outlook calendars?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Outlook provides iCal URLs in calendar sharing settings. Publish the calendar with "Can view all details" permissions and copy the ICS link.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I find free time slots?</h3>
            <p className="text-sm text-muted-foreground">
              Look for gaps in the overlay where no events appear. Some views highlight free time blocks explicitly. Filter to show only specific calendars if needed.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
