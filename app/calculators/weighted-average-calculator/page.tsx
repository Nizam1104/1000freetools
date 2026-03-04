"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function WeightedAverageCalculator() {
  const [values, setValues] = useState<string>("");
  const [weights, setWeights] = useState<string>("");
  const [result, setResult] = useState<{ weightedAvg: number; sumWeights: number } | null>(null);

  const calculate = () => {
    const vals = values.split(",").map((v) => parseFloat(v.trim())).filter((n) => !isNaN(n));
    const wgts = weights.split(",").map((w) => parseFloat(w.trim())).filter((n) => !isNaN(n));
    
    if (vals.length > 0 && vals.length === wgts.length) {
      let weightedSum = 0;
      let weightSum = 0;
      
      for (let i = 0; i < vals.length; i++) {
        weightedSum += vals[i] * wgts[i];
        weightSum += wgts[i];
      }
      
      if (weightSum > 0) {
        setResult({
          weightedAvg: weightedSum / weightSum,
          sumWeights: weightSum
        });
      }
    }
  };

  const reset = () => {
    setValues("");
    setWeights("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Weighted Average Calculator</CardTitle>
          <CardDescription>Calculate weighted average with custom weights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Values (comma-separated)</label>
              <Input
                type="text"
                placeholder="e.g., 80, 90, 75"
                value={values}
                onChange={(e) => setValues(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Weights (comma-separated)</label>
              <Input
                type="text"
                placeholder="e.g., 2, 3, 1"
                value={weights}
                onChange={(e) => setWeights(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Weighted Average</p>
                  <p className="text-2xl font-semibold">{result.weightedAvg.toFixed(4)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sum of Weights</p>
                  <p className="text-lg">{result.sumWeights}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* How It Works Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">How to Calculate Weighted Average</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="font-semibold mb-2">Enter Values</h3>
              <p className="text-sm text-muted-foreground">Input your data values separated by commas (e.g., 80, 90, 75).</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="font-semibold mb-2">Enter Weights</h3>
              <p className="text-sm text-muted-foreground">Input corresponding weights for each value, also comma-separated.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
            <div>
              <h3 className="font-semibold mb-2">Get Weighted Average</h3>
              <p className="text-sm text-muted-foreground">Click calculate to see the weighted average and total weights.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Key Features of This Weighted Average Calculator</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">**Simple Input Format**</h3>
            <p className="text-sm text-muted-foreground">Enter values and weights as comma-separated lists for quick calculation.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**Any Number of Items**</h3>
            <p className="text-sm text-muted-foreground">Calculate weighted averages for any number of value-weight pairs.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**Accurate Formula**</h3>
            <p className="text-sm text-muted-foreground">Uses Σ(value × weight) / Σ(weights) for mathematically correct results.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">**Educational Tool**</h3>
            <p className="text-sm text-muted-foreground">Perfect for students learning statistics and weighted calculations.</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">What is a weighted average?</h3>
            <p className="text-sm text-muted-foreground">A weighted average gives different importance (weights) to different values. It&apos;s calculated by multiplying each value by its weight, summing those products, then dividing by the sum of weights.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">When should I use weighted average?</h3>
            <p className="text-sm text-muted-foreground">Use weighted averages when some values matter more than others - like GPA (credits as weights), portfolio returns (investment amounts), or graded assignments (point values).</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">How is weighted average different from regular average?</h3>
            <p className="text-sm text-muted-foreground">A regular average treats all values equally. A weighted average gives more influence to values with higher weights. If all weights are equal, weighted average equals regular average.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">Do weights need to add up to 1 or 100%?</h3>
            <p className="text-sm text-muted-foreground">No! Weights can be any positive numbers. The formula automatically normalizes by dividing by the sum of weights. Using percentages is optional.</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold mb-2">Can weights be zero or negative?</h3>
            <p className="text-sm text-muted-foreground">Weights should be positive. A zero weight effectively excludes that value. Negative weights don&apos;t make sense for typical weighted average applications.</p>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Related Calculators</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <a href="/calculators/average-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            <h3 className="font-semibold mb-1">Average Calculator</h3>
            <p className="text-sm text-muted-foreground">Calculate simple arithmetic mean of a set of numbers.</p>
          </a>
          <a href="/calculators/gpa-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            <h3 className="font-semibold mb-1">GPA Calculator</h3>
            <p className="text-sm text-muted-foreground">Calculate grade point average with credit hour weights.</p>
          </a>
          <a href="/calculators/percentage-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            <h3 className="font-semibold mb-1">Percentage Calculator</h3>
            <p className="text-sm text-muted-foreground">Calculate percentages for grades, tips, and discounts.</p>
          </a>
        </div>
      </div>
    </div>
  );
}
