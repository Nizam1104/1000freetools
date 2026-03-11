import * as React from "react"

export default function CalendarHeatmapGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            Input your activity data as date-value pairs, where each date represents a day and the value represents the intensity or count of activity for that day. You can paste data in CSV format, enter values manually, or import from a supported data source.
          </p>
          <p>
            Choose a color scheme that fits your data - from GitHub-style greens to custom gradients. Set the range thresholds that determine which colors correspond to which value ranges. Preview the heatmap as you configure it.
          </p>
          <p>
            Generate the heatmap visualization showing a full year (or custom date range) with each day colored according to its activity level. Export as PNG, SVG, or embeddable HTML code for reports, dashboards, or personal tracking displays.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">GitHub Contribution Style Tracking</h3>
            <p className="text-sm text-muted-foreground">
              Visualize coding activity, commits, or pull requests over time in the familiar GitHub contribution graph style.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Habit Tracking</h3>
            <p className="text-sm text-muted-foreground">
              Track daily habits like exercise, meditation, or reading with a visual representation of consistency.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Productivity Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Identify productive periods and slumps by visualizing work output, tasks completed, or hours focused.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Fitness Progress</h3>
            <p className="text-sm text-muted-foreground">
              Map workout intensity, steps taken, or calories burned to see fitness patterns throughout the year.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Mood Tracking</h3>
            <p className="text-sm text-muted-foreground">
              Create a year-in-review visualization of daily mood scores to identify emotional patterns and triggers.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Business Metrics</h3>
            <p className="text-sm text-muted-foreground">
              Display sales, website traffic, or customer support tickets in executive dashboards and reports.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Data format flexibility:</strong> Accepts various date formats (YYYY-MM-DD, MM/DD/YYYY, etc.) and numeric values. Invalid entries are skipped with warnings.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Colorblind-friendly options:</strong> Multiple color schemes are available, including options designed for colorblind accessibility.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Missing data handling:</strong> Days without data appear as empty/gray cells. You can choose to show zero values differently from missing data.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Export formats:</strong> PNG is best for presentations, SVG for further editing in design tools, and HTML for web embedding.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Privacy consideration:</strong> All processing happens in your browser. Data isn't sent to servers, making it safe for sensitive information.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">What data format should I use?</h3>
            <p className="text-sm text-muted-foreground">
              CSV format works best: one line per day with "date,value" (e.g., "2024-01-15,5"). You can also paste two columns from a spreadsheet directly.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I show multiple years?</h3>
            <p className="text-sm text-muted-foreground">
              The standard view shows one year. For multi-year visualization, generate separate heatmaps for each year or use a custom date range that spans multiple years in a single row.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I customize the color thresholds?</h3>
            <p className="text-sm text-muted-foreground">
              Adjust the threshold sliders or enter specific values to define what ranges correspond to each color intensity. The preview updates in real-time.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I add labels or a legend?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. The export includes a legend showing the color scale and value ranges. You can also add a custom title that appears on the exported image.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What if I have multiple data points per day?</h3>
            <p className="text-sm text-muted-foreground">
              The tool aggregates multiple entries for the same day by summing them by default. You can also choose to use average, maximum, or minimum values instead.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I embed this in my website?</h3>
            <p className="text-sm text-muted-foreground">
              Use the HTML export option which generates self-contained code with inline SVG. Paste this directly into your webpage's HTML where you want the heatmap to appear.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I track negative values?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Negative values are supported and can be displayed with a diverging color scheme (e.g., red for negative, green for positive) to show direction as well as magnitude.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
