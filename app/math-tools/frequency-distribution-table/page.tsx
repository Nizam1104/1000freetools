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

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">What is a Frequency Distribution Table?</h2>
        <p className="text-muted-foreground">
          A frequency distribution table organizes raw data into classes or intervals, showing how many values fall into each class. It transforms a long list of numbers into a clear summary that reveals patterns, central tendency, and spread.
        </p>
        <p className="text-muted-foreground">
          The table typically includes the class intervals, frequency (count), relative frequency (proportion), and cumulative frequency (running total). This format is essential for creating histograms and understanding data distribution.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Key Terms</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Frequency</h3>
            <p className="text-sm text-muted-foreground">
              The count of data values that fall within each class interval. The sum of all frequencies equals the total number of observations.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Relative Frequency</h3>
            <p className="text-sm text-muted-foreground">
              The proportion of values in each class, calculated as frequency divided by total count. Values range from 0 to 1 and sum to 1.0.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Cumulative Frequency</h3>
            <p className="text-sm text-muted-foreground">
              The running total of frequencies up to and including the current class. The final cumulative frequency equals the total count.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Class Width</h3>
            <p className="text-sm text-muted-foreground">
              The size of each interval, calculated as (max - min) / number of bins. All classes should have equal width for proper analysis.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Choosing Number of Bins</h2>
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-muted-foreground mb-4">
            The number of bins affects how your data is displayed. Too few bins oversimplify; too many create noise. Common guidelines:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-3 bg-muted rounded">
              <p className="font-semibold text-sm">Square Root Rule</p>
              <p className="text-sm">√n bins (e.g., √100 = 10 bins)</p>
            </div>
            <div className="p-3 bg-muted rounded">
              <p className="font-semibold text-sm">Sturges' Formula</p>
              <p className="text-sm">1 + 3.322 × log₁₀(n)</p>
            </div>
            <div className="p-3 bg-muted rounded">
              <p className="font-semibold text-sm">Rule of Thumb</p>
              <p className="text-sm">5-20 bins for most datasets</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How do I choose the right number of bins?</h3>
            <p className="text-sm text-muted-foreground">
              Start with √n (square root of sample size) or use Sturges' formula. Adjust based on your data - more bins for large datasets, fewer for small ones.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What's the difference between frequency and relative frequency?</h3>
            <p className="text-sm text-muted-foreground">
              Frequency is the raw count. Relative frequency is the proportion (frequency/total). Relative frequency allows comparison between datasets of different sizes.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">When should I use cumulative frequency?</h3>
            <p className="text-sm text-muted-foreground">
              Use cumulative frequency to find percentiles, determine what percentage falls below a value, or create ogive (cumulative frequency) graphs.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Can class intervals overlap?</h3>
            <p className="text-sm text-muted-foreground">
              No, class intervals should be mutually exclusive. Each data point should fall into exactly one bin. Use notation like [a, b) to show inclusive lower, exclusive upper bounds.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/histogram-generator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Histogram Generator</p>
            <p className="text-xs text-muted-foreground">Visual histogram</p>
          </a>
          <a href="/math-tools/mean-median-mode-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Mean, Median, Mode</p>
            <p className="text-xs text-muted-foreground">Central tendency</p>
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
