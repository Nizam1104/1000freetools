export default function TimeRegexValidatorSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This time format validator checks if text matches valid time patterns, ensuring 
            time data is correctly formatted before processing or storage.
          </p>
          <p className="text-muted-foreground">
            The validation process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Pattern matching:</strong> Input is checked against regex patterns for common time formats (HH:MM, HH:MM:SS, 12-hour, 24-hour).</li>
            <li><strong className="text-foreground">Range validation:</strong> Hours (0-23 or 1-12), minutes (0-59), and seconds (0-59) are verified to be in valid ranges.</li>
            <li><strong className="text-foreground">Format detection:</strong> The tool identifies whether times are in 12-hour (with AM/PM) or 24-hour format.</li>
            <li><strong className="text-foreground">Result reporting:</strong> Each time is marked valid or invalid with specific error messages for failures.</li>
          </ol>
          <p className="text-muted-foreground">
            Valid time formatting is crucial for scheduling systems, time tracking, 
            log analysis, and any application that processes temporal data.
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
              description: "Validate time inputs in web forms before submission to prevent invalid data entry."
            },
            {
              title: "Data Import Cleaning",
              description: "Check time data in CSV or spreadsheet imports for format consistency before database insertion."
            },
            {
              title: "Log File Analysis",
              description: "Verify timestamp formats in log files for proper parsing and analysis."
            },
            {
              title: "Scheduling Application Testing",
              description: "Test time input handling in calendar and scheduling applications."
            },
            {
              title: "API Data Validation",
              description: "Validate time values in API requests and responses for correct formatting."
            },
            {
              title: "Report Generation",
              description: "Ensure time data in reports follows consistent formatting standards."
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
              caveat: "Format matters for validation",
              explanation: "13:00 is valid in 24-hour but invalid in 12-hour format. The tool checks against the selected format rules."
            },
            {
              caveat: "Timezone information isn't validated",
              explanation: "This tool validates time format only, not timezone correctness. Times like 10:00 EST need separate timezone validation."
            },
            {
              caveat: "Leap seconds aren't considered",
              explanation: "Standard validation accepts 0-59 seconds. Leap seconds (60) are rare and typically handled specially."
            },
            {
              caveat: "AM/PM format has edge cases",
              explanation: "12:00 AM is midnight, 12:00 PM is noon. These are commonly confused. The tool validates the format, not semantic correctness."
            },
            {
              caveat: "Leading zeros may be required",
              explanation: "Some systems require 09:00, others accept 9:00. Check your system's requirements for leading zero handling."
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
              question: "What's the difference between 12-hour and 24-hour format?",
              answer: "12-hour uses 1-12 with AM/PM (3:00 PM). 24-hour uses 0-23 without AM/PM (15:00). 24-hour is common internationally and in technical contexts."
            },
            {
              question: "Is 24:00 a valid time?",
              answer: "Technically, 24:00 represents midnight at the end of a day. Most systems use 00:00 for midnight. 24:00 may be rejected by strict validators."
            },
            {
              question: "Can seconds be omitted?",
              answer: "Yes, HH:MM is valid for most purposes. Seconds are only needed when precision matters. Both 14:30 and 14:30:00 are valid."
            },
            {
              question: "What about fractional seconds?",
              answer: "Formats like HH:MM:SS.fff (with milliseconds) are valid in many systems. This tool focuses on standard whole-second formats."
            },
            {
              question: "How do I validate ISO 8601 times?",
              answer: "ISO 8601 uses 24-hour format with optional timezone: 14:30:00Z or 14:30:00+05:00. Basic time validation applies, plus timezone format checking."
            },
            {
              question: "Why is my valid time showing as invalid?",
              answer: "Check the format setting. 13:00 is invalid in 12-hour mode. 1:00 PM is invalid in 24-hour mode. Select the correct format for your data."
            },
            {
              question: "Can this validate time ranges?",
              answer: "This validates individual times. For ranges (9:00-17:00), validate start and end times separately, then check that start < end."
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
