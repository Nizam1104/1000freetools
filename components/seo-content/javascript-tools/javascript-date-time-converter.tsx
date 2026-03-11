import React from "react"

export default function JavascriptDateTimeConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the JavaScript Date & Time Converter Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Choose your conversion mode: Date to Timestamp, Timestamp to Date, Format Date, or Add/Subtract time. Enter your input value or leave empty for the current date/time.
          </p>
          <p>
            For formatting, use custom patterns like YYYY-MM-DD HH:mm:ss. The converter supports all common date tokens. For manipulation, specify the amount and unit (days, hours, months, etc.).
          </p>
          <p>
            Results show multiple formats: locale string, ISO string, UTC string, and Unix timestamp. Copy any format with one click. All calculations use JavaScript's native Date object.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Converting API timestamps</h3>
            <p className="text-sm text-muted-foreground">
              APIs return Unix timestamps. Convert to readable dates for display. Or convert user dates to timestamps for API requests.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Formatting dates for display</h3>
            <p className="text-sm text-muted-foreground">
              Need dates in a specific format? Generate the format string, then use it in your code. No more guessing date format tokens.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Calculating future/past dates</h3>
            <p className="text-sm text-muted-foreground">
              What date is 30 days from now? Add or subtract time units easily. Handle month/year boundaries correctly without manual calculation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging timezone issues</h3>
            <p className="text-sm text-muted-foreground">
              See the same date in local time, UTC, and ISO format. Understand timezone conversions. Debug why dates appear wrong in different regions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Working with database dates</h3>
            <p className="text-sm text-muted-foreground">
              Databases store dates differently. Convert between Unix timestamps, ISO strings, and locale formats. Match your database's expected format.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning JavaScript Date</h3>
            <p className="text-sm text-muted-foreground">
              JavaScript dates are confusing. Experiment with conversions to understand timestamps, timezones, and formatting. Build intuition for date handling.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">JavaScript months are zero-indexed.</strong>
              January is 0, December is 11. This trips up everyone. The converter handles this correctly, but remember it for your own code.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Timestamps are in milliseconds.</strong>
              JavaScript uses milliseconds since epoch. Unix timestamps are seconds. The converter shows both. Multiply/divide by 1000 to convert.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Timezone matters for display.</strong>
              Dates display in your local timezone. ISO strings include timezone info. UTC is timezone-independent. Know which you need.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Month arithmetic is tricky.</strong>
              Adding months doesn't always give expected results. Jan 31 + 1 month = Feb 28 (or 29). The converter handles edge cases.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For production date handling, use libraries like date-fns or Day.js. They handle edge cases and provide better APIs. This tool is great for quick conversions and learning.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the Unix epoch?</h3>
            <p className="text-sm text-muted-foreground">
              January 1, 1970, 00:00:00 UTC. Timestamps count seconds or milliseconds since then. Negative values are dates before 1970.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why are my dates off by one day?</h3>
            <p className="text-sm text-muted-foreground">
              Timezone conversion issue. Your local date may be yesterday/tomorrow in UTC. Use ISO strings with timezone info for clarity.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I parse custom date formats?</h3>
            <p className="text-sm text-muted-foreground">
              JavaScript's Date.parse() is limited. For custom formats, use a library or manual parsing. This tool converts from Date objects, not arbitrary strings.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert between timezones?</h3>
            <p className="text-sm text-muted-foreground">
              This shows local and UTC. For specific timezone conversion, use Intl.DateTimeFormat with timeZone option or a library like Luxon.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's ISO 8601 format?</h3>
            <p className="text-sm text-muted-foreground">
              Standard date format: YYYY-MM-DDTHH:mm:ss.sssZ. Used by JavaScript's toISOString(). Universally understood and sortable.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How accurate is the reading time?</h3>
            <p className="text-sm text-muted-foreground">
              This is for dates, not reading time. Date calculations are exact within JavaScript's precision limits (milliseconds).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it handle leap years?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, JavaScript's Date object handles leap years automatically. Feb 29 exists in leap years. Date arithmetic accounts for this.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
