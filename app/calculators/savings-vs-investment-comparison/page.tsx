"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
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

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>How to Compare Savings vs Investing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
              <div>
                <p className="font-semibold mb-1">Enter initial amount</p>
                <p className="text-sm text-muted-foreground">Input the lump sum you're considering saving or investing.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
              <div>
                <p className="font-semibold mb-1">Set interest rates</p>
                <p className="text-sm text-muted-foreground">Enter savings account rate and expected investment return.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
              <div>
                <p className="font-semibold mb-1">Compare outcomes</p>
                <p className="text-sm text-muted-foreground">See the difference in final value and investment advantage.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Why Compare Savings and Investments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="font-semibold mb-1">Understand opportunity cost</p>
                <p className="text-sm text-muted-foreground">See what you might miss by keeping money in low-yield savings.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Risk vs reward clarity</p>
                <p className="text-sm text-muted-foreground">Visualize potential gains from taking investment risk.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Long-term perspective</p>
                <p className="text-sm text-muted-foreground">Compound growth differences become dramatic over decades.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Informed decisions</p>
                <p className="text-sm text-muted-foreground">Choose the right balance of safety and growth for your goals.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Motivation to invest</p>
                <p className="text-sm text-muted-foreground">Concrete numbers show the real cost of staying in cash.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="font-semibold mb-1">Is it better to save or invest?</p>
                <p className="text-sm text-muted-foreground">Save for short-term needs and emergencies. Invest for long-term goals like retirement where growth matters more.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">What's a typical savings account rate?</p>
                <p className="text-sm text-muted-foreground">Traditional banks offer 0.01-0.1%. High-yield savings accounts offer 4-5% APY as of 2024.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">What return can I expect from investing?</p>
                <p className="text-sm text-muted-foreground">Stock market averages 7-10% annually long-term, but varies year to year. Bonds average 3-5%.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">How much more can investing earn?</p>
                <p className="text-sm text-muted-foreground">Over 30 years, $10,000 at 7% grows to $76,000 vs $13,000 at 1% - a $63,000 difference.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">What are the risks of investing?</p>
                <p className="text-sm text-muted-foreground">Investments can lose value short-term. Stocks may drop 20-50% in bear markets but historically recover.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Related Finance Calculators</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Try our other financial tools: the <a href="/calculators/compound-interest-calculator" className="text-primary hover:underline">compound interest calculator</a> for investment projections, the <a href="/calculators/stock-cagr-calculator" className="text-primary hover:underline">CAGR calculator</a> for return analysis, and the <a href="/calculators/rule-of-72-calculator" className="text-primary hover:underline">rule of 72 calculator</a> for doubling time.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
