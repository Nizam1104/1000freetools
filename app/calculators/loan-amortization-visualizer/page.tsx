"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoanAmortizationVisualizerPage() {
  const [loanAmount, setLoanAmount] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [loanTerm, setLoanTerm] = useState<string>("");
  const [result, setResult] = useState<{
    emi: number;
    totalPayment: number;
    totalInterest: number;
    yearlyData: Array<{ year: number; balance: number; principalPaid: number; interestPaid: number }>;
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

    const yearlyData = [];
    let balance = P;
    let cumulativePrincipal = 0;
    let cumulativeInterest = 0;

    for (let year = 1; year <= parseFloat(loanTerm); year++) {
      let yearPrincipal = 0;
      let yearInterest = 0;
      for (let month = 0; month < 12; month++) {
        const interest = balance * R;
        const principal = emi - interest;
        balance -= principal;
        yearPrincipal += principal;
        yearInterest += interest;
      }
      cumulativePrincipal += yearPrincipal;
      cumulativeInterest += yearInterest;
      yearlyData.push({
        year,
        balance: Math.max(0, Math.round(balance * 100) / 100),
        principalPaid: Math.round(cumulativePrincipal * 100) / 100,
        interestPaid: Math.round(cumulativeInterest * 100) / 100,
      });
    }

    setResult({ emi, totalPayment, totalInterest, yearlyData });
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
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Loan Amortization Visualizer</h1>
          <p className="text-muted-foreground">
            See your entire loan journey at a glance. An interactive visual chart shows your loan balance declining over time alongside cumulative principal and interest paid.
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
                  Visualize
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
                      <p className="text-lg font-bold">${result.totalInterest.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Payment</p>
                      <p className="text-lg font-bold">${result.totalPayment.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-semibold mb-2">Year-by-Year Visualization</h4>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {result.yearlyData.map((data) => {
                        const maxBalance = parseFloat(loanAmount);
                        const balancePercent = (data.balance / maxBalance) * 100;
                        const principalPercent = (data.principalPaid / maxBalance) * 100;
                        return (
                          <div key={data.year} className="text-sm">
                            <div className="flex justify-between mb-1">
                              <span>Year {data.year}</span>
                              <span className="text-muted-foreground">${data.balance.toLocaleString()}</span>
                            </div>
                            <div className="h-4 bg-muted rounded-full overflow-hidden flex">
                              <div
                                className="bg-green-500 h-full"
                                style={{ width: `${principalPercent}%` }}
                                title="Principal Paid"
                              />
                              <div
                                className="bg-orange-500 h-full"
                                style={{ width: `${100 - principalPercent}%` }}
                                title="Remaining Balance"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex gap-4 mt-2 text-xs">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-green-500 rounded" />
                        <span>Principal Paid</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-orange-500 rounded" />
                        <span>Remaining Balance</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter values and click Visualize to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
