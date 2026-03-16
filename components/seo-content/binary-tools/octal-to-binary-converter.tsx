export default function OctalToBinaryConverterSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This octal to binary converter transforms octal numbers (base-8) into binary code
            (base-2). Each octal digit (0-7) maps directly to exactly 3 binary bits, making
            conversion straightforward and efficient.
          </p>
          <p className="text-muted-foreground">
            The conversion process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Validate input:</strong> Ensure input contains only valid octal digits (0-7).</li>
            <li><strong className="text-foreground">Map each digit:</strong> Convert each octal digit to its 3-bit binary equivalent (0=000, 7=111).</li>
            <li><strong className="text-foreground">Concatenate bits:</strong> Join all 3-bit groups to form the complete binary string.</li>
            <li><strong className="text-foreground">Optional padding:</strong> Add leading zeros to maintain bit alignment if needed.</li>
          </ol>
          <p className="text-muted-foreground">
            For example: 755 (octal) becomes 111 101 101 in binary. This direct mapping made
            octal popular for representing binary data, especially in Unix file permissions.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Unix File Permissions",
              description: "Convert octal permission codes (755, 644) to binary to understand read/write/execute bits."
            },
            {
              title: "Legacy System Analysis",
              description: "Work with older systems that used octal notation for binary data representation."
            },
            {
              title: "Digital Electronics",
              description: "Convert octal values from datasheets or documentation to binary for circuit design."
            },
            {
              title: "Learning Number Systems",
              description: "Understand the relationship between octal and binary for computer science education."
            },
            {
              title: "Aviation Transponder Codes",
              description: "Convert aircraft transponder codes (squawk codes) from octal to binary for analysis."
            },
            {
              title: "Programming Debugging",
              description: "Interpret octal literals in code (0755 in C/Python) and understand their binary values."
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
              caveat: "Each octal digit = 3 binary bits",
              explanation: "This is the key relationship. Octal is a compact representation of binary, with 3 bits per digit."
            },
            {
              caveat: "Only digits 0-7 are valid",
              explanation: "Octal is base-8, so digits 8 and 9 are invalid. If you see them, it's not octal."
            },
            {
              caveat: "Leading zeros may be significant",
              explanation: "In programming, leading 0 often indicates octal (0755 = octal 755). In pure math, leading zeros don't change value."
            },
            {
              caveat: "Output length is predictable",
              explanation: "N octal digits always produce 3×N binary bits. 4 octal digits = 12 binary bits."
            },
            {
              caveat: "Unix permissions use special meaning",
              explanation: "Each 3-bit group represents read(4), write(2), execute(1) for user/group/others."
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
              question: "What's the binary for octal 7?",
              answer: "7 (octal) = 111 (binary). It's the maximum 3-bit value. Octal digits 0-7 map to binary 000-111."
            },
            {
              question: "How do I convert binary back to octal?",
              answer: "Group binary into 3-bit nibbles from right, then convert each to octal. 111101101 becomes 755."
            },
            {
              question: "Why was octal popular in computing?",
              answer: "Early computers used 12, 24, or 36-bit words - divisible by 3. Octal was more compact than binary. Hex later replaced it for 8-bit systems."
            },
            {
              question: "What's the octal to binary table?",
              answer: "0=000, 1=001, 2=010, 3=011, 4=100, 5=101, 6=110, 7=111. Memorize these 8 conversions."
            },
            {
              question: "What does chmod 755 mean in binary?",
              answer: "7=111 (rwx), 5=101 (r-x), 5=101 (r-x). Owner: read+write+execute. Group/Others: read+execute."
            },
            {
              question: "Is octal still used today?",
              answer: "Less than hex, but still in Unix file permissions, some legacy systems, and aviation. Hex is more common for modern computing."
            },
            {
              question: "Can octal represent negative numbers?",
              answer: "Yes, using the same methods as binary (sign bit or 2's complement). The representation is just a different notation."
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
