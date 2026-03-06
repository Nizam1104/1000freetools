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

  const loadExample = () => {
    setLabels("Food\nRent\nTransport\nEntertainment\nSavings");
    setValues("500\n1200\n300\n200\n400");
    setTitle("Monthly Budget");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Pie Chart Builder – Create Pie Charts Online Free</h1>
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

        <div className="flex gap-2">
          <Button onClick={generate}>Generate Pie Chart</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={loadExample}>Load Example</Button>
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

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Understanding Pie Charts</h2>
        <p className="text-muted-foreground">
          A pie chart is a circular statistical graphic divided into slices to illustrate numerical proportions. Each slice's arc length is proportional to the quantity it represents. Pie charts are excellent for showing how parts contribute to a whole.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Best Use Cases</h3>
            <p className="text-sm text-muted-foreground">
              Budget allocation, market share, survey results, demographic breakdowns, and any part-to-whole relationship with few categories.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">When to Avoid</h3>
            <p className="text-sm text-muted-foreground">
              Many categories (7+), similar values that are hard to compare, or when showing changes over time. Use bar charts instead.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Design Tips</h3>
            <p className="text-sm text-muted-foreground">
              Order slices largest to smallest, use contrasting colors, include percentages, and keep the number of slices manageable.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div>
          <h3 className="font-semibold mb-2">What is a pie chart?</h3>
          <p className="text-sm text-muted-foreground">
            A pie chart is a circular chart divided into sectors, where each sector represents a proportion of the whole. The entire pie represents 100% of the data.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">How do you calculate pie chart angles?</h3>
          <p className="text-sm text-muted-foreground">
            Angle = (Value / Total) × 360°. For example, if a category is 25% of the total, its slice is 0.25 × 360° = 90°.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">How many slices should a pie chart have?</h3>
          <p className="text-sm text-muted-foreground">
            Ideally 2-5 slices, maximum 7. More slices make the chart cluttered and hard to read. Group small categories into "Other" if needed.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Should I use 3D pie charts?</h3>
          <p className="text-sm text-muted-foreground">
            Generally no. 3D effects distort the perception of slice sizes. Flat 2D pie charts are more accurate and easier to read.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What's the difference between pie and donut charts?</h3>
          <p className="text-sm text-muted-foreground">
            Donut charts have a hole in the center. They're visually lighter and can display a total in the center. Both show proportions similarly.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/bar-chart-builder" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Bar Chart Builder</p>
            <p className="text-xs text-muted-foreground">Create bar charts</p>
          </a>
          <a href="/math-tools/pie-bar-chart-generator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Pie & Bar Generator</p>
            <p className="text-xs text-muted-foreground">Both chart types</p>
          </a>
          <a href="/math-tools/percentage-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Percentage Calculator</p>
            <p className="text-xs text-muted-foreground">Calculate percentages</p>
          </a>
        </div>
      </section>
    </div>
  );
}
