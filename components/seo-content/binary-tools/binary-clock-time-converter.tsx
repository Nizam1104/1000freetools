export default function BinaryClockTimeConverterSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This binary clock and time converter displays the current time in binary format
            and converts between standard time (HH:MM:SS) and binary representation. It's both
            a functional tool and a fun way to understand binary numbers.
          </p>
          <p className="text-muted-foreground">
            The conversion process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Get current time:</strong> Hours, minutes, and seconds are extracted from the system clock.</li>
            <li><strong className="text-foreground">Convert each component:</strong> Hours (0-23), minutes (0-59), seconds (0-59) each convert to binary separately.</li>
            <li><strong className="text-foreground">Display as bits:</strong> Each time component shows as 6 bits (enough for max 59), often in columns.</li>
            <li><strong className="text-foreground">Live updates:</strong> The display updates every second to show the changing binary time.</li>
          </ol>
          <p className="text-muted-foreground">
            For example: 14:35:27 in binary is 001110:100011:011011. Binary clocks typically
            display this as vertical columns of LED-like bits that light up for 1s.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Learning Binary Numbers",
              description: "Practice reading binary in a fun, practical context with constantly changing values."
            },
            {
              title: "Binary Clock Enthusiasm",
              description: "Read your actual binary clock by understanding how the time is encoded in bits."
            },
            {
              title: "Teaching Time Representation",
              description: "Show students different ways to represent the same information (decimal vs binary)."
            },
            {
              title: "Programming Projects",
              description: "Build your own binary clock application or widget using this as a reference."
            },
            {
              title: "Novelty and Fun",
              description: "Impress friends by reading binary time, or use as a conversation-starting screensaver."
            },
            {
              title: "Digital Electronics Learning",
              description: "Understand how digital clocks internally represent and display time values."
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
              caveat: "Hours use 5 bits (0-23)",
              explanation: "2^5 = 32 values, enough for 0-23. Some displays use 6 bits for consistency with minutes/seconds."
            },
            {
              caveat: "Minutes and seconds use 6 bits",
              explanation: "2^6 = 64 values, enough for 0-59. The top values (60-63) are unused in timekeeping."
            },
            {
              caveat: "Binary clocks have different modes",
              explanation: "BCD mode shows each decimal digit separately. Binary mode shows the full value. This tool uses binary mode."
            },
            {
              caveat: "12-hour vs 24-hour format",
              explanation: "24-hour format (0-23) is more common for binary clocks. 12-hour needs an extra AM/PM indicator."
            },
            {
              caveat: "Reading takes practice",
              explanation: "At first, you'll need to calculate. With practice, common times become recognizable patterns."
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
              question: "How do I read a binary clock?",
              answer: "Each column represents hours, minutes, or seconds. Read bits from bottom to top (1, 2, 4, 8, 16, 32). Add up the values of lit bits."
            },
            {
              question: "What's 14:35:27 in binary?",
              answer: "Hours: 14 = 001110 (8+4+2). Minutes: 35 = 100011 (32+2+1). Seconds: 27 = 011011 (16+8+2+1)."
            },
            {
              question: "Why do binary clocks use columns?",
              answer: "It mimics how digital displays show digits side by side. Each column is independent, making it easier to read."
            },
            {
              question: "What's BCD mode on binary clocks?",
              answer: "Binary Coded Decimal represents each decimal digit separately. 14:35 becomes 0001 0100 : 0011 0101 (each digit is 4 bits)."
            },
            {
              question: "Can I convert any time to binary?",
              answer: "Yes! Any valid time (00:00:00 to 23:59:59) converts to binary. Just convert each component separately."
            },
            {
              question: "Are there binary clock apps?",
              answer: "Yes! Many smartphone apps, desktop widgets, and even physical binary clock kits exist. Some watches have binary clock modes."
            },
            {
              question: "What's the hardest part about reading binary time?",
              answer: "Speed. You can calculate any time, but reading at a glance takes practice. Common times (like 12:00) become recognizable patterns."
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
