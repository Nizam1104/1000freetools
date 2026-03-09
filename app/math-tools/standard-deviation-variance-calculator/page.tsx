"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export default function StandardDeviationVarianceCalculator() {
  const [input, setInput] = useState<string>("");
  const [isPopulation, setIsPopulation] = useState<boolean>(true);
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const numbers = input.split(/[\n,\s]+/).map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    if (numbers.length < 2) return;

    const n = numbers.length;
    const mean = numbers.reduce((a, b) => a + b, 0) / n;
    const squaredDiffs = numbers.map(x => Math.pow(x - mean, 2));
    const sumSquaredDiffs = squaredDiffs.reduce((a, b) => a + b, 0);

    const variance = isPopulation ? sumSquaredDiffs / n : sumSquaredDiffs / (n - 1);
    const stdDev = Math.sqrt(variance);
    const cv = (stdDev / Math.abs(mean)) * 100;

    setResult({
      count: n, mean, variance, stdDev, cv, sumSquaredDiffs,
      steps: [
        `Count (n) = ${n}`,
        `Mean (μ) = ${mean.toFixed(4)}`,
        ``,
        `Sum of squared differences from mean:`,
        `  Σ(x - μ)² = ${sumSquaredDiffs.toFixed(4)}`,
        ``,
        `${isPopulation ? "Population" : "Sample"} ${isPopulation ? "" : "(n-1 = " + (n-1) + ")" }:`,
        `  Variance (σ²) = ${sumSquaredDiffs.toFixed(4)} / ${isPopulation ? n : n-1}`,
        `  Variance = ${variance.toFixed(4)}`,
        ``,
        `Standard Deviation:`,
        `  σ = √${variance.toFixed(4)}`,
        `  σ = ${stdDev.toFixed(4)}`,
        ``,
        `Coefficient of Variation:`,
        `  CV = (σ/|μ|) × 100 = ${cv.toFixed(2)}%`
      ]
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
        <h1 className="text-3xl font-semibold mb-2">Standard Deviation Calculator – Variance & SD Online</h1>
        <p className="text-muted-foreground">
          Calculate standard deviation and variance for any dataset with our free online calculator. Supports both population and sample standard deviation with step-by-step workings.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Label>Dataset</Label>
          <Textarea rows={4} placeholder="e.g., 10, 12, 15, 18, 20, 22, 25" value={input} onChange={(e) => setInput(e.target.value)} />
          <p className="text-xs text-muted-foreground mt-1">Enter numbers separated by commas, spaces, or new lines</p>
        </div>

        <div className="flex items-center gap-2">
          <Switch checked={isPopulation} onCheckedChange={setIsPopulation} id="pop-switch" />
          <Label htmlFor="pop-switch">{isPopulation ? "Population Standard Deviation (σ)" : "Sample Standard Deviation (s)"}</Label>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("10, 12, 15, 18, 20, 22, 25")}>Test scores</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("5.2, 5.8, 6.1, 5.5, 5.9, 6.3")}>Measurements</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("100, 150, 200, 250, 300")}>Sales data</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("72, 85, 90, 78, 88, 95, 82, 79")}>Exam grades</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("2.5, 3.0, 2.8, 3.2, 2.9, 3.1, 2.7")}>Lab readings</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("45, 52, 48, 55, 50, 47, 53, 49, 51, 46")}>Temperature data</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1000, 1200, 1100, 1300, 1050, 1150, 1250")}>Monthly income</Button>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Count</p>
                <p className="text-2xl font-bold">{result.count}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Mean</p>
                <p className="text-2xl font-bold">{result.mean.toFixed(4)}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Variance</p>
                <p className="text-2xl font-bold">{result.variance.toFixed(4)}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Std Dev</p>
                <p className="text-2xl font-bold">{result.stdDev.toFixed(4)}</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Coefficient of Variation</p>
              <p className="text-2xl font-bold">{result.cv.toFixed(2)}%</p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Step-by-Step Solution</h4>
              <div className="space-y-2 text-sm font-mono">
                {result.steps.map((s: string, i: number) => (
                  <div key={i}>{s}</div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Understanding Standard Deviation and Variance</h2>
          <p className="text-muted-foreground">
            Standard deviation measures how spread out your data is from the average. A low standard deviation means values cluster close to the mean. A high standard deviation means they're scattered widely. Variance is simply the square of standard deviation – it's used in calculations but standard deviation is more intuitive because it's in the same units as your data.
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">
            Think of test scores: if everyone scores around 75%, the standard deviation is small. If scores range from 40% to 100%, the standard deviation is large. Both classes might have the same average, but the spread tells a very different story about student performance.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Population vs Sample Standard Deviation</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Population Standard Deviation (σ)</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Use when you have data for the entire population – every member of the group you're studying.
            </p>
            <code className="text-xs font-mono bg-muted px-2 py-1 rounded block mb-2">
              σ = √[Σ(x - μ)² / N]
            </code>
            <p className="text-xs text-muted-foreground">
              Divide by N (total count). Used for census data, complete datasets.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Sample Standard Deviation (s)</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Use when you have a sample and want to estimate the population standard deviation.
            </p>
            <code className="text-xs font-mono bg-muted px-2 py-1 rounded block mb-2">
              s = √[Σ(x - x̄)² / (n - 1)]
            </code>
            <p className="text-xs text-muted-foreground">
              Divide by n-1 (Bessel's correction). Gives unbiased estimate. Used for surveys, experiments.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Small dataset</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Find standard deviation of {2, 4, 6, 8, 10}
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Step 1: Mean = (2+4+6+8+10)/5 = 30/5 = 6
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Step 2: Squared differences: (2-6)²=16, (4-6)²=4, (6-6)²=0, (8-6)²=4, (10-6)²=16
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Step 3: Sum = 16+4+0+4+16 = 40
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Step 4: Population variance = 40/5 = 8
            </p>
            <p className="text-sm text-muted-foreground">
              Step 5: Standard deviation = √8 ≈ 2.83
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Sample vs Population</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Same data {2, 4, 6, 8, 10}, but treat as a sample
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Steps 1-3 are identical. Sum of squared differences = 40
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Step 4: Sample variance = 40/(5-1) = 40/4 = 10
            </p>
            <p className="text-sm text-muted-foreground">
              Step 5: Sample standard deviation = √10 ≈ 3.16
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Notice: Sample SD (3.16) is larger than population SD (2.83) – the n-1 correction increases the estimate.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Interpreting results</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Class A has mean=75, SD=5. Class B has mean=75, SD=15. What does this mean?
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: Both classes average 75%, but Class A is more consistent.
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Class A: Most scores between 70-80 (within 1 SD)
            </p>
            <p className="text-sm text-muted-foreground">
              Class B: Scores spread from 60-90 (within 1 SD). More variability in performance.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: Coefficient of Variation</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Dataset A: mean=100, SD=10. Dataset B: mean=50, SD=8. Which is more variable?
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: Compare coefficient of variation (CV = SD/mean × 100%)
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              CV(A) = 10/100 × 100% = 10%
            </p>
            <p className="text-sm text-muted-foreground">
              CV(B) = 8/50 × 100% = 16%. Dataset B is relatively more variable despite smaller SD.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 5: Real-world application</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Investment A returns 8% ± 2%. Investment B returns 10% ± 8%. Which is safer?
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: Standard deviation measures risk/volatility.
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Investment A: Lower return but more predictable (SD=2%)
            </p>
            <p className="text-sm text-muted-foreground">
              Investment B: Higher return but riskier (SD=8%). Returns could range from 2% to 18%.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm">
            The term "standard deviation" was coined by Karl Pearson in 1893, but the concept dates back to Abraham de Moivre's work in 1733 on the normal distribution. Pearson also introduced the symbol σ (sigma) for standard deviation, borrowing from Greek mathematics where sigma represented "sum" – fitting for a measure based on summed squared differences.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">The 68-95-99.7 Rule</h3>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-4">
            For normally distributed data, standard deviation tells you exactly what percentage of values fall within certain ranges:
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 border rounded-lg text-center">
              <p className="font-semibold text-lg">68%</p>
              <p className="text-muted-foreground">Within 1 SD of mean</p>
              <p className="text-xs mt-1">μ ± σ</p>
            </div>
            <div className="p-3 border rounded-lg text-center">
              <p className="font-semibold text-lg">95%</p>
              <p className="text-muted-foreground">Within 2 SD of mean</p>
              <p className="text-xs mt-1">μ ± 2σ</p>
            </div>
            <div className="p-3 border rounded-lg text-center">
              <p className="font-semibold text-lg">99.7%</p>
              <p className="text-muted-foreground">Within 3 SD of mean</p>
              <p className="text-xs mt-1">μ ± 3σ</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">When should I use sample vs population standard deviation?</h4>
            <p className="text-sm text-muted-foreground">
              Use population SD when you have data for everyone/everything you're studying (all students in a class, all products from a batch). Use sample SD when your data is a subset used to estimate characteristics of a larger group (survey respondents, quality control samples).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why divide by n-1 for sample standard deviation?</h4>
            <p className="text-sm text-muted-foreground">
              It's called Bessel's correction. Using n would underestimate the true population variance. Dividing by n-1 gives an unbiased estimate. The smaller your sample, the bigger the correction. With large samples (n&gt;30), the difference becomes negligible.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What does a standard deviation of 0 mean?</h4>
            <p className="text-sm text-muted-foreground">
              Every value in your dataset is identical. There's no variation at all. If everyone scored exactly 75 on a test, the mean is 75 and the standard deviation is 0.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can standard deviation be negative?</h4>
            <p className="text-sm text-muted-foreground">
              No. Standard deviation is always zero or positive. It's the square root of variance, and variance is a sum of squared values (always non-negative). A negative standard deviation is mathematically impossible.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's a "good" or "bad" standard deviation?</h4>
            <p className="text-sm text-muted-foreground">
              There's no universal answer – it depends on context. In manufacturing, low SD means consistent quality (good). In investments, high SD means high risk (could be good or bad depending on your goals). Compare SD relative to the mean using coefficient of variation.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How is standard deviation used in grading?</h4>
            <p className="text-sm text-muted-foreground">
              Some teachers use "grading on a curve." If the class mean is 65 with SD=10, a score of 75 is one SD above average. They might assign A's to scores above +1 SD, B's to +0.5 to +1 SD, etc. This adjusts for test difficulty relative to class performance.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/mean-median-mode-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Mean Median Mode</p>
            <p className="text-xs text-muted-foreground">Central tendency</p>
          </a>
          <a href="/math-tools/probability-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Probability Calculator</p>
            <p className="text-xs text-muted-foreground">Calculate probability</p>
          </a>
          <a href="/math-tools/average-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Average Calculator</p>
            <p className="text-xs text-muted-foreground">Simple average</p>
          </a>
        </div>
      </section>
    </div>
  );
}
