"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface WeightedEntry {
  id: number;
  value: string;
  weight: string;
}

export default function WeightedAverageCalculator() {
  const [entries, setEntries] = useState<WeightedEntry[]>([
    { id: 1, value: "", weight: "" },
    { id: 2, value: "", weight: "" },
    { id: 3, value: "", weight: "" },
  ]);
  const [result, setResult] = useState<number | null>(null);
  const [steps, setSteps] = useState<string[]>([]);

  const addEntry = () => {
    setEntries([...entries, { id: Date.now(), value: "", weight: "" }]);
  };

  const removeEntry = (id: number) => {
    if (entries.length > 2) {
      setEntries(entries.filter((e) => e.id !== id));
    }
  };

  const updateEntry = (id: number, field: "value" | "weight", val: string) => {
    setEntries(entries.map((e) => (e.id === id ? { ...e, [field]: val } : e)));
  };

  const calculate = () => {
    const validEntries = entries.filter(
      (e) => e.value && e.weight && !isNaN(parseFloat(e.value)) && !isNaN(parseFloat(e.weight))
    );

    if (validEntries.length === 0) {
      setResult(null);
      setSteps(["Please enter at least one valid value and weight"]);
      return;
    }

    const sumOfProducts = validEntries.reduce((sum, e) => sum + parseFloat(e.value) * parseFloat(e.weight), 0);
    const sumOfWeights = validEntries.reduce((sum, e) => sum + parseFloat(e.weight), 0);

    if (sumOfWeights === 0) {
      setResult(null);
      setSteps(["Sum of weights cannot be zero"]);
      return;
    }

    const weightedAverage = sumOfProducts / sumOfWeights;

    const calculationSteps = [
      "Formula: Weighted Average = Σ(value × weight) / Σ(weights)",
      "",
      "Step 1: Multiply each value by its weight:",
      ...validEntries.map((e) => `  ${e.value} × ${e.weight} = ${(parseFloat(e.value) * parseFloat(e.weight)).toFixed(4)}`),
      "",
      `Step 2: Sum of (value × weight) = ${sumOfProducts.toFixed(4)}`,
      `Step 3: Sum of weights = ${sumOfWeights.toFixed(4)}`,
      "",
      `Step 4: Weighted Average = ${sumOfProducts.toFixed(4)} / ${sumOfWeights.toFixed(4)} = ${weightedAverage.toFixed(4)}`,
    ];

    setResult(weightedAverage);
    setSteps(calculationSteps);
  };

  const reset = () => {
    setEntries([
      { id: 1, value: "", weight: "" },
      { id: 2, value: "", weight: "" },
      { id: 3, value: "", weight: "" },
    ]);
    setResult(null);
    setSteps([]);
  };

  const loadExample = () => {
    setEntries([
      { id: 1, value: "85", weight: "30" },
      { id: 2, value: "90", weight: "50" },
      { id: 3, value: "78", weight: "20" },
    ]);
    setResult(null);
    setSteps([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Weighted Average Calculator – Compute Weighted Mean Online</h1>
        <p className="text-muted-foreground">
          Calculate the weighted average or weighted mean of any set of values with our free online calculator. Enter values and weights to get the accurate weighted result instantly.
        </p>
      </div>

      <div className="space-y-4">
        <div className="border rounded-lg overflow-hidden">
          <div className="grid grid-cols-12 gap-2 p-3 bg-muted font-semibold text-sm">
            <div className="col-span-1">#</div>
            <div className="col-span-4">Value</div>
            <div className="col-span-4">Weight</div>
            <div className="col-span-3"></div>
          </div>
          {entries.map((entry, index) => (
            <div key={entry.id} className="grid grid-cols-12 gap-2 p-3 items-center border-t">
              <div className="col-span-1 text-muted-foreground">{index + 1}</div>
              <div className="col-span-4">
                <Input
                  type="number"
                  placeholder="Enter value"
                  value={entry.value}
                  onChange={(e) => updateEntry(entry.id, "value", e.target.value)}
                />
              </div>
              <div className="col-span-4">
                <Input
                  type="number"
                  placeholder="Enter weight"
                  value={entry.weight}
                  onChange={(e) => updateEntry(entry.id, "weight", e.target.value)}
                />
              </div>
              <div className="col-span-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEntry(entry.id)}
                  disabled={entries.length <= 2}
                  className="text-destructive hover:text-destructive"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Button onClick={addEntry}>+ Add Row</Button>
          <Button onClick={calculate}>Calculate</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={loadExample}>Load Example</Button>
        </div>

        {result !== null && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">Weighted Average</p>
              <p className="text-4xl font-bold">{result.toFixed(4)}</p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Calculation Steps</h4>
              <div className="font-mono text-sm space-y-1 whitespace-pre-wrap">
                {steps.map((step, i) => (
                  <div key={i}>{step}</div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-16 space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">How the Weighted Average Calculator Works</h2>
          <p className="text-muted-foreground mb-4">
            A weighted average (or weighted mean) gives different importance (weights) to different values. Unlike a simple average where all values count equally, a weighted average lets some values contribute more to the final result based on their assigned weights.
          </p>
          <p className="text-muted-foreground mb-4">
            The formula is:
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            Weighted Average = (v₁×w₁ + v₂×w₂ + ... + vₙ×wₙ) / (w₁ + w₂ + ... + wₙ)
          </div>
          <p className="text-muted-foreground mb-4">
            Where v represents values and w represents their corresponding weights. The calculator multiplies each value by its weight, sums these products, then divides by the sum of all weights.
          </p>
          <p className="text-muted-foreground">
            Weights can be percentages, counts, or any positive numbers. If all weights are equal, the weighted average equals the simple arithmetic mean.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Example Weighted Average Calculations</h2>
          
          <h3 className="text-xl font-semibold mb-3 mt-6">Course Grade Calculation</h3>
          <p className="text-muted-foreground mb-2">
            Calculate final grade with different assignment weights:
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <p>Homework (20%): 85</p>
            <p>Midterm (30%): 90</p>
            <p>Final Exam (50%): 78</p>
            <p className="mt-2">Calculation:</p>
            <p>(85×0.20 + 90×0.30 + 78×0.50) / (0.20 + 0.30 + 0.50)</p>
            <p>= (17 + 27 + 39) / 1.0 = 83 / 1.0 = <strong>83.0</strong></p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">Investment Portfolio Return</h3>
          <p className="text-muted-foreground mb-2">
            Weighted average return across different investments:
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <p>Stock A ($10,000): 8% return</p>
            <p>Stock B ($25,000): 12% return</p>
            <p>Bond ($15,000): 4% return</p>
            <p className="mt-2">Total invested: $50,000</p>
            <p>Weights: 0.20, 0.50, 0.30</p>
            <p className="mt-2">Weighted return:</p>
            <p>(8×0.20 + 12×0.50 + 4×0.30) = 1.6 + 6.0 + 1.2 = <strong>8.8%</strong></p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">GPA Calculation</h3>
          <p className="text-muted-foreground mb-2">
            Grade points weighted by credit hours:
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <p>Math (4 credits): A = 4.0</p>
            <p>English (3 credits): B = 3.0</p>
            <p>Science (4 credits): A- = 3.7</p>
            <p>History (3 credits): B+ = 3.3</p>
            <p className="mt-2">GPA = (4×4.0 + 3×3.0 + 4×3.7 + 3×3.3) / 14</p>
            <p>= (16 + 9 + 14.8 + 9.9) / 14 = 49.7 / 14 = <strong>3.55</strong></p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">Average Price per Share</h3>
          <p className="text-muted-foreground mb-2">
            Dollar-cost averaging example:
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <p>Month 1: 100 shares @ $50</p>
            <p>Month 2: 150 shares @ $45</p>
            <p>Month 3: 200 shares @ $55</p>
            <p className="mt-2">Avg price = (100×50 + 150×45 + 200×55) / 450</p>
            <p>= (5000 + 6750 + 11000) / 450 = 22750 / 450 = <strong>$50.56</strong></p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Quick Fact: Weighted Averages in History</h2>
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-6 rounded-lg">
            <p className="text-muted-foreground">
              The concept of weighted averages dates back to at least the 16th century, when navigators used weighted means to combine multiple celestial observations for more accurate position fixes. In 1743, mathematician <strong>Roger Cotes</strong> (who worked with Newton) described using weighted averages to combine measurements with different precisions. The method became essential in astronomy and geodesy, where observations had varying reliability. Today, weighted averages are fundamental in statistics, finance (portfolio theory), economics (price indices like CPI), and machine learning (ensemble methods). The S&amp;P 500 stock index itself is a weighted average, with larger companies having more influence.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">When should I use weighted average instead of regular average?</h3>
              <p className="text-muted-foreground">
                Use weighted average when some values matter more than others. Examples: course grades (exams count more than homework), investment returns (larger investments have more impact), or survey results (weighting by population demographics). If all values are equally important, use a simple average.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Do the weights need to add up to 1 (or 100%)?</h3>
              <p className="text-muted-foreground">
                No, weights can be any positive numbers. The formula divides by the sum of weights, so it automatically normalizes. Using percentages (summing to 100%) or proportions (summing to 1) is convenient but not required. Credit hours, dollar amounts, or frequencies all work as weights.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Can weights be negative?</h3>
              <p className="text-muted-foreground">
                In standard weighted averages, weights should be non-negative. Negative weights can produce counterintuitive results and aren't meaningful in most applications. If you need to subtract values, do that before calculating the weighted average, not through negative weights.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What's the difference between weighted mean and arithmetic mean?</h3>
              <p className="text-muted-foreground">
                The arithmetic mean gives equal weight to all values: (a + b + c) / 3. The weighted mean multiplies each value by its weight before averaging. When all weights are equal, the weighted mean equals the arithmetic mean. Weighted mean is more flexible for real-world scenarios.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How is weighted average used in finance?</h3>
              <p className="text-muted-foreground">
                Finance relies heavily on weighted averages: portfolio returns (weighted by investment size), WACC (weighted average cost of capital), EPS calculations (weighted by shares outstanding), and index funds (weighted by market cap). It's essential for accurate financial analysis.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What happens if all weights are the same?</h3>
              <p className="text-muted-foreground">
                If all weights equal the same value, the weighted average simplifies to the regular arithmetic mean. For example, with weights of 1, 1, 1: the formula becomes (v₁ + v₂ + v₃) / 3. This shows that simple averaging is a special case of weighted averaging.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Can I use this for time-weighted calculations?</h3>
              <p className="text-muted-foreground">
                Yes! Time-weighted averages use time periods as weights. For example, if a temperature was 20°C for 3 hours and 30°C for 1 hour, the time-weighted average is (20×3 + 30×1) / 4 = 22.5°C, not the simple average of 25°C.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/math-tools/mean-median-mode-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-2">Mean, Median, Mode Calculator</h3>
              <p className="text-sm text-muted-foreground">Calculate measures of central tendency for data sets.</p>
            </a>
            <a href="/math-tools/standard-deviation-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-2">Standard Deviation Calculator</h3>
              <p className="text-sm text-muted-foreground">Measure the spread or variability of your data.</p>
            </a>
            <a href="/math-tools/gpa-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-2">GPA Calculator</h3>
              <p className="text-sm text-muted-foreground">Calculate grade point average weighted by credit hours.</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
