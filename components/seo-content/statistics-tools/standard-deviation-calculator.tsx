import React from "react"

export default function StandardDeviationCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Standard Deviation Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter your data as comma-separated numbers, space-separated values, or paste directly from a spreadsheet. The calculator accepts any format and extracts the numbers automatically.
          </p>
          <p>
            Choose between sample standard deviation (divides by n-1) or population standard deviation (divides by n). Sample is used when your data represents a subset of a larger population. Population is used when you have all data points.
          </p>
          <p>
            Results display count, mean, median, standard deviation, variance, minimum, maximum, and range. The step-by-step section shows how the mean, variance, and standard deviation were calculated from your data.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Analyzing test score distributions</h3>
            <p className="text-sm text-muted-foreground">
              Your class scored 78, 82, 85, 90, 95 on an exam. Calculate standard deviation to see how spread out the scores are around the average.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Quality control in manufacturing</h3>
            <p className="text-sm text-muted-foreground">
              Measure 20 parts from production. Low standard deviation means consistent manufacturing. High deviation indicates process problems needing attention.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Investment risk assessment</h3>
            <p className="text-sm text-muted-foreground">
              Compare standard deviation of stock returns. Higher deviation means more volatility and risk. Use this to balance your portfolio's risk level.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Scientific experiment analysis</h3>
            <p className="text-sm text-muted-foreground">
              Run multiple trials of your experiment. Standard deviation shows measurement precision. Small deviation means your method is repeatable.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Survey data interpretation</h3>
            <p className="text-sm text-muted-foreground">
              Analyze responses from a sample group. Standard deviation helps you understand if responses cluster around the mean or vary widely.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Statistics homework problems</h3>
            <p className="text-sm text-muted-foreground">
              Your assignment gives a dataset and asks for standard deviation. Enter the values and verify your manual calculation step by step.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Sample vs population matters.</strong>
              Sample standard deviation uses n-1 (Bessel's correction) to give an unbiased estimate. Population uses n. Sample is more common since you rarely have complete population data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Standard deviation has the same units as data.</strong>
              If your data is in meters, standard deviation is in meters. Variance is in squared units (meters²), which is harder to interpret directly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Outliers inflate standard deviation.</strong>
              A single extreme value can dramatically increase the standard deviation. Check your data for outliers before interpreting spread.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Zero standard deviation means identical values.</strong>
              If every data point equals the mean, standard deviation is zero. This indicates no variation in your dataset.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For normal distributions, 68% of data falls within one standard deviation of the mean, 95% within two, and 99.7% within three. This "68-95-99.7 rule" helps interpret your results.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">When should I use sample vs population?</h3>
            <p className="text-sm text-muted-foreground">
              Use sample when your data is a subset of a larger group (survey respondents, test products). Use population when you have every member (all employees, complete census).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does a high standard deviation mean?</h3>
            <p className="text-sm text-muted-foreground">
              High standard deviation means data points are spread far from the mean. There's high variability. Low standard deviation means data clusters tightly around the average.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can standard deviation be negative?</h3>
            <p className="text-sm text-muted-foreground">
              No. Standard deviation is the square root of variance, which is always positive or zero. You can't have negative spread in data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many data points do I need?</h3>
            <p className="text-sm text-muted-foreground">
              Technically two for sample standard deviation. Practically, 30+ gives more reliable estimates. With fewer than 10 points, the standard deviation itself has high uncertainty.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between variance and standard deviation?</h3>
            <p className="text-sm text-muted-foreground">
              Variance is the average squared deviation from the mean. Standard deviation is the square root of variance. Standard deviation is more interpretable because it's in original units.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this handle negative numbers?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Negative values work fine. Temperature readings, financial losses, or any data with negative values calculate correctly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How is median different from mean?</h3>
            <p className="text-sm text-muted-foreground">
              Mean is the arithmetic average. Median is the middle value when sorted. Median is less affected by outliers. Both measure central tendency but answer different questions.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
