export default function DecimalToBinaryConverterSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This decimal to binary converter transforms base-10 numbers into base-2 binary
            representation. It uses the division-by-2 method to find each bit position,
            showing the step-by-step conversion process.
          </p>
          <p className="text-muted-foreground">
            The conversion process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Divide by 2:</strong> Divide the decimal number by 2, tracking the remainder (0 or 1).</li>
            <li><strong className="text-foreground">Record remainder:</strong> The remainder is the next bit (starting from the right/LSB).</li>
            <li><strong className="text-foreground">Repeat:</strong> Use the quotient for the next division. Continue until quotient is 0.</li>
            <li><strong className="text-foreground">Read backwards:</strong> Read remainders from last to first to get the binary result.</li>
          </ol>
          <p className="text-muted-foreground">
            For example: 45 ÷ 2 = 22 r1, 22 ÷ 2 = 11 r0, 11 ÷ 2 = 5 r1, 5 ÷ 2 = 2 r1,
            2 ÷ 2 = 1 r0, 1 ÷ 2 = 0 r1. Read backwards: 101101.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Learning Binary Conversion",
              description: "Understand how to convert decimal numbers to binary using the division method."
            },
            {
              title: "Computer Science Education",
              description: "Teach students number base conversion and binary representation fundamentals."
            },
            {
              title: "Network Subnetting",
              description: "Convert decimal IP addresses and subnet masks to binary for network calculations."
            },
            {
              title: "Programming Development",
              description: "Understand binary representation for bit manipulation, flags, and low-level programming."
            },
            {
              title: "Digital Electronics",
              description: "Convert decimal values to binary for circuit design and logic analysis."
            },
            {
              title: "CTF and Puzzle Solving",
              description: "Encode decimal values as binary for cybersecurity challenges and puzzles."
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
              caveat: "Negative numbers use 2's complement",
              explanation: "For signed binary, negative numbers are represented using 2's complement notation, not just a sign bit."
            },
            {
              caveat: "Bit width determines range",
              explanation: "8-bit: 0-255 (unsigned) or -128 to 127 (signed). 16-bit: 0-65535. Choose appropriate width for your needs."
            },
            {
              caveat: "Leading zeros don't change value",
              explanation: "45 = 101101 = 00101101. Leading zeros may indicate bit width but don't affect the numeric value."
            },
            {
              caveat: "Powers of 2 have single bits",
              explanation: "1=0001, 2=0010, 4=0100, 8=1000. These are useful to recognize for quick mental conversion."
            },
            {
              caveat: "Fractional decimals need binary point",
              explanation: "This tool handles integers. Decimal fractions (0.5, 0.25) use negative powers of 2 after a binary point."
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
              question: "What's the binary for 255?",
              answer: "11111111 (8 ones). 255 = 2^8 - 1, so all 8 bits are set. It's the maximum value for 8-bit unsigned."
            },
            {
              question: "How do I convert binary back to decimal?",
              answer: "Multiply each bit by its positional value (powers of 2) and sum. Or use a binary-to-decimal converter."
            },
            {
              question: "What's the fastest way to convert decimal to binary?",
              answer: "For humans: repeated division by 2. For common numbers: memorize powers of 2 and build up. For computers: it's built-in."
            },
            {
              question: "How do I represent negative numbers in binary?",
              answer: "Use 2's complement: invert all bits and add 1. -5 in 8-bit: 5=00000101, invert=11111010, add 1=11111011."
            },
            {
              question: "What's special about powers of 2?",
              answer: "They have exactly one bit set: 1=0001, 2=0010, 4=0100, 8=1000, 16=10000. Easy to recognize and useful for bit masks."
            },
            {
              question: "Can I convert very large decimals?",
              answer: "Yes, but binary gets long fast. 1000 = 10 bits, 1 million = 20 bits, 1 billion = 30 bits. Each 3 decimal digits ≈ 10 binary bits."
            },
            {
              question: "Why do computers use binary?",
              answer: "Electronics easily represent two states (on/off, high/low). Binary is reliable, simple to implement, and mathematically elegant."
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
