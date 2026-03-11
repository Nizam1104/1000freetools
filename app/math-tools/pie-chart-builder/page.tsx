"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const COLORS = ["#4f46e5", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#0ea5e9"];

export default function PieChartBuilder() {
  const [labels, setLabels] = useState("");
  const [values, setValues] = useState("");
  const [title, setTitle] = useState("My Pie Chart");
  const [showLabels, setShowLabels] = useState(true);
  const [showPercentages, setShowPercentages] = useState(true);
  const [showLegend, setShowLegend] = useState(true);
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

    if (valueList.some(isNaN) || valueList.some(v => v < 0)) {
      setError("Please enter valid non-negative numbers");
      return;
    }

    const total = valueList.reduce((a, b) => a + b, 0);

    if (total === 0) {
      setError("Total value cannot be zero");
      return;
    }

    // Calculate pie data
    const pieData = labelList.map((label, i) => {
      const value = valueList[i];
      const percentage = (value / total) * 100;
      const angle = (value / total) * 360;
      return { label, value, percentage: Math.round(percentage * 100) / 100, angle, color: COLORS[i % COLORS.length] };
    });

    // Calculate cumulative angles for pie slices
    let cumulativeAngle = 0;
    const pieSlices = pieData.map((d, i) => {
      const startAngle = cumulativeAngle;
      const endAngle = cumulativeAngle + d.angle;
      cumulativeAngle = endAngle;

      // Convert to SVG path
      const startRad = (startAngle - 90) * Math.PI / 180;
      const endRad = (endAngle - 90) * Math.PI / 180;
      const cx = 150, cy = 150, r = 120;

      const x1 = cx + r * Math.cos(startRad);
      const y1 = cy + r * Math.sin(startRad);
      const x2 = cx + r * Math.cos(endRad);
      const y2 = cy + r * Math.sin(endRad);

      const largeArc = d.angle > 180 ? 1 : 0;

      const pathD = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;

      // Label position (outside the pie)
      const midAngle = (startAngle + endAngle) / 2;
      const labelRad = (midAngle - 90) * Math.PI / 180;
      const outerR = r + 30;
      const labelX = cx + outerR * Math.cos(labelRad);
      const labelY = cy + outerR * Math.sin(labelRad);

      // Inner label position
      const innerR = r * 0.6;
      const innerLabelX = cx + innerR * Math.cos(labelRad);
      const innerLabelY = cy + innerR * Math.sin(labelRad);

      return {
        ...d,
        startAngle,
        endAngle,
        pathD,
        labelX,
        labelY,
        innerLabelX,
        innerLabelY
      };
    });

    setResult({
      pieSlices,
      total,
      count: labelList.length,
      stats: {
        sum: total,
        average: total / labelList.length,
        max: Math.max(...valueList),
        min: Math.min(...valueList)
      }
    });
  };

  const reset = () => {
    setLabels("");
    setValues("");
    setTitle("My Pie Chart");
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
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Pie Chart Builder - Create Pie Charts Online Free</h1>
        <p className="text-muted-foreground">
          Create beautiful pie charts from your data with our free online pie chart builder. Visualize proportions, percentages, and part-to-whole relationships effectively.
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
              placeholder="Category A&#10;Category B&#10;Category C"
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

        <div className="flex gap-4 flex-wrap">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showLabels}
              onChange={(e) => setShowLabels(e.target.checked)}
              className="rounded"
            />
            Show Labels
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showPercentages}
              onChange={(e) => setShowPercentages(e.target.checked)}
              className="rounded"
            />
            Show Percentages
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showLegend}
              onChange={(e) => setShowLegend(e.target.checked)}
              className="rounded"
            />
            Show Legend
          </label>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={generate}>Generate Pie Chart</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("Food\nRent\nTransport\nEntertainment\nSavings", "500\n1200\n300\n200\n400", "Monthly Budget")}>Budget</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("Product A\nProduct B\nProduct C\nProduct D", "150\n200\n100\n175", "Sales by Product")}>Sales</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("iOS\nAndroid\nWindows\nmacOS\nLinux", "35\n42\n15\n6\n2", "OS Market Share")}>Market Share</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("Full-time\nPart-time\nContract\nFreelance", "65\n20\n10\n5", "Employment Types")}>Employment</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("North\nSouth\nEast\nWest\nCentral", "220\n180\n150\n190\n160", "Regional Distribution")}>Regional</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("Excellent\nGood\nAverage\nPoor", "45\n32\n15\n8", "Customer Satisfaction")}>Satisfaction</Button>
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
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <svg viewBox="0 0 300 300" className="w-72 h-72">
                  {result.pieSlices.map((slice: any, i: number) => (
                    <g key={i}>
                      <path
                        d={slice.pathD}
                        fill={slice.color}
                        stroke="white"
                        strokeWidth="1"
                        className="transition-opacity hover:opacity-80"
                      />
                      {showLabels && showPercentages && (
                        <text
                          x={slice.innerLabelX}
                          y={slice.innerLabelY}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="text-xs fill-white font-semibold"
                          style={{ textShadow: '0 0 3px black' }}
                        >
                          {slice.percentage}%
                        </text>
                      )}
                    </g>
                  ))}
                </svg>

                {showLegend && (
                  <div className="space-y-2">
                    {result.pieSlices.map((slice: any, i: number) => (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        <div className="w-5 h-5 rounded shadow" style={{ backgroundColor: slice.color }} />
                        <span className="font-medium min-w-[100px]">{slice.label}</span>
                        <span className="text-muted-foreground">{slice.value}</span>
                        <span className="text-muted-foreground w-16 text-right">({slice.percentage}%)</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Categories</p>
                <p className="text-2xl font-bold">{result.count}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Total</p>
                <p className="text-2xl font-bold">{result.total}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Average</p>
                <p className="text-2xl font-bold">{Math.round(result.stats.average * 100) / 100}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Largest Share</p>
                <p className="text-2xl font-bold">{result.stats.max}</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Data Breakdown</h4>
              <div className="space-y-2">
                {result.pieSlices.map((slice: any, i: number) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: slice.color }} />
                    <div className="flex-1 flex justify-between items-center">
                      <span className="font-medium">{slice.label}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-muted-foreground">{slice.value}</span>
                        <div className="w-32 bg-muted rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{ width: `${slice.percentage}%`, backgroundColor: slice.color }}
                          />
                        </div>
                        <span className="text-muted-foreground w-12 text-right">{slice.percentage}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Pie Charts</h2>
        <p className="text-muted-foreground">
          A pie chart is a circular statistical graphic divided into slices to illustrate numerical proportions. Each slice's arc length (and central angle and area) is proportional to the quantity it represents. The whole "pie" represents 100% of the data, making it easy to see how individual parts contribute to the whole.
        </p>
        <p className="text-muted-foreground">
          Pie charts work best when you want to emphasize the relationship between parts and the whole, especially when one or two categories dominate. They're less effective for comparing similar-sized categories or when you have many small slices.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">How Pie Charts Work</h3>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-3">
            Each slice represents a category's proportion of the total. The calculation is straightforward:
          </p>
          <div className="font-mono text-center text-sm mb-3">
            Slice Angle = (Category Value / Total Value) × 360°
          </div>
          <p className="text-sm text-muted-foreground">
            For example, if a category represents 25% of the total, its slice will be 90° (a quarter of the circle). The percentages always add up to 100%, and the angles always add up to 360°.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Simple Budget Breakdown</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Monthly expenses: Rent $1,200, Food $400, Utilities $200, Entertainment $200. Total: $2,000.
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Rent: $1,200 / $2,000 = 0.60 = 60% (216°)</div>
              <div>Food: $400 / $2,000 = 0.20 = 20% (72°)</div>
              <div>Utilities: $200 / $2,000 = 0.10 = 10% (36°)</div>
              <div>Entertainment: $200 / $2,000 = 0.10 = 10% (36°)</div>
              <div className="text-green-600 font-semibold">Check: 60% + 20% + 10% + 10% = 100% ✓</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Survey Results</h4>
            <p className="text-sm text-muted-foreground mb-2">
              200 people voted: Yes 120, No 50, Undecided 30.
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Yes: 120 / 200 = 0.60 = 60% (216°)</div>
              <div>No: 50 / 200 = 0.25 = 25% (90°)</div>
              <div>Undecided: 30 / 200 = 0.15 = 15% (54°)</div>
              <div className="text-green-600 font-semibold">The pie chart clearly shows the majority voted Yes</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Product Sales Mix</h4>
            <p className="text-sm text-muted-foreground mb-2">
              A store sells 5 products with units: A=150, B=200, C=100, D=175, E=125. Total: 750 units.
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Product A: 150/750 = 20% (72°)</div>
              <div>Product B: 200/750 = 26.67% (96°)</div>
              <div>Product C: 100/750 = 13.33% (48°)</div>
              <div>Product D: 175/750 = 23.33% (84°)</div>
              <div>Product E: 125/750 = 16.67% (60°)</div>
              <div className="text-muted-foreground">Product B is the bestseller at 26.67% of sales</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
          <p className="text-sm">
            The pie chart was invented by William Playfair in 1801, though it was popularized by Florence Nightingale. Playfair also invented the bar chart and line graph. He was a Scottish engineer and political economist who believed that data should be visualized to be understood. His 1801 "Statistical Breviary" contained the first pie chart, showing the proportions of the Ottoman Empire located in Asia, Europe, and Africa.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the maximum number of slices a pie chart should have?</h4>
            <p className="text-sm text-muted-foreground">
              Keep it to 5-7 slices maximum. More than that, and slices become too thin to distinguish. If you have many categories, group smaller ones into "Other" or consider a bar chart instead. Human brains struggle to compare many similar-sized angles.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Should I order pie chart slices by size?</h4>
            <p className="text-sm text-muted-foreground">
              Yes, typically arrange slices from largest to smallest, starting at 12 o'clock and going clockwise. This makes the chart easier to read. Exception: if there's a natural order (like age groups or satisfaction levels), use that instead.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">When should I NOT use a pie chart?</h4>
            <p className="text-sm text-muted-foreground">
              Avoid pie charts when: you have many categories, slices are similar sizes (hard to compare), values can be negative, or you need to show changes over time. Bar charts are better for comparisons; line charts for trends.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Is a donut chart better than a pie chart?</h4>
            <p className="text-sm text-muted-foreground">
              Donut charts (pie charts with a hole) work similarly but can look cleaner and allow a label in the center. Research suggests both are equally effective for data comprehension. Choose based on aesthetics and whether you want to display a total in the center.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I handle categories with zero values?</h4>
            <p className="text-sm text-muted-foreground">
              Categories with zero values won't appear in the pie chart (they have no slice). This is correct behavior - they represent 0% of the total. If you need to show that a category exists but has no value, consider a bar chart instead.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I use a pie chart for time series data?</h4>
            <p className="text-muted-foreground text-sm">
              Generally no. Pie charts show a snapshot of proportions at one point in time. For showing how values change over time, use a line chart or stacked area chart. You could create multiple pie charts for different time periods, but comparing them is difficult.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
