"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function inverseStandardNormalCDF(p: number): number {
  if (p <= 0 || p >= 1) {
    return p <= 0 ? -Infinity : Infinity;
  }

  const a = [
    -3.969683028665376e+01, 2.209460984245205e+02,
    -2.759285104469687e+02, 1.383577518672690e+02,
    -3.066479806614716e+01, 2.506628277459239e+00
  ];
  const b = [
    -5.447609879822406e+01, 1.615858368580409e+02,
    -1.556989798598866e+02, 6.680131188771972e+01,
    -1.328068155288572e+01
  ];

  const pLow = 0.02425;
  const pHigh = 1 - pLow;

  let q: number, r: number, x: number;

  if (p < pLow) {
    q = Math.sqrt(-2 * Math.log(p));
    x = (((((a[0] * q + a[1]) * q + a[2]) * q + a[3]) * q + a[4]) * q + a[5]) /
      ((((a[0] * 0 + b[1]) * q + b[2]) * q + b[3]) * q + b[4]) * q + 1;
  } else if (p <= pHigh) {
    q = p - 0.5;
    r = q * q;
    x = (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q /
      (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
  } else {
    q = Math.sqrt(-2 * Math.log(1 - p));
    x = -(((((a[0] * q + a[1]) * q + a[2]) * q + a[3]) * q + a[4]) * q + a[5]) /
      ((((b[0] * q + b[1]) * q + b[2]) * q + b[3]) * q + 1);
  }

  return x;
}

export default function ConfidenceIntervalCalculator() {
  const [sampleMean, setSampleMean] = useState("");
  const [stdDev, setStdDev] = useState("");
  const [sampleSize, setSampleSize] = useState("");
  const [confidenceLevel, setConfidenceLevel] = useState("95");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const zScores: Record<string, number> = {
    "90": 1.645,
    "95": 1.96,
    "98": 2.326,
    "99": 2.576,
    "99.9": 3.291
  };

  const calculate = () => {
    setError("");
    setResult(null);

    const mean = parseFloat(sampleMean);
    const sd = parseFloat(stdDev);
    const n = parseInt(sampleSize);

    if ([mean, sd, n].some(isNaN) || n <= 0 || sd <= 0) {
      setError("Please enter valid positive values");
      return;
    }

    if (n < 30) {
      setError("Note: For n < 30, consider using t-distribution instead of z-distribution");
    }

    const z = zScores[confidenceLevel];
    const standardError = sd / Math.sqrt(n);
    const marginOfError = z * standardError;
    const lowerBound = mean - marginOfError;
    const upperBound = mean + marginOfError;

    setResult({
      mean,
      standardError: Math.round(standardError * 10000) / 10000,
      marginOfError: Math.round(marginOfError * 10000) / 10000,
      lowerBound: Math.round(lowerBound * 10000) / 10000,
      upperBound: Math.round(upperBound * 10000) / 10000,
      z,
      steps: [
        `Standard Error (SE) = σ / √n = ${sd} / √${n} = ${standardError.toFixed(4)}`,
        `Z-score for ${confidenceLevel}% confidence = ${z}`,
        `Margin of Error = Z × SE = ${z} × ${standardError.toFixed(4)} = ${marginOfError.toFixed(4)}`,
        `Confidence Interval = mean ± margin of error`,
        `= ${mean} ± ${marginOfError.toFixed(4)}`,
        `= (${lowerBound.toFixed(4)}, ${upperBound.toFixed(4)})`
      ]
    });
  };

  const reset = () => {
    setSampleMean("");
    setStdDev("");
    setSampleSize("");
    setConfidenceLevel("95");
    setResult(null);
    setError("");
  };

  const loadExample = (type: string) => {
    const examples: Record<string, { mean: string; sd: string; n: string; cl: string }> = {
      test: { mean: "75", sd: "10", n: "100", cl: "95" },
      height: { mean: "170", sd: "8", n: "50", cl: "95" },
      income: { mean: "52000", sd: "15000", n: "200", cl: "99" },
      weight: { mean: "68", sd: "12", n: "75", cl: "90" },
      temperature: { mean: "22.5", sd: "3.2", n: "30", cl: "95" },
      satisfaction: { mean: "4.2", sd: "0.8", n: "150", cl: "95" },
      reaction: { mean: "0.35", sd: "0.05", n: "40", cl: "98" }
    };
    const ex = examples[type] || examples.test;
    setSampleMean(ex.mean);
    setStdDev(ex.sd);
    setSampleSize(ex.n);
    setConfidenceLevel(ex.cl);
    setResult(null);
  };

  return (
    <div className="w-full mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Confidence Interval Calculator – Find CI for Mean Online</h1>
        <p className="text-muted-foreground">
          Calculate confidence intervals for population means with our free online confidence interval calculator. Supports 90%, 95%, and 99% confidence levels with margin of error shown.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Sample Mean (x̄)</Label>
            <Input
              type="number"
              placeholder="Sample mean"
              value={sampleMean}
              onChange={(e) => setSampleMean(e.target.value)}
            />
          </div>
          <div>
            <Label>Std Deviation (σ)</Label>
            <Input
              type="number"
              placeholder="Standard deviation"
              value={stdDev}
              onChange={(e) => setStdDev(e.target.value)}
            />
          </div>
          <div>
            <Label>Sample Size (n)</Label>
            <Input
              type="number"
              placeholder="Sample size"
              value={sampleSize}
              onChange={(e) => setSampleSize(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label>Confidence Level</Label>
          <Select value={confidenceLevel} onValueChange={setConfidenceLevel}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="90">90% Confidence</SelectItem>
              <SelectItem value="95">95% Confidence</SelectItem>
              <SelectItem value="98">98% Confidence</SelectItem>
              <SelectItem value="99">99% Confidence</SelectItem>
              <SelectItem value="99.9">99.9% Confidence</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={calculate}>Calculate Confidence Interval</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("test")}>Test Scores</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("height")}>Heights</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("income")}>Income</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("weight")}>Weight</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("temperature")}>Temperature</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("satisfaction")}>Satisfaction</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("reaction")}>Reaction Time</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">{result.mean} ± {result.marginOfError}</p>
              <p className="text-2xl font-bold">
                ({result.lowerBound}, {result.upperBound})
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {confidenceLevel}% Confidence Interval
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Standard Error</p>
                <p className="text-xl font-semibold">{result.standardError}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Margin of Error</p>
                <p className="text-xl font-semibold">±{result.marginOfError}</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Step-by-Step Solution</h4>
              <div className="space-y-2">
                {result.steps.map((step: string, index: number) => (
                  <code key={index} className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                    {step}
                  </code>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Confidence Intervals</h2>
        <p className="text-muted-foreground">
          A confidence interval gives you a range of plausible values for a population parameter – like the true average – based on your sample data. Instead of saying "the average height is 170 cm," you say "we're 95% confident the true average is between 168 and 172 cm." That range is the confidence interval.
        </p>
        <p className="text-muted-foreground">
          The confidence level (90%, 95%, 99%) tells you how certain you want to be. Higher confidence means a wider interval – you cast a bigger net to be more sure you've caught the true value. A 99% confidence interval is wider than a 95% interval for the same data because you're demanding more certainty.
        </p>
        <p className="text-muted-foreground">
          Here's what "95% confident" really means: if you took 100 different samples and calculated 100 confidence intervals, about 95 of them would contain the true population mean. Any single interval either contains the true mean or it doesn't, but the method works 95% of the time in the long run.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">The Confidence Interval Formula</h2>
        <div className="p-6 bg-muted rounded-lg">
          <div className="font-mono text-lg mb-4 text-center">
            CI = x̄ ± Z × (σ / √n)
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="p-3 border rounded-lg">
                <div className="font-semibold">x̄</div>
                <div className="text-muted-foreground">Sample mean (your best estimate)</div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="font-semibold">Z</div>
                <div className="text-muted-foreground">Z-score for your confidence level</div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="font-semibold">σ</div>
                <div className="text-muted-foreground">Population standard deviation</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="p-3 border rounded-lg">
                <div className="font-semibold">n</div>
                <div className="text-muted-foreground">Sample size</div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="font-semibold">σ/√n</div>
                <div className="text-muted-foreground">Standard error of the mean</div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="font-semibold">Z × (σ/√n)</div>
                <div className="text-muted-foreground">Margin of error</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Common Z-Scores</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 bg-muted rounded">
                <span>90% Confidence</span>
                <span className="font-mono">Z = 1.645</span>
              </div>
              <div className="flex justify-between p-2 bg-muted rounded">
                <span>95% Confidence</span>
                <span className="font-mono">Z = 1.96</span>
              </div>
              <div className="flex justify-between p-2 bg-muted rounded">
                <span>98% Confidence</span>
                <span className="font-mono">Z = 2.326</span>
              </div>
              <div className="flex justify-between p-2 bg-muted rounded">
                <span>99% Confidence</span>
                <span className="font-mono">Z = 2.576</span>
              </div>
              <div className="flex justify-between p-2 bg-muted rounded">
                <span>99.9% Confidence</span>
                <span className="font-mono">Z = 3.291</span>
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">What Affects Interval Width</h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-semibold">Sample Size (n)</div>
                <div className="text-muted-foreground">Larger samples give narrower intervals (more precision)</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-semibold">Standard Deviation (σ)</div>
                <div className="text-muted-foreground">More variability means wider intervals</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-semibold">Confidence Level</div>
                <div className="text-muted-foreground">Higher confidence = wider interval</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Worked Examples</h2>
        <div className="space-y-4">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 1: Test Scores</h3>
            <p className="text-sm text-muted-foreground mb-3">A sample of 100 students has mean score 75 with standard deviation 10. Find the 95% confidence interval.</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>x̄ =</strong> 75</div>
              <div><strong>σ =</strong> 10</div>
              <div><strong>n =</strong> 100</div>
              <div><strong>Z (95%) =</strong> 1.96</div>
              <div className="pt-2 border-t">
                <div>Standard Error = σ/√n = 10/√100 = 10/10 = 1</div>
                <div>Margin of Error = Z × SE = 1.96 × 1 = 1.96</div>
                <div className="font-semibold mt-2">CI = 75 ± 1.96 = (73.04, 76.96)</div>
              </div>
              <div className="text-muted-foreground">
                We're 95% confident the true population mean test score is between 73.04 and 76.96.
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 2: Adult Heights</h3>
            <p className="text-sm text-muted-foreground mb-3">Sample of 50 adults has mean height 170 cm with standard deviation 8 cm. Calculate 95% CI.</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>x̄ =</strong> 170 cm</div>
              <div><strong>σ =</strong> 8 cm</div>
              <div><strong>n =</strong> 50</div>
              <div><strong>Z (95%) =</strong> 1.96</div>
              <div className="pt-2 border-t">
                <div>Standard Error = 8/√50 = 8/7.07 = 1.13</div>
                <div>Margin of Error = 1.96 × 1.13 = 2.22</div>
                <div className="font-semibold mt-2">CI = 170 ± 2.22 = (167.78, 172.22) cm</div>
              </div>
              <div className="text-muted-foreground">
                The true mean height is likely between 167.78 and 172.22 cm with 95% confidence.
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 3: Household Income</h3>
            <p className="text-sm text-muted-foreground mb-3">Survey of 200 households finds mean income $52,000 with standard deviation $15,000. Find 99% CI.</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>x̄ =</strong> $52,000</div>
              <div><strong>σ =</strong> $15,000</div>
              <div><strong>n =</strong> 200</div>
              <div><strong>Z (99%) =</strong> 2.576</div>
              <div className="pt-2 border-t">
                <div>Standard Error = 15000/√200 = 15000/14.14 = 1060.66</div>
                <div>Margin of Error = 2.576 × 1060.66 = 2732.26</div>
                <div className="font-semibold mt-2">CI = $52,000 ± $2,732 = ($49,268, $54,732)</div>
              </div>
              <div className="text-muted-foreground">
                With 99% confidence, the true mean household income is between $49,268 and $54,732.
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 4: Product Satisfaction</h3>
            <p className="text-sm text-muted-foreground mb-3">150 customers rate a product 4.2 out of 5 (σ = 0.8). Find the 95% confidence interval.</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>x̄ =</strong> 4.2</div>
              <div><strong>σ =</strong> 0.8</div>
              <div><strong>n =</strong> 150</div>
              <div><strong>Z (95%) =</strong> 1.96</div>
              <div className="pt-2 border-t">
                <div>Standard Error = 0.8/√150 = 0.8/12.25 = 0.065</div>
                <div>Margin of Error = 1.96 × 0.065 = 0.13</div>
                <div className="font-semibold mt-2">CI = 4.2 ± 0.13 = (4.07, 4.33)</div>
              </div>
              <div className="text-muted-foreground">
                We're 95% confident the true satisfaction rating is between 4.07 and 4.33 out of 5.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Quick Fact</h2>
        <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm">
            <strong>Jerzy Neyman</strong> (1894-1981), a Polish mathematician, formalized confidence interval theory in 1937. Before Neyman, statisticians used "fiducial inference" and other less rigorous approaches. Neyman showed that confidence intervals have a precise long-run frequency interpretation: over many repeated samples, a 95% CI method will capture the true parameter 95% of the time. His work with Egon Pearson also created the modern framework for hypothesis testing. Neyman's ideas transformed statistics from an art into a rigorous mathematical science.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-sm mb-2">What does "95% confident" actually mean?</h3>
            <p className="text-sm text-muted-foreground">
              It means the method works 95% of the time in the long run. If you took 100 samples and computed 100 confidence intervals, about 95 would contain the true population mean. For any single interval, the true mean is either inside or outside – there's no probability about that specific interval. The 95% refers to the reliability of the method.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">When should I use t-distribution instead of z-distribution?</h3>
            <p className="text-sm text-muted-foreground">
              Use the t-distribution when your sample size is small (n &lt; 30) or when you don't know the population standard deviation and must estimate it from your sample. The t-distribution has fatter tails, giving wider (more conservative) intervals. For large samples (n ≥ 30), t and z give nearly identical results.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">How do I make my confidence interval narrower?</h3>
            <p className="text-sm text-muted-foreground">
              Three ways: (1) Increase your sample size – this is usually the best option. Doubling your sample reduces the margin of error by about 30%. (2) Accept a lower confidence level (e.g., 90% instead of 95%). (3) Reduce variability in your measurements through better experimental design or more precise instruments.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">What's the difference between standard deviation and standard error?</h3>
            <p className="text-sm text-muted-foreground">
              Standard deviation measures how spread out individual data points are. Standard error measures how much sample means vary from sample to sample. Standard error = standard deviation / √n. As your sample gets larger, the standard error shrinks (you estimate the mean more precisely), but the standard deviation stays the same (the population variability doesn't change).
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">Can a confidence interval include negative values?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, if that makes sense for your measurement. Temperature differences, changes in weight, or profit/loss can all be negative. But if you're measuring something that can't be negative (like height or time), and your interval includes negative values, it suggests your estimate is very imprecise – the true value is probably close to zero.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">What if my confidence interval is too wide to be useful?</h3>
            <p className="text-sm text-muted-foreground">
              A wide interval means you need more data. Calculate how large a sample you'd need for your desired margin of error: n = (Z × σ / E)², where E is your target margin of error. For example, to estimate a mean within ±2 units at 95% confidence with σ = 10, you need n = (1.96 × 10 / 2)² ≈ 96 samples.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">Does a 99% CI mean I'm 99% sure the true mean is in my interval?</h3>
            <p className="text-sm text-muted-foreground">
              Not exactly – that's a common misconception. The true mean is a fixed value, not a random variable. Either it's in your interval or it isn't. The 99% refers to the method: if everyone used this method, 99% of their intervals would capture the true mean. Your specific interval either succeeded or failed; you just don't know which.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
