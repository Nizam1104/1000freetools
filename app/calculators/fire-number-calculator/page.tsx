"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FIRENumberCalculatorPage() {
  const [annualExpenses, setAnnualExpenses] = useState<string>("");
  const [withdrawalRate, setWithdrawalRate] = useState<string>("4");
  const [currentSavings, setCurrentSavings] = useState<string>("");
  const [annualReturn, setAnnualReturn] = useState<string>("7");
  const [result, setResult] = useState<{
    fireNumber: number;
    yearsToFire: number;
    savingsGap: number;
  } | null>(null);

  const calculateFIRE = () => {
    const expenses = parseFloat(annualExpenses);
    const withdrawal = parseFloat(withdrawalRate) / 100;
    const savings = parseFloat(currentSavings) || 0;
    const retRate = parseFloat(annualReturn) / 100;

    if (isNaN(expenses) || isNaN(withdrawal) || isNaN(retRate) || expenses <= 0 || withdrawal <= 0) {
      return;
    }

    const fireNumber = expenses / withdrawal;
    const savingsGap = fireNumber - savings;

    let yearsToFire = 0;
    if (savingsGap > 0) {
      yearsToFire = Math.log(1 + (savingsGap * retRate) / expenses) / Math.log(1 + retRate);
    }

    setResult({
      fireNumber,
      yearsToFire: Math.max(0, Math.round(yearsToFire * 10) / 10),
      savingsGap,
    });
  };

  const reset = () => {
    setAnnualExpenses("");
    setWithdrawalRate("4");
    setCurrentSavings("");
    setAnnualReturn("7");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">FIRE Number Calculator – Financial Independence</h1>
          <p className="text-muted-foreground">
            Calculate your FIRE number—the net worth needed to retire early. Based on your annual expenses and safe withdrawal rate, find your path to financial independence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="annualExpenses">Annual Expenses</Label>
                <Input
                  id="annualExpenses"
                  type="number"
                  placeholder="Enter yearly expenses"
                  value={annualExpenses}
                  onChange={(e) => setAnnualExpenses(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="withdrawalRate">Safe Withdrawal Rate (%)</Label>
                <Input
                  id="withdrawalRate"
                  type="number"
                  placeholder="Default 4%"
                  value={withdrawalRate}
                  onChange={(e) => setWithdrawalRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentSavings">Current Savings</Label>
                <Input
                  id="currentSavings"
                  type="number"
                  placeholder="Enter current savings"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="annualReturn">Expected Annual Return (%)</Label>
                <Input
                  id="annualReturn"
                  type="number"
                  placeholder="Default 7%"
                  value={annualReturn}
                  onChange={(e) => setAnnualReturn(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateFIRE} className="flex-1">
                  Calculate FIRE Number
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
                    <p className="text-sm text-muted-foreground">Your FIRE Number</p>
                    <p className="text-3xl font-bold text-primary">${result.fireNumber.toFixed(2)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Years to FIRE</p>
                      <p className="text-lg font-bold">{result.yearsToFire} years</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Savings Gap</p>
                      <p className="text-lg font-bold">${result.savingsGap.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Based on {withdrawalRate}% withdrawal rate</p>
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
