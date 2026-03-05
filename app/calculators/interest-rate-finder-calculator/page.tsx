"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InterestRateFinderPage() {
  const [principal, setPrincipal] = useState<string>("");
  const [emi, setEmi] = useState<string>("");
  const [tenure, setTenure] = useState<string>("");
  const [result, setResult] = useState<{
    annualRate: number;
    monthlyRate: number;
  } | null>(null);

  const calculateInterestRate = () => {
    const P = parseFloat(principal);
    const E = parseFloat(emi);
    const N = parseFloat(tenure) * 12;

    if (isNaN(P) || isNaN(E) || isNaN(N) || P <= 0 || E <= 0 || N <= 0) {
      return;
    }

    // Binary search to find the interest rate
    let low = 0;
    let high = 100;
    let mid = 0;

    for (let i = 0; i < 100; i++) {
      mid = (low + high) / 2;
      const r = mid / 12 / 100;
      const calculatedEmi = P * r * Math.pow(1 + r, N) / (Math.pow(1 + r, N) - 1);

      if (Math.abs(calculatedEmi - E) < 0.01) {
        break;
      }

      if (calculatedEmi > E) {
        high = mid;
      } else {
        low = mid;
      }
    }

    setResult({ annualRate: mid, monthlyRate: mid / 12 });
  };

  const reset = () => {
    setPrincipal("");
    setEmi("");
    setTenure("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Interest Rate Finder Calculator</h1>
          <p className="text-muted-foreground">
            Don&apos;t know your loan&apos;s interest rate? Reverse-calculate the implied annual rate from your known principal, monthly payment, and loan tenure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="principal">Loan Principal</Label>
                <Input
                  id="principal"
                  type="number"
                  placeholder="Enter loan amount"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emi">Monthly EMI/Payment</Label>
                <Input
                  id="emi"
                  type="number"
                  placeholder="Enter monthly payment"
                  value={emi}
                  onChange={(e) => setEmi(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tenure">Loan Tenure (Years)</Label>
                <Input
                  id="tenure"
                  type="number"
                  placeholder="Enter loan tenure in years"
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateInterestRate} className="flex-1">
                  Calculate Rate
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
                    <p className="text-sm text-muted-foreground">Annual Interest Rate</p>
                    <p className="text-3xl font-bold text-primary">{result.annualRate.toFixed(2)}%</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Monthly Interest Rate</p>
                    <p className="text-xl font-bold">{result.monthlyRate.toFixed(2)}%</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Based on Principal: ${parseFloat(principal).toFixed(2)}, EMI: ${parseFloat(emi).toFixed(2)}, Tenure: {tenure} years</p>
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
                How to Use This Interest Rate Finder Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter your loan principal</p>
                    <p>Input the original loan amount you borrowed. This is the amount before any interest is added.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Input your monthly payment and tenure</p>
                    <p>Enter the EMI amount you pay each month and the loan tenure in years. Use actual payment amounts from your loan statement.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Get your implied interest rate</p>
                    <p>The calculator reverse-engineers the annual interest rate from your payment details. Compare this to your loan agreement.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Typical Interest Rates by Loan Type
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Loan Type</th>
                      <th className="text-left py-3 px-2 font-semibold">Typical APR Range</th>
                      <th className="text-left py-3 px-2 font-semibold">Common Term</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Home Mortgage (30-year)</td>
                      <td className="py-3 px-2">3% - 7%</td>
                      <td className="py-3 px-2">15-30 years</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Home Mortgage (15-year)</td>
                      <td className="py-3 px-2">2.5% - 6%</td>
                      <td className="py-3 px-2">10-15 years</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Auto Loan (new car)</td>
                      <td className="py-3 px-2">3% - 6%</td>
                      <td className="py-3 px-2">3-7 years</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Auto Loan (used car)</td>
                      <td className="py-3 px-2">4% - 10%</td>
                      <td className="py-3 px-2">3-5 years</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Personal Loan</td>
                      <td className="py-3 px-2">6% - 36%</td>
                      <td className="py-3 px-2">2-7 years</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Credit Card</td>
                      <td className="py-3 px-2">15% - 29%</td>
                      <td className="py-3 px-2">Revolving</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Student Loan (federal)</td>
                      <td className="py-3 px-2">4% - 8%</td>
                      <td className="py-3 px-2">10-25 years</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Rates vary based on credit score, income, down payment, and market conditions. Check current rates with lenders for accurate quotes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Interest Rate Calculations
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">What Is APR?</h4>
                  <p>
                    APR (Annual Percentage Rate) is the yearly cost of borrowing, expressed as a percentage. It includes interest and some fees. APR lets you compare loans from different lenders. A lower APR means lower total cost over the life of the loan.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How EMI Is Calculated</h4>
                  <p>
                    EMI = P × r × (1+r)^n / ((1+r)^n - 1). P is the principal, r is the monthly interest rate (annual rate ÷ 12), and n is the total number of payments. This formula ensures each payment covers both interest and principal, with the loan paid off at the end of the term.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Reverse-Calculating Interest Rate</h4>
                  <p>
                    Finding the interest rate from EMI requires iteration because the rate appears in multiple places in the formula. This calculator uses binary search to find the rate that produces your exact EMI. The result is the implied annual interest rate in your loan.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Fixed vs Variable Rates</h4>
                  <p>
                    Fixed rates stay the same for the entire loan term. Your payment never changes. Variable rates can go up or down with market conditions. They often start lower but carry the risk of increasing. This calculator assumes a fixed rate.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips for Getting Better Interest Rates
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Improve your credit score</p>
                    <p>Lenders offer better rates to borrowers with higher credit scores. Pay bills on time, reduce credit card balances, and avoid opening new accounts before applying.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Shop around and compare offers</p>
                    <p>Get quotes from multiple lenders. Even a 0.5% rate difference can save thousands over a mortgage term. Use this calculator to verify the rates you are offered.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Consider a larger down payment</p>
                    <p>Putting more money down reduces the lender's risk. For mortgages, 20% down often gets better rates and eliminates PMI. For auto loans, 10-20% down is recommended.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Choose shorter loan terms</p>
                    <p>15-year mortgages have lower rates than 30-year loans. Shorter auto loan terms also get better rates. You pay more monthly but less total interest.</p>
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
                  <h4 className="font-medium text-foreground mb-2">Why is my calculated rate different from my loan agreement?</h4>
                  <p>
                    Small differences can come from rounding in payment amounts or fees rolled into the loan. Large differences may indicate additional fees, points, or insurance included in your payment. Check your loan disclosure for the official APR.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Does this calculator include fees and points?</h4>
                  <p>
                    No, this calculator finds the base interest rate from principal and payment. It does not account for origination fees, points, or other charges. The true APR including fees would be slightly higher than the calculated rate.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Can I use this for credit card debt?</h4>
                  <p>
                    This calculator works for installment loans with fixed payments. Credit cards use revolving credit with minimum payments based on balance. Use a credit card payoff calculator instead for credit card debt.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What if my payment changed during the loan?</h4>
                  <p>
                    This calculator assumes a fixed payment throughout the loan. If your payment changed (due to rate adjustment or refinancing), use the original payment from when the loan started for an accurate rate calculation.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Is the interest rate the same as APR?</h4>
                  <p>
                    Not exactly. The interest rate is the cost of borrowing the principal. APR includes the interest rate plus certain fees, expressed as an annual rate. For loans with no fees, the rate and APR are the same.
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
                  href="/calculators/interest-vs-principal-split-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Interest vs Principal Split Calculator</span>
                  <p className="text-muted-foreground">See how each payment is divided between interest and principal</p>
                </a>
                <a
                  href="/calculators/loan-amortization-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Loan Amortization Calculator</span>
                  <p className="text-muted-foreground">Generate a full payment schedule for your loan</p>
                </a>
                <a
                  href="/calculators/mortgage-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Mortgage Calculator</span>
                  <p className="text-muted-foreground">Calculate monthly mortgage payments with taxes and insurance</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
