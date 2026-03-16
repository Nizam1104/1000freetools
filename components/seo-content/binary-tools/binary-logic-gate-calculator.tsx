export default function BinaryLogicGateCalculatorSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This binary logic gate calculator performs bitwise logical operations (XOR, AND,
            OR, NOT) on binary inputs. It shows truth tables and step-by-step bit-by-bit
            calculations for understanding digital logic.
          </p>
          <p className="text-muted-foreground">
            The logic operations:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">AND operation:</strong> Output is 1 only if both input bits are 1. Otherwise 0.</li>
            <li><strong className="text-foreground">OR operation:</strong> Output is 1 if either input bit is 1. Only 0 if both are 0.</li>
            <li><strong className="text-foreground">XOR operation:</strong> Output is 1 if exactly one input is 1. 0 if both same.</li>
            <li><strong className="text-foreground">NOT operation:</strong> Inverts each bit: 0 becomes 1, 1 becomes 0.</li>
          </ol>
          <p className="text-muted-foreground">
            Truth tables show all possible input combinations: AND (00→0, 01→0, 10→0, 11→1),
            OR (00→0, 01→1, 10→1, 11→1), XOR (00→0, 01→1, 10→1, 11→0), NOT (0→1, 1→0).
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Digital Logic Design",
              description: "Test and verify logic gate combinations for circuit design."
            },
            {
              title: "Learning Boolean Algebra",
              description: "Understand fundamental logic operations and truth tables."
            },
            {
              title: "Programming Bit Operations",
              description: "Master bitwise operators used in low-level programming and optimization."
            },
            {
              title: "Computer Architecture Studies",
              description: "Explore how CPUs implement arithmetic and logic using gates."
            },
            {
              title: "CTF Challenge Solving",
              description: "Solve cryptography and reverse engineering challenges using XOR and other operations."
            },
            {
              title: "Mask and Flag Operations",
              description: "Calculate bit masks and flags for configuration and status registers."
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
              caveat: "Operations work bit-by-bit",
              explanation: "Each bit position is independent. Bit 0 of output depends only on bit 0 of inputs."
            },
            {
              caveat: "Inputs should be same length",
              explanation: "For two-input operations, pad shorter input with leading zeros to match lengths."
            },
            {
              caveat: "NOT is a single-input operation",
              explanation: "NOT inverts one value. AND, OR, XOR need two inputs. Some tools support NAND, NOR, XNOR too."
            },
            {
              caveat: "XOR is reversible",
              explanation: "A XOR B = C means C XOR B = A. This property makes XOR useful for encryption and swapping."
            },
            {
              caveat: "Logic gates build complex circuits",
              explanation: "All digital circuits are built from these basic gates. CPUs contain billions of transistors implementing these operations."
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
              question: "What's the XOR truth table?",
              answer: "0 XOR 0 = 0, 0 XOR 1 = 1, 1 XOR 0 = 1, 1 XOR 1 = 0. Output is 1 when inputs differ, 0 when same."
            },
            {
              question: "What's the AND truth table?",
              answer: "0 AND 0 = 0, 0 AND 1 = 0, 1 AND 0 = 0, 1 AND 1 = 1. Output is 1 only when both inputs are 1."
            },
            {
              question: "What's the OR truth table?",
              answer: "0 OR 0 = 0, 0 OR 1 = 1, 1 OR 0 = 1, 1 OR 1 = 1. Output is 0 only when both inputs are 0."
            },
            {
              question: "How is XOR used in encryption?",
              answer: "XOR with a key encrypts: ciphertext = plaintext XOR key. Decrypt: plaintext = ciphertext XOR key. Same operation!"
            },
            {
              question: "What are NAND and NOR gates?",
              answer: "NAND = NOT AND (inverted AND). NOR = NOT OR (inverted OR). These are 'universal gates' - any logic can be built from just NAND or just NOR."
            },
            {
              question: "How do I use AND as a mask?",
              answer: "AND with 1 keeps the bit, AND with 0 clears it. Value AND 00001111 keeps only the lower 4 bits."
            },
            {
              question: "What's XNOR?",
              answer: "XNOR is inverted XOR (NOT XOR). Output is 1 when inputs are the same, 0 when different. Equality checker."
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
