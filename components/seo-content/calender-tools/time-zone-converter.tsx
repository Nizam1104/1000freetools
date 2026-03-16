import * as React from "react"

export default function TimeZoneConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            Select your source time zone from the dropdown, then enter the date and time you want to convert. Add target time zones to see what that moment looks like around the world. The converter instantly shows the equivalent time in each location, including whether it falls on the previous or next day.
          </p>
          <p>
            The world clock section displays current time in 25 major time zones, updating every second. Each clock shows the local time, day of week, and time zone abbreviation. This is useful for quickly checking if it's a reasonable hour to contact someone in another region.
          </p>
          <p>
            Use the meeting planner section for guidance on overlapping business hours between major regions. The tool calculates exact time differences accounting for daylight saving time where applicable, and shows clear indicators when converted times cross day boundaries.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Remote Team Meetings</h3>
            <p className="text-sm text-muted-foreground">
              Find meeting times that work for colleagues spread across continents without anyone joining at 3 AM.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">International Calls</h3>
            <p className="text-sm text-muted-foreground">
              Schedule calls with clients, vendors, or family members in different time zones without the mental math.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Travel Planning</h3>
            <p className="text-sm text-muted-foreground">
              Know what time it will be at your destination when you depart, and plan calls home accordingly.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Live Event Coordination</h3>
            <p className="text-sm text-muted-foreground">
              Coordinate product launches, webinars, or broadcasts that need to reach audiences in multiple regions.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Customer Support Scheduling</h3>
            <p className="text-sm text-muted-foreground">
              Plan support coverage across time zones to ensure customers always have access during their business hours.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Software Deployment</h3>
            <p className="text-sm text-muted-foreground">
              Schedule system maintenance or deployments during low-traffic hours across all affected regions.
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
              <strong className="text-foreground">Daylight saving time handled automatically:</strong> The converter accounts for DST transitions based on the selected date. Times shown will reflect whether DST is active in each zone on that specific date.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">City-based time zones:</strong> Time zones are represented by major cities (e.g., "America/New_York" for Eastern Time). This ensures accurate DST rules since different regions within the same offset may have different DST schedules.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Day boundary indicators:</strong> When a converted time falls on a different day than the source time, you'll see "Next Day" or "Previous Day" badges to avoid scheduling confusion.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Business hours guidance:</strong> The meeting planner shows typical overlap windows, but always verify with participants as individual schedules vary.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Copy summary feature:</strong> Generate a formatted summary of all converted times that you can paste directly into emails, calendar invites, or chat messages.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">How do I add more time zones to compare?</h3>
            <p className="text-sm text-muted-foreground">
              Use the dropdown under "To Time Zones" to select additional zones, then click the plus button. You can add as many as needed. Remove zones by clicking the trash icon on their badge.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Why does the time difference change for some zones?</h3>
            <p className="text-sm text-muted-foreground">
              Time differences vary because some regions observe daylight saving time while others don't. When you change the date, the converter recalculates based on whether DST is active in each zone on that specific date.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I use this for historical dates?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but with caveats. The converter uses current time zone rules, which may not reflect historical DST changes or time zone boundary shifts. For recent dates it's accurate; for dates decades ago, verify with historical records.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What's the best time for a meeting between US and Europe?</h3>
            <p className="text-sm text-muted-foreground">
              Generally, 9 AM to 12 PM Eastern Time works well, corresponding to 2 PM to 5 PM in London and 3 PM to 6 PM in Central Europe. The meeting planner section shows specific overlap windows.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How accurate is the world clock?</h3>
            <p className="text-sm text-muted-foreground">
              The world clock updates every second using your device's system time. Accuracy depends on your device's clock synchronization. For mission-critical timing, use atomic clock sources.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I save my favorite time zone combinations?</h3>
            <p className="text-sm text-muted-foreground">
              Currently, selections reset when you refresh the page. For regular use with the same zones, bookmark the page after setting up your preferred configuration, or keep a note of your常用 zones for quick re-entry.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Does this work for half-hour offset time zones?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Time zones like India (UTC+5:30), Nepal (UTC+5:45), and Newfoundland (UTC-3:30) are fully supported with accurate minute-level conversions.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
