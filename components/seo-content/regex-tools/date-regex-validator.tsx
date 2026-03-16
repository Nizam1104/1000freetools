export default function DateRegexValidatorSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This date validator checks if date strings match valid calendar dates, catching 
            format errors and impossible dates like February 30th.
          </p>
          <p className="text-muted-foreground">
            The validation process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Format detection:</strong> The input is parsed to identify the date format (MM/DD/YYYY, DD/MM/YYYY, YYYY-MM-DD, etc.).</li>
            <li><strong className="text-foreground">Component extraction:</strong> Month, day, and year values are extracted from the date string.</li>
            <li><strong className="text-foreground">Calendar validation:</strong> Values are checked against calendar rules - valid months (1-12), valid days for the month, leap year handling.</li>
            <li><strong className="text-foreground">Result reporting:</strong> Each date is marked valid or invalid with specific error messages for failures.</li>
          </ol>
          <p className="text-muted-foreground">
            Date validation prevents data entry errors, ensures consistent date storage, 
            and catches common mistakes like swapped month/day values.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Form Input Validation",
              description: "Validate date inputs in web forms to prevent invalid date submissions."
            },
            {
              title: "Data Import Cleaning",
              description: "Check date fields in CSV imports for valid dates before database insertion."
            },
            {
              title: "Birth Date Verification",
              description: "Validate birth dates in user registration to ensure realistic values."
            },
            {
              title: "Deadline and Event Management",
              description: "Verify event dates and deadlines are valid before scheduling."
            },
            {
              title: "Financial Transaction Dates",
              description: "Validate transaction dates in financial systems for accurate record-keeping."
            },
            {
              title: "Report Date Range Validation",
              description: "Ensure date ranges in reports have valid start and end dates."
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
              caveat: "Format ambiguity causes errors",
              explanation: "03/04/2024 could be March 4th (US) or April 3rd (International). Always specify or detect the expected format."
            },
            {
              caveat: "Leap years are complex",
              explanation: "Years divisible by 4 are leap years, except centuries unless divisible by 400. 2000 was a leap year, 1900 was not."
            },
            {
              caveat: "Historical dates have calendar changes",
              explanation: "The Gregorian calendar was adopted at different times in different countries. Dates before adoption may be invalid in modern calendars."
            },
            {
              caveat: "Two-digit years are ambiguous",
              explanation: "24 could mean 1924 or 2024. Most systems use a pivot year (e.g., 00-50 = 2000s, 51-99 = 1900s)."
            },
            {
              caveat: "Timezone affects date interpretation",
              explanation: "A date in one timezone may be different in another. Date-only values should specify timezone or use UTC."
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
              question: "What's the best date format for data exchange?",
              answer: "ISO 8601 (YYYY-MM-DD) is the international standard. It's unambiguous, sorts correctly, and is widely supported. Example: 2024-03-15."
            },
            {
              question: "How do I validate February 29th?",
              answer: "February 29 is only valid in leap years. Check if the year is divisible by 4 (except centuries unless divisible by 400)."
            },
            {
              question: "What's a reasonable birth date range?",
              answer: "For most applications, validate birth dates are in the past and within a realistic range (e.g., not more than 120 years ago)."
            },
            {
              question: "How do I handle different date formats from users?",
              answer: "Accept multiple formats but normalize to a standard format internally. Document accepted formats clearly for users."
            },
            {
              question: "Can dates be in the future?",
              answer: "Depends on context. Birth dates shouldn't be future dates. Event dates, deadlines, and appointments often are. Validate based on use case."
            },
            {
              question: "What about invalid dates like 02/30/2024?",
              answer: "These should be rejected. February never has 30 days. Good validation catches impossible dates, not just format errors."
            },
            {
              question: "How do I validate date ranges?",
              answer: "Validate each date individually, then check that start date <= end date. Handle edge cases like same-day ranges."
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
