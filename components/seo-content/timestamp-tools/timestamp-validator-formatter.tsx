import * as React from "react"

export default function TimestampValidatorFormatterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            Enter any timestamp value in the input field. The validator checks if it's a valid Unix timestamp (seconds or milliseconds), ISO 8601 date, RFC 2822 date, or other common timestamp formats.
          </p>
          <p>
            Invalid timestamps are flagged with specific error messages indicating what went wrong - out of range, malformed, impossible date, or unrecognized format. Valid timestamps are parsed and displayed in multiple formats.
          </p>
          <p>
            The formatter normalizes valid timestamps to your preferred output format. Clean up inconsistent timestamp data by pasting multiple values and getting standardized output. Copy results with a single click.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Data Validation</h3>
            <p className="text-sm text-muted-foreground">
              Verify timestamp data before importing into databases or processing systems.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">API Input Validation</h3>
            <p className="text-sm text-muted-foreground">
              Validate user-submitted timestamps in forms and API requests before processing.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Data Cleaning</h3>
            <p className="text-sm text-muted-foreground">
              Identify and fix malformed timestamps in datasets before analysis.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Log Parsing</h3>
            <p className="text-sm text-muted-foreground">
              Validate and normalize timestamps extracted from various log formats.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Testing</h3>
            <p className="text-sm text-muted-foreground">
              Generate valid and invalid timestamps for test cases and edge case validation.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Documentation</h3>
            <p className="text-sm text-muted-foreground">
              Verify timestamp examples in documentation are valid and correctly formatted.
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
              <strong className="text-foreground">Valid ranges:</strong> Unix seconds typically range from 0 (1970) to 2038+ (varies by system). Milliseconds are 1000x larger.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Format detection:</strong> The validator tries multiple formats. ISO 8601, RFC 2822, Unix timestamps, and common date strings are recognized.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Common errors:</strong> Invalid month (13), invalid day (32), impossible dates (Feb 30), malformed strings, out-of-range values.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Timezone handling:</strong> Timestamps with timezone are validated in that timezone. Without timezone, local time is assumed.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Batch validation:</strong> Paste multiple timestamps (one per line) to validate and format many values at once.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">What makes a valid timestamp?</h3>
            <p className="text-sm text-muted-foreground">
              Valid timestamps represent real moments in time. They must be properly formatted and within reasonable ranges (not year 99999).
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I validate ISO 8601?</h3>
            <p className="text-sm text-muted-foreground">
              Enter the ISO 8601 string. The validator checks format, valid date components, and timezone. Invalid strings show specific errors.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What is an invalid timestamp?</h3>
            <p className="text-sm text-muted-foreground">
              Invalid timestamps include: non-numeric values, impossible dates (Feb 30), out-of-range values, or malformed format strings.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I validate multiple timestamps?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Paste multiple timestamps (one per line) and each will be validated independently with individual results.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What formats are supported?</h3>
            <p className="text-sm text-muted-foreground">
              Unix seconds/milliseconds, ISO 8601, RFC 2822, common date strings (YYYY-MM-DD, MM/DD/YYYY), and more.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I fix invalid timestamps?</h3>
            <p className="text-sm text-muted-foreground">
              The error message indicates what's wrong. Fix the specific issue - correct typos, use valid dates, or reformat to recognized pattern.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I normalize timestamp formats?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Valid timestamps are reformatted to your selected output format, normalizing inconsistent input data.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
