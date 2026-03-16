export default function BinaryGrayCodeConverterSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This binary Gray code converter transforms between standard binary and Gray code
            (reflected binary code). Gray code ensures that consecutive values differ by only
            one bit, which is useful in many digital applications.
          </p>
          <p className="text-muted-foreground">
            The conversion process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Binary to Gray:</strong> MSB stays the same. Each other bit = current binary bit XOR previous binary bit.</li>
            <li><strong className="text-foreground">Gray to Binary:</strong> MSB stays the same. Each other bit = current Gray bit XOR previous binary bit.</li>
            <li><strong className="text-foreground">XOR operation:</strong> The exclusive-OR operation is the key to both conversions.</li>
            <li><strong className="text-foreground">Step-by-step display:</strong> Shows each XOR operation for educational clarity.</li>
          </ol>
          <p className="text-muted-foreground">
            For example: Binary 1011 → Gray 1110. Binary 0100 → Gray 0110.
            Notice consecutive Gray codes (0→1→2→3: 00→01→11→10) change only one bit at a time.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Rotary Encoder Systems",
              description: "Work with Gray code encoders that output position in Gray code to prevent reading errors during transitions."
            },
            {
              title: "Digital Communications",
              description: "Use Gray code in modulation schemes (like QAM) to minimize bit errors from symbol misreading."
            },
            {
              title: "Karnaugh Map Design",
              description: "Arrange K-maps using Gray code ordering so adjacent cells differ by one variable."
            },
            {
              title: "Error Minimization",
              description: "Reduce errors in systems where values change incrementally and reading during transition matters."
            },
            {
              title: "Learning Digital Logic",
              description: "Understand alternative binary encodings and their applications in digital systems."
            },
            {
              title: "CTF Challenges",
              description: "Solve puzzles involving Gray code encoding and decoding in cybersecurity competitions."
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
              caveat: "Gray code isn't for arithmetic",
              explanation: "Don't try to add or multiply Gray codes directly. Convert to binary first, do math, convert back."
            },
            {
              caveat: "Multiple Gray code variants exist",
              explanation: "This tool uses standard (reflected) Gray code. Other variants exist for specialized applications."
            },
            {
              caveat: "MSB is always the same",
              explanation: "The leftmost bit doesn't change in conversion. It's the starting point for both algorithms."
            },
            {
              caveat: "Bit width must be consistent",
              explanation: "Use the same number of bits for input and output. 4-bit binary converts to 4-bit Gray code."
            },
            {
              caveat: "Gray code wraps around",
              explanation: "The last and first Gray codes also differ by one bit. This cyclic property is useful in some applications."
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
              question: "Why is it called Gray code?",
              answer: "Named after Frank Gray, a Bell Labs researcher who patented the reflected binary code in 1953 for shaft encoder applications."
            },
            {
              question: "What's the main advantage of Gray code?",
              answer: "Consecutive values differ by exactly one bit. This prevents errors when reading values during transitions - you get either the old or new value, never garbage."
            },
            {
              question: "How do rotary encoders use Gray code?",
              answer: "As the shaft rotates, the output changes one bit at a time. Even if read mid-transition, you get a valid adjacent value, not a random number."
            },
            {
              question: "What's the Gray code sequence for 0-15?",
              answer: "0000, 0001, 0011, 0010, 0110, 0111, 0101, 0100, 1100, 1101, 1111, 1110, 1010, 1011, 1001, 1000. Notice each changes one bit."
            },
            {
              question: "Can I do math directly in Gray code?",
              answer: "Not practically. Convert to binary, do arithmetic, convert back. Gray code is for representation and transmission, not computation."
            },
            {
              question: "Where else is Gray code used?",
              answer: "Digital TV (QAM modulation), genetic algorithms, Karnaugh maps, analog-to-digital converters, and anywhere single-bit transitions matter."
            },
            {
              question: "What's the XOR formula for conversion?",
              answer: "Binary to Gray: G[i] = B[i] XOR B[i+1]. Gray to Binary: B[i] = B[i+1] XOR G[i]. Work from MSB to LSB."
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
