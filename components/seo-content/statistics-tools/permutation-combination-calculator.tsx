import React from "react"

export default function PermutationCombinationCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Permutation & Combination Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter n (total number of items) and r (number of items to select). Both must be non-negative integers, with r ≤ n. The calculator handles values up to very large numbers using arbitrary precision arithmetic.
          </p>
          <p>
            Permutations (nPr) count arrangements where order matters. The formula is nPr = n! / (n-r)!. Combinations (nCr) count selections where order doesn't matter. The formula is nCr = n! / (r! × (n-r)!).
          </p>
          <p>
            Results show both nPr and nCr values with step-by-step calculations. The relationship nPr = nCr × r! is displayed, showing that permutations equal combinations multiplied by the arrangements of selected items.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Password security analysis</h3>
            <p className="text-sm text-muted-foreground">
              Calculate possible password combinations. An 8-character password from 95 characters has 95^8 possibilities. Understand brute-force resistance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Lottery odds calculation</h3>
            <p className="text-sm text-muted-foreground">
              Find your odds of winning. Choosing 6 numbers from 49 gives C(49,6) = 13,983,816 combinations. That's why jackpots grow so large.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Committee formation</h3>
            <p className="text-sm text-muted-foreground">
              Determine ways to form a 5-person committee from 20 employees. Order doesn't matter, so use combinations: C(20,5) = 15,504 ways.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Seating arrangement planning</h3>
            <p className="text-sm text-muted-foreground">
              Calculate ways to seat 8 guests at a table. If seats are distinct, it's P(8,8) = 8! = 40,320 arrangements. Circular tables divide by 8.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Menu combination analysis</h3>
            <p className="text-sm text-muted-foreground">
              Count possible meal combinations. Choose 3 sides from 8 options: C(8,3) = 56 combinations. Helps design menu variety and pricing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Sports bracket possibilities</h3>
            <p className="text-sm text-muted-foreground">
              Calculate tournament outcome combinations. A 64-team single-elimination bracket has 2^63 possible outcomes - explaining why perfect brackets are impossible.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Order matters for permutations.</strong>
              ABC and BAC are different permutations but the same combination. Ask: does rearranging create a different outcome?
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Factorials grow extremely fast.</strong>
              10! = 3,628,800. 20! exceeds 2 quintillion. Large factorials explain why exhaustive search is impossible for many problems.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Combinations are always fewer than permutations.</strong>
              nCr = nPr / r!. For each combination of r items, there are r! ways to arrange them. More arrangements mean more permutations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Special cases have simple answers.</strong>
              nPn = n! (all arrangements). nCn = 1 (only one way to choose all). nC0 = 1 (one way to choose nothing). nP1 = n (n ways to pick one).
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For "at least" or "at most" problems, use the complement. C(52,5) - C(48,5) gives hands with at least one ace, easier than counting hands with 1, 2, 3, or 4 aces separately.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">When do I use permutation vs combination?</h3>
            <p className="text-sm text-muted-foreground">
              Ask: does order matter? Lock combinations (1-2-3 vs 3-2-1) are actually permutations. Lottery picks are combinations - order of drawing doesn't matter.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does factorial mean?</h3>
            <p className="text-sm text-muted-foreground">
              n! = n × (n-1) × (n-2) × ... × 2 × 1. It's the number of ways to arrange n distinct items. By convention, 0! = 1.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can r be larger than n?</h3>
            <p className="text-sm text-muted-foreground">
              No. You can't select more items than available. Both nPr and nCr equal 0 when r > n. The calculator will show an error.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about repetition?</h3>
            <p className="text-sm text-muted-foreground">
              These formulas assume no repetition. For permutations with repetition: n^r. For combinations with repetition: C(n+r-1, r).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why is 0! equal to 1?</h3>
            <p className="text-sm text-muted-foreground">
              It's defined that way for mathematical consistency. There's exactly one way to arrange zero items (do nothing). It makes formulas work correctly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I calculate by hand?</h3>
            <p className="text-sm text-muted-foreground">
              For nPr: multiply n × (n-1) × ... for r terms. For nCr: calculate nPr then divide by r!. Cancel common factors to simplify.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's Pascal's triangle?</h3>
            <p className="text-sm text-muted-foreground">
              A triangular array where each entry is a combination value. Row n, position r gives C(n,r). Each entry equals the sum of two entries above it.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
