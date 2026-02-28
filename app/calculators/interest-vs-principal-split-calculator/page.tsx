"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InterestVsPrincipalSplitCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [loanTenure, setLoanTenure] = useState<string>("");
  const [paymentNumber, setPaymentNumber] = useState<string>("");
  const [result, setResult] = useState<{
    emi: number;
    interestPayment: number;
    principalPayment: number;
    remainingBalance: number;
  } | null>(null);

  const calculateSplit = () => {
    const P = parseFloat(loanAmount);
    const R = parseFloat(interestRate) / 100 / 12;
    const N = parseFloat(loanTenure) * 12;
    const n = parseFloat(paymentNumber);

    if (isNaN(P) || isNaN(R) || isNaN(N) || isNaN(n) || P <= 0 || R <= 0 || N <= 0 || n <= 0 || n > N) {
      return;
    }

    const emi = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
    
    const remainingBalance = P * (Math.pow(1 + R, N) - Math.pow(1 + R, n)) / (Math.pow(1 + R, N) - 1);
    const interestPayment = remainingBalance * R;
    const principalPayment = emi - interestPayment;

    setResult({
      emi,
      interestPayment,
      principalPayment,
      remainingBalance: Math.max(0, remainingBalance),
    });
  };

  const reset = () => {
    setLoanAmount("");
    setInterestRate("");
    setLoanTenure("");
    setPaymentNumber("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Interest vs Principal Split Calculator</h1>
          <p className="text-muted-foreground">
            For any payment number in your loan, instantly see how much goes toward interest and how much reduces your principal. Understand your loan repayment in depth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="loanAmount">Loan Amount</Label>
                <Input
                  id="loanAmount"
                  type="number"
                  placeholder="Enter loan amount"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
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
                <Label htmlFor="loanTenure">Loan Tenure (Years)</Label>
                <Input
                  id="loanTenure"
                  type="number"
                  placeholder="Enter loan tenure"
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentNumber">Payment Number</Label>
                <Input
                  id="paymentNumber"
                  type="number"
                  placeholder="Which payment to analyze?"
                  value={paymentNumber}
                  onChange={(e) => setPaymentNumber(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateSplit} className="flex-1">
                  Calculate Split
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Results for Payment #{paymentNumber}</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Monthly EMI</p>
                    <p className="text-2xl font-bold text-primary">${result.emi.toFixed(2)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Interest Portion</p>
                      <p className="text-lg font-bold text-orange-600">${result.interestPayment.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Principal Portion</p>
                      <p className="text-lg font-bold text-green-600">${result.principalPayment.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Remaining Balance</p>
                    <p className="text-lg font-bold">${result.remainingBalance.toFixed(2)}</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Interest: {((result.interestPayment / result.emi) * 100).toFixed(1)}% | Principal: {((result.principalPayment / result.emi) * 100).toFixed(1)}%</p>
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
