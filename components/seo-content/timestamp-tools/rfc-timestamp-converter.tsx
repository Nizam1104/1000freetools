export default function RfcTimestampConverterSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This RFC timestamp converter translates between Unix timestamps and standard
            internet date formats defined in RFC 2822 and RFC 3339 specifications.
          </p>
          <p className="text-muted-foreground">
            The conversion process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Format detection:</strong> Identify whether input is a Unix timestamp or RFC-formatted date string.</li>
            <li><strong className="text-foreground">Parsing:</strong> Parse the input according to the appropriate RFC specification rules.</li>
            <li><strong className="text-foreground">Normalization:</strong> Convert to an internal UTC timestamp representation.</li>
            <li><strong className="text-foreground">Output formatting:</strong> Generate the target format (RFC 2822, RFC 3339, or Unix timestamp).</li>
          </ol>
          <p className="text-muted-foreground">
            RFC 2822 format looks like "Mon, 15 Jan 2024 10:30:00 +0000" (used in email).
            RFC 3339 looks like "2024-01-15T10:30:00Z" (used in APIs and JSON).
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Email Header Analysis",
              description: "Parse and convert Date headers from email messages (RFC 2822 format) to Unix timestamps for processing."
            },
            {
              title: "API Development",
              description: "Convert between RFC 3339 timestamps used in REST APIs and Unix timestamps used internally."
            },
            {
              title: "HTTP Header Processing",
              description: "Work with HTTP date headers which often use RFC 2822 format for caching and conditional requests."
            },
            {
              title: "JSON Data Processing",
              description: "Handle ISO 8601/RFC 3339 timestamps from JSON APIs and convert them for database storage."
            },
            {
              title: "Log File Parsing",
              description: "Convert timestamps from various log formats to a standard format for analysis and correlation."
            },
            {
              title: "Data Integration",
              description: "Normalize timestamps from different systems using different RFC formats into a single standard."
            },
          ].map((item, idx) => (
            <div key={idx} className="rounded-lg border bg-muted/30 p-4 space-y-2">
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">What to Know Before Using</h2>
        <div className="space-y-3">
          {[
            {
              caveat: "RFC 2822 allows some flexibility",
              explanation: "The format has evolved. Older emails may use slightly different formats that are still valid."
            },
            {
              caveat: "Timezone offsets matter",
              explanation: "RFC formats include timezone info (+0000, -0500, etc.). This affects the resulting UTC timestamp."
            },
            {
              caveat: "RFC 3339 is a subset of ISO 8601",
              explanation: "RFC 3339 is simpler and more strict than full ISO 8601. Most ISO 8601 dates are valid RFC 3339."
            },
            {
              caveat: "The 'Z' suffix means UTC",
              explanation: "In RFC 3339, 'Z' (Zulu time) indicates UTC. '2024-01-15T10:30:00Z' equals '2024-01-15T10:30:00+00:00'."
            },
            {
              caveat: "Invalid dates will fail parsing",
              explanation: "Dates like February 30 or times with 61 seconds will be rejected as invalid."
            },
          ].map((item, idx) => (
            <div key={idx} className="rounded-lg border bg-muted/30 p-4">
              <h3 className="font-semibold text-foreground mb-1">{item.caveat}</h3>
              <p className="text-sm text-muted-foreground">{item.explanation}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Common Questions</h2>
        <div className="space-y-6">
          {[
            {
              question: "What's the difference between RFC 2822 and RFC 3339?",
              answer: "RFC 2822: 'Mon, 15 Jan 2024 10:30:00 +0000' (email). RFC 3339: '2024-01-15T10:30:00Z' (APIs, ISO-style)."
            },
            {
              question: "Which format should I use for my API?",
              answer: "RFC 3339/ISO 8601 is the modern standard for APIs. It's unambiguous, sortable, and widely supported."
            },
            {
              question: "How do I handle timezones?",
              answer: "Always include timezone info. Use 'Z' for UTC or explicit offsets like '+05:30'. Avoid naive (timezone-less) timestamps."
            },
            {
              question: "Can I convert old email dates?",
              answer: "Yes, RFC 2822 has been around since 1982 (as RFC 822). The converter handles historical email date formats."
            },
            {
              question: "What does 'T' mean in RFC 3339?",
              answer: "The 'T' separates the date from the time. It's required in ISO 8601/RFC 3339 format: YYYY-MM-DDTHH:MM:SS"
            },
            {
              question: "Are milliseconds supported?",
              answer: "RFC 3339 allows fractional seconds: '2024-01-15T10:30:00.123Z'. RFC 2822 typically doesn't include them."
            },
            {
              question: "Why are there multiple RFC formats?",
              answer: "Different protocols evolved separately. Email (RFC 2822) predates web APIs (RFC 3339/ISO 8601)."
            },
          ].map((item, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="font-semibold text-foreground">{item.question}</h3>
              <p className="text-muted-foreground">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
