"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const COLORS = ["#4f46e5", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#0ea5e9"];

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

    // Create path for line
    let linePath = points.length > 0 ? `M ${points[0].x} ${points[0].y}` : "";
    if (smooth && points.length > 2) {
      // Simple smoothing using quadratic curves
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

    // Create area fill path
    const areaPath = points.length > 0 
      ? `${linePath} L ${points[points.length - 1].x} ${padding.top + innerHeight} L ${points[0].x} ${padding.top + innerHeight} Z`
      : "";

    // Y-axis ticks
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

  const loadExample = () => {
    setLabels("Jan\nFeb\nMar\nApr\nMay\nJun\nJul\nAug");
    setValues("100\n120\n115\n140\n160\n155\n180\n200");
    setTitle("Monthly Revenue");
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

        <div className="flex gap-2">
          <Button onClick={generate}>Generate Line Graph</Button>
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
                <svg viewBox={`0 0 ${result.chartWidth} ${result.chartHeight}`} className="w-full max-w-xl">
                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Grid lines */}
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

                  {/* Axes */}
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

                  {/* Y-axis labels */}
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

                  {/* Area fill */}
                  <path d={result.areaPath} fill="url(#areaGradient)" />

                  {/* Line */}
                  <path
                    d={result.linePath}
                    fill="none"
                    stroke="#4f46e5"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Points and X-axis labels */}
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

    </div>
  );
}
