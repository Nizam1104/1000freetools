"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const COLORS = ["#4f46e5", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#0ea5e9"];

export default function PieBarChartGenerator() {
  const [labels, setLabels] = useState("");
  const [values, setValues] = useState("");
  const [title, setTitle] = useState("My Chart");
  const [chartType, setChartType] = useState<"pie" | "bar" | "both">("both");
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

    // Pie chart calculations
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
      const cx = 100, cy = 100, r = 80;

      const x1 = cx + r * Math.cos(startRad);
      const y1 = cy + r * Math.sin(startRad);
      const x2 = cx + r * Math.cos(endRad);
      const y2 = cy + r * Math.sin(endRad);

      const largeArc = d.angle > 180 ? 1 : 0;

      const pathD = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;

      // Label position
      const midAngle = (startAngle + endAngle) / 2;
      const labelRad = (midAngle - 90) * Math.PI / 180;
      const labelR = r * 0.65;
      const labelX = cx + labelR * Math.cos(labelRad);
      const labelY = cy + labelR * Math.sin(labelRad);

      return { ...d, startAngle, endAngle, pathD, labelX, labelY };
    });

    // Bar chart calculations
    const maxValue = Math.max(...valueList);
    const barChartHeight = 250;
    const barChartWidth = 400;
    const padding = { top: 30, right: 20, bottom: 80, left: 50 };
    const innerWidth = barChartWidth - padding.left - padding.right;
    const innerHeight = barChartHeight - padding.top - padding.bottom;

    const barWidth = innerWidth / labelList.length * 0.7;
    const barGap = innerWidth / labelList.length * 0.3;

    const bars = labelList.map((label, i) => {
      const value = valueList[i];
      const barHeight = maxValue > 0 ? (value / maxValue) * innerHeight : 0;
      const x = padding.left + (i * (barWidth + barGap)) + barGap / 2;
      const y = padding.top + innerHeight - barHeight;

      return {
        label,
        value,
        percentage: Math.round((value / total) * 10000) / 100,
        x,
        y,
        width: barWidth,
        height: barHeight,
        color: COLORS[i % COLORS.length]
      };
    });

    setResult({
      pieSlices,
      bars,
      total,
      count: labelList.length,
      stats: {
        sum: total,
        average: total / labelList.length,
        max: maxValue,
        min: Math.min(...valueList)
      }
    });
  };

  const reset = () => {
    setLabels("");
    setValues("");
    setTitle("My Chart");
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
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Pie & Bar Chart Generator - Create Both Charts Online</h1>
        <p className="text-muted-foreground">
          Generate both pie charts and bar charts from the same data with our free online chart generator. Compare different visualization styles for your data instantly.
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

        <div>
          <Label>Chart Type</Label>
          <Tabs value={chartType} onValueChange={(v) => setChartType(v as typeof chartType)}>
            <TabsList>
              <TabsTrigger value="pie">Pie Chart</TabsTrigger>
              <TabsTrigger value="bar">Bar Chart</TabsTrigger>
              <TabsTrigger value="both">Both Charts</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={generate}>Generate Charts</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("Product A\nProduct B\nProduct C\nProduct D", "150\n200\n100\n175", "Sales by Product")}>Sales Data</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("Food\nRent\nTransport\nEntertainment\nSavings", "500\n1200\n300\n200\n400", "Monthly Budget")}>Budget Breakdown</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("Q1\nQ2\nQ3\nQ4", "45000\n52000\n48000\n61000", "Quarterly Revenue")}>Quarterly Results</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("Math\nScience\nEnglish\nHistory\nArt", "85\n92\n78\n88\n95", "Test Scores by Subject")}>Test Scores</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("iOS\nAndroid\nWeb\nDesktop", "35\n42\n18\n5", "Platform Usage (%)")}>Platform Share</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("Mon\nTue\nWed\nThu\nFri\nSat\nSun", "120\n145\n132\n158\n175\n210\n195", "Weekly Website Visits")}>Weekly Traffic</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-6">
            {(chartType === "pie" || chartType === "both") && (
              <div className="p-6 bg-muted rounded-lg">
                <h4 className="font-semibold text-sm mb-4 text-center">{title} - Pie Chart</h4>
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                  <svg viewBox="0 0 200 200" className="w-64 h-64">
                    {result.pieSlices.map((slice: any, i: number) => (
                      <path
                        key={i}
                        d={slice.pathD}
                        fill={slice.color}
                        stroke="white"
                        strokeWidth="0.5"
                        className="transition-opacity hover:opacity-80"
                      />
                    ))}
                  </svg>
                  <div className="space-y-2">
                    {result.pieSlices.map((slice: any, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: slice.color }} />
                        <span className="font-medium">{slice.label}</span>
                        <span className="text-muted-foreground">{slice.value} ({slice.percentage}%)</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {(chartType === "bar" || chartType === "both") && (
              <div className="p-6 bg-muted rounded-lg">
                <h4 className="font-semibold text-sm mb-4 text-center">{title} - Bar Chart</h4>
                <div className="flex justify-center">
                  <svg viewBox={`0 0 ${result.bars[0]?.x + result.bars.length * 60 || 400} 300`} className="w-full max-w-lg">
                    <line x1="50" y1="30" x2="50" y2="250" stroke="currentColor" strokeWidth="1.5" className="text-foreground" />
                    <line x1="50" y1="250" x2="380" y2="250" stroke="currentColor" strokeWidth="1.5" className="text-foreground" />

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
                          y={270}
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
            )}

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
                <p className="text-sm text-muted-foreground mb-2">Max Value</p>
                <p className="text-2xl font-bold">{result.stats.max}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Data Visualization: Pie Charts vs Bar Charts</h2>
        <p className="text-muted-foreground">
          Choosing the right chart type makes your data easier to understand. Pie charts excel at showing how parts make up a whole - perfect for budget breakdowns or market share. Bar charts are better for comparing values across categories, especially when you have many categories or the values are close together.
        </p>
        <p className="text-muted-foreground">
          This tool lets you generate both chart types from the same data, so you can see which visualization tells your story better. Sometimes the choice is obvious; other times, trying both reveals insights you might have missed.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">When to Use Each Chart Type</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2 text-indigo-600">Use Pie Charts When:</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Showing parts of a whole (percentages that sum to 100%)</li>
              <li>• You have 2-6 categories (more becomes cluttered)</li>
              <li>• Emphasizing the relationship to the total</li>
              <li>• Categories are mutually exclusive</li>
              <li>• One or two slices dominate (easy to see)</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2 text-cyan-600">Use Bar Charts When:</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Comparing values across many categories</li>
              <li>• Values are close together (easier to compare lengths)</li>
              <li>• Category labels are long</li>
              <li>• Showing changes over time or ordered data</li>
              <li>• Some values might be zero or negative</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Monthly Budget Breakdown</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Visualizing a $2,600 monthly budget across 5 categories.
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Data: Rent $1,200, Food $500, Transport $300, Entertainment $200, Savings $400</div>
              <div>Total: $2,600</div>
              <div>Pie chart shows: Rent 46%, Food 19%, Transport 12%, Entertainment 8%, Savings 15%</div>
              <div className="text-muted-foreground">Pie chart works well here - shows how each expense relates to the total budget</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Quarterly Sales Comparison</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Comparing sales performance across four quarters.
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Data: Q1 $45,000, Q2 $52,000, Q3 $48,000, Q4 $61,000</div>
              <div>Total: $206,000</div>
              <div>Bar chart makes it easy to see Q4 was the strongest quarter</div>
              <div className="text-muted-foreground">Bar chart preferred - comparing values across time periods</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Market Share Analysis</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Showing platform usage distribution.
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Data: iOS 35%, Android 42%, Web 18%, Desktop 5%</div>
              <div>Total: 100%</div>
              <div>Pie chart clearly shows Android leads, Desktop is minimal</div>
              <div className="text-muted-foreground">Pie chart ideal - percentages of a whole with clear dominant categories</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
          <p className="text-sm">
            Florence Nightingale was a pioneer in data visualization. During the Crimean War, she created "coxcomb" charts (a type of pie chart) to show that most soldier deaths were from preventable diseases, not battle wounds. Her charts convinced the British government to improve sanitary conditions in military hospitals, saving countless lives. She proved that good data visualization can drive real-world change.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">How many categories should I include in a pie chart?</h4>
            <p className="text-sm text-muted-foreground">
              Aim for 2-6 categories. More than that, and slices become too thin to distinguish. If you have many categories, consider grouping smaller ones into "Other" or switch to a bar chart. Human brains are better at comparing bar lengths than pie slice angles.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Should pie chart percentages always add to 100%?</h4>
            <p className="text-sm text-muted-foreground">
              Yes, for a proper pie chart. Each slice represents a portion of the whole, so all slices together should equal 100%. If your data doesn't naturally sum to 100%, calculate percentages first: (each value / total) × 100.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the best order for chart categories?</h4>
            <p className="text-sm text-muted-foreground">
              For pie charts, start at 12 o'clock and go clockwise from largest to smallest slice. For bar charts, order by value (descending) unless there's a natural order like time periods, age groups, or satisfaction levels (very satisfied to very dissatisfied).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I use 3D effects in my charts?</h4>
            <p className="text-sm text-muted-foreground">
              Avoid 3D effects - they distort perception. A 3D pie chart makes foreground slices look larger than background slices of the same size. Flat, simple charts communicate data more accurately. Save the visual flair for situations where precision doesn't matter.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What colors should I use for my charts?</h4>
            <p className="text-sm text-muted-foreground">
              Use distinct, accessible colors. Avoid red-green combinations (colorblind users can't distinguish them). For sequential data (low to high), use a gradient of one color. For categorical data, use clearly different colors. This tool uses a palette designed for distinction and accessibility.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">When should I include data labels on charts?</h4>
            <p className="text-sm text-muted-foreground">
              Always include labels when the exact values matter. For pie charts, show percentages on slices or in a legend. For bar charts, consider showing values on or above bars. If space is tight, a legend with color coding works, but direct labeling is usually clearer.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
