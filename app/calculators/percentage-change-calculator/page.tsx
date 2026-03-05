"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PercentageChangeCalculator() {
  const [oldValue, setOldValue] = useState<string>("");
  const [newValue, setNewValue] = useState<string>("");
  const [result, setResult] = useState<{ change: number; direction: string } | null>(null);

  const calculate = () => {
    const old = parseFloat(oldValue);
    const newV = parseFloat(newValue);
    if (!isNaN(old) && !isNaN(newV) && old !== 0) {
      const change = ((newV - old) / Math.abs(old)) * 100;
      setResult({
        change: Math.abs(change),
        direction: change >= 0 ? "increase" : "decrease"
      });
    }
  };

  const reset = () => {
    setOldValue("");
    setNewValue("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Percentage Change Calculator</CardTitle>
          <CardDescription>Calculate the percentage increase or decrease</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Original Value</label>
              <Input
                type="number"
                placeholder="e.g., 100"
                value={oldValue}
                onChange={(e) => setOldValue(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">New Value</label>
              <Input
                type="number"
                placeholder="e.g., 125"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Percentage {result.direction}</p>
                <p className="text-2xl font-semibold">{result.change.toFixed(2)}%</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>How to Use This Percentage Change Calculator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">1</div>
              <div>
                <p className="font-medium text-foreground">Enter the original value</p>
                <p>Input the starting or old value — this is your baseline for comparison.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">2</div>
              <div>
                <p className="font-medium text-foreground">Enter the new value</p>
                <p>Input the ending or current value that you want to compare to the original.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">3</div>
              <div>
                <p className="font-medium text-foreground">Click Calculate</p>
                <p>The calculator shows the percentage increase or decrease from the original to the new value.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Percentage Change Examples</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Scenario</th>
                    <th className="text-left py-3 px-2 font-semibold">From</th>
                    <th className="text-left py-3 px-2 font-semibold">To</th>
                    <th className="text-left py-3 px-2 font-semibold">Change</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Salary raise</td>
                    <td className="py-3 px-2">$50,000</td>
                    <td className="py-3 px-2">$55,000</td>
                    <td className="py-3 px-2 text-green-600">+10.00%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Sale discount</td>
                    <td className="py-3 px-2">$80</td>
                    <td className="py-3 px-2">$60</td>
                    <td className="py-3 px-2 text-red-600">-25.00%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Stock price gain</td>
                    <td className="py-3 px-2">$125</td>
                    <td className="py-3 px-2">$150</td>
                    <td className="py-3 px-2 text-green-600">+20.00%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Population decline</td>
                    <td className="py-3 px-2">10,000</td>
                    <td className="py-3 px-2">9,500</td>
                    <td className="py-3 px-2 text-red-600">-5.00%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Test score improvement</td>
                    <td className="py-3 px-2">72</td>
                    <td className="py-3 px-2">85</td>
                    <td className="py-3 px-2 text-green-600">+18.06%</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Weight loss</td>
                    <td className="py-3 px-2">180 lbs</td>
                    <td className="py-3 px-2">165 lbs</td>
                    <td className="py-3 px-2 text-red-600">-8.33%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Understanding Percentage Change</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">The Percentage Change Formula</h4>
              <p>Percentage change measures how much a value has increased or decreased relative to its starting point. The formula is: ((New Value - Original Value) / Original Value) × 100. A positive result means an increase. A negative result means a decrease.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Why Percentage Change Matters</h4>
              <p>Raw numbers don't tell the whole story. A $10 increase means very different things for a $20 stock versus a $200 stock. Percentage change puts everything on the same scale, making comparisons meaningful across different magnitudes.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Common Uses</h4>
              <p>People calculate percentage change for price changes, investment returns, salary adjustments, population growth, test score improvements, weight changes, and performance metrics. Any time you need to compare before and after, percentage change gives a clear picture.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tips for Percentage Change Calculations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Original Value Is the Denominator</p>
                <p>Always divide by the original (starting) value, not the new value. This is a common mistake that gives wrong results.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Sign Indicates Direction</p>
                <p>Positive means increase, negative means decrease. Some contexts report the absolute value with "increase" or "decrease" specified separately.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Cannot Calculate From Zero</p>
                <p>If the original value is zero, percentage change is undefined. You can't divide by zero. Report absolute change instead.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Reversing a Percentage Change</p>
                <p>A 50% increase followed by a 50% decrease doesn't return to the original. $100 up 50% is $150. Down 50% from $150 is $75. The base keeps changing.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">How do I calculate percentage increase?</h4>
              <p>Subtract the original from the new value, divide by the original, multiply by 100. Example: from 80 to 100 is (100-80)/80 × 100 = 25% increase.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">How do I calculate percentage decrease?</h4>
              <p>Use the same formula. A decrease gives a negative result. From 100 to 80: (80-100)/100 × 100 = -20%. Report as 20% decrease.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">What's the difference between percentage change and percentage points?</h4>
              <p>Percentage change is relative. Percentage points are absolute differences between percentages. If unemployment goes from 5% to 7%, that's a 2 percentage point increase but a 40% increase ((7-5)/5 × 100).</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Can percentage change be more than 100%?</h4>
              <p>Yes. If something doubles, that's a 100% increase. If it triples, that's a 200% increase. Going from 50 to 200 is a 300% increase.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Why is my percentage change negative?</h4>
              <p>A negative percentage change means the new value is smaller than the original — it's a decrease. The formula naturally produces negative numbers when new is less than original.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Related Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <a href="/calculators/percentage-calculator" className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <span className="font-medium text-foreground">Percentage Calculator</span>
                <p className="text-muted-foreground">Calculate percentages, what percent of, and more</p>
              </a>
              <a href="/calculators/discount-calculator" className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <span className="font-medium text-foreground">Discount Calculator</span>
                <p className="text-muted-foreground">Calculate sale prices and savings</p>
              </a>
              <a href="/calculators/inflation-calculator" className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <span className="font-medium text-foreground">Inflation Calculator</span>
                <p className="text-muted-foreground">Calculate purchasing power changes over time</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
