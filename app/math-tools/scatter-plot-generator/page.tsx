"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ScatterPlotGenerator() {
  const [xData, setXData] = useState("");
  const [yData, setYData] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setResult(null);

    const xValues = xData.split(/[\n,\s]+/).filter(s => s.trim()).map(Number);
    const yValues = yData.split(/[\n,\s]+/).filter(s => s.trim()).map(Number);

    if (xValues.length !== yValues.length) {
      setError("X and Y datasets must have the same number of values");
      return;
    }

    if (xValues.length < 2) {
      setError("Please enter at least 2 data points");
      return;
    }

    if (xValues.some(isNaN) || yValues.some(isNaN)) {
      setError("Please enter valid numbers only");
      return;
    }

    const n = xValues.length;
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);

    const sumX = xValues.reduce((a, b) => a + b, 0);
    const sumY = yValues.reduce((a, b) => a + b, 0);
    const sumXY = xValues.reduce((sum, x, i) => sum + x * yValues[i], 0);
    const sumX2 = xValues.reduce((sum, x) => sum + x * x, 0);
    const sumY2 = yValues.reduce((sum, y) => sum + y * y, 0);

    const meanX = sumX / n;
    const meanY = sumY / n;

    const SSxy = sumXY - (sumX * sumY) / n;
    const SSxx = sumX2 - (sumX * sumX) / n;
    const SSyy = sumY2 - (sumY * sumY) / n;

    const slope = SSxx !== 0 ? SSxy / SSxx : 0;
    const intercept = meanY - slope * meanX;

    const r = SSxx !== 0 && SSyy !== 0 
      ? SSxy / Math.sqrt(SSxx * SSyy) 
      : 0;

    const points = xValues.map((x, i) => ({
      x,
      y: yValues[i],
      xNorm: ((x - minX) / (maxX - minX || 1)) * 80 + 10,
      yNorm: 90 - ((yValues[i] - minY) / (maxY - minY || 1)) * 70 - 10
    }));

    const lineStart = {
      x: minX,
      y: slope * minX + intercept
    };
    const lineEnd = {
      x: maxX,
      y: slope * maxX + intercept
    };

    setResult({
      n,
      minX,
      maxX,
      minY,
      maxY,
      meanX: Math.round(meanX * 10000) / 10000,
      meanY: Math.round(meanY * 10000) / 10000,
      slope: Math.round(slope * 10000) / 10000,
      intercept: Math.round(intercept * 10000) / 10000,
      r: Math.round(r * 10000) / 10000,
      rSquared: Math.round(r * r * 10000) / 10000,
      points,
      lineStart,
      lineEnd,
      lineStartNorm: {
        x: 10,
        y: 90 - (((slope * minX + intercept) - minY) / (maxY - minY || 1)) * 70 - 10
      },
      lineEndNorm: {
        x: 90,
        y: 90 - (((slope * maxX + intercept) - minY) / (maxY - minY || 1)) * 70 - 10
      }
    });
  };

  const reset = () => {
    setXData("");
    setYData("");
    setResult(null);
    setError("");
  };

  const loadExample = () => {
    setXData("1, 2, 3, 4, 5, 6, 7, 8, 9, 10");
    setYData("2.1, 3.8, 5.2, 7.1, 8.9, 10.5, 12.8, 14.2, 16.1, 18.5");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Scatter Plot Generator – Create Scatter Plots Online Free</h1>
        <p className="text-muted-foreground">
          Generate scatter plots from any two-variable dataset with our free online scatter plot generator. Visualize data relationships, trends, and correlations instantly.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>X Values (Independent Variable)</Label>
            <Textarea
              placeholder="Enter values separated by commas or newlines"
              value={xData}
              onChange={(e) => setXData(e.target.value)}
              rows={5}
            />
          </div>
          <div>
            <Label>Y Values (Dependent Variable)</Label>
            <Textarea
              placeholder="Enter values separated by commas or newlines"
              value={yData}
              onChange={(e) => setYData(e.target.value)}
              rows={5}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Generate Scatter Plot</Button>
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
              <h4 className="font-semibold text-sm mb-4">Scatter Plot</h4>
              <div className="relative w-full aspect-video border-2 border-border bg-background">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <line x1="10" y1="90" x2="95" y2="90" stroke="currentColor" strokeWidth="0.5" className="text-border" />
                  <line x1="10" y1="10" x2="10" y2="95" stroke="currentColor" strokeWidth="0.5" className="text-border" />
                  
                  <line 
                    x1={result.lineStartNorm.x} 
                    y1={result.lineStartNorm.y} 
                    x2={result.lineEndNorm.x} 
                    y2={result.lineEndNorm.y} 
                    stroke="currentColor" 
                    strokeWidth="0.5" 
                    strokeDasharray="2,2"
                    className="text-primary"
                  />
                  
                  {result.points.map((point: any, i: number) => (
                    <circle
                      key={i}
                      cx={point.xNorm}
                      cy={point.yNorm}
                      r="2"
                      className="fill-primary"
                    />
                  ))}
                </svg>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                  X Variable
                </div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-muted-foreground origin-center">
                  Y Variable
                </div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>X: {result.minX} - {result.maxX}</span>
                <span>Y: {result.minY} - {result.maxY}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Data Points</p>
                <p className="text-2xl font-bold">{result.n}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Correlation (r)</p>
                <p className={`text-xl font-bold ${
                  result.r > 0.7 ? 'text-green-600' : 
                  result.r < -0.7 ? 'text-red-600' : ''
                }`}>{result.r}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">R²</p>
                <p className="text-xl font-bold">{result.rSquared}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Trend</p>
                <p className="text-sm font-semibold">
                  {result.r > 0.3 ? 'Positive' : result.r < -0.3 ? 'Negative' : 'No clear'}
                </p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Regression Line</h4>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                y = {result.slope}x + {result.intercept}
              </code>
              <p className="text-xs text-muted-foreground mt-2">
                For each unit increase in X, Y changes by {result.slope} units.
              </p>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
      </section>
    </div>
  );
}
