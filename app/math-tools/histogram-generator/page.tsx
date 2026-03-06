"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function HistogramGenerator() {
  const [data, setData] = useState("");
  const [numBins, setNumBins] = useState("auto");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setResult(null);

    const values = data.split(/[\n,\s]+/).filter(s => s.trim()).map(Number);

    if (values.length < 3) {
      setError("Please enter at least 3 data points");
      return;
    }

    if (values.some(isNaN)) {
      setError("Please enter valid numbers only");
      return;
    }

    const min = Math.min(...values);
    const max = Math.max(...values);
    const n = values.length;

    let bins = 5;
    if (numBins === "auto") {
      bins = Math.ceil(Math.sqrt(n));
      bins = Math.max(5, Math.min(bins, 20));
    } else {
      bins = parseInt(numBins);
      bins = Math.max(2, Math.min(bins, 50));
    }

    const binWidth = (max - min) / bins;
    const binEdges: number[] = [];
    const frequencies: number[] = [];

    for (let i = 0; i <= bins; i++) {
      binEdges.push(min + i * binWidth);
      frequencies.push(0);
    }

    for (const value of values) {
      let binIndex = Math.floor((value - min) / binWidth);
      if (binIndex >= bins) binIndex = bins - 1;
      frequencies[binIndex]++;
    }

    const maxFreq = Math.max(...frequencies);
    const relativeFrequencies = frequencies.map(f => f / n);
    const cumulativeFrequencies = frequencies.reduce((acc: number[], f) => {
      acc.push((acc.length > 0 ? acc[acc.length - 1] : 0) + f);
      return acc;
    }, []);

    const mean = values.reduce((a, b) => a + b, 0) / n;
    const sortedValues = [...values].sort((a, b) => a - b);
    const median = n % 2 === 0 
      ? (sortedValues[n/2 - 1] + sortedValues[n/2]) / 2 
      : sortedValues[Math.floor(n/2)];

    setResult({
      bins,
      binWidth: Math.round(binWidth * 10000) / 10000,
      min,
      max,
      n,
      mean: Math.round(mean * 10000) / 10000,
      median: Math.round(median * 10000) / 10000,
      binEdges,
      frequencies,
      relativeFrequencies: relativeFrequencies.map(f => Math.round(f * 10000) / 10000),
      cumulativeFrequencies,
      maxFreq,
      histogramBars: frequencies.map((freq, i) => ({
        label: `${binEdges[i].toFixed(2)} - ${binEdges[i + 1].toFixed(2)}`,
        frequency: freq,
        relativeFrequency: Math.round(relativeFrequencies[i] * 10000) / 10000,
        height: (freq / maxFreq) * 100
      }))
    });
  };

  const reset = () => {
    setData("");
    setNumBins("auto");
    setResult(null);
    setError("");
  };

  const loadExample = () => {
    setData("65, 72, 78, 81, 85, 68, 73, 79, 82, 88, 70, 75, 80, 84, 90, 67, 74, 77, 83, 87, 69, 71, 76, 81, 86, 64, 73, 78, 82, 89");
    setNumBins("auto");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Histogram Generator – Create Histograms Online Free</h1>
        <p className="text-muted-foreground">
          Create professional histograms from any dataset with our free online histogram generator. Customize bin sizes and view frequency distributions as visual bar charts instantly.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Data Values</Label>
          <Textarea
            placeholder="Enter numbers separated by commas, spaces, or newlines"
            value={data}
            onChange={(e) => setData(e.target.value)}
            rows={5}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Number of Bins</Label>
            <Input
              type="number"
              placeholder="Auto"
              value={numBins}
              onChange={(e) => setNumBins(e.target.value)}
              min="2"
              max="50"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Leave empty for automatic (Sturges' formula)
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Generate Histogram</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={loadExample}>Load Example</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Data Points</p>
                <p className="text-2xl font-bold">{result.n}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Min</p>
                <p className="text-xl font-semibold">{result.min}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Max</p>
                <p className="text-xl font-semibold">{result.max}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Bins</p>
                <p className="text-xl font-semibold">{result.bins}</p>
              </div>
            </div>

            <div className="p-6 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-4">Histogram</h4>
              <div className="flex items-end gap-1 h-48 border-b border-l border-border pl-8 pb-2">
                {result.histogramBars.map((bar: any, i: number) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-primary rounded-t transition-all"
                      style={{ height: `${bar.height}%` }}
                      title={`${bar.label}: ${bar.frequency}`}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>{result.min}</span>
                <span>{result.max}</span>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Frequency Distribution Table</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3">Bin Range</th>
                      <th className="text-center py-2 px-3">Frequency</th>
                      <th className="text-center py-2 px-3">Relative Freq</th>
                      <th className="text-center py-2 px-3">Cumulative Freq</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.histogramBars.map((bar: any, i: number) => (
                      <tr key={i} className="border-b">
                        <td className="py-2 px-3 font-mono text-xs">{bar.label}</td>
                        <td className="py-2 px-3 text-center">{bar.frequency}</td>
                        <td className="py-2 px-3 text-center">{(bar.relativeFrequency * 100).toFixed(1)}%</td>
                        <td className="py-2 px-3 text-center">{result.cumulativeFrequencies[i]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Mean</p>
                <p className="text-xl font-semibold">{result.mean}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Median</p>
                <p className="text-xl font-semibold">{result.median}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">What is a Histogram?</h2>
        <p className="text-muted-foreground">
          A histogram is a bar chart that shows the distribution of numerical data. Unlike a regular bar chart, histogram bars represent ranges of values (bins) rather than categories. The height of each bar shows how many data points fall within that range.
        </p>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium mb-2">When to Use a Histogram</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• To see the shape of your data distribution (normal, skewed, bimodal)</li>
            <li>• To identify outliers or gaps in your data</li>
            <li>• To understand the spread and central tendency</li>
            <li>• To check if data meets assumptions for statistical tests</li>
          </ul>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Choosing the Right Number of Bins</h2>
        <p className="text-muted-foreground">
          Too few bins hide important patterns; too many bins create noise. Common rules:
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Square Root Rule</h3>
            <p className="text-sm text-muted-foreground">
              Bins = √n. Simple and works well for most datasets.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Sturges' Formula</h3>
            <p className="text-sm text-muted-foreground">
              Bins = 1 + 3.322 × log₁₀(n). Good for normal distributions.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Freedman-Diaconis</h3>
            <p className="text-sm text-muted-foreground">
              Bin width = 2 × IQR / n^(1/3). Best for skewed data.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Reading a Histogram</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Symmetric (Normal)</h3>
            <p className="text-sm text-muted-foreground">
              Bell-shaped with most values in the middle. Mean ≈ median. Common in natural phenomena like heights and test scores.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Right Skewed (Positive)</h3>
            <p className="text-sm text-muted-foreground">
              Long tail on the right. Mean &gt; median. Common in income data and reaction times.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Left Skewed (Negative)</h3>
            <p className="text-sm text-muted-foreground">
              Long tail on the left. Mean &lt; median. Seen in age at retirement or easy test scores.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Bimodal</h3>
            <p className="text-sm text-muted-foreground">
              Two peaks suggest two different groups mixed together. Example: heights of men and women combined.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div>
          <h3 className="font-semibold mb-2">What's the difference between a histogram and a bar chart?</h3>
          <p className="text-sm text-muted-foreground">
            Histograms show continuous numerical data grouped into bins; bar charts show categorical data. Histogram bars touch each other (continuous scale); bar chart bars are separated.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">How do I interpret the y-axis?</h3>
          <p className="text-sm text-muted-foreground">
            The y-axis shows frequency (count) or relative frequency (percentage). Each bar's height tells you how many data points fall within that bin's range.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Can I use a histogram for categorical data?</h3>
          <p className="text-sm text-muted-foreground">
            No. Use a bar chart for categorical data. Histograms require numerical data that can be ordered and divided into ranges.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What does a flat histogram mean?</h3>
          <p className="text-sm text-muted-foreground">
            A uniform or flat histogram means data is evenly distributed across all ranges. This suggests no particular values are more common than others.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Why are some bins empty?</h3>
          <p className="text-sm text-muted-foreground">
            Empty bins indicate gaps in your data—no values fall within those ranges. This could be normal variation or indicate something interesting about your data.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/box-plot-generator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Box Plot Generator</p>
            <p className="text-xs text-muted-foreground">Five-number summary</p>
          </a>
          <a href="/math-tools/frequency-distribution-table" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Frequency Table</p>
            <p className="text-xs text-muted-foreground">Organize data</p>
          </a>
          <a href="/math-tools/mean-median-mode-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Mean, Median, Mode</p>
            <p className="text-xs text-muted-foreground">Central tendency</p>
          </a>
        </div>
      </section>
    </div>
  );
}
