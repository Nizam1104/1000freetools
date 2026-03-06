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

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">What is an Outlier?</h2>
        <p className="text-muted-foreground">
          An outlier is a data point that differs significantly from other observations. Outliers can occur due to variability in measurement, experimental error, or a novelty in the data. They can skew statistical analyses and should be carefully examined.
        </p>
        <p className="text-muted-foreground">
          The IQR (Interquartile Range) method is one of the most common ways to detect outliers. It identifies values that fall below Q1 - 1.5×IQR or above Q3 + 1.5×IQR as potential outliers.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">IQR Method Formula</h2>
        <div className="p-4 border rounded-lg">
          <code className="text-lg font-mono bg-muted px-3 py-2 rounded block">
            Lower Fence = Q1 - 1.5 × IQR<br />
            Upper Fence = Q3 + 1.5 × IQR<br />
            <br />
            Outlier if: value &lt; Lower Fence OR value &gt; Upper Fence
          </code>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-muted rounded">
              <p className="font-semibold text-sm">1.5 × IQR Rule</p>
              <p className="text-xs text-muted-foreground">Standard multiplier for mild outliers</p>
            </div>
            <div className="p-3 bg-muted rounded">
              <p className="font-semibold text-sm">3.0 × IQR Rule</p>
              <p className="text-xs text-muted-foreground">Used for extreme outliers</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Common Causes of Outliers</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Data Entry Errors</h3>
            <p className="text-sm text-muted-foreground">
              Typos, misplaced decimals, or wrong units can create outliers. Always verify suspicious values against original sources.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Measurement Errors</h3>
            <p className="text-sm text-muted-foreground">
              Faulty equipment, calibration issues, or environmental factors can produce anomalous readings.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Natural Variation</h3>
            <p className="text-sm text-muted-foreground">
              Some datasets naturally have extreme values. These may be valid data points representing rare events.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">New Phenomena</h3>
            <p className="text-sm text-muted-foreground">
              Outliers can indicate discoveries or changes in the system being studied. Don't automatically discard them.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Should I remove outliers from my data?</h3>
            <p className="text-sm text-muted-foreground">
              Not automatically. Investigate first - they might be errors to correct, valid extreme values to keep, or important discoveries. Document your decision.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Why use 1.5 × IQR?</h3>
            <p className="text-sm text-muted-foreground">
              The 1.5 multiplier was chosen by statistician John Tukey as a balance - it catches unusual values without flagging too many normal points. For extreme outliers, use 3.0 × IQR.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Can outliers be positive and negative?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, outliers can be unusually high (above upper fence) or unusually low (below lower fence). Both types should be investigated.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What if all my data points are outliers?</h3>
            <p className="text-sm text-muted-foreground">
              This suggests your data may be bimodal or have multiple clusters. Consider analyzing subgroups separately or using different statistical methods.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/five-number-summary-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Five-Number Summary</p>
            <p className="text-xs text-muted-foreground">Min, Q1, Med, Q3, Max</p>
          </a>
          <a href="/math-tools/box-plot-generator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Box Plot Generator</p>
            <p className="text-xs text-muted-foreground">Visual box plot</p>
          </a>
          <a href="/math-tools/standard-deviation-variance-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Standard Deviation</p>
            <p className="text-xs text-muted-foreground">Measure of spread</p>
          </a>
        </div>
      </section>
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
