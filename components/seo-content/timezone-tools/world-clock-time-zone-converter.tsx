import React from "react"

export default function WorldClockTimeZoneConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter a time in one timezone and instantly see what time it is in multiple other timezones around the world. The converter handles daylight saving time automatically.
          </p>
          <p>
            Add as many cities or timezones as you need. The tool shows all times side-by-side so you can find overlapping hours for meetings or calls.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Example conversion:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">Input: 9:00 AM Monday, New York (EST)
Output:
  New York: 9:00 AM Monday
  London: 2:00 PM Monday
  Tokyo: 11:00 PM Monday
  Sydney: 1:00 AM Tuesday
  Los Angeles: 6:00 AM Monday</pre>
          </div>
          <p>
            The converter shows the day of week for each timezone. A morning meeting in the US might be late evening or even the next day in Asia and Australia.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Global team standups</h3>
            <p className="text-sm text-muted-foreground">
              A scrum team has members in San Francisco, London, and Bangalore. The converter shows 9 AM PST is 5 PM GMT and 10:30 PM IST. They rotate meeting times weekly to share the inconvenience.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">International conference calls</h3>
            <p className="text-sm text-muted-foreground">
              Quarterly business reviews include executives from 5 continents. The converter helps find the rare 2-hour window when it's business hours for New York, London, and Singapore simultaneously.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Software release coordination</h3>
            <p className="text-sm text-muted-foreground">
              DevOps teams coordinate deployments across regions. A release at 2 AM UTC means 9 AM in Sydney, 10 PM previous day in New York. The converter ensures all teams know their local time.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Live broadcast scheduling</h3>
            <p className="text-sm text-muted-foreground">
              A company announces a product launch at 10 AM Pacific Time. The converter shows it's 1 PM Eastern, 6 PM in London, 2 AM next day in Sydney - helping viewers worldwide know when to tune in.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Customer support handoffs</h3>
            <p className="text-sm text-muted-foreground">
              Support teams in Manila, Dublin, and Phoenix pass tickets between shifts. The converter shows when shifts overlap for handoff meetings and ensures 24/7 coverage without gaps.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Online class scheduling</h3>
            <p className="text-sm text-muted-foreground">
              An instructor teaches students from 15 countries. The converter helps find times that don't require anyone to attend at 3 AM. Sometimes two sessions are needed for different regions.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Daylight saving transitions happen on different dates.</strong>
              The US switches DST in March and November, Europe in March and October. Between these dates, the time difference temporarily changes by an hour. Always verify dates around transition periods.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some timezones have half-hour offsets.</strong>
              India is UTC+5:30, Nepal is UTC+5:45, and the Chatham Islands are UTC+12:45. When converting, you'll see times like 9:30 or 9:45 instead of round hours.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">The International Date Line affects day of week.</strong>
              When it's Monday morning in the US, it's already Tuesday in Australia and New Zealand. The converter shows the correct day for each timezone.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Use city names for clarity.</strong>
              "Eastern Time" could mean US Eastern or Australian Eastern. Use "New York" or "Sydney" to be specific. The converter uses IANA timezone names internally for accuracy.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For recurring meetings, check the conversion for both January and July. This reveals if DST changes will affect the meeting time in any location.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the best time for a global meeting?</h3>
            <p className="text-sm text-muted-foreground">
              For US-Europe-Asia, try 2-3 PM London time (9-10 AM New York, 10-11 PM Singapore). For US-Europe only, 3 PM London (10 AM New York, 4 PM Berlin) works well. No single time works for all regions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I handle daylight saving time changes?</h3>
            <p className="text-sm text-muted-foreground">
              The converter automatically accounts for DST based on the date you select. If scheduling a recurring meeting, verify times for both summer and winter dates to catch any shifts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does Sydney show a different day?</h3>
            <p className="text-sm text-muted-foreground">
              Sydney is 16-18 hours ahead of US timezones. When it's Monday morning in New York, it's already Tuesday morning in Sydney. The International Date Line causes this day difference.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert times for historical dates?</h3>
            <p className="text-sm text-muted-foreground">
              The converter uses current timezone rules. Historical DST rules have changed - some countries abolished it, others adopted it. For historical accuracy, use a dedicated historical timezone database.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What timezone should I use for UTC?</h3>
            <p className="text-sm text-muted-foreground">
              UTC (Coordinated Universal Time) is the global standard. It's also called GMT or Zulu time. Use UTC for timestamps in logs, databases, and APIs to avoid timezone confusion.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How accurate is the daylight saving calculation?</h3>
            <p className="text-sm text-muted-foreground">
              The converter uses the IANA timezone database which tracks DST rules worldwide. Rules can change with new legislation, but the database is updated regularly to reflect current laws.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the time difference between major cities?</h3>
            <p className="text-sm text-muted-foreground">
              London is 5 hours ahead of New York, 8 hours ahead of Los Angeles. Tokyo is 14 hours ahead of New York, 9 hours ahead of London. Sydney is 16 hours ahead of New York, 11 hours ahead of London.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
