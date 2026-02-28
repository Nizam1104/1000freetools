"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoanPrepaymentImpactCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [loanTenure, setLoanTenure] = useState<string>("");
  const [prepaymentAmount, setPrepaymentAmount] = useState<string>("");
  const [prepaymentFrequency, setPrepaymentFrequency] = useState<string>("one-time");
  const [result, setResult] = useState<{
    originalEMI: number;
    originalInterest: number;
    newTenure: number;
    newInterest: number;
    tenureReduction: number;
    interestSaved: number;
  } | null>(null);

  const calculatePrepayment = () => {
    const P = parseFloat(loanAmount);
    const R = parseFloat(interestRate) / 100 / 12;
    const N = parseFloat(loanTenure) * 12;
    const prepay = parseFloat(prepaymentAmount);

    if (isNaN(P) || isNaN(R) || isNaN(N) || isNaN(prepay) || P <= 0 || R <= 0 || N <= 0 || prepay <= 0) {
      return;
    }

    const originalEMI = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
    const originalTotalPayment = originalEMI * N;
    const originalInterest = originalTotalPayment - P;

    // Calculate new tenure after prepayment (assuming prepayment at start)
    const newPrincipal = P - prepay;
    let newTenure = 0;
    let balance = newPrincipal;
    let newInterest = 0;

    while (balance > 0.01 && newTenure < N) {
      const interest = balance * R;
      const principal = originalEMI - interest;
      balance -= principal;
      newInterest += interest;
      newTenure++;
    }

    const tenureReduction = N - newTenure;
    const interestSaved = originalInterest - newInterest;

    setResult({
      originalEMI,
      originalInterest,
      newTenure,
      newInterest,
      tenureReduction,
      interestSaved,
    });
  };

  const reset = () => {
    setLoanAmount("");
    setInterestRate("");
    setLoanTenure("");
    setPrepaymentAmount("");
    setPrepaymentFrequency("one-time");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Loan Prepayment Impact Calculator</h1>
          <p className="text-muted-foreground">
            See the benefit of paying extra on your loan. Calculate the reduction in tenure and total interest saved by making a one-time or recurring prepayment.
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
                <Label htmlFor="prepaymentAmount">Prepayment Amount</Label>
                <Input
                  id="prepaymentAmount"
                  type="number"
                  placeholder="Enter prepayment"
                  value={prepaymentAmount}
                  onChange={(e) => setPrepaymentAmount(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prepaymentFrequency">Prepayment Frequency</Label>
                <select
                  id="prepaymentFrequency"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={prepaymentFrequency}
                  onChange={(e) => setPrepaymentFrequency(e.target.value)}
                >
                  <option value="one-time">One-Time</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculatePrepayment} className="flex-1">
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
                      <p className="text-sm text-muted-foreground">Original EMI</p>
                      <p className="text-lg font-bold">${result.originalEMI.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Original Interest</p>
                      <p className="text-lg font-bold">${result.originalInterest.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Interest Saved</p>
                    <p className="text-2xl font-bold text-green-600">${result.interestSaved.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Tenure Reduction</p>
                    <p className="text-xl font-bold text-primary">
                      {Math.floor(result.tenureReduction / 12)} years {result.tenureReduction % 12} months
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">New Loan Tenure</p>
                    <p className="text-lg font-bold">
                      {Math.floor(result.newTenure / 12)} years {result.newTenure % 12} months
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
