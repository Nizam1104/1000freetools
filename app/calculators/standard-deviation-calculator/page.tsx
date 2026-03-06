"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function StandardDeviationCalculator() {
  const [numbers, setNumbers] = useState<string>("");
  const [result, setResult] = useState<{
    population: number;
    sample: number;
    variance: number;
    mean: number;
  } | null>(null);

  const calculate = () => {
    const nums = numbers.split(",").map((n) => parseFloat(n.trim())).filter((n) => !isNaN(n));
    if (nums.length > 1) {
      const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
      const squaredDiffs = nums.map((n) => Math.pow(n - mean, 2));
      const sumSquaredDiffs = squaredDiffs.reduce((a, b) => a + b, 0);
      const populationVariance = sumSquaredDiffs / nums.length;
      const sampleVariance = sumSquaredDiffs / (nums.length - 1);
      
      setResult({
        population: Math.sqrt(populationVariance),
        sample: Math.sqrt(sampleVariance),
        variance: populationVariance,
        mean
      });
    }
  };

  const reset = () => {
    setNumbers("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
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
                    <p className="text-sm text-muted-foreground">Population Std Dev (σ)</p>
                    <p className="text-xl font-semibold">{result.population.toFixed(4)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sample Std Dev (s)</p>
                    <p className="text-xl font-semibold">{result.sample.toFixed(4)}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Variance (σ²)</p>
                    <p className="text-lg">{result.variance.toFixed(4)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Mean (μ)</p>
                    <p className="text-lg">{result.mean.toFixed(4)}</p>
                  </div>
                </div>
              </div>
            )}

            {/* How It Works Section */}
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-semibold mb-4">How to Calculate Standard Deviation</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mb-2">1</div>
                  <h5 className="font-medium text-sm mb-1">Enter Data</h5>
                  <p className="text-xs text-muted-foreground">Input your numbers separated by commas.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mb-2">2</div>
                  <h5 className="font-medium text-sm mb-1">Calculate</h5>
                  <p className="text-xs text-muted-foreground">Click calculate to compute statistics instantly.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mb-2">3</div>
                  <h5 className="font-medium text-sm mb-1">View Results</h5>
                  <p className="text-xs text-muted-foreground">See population and sample standard deviation.</p>
                </div>
              </div>
            </div>

            {/* Formula Section */}
            <div className="mt-4 p-4 bg-primary/5 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Standard Deviation Formulas</h4>
              <p className="font-mono text-sm mb-1">Population: σ = √(Σ(x - μ)² / N)</p>
              <p className="font-mono text-sm">Sample: s = √(Σ(x - x̄)² / (n - 1))</p>
              <p className="text-xs text-muted-foreground mt-2">Where μ = mean, N = population size, n = sample size</p>
            </div>

            {/* When to Use Section */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="p-3 bg-muted rounded-lg">
                <h5 className="font-semibold text-sm mb-1">Population σ</h5>
                <p className="text-xs text-muted-foreground">Use when you have data for the entire population.</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <h5 className="font-semibold text-sm mb-1">Sample s</h5>
                <p className="text-xs text-muted-foreground">Use when working with a sample to estimate population parameters.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
