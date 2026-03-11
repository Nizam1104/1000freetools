export default function BinaryToOctalConverterSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This binary to octal converter transforms binary numbers (base-2) into octal
            format (base-8). It groups binary digits into sets of three and converts each
            group to its octal equivalent.
          </p>
          <p className="text-muted-foreground">
            The conversion process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Group into threes:</strong> Starting from the right, group binary digits into sets of 3 bits.</li>
            <li><strong className="text-foreground">Pad if needed:</strong> Add leading zeros to the leftmost group if it has fewer than 3 bits.</li>
            <li><strong className="text-foreground">Convert each group:</strong> Each 3-bit group converts to one octal digit (000=0, 111=7).</li>
            <li><strong className="text-foreground">Concatenate result:</strong> Join all octal digits to form the final octal number.</li>
          </ol>
          <p className="text-muted-foreground">
            For example: 111101101 becomes 755 (111=7, 101=5, 101=5). This grouping works
            because 8 = 2^3, so exactly 3 binary bits map to each octal digit.
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
              description: "Convert binary permission bits to octal chmod values (rwx bits to 755, 644, etc.)."
            },
            {
              title: "Digital Circuit Design",
              description: "Convert binary outputs to octal for documentation and analysis of digital systems."
            },
            {
              title: "Learning Number Systems",
              description: "Understand the relationship between binary and octal for computer science education."
            },
            {
              title: "Legacy Code Maintenance",
              description: "Interpret octal literals in older code and understand their binary representation."
            },
            {
              title: "Data Compression Studies",
              description: "Explore how different bases represent the same data with varying efficiency."
            },
            {
              title: "Aviation Applications",
              description: "Convert binary data to octal for aircraft transponder code analysis."
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
              caveat: "Group from right to left",
              explanation: "Always start grouping from the right (least significant bit). This ensures correct place values."
            },
            {
              caveat: "Leading zeros don't change value",
              explanation: "001101 = 1101 = 15 (octal). Leading zeros can be added to complete the leftmost group."
            },
            {
              caveat: "Each 3 bits = 1 octal digit",
              explanation: "This is the key relationship. N binary bits produce N/3 (rounded up) octal digits."
            },
            {
              caveat: "Octal only uses digits 0-7",
              explanation: "If your conversion produces 8 or 9, something went wrong. 3 bits max value is 7 (111)."
            },
            {
              caveat: "Unix permissions use special meaning",
              explanation: "Each octal digit represents read(4)+write(2)+execute(1) for user/group/others."
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
              question: "What's the binary to octal conversion table?",
              answer: "000=0, 001=1, 010=2, 011=3, 100=4, 101=5, 110=6, 111=7. Just 8 conversions to memorize."
            },
            {
              question: "How do I convert octal back to binary?",
              answer: "Expand each octal digit to 3 bits. 755 becomes 111 101 101. Simple reverse operation."
            },
            {
              question: "Why group by 3s specifically?",
              answer: "Because 8 = 2^3. Three binary bits exactly represent values 0-7, which is one octal digit. Perfect mapping."
            },
            {
              question: "What if binary length isn't divisible by 3?",
              answer: "Add leading zeros. 1011010 (7 bits) becomes 001 011 010 = 132 (octal). Leading zeros don't change value."
            },
            {
              question: "Why was octal popular in computing?",
              answer: "Early computers had 12, 24, or 36-bit words (divisible by 3). Octal was more compact than binary. Hex replaced it for 8-bit systems."
            },
            {
              question: "What does chmod 755 mean in binary?",
              answer: "7=111 (rwx), 5=101 (r-x), 5=101 (r-x). Full permissions for owner, read+execute for group and others."
            },
            {
              question: "Is octal still relevant today?",
              answer: "Less than hex, but still used in Unix file permissions, some legacy systems, and aviation. Good to understand for these cases."
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
