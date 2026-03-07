"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
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

        {/* How It Works Section */}
        <div className="mt-12 mb-12">
          <h2 className="text-2xl font-semibold mb-6">How EMI Breakup Calculation Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
              <h3 className="font-semibold mb-2">Enter Loan Details</h3>
              <p className="text-sm text-muted-foreground">Input your loan amount, annual interest rate, and loan tenure in years to begin the calculation.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
              <h3 className="font-semibold mb-2">View Monthly EMI</h3>
              <p className="text-sm text-muted-foreground">The calculator computes your fixed monthly payment using the reducing balance method formula.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
              <h3 className="font-semibold mb-2">Analyze Principal vs Interest</h3>
              <p className="text-sm text-muted-foreground">Explore the month-by-month breakdown showing how each EMI splits between principal and interest.</p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 mb-12">
          <h2 className="text-2xl font-semibold mb-6">Key Features of EMI Breakup Visualizer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Month-by-Month Breakdown
              </h3>
              <p className="text-sm text-muted-foreground">See exactly how much of each EMI goes toward principal repayment versus interest charges for any month.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Visual Amortization Chart
              </h3>
              <p className="text-sm text-muted-foreground">Interactive bar chart shows the shifting ratio of principal to interest over your loan term.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Total Interest Calculator
              </h3>
              <p className="text-sm text-muted-foreground">Understand the true cost of borrowing with clear display of total interest payable over the loan life.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Prepayment Planning Tool
              </h3>
              <p className="text-sm text-muted-foreground">Identify optimal months for prepayments when principal component is higher for maximum interest savings.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Compare Loan Options
              </h3>
              <p className="text-sm text-muted-foreground">Test different tenures and interest rates to find the most cost-effective loan structure.</p>
            </div>
          </div>

          <div className="mt-6 p-6 bg-muted rounded-lg">
            <h3 className="font-semibold mb-3">EMI Calculation Formula</h3>
            <div className="bg-card p-4 rounded font-mono text-sm mb-4">
              EMI = P × R × (1+R)^N / [(1+R)^N - 1]
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold mb-2">Where:</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li><strong>P</strong> = Principal loan amount</li>
                  <li><strong>R</strong> = Monthly interest rate (annual rate ÷ 12 ÷ 100)</li>
                  <li><strong>N</strong> = Loan tenure in months</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-2">Example: $200,000 at 8.5% for 20 years</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>Monthly EMI: $1,735</li>
                  <li>Total Interest: $216,400</li>
                  <li>Total Payment: $416,400</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 mb-12">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions About EMI Breakup</h2>
          <div className="space-y-4">
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">Why does the interest component decrease over time?</h3>
              <p className="text-sm text-muted-foreground">EMI uses the reducing balance method. As you pay down principal, interest is calculated on a lower outstanding balance, so more of each EMI goes toward principal in later years.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">When is the best time to make a prepayment?</h3>
              <p className="text-sm text-muted-foreground">Early in the loan term when most of your EMI goes toward interest. Prepaying in the first few years saves significantly more interest than prepaying near the end.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">How does loan tenure affect total interest?</h3>
              <p className="text-sm text-muted-foreground">Longer tenures reduce monthly EMI but increase total interest paid. A 30-year loan can cost 2-3x more in total interest than a 15-year loan at the same rate.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">What is the reducing balance method?</h3>
              <p className="text-sm text-muted-foreground">Interest is calculated monthly on the outstanding principal balance. As you repay principal, the balance reduces, and so does the interest component of subsequent EMIs.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">Can I see the breakup for a specific month?</h3>
              <p className="text-sm text-muted-foreground">Yes! Use the month selector to view the exact principal and interest breakdown for any month, along with opening and closing balances.</p>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
      </div>
    </div>
  );
}
