"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoanRefinancingCalculatorPage() {
  const [currentLoanBalance, setCurrentLoanBalance] = useState<string>("");
  const [currentInterestRate, setCurrentInterestRate] = useState<string>("");
  const [currentRemainingTerm, setCurrentRemainingTerm] = useState<string>("");
  const [newInterestRate, setNewInterestRate] = useState<string>("");
  const [newLoanTerm, setNewLoanTerm] = useState<string>("");
  const [closingCosts, setClosingCosts] = useState<string>("");
  const [result, setResult] = useState<{
    currentMonthlyPayment: number;
    newMonthlyPayment: number;
    monthlySavings: number;
    totalInterestSavings: number;
    breakEvenMonths: number;
  } | null>(null);

  const calculateRefinancing = () => {
    const balance = parseFloat(currentLoanBalance);
    const currentRate = parseFloat(currentInterestRate) / 12 / 100;
    const currentTerm = parseFloat(currentRemainingTerm) * 12;
    const newRate = parseFloat(newInterestRate) / 12 / 100;
    const newTerm = parseFloat(newLoanTerm) * 12;
    const costs = parseFloat(closingCosts) || 0;

    if (isNaN(balance) || isNaN(currentRate) || isNaN(currentTerm) || isNaN(newRate) || isNaN(newTerm)) {
      return;
    }

    // Current monthly payment
    const currentPayment = currentRate > 0 
      ? balance * currentRate * Math.pow(1 + currentRate, currentTerm) / (Math.pow(1 + currentRate, currentTerm) - 1)
      : balance / currentTerm;

    // New monthly payment
    const newPayment = newRate > 0
      ? balance * newRate * Math.pow(1 + newRate, newTerm) / (Math.pow(1 + newRate, newTerm) - 1)
      : balance / newTerm;

    const monthlySavings = currentPayment - newPayment;
    const totalCurrentPayment = currentPayment * currentTerm;
    const totalNewPayment = newPayment * newTerm + costs;
    const totalInterestSavings = totalCurrentPayment - totalNewPayment;
    const breakEvenMonths = monthlySavings > 0 ? costs / monthlySavings : Infinity;

    setResult({
      currentMonthlyPayment: currentPayment,
      newMonthlyPayment: newPayment,
      monthlySavings,
      totalInterestSavings,
      breakEvenMonths,
    });
  };

  const reset = () => {
    setCurrentLoanBalance("");
    setCurrentInterestRate("");
    setCurrentRemainingTerm("");
    setNewInterestRate("");
    setNewLoanTerm("");
    setClosingCosts("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Loan Refinancing Calculator</h1>
          <p className="text-muted-foreground">
            Compare your current loan against a refinanced offer. See monthly savings, total interest savings, and the break-even period to decide if refinancing makes sense.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h4 className="font-semibold text-sm text-muted-foreground">Current Loan</h4>
              <div className="space-y-2">
                <Label htmlFor="currentLoanBalance">Current Loan Balance</Label>
                <Input
                  id="currentLoanBalance"
                  type="number"
                  placeholder="Enter remaining balance"
                  value={currentLoanBalance}
                  onChange={(e) => setCurrentLoanBalance(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentInterestRate">Current Interest Rate (%)</Label>
                <Input
                  id="currentInterestRate"
                  type="number"
                  placeholder="Enter current rate"
                  value={currentInterestRate}
                  onChange={(e) => setCurrentInterestRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentRemainingTerm">Remaining Term (Years)</Label>
                <Input
                  id="currentRemainingTerm"
                  type="number"
                  placeholder="Enter remaining years"
                  value={currentRemainingTerm}
                  onChange={(e) => setCurrentRemainingTerm(e.target.value)}
                />
              </div>

              <h4 className="font-semibold text-sm text-muted-foreground pt-4">New Loan</h4>
              <div className="space-y-2">
                <Label htmlFor="newInterestRate">New Interest Rate (%)</Label>
                <Input
                  id="newInterestRate"
                  type="number"
                  placeholder="Enter new rate"
                  value={newInterestRate}
                  onChange={(e) => setNewInterestRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newLoanTerm">New Loan Term (Years)</Label>
                <Input
                  id="newLoanTerm"
                  type="number"
                  placeholder="Enter new term"
                  value={newLoanTerm}
                  onChange={(e) => setNewLoanTerm(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="closingCosts">Closing Costs ($)</Label>
                <Input
                  id="closingCosts"
                  type="number"
                  placeholder="Enter closing costs"
                  value={closingCosts}
                  onChange={(e) => setClosingCosts(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateRefinancing} className="flex-1">
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
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Current Payment</p>
                      <p className="text-lg font-bold">${result.currentMonthlyPayment.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">New Payment</p>
                      <p className="text-lg font-bold">${result.newMonthlyPayment.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg ${result.monthlySavings >= 0 ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
                    <p className="text-sm text-muted-foreground">Monthly Savings</p>
                    <p className={`text-2xl font-bold ${result.monthlySavings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {result.monthlySavings >= 0 ? '+' : ''}${result.monthlySavings.toFixed(2)}
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Break-Even Period</p>
                    <p className="text-xl font-bold">
                      {result.breakEvenMonths === Infinity ? 'Never' : `${result.breakEvenMonths.toFixed(1)} months`}
                    </p>
                  </div>
                  <div className={`p-4 rounded-lg ${result.totalInterestSavings >= 0 ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
                    <p className="text-sm text-muted-foreground">Total Interest Savings</p>
                    <p className={`text-xl font-bold ${result.totalInterestSavings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {result.totalInterestSavings >= 0 ? '+' : ''}${result.totalInterestSavings.toFixed(2)}
                    </p>
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
