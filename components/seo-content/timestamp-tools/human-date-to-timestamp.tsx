import * as React from "react"

export default function HumanDateToTimestampSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            Enter any human-readable date in the input field. The converter accepts numerous formats including "January 15, 2024", "2024-01-15", "15/01/2024", "Mon Jan 15 2024", and many more.
          </p>
          <p>
            The parser intelligently interprets your input, handling different date orderings (MDY vs DMY), optional time components, and timezone specifications. Ambiguous dates are interpreted with clear indicators.
          </p>
          <p>
            Results display in multiple formats: Unix seconds, Unix milliseconds, ISO 8601, and RFC 2822. Copy any format with a single click for use in code, APIs, or databases.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Data Import</h3>
            <p className="text-sm text-muted-foreground">
              Convert human-readable dates from CSV files to Unix timestamps for database import.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">API Development</h3>
            <p className="text-sm text-muted-foreground">
              Transform user-entered dates to timestamps for API requests and backend processing.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Log Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Convert log file dates to Unix time for sorting, filtering, and time-based analysis.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Testing</h3>
            <p className="text-sm text-muted-foreground">
              Generate specific timestamps for test cases without manual calculation.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Documentation</h3>
            <p className="text-sm text-muted-foreground">
              Include precise timestamps in documentation for events, releases, or milestones.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Migration Scripts</h3>
            <p className="text-sm text-muted-foreground">
              Convert legacy date formats to Unix timestamps during system migration.
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
              <strong className="text-foreground">Format flexibility:</strong> Accepts ISO 8601, US format (MM/DD/YYYY), European (DD/MM/YYYY), natural language, and more. The parser is forgiving.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Ambiguous dates:</strong> Dates like "01/02/2024" could be Jan 2 or Feb 1. The tool indicates interpretation and lets you adjust if needed.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Timezone handling:</strong> Dates without timezone are treated as local time. Specify timezone explicitly for precise conversion.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Default time:</strong> Dates without time default to 00:00:00 (midnight). Add time explicitly if you need specific hours.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Valid range:</strong> Supports dates from year 1970 (Unix epoch start) to 2038+ (varies by system). Negative timestamps for pre-1970 dates.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">What formats are accepted?</h3>
            <p className="text-sm text-muted-foreground">
              ISO 8601 (2024-01-15), US (01/15/2024), European (15/01/2024), natural (Jan 15 2024), RFC 2822, and many more. Just type naturally.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I specify timezone?</h3>
            <p className="text-sm text-muted-foreground">
              Add timezone at end: "2024-01-15 10:30 EST" or "2024-01-15T10:30:00+05:00". Without timezone, your local time is assumed.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What is timestamp for January 1, 2000?</h3>
            <p className="text-sm text-muted-foreground">
              January 1, 2000 00:00:00 UTC is 946684800 (seconds) or 946684800000 (milliseconds).
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I convert dates before 1970?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Pre-1970 dates produce negative timestamps. For example, December 31, 1969 is -86400 seconds.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Why is my date interpreted wrong?</h3>
            <p className="text-sm text-muted-foreground">
              Ambiguous formats like 01/02/2024 may be misinterpreted. Use unambiguous formats like "2024-01-02" or "January 2, 2024".
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I include time?</h3>
            <p className="text-sm text-muted-foreground">
              Add time after date: "2024-01-15 14:30" or "January 15, 2024 2:30 PM". 12-hour and 24-hour formats both work.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I parse relative dates?</h3>
            <p className="text-sm text-muted-foreground">
              Some relative dates like "today", "tomorrow", "next Monday" are supported. For precise control, use specific dates.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
