"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function MinimumPaymentCalculatorPage() {
  const [balance, setBalance] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [minPaymentPercent, setMinPaymentPercent] = useState<string>("2");
  const [result, setResult] = useState<{
    monthsToPayoff: number;
    yearsToPayoff: number;
    totalInterest: number;
    totalPayment: number;
    minPayment: number;
  } | null>(null);

  const calculateMinimumPayment = () => {
    const B = parseFloat(balance);
    const R = parseFloat(interestRate) / 100 / 12;
    const minPercent = parseFloat(minPaymentPercent) / 100;

    if (isNaN(B) || isNaN(R) || isNaN(minPercent) || B <= 0 || R < 0 || minPercent <= 0) {
      return;
    }

    let currentBalance = B;
    let totalPayment = 0;
    let months = 0;
    const minPaymentAmount = Math.max(B * minPercent, 25);

    while (currentBalance > 0.01 && months < 600) {
      const interest = currentBalance * R;
      const payment = Math.max(currentBalance, minPaymentAmount);
      const principal = payment - interest;
      currentBalance -= principal;
      totalPayment += payment;
      months++;
    }

    setResult({
      monthsToPayoff: months,
      yearsToPayoff: Math.round(months / 12 * 10) / 10,
      totalInterest: totalPayment - B,
      totalPayment,
      minPayment: minPaymentAmount,
    });
  };

  const reset = () => {
    setBalance("");
    setInterestRate("");
    setMinPaymentPercent("2");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Credit Card Minimum Payment Calculator</h1>
          <p className="text-muted-foreground">
            Discover the true cost of paying only the minimum on your credit card. See the total interest paid and years it takes to clear your balance this way.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="balance">Current Balance</Label>
                <Input
                  id="balance"
                  type="number"
                  placeholder="Enter credit card balance"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  placeholder="Enter APR"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="minPaymentPercent">Minimum Payment (%)</Label>
                <Input
                  id="minPaymentPercent"
                  type="number"
                  placeholder="Default is 2%"
                  value={minPaymentPercent}
                  onChange={(e) => setMinPaymentPercent(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateMinimumPayment} className="flex-1">
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
                  <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Time to Payoff</p>
                    <p className="text-2xl font-bold text-red-600">{result.yearsToPayoff} years ({result.monthsToPayoff} months)</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Minimum Monthly Payment</p>
                    <p className="text-2xl font-bold">${result.minPayment.toFixed(2)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Interest</p>
                      <p className="text-lg font-bold text-orange-600">${result.totalInterest.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Payment</p>
                      <p className="text-lg font-bold">${result.totalPayment.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Warning: Paying only minimum extends debt significantly</p>
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
