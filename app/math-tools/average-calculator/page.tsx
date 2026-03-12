"use client";

import { useState } from "react";
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
    setResult(null);
  };

  return (
    <div className="w-full mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Average Calculator – Find the Mean of Any Numbers</h1>
        <p className="text-muted-foreground">
          Calculate the average or arithmetic mean of any set of numbers with our free online mean calculator. Enter your values and get instant results – great for students, teachers, and analysts.
        </p>
      </div>
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
            Paste numbers from a spreadsheet, type them separated by commas, or enter each on a new line. The calculator handles any format.
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
          <Button variant="ghost" size="sm" onClick={() => loadExample("23.5, 24.1, 22.8, 25.3, 23.9, 24.7, 23.2, 24.5")} className="text-xs h-8">
            Temperature Readings
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1250, 1340, 1180, 1420, 1290, 1375, 1225")} className="text-xs h-8">
            Weekly Sales
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("3.2, 4.1, 3.8, 4.5, 3.6, 4.2, 3.9, 4.0, 3.7")} className="text-xs h-8">
            GPA Values
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

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Average Calculator – Mean, Median, Mode & Statistics</h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            The average – technically called the arithmetic mean – is the most common way to summarize a set of numbers. Add them all up and divide by how many you have. It's how teachers calculate grades, how analysts track performance, and how you figure out your monthly spending.
          </p>
          <p className="text-muted-foreground">
            But the mean tells only part of the story. This calculator also gives you the median (middle value), mode (most frequent value), range, variance, and standard deviation. Together, these statistics paint a complete picture of your data's center, spread, and distribution.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Measures of Central Tendency</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Mean (Average)</h4>
            <p className="text-sm text-muted-foreground mb-2">
              The sum of all values divided by the count. Most commonly used average, but sensitive to outliers.
            </p>
            <div className="font-mono text-xs bg-muted px-2 py-1 rounded block mb-2">
              Mean = Sum of values / Number of values
            </div>
            <div className="text-xs text-muted-foreground">
              Example: (10 + 20 + 30) / 3 = 20
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Median</h4>
            <p className="text-sm text-muted-foreground mb-2">
              The middle value when sorted. Half the values are above, half below. Resistant to outliers.
            </p>
            <div className="font-mono text-xs bg-muted px-2 py-1 rounded block mb-2">
              Sort values, find center
            </div>
            <div className="text-xs text-muted-foreground">
              Example: 5, 8, <strong>12</strong>, 15, 20 → Median = 12
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Mode</h4>
            <p className="text-sm text-muted-foreground mb-2">
              The most frequently occurring value. A dataset can have one mode, multiple modes, or no mode.
            </p>
            <div className="font-mono text-xs bg-muted px-2 py-1 rounded block mb-2">
              Find most frequent value
            </div>
            <div className="text-xs text-muted-foreground">
              Example: 3, 5, <strong>7</strong>, 5, <strong>7</strong>, 9 → Modes = 5, 7
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Additional Statistics</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Range</h4>
            <p className="text-sm text-muted-foreground mb-2">
              The difference between maximum and minimum values. Shows the spread of your data.
            </p>
            <div className="font-mono text-xs bg-muted px-2 py-1 rounded block mb-2">
              Range = Max - Min
            </div>
            <div className="text-xs text-muted-foreground">
              Example: 5, 12, 18, 25 → Range = 25 - 5 = 20
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Variance (σ²)</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Average squared deviation from the mean. Measures how spread out the data is.
            </p>
            <div className="font-mono text-xs bg-muted px-2 py-1 rounded block mb-2">
              σ² = Σ(x - μ)² / N
            </div>
            <div className="text-xs text-muted-foreground">
              Higher variance = more spread out data
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Standard Deviation (σ)</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Square root of variance. Shows typical distance from the mean in original units.
            </p>
            <div className="font-mono text-xs bg-muted px-2 py-1 rounded block mb-2">
              σ = √variance
            </div>
            <div className="text-xs text-muted-foreground">
              68% of normal data falls within ±1σ of mean
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Sum & Count</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Basic totals. Sum is all values added together. Count is how many values you have.
            </p>
            <div className="font-mono text-xs bg-muted px-2 py-1 rounded block mb-2">
              Sum = x₁ + x₂ + ... + xₙ
            </div>
            <div className="text-xs text-muted-foreground">
              Used to calculate the mean
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Calculate Average Test Score</h4>
            <p className="text-sm text-muted-foreground mb-2">
              A student scored 85, 92, 78, 90, and 88 on five tests. What's their average?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Values: 85, 92, 78, 90, 88</div>
              <div>Sum: 85 + 92 + 78 + 90 + 88 = 433</div>
              <div>Count: 5</div>
              <div>Mean: 433 / 5 = 86.6</div>
              <div>Sorted: 78, 85, 88, 90, 92 → Median = 88</div>
              <div>No repeated values → No mode</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Find Median with Even Count</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Find the median of: 12, 5, 18, 9, 25, 3
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Sorted: 3, 5, 9, 12, 18, 25</div>
              <div>Count is even (6 values), so average the two middle values</div>
              <div>Middle values: 9 and 12</div>
              <div>Median: (9 + 12) / 2 = 10.5</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Calculate Standard Deviation</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Find the standard deviation of: 4, 7, 13, 16
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Mean: (4 + 7 + 13 + 16) / 4 = 10</div>
              <div>Deviations from mean: -6, -3, 3, 6</div>
              <div>Squared deviations: 36, 9, 9, 36</div>
              <div>Variance: (36 + 9 + 9 + 36) / 4 = 22.5</div>
              <div>Std Dev: √22.5 ≈ 4.74</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: Mode in Real Data</h4>
            <p className="text-sm text-muted-foreground mb-2">
              A shoe store sold these sizes today: 8, 9, 7, 9, 10, 9, 8, 11, 9, 8
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Count each size:</div>
              <div>Size 7: 1 time</div>
              <div>Size 8: 3 times</div>
              <div>Size 9: 4 times ← Most frequent</div>
              <div>Size 10: 1 time</div>
              <div>Size 11: 1 time</div>
              <div>Mode: 9 (sold most often)</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 5: Mean vs Median with Outliers</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Salaries at a small company: $45k, $48k, $52k, $55k, $58k, $62k, $450k (CEO)
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Mean: ($45 + $48 + $52 + $55 + $58 + $62 + $450) / 7 = $110k</div>
              <div>Median: $55k (middle value)</div>
              <div>The CEO's salary pulls the mean way up</div>
              <div>Median better represents "typical" employee salary</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Quick Fact</h3>
          <p className="text-sm text-muted-foreground">
            The word "average" comes from the Arabic "awar," meaning damage or loss in maritime trade. When cargo was jettisoned to save a ship, losses were shared proportionally among merchants – this shared loss calculation was called "averaging." The mathematical sense emerged in the 17th century.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I calculate average?</h4>
            <p className="text-sm text-muted-foreground">
              Add up all the numbers, then divide by how many numbers you have. For 10, 20, 30: sum is 60, count is 3, so average is 60/3 = 20.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if there are two modes?</h4>
            <p className="text-sm text-muted-foreground">
              Your dataset is bimodal (two modes) or multimodal (more than two). Both values are equally "most frequent." If all values appear the same number of times, there's no mode.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is my median different from the mean?</h4>
            <p className="text-sm text-muted-foreground">
              They measure different things. Mean is pulled by outliers; median isn't. In skewed data (like salaries), median is often lower than mean because a few high values inflate the average.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What does standard deviation tell me?</h4>
            <p className="text-sm text-muted-foreground">
              It measures how spread out your data is. Low standard deviation means values cluster near the mean. High standard deviation means they're spread out. For normal distributions, 68% of values fall within one standard deviation of the mean.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I calculate average with negative numbers?</h4>
            <p className="text-sm text-muted-foreground">
              Yes. Negative numbers are included in the sum. For -5, 0, 5: sum is 0, count is 3, mean is 0. The math works the same.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How many numbers do I need?</h4>
            <p className="text-sm text-muted-foreground">
              Technically one, but averages are most meaningful with at least 3-5 values. The more data points, the more reliable your average becomes.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">When should I use median instead of mean?</h4>
            <p className="text-sm text-muted-foreground">
              Use median when your data has outliers or is skewed. House prices, salaries, and reaction times often use median because extreme values distort the mean. The median tells you what's "typical" – half the values are above it, half below.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between variance and standard deviation?</h4>
            <p className="text-sm text-muted-foreground">
              Variance is the average squared distance from the mean. Standard deviation is the square root of variance. Standard deviation is more interpretable because it's in the same units as your original data. If your data is in dollars, standard deviation is in dollars; variance is in "dollars squared."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
