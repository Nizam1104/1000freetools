export default function BinaryComplementCalculatorSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This binary complement calculator computes the 1's complement (bitwise NOT) and
            2's complement of binary numbers. These complements are fundamental to how
            computers represent and manipulate negative numbers.
          </p>
          <p className="text-muted-foreground">
            The calculation process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">1's complement:</strong> Invert every bit - change all 0s to 1s and all 1s to 0s. This is the bitwise NOT operation.</li>
            <li><strong className="text-foreground">2's complement:</strong> Take the 1's complement, then add 1 to the result. This is how computers represent negative numbers.</li>
            <li><strong className="text-foreground">Handle bit width:</strong> Results depend on the number of bits (8-bit, 16-bit, 32-bit, etc.).</li>
            <li><strong className="text-foreground">Show work:</strong> Step-by-step display shows the inversion and addition process.</li>
          </ol>
          <p className="text-muted-foreground">
            For example, in 8-bit: 00000101 (5) → 1's complement: 11111010 → 2's complement: 11111011 (-5).
            This system allows subtraction using addition circuitry.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Computer Architecture Studies",
              description: "Understand how CPUs represent and process negative numbers using 2's complement."
            },
            {
              title: "Digital Logic Design",
              description: "Design circuits that perform subtraction using 2's complement addition."
            },
            {
              title: "Assembly Programming",
              description: "Work with signed integers and understand how negative values are stored in registers."
            },
            {
              title: "Learning Binary Arithmetic",
              description: "Master the fundamentals of binary number representation and manipulation."
            },
            {
              title: "Debugging Signed Integer Issues",
              description: "Understand why certain binary patterns represent negative numbers in your code."
            },
            {
              title: "CTF and Puzzle Solving",
              description: "Solve challenges involving binary number manipulation and complement operations."
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
              caveat: "Bit width determines the range",
              explanation: "8-bit: -128 to 127. 16-bit: -32768 to 32767. 32-bit: -2.1 billion to +2.1 billion. Choose appropriate width."
            },
            {
              caveat: "MSB indicates sign in 2's complement",
              explanation: "Most Significant Bit = 0 means positive. MSB = 1 means negative. This is the sign bit."
            },
            {
              caveat: "2's complement of 2's complement = original",
              explanation: "Negating twice returns the original number. This makes 2's complement symmetric and elegant."
            },
            {
              caveat: "1's complement has two zeros",
              explanation: "+0 = 00000000, -0 = 11111111 in 1's complement. 2's complement fixes this with only one zero."
            },
            {
              caveat: "Overflow behavior is defined",
              explanation: "In 2's complement, overflow wraps around predictably. This is relied upon in many algorithms."
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
              question: "Why do computers use 2's complement?",
              answer: "It simplifies hardware - addition and subtraction use the same circuit. Also has only one zero representation and handles overflow naturally."
            },
            {
              question: "What's the 2's complement of 0?",
              answer: "Invert 00000000 → 11111111, add 1 → 00000000 (with overflow). So -0 = 0 in 2's complement. Only one zero!"
            },
            {
              question: "How do I know if a binary number is negative?",
              answer: "Check the leftmost bit (MSB). If it's 1, the number is negative in 2's complement. If 0, it's positive or zero."
            },
            {
              question: "What's the range of 8-bit 2's complement?",
              answer: "-128 to +127. The pattern is -2^(n-1) to 2^(n-1)-1 for n bits. Notice one more negative than positive."
            },
            {
              question: "Why is -128 special in 8-bit?",
              answer: "-128 = 10000000. Its 2's complement would be itself (overflow). There's no +128 in 8-bit signed. It's the minimum value."
            },
            {
              question: "How do I subtract using 2's complement?",
              answer: "A - B = A + (-B). Take 2's complement of B, then add to A. Discard any carry beyond the bit width."
            },
            {
              question: "What's the difference between 1's and 2's complement?",
              answer: "1's complement just inverts bits. 2's complement inverts then adds 1. 2's complement is what computers actually use."
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
