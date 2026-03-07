"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function OutlierDetector() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{
    min: number;
    q1: number;
    median: number;
    q3: number;
    max: number;
    iqr: number;
    lowerFence: number;
    upperFence: number;
    outliers: number[];
    nonOutliers: number[];
  } | null>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setResult(null);
    setSteps([]);

    const numbers = input
      .split(/[,\s\n]+/)
      .map((s) => s.trim())
      .filter((s) => s !== "")
      .map((s) => parseFloat(s))
      .filter((n) => !isNaN(n));

    if (numbers.length === 0) {
      setError("Please enter at least one number");
      return;
    }

    if (numbers.length < 4) {
      setError("Please enter at least 4 numbers for meaningful outlier detection");
      return;
    }

    const sorted = [...numbers].sort((a, b) => a - b);
    const n = sorted.length;

    const min = sorted[0];
    const max = sorted[n - 1];
    const median = getMedian(sorted);
    const lowerHalf = sorted.slice(0, Math.floor(n / 2));
    const upperHalf = sorted.slice(Math.ceil(n / 2));
    const q1 = getMedian(lowerHalf);
    const q3 = getMedian(upperHalf);
    const iqr = q3 - q1;

    const lowerFence = q1 - 1.5 * iqr;
    const upperFence = q3 + 1.5 * iqr;

    const outliers = sorted.filter((x) => x < lowerFence || x > upperFence);
    const nonOutliers = sorted.filter((x) => x >= lowerFence && x <= upperFence);

    const calculationSteps = [
      "Step 1: Sort the data in ascending order",
      `  ${sorted.join(", ")}`,
      "",
      `Step 2: Find quartiles`,
      `  Q1 = ${q1}`,
      `  Median = ${median}`,
      `  Q3 = ${q3}`,
      "",
      "Step 3: Calculate Interquartile Range (IQR)",
      `  IQR = Q3 - Q1 = ${q3} - ${q1} = ${iqr}`,
      "",
      "Step 4: Calculate fences",
      `  Lower Fence = Q1 - 1.5 × IQR = ${q1} - 1.5 × ${iqr} = ${lowerFence}`,
      `  Upper Fence = Q3 + 1.5 × IQR = ${q3} + 1.5 × ${iqr} = ${upperFence}`,
      "",
      "Step 5: Identify outliers",
      outliers.length > 0
        ? `  Outliers (outside fences): ${outliers.join(", ")}`
        : `  No outliers found (all values between ${lowerFence} and ${upperFence})`,
    ];

    setResult({ min, q1, median, q3, max, iqr, lowerFence, upperFence, outliers, nonOutliers });
    setSteps(calculationSteps);
  };

  const reset = () => {
    setInput("");
    setResult(null);
    setSteps([]);
    setError("");
  };

  const loadExample = () => {
    setInput("10, 12, 11, 13, 12, 11, 10, 100, 14, 13, 12, 5");
    setResult(null);
    setSteps([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Outlier Detector – Find Outliers Using IQR Method Online</h1>
        <p className="text-muted-foreground">
          Detect outliers in any dataset using the IQR method with our free online outlier detector. Find lower and upper fences and identify all outlying values in your data.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Enter Numbers</Label>
          <Textarea
            placeholder="Enter numbers separated by commas, spaces, or newlines"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={4}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Enter at least 4 numbers for meaningful outlier detection.
          </p>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Detect Outliers</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={loadExample}>Load Example</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result !== null && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-xs text-muted-foreground mb-1">Q1</p>
                <p className="text-2xl font-bold">{result.q1}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-xs text-muted-foreground mb-1">Median</p>
                <p className="text-2xl font-bold">{result.median}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-xs text-muted-foreground mb-1">Q3</p>
                <p className="text-2xl font-bold">{result.q3}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-xs text-muted-foreground mb-1">IQR</p>
                <p className="text-2xl font-bold">{result.iqr}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-sm mb-2">Fences</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lower Fence:</span>
                    <span className="font-mono font-semibold">{result.lowerFence}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Upper Fence:</span>
                    <span className="font-mono font-semibold">{result.upperFence}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-sm mb-2">Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total values:</span>
                    <span className="font-semibold">{result.outliers.length + result.nonOutliers.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Outliers:</span>
                    <span className="font-semibold text-destructive">{result.outliers.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Normal values:</span>
                    <span className="font-semibold text-primary">{result.nonOutliers.length}</span>
                  </div>
                </div>
              </div>
            </div>

            {result.outliers.length > 0 && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <h4 className="font-semibold text-sm mb-2 text-destructive">Outliers Detected</h4>
                <div className="flex flex-wrap gap-2">
                  {result.outliers.map((outlier, i) => (
                    <span key={i} className="px-3 py-1 bg-destructive text-destructive-foreground rounded-full text-sm font-semibold">
                      {outlier}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {result.outliers.length === 0 && (
              <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <h4 className="font-semibold text-sm mb-2 text-primary">No Outliers Found</h4>
                <p className="text-sm text-muted-foreground">
                  All values fall within the normal range ({result.lowerFence} to {result.upperFence}).
                </p>
              </div>
            )}

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Calculation Steps</h4>
              <div className="font-mono text-sm space-y-1 whitespace-pre-wrap">
                {steps.map((step, i) => (
                  <div key={i}>{step}</div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Visual Representation</h4>
              <div className="relative h-16 bg-border rounded">
                <div
                  className="absolute h-1 bg-primary/30"
                  style={{
                    left: "5%",
                    right: "5%",
                  }}
                />
                <div
                  className="absolute h-8 bg-primary/50 rounded"
                  style={{
                    left: `${Math.max(5, ((result.q1 - Math.min(result.min, result.lowerFence)) / ((result.max - Math.min(result.min, result.lowerFence)) || 1)) * 90)}%`,
                    width: `${Math.max(2, ((result.iqr) / ((result.max - Math.min(result.min, result.lowerFence)) || 1)) * 90)}%`,
                  }}
                />
                <div
                  className="absolute h-12 w-0.5 bg-primary"
                  style={{ left: `${Math.max(5, ((result.lowerFence - Math.min(result.min, result.lowerFence)) / ((result.max - Math.min(result.min, result.lowerFence)) || 1)) * 90)}%` }}
                />
                <div
                  className="absolute h-12 w-0.5 bg-primary"
                  style={{ left: `${Math.max(5, ((result.q1 - Math.min(result.min, result.lowerFence)) / ((result.max - Math.min(result.min, result.lowerFence)) || 1)) * 90)}%` }}
                />
                <div
                  className="absolute h-12 w-0.5 bg-primary"
                  style={{ left: `${Math.max(5, ((result.median - Math.min(result.min, result.lowerFence)) / ((result.max - Math.min(result.min, result.lowerFence)) || 1)) * 90)}%` }}
                />
                <div
                  className="absolute h-12 w-0.5 bg-primary"
                  style={{ left: `${Math.max(5, ((result.q3 - Math.min(result.min, result.lowerFence)) / ((result.max - Math.min(result.min, result.lowerFence)) || 1)) * 90)}%` }}
                />
                <div
                  className="absolute h-12 w-0.5 bg-primary"
                  style={{ left: `${Math.max(5, ((result.upperFence - Math.min(result.min, result.lowerFence)) / ((result.max - Math.min(result.min, result.lowerFence)) || 1)) * 90)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Min: {result.min}</span>
                <span>LF: {result.lowerFence}</span>
                <span>Q1: {result.q1}</span>
                <span>Med: {result.median}</span>
                <span>Q3: {result.q3}</span>
                <span>UF: {result.upperFence}</span>
                <span>Max: {result.max}</span>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

function getMedian(sorted: number[]): number {
  const n = sorted.length;
  if (n === 0) return 0;
  if (n % 2 === 1) {
    return sorted[Math.floor(n / 2)];
  }
  return (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
}
