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
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

export default function SIPCalculatorPage() {
  const [monthlyContribution, setMonthlyContribution] = useState<string>("");
  const [expectedReturn, setExpectedReturn] = useState<string>("");
  const [investmentDuration, setInvestmentDuration] = useState<string>("");
  const [result, setResult] = useState<{
    investedAmount: number;
    maturityValue: number;
    wealthGained: number;
    yearlyBreakdown: Array<{ year: number; invested: number; value: number; gains: number }>;
  } | null>(null);

  const calculateSIP = () => {
    const P = parseFloat(monthlyContribution);
    const R = parseFloat(expectedReturn) / 12 / 100;
    const N = parseFloat(investmentDuration) * 12;

    if (isNaN(P) || isNaN(R) || isNaN(N) || P <= 0 || R <= 0 || N <= 0) {
      return;
    }

    const investedAmount = P * N;
    const maturityValue = P * ((Math.pow(1 + R, N) - 1) / R) * (1 + R);
    const wealthGained = maturityValue - investedAmount;

    const yearlyBreakdown = [];
    for (let year = 0; year <= parseFloat(investmentDuration); year++) {
      const monthsElapsed = year * 12;
      const yearInvested = P * monthsElapsed;
      const yearValue = P * ((Math.pow(1 + R, monthsElapsed) - 1) / R) * (1 + R);
      const yearGains = yearValue - yearInvested;
      yearlyBreakdown.push({
        year,
        invested: Math.round(yearInvested),
        value: Math.round(yearValue),
        gains: Math.round(yearGains),
      });
    }

    setResult({ investedAmount, maturityValue, wealthGained, yearlyBreakdown });
  };

  const reset = () => {
    setMonthlyContribution("");
    setExpectedReturn("");
    setInvestmentDuration("");
    setResult(null);
  };

  const pieData = result
    ? [
        { name: "Invested Amount", value: Math.round(result.investedAmount), color: "hsl(var(--chart-1))" },
        { name: "Wealth Gained", value: Math.round(result.wealthGained), color: "hsl(var(--chart-2))" },
      ]
    : [];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>SIP Calculator</CardTitle>
          <CardDescription>
            Calculate the maturity value of your Systematic Investment Plan. Enter your monthly investment, expected return rate, and duration to see your potential corpus.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="monthlyContribution">Monthly Investment</Label>
              <Input
                id="monthlyContribution"
                type="number"
                placeholder="e.g., 5000"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
              <Input
                id="expectedReturn"
                type="number"
                placeholder="e.g., 12"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="investmentDuration">Investment Duration (Years)</Label>
              <Input
                id="investmentDuration"
                type="number"
                placeholder="e.g., 10"
                value={investmentDuration}
                onChange={(e) => setInvestmentDuration(e.target.value)}
              />
            </div>

            <div className="md:col-span-3 flex gap-2 pt-2">
              <Button onClick={calculateSIP} className="flex-1">Calculate SIP</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
          </div>

          {result && (
            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Invested Amount</p>
                <p className="text-2xl font-bold">${result.investedAmount.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm text-muted-foreground">Wealth Gained</p>
                <p className="text-2xl font-bold text-green-600">${result.wealthGained.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Maturity Value</p>
                <p className="text-2xl font-bold text-primary">${result.maturityValue.toLocaleString()}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {result && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Investment Growth Over Time</CardTitle>
              <CardDescription>Year-by-year breakdown of your SIP growth</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="h-72">
                <ChartContainer
                  config={{
                    invested: {
                      label: "Invested",
                      color: "hsl(var(--chart-1))",
                    },
                    gains: {
                      label: "Gains",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={result.yearlyBreakdown} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="year" tick={{ fontSize: 12 }} label={{ value: "Year", position: "insideBottom", offset: -5 }} />
                      <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area type="monotone" dataKey="invested" stackId="1" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" name="Invested" />
                      <Area type="monotone" dataKey="gains" stackId="2" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" name="Gains" />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>

              <div className="h-64">
                <ChartContainer
                  config={{
                    investedAmount: {
                      label: "Invested Amount",
                      color: "hsl(var(--chart-1))",
                    },
                    wealthGained: {
                      label: "Wealth Gained",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, value }) => `${name}: $${value.toLocaleString()}`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Yearly Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Year</TableHead>
                    <TableHead>Invested</TableHead>
                    <TableHead>Total Value</TableHead>
                    <TableHead>Gains</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {result.yearlyBreakdown.map((row) => (
                    <TableRow key={row.year}>
                      <TableCell className="font-medium">{row.year}</TableCell>
                      <TableCell className="font-mono text-xs">${row.invested.toLocaleString()}</TableCell>
                      <TableCell className="font-mono text-xs">${row.value.toLocaleString()}</TableCell>
                      <TableCell className="font-mono text-xs text-green-600">${row.gains.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}

      <Card>
        <CardHeader>
          <CardTitle>How SIP Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            A Systematic Investment Plan (SIP) lets you invest a fixed amount regularly in mutual funds. Instead of trying to time the market, you invest consistently - monthly, quarterly, or weekly.
          </p>
          <p className="text-sm text-muted-foreground">
            The magic of SIP comes from rupee cost averaging and compounding. When markets are down, your fixed amount buys more units. When markets rise, your existing investments grow. Over time, this smooths out volatility and builds wealth.
          </p>

          <div className="rounded-lg border p-4 bg-muted">
            <h4 className="font-semibold text-sm mb-2">The SIP Formula</h4>
            <div className="font-mono text-xs space-y-1">
              <p>M = P × [((1 + r)^n - 1) / r] × (1 + r)</p>
              <p className="text-muted-foreground">Where: P = Monthly investment, r = Monthly return rate, n = Number of months</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expected Returns by Fund Type</CardTitle>
          <CardDescription>Historical average returns for different mutual fund categories</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fund Type</TableHead>
                <TableHead>Avg. Annual Return</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Suitable For</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Large Cap Fund</TableCell>
                <TableCell className="font-mono text-xs">10-12%</TableCell>
                <TableCell className="text-xs">Moderate</TableCell>
                <TableCell className="text-xs">Conservative investors, 5+ years</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Mid Cap Fund</TableCell>
                <TableCell className="font-mono text-xs">12-15%</TableCell>
                <TableCell className="text-xs">Moderately High</TableCell>
                <TableCell className="text-xs">Moderate risk appetite, 7+ years</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Small Cap Fund</TableCell>
                <TableCell className="font-mono text-xs">15-18%</TableCell>
                <TableCell className="text-xs">High</TableCell>
                <TableCell className="text-xs">Aggressive investors, 10+ years</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Flexi Cap Fund</TableCell>
                <TableCell className="font-mono text-xs">12-14%</TableCell>
                <TableCell className="text-xs">Moderate</TableCell>
                <TableCell className="text-xs">Most investors, 5+ years</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Index Fund (Nifty 50)</TableCell>
                <TableCell className="font-mono text-xs">10-12%</TableCell>
                <TableCell className="text-xs">Low-Moderate</TableCell>
                <TableCell className="text-xs">Passive investors, 5+ years</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Past returns do not guarantee future performance. Returns are based on 10-year historical averages as of 2024. Equity mutual funds are subject to market risks.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SIP vs Lump Sum: Which Is Better?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">SIP (Systematic Investment Plan)</h4>
              <ul className="text-xs text-muted-foreground space-y-2">
                <li>• Invests fixed amounts regularly</li>
                <li>• Averages out market volatility</li>
                <li>• No need to time the market</li>
                <li>• Builds disciplined investing habit</li>
                <li>• Better for most salaried investors</li>
              </ul>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Lump Sum Investment</h4>
              <ul className="text-xs text-muted-foreground space-y-2">
                <li>• Invests entire amount at once</li>
                <li>• Higher returns if market rises</li>
                <li>• Requires market timing judgment</li>
                <li>• Suitable for bonuses or windfalls</li>
                <li>• Higher risk if market falls soon after</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Studies show SIPs outperform lump sum investments about 60% of the time over 3-year periods. However, lump sum investing wins more often over longer periods (10+ years) because markets tend to rise over time.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Is SIP better than lump sum investment?</h4>
            <p className="text-xs text-muted-foreground">
              SIP is better for regular income earners who want to build wealth gradually without timing the market. Lump sum works well when you have a large amount (bonus, inheritance) and can tolerate short-term volatility. For most people, SIP reduces the risk of investing everything at a market peak.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What is a good SIP return rate?</h4>
            <p className="text-xs text-muted-foreground">
              For equity mutual funds, 12% annual return is a reasonable long-term expectation. Large cap funds typically deliver 10-12%, while mid and small cap funds can give 14-18% but with higher volatility. Debt funds usually return 6-8%. Past performance does not guarantee future results.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How much SIP should I start with?</h4>
            <p className="text-xs text-muted-foreground">
              Start with an amount you can sustain consistently - even Rs. 500 or Rs. 1,000 per month works. The key is regularity, not the amount. Increase your SIP by 10% annually (step-up SIP) to accelerate wealth creation. A good rule is to invest 10-20% of your monthly income.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">When should I stop or redeem my SIP?</h4>
            <p className="text-xs text-muted-foreground">
              Stop your SIP only if you have reached your financial goal, the fund consistently underperforms its benchmark for 2-3 years, or you need the money for planned expenses. Do not stop SIPs during market crashes - that is when you accumulate more units at lower prices.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I lose money in SIP?</h4>
            <p className="text-xs text-muted-foreground">
              Yes, SIPs in equity funds can show negative returns in the short term (1-3 years). However, over periods of 7+ years, equity SIPs have historically delivered positive returns in India. The risk of loss decreases significantly with longer investment horizons. Debt fund SIPs have lower risk but also lower returns.
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
            <a href="/calculators/compound-interest-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Compound Interest Calculator</p>
              <p className="text-xs text-muted-foreground">See how compounding grows your money</p>
            </a>
            <a href="/calculators/step-up-sip-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Step Up SIP Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate SIP with annual increases</p>
            </a>
            <a href="/calculators/retirement-corpus-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Retirement Corpus Calculator</p>
              <p className="text-xs text-muted-foreground">Plan your retirement savings goal</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
