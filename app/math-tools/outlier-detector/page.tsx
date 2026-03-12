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

  const examples = [
    { name: "With Outliers", data: "10, 12, 11, 13, 12, 100, 14, 11, 13, 12, 5" },
    { name: "No Outliers", data: "10, 12, 11, 13, 12, 14, 11, 13, 12, 15" },
    { name: "Multiple Outliers", data: "50, 52, 51, 5, 53, 200, 49, 51, 52, 1" },
    { name: "Test Scores", data: "85, 88, 90, 87, 89, 45, 91, 86, 88, 92" },
    { name: "Prices", data: "100, 105, 98, 102, 99, 500, 103, 97, 101, 104" },
    { name: "Measurements", data: "3.1, 3.2, 3.0, 3.3, 3.1, 10.5, 3.2, 3.0, 3.1" },
    { name: "Large Dataset", data: "20, 22, 21, 23, 19, 24, 22, 21, 20, 23, 100, 5, 22, 21, 20" }
  ];

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
      `  Lower Fence = Q1 - 1.5 x IQR = ${q1} - 1.5 x ${iqr} = ${lowerFence}`,
      `  Upper Fence = Q3 + 1.5 x IQR = ${q3} + 1.5 x ${iqr} = ${upperFence}`,
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

  const loadExample = (index: number) => {
    setInput(examples[index].data);
    setResult(null);
    setSteps([]);
    setError("");
  };

  return (
    <div className="w-full mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Outlier Detector – Find Outliers Using IQR Method Online</h1>
        <p className="text-muted-foreground">
          Detect outliers in any dataset using the IQR method with our free online outlier detector. Find lower and upper fences and identify all outlying values in your data.
        </p>
      </div>

      <div className="space-y-4">
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

          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Examples:</span>
            {examples.map((ex, idx) => (
              <Button key={idx} variant="outline" size="sm" onClick={() => loadExample(idx)}>{ex.name}</Button>
            ))}
          </div>

          <div className="flex gap-2">
            <Button onClick={calculate}>Detect Outliers</Button>
            <Button variant="outline" onClick={reset}>Reset</Button>
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

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Outliers and the IQR Method</h2>
        <p className="text-muted-foreground">
          An outlier is a data point that differs significantly from other observations. Outliers can indicate measurement errors, data entry mistakes, or genuinely unusual events. Identifying them is crucial for accurate data analysis.
        </p>
        <p className="text-muted-foreground">
          The IQR (Interquartile Range) method is the most common way to detect outliers. It uses quartiles to define "fences" – boundaries beyond which values are considered outliers. This method is robust because it's based on the middle 50% of data, not affected by extreme values.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">The IQR Method Explained</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Quartiles</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li><strong>Q1 (25th percentile):</strong> 25% of data below this</li>
              <li><strong>Q2 (Median):</strong> 50% of data below this</li>
              <li><strong>Q3 (75th percentile):</strong> 75% of data below this</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">IQR Formula</h4>
            <code className="text-sm font-mono block">IQR = Q3 - Q1</code>
            <p className="text-xs text-muted-foreground mt-2">
              The IQR represents the spread of the middle 50% of data.
            </p>
          </div>
        </div>
        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-semibold text-sm mb-2">Outlier Fences</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <code className="font-mono">Lower Fence = Q1 - 1.5 x IQR</code>
              <p className="text-xs text-muted-foreground mt-1">Values below this are outliers</p>
            </div>
            <div>
              <code className="font-mono">Upper Fence = Q3 + 1.5 x IQR</code>
              <p className="text-xs text-muted-foreground mt-1">Values above this are outliers</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: Clear Outlier</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Data: 10, 12, 11, 13, 12, 100, 14, 11</div>
              <div>Sorted: 10, 11, 11, 12, 12, 13, 14, 100</div>
              <div>Q1 = 11, Median = 12, Q3 = 13.5</div>
              <div>IQR = 13.5 - 11 = 2.5</div>
              <div>Lower Fence = 11 - 1.5(2.5) = 7.25</div>
              <div>Upper Fence = 13.5 + 1.5(2.5) = 17.25</div>
              <div>Outlier: 100 (above upper fence)</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: No Outliers</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Data: 50, 52, 51, 53, 49, 54, 50, 52</div>
              <div>Sorted: 49, 50, 50, 51, 52, 52, 53, 54</div>
              <div>Q1 = 50, Median = 51.5, Q3 = 52.5</div>
              <div>IQR = 52.5 - 50 = 2.5</div>
              <div>Fences: 46.25 to 56.25</div>
              <div className="text-green-600">All values within fences - no outliers!</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: Multiple Outliers</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Data: 20, 22, 21, 5, 23, 100, 19, 24</div>
              <div>Sorted: 5, 19, 20, 21, 22, 23, 24, 100</div>
              <div>Q1 = 19.5, Median = 21.5, Q3 = 23.5</div>
              <div>IQR = 4, Fences: 13.5 to 29.5</div>
              <div>Outliers: 5 (low), 100 (high)</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <p className="text-sm">
            The 1.5 multiplier in the IQR method was chosen by statistician John Tukey as a balance between sensitivity and robustness. It corresponds roughly to ±2.7 standard deviations in a normal distribution, catching about 0.7% of normally distributed data as outliers.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Why use 1.5 x IQR?</h4>
            <p className="text-sm text-muted-foreground">
              The 1.5 multiplier is a convention established by John Tukey. It's strict enough to catch obvious outliers but lenient enough to avoid flagging normal variation. Some applications use 3.0 x IQR for "extreme" outliers.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Should I remove outliers?</h4>
            <p className="text-sm text-muted-foreground">
              Not automatically! First investigate why they exist. If it's a data entry error, correct or remove it. If it's a genuine extreme value, keep it but consider robust statistical methods that aren't affected by outliers.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What causes outliers?</h4>
            <p className="text-sm text-muted-foreground">
              Common causes include: measurement errors, data entry mistakes, equipment malfunctions, genuine rare events, or data from a different population. Always investigate before deciding what to do.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can the IQR method miss outliers?</h4>
            <p className="text-sm text-muted-foreground">
              Yes, in some cases. If there are many outliers, they can affect the quartiles themselves (masking). For small datasets, the method may be too lenient. Consider other methods like Z-scores for normally distributed data.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between outliers and anomalies?</h4>
            <p className="text-sm text-muted-foreground">
              Outliers are statistical – unusually far from other values. Anomalies are contextual – unexpected given the situation. All anomalies might be outliers, but not all outliers are anomalies. Context matters!
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do outliers affect statistics?</h4>
            <p className="text-sm text-muted-foreground">
              Outliers heavily influence the mean and standard deviation but have little effect on the median and IQR. This is why we use median and IQR for skewed data or data with outliers – they're "robust" statistics.
            </p>
          </div>
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
