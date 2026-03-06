"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AverageCalculator() {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const numbers = input
      .split(/[\n,\s]+/)
      .map((s) => s.trim())
      .filter((s) => s !== "")
      .map((s) => parseFloat(s))
      .filter((n) => !isNaN(n));

    if (numbers.length === 0) return;

    const sum = numbers.reduce((a, b) => a + b, 0);
    const mean = sum / numbers.length;
    const sorted = [...numbers].sort((a, b) => a - b);
    const min = sorted[0];
    const max = sorted[sorted.length - 1];

    let median: number;
    const mid = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
      median = (sorted[mid - 1] + sorted[mid]) / 2;
    } else {
      median = sorted[mid];
    }

    const counts: Record<number, number> = {};
    numbers.forEach((n) => {
      counts[n] = (counts[n] || 0) + 1;
    });
    const maxCount = Math.max(...Object.values(counts));
    const modes = Object.keys(counts)
      .filter((k) => counts[parseFloat(k)] === maxCount)
      .map((k) => parseFloat(k));

    const range = max - min;

    const variance = numbers.reduce((acc, n) => acc + Math.pow(n - mean, 2), 0) / numbers.length;
    const stdDev = Math.sqrt(variance);

    setResult({
      numbers,
      count: numbers.length,
      sum,
      mean,
      median,
      modes: modes.length === numbers.length ? [] : modes,
      min,
      max,
      range,
      variance,
      stdDev
    });
  };

  const reset = () => {
    setInput("");
    setResult(null);
  };

  const loadExample = (example: string) => {
    setInput(example);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Average Calculator – Find the Mean of Any Numbers</h1>
        <p className="text-muted-foreground">
          Calculate the average or arithmetic mean of any set of numbers with our free online mean calculator. Enter your values and get instant results – great for students, teachers, and analysts.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Average Calculator</CardTitle>
          <CardDescription>
            Calculate the mean, median, mode, and other statistics for any set of numbers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Enter Numbers</Label>
              <Textarea
                placeholder="Enter numbers separated by commas, spaces, or new lines&#10;Example: 12, 15, 18, 20, 22"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[120px] font-mono"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Paste a list of numbers – we'll handle commas, spaces, or line breaks
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground">Try:</span>
              <Button variant="ghost" size="sm" onClick={() => loadExample("85, 92, 78, 90, 88, 76, 95")} className="text-xs h-8">
                Test Scores
              </Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("12.5, 15.3, 14.8, 13.2, 16.1, 15.7")} className="text-xs h-8">
                Measurements
              </Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("100, 150, 200, 250, 300, 350, 400")} className="text-xs h-8">
                Sequence
              </Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("5, 7, 5, 9, 5, 12, 7, 7")} className="text-xs h-8">
                With Mode
              </Button>
            </div>

            {result && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <div className="text-xs text-muted-foreground mb-1">Mean (Average)</div>
                    <div className="text-2xl font-bold">{result.mean.toFixed(4)}</div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <div className="text-xs text-muted-foreground mb-1">Median</div>
                    <div className="text-2xl font-bold">{result.median.toFixed(4)}</div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <div className="text-xs text-muted-foreground mb-1">Mode</div>
                    <div className="text-2xl font-bold">
                      {result.modes.length > 0 ? result.modes.join(", ") : "No mode"}
                    </div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <div className="text-xs text-muted-foreground mb-1">Count</div>
                    <div className="text-2xl font-bold">{result.count}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-xs text-muted-foreground mb-1">Sum</div>
                    <div className="text-xl font-semibold">{result.sum.toFixed(4)}</div>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-xs text-muted-foreground mb-1">Minimum</div>
                    <div className="text-xl font-semibold">{result.min}</div>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-xs text-muted-foreground mb-1">Maximum</div>
                    <div className="text-xl font-semibold">{result.max}</div>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-xs text-muted-foreground mb-1">Range</div>
                    <div className="text-xl font-semibold">{result.range}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">Variance (σ²)</div>
                    <div className="text-xl font-semibold">{result.variance.toFixed(4)}</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">Std Deviation (σ)</div>
                    <div className="text-xl font-semibold">{result.stdDev.toFixed(4)}</div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Input Numbers</h4>
                  <div className="text-sm font-mono bg-muted p-3 rounded max-h-32 overflow-y-auto">
                    {result.numbers.join(", ")}
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Average Calculator – Find the Mean of Any Numbers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Calculate the average or arithmetic mean of any set of numbers with our free online mean calculator. Enter your values and get instant results – great for students, teachers, and analysts.
          </p>
          <p className="text-sm text-muted-foreground">
            But this tool goes beyond just the mean. Get median (middle value), mode (most frequent value), range, variance, and standard deviation all in one calculation. See the complete statistical picture of your data.
          </p>
          <p className="text-sm text-muted-foreground">
            Paste numbers from a spreadsheet, type them separated by commas, or enter each on a new line. The calculator handles any format. Perfect for grade calculations, data analysis, or quick statistics.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Measures of Central Tendency</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Mean (Average)</h4>
              <p className="text-xs text-muted-foreground mb-2">
                The sum of all values divided by the count. Most commonly used average, but sensitive to outliers.
              </p>
              <code className="text-xs font-mono bg-muted px-2 py-1 rounded block">
                Mean = Sum of values / Number of values
              </code>
              <div className="mt-2 text-xs text-muted-foreground">
                Example: (10 + 20 + 30) / 3 = 20
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Median</h4>
              <p className="text-xs text-muted-foreground mb-2">
                The middle value when sorted. Half the values are above, half below. Resistant to outliers.
              </p>
              <code className="text-xs font-mono bg-muted px-2 py-1 rounded block">
                Sort values, find center
              </code>
              <div className="mt-2 text-xs text-muted-foreground">
                Example: 5, 8, <strong>12</strong>, 15, 20 → Median = 12
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Mode</h4>
              <p className="text-xs text-muted-foreground mb-2">
                The most frequently occurring value. A dataset can have one mode, multiple modes, or no mode.
              </p>
              <code className="text-xs font-mono bg-muted px-2 py-1 rounded block">
                Find most frequent value
              </code>
              <div className="mt-2 text-xs text-muted-foreground">
                Example: 3, 5, <strong>7</strong>, 5, <strong>7</strong>, 9 → Modes = 5, 7
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Range</h4>
              <p className="text-xs text-muted-foreground mb-2">
                The difference between maximum and minimum values. Shows the spread of your data.
              </p>
              <code className="text-xs font-mono bg-muted px-2 py-1 rounded block">
                Range = Max - Min
              </code>
              <div className="mt-2 text-xs text-muted-foreground">
                Example: 5, 12, 18, 25 → Range = 25 - 5 = 20
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Variance (σ²)</h4>
              <p className="text-xs text-muted-foreground mb-2">
                Average squared deviation from the mean. Measures how spread out the data is.
              </p>
              <code className="text-xs font-mono bg-muted px-2 py-1 rounded block">
                σ² = Σ(x - μ)² / N
              </code>
              <div className="mt-2 text-xs text-muted-foreground">
                Higher variance = more spread out data
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Standard Deviation (σ)</h4>
              <p className="text-xs text-muted-foreground mb-2">
                Square root of variance. Shows typical distance from the mean in original units.
              </p>
              <code className="text-xs font-mono bg-muted px-2 py-1 rounded block">
                σ = √variance
              </code>
              <div className="mt-2 text-xs text-muted-foreground">
                68% of normal data falls within ±1σ of mean
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Sum & Count</h4>
              <p className="text-xs text-muted-foreground mb-2">
                Basic totals. Sum is all values added together. Count is how many values you have.
              </p>
              <code className="text-xs font-mono bg-muted px-2 py-1 rounded block">
                Sum = x₁ + x₂ + ... + xₙ
              </code>
              <div className="mt-2 text-xs text-muted-foreground">
                Used to calculate the mean
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>When to Use Each Average</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">Use Mean When...</div>
              <p className="text-xs text-muted-foreground">
                Your data is evenly distributed without extreme outliers. Common for grades, temperatures, and measurements. The mean uses all data points, making it sensitive to every value.
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">Use Median When...</div>
              <p className="text-xs text-muted-foreground">
                Your data has outliers or is skewed. House prices and salaries often use median because a few extreme values can distort the mean. The median tells you what's "typical."
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">Use Mode When...</div>
              <p className="text-xs text-muted-foreground">
                You want the most common value. Useful for categorical data like favorite colors, shoe sizes, or product preferences. The mode works even with non-numeric data.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">Calculate average test score: 85, 92, 78, 90, 88</div>
              <div className="font-mono text-xs text-muted-foreground">
                Sum: 85 + 92 + 78 + 90 + 88 = 433<br />
                Count: 5<br />
                Mean: 433 / 5 = 86.6
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">Find median of: 12, 5, 18, 9, 25, 3, 15</div>
              <div className="font-mono text-xs text-muted-foreground">
                Sorted: 3, 5, 9, <strong>12</strong>, 15, 18, 25<br />
                Median (middle value): 12
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">Find mode of: 4, 7, 4, 9, 7, 4, 2, 7</div>
              <div className="font-mono text-xs text-muted-foreground">
                4 appears 3 times<br />
                7 appears 3 times<br />
                Modes: 4 and 7 (bimodal)
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">Calculate range: 23, 45, 12, 67, 34, 89, 56</div>
              <div className="font-mono text-xs text-muted-foreground">
                Max: 89, Min: 12<br />
                Range: 89 - 12 = 77
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I calculate average?</h4>
            <p className="text-xs text-muted-foreground">
              Add up all the numbers, then divide by how many numbers you have. For 10, 20, 30: sum is 60, count is 3, so average is 60/3 = 20.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if there are two modes?</h4>
            <p className="text-xs text-muted-foreground">
              Your dataset is bimodal (two modes) or multimodal (more than two). Both values are equally "most frequent." If all values appear the same number of times, there's no mode.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is my median different from the mean?</h4>
            <p className="text-xs text-muted-foreground">
              They measure different things. Mean is pulled by outliers; median isn't. In skewed data (like salaries), median is often lower than mean because a few high values inflate the average.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What does standard deviation tell me?</h4>
            <p className="text-xs text-muted-foreground">
              It measures how spread out your data is. Low standard deviation means values cluster near the mean. High standard deviation means they're spread out. For normal distributions, 68% of values fall within one standard deviation of the mean.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I calculate average with negative numbers?</h4>
            <p className="text-xs text-muted-foreground">
              Yes. Negative numbers are included in the sum. For -5, 0, 5: sum is 0, count is 3, mean is 0. The math works the same.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How many numbers do I need?</h4>
            <p className="text-xs text-muted-foreground">
              Technically one, but averages are most meaningful with at least 3-5 values. The more data points, the more reliable your average becomes.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Math Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <a href="/math-tools/standard-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Standard Calculator</p>
              <p className="text-xs text-muted-foreground">Basic arithmetic</p>
            </a>
            <a href="/math-tools/percentage-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Percentage Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate percentages</p>
            </a>
            <a href="/calculators/standard-deviation-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Standard Deviation Calculator</p>
              <p className="text-xs text-muted-foreground">Detailed statistics</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
