"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoanPayoffTimeCalculatorPage() {
  const [principal, setPrincipal] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [monthlyPayment, setMonthlyPayment] = useState<string>("");
  const [result, setResult] = useState<{
    months: number;
    years: number;
    totalInterest: number;
    totalPayment: number;
  } | null>(null);

  const calculatePayoffTime = () => {
    const P = parseFloat(principal);
    const R = parseFloat(interestRate) / 12 / 100;
    const M = parseFloat(monthlyPayment);

    if (isNaN(P) || isNaN(R) || isNaN(M) || P <= 0 || R < 0 || M <= 0) {
      return;
    }

    if (M <= P * R) {
      return;
    }

    const n = -Math.log(1 - (P * R) / M) / Math.log(1 + R);
    const totalPayment = M * n;
    const totalInterest = totalPayment - P;

    setResult({
      months: Math.ceil(n),
      years: n / 12,
      totalInterest,
      totalPayment,
    });
  };

  const reset = () => {
    setPrincipal("");
    setInterestRate("");
    setMonthlyPayment("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Loan Payoff Time Calculator</h1>
          <p className="text-muted-foreground">
            Find out exactly how long it will take to become debt-free. Enter your loan balance, interest rate, and fixed monthly payment to see your payoff timeline.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="principal">Loan Balance</Label>
                <Input
                  id="principal"
                  type="number"
                  placeholder="Enter current loan balance"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  placeholder="Enter annual interest rate"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyPayment">Monthly Payment</Label>
                <Input
                  id="monthlyPayment"
                  type="number"
                  placeholder="Enter monthly payment amount"
                  value={monthlyPayment}
                  onChange={(e) => setMonthlyPayment(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculatePayoffTime} className="flex-1">
                  Calculate Payoff Time
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
                    <p className="text-sm text-muted-foreground">Time to Payoff</p>
                    <p className="text-2xl font-bold text-primary">{result.years.toFixed(1)} years ({result.months} months)</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Interest</p>
                      <p className="text-lg font-bold">${result.totalInterest.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Payment</p>
                      <p className="text-lg font-bold">${result.totalPayment.toFixed(2)}</p>
                    </div>
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
