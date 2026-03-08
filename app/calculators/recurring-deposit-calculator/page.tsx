"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RecurringDepositCalculatorPage() {
  const [monthlyDeposit, setMonthlyDeposit] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [tenure, setTenure] = useState<string>("");
  const [result, setResult] = useState<{
    totalDeposited: number;
    maturityAmount: number;
    interestEarned: number;
  } | null>(null);

  const calculateRD = () => {
    const P = parseFloat(monthlyDeposit);
    const R = parseFloat(interestRate) / 100 / 12;
    const N = parseFloat(tenure) * 12;

    if (isNaN(P) || isNaN(R) || isNaN(N) || P <= 0 || R <= 0 || N <= 0) {
      return;
    }

    const totalDeposited = P * N;
    const maturityAmount = P * ((Math.pow(1 + R, N) - 1) / R) * (1 + R);
    const interestEarned = maturityAmount - totalDeposited;

    setResult({
      totalDeposited,
      maturityAmount,
      interestEarned,
    });
  };

  const reset = () => {
    setMonthlyDeposit("");
    setInterestRate("");
    setTenure("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Recurring Deposit (RD) Calculator</h1>
          <p className="text-muted-foreground">
            Calculate the maturity value of your recurring deposit. Enter your monthly installment, interest rate, and tenure to see how your RD grows over time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="monthlyDeposit">Monthly Deposit Amount</Label>
                <Input
                  id="monthlyDeposit"
                  type="number"
                  placeholder="Enter monthly deposit"
                  value={monthlyDeposit}
                  onChange={(e) => setMonthlyDeposit(e.target.value)}
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
                <Label htmlFor="tenure">Tenure (Years)</Label>
                <Input
                  id="tenure"
                  type="number"
                  placeholder="Enter tenure"
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateRD} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Maturity Amount</p>
                    <p className="text-3xl font-bold text-primary">${result.maturityAmount.toLocaleString()}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Deposited</p>
                      <p className="text-lg font-bold">${result.totalDeposited.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Interest Earned</p>
                      <p className="text-lg font-bold text-green-600">${result.interestEarned.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Monthly deposit: ${parseFloat(monthlyDeposit).toFixed(2)} | Tenure: {tenure} years</p>
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

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How Recurring Deposits Work
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                A Recurring Deposit (RD) is a term deposit where you save a fixed amount every month
                for a predetermined period. Banks pay compound interest quarterly, making RDs a
                low-risk savings option.
              </p>
              <div className="p-4 bg-muted rounded-lg font-mono text-sm">
                Maturity = P × [((1 + R)^N - 1) / R] × (1 + R)
              </div>
              <p>
                Where P is monthly deposit, R is monthly interest rate, and N is total months.
                Interest compounds quarterly in most Indian banks.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              RD Interest Rates Reference
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Bank Type</th>
                    <th className="text-left py-3 px-2 font-semibold">Typical Rate</th>
                    <th className="text-left py-3 px-2 font-semibold">Senior Citizen</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Public Sector Banks</td>
                    <td className="py-3 px-2">5.5-6.5%</td>
                    <td className="py-3 px-2">+0.50%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Private Banks</td>
                    <td className="py-3 px-2">6.0-7.0%</td>
                    <td className="py-3 px-2">+0.50%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Small Finance Banks</td>
                    <td className="py-3 px-2">7.0-8.0%</td>
                    <td className="py-3 px-2">+0.75%</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Post Office RD</td>
                    <td className="py-3 px-2">6.7%</td>
                    <td className="py-3 px-2">No extra</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Rates vary by tenure and amount. Check current rates with your bank before investing.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              RD vs Fixed Deposit
            </h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium text-foreground mb-1">Recurring Deposit</p>
                <p className="text-muted-foreground">Monthly deposits, lower initial commitment, good for regular savers</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium text-foreground mb-1">Fixed Deposit</p>
                <p className="text-muted-foreground">Lump sum deposit, higher rates typically, better for one-time investments</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Is RD interest taxable?</h4>
                <p>
                  Yes. RD interest is fully taxable as "Income from Other Sources." Banks deduct TDS
                  if annual interest exceeds ₹40,000 (₹50,000 for senior citizens).
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Can I withdraw RD before maturity?</h4>
                <p>
                  Yes, but penalties apply. Most banks charge 1-2% lower interest for premature
                  withdrawal. Some allow partial withdrawals after a lock-in period.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What happens if I miss a monthly payment?</h4>
                <p>
                  Banks charge penalty for missed payments (₹10-100 depending on amount). After
                  consecutive defaults, the RD may be closed prematurely.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Is RD safer than mutual funds?</h4>
                <p>
                  RDs are safer — they offer guaranteed returns and are insured up to ₹5 lakh per
                  depositor per bank. Mutual funds carry market risk but may give higher returns.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What is the minimum RD tenure?</h4>
                <p>
                  Most banks offer RDs from 6 months to 10 years. Common tenures are 1, 2, 3, and
                  5 years. Longer tenures typically get better interest rates.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
