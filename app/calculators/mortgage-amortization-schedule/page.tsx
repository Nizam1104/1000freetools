"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function MortgageAmortizationSchedulePage() {
  const [loanAmount, setLoanAmount] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [loanTerm, setLoanTerm] = useState<string>("");
  const [result, setResult] = useState<{
    emi: number;
    totalPayment: number;
    totalInterest: number;
    schedule: Array<{
      month: number;
      openingBalance: number;
      emi: number;
      principal: number;
      interest: number;
      closingBalance: number;
    }>;
  } | null>(null);

  const calculateAmortization = () => {
    const P = parseFloat(loanAmount);
    const R = parseFloat(interestRate) / 100 / 12;
    const N = parseFloat(loanTerm) * 12;

    if (isNaN(P) || isNaN(R) || isNaN(N) || P <= 0 || R <= 0 || N <= 0) {
      return;
    }

    const emi = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
    const totalPayment = emi * N;
    const totalInterest = totalPayment - P;

    const schedule = [];
    let balance = P;

    for (let month = 1; month <= N; month++) {
      const interest = balance * R;
      const principal = emi - interest;
      const openingBalance = balance;
      balance -= principal;
      if (balance < 0) balance = 0;

      schedule.push({
        month,
        openingBalance: Math.round(openingBalance * 100) / 100,
        emi: Math.round(emi * 100) / 100,
        principal: Math.round(principal * 100) / 100,
        interest: Math.round(interest * 100) / 100,
        closingBalance: Math.round(balance * 100) / 100,
      });
    }

    setResult({ emi, totalPayment, totalInterest, schedule });
  };

  const reset = () => {
    setLoanAmount("");
    setInterestRate("");
    setLoanTerm("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Mortgage Amortization Schedule Calculator</h1>
          <p className="text-muted-foreground">
            Generate a complete month-by-month amortization table for your mortgage. See opening balance, EMI, principal paid, interest paid, and closing balance for every payment.
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
                <Label htmlFor="loanTerm">Loan Term (Years)</Label>
                <Input
                  id="loanTerm"
                  type="number"
                  placeholder="Enter loan term"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateAmortization} className="flex-1">
                  Generate Schedule
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
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-semibold mb-2">Amortization Schedule</h4>
                    <div className="max-h-64 overflow-y-auto">
                      <table className="w-full text-xs">
                        <thead className="sticky top-0 bg-background">
                          <tr className="border-b">
                            <th className="text-left py-1">Month</th>
                            <th className="text-right py-1">Open</th>
                            <th className="text-right py-1">EMI</th>
                            <th className="text-right py-1">Principal</th>
                            <th className="text-right py-1">Interest</th>
                            <th className="text-right py-1">Close</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.schedule.map((row) => (
                            <tr key={row.month} className="border-b last:border-0">
                              <td className="py-1">{row.month}</td>
                              <td className="text-right">${row.openingBalance.toLocaleString()}</td>
                              <td className="text-right">${row.emi.toFixed(0)}</td>
                              <td className="text-right text-green-600">${row.principal.toFixed(0)}</td>
                              <td className="text-right text-orange-600">${row.interest.toFixed(0)}</td>
                              <td className="text-right">${row.closingBalance.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
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
