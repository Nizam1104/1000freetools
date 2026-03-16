import React from "react"

export default function ZScoreCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Z-Score Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter three values: the raw score (your data point), the population mean, and the population standard deviation. The calculator computes the z-score using the formula z = (X - μ) / σ.
          </p>
          <p>
            The z-score tells you how many standard deviations your value is from the mean. Positive means above average, negative means below average, zero means exactly at the mean.
          </p>
          <p>
            The calculator also finds the percentile and probabilities. The percentile shows what percentage of values fall below yours. P(X less than) and P(X greater than) give the exact probabilities from the standard normal distribution.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Comparing test scores from different exams</h3>
            <p className="text-sm text-muted-foreground">
              You scored 85 on Exam A (mean 75, SD 10) and 90 on Exam B (mean 85, SD 15). Z-scores show Exam A performance was better relative to peers (z=1.0 vs z=0.33).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Identifying outliers in data</h3>
            <p className="text-sm text-muted-foreground">
              Values with z-scores beyond ±2 or ±3 are potential outliers. A z-score of 3.5 means the value is 3.5 standard deviations from the mean - very unusual.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Quality control thresholds</h3>
            <p className="text-sm text-muted-foreground">
              Set acceptance limits at z = ±2. Any product measurement outside this range fails quality control. This catches 95% of normal variation while flagging problems.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Growth chart percentiles</h3>
            <p className="text-sm text-muted-foreground">
              Pediatricians use z-scores to track child development. A height z-score of -1.5 means the child is shorter than 93% of peers (7th percentile).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Standardizing data for machine learning</h3>
            <p className="text-sm text-muted-foreground">
              Convert features to z-scores before training models. This puts all features on the same scale, improving algorithm performance and convergence.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Statistics exam problems</h3>
            <p className="text-sm text-muted-foreground">
              Your homework asks for the probability of a value in a normal distribution. Calculate the z-score, then find the corresponding probability.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Z-scores assume normal distribution.</strong>
              The probability calculations are valid only for normally distributed data. Skewed or bimodal distributions need different methods.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Population parameters must be known.</strong>
              Use the population mean and standard deviation, not sample estimates. If you only have sample statistics, the t-distribution is more appropriate.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Z-scores are unitless.</strong>
              The z-score has no units because it's a ratio. A z-score of 1.5 means the same thing whether measuring height in cm or weight in kg.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Percentile shows relative standing.</strong>
              84th percentile means 84% of values are below yours. This is more intuitive than z-scores for non-technical audiences.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Z-scores between -1 and 1 cover about 68% of normal data. Scores between -2 and 2 cover 95%. Anything beyond ±3 is rare (0.3% of data) and worth investigating.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does a z-score of 0 mean?</h3>
            <p className="text-sm text-muted-foreground">
              A z-score of 0 means the value equals the mean exactly. It's at the 50th percentile - half the data is below, half is above.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can z-scores be greater than 3?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but it's rare in normal data. A z-score of 4 means the value is 4 standard deviations from the mean. This happens in less than 0.01% of cases.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I interpret the probability?</h3>
            <p className="text-sm text-muted-foreground">
              P(X less than raw score) is the probability a random value from the distribution is below your value. If it's 0.84, there's an 84% chance of getting a lower value.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if standard deviation is zero?</h3>
            <p className="text-sm text-muted-foreground">
              Zero standard deviation means all values are identical. Z-score calculation is undefined (division by zero). There's no variation to measure.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is z-score the same as standard score?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, z-score and standard score are the same thing. Both describe how many standard deviations a value is from the mean.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this for sample data?</h3>
            <p className="text-sm text-muted-foreground">
              For small samples, use the t-statistic instead. Z-scores work well for large samples (n greater than 30) or when population parameters are known.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the z-score for the 95th percentile?</h3>
            <p className="text-sm text-muted-foreground">
              The 95th percentile corresponds to a z-score of approximately 1.645. This means 95% of values fall below 1.645 standard deviations above the mean.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
