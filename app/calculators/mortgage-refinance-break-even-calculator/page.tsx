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
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";

export default function MortgageRefinanceBreakEvenCalculatorPage() {
  const [currentBalance, setCurrentBalance] = useState<string>("");
  const [currentRate, setCurrentRate] = useState<string>("");
  const [newRate, setNewRate] = useState<string>("");
  const [remainingTerm, setRemainingTerm] = useState<string>("");
  const [closingCosts, setClosingCosts] = useState<string>("");
  const [result, setResult] = useState<{
    currentEMI: number;
    newEMI: number;
    monthlySavings: number;
    breakEvenMonths: number;
    breakEvenYears: number;
    totalSavings: number;
    totalInterestCurrent: number;
    totalInterestNew: number;
    yearlyBreakdown: Array<{ year: number; currentBalance: number; newBalance: number; savings: number }>;
  } | null>(null);

  const calculateRefinance = () => {
    const balance = parseFloat(currentBalance);
    const currRate = parseFloat(currentRate) / 100 / 12;
    const rate = parseFloat(newRate) / 100 / 12;
    const term = parseFloat(remainingTerm) * 12;
    const costs = parseFloat(closingCosts);

    if (isNaN(balance) || isNaN(currRate) || isNaN(rate) || isNaN(term) || isNaN(costs) || balance <= 0 || term <= 0) {
      return;
    }

    const currentEMI = balance * currRate * Math.pow(1 + currRate, term) / (Math.pow(1 + currRate, term) - 1);
    const newEMI = balance * rate * Math.pow(1 + rate, term) / (Math.pow(1 + rate, term) - 1);
    const monthlySavings = currentEMI - newEMI;
    const breakEvenMonths = costs / monthlySavings;
    const breakEvenYears = breakEvenMonths / 12;
    const totalSavings = monthlySavings * term - costs;

    // Calculate total interest for both loans
    const totalPaymentsCurrent = currentEMI * term;
    const totalInterestCurrent = totalPaymentsCurrent - balance;
    const totalPaymentsNew = newEMI * term;
    const totalInterestNew = totalPaymentsNew - balance;

    // Generate yearly breakdown
    const yearlyBreakdown = [];
    let currentBal = balance;
    let newBal = balance;
    for (let year = 1; year <= parseFloat(remainingTerm); year++) {
      const yearMonths = year * 12;
      const currentRemaining = balance * (Math.pow(1 + currRate, term) - Math.pow(1 + currRate, yearMonths)) / (Math.pow(1 + currRate, term) - 1);
      const newRemaining = balance * (Math.pow(1 + rate, term) - Math.pow(1 + rate, yearMonths)) / (Math.pow(1 + rate, term) - 1);
      yearlyBreakdown.push({
        year,
        currentBalance: Math.round(currentRemaining),
        newBalance: Math.round(newRemaining),
        savings: Math.round((currentEMI - newEMI) * yearMonths - costs),
      });
    }

    setResult({
      currentEMI,
      newEMI,
      monthlySavings,
      breakEvenMonths: Math.ceil(breakEvenMonths),
      breakEvenYears: Math.round(breakEvenYears * 10) / 10,
      totalSavings,
      totalInterestCurrent,
      totalInterestNew,
      yearlyBreakdown,
    });
  };

  const reset = () => {
    setCurrentBalance("");
    setCurrentRate("");
    setNewRate("");
    setRemainingTerm("");
    setClosingCosts("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Mortgage Refinance Break-Even Calculator</CardTitle>
          <CardDescription>
            Is refinancing worth it? Calculate the number of months your monthly savings will take to offset closing costs and determine your refinance break-even point.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentBalance">Current Loan Balance</Label>
                <Input
                  id="currentBalance"
                  type="number"
                  placeholder="Enter remaining balance"
                  value={currentBalance}
                  onChange={(e) => setCurrentBalance(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentRate">Current Interest Rate (%)</Label>
                <Input
                  id="currentRate"
                  type="number"
                  step="0.125"
                  placeholder="Enter current rate"
                  value={currentRate}
                  onChange={(e) => setCurrentRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newRate">New Interest Rate (%)</Label>
                <Input
                  id="newRate"
                  type="number"
                  step="0.125"
                  placeholder="Enter new rate"
                  value={newRate}
                  onChange={(e) => setNewRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="remainingTerm">Remaining Term (Years)</Label>
                <Input
                  id="remainingTerm"
                  type="number"
                  placeholder="Enter remaining years"
                  value={remainingTerm}
                  onChange={(e) => setRemainingTerm(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="closingCosts">Closing Costs</Label>
                <Input
                  id="closingCosts"
                  type="number"
                  placeholder="Enter closing costs"
                  value={closingCosts}
                  onChange={(e) => setClosingCosts(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Typical closing costs: 2-5% of loan amount</p>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateRefinance} className="flex-1">
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
                  <div className={`p-4 rounded-lg ${result.totalSavings >= 0 ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
                    <p className="text-sm text-muted-foreground">Break-Even Point</p>
                    <p className={`text-2xl font-bold ${result.totalSavings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {result.breakEvenMonths} months ({result.breakEvenYears} years)
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Current EMI</p>
                      <p className="text-lg font-bold">${result.currentEMI.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">New EMI</p>
                      <p className="text-lg font-bold">${result.newEMI.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Monthly Savings</p>
                    <p className="text-lg font-bold text-green-600">${result.monthlySavings.toFixed(2)}</p>
                  </div>
                  <div className={`p-4 rounded-lg ${result.totalSavings >= 0 ? 'bg-primary/10' : 'bg-red-100 dark:bg-red-900/20'}`}>
                    <p className="text-sm text-muted-foreground">Total Savings Over Loan Term</p>
                    <p className={`text-lg font-bold ${result.totalSavings >= 0 ? 'text-primary' : 'text-red-600'}`}>
                      ${result.totalSavings.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>If you plan to stay in the home longer than {result.breakEvenYears} years, refinancing may be worthwhile</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 text-muted-foreground">
                  <p>Enter values and click Calculate to see results</p>
                </div>
              )}
            </div>
          </div>

          {result && result.yearlyBreakdown && (
            <>
              <div className="mt-6 pt-6 border-t">
                <h3 className="text-lg font-semibold mb-4">Cumulative Savings Over Time</h3>
                <div className="h-[250px] w-full">
                  <ChartContainer
                    config={{
                      savings: {
                        label: "Cumulative Savings",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={result.yearlyBreakdown}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" tickFormatter={(v) => `Year ${v}`} />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey="savings"
                          stroke="var(--color-savings)"
                          fill="var(--color-savings)"
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="text-lg font-semibold mb-4">Interest Comparison</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Loan</TableHead>
                      <TableHead>Monthly Payment</TableHead>
                      <TableHead>Total Interest</TableHead>
                      <TableHead>Total Paid</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Current Loan</TableCell>
                      <TableCell className="font-mono">${result.currentEMI.toFixed(2)}</TableCell>
                      <TableCell className="font-mono">${result.totalInterestCurrent.toFixed(2)}</TableCell>
                      <TableCell className="font-mono">${(parseFloat(currentBalance) + result.totalInterestCurrent).toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">New Loan (Refinance)</TableCell>
                      <TableCell className="font-mono">${result.newEMI.toFixed(2)}</TableCell>
                      <TableCell className="font-mono">${result.totalInterestNew.toFixed(2)}</TableCell>
                      <TableCell className="font-mono">${(parseFloat(currentBalance) + result.totalInterestNew).toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow className="font-semibold bg-green-500/10">
                      <TableCell>Savings</TableCell>
                      <TableCell className="font-mono text-green-600">${result.monthlySavings.toFixed(2)}/mo</TableCell>
                      <TableCell className="font-mono text-green-600">${(result.totalInterestCurrent - result.totalInterestNew).toFixed(2)}</TableCell>
                      <TableCell className="font-mono text-green-600">${(result.totalSavings + parseFloat(closingCosts)).toFixed(2)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>When Does Refinancing Make Sense?</CardTitle>
          <CardDescription>The break-even rule and other factors</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Refinancing makes financial sense when you'll stay in your home longer than the break-even period. If closing costs are $6,000 and you save $200/month, you break even in 30 months. Move before then, and you lost money. Stay longer, and every month is pure savings.
          </p>
          <p className="text-sm text-muted-foreground">
            The old rule of thumb was "refinance if you can drop your rate by 1% or more." That's outdated. With low rates and high home prices, even a 0.5% drop can save tens of thousands. The real question isn't the rate drop – it's whether the monthly savings justify the upfront costs.
          </p>
          <p className="text-sm text-muted-foreground">
            Here's what most people miss: extending your loan term resets the clock. Refinancing a 30-year mortgage that's 10 years old back to a new 30-year term means 20 extra years of payments. You might lower monthly payments but pay far more interest overall. Always compare total interest, not just monthly payments.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Typical Mortgage Refinancing Costs</CardTitle>
          <CardDescription>What you'll pay to refinance</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fee Type</TableHead>
                <TableHead>Typical Cost</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Application Fee</TableCell>
                <TableCell className="font-mono text-xs">$75 - $500</TableCell>
                <TableCell className="text-xs">Some lenders waive this</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Appraisal Fee</TableCell>
                <TableCell className="font-mono text-xs">$300 - $700</TableCell>
                <TableCell className="text-xs">Required to confirm home value</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Origination Fee</TableCell>
                <TableCell className="font-mono text-xs">0.5% - 1% of loan</TableCell>
                <TableCell className="text-xs">Lender's primary fee</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Title Search & Insurance</TableCell>
                <TableCell className="font-mono text-xs">$700 - $2,000</TableCell>
                <TableCell className="text-xs">Varies by state and loan size</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Recording Fees</TableCell>
                <TableCell className="font-mono text-xs">$50 - $500</TableCell>
                <TableCell className="text-xs">County government fees</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Prepaid Items</TableCell>
                <TableCell className="font-mono text-xs">Varies</TableCell>
                <TableCell className="text-xs">Property taxes, homeowners insurance</TableCell>
              </TableRow>
              <TableRow className="font-semibold">
                <TableCell>Total Closing Costs</TableCell>
                <TableCell className="font-mono text-xs">2% - 5% of loan</TableCell>
                <TableCell className="text-xs">$4,000 - $15,000 typical</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Some lenders offer "no-closing-cost" refinances. They're not free – you'll pay through a higher interest rate or rolled-in costs. Calculate both scenarios.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Refinancing Scenarios: Should You Do It?</CardTitle>
          <CardDescription>Common situations analyzed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="rounded-lg border p-4 bg-green-500/5">
              <h4 className="font-semibold text-sm mb-2 text-green-600">Good candidate: Planning to stay 10+ years</h4>
              <p className="text-xs text-muted-foreground">
                You have 25 years left at 6.5%, can refinance to 5.5% with $5,000 closing costs. Monthly savings: $180. Break-even: 28 months. Over 10 years, you save $16,600 after costs. Clear win.
              </p>
            </div>
            <div className="rounded-lg border p-4 bg-red-500/5">
              <h4 className="font-semibold text-sm mb-2 text-red-600">Bad candidate: Moving in 2 years</h4>
              <p className="text-xs text-muted-foreground">
                Same refinance, but you're relocating in 24 months. You'll pay $5,000 in closing costs, save $4,320 over two years, and net lose $680. Don't refinance – wait until you buy your next home.
              </p>
            </div>
            <div className="rounded-lg border p-4 bg-yellow-500/5">
              <h4 className="font-semibold text-sm mb-2 text-yellow-600">Gray area: Extending loan term</h4>
              <p className="text-xs text-muted-foreground">
                You're 15 years into a 30-year mortgage. Refinancing to a new 30-year loan drops your payment by $300/month but adds $80,000 in total interest over the life of the loan. Only do this if you need the cash flow – and consider making extra principal payments.
              </p>
            </div>
            <div className="rounded-lg border p-4 bg-blue-500/5">
              <h4 className="font-semibold text-sm mb-2 text-blue-600">Smart move: Switch from ARM to fixed</h4>
              <p className="text-xs text-muted-foreground">
                Your 5/1 ARM is about to reset. Current fixed rates are reasonable. Locking in a fixed rate eliminates the risk of payments jumping 2-3% if rates rise. The peace of mind alone may be worth slightly higher costs.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">How much do I need to save to justify refinancing?</h4>
            <p className="text-xs text-muted-foreground">
              There's no minimum – it depends on your break-even point. A $50/month savings with $3,000 closing costs takes 60 months (5 years) to break even. If you'll stay 10 years, that's $3,000 in net savings. Small monthly savings add up over time.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Does refinancing hurt my credit score?</h4>
            <p className="text-xs text-muted-foreground">
              Temporarily, yes. The hard inquiry drops your score 5-10 points. Opening a new account also reduces average account age. But if you make on-time payments, your score recovers within 6-12 months. The interest savings usually far outweigh the temporary credit impact.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Should I refinance to a shorter term?</h4>
            <p className="text-xs text-muted-foreground">
              Refinancing from 30 years to 15 years typically gets you a lower rate and saves massive interest – but monthly payments jump 30-50%. Only do this if the higher payment fits comfortably in your budget. A middle ground: refinance to 15 years but pay the old 30-year amount when possible.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's a "no-closing-cost" refinance?</h4>
            <p className="text-xs text-muted-foreground">
              The lender covers your closing costs in exchange for a higher interest rate (typically 0.125-0.25% higher) or by rolling costs into the loan balance. It makes sense if you'll sell or refinance again within a few years. Run the numbers both ways.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I refinance if I'm underwater on my mortgage?</h4>
            <p className="text-xs text-muted-foreground">
              Traditional refinancing requires equity (typically 20%). If you owe more than your home is worth, look into government programs like HARP (if still available) or FHA streamline refinances. Some lenders also offer "high LTV" refinances for underwater borrowers at higher rates.
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
            <a href="/calculators/mortgage-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Mortgage Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate monthly mortgage payments</p>
            </a>
            <a href="/calculators/mortgage-affordability-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Mortgage Affordability</p>
              <p className="text-xs text-muted-foreground">How much house can you afford</p>
            </a>
            <a href="/calculators/extra-mortgage-payment-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Extra Mortgage Payments</p>
              <p className="text-xs text-muted-foreground">See impact of additional payments</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
