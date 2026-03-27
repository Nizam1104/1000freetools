"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Faqs from "@/components/utils/Faqs";


export default function LoanRefinancingCalculatorPage() {
  const [currentLoanBalance, setCurrentLoanBalance] = useState<string>("");
  const [currentInterestRate, setCurrentInterestRate] = useState<string>("");
  const [currentRemainingTerm, setCurrentRemainingTerm] = useState<string>("");
  const [newInterestRate, setNewInterestRate] = useState<string>("");
  const [newLoanTerm, setNewLoanTerm] = useState<string>("");
  const [closingCosts, setClosingCosts] = useState<string>("");
  const [result, setResult] = useState<{
    currentMonthlyPayment: number;
    newMonthlyPayment: number;
    monthlySavings: number;
    totalInterestSavings: number;
    breakEvenMonths: number;
  } | null>(null);

  const calculateRefinancing = () => {
    const balance = parseFloat(currentLoanBalance);
    const currentRate = parseFloat(currentInterestRate) / 12 / 100;
    const currentTerm = parseFloat(currentRemainingTerm) * 12;
    const newRate = parseFloat(newInterestRate) / 12 / 100;
    const newTerm = parseFloat(newLoanTerm) * 12;
    const costs = parseFloat(closingCosts) || 0;

    if (isNaN(balance) || isNaN(currentRate) || isNaN(currentTerm) || isNaN(newRate) || isNaN(newTerm)) {
      return;
    }

    // Current monthly payment
    const currentPayment = currentRate > 0
      ? balance * currentRate * Math.pow(1 + currentRate, currentTerm) / (Math.pow(1 + currentRate, currentTerm) - 1)
      : balance / currentTerm;

    // New monthly payment
    const newPayment = newRate > 0
      ? balance * newRate * Math.pow(1 + newRate, newTerm) / (Math.pow(1 + newRate, newTerm) - 1)
      : balance / newTerm;

    const monthlySavings = currentPayment - newPayment;
    const totalCurrentPayment = currentPayment * currentTerm;
    const totalNewPayment = newPayment * newTerm + costs;
    const totalInterestSavings = totalCurrentPayment - totalNewPayment;
    const breakEvenMonths = monthlySavings > 0 ? costs / monthlySavings : Infinity;

    setResult({
      currentMonthlyPayment: currentPayment,
      newMonthlyPayment: newPayment,
      monthlySavings,
      totalInterestSavings,
      breakEvenMonths,
    });
  };

  const reset = () => {
    setCurrentLoanBalance("");
    setCurrentInterestRate("");
    setCurrentRemainingTerm("");
    setNewInterestRate("");
    setNewLoanTerm("");
    setClosingCosts("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Loan Refinancing Calculator</h1>
          <p className="text-muted-foreground">
            Compare your current loan against a refinanced offer. See monthly savings, total interest savings, and the break-even period to decide if refinancing makes sense.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h4 className="font-semibold text-sm text-muted-foreground">Current Loan</h4>
              <div className="space-y-2">
                <Label htmlFor="currentLoanBalance">Current Loan Balance</Label>
                <Input
                  id="currentLoanBalance"
                  type="number"
                  placeholder="Enter remaining balance"
                  value={currentLoanBalance}
                  onChange={(e) => setCurrentLoanBalance(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentInterestRate">Current Interest Rate (%)</Label>
                <Input
                  id="currentInterestRate"
                  type="number"
                  placeholder="Enter current rate"
                  value={currentInterestRate}
                  onChange={(e) => setCurrentInterestRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentRemainingTerm">Remaining Term (Years)</Label>
                <Input
                  id="currentRemainingTerm"
                  type="number"
                  placeholder="Enter remaining years"
                  value={currentRemainingTerm}
                  onChange={(e) => setCurrentRemainingTerm(e.target.value)}
                />
              </div>

              <h4 className="font-semibold text-sm text-muted-foreground pt-4">New Loan</h4>
              <div className="space-y-2">
                <Label htmlFor="newInterestRate">New Interest Rate (%)</Label>
                <Input
                  id="newInterestRate"
                  type="number"
                  placeholder="Enter new rate"
                  value={newInterestRate}
                  onChange={(e) => setNewInterestRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newLoanTerm">New Loan Term (Years)</Label>
                <Input
                  id="newLoanTerm"
                  type="number"
                  placeholder="Enter new term"
                  value={newLoanTerm}
                  onChange={(e) => setNewLoanTerm(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="closingCosts">Closing Costs ($)</Label>
                <Input
                  id="closingCosts"
                  type="number"
                  placeholder="Enter closing costs"
                  value={closingCosts}
                  onChange={(e) => setClosingCosts(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateRefinancing} className="flex-1">
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
                      <p className="text-sm text-muted-foreground">Current Payment</p>
                      <p className="text-lg font-bold">${result.currentMonthlyPayment.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">New Payment</p>
                      <p className="text-lg font-bold">${result.newMonthlyPayment.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg ${result.monthlySavings >= 0 ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
                    <p className="text-sm text-muted-foreground">Monthly Savings</p>
                    <p className={`text-2xl font-bold ${result.monthlySavings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {result.monthlySavings >= 0 ? '+' : ''}${result.monthlySavings.toFixed(2)}
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Break-Even Period</p>
                    <p className="text-xl font-bold">
                      {result.breakEvenMonths === Infinity ? 'Never' : `${result.breakEvenMonths.toFixed(1)} months`}
                    </p>
                  </div>
                  <div className={`p-4 rounded-lg ${result.totalInterestSavings >= 0 ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
                    <p className="text-sm text-muted-foreground">Total Interest Savings</p>
                    <p className={`text-xl font-bold ${result.totalInterestSavings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {result.totalInterestSavings >= 0 ? '+' : ''}${result.totalInterestSavings.toFixed(2)}
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

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Loan Refinancing Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter your current loan details</p>
                    <p>Input your remaining balance, current interest rate, and how many years are left on your loan. Find these numbers on your most recent statement.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Input the new loan offer</p>
                    <p>Enter the refinanced interest rate, new loan term, and any closing costs. Lenders must provide these figures in a Loan Estimate document.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Review the comparison</p>
                    <p>The calculator shows your monthly savings, total interest savings, and the break-even period when savings exceed closing costs.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Refinancing Break-Even Examples
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Balance</th>
                      <th className="text-left py-3 px-2 font-semibold">Current Rate</th>
                      <th className="text-left py-3 px-2 font-semibold">New Rate</th>
                      <th className="text-left py-3 px-2 font-semibold">Closing Costs</th>
                      <th className="text-left py-3 px-2 font-semibold">Break-Even</th>
                      <th className="text-left py-3 px-2 font-semibold">Total Savings</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">$200,000</td>
                      <td className="py-3 px-2">6.5%</td>
                      <td className="py-3 px-2">5.5%</td>
                      <td className="py-3 px-2">$4,000</td>
                      <td className="py-3 px-2">20 months</td>
                      <td className="py-3 px-2">$18,500</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">$150,000</td>
                      <td className="py-3 px-2">7%</td>
                      <td className="py-3 px-2">6%</td>
                      <td className="py-3 px-2">$3,500</td>
                      <td className="py-3 px-2">22 months</td>
                      <td className="py-3 px-2">$12,200</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">$300,000</td>
                      <td className="py-3 px-2">6%</td>
                      <td className="py-3 px-2">5%</td>
                      <td className="py-3 px-2">$6,000</td>
                      <td className="py-3 px-2">26 months</td>
                      <td className="py-3 px-2">$35,800</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">$100,000</td>
                      <td className="py-3 px-2">5.5%</td>
                      <td className="py-3 px-2">5%</td>
                      <td className="py-3 px-2">$2,500</td>
                      <td className="py-3 px-2">34 months</td>
                      <td className="py-3 px-2">$4,100</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: Examples assume refinancing into a new 30-year term. Shorter terms increase monthly savings but may not always maximize total savings.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Loan Refinancing
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  Refinancing replaces your current loan with a new one, ideally at a lower interest rate. The new loan pays off the old balance, and you start fresh with new terms. Homeowners refinance mortgages to reduce monthly payments, shorten the loan term, or tap into home equity. The key is whether the savings outweigh the closing costs.
                </p>
                <p>
                  Closing costs typically run 2-5% of the loan amount. On a $200,000 refinance, expect $4,000-10,000 in fees covering appraisal, title search, origination, and other charges. Some lenders offer "no-closing-cost" refinances but roll the fees into a slightly higher rate or add them to the loan balance.
                </p>
                <p>
                  The break-even period tells you how long it takes for monthly savings to cover closing costs. If closing costs are $4,000 and you save $200 per month, break-even is 20 months. Plan to stay in your home beyond this point for refinancing to make financial sense.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                When Refinancing Makes Sense
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Rate Drop of 0.75% or More</p>
                    <p>A rule of thumb says refinancing is worth it if you can lower your rate by at least 0.75-1%. Smaller drops may still work for large loan balances or if you plan to stay in the home long-term.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">You'll Stay Past Break-Even</p>
                    <p>If break-even is 24 months but you plan to move in 18 months, refinancing loses money. Only refinance if you expect to keep the loan beyond the break-even point.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Your Credit Score Improved</p>
                    <p>Better credit since your original loan may qualify you for lower rates. Check your score before applying. Scores above 740 typically get the best mortgage rates.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Switching from ARM to Fixed</p>
                    <p>If you have an adjustable-rate mortgage and rates are rising, refinancing to a fixed-rate loan provides payment stability. This is more about risk management than pure savings.</p>
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
    question: "How much can I save by refinancing?",
    answer: "Savings depend on your loan balance, rate reduction, and remaining term. A 1% rate drop on a $200,000 mortgage saves about $130-150 monthly. Over 30 years, that's roughly $47,000 in interest savings, minus closing costs. Use this calculator with your specific numbers for an accurate estimate.",
  },
{
    question: "Does refinancing hurt my credit score?",
    answer: "Expect a small, temporary dip of 5-10 points from the hard inquiry. Multiple mortgage inquiries within a 45-day window count as one inquiry for scoring purposes. Your score typically recovers within a few months if you continue making on-time payments.",
  },
{
    question: "Should I refinance to a shorter term?",
    answer: "Shorter terms like 15 years come with lower rates and much less total interest, but higher monthly payments. Refinancing from a 30-year to 15-year loan might save $50,000+ in interest but could add $400-600 to your monthly payment. Make sure the higher payment fits your budget.",
  },
{
    question: "What documents do I need to refinance?",
    answer: "Lenders typically require proof of income (pay stubs, W-2s, tax returns), bank statements, proof of homeowners insurance, and authorization to pull your credit report. Self-employed borrowers may need additional documentation like profit-and-loss statements.",
  },
{
    question: "Can I refinance if I have bad credit?",
    answer: "It's harder but possible. FHA streamline refinances don't require credit checks for existing FHA loans. VA loans offer similar IRRRL programs. Conventional refinances typically need a 620+ score. If your score is below 620, focus on improving credit before refinancing unless you have an urgent reason like avoiding foreclosure.",
  }
  ]} />
</section>

        </div>
      </div>
    </div>
  );
}
