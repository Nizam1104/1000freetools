"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts";

export default function FourPercentRuleRetirementCalculatorPage() {
  const [currentSavings, setCurrentSavings] = useState<string>("");
  const [monthlyContribution, setMonthlyContribution] = useState<string>("");
  const [expectedReturn, setExpectedReturn] = useState<string>("7");
  const [yearsToRetirement, setYearsToRetirement] = useState<string>("");
  const [desiredMonthlyIncome, setDesiredMonthlyIncome] = useState<string>("4000");
  const [result, setResult] = useState<{
    projectedCorpus: number;
    annualWithdrawal: number;
    monthlyWithdrawal: number;
    requiredCorpus: number;
    onTrack: boolean;
    shortfall: number;
    yearlyProjection: Array<{ year: number; savings: number; contribution: number; total: number }>;
  } | null>(null);

  const calculateFourPercent = () => {
    const savings = parseFloat(currentSavings) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const rate = parseFloat(expectedReturn) / 100 / 12;
    const years = parseFloat(yearsToRetirement);
    const targetMonthly = parseFloat(desiredMonthlyIncome) || 4000;

    if (isNaN(years) || years <= 0) {
      return;
    }

    const months = years * 12;
    const projectedCorpus = savings * Math.pow(1 + rate, months) + monthly * ((Math.pow(1 + rate, months) - 1) / rate);
    const annualWithdrawal = projectedCorpus * 0.04;
    const monthlyWithdrawal = annualWithdrawal / 12;

    const requiredCorpus = (targetMonthly * 12) / 0.04;
    const onTrack = projectedCorpus >= requiredCorpus;
    const shortfall = requiredCorpus - projectedCorpus;

    // Generate yearly projection
    const yearlyProjection = [];
    let runningTotal = savings;
    for (let year = 0; year <= years; year++) {
      const yearMonths = year * 12;
      const futureValue = savings * Math.pow(1 + rate, yearMonths) + monthly * ((Math.pow(1 + rate, yearMonths) - 1) / rate);
      yearlyProjection.push({
        year,
        savings: savings,
        contribution: monthly * yearMonths,
        total: Math.round(futureValue),
      });
    }

    setResult({
      projectedCorpus,
      annualWithdrawal,
      monthlyWithdrawal,
      requiredCorpus,
      onTrack,
      shortfall,
      yearlyProjection,
    });
  };

  const reset = () => {
    setCurrentSavings("");
    setMonthlyContribution("");
    setExpectedReturn("7");
    setYearsToRetirement("");
    setDesiredMonthlyIncome("4000");
    setResult(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentSavings">Current Retirement Savings</Label>
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
                  placeholder="Default 7%"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="yearsToRetirement">Years to Retirement</Label>
                <Input
                  id="yearsToRetirement"
                  type="number"
                  placeholder="Enter years"
                  value={yearsToRetirement}
                  onChange={(e) => setYearsToRetirement(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="desiredMonthlyIncome">Desired Monthly Income in Retirement</Label>
                <Input
                  id="desiredMonthlyIncome"
                  type="number"
                  placeholder="e.g., 4000"
                  value={desiredMonthlyIncome}
                  onChange={(e) => setDesiredMonthlyIncome(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateFourPercent} className="flex-1">
                  Calculate
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Projected Retirement Corpus</p>
                    <p className="text-3xl font-bold text-primary">${result.projectedCorpus.toLocaleString()}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Annual Withdrawal (4%)</p>
                      <p className="text-lg font-bold">${result.annualWithdrawal.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Monthly Withdrawal</p>
                      <p className="text-lg font-bold">${result.monthlyWithdrawal.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Required Corpus for ${parseFloat(desiredMonthlyIncome).toLocaleString()}/month</p>
                    <p className="text-xl font-bold">${result.requiredCorpus.toLocaleString()}</p>
                  </div>
                  <div className={`p-4 rounded-lg ${result.onTrack ? 'bg-green-100 dark:bg-green-900/20' : 'bg-orange-100 dark:bg-orange-900/20'}`}>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className={`text-lg font-bold ${result.onTrack ? 'text-green-600' : 'text-orange-600'}`}>
                      {result.onTrack ? 'On Track!' : `Shortfall: $${result.shortfall.toLocaleString()}`}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>The 4% Rule suggests you can withdraw 4% annually, adjusted for inflation, for 30+ years</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 text-muted-foreground">
                  <p>Enter values and click Calculate to see results</p>
                </div>
              )}
            </div>
          </div>

          {result && result.yearlyProjection && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-4">Retirement Savings Projection</h3>
              <div className="h-[300px] w-full">
                <ChartContainer
                  config={{
                    total: {
                      label: "Total",
                      color: "hsl(var(--chart-1))",
                    },
                    contribution: {
                      label: "Contributions",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={result.yearlyProjection}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" tickFormatter={(v) => `Year ${v}`} />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="contribution"
                        stroke="var(--color-contribution)"
                        fill="var(--color-contribution)"
                        fillOpacity={0.3}
                        stackId="1"
                      />
                      <Area
                        type="monotone"
                        dataKey="total"
                        stroke="var(--color-total)"
                        fill="var(--color-total)"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What Is the 4% Rule?</CardTitle>
          <CardDescription>The retirement withdrawal strategy that started it all</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The 4% rule comes from a 1994 study by financial advisor William Bengen. He tested various withdrawal rates against historical market data going back to 1926. His finding: retirees who withdrew 4% of their portfolio in year one, then adjusted that amount for inflation each year after, never ran out of money over any 30-year period.
          </p>
          <p className="text-sm text-muted-foreground">
            Here's how it works: You retire with $1 million. Year one, you withdraw $40,000 (4%). Year two, if inflation was 3%, you withdraw $41,200. Year three, you adjust again. The portfolio stays invested in stocks and bonds, growing (hopefully) faster than you're withdrawing.
          </p>
          <p className="text-sm text-muted-foreground">
            The 4% rule isn't perfect. It assumes a 60/40 stock-bond portfolio, 30-year retirements, and historical market returns. People retiring in 2000 faced terrible early returns – the "sequence of returns risk" – and would have run out of money with 4% withdrawals. Some researchers now suggest 3.5% or even 3% is safer for early retirees facing 40-50 year retirements.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How Much Do You Need to Retire?</CardTitle>
          <CardDescription>Corpus required by desired monthly income</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Desired Monthly Income</TableHead>
                <TableHead>Annual Income Needed</TableHead>
                <TableHead>Required Corpus (4% Rule)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">$2,000</TableCell>
                <TableCell className="font-mono text-xs">$24,000</TableCell>
                <TableCell className="font-mono text-xs">$600,000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">$3,000</TableCell>
                <TableCell className="font-mono text-xs">$36,000</TableCell>
                <TableCell className="font-mono text-xs">$900,000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">$4,000</TableCell>
                <TableCell className="font-mono text-xs">$48,000</TableCell>
                <TableCell className="font-mono text-xs">$1,200,000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">$5,000</TableCell>
                <TableCell className="font-mono text-xs">$60,000</TableCell>
                <TableCell className="font-mono text-xs">$1,500,000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">$7,500</TableCell>
                <TableCell className="font-mono text-xs">$90,000</TableCell>
                <TableCell className="font-mono text-xs">$2,250,000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">$10,000</TableCell>
                <TableCell className="font-mono text-xs">$120,000</TableCell>
                <TableCell className="font-mono text-xs">$3,000,000</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Required corpus = (Desired Monthly Income × 12) ÷ 0.04. This assumes you'll withdraw 4% annually throughout retirement.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Criticisms of the 4% Rule</CardTitle>
          <CardDescription>Why some experts say it's outdated</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Lower expected returns</h4>
              <p className="text-xs text-muted-foreground">
                Bengen's study used historical averages of ~10% stock returns and ~5% bond returns. Today's environment features lower bond yields and potentially lower stock returns. Some analysts project 6-7% portfolio returns going forward, which would support only a 3-3.5% withdrawal rate.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Longer retirements</h4>
              <p className="text-xs text-muted-foreground">
                The 4% rule was designed for 30-year retirements. If you retire at 40 (FIRE movement) or 50, you need your money to last 40-50 years. Studies show 3-3.5% is safer for 50-year time horizons.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Sequence of returns risk</h4>
              <p className="text-xs text-muted-foreground">
                Retiring in 1966 or 2000 meant terrible early returns. Withdrawing 4% while your portfolio drops 40% in the first few years can permanently cripple a portfolio. This risk is highest in the first decade of retirement.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Inflation assumptions</h4>
              <p className="text-xs text-muted-foreground">
                The 4% rule assumes you'll increase withdrawals by inflation every year. But healthcare costs – a huge retirement expense – typically rise faster than CPI inflation. Your personal inflation rate may exceed the official numbers.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Alternatives to the 4% Rule</CardTitle>
          <CardDescription>Other withdrawal strategies to consider</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Strategy</TableHead>
                <TableHead>How It Works</TableHead>
                <TableHead>Pros</TableHead>
                <TableHead>Cons</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">3% Rule</TableCell>
                <TableCell className="text-xs">Withdraw 3% annually</TableCell>
                <TableCell className="text-xs">Much safer for long retirements</TableCell>
                <TableCell className="text-xs">Need 33% larger portfolio</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Dynamic Spending</TableCell>
                <TableCell className="text-xs">Adjust withdrawals based on market performance</TableCell>
                <TableCell className="text-xs">Reduces sequence risk significantly</TableCell>
                <TableCell className="text-xs">Income varies year to year</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Bucket Strategy</TableCell>
                <TableCell className="text-xs">Keep 2-3 years cash, rest invested</TableCell>
                <TableCell className="text-xs">No forced selling in downturns</TableCell>
                <TableCell className="text-xs">Cash drag on returns</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Guardrails</TableCell>
                <TableCell className="text-xs">Increase/decrease based on portfolio value</TableCell>
                <TableCell className="text-xs">Balances income and safety</TableCell>
                <TableCell className="text-xs">Complex to implement</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Is the 4% rule still valid in 2024?</h4>
            <p className="text-xs text-muted-foreground">
              It's a reasonable starting point, but not a guarantee. The original study's assumptions don't match today's low-yield environment. Many planners now use 3.5% as a more conservative baseline. If you have flexibility to reduce spending in bad market years, 4% is probably fine.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Does the 4% rule include Social Security?</h4>
            <p className="text-xs text-muted-foreground">
              No – the 4% rule applies to your investment portfolio. Social Security, pensions, and rental income are separate. If you'll get $2,000/month from Social Security, you can subtract that from your needed income and calculate a smaller required portfolio.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if I retire early (FIRE)?</h4>
            <p className="text-xs text-muted-foreground">
              Early retirees face 50+ year time horizons, not 30 years. Most FIRE advocates use 3-3.5% withdrawal rates. The "4% rule" becomes the "3.25% rule" for 50-year retirements. Also consider that early retirees often have flexibility to work part-time if needed.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Should I adjust for taxes?</h4>
            <p className="text-xs text-muted-foreground">
              Absolutely. The 4% rule gives you pre-tax income. If you need $4,000/month after taxes and you're in a 20% tax bracket, you actually need $5,000/month pre-tax – which requires a $1.5 million portfolio, not $1.2 million. Roth accounts change this calculation.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What asset allocation works best with the 4% rule?</h4>
            <p className="text-xs text-muted-foreground">
              Bengen's original study used 50-75% stocks. Most subsequent research suggests 60% stocks / 40% bonds is a reasonable baseline. More stocks = higher returns but more volatility. Less stocks = smoother ride but potentially lower returns. Target-date funds typically handle this automatically.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <a href="/calculators/retirement-corpus-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Retirement Corpus Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate your retirement target</p>
            </a>
            <a href="/calculators/retirement-withdrawal-rate-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Retirement Withdrawal Rate</p>
              <p className="text-xs text-muted-foreground">Find your safe withdrawal rate</p>
            </a>
            <a href="/calculators/compound-interest-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Compound Interest Calculator</p>
              <p className="text-xs text-muted-foreground">Project investment growth</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
