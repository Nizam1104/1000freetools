"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
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

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>How to Calculate Your Savings Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
              <div>
                <p className="font-semibold mb-1">Set your goal amount</p>
                <p className="text-sm text-muted-foreground">Enter the total amount you want to save for your financial goal.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
              <div>
                <p className="font-semibold mb-1">Add current savings and rate</p>
                <p className="text-sm text-muted-foreground">Input what you've already saved and expected interest rate.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
              <div>
                <p className="font-semibold mb-1">Get monthly savings amount</p>
                <p className="text-sm text-muted-foreground">See exactly how much to save each month to reach your goal.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Why Plan Your Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="font-semibold mb-1">Clear financial targets</p>
                <p className="text-sm text-muted-foreground">Know exactly what you need to save each month for any goal.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Interest calculations</p>
                <p className="text-sm text-muted-foreground">See how compound interest helps you reach goals faster.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Flexible planning</p>
                <p className="text-sm text-muted-foreground">Adjust time frame or rate to find achievable monthly amounts.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Track progress</p>
                <p className="text-sm text-muted-foreground">Account for current savings to get realistic targets.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Goal motivation</p>
                <p className="text-sm text-muted-foreground">Concrete numbers make abstract goals feel achievable.</p>
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
                <p className="font-semibold mb-1">How do I calculate how much to save monthly?</p>
                <p className="text-sm text-muted-foreground">Divide your goal by months, accounting for interest. For $10,000 in 5 years at 3%: about $155/month.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">What is a good savings rate?</p>
                <p className="text-sm text-muted-foreground">Aim for 20% of income. High-yield savings accounts currently offer 4-5% APY.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">How does interest affect savings goals?</p>
                <p className="text-sm text-muted-foreground">Higher rates reduce monthly needed. At 5% vs 1%, you save less monthly for the same goal.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Should I save or invest for long-term goals?</p>
                <p className="text-sm text-muted-foreground">For goals 5+ years away, investing may yield higher returns. Savings are safer for short-term needs.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">How do I stay motivated to save?</p>
                <p className="text-sm text-muted-foreground">Set automatic transfers, track progress visually, and celebrate milestones along the way.</p>
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
              Try our other financial tools: the <a href="/calculators/emergency-fund-calculator" className="text-primary hover:underline">emergency fund calculator</a> for safety nets, the <a href="/calculators/compound-interest-calculator" className="text-primary hover:underline">compound interest calculator</a> for investment growth, and the <a href="/calculators/budget-calculator" className="text-primary hover:underline">budget calculator</a> for expense planning.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
