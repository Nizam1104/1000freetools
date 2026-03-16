import React from "react"

export default function NumberFactorialCalculatorSEO() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How the Number Factorial Calculator Works</h2>
        <div className="prose prose-sm dark:prose-invert">
          <p className="text-muted-foreground">
            This tool calculates factorials, double factorials, permutations, and combinations using arbitrary-precision arithmetic.
            It handles very large results that exceed standard calculator limits.
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <h3 className="text-lg font-semibold">Calculation Modes</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><strong>n! (Factorial):</strong> Multiplies all integers from 1 to n</li>
            <li><strong>n!! (Double Factorial):</strong> Multiplies integers with step of 2 (n × (n-2) × (n-4)...)</li>
            <li><strong>P(n,r) (Permutation):</strong> Counts arrangements of r items from n: n!/(n-r)!</li>
            <li><strong>C(n,r) (Combination):</strong> Counts selections of r items from n: n!/(r!×(n-r)!)</li>
          </ol>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Specific Use Cases</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Probability and Statistics Homework</h3>
            <p className="text-sm text-muted-foreground">
              A student calculates combinations to find the probability of drawing specific cards.
              They use C(52,5) to find there are 2,598,960 possible 5-card poker hands.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Algorithm Complexity Analysis</h3>
            <p className="text-sm text-muted-foreground">
              A computer scientist analyzes factorial-time algorithms. They calculate 10! = 3,628,800
              to understand why brute-force approaches become impractical quickly.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Combinatorial Optimization</h3>
            <p className="text-sm text-muted-foreground">
              An operations researcher calculates permutations to evaluate traveling salesman problem
              complexity. For 15 cities, P(15,15) = 1.3 trillion possible routes.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Lottery Odds Calculation</h3>
            <p className="text-sm text-muted-foreground">
              Someone calculates their odds of winning a 6/49 lottery. C(49,6) = 13,983,816,
              meaning they have a 1 in 14 million chance with each ticket.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Mathematical Research</h3>
            <p className="text-sm text-muted-foreground">
              A researcher explores double factorial properties in special functions.
              They calculate sequences like 9!! = 945 to verify theoretical results.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using This Tool</h2>
        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <p className="text-muted-foreground">
            Understanding factorial calculations and their properties:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Factorials grow extremely fast - 100! has 158 digits</li>
            <li>Maximum input is 1000 to prevent browser performance issues</li>
            <li>Uses BigInt for arbitrary-precision arithmetic</li>
            <li>0! is defined as 1 (empty product convention)</li>
            <li>Permutations count ordered arrangements; combinations count unordered selections</li>
            <li>Double factorial skips every other number (only odd or even factors)</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What is a factorial?</h3>
            <p className="text-sm text-muted-foreground">
              A factorial (n!) multiplies all positive integers from 1 to n. Example: 5! = 5×4×3×2×1 = 120.
              Factorials count permutations and appear in probability, statistics, and calculus.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Why is 0! equal to 1?</h3>
            <p className="text-sm text-muted-foreground">
              By mathematical convention, 0! = 1. This makes formulas work consistently.
              Think of it as &quot;the number of ways to arrange zero things&quot; - there&apos;s exactly one way: do nothing.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What&apos;s the difference between permutation and combination?</h3>
            <p className="text-sm text-muted-foreground">
              Permutations count arrangements where order matters (ABC ≠ BAC).
              Combinations count selections where order doesn&apos;t matter (ABC = BAC).
              There are always more permutations than combinations.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What is a double factorial?</h3>
            <p className="text-sm text-muted-foreground">
              Double factorial (n!!) multiplies every other number. For odd n: n×(n-2)×(n-4)...×1.
              For even n: n×(n-2)×(n-4)...×2. Example: 7!! = 7×5×3×1 = 105.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">How large can factorials get?</h3>
            <p className="text-sm text-muted-foreground">
              Very large! 10! = 3.6 million, 20! ≈ 2.4 quintillion, 100! has 158 digits.
              This tool handles up to 1000! using arbitrary-precision arithmetic.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">When would I use combinations?</h3>
            <p className="text-sm text-muted-foreground">
              Use combinations when selecting items without regard to order: lottery numbers,
              committee members, pizza toppings, or card hands. The formula is C(n,r) = n!/(r!×(n-r)!).
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
