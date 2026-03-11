"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const COLORS = ["#4f46e5", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#0ea5e9"];

const examples = [
  { labels: "Jan\nFeb\nMar\nApr\nMay\nJun", values: "100\n120\n115\n140\n160\n155", title: "Monthly Revenue" },
  { labels: "Mon\nTue\nWed\nThu\nFri\nSat\nSun", values: "23\n25\n22\n28\n30\n35\n32", title: "Daily Temperature (°C)" },
  { labels: "Week 1\nWeek 2\nWeek 3\nWeek 4\nWeek 5", values: "50\n65\n72\n85\n90", title: "Fitness Progress" },
  { labels: "Q1\nQ2\nQ3\nQ4", values: "250000\n310000\n280000\n420000", title: "Quarterly Sales" },
  { labels: "2019\n2020\n2021\n2022\n2023", values: "1000\n1200\n1150\n1400\n1600", title: "Annual Users" },
  { labels: "9AM\n12PM\n3PM\n6PM\n9PM", values: "45\n78\n92\n85\n60", title: "Website Traffic" },
];

export default function LineGraphBuilder() {
  const [labels, setLabels] = useState("");
  const [values, setValues] = useState("");
  const [title, setTitle] = useState("My Line Graph");
  const [showPoints, setShowPoints] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [smooth, setSmooth] = useState(false);
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

    if (labelList.length < 2) {
      setError("Please enter at least 2 data points");
      return;
    }

    if (valueList.some(isNaN)) {
      setError("Please enter valid numbers for values");
      return;
    }

    const maxValue = Math.max(...valueList);
    const minValue = Math.min(...valueList);
    const range = maxValue - minValue || 1;

    const chartHeight = 300;
    const chartWidth = 500;
    const padding = { top: 40, right: 30, bottom: 60, left: 50 };
    const innerWidth = chartWidth - padding.left - padding.right;
    const innerHeight = chartHeight - padding.top - padding.bottom;

    const pointSpacing = innerWidth / (labelList.length - 1);

    const points = labelList.map((label, i) => {
      const value = valueList[i];
      const x = padding.left + i * pointSpacing;
      const y = padding.top + innerHeight - ((value - minValue) / range) * innerHeight * 0.9 - innerHeight * 0.05;

      return {
        label,
        value,
        x,
        y,
        color: COLORS[i % COLORS.length]
      };
    });

    let linePath = points.length > 0 ? `M ${points[0].x} ${points[0].y}` : "";
    if (smooth && points.length > 2) {
      for (let i = 1; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        linePath += ` Q ${points[i].x} ${points[i].y} ${xc} ${yc}`;
      }
      const last = points[points.length - 1];
      linePath += ` T ${last.x} ${last.y}`;
    } else {
      for (let i = 1; i < points.length; i++) {
        linePath += ` L ${points[i].x} ${points[i].y}`;
      }
    }

    const areaPath = points.length > 0
      ? `${linePath} L ${points[points.length - 1].x} ${padding.top + innerHeight} L ${points[0].x} ${padding.top + innerHeight} Z`
      : "";

    const yAxisTicks = 5;
    const yTicks = Array.from({ length: yAxisTicks + 1 }, (_, i) => {
      const value = minValue + (range * i / yAxisTicks);
      const y = padding.top + innerHeight - (i / yAxisTicks) * innerHeight;
      return { value: Math.round(value * 100) / 100, y };
    });

    setResult({
      points,
      linePath,
      areaPath,
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
        max: maxValue,
        min: minValue,
        range: Math.round(range * 100) / 100,
        trend: valueList[valueList.length - 1] > valueList[0] ? 'up' : valueList[valueList.length - 1] < valueList[0] ? 'down' : 'flat'
      }
    });
  };

  const reset = () => {
    setLabels("");
    setValues("");
    setTitle("My Line Graph");
    setResult(null);
    setError("");
  };

  const loadExample = (exampleIndex: number) => {
    const ex = examples[exampleIndex];
    setLabels(ex.labels);
    setValues(ex.values);
    setTitle(ex.title);
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Line Graph Builder – Create Line Charts Online Free</h1>
        <p className="text-muted-foreground">
          Create beautiful line graphs from your data with our free online line graph builder. Visualize trends over time, track changes, and present data effectively.
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
            <Label>Labels (X-axis, one per line)</Label>
            <Textarea
              placeholder="Jan&#10;Feb&#10;Mar&#10;Apr"
              value={labels}
              onChange={(e) => setLabels(e.target.value)}
              rows={6}
            />
          </div>
          <div>
            <Label>Values (Y-axis, one per line)</Label>
            <Textarea
              placeholder="100&#10;120&#10;115&#10;140"
              value={values}
              onChange={(e) => setValues(e.target.value)}
              rows={6}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showPoints}
              onChange={(e) => setShowPoints(e.target.checked)}
              className="rounded"
            />
            Show Points
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showGrid}
              onChange={(e) => setShowGrid(e.target.checked)}
              className="rounded"
            />
            Show Grid
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={smooth}
              onChange={(e) => setSmooth(e.target.checked)}
              className="rounded"
            />
            Smooth Line
          </label>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={generate}>Generate Line Graph</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Examples:</span>
          {examples.map((ex, i) => (
            <Button key={i} variant="ghost" size="sm" onClick={() => loadExample(i)}>
              {ex.title}
            </Button>
          ))}
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
                <svg viewBox={`0 0 ${result.chartWidth} ${result.chartHeight}`} className="w-full max-w-xl">
                  <defs>
                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {showGrid && (
                    <>
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
                    </>
                  )}

                  <line
                    x1={result.padding.left}
                    y1={result.chartHeight - result.padding.bottom}
                    x2={result.chartWidth - result.padding.right}
                    y2={result.chartHeight - result.padding.bottom}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-foreground"
                  />
                  <line
                    x1={result.padding.left}
                    y1={result.padding.top}
                    x2={result.padding.left}
                    y2={result.chartHeight - result.padding.bottom}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-foreground"
                  />

                  {result.yTicks.map((tick: any, i: number) => (
                    <text
                      key={i}
                      x={result.padding.left - 8}
                      y={tick.y + 4}
                      textAnchor="end"
                      className="text-xs fill-muted-foreground"
                    >
                      {tick.value}
                    </text>
                  ))}

                  <path d={result.areaPath} fill="url(#areaGradient)" />

                  <path
                    d={result.linePath}
                    fill="none"
                    stroke="#4f46e5"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {result.points.map((point: any, i: number) => (
                    <g key={i}>
                      {showPoints && (
                        <circle
                          cx={point.x}
                          cy={point.y}
                          r="5"
                          fill="#4f46e5"
                          stroke="white"
                          strokeWidth="2"
                        />
                      )}
                      <text
                        x={point.x}
                        y={result.chartHeight - result.padding.bottom + 20}
                        textAnchor="middle"
                        className="text-xs fill-muted-foreground"
                        style={{ writingMode: 'vertical-rl' }}
                      >
                        {point.label.length > 10 ? point.label.substring(0, 10) + '...' : point.label}
                      </text>
                      {showPoints && (
                        <text
                          x={point.x}
                          y={point.y - 12}
                          textAnchor="middle"
                          className="text-xs fill-muted-foreground font-semibold"
                        >
                          {point.value}
                        </text>
                      )}
                    </g>
                  ))}
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Data Points</p>
                <p className="text-2xl font-bold">{result.stats.count}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Sum</p>
                <p className="text-xl font-bold">{Math.round(result.stats.sum * 100) / 100}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Average</p>
                <p className="text-xl font-bold">{Math.round(result.stats.average * 100) / 100}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Maximum</p>
                <p className="text-xl font-bold">{result.stats.max}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Minimum</p>
                <p className="text-xl font-bold">{result.stats.min}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Trend</p>
                <p className={`text-xl font-bold ${
                  result.stats.trend === 'up' ? 'text-green-600' :
                  result.stats.trend === 'down' ? 'text-red-600' : ''
                }`}>
                  {result.stats.trend === 'up' ? '↑ Up' : result.stats.trend === 'down' ? '↓ Down' : '→ Flat'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Line Graphs</h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            A line graph displays data as a series of points connected by straight line segments. It's the go-to choice for showing how something changes over time – whether that's stock prices, temperature readings, website traffic, or sales figures.
          </p>
          <p className="text-muted-foreground">
            The horizontal axis (x-axis) typically represents time or categories in sequence, while the vertical axis (y-axis) shows the measured values. The connecting lines make it easy to spot trends, patterns, and anomalies at a glance.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">When to Use a Line Graph</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">✓ Time Series Data</h4>
            <p className="text-sm text-muted-foreground">
              Perfect for showing changes over days, months, years, or any time period. Stock prices, weather patterns, and population growth all work well.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">✓ Comparing Trends</h4>
            <p className="text-sm text-muted-foreground">
              Multiple lines on one graph let you compare how different items change over the same period – like sales of different products.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">✓ Continuous Data</h4>
            <p className="text-sm text-muted-foreground">
              Use line graphs when your data is continuous and measured at regular intervals, not for unrelated categories.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">✗ Not for Categories</h4>
            <p className="text-sm text-muted-foreground">
              Don't use line graphs for unrelated categories (like favorite colors). Bar charts work better for discrete, non-sequential data.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Monthly Sales Trend</h4>
            <p className="text-sm text-muted-foreground mb-3">Track sales over 6 months</p>
            <div className="bg-muted p-3 rounded font-mono text-sm">
              <div>Labels: Jan, Feb, Mar, Apr, May, Jun</div>
              <div>Values: 100, 120, 115, 140, 160, 155</div>
              <div className="pt-2">Analysis:</div>
              <div>• Starting value: 100</div>
              <div>• Peak: 160 (May)</div>
              <div>• Overall trend: Upward (+55%)</div>
              <div>• Note: Small dip in June</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Temperature Changes</h4>
            <p className="text-sm text-muted-foreground mb-3">Daily temperatures throughout a week</p>
            <div className="bg-muted p-3 rounded font-mono text-sm">
              <div>Labels: Mon, Tue, Wed, Thu, Fri, Sat, Sun</div>
              <div>Values: 23, 25, 22, 28, 30, 35, 32 (°C)</div>
              <div className="pt-2">Analysis:</div>
              <div>• Range: 22°C to 35°C</div>
              <div>• Average: 27.9°C</div>
              <div>• Warmest: Saturday (35°C)</div>
              <div>• Coolest: Wednesday (22°C)</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Growth Tracking</h4>
            <p className="text-sm text-muted-foreground mb-3">Fitness progress over 5 weeks</p>
            <div className="bg-muted p-3 rounded font-mono text-sm">
              <div>Labels: Week 1, Week 2, Week 3, Week 4, Week 5</div>
              <div>Values: 50, 65, 72, 85, 90</div>
              <div className="pt-2">Analysis:</div>
              <div>• Total improvement: +40 units (80%)</div>
              <div>• Best week: Week 4 (+13)</div>
              <div>• Consistent upward trend</div>
              <div>• Rate slowing slightly at end</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <p className="text-sm">
            William Playfair, a Scottish engineer, invented the line graph in 1786. His original chart showed England's imports and exports over time. Playfair also invented the bar chart and pie chart – making him the father of modern data visualization.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">How many data points do I need for a line graph?</h4>
            <p className="text-sm text-muted-foreground">
              At minimum, you need 2 points to draw a line. For meaningful trends, aim for 5 or more data points. Too few points can make patterns hard to distinguish from random variation.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Should I connect all points with straight lines?</h4>
            <p className="text-sm text-muted-foreground">
              Yes, that's the standard approach. Straight lines imply linear change between measured points. Smooth curves can be used when you know the underlying process is continuous and smooth, but they can also mislead by suggesting precision you don't have.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if my data has gaps?</h4>
            <p className="text-sm text-muted-foreground">
              You can either leave a break in the line (honest but less visually appealing) or interpolate missing values (smoother but assumes something about the missing data). For significant gaps, consider noting them explicitly on the graph.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I show multiple data series?</h4>
            <p className="text-sm text-muted-foreground">
              Use different colors for each line and include a legend. Limit yourself to 4-5 series maximum – more than that becomes hard to distinguish. Consider using different line styles (solid, dashed, dotted) as well as colors.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Should I always start the y-axis at zero?</h4>
            <p className="text-sm text-muted-foreground">
              For bar charts, yes. For line graphs, it depends. Starting at zero shows the full context but can flatten small variations. Starting near your data range highlights changes but can exaggerate them. Choose based on your message and be transparent about your choice.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between a line graph and a scatter plot?</h4>
            <p className="text-sm text-muted-foreground">
              Line graphs connect points in sequence (usually time order), emphasizing trends. Scatter plots show individual points without connecting lines, emphasizing relationships between two variables. Use line graphs for time series, scatter plots for correlations.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/bar-chart-maker" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Bar Chart Maker</p>
            <p className="text-xs text-muted-foreground">Create bar graphs</p>
          </a>
          <a href="/math-tools/pie-chart-generator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Pie Chart Generator</p>
            <p className="text-xs text-muted-foreground">Create pie charts</p>
          </a>
          <a href="/math-tools/scatter-plot-maker" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Scatter Plot Maker</p>
            <p className="text-xs text-muted-foreground">Plot data points</p>
          </a>
        </div>
      </section>
    </div>
  );
}
