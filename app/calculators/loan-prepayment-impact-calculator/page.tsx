"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoanPrepaymentImpactCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [loanTenure, setLoanTenure] = useState<string>("");
  const [prepaymentAmount, setPrepaymentAmount] = useState<string>("");
  const [prepaymentFrequency, setPrepaymentFrequency] = useState<string>("one-time");
  const [result, setResult] = useState<{
    originalEMI: number;
    originalInterest: number;
    newTenure: number;
    newInterest: number;
    tenureReduction: number;
    interestSaved: number;
  } | null>(null);

  const calculatePrepayment = () => {
    const P = parseFloat(loanAmount);
    const R = parseFloat(interestRate) / 100 / 12;
    const N = parseFloat(loanTenure) * 12;
    const prepay = parseFloat(prepaymentAmount);

    if (isNaN(P) || isNaN(R) || isNaN(N) || isNaN(prepay) || P <= 0 || R <= 0 || N <= 0 || prepay <= 0) {
      return;
    }

    const originalEMI = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
    const originalTotalPayment = originalEMI * N;
    const originalInterest = originalTotalPayment - P;

    // Calculate new tenure after prepayment (assuming prepayment at start)
    const newPrincipal = P - prepay;
    let newTenure = 0;
    let balance = newPrincipal;
    let newInterest = 0;

    while (balance > 0.01 && newTenure < N) {
      const interest = balance * R;
      const principal = originalEMI - interest;
      balance -= principal;
      newInterest += interest;
      newTenure++;
    }

    const tenureReduction = N - newTenure;
    const interestSaved = originalInterest - newInterest;

    setResult({
      originalEMI,
      originalInterest,
      newTenure,
      newInterest,
      tenureReduction,
      interestSaved,
    });
  };

  const reset = () => {
    setLoanAmount("");
    setInterestRate("");
    setLoanTenure("");
    setPrepaymentAmount("");
    setPrepaymentFrequency("one-time");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Loan Prepayment Impact Calculator</h1>
          <p className="text-muted-foreground">
            See the benefit of paying extra on your loan. Calculate the reduction in tenure and total interest saved by making a one-time or recurring prepayment.
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
                <Label htmlFor="prepaymentAmount">Prepayment Amount</Label>
                <Input
                  id="prepaymentAmount"
                  type="number"
                  placeholder="Enter prepayment"
                  value={prepaymentAmount}
                  onChange={(e) => setPrepaymentAmount(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prepaymentFrequency">Prepayment Frequency</Label>
                <select
                  id="prepaymentFrequency"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={prepaymentFrequency}
                  onChange={(e) => setPrepaymentFrequency(e.target.value)}
                >
                  <option value="one-time">One-Time</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculatePrepayment} className="flex-1">
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
                      <p className="text-sm text-muted-foreground">Original EMI</p>
                      <p className="text-lg font-bold">${result.originalEMI.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Original Interest</p>
                      <p className="text-lg font-bold">${result.originalInterest.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Interest Saved</p>
                    <p className="text-2xl font-bold text-green-600">${result.interestSaved.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Tenure Reduction</p>
                    <p className="text-xl font-bold text-primary">
                      {Math.floor(result.tenureReduction / 12)} years {result.tenureReduction % 12} months
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">New Loan Tenure</p>
                    <p className="text-lg font-bold">
                      {Math.floor(result.newTenure / 12)} years {result.newTenure % 12} months
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
                How to Use This Loan Prepayment Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter your loan details</p>
                    <p>Input the original loan amount, annual interest rate, and loan tenure in years. These are the same figures from your loan agreement.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Specify your prepayment amount</p>
                    <p>Enter the extra amount you plan to pay. Choose whether this is a one-time payment or a yearly recurring prepayment.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Review your savings</p>
                    <p>The calculator shows how many months or years you'll shave off your loan and the total interest you'll save by making the prepayment.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Prepayment Impact Examples
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Loan Amount</th>
                      <th className="text-left py-3 px-2 font-semibold">Rate</th>
                      <th className="text-left py-3 px-2 font-semibold">Tenure</th>
                      <th className="text-left py-3 px-2 font-semibold">Prepayment</th>
                      <th className="text-left py-3 px-2 font-semibold">Time Saved</th>
                      <th className="text-left py-3 px-2 font-semibold">Interest Saved</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">$100,000</td>
                      <td className="py-3 px-2">6%</td>
                      <td className="py-3 px-2">15 years</td>
                      <td className="py-3 px-2">$5,000</td>
                      <td className="py-3 px-2">8 months</td>
                      <td className="py-3 px-2">$4,200</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">$200,000</td>
                      <td className="py-3 px-2">5.5%</td>
                      <td className="py-3 px-2">30 years</td>
                      <td className="py-3 px-2">$10,000</td>
                      <td className="py-3 px-2">11 months</td>
                      <td className="py-3 px-2">$12,800</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">$50,000</td>
                      <td className="py-3 px-2">7%</td>
                      <td className="py-3 px-2">10 years</td>
                      <td className="py-3 px-2">$5,000</td>
                      <td className="py-3 px-2">14 months</td>
                      <td className="py-3 px-2">$3,100</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">$300,000</td>
                      <td className="py-3 px-2">6.5%</td>
                      <td className="py-3 px-2">30 years</td>
                      <td className="py-3 px-2">$25,000</td>
                      <td className="py-3 px-2">2 years 3 months</td>
                      <td className="py-3 px-2">$48,500</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: Examples assume one-time prepayment at loan start. Actual savings vary based on when prepayment is made.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How Loan Prepayment Works
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  When you make a prepayment on your loan, the extra money goes directly toward reducing the principal balance. This matters because interest is calculated on the remaining principal each month. Lower principal means less interest accrues, which means more of your regular payment goes toward principal. It creates a snowball effect that accelerates payoff.
                </p>
                <p>
                  The earlier you make a prepayment, the more you save. A $5,000 prepayment in year one of a 30-year mortgage saves far more than the same $5,000 paid in year 15. That's because you're cutting interest during the period when your balance is highest.
                </p>
                <p>
                  Some lenders charge prepayment penalties, especially on mortgages. These fees typically apply if you prepay more than 20% of the balance in a year or during the first 3-5 years of the loan. Always check your loan agreement before making large prepayments.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Prepayment Strategies
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">One-Time Lump Sum</p>
                    <p>Use a tax refund, work bonus, or inheritance to make a single large prepayment. This gives immediate interest savings and reduces your balance right away.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Yearly Prepayments</p>
                    <p>Make one extra payment per year, or divide your monthly payment by 12 and add that amount to each payment. This approach builds a habit and compounds savings over time.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Biweekly Payments</p>
                    <p>Pay half your monthly payment every two weeks. You'll make 26 half-payments per year, which equals 13 full payments. That extra payment goes straight to principal.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Round Up Payments</p>
                    <p>If your payment is $1,237, round up to $1,300 or $1,400. The extra $63-163 per month adds up over the life of the loan without feeling painful.</p>
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
                  <h4 className="font-medium text-foreground mb-2">Should I prepay my loan or invest the money?</h4>
                  <p>
                    Compare your loan interest rate to expected investment returns. If your mortgage charges 7% and you expect 8-10% from stocks, investing may win. But prepayment gives a guaranteed return equal to your interest rate, with no risk. Also consider your emergency fund, job stability, and peace of mind. Many people do both split extra money between prepayment and investing.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Does prepayment reduce my monthly payment?</h4>
                  <p>
                    Usually no. Prepayment shortens your loan term rather than lowering the monthly amount. Your payment stays the same, but you make fewer total payments. Some lenders let you recast the loan after a large prepayment, which lowers the payment while keeping the same end date. Recasting typically costs $200-500.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">When is the best time to make a prepayment?</h4>
                  <p>
                    As early as possible. Interest is front-loaded in amortizing loans, meaning early payments go mostly to interest. Prepaying in year one saves more than the same amount in year 10. If you get a bonus or tax refund, applying it immediately maximizes the benefit.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Are there limits on how much I can prepay?</h4>
                  <p>
                    Most personal loans and student loans have no prepayment limits. Mortgages often limit prepayment to 10-20% of the balance per year without triggering a penalty. Check your loan documents or call your lender. Even with limits, you can usually prepay up to the allowed amount annually.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How do I make sure my prepayment goes to principal?</h4>
                  <p>
                    Lenders must apply extra payments to principal by law in most cases, but it's worth confirming. Write "apply to principal" on the payment memo or include a note with online payments. Follow up by checking your next statement to verify the principal balance dropped by the full prepayment amount.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
