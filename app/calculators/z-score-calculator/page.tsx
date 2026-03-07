"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ZScoreCalculator() {
  const [value, setValue] = useState<string>("");
  const [mean, setMean] = useState<string>("");
  const [stdDev, setStdDev] = useState<string>("");
  const [result, setResult] = useState<{ zScore: number; percentile: number } | null>(null);

  const calculate = () => {
    const v = parseFloat(value);
    const m = parseFloat(mean);
    const s = parseFloat(stdDev);
    
    if (!isNaN(v) && !isNaN(m) && !isNaN(s) && s !== 0) {
      const zScore = (v - m) / s;
      // Approximate percentile using standard normal distribution
      const percentile = (1 / (1 + Math.exp(-1.702 * zScore))) * 100;
      setResult({ zScore, percentile: Math.min(99.99, Math.max(0.01, percentile)) });
    }
  };

  const reset = () => {
    setValue("");
    setMean("");
    setStdDev("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Value (X)</label>
              <Input
                type="number"
                placeholder="e.g., 85"
                step="any"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Mean (μ)</label>
              <Input
                type="number"
                placeholder="e.g., 75"
                step="any"
                value={mean}
                onChange={(e) => setMean(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Standard Deviation (σ)</label>
              <Input
                type="number"
                placeholder="e.g., 10"
                step="any"
                value={stdDev}
                onChange={(e) => setStdDev(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Z-Score</p>
                  <p className="text-2xl font-semibold">{result.zScore.toFixed(4)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Percentile</p>
                  <p className="text-xl font-semibold">{result.percentile.toFixed(2)}%</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How It Works
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Enter Your Value</h4>
                  <p className="text-xs text-muted-foreground">Input the data point (X) you want to analyze – test score, measurement, or observation.</p>
                </div>
              </div>
              <div className="flex-1 flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Provide Distribution Data</h4>
                  <p className="text-xs text-muted-foreground">Enter the population mean (μ) and standard deviation (σ) for your dataset.</p>
                </div>
              </div>
              <div className="flex-1 flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Get Z-Score & Percentile</h4>
                  <p className="text-xs text-muted-foreground">See how many standard deviations from mean and what percentile your value represents.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Z-Score Interpretation Guide
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3 font-semibold">Z-Score Range</th>
                    <th className="text-left py-2 px-3 font-semibold">Percentile Range</th>
                    <th className="text-left py-2 px-3 font-semibold">Interpretation</th>
                    <th className="text-left py-2 px-3 font-semibold">Classification</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-3 font-medium">z &gt; 2.0</td>
                    <td className="py-2 px-3 text-xs">&gt; 97.7%</td>
                    <td className="py-2 px-3 text-xs">Far above average</td>
                    <td className="py-2 px-3 text-xs">Exceptional</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3 font-medium">1.0 to 2.0</td>
                    <td className="py-2 px-3 text-xs">84% - 97.7%</td>
                    <td className="py-2 px-3 text-xs">Above average</td>
                    <td className="py-2 px-3 text-xs">High</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3 font-medium">-1.0 to 1.0</td>
                    <td className="py-2 px-3 text-xs">16% - 84%</td>
                    <td className="py-2 px-3 text-xs">Within normal range</td>
                    <td className="py-2 px-3 text-xs">Average</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3 font-medium">-2.0 to -1.0</td>
                    <td className="py-2 px-3 text-xs">2.3% - 16%</td>
                    <td className="py-2 px-3 text-xs">Below average</td>
                    <td className="py-2 px-3 text-xs">Low</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">z &lt; -2.0</td>
                    <td className="py-2 px-3 text-xs">&lt; 2.3%</td>
                    <td className="py-2 px-3 text-xs">Far below average</td>
                    <td className="py-2 px-3 text-xs">Very Low</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Key Features & Benefits
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border">
                <h4 className="font-semibold text-sm mb-2">Standard Score Calculation</h4>
                <p className="text-xs text-muted-foreground">Calculate z-score using formula: z = (X - μ) / σ to standardize any normal distribution.</p>
              </div>
              <div className="p-4 rounded-lg border">
                <h4 className="font-semibold text-sm mb-2">Percentile Conversion</h4>
                <p className="text-xs text-muted-foreground">Automatically convert z-score to percentile rank for easy interpretation of relative standing.</p>
              </div>
              <div className="p-4 rounded-lg border">
                <h4 className="font-semibold text-sm mb-2">Statistical Analysis</h4>
                <p className="text-xs text-muted-foreground">Essential for hypothesis testing, quality control, and comparing values across different scales.</p>
              </div>
              <div className="p-4 rounded-lg border">
                <h4 className="font-semibold text-sm mb-2">Educational Tool</h4>
                <p className="text-xs text-muted-foreground">Perfect for statistics students learning about normal distribution and standard scores.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold text-sm mb-2">What is a z-score?</h4>
              <p className="text-xs text-muted-foreground">
                A z-score (standard score) measures how many standard deviations a data point is from the mean. Formula: z = (X - μ) / σ. Positive z-scores are above average, negative are below, and 0 is exactly at the mean.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">What does a z-score of 1.5 mean?</h4>
              <p className="text-xs text-muted-foreground">
                A z-score of 1.5 means the value is 1.5 standard deviations above the mean. This corresponds to approximately the 93rd percentile – the value is higher than 93% of the population.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">When is a z-score considered unusual?</h4>
              <p className="text-xs text-muted-foreground">
                Values with |z| &gt; 2 are considered unusual (outside 95% of data). Values with |z| &gt; 3 are very unusual (outside 99.7% of data). These thresholds come from the empirical rule for normal distributions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">How do I convert z-score to percentile?</h4>
              <p className="text-xs text-muted-foreground">
                Use a standard normal distribution table (z-table) or calculator. The percentile = Φ(z) × 100, where Φ is the cumulative distribution function. Our calculator does this automatically using logistic approximation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">Can z-scores be used for non-normal distributions?</h4>
              <p className="text-xs text-muted-foreground">
                Z-scores can be calculated for any distribution, but percentile interpretation assumes normality. For skewed distributions, z-scores still show relative position but percentiles may differ from standard normal table values.
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
