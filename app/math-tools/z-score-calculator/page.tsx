"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ZScoreCalculator() {
  const [value, setValue] = useState("");
  const [mean, setMean] = useState("");
  const [stdDev, setStdDev] = useState("");
  const [result, setResult] = useState<{
    zScore: number;
    interpretation: string;
    percentile?: number;
  } | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    const val = parseFloat(value);
    const m = parseFloat(mean);
    const sd = parseFloat(stdDev);

    if (isNaN(val) || isNaN(m) || isNaN(sd)) {
      setError("Please enter valid numbers for all fields");
      setResult(null);
      return;
    }

    if (sd <= 0) {
      setError("Standard deviation must be greater than 0");
      setResult(null);
      return;
    }

    setError("");
    const zScore = (val - m) / sd;
    const roundedZScore = Math.round(zScore * 10000) / 10000;

    let interpretation = "";
    if (roundedZScore === 0) {
      interpretation = "Exactly at the mean";
    } else if (roundedZScore > 0) {
      interpretation = `${roundedZScore} standard deviation${Math.abs(roundedZScore) !== 1 ? "s" : ""} above the mean`;
    } else {
      interpretation = `${Math.abs(roundedZScore)} standard deviation${Math.abs(roundedZScore) !== 1 ? "s" : ""} below the mean`;
    }

    const percentile = approximatePercentile(zScore);

    setResult({
      zScore: roundedZScore,
      interpretation,
      percentile: Math.round(percentile * 100) / 100,
    });
  };

  const approximatePercentile = (z: number): number => {
    const t = 1 / (1 + 0.2316419 * Math.abs(z));
    const d = 0.3989423 * Math.exp(-z * z / 2);
    const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return z > 0 ? 1 - p : p;
  };

  const reset = () => {
    setValue("");
    setMean("");
    setStdDev("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Z-Score Calculator – Find Standard Score Online</h1>
        <p className="text-muted-foreground">
          Calculate the Z-score of any data point with our free online Z-score calculator. Enter the value, mean, and standard deviation to get the standardized score instantly.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>Data Value (X)</Label>
            <Input
              type="number"
              placeholder="e.g., 85"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div>
            <Label>Mean (μ)</Label>
            <Input
              type="number"
              placeholder="e.g., 75"
              value={mean}
              onChange={(e) => setMean(e.target.value)}
            />
          </div>
          <div>
            <Label>Standard Deviation (σ)</Label>
            <Input
              type="number"
              placeholder="e.g., 10"
              value={stdDev}
              onChange={(e) => setStdDev(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate Z-Score</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">Z-Score</p>
              <p className="text-5xl font-bold">{result.zScore}</p>
              <p className="text-sm text-muted-foreground mt-2">{result.interpretation}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Approximately {result.percentile}th percentile
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Formula Used</h4>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                Z = (X - μ) / σ = ({value} - {mean}) / {stdDev} = {result.zScore}
              </code>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Understanding Z-Scores</h2>
        <p className="text-muted-foreground">
          A Z-score (standard score) tells you how many standard deviations a data point is from the mean. It's a way to standardize values from different normal distributions, making them comparable.
        </p>
        <p className="text-muted-foreground">
          Positive Z-scores indicate values above the mean, negative Z-scores indicate values below the mean, and a Z-score of 0 means the value equals the mean.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Z-Score Interpretation Guide</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Z = 0</h3>
            <p className="text-sm text-muted-foreground">
              The value equals the mean. About 50% of data falls below this point.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Z = ±1</h3>
            <p className="text-sm text-muted-foreground">
              One standard deviation from the mean. About 68% of data falls within ±1.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Z = ±2</h3>
            <p className="text-sm text-muted-foreground">
              Two standard deviations from the mean. About 95% of data falls within ±2.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Z = ±3</h3>
            <p className="text-sm text-muted-foreground">
              Three standard deviations from the mean. About 99.7% of data falls within ±3.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">|Z| &gt; 2</h3>
            <p className="text-sm text-muted-foreground">
              Often considered unusual or noteworthy in statistical analysis.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">|Z| &gt; 3</h3>
            <p className="text-sm text-muted-foreground">
              Typically considered an outlier in most datasets.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Real-World Examples</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Test Scores</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Class average: 75, Standard deviation: 10, Your score: 85
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              Z = (85 - 75) / 10 = 1.0
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              You scored 1 standard deviation above average, placing you around the 84th percentile.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Height Comparison</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Average male height: 175 cm, SD: 7 cm, Your height: 161 cm
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              Z = (161 - 175) / 7 = -2.0
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              You are 2 standard deviations below average, around the 2nd percentile.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Quality Control</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Target weight: 500g, SD: 5g, Sample weight: 512g
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              Z = (512 - 500) / 5 = 2.4
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              This sample is 2.4 standard deviations above target – may indicate a process issue.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What does a Z-score tell you?</h3>
            <p className="text-sm text-muted-foreground">
              A Z-score tells you how far a data point is from the mean, measured in standard deviations. It standardizes values so you can compare data from different distributions.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Can Z-scores be negative?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Negative Z-scores indicate values below the mean. A Z-score of -1.5 means the value is 1.5 standard deviations below the average.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What is a good Z-score?</h3>
            <p className="text-sm text-muted-foreground">
              It depends on context. In test scores, higher is better. In quality control, values close to 0 are ideal. Generally, Z-scores between -2 and +2 are considered typical.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How do you find the percentile from a Z-score?</h3>
            <p className="text-sm text-muted-foreground">
              Use a standard normal distribution table (Z-table) or calculator. The table gives the area under the curve to the left of your Z-score, which equals the percentile.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">When should I use Z-scores?</h3>
            <p className="text-sm text-muted-foreground">
              Use Z-scores when comparing values from different datasets, identifying outliers, calculating probabilities in normal distributions, or standardizing data for analysis.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/standard-deviation-variance-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Standard Deviation Calculator</p>
            <p className="text-xs text-muted-foreground">Calculate spread of data</p>
          </a>
          <a href="/math-tools/average-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Average Calculator</p>
            <p className="text-xs text-muted-foreground">Find the mean</p>
          </a>
          <a href="/math-tools/mean-median-mode-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Mean, Median, Mode</p>
            <p className="text-xs text-muted-foreground">Central tendency measures</p>
          </a>
        </div>
      </section>
    </div>
  );
}
