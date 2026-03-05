"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function WealthGrowthProjectionCalculatorPage() {
  const [currentSavings, setCurrentSavings] = useState<string>("");
  const [monthlyContribution, setMonthlyContribution] = useState<string>("");
  const [expectedReturn, setExpectedReturn] = useState<string>("");
  const [years, setYears] = useState<string>("");
  const [result, setResult] = useState<{
    finalValue: number;
    totalContributed: number;
    totalGrowth: number;
    yearByYear: Array<{ year: number; value: number; contributed: number; growth: number }>;
  } | null>(null);

  const calculateWealthGrowth = () => {
    const current = parseFloat(currentSavings);
    const monthly = parseFloat(monthlyContribution);
    const rate = parseFloat(expectedReturn) / 100 / 12;
    const totalYears = parseFloat(years);

    if (isNaN(current) || isNaN(monthly) || isNaN(rate) || isNaN(totalYears) || current < 0 || monthly < 0 || totalYears <= 0) {
      return;
    }

    let value = current;
    let totalContributed = current;
    const yearByYear = [];

    for (let year = 1; year <= totalYears; year++) {
      for (let month = 0; month < 12; month++) {
        value = value * (1 + rate) + monthly;
        totalContributed += monthly;
      }
      yearByYear.push({
        year,
        value: Math.round(value * 100) / 100,
        contributed: Math.round(totalContributed * 100) / 100,
        growth: Math.round((value - totalContributed) * 100) / 100,
      });
    }

    setResult({
      finalValue: value,
      totalContributed,
      totalGrowth: value - totalContributed,
      yearByYear,
    });
  };

  const reset = () => {
    setCurrentSavings("");
    setMonthlyContribution("");
    setExpectedReturn("");
    setYears("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Wealth Growth Projection Calculator</h1>
          <p className="text-muted-foreground">
            Project your portfolio's value year by year. Enter current savings, monthly contributions, and expected annual return to visualize your long-term wealth trajectory.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
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
                <Label htmlFor="monthlyContribution">Monthly Contribution</Label>
                <Input
                  id="monthlyContribution"
                  type="number"
                  placeholder="Enter monthly contribution"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
                <Input
                  id="expectedReturn"
                  type="number"
                  placeholder="Enter expected return"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="years">Investment Period (Years)</Label>
                <Input
                  id="years"
                  type="number"
                  placeholder="Enter number of years"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateWealthGrowth} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Final Portfolio Value</p>
                    <p className="text-3xl font-bold text-primary">${result.finalValue.toFixed(2)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Contributed</p>
                      <p className="text-lg font-bold">${result.totalContributed.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Growth</p>
                      <p className="text-lg font-bold text-green-600">${result.totalGrowth.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-semibold mb-2">Year-by-Year Projection</h4>
                    <div className="max-h-48 overflow-y-auto">
                      <table className="w-full text-sm">
                        <thead className="sticky top-0 bg-background">
                          <tr className="border-b">
                            <th className="text-left py-1">Year</th>
                            <th className="text-right py-1">Value</th>
                            <th className="text-right py-1">Growth</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.yearByYear.map((y) => (
                            <tr key={y.year} className="border-b last:border-0">
                              <td className="py-1">{y.year}</td>
                              <td className="text-right">${y.value.toLocaleString()}</td>
                              <td className="text-right text-green-600">${y.growth.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
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

        {/* How It Works Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-6">How to Project Wealth Growth</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-semibold mb-2">Enter Current Savings</h3>
                <p className="text-sm text-muted-foreground">Input your starting balance or current investment portfolio value.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-semibold mb-2">Set Contribution & Return</h3>
                <p className="text-sm text-muted-foreground">Enter monthly contribution amount and expected annual return rate.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-semibold mb-2">View Growth Projection</h3>
                <p className="text-sm text-muted-foreground">See year-by-year breakdown of contributions, growth, and total value.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Key Features of This Wealth Calculator</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">**Compound Growth**</h3>
              <p className="text-sm text-muted-foreground">Calculates monthly compounding to show realistic investment growth over time.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">**Year-by-Year Breakdown**</h3>
              <p className="text-sm text-muted-foreground">Detailed annual projections showing contributions, growth, and total value.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">**Total Growth Analysis**</h3>
              <p className="text-sm text-muted-foreground">See how much of your wealth comes from contributions vs investment returns.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">**Retirement Planning**</h3>
              <p className="text-sm text-muted-foreground">Essential tool for FIRE calculations and long-term financial planning.</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">What is a good expected return rate?</h3>
              <p className="text-sm text-muted-foreground">Historically, the S&P 500 averages about 10% annually. Conservative estimates use 6-8%. Bonds typically return 3-5%. Diversified portfolios often target 7-9%.</p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">How does compound interest work?</h3>
              <p className="text-sm text-muted-foreground">Compound interest means you earn returns on both your principal and accumulated earnings. Over time, this creates exponential growth - the &quot;snowball effect&quot;.</p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">How much should I save monthly?</h3>
              <p className="text-sm text-muted-foreground">Financial advisors recommend saving 15-20% of income for retirement. The exact amount depends on your age, goals, and current savings.</p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">Does this account for inflation?</h3>
              <p className="text-sm text-muted-foreground">This calculator shows nominal (not inflation-adjusted) returns. For real purchasing power, subtract expected inflation (typically 2-3%) from your return rate.</p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">How accurate are these projections?</h3>
              <p className="text-sm text-muted-foreground">Projections are estimates based on constant returns. Actual markets fluctuate. Use as a planning guide, not a guarantee. Consider running best/worst case scenarios.</p>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Related Calculators</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/calculators/compound-interest-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
              <h3 className="font-semibold mb-1">Compound Interest Calculator</h3>
              <p className="text-sm text-muted-foreground">Calculate compound interest growth for savings and investments.</p>
            </a>
            <a href="/calculators/4-percent-rule-retirement-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
              <h3 className="font-semibold mb-1">4% Rule Retirement Calculator</h3>
              <p className="text-sm text-muted-foreground">Determine safe withdrawal rates for retirement income planning.</p>
            </a>
            <a href="/calculators/fire-number-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
              <h3 className="font-semibold mb-1">FIRE Number Calculator</h3>
              <p className="text-sm text-muted-foreground">Calculate your financial independence retirement number.</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
