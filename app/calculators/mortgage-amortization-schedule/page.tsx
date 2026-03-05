"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
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

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Mortgage Amortization Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter your loan amount</p>
                    <p>Input the total mortgage principal — the amount you are borrowing to purchase your home.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Input interest rate and loan term</p>
                    <p>Enter your annual interest rate and the loan duration in years (typically 15 or 30 years).</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Generate and review your amortization schedule</p>
                    <p>Click Generate Schedule to see month-by-month breakdown of principal and interest payments.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Mortgage Payment Breakdown Over Time
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Loan Year</th>
                      <th className="text-right py-3 px-2 font-semibold">Principal %</th>
                      <th className="text-right py-3 px-2 font-semibold">Interest %</th>
                      <th className="text-right py-3 px-2 font-semibold">Remaining Balance</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Year 1</td>
                      <td className="text-right py-3 px-2">20-25%</td>
                      <td className="text-right py-3 px-2">75-80%</td>
                      <td className="text-right py-3 px-2">~97% of original</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Year 5</td>
                      <td className="text-right py-3 px-2">28-32%</td>
                      <td className="text-right py-3 px-2">68-72%</td>
                      <td className="text-right py-3 px-2">~88% of original</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Year 10</td>
                      <td className="text-right py-3 px-2">38-42%</td>
                      <td className="text-right py-3 px-2">58-62%</td>
                      <td className="text-right py-3 px-2">~75% of original</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Year 15</td>
                      <td className="text-right py-3 px-2">50-55%</td>
                      <td className="text-right py-3 px-2">45-50%</td>
                      <td className="text-right py-3 px-2">~58% of original</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Year 20</td>
                      <td className="text-right py-3 px-2">65-70%</td>
                      <td className="text-right py-3 px-2">30-35%</td>
                      <td className="text-right py-3 px-2">~38% of original</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Year 30</td>
                      <td className="text-right py-3 px-2">100%</td>
                      <td className="text-right py-3 px-2">0%</td>
                      <td className="text-right py-3 px-2">$0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: Percentages vary based on interest rate. Higher rates mean more interest early in the loan.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Amortization Schedules
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">What Is an Amortization Schedule?</h4>
                  <p>
                    An amortization schedule is a complete table showing every mortgage payment over the life
                    of your loan. Each row displays the payment number, opening balance, total payment amount,
                    how much goes to principal, how much goes to interest, and the remaining balance. This
                    helps you see exactly where your money goes each month.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why Early Payments Are Mostly Interest</h4>
                  <p>
                    Mortgage interest is calculated on the remaining balance. At the start, you owe the full
                    loan amount, so interest charges are highest. Your fixed monthly payment first covers
                    interest, and whatever remains reduces principal. As principal decreases, so does interest,
                    freeing up more of your payment to pay down the balance. This is why the shift happens
                    gradually over decades.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How Extra Payments Affect Your Loan</h4>
                  <p>
                    Any payment above your required monthly amount goes directly to principal. This reduces
                    future interest charges and shortens your loan term. Even an extra $100 per month on a
                    30-year mortgage can cut 7-9 years off the loan and save tens of thousands in interest.
                    The earlier you make extra payments, the greater the impact.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips for Paying Off Your Mortgage Faster
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Make biweekly payments</p>
                    <p>Pay half your monthly amount every two weeks. You will make 26 half-payments (13 full payments) per year instead of 12.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Round up your payment</p>
                    <p>Round $1,247 up to $1,300 or $1,500. The extra goes straight to principal and compounds over time.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Apply windfalls to principal</p>
                    <p>Use tax refunds, bonuses, or inheritance to make lump-sum principal payments. Even one extra payment per year helps.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Refinance to a shorter term</p>
                    <p>Switching from 30-year to 15-year mortgage increases monthly payment but dramatically reduces total interest paid.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">How is monthly mortgage payment calculated?</h4>
                  <p>
                    Monthly payment uses the formula: M = P [i(1+i)^n] / [(1+i)^n - 1], where P is principal,
                    i is monthly interest rate (annual rate divided by 12), and n is total number of payments
                    (loan term in years times 12). This formula ensures equal payments throughout the loan.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What is the difference between 15-year and 30-year mortgage?</h4>
                  <p>
                    A 15-year mortgage has higher monthly payments but much lower total interest. A 30-year
                    mortgage has lower payments but you pay interest for twice as long. For example, on a
                    $300,000 loan at 6%, the 15-year saves about $180,000 in interest compared to 30-year.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Does paying extra principal reduce monthly payment?</h4>
                  <p>
                    No. Extra principal payments reduce your loan balance and shorten the term, but your
                    required monthly payment stays the same. The extra simply means you will make fewer
                    total payments over the life of the loan. Some lenders offer recasting to lower payments.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What is mortgage amortization vs depreciation?</h4>
                  <p>
                    Amortization refers to paying down a loan balance over time through scheduled payments.
                    Depreciation is an accounting method for spreading the cost of an asset over its useful
                    life. For homeowners, mortgage amortization builds equity while the property may appreciate.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Should I pay off my mortgage early or invest?</h4>
                  <p>
                    Compare your mortgage rate to expected investment returns. If your mortgage is 3% and
                    investments return 7%, investing may win. But paying off the mortgage guarantees a
                    3% return with zero risk. Consider your risk tolerance, tax situation, and peace of mind.
                    Many people do both — contribute to retirement accounts while making extra mortgage payments.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Related Tools
              </h3>
              <div className="space-y-2 text-sm">
                <a
                  href="/calculators/mortgage-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Mortgage Calculator</span>
                  <p className="text-muted-foreground">Calculate monthly mortgage payments with taxes and insurance</p>
                </a>
                <a
                  href="/calculators/refinance-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Refinance Calculator</span>
                  <p className="text-muted-foreground">Determine if refinancing your mortgage makes financial sense</p>
                </a>
                <a
                  href="/calculators/extra-payment-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Extra Payment Calculator</span>
                  <p className="text-muted-foreground">See how additional payments affect your loan payoff date</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
