"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SWPCalculatorPage() {
  const [corpus, setCorpus] = useState<string>("");
  const [expectedReturn, setExpectedReturn] = useState<string>("");
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState<string>("");
  const [result, setResult] = useState<{
    monthsLasts: number;
    yearsLasts: number;
    totalWithdrawn: number;
    remainingCorpus: number;
  } | null>(null);

  const calculateSWP = () => {
    const P = parseFloat(corpus);
    const R = parseFloat(expectedReturn) / 12 / 100;
    const W = parseFloat(monthlyWithdrawal);

    if (isNaN(P) || isNaN(R) || isNaN(W) || P <= 0 || R < 0 || W <= 0) {
      return;
    }

    if (W <= P * R) {
      setResult({
        monthsLasts: 9999,
        yearsLasts: 9999,
        totalWithdrawn: P,
        remainingCorpus: 0,
      });
      return;
    }

    const n = Math.log(W / (W - P * R)) / Math.log(1 + R);
    const totalWithdrawn = W * n;
    const remainingCorpus = 0;

    setResult({
      monthsLasts: Math.ceil(n),
      yearsLasts: n / 12,
      totalWithdrawn,
      remainingCorpus,
    });
  };

  const reset = () => {
    setCorpus("");
    setExpectedReturn("");
    setMonthlyWithdrawal("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">SWP Calculator – Systematic Withdrawal Plan</h1>
          <p className="text-muted-foreground">
            Find out how long your retirement corpus will last or how much you can withdraw monthly. Plan sustainable withdrawals based on corpus size and expected returns.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="corpus">Total Corpus</Label>
                <Input
                  id="corpus"
                  type="number"
                  placeholder="Enter total corpus amount"
                  value={corpus}
                  onChange={(e) => setCorpus(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
                <Input
                  id="expectedReturn"
                  type="number"
                  placeholder="Enter expected return rate"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyWithdrawal">Monthly Withdrawal Amount</Label>
                <Input
                  id="monthlyWithdrawal"
                  type="number"
                  placeholder="Enter monthly withdrawal"
                  value={monthlyWithdrawal}
                  onChange={(e) => setMonthlyWithdrawal(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateSWP} className="flex-1">
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
                  {result.yearsLasts >= 9999 ? (
                    <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Corpus Duration</p>
                      <p className="text-xl font-bold text-green-600">Corpus will last indefinitely</p>
                      <p className="text-sm mt-1">Your withdrawal is less than the monthly returns</p>
                    </div>
                  ) : (
                    <>
                      <div className="p-4 bg-primary/10 rounded-lg">
                        <p className="text-sm text-muted-foreground">Corpus Will Last</p>
                        <p className="text-2xl font-bold text-primary">{result.yearsLasts.toFixed(1)} years ({result.monthsLasts} months)</p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">Total Withdrawn</p>
                        <p className="text-xl font-bold">${result.totalWithdrawn.toFixed(2)}</p>
                      </div>
                    </>
                  )}
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Initial Corpus: ${parseFloat(corpus).toFixed(2)} | Expected Return: {expectedReturn}%</p>
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
                How It Works
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Enter Your Corpus</h4>
                    <p className="text-xs text-muted-foreground">Input your total retirement savings or investment corpus that you plan to withdraw from monthly.</p>
                  </div>
                </div>
                <div className="flex-1 flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Set Return & Withdrawal</h4>
                    <p className="text-xs text-muted-foreground">Enter expected annual return rate and your desired monthly withdrawal amount for living expenses.</p>
                  </div>
                </div>
                <div className="flex-1 flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Get Duration Analysis</h4>
                    <p className="text-xs text-muted-foreground">See how long your money will last, total amount withdrawn, and whether your corpus is sustainable.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                SWP Sustainability Guide
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3 font-semibold">Withdrawal Rate</th>
                      <th className="text-left py-2 px-3 font-semibold">Sustainability</th>
                      <th className="text-left py-2 px-3 font-semibold">Risk Level</th>
                      <th className="text-left py-2 px-3 font-semibold">Recommendation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-3 font-medium">&lt; 4% annually</td>
                      <td className="py-2 px-3 text-green-600">Highly Sustainable</td>
                      <td className="py-2 px-3 text-xs">Low</td>
                      <td className="py-2 px-3 text-xs">Corpus may last indefinitely</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3 font-medium">4-6% annually</td>
                      <td className="py-2 px-3 text-blue-600">Sustainable</td>
                      <td className="py-2 px-3 text-xs">Moderate</td>
                      <td className="py-2 px-3 text-xs">20-30 year horizon likely</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3 font-medium">6-8% annually</td>
                      <td className="py-2 px-3 text-amber-600">Moderate</td>
                      <td className="py-2 px-3 text-xs">Medium-High</td>
                      <td className="py-2 px-3 text-xs">10-20 year horizon</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium">&gt; 8% annually</td>
                      <td className="py-2 px-3 text-red-600">At Risk</td>
                      <td className="py-2 px-3 text-xs">High</td>
                      <td className="py-2 px-3 text-xs">Corpus depletes quickly</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-3">Annual withdrawal rate = (Monthly Withdrawal × 12) / Corpus × 100</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Key Features & Benefits
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold text-sm mb-2">Retirement Planning</h4>
                  <p className="text-xs text-muted-foreground">Determine if your retirement corpus can support your desired lifestyle throughout your retirement years.</p>
                </div>
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold text-sm mb-2">Sustainable Withdrawal Analysis</h4>
                  <p className="text-xs text-muted-foreground">Identify if your withdrawal rate is sustainable or if adjustments are needed to prevent running out of money.</p>
                </div>
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold text-sm mb-2">Return Rate Flexibility</h4>
                  <p className="text-xs text-muted-foreground">Test different expected return scenarios to understand how market performance affects your plan.</p>
                </div>
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold text-sm mb-2">Indefinite Income Detection</h4>
                  <p className="text-xs text-muted-foreground">Automatically identifies when your withdrawal is less than monthly returns, meaning perpetual income.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-sm mb-2">What is SWP in mutual funds?</h4>
                <p className="text-xs text-muted-foreground">
                  SWP (Systematic Withdrawal Plan) allows you to withdraw a fixed amount from your mutual fund investment at regular intervals. It's the opposite of SIP – instead of investing regularly, you withdraw regularly for income.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">What is a safe withdrawal rate for retirement?</h4>
                <p className="text-xs text-muted-foreground">
                  The "4% rule" suggests withdrawing 4% of your corpus annually (adjusted for inflation) provides high probability of 30-year sustainability. Conservative planners recommend 3-3.5% for longer retirements or volatile markets.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">How long will my retirement corpus last?</h4>
                <p className="text-xs text-muted-foreground">
                  Duration depends on withdrawal rate and returns. At 5% withdrawal with 8% returns, corpus lasts ~30 years. At 7% withdrawal, it lasts ~17 years. If withdrawal exceeds returns, corpus will eventually deplete.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">Can I live off investment interest without touching principal?</h4>
                <p className="text-xs text-muted-foreground">
                  Yes, if your withdrawal is less than your investment returns. For example, ₹1 crore at 8% return generates ₹8 lakh annually. Withdrawing only ₹6 lakh (6%) lets the corpus grow while providing income.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">What happens if market returns are lower than expected?</h4>
                <p className="text-xs text-muted-foreground">
                  Lower returns accelerate corpus depletion. A 2% return drop can reduce sustainability by 30-40%. Build a buffer, maintain flexibility to reduce withdrawals in bad years, and consider dynamic withdrawal strategies.
                </p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
