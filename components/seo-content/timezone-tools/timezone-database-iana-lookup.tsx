import React from "react"

export default function TimezoneDatabaseIanaLookupSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the IANA Timezone Database Lookup Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool searches the IANA Timezone Database (also known as tz database or zoneinfo) to find timezone information by location, timezone name, or UTC offset. The IANA database is the standard reference for timezone data used by operating systems, programming languages, and applications.
          </p>
          <p>
            Each timezone entry includes the canonical name (like "America/New_York"), UTC offset, daylight saving time rules, and historical changes. The database tracks timezone information dating back to 1970 for most regions, with some data going back to the 1800s.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Information provided for each timezone:</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Canonical timezone name (e.g., "Europe/London")</li>
              <li>Current UTC offset (e.g., UTC+0 or UTC+1 for BST)</li>
              <li>Daylight saving time status and rules</li>
              <li>Country code and region</li>
              <li>Major cities in the timezone</li>
              <li>Historical timezone changes</li>
              <li>Abbreviations (GMT, BST, EST, EDT, etc.)</li>
            </ul>
          </div>
          <p>
            Search by city name, country, or partial timezone identifier. Results show matching timezones with their current offset and DST status. Click any timezone for detailed information including transition dates and historical data.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Configuring server timezones</h3>
            <p className="text-sm text-muted-foreground">
              Setting up a server and need the correct timezone string? Search for your location, get the canonical IANA name (e.g., "America/Chicago" not "CST"). Use this in your server config for accurate time handling.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging timezone bugs</h3>
            <p className="text-sm text-muted-foreground">
              Application showing wrong times? Look up the timezone your app is using. Verify the UTC offset and DST rules match expectations. Common issue: using abbreviations (EST) instead of IANA names.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Database timestamp troubleshooting</h3>
            <p className="text-sm text-muted-foreground">
              Timestamps stored in database look wrong? Check what timezone the database server uses. Compare with IANA data to understand if it's a storage issue or display issue.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Finding timezone for a location</h3>
            <p className="text-sm text-muted-foreground">
              User says they're in "Springfield" but there are 34 Springfields in the US. Search to see which timezones different Springfields are in. Disambiguate based on state or country context.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Understanding DST transition dates</h3>
            <p className="text-sm text-muted-foreground">
              When does DST start in Australia? (Hint: opposite of Northern Hemisphere.) Look up "Australia/Sydney" to see exact transition dates. Different countries change clocks on different dates.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Validating user timezone input</h3>
            <p className="text-sm text-muted-foreground">
              Building a form where users select their timezone? Use the database to validate entries. Ensure users pick valid IANA names, not made-up abbreviations that will break in production.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Always use IANA names, not abbreviations.</strong>
              "EST" is ambiguous - could mean US Eastern, Australian Eastern, or something else. "America/New_York" is unambiguous. Abbreviations also don't handle DST transitions correctly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Timezone database versions matter.</strong>
              The IANA database is updated several times per year. Countries change DST rules, new timezones are added. Your system's timezone data might be outdated. Check the database version.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some locations have changed timezones.</strong>
              Samoa skipped a day in 2011. Crimea changed from Ukraine to Russia timezone in 2014. Historical lookups show these changes. Current offset might differ from historical offset.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">UTC offset isn't the same as timezone.</strong>
              "UTC-5" could be America/New_York (EST), America/Bogota (Colombia), or America/Lima (Peru). These have different DST rules. Always use the full timezone name.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Store timestamps in UTC in your database, convert to local timezone only for display. This avoids timezone confusion and makes data portable across regions.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between UTC and GMT?</h3>
            <p className="text-sm text-muted-foreground">
              For practical purposes, they're the same offset (UTC+0 = GMT). UTC is the modern standard based on atomic time. GMT is the older astronomical standard. Use UTC in technical contexts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why are some timezone names City/Country format?</h3>
            <p className="text-sm text-muted-foreground">
              IANA uses "Area/Location" format. Area is usually a continent or ocean. Location is a major city. "America/New_York" means the timezone used in New York within the Americas region.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How often does the timezone database update?</h3>
            <p className="text-sm text-muted-foreground">
              Typically 3-4 times per year. Updates include DST rule changes, new timezones, and historical corrections. Operating systems and languages release updates incorporating these changes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What timezone should servers use?</h3>
            <p className="text-sm text-muted-foreground">
              Best practice: UTC. No DST complications, consistent across all servers regardless of physical location. Convert to local time only for user-facing displays.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does my timezone have multiple abbreviations?</h3>
            <p className="text-sm text-muted-foreground">
              Many timezones use different abbreviations for standard time and daylight time. EST (winter) and EDT (summer) for New York. The abbreviation changes when DST starts/ends.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can a country have multiple timezones?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, large countries span multiple timezones. USA has 9 timezones (including territories). Russia has 11. Australia has 3 main timezones plus special cases. Search by city for accuracy.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about places that don't observe DST?</h3>
            <p className="text-sm text-muted-foreground">
              Many countries near the equator don't use DST - daylight hours don't vary much. Japan, China, India, and most African nations don't observe DST. Their UTC offset stays constant year-round.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
