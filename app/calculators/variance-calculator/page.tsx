"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function VarianceCalculator() {
  const [numbers, setNumbers] = useState<string>("");
  const [result, setResult] = useState<{ population: number; sample: number; mean: number } | null>(null);

  const calculate = () => {
    const nums = numbers.split(",").map((n) => parseFloat(n.trim())).filter((n) => !isNaN(n));
    if (nums.length > 1) {
      const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
      const squaredDiffs = nums.map((n) => Math.pow(n - mean, 2));
      const sumSquaredDiffs = squaredDiffs.reduce((a, b) => a + b, 0);

      setResult({
        population: sumSquaredDiffs / nums.length,
        sample: sumSquaredDiffs / (nums.length - 1),
        mean
      });
    }
  };

  const reset = () => {
    setNumbers("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Variance Calculator – Calculate Population and Sample Variance</CardTitle>
          <CardDescription>Calculate population and sample variance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Enter numbers (comma-separated)
              </label>
              <Input
                type="text"
                placeholder="e.g., 4, 8, 6, 5, 3, 7"
                value={numbers}
                onChange={(e) => setNumbers(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Population Variance (σ²)</p>
                    <p className="text-xl font-semibold">{result.population.toFixed(4)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sample Variance (s²)</p>
                    <p className="text-xl font-semibold">{result.sample.toFixed(4)}</p>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">Mean</p>
                  <p className="text-lg">{result.mean.toFixed(4)}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How Variance Calculation Works</CardTitle>
          <CardDescription>Understanding statistical variance step by step</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <div>
                <h4 className="font-semibold">Calculate the Mean</h4>
                <p className="text-sm text-muted-foreground">
                  Add all values together and divide by the count. The mean represents the center of your data. Every variance calculation starts with finding this average value.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <div>
                <h4 className="font-semibold">Find Squared Deviations</h4>
                <p className="text-sm text-muted-foreground">
                  Subtract the mean from each value, then square the result. Squaring ensures all deviations are positive and gives more weight to values far from the mean.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <div>
                <h4 className="font-semibold">Average the Squared Deviations</h4>
                <p className="text-sm text-muted-foreground">
                  For population variance, divide by n. For sample variance, divide by (n-1) – this Bessel correction gives an unbiased estimate of the true population variance.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Variance Features and Applications</CardTitle>
          <CardDescription>Why variance matters in statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Measures Data Spread**</h4>
              <p className="text-xs text-muted-foreground">
                Variance quantifies how much values differ from the mean. Low variance means data clusters tightly; high variance indicates wide dispersion. It is the foundation of statistical analysis.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Population vs Sample**</h4>
              <p className="text-xs text-muted-foreground">
                Use population variance (divide by n) when you have all data. Use sample variance (divide by n-1) when estimating from a subset. The n-1 correction prevents underestimation.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Risk Assessment**</h4>
              <p className="text-xs text-muted-foreground">
                In finance, variance measures investment volatility. Higher variance means higher risk. Portfolio theory uses variance to optimize risk-return tradeoffs through diversification.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Quality Control**</h4>
              <p className="text-xs text-muted-foreground">
                Manufacturing uses variance to monitor process consistency. Low variance in product dimensions means tight quality control. Six Sigma aims to minimize variance in production.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold mb-3">Variance and Standard Deviation Relationship</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Measure</TableHead>
                  <TableHead>Formula</TableHead>
                  <TableHead>Units</TableHead>
                  <TableHead>Use Case</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Population Variance</TableCell>
                  <TableCell className="font-mono text-xs">σ² = Σ(x-μ)² / N</TableCell>
                  <TableCell className="text-xs">Squared units</TableCell>
                  <TableCell className="text-xs">Complete datasets</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Sample Variance</TableCell>
                  <TableCell className="font-mono text-xs">s² = Σ(x-x̄)² / (n-1)</TableCell>
                  <TableCell className="text-xs">Squared units</TableCell>
                  <TableCell className="text-xs">Sample estimates</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Population Std Dev</TableCell>
                  <TableCell className="font-mono text-xs">σ = √σ²</TableCell>
                  <TableCell className="text-xs">Original units</TableCell>
                  <TableCell className="text-xs">Interpretable spread</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Sample Std Dev</TableCell>
                  <TableCell className="font-mono text-xs">s = √s²</TableCell>
                  <TableCell className="text-xs">Original units</TableCell>
                  <TableCell className="text-xs">Confidence intervals</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What is the difference between population and sample variance?</h4>
            <p className="text-xs text-muted-foreground">
              Population variance divides by n (total count), used when you have all data. Sample variance divides by (n-1), called Bessel correction, which gives an unbiased estimate when working with a sample of the population.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why do we square the deviations in variance?</h4>
            <p className="text-xs text-muted-foreground">
              Squaring ensures all deviations are positive (otherwise they sum to zero). It also gives more weight to outliers – a value 10 units from the mean contributes 100 to variance, not just 10.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What does a variance of 0 mean?</h4>
            <p className="text-xs text-muted-foreground">
              Zero variance means all values are identical – there is no spread at all. Every data point equals the mean exactly. This rarely happens in real-world data except in controlled conditions.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How is variance used in standard deviation?</h4>
            <p className="text-xs text-muted-foreground">
              Standard deviation is simply the square root of variance. While variance is in squared units (hard to interpret), standard deviation is in the original units, making it more intuitive for describing spread.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can variance be negative?</h4>
            <p className="text-xs text-muted-foreground">
              No, variance is always zero or positive. Since we square each deviation before averaging, the result cannot be negative. If you get negative variance, there is a calculation error.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <a href="/calculators/standard-deviation-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Standard Deviation Calculator</p>
              <p className="text-xs text-muted-foreground">Find standard deviation from variance</p>
            </a>
            <a href="/calculators/mean-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Mean Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate average of numbers</p>
            </a>
            <a href="/calculators/average-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Average Calculator</p>
              <p className="text-xs text-muted-foreground">Compute mean, median, and mode</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
