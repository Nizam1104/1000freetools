"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Faqs from "@/components/utils/Faqs";


export default function DebtToIncomeRatioCalculatorPage() {
  const [grossMonthlyIncome, setGrossMonthlyIncome] = useState<string>("");
  const [monthlyDebtPayments, setMonthlyDebtPayments] = useState<string>("");
  const [result, setResult] = useState<{
    dtiRatio: number;
    remainingIncome: number;
    status: string;
  } | null>(null);

  const calculateDTI = () => {
    const income = parseFloat(grossMonthlyIncome);
    const debt = parseFloat(monthlyDebtPayments);

    if (isNaN(income) || isNaN(debt) || income <= 0 || debt < 0) {
      return;
    }

    const dtiRatio = (debt / income) * 100;
    const remainingIncome = income - debt;

    let status = "";
    if (dtiRatio <= 20) {
      status = "Excellent - Very low debt burden";
    } else if (dtiRatio <= 36) {
      status = "Good - Healthy debt level";
    } else if (dtiRatio <= 43) {
      status = "Fair - Approaching high debt level";
    } else {
      status = "High - Consider reducing debt";
    }

    setResult({ dtiRatio, remainingIncome, status });
  };

  const reset = () => {
    setGrossMonthlyIncome("");
    setMonthlyDebtPayments("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Debt-to-Income Ratio Calculator</h1>
          <p className="text-muted-foreground">
            Assess your borrowing capacity in seconds. Calculate the percentage of your gross monthly income consumed by debt payments to understand your financial health.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="grossMonthlyIncome">Gross Monthly Income</Label>
                <Input
                  id="grossMonthlyIncome"
                  type="number"
                  placeholder="Enter gross monthly income"
                  value={grossMonthlyIncome}
                  onChange={(e) => setGrossMonthlyIncome(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyDebtPayments">Total Monthly Debt Payments</Label>
                <Input
                  id="monthlyDebtPayments"
                  type="number"
                  placeholder="Enter total monthly debt payments"
                  value={monthlyDebtPayments}
                  onChange={(e) => setMonthlyDebtPayments(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Include: mortgage, car loans, credit cards, student loans, etc.</p>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateDTI} className="flex-1">
                  Calculate DTI
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
                  <div className={`p-4 rounded-lg ${result.dtiRatio <= 36 ? 'bg-green-100 dark:bg-green-900/20' :
                      result.dtiRatio <= 43 ? 'bg-yellow-100 dark:bg-yellow-900/20' :
                        'bg-red-100 dark:bg-red-900/20'
                    }`}>
                    <p className="text-sm text-muted-foreground">Debt-to-Income Ratio</p>
                    <p className={`text-3xl font-bold ${result.dtiRatio <= 36 ? 'text-green-600' :
                        result.dtiRatio <= 43 ? 'text-yellow-600' :
                          'text-red-600'
                      }`}>
                      {result.dtiRatio.toFixed(2)}%
                    </p>
                    <p className="text-sm mt-1">{result.status}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Remaining Income After Debt</p>
                    <p className="text-xl font-bold">${result.remainingIncome.toFixed(2)}</p>
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
                How to Use This DTI Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter your gross monthly income</p>
                    <p>Include all income sources before taxes: salary, bonuses, rental income, child support, and any other regular income.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Add up all monthly debt payments</p>
                    <p>Include mortgage or rent, car loans, student loans, credit card minimums, personal loans, and alimony. Don&apos;t include utilities or groceries.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Click Calculate to see your DTI ratio</p>
                    <p>The result shows your debt-to-income percentage, remaining income, and an assessment of your debt level.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                DTI Ratio Guidelines
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">DTI Range</th>
                      <th className="text-left py-3 px-2 font-semibold">Status</th>
                      <th className="text-left py-3 px-2 font-semibold">Mortgage Approval</th>
                      <th className="text-left py-3 px-2 font-semibold">Recommendation</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Below 20%</td>
                      <td className="py-3 px-2">Excellent</td>
                      <td className="py-3 px-2">Easily approved</td>
                      <td className="py-3 px-2">Great financial position</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">20% - 36%</td>
                      <td className="py-3 px-2">Good</td>
                      <td className="py-3 px-2">Well qualified</td>
                      <td className="py-3 px-2">Healthy debt level</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">36% - 43%</td>
                      <td className="py-3 px-2">Fair</td>
                      <td className="py-3 px-2">May qualify</td>
                      <td className="py-3 px-2">Consider paying down debt</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">43% - 50%</td>
                      <td className="py-3 px-2">High</td>
                      <td className="py-3 px-2">Limited options</td>
                      <td className="py-3 px-2">Reduce debt before borrowing</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Above 50%</td>
                      <td className="py-3 px-2">Very High</td>
                      <td className="py-3 px-2">Unlikely to qualify</td>
                      <td className="py-3 px-2">Prioritize debt reduction</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Most lenders prefer DTI below 43% for qualified mortgages. FHA loans may allow up to 50% with compensating factors.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Debt-to-Income Ratio
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">What Is DTI?</h4>
                  <p>
                    Debt-to-income ratio compares your monthly debt payments to your gross monthly income. It shows what percentage of your income goes toward debt before any other expenses. Lenders use DTI to assess whether you can handle additional debt.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Front-End vs Back-End DTI</h4>
                  <p>
                    Front-end DTI includes only housing costs (mortgage, taxes, insurance). Back-end DTI includes all debts. Lenders typically look at back-end DTI. Conventional loans often want front-end below 28% and back-end below 36%.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What Counts as Debt?</h4>
                  <p>
                    Include: mortgage/rent, car payments, student loans, credit card minimums, personal loans, child support, and alimony. Exclude: utilities, groceries, insurance premiums, entertainment, and credit cards you pay in full monthly.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why DTI Matters</h4>
                  <p>
                    High DTI means less money for emergencies, savings, and unexpected expenses. Lenders see this as risk. Even if you have good credit, high DTI can deny loans or trigger higher interest rates.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips to Improve Your DTI
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Pay Down Credit Cards</p>
                    <p>Reducing credit card balances lowers minimum payments. Paying $5,000 on a card might drop the minimum from $150 to $50, improving DTI by that amount monthly.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Increase Your Income</p>
                    <p>Ask for a raise, take on overtime, start a side gig, or monetize a skill. Higher income improves DTI without paying down debt. Lenders typically want 2 years of consistent income.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Avoid New Debt Before Applying</p>
                    <p>Don&apos;t finance a car or open credit cards before applying for a mortgage. New debt increases DTI and can kill loan approval even after pre-approval.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Consider Debt Consolidation</p>
                    <p>Consolidating high-interest debt into a lower-payment loan can reduce monthly obligations. Be careful — extending terms may cost more long-term even with lower payments.</p>
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
    question: "What is a good debt-to-income ratio?",
    answer: "Below 36% is considered good. Most lenders prefer DTI under 43% for mortgage approval. The lower your DTI, the better your loan terms and the more financial flexibility you have.",
  },
{
    question: "How do I calculate DTI manually?",
    answer: "Add up all monthly debt payments. Divide by gross monthly income. Multiply by 100 for percentage. Example: $2,000 debt / $6,000 income = 33.3% DTI.",
  },
{
    question: "Does DTI include rent?",
    answer: "If you own a home and apply for a mortgage, your current rent isn&apos;t included — the new mortgage payment replaces it. If you&apos;re renting and keeping your lease, include rent as a debt payment.",
  },
{
    question: "What DTI do I need for a mortgage?",
    answer: "Conventional loans typically want DTI below 43%, ideally below 36%. FHA loans may allow up to 50% with strong credit and reserves. VA loans have more flexibility but generally prefer under 41%.",
  },
{
    question: "Does DTI affect credit score?",
    answer: "No, DTI isn&apos;t part of your credit score calculation. Credit scores measure payment history and credit utilization. However, lenders consider both DTI and credit score when approving loans.",
  }
  ]} />
</section>

        </div>
      </div>
    </div>
  );
}
