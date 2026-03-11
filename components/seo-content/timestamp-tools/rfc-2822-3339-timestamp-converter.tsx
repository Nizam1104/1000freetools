import * as React from "react"

export default function Rfc28223339TimestampConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            Enter a timestamp in RFC 2822 format (like email dates: "Mon, 15 Jan 2024 10:30:00 +0000") or RFC 3339 format (ISO 8601 profile: "2024-01-15T10:30:00Z"). The converter automatically detects the format.
          </p>
          <p>
            The input is parsed and converted to the other format instantly. RFC 2822 converts to RFC 3339 and vice versa. Both formats represent the same moment in time, just with different string representations.
          </p>
          <p>
            Additional outputs include Unix timestamp (seconds and milliseconds), human-readable date, and timezone information. Copy any format with a single click for use in APIs, emails, or documentation.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Email Header Parsing</h3>
            <p className="text-sm text-muted-foreground">
              Convert email Date headers (RFC 2822) to ISO format for database storage and analysis.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">API Integration</h3>
            <p className="text-sm text-muted-foreground">
              Transform timestamps between services that expect different RFC formats.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">HTTP Headers</h3>
            <p className="text-sm text-muted-foreground">
              Convert between RFC 2822 (used in HTTP Date headers) and RFC 3339 for logging.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Data Migration</h3>
            <p className="text-sm text-muted-foreground">
              Standardize timestamps from multiple sources to a consistent format during migration.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">RSS Feed Processing</h3>
            <p className="text-sm text-muted-foreground">
              Parse pubDate elements (RFC 2822) and convert to ISO 8601 for modern applications.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Log Correlation</h3>
            <p className="text-sm text-muted-foreground">
              Normalize timestamps from different log sources to compare and correlate events.
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
              <strong className="text-foreground">RFC 2822 format:</strong> "Day, DD Mon YYYY HH:MM:SS +ZZZZ". Used in email (Date headers) and HTTP (Date header). Example: "Mon, 15 Jan 2024 10:30:00 +0000".
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">RFC 3339 format:</strong> Profile of ISO 8601. "YYYY-MM-DDTHH:MM:SSZ" or with timezone offset. Example: "2024-01-15T10:30:00Z". Preferred for APIs and databases.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Timezone handling:</strong> Both formats include timezone info. RFC 2822 uses +0000 style, RFC 3339 uses +00:00 or Z for UTC.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Obsolete RFC 2822 formats:</strong> Some email clients use non-standard formats. This converter handles common variations but may not parse all obsolete forms.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Fractional seconds:</strong> RFC 3339 supports fractional seconds (2024-01-15T10:30:00.123Z). RFC 2822 does not. Fractions are preserved when present.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">What's the difference between RFC 2822 and RFC 3339?</h3>
            <p className="text-sm text-muted-foreground">
              RFC 2822 is older, used in email and HTTP. RFC 3339 is ISO 8601 profile, preferred for APIs. Both represent the same moments, just formatted differently.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What does the Z mean in timestamps?</h3>
            <p className="text-sm text-muted-foreground">
              Z indicates UTC (Zero offset, Zulu time). "2024-01-15T10:30:00Z" means 10:30 UTC. Equivalent to +00:00 offset notation.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I parse email dates?</h3>
            <p className="text-sm text-muted-foreground">
              Email Date headers use RFC 2822. Paste the header value into this converter to get ISO 8601/RFC 3339 format for easier processing.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Which format should I use for APIs?</h3>
            <p className="text-sm text-muted-foreground">
              RFC 3339 (ISO 8601) is the modern standard for APIs. It's unambiguous, sortable as strings, and widely supported across languages.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I convert Unix timestamps too?</h3>
            <p className="text-sm text-muted-foreground">
              This tool shows Unix timestamp as additional output. For direct Unix timestamp conversion, use the dedicated Unix timestamp converter.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What timezone is RFC 3339?</h3>
            <p className="text-sm text-muted-foreground">
              RFC 3339 includes explicit timezone. "Z" means UTC. Otherwise +HH:MM or -HH:MM indicates offset from UTC. Always check the offset.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Why are there T and Z in ISO dates?</h3>
            <p className="text-sm text-muted-foreground">
              T separates date from time. Z indicates UTC. These are ISO 8601 conventions that RFC 3339 adopts for unambiguous timestamp representation.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
