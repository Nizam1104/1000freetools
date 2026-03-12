"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const COLORS = ["#4f46e5", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#0ea5e9"];

export default function BarChartBuilder() {
  const [labels, setLabels] = useState("");
  const [values, setValues] = useState("");
  const [title, setTitle] = useState("My Bar Chart");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const generate = () => {
    setError("");
    setResult(null);

    const labelList = labels.split(/[\n,]+/).filter(s => s.trim());
    const valueList = values.split(/[\n,\s]+/).filter(s => s.trim()).map(Number);

    if (labelList.length !== valueList.length) {
      setError("Labels and values must have the same count");
      return;
    }

    if (labelList.length < 1) {
      setError("Please enter at least one data point");
      return;
    }

    if (valueList.some(isNaN)) {
      setError("Please enter valid numbers for values");
      return;
    }

    const maxValue = Math.max(...valueList.map(Math.abs));
    const chartHeight = 250;
    const chartWidth = 400;
    const padding = { top: 40, right: 20, bottom: 60, left: 50 };
    const innerWidth = chartWidth - padding.left - padding.right;
    const innerHeight = chartHeight - padding.top - padding.bottom;

    const barWidth = innerWidth / labelList.length * 0.7;
    const barGap = innerWidth / labelList.length * 0.3;

    const bars = labelList.map((label, i) => {
      const value = valueList[i];
      const barHeight = (Math.abs(value) / maxValue) * innerHeight * 0.9;
      const x = padding.left + (i * (barWidth + barGap)) + barGap / 2;
      const y = value >= 0
        ? padding.top + innerHeight - barHeight
        : padding.top + innerHeight;

      return {
        label,
        value,
        x,
        y,
        width: barWidth,
        height: barHeight,
        color: COLORS[i % COLORS.length]
      };
    });

    const yAxisTicks = 5;
    const yTicks = Array.from({ length: yAxisTicks + 1 }, (_, i) => {
      const value = (maxValue * i / yAxisTicks);
      const y = padding.top + innerHeight - (innerHeight * i / yAxisTicks);
      return { value, y };
    });

    setResult({
      bars,
      yTicks,
      padding,
      chartWidth,
      chartHeight,
      innerWidth,
      innerHeight,
      stats: {
        count: labelList.length,
        sum: valueList.reduce((a, b) => a + b, 0),
        average: valueList.reduce((a, b) => a + b, 0) / valueList.length,
        max: Math.max(...valueList),
        min: Math.min(...valueList)
      }
    });
  };

  const reset = () => {
    setLabels("");
    setValues("");
    setTitle("My Bar Chart");
    setResult(null);
    setError("");
  };

  const loadExample = (exampleLabels: string, exampleValues: string, exampleTitle: string) => {
    setLabels(exampleLabels);
    setValues(exampleValues);
    setTitle(exampleTitle);
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Bar Chart Builder – Create Bar Charts Online Free</h1>
        <p className="text-muted-foreground">
          Create beautiful bar charts from your data with our free online bar chart builder. Visualize comparisons, track trends, and present data effectively with customizable bar graphs.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Chart Title</Label>
          <Input
            placeholder="Enter chart title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Labels (one per line)</Label>
            <Textarea
              placeholder="Product A&#10;Product B&#10;Product C"
              value={labels}
              onChange={(e) => setLabels(e.target.value)}
              rows={6}
            />
          </div>
          <div>
            <Label>Values (one per line)</Label>
            <Textarea
              placeholder="100&#10;150&#10;200"
              value={values}
              onChange={(e) => setValues(e.target.value)}
              rows={6}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={generate}>Generate Bar Chart</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("Jan\nFeb\nMar\nApr\nMay\nJun", "120\n150\n180\n220\n190\n250", "Monthly Sales")}>
            Monthly Sales
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("Product A\nProduct B\nProduct C\nProduct D", "85\n120\n95\n140", "Product Comparison")}>
            Product Comparison
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("Team Alpha\nTeam Beta\nTeam Gamma\nTeam Delta", "45\n52\n38\n61", "Team Scores")}>
            Team Scores
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("Q1\nQ2\nQ3\nQ4", "250000\n310000\n285000\n395000", "Quarterly Revenue")}>
            Quarterly Revenue
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("Math\nScience\nEnglish\nHistory\nArt", "88\n92\n85\n78\n95", "Subject Grades")}>
            Subject Grades
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("Mon\nTue\nWed\nThu\nFri\nSat\nSun", "45\n52\n38\n61\n55\n72\n68", "Weekly Website Visits")}>
            Weekly Visits
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("North\nSouth\nEast\nWest", "1250\n980\n1420\n1100", "Regional Distribution")}>
            Regional Data
          </Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-4 text-center">{title}</h4>
              <div className="flex justify-center">
                <svg viewBox={`0 0 ${result.chartWidth} ${result.chartHeight}`} className="w-full max-w-lg">
                  {/* Grid lines */}
                  {result.yTicks.map((tick: any, i: number) => (
                    <line
                      key={i}
                      x1={result.padding.left}
                      y1={tick.y}
                      x2={result.chartWidth - result.padding.right}
                      y2={tick.y}
                      stroke="currentColor"
                      strokeWidth="0.5"
                      className="text-muted"
                      strokeDasharray="2,2"
                    />
                  ))}

                  {/* Y-axis */}
                  <line
                    x1={result.padding.left}
                    y1={result.padding.top}
                    x2={result.padding.left}
                    y2={result.chartHeight - result.padding.bottom}
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-foreground"
                  />

                  {/* X-axis */}
                  <line
                    x1={result.padding.left}
                    y1={result.chartHeight - result.padding.bottom}
                    x2={result.chartWidth - result.padding.right}
                    y2={result.chartHeight - result.padding.bottom}
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-foreground"
                  />

                  {/* Y-axis labels */}
                  {result.yTicks.map((tick: any, i: number) => (
                    <text
                      key={i}
                      x={result.padding.left - 8}
                      y={tick.y + 4}
                      textAnchor="end"
                      className="text-xs fill-muted-foreground"
                    >
                      {Math.round(tick.value)}
                    </text>
                  ))}

                  {/* Bars */}
                  {result.bars.map((bar: any, i: number) => (
                    <g key={i}>
                      <rect
                        x={bar.x}
                        y={bar.y}
                        width={bar.width}
                        height={bar.height}
                        fill={bar.color}
                        className="transition-opacity hover:opacity-80"
                      />
                      <text
                        x={bar.x + bar.width / 2}
                        y={bar.y - 8}
                        textAnchor="middle"
                        className="text-xs fill-muted-foreground font-semibold"
                      >
                        {bar.value}
                      </text>
                      <text
                        x={bar.x + bar.width / 2}
                        y={result.chartHeight - result.padding.bottom + 20}
                        textAnchor="middle"
                        className="text-xs fill-muted-foreground"
                        style={{ writingMode: 'vertical-rl' }}
                      >
                        {bar.label.length > 10 ? bar.label.substring(0, 10) + '...' : bar.label}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Data Points</p>
                <p className="text-2xl font-bold">{result.stats.count}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Sum</p>
                <p className="text-2xl font-bold">{Math.round(result.stats.sum * 100) / 100}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Average</p>
                <p className="text-2xl font-bold">{Math.round(result.stats.average * 100) / 100}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Maximum</p>
                <p className="text-2xl font-bold">{result.stats.max}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Minimum</p>
                <p className="text-2xl font-bold">{result.stats.min}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Bar Chart Builder – Visualize Your Data</h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Bar charts are the go-to visualization for comparing quantities across categories. Whether you're comparing monthly sales, survey responses, test scores, or product performance, a well-designed bar chart makes patterns immediately visible. This builder creates clean, readable charts directly in your browser.
          </p>
          <p className="text-muted-foreground">
            Enter your labels and values – paste from a spreadsheet, type them out, or use the example templates. The chart renders instantly with color-coded bars, value labels, and a scaled axis. No sign-up, no watermarks, no export limits.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">When to Use Bar Charts</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Comparing Categories</h4>
            <p className="text-sm text-muted-foreground">
              Bar charts excel at showing how different categories compare. Sales by region, scores by student, or responses by option – any situation where you're comparing distinct groups works well.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Tracking Over Time</h4>
            <p className="text-sm text-muted-foreground">
              Use bar charts for monthly, quarterly, or yearly data. Unlike line charts that emphasize trends, bar charts highlight the actual values at each time point. Good for financial reports and performance dashboards.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Survey Results</h4>
            <p className="text-sm text-muted-foreground">
              Display response counts or percentages for multiple-choice questions. Bar charts make it easy to spot the most and least popular options at a glance.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Ranking and Ordering</h4>
            <p className="text-sm text-muted-foreground">
              Sort bars by value to show rankings – top products, highest scores, or biggest markets. The visual ordering reinforces the numerical ranking.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Bar Chart Best Practices</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Start the Axis at Zero</h4>
            <p className="text-sm text-muted-foreground">
              Always begin your y-axis at zero. Truncating the axis exaggerates differences and can mislead viewers. A bar that's twice as tall should represent twice the value.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Use Consistent Spacing</h4>
            <p className="text-sm text-muted-foreground">
              Keep bar widths and gaps uniform. Inconsistent spacing suggests different groupings or importance levels that may not exist in your data.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Limit the Number of Bars</h4>
            <p className="text-sm text-muted-foreground">
              Too many bars become hard to read. If you have more than 10-12 categories, consider grouping smaller ones into "Other" or using a different visualization like a table.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Label Directly When Possible</h4>
            <p className="text-sm text-muted-foreground">
              Put values on or near the bars rather than forcing readers to trace back to the axis. Direct labeling speeds up comprehension and reduces errors.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Monthly Sales Trend</h4>
            <p className="text-sm text-muted-foreground mb-2">
              A store tracks sales over six months: Jan $12k, Feb $15k, Mar $18k, Apr $22k, May $19k, Jun $25k
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Labels: Jan, Feb, Mar, Apr, May, Jun</div>
              <div>Values: 12, 15, 18, 22, 19, 25 (in thousands)</div>
              <div>Total: $111,000</div>
              <div>Average: $18,500/month</div>
              <div>Best month: June ($25k)</div>
              <div>Weakest month: January ($12k)</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Product Comparison</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Compare four products by units sold: Product A: 85, Product B: 120, Product C: 95, Product D: 140
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Product D leads with 140 units (31.8% of total)</div>
              <div>Product B is second with 120 units (27.3%)</div>
              <div>Product C: 95 units (21.6%)</div>
              <div>Product A: 85 units (19.3%)</div>
              <div>Total units: 440</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Survey Results</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Customer satisfaction survey: Very Satisfied: 45, Satisfied: 78, Neutral: 32, Dissatisfied: 18, Very Dissatisfied: 7
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Total respondents: 180</div>
              <div>Satisfied + Very Satisfied: 123 (68.3%)</div>
              <div>Neutral: 32 (17.8%)</div>
              <div>Dissatisfied + Very Dissatisfied: 25 (13.9%)</div>
              <div>Clear majority are satisfied customers</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Quick Fact</h3>
          <p className="text-sm text-muted-foreground">
            William Playfair invented the bar chart in 1786. A Scottish engineer and economist, Playfair also created the line chart and pie chart. His original bar chart compared imports and exports of Scotland over time – a revolutionary way to visualize economic data that's still standard today.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between a bar chart and a histogram?</h4>
            <p className="text-sm text-muted-foreground">
              Bar charts compare distinct categories (products, months, teams). Histograms show the distribution of continuous data (age ranges, test scores, income brackets). Histogram bars touch each other because the data is continuous; bar chart bars have gaps because categories are separate.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Should I use vertical or horizontal bars?</h4>
            <p className="text-sm text-muted-foreground">
              Vertical bars (column charts) work well for time series and when you have short labels. Horizontal bars are better when labels are long, you have many categories, or you're showing rankings – the left-to-right reading order matches the ranking order.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can bar charts show negative values?</h4>
            <p className="text-sm text-muted-foreground">
              Yes. Bars extend below the zero line for negative values. This is useful for showing profits and losses, temperature anomalies, or year-over-year changes where some values decrease.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How many colors should I use?</h4>
            <p className="text-sm text-muted-foreground">
              Use one color if you're showing a single series – it keeps focus on the values, not the colors. Use different colors when comparing multiple series or when highlighting specific bars. Too many colors create visual noise.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if my values are very different in magnitude?</h4>
            <p className="text-sm text-muted-foreground">
              Large differences can make small bars hard to see. Consider using a logarithmic scale, breaking the data into separate charts, or showing percentages instead of absolute values. Alternatively, use a table for the raw numbers and a chart for the pattern.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I export or save the chart?</h4>
            <p className="text-sm text-muted-foreground">
              Take a screenshot or use your browser's print function to save as PDF. For more advanced export options, you'd need dedicated charting software. This tool focuses on quick, browser-based visualization without sign-ups or downloads.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
