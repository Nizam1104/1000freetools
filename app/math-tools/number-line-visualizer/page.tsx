"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const COLORS = ["#4f46e5", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#0ea5e9"];

export default function NumberLineVisualizer() {
  const [numbers, setNumbers] = useState("");
  const [min, setMin] = useState("-10");
  const [max, setMax] = useState("10");
  const [showLabels, setShowLabels] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const visualize = () => {
    setError("");
    setResult(null);

    const numList = numbers.split(/[\n,\s]+/).filter(s => s.trim()).map(Number);
    
    if (numList.length === 0) {
      setError("Please enter at least one number");
      return;
    }

    if (numList.some(isNaN)) {
      setError("Please enter valid numbers");
      return;
    }

    const minVal = parseFloat(min);
    const maxVal = parseFloat(max);

    if (isNaN(minVal) || isNaN(maxVal) || minVal >= maxVal) {
      setError("Please enter valid min and max values");
      return;
    }

    const chartWidth = 600;
    const chartHeight = 200;
    const padding = { top: 40, right: 40, bottom: 50, left: 40 };
    const innerWidth = chartWidth - padding.left - padding.right;

    // Sort numbers and create points
    const sortedNumbers = [...numList].sort((a, b) => a - b);
    const points = sortedNumbers.map((num, i) => ({
      value: num,
      x: padding.left + ((num - minVal) / (maxVal - minVal)) * innerWidth,
      color: COLORS[i % COLORS.length],
      originalIndex: i
    }));

    // Generate tick marks
    const range = maxVal - minVal;
    const tickCount = 11;
    const tickStep = range / (tickCount - 1);
    const ticks = Array.from({ length: tickCount }, (_, i) => ({
      value: Math.round((minVal + i * tickStep) * 100) / 100,
      x: padding.left + (i / (tickCount - 1)) * innerWidth
    }));

    // Calculate statistics
    const stats = {
      count: numList.length,
      min: Math.min(...numList),
      max: Math.max(...numList),
      range: Math.max(...numList) - Math.min(...numList),
      sum: numList.reduce((a, b) => a + b, 0),
      average: numList.reduce((a, b) => a + b, 0) / numList.length,
      sorted: sortedNumbers
    };

    setResult({
      points,
      ticks,
      padding,
      chartWidth,
      chartHeight,
      innerWidth,
      minVal,
      maxVal,
      stats
    });
  };

  const reset = () => {
    setNumbers("");
    setMin("-10");
    setMax("10");
    setResult(null);
    setError("");
  };

  const loadExample = (nums: string) => {
    setNumbers(nums);
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Number Line Visualizer – Plot Numbers on a Line</h1>
        <p className="text-muted-foreground">
          Visualize numbers on an interactive number line with our free online tool. Perfect for understanding ordering, inequalities, and number relationships.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Numbers to Plot (comma or space separated)</Label>
          <Textarea
            placeholder="3, -5, 0, 7.5, -2.5"
            value={numbers}
            onChange={(e) => setNumbers(e.target.value)}
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Minimum Value</Label>
            <Input type="number" value={min} onChange={(e) => setMin(e.target.value)} />
          </div>
          <div>
            <Label>Maximum Value</Label>
            <Input type="number" value={max} onChange={(e) => setMax(e.target.value)} />
          </div>
        </div>

        <div className="flex gap-4">
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
              checked={showGrid}
              onChange={(e) => setShowGrid(e.target.checked)}
              className="rounded"
            />
            Show Grid
          </label>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={visualize}>Visualize</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={() => loadExample("3, -5, 0, 7, -2")}>Integers</Button>
          <Button variant="outline" onClick={() => loadExample("1.5, -2.3, 0.5, 4.7, -1.1")}>Decimals</Button>
          <Button variant="outline" onClick={() => loadExample("-10, -5, 0, 5, 10")}>Multiples of 5</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-4 text-center">Number Line</h4>
              <div className="flex justify-center">
                <svg viewBox={`0 0 ${result.chartWidth} ${result.chartHeight}`} className="w-full max-w-2xl">
                  {/* Grid lines */}
                  {showGrid && result.ticks.map((tick: any, i: number) => (
                    <line
                      key={i}
                      x1={tick.x}
                      y1={result.padding.top}
                      x2={tick.x}
                      y2={result.chartHeight - result.padding.bottom}
                      stroke="currentColor"
                      strokeWidth="0.5"
                      className="text-muted"
                      strokeDasharray="2,2"
                    />
                  ))}

                  {/* Main line */}
                  <line
                    x1={result.padding.left}
                    y1={result.chartHeight / 2}
                    x2={result.chartWidth - result.padding.right}
                    y2={result.chartHeight / 2}
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-foreground"
                  />

                  {/* Arrow heads */}
                  <polygon
                    points={`${result.padding.left - 10},${result.chartHeight / 2 - 8} ${result.padding.left - 10},${result.chartHeight / 2 + 8} ${result.padding.left},${result.chartHeight / 2}`}
                    fill="currentColor"
                    className="text-foreground"
                  />
                  <polygon
                    points={`${result.chartWidth - result.padding.right + 10},${result.chartHeight / 2 - 8} ${result.chartWidth - result.padding.right + 10},${result.chartHeight / 2 + 8} ${result.chartWidth - result.padding.right},${result.chartHeight / 2}`}
                    fill="currentColor"
                    className="text-foreground"
                  />

                  {/* Tick marks and labels */}
                  {result.ticks.map((tick: any, i: number) => (
                    <g key={i}>
                      <line
                        x1={tick.x}
                        y1={result.chartHeight / 2 - 10}
                        x2={tick.x}
                        y2={result.chartHeight / 2 + 10}
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-foreground"
                      />
                      <text
                        x={tick.x}
                        y={result.chartHeight / 2 + 30}
                        textAnchor="middle"
                        className="text-xs fill-muted-foreground"
                      >
                        {tick.value}
                      </text>
                    </g>
                  ))}

                  {/* Number points */}
                  {result.points.map((point: any, i: number) => (
                    <g key={i}>
                      <line
                        x1={point.x}
                        y1={result.chartHeight / 2 - 5}
                        x2={point.x}
                        y2={result.chartHeight / 2 + 5}
                        stroke={point.color}
                        strokeWidth="3"
                      />
                      <circle
                        cx={point.x}
                        cy={result.chartHeight / 2}
                        r="10"
                        fill={point.color}
                        stroke="white"
                        strokeWidth="2"
                      />
                      {showLabels && (
                        <text
                          x={point.x}
                          y={result.chartHeight / 2 - 20}
                          textAnchor="middle"
                          className="text-sm font-semibold"
                          fill={point.color}
                        >
                          {point.value}
                        </text>
                      )}
                    </g>
                  ))}
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Count</p>
                <p className="text-2xl font-bold">{result.stats.count}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Minimum</p>
                <p className="text-2xl font-bold">{result.stats.min}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Maximum</p>
                <p className="text-2xl font-bold">{result.stats.max}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Range</p>
                <p className="text-2xl font-bold">{Math.round(result.stats.range * 100) / 100}</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Sorted Order</h4>
              <div className="flex flex-wrap gap-2">
                {result.stats.sorted.map((num: number, i: number) => (
                  <span key={i} className="px-3 py-1 bg-muted rounded-full text-sm font-mono">
                    {num}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold text-sm mb-2">Sum</h4>
                <p className="text-2xl font-bold">{Math.round(result.stats.sum * 100) / 100}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold text-sm mb-2">Average (Mean)</h4>
                <p className="text-2xl font-bold">{Math.round(result.stats.average * 100) / 100}</p>
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
