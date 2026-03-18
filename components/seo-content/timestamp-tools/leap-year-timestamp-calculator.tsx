export default function LeapYearTimestampCalculatorSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This leap year timestamp calculator accounts for the extra day in leap years
            when calculating dates and timestamps, ensuring accurate time calculations.
          </p>
          <p className="text-muted-foreground">
            The leap year calculation process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Year extraction:</strong> Determine the year from the input date or timestamp.</li>
            <li><strong className="text-foreground">Leap year check:</strong> Apply the leap year rules: divisible by 4, except centuries unless divisible by 400.</li>
            <li><strong className="text-foreground">Day count adjustment:</strong> Add 366 days for leap years, 365 for common years.</li>
            <li><strong className="text-foreground">Timestamp calculation:</strong> Convert the adjusted date back to a Unix timestamp.</li>
          </ol>
          <p className="text-muted-foreground">
            Without proper leap year handling, calculations spanning February would be
            off by one day every four years, causing significant drift over time.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Birthday Calculations",
              description: "Calculate exact ages and anniversary dates for people born on or around February 29."
            },
            {
              title: "Financial Year Calculations",
              description: "Compute interest, depreciation, or other time-based financial metrics accurately across leap years."
            },
            {
              title: "Contract Expiry Dates",
              description: "Ensure multi-year contracts expire on the correct date, accounting for leap years in the term."
            },
            {
              title: "Historical Date Analysis",
              description: "Accurately calculate time spans between historical dates that may span multiple leap years."
            },
            {
              title: "Scheduling Systems",
              description: "Build calendars and scheduling applications that correctly handle February 29 occurrences."
            },
            {
              title: "Age Verification Systems",
              description: "Calculate legal ages precisely for people born in leap years, especially for February 28/March 1 edge cases."
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
              caveat: "Leap year rules are specific",
              explanation: "Divisible by 4 = leap year, except centuries. But centuries divisible by 400 ARE leap years (2000 was, 1900 wasn't)."
            },
            {
              caveat: "February 29 birthdays are special",
              explanation: "People born on Feb 29 typically celebrate on Feb 28 or Mar 1 in non-leap years. Legal status varies by jurisdiction."
            },
            {
              caveat: "Leap seconds are different",
              explanation: "Leap years add a day. Leap seconds add a second to UTC occasionally. This tool handles leap years, not leap seconds."
            },
            {
              caveat: "The Gregorian calendar started in 1582",
              explanation: "Leap year rules apply to Gregorian calendar dates. Earlier dates use Julian calendar rules (every 4 years)."
            },
            {
              caveat: "Programming languages handle this automatically",
              explanation: "Modern date libraries account for leap years. Manual calculations should use these libraries rather than hardcoding."
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
              question: "How do I know if a year is a leap year?",
              answer: "Divide by 4: if it divides evenly, it's a leap year. Exception: centuries must divide by 400 (2000 yes, 1900 no)."
            },
            {
              question: "When is the next leap year?",
              answer: "Leap years occur every 4 years. After 2024 comes 2028, 2032, 2036, 2040, etc. The next century exception is 2100."
            },
            {
              question: "Why do we have leap years?",
              answer: "Earth's orbit is ~365.2425 days, not exactly 365. Leap years add the extra ~0.25 days per year to keep calendars aligned."
            },
            {
              question: "What happens if I ignore leap years?",
              answer: "Your calculations drift by about 1 day every 4 years. Over decades, this causes significant errors in date calculations."
            },
            {
              question: "Do all calendars have leap years?",
              answer: "Most solar calendars do. Lunar calendars have leap months instead. The Hebrew calendar adds a month 7 times in 19 years."
            },
            {
              question: "Can someone really be born on February 29?",
              answer: "Yes! About 1 in 1,461 people are 'leaplings'. They typically celebrate on Feb 28 or Mar 1 in non-leap years."
            },
            {
              question: "Is 2100 a leap year?",
              answer: "No. Even though 2100 is divisible by 4, it's a century year not divisible by 400, so it's NOT a leap year."
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
