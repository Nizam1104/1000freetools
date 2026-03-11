import React from "react"

export default function TimezoneConverterSEO() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How the Time Zone Converter Works</h2>
        <div className="prose prose-sm dark:prose-invert">
          <p className="text-muted-foreground">
            This tool converts date and time between different time zones worldwide using the IANA timezone database.
            It accounts for daylight saving time automatically and displays UTC offsets for clarity.
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <h3 className="text-lg font-semibold">Conversion Process</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Select or enter the source date and time</li>
            <li>Choose the source timezone (where the time is currently)</li>
            <li>Choose the target timezone (where you want to convert to)</li>
            <li>The tool calculates the equivalent time in the target timezone</li>
            <li>Results show both times with their UTC offsets</li>
            <li>Daylight saving time is automatically accounted for based on the date</li>
          </ol>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Specific Use Cases</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">International Meeting Scheduling</h3>
            <p className="text-sm text-muted-foreground">
              A project manager in New York needs to schedule a call with teams in London and Tokyo.
              They convert 2 PM EST to find it&apos;s 7 PM in London and 4 AM (next day) in Tokyo,
              helping them find a better time.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Remote Work Coordination</h3>
            <p className="text-sm text-muted-foreground">
              A remote worker in California wants to know when their 9 AM standup is for their
              Berlin-based colleague. Converting 9 AM PST shows 6 PM CET, confirming overlap exists.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Flight and Travel Planning</h3>
            <p className="text-sm text-muted-foreground">
              A traveler sees their flight departs at 23:00 local time from Dubai and arrives
              at 06:00 in London. Converting times helps them understand the actual flight duration
              and plan their arrival transportation.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Live Event Viewing</h3>
            <p className="text-sm text-muted-foreground">
              A sports fan in Sydney wants to watch a live game starting at 8 PM EST from New York.
              Converting shows it&apos;s 12 PM (noon) the next day in Sydney, so they set their alarm.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Software Deployment Coordination</h3>
            <p className="text-sm text-muted-foreground">
              A DevOps team schedules maintenance windows. They convert 2 AM UTC to local times
              for all regions to ensure minimal user impact across global timezones.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using This Tool</h2>
        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <p className="text-muted-foreground">
            Understanding timezone conversion and DST:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Uses IANA timezone database (e.g., America/New_York, not just EST)</li>
            <li>Daylight saving time is automatically applied based on the selected date</li>
            <li>UTC offsets change during DST transitions (e.g., EST is UTC-5, EDT is UTC-4)</li>
            <li>Some regions don&apos;t observe daylight saving time</li>
            <li>Timezone names follow the &quot;Region/City&quot; format for precision</li>
            <li>Results include the UTC offset for verification</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Why use city names instead of EST/PST?</h3>
            <p className="text-sm text-muted-foreground">
              City-based timezones (America/New_York) are more precise because they account for
              daylight saving time rules. &quot;EST&quot; is ambiguous - it could mean Eastern Standard Time
              or Eastern Summer Time in different contexts.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">How does daylight saving time affect conversions?</h3>
            <p className="text-sm text-muted-foreground">
              DST shifts clocks forward (usually +1 hour) in spring and back in fall.
              The tool automatically applies the correct offset based on the date you select.
              For example, New York is UTC-5 in winter (EST) and UTC-4 in summer (EDT).
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What is UTC?</h3>
            <p className="text-sm text-muted-foreground">
              UTC (Coordinated Universal Time) is the primary time standard. All timezones are
              defined as offsets from UTC (e.g., UTC+5:30 for India, UTC-8 for Pacific Time).
              It doesn&apos;t observe daylight saving time.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Why is my conversion off by an hour?</h3>
            <p className="text-sm text-muted-foreground">
              Check if daylight saving time applies to your selected date. DST start/end dates
              vary by country and have changed over the years. The tool uses historical DST rules.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">How do I convert times for multiple timezones?</h3>
            <p className="text-sm text-muted-foreground">
              Run separate conversions for each target timezone. For regular multi-timezone work,
              consider using a world clock tool that displays multiple timezones simultaneously.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What timezone does my computer use?</h3>
            <p className="text-sm text-muted-foreground">
              Your computer uses the timezone set in your operating system. This may differ from
              your physical location if you&apos;ve traveled or manually changed settings.
              Check your system preferences to confirm.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
