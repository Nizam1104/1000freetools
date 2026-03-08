"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface FrequencyRow {
  value: number;
  frequency: number;
  relativeFrequency: number;
  cumulativeFrequency: number;
}

export default function FrequencyDistributionTable() {
  const [input, setInput] = useState("");
  const [numBins, setNumBins] = useState<number>(5);
  const [result, setResult] = useState<{
    rows: FrequencyRow[];
    total: number;
    min: number;
    max: number;
    range: number;
    binWidth: number;
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

    if (numbers.length < numBins) {
      setError(`Please enter at least ${numBins} numbers for ${numBins} bins`);
      return;
    }

    const sorted = [...numbers].sort((a, b) => a - b);
    const n = numbers.length;
    const min = sorted[0];
    const max = sorted[n - 1];
    const range = max - min;
    const binWidth = range / numBins;

    // Create bins
    const bins: { lower: number; upper: number; count: number }[] = [];
    for (let i = 0; i < numBins; i++) {
      bins.push({
        lower: min + i * binWidth,
        upper: min + (i + 1) * binWidth,
        count: 0,
      });
    }

    // Count frequencies
    numbers.forEach((num) => {
      let binIndex = Math.floor((num - min) / binWidth);
      if (binIndex >= numBins) binIndex = numBins - 1; // Handle max value
      bins[binIndex].count++;
    });

    // Build frequency table
    const rows: FrequencyRow[] = [];
    let cumulativeFreq = 0;
    bins.forEach((bin) => {
      const relativeFreq = bin.count / n;
      cumulativeFreq += bin.count;
      rows.push({
        value: bin.lower,
        frequency: bin.count,
        relativeFrequency: relativeFreq,
        cumulativeFrequency: cumulativeFreq,
      });
    });

    const calculationSteps = [
      "Step 1: Sort the data",
      `  Min = ${min}, Max = ${max}`,
      "",
      "Step 2: Calculate range",
      `  Range = Max - Min = ${max} - ${min} = ${range}`,
      "",
      `Step 3: Determine bin width (${numBins} bins)`,
      `  Bin Width = Range / Number of Bins = ${range} / ${numBins} = ${binWidth.toFixed(4)}`,
      "",
      "Step 4: Create bins and count frequencies",
      ...bins.map((bin, i) => `  Bin ${i + 1}: [${bin.lower.toFixed(2)}, ${bin.upper.toFixed(2)}) = ${bin.count} values`),
      "",
      "Step 5: Calculate relative frequencies",
      "  Relative Frequency = Frequency / Total Count",
      "",
      "Step 6: Calculate cumulative frequencies",
      "  Cumulative Frequency = Running total of frequencies",
    ];

    setResult({ rows, total: n, min, max, range, binWidth });
    setSteps(calculationSteps);
  };

  const reset = () => {
    setInput("");
    setResult(null);
    setSteps([]);
    setError("");
  };

  const loadExample = () => {
    setInput("45, 52, 38, 49, 55, 42, 48, 51, 39, 47, 53, 44, 50, 46, 41, 54, 43, 48, 52, 40");
    setNumBins(5);
    setResult(null);
    setSteps([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Frequency Distribution Table Generator – Organize Data Online</h1>
        <p className="text-muted-foreground">
          Create a complete frequency distribution table from any dataset with our free online tool. Includes frequency, relative frequency, and cumulative frequency for easy data analysis.
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
        </div>

        <div>
          <Label>Number of Bins (Classes)</Label>
          <Input
            type="number"
            min={2}
            max={20}
            value={numBins}
            onChange={(e) => setNumBins(parseInt(e.target.value) || 5)}
            className="w-32"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Recommended: 5-10 bins for most datasets
          </p>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Generate Frequency Table</Button>
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
                <p className="text-xs text-muted-foreground mb-1">Total Values</p>
                <p className="text-2xl font-bold">{result.total}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-xs text-muted-foreground mb-1">Minimum</p>
                <p className="text-2xl font-bold">{result.min}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-xs text-muted-foreground mb-1">Maximum</p>
                <p className="text-2xl font-bold">{result.max}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-xs text-muted-foreground mb-1">Range</p>
                <p className="text-2xl font-bold">{result.range.toFixed(2)}</p>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="p-3 text-left">Class Interval</th>
                    <th className="p-3 text-center">Frequency</th>
                    <th className="p-3 text-center">Relative Freq</th>
                    <th className="p-3 text-center">Cumulative Freq</th>
                    <th className="p-3 text-center">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {result.rows.map((row, i) => (
                    <tr key={i} className="border-t">
                      <td className="p-3 font-mono">
                        [{row.value.toFixed(2)}, {(row.value + result.binWidth).toFixed(2)})
                      </td>
                      <td className="p-3 text-center font-semibold">{row.frequency}</td>
                      <td className="p-3 text-center">{row.relativeFrequency.toFixed(4)}</td>
                      <td className="p-3 text-center">{row.cumulativeFrequency}</td>
                      <td className="p-3 text-center">{(row.relativeFrequency * 100).toFixed(1)}%</td>
                    </tr>
                  ))}
                  <tr className="bg-muted font-semibold">
                    <td className="p-3">Total</td>
                    <td className="p-3 text-center">{result.total}</td>
                    <td className="p-3 text-center">1.0000</td>
                    <td className="p-3 text-center">-</td>
                    <td className="p-3 text-center">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Frequency Histogram</h4>
              <div className="space-y-2">
                {result.rows.map((row, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-24 font-mono">
                      [{row.value.toFixed(0)}, {(row.value + result.binWidth).toFixed(0)})
                    </span>
                    <div className="flex-1 bg-muted rounded h-6 relative">
                      <div
                        className="h-full bg-primary rounded"
                        style={{ width: `${(row.frequency / result.total) * 100}%` }}
                      />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold">
                        {row.frequency}
                      </span>
                    </div>
                  </div>
                ))}
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
          </div>
        )}
      </div>

    </div>
  );
}
