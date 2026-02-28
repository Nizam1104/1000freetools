"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function MortgageRefinanceBreakEvenCalculatorPage() {
  const [currentBalance, setCurrentBalance] = useState<string>("");
  const [currentRate, setCurrentRate] = useState<string>("");
  const [newRate, setNewRate] = useState<string>("");
  const [remainingTerm, setRemainingTerm] = useState<string>("");
  const [closingCosts, setClosingCosts] = useState<string>("");
  const [result, setResult] = useState<{
    currentEMI: number;
    newEMI: number;
    monthlySavings: number;
    breakEvenMonths: number;
    breakEvenYears: number;
    totalSavings: number;
  } | null>(null);

  const calculateRefinance = () => {
    const balance = parseFloat(currentBalance);
    const currRate = parseFloat(currentRate) / 100 / 12;
    const rate = parseFloat(newRate) / 100 / 12;
    const term = parseFloat(remainingTerm) * 12;
    const costs = parseFloat(closingCosts);

    if (isNaN(balance) || isNaN(currRate) || isNaN(rate) || isNaN(term) || isNaN(costs) || balance <= 0 || term <= 0) {
      return;
    }

    const currentEMI = balance * currRate * Math.pow(1 + currRate, term) / (Math.pow(1 + currRate, term) - 1);
    const newEMI = balance * rate * Math.pow(1 + rate, term) / (Math.pow(1 + rate, term) - 1);
    const monthlySavings = currentEMI - newEMI;
    const breakEvenMonths = costs / monthlySavings;
    const breakEvenYears = breakEvenMonths / 12;
    const totalSavings = monthlySavings * term - costs;

    setResult({
      currentEMI,
      newEMI,
      monthlySavings,
      breakEvenMonths: Math.ceil(breakEvenMonths),
      breakEvenYears: Math.round(breakEvenYears * 10) / 10,
      totalSavings,
    });
  };

  const reset = () => {
    setCurrentBalance("");
    setCurrentRate("");
    setNewRate("");
    setRemainingTerm("");
    setClosingCosts("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Mortgage Refinance Break-Even Calculator</h1>
          <p className="text-muted-foreground">
            Is refinancing worth it? Calculate the number of months your monthly savings will take to offset closing costs and determine your refinance break-even point.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentBalance">Current Loan Balance</Label>
                <Input
                  id="currentBalance"
                  type="number"
                  placeholder="Enter remaining balance"
                  value={currentBalance}
                  onChange={(e) => setCurrentBalance(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentRate">Current Interest Rate (%)</Label>
                <Input
                  id="currentRate"
                  type="number"
                  placeholder="Enter current rate"
                  value={currentRate}
                  onChange={(e) => setCurrentRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newRate">New Interest Rate (%)</Label>
                <Input
                  id="newRate"
                  type="number"
                  placeholder="Enter new rate"
                  value={newRate}
                  onChange={(e) => setNewRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="remainingTerm">Remaining Term (Years)</Label>
                <Input
                  id="remainingTerm"
                  type="number"
                  placeholder="Enter remaining years"
                  value={remainingTerm}
                  onChange={(e) => setRemainingTerm(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="closingCosts">Closing Costs</Label>
                <Input
                  id="closingCosts"
                  type="number"
                  placeholder="Enter closing costs"
                  value={closingCosts}
                  onChange={(e) => setClosingCosts(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateRefinance} className="flex-1">
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
                  <div className={`p-4 rounded-lg ${result.totalSavings >= 0 ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
                    <p className="text-sm text-muted-foreground">Break-Even Point</p>
                    <p className={`text-2xl font-bold ${result.totalSavings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {result.breakEvenMonths} months ({result.breakEvenYears} years)
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Current EMI</p>
                      <p className="text-lg font-bold">${result.currentEMI.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">New EMI</p>
                      <p className="text-lg font-bold">${result.newEMI.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Monthly Savings</p>
                    <p className="text-lg font-bold text-green-600">${result.monthlySavings.toFixed(2)}</p>
                  </div>
                  <div className={`p-4 rounded-lg ${result.totalSavings >= 0 ? 'bg-primary/10' : 'bg-red-100 dark:bg-red-900/20'}`}>
                    <p className="text-sm text-muted-foreground">Total Savings Over Loan Term</p>
                    <p className={`text-lg font-bold ${result.totalSavings >= 0 ? 'text-primary' : 'text-red-600'}`}>
                      ${result.totalSavings.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>If you plan to stay in the home longer than {result.breakEvenYears} years, refinancing may be worthwhile</p>
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
