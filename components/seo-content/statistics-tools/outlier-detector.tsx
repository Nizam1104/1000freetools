import React from "react"

export default function OutlierDetectorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Outlier Detector Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter your dataset as numbers separated by commas, spaces, or newlines. The tool accepts integers and decimals, positive and negative values. Larger datasets provide more reliable outlier detection.
          </p>
          <p>
            Choose the detection method: IQR (Interquartile Range) or Z-score. IQR method flags values below Q1 - 1.5×IQR or above Q3 + 1.5×IQR. Z-score method flags values with |z| {">"} 3 (or your chosen threshold).
          </p>
          <p>
            Results highlight detected outliers in your data. Statistics show how many outliers were found and their impact on mean and standard deviation. Option to remove outliers and recalculate statistics to see the effect.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Data cleaning before analysis</h3>
            <p className="text-sm text-muted-foreground">
              Identify data entry errors or measurement glitches. A height of 300 cm is likely a typo. Remove or correct before running statistical analyses.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Fraud detection</h3>
            <p className="text-sm text-muted-foreground">
              Flag unusual transactions for review. Credit card charges far from a customer's typical spending pattern may indicate fraudulent activity.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Quality control monitoring</h3>
            <p className="text-sm text-muted-foreground">
              Detect manufacturing defects. Products with measurements outside normal variation indicate process problems requiring investigation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Sensor data validation</h3>
            <p className="text-sm text-muted-foreground">
              Identify faulty sensor readings. IoT devices sometimes transmit impossible values. Outlier detection filters bad data before analysis.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Performance anomaly detection</h3>
            <p className="text-sm text-muted-foreground">
              Find unusual system behavior. Server response times or network traffic spikes may indicate security incidents or hardware failures.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Research data screening</h3>
            <p className="text-sm text-muted-foreground">
              Check for data quality issues before publication. Outliers can dramatically affect results. Document how you handled them in your methods.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Not all outliers are errors.</strong>
              Some represent genuine extreme values. A billionaire in an income study is real, not a mistake. Don't automatically remove all outliers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">IQR method is more robust.</strong>
              IQR-based detection works better for skewed distributions. Z-score assumes normal distribution and can miss outliers in skewed data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Removing outliers changes statistics.</strong>
              Outliers inflate standard deviation and can shift the mean. Compare statistics with and without outliers to understand their impact.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Document your outlier handling.</strong>
              Always report how you identified and handled outliers. Transparency allows others to evaluate your decisions and replicate your analysis.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Investigate outliers before removing them. They might reveal important insights - a new customer segment, a process failure, or a previously unknown phenomenon. Outliers are often the most interesting data points.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I always remove outliers?</h3>
            <p className="text-sm text-muted-foreground">
              No. Remove only if they're errors or from a different population. Genuine extreme values are part of your data and may be scientifically important.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Which method is better: IQR or Z-score?</h3>
            <p className="text-sm text-muted-foreground">
              IQR is generally safer - it doesn't assume normal distribution. Z-score works well for normally distributed data but can fail for skewed distributions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's a good Z-score threshold?</h3>
            <p className="text-sm text-muted-foreground">
              3 is standard (99.7% of normal data falls within ±3). Use 2.5 for more sensitivity or 3.5 for less. Adjust based on your tolerance for false positives.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many outliers is too many?</h3>
            <p className="text-sm text-muted-foreground">
              If more than 5-10% of data are outliers, something's wrong. Either your data has issues, your threshold is too strict, or you're studying a highly variable phenomenon.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I have outliers on both ends?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Outliers can be unusually low, unusually high, or both. The IQR method checks both tails. Z-score method flags both positive and negative extremes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if removing outliers changes my conclusion?</h3>
            <p className="text-sm text-muted-foreground">
              Report both analyses. If conclusions differ, your results aren't robust. Consider non-parametric methods that are less sensitive to outliers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I handle outliers in reports?</h3>
            <p className="text-sm text-muted-foreground">
              State your outlier detection method, threshold, number removed, and justification. Example: "Three values {">"}3 SD from mean were excluded as measurement errors."
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
