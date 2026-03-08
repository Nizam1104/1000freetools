"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RangeCalculator() {
  const [numbers, setNumbers] = useState<string>("");
  const [result, setResult] = useState<{ range: number; min: number; max: number } | null>(null);

  const calculate = () => {
    const nums = numbers.split(",").map((n) => parseFloat(n.trim())).filter((n) => !isNaN(n));
    if (nums.length > 0) {
      const min = Math.min(...nums);
      const max = Math.max(...nums);
      setResult({ range: max - min, min, max });
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
                placeholder="e.g., 5, 12, 3, 18, 7"
                value={numbers}
                onChange={(e) => setNumbers(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Range</p>
                  <p className="text-2xl font-semibold">{result.range}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Minimum</p>
                    <p className="text-lg font-semibold">{result.min}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Maximum</p>
                    <p className="text-lg font-semibold">{result.max}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6 max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This Range Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter your numbers</p>
                  <p>Type or paste your numbers separated by commas. You can include decimals and negative values.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Click Calculate</p>
                  <p>The calculator finds the minimum, maximum, and computes the range automatically.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Review the results</p>
                  <p>See the range value along with the minimum and maximum numbers from your set.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Range in Statistics
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                The range is the simplest measure of spread in a dataset. It tells you how far apart
                the smallest and largest values are.
              </p>
              <div className="p-4 bg-muted rounded-lg font-mono text-center">
                Range = Maximum Value - Minimum Value
              </div>
              <p>
                A large range means your data is spread out. A small range means values cluster close together.
                The range is easy to calculate but sensitive to outliers — one extreme value can skew it.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Range Examples
            </h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-mono text-xs mb-1">Dataset: 5, 12, 3, 18, 7</p>
                <p className="text-muted-foreground">Min=3, Max=18, Range=15</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-mono text-xs mb-1">Dataset: 100, 95, 102, 98, 101</p>
                <p className="text-muted-foreground">Min=95, Max=102, Range=7 (tight cluster)</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-mono text-xs mb-1">Dataset: -10, 0, 5, 20, -5</p>
                <p className="text-muted-foreground">Min=-10, Max=20, Range=30 (includes negatives)</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-mono text-xs mb-1">Dataset: 2.5, 3.1, 2.8, 4.0, 3.5</p>
                <p className="text-muted-foreground">Min=2.5, Max=4.0, Range=1.5 (decimals work)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              When to Use Range
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-xs">1</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Quick data overview</p>
                  <p>Get an instant sense of data spread without complex calculations.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-xs">2</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Quality control</p>
                  <p>Monitor process variation. A growing range may signal quality issues.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-xs">3</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Comparing datasets</p>
                  <p>Compare spread across different groups or time periods quickly.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">What does range tell me about my data?</h4>
                <p>
                  Range shows the total spread between your smallest and largest values. It gives a quick
                  sense of variability but does not show how values are distributed in between.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Can range be negative?</h4>
                <p>
                  No. Range is always zero or positive because you subtract the minimum from the maximum.
                  Even with negative numbers in your dataset, the range itself is never negative.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What if all my numbers are the same?</h4>
                <p>
                  The range is zero. This means there is no variation — every value equals the same number.
                  This can happen in controlled processes or when measuring a constant.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How do outliers affect range?</h4>
                <p>
                  Outliers have a large effect on range. One extreme value can make the range much larger
                  than the typical spread. Consider using interquartile range (IQR) if outliers are a concern.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What is the difference between range and standard deviation?</h4>
                <p>
                  Range uses only two values (min and max). Standard deviation considers every value and
                  shows how much they typically deviate from the mean. Standard deviation is more robust
                  but requires more calculation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
