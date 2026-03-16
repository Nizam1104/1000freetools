import React from "react"

export default function MeanMedianModeCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Mean, Median, Mode Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter your data as comma-separated numbers, space-separated values, or paste from a spreadsheet. The calculator extracts all numbers and computes descriptive statistics instantly.
          </p>
          <p>
            Mean is the arithmetic average (sum divided by count). Median is the middle value when data is sorted. Mode is the most frequently occurring value. The calculator also shows count, sum, minimum, maximum, and range.
          </p>
          <p>
            If all values appear equally (no repeats), the calculator shows "No mode". If multiple values tie for most frequent, all modes are displayed. This handles unimodal, bimodal, and multimodal datasets.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Summarizing survey responses</h3>
            <p className="text-sm text-muted-foreground">
              You collected 50 ratings from 1-10. The mean shows overall sentiment, the median shows the middle response, and the mode shows the most common rating.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Analyzing household income data</h3>
            <p className="text-sm text-muted-foreground">
              Income data is often skewed by high earners. Median gives a better "typical" value than mean. Mode shows the most common income bracket.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Grading student performance</h3>
            <p className="text-sm text-muted-foreground">
              Calculate class statistics from test scores. Mean shows overall performance. Median tells you the middle student's score. Mode reveals the most common score.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Quality control measurements</h3>
            <p className="text-sm text-muted-foreground">
              Measure product dimensions from a production run. Mean shows if you're hitting the target. Range shows variation. Mode reveals the most common output.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Real estate market analysis</h3>
            <p className="text-sm text-muted-foreground">
              Home prices in a neighborhood. Median is the standard metric because mean gets skewed by mansions. Mode shows the most common price point.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Statistics homework problems</h3>
            <p className="text-sm text-muted-foreground">
              Your assignment gives a dataset and asks for measures of central tendency. Enter the values and get mean, median, and mode with one calculation.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Mean is sensitive to outliers.</strong>
              One extreme value can pull the mean significantly. A dataset of 1, 2, 3, 4, 100 has mean 22, which doesn't represent most values.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Median is resistant to outliers.</strong>
              The same dataset (1, 2, 3, 4, 100) has median 3, which better represents the "typical" value. Use median for skewed distributions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Mode works for non-numeric data.</strong>
              You can find the mode of categories (red, blue, green) but not mean or median. Mode is the only measure that works with nominal data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some datasets have no mode.</strong>
              If every value appears exactly once, there's no mode. If all values appear the same number of times, the dataset is considered to have no mode.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For symmetric distributions, mean and median are close. For right-skewed data (like income), mean is greater than median. For left-skewed data, mean is less than median.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">When should I use mean vs median?</h3>
            <p className="text-sm text-muted-foreground">
              Use mean for symmetric data without outliers. Use median for skewed data or when outliers are present. Median is better for income, home prices, and response times.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can there be two modes?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. A dataset with two values that tie for most frequent is bimodal. Three tied values make it trimodal. More than three is multimodal.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does range tell me?</h3>
            <p className="text-sm text-muted-foreground">
              Range is the difference between maximum and minimum. It shows the total spread of data. Large range means high variability. Small range means data is clustered.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How is median calculated for even counts?</h3>
            <p className="text-sm text-muted-foreground">
              For even number of values, median is the average of the two middle values. In 1, 3, 5, 7, the median is (3 + 5) / 2 = 4.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this handle decimal numbers?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Enter decimals like 3.14, 2.71, 1.41. The calculator treats them the same as whole numbers for all statistics.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about negative numbers?</h3>
            <p className="text-sm text-muted-foreground">
              Negative values work correctly. Temperature data, financial losses, or any data with negatives calculates properly for all statistics.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why is sum included?</h3>
            <p className="text-sm text-muted-foreground">
              Sum is the total of all values. It's useful for understanding aggregate quantities. Mean equals sum divided by count, so sum shows the raw total.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
