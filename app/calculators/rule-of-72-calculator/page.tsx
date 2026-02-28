"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RuleOf72CalculatorPage() {
  const [interestRate, setInterestRate] = useState<string>("");
  const [result, setResult] = useState<{
    yearsToDouble: number;
    exactYears: number;
    doublingFactor: number;
  } | null>(null);

  const calculateRuleOf72 = () => {
    const rate = parseFloat(interestRate);

    if (isNaN(rate) || rate <= 0) {
      return;
    }

    const yearsToDouble = 72 / rate;
    const exactYears = Math.log(2) / Math.log(1 + rate / 100);
    const doublingFactor = Math.pow(2, Math.floor(yearsToDouble));

    setResult({
      yearsToDouble,
      exactYears,
      doublingFactor,
    });
  };

  const reset = () => {
    setInterestRate("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Rule of 72 Calculator</h1>
          <p className="text-muted-foreground">
            Estimate how long it takes to double your money with a simple mental math shortcut. Divide 72 by your annual interest rate to get the approximate doubling time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  placeholder="Enter interest rate"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                />
              </div>

              <div className="pt-4">
                <div className="text-sm text-muted-foreground">
                  <p>Rule of 72 Examples:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>6% return → 72/6 = 12 years to double</li>
                    <li>8% return → 72/8 = 9 years to double</li>
                    <li>10% return → 72/10 = 7.2 years to double</li>
                    <li>12% return → 72/12 = 6 years to double</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateRuleOf72} className="flex-1">
                  Calculate
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Years to Double (Rule of 72)</p>
                    <p className="text-3xl font-bold text-primary">{result.yearsToDouble.toFixed(1)} years</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Exact Calculation</p>
                    <p className="text-xl font-bold">{result.exactYears.toFixed(2)} years</p>
                  </div>
                  <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Difference</p>
                    <p className="text-lg font-bold text-green-600">{(result.yearsToDouble - result.exactYears).toFixed(2)} years</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>The Rule of 72 is most accurate for rates between 6% and 10%</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter interest rate and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
