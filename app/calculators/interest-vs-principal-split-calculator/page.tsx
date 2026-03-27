"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Faqs from "@/components/utils/Faqs";


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

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Interest vs Principal Split Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter your loan details</p>
                    <p>Input the loan amount, annual interest rate, and loan tenure in years. Use the original loan terms.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Specify the payment number</p>
                    <p>Enter which payment you want to analyze. Payment 1 is your first payment; payment 360 would be the last payment on a 30-year mortgage.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">View the payment breakdown</p>
                    <p>See exactly how much of that payment goes to interest versus principal, plus the remaining loan balance.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Interest vs Principal Over Loan Life
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Loan Stage</th>
                      <th className="text-left py-3 px-2 font-semibold">Interest Portion</th>
                      <th className="text-left py-3 px-2 font-semibold">Principal Portion</th>
                      <th className="text-left py-3 px-2 font-semibold">Remaining Balance</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Payment 1 (start)</td>
                      <td className="py-3 px-2">70-90%</td>
                      <td className="py-3 px-2">10-30%</td>
                      <td className="py-3 px-2">98-99% of original</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Payment 60 (5 years)</td>
                      <td className="py-3 px-2">60-80%</td>
                      <td className="py-3 px-2">20-40%</td>
                      <td className="py-3 px-2">85-92% of original</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Payment 120 (10 years)</td>
                      <td className="py-3 px-2">50-70%</td>
                      <td className="py-3 px-2">30-50%</td>
                      <td className="py-3 px-2">70-80% of original</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Payment 180 (midpoint)</td>
                      <td className="py-3 px-2">40-60%</td>
                      <td className="py-3 px-2">40-60%</td>
                      <td className="py-3 px-2">50-60% of original</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Payment 300 (25 years)</td>
                      <td className="py-3 px-2">20-40%</td>
                      <td className="py-3 px-2">60-80%</td>
                      <td className="py-3 px-2">20-30% of original</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Final payment</td>
                      <td className="py-3 px-2">1-5%</td>
                      <td className="py-3 px-2">95-99%</td>
                      <td className="py-3 px-2">$0 (paid off)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Percentages vary based on interest rate and loan term. Higher rates mean more interest early in the loan.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Loan Amortization
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">How Amortization Works</h4>
                  <p>
                    Each loan payment splits between interest and principal. Early payments are mostly interest because the balance is high. As you pay down principal, less interest accrues, so more of each payment goes to principal. This is why loans build equity slowly at first, then faster later.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why Interest Dominates Early Payments</h4>
                  <p>
                    Interest is calculated on the remaining balance. At the start, you owe the full amount, so interest is highest. On a $200,000 loan at 6%, the first month's interest alone is $1,000. If your payment is $1,200, only $200 reduces the principal.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">The Power of Extra Principal Payments</h4>
                  <p>
                    Paying extra toward principal reduces future interest. An extra $100/month on a 30-year mortgage can cut 7-10 years off the term and save tens of thousands in interest. Extra payments have the biggest impact early in the loan.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How Payment Number Affects the Split</h4>
                  <p>
                    The crossover point — when principal exceeds interest — typically happens around 40-50% through the loan term. For a 30-year mortgage, this is around year 12-15. Before this point, you are mostly paying the lender's profit. After it, you are mostly building equity.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips for Paying Off Your Loan Faster
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
                    <p>Pay half your monthly amount every two weeks. You will make 26 half-payments per year, equal to 13 full payments. This extra payment goes directly to principal.</p>
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
                    <p>If your payment is $1,247, pay $1,300. The extra $53 goes to principal. Small amounts add up — $50 extra monthly on a 30-year mortgage saves about 5 years of payments.</p>
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
                    <p>Use tax refunds, bonuses, or gifts to make lump-sum principal payments. One $5,000 extra payment early in a mortgage can save $10,000+ in interest over the loan life.</p>
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
                    <p>Switching from 30-year to 15-year mortgage increases monthly payments but drastically reduces total interest. Only do this if you can comfortably afford the higher payment.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <section className="container mx-auto px-4 py-12 mb-12">
  <h2 className="text-3xl font-semibold mb-8 text-center">
    Frequently Asked Questions
  </h2>
  <Faqs faqs={[
{
    question: "Why is my early payment mostly interest?",
    answer: "Interest is calculated on the outstanding balance. At the start, you owe the full loan amount, so interest is at its maximum. As you pay down principal, the balance shrinks and less interest accrues each month.",
  },
{
    question: "When does principal exceed interest?",
    answer: "For most 30-year mortgages, principal exceeds interest around payment 180-200 (year 15-17). For 15-year loans, the crossover happens much earlier, around year 5-7. Higher interest rates push the crossover point later.",
  },
{
    question: "Does paying extra reduce my monthly payment?",
    answer: "No, extra principal payments do not change your required monthly payment. They reduce the loan balance and shorten the loan term. To lower your payment, you would need to refinance the loan.",
  },
{
    question: "Should I pay extra principal or invest?",
    answer: "Compare your loan rate to expected investment returns. If your mortgage is 3% and you expect 7% from investments, investing may be better. If your loan is 7%+, paying it down gives a guaranteed 7% return. Consider your risk tolerance and financial goals.",
  },
{
    question: "How do I verify my payment split?",
    answer: "Your monthly loan statement shows the interest and principal portions of each payment. Lenders must provide this by law. Compare the statement to this calculator's results to verify accuracy.",
  }
  ]} />
</section>

        </div>
      </div>
    </div>
  );
}
