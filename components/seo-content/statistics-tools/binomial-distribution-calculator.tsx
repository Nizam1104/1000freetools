import React from "react"

export default function BinomialDistributionCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Binomial Distribution Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter the number of trials (n) - the total number of independent attempts. Input the probability of success (p) for each trial as a decimal between 0 and 1. Specify the number of successes (x) you're interested in.
          </p>
          <p>
            Select the probability type: exactly x successes, at most x successes (cumulative up to x), at least x successes (cumulative from x), or more than x successes. The calculator uses the binomial formula: P(X=x) = C(n,x) × p^x × (1-p)^(n-x).
          </p>
          <p>
            Results display the probability as decimal and percentage. The distribution graph shows probabilities for all possible outcomes from 0 to n successes. Mean (np) and standard deviation (√(np(1-p))) help interpret the distribution's center and spread.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Quality control sampling</h3>
            <p className="text-sm text-muted-foreground">
              Find probability of finding exactly 2 defective items in a sample of 20, when defect rate is 5%. Helps set acceptable quality levels.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Medical treatment success rates</h3>
            <p className="text-sm text-muted-foreground">
              Calculate probability that at least 8 out of 10 patients respond to treatment with 70% success rate. Useful for setting realistic expectations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Survey response analysis</h3>
            <p className="text-sm text-muted-foreground">
              Determine likelihood of getting at least 50 "yes" responses from 100 people when true proportion is 40%. Helps assess survey reliability.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Sports performance prediction</h3>
            <p className="text-sm text-muted-foreground">
              Find probability a basketball player makes exactly 7 of 10 free throws given 75% career average. Compare actual performance to expected.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Genetics inheritance patterns</h3>
            <p className="text-sm text-muted-foreground">
              Calculate probability of exactly 3 children inheriting a dominant trait from heterozygous parents (75% chance each). Applies Mendelian genetics.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Marketing campaign planning</h3>
            <p className="text-sm text-muted-foreground">
              Estimate probability of getting at least 100 conversions from 1000 emails with 8% historical conversion rate. Helps set campaign goals.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Trials must be independent.</strong>
              Each trial's outcome doesn't affect others. Coin flips are independent. Drawing cards without replacement is not - use hypergeometric instead.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Success probability must be constant.</strong>
              The probability p stays the same for every trial. If probability changes (like learning effects), binomial doesn't apply.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Only two outcomes per trial.</strong>
              Each trial results in success or failure. For more than two outcomes, use multinomial distribution instead.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Normal approximation works for large n.</strong>
              When np ≥ 10 and n(1-p) ≥ 10, binomial approximates normal distribution. Useful for quick estimates with large samples.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> "At least" and "at most" calculations can be computationally intensive for large n. Use complement rule: P(at least 5) = 1 - P(at most 4). Often faster to calculate the smaller tail.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the expected number of successes?</h3>
            <p className="text-sm text-muted-foreground">
              Expected value = n × p. If you flip 100 coins (p=0.5), expect 50 heads. This is the long-run average over many repetitions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I calculate combinations C(n,x)?</h3>
            <p className="text-sm text-muted-foreground">
              C(n,x) = n! / (x! × (n-x)!). It counts ways to choose x items from n. Also written as "n choose x" or with subscript notation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">When is the distribution symmetric?</h3>
            <p className="text-sm text-muted-foreground">
              When p = 0.5, the distribution is symmetric. When p < 0.5, it skews right. When p > 0.5, it skews left.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the most likely outcome?</h3>
            <p className="text-sm text-muted-foreground">
              The mode is floor((n+1) × p). For n=10, p=0.3, mode is floor(11 × 0.3) = 3. This is the single most probable number of successes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can probability exceed 1?</h3>
            <p className="text-sm text-muted-foreground">
              No. Individual probabilities range from 0 to 1. The sum of all probabilities from 0 to n successes equals exactly 1.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if n is very large?</h3>
            <p className="text-sm text-muted-foreground">
              Use normal approximation with mean = np and SD = √(np(1-p)). Apply continuity correction by adding/subtracting 0.5 for better accuracy.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How does this differ from Poisson?</h3>
            <p className="text-sm text-muted-foreground">
              Binomial has fixed n trials. Poisson models counts over time/space with no fixed maximum. Use Poisson when n is large and p is small.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
