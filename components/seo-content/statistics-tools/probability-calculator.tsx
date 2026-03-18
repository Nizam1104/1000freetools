import React from "react"

export default function ProbabilityCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Probability Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter probabilities as decimals between 0 and 1, or as percentages. For single events, input the probability directly. For multiple events, enter each event's probability and specify their relationship.
          </p>
          <p>
            Select the calculation type: union (A or B), intersection (A and B), conditional probability (A given B), or complement (not A). For independent events, the calculator uses P(A and B) = P(A) × P(B). For dependent events, use conditional probability formulas.
          </p>
          <p>
            Results display as both decimal and percentage. Step-by-step calculations show the formula used. Visual representations help understand the relationship between events using Venn diagrams or probability trees.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Risk assessment calculations</h3>
            <p className="text-sm text-muted-foreground">
              Calculate probability of system failure when multiple components can fail. Use union for "any component fails" or intersection for "all components fail."
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Medical test interpretation</h3>
            <p className="text-sm text-muted-foreground">
              Find probability of disease given a positive test result. Use conditional probability with test sensitivity, specificity, and disease prevalence.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Game strategy decisions</h3>
            <p className="text-sm text-muted-foreground">
              Calculate odds of drawing specific cards or rolling certain combinations. Compare probabilities to make optimal gameplay decisions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Quality control sampling</h3>
            <p className="text-sm text-muted-foreground">
              Determine probability of finding defects in a sample. Use binomial probability when sampling with replacement or from large populations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Investment portfolio analysis</h3>
            <p className="text-sm text-muted-foreground">
              Calculate probability of multiple investments succeeding. Account for correlation between assets when events aren't independent.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Weather forecast planning</h3>
            <p className="text-sm text-muted-foreground">
              Find probability of rain on at least one day of a trip. Combine daily forecasts using union probability for multi-day event planning.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Probabilities must be between 0 and 1.</strong>
              Zero means impossible, one means certain. Percentages need conversion: 50% = 0.5. Values outside this range indicate input errors.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Independence affects calculations.</strong>
              Independent events don't influence each other's probability. Dependent events require conditional probability. Don't assume independence without justification.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Mutually exclusive events can't both occur.</strong>
              For mutually exclusive events, P(A and B) = 0. The union simplifies to P(A) + P(B) with no overlap to subtract.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Conditional probability reverses with Bayes' theorem.</strong>
              P(A|B) differs from P(B|A). Bayes' theorem connects them: P(A|B) = P(B|A) × P(A) / P(B). Crucial for medical testing and inference.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For "at least one" problems, calculate the complement (none occur) and subtract from 1. Example: P(at least one head in 3 flips) = 1 - P(no heads) = 1 - 0.125 = 0.875.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between union and intersection?</h3>
            <p className="text-sm text-muted-foreground">
              Union (A or B) means either event happens. Intersection (A and B) means both happen together. Union probability is always greater than or equal to intersection.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I know if events are independent?</h3>
            <p className="text-sm text-muted-foreground">
              Events are independent if one doesn't affect the other's probability. Coin flips are independent. Drawing cards without replacement is dependent.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can probability be greater than 1?</h3>
            <p className="text-sm text-muted-foreground">
              No. Probability ranges from 0 to 1 (or 0% to 100%). Values outside this range indicate calculation errors or misunderstanding of the problem.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does conditional probability mean?</h3>
            <p className="text-sm text-muted-foreground">
              P(A|B) is the probability of A given that B already occurred. It updates your assessment based on new information. Foundation of Bayesian reasoning.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why subtract P(A and B) in union formula?</h3>
            <p className="text-sm text-muted-foreground">
              P(A) + P(B) counts the overlap twice. Subtracting P(A and B) removes the double-counting. This is the inclusion-exclusion principle.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I handle three or more events?</h3>
            <p className="text-sm text-muted-foreground">
              Apply formulas iteratively. For union of three events: P(A or B or C) = P(A) + P(B) + P(C) - P(A and B) - P(A and C) - P(B and C) + P(A and B and C).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the complement rule?</h3>
            <p className="text-sm text-muted-foreground">
              P(not A) = 1 - P(A). Useful for "at least one" problems. Sometimes easier to calculate the probability of something not happening.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
