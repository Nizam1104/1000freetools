import React from "react"

export default function NumberPatternGeneratorSEO() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How the Number Pattern Generator Works</h2>
        <div className="prose prose-sm dark:prose-invert">
          <p className="text-muted-foreground">
            This tool generates number sequences based on mathematical patterns and custom rules.
            Choose from predefined patterns (arithmetic, geometric, Fibonacci, primes) or create your own formula.
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <h3 className="text-lg font-semibold">Pattern Generation Process</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Select a pattern type: Arithmetic, Geometric, Square, Cube, Fibonacci, Prime, or Custom</li>
            <li>Set the starting value (not applicable for Fibonacci and Prime patterns)</li>
            <li>Specify how many numbers to generate (up to 1000)</li>
            <li>For Arithmetic, set the common difference; for Geometric, set the common ratio</li>
            <li>For Custom, enter a formula using &apos;n&apos; to represent the position</li>
            <li>Click &quot;Generate&quot; to create the sequence</li>
          </ol>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Specific Use Cases</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Mathematics Education</h3>
            <p className="text-sm text-muted-foreground">
              A teacher demonstrates different sequence types to students. They generate examples of arithmetic
              and geometric sequences to illustrate how patterns grow and help students recognize them.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Algorithm Testing</h3>
            <p className="text-sm text-muted-foreground">
              A developer testing a sorting algorithm needs predictable input data. They generate arithmetic
              sequences (already sorted) and reverse them to create worst-case test scenarios.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Financial Modeling</h3>
            <p className="text-sm text-muted-foreground">
              An analyst models compound growth using geometric sequences. They set a starting investment
              and growth rate to project values over time.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Cryptography Research</h3>
            <p className="text-sm text-muted-foreground">
              A researcher studying prime number distribution generates sequences of primes to analyze
              gaps between consecutive primes and test conjectures.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Custom Formula Exploration</h3>
            <p className="text-sm text-muted-foreground">
              A math enthusiast explores sequences from formulas like n² + n + 41 (Euler&apos;s prime-generating polynomial)
              to discover interesting mathematical properties.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using This Tool</h2>
        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <p className="text-muted-foreground">
            Understanding pattern types and their parameters:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Arithmetic: adds a constant difference each step (1, 4, 7, 10... with diff=3)</li>
            <li>Geometric: multiplies by a constant ratio each step (2, 6, 18, 54... with ratio=3)</li>
            <li>Square: generates perfect squares (1, 4, 9, 16, 25...)</li>
            <li>Cube: generates perfect cubes (1, 8, 27, 64...)</li>
            <li>Fibonacci: each number is sum of previous two (0, 1, 1, 2, 3, 5, 8...)</li>
            <li>Prime: generates prime numbers in order (2, 3, 5, 7, 11...)</li>
            <li>Custom: use &apos;n&apos; for position, supports math functions like Math.sqrt(n)</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What is an arithmetic sequence?</h3>
            <p className="text-sm text-muted-foreground">
              An arithmetic sequence adds the same value each step. Example: 3, 7, 11, 15, 19...
              has a common difference of 4. Formula: aₙ = a₁ + (n-1)d where d is the difference.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What is a geometric sequence?</h3>
            <p className="text-sm text-muted-foreground">
              A geometric sequence multiplies by the same value each step. Example: 2, 6, 18, 54...
              has a common ratio of 3. Formula: aₙ = a₁ × r^(n-1) where r is the ratio.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">How does the Fibonacci sequence work?</h3>
            <p className="text-sm text-muted-foreground">
              Each Fibonacci number is the sum of the two preceding numbers: 0, 1, 1, 2, 3, 5, 8, 13...
              The ratio of consecutive Fibonacci numbers approaches the golden ratio (approximately 1.618).
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What can I use in custom formulas?</h3>
            <p className="text-sm text-muted-foreground">
              Use &apos;n&apos; for the position number. You can use JavaScript Math functions:
              Math.sqrt(n), Math.pow(n, 2), n * 2 + 1, etc. The formula is evaluated for each position.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Why are some results decimal numbers?</h3>
            <p className="text-sm text-muted-foreground">
              Geometric sequences with non-integer ratios and custom formulas with operations like
              square roots can produce decimal results. The tool shows up to 4 decimal places.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Can I generate decreasing sequences?</h3>
            <p className="text-sm text-muted-foreground">
              Yes! For arithmetic sequences, use a negative common difference. For geometric,
              use a ratio between 0 and 1 (like 0.5) to create a decreasing sequence.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
