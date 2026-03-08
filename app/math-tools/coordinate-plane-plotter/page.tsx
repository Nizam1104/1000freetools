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

      // Try format: (x, y) label
      const parenMatch = trimmed.match(/^\s*\(\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)\s*\)\s*(.*)$/);
      if (parenMatch) {
        parsedPoints.push({
          x: parseFloat(parenMatch[1]),
          y: parseFloat(parenMatch[2]),
          label: parenMatch[3].trim() || undefined
        });
        continue;
      }

      // Try format: x, y, label
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

    // Generate grid lines
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

    // Find axis positions
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

  const loadExample = () => {
    setPoints("(2, 3) A\n(-4, 1) B\n(0, -5) C\n(5, -2) D\n(-3, -4) E");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
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

        <div className="flex gap-2">
          <Button onClick={plot}>Plot Points</Button>
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
              <h4 className="font-semibold text-sm mb-4 text-center">Coordinate Plane</h4>
              <div className="flex justify-center">
                <svg viewBox={`0 0 ${result.chartWidth} ${result.chartHeight}`} className="w-full max-w-md aspect-square">
                  {/* Grid lines */}
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

                  {/* Axes */}
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

                  {/* Zero axes if in range */}
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

                  {/* Points */}
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

                  {/* Axis labels */}
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

    </div>
  );
}
