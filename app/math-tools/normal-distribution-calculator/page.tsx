"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function erf(x: number): number {
  const sign = x >= 0 ? 1 : -1;
  x = Math.abs(x);
  
  const a1 =  0.254829592;
  const a2 = -0.284496736;
  const a3 =  1.421413741;
  const a4 = -1.453152027;
  const a5 =  1.061405429;
  const p  =  0.3275911;
  
  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  
  return sign * y;
}

function standardNormalCDF(z: number): number {
  return 0.5 * (1 + erf(z / Math.sqrt(2)));
}

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
  const c = [
    -7.784894002430293e-03, -3.223964580411365e-01,
    -2.400758277161838e+00, -2.549732539343734e+00,
    4.374664141464968e+00, 2.938163982698783e+00
  ];
  const d = [
    7.784695709041462e-03, 3.224671290700398e-01,
    2.445134137142996e+00, 3.754408661907416e+00
  ];
  
  const pLow = 0.02425;
  const pHigh = 1 - pLow;
  
  let q: number, r: number, x: number;
  
  if (p < pLow) {
    q = Math.sqrt(-2 * Math.log(p));
    x = (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
        ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  } else if (p <= pHigh) {
    q = p - 0.5;
    r = q * q;
    x = (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q /
        (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
  } else {
    q = Math.sqrt(-2 * Math.log(1 - p));
    x = -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
         ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }
  
  return x;
}

export default function NormalDistributionCalculator() {
  const [mode, setMode] = useState<"probability" | "percentile">("probability");
  const [mean, setMean] = useState("0");
  const [stdDev, setStdDev] = useState("1");
  const [xValue, setXValue] = useState("");
  const [percentile, setPercentile] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setResult(null);

    const mu = parseFloat(mean);
    const sigma = parseFloat(stdDev);

    if (isNaN(mu) || isNaN(sigma) || sigma <= 0) {
      setError("Please enter valid mean and positive standard deviation");
      return;
    }

    if (mode === "probability") {
      const x = parseFloat(xValue);
      if (isNaN(x)) {
        setError("Please enter an x value");
        return;
      }

      const z = (x - mu) / sigma;
      const cdf = standardNormalCDF(z);
      const pdf = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * z * z);

      setResult({
        z: Math.round(z * 10000) / 10000,
        probability: Math.round(cdf * 10000) / 10000,
        probabilityPercent: Math.round(cdf * 10000) / 100,
        pdf: Math.round(pdf * 10000) / 10000,
        lessThan: Math.round(cdf * 10000) / 10000,
        greaterThan: Math.round((1 - cdf) * 10000) / 10000,
        steps: [
          `z = (x - μ) / σ = (${x} - ${mu}) / ${sigma} = ${z.toFixed(4)}`,
          `P(X < ${x}) = P(Z < ${z.toFixed(4)}) = ${cdf.toFixed(6)}`,
          `P(X > ${x}) = 1 - ${cdf.toFixed(6)} = ${(1 - cdf).toFixed(6)}`
        ]
      });
    } else {
      const p = parseFloat(percentile) / 100;
      if (isNaN(p) || p <= 0 || p >= 1) {
        setError("Please enter a percentile between 0 and 100");
        return;
      }

      const z = inverseStandardNormalCDF(p);
      const x = mu + z * sigma;

      setResult({
        z: Math.round(z * 10000) / 10000,
        xValue: Math.round(x * 10000) / 10000,
        percentile: parseFloat(percentile),
        steps: [
          `For the ${percentile}th percentile, find z such that P(Z < z) = ${p}`,
          `z = ${z.toFixed(4)}`,
          `x = μ + zσ = ${mu} + ${z.toFixed(4)}(${sigma}) = ${x.toFixed(4)}`
        ]
      });
    }
  };

  const reset = () => {
    setMean("0");
    setStdDev("1");
    setXValue("");
    setPercentile("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Normal Distribution Calculator – Find Probability & Percentile</h1>
        <p className="text-muted-foreground">
          Calculate probabilities and percentiles for a normal distribution with our free online calculator. Input mean and standard deviation to find area under the bell curve.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Mean (μ)</Label>
            <Input
              type="number"
              placeholder="Mean"
              value={mean}
              onChange={(e) => setMean(e.target.value)}
            />
          </div>
          <div>
            <Label>Standard Deviation (σ)</Label>
            <Input
              type="number"
              placeholder="Standard deviation"
              value={stdDev}
              onChange={(e) => setStdDev(e.target.value)}
            />
          </div>
        </div>

        <Tabs value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
          <TabsList>
            <TabsTrigger value="probability">Find Probability</TabsTrigger>
            <TabsTrigger value="percentile">Find Percentile</TabsTrigger>
          </TabsList>

          <TabsContent value="probability" className="space-y-4 mt-4">
            <div>
              <Label>X Value</Label>
              <Input
                type="number"
                placeholder="Enter x value"
                value={xValue}
                onChange={(e) => setXValue(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Find P(X &lt; x) - the probability that a value is less than x
              </p>
            </div>
          </TabsContent>

          <TabsContent value="percentile" className="space-y-4 mt-4">
            <div>
              <Label>Percentile</Label>
              <Input
                type="number"
                placeholder="Enter percentile (0-100)"
                value={percentile}
                onChange={(e) => setPercentile(e.target.value)}
                min="0"
                max="100"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Find the x value below which the given percentage of data falls
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            {mode === "probability" ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-2">Z-Score</p>
                    <p className="text-2xl font-bold">{result.z}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-2">P(X &lt; x)</p>
                    <p className="text-2xl font-bold">{result.probabilityPercent}%</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-2">P(X &lt; x)</p>
                    <p className="text-xl font-semibold">{result.lessThan}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-2">P(X &gt; x)</p>
                    <p className="text-xl font-semibold">{result.greaterThan}</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-2">Z-Score</p>
                    <p className="text-2xl font-bold">{result.z}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-2">X Value</p>
                    <p className="text-2xl font-bold">{result.xValue}</p>
                  </div>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    The {result.percentile}th percentile is x = {result.xValue}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {result.percentile}% of values fall below {result.xValue}
                  </p>
                </div>
              </>
            )}

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

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Understanding Normal Distribution</h2>
        <p className="text-muted-foreground">
          The normal distribution, also called the Gaussian distribution or bell curve, is the most important probability distribution in statistics. Many natural phenomena follow this pattern: heights, test scores, measurement errors, and more.
        </p>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium mb-2">The Normal Distribution Formula</p>
          <code className="text-xs font-mono">
            f(x) = (1 / (σ√(2π))) × e^(-(x-μ)² / (2σ²))
          </code>
          <p className="text-xs text-muted-foreground mt-2">
            Where μ is the mean (center) and σ is the standard deviation (spread).
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">The Empirical Rule (68-95-99.7)</h2>
        <p className="text-muted-foreground">
          For any normal distribution, approximately:
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-muted rounded-lg text-center">
            <div className="text-3xl font-bold text-primary mb-2">68%</div>
            <p className="text-sm text-muted-foreground">
              of data falls within 1 standard deviation of the mean (μ ± σ)
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg text-center">
            <div className="text-3xl font-bold text-primary mb-2">95%</div>
            <p className="text-sm text-muted-foreground">
              of data falls within 2 standard deviations (μ ± 2σ)
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg text-center">
            <div className="text-3xl font-bold text-primary mb-2">99.7%</div>
            <p className="text-sm text-muted-foreground">
              of data falls within 3 standard deviations (μ ± 3σ)
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Z-Scores Explained</h2>
        <p className="text-muted-foreground">
          A z-score tells you how many standard deviations a value is from the mean. It standardizes any normal distribution to the standard normal (μ = 0, σ = 1).
        </p>
        <div className="p-4 bg-muted rounded-lg">
          <code className="text-sm font-mono">z = (x - μ) / σ</code>
          <p className="text-xs text-muted-foreground mt-2">
            Positive z-scores are above the mean; negative z-scores are below.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm font-semibold">z = 0</p>
            <p className="text-xs text-muted-foreground">Exactly at the mean (50th percentile)</p>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm font-semibold">z = 1.96</p>
            <p className="text-xs text-muted-foreground">97.5th percentile (used in 95% CI)</p>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm font-semibold">z = -1.645</p>
            <p className="text-xs text-muted-foreground">5th percentile</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Normal Distribution Examples</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Example 1: Test Scores</h3>
            <p className="text-sm text-muted-foreground mb-2">
              SAT scores are normally distributed with μ = 1000 and σ = 200. What percentage scored below 1200?
            </p>
            <code className="text-sm font-mono bg-background px-2 py-1 rounded block">
              z = (1200 - 1000) / 200 = 1.0{'\n'}
              P(Z &lt; 1.0) = 0.8413 = 84.13%
            </code>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Example 2: Finding Percentiles</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Adult male heights: μ = 70 inches, σ = 3 inches. What height is the 90th percentile?
            </p>
            <code className="text-sm font-mono bg-background px-2 py-1 rounded block">
              z for 90th percentile ≈ 1.28{'\n'}
              x = 70 + 1.28(3) = 73.84 inches
            </code>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Example 3: Quality Control</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Widget weights: μ = 50g, σ = 2g. What's the probability a widget weighs more than 54g?
            </p>
            <code className="text-sm font-mono bg-background px-2 py-1 rounded block">
              z = (54 - 50) / 2 = 2.0{'\n'}
              P(Z &gt; 2.0) = 1 - 0.9772 = 0.0228 = 2.28%
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div>
          <h3 className="font-semibold mb-2">Why is it called "normal" distribution?</h3>
          <p className="text-sm text-muted-foreground">
            Despite the name, "normal" doesn't mean "usual" or "typical." The term comes from the Latin "norma" (carpenter's square). It was called "normal" because this distribution was considered the standard or reference distribution.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">When can I use the normal distribution?</h3>
          <p className="text-sm text-muted-foreground">
            Many real-world phenomena approximate normal distributions, especially when you're averaging many independent factors. The Central Limit Theorem guarantees that sample means approach normality as sample size increases.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What's the difference between PDF and CDF?</h3>
          <p className="text-sm text-muted-foreground">
            PDF (probability density function) gives the relative likelihood at a specific point. CDF (cumulative distribution function) gives the probability that a value is less than or equal to x. For continuous distributions, we use CDF for probabilities.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Can probability be greater than 1?</h3>
          <p className="text-sm text-muted-foreground">
            No. Probabilities range from 0 to 1 (or 0% to 100%). The PDF can exceed 1 for narrow distributions, but the total area under the curve always equals 1.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What if my data isn't normally distributed?</h3>
          <p className="text-sm text-muted-foreground">
            Many distributions aren't normal. For skewed data, consider log-normal or gamma distributions. For count data, use Poisson or binomial. Always check your data's distribution before applying normal-based methods.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/z-score-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Z-Score Calculator</p>
            <p className="text-xs text-muted-foreground">Calculate z-scores</p>
          </a>
          <a href="/math-tools/confidence-interval-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Confidence Interval</p>
            <p className="text-xs text-muted-foreground">Find confidence intervals</p>
          </a>
          <a href="/math-tools/standard-deviation-variance-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Standard Deviation</p>
            <p className="text-xs text-muted-foreground">Calculate σ and variance</p>
          </a>
        </div>
      </section>
    </div>
  );
}
