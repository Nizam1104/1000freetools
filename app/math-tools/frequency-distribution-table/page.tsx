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

    const bins: { lower: number; upper: number; count: number }[] = [];
    for (let i = 0; i < numBins; i++) {
      bins.push({
        lower: min + i * binWidth,
        upper: min + (i + 1) * binWidth,
        count: 0,
      });
    }

    numbers.forEach((num) => {
      let binIndex = Math.floor((num - min) / binWidth);
      if (binIndex >= numBins) binIndex = numBins - 1;
      bins[binIndex].count++;
    });

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

  const loadExample = (data: string, bins: number) => {
    setInput(data);
    setNumBins(bins);
    setResult(null);
    setSteps([]);
  };

  const examples = [
    { name: "Test scores", data: "45, 52, 38, 49, 55, 42, 48, 51, 39, 47, 53, 44, 50, 46, 41, 54, 43, 48, 52, 40", bins: 5 },
    { name: "Ages", data: "12, 15, 18, 22, 25, 28, 32, 35, 38, 42, 45, 48, 52, 55, 58, 62, 65, 68, 72, 75", bins: 6 },
    { name: "Weights", data: "100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400", bins: 8 },
    { name: "Measurements", data: "5.2, 6.1, 7.3, 8.4, 5.8, 6.5, 7.9, 8.1, 5.5, 6.8, 7.2, 8.6, 5.9, 6.3, 7.7", bins: 5 },
    { name: "Temperatures", data: "23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61", bins: 7 },
  ];

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
            max={100}
            value={numBins}
            onChange={(e) => setNumBins(parseInt(e.target.value) || 5)}
            className="w-32"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Recommended: 5-10 bins for most datasets
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculate}>Generate Frequency Table</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground self-center">Examples:</span>
          {examples.map((ex, i) => (
            <Button key={i} variant="ghost" size="sm" onClick={() => loadExample(ex.data, ex.bins)}>{ex.name}</Button>
          ))}
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

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Frequency Distribution Tables</h2>
        <p className="text-muted-foreground">
          A frequency distribution table organizes raw data into groups called classes or bins. Instead of looking at individual values, you see how many data points fall into each range. This makes patterns in large datasets much easier to spot.
        </p>
        <p className="text-muted-foreground">
          The table shows several useful columns. Frequency counts how many values land in each bin. Relative frequency expresses this as a proportion of the total. Cumulative frequency keeps a running total, showing how many values fall below each bin's upper boundary.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">How to Create a Frequency Distribution Table</h3>
        <div className="p-6 bg-muted rounded-lg">
          <ol className="space-y-4 text-sm">
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">1</span>
              <div>
                <p className="font-semibold mb-1">Find the range</p>
                <p className="text-muted-foreground">
                  Subtract the minimum value from the maximum value. This tells you the total spread of your data.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">2</span>
              <div>
                <p className="font-semibold mb-1">Choose the number of bins</p>
                <p className="text-muted-foreground">
                  For most datasets, 5 to 10 bins work well. Too few bins hide patterns. Too many bins make the table hard to read.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">3</span>
              <div>
                <p className="font-semibold mb-1">Calculate bin width</p>
                <p className="text-muted-foreground">
                  Divide the range by the number of bins. Round up to a convenient number if needed.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">4</span>
              <div>
                <p className="font-semibold mb-1">Create the bins</p>
                <p className="text-muted-foreground">
                  Start at the minimum value and add the bin width repeatedly to create non-overlapping intervals.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">5</span>
              <div>
                <p className="font-semibold mb-1">Count frequencies</p>
                <p className="text-muted-foreground">
                  Tally how many data points fall into each bin. Each value goes into exactly one bin.
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
            <h4 className="font-semibold text-sm mb-3">Example 1: Test Scores (20 students)</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Data: 45, 52, 38, 49, 55, 42, 48, 51, 39, 47, 53, 44, 50, 46, 41, 54, 43, 48, 52, 40</div>
              <div>Min = 38, Max = 55</div>
              <div>Range = 55 - 38 = 17</div>
              <div>Using 5 bins: Bin width = 17/5 = 3.4</div>
              <div>Bins: [38-41.4), [41.4-44.8), [44.8-48.2), [48.2-51.6), [51.6-55]</div>
              <div className="text-muted-foreground mt-2">Count values in each bin to get frequencies</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: Choosing Bin Numbers</h4>
            <div className="text-sm space-y-2">
              <p>Sturges' formula suggests: bins = 1 + 3.322 × log₁₀(n)</p>
              <p>For n = 100: bins ≈ 1 + 3.322 × 2 = 7.6 ≈ 8 bins</p>
              <p>For n = 50: bins ≈ 1 + 3.322 × 1.7 = 6.6 ≈ 7 bins</p>
              <p className="text-muted-foreground mt-2">This formula gives a good starting point for most datasets.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: Interpreting Relative Frequency</h4>
            <div className="font-mono text-sm space-y-2">
              <div>If 15 out of 60 values fall in a bin:</div>
              <div>Relative frequency = 15/60 = 0.25</div>
              <div>Percentage = 0.25 × 100 = 25%</div>
              <div className="text-muted-foreground mt-2">This means 25% of all data falls in this range.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h4 className="font-semibold text-sm mb-2 text-amber-800">Quick Fact</h4>
          <p className="text-sm text-amber-700">
            Florence Nightingale was a pioneer in using frequency distributions and visual statistics. During the Crimean War, she created "coxcomb" diagrams (early pie charts) showing that most soldier deaths were from disease, not battle wounds. Her statistical work revolutionized military medicine.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">How many bins should I use?</h4>
            <p className="text-sm text-muted-foreground">
              For small datasets (under 50 values), use 5-7 bins. For medium datasets (50-200), use 7-10 bins. For large datasets, you can use more. Sturges' formula gives a mathematical guideline, but adjust based on what reveals patterns best.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if a value falls exactly on a bin boundary?</h4>
            <p className="text-sm text-muted-foreground">
              By convention, the left boundary is inclusive and the right is exclusive. So [40-50) includes 40 but not 50. The value 50 goes in the next bin [50-60). This prevents double-counting.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">When should I use relative frequency?</h4>
            <p className="text-sm text-muted-foreground">
              Use relative frequency when comparing datasets of different sizes. It converts counts to proportions, making fair comparisons possible. A frequency of 10 means different things in datasets of 20 vs 200 values.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What does cumulative frequency tell me?</h4>
            <p className="text-sm text-muted-foreground">
              Cumulative frequency shows how many values fall at or below each bin. It's useful for finding percentiles and answering questions like "What percentage scored below 70?"
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I use unequal bin widths?</h4>
            <p className="text-sm text-muted-foreground">
              Yes, but it's more complex. With unequal bins, you need to use frequency density (frequency divided by bin width) for accurate histograms. Equal-width bins are simpler and work for most purposes.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference from a histogram?</h4>
            <p className="text-sm text-muted-foreground">
              A frequency distribution table shows the numbers. A histogram is the visual representation of that table using bars. The table gives precise values; the histogram shows patterns at a glance.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/histogram-generator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Histogram Generator</p>
            <p className="text-xs text-muted-foreground">Visual frequency display</p>
          </a>
          <a href="/math-tools/mean-median-mode-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Mean Median Mode</p>
            <p className="text-xs text-muted-foreground">Central tendency</p>
          </a>
          <a href="/math-tools/standard-deviation-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Standard Deviation</p>
            <p className="text-xs text-muted-foreground">Measure of spread</p>
          </a>
        </div>
      </section>
    </div>
  );
}
