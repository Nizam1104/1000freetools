import React from "react"

export default function HistogramMakerSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Histogram Maker Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste your numerical data separated by commas, spaces, or newlines. The tool accepts integers and decimals, positive and negative values. Large datasets with thousands of values process quickly.
          </p>
          <p>
            Choose the number of bins (bars) or let the tool auto-calculate using Sturges' formula or square root rule. Bins divide your data range into equal intervals. Each bar's height shows how many values fall within that interval.
          </p>
          <p>
            Customize colors, labels, and titles. Add axis labels and a chart title for clarity. Download as PNG for presentations or SVG for publications. The histogram updates instantly as you adjust settings.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Analyzing exam score distributions</h3>
            <p className="text-sm text-muted-foreground">
              Visualize how students performed on a test. See if scores cluster around a central value, spread evenly, or show multiple peaks indicating different skill levels.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Quality control measurements</h3>
            <p className="text-sm text-muted-foreground">
              Plot product dimensions from manufacturing. Check if measurements follow a normal distribution centered on the target value, or if there's concerning variation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Website analytics data</h3>
            <p className="text-sm text-muted-foreground">
              Display session durations, page views per visit, or time on page. Understand user behavior patterns and identify typical versus unusual sessions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Income or price distributions</h3>
            <p className="text-sm text-muted-foreground">
              Show salary ranges in a company or house prices in a region. Histograms reveal skewness that averages hide - important for understanding inequality.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Scientific measurement data</h3>
            <p className="text-sm text-muted-foreground">
              Plot repeated measurements of a physical quantity. Assess measurement precision and check for systematic errors or instrument drift.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Customer age demographics</h3>
            <p className="text-sm text-muted-foreground">
              Visualize your customer base by age. Identify your core demographic and spot underserved age groups for targeted marketing.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Bin count affects interpretation.</strong>
              Too few bins oversimplify; too many create noise. Start with auto-calculation, then adjust to reveal patterns without excessive detail.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Histograms show continuous data.</strong>
              Use histograms for numerical measurements. For categorical data (like colors or brands), use a bar chart instead.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Bar area represents frequency.</strong>
              With equal-width bins, height shows frequency. With unequal bins, the area (height × width) represents frequency density.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Shape reveals distribution characteristics.</strong>
              Bell shape suggests normal distribution. Skewed shapes indicate asymmetry. Multiple peaks suggest mixed populations or subgroups.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Compare your histogram to a normal curve overlay to assess normality. Many statistical tests assume normal distribution. Significant deviations may require data transformation or non-parametric tests.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many bins should I use?</h3>
            <p className="text-sm text-muted-foreground">
              For 100 data points, 10-15 bins works well. Sturges' formula suggests log2(n) + 1 bins. Square root rule suggests √n bins. Experiment to find what reveals patterns best.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the minimum data needed?</h3>
            <p className="text-sm text-muted-foreground">
              Aim for at least 30-50 data points for a meaningful histogram. Smaller datasets may not show clear distribution patterns.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use dates or times?</h3>
            <p className="text-sm text-muted-foreground">
              Convert dates to numerical values first (like days since a reference date). The histogram works with numbers, not date formats directly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What does a bimodal histogram mean?</h3>
            <p className="text-sm text-muted-foreground">
              Two peaks suggest two distinct groups in your data. Example: test scores from two different classes mixed together, or heights of men and women combined.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I handle outliers?</h3>
            <p className="text-sm text-muted-foreground">
              Outliers stretch the x-axis, compressing the main distribution. Consider creating a separate histogram without extreme values, or use a broken axis.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I overlay multiple histograms?</h3>
            <p className="text-sm text-muted-foreground">
              This tool creates single histograms. For comparisons, create separate histograms or use a box plot which handles multiple groups better.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What file format should I download?</h3>
            <p className="text-sm text-muted-foreground">
              PNG for presentations and web use. SVG for publications and editing in design software. SVG scales infinitely without quality loss.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
