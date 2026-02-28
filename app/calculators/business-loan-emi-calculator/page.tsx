"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BusinessLoanEMICalculatorPage() {
  const [loanAmount, setLoanAmount] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [loanTenure, setLoanTenure] = useState<string>("");
  const [processingFee, setProcessingFee] = useState<string>("");
  const [moratorium, setMoratorium] = useState<string>("0");
  const [result, setResult] = useState<{
    emi: number;
    totalInterest: number;
    totalPayment: number;
    effectiveLoanAmount: number;
    totalCost: number;
  } | null>(null);

  const calculateBusinessLoan = () => {
    const P = parseFloat(loanAmount);
    const R = parseFloat(interestRate) / 100 / 12;
    const N = parseFloat(loanTenure) * 12;
    const procFee = parseFloat(processingFee) || 0;
    const moratoriumMonths = parseFloat(moratorium) || 0;

    if (isNaN(P) || isNaN(R) || isNaN(N) || P <= 0 || R <= 0 || N <= 0) {
      return;
    }

    let principal = P;
    let moratoriumInterest = 0;

    if (moratoriumMonths > 0) {
      moratoriumInterest = P * R * moratoriumMonths;
      principal += moratoriumInterest;
    }

    const emi = principal * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
    const totalPayment = emi * N;
    const totalInterest = totalPayment - principal + moratoriumInterest;
    const effectiveLoanAmount = P + procFee;
    const totalCost = totalPayment + procFee;

    setResult({
      emi,
      totalInterest,
      totalPayment,
      effectiveLoanAmount,
      totalCost,
    });
  };

  const reset = () => {
    setLoanAmount("");
    setInterestRate("");
    setLoanTenure("");
    setProcessingFee("");
    setMoratorium("0");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Business Loan EMI Calculator</h1>
          <p className="text-muted-foreground">
            Calculate your business loan EMI, total repayment, and interest cost. Includes options for moratorium periods and processing fees for a complete cost picture.
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
                <Label htmlFor="processingFee">Processing Fee</Label>
                <Input
                  id="processingFee"
                  type="number"
                  placeholder="Enter processing fee"
                  value={processingFee}
                  onChange={(e) => setProcessingFee(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="moratorium">Moratorium Period (Months)</Label>
                <Input
                  id="moratorium"
                  type="number"
                  placeholder="Default 0"
                  value={moratorium}
                  onChange={(e) => setMoratorium(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateBusinessLoan} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Monthly EMI</p>
                    <p className="text-3xl font-bold text-primary">${result.emi.toFixed(2)}</p>
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
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Effective Loan Amount</p>
                    <p className="text-lg font-bold">${result.effectiveLoanAmount.toFixed(2)}</p>
                  </div>
                  <div className="p-4 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Cost of Loan</p>
                    <p className="text-lg font-bold text-orange-600">${result.totalCost.toFixed(2)}</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Includes processing fees and moratorium interest</p>
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
