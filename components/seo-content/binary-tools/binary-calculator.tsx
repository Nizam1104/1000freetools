export default function BinaryCalculatorSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This binary calculator performs arithmetic and bitwise operations directly on
            binary numbers. It handles addition, subtraction, multiplication, division, and
            logical operations (AND, OR, XOR, NOT) with step-by-step results.
          </p>
          <p className="text-muted-foreground">
            The calculation process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Input binary values:</strong> Enter two binary numbers for the operation.</li>
            <li><strong className="text-foreground">Select operation:</strong> Choose arithmetic (+, -, ×, ÷) or bitwise (AND, OR, XOR, NOT).</li>
            <li><strong className="text-foreground">Perform calculation:</strong> The operation is performed using binary arithmetic rules.</li>
            <li><strong className="text-foreground">Display results:</strong> Show result in binary, with optional decimal and hex equivalents.</li>
          </ol>
          <p className="text-muted-foreground">
            Binary addition follows: 0+0=0, 0+1=1, 1+0=1, 1+1=10 (carry 1). Binary multiplication
            is simpler than decimal - each digit is either 0 or 1, so partial products are either
            0 or the multiplicand.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Learning Binary Arithmetic",
              description: "Understand how addition, subtraction, and other operations work in base-2."
            },
            {
              title: "Digital Logic Design",
              description: "Verify binary calculations for circuit design and ALU (Arithmetic Logic Unit) development."
            },
            {
              title: "Assembly Programming",
              description: "Calculate binary values for low-level programming and understand CPU arithmetic."
            },
            {
              title: "Computer Architecture Studies",
              description: "Explore how computers perform arithmetic at the hardware level."
            },
            {
              title: "Bitwise Operation Practice",
              description: "Master AND, OR, XOR, NOT operations used in programming and digital systems."
            },
            {
              title: "CTF Challenge Solving",
              description: "Perform binary calculations for cryptography and reverse engineering challenges."
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
              caveat: "Binary addition uses carries",
              explanation: "When you add 1+1, the result is 10 (0 with carry 1). Multiple carries can propagate left."
            },
            {
              caveat: "Subtraction uses borrowing",
              explanation: "When subtracting 0-1, borrow from the next position. Or use 2's complement: A-B = A + (-B)."
            },
            {
              caveat: "Bitwise vs arithmetic operations differ",
              explanation: "AND/OR/XOR work bit-by-bit independently. Arithmetic operations involve carries and borrows across bits."
            },
            {
              caveat: "Overflow can occur",
              explanation: "Fixed-width binary has maximum values. 8-bit max is 255. Adding 255+1 = 0 (overflow/wrap-around)."
            },
            {
              caveat: "Division may have remainders",
              explanation: "Binary division works like long division. Result may have a remainder, just like decimal division."
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
              question: "How does binary addition work?",
              answer: "Same as decimal but simpler: 0+0=0, 0+1=1, 1+1=10 (write 0, carry 1), 1+1+1=11 (write 1, carry 1)."
            },
            {
              question: "What's 1+1 in binary?",
              answer: "10 (which is 2 in decimal). In binary, there's no digit '2', so we carry: 1+1 = 10."
            },
            {
              question: "How do bitwise operations work?",
              answer: "AND: both 1 = 1. OR: either 1 = 1. XOR: exactly one 1 = 1. NOT: flip all bits. Each bit is independent."
            },
            {
              question: "What's binary multiplication?",
              answer: "Simpler than decimal! Each digit is 0 or 1, so partial products are either 0 or the multiplicand. Then add them up."
            },
            {
              question: "How does binary division work?",
              answer: "Like long division. See how many times divisor fits into portions of dividend. Quotient digits are 0 or 1."
            },
            {
              question: "What's 2's complement subtraction?",
              answer: "A - B = A + (2's complement of B). Invert B's bits and add 1, then add to A. Discard overflow carry."
            },
            {
              question: "Why learn binary arithmetic?",
              answer: "It's how computers calculate. Understanding binary arithmetic helps with programming, debugging, and digital design."
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
