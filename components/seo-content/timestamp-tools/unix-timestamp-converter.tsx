import * as React from "react"

export default function UnixTimestampConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            Enter a Unix timestamp in the input field. The converter automatically detects whether you're using seconds (10 digits) or milliseconds (13 digits) and displays the equivalent date and time.
          </p>
          <p>
            Alternatively, enter a human-readable date to convert it to Unix timestamp format. The converter accepts various date formats including ISO 8601, US format, European format, and natural language dates.
          </p>
          <p>
            Results display in multiple formats: Unix seconds, Unix milliseconds, ISO 8601, RFC 2822, and human-readable date with timezone. Copy any format with a single click.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Programming</h3>
            <p className="text-sm text-muted-foreground">
              Convert timestamps for code development, debugging, and working with time-based functions.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Database Work</h3>
            <p className="text-sm text-muted-foreground">
              Transform timestamps when querying databases or importing/exporting time-series data.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">System Administration</h3>
            <p className="text-sm text-muted-foreground">
              Interpret file timestamps, log entries, and system event times in Unix format.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">API Testing</h3>
            <p className="text-sm text-muted-foreground">
              Convert timestamps for API requests and responses that use Unix time format.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Data Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Work with timestamp data in analytics, converting between human and machine formats.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Education</h3>
            <p className="text-sm text-muted-foreground">
              Learn about Unix timestamps and practice converting between date formats.
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
              <strong className="text-foreground">Unix epoch:</strong> Unix time counts seconds since January 1, 1970 00:00:00 UTC. This is the reference point for all Unix timestamps.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Format detection:</strong> 10-digit numbers are treated as seconds. 13-digit numbers as milliseconds. Dates are parsed automatically.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Timezone:</strong> Unix timestamps are UTC. Human-readable output shows your local timezone for convenience.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Negative timestamps:</strong> Dates before 1970 produce negative Unix timestamps. These are valid and handled correctly.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Year 2038:</strong> 32-bit Unix timestamps overflow in 2038. 64-bit systems and millisecond timestamps avoid this issue.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">What is Unix timestamp?</h3>
            <p className="text-sm text-muted-foreground">
              Unix timestamp is the number of seconds since January 1, 1970 00:00:00 UTC. It's a universal way to represent points in time.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I convert timestamp to date?</h3>
            <p className="text-sm text-muted-foreground">
              Enter the Unix timestamp and read the human-readable date output. The converter handles the calculation automatically.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What's the difference between seconds and milliseconds?</h3>
            <p className="text-sm text-muted-foreground">
              Seconds (10 digits) is standard Unix time. Milliseconds (13 digits) is used by JavaScript. Milliseconds = seconds × 1000.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What timestamp is January 1, 2000?</h3>
            <p className="text-sm text-muted-foreground">
              January 1, 2000 00:00:00 UTC is timestamp 946684800 (seconds) or 946684800000 (milliseconds).
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I convert future dates?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Unix timestamps work for any date from 1970 to 2038+ (depending on system). Future dates produce larger positive numbers.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I get current Unix time?</h3>
            <p className="text-sm text-muted-foreground">
              Use the current timestamp tool, or command line: date +%s (Unix/Linux/Mac). JavaScript: Math.floor(Date.now()/1000).
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Why is my timestamp negative?</h3>
            <p className="text-sm text-muted-foreground">
              Negative timestamps represent dates before January 1, 1970. For example, December 31, 1969 is -86400 seconds.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
