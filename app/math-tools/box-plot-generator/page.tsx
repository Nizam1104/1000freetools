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

  const loadExample = (type: string) => {
    const examples: Record<string, string> = {
      testScores: "65, 68, 70, 72, 74, 75, 76, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 92, 94, 96",
      salaries: "35000, 38000, 40000, 42000, 45000, 47000, 48000, 50000, 52000, 54000, 55000, 57000, 58000, 60000, 62000, 65000, 68000, 72000, 78000, 95000, 120000",
      temperatures: "45, 48, 50, 52, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 68, 70, 72, 75, 78, 82, 85",
      housePrices: "180000, 195000, 210000, 225000, 240000, 250000, 260000, 270000, 280000, 290000, 300000, 310000, 320000, 340000, 360000, 380000, 410000, 450000, 520000, 680000",
      reactionTimes: "0.18, 0.21, 0.23, 0.25, 0.27, 0.28, 0.29, 0.30, 0.31, 0.32, 0.33, 0.34, 0.35, 0.36, 0.38, 0.40, 0.42, 0.45, 0.52, 0.68",
      productRatings: "2.1, 2.5, 2.8, 3.0, 3.2, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5.0",
      commuteMinutes: "12, 15, 18, 20, 22, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 37, 40, 42, 45, 48, 55, 72"
    };
    setData(examples[type] || examples.testScores);
    setResult(null);
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

        <div className="flex flex-wrap gap-2">
          <Button onClick={calculate}>Generate Box Plot</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Load example:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("testScores")}>Test Scores</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("salaries")}>Salaries</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("temperatures")}>Temperatures</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("housePrices")}>House Prices</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("reactionTimes")}>Reaction Times</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("productRatings")}>Product Ratings</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("commuteMinutes")}>Commute Times</Button>
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

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Box Plots</h2>
        <p className="text-muted-foreground">
          A box plot, also called a box-and-whisker plot, is a visual way to show how data is distributed. Instead of listing every single number, it summarizes your dataset using five key values: the minimum, first quartile (Q1), median, third quartile (Q3), and maximum. This five-number summary gives you an instant picture of where most of your data clusters and whether there are any unusual values.
        </p>
        <p className="text-muted-foreground">
          The "box" in the middle contains the middle 50% of your data – everything between Q1 and Q3. The line inside the box marks the median, which is the middle value when all numbers are sorted. The "whiskers" extend to show the range of typical values, and any points beyond the whiskers are flagged as outliers – values that are unusually high or low compared to the rest of the data.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">How Box Plots Work: The Five-Number Summary</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">The Five Numbers</h3>
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-semibold text-sm">Minimum</div>
                <div className="text-xs text-muted-foreground">The smallest value in your dataset</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-semibold text-sm">Q1 (First Quartile)</div>
                <div className="text-xs text-muted-foreground">The 25th percentile – 25% of data falls below this value</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-semibold text-sm">Median (Q2)</div>
                <div className="text-xs text-muted-foreground">The 50th percentile – the middle value</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-semibold text-sm">Q3 (Third Quartile)</div>
                <div className="text-xs text-muted-foreground">The 75th percentile – 75% of data falls below this value</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-semibold text-sm">Maximum</div>
                <div className="text-xs text-muted-foreground">The largest value in your dataset</div>
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Finding Quartiles</h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-semibold mb-1">Step 1: Sort the data</div>
                <div className="text-muted-foreground">Arrange all values from smallest to largest</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-semibold mb-1">Step 2: Find the median</div>
                <div className="text-muted-foreground">For odd n, take the middle value. For even n, average the two middle values</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-semibold mb-1">Step 3: Find Q1</div>
                <div className="text-muted-foreground">Find the median of the lower half (values below the overall median)</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-semibold mb-1">Step 4: Find Q3</div>
                <div className="text-muted-foreground">Find the median of the upper half (values above the overall median)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Identifying Outliers</h2>
        <p className="text-muted-foreground">
          Outliers are values that fall far outside the typical range of your data. Box plots use the interquartile range (IQR) to determine what counts as an outlier. The IQR is simply Q3 minus Q1 – it measures the spread of the middle 50% of your data.
        </p>
        <div className="p-6 bg-muted rounded-lg">
          <h3 className="font-semibold mb-3">The 1.5 × IQR Rule</h3>
          <div className="font-mono text-sm space-y-2">
            <div>IQR = Q3 - Q1</div>
            <div>Lower Fence = Q1 - 1.5 × IQR</div>
            <div>Upper Fence = Q3 + 1.5 × IQR</div>
            <div className="pt-2 text-muted-foreground">Any value below the lower fence or above the upper fence is an outlier</div>
          </div>
        </div>
        <p className="text-muted-foreground">
          The whiskers extend to the most extreme values that are still within the fences. Values beyond the fences are plotted as individual points – these are your outliers. This method, developed by statistician John Tukey, catches values that are genuinely unusual without flagging normal variation.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Worked Examples</h2>
        <div className="space-y-4">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 1: Test Scores</h3>
            <p className="text-sm text-muted-foreground mb-3">Find the five-number summary for these 11 test scores:</p>
            <div className="font-mono text-sm bg-muted p-3 rounded mb-3">65, 70, 72, 75, 78, 80, 82, 84, 86, 89, 92</div>
            <div className="space-y-2 text-sm">
              <div><strong>Step 1:</strong> Data is already sorted (n = 11)</div>
              <div><strong>Step 2:</strong> Minimum = 65, Maximum = 92</div>
              <div><strong>Step 3:</strong> Median = 80 (the 6th value, middle of 11)</div>
              <div><strong>Step 4:</strong> Lower half: 65, 70, 72, 75, 78 → Q1 = 72 (middle value)</div>
              <div><strong>Step 5:</strong> Upper half: 82, 84, 86, 89, 92 → Q3 = 86 (middle value)</div>
              <div className="pt-2 border-t"><strong>Five-number summary:</strong> Min = 65, Q1 = 72, Median = 80, Q3 = 86, Max = 92</div>
              <div><strong>IQR:</strong> 86 - 72 = 14</div>
              <div><strong>Fences:</strong> Lower = 72 - 1.5(14) = 51, Upper = 86 + 1.5(14) = 107</div>
              <div><strong>Outliers:</strong> None (all values are between 51 and 107)</div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 2: Salaries with Outliers</h3>
            <p className="text-sm text-muted-foreground mb-3">Analyze this salary dataset (in thousands):</p>
            <div className="font-mono text-sm bg-muted p-3 rounded mb-3">35, 38, 40, 42, 45, 47, 48, 50, 52, 54, 55, 57, 58, 60, 62, 65, 68, 72, 95, 150</div>
            <div className="space-y-2 text-sm">
              <div><strong>Step 1:</strong> Data is sorted (n = 20, even)</div>
              <div><strong>Step 2:</strong> Min = 35, Max = 150</div>
              <div><strong>Step 3:</strong> Median = (54 + 55) / 2 = 54.5 (average of 10th and 11th values)</div>
              <div><strong>Step 4:</strong> Lower half (10 values): 35, 38, 40, 42, 45, 47, 48, 50, 52, 54</div>
              <div className="ml-4 text-muted-foreground">Q1 = (45 + 47) / 2 = 46</div>
              <div><strong>Step 5:</strong> Upper half (10 values): 55, 57, 58, 60, 62, 65, 68, 72, 95, 150</div>
              <div className="ml-4 text-muted-foreground">Q3 = (62 + 65) / 2 = 63.5</div>
              <div className="pt-2 border-t"><strong>IQR:</strong> 63.5 - 46 = 17.5</div>
              <div><strong>Fences:</strong> Lower = 46 - 1.5(17.5) = 19.75, Upper = 63.5 + 1.5(17.5) = 89.75</div>
              <div><strong>Outliers:</strong> 95 and 150 (both exceed 89.75)</div>
              <div><strong>Whiskers:</strong> Lower = 35, Upper = 72 (highest non-outlier)</div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 3: Small Dataset</h3>
            <p className="text-sm text-muted-foreground mb-3">Calculate for this small dataset:</p>
            <div className="font-mono text-sm bg-muted p-3 rounded mb-3">12, 15, 18, 20, 25, 28, 30, 35</div>
            <div className="space-y-2 text-sm">
              <div><strong>Step 1:</strong> Sorted data (n = 8, even)</div>
              <div><strong>Step 2:</strong> Min = 12, Max = 35</div>
              <div><strong>Step 3:</strong> Median = (20 + 25) / 2 = 22.5</div>
              <div><strong>Step 4:</strong> Lower half: 12, 15, 18, 20 → Q1 = (15 + 18) / 2 = 16.5</div>
              <div><strong>Step 5:</strong> Upper half: 25, 28, 30, 35 → Q3 = (28 + 30) / 2 = 29</div>
              <div className="pt-2 border-t"><strong>IQR:</strong> 29 - 16.5 = 12.5</div>
              <div><strong>Fences:</strong> Lower = 16.5 - 1.5(12.5) = -2.25, Upper = 29 + 1.5(12.5) = 47.75</div>
              <div><strong>Outliers:</strong> None</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Quick Fact</h2>
        <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm">
            <strong>John Tukey</strong> introduced the box plot in 1970 as part of his work on exploratory data analysis. He called it the "box-and-whisker plot" and designed it to be drawn by hand quickly while still revealing the essential features of a dataset. Tukey also coined terms like "bit" (binary digit) and "software." His book "Exploratory Data Analysis" remains influential today, and the box plot is one of the most widely used statistical graphics in the world.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-sm mb-2">What does the box in a box plot represent?</h3>
            <p className="text-sm text-muted-foreground">
              The box spans from Q1 to Q3, containing the middle 50% of your data. The line inside the box marks the median. A narrow box means data is tightly clustered; a wide box means more spread. If the median line is off-center, the data is skewed in that direction.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">How do you interpret the whiskers?</h3>
            <p className="text-sm text-muted-foreground">
              The whiskers extend from the box to the most extreme values that are not outliers. They show the range of "typical" data. The lower whisker goes down to the smallest value above the lower fence; the upper whisker goes up to the largest value below the upper fence.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">What if there are no outliers?</h3>
            <p className="text-sm text-muted-foreground">
              That's perfectly normal! Many datasets don't have outliers. The whiskers will simply extend all the way to the minimum and maximum values. The absence of outliers suggests your data is fairly consistent without extreme values.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">Can a box plot show the mean?</h3>
            <p className="text-sm text-muted-foreground">
              Traditional box plots show the median, not the mean. Some variations add a symbol (like a dot or triangle) to mark the mean. Comparing the mean and median tells you about skewness – if the mean is higher than the median, the data likely has a right skew.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">When should I use a box plot instead of a histogram?</h3>
            <p className="text-sm text-muted-foreground">
              Box plots are better for comparing multiple groups side by side and for quickly spotting outliers. Histograms show more detail about the shape of the distribution but take up more space. Use box plots when you need a compact summary or want to compare several datasets at once.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">What does it mean if the median is closer to Q1 than Q3?</h3>
            <p className="text-sm text-muted-foreground">
              This indicates right skew (positive skew) – the data has a longer tail on the high end. Most values cluster toward the lower end, with a few high values pulling the distribution right. Salary data often shows this pattern: many people earn modest amounts, but a few earn very high salaries.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">How many data points do I need for a meaningful box plot?</h3>
            <p className="text-sm text-muted-foreground">
              You can technically make a box plot with as few as 5 values, but it's most useful with at least 15-20 data points. With very small datasets, the quartile calculations become less stable. For large datasets (100+ points), box plots excel at summarizing the distribution without overwhelming detail.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
