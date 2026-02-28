"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RecurringDepositCalculatorPage() {
  const [monthlyDeposit, setMonthlyDeposit] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [tenure, setTenure] = useState<string>("");
  const [result, setResult] = useState<{
    totalDeposited: number;
    maturityAmount: number;
    interestEarned: number;
  } | null>(null);

  const calculateRD = () => {
    const P = parseFloat(monthlyDeposit);
    const R = parseFloat(interestRate) / 100 / 12;
    const N = parseFloat(tenure) * 12;

    if (isNaN(P) || isNaN(R) || isNaN(N) || P <= 0 || R <= 0 || N <= 0) {
      return;
    }

    const totalDeposited = P * N;
    const maturityAmount = P * ((Math.pow(1 + R, N) - 1) / R) * (1 + R);
    const interestEarned = maturityAmount - totalDeposited;

    setResult({
      totalDeposited,
      maturityAmount,
      interestEarned,
    });
  };

  const reset = () => {
    setMonthlyDeposit("");
    setInterestRate("");
    setTenure("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Recurring Deposit (RD) Calculator</h1>
          <p className="text-muted-foreground">
            Calculate the maturity value of your recurring deposit. Enter your monthly installment, interest rate, and tenure to see how your RD grows over time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="monthlyDeposit">Monthly Deposit Amount</Label>
                <Input
                  id="monthlyDeposit"
                  type="number"
                  placeholder="Enter monthly deposit"
                  value={monthlyDeposit}
                  onChange={(e) => setMonthlyDeposit(e.target.value)}
                />
              </div>

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

              <div className="space-y-2">
                <Label htmlFor="tenure">Tenure (Years)</Label>
                <Input
                  id="tenure"
                  type="number"
                  placeholder="Enter tenure"
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateRD} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Maturity Amount</p>
                    <p className="text-3xl font-bold text-primary">${result.maturityAmount.toLocaleString()}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Deposited</p>
                      <p className="text-lg font-bold">${result.totalDeposited.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Interest Earned</p>
                      <p className="text-lg font-bold text-green-600">${result.interestEarned.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Monthly deposit: ${parseFloat(monthlyDeposit).toFixed(2)} | Tenure: {tenure} years</p>
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
