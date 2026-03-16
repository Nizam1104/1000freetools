import * as React from "react"

export default function EpochTimestampGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            This generator creates Unix epoch timestamps on demand. Get the current timestamp instantly, or generate timestamps for specific dates by entering year, month, day, hour, minute, and second values.
          </p>
          <p>
            Choose between seconds (standard Unix time) and milliseconds (JavaScript time) output formats. The generator also displays the equivalent ISO 8601 and human-readable date formats.
          </p>
          <p>
            Generate multiple timestamps at once for testing purposes, or create timestamps at regular intervals. Copy results individually or all at once for batch operations.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Test Data Generation</h3>
            <p className="text-sm text-muted-foreground">
              Create realistic timestamps for test databases, seed data, and development environments.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Mock API Responses</h3>
            <p className="text-sm text-muted-foreground">
              Generate timestamps for mock API responses during frontend development and testing.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Benchmark Setup</h3>
            <p className="text-sm text-muted-foreground">
              Create timestamp sequences for performance testing and load simulation.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Event Simulation</h3>
            <p className="text-sm text-muted-foreground">
              Generate timestamps for simulated events in demos, prototypes, and proof-of-concepts.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Data Anonymization</h3>
            <p className="text-sm text-muted-foreground">
              Replace real timestamps with generated ones that preserve relative timing patterns.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Education</h3>
            <p className="text-sm text-muted-foreground">
              Demonstrate Unix timestamp concepts and practice date-to-timestamp conversion.
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
              <strong className="text-foreground">Epoch definition:</strong> Unix epoch is January 1, 1970 00:00:00 UTC. All timestamps count from this reference point.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Seconds vs milliseconds:</strong> Standard Unix time uses seconds. JavaScript Date uses milliseconds. Know which your system expects.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Timezone consideration:</strong> When specifying date components, indicate timezone. UTC is default for consistency.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Leap seconds:</strong> Unix timestamps don't count leap seconds. Each day is exactly 86400 seconds regardless of leap second events.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Batch generation:</strong> For multiple timestamps, specify count and interval. Useful for creating time series test data.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">What is epoch time?</h3>
            <p className="text-sm text-muted-foreground">
              Epoch time (Unix time) counts seconds since January 1, 1970 00:00:00 UTC. It's a universal way to represent moments in time.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I get current epoch time?</h3>
            <p className="text-sm text-muted-foreground">
              The current timestamp is displayed at the top of this page. Or use command line: date +%s (Unix) or Date.now() (JavaScript).
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Why milliseconds vs seconds?</h3>
            <p className="text-sm text-muted-foreground">
              Seconds is standard Unix format. Milliseconds provides sub-second precision. JavaScript uses milliseconds, most databases use seconds.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I generate random timestamps?</h3>
            <p className="text-sm text-muted-foreground">
              This tool generates specific timestamps. For random timestamps within a range, use a random number generator with timestamp bounds.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What's the timestamp for midnight?</h3>
            <p className="text-sm text-muted-foreground">
              Midnight UTC on any date is the base timestamp for that day. For January 1, 2024: 1704067200 seconds.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I generate timestamps for a date range?</h3>
            <p className="text-sm text-muted-foreground">
              Generate start timestamp, then add interval seconds repeatedly. For hourly: add 3600. For daily: add 86400.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Is epoch time affected by DST?</h3>
            <p className="text-sm text-muted-foreground">
              No. Unix timestamps are UTC-based and don't observe daylight saving time. DST only affects local time display.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
