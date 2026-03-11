import React from "react"

export default function QrCodeCalendarEventSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter your event details: title, start date/time, and optionally end date/time. Add location (physical address or video call link) and description with agenda or additional info.
          </p>
          <p>
            The tool generates an iCalendar (.ics) format event encoded in the QR code. This universal format works with Google Calendar, Apple Calendar, Outlook, and most other calendar apps.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">What happens when scanned:</p>
            <ol className="text-sm space-y-1 list-decimal list-inside">
              <li>Device reads the calendar data from the QR code</li>
              <li>Calendar app prompts to add the event</li>
              <li>User reviews event details</li>
              <li>Event saves to their calendar with reminders</li>
            </ol>
          </div>
          <p>
            The QR code generates as you fill in details. Preview shows the event summary. Download for invitations, promotional materials, or event signage.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Conference and event invitations</h3>
            <p className="text-sm text-muted-foreground">
              Include QR codes on event invites. Attendees scan to save the date instantly. Reduces no-shows when events are in their calendar.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Webinar registration confirmations</h3>
            <p className="text-sm text-muted-foreground">
              Post-registration emails with "Add to Calendar" QR codes. Participants save the webinar details. Reminder notifications come from their calendar.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Wedding and party invitations</h3>
            <p className="text-sm text-muted-foreground">
              Wedding invites with ceremony and reception events. Guests save both automatically. Include map links in the location field.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Class and workshop schedules</h3>
            <p className="text-sm text-muted-foreground">
              Fitness studios and schools share class schedules. Students scan to save their enrolled classes. Automatic weekly reminders keep attendance high.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Appointment booking confirmations</h3>
            <p className="text-sm text-muted-foreground">
              Medical offices and salons provide calendar QR codes. Patients save appointment details immediately. Reduces forgotten appointments significantly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Product launch events</h3>
            <p className="text-sm text-muted-foreground">
              Press releases with event QR codes. Journalists save launch events to their calendars. Better attendance from busy media professionals.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Time zones use device settings.</strong>
              The event saves in the user's local time zone. For virtual events with specific times, include the time zone in the title or description.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">End time is optional but recommended.</strong>
              Events without end times show as all-day in some calendars. Always include end time for proper scheduling and reminders.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Location links work best as URLs.</strong>
              For video calls, paste the full Zoom/Teams link. For physical locations, use the address. Some calendars turn addresses into map links.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Recurring events aren't supported.</strong>
              This creates single events. For recurring meetings, create separate QR codes for each occurrence or use a calendar subscription link.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Include a backup link in the description. "Join: zoom.us/j/123456789" ensures attendees can access even if the location field doesn't create a clickable link.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Which calendar apps support this?</h3>
            <p className="text-sm text-muted-foreground">
              All major calendar apps: Google Calendar, Apple Calendar, Outlook, Yahoo Calendar, and most others. iCalendar format is universally supported.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I update the event after creating the QR code?</h3>
            <p className="text-sm text-muted-foreground">
              No, the event details are encoded in the QR pattern. To change details, generate a new QR code and redistribute it to attendees.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Will reminders be set automatically?</h3>
            <p className="text-sm text-muted-foreground">
              Default reminders depend on the user's calendar settings. They can add or modify reminders when accepting the event invitation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I include multiple events in one QR code?</h3>
            <p className="text-sm text-muted-foreground">
              This tool creates one event per QR code. For multiple events, create separate codes or link to a calendar page with all events.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I test the QR code?</h3>
            <p className="text-sm text-muted-foreground">
              Scan it with your phone. Verify the event details appear correctly. Check that the event saves to your calendar properly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I add attachments to the event?</h3>
            <p className="text-sm text-muted-foreground">
              Not through QR codes. Include links to documents in the description field. Users can access attachments via those links.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if someone doesn't have a calendar app?</h3>
            <p className="text-sm text-muted-foreground">
              All smartphones have built-in calendar apps. The QR code will work on any modern device. Desktop scanners may need a calendar application.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
