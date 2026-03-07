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

  const loadExample = () => {
    setLabels("Jan\nFeb\nMar\nApr\nMay\nJun");
    setValues("120\n150\n180\n220\n190\n250");
    setTitle("Monthly Sales");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
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

        <div className="flex gap-2">
          <Button onClick={generate}>Generate Bar Chart</Button>
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

      <section className="border-t pt-8 space-y-4">
      </section>
    </div>
  );
}
