import React from "react"

export default function FactorialCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter a non-negative integer to calculate its factorial (n!). The factorial is the product of all positive integers from 1 to n. For example, 5! = 5 × 4 × 3 × 2 × 1 = 120.
          </p>
          <p>
            The calculator also supports double factorial (n!!), permutations P(n,r), and combinations C(n,r). Results display in full precision using big integer arithmetic for large factorials.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Example calculations:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">5! = 5 × 4 × 3 × 2 × 1 = 120
10! = 3,628,800
20! = 2,432,902,008,176,640,000

Double factorial: 5!! = 5 × 3 × 1 = 15

Permutation P(5,3) = 5!/(5-3)! = 60
Combination C(5,3) = 5!/(3!×2!) = 10</pre>
          </div>
          <p>
            Factorials grow extremely fast. 100! has 158 digits. The calculator handles values up to 1000! with arbitrary precision arithmetic.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Probability and statistics problems</h3>
            <p className="text-sm text-muted-foreground">
              Calculating the odds of drawing 5 specific cards from a deck uses combinations. C(52,5) = 2,598,960 possible hands. Factorials are essential for probability calculations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Combinatorics homework</h3>
            <p className="text-sm text-muted-foreground">
              "How many ways can 8 people sit in a row?" Answer: 8! = 40,320. "How many committees of 3 from 10 people?" C(10,3) = 120. Factorials solve these counting problems.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Algorithm complexity analysis</h3>
            <p className="text-sm text-muted-foreground">
              Brute-force traveling salesman has O(n!) complexity. For 10 cities, that's 3.6 million routes. For 20 cities, it's 2.4 quintillion. Factorials show why some problems are intractable.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Cryptography key space calculations</h3>
            <p className="text-sm text-muted-foreground">
              Permutation-based ciphers have key spaces calculated with factorials. A simple substitution cipher has 26! possible keys (4 × 10^26), making brute force impractical.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Lottery odds calculation</h3>
            <p className="text-sm text-muted-foreground">
              A lottery picking 6 numbers from 49 has C(49,6) = 13,983,816 combinations. Your odds of winning are 1 in nearly 14 million. Factorials reveal the true odds.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Password permutation analysis</h3>
            <p className="text-sm text-muted-foreground">
              How many ways to arrange 8 unique characters? 8! = 40,320. This helps understand password strength and why longer passwords with more character types are exponentially harder to crack.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Factorials grow extremely fast.</strong>
              10! is 3.6 million. 20! is 2.4 quintillion. 100! has 158 digits. By 170!, the result exceeds what standard floating-point can represent. This tool uses big integers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Zero factorial equals 1.</strong>
              By mathematical convention, 0! = 1. This makes formulas work correctly. It represents "one way to arrange zero items" - the empty arrangement.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Double factorial skips numbers.</strong>
              n!! multiplies every other number: 5!! = 5 × 3 × 1 = 15. For even numbers: 6!! = 6 × 4 × 2 = 48. Double factorials appear in some physics formulas.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Permutations consider order, combinations don't.</strong>
              P(5,3) = 60 counts ABC, ACB, BAC as different. C(5,3) = 10 counts them as the same. Use permutations for arrangements, combinations for selections.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For very large factorials (100+), the result will be a very long number. Consider using scientific notation or logarithms for practical calculations.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why is 0! equal to 1?</h3>
            <p className="text-sm text-muted-foreground">
              It's a mathematical convention that makes formulas consistent. The number of ways to arrange 0 items is 1 (do nothing). Also, n! = n × (n-1)!, so 1! = 1 × 0! means 0! = 1.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the largest factorial I can calculate?</h3>
            <p className="text-sm text-muted-foreground">
              This calculator handles up to 1000!. Beyond that, results become impractically large. 1000! has 2,568 digits. For larger values, use logarithms or approximations like Stirling's formula.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">When do I use permutations vs combinations?</h3>
            <p className="text-sm text-muted-foreground">
              Use permutations when order matters (passwords, seating arrangements, race rankings). Use combinations when order doesn't matter (lottery picks, committee selection, card hands).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What is double factorial used for?</h3>
            <p className="text-sm text-muted-foreground">
              Double factorials appear in combinatorics, physics, and probability. They count perfect matchings, appear in Taylor series for trigonometric functions, and in some probability distributions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I calculate negative factorials?</h3>
            <p className="text-sm text-muted-foreground">
              No, factorials are only defined for non-negative integers. The gamma function extends factorials to non-integers, but negative integers have undefined (infinite) factorials.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I calculate C(n,r) by hand?</h3>
            <p className="text-sm text-muted-foreground">
              C(n,r) = n! / (r! × (n-r)!). For C(5,3): 5! / (3! × 2!) = 120 / (6 × 2) = 10. You can simplify before multiplying: (5×4×5) / (3×2×1) = 10.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's Stirling's approximation?</h3>
            <p className="text-sm text-muted-foreground">
              For large n, n! ≈ √(2πn) × (n/e)^n. This approximates factorials without computing the full product. For n=100, it's within 0.1% of the actual value.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
