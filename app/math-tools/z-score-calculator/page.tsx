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

      <div className="mt-16 space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">How the Z-Score Calculator Works</h2>
          <p className="text-muted-foreground mb-4">
            A Z-score (or standard score) tells you how many standard deviations a data point is from the mean. It standardizes values from different normal distributions, allowing you to compare scores from different scales and determine how unusual a value is.
          </p>
          <p className="text-muted-foreground mb-4">
            The Z-score formula is:
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            Z = (X - μ) / σ
          </div>
          <p className="text-muted-foreground mb-4">
            Where X is your data value, μ (mu) is the population mean, and σ (sigma) is the population standard deviation. A positive Z-score means the value is above average; negative means below average.
          </p>
          <p className="text-muted-foreground">
            The calculator also converts your Z-score to a percentile, showing what percentage of values fall below yours in a normal distribution.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Example Z-Score Calculations</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">Test Score Example</h3>
          <p className="text-muted-foreground mb-2">
            SAT score analysis (mean = 1050, SD = 200):
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <p>Your score: 1350</p>
            <p>Z = (1350 - 1050) / 200 = 300 / 200 = <strong>1.5</strong></p>
            <p className="mt-2">Interpretation:</p>
            <p>• 1.5 standard deviations above average</p>
            <p>• Approximately 93rd percentile</p>
            <p>• Better than 93% of test-takers</p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">Height Comparison</h3>
          <p className="text-muted-foreground mb-2">
            Adult male height (mean = 70 inches, SD = 3 inches):
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <p>Height: 64 inches</p>
            <p>Z = (64 - 70) / 3 = -6 / 3 = <strong>-2.0</strong></p>
            <p className="mt-2">Interpretation:</p>
            <p>• 2 standard deviations below average</p>
            <p>• Approximately 2nd percentile</p>
            <p>• Taller than only 2% of men</p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">Quality Control</h3>
          <p className="text-muted-foreground mb-2">
            Widget weight (target = 100g, SD = 2g):
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <p>Sample weight: 105g</p>
            <p>Z = (105 - 100) / 2 = 5 / 2 = <strong>2.5</strong></p>
            <p className="mt-2">Interpretation:</p>
            <p>• 2.5 SD above target (unusual!)</p>
            <p>• Outside typical 2-sigma control limits</p>
            <p>• May indicate production issue</p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">Comparing Different Tests</h3>
          <p className="text-muted-foreground mb-2">
            Which score is better relative to its test?
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <p>Test A: Score 85 (mean 75, SD 10)</p>
            <p>Z = (85-75)/10 = 1.0</p>
            <p className="mt-2">Test B: Score 92 (mean 88, SD 5)</p>
            <p>Z = (92-88)/5 = 0.8</p>
            <p className="mt-2">Conclusion: Test A score is better relative to peers</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Quick Fact: The Normal Distribution's Secret</h2>
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-6 rounded-lg">
            <p className="text-muted-foreground">
              The Z-score is tied to the <strong>normal distribution</strong> (bell curve), first described by <strong>Abraham de Moivre</strong> in 1733 while studying gambling probabilities. Later, <strong>Carl Friedrich Gauss</strong> used it to analyze astronomical data, earning it the name "Gaussian distribution." The "68-95-99.7 rule" states that 68% of values fall within Z = ±1, 95% within Z = ±2, and 99.7% within Z = ±3. This is why Z-scores beyond ±2 are considered unusual and Z-scores beyond ±3 are rare outliers. The normal distribution appears everywhere in nature—from human heights to measurement errors—making Z-scores universally useful.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">What does a Z-score of 0 mean?</h3>
              <p className="text-muted-foreground">
                A Z-score of 0 means the value equals the mean exactly—it's right at the average. This corresponds to the 50th percentile: half the values are above, half are below. It's the center of the normal distribution.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What Z-score is considered unusual?</h3>
              <p className="text-muted-foreground">
                Values with |Z| &gt; 2 (more than 2 standard deviations from the mean) are considered unusual, occurring in only about 5% of cases. Values with |Z| &gt; 3 are rare outliers, happening less than 0.3% of the time. In quality control, Z &gt; 3 often triggers investigation.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Can Z-scores be negative?</h3>
              <p className="text-muted-foreground">
                Yes! Negative Z-scores indicate values below the mean. A Z-score of -1.5 means the value is 1.5 standard deviations below average. The sign tells you direction (above or below), while the magnitude tells you how far.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How do I convert Z-score to percentile?</h3>
              <p className="text-muted-foreground">
                Use a standard normal table (Z-table) or calculator. The table gives the area under the curve to the left of your Z-score. For Z = 1.0, the area is 0.8413, meaning 84.13th percentile. This calculator does the conversion automatically.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">When can I use Z-scores?</h3>
              <p className="text-muted-foreground">
                Z-scores work best when data follows a normal (bell-shaped) distribution. They're commonly used for test scores, heights, weights, measurement errors, and many natural phenomena. For skewed distributions, Z-scores may be misleading.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What's the difference between Z-score and T-score?</h3>
              <p className="text-muted-foreground">
                Z-scores use the population standard deviation (σ). T-scores use the sample standard deviation (s) and are used when the population SD is unknown. T-scores follow a t-distribution, which has fatter tails. For large samples (n &gt; 30), they're nearly identical.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How are Z-scores used in real life?</h3>
              <p className="text-muted-foreground">
                Z-scores appear in: standardized testing (SAT, IQ tests), medical diagnostics (bone density T-scores), finance (Z-score bankruptcy prediction), quality control (Six Sigma), and psychology (assessing how far a score deviates from normal). They're essential for statistical inference.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
