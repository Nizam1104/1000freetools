"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SavingsVsInvestmentComparisonPage() {
  const [initialAmount, setInitialAmount] = useState<string>("");
  const [savingsRate, setSavingsRate] = useState<string>("");
  const [investmentRate, setInvestmentRate] = useState<string>("");
  const [years, setYears] = useState<string>("");
  const [result, setResult] = useState<{
    savingsValue: number;
    investmentValue: number;
    difference: number;
    advantagePercent: number;
  } | null>(null);

  const calculateComparison = () => {
    const initial = parseFloat(initialAmount);
    const savRate = parseFloat(savingsRate) / 100;
    const invRate = parseFloat(investmentRate) / 100;
    const totalYears = parseFloat(years);

    if (isNaN(initial) || isNaN(savRate) || isNaN(invRate) || isNaN(totalYears) || initial <= 0 || totalYears <= 0) {
      return;
    }

    const savingsValue = initial * Math.pow(1 + savRate, totalYears);
    const investmentValue = initial * Math.pow(1 + invRate, totalYears);
    const difference = investmentValue - savingsValue;
    const advantagePercent = ((investmentValue - savingsValue) / savingsValue) * 100;

    setResult({
      savingsValue,
      investmentValue,
      difference,
      advantagePercent,
    });
  };

  const reset = () => {
    setInitialAmount("");
    setSavingsRate("");
    setInvestmentRate("");
    setYears("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Savings vs Investment Comparison Calculator</h1>
          <p className="text-muted-foreground">
            See how much more you could earn by investing versus keeping money in a savings account. Compare wealth accumulation at different return rates over time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="initialAmount">Initial Amount</Label>
                <Input
                  id="initialAmount"
                  type="number"
                  placeholder="Enter amount to invest"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="savingsRate">Savings Account Rate (%)</Label>
                <Input
                  id="savingsRate"
                  type="number"
                  placeholder="e.g., 0.5 for HYSA"
                  value={savingsRate}
                  onChange={(e) => setSavingsRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="investmentRate">Expected Investment Return (%)</Label>
                <Input
                  id="investmentRate"
                  type="number"
                  placeholder="e.g., 7 for stock market"
                  value={investmentRate}
                  onChange={(e) => setInvestmentRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="years">Time Period (Years)</Label>
                <Input
                  id="years"
                  type="number"
                  placeholder="Enter years"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateComparison} className="flex-1">
                  Compare
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
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Savings Account</p>
                      <p className="text-xl font-bold text-blue-600">${result.savingsValue.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Investment</p>
                      <p className="text-xl font-bold text-green-600">${result.investmentValue.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Investment Advantage</p>
                    <p className="text-2xl font-bold text-primary">${result.difference.toLocaleString()} ({result.advantagePercent.toFixed(1)}% more)</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Over {years} years, investing could earn you ${result.difference.toLocaleString()} more than savings</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter values and click Compare to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
