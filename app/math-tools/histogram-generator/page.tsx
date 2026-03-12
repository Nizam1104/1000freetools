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
      bins = Math.max(2, Math.min(bins, 100));
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

  const loadExample = (dataStr: string, bins: string) => {
    setData(dataStr);
    setNumBins(bins);
    setResult(null);
    setError("");
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
              max="100"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Leave empty for automatic (Sturges' formula)
            </p>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculate}>Generate Histogram</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("65, 72, 78, 81, 85, 68, 73, 79, 82, 88, 70, 75, 80, 84, 90, 67, 74, 77, 83, 87, 69, 71, 76, 81, 86, 64, 73, 78, 82, 89", "auto")}>Test scores</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("150, 155, 160, 162, 165, 168, 170, 172, 175, 178, 180, 182, 185, 188, 190, 192, 195, 198, 200, 205", "8")}>Heights</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("12, 15, 18, 22, 25, 28, 32, 35, 38, 42, 45, 48, 52, 55, 58, 62, 65, 68, 72, 75, 78, 82, 85, 88, 92", "10")}>Ages</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("5.2, 6.1, 7.3, 8.4, 5.8, 6.5, 7.9, 8.1, 5.5, 6.8, 7.2, 8.6, 5.9, 6.3, 7.7, 8.2, 5.4, 6.9, 7.5, 8.0", "6")}>Measurements</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1000, 1200, 1500, 1800, 2000, 2200, 2500, 2800, 3000, 3200, 3500, 3800, 4000, 4200, 4500, 4800, 5000", "auto")}>Salaries</Button>
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

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Histograms</h2>
        <p className="text-muted-foreground">
          A histogram is a graphical representation of data distribution. Unlike a bar chart that compares categories, a histogram shows how numerical data is distributed across continuous ranges called bins. The height of each bar represents how many data points fall within that range.
        </p>
        <p className="text-muted-foreground">
          Histograms reveal patterns that raw numbers hide. You can quickly see if data is symmetric or skewed, identify outliers, spot gaps or clusters, and understand the overall shape of the distribution. They're essential tools in statistics, quality control, and data analysis.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">How to Create a Histogram</h3>
        <div className="p-6 bg-muted rounded-lg">
          <ol className="space-y-4 text-sm">
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">1</span>
              <div>
                <p className="font-semibold mb-1">Collect and sort your data</p>
                <p className="text-muted-foreground">
                  Gather all values and find the minimum and maximum to determine the range.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">2</span>
              <div>
                <p className="font-semibold mb-1">Choose the number of bins</p>
                <p className="text-muted-foreground">
                  Too few bins hide patterns; too many create noise. For most datasets, 5-15 bins work well.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">3</span>
              <div>
                <p className="font-semibold mb-1">Calculate bin width</p>
                <p className="text-muted-foreground">
                  Bin width = (max - min) / number of bins. Round to a convenient number if needed.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">4</span>
              <div>
                <p className="font-semibold mb-1">Count frequencies</p>
                <p className="text-muted-foreground">
                  Tally how many values fall into each bin. Each value goes into exactly one bin.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">5</span>
              <div>
                <p className="font-semibold mb-1">Draw the histogram</p>
                <p className="text-muted-foreground">
                  Draw bars with heights proportional to frequencies. Bars touch each other (no gaps).
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
            <h4 className="font-semibold text-sm mb-3">Example 1: Test Scores Histogram</h4>
            <div className="text-sm space-y-2">
              <p>Data: 65, 72, 78, 81, 85, 68, 73, 79, 82, 88, 70, 75, 80, 84, 90 (15 scores)</p>
              <div className="font-mono">Min = 65, Max = 90, Range = 25</div>
              <div className="font-mono">Using 5 bins: Width = 25/5 = 5</div>
              <div className="font-mono">Bins: [65-70), [70-75), [75-80), [80-85), [85-90]</div>
              <div className="text-muted-foreground mt-2">Count scores in each bin to create the histogram.</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: Interpreting Histogram Shape</h4>
            <div className="text-sm space-y-2">
              <p><strong>Symmetric (bell-shaped):</strong> Data clusters in the middle, tails off equally on both sides. Normal distribution.</p>
              <p><strong>Right-skewed:</strong> Long tail on the right. Common in income data, house prices.</p>
              <p><strong>Left-skewed:</strong> Long tail on the left. Common in test scores with a ceiling effect.</p>
              <p><strong>Bimodal:</strong> Two peaks. May indicate two different populations mixed together.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: Choosing Bin Numbers</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Sturges' formula: bins = 1 + 3.322 × log₁₀(n)</div>
              <div>For n = 100: bins ≈ 1 + 3.322 × 2 = 7.6 ≈ 8 bins</div>
              <div>For n = 500: bins ≈ 1 + 3.322 × 2.7 = 10 bins</div>
              <div className="text-muted-foreground mt-2">Square root rule: bins ≈ √n also works well.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h4 className="font-semibold text-sm mb-2 text-amber-800">Quick Fact</h4>
          <p className="text-sm text-amber-700">
            The histogram was introduced by Karl Pearson in 1895. Pearson, a founder of modern statistics, also developed the chi-squared test and correlation coefficient. He believed strongly in using data to understand the world – a revolutionary idea at the time.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between histogram and bar chart?</h4>
            <p className="text-sm text-muted-foreground">
              Histograms show distribution of continuous data – bars touch each other and represent ranges. Bar charts compare categorical data – bars are separated and represent distinct categories. Histograms have area proportional to frequency; bar charts have height proportional to value.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I choose the right number of bins?</h4>
            <p className="text-sm text-muted-foreground">
              Start with Sturges' formula or square root of sample size. Adjust based on what reveals patterns best. Too few bins oversimplify; too many create noise. Try different bin counts and see which tells the clearest story.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if a value falls on a bin boundary?</h4>
            <p className="text-sm text-muted-foreground">
              By convention, the left boundary is inclusive and the right is exclusive. So [60-70) includes 60 but not 70. The value 70 goes in the next bin [70-80). This prevents double-counting.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can histograms have unequal bin widths?</h4>
            <p className="text-sm text-muted-foreground">
              Yes, but then bar height should represent frequency density (frequency/width), not raw frequency. This ensures area is proportional to frequency. Equal-width bins are simpler and work for most purposes.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What does a gap in a histogram mean?</h4>
            <p className="text-sm text-muted-foreground">
              A gap (bin with zero frequency) suggests no data values in that range. This could indicate two separate populations, a natural break in the data, or simply random variation in small samples.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I compare two distributions?</h4>
            <p className="text-sm text-muted-foreground">
              Use the same bin boundaries for both histograms and overlay them (with transparency) or place them side by side. Alternatively, use frequency polygons (line graphs connecting bin midpoints) for cleaner comparison.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
