"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FIRENumberCalculatorPage() {
  const [annualExpenses, setAnnualExpenses] = useState<string>("");
  const [withdrawalRate, setWithdrawalRate] = useState<string>("4");
  const [currentSavings, setCurrentSavings] = useState<string>("");
  const [annualReturn, setAnnualReturn] = useState<string>("7");
  const [result, setResult] = useState<{
    fireNumber: number;
    yearsToFire: number;
    savingsGap: number;
  } | null>(null);

  const calculateFIRE = () => {
    const expenses = parseFloat(annualExpenses);
    const withdrawal = parseFloat(withdrawalRate) / 100;
    const savings = parseFloat(currentSavings) || 0;
    const retRate = parseFloat(annualReturn) / 100;

    if (isNaN(expenses) || isNaN(withdrawal) || isNaN(retRate) || expenses <= 0 || withdrawal <= 0) {
      return;
    }

    const fireNumber = expenses / withdrawal;
    const savingsGap = fireNumber - savings;

    let yearsToFire = 0;
    if (savingsGap > 0) {
      yearsToFire = Math.log(1 + (savingsGap * retRate) / expenses) / Math.log(1 + retRate);
    }

    setResult({
      fireNumber,
      yearsToFire: Math.max(0, Math.round(yearsToFire * 10) / 10),
      savingsGap,
    });
  };

  const reset = () => {
    setAnnualExpenses("");
    setWithdrawalRate("4");
    setCurrentSavings("");
    setAnnualReturn("7");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">FIRE Number Calculator – Financial Independence</h1>
          <p className="text-muted-foreground">
            Calculate your FIRE number—the net worth needed to retire early. Based on your annual expenses and safe withdrawal rate, find your path to financial independence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="annualExpenses">Annual Expenses</Label>
                <Input
                  id="annualExpenses"
                  type="number"
                  placeholder="Enter yearly expenses"
                  value={annualExpenses}
                  onChange={(e) => setAnnualExpenses(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="withdrawalRate">Safe Withdrawal Rate (%)</Label>
                <Input
                  id="withdrawalRate"
                  type="number"
                  placeholder="Default 4%"
                  value={withdrawalRate}
                  onChange={(e) => setWithdrawalRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentSavings">Current Savings</Label>
                <Input
                  id="currentSavings"
                  type="number"
                  placeholder="Enter current savings"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="annualReturn">Expected Annual Return (%)</Label>
                <Input
                  id="annualReturn"
                  type="number"
                  placeholder="Default 7%"
                  value={annualReturn}
                  onChange={(e) => setAnnualReturn(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateFIRE} className="flex-1">
                  Calculate FIRE Number
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
                    <p className="text-sm text-muted-foreground">Your FIRE Number</p>
                    <p className="text-3xl font-bold text-primary">${result.fireNumber.toFixed(2)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Years to FIRE</p>
                      <p className="text-lg font-bold">{result.yearsToFire} years</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Savings Gap</p>
                      <p className="text-lg font-bold">${result.savingsGap.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Based on {withdrawalRate}% withdrawal rate</p>
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
      </div>

      {/* How It Works Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">How to Calculate Your FIRE Number</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="font-semibold mb-2">Enter Annual Expenses</h3>
              <p className="text-sm text-muted-foreground">Calculate your total yearly spending including housing, food, transportation, and discretionary expenses.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="font-semibold mb-2">Set Withdrawal Rate</h3>
              <p className="text-sm text-muted-foreground">Choose your safe withdrawal rate (typically 4%) based on the Trinity Study research.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
            <div>
              <h3 className="font-semibold mb-2">Get Your FIRE Timeline</h3>
              <p className="text-sm text-muted-foreground">See your target net worth and estimated years until financial independence.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Why Use This FIRE Number Calculator</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">4% Rule Based</h3>
            <p className="text-sm text-muted-foreground">Uses the widely-accepted 4% safe withdrawal rate from the Trinity Study for conservative retirement planning.</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Timeline Projections</h3>
            <p className="text-sm text-muted-foreground">Calculates years to FIRE based on your current savings and expected investment returns.</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Savings Gap Analysis</h3>
            <p className="text-sm text-muted-foreground">Shows exactly how much more you need to save to reach financial independence.</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Customizable Returns</h3>
            <p className="text-sm text-muted-foreground">Adjust expected annual returns based on your investment strategy and risk tolerance.</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-primary/10 rounded-lg">
          <h3 className="font-semibold mb-3">FIRE Number by Annual Expenses</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Annual Expenses</th>
                <th className="text-left py-2">FIRE Number (4%)</th>
                <th className="text-left py-2">FIRE Number (3.5%)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">$30,000</td>
                <td className="py-2">$750,000</td>
                <td className="py-2">$857,143</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">$40,000</td>
                <td className="py-2">$1,000,000</td>
                <td className="py-2">$1,142,857</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">$50,000</td>
                <td className="py-2">$1,250,000</td>
                <td className="py-2">$1,428,571</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">$60,000</td>
                <td className="py-2">$1,500,000</td>
                <td className="py-2">$1,714,286</td>
              </tr>
              <tr>
                <td className="py-2">$80,000</td>
                <td className="py-2">$2,000,000</td>
                <td className="py-2">$2,285,714</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">What is the FIRE number formula?</h3>
            <p className="text-sm text-muted-foreground">FIRE Number = Annual Expenses / Withdrawal Rate. With a 4% withdrawal rate, multiply your annual expenses by 25. For example, if you spend $50,000/year, your FIRE number is $1,250,000.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Is the 4% rule still valid in 2026?</h3>
            <p className="text-sm text-muted-foreground">The 4% rule remains a solid starting point, though some experts suggest 3.5% for early retirees with 50+ year horizons. Lower withdrawal rates provide more safety against sequence of returns risk.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">How long does it take to reach FIRE?</h3>
            <p className="text-sm text-muted-foreground">Timeline depends on your savings rate. At a 50% savings rate with 7% real returns, expect 15-17 years. At 30% savings, plan for 25-30 years. Use this calculator to see your personalized timeline.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">What&apos;s the difference between LeanFIRE and FatFIRE?</h3>
            <p className="text-sm text-muted-foreground">LeanFIRE targets $25,000-40,000 annual expenses (minimal lifestyle). Regular FIRE targets $40,000-80,000. FatFIRE targets $80,000+ for a more luxurious retirement. Your FIRE number scales accordingly.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Should I include Social Security in FIRE calculations?</h3>
            <p className="text-sm text-muted-foreground">Many FIRE calculators exclude Social Security for conservatism. However, you can reduce your FIRE number by the present value of expected SS benefits if you plan to claim them.</p>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Related Financial Calculators</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <a href="/calculators/compound-interest-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
            <h3 className="font-semibold mb-1">Compound Interest Calculator</h3>
            <p className="text-sm text-muted-foreground">Project investment growth over time with compound returns.</p>
          </a>
          <a href="/calculators/savings-goal-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
            <h3 className="font-semibold mb-1">Savings Goal Calculator</h3>
            <p className="text-sm text-muted-foreground">Determine monthly savings needed to reach your target.</p>
          </a>
          <a href="/calculators/retirement-corpus-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
            <h3 className="font-semibold mb-1">Retirement Corpus Calculator</h3>
            <p className="text-sm text-muted-foreground">Calculate the total retirement fund you&apos;ll need.</p>
          </a>
        </div>
      </div>
    </div>
  );
}
