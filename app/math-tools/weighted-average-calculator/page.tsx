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

    </div>
  );
}
