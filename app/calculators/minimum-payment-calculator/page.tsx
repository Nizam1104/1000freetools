"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Faqs from "@/components/utils/Faqs";


export default function MinimumPaymentCalculatorPage() {
  const [balance, setBalance] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [minPaymentPercent, setMinPaymentPercent] = useState<string>("2");
  const [result, setResult] = useState<{
    monthsToPayoff: number;
    yearsToPayoff: number;
    totalInterest: number;
    totalPayment: number;
    minPayment: number;
  } | null>(null);

  const calculateMinimumPayment = () => {
    const B = parseFloat(balance);
    const R = parseFloat(interestRate) / 100 / 12;
    const minPercent = parseFloat(minPaymentPercent) / 100;

    if (isNaN(B) || isNaN(R) || isNaN(minPercent) || B <= 0 || R < 0 || minPercent <= 0) {
      return;
    }

    let currentBalance = B;
    let totalPayment = 0;
    let months = 0;
    const minPaymentAmount = Math.max(B * minPercent, 25);

    while (currentBalance > 0.01 && months < 600) {
      const interest = currentBalance * R;
      const payment = Math.max(currentBalance, minPaymentAmount);
      const principal = payment - interest;
      currentBalance -= principal;
      totalPayment += payment;
      months++;
    }

    setResult({
      monthsToPayoff: months,
      yearsToPayoff: Math.round(months / 12 * 10) / 10,
      totalInterest: totalPayment - B,
      totalPayment,
      minPayment: minPaymentAmount,
    });
  };

  const reset = () => {
    setBalance("");
    setInterestRate("");
    setMinPaymentPercent("2");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Credit Card Minimum Payment Calculator</h1>
          <p className="text-muted-foreground">
            Discover the true cost of paying only the minimum on your credit card. See the total interest paid and years it takes to clear your balance this way.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="balance">Current Balance</Label>
                <Input
                  id="balance"
                  type="number"
                  placeholder="Enter credit card balance"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  placeholder="Enter APR"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="minPaymentPercent">Minimum Payment (%)</Label>
                <Input
                  id="minPaymentPercent"
                  type="number"
                  placeholder="Default is 2%"
                  value={minPaymentPercent}
                  onChange={(e) => setMinPaymentPercent(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateMinimumPayment} className="flex-1">
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
                  <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Time to Payoff</p>
                    <p className="text-2xl font-bold text-red-600">{result.yearsToPayoff} years ({result.monthsToPayoff} months)</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Minimum Monthly Payment</p>
                    <p className="text-2xl font-bold">${result.minPayment.toFixed(2)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Interest</p>
                      <p className="text-lg font-bold text-orange-600">${result.totalInterest.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Payment</p>
                      <p className="text-lg font-bold">${result.totalPayment.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Warning: Paying only minimum extends debt significantly</p>
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
                How to Use This Minimum Payment Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter your credit card balance</p>
                    <p>Input your current outstanding balance. This is the total amount you owe on the card.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Add your APR and minimum payment percentage</p>
                    <p>Enter your annual interest rate (APR). Most cards require 2-3% minimum payments, with a $25 floor.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">See the true cost of minimum payments</p>
                    <p>The calculator shows how many years it takes to pay off and the total interest you'll pay.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                The Cost of Minimum Payments: Example Scenarios
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Balance</th>
                      <th className="text-left py-3 px-2 font-semibold">APR</th>
                      <th className="text-left py-3 px-2 font-semibold">Time to Payoff</th>
                      <th className="text-left py-3 px-2 font-semibold">Total Interest</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">$1,000</td>
                      <td className="py-3 px-2">18%</td>
                      <td className="py-3 px-2">9 years</td>
                      <td className="py-3 px-2">$867</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">$5,000</td>
                      <td className="py-3 px-2">18%</td>
                      <td className="py-3 px-2">31 years</td>
                      <td className="py-3 px-2">$10,450</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">$10,000</td>
                      <td className="py-3 px-2">18%</td>
                      <td className="py-3 px-2">47 years</td>
                      <td className="py-3 px-2">$24,800</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">$5,000</td>
                      <td className="py-3 px-2">24%</td>
                      <td className="py-3 px-2">Never pays off*</td>
                      <td className="py-3 px-2">Balance grows</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                *At high APRs with low minimum payments, interest can exceed the payment, causing the balance to grow indefinitely.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Why Minimum Payments Keep You in Debt
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">How Minimum Payments Work</h4>
                  <p>
                    Credit cards typically require 2-3% of your balance or $25, whichever is higher. On a $5,000 balance at 18% APR, the minimum might be $100-150. But most of that goes to interest, not principal.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">The Interest Trap</h4>
                  <p>
                    At 18% APR, a $5,000 balance accrues about $75 in interest the first month. If your minimum payment is $100, only $25 reduces the principal. Next month, you're paying interest on $4,975—not much progress.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">The Payment Floor Problem</h4>
                  <p>
                    When your balance drops low enough that 2% falls below $25, the $25 floor kicks in. This helps you finish paying off, but by then you've already paid years of interest.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Strategies to Escape Credit Card Debt
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Pay more than the minimum</p>
                    <p>Even an extra $50/month dramatically reduces payoff time. On $5,000 at 18%, paying $200 instead of $100 cuts 20+ years off the payoff.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Try the avalanche method</p>
                    <p>Pay minimums on all cards, put extra money toward the highest-APR card first. Mathematically optimal—saves the most on interest.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Consider balance transfer</p>
                    <p>0% intro APR cards let you pay down principal without interest. Watch for transfer fees (typically 3-5%) and the rate after intro period ends.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Stop using the card</p>
                    <p>You can't dig out while still digging. Use cash or debit until balances are under control. Keep the card open (don't close it) to protect your credit utilization ratio.</p>
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
    question: "What happens if I only pay the minimum?",
    answer: "You'll stay in debt for years or decades. Most of your payment goes to interest, barely touching the principal. A $5,000 balance at 18% could take 30+ years to pay off, costing more than $10,000 in interest alone.",
  },
{
    question: "Is paying minimum better than skipping payment?",
    answer: "Yes. Minimum payments keep your account current and avoid late fees and credit score damage. But it's the bare minimum—treat it as a temporary floor, not a long-term strategy.",
  },
{
    question: "How can I calculate my own payoff timeline?",
    answer: "Use this calculator with your actual balance and APR. Then experiment with higher monthly payments to see how much time and interest you can save. Even small increases make a big difference.",
  },
{
    question: "Should I use savings to pay off credit cards?",
    answer: "Usually yes, if your card APR exceeds your savings interest rate. Credit card debt at 18-25% costs far more than savings earns at 4-5%. Keep a small emergency fund ($1,000-2,000) while paying down debt.",
  },
{
    question: "Will paying more than minimum hurt my credit?",
    answer: "No, it helps. Lower balances improve your credit utilization ratio, which is 30% of your FICO score. Paying down debt is one of the fastest ways to boost your credit score.",
  }
  ]} />
</section>

        </div>
      </div>
    </div>
  );
}
