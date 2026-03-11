"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function FiveNumberSummaryCalculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{
    min: number;
    q1: number;
    median: number;
    q3: number;
    max: number;
    iqr: number;
    n: number;
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
      setError("Please enter at least 4 numbers for meaningful quartiles");
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

    const calculationSteps = [
      "Step 1: Sort the data in ascending order",
      `  ${sorted.join(", ")}`,
      "",
      `Step 2: Count of numbers (n) = ${n}`,
      "",
      "Step 3: Find minimum and maximum",
      `  Min = ${min}`,
      `  Max = ${max}`,
      "",
      "Step 4: Find the median (Q2)",
      n % 2 === 1
        ? `  Position ${(n + 1) / 2} (middle value) = ${median}`
        : `  Average of positions ${n / 2} and ${n / 2 + 1}: (${sorted[n / 2 - 1]} + ${sorted[n / 2]}) / 2 = ${median}`,
      "",
      "Step 5: Find Q1 (median of lower half)",
      `  Lower half: ${lowerHalf.join(", ")}`,
      `  Q1 = ${q1}`,
      "",
      "Step 6: Find Q3 (median of upper half)",
      `  Upper half: ${upperHalf.join(", ")}`,
      `  Q3 = ${q3}`,
      "",
      "Step 7: Calculate Interquartile Range (IQR)",
      `  IQR = Q3 - Q1 = ${q3} - ${q1} = ${iqr}`,
    ];

    setResult({ min, q1, median, q3, max, iqr, n });
    setSteps(calculationSteps);
  };

  const reset = () => {
    setInput("");
    setResult(null);
    setSteps([]);
    setError("");
  };

  const loadExample = (data: string) => {
    setInput(data);
    setResult(null);
    setSteps([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Five Number Summary Calculator – Min Q1 Median Q3 Max</h1>
        <p className="text-muted-foreground">
          Find the five-number summary of any dataset with our free online calculator. Instantly compute the minimum, Q1, median, Q3, and maximum for complete data analysis.
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
            Enter at least 4 numbers for meaningful quartile calculations.
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculate}>Calculate Five-Number Summary</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("12, 5, 8, 20, 15, 10, 25, 18, 30, 7")}>Test scores</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("45, 52, 38, 49, 55, 42, 48, 51, 39, 47, 53, 44, 50, 46, 41")}>Ages</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("100, 150, 200, 250, 300, 350, 400, 450, 500")}>Salaries</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("2.5, 3.1, 2.8, 3.5, 4.2, 3.9, 2.1, 3.7, 4.5, 3.3")}>Measurements</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("65, 72, 78, 81, 85, 68, 73, 79, 82, 88, 70, 75, 80, 84, 90")}>Grades</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result !== null && (
          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-xs text-muted-foreground mb-1">Minimum</p>
                <p className="text-2xl font-bold">{result.min}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-xs text-muted-foreground mb-1">Q1 (25%)</p>
                <p className="text-2xl font-bold">{result.q1}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-xs text-muted-foreground mb-1">Median (Q2)</p>
                <p className="text-2xl font-bold">{result.median}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-xs text-muted-foreground mb-1">Q3 (75%)</p>
                <p className="text-2xl font-bold">{result.q3}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-xs text-muted-foreground mb-1">Maximum</p>
                <p className="text-2xl font-bold">{result.max}</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Additional Statistics</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Count (n):</span>
                  <span className="ml-2 font-semibold">{result.n}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Range:</span>
                  <span className="ml-2 font-semibold">{result.max - result.min}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">IQR:</span>
                  <span className="ml-2 font-semibold">{result.iqr}</span>
                </div>
              </div>
            </div>

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
              <div className="relative h-12 bg-border rounded">
                <div
                  className="absolute h-4 bg-primary/30 rounded"
                  style={{
                    left: `${((result.q1 - result.min) / (result.max - result.min || 1)) * 100}%`,
                    width: `${((result.iqr) / (result.max - result.min || 1)) * 100}%`,
                  }}
                />
                <div
                  className="absolute h-6 w-0.5 bg-primary"
                  style={{ left: `${((result.min - result.min) / (result.max - result.min || 1)) * 100}%` }}
                />
                <div
                  className="absolute h-8 w-0.5 bg-primary"
                  style={{ left: `${((result.q1 - result.min) / (result.max - result.min || 1)) * 100}%` }}
                />
                <div
                  className="absolute h-8 w-0.5 bg-primary"
                  style={{ left: `${((result.median - result.min) / (result.max - result.min || 1)) * 100}%` }}
                />
                <div
                  className="absolute h-8 w-0.5 bg-primary"
                  style={{ left: `${((result.q3 - result.min) / (result.max - result.min || 1)) * 100}%` }}
                />
                <div
                  className="absolute h-6 w-0.5 bg-primary"
                  style={{ left: `${((result.max - result.min) / (result.max - result.min || 1)) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{result.min}</span>
                <span>Q1: {result.q1}</span>
                <span>Med: {result.median}</span>
                <span>Q3: {result.q3}</span>
                <span>{result.max}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding the Five-Number Summary</h2>
        <p className="text-muted-foreground">
          The five-number summary gives you a quick snapshot of your data's distribution. It consists of the minimum, first quartile (Q1), median, third quartile (Q3), and maximum. Together, these five numbers tell you where your data is centered, how spread out it is, and whether it's symmetric or skewed.
        </p>
        <p className="text-muted-foreground">
          The median splits your data in half. Q1 marks the 25th percentile – a quarter of your data falls below this value. Q3 marks the 75th percentile. The interquartile range (IQR = Q3 - Q1) captures the middle 50% of your data, making it a robust measure of spread that isn't thrown off by outliers.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">How to Calculate the Five-Number Summary</h3>
        <div className="p-6 bg-muted rounded-lg">
          <ol className="space-y-4 text-sm">
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">1</span>
              <div>
                <p className="font-semibold mb-1">Sort your data</p>
                <p className="text-muted-foreground">
                  Arrange all values from smallest to largest. This is essential for finding quartiles.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">2</span>
              <div>
                <p className="font-semibold mb-1">Find the minimum and maximum</p>
                <p className="text-muted-foreground">
                  The smallest value is your minimum. The largest is your maximum.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">3</span>
              <div>
                <p className="font-semibold mb-1">Find the median</p>
                <p className="text-muted-foreground">
                  For odd n, it's the middle value. For even n, average the two middle values.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">4</span>
              <div>
                <p className="font-semibold mb-1">Find Q1 and Q3</p>
                <p className="text-muted-foreground">
                  Q1 is the median of the lower half (excluding the overall median if n is odd). Q3 is the median of the upper half.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">5</span>
              <div>
                <p className="font-semibold mb-1">Calculate IQR</p>
                <p className="text-muted-foreground">
                  Subtract Q1 from Q3. This tells you the spread of the middle 50% of your data.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: Test Scores</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Data: 12, 5, 8, 20, 15, 10, 25, 18, 30, 7</div>
              <div>Sorted: 5, 7, 8, 10, 12, 15, 18, 20, 25, 30</div>
              <div>n = 10 (even)</div>
              <div>Min = 5, Max = 30</div>
              <div>Median = (12 + 15) / 2 = 13.5</div>
              <div>Lower half: 5, 7, 8, 10, 12 → Q1 = 8</div>
              <div>Upper half: 15, 18, 20, 25, 30 → Q3 = 20</div>
              <div>IQR = 20 - 8 = 12</div>
              <div className="text-muted-foreground mt-2">Five-number summary: 5, 8, 13.5, 20, 30</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: Small Dataset</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Data: 3, 7, 8, 12, 15, 18, 22</div>
              <div>n = 7 (odd)</div>
              <div>Min = 3, Max = 22</div>
              <div>Median = 12 (middle value, position 4)</div>
              <div>Lower half: 3, 7, 8 → Q1 = 7</div>
              <div>Upper half: 15, 18, 22 → Q3 = 18</div>
              <div>IQR = 18 - 7 = 11</div>
              <div className="text-muted-foreground mt-2">Five-number summary: 3, 7, 12, 18, 22</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: Identifying Outliers</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Using the IQR rule:</div>
              <div>Lower fence = Q1 - 1.5 × IQR</div>
              <div>Upper fence = Q3 + 1.5 × IQR</div>
              <div>Values outside these fences are outliers</div>
              <div className="text-muted-foreground mt-2">From Example 1: IQR = 12</div>
              <div>Lower fence = 8 - 1.5(12) = -10</div>
              <div>Upper fence = 20 + 1.5(12) = 38</div>
              <div className="text-muted-foreground">No outliers in this dataset (all values between -10 and 38)</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h4 className="font-semibold text-sm mb-2 text-amber-800">Quick Fact</h4>
          <p className="text-sm text-amber-700">
            The five-number summary is the foundation of the box plot (box-and-whisker plot), invented by statistician John Tukey in 1969. Tukey was a pioneer of exploratory data analysis and believed in letting the data "speak for itself" through visual displays.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Why use the five-number summary instead of mean and standard deviation?</h4>
            <p className="text-sm text-muted-foreground">
              The five-number summary works better for skewed distributions and datasets with outliers. The median and IQR are resistant to extreme values, while the mean and standard deviation can be heavily influenced by them.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I handle even vs odd sample sizes?</h4>
            <p className="text-sm text-muted-foreground">
              For the median: even n means averaging the two middle values; odd n means taking the middle value. For quartiles: exclude the median from both halves when n is odd. When n is even, split the data cleanly in half.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What does the IQR tell me?</h4>
            <p className="text-sm text-muted-foreground">
              The IQR shows how spread out the middle 50% of your data is. A small IQR means values cluster tightly around the median. A large IQR indicates more variability. It's also used to identify outliers.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can the five-number summary detect skewness?</h4>
            <p className="text-sm text-muted-foreground">
              Yes. Compare the distances: if (Q3 - Median) is much larger than (Median - Q1), the data is right-skewed. If the opposite, it's left-skewed. Similar distances suggest symmetry.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the minimum sample size needed?</h4>
            <p className="text-sm text-muted-foreground">
              Technically you need at least 4 values to calculate all five numbers meaningfully. However, the summary becomes more informative with larger samples. Aim for at least 10-15 values for reliable quartiles.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I use this for box plots?</h4>
            <p className="text-sm text-muted-foreground">
              The five-number summary directly creates a box plot. The box spans from Q1 to Q3 with a line at the median. Whiskers extend to the minimum and maximum (or to the fences if showing outliers).
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/mean-median-mode-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Mean Median Mode</p>
            <p className="text-xs text-muted-foreground">Central tendency measures</p>
          </a>
          <a href="/math-tools/standard-deviation-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Standard Deviation</p>
            <p className="text-xs text-muted-foreground">Measure of spread</p>
          </a>
          <a href="/math-tools/box-plot-maker" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Box Plot Maker</p>
            <p className="text-xs text-muted-foreground">Visualize distributions</p>
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
