"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EMIBreakupVisualizerPage() {
  const [loanAmount, setLoanAmount] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [loanTenure, setLoanTenure] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<number>(1);
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

  const calculateEMIBreakup = () => {
    const P = parseFloat(loanAmount);
    const R = parseFloat(interestRate) / 12 / 100;
    const N = parseFloat(loanTenure) * 12;

    if (isNaN(P) || isNaN(R) || isNaN(N) || P <= 0 || R <= 0 || N <= 0) {
      return;
    }

    const emi = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
    const totalPayment = emi * N;
    const totalInterest = totalPayment - P;

    // Generate amortization schedule
    const schedule = [];
    let balance = P;

    for (let month = 1; month <= N; month++) {
      const interest = balance * R;
      const principal = emi - interest;
      const openingBalance = balance;
      balance = balance - principal;
      if (balance < 0) balance = 0;

      schedule.push({
        month,
        openingBalance,
        emi,
        principal,
        interest,
        closingBalance: balance,
      });
    }

    setResult({ emi, totalPayment, totalInterest, schedule });
    setSelectedMonth(1);
  };

  const reset = () => {
    setLoanAmount("");
    setInterestRate("");
    setLoanTenure("");
    setResult(null);
    setSelectedMonth(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">EMI Breakup Visualizer</h1>
          <p className="text-muted-foreground">
            See exactly where each EMI goes. Get a month-by-month breakdown of principal vs. interest components with a clear chart of your loan payoff progression.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
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
                  placeholder="Enter annual interest rate"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="loanTenure">Loan Tenure (Years)</Label>
                <Input
                  id="loanTenure"
                  type="number"
                  placeholder="Enter loan tenure in years"
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateEMIBreakup} className="flex-1">
                  Calculate
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Results</h3>
              {result ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <p className="text-sm text-muted-foreground">Monthly EMI</p>
                      <p className="text-2xl font-bold text-primary">${result.emi.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Interest</p>
                      <p className="text-lg font-bold">${result.totalInterest.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Payment</p>
                      <p className="text-lg font-bold">${result.totalPayment.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Month selector */}
                  <div className="space-y-2">
                    <Label>Select Month to View Breakup</Label>
                    <div className="flex gap-2 flex-wrap">
                      <Button
                        variant={selectedMonth === 1 ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedMonth(1)}
                      >
                        First
                      </Button>
                      <Button
                        variant={selectedMonth === Math.ceil(result.schedule.length / 2) ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedMonth(Math.ceil(result.schedule.length / 2))}
                      >
                        Mid
                      </Button>
                      <Button
                        variant={selectedMonth === result.schedule.length ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedMonth(result.schedule.length)}
                      >
                        Last
                      </Button>
                      <Input
                        type="number"
                        min={1}
                        max={result.schedule.length}
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(Math.min(Math.max(1, parseInt(e.target.value) || 1), result.schedule.length))}
                        className="w-24"
                      />
                    </div>
                  </div>

                  {/* Selected month breakup */}
                  {result.schedule[selectedMonth - 1] && (
                    <div className="p-4 bg-muted rounded-lg space-y-3">
                      <h4 className="font-semibold">Month {selectedMonth} Breakup</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Opening Balance</p>
                          <p className="text-lg font-bold">${result.schedule[selectedMonth - 1].openingBalance.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Closing Balance</p>
                          <p className="text-lg font-bold">${result.schedule[selectedMonth - 1].closingBalance.toFixed(2)}</p>
                        </div>
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded">
                          <p className="text-sm text-blue-700 dark:text-blue-300">Interest Component</p>
                          <p className="text-xl font-bold text-blue-600">${result.schedule[selectedMonth - 1].interest.toFixed(2)}</p>
                        </div>
                        <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded">
                          <p className="text-sm text-green-700 dark:text-green-300">Principal Component</p>
                          <p className="text-xl font-bold text-green-600">${result.schedule[selectedMonth - 1].principal.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Visual chart */}
                  <div className="space-y-2">
                    <h4 className="font-semibold">Principal vs Interest Over Time</h4>
                    <div className="h-48 flex items-end gap-1 overflow-x-auto">
                      {result.schedule.filter((_, i) => i % Math.ceil(result.schedule.length / 24) === 0).map((month, i) => (
                        <div key={month.month} className="flex-1 min-w-[20px] flex flex-col gap-0.5">
                          <div
                            className="bg-blue-500 rounded-t"
                            style={{ height: `${(month.interest / result.emi) * 100}%` }}
                            title={`Month ${month.month}: Interest $${month.interest.toFixed(2)}`}
                          />
                          <div
                            className="bg-green-500 rounded-b"
                            style={{ height: `${(month.principal / result.emi) * 100}%` }}
                            title={`Month ${month.month}: Principal $${month.principal.toFixed(2)}`}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-4 text-xs text-muted-foreground justify-center">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-blue-500 rounded" />
                        <span>Interest</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-green-500 rounded" />
                        <span>Principal</span>
                      </div>
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
