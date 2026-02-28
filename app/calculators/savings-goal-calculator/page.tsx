"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SavingsGoalCalculatorPage() {
  const [goalAmount, setGoalAmount] = useState<string>("");
  const [currentSavings, setCurrentSavings] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [timeFrame, setTimeFrame] = useState<string>("");
  const [result, setResult] = useState<{
    monthlySavings: number;
    totalToSave: number;
    interestEarned: number;
  } | null>(null);

  const calculateSavingsGoal = () => {
    const FV = parseFloat(goalAmount);
    const PV = parseFloat(currentSavings) || 0;
    const R = parseFloat(interestRate) / 12 / 100;
    const N = parseFloat(timeFrame) * 12;

    if (isNaN(FV) || isNaN(R) || isNaN(N) || FV <= 0 || R < 0 || N <= 0) {
      return;
    }

    const fvOfCurrentSavings = PV * Math.pow(1 + R, N);
    const remainingGoal = FV - fvOfCurrentSavings;

    let monthlySavings = 0;
    if (R > 0) {
      monthlySavings = remainingGoal / ((Math.pow(1 + R, N) - 1) / R);
    } else {
      monthlySavings = remainingGoal / N;
    }

    const totalToSave = monthlySavings * N;
    const interestEarned = FV - PV - totalToSave;

    setResult({ monthlySavings, totalToSave, interestEarned });
  };

  const reset = () => {
    setGoalAmount("");
    setCurrentSavings("");
    setInterestRate("");
    setTimeFrame("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Savings Goal Calculator</h1>
          <p className="text-muted-foreground">
            Figure out how much to save each month—or how long it will take—to reach any financial goal. Accounts for your target amount and expected interest rate.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="goalAmount">Goal Amount</Label>
                <Input
                  id="goalAmount"
                  type="number"
                  placeholder="Enter your savings goal"
                  value={goalAmount}
                  onChange={(e) => setGoalAmount(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentSavings">Current Savings (optional)</Label>
                <Input
                  id="currentSavings"
                  type="number"
                  placeholder="Enter current savings"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  placeholder="Enter expected interest rate"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeFrame">Time Frame (Years)</Label>
                <Input
                  id="timeFrame"
                  type="number"
                  placeholder="Enter time frame in years"
                  value={timeFrame}
                  onChange={(e) => setTimeFrame(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateSavingsGoal} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Monthly Savings Required</p>
                    <p className="text-3xl font-bold text-primary">${result.monthlySavings.toFixed(2)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total to Save</p>
                      <p className="text-lg font-bold">${result.totalToSave.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Interest Earned</p>
                      <p className="text-lg font-bold text-green-600">${result.interestEarned.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Goal: ${parseFloat(goalAmount).toFixed(2)} | Time: {timeFrame} years | Rate: {interestRate}%</p>
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
