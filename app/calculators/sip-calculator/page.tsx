"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SIPCalculatorPage() {
  const [monthlyContribution, setMonthlyContribution] = useState<string>("");
  const [expectedReturn, setExpectedReturn] = useState<string>("");
  const [investmentDuration, setInvestmentDuration] = useState<string>("");
  const [result, setResult] = useState<{
    investedAmount: number;
    maturityValue: number;
    wealthGained: number;
  } | null>(null);

  const calculateSIP = () => {
    const P = parseFloat(monthlyContribution);
    const R = parseFloat(expectedReturn) / 12 / 100;
    const N = parseFloat(investmentDuration) * 12;

    if (isNaN(P) || isNaN(R) || isNaN(N) || P <= 0 || R <= 0 || N <= 0) {
      return;
    }

    const investedAmount = P * N;
    const maturityValue = P * ((Math.pow(1 + R, N) - 1) / R) * (1 + R);
    const wealthGained = maturityValue - investedAmount;

    setResult({ investedAmount, maturityValue, wealthGained });
  };

  const reset = () => {
    setMonthlyContribution("");
    setExpectedReturn("");
    setInvestmentDuration("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">SIP Calculator – Systematic Investment Plan</h1>
          <p className="text-muted-foreground">
            Estimate the maturity value of your mutual fund SIP. Enter your monthly contribution, expected annual return, and investment duration to see your corpus.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="monthlyContribution">Monthly Contribution</Label>
                <Input
                  id="monthlyContribution"
                  type="number"
                  placeholder="Enter monthly SIP amount"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
                <Input
                  id="expectedReturn"
                  type="number"
                  placeholder="Enter expected return rate"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="investmentDuration">Investment Duration (Years)</Label>
                <Input
                  id="investmentDuration"
                  type="number"
                  placeholder="Enter investment duration"
                  value={investmentDuration}
                  onChange={(e) => setInvestmentDuration(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateSIP} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Maturity Value</p>
                    <p className="text-3xl font-bold text-primary">${result.maturityValue.toFixed(2)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Invested Amount</p>
                      <p className="text-lg font-bold">${result.investedAmount.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Wealth Gained</p>
                      <p className="text-lg font-bold text-green-600">${result.wealthGained.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Monthly SIP: ${parseFloat(monthlyContribution).toFixed(2)} | Duration: {investmentDuration} years | Expected Return: {expectedReturn}%</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter values and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
