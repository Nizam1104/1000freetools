import * as React from "react"

export default function CalendarRssGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            Create an RSS feed for your calendar events by entering event details including title, description, start date/time, and end date/time. Add as many events as needed - each becomes an item in the RSS feed.
          </p>
          <p>
            Configure feed metadata including the feed title, description, website URL, and language. These details help RSS readers properly categorize and display your calendar feed to subscribers.
          </p>
          <p>
            Generate the RSS feed XML with a single click. Copy the XML code to save as an .rss or .xml file on your web server, or paste it into an RSS feed management service. Share the feed URL with subscribers who can add it to their RSS reader or calendar application.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">School Calendars</h3>
            <p className="text-sm text-muted-foreground">
              Share school event schedules with parents who can subscribe and get automatic updates in their calendar app.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Community Organizations</h3>
            <p className="text-sm text-muted-foreground">
              Keep members informed about meetings, events, and deadlines with a subscribable calendar feed.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Business Events</h3>
            <p className="text-sm text-muted-foreground">
              Publish webinars, product launches, or conference schedules that customers can subscribe to.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Sports Teams</h3>
            <p className="text-sm text-muted-foreground">
              Share game schedules, practice times, and team events with players and families via RSS.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Theater Groups</h3>
            <p className="text-sm text-muted-foreground">
              Publish performance schedules, rehearsal times, and audition dates for cast and crew members.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Podcast Release Schedule</h3>
            <p className="text-sm text-muted-foreground">
              Create a calendar feed showing upcoming episode release dates so listeners can plan ahead.
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
              <strong className="text-foreground">RSS 2.0 standard:</strong> The generated feed follows the RSS 2.0 specification with calendar extensions, ensuring compatibility with most RSS readers and calendar applications.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Hosting required:</strong> You'll need to host the XML file on a web server or use an RSS feed hosting service for others to subscribe. The tool generates the content but doesn't host it.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Date format matters:</strong> All dates are formatted in RFC 822 format (the RSS standard) automatically. You don't need to worry about formatting - just enter dates naturally.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Updates require regeneration:</strong> This tool creates static RSS feeds. To update events, regenerate the feed and replace the file on your server.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Calendar subscription:</strong> Many calendar apps (Google Calendar, Apple Calendar, Outlook) can subscribe to RSS feeds containing calendar events.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">How do people subscribe to my calendar feed?</h3>
            <p className="text-sm text-muted-foreground">
              Share the URL where you host the RSS file. Subscribers add it to their RSS reader or calendar app using the "Subscribe to Calendar by URL" or "Add Feed" option.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I include recurring events?</h3>
            <p className="text-sm text-muted-foreground">
              This tool creates simple RSS feeds without recurrence rules. For recurring events, add each occurrence as a separate event, or use a dedicated calendar service with iCal export.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Where should I host the RSS file?</h3>
            <p className="text-sm text-muted-foreground">
              Upload the XML file to your website's public folder, use GitHub Pages, or employ a dedicated RSS hosting service. The file needs a publicly accessible URL.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How many events can I include?</h3>
            <p className="text-sm text-muted-foreground">
              There's no hard limit, but RSS feeds work best with 10-50 upcoming events. Very large feeds may be slow to load in some readers.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I add images to events?</h3>
            <p className="text-sm text-muted-foreground">
              Basic RSS 2.0 doesn't support images in items. Some readers support enclosures or media RSS extensions, but this tool generates standard RSS for maximum compatibility.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I update the calendar?</h3>
            <p className="text-sm text-muted-foreground">
              Make your changes in this tool, regenerate the RSS XML, and replace the file on your server. Subscribers will see updates the next time their reader refreshes (usually within hours).
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Is this the same as iCal or Google Calendar?</h3>
            <p className="text-sm text-muted-foreground">
              RSS is different from iCal (.ics) format. RSS is primarily for reading updates, while iCal is designed specifically for calendar imports. Some apps support both.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
