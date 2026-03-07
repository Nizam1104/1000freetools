"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MedianCalculator() {
  const [numbers, setNumbers] = useState<string>("");
  const [result, setResult] = useState<{ median: number; sorted: number[] } | null>(null);

  const calculate = () => {
    const nums = numbers.split(",").map((n) => parseFloat(n.trim())).filter((n) => !isNaN(n));
    if (nums.length > 0) {
      const sorted = [...nums].sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      const median = sorted.length % 2 !== 0 
        ? sorted[mid] 
        : (sorted[mid - 1] + sorted[mid]) / 2;
      setResult({ median, sorted });
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
                placeholder="e.g., 5, 2, 8, 1, 9"
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
                  <p className="text-sm text-muted-foreground">Median</p>
                  <p className="text-2xl font-semibold">{result.median}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sorted Values</p>
                  <p className="text-lg">{result.sorted.join(", ")}</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 pt-6 border-t space-y-4">
            <div>
              <h4 className="font-semibold text-sm mb-2">How the Median Is Calculated</h4>
              <p className="text-xs text-muted-foreground">
                Values are sorted from smallest to largest. For odd counts, the median is the middle value. For even counts, it's the average of the two middle values.
              </p>
            </div>
            <div className="p-3 bg-muted/50 rounded text-xs space-y-1">
              <div><strong>Odd count (5 values):</strong> 1, 3, <u>5</u>, 7, 9 → Median = 5</div>
              <div><strong>Even count (6 values):</strong> 1, 3, <u>5, 7</u>, 9, 11 → Median = (5+7)/2 = 6</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>How to Use This Median Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-xs">1</div>
              <div>
                <p className="font-medium text-foreground">Enter your numbers</p>
                <p>Type or paste numbers separated by commas. Spaces are ignored. Example: "5, 2, 8, 1, 9"</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-xs">2</div>
              <div>
                <p className="font-medium text-foreground">Click Calculate</p>
                <p>The calculator sorts your values and finds the median automatically.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-xs">3</div>
              <div>
                <p className="font-medium text-foreground">View results</p>
                <p>See the median value and the sorted list of all your numbers.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Understanding the Median</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The median is the middle value in a sorted dataset. Half the values fall below it, half above. Unlike the mean (average), the median is not affected by extreme outliers.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2 font-semibold">Measure</th>
                  <th className="text-left py-2 px-2 font-semibold">Best For</th>
                  <th className="text-left py-2 px-2 font-semibold">Affected by Outliers</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="py-2 px-2">Median</td>
                  <td className="py-2 px-2">Skewed distributions</td>
                  <td className="py-2 px-2">No</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-2">Mean</td>
                  <td className="py-2 px-2">Symmetric distributions</td>
                  <td className="py-2 px-2">Yes</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-2">Mode</td>
                  <td className="py-2 px-2">Categorical data</td>
                  <td className="py-2 px-2">No</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground">
            Example: Incomes of $30k, $35k, $40k, $45k, $1M. Mean = $230k (misleading). Median = $40k (more representative).
          </p>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>When to Use the Median</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Skewed data</p>
                <p>When your data has a long tail on one side, the median gives a better sense of the "typical" value.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Data with outliers</p>
                <p>Extreme values don't pull the median up or down like they do the mean.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Ordinal data</p>
                <p>For ranked data (like survey responses), the median makes sense even when the mean doesn't.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-sm mb-2">How do I find the median manually?</h4>
            <p className="text-xs text-muted-foreground">
              Sort your numbers from smallest to largest. If you have an odd count, pick the middle number. If even, average the two middle numbers. For 1, 5, 7, 9, 12: median is 7. For 1, 5, 7, 9: median is (5+7)/2 = 6.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">When is the median better than the mean?</h4>
            <p className="text-xs text-muted-foreground">
              Use the median when your data is skewed or has outliers. Home prices, salaries, and test scores often have extreme values that make the mean misleading. The median tells you what a "typical" value looks like.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">Can the median be a decimal?</h4>
            <p className="text-xs text-muted-foreground">
              Yes. When you have an even number of values, the median is the average of the two middle numbers. If those are 5 and 8, the median is 6.5. This is normal and expected.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">What if all my numbers are the same?</h4>
            <p className="text-xs text-muted-foreground">
              The median equals that number. If every value is 10, the median is 10. This makes sense—there's no variation in your data, so the middle value is the same as every value.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">Does the median work with negative numbers?</h4>
            <p className="text-xs text-muted-foreground">
              Yes. Sort them normally: -10, -5, -2, 0, 3. The median is -2. Negative numbers are just values less than zero and work the same way in median calculations.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
