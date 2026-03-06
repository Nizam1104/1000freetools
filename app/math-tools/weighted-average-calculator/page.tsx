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

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">What is Weighted Average?</h2>
        <p className="text-muted-foreground">
          A weighted average is a type of mean where each value contributes differently to the final result based on its assigned weight. Unlike a simple average where all values count equally, weighted averages reflect the relative importance of each value.
        </p>
        <p className="text-muted-foreground">
          Weighted averages are commonly used in grading (assignments with different point values), finance (portfolio returns), statistics (survey data), and many other fields where not all data points have equal significance.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Weighted Average Formula</h2>
        <div className="p-4 border rounded-lg">
          <code className="text-lg font-mono bg-muted px-3 py-2 rounded block">
            Weighted Average = (v₁×w₁ + v₂×w₂ + ... + vₙ×wₙ) / (w₁ + w₂ + ... + wₙ)
          </code>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-muted rounded">
              <p className="font-semibold text-sm">v₁, v₂, ... vₙ</p>
              <p className="text-xs text-muted-foreground">The values in your dataset</p>
            </div>
            <div className="p-3 bg-muted rounded">
              <p className="font-semibold text-sm">w₁, w₂, ... wₙ</p>
              <p className="text-xs text-muted-foreground">The corresponding weights</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Real-World Examples</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Grade Calculation</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Final grade with weighted components: Homework 30%, Midterm 50%, Final 20%
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              Scores: Homework=85, Midterm=90, Final=78<br />
              Weighted Avg = (85×30 + 90×50 + 78×20) / (30+50+20)<br />
              = (2550 + 4500 + 1560) / 100 = 86.1
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Investment Portfolio</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Portfolio returns weighted by investment amount
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              Stock A: $10,000 at 8% return<br />
              Stock B: $20,000 at 12% return<br />
              Weighted Return = (8×10000 + 12×20000) / 30000 = 10.67%
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Product Rating</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Average rating weighted by number of reviews
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              Store A: 4.5 stars (100 reviews)<br />
              Store B: 4.0 stars (500 reviews)<br />
              Weighted Avg = (4.5×100 + 4.0×500) / 600 = 4.08 stars
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">When should I use weighted average?</h3>
            <p className="text-sm text-muted-foreground">
              Use weighted average when values have different levels of importance or represent different quantities. Common examples include grade calculations, financial portfolios, and survey analysis.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Do weights need to add up to 100?</h3>
            <p className="text-sm text-muted-foreground">
              No, weights don't need to sum to 100 or 1. The formula automatically normalizes by dividing by the sum of weights. You can use percentages, raw numbers, or any consistent scale.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What if all weights are equal?</h3>
            <p className="text-sm text-muted-foreground">
              If all weights are the same, the weighted average equals the simple arithmetic mean. Each value contributes equally to the result.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Can weights be negative?</h3>
            <p className="text-sm text-muted-foreground">
              Technically yes, but negative weights are rare in practice and can lead to counterintuitive results. Most applications use positive weights only.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/average-mean-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Average/Mean Calculator</p>
            <p className="text-xs text-muted-foreground">Simple arithmetic mean</p>
          </a>
          <a href="/math-tools/geometric-mean-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Geometric Mean</p>
            <p className="text-xs text-muted-foreground">Multiplicative average</p>
          </a>
          <a href="/math-tools/harmonic-mean-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Harmonic Mean</p>
            <p className="text-xs text-muted-foreground">Average of rates</p>
          </a>
        </div>
      </section>
    </div>
  );
}
