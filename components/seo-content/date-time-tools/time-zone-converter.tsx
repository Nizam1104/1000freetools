import React from "react"

export default function TimeZoneConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select your source date, time, and time zone. The converter calculates the equivalent time in any other time zone worldwide. It automatically handles Daylight Saving Time (DST) changes based on the date you select.
          </p>
          <p>
            Add multiple time zones to compare times side-by-side. Each zone displays the converted time with its local date and timezone abbreviation. The current time display updates every second for real-time accuracy.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Example conversion:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">Source: 2:00 PM EST (New York)
Target: GMT (London)
Result: 7:00 PM GMT (same day)</pre>
          </div>
          <p>
            Time zones are based on the IANA timezone database, ensuring accurate historical and future conversions. The tool handles edge cases like midnight crossings and date changes automatically.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">International conference calls</h3>
            <p className="text-sm text-muted-foreground">
              Schedule meetings across continents. Find times that work for teams in New York, London, and Tokyo. Avoid calling colleagues at 3 AM their time.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Flight and travel planning</h3>
            <p className="text-sm text-muted-foreground">
              Calculate arrival times in destination timezone. Adjust for jet lag planning. Know what time you'll actually land in local time.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Live event viewing</h3>
            <p className="text-sm text-muted-foreground">
              Sports fans check when games air locally. Stream viewers find broadcast times. Never miss a premiere due to timezone confusion.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Remote work coordination</h3>
            <p className="text-sm text-muted-foreground">
              Distributed teams coordinate handoffs. Async workers schedule overlap hours. Managers respect local working hours across regions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Family communication</h3>
            <p className="text-sm text-muted-foreground">
              Expats call home at reasonable hours. Grandparents video chat with grandkids. Long-distance relationships stay connected without wake-up calls.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Webinar and event hosting</h3>
            <p className="text-sm text-muted-foreground">
              Hosts announce times in multiple zones. Registrants see local start times. Global audiences join at the right moment.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">DST changes affect results.</strong>
              Daylight Saving Time rules vary by country and change over time. The converter uses historical DST data for accuracy. Always verify for critical scheduling.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some zones have half-hour offsets.</strong>
              India (IST) is UTC+5:30. Nepal is UTC+5:45. Not all zones are whole hours from UTC. The tool handles these correctly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Date can change across zones.</strong>
              When it's 11 PM in New York, it's already tomorrow in Tokyo. The converter shows the correct local date for each timezone.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">City names map to specific zones.</strong>
              "New York" means America/New_York timezone. Some cities share zones. Select the city closest to your actual location.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For recurring meetings, check both summer and winter dates. DST transitions can shift meeting times by an hour seasonally.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What is UTC?</h3>
            <p className="text-sm text-muted-foreground">
              Coordinated Universal Time is the primary time standard. It doesn't observe DST. All time zones are defined as offsets from UTC.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why do time zones change?</h3>
            <p className="text-sm text-muted-foreground">
              Governments change DST rules and timezone boundaries. Political decisions affect timezone assignments. The database updates reflect these changes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How accurate is this for past dates?</h3>
            <p className="text-sm text-muted-foreground">
              Very accurate for recent decades. Historical DST rules are well-documented. For very old dates (pre-1970), accuracy may vary by region.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the International Date Line?</h3>
            <p className="text-sm text-muted-foreground">
              An imaginary line where the date changes. Crossing west adds a day. Crossing east subtracts a day. It zigzags to avoid splitting countries.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do all countries use DST?</h3>
            <p className="text-sm text-muted-foreground">
              No. Most equatorial countries don't observe DST. The US and Europe do. Many Asian and African countries don't. Rules vary significantly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert more than 2 zones?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, add as many time zones as needed. Each appears in its own card. Compare times across all your locations simultaneously.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does my time show AM/PM?</h3>
            <p className="text-sm text-muted-foreground">
              The converter uses 12-hour format with AM/PM for readability. Times are accurate regardless of format. 24-hour users can mentally convert.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
