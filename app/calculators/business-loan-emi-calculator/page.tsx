"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BusinessLoanEMICalculatorPage() {
  const [loanAmount, setLoanAmount] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [loanTenure, setLoanTenure] = useState<string>("");
  const [processingFee, setProcessingFee] = useState<string>("");
  const [moratorium, setMoratorium] = useState<string>("0");
  const [result, setResult] = useState<{
    emi: number;
    totalInterest: number;
    totalPayment: number;
    effectiveLoanAmount: number;
    totalCost: number;
  } | null>(null);

  const calculateBusinessLoan = () => {
    const P = parseFloat(loanAmount);
    const R = parseFloat(interestRate) / 100 / 12;
    const N = parseFloat(loanTenure) * 12;
    const procFee = parseFloat(processingFee) || 0;
    const moratoriumMonths = parseFloat(moratorium) || 0;

    if (isNaN(P) || isNaN(R) || isNaN(N) || P <= 0 || R <= 0 || N <= 0) {
      return;
    }

    let principal = P;
    let moratoriumInterest = 0;

    if (moratoriumMonths > 0) {
      moratoriumInterest = P * R * moratoriumMonths;
      principal += moratoriumInterest;
    }

    const emi = principal * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
    const totalPayment = emi * N;
    const totalInterest = totalPayment - principal + moratoriumInterest;
    const effectiveLoanAmount = P + procFee;
    const totalCost = totalPayment + procFee;

    setResult({
      emi,
      totalInterest,
      totalPayment,
      effectiveLoanAmount,
      totalCost,
    });
  };

  const reset = () => {
    setLoanAmount("");
    setInterestRate("");
    setLoanTenure("");
    setProcessingFee("");
    setMoratorium("0");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Business Loan EMI Calculator</h1>
          <p className="text-muted-foreground">
            Calculate your business loan EMI, total repayment, and interest cost. Includes options for moratorium periods and processing fees for a complete cost picture.
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
                <Label htmlFor="processingFee">Processing Fee</Label>
                <Input
                  id="processingFee"
                  type="number"
                  placeholder="Enter processing fee"
                  value={processingFee}
                  onChange={(e) => setProcessingFee(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="moratorium">Moratorium Period (Months)</Label>
                <Input
                  id="moratorium"
                  type="number"
                  placeholder="Default 0"
                  value={moratorium}
                  onChange={(e) => setMoratorium(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateBusinessLoan} className="flex-1">
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
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Effective Loan Amount</p>
                    <p className="text-lg font-bold">${result.effectiveLoanAmount.toFixed(2)}</p>
                  </div>
                  <div className="p-4 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Cost of Loan</p>
                    <p className="text-lg font-bold text-orange-600">${result.totalCost.toFixed(2)}</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Includes processing fees and moratorium interest</p>
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
                How to Use This Business Loan EMI Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter your loan amount</p>
                    <p>Input the principal amount you want to borrow. This is the base loan amount before any fees or additional charges.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Input interest rate and loan tenure</p>
                    <p>Enter the annual interest rate offered by your lender and the repayment period in years. Business loan rates typically range from 6% to 25% depending on credit and loan type.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Add processing fees and moratorium if applicable</p>
                    <p>Include any one-time processing fees and specify if there's a moratorium period (payment holiday) at the start of the loan.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Business Loan Interest Rate Reference
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Loan Type</th>
                      <th className="text-left py-3 px-2 font-semibold">Typical Rate Range</th>
                      <th className="text-left py-3 px-2 font-semibold">Typical Tenure</th>
                      <th className="text-left py-3 px-2 font-semibold">Best For</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">SBA 7(a) Loan</td>
                      <td className="py-3 px-2">6% - 10%</td>
                      <td className="py-3 px-2">5-25 years</td>
                      <td className="py-3 px-2">Long-term financing</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Bank Term Loan</td>
                      <td className="py-3 px-2">5% - 12%</td>
                      <td className="py-3 px-2">1-10 years</td>
                      <td className="py-3 px-2">Equipment, expansion</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Business Line of Credit</td>
                      <td className="py-3 px-2">8% - 15%</td>
                      <td className="py-3 px-2">1-5 years</td>
                      <td className="py-3 px-2">Working capital</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Equipment Financing</td>
                      <td className="py-3 px-2">6% - 12%</td>
                      <td className="py-3 px-2">3-7 years</td>
                      <td className="py-3 px-2">Machinery, vehicles</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Merchant Cash Advance</td>
                      <td className="py-3 px-2">15% - 40%+</td>
                      <td className="py-3 px-2">3-18 months</td>
                      <td className="py-3 px-2">Quick cash (expensive)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Rates vary based on credit score, business revenue, industry, and collateral. SBA loans offer the best rates but have stricter requirements. Alternative lenders charge more but approve faster.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Business Loan EMI
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">What Is EMI?</h4>
                  <p>
                    EMI (Equated Monthly Installment) is the fixed amount you pay each month to repay your loan. It includes both principal and interest. Early payments are mostly interest; later payments are mostly principal. This is called amortization.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How EMI Is Calculated</h4>
                  <p>
                    EMI uses the reducing balance method: EMI = P x R x (1+R)^N / [(1+R)^N - 1], where P is principal, R is monthly interest rate, and N is number of months. This formula ensures equal payments throughout the loan term.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What Is a Moratorium Period?</h4>
                  <p>
                    A moratorium (or grace period) lets you delay EMI payments for a set time, usually 3-12 months. Interest still accrues during this period and gets added to the principal. This increases your total loan cost but helps cash flow when starting a business.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Processing Fees and Total Cost</h4>
                  <p>
                    Lenders charge processing fees (1-3% of loan amount) upfront. This doesn't affect your EMI but increases the effective cost of borrowing. A loan with lower interest but higher fees may cost more than a slightly higher-rate loan with no fees.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips for Business Loan Planning
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Calculate EMI Before Applying</p>
                    <p>Know your monthly obligation before committing. Ensure your business cash flow can comfortably cover the EMI plus a 20% buffer for unexpected expenses.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Compare Total Cost, Not Just EMI</p>
                    <p>A longer tenure reduces EMI but increases total interest paid. Compare the total repayment amount across lenders, not just the monthly payment.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Check for Prepayment Penalties</p>
                    <p>Some lenders charge fees for early repayment. If you expect to repay early (from business profits or refinancing), choose a loan with no prepayment penalty.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Consider the Debt Service Coverage Ratio</p>
                    <p>Lenders look at DSCR (net operating income / debt service). Aim for a DSCR of 1.25 or higher. This means your business earns 25% more than needed to cover loan payments.</p>
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
                  <h4 className="font-medium text-foreground mb-2">What is a good EMI to income ratio for business loans?</h4>
                  <p>
                    Lenders typically want your total debt payments (including this loan) to be no more than 40-50% of your monthly business income. Lower is better — 30% or less gives you comfortable cash flow for operations and emergencies.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Does a moratorium period save money?</h4>
                  <p>
                    No, a moratorium increases total cost. Interest accrues during the moratorium and gets added to your principal, so you pay interest on that interest. It helps cash flow short-term but costs more overall.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Should I choose a shorter or longer loan tenure?</h4>
                  <p>
                    Shorter tenure means higher EMI but less total interest. Longer tenure means lower EMI but more interest paid. Choose based on cash flow — if you can afford higher payments, go shorter to save on interest.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How does processing fee affect the loan?</h4>
                  <p>
                    Processing fees are upfront costs that don't affect your EMI but increase the effective interest rate. A 2% fee on a 5-year loan adds roughly 0.5% to the effective annual rate. Factor this into lender comparisons.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Can I change my EMI amount during the loan?</h4>
                  <p>
                    Some lenders allow step-up or step-down EMIs. Step-up starts lower and increases yearly (good for growing businesses). Step-down starts higher and decreases. Ask about these options when applying.
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
                  href="/calculators/loan-amortization-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Loan Amortization Calculator</span>
                  <p className="text-muted-foreground">See the full payment schedule with principal and interest breakdown</p>
                </a>
                <a
                  href="/calculators/simple-interest-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Simple Interest Calculator</span>
                  <p className="text-muted-foreground">Calculate interest on loans and investments using simple interest</p>
                </a>
                <a
                  href="/calculators/debt-to-income-ratio-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Debt-to-Income Ratio Calculator</span>
                  <p className="text-muted-foreground">Check if your debt levels are within healthy limits for lenders</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
