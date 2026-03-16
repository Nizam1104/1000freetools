import * as React from "react"

export default function TimezoneTimestampConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            Enter a Unix timestamp and select a source timezone (or use UTC default). The converter displays what that timestamp represents in your selected target timezone.
          </p>
          <p>
            Alternatively, enter a date and time with timezone, and get the equivalent Unix timestamp. The converter handles daylight saving time automatically based on the selected timezone and date.
          </p>
          <p>
            Results show the timestamp in multiple timezones simultaneously, making it easy to see how the same moment appears around the world. Copy any format with a single click.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Global Team Coordination</h3>
            <p className="text-sm text-muted-foreground">
              Find meeting times that work across multiple timezones for distributed teams.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Event Scheduling</h3>
            <p className="text-sm text-muted-foreground">
              Schedule webinars, launches, or broadcasts with correct times for all regions.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Log Correlation</h3>
            <p className="text-sm text-muted-foreground">
              Convert server timestamps from different timezones to compare events accurately.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Travel Planning</h3>
            <p className="text-sm text-muted-foreground">
              Calculate local times at destinations for flight arrivals and connections.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Customer Support</h3>
            <p className="text-sm text-muted-foreground">
              Determine business hours in customer timezones for support coverage planning.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Broadcasting</h3>
            <p className="text-sm text-muted-foreground">
              Schedule content releases to go live at optimal times in different regions.
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
              <strong className="text-foreground">Unix timestamps are UTC:</strong> Unix timestamps don't have timezone - they're always UTC. Timezone only matters when displaying as human-readable date.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">DST handling:</strong> Daylight saving time is applied automatically based on timezone rules for the specific date.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Timezone database:</strong> Uses IANA timezone database (Olson database) for accurate historical and future timezone rules.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Common timezones:</strong> America/New_York, Europe/London, Asia/Tokyo, etc. City-based names ensure correct DST rules.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Offset notation:</strong> Timezones can also be specified as UTC+05:30 or UTC-08:00 for fixed offsets without DST.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">What timezone is Unix timestamp?</h3>
            <p className="text-sm text-muted-foreground">
              Unix timestamps are always UTC. They don't have timezone. Timezone only applies when converting to human-readable date.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I convert to my timezone?</h3>
            <p className="text-sm text-muted-foreground">
              Enter the timestamp and select your timezone. The converter shows the local time for that moment in your selected timezone.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Does this handle DST?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Daylight saving time is applied automatically based on the timezone and date. Summer and winter times are handled correctly.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What is UTC?</h3>
            <p className="text-sm text-muted-foreground">
              UTC (Coordinated Universal Time) is the primary time standard. It doesn't observe DST. All Unix timestamps are in UTC.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I find time in multiple zones?</h3>
            <p className="text-sm text-muted-foreground">
              The converter shows the timestamp in multiple timezones simultaneously. Compare times across regions at a glance.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What's EST vs EDT?</h3>
            <p className="text-sm text-muted-foreground">
              EST is Eastern Standard Time (UTC-5). EDT is Eastern Daylight Time (UTC-4). The converter uses the correct one based on date.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I convert date with timezone to timestamp?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Enter date, time, and timezone. The converter calculates the Unix timestamp for that exact moment.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
