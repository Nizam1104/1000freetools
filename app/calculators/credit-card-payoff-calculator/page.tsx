"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreditCardPayoffCalculatorPage() {
  const [balance, setBalance] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [monthlyPayment, setMonthlyPayment] = useState<string>("");
  const [result, setResult] = useState<{
    monthsToPayoff: number;
    totalInterest: number;
    totalPayment: number;
    payoffDate: string;
  } | null>(null);

  const calculatePayoff = () => {
    const B = parseFloat(balance);
    const R = parseFloat(interestRate) / 100 / 12;
    const P = parseFloat(monthlyPayment);

    if (isNaN(B) || isNaN(R) || isNaN(P) || B <= 0 || R < 0 || P <= 0) {
      return;
    }

    if (P <= B * R) {
      return;
    }

    const months = -Math.log(1 - (B * R) / P) / Math.log(1 + R);
    const monthsToPayoff = Math.ceil(months);
    const totalPayment = monthsToPayoff * P;
    const totalInterest = totalPayment - B;

    const payoffDate = new Date();
    payoffDate.setMonth(payoffDate.getMonth() + monthsToPayoff);

    setResult({
      monthsToPayoff,
      totalInterest,
      totalPayment,
      payoffDate: payoffDate.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    });
  };

  const reset = () => {
    setBalance("");
    setInterestRate("");
    setMonthlyPayment("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Credit Card Payoff Calculator</h1>
          <p className="text-muted-foreground">
            Find out when you'll be debt-free and how much interest you'll pay. Enter your balance, interest rate, and fixed monthly payment to plan your payoff.
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
                <Button onClick={calculatePayoff} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Debt-Free Date</p>
                    <p className="text-2xl font-bold text-primary">{result.payoffDate}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Months to Payoff</p>
                    <p className="text-2xl font-bold">{result.monthsToPayoff} months</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Interest</p>
                      <p className="text-lg font-bold text-green-600">${result.totalInterest.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Payment</p>
                      <p className="text-lg font-bold">${result.totalPayment.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Based on balance of ${parseFloat(balance).toFixed(2)} at {interestRate}% APR</p>
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
