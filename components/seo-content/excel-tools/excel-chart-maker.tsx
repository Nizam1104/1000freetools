import React from "react"

export default function ExcelChartMakerSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Excel Chart Maker Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Upload your CSV/Excel data or paste it directly. Select the chart type: bar chart for comparisons, line chart for trends, or pie chart for proportions.
          </p>
          <p>
            Choose which column contains labels (categories) and which contains values (numbers). Enter a chart title. The tool generates an SVG chart instantly.
          </p>
          <p>
            Preview the chart interactively. Download as SVG for use in presentations, reports, or websites. Copy the SVG code for embedding. All processing happens locally in your browser.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Quick data visualization</h3>
            <p className="text-sm text-muted-foreground">
              Need a chart fast without opening Excel? Paste your data and get instant visualization. Perfect for quick analysis and sharing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating presentation graphics</h3>
            <p className="text-sm text-muted-foreground">
              Generate charts for PowerPoint or Google Slides. SVG format scales perfectly. Professional look without design skills.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Website data displays</h3>
            <p className="text-sm text-muted-foreground">
              Embed charts directly in web pages. SVG is lightweight and crisp. No JavaScript libraries needed for static charts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Report illustrations</h3>
            <p className="text-sm text-muted-foreground">
              Add visual impact to documents. Charts communicate trends better than tables. Include in PDFs and printed reports.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Exploratory data analysis</h3>
            <p className="text-sm text-muted-foreground">
              Visualize data quickly to spot patterns. Try different chart types. Understand your data before formal analysis.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Social media graphics</h3>
            <p className="text-sm text-muted-foreground">
              Create shareable data visualizations. Simple charts perform well on social. Engage your audience with data stories.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Bar charts work best for categories.</strong>
              Compare values across distinct groups. Product sales by category, scores by team, etc. Horizontal or vertical comparison.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Line charts show trends over time.</strong>
              Use when your labels have natural order. Dates, sequence numbers, progression. Shows how values change.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Pie charts show parts of whole.</strong>
              Use when values sum to meaningful total. Market share, budget allocation, survey responses. Limited to one series.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Value column must be numeric.</strong>
              Non-numeric values become zero. Ensure your data column contains numbers. Text numbers won't work.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For complex charts with multiple series, annotations, or interactivity, use Excel or dedicated charting libraries. This tool excels at simple, single-series charts.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What format is the output?</h3>
            <p className="text-sm text-muted-foreground">
              SVG (Scalable Vector Graphics). Works in all modern browsers. Can be opened in Illustrator, Inkscape, or any vector editor.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I customize colors?</h3>
            <p className="text-sm text-muted-foreground">
              This tool uses default color schemes. For custom colors, edit the SVG in a vector editor or use a more advanced charting tool.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many data points can I use?</h3>
            <p className="text-sm text-muted-foreground">
              Bar and line charts handle many points. Pie charts become unreadable with too many slices. Keep pie charts under 10 categories.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I add data labels?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, values are displayed on the charts. Bar charts show values above bars. Line charts show values at each point.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is the chart interactive?</h3>
            <p className="text-sm text-muted-foreground">
              No, this generates static SVG charts. For interactive charts, use JavaScript libraries like Chart.js or D3.js.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I export as PNG or JPG?</h3>
            <p className="text-sm text-muted-foreground">
              Download as SVG, then convert to PNG/JPG using any image tool. Or open SVG in browser and screenshot. Many options available.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is this tool free?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, completely free with no registration. Generate as many charts as you need. Your data stays in your browser.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
