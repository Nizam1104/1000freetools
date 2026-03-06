"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function BoxPlotGenerator() {
  const [data, setData] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setResult(null);

    const values = data.split(/[\n,\s]+/).filter(s => s.trim()).map(Number);

    if (values.length < 4) {
      setError("Please enter at least 4 data points");
      return;
    }

    if (values.some(isNaN)) {
      setError("Please enter valid numbers only");
      return;
    }

    const sorted = [...values].sort((a, b) => a - b);
    const n = sorted.length;

    const min = sorted[0];
    const max = sorted[n - 1];

    const median = n % 2 === 0
      ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2
      : sorted[Math.floor(n / 2)];

    const lowerHalf = sorted.slice(0, Math.floor(n / 2));
    const upperHalf = sorted.slice(Math.ceil(n / 2));

    const q1 = lowerHalf.length % 2 === 0
      ? (lowerHalf[lowerHalf.length / 2 - 1] + lowerHalf[lowerHalf.length / 2]) / 2
      : lowerHalf[Math.floor(lowerHalf.length / 2)];

    const q3 = upperHalf.length % 2 === 0
      ? (upperHalf[upperHalf.length / 2 - 1] + upperHalf[upperHalf.length / 2]) / 2
      : upperHalf[Math.floor(upperHalf.length / 2)];

    const iqr = q3 - q1;
    const lowerFence = q1 - 1.5 * iqr;
    const upperFence = q3 + 1.5 * iqr;

    const outliers: number[] = [];
    const whiskerLow = sorted.find(v => v >= lowerFence) || min;
    const whiskerHigh = sorted.slice().reverse().find(v => v <= upperFence) || max;

    for (const v of sorted) {
      if (v < lowerFence || v > upperFence) {
        outliers.push(v);
      }
    }

    const mean = values.reduce((a, b) => a + b, 0) / n;

    setResult({
      n,
      min,
      q1: Math.round(q1 * 10000) / 10000,
      median: Math.round(median * 10000) / 10000,
      q3: Math.round(q3 * 10000) / 10000,
      max,
      iqr: Math.round(iqr * 10000) / 10000,
      lowerFence: Math.round(lowerFence * 10000) / 10000,
      upperFence: Math.round(upperFence * 10000) / 10000,
      whiskerLow: Math.round(whiskerLow * 10000) / 10000,
      whiskerHigh: Math.round(whiskerHigh * 10000) / 10000,
      outliers: outliers.map(o => Math.round(o * 10000) / 10000),
      mean: Math.round(mean * 10000) / 10000,
      range: max - min,
      boxPosition: {
        min: 0,
        q1: ((q1 - min) / (max - min)) * 100,
        median: ((median - min) / (max - min)) * 100,
        q3: ((q3 - min) / (max - min)) * 100,
        max: 100,
        whiskerLow: ((whiskerLow - min) / (max - min)) * 100,
        whiskerHigh: ((whiskerHigh - min) / (max - min)) * 100
      }
    });
  };

  const reset = () => {
    setData("");
    setResult(null);
    setError("");
  };

  const loadExample = () => {
    setData("12, 15, 18, 20, 22, 25, 28, 30, 32, 35, 38, 40, 42, 45, 48, 50, 55, 60, 85, 90");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Box Plot Generator – Create Box and Whisker Plots Online</h1>
        <p className="text-muted-foreground">
          Generate box plots (box-and-whisker plots) from any dataset with our free online box plot generator. Visualize quartiles, median, and outliers with a clear and accurate diagram.
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

        <div className="flex gap-2">
          <Button onClick={calculate}>Generate Box Plot</Button>
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
            <div className="p-6 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-6">Box and Whisker Plot</h4>
              <div className="relative h-24 border-b border-border pb-8">
                <div className="absolute top-0 bottom-0" style={{ left: `${result.boxPosition.whiskerLow}%`, width: `${result.boxPosition.whiskerHigh - result.boxPosition.whiskerLow}%` }}>
                  <div className="absolute top-0 bottom-0 left-0 w-px bg-border"></div>
                  <div className="absolute top-0 bottom-0 right-0 w-px bg-border"></div>
                  <div className="absolute top-1/2 left-0 right-0 h-16 bg-primary/20 border-2 border-primary rounded"></div>
                  <div 
                    className="absolute top-0 bottom-0 w-px bg-destructive"
                    style={{ left: `${((result.median - result.whiskerLow) / (result.whiskerHigh - result.whiskerLow)) * 100}%` }}
                  ></div>
                </div>
                {result.outliers.length > 0 && (
                  <div className="absolute inset-0">
                    {result.outliers.map((outlier: number, i: number) => {
                      const pos = ((outlier - result.min) / (result.max - result.min)) * 100;
                      return (
                        <div
                          key={i}
                          className="absolute top-1/2 w-3 h-3 bg-destructive rounded-full -translate-y-1/2"
                          style={{ left: `${pos}%` }}
                          title={`Outlier: ${outlier}`}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-4">
                <span>{result.min}</span>
                <span>{result.q1}</span>
                <span>{result.median}</span>
                <span>{result.q3}</span>
                <span>{result.max}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Min</p>
                <p className="text-xl font-bold">{result.min}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Q1</p>
                <p className="text-xl font-bold">{result.q1}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Median</p>
                <p className="text-xl font-bold">{result.median}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Q3</p>
                <p className="text-xl font-bold">{result.q3}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Max</p>
                <p className="text-xl font-bold">{result.max}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">IQR (Q3 - Q1)</p>
                <p className="text-lg font-semibold">{result.iqr}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Mean</p>
                <p className="text-lg font-semibold">{result.mean}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Range</p>
                <p className="text-lg font-semibold">{result.range}</p>
              </div>
            </div>

            {result.outliers.length > 0 && (
              <div className="p-4 bg-destructive/10 rounded-lg">
                <h4 className="font-semibold text-sm mb-2 text-destructive">Outliers Detected</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Values beyond 1.5 × IQR from the quartiles:
                </p>
                <p className="font-mono">{result.outliers.join(", ")}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Understanding Box Plots</h2>
        <p className="text-muted-foreground">
          A box plot (box-and-whisker plot) displays the five-number summary of a dataset: minimum, first quartile (Q1), median, third quartile (Q3), and maximum. The box shows the middle 50% of data, while whiskers extend to show the range.
        </p>
        <div className="grid md:grid-cols-5 gap-4">
          <div className="p-4 bg-muted rounded-lg text-center">
            <div className="text-2xl font-bold mb-2">Min</div>
            <p className="text-xs text-muted-foreground">Smallest value (excluding outliers)</p>
          </div>
          <div className="p-4 bg-muted rounded-lg text-center">
            <div className="text-2xl font-bold mb-2">Q1</div>
            <p className="text-xs text-muted-foreground">25th percentile - 25% of data below this</p>
          </div>
          <div className="p-4 bg-muted rounded-lg text-center">
            <div className="text-2xl font-bold mb-2">Median</div>
            <p className="text-xs text-muted-foreground">50th percentile - middle value</p>
          </div>
          <div className="p-4 bg-muted rounded-lg text-center">
            <div className="text-2xl font-bold mb-2">Q3</div>
            <p className="text-xs text-muted-foreground">75th percentile - 75% of data below this</p>
          </div>
          <div className="p-4 bg-muted rounded-lg text-center">
            <div className="text-2xl font-bold mb-2">Max</div>
            <p className="text-xs text-muted-foreground">Largest value (excluding outliers)</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Identifying Outliers</h2>
        <p className="text-muted-foreground">
          Outliers are values that fall more than 1.5 × IQR below Q1 or above Q3. They're plotted as individual points beyond the whiskers.
        </p>
        <div className="p-4 bg-muted rounded-lg">
          <code className="text-sm font-mono">
            Lower fence = Q1 - 1.5 × IQR{'\n'}
            Upper fence = Q3 + 1.5 × IQR{'\n'}
            {'\n'}
            Any value &lt; lower fence OR &gt; upper fence is an outlier
          </code>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div>
          <h3 className="font-semibold mb-2">What does the box represent?</h3>
          <p className="text-sm text-muted-foreground">
            The box contains the middle 50% of your data (from Q1 to Q3). The line inside the box is the median. A narrow box means data is tightly clustered; a wide box means more spread.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">How do I interpret skewness from a box plot?</h3>
          <p className="text-sm text-muted-foreground">
            If the median is closer to Q1 and the right whisker is longer, data is right-skewed. If the median is closer to Q3 and the left whisker is longer, data is left-skewed. Symmetric data has the median near the center.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">When should I use a box plot instead of a histogram?</h3>
          <p className="text-sm text-muted-foreground">
            Box plots are great for comparing multiple groups side-by-side and identifying outliers. Histograms show the actual shape of the distribution better. Use both for complete understanding.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What if there are no outliers?</h3>
          <p className="text-sm text-muted-foreground">
            That's perfectly normal. Not all datasets have outliers. The whiskers will simply extend to the minimum and maximum values in this case.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Can box plots show multimodal distributions?</h3>
          <p className="text-sm text-muted-foreground">
            No, box plots don't show multiple peaks. A bimodal distribution will look the same as a unimodal one in a box plot. Use a histogram or density plot to detect multiple modes.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/histogram-generator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Histogram Generator</p>
            <p className="text-xs text-muted-foreground">Frequency distribution</p>
          </a>
          <a href="/math-tools/five-number-summary-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Five Number Summary</p>
            <p className="text-xs text-muted-foreground">Min, Q1, Med, Q3, Max</p>
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
