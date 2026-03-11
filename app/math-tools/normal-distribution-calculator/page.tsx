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

  const examples = [
    { name: "Standard Normal", mode: "probability" as const, mean: "0", stdDev: "1", xValue: "1.96" },
    { name: "Test Scores", mode: "probability" as const, mean: "75", stdDev: "10", xValue: "85" },
    { name: "Heights", mode: "probability" as const, mean: "170", stdDev: "10", xValue: "180" },
    { name: "95th Percentile", mode: "percentile" as const, mean: "100", stdDev: "15", percentile: "95" },
    { name: "Top 10%", mode: "percentile" as const, mean: "500", stdDev: "100", percentile: "90" },
    { name: "Middle 50%", mode: "percentile" as const, mean: "0", stdDev: "1", percentile: "75" }
  ];

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

  const loadExample = (index: number) => {
    const ex = examples[index];
    setMode(ex.mode);
    setMean(ex.mean);
    setStdDev(ex.stdDev);
    if (ex.xValue) setXValue(ex.xValue);
    if (ex.percentile) setPercentile(ex.percentile);
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

          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Examples:</span>
            {examples.map((ex, idx) => (
              <Button key={idx} variant="outline" size="sm" onClick={() => loadExample(idx)}>{ex.name}</Button>
            ))}
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
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding the Normal Distribution</h2>
        <p className="text-muted-foreground">
          The normal distribution, also called the Gaussian distribution or "bell curve," is the most important probability distribution in statistics. It describes how values cluster around a central mean, with fewer values appearing as you move away from the center.
        </p>
        <p className="text-muted-foreground">
          Many natural phenomena follow normal distributions: human heights, test scores, measurement errors, and blood pressure readings. The Central Limit Theorem explains why – when you average many independent random variables, the result tends toward normality.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">The Normal Distribution Formula</h3>
        <div className="p-4 bg-muted rounded-lg">
          <code className="text-sm font-mono block">
            f(x) = (1 / σ√(2π)) x e^(-(x-μ)² / 2σ²)
          </code>
          <p className="text-sm text-muted-foreground mt-2">
            Where μ = mean (center) and σ = standard deviation (spread)
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">68-95-99.7 Rule</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>68% within 1σ of mean</li>
              <li>95% within 2σ of mean</li>
              <li>99.7% within 3σ of mean</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Z-Score Formula</h4>
            <code className="text-xs font-mono block">z = (x - μ) / σ</code>
            <p className="text-xs text-muted-foreground mt-1">Standardizes any normal to N(0,1)</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Properties</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>Symmetric about mean</li>
              <li>Mean = Median = Mode</li>
              <li>Total area = 1</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: Standard Normal Probability</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Find P(Z &lt; 1.96) for standard normal</div>
              <div>z = 1.96 (already standardized)</div>
              <div>P(Z &lt; 1.96) = 0.9750 = 97.5%</div>
              <div className="text-muted-foreground">This is the critical value for 95% confidence!</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: Test Scores</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Test scores: μ = 75, σ = 10</div>
              <div>What % scored below 85?</div>
              <div>z = (85 - 75) / 10 = 1.0</div>
              <div>P(X &lt; 85) = P(Z &lt; 1) = 0.8413 = 84.13%</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: Finding Percentile</h4>
            <div className="font-mono text-sm space-y-2">
              <div>IQ scores: μ = 100, σ = 15</div>
              <div>Find the 95th percentile</div>
              <div>z for 95th percentile = 1.645</div>
              <div>x = 100 + 1.645(15) = 124.675</div>
              <div>95% of people score below 125</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: Two-Tailed Probability</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Find P(-1 &lt; Z &lt; 1)</div>
              <div>P(Z &lt; 1) = 0.8413</div>
              <div>P(Z &lt; -1) = 0.1587</div>
              <div>P(-1 &lt; Z &lt; 1) = 0.8413 - 0.1587 = 0.6826</div>
              <div className="text-muted-foreground">About 68% – matches the empirical rule!</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <p className="text-sm">
            The normal distribution was first described by Abraham de Moivre in 1733 as an approximation to the binomial distribution. Carl Friedrich Gauss later used it to analyze astronomical data, which is why it's sometimes called the Gaussian distribution. The bell curve shape appears throughout nature due to the Central Limit Theorem.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What does the Z-score tell me?</h4>
            <p className="text-sm text-muted-foreground">
              The Z-score tells you how many standard deviations a value is from the mean. Z = 0 is at the mean, Z = 1 is one standard deviation above, Z = -2 is two below. It standardizes any normal distribution to the standard normal N(0,1).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is the total area under the curve equal to 1?</h4>
            <p className="text-sm text-muted-foreground">
              The area represents probability. Since something must happen (100% certainty), the total area equals 1 (or 100%). The area between any two points gives the probability of a value falling in that range.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">When can I use the normal distribution?</h4>
            <p className="text-sm text-muted-foreground">
              Use it when data is symmetric and bell-shaped, or when working with sample means (Central Limit Theorem). Many statistical tests assume normality. For small samples or skewed data, consider other distributions.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between PDF and CDF?</h4>
            <p className="text-sm text-muted-foreground">
              PDF (probability density function) gives the height of the curve at a point. CDF (cumulative distribution function) gives the area under the curve up to that point – the probability of being less than or equal to that value.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I find the probability between two values?</h4>
            <p className="text-sm text-muted-foreground">
              Find the CDF for each value, then subtract: P(a &lt; X &lt; b) = P(X &lt; b) - P(X &lt; a). For example, P(-1 &lt; Z &lt; 1) = 0.8413 - 0.1587 = 0.6826.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What are critical values?</h4>
            <p className="text-sm text-muted-foreground">
              Critical values are Z-scores that correspond to specific tail probabilities. Common ones: Z = 1.96 for 95% confidence (two-tailed), Z = 1.645 for 95% (one-tailed), Z = 2.576 for 99% confidence.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
