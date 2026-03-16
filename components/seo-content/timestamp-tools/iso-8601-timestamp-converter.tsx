import * as React from "react"

export default function Iso8601TimestampConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            Enter an ISO 8601 formatted date-time string in the input field. The converter accepts various ISO 8601 formats including basic (20240115T103000Z), extended (2024-01-15T10:30:00Z), with timezone offsets, and with fractional seconds.
          </p>
          <p>
            The input is parsed and converted to multiple output formats: Unix timestamp (seconds and milliseconds), RFC 2822, RFC 3339, and human-readable date with timezone information.
          </p>
          <p>
            Invalid or ambiguous inputs are flagged with helpful error messages. Copy any output format with a single click for use in APIs, databases, or documentation.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">API Development</h3>
            <p className="text-sm text-muted-foreground">
              Convert ISO 8601 timestamps from API responses to Unix time for internal processing.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Database Operations</h3>
            <p className="text-sm text-muted-foreground">
              Transform ISO timestamps to Unix time for storage or comparison in databases.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Log Processing</h3>
            <p className="text-sm text-muted-foreground">
              Parse ISO 8601 timestamps from application logs for analysis and correlation.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Data Integration</h3>
            <p className="text-sm text-muted-foreground">
              Standardize timestamps from multiple sources that use different ISO 8601 variations.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">XML/JSON Processing</h3>
            <p className="text-sm text-muted-foreground">
              Handle timestamps from XML Schema (xsd:dateTime) and JSON APIs that use ISO 8601.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Validation</h3>
            <p className="text-sm text-muted-foreground">
              Verify that ISO 8601 timestamps are valid and properly formatted before processing.
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
              <strong className="text-foreground">ISO 8601 format:</strong> Standard format is YYYY-MM-DDTHH:MM:SSZ or with timezone offset. T separates date from time, Z indicates UTC.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Timezone formats:</strong> Z = UTC, +05:00 = 5 hours ahead of UTC, -08:00 = 8 hours behind UTC. Offset can also be +0500 without colon.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Fractional seconds:</strong> ISO 8601 supports sub-second precision: 2024-01-15T10:30:00.123Z. Milliseconds, microseconds supported.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Week dates:</strong> ISO 8601 also supports week format (2024-W03-1 = week 3, day 1). This tool handles standard dates primarily.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Ordinal dates:</strong> Day-of-year format (2024-015 = 15th day of 2024) is valid ISO 8601 but less common.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">What is ISO 8601 format?</h3>
            <p className="text-sm text-muted-foreground">
              ISO 8601 is the international standard for date/time representation. Format: YYYY-MM-DDTHH:MM:SSZ. Example: 2024-01-15T10:30:00Z.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What does the T mean?</h3>
            <p className="text-sm text-muted-foreground">
              T separates the date portion from the time portion. It's required in ISO 8601 combined date-time format.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What does Z mean?</h3>
            <p className="text-sm text-muted-foreground">
              Z indicates UTC (Zero offset, Zulu time). 2024-01-15T10:30:00Z means 10:30 UTC. Equivalent to +00:00 offset.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I use ISO 8601 without timezone?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but it's "local time" which is ambiguous. Always include timezone (Z or offset) for unambiguous timestamps.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I convert to Unix timestamp?</h3>
            <p className="text-sm text-muted-foreground">
              Enter the ISO 8601 string and read the Unix timestamp output. The converter handles all the parsing and timezone conversion.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What about milliseconds?</h3>
            <p className="text-sm text-muted-foreground">
              ISO 8601 supports fractional seconds: 2024-01-15T10:30:00.123Z. The converter preserves and converts fractional seconds.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Is ISO 8601 the same as RFC 3339?</h3>
            <p className="text-sm text-muted-foreground">
              RFC 3339 is a profile of ISO 8601 with some restrictions. They're very similar and often used interchangeably for timestamps.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
