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

  const examples = [
    { name: "Integers", nums: "3, -5, 0, 7, -2" },
    { name: "Decimals", nums: "1.5, -2.3, 0.5, 4.7, -1.1" },
    { name: "Multiples of 5", nums: "-10, -5, 0, 5, 10" },
    { name: "Fractions", nums: "0.25, 0.5, 0.75, 1.0, 1.25" },
    { name: "Mixed", nums: "-3.5, 0, 2, 4.5, -1" },
    { name: "Close Values", nums: "4.9, 5.0, 5.1, 5.2, 4.8" },
    { name: "Wide Range", nums: "-50, -25, 0, 25, 50" }
  ];

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

    const sortedNumbers = [...numList].sort((a, b) => a - b);
    const points = sortedNumbers.map((num, i) => ({
      value: num,
      x: padding.left + ((num - minVal) / (maxVal - minVal)) * innerWidth,
      color: COLORS[i % COLORS.length],
      originalIndex: i
    }));

    const range = maxVal - minVal;
    const tickCount = 11;
    const tickStep = range / (tickCount - 1);
    const ticks = Array.from({ length: tickCount }, (_, i) => ({
      value: Math.round((minVal + i * tickStep) * 100) / 100,
      x: padding.left + (i / (tickCount - 1)) * innerWidth
    }));

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

          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Examples:</span>
            {examples.map((ex, idx) => (
              <Button key={idx} variant="outline" size="sm" onClick={() => loadExample(ex.nums)}>{ex.name}</Button>
            ))}
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

                    <line
                      x1={result.padding.left}
                      y1={result.chartHeight / 2}
                      x2={result.chartWidth - result.padding.right}
                      y2={result.chartHeight / 2}
                      stroke="currentColor"
                      strokeWidth="3"
                      className="text-foreground"
                    />

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
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Number Lines</h2>
        <p className="text-muted-foreground">
          A number line is a visual representation of numbers as points on a straight line. It extends infinitely in both directions, with zero at the center, positive numbers to the right, and negative numbers to the left. Number lines help visualize the relative positions and distances between numbers.
        </p>
        <p className="text-muted-foreground">
          Number lines are fundamental tools in mathematics education. They help students understand ordering, inequalities, absolute value, and operations with negative numbers. The distance between any two points represents the absolute difference between those numbers.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Key Concepts</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Ordering</h4>
            <p className="text-sm text-muted-foreground">
              Numbers increase from left to right. Any number to the right is greater than any number to its left.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Distance</h4>
            <p className="text-sm text-muted-foreground">
              The distance between two numbers is their absolute difference: |a - b|. Distance is always positive.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Midpoint</h4>
            <p className="text-sm text-muted-foreground">
              The midpoint between two numbers is their average: (a + b) / 2. It's exactly halfway between them.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: Ordering Integers</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Numbers: 3, -5, 0, 7, -2</div>
              <div>Sorted: -5, -2, 0, 3, 7</div>
              <div>Visual: Left to right on the line</div>
              <div className="text-muted-foreground">Negative numbers are left of zero</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: Finding Distance</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Distance from -3 to 5</div>
              <div>|5 - (-3)| = |5 + 3| = 8</div>
              <div>Or count: -3 to 0 = 3, 0 to 5 = 5, total = 8</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: Decimal Placement</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Numbers: 1.5, 2.25, 1.75</div>
              <div>Sorted: 1.5, 1.75, 2.25</div>
              <div>1.75 is exactly halfway between 1.5 and 2.0</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: Inequalities</h4>
            <div className="font-mono text-sm space-y-2">
              <div>x &gt; -2 means all numbers to the right of -2</div>
              <div>x ≤ 3 means all numbers at or left of 3</div>
              <div>-1 &lt; x &lt; 4 means between -1 and 4 (not including endpoints)</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <p className="text-sm">
            The number line was first conceptualized by John Wallis in 1685, who introduced negative numbers as positions to the left of zero. Before this, negative numbers were considered "absurd" or "fictitious." The number line made them concrete and understandable.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Why are negative numbers to the left?</h4>
            <p className="text-sm text-muted-foreground">
              By convention, we read left-to-right in Western cultures, so increasing values go right. Negative numbers are less than zero, so they appear to the left. In some cultures with right-to-left reading, the orientation might differ.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can number lines be vertical?</h4>
            <p className="text-sm text-muted-foreground">
              Yes! Vertical number lines are common in thermometers and elevators. Up represents increasing values, down represents decreasing. The concept is identical to horizontal lines.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between a number line and a coordinate axis?</h4>
            <p className="text-sm text-muted-foreground">
              A number line is one-dimensional (just the line). A coordinate axis is a number line used as part of a coordinate system. The x-axis and y-axis in graphs are perpendicular number lines.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I compare fractions on a number line?</h4>
            <p className="text-sm text-muted-foreground">
              Convert to decimals or find a common denominator. For example, 1/3 ≈ 0.33 and 2/5 = 0.4, so 2/5 is to the right of 1/3. Or: 1/3 = 5/15 and 2/5 = 6/15, so 2/5 is larger.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What is absolute value on a number line?</h4>
            <p className="text-sm text-muted-foreground">
              Absolute value is the distance from zero, regardless of direction. Both -5 and 5 have absolute value 5 because they're both 5 units from zero. On the number line, it's how far the point is from the origin.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I plot irrational numbers?</h4>
            <p className="text-sm text-muted-foreground">
              Yes! Numbers like √2 ≈ 1.414 and π ≈ 3.14159 can be plotted approximately. They have exact positions on the number line even though their decimal representations go on forever without repeating.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
