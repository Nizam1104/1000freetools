"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function MeanMedianModeCalculator() {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<any>(null);

  const examples = [
    { name: "Test Scores", data: "85, 90, 78, 92, 88, 76, 95, 89, 84, 91" },
    { name: "House Prices", data: "250000, 300000, 275000, 350000, 280000, 320000, 290000" },
    { name: "With Outlier", data: "10, 12, 11, 13, 12, 100, 14, 11, 13, 12" },
    { name: "No Mode", data: "1, 2, 3, 4, 5, 6, 7" },
    { name: "Multiple Modes", data: "2, 2, 3, 3, 4, 4, 5, 5" },
    { name: "Small Dataset", data: "5, 8, 3, 9, 7" },
    { name: "Decimals", data: "3.14, 2.71, 1.41, 3.14, 2.71, 1.73, 3.14" }
  ];

  const calculate = () => {
    const numbers = input.split(/[\n,\s]+/).map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    if (numbers.length === 0) return;

    const sorted = [...numbers].sort((a, b) => a - b);
    const n = sorted.length;

    const mean = sorted.reduce((a, b) => a + b, 0) / n;

    let median: number;
    if (n % 2 === 0) {
      median = (sorted[n/2 - 1] + sorted[n/2]) / 2;
    } else {
      median = sorted[Math.floor(n/2)];
    }

    const freq: Record<number, number> = {};
    sorted.forEach(num => { freq[num] = (freq[num] || 0) + 1; });
    const maxFreq = Math.max(...Object.values(freq));
    const modes = Object.keys(freq).filter(k => freq[parseInt(k)] === maxFreq).map(Number);

    const range = sorted[n-1] - sorted[0];

    const q1Index = Math.floor((n + 1) / 4) - 1;
    const q3Index = Math.floor(3 * (n + 1) / 4) - 1;
    const q1 = sorted[Math.max(0, q1Index)];
    const q3 = sorted[Math.min(n-1, q3Index)];
    const iqr = q3 - q1;

    setResult({
      count: n,
      mean, median, modes: modes.length === n ? [] : modes, range,
      min: sorted[0], max: sorted[n-1], sum: sorted.reduce((a,b)=>a+b,0),
      q1, q3, iqr, sorted, freq
    });
  };

  const reset = () => { setInput(""); setResult(null); };

  const loadExample = (data: string) => {
    setInput(data);
    setResult(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Mean, Median, Mode Calculator – Statistics Calculator Online</h1>
        <p className="text-muted-foreground">
          Calculate mean, median, and mode of any dataset with our free online statistics calculator. Enter your numbers and get comprehensive central tendency measures instantly.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-4">
          <div>
            <Label>Dataset</Label>
            <Textarea rows={4} placeholder="e.g., 12, 15, 18, 20, 22, 25, 30" value={input} onChange={(e) => setInput(e.target.value)} />
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Examples:</span>
            {examples.map((ex, idx) => (
              <Button key={idx} variant="outline" size="sm" onClick={() => loadExample(ex.data)}>{ex.name}</Button>
            ))}
          </div>

          <div className="flex gap-2"><Button onClick={calculate}>Calculate</Button><Button variant="outline" onClick={reset}>Reset</Button></div>

          {result && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="p-4 bg-muted rounded-lg text-center"><p className="text-sm text-muted-foreground">Count</p><p className="text-2xl font-bold">{result.count}</p></div>
                <div className="p-4 bg-muted rounded-lg text-center"><p className="text-sm text-muted-foreground">Mean</p><p className="text-2xl font-bold">{result.mean.toFixed(4)}</p></div>
                <div className="p-4 bg-muted rounded-lg text-center"><p className="text-sm text-muted-foreground">Median</p><p className="text-2xl font-bold">{result.median.toFixed(4)}</p></div>
                <div className="p-4 bg-muted rounded-lg text-center"><p className="text-sm text-muted-foreground">Mode</p><p className="text-2xl font-bold">{result.modes.length > 0 ? result.modes.join(", ") : "No mode"}</p></div>
              </div>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg text-center"><p className="text-sm text-muted-foreground">Min</p><p className="text-xl font-bold">{result.min}</p></div>
                <div className="p-4 border rounded-lg text-center"><p className="text-sm text-muted-foreground">Q1</p><p className="text-xl font-bold">{result.q1}</p></div>
                <div className="p-4 border rounded-lg text-center"><p className="text-sm text-muted-foreground">Q3</p><p className="text-xl font-bold">{result.q3}</p></div>
                <div className="p-4 border rounded-lg text-center"><p className="text-sm text-muted-foreground">Max</p><p className="text-xl font-bold">{result.max}</p></div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg"><p className="text-sm text-muted-foreground">Range</p><p className="text-xl font-mono">{result.range}</p></div>
                <div className="p-4 border rounded-lg"><p className="text-sm text-muted-foreground">Sum</p><p className="text-xl font-mono">{result.sum}</p></div>
                <div className="p-4 border rounded-lg"><p className="text-sm text-muted-foreground">IQR</p><p className="text-xl font-mono">{result.iqr}</p></div>
              </div>
              <div className="p-4 border rounded-lg"><h4 className="font-semibold text-sm mb-2">Sorted Data</h4><p className="font-mono text-sm">{result.sorted.join(", ")}</p></div>
            </div>
          )}
        </div>
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Central Tendency</h2>
        <p className="text-muted-foreground">
          Central tendency measures tell you where the "center" of your data lies. The mean (average), median (middle value), and mode (most frequent value) each describe the center differently. Which one you use depends on your data's characteristics and what question you're trying to answer.
        </p>
        <p className="text-muted-foreground">
          The mean uses all values but is sensitive to outliers. The median ignores extreme values and represents the true middle. The mode tells you what's most common. Together, they give a complete picture of your data's center.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Formulas and Methods</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Mean (Average)</h4>
            <code className="text-sm font-mono block">Mean = Sum / Count</code>
            <p className="text-xs text-muted-foreground mt-2">Add all values, divide by how many</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Median (Middle)</h4>
            <code className="text-sm font-mono block">Sort, find middle value</code>
            <p className="text-xs text-muted-foreground mt-2">For even count: average of two middle</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Mode (Most Frequent)</h4>
            <code className="text-sm font-mono block">Value with highest frequency</code>
            <p className="text-xs text-muted-foreground mt-2">Can have multiple modes or none</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: Test Scores</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Data: 85, 90, 78, 92, 88</div>
              <div>Sorted: 78, 85, 88, 90, 92</div>
              <div>Mean = (78+85+88+90+92)/5 = 433/5 = 86.6</div>
              <div>Median = 88 (middle value)</div>
              <div>Mode = None (all values appear once)</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: With Outlier</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Data: 10, 12, 11, 13, 12, 100, 14</div>
              <div>Sorted: 10, 11, 12, 12, 13, 14, 100</div>
              <div>Mean = 172/7 = 24.6 (pulled up by 100)</div>
              <div>Median = 12 (resistant to outlier)</div>
              <div>Mode = 12 (appears twice)</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: Multiple Modes</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Data: 2, 2, 3, 3, 4, 4, 5</div>
              <div>Frequencies: 2→2, 3→2, 4→2, 5→1</div>
              <div>Mean = 23/7 = 3.29</div>
              <div>Median = 3</div>
              <div>Mode = 2, 3, 4 (trimodal)</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: Even Count</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Data: 5, 8, 3, 9, 7, 6</div>
              <div>Sorted: 3, 5, 6, 7, 8, 9</div>
              <div>Mean = 38/6 = 6.33</div>
              <div>Median = (6+7)/2 = 6.5 (average of two middle)</div>
              <div>Mode = None</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <p className="text-sm">
            The word "average" usually means the arithmetic mean, but there are actually dozens of different "averages" in mathematics. The geometric mean (nth root of product) is used for growth rates. The harmonic mean is used for rates like speed. The median is technically also an average!
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">When should I use mean vs median?</h4>
            <p className="text-sm text-muted-foreground">
              Use the mean for symmetric data without outliers – it uses all information. Use the median for skewed data or when outliers exist – it's resistant to extreme values. House prices and salaries are typically reported as medians for this reason.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can a dataset have no mode?</h4>
            <p className="text-sm text-muted-foreground">
              Yes! If every value appears exactly once, there's no mode. Some datasets also have multiple modes (bimodal, trimodal, etc.) when several values tie for most frequent.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is the mean higher than the median?</h4>
            <p className="text-sm text-muted-foreground">
              When mean > median, your data is right-skewed (positive skew). High outliers pull the mean up while the median stays put. Income data often shows this pattern – a few very high incomes raise the mean above the median.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What does IQR tell me?</h4>
            <p className="text-sm text-muted-foreground">
              The Interquartile Range (Q3 - Q1) shows the spread of the middle 50% of your data. Unlike the full range, IQR ignores outliers. A small IQR means the middle values are clustered; a large IQR means they're spread out.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do quartiles work?</h4>
            <p className="text-sm text-muted-foreground">
              Q1 (first quartile) has 25% of data below it. Q2 is the median (50% below). Q3 (third quartile) has 75% below. These divide your data into four equal parts, helping you understand the distribution shape.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if my dataset is very small?</h4>
            <p className="text-sm text-muted-foreground">
              With fewer than 4-5 values, measures like quartiles become less meaningful. The mean and median still work, but interpret them cautiously. Small samples are highly variable and may not represent the population well.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
