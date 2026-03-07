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

  const loadExample = () => {
    setLabels("Product A\nProduct B\nProduct C\nProduct D\nProduct E");
    setValues("150\n200\n100\n175\n125");
    setTitle("Sales by Product");
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Pie & Bar Chart Generator – Create Both Charts Online</h1>
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

        <div className="flex gap-2">
          <Button onClick={generate}>Generate Charts</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={loadExample}>Load Example</Button>
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
                    {/* Y-axis */}
                    <line x1="50" y1="30" x2="50" y2="250" stroke="currentColor" strokeWidth="1.5" className="text-foreground" />
                    {/* X-axis */}
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

    </div>
  );
}
