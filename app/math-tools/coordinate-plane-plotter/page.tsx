"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CoordinatePlanePlotter() {
  const [points, setPoints] = useState("");
  const [xMin, setXMin] = useState("-10");
  const [xMax, setXMax] = useState("10");
  const [yMin, setYMin] = useState("-10");
  const [yMax, setYMax] = useState("10");
  const [showGrid, setShowGrid] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const parsePoints = (input: string): { x: number; y: number; label?: string }[] => {
    const lines = input.split(/[\n]+/);
    const parsedPoints: { x: number; y: number; label?: string }[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      const parenMatch = trimmed.match(/^\s*\(\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)\s*\)\s*(.*)$/);
      if (parenMatch) {
        parsedPoints.push({
          x: parseFloat(parenMatch[1]),
          y: parseFloat(parenMatch[2]),
          label: parenMatch[3].trim() || undefined
        });
        continue;
      }

      const parts = trimmed.split(/,/);
      if (parts.length >= 2) {
        const x = parseFloat(parts[0].trim());
        const y = parseFloat(parts[1].trim());
        const label = parts[2]?.trim();
        if (!isNaN(x) && !isNaN(y)) {
          parsedPoints.push({ x, y, label });
        }
      }
    }

    return parsedPoints;
  };

  const plot = () => {
    setError("");
    setResult(null);

    const xmin = parseFloat(xMin);
    const xmax = parseFloat(xMax);
    const ymin = parseFloat(yMin);
    const ymax = parseFloat(yMax);

    if ([xmin, xmax, ymin, ymax].some(isNaN)) {
      setError("Please enter valid range values");
      return;
    }

    if (xmin >= xmax || ymin >= ymax) {
      setError("Min values must be less than max values");
      return;
    }

    const parsedPoints = parsePoints(points);
    if (parsedPoints.length === 0) {
      setError("Please enter at least one point");
      return;
    }

    if (parsedPoints.length > 200) {
      setError("For performance reasons, please limit to 200 points");
      return;
    }

    const chartWidth = 400;
    const chartHeight = 400;
    const padding = 40;
    const innerWidth = chartWidth - 2 * padding;
    const innerHeight = chartHeight - 2 * padding;

    const scaleX = innerWidth / (xmax - xmin);
    const scaleY = innerHeight / (ymax - ymin);

    const plottedPoints = parsedPoints.map((p, i) => ({
      ...p,
      xNorm: padding + (p.x - xmin) * scaleX,
      yNorm: chartHeight - padding - (p.y - ymin) * scaleY,
      color: `hsl(${(i * 37) % 360}, 70%, 50%)`
    }));

    const xGridLines: number[] = [];
    const yGridLines: number[] = [];

    if (showGrid) {
      const xStep = Math.pow(10, Math.floor(Math.log10(xmax - xmin)) - 1);
      const yStep = Math.pow(10, Math.floor(Math.log10(ymax - ymin)) - 1);

      for (let x = Math.ceil(xmin / xStep) * xStep; x <= xmax; x += xStep) {
        xGridLines.push(x);
      }
      for (let y = Math.ceil(ymin / yStep) * yStep; y <= ymax; y += yStep) {
        yGridLines.push(y);
      }
    }

    const xAxisY = ymin < 0 && ymax > 0
      ? chartHeight - padding - (0 - ymin) * scaleY
      : null;
    const yAxisX = xmin < 0 && xmax > 0
      ? padding + (0 - xmin) * scaleX
      : null;

    setResult({
      points: plottedPoints,
      xGridLines,
      yGridLines,
      xAxisY,
      yAxisX,
      padding,
      chartWidth,
      chartHeight,
      innerWidth,
      innerHeight,
      xmin,
      xmax,
      ymin,
      ymax,
      stats: {
        count: parsedPoints.length,
        minX: Math.min(...parsedPoints.map(p => p.x)),
        maxX: Math.max(...parsedPoints.map(p => p.x)),
        minY: Math.min(...parsedPoints.map(p => p.y)),
        maxY: Math.max(...parsedPoints.map(p => p.y))
      }
    });
  };

  const reset = () => {
    setPoints("");
    setXMin("-10");
    setXMax("10");
    setYMin("-10");
    setYMax("10");
    setResult(null);
    setError("");
  };

  const loadExample = (type: string) => {
    const examples: Record<string, { points: string; xMin: string; xMax: string; yMin: string; yMax: string }> = {
      quadrants: {
        points: "(5, 5) Q1\n(-5, 5) Q2\n(-5, -5) Q3\n(5, -5) Q4\n(0, 0) Origin",
        xMin: "-10", xMax: "10", yMin: "-10", yMax: "10"
      },
      triangle: {
        points: "(0, 0) A\n(6, 0) B\n(3, 5) C",
        xMin: "-2", xMax: "8", yMin: "-2", yMax: "7"
      },
      rectangle: {
        points: "(2, 2)\n(8, 2)\n(8, 6)\n(2, 6)",
        xMin: "0", xMax: "10", yMin: "0", yMax: "8"
      },
      line: {
        points: "(-5, -5)\n(-3, -2)\n(-1, 1)\n(1, 4)\n(3, 7)\n(5, 10)",
        xMin: "-6", xMax: "6", yMin: "-6", yMax: "12"
      },
      scatter: {
        points: "(1, 2)\n(2, 4)\n(3, 3)\n(4, 6)\n(5, 5)\n(6, 8)\n(7, 7)\n(8, 10)",
        xMin: "0", xMax: "10", yMin: "0", yMax: "12"
      },
      polygon: {
        points: "(0, 3) A\n(2, 5) B\n(5, 5) C\n(7, 3) D\n(5, 0) E\n(2, 0) F",
        xMin: "-1", xMax: "8", yMin: "-1", yMax: "6"
      },
      symmetry: {
        points: "(2, 3)\n(-2, 3)\n(2, -3)\n(-2, -3)\n(3, 2)\n(-3, 2)\n(3, -2)\n(-3, -2)",
        xMin: "-5", xMax: "5", yMin: "-5", yMax: "5"
      }
    };
    const ex = examples[type] || examples.quadrants;
    setPoints(ex.points);
    setXMin(ex.xMin);
    setXMax(ex.xMax);
    setYMin(ex.yMin);
    setYMax(ex.yMax);
    setResult(null);
  };

  return (
    <div className="w-full mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Coordinate Plane Plotter – Plot Points on Cartesian Plane</h1>
        <p className="text-muted-foreground">
          Plot points on a Cartesian coordinate plane with our free online graphing tool. Visualize coordinates, quadrants, and geometric relationships instantly.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Points (one per line)</Label>
          <Textarea
            placeholder="(2, 3) Point A&#10;(-4, 1) Point B&#10;or: 2, 3, A&#10;-4, 1, B"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            rows={5}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Format: (x, y) label or x, y, label
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <Label>X Min</Label>
            <Input type="number" value={xMin} onChange={(e) => setXMin(e.target.value)} />
          </div>
          <div>
            <Label>X Max</Label>
            <Input type="number" value={xMax} onChange={(e) => setXMax(e.target.value)} />
          </div>
          <div>
            <Label>Y Min</Label>
            <Input type="number" value={yMin} onChange={(e) => setYMin(e.target.value)} />
          </div>
          <div>
            <Label>Y Max</Label>
            <Input type="number" value={yMax} onChange={(e) => setYMax(e.target.value)} />
          </div>
        </div>

        <div className="flex gap-4">
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
              checked={showLabels}
              onChange={(e) => setShowLabels(e.target.checked)}
              className="rounded"
            />
            Show Labels
          </label>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={plot}>Plot Points</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("quadrants")}>Quadrants</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("triangle")}>Triangle</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("rectangle")}>Rectangle</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("line")}>Line Pattern</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("scatter")}>Scatter Plot</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("polygon")}>Polygon</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("symmetry")}>Symmetry</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-4 text-center">Coordinate Plane</h4>
              <div className="flex justify-center">
                <svg viewBox={`0 0 ${result.chartWidth} ${result.chartHeight}`} className="w-full max-w-md aspect-square">
                  {showGrid && (
                    <>
                      {result.xGridLines.map((x: number, i: number) => (
                        <line
                          key={`xg-${i}`}
                          x1={result.padding + (x - result.xmin) * (result.innerWidth / (result.xmax - result.xmin))}
                          y1={result.padding}
                          x2={result.padding + (x - result.xmin) * (result.innerWidth / (result.xmax - result.xmin))}
                          y2={result.chartHeight - result.padding}
                          stroke="currentColor"
                          strokeWidth="0.5"
                          className="text-muted"
                          strokeDasharray="2,2"
                        />
                      ))}
                      {result.yGridLines.map((y: number, i: number) => (
                        <line
                          key={`yg-${i}`}
                          x1={result.padding}
                          y1={result.chartHeight - result.padding - (y - result.ymin) * (result.innerHeight / (result.ymax - result.ymin))}
                          x2={result.chartWidth - result.padding}
                          y2={result.chartHeight - result.padding - (y - result.ymin) * (result.innerHeight / (result.ymax - result.ymin))}
                          stroke="currentColor"
                          strokeWidth="0.5"
                          className="text-muted"
                          strokeDasharray="2,2"
                        />
                      ))}
                    </>
                  )}

                  <line
                    x1={result.padding}
                    y1={result.chartHeight - result.padding}
                    x2={result.chartWidth - result.padding}
                    y2={result.chartHeight - result.padding}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-foreground"
                  />
                  <line
                    x1={result.padding}
                    y1={result.padding}
                    x2={result.padding}
                    y2={result.chartHeight - result.padding}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-foreground"
                  />

                  {result.xAxisY !== null && (
                    <line
                      x1={result.padding}
                      y1={result.xAxisY}
                      x2={result.chartWidth - result.padding}
                      y2={result.xAxisY}
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-muted"
                    />
                  )}
                  {result.yAxisX !== null && (
                    <line
                      x1={result.yAxisX}
                      y1={result.padding}
                      x2={result.yAxisX}
                      y2={result.chartHeight - result.padding}
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-muted"
                    />
                  )}

                  {result.points.map((p: any, i: number) => (
                    <g key={i}>
                      <circle
                        cx={p.xNorm}
                        cy={p.yNorm}
                        r="6"
                        fill={p.color}
                        className="transition-opacity hover:opacity-80"
                      />
                      {showLabels && (
                        <text
                          x={p.xNorm + 10}
                          y={p.yNorm - 10}
                          className="text-xs fill-muted-foreground font-semibold"
                        >
                          {p.label || `(${p.x}, ${p.y})`}
                        </text>
                      )}
                    </g>
                  ))}

                  <text x={result.chartWidth - result.padding + 5} y={result.chartHeight - result.padding + 5} className="text-xs fill-muted-foreground">x</text>
                  <text x={result.padding + 5} y={result.padding - 5} className="text-xs fill-muted-foreground">y</text>
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Points</p>
                <p className="text-2xl font-bold">{result.stats.count}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Min X</p>
                <p className="text-xl font-bold">{result.stats.minX}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Max X</p>
                <p className="text-xl font-bold">{result.stats.maxX}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Min Y</p>
                <p className="text-xl font-bold">{result.stats.minY}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Max Y</p>
                <p className="text-xl font-bold">{result.stats.maxY}</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Plotted Points</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {result.points.map((p: any, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                    <span className="font-mono">({p.x}, {p.y})</span>
                    {p.label && <span className="text-muted-foreground">- {p.label}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding the Coordinate Plane</h2>
        <p className="text-muted-foreground">
          The coordinate plane, also called the Cartesian plane, is a flat surface defined by two perpendicular number lines: the x-axis (horizontal) and y-axis (vertical). They cross at the origin (0, 0), dividing the plane into four quadrants.
        </p>
        <p className="text-muted-foreground">
          Every point gets an address as an ordered pair (x, y). The x-coordinate tells you how far left or right from the origin. The y-coordinate tells you how far up or down. Positive x goes right, negative x goes left. Positive y goes up, negative y goes down.
        </p>
        <p className="text-muted-foreground">
          The four quadrants are numbered counterclockwise starting from the upper right. Quadrant I has positive x and y. Quadrant II has negative x, positive y. Quadrant III has both negative. Quadrant IV has positive x, negative y. Points on the axes aren't in any quadrant.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Plotting Points: Step by Step</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">How to Plot (x, y)</h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-semibold">Step 1: Start at origin</div>
                <div className="text-muted-foreground">Begin at (0, 0) where the axes cross</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-semibold">Step 2: Move horizontally</div>
                <div className="text-muted-foreground">Go right if x is positive, left if negative</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-semibold">Step 3: Move vertically</div>
                <div className="text-muted-foreground">From there, go up if y is positive, down if negative</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-semibold">Step 4: Mark the point</div>
                <div className="text-muted-foreground">Place a dot at your final location</div>
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Quadrant Reference</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 bg-muted rounded">
                <span>Quadrant I</span>
                <span className="font-mono">(+, +)</span>
              </div>
              <div className="flex justify-between p-2 bg-muted rounded">
                <span>Quadrant II</span>
                <span className="font-mono">(-, +)</span>
              </div>
              <div className="flex justify-between p-2 bg-muted rounded">
                <span>Quadrant III</span>
                <span className="font-mono">(-, -)</span>
              </div>
              <div className="flex justify-between p-2 bg-muted rounded">
                <span>Quadrant IV</span>
                <span className="font-mono">(+, -)</span>
              </div>
              <div className="flex justify-between p-2 bg-muted rounded">
                <span>X-axis</span>
                <span className="font-mono">y = 0</span>
              </div>
              <div className="flex justify-between p-2 bg-muted rounded">
                <span>Y-axis</span>
                <span className="font-mono">x = 0</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Worked Examples</h2>
        <div className="space-y-4">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 1: Plotting in All Quadrants</h3>
            <p className="text-sm text-muted-foreground mb-3">Plot these points: A(3, 4), B(-2, 5), C(-4, -3), D(6, -2)</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>A(3, 4):</strong> Right 3, up 4 → Quadrant I</div>
              <div><strong>B(-2, 5):</strong> Left 2, up 5 → Quadrant II</div>
              <div><strong>C(-4, -3):</strong> Left 4, down 3 → Quadrant III</div>
              <div><strong>D(6, -2):</strong> Right 6, down 2 → Quadrant IV</div>
              <div className="pt-2 text-muted-foreground">
                These four points form a quadrilateral that spans all four quadrants of the coordinate plane.
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 2: Points on the Axes</h3>
            <p className="text-sm text-muted-foreground mb-3">Plot: E(5, 0), F(0, 3), G(-4, 0), H(0, -2)</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>E(5, 0):</strong> On positive x-axis, 5 units right of origin</div>
              <div><strong>F(0, 3):</strong> On positive y-axis, 3 units above origin</div>
              <div><strong>G(-4, 0):</strong> On negative x-axis, 4 units left of origin</div>
              <div><strong>H(0, -2):</strong> On negative y-axis, 2 units below origin</div>
              <div className="pt-2 text-muted-foreground">
                Points on the axes have one coordinate equal to zero. They're not in any quadrant.
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 3: Forming a Triangle</h3>
            <p className="text-sm text-muted-foreground mb-3">Plot vertices: P(1, 1), Q(5, 1), R(3, 4)</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>P(1, 1):</strong> Bottom-left vertex</div>
              <div><strong>Q(5, 1):</strong> Bottom-right vertex (same y as P, so horizontal base)</div>
              <div><strong>R(3, 4):</strong> Top vertex (x is midpoint of P and Q, so isosceles triangle)</div>
              <div className="pt-2 text-muted-foreground">
                Base PQ = 4 units (from x=1 to x=5). Height = 3 units (from y=1 to y=4). Area = ½ × 4 × 3 = 6 square units.
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 4: Linear Pattern</h3>
            <p className="text-sm text-muted-foreground mb-3">Plot points on the line y = 2x + 1: (-2, -3), (-1, -1), (0, 1), (1, 3), (2, 5)</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div>Check: For x = -2, y = 2(-2) + 1 = -3 ✓</div>
              <div>Check: For x = 0, y = 2(0) + 1 = 1 ✓</div>
              <div>Check: For x = 2, y = 2(2) + 1 = 5 ✓</div>
              <div className="pt-2 text-muted-foreground">
                All these points lie on the same straight line. The slope is 2 (rise 2 for every run 1), and the y-intercept is 1.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Quick Fact</h2>
        <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm">
            <strong>René Descartes</strong> (1596-1650) invented coordinate geometry, revolutionizing mathematics by uniting algebra and geometry. The story goes that while lying in bed watching a fly on his ceiling, he realized he could describe the fly's position using two numbers – its distance from two adjacent walls. This insight created analytic geometry, enabling calculus and modern physics. The "Cartesian" in Cartesian plane comes from Descartes' Latin name, Cartesius. His famous philosophical statement "Cogito, ergo sum" (I think, therefore I am) remains one of the most quoted phrases in philosophy.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-sm mb-2">What order do the coordinates go in?</h3>
            <p className="text-sm text-muted-foreground">
              Always (x, y) – x comes first, y comes second. Think "x before y" like "x comes before y" in the alphabet. Or remember: you walk along the hallway (x-axis) before going up the elevator (y-axis).
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">How do I remember which quadrant is which?</h3>
            <p className="text-sm text-muted-foreground">
              Quadrants are numbered counterclockwise starting from the upper right (where both coordinates are positive). Think of it like a race track going counterclockwise. Quadrant I is the "positive" quadrant – everything is good there. Then you go through the others in order.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">What if both coordinates are zero?</h3>
            <p className="text-sm text-muted-foreground">
              That's the origin – the point (0, 0) where the x-axis and y-axis intersect. It's the starting point for all coordinate measurements and isn't in any quadrant.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">Can coordinates be decimals or fractions?</h3>
            <p className="text-sm text-muted-foreground">
              Absolutely! Coordinates can be any real number: integers, decimals, fractions, even irrational numbers like π. The point (1.5, 2.75) is located halfway between x=1 and x=2, and three-quarters of the way from y=2 to y=3.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">What's the difference between the coordinate plane and a graph?</h3>
            <p className="text-sm text-muted-foreground">
              The coordinate plane is the empty grid – the framework. A graph is what you create when you plot points, lines, or curves on that plane. The coordinate plane is like blank graph paper; the graph is the picture you draw on it.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">How are coordinate planes used in real life?</h3>
            <p className="text-sm text-muted-foreground">
              Everywhere! GPS uses coordinates (latitude, longitude) to locate you on Earth. Video games use them to position characters and objects. Architects use them for building plans. Pilots and sailors navigate using coordinate systems. Even your computer screen is a coordinate plane – every pixel has an (x, y) address.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">What is the distance formula?</h3>
            <p className="text-sm text-muted-foreground">
              The distance between two points (x₁, y₁) and (x₂, y₂) is d = √[(x₂-x₁)² + (y₂-y₁)²]. It's the Pythagorean theorem applied to the coordinate plane. The horizontal and vertical differences form the legs of a right triangle, and the distance is the hypotenuse.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
