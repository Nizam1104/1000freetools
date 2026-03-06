"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

export default function CompoundInterestCalculatorPage() {
  const [principal, setPrincipal] = useState<string>("");
  const [rate, setRate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [compoundingFrequency, setCompoundingFrequency] = useState<string>("12");
  const [result, setResult] = useState<{
    totalAmount: number;
    compoundInterest: number;
    totalPrincipal: number;
    yearlyBreakdown: Array<{ year: number; principal: number; interest: number; total: number }>;
  } | null>(null);

  const calculateCompoundInterest = () => {
    const P = parseFloat(principal);
    const R = parseFloat(rate);
    const T = parseFloat(time);
    const n = parseInt(compoundingFrequency);

    if (isNaN(P) || isNaN(R) || isNaN(T) || P <= 0 || R <= 0 || T <= 0) {
      return;
    }

    const totalAmount = P * Math.pow(1 + R / (100 * n), n * T);
    const compoundInterest = totalAmount - P;

    // Generate yearly breakdown
    const yearlyBreakdown = [];
    for (let year = 0; year <= T; year++) {
      const amount = P * Math.pow(1 + R / (100 * n), n * year);
      const interestEarned = amount - P;
      yearlyBreakdown.push({
        year,
        principal: P,
        interest: Math.round(interestEarned),
        total: Math.round(amount),
      });
    }

    setResult({ totalAmount, compoundInterest, totalPrincipal: P, yearlyBreakdown });
  };

  const reset = () => {
    setPrincipal("");
    setRate("");
    setTime("");
    setCompoundingFrequency("12");
    setResult(null);
  };

  const frequencyOptions = [
    { value: "1", label: "Annually (1 time/year)" },
    { value: "2", label: "Semi-annually (2 times/year)" },
    { value: "4", label: "Quarterly (4 times/year)" },
    { value: "12", label: "Monthly (12 times/year)" },
    { value: "52", label: "Weekly (52 times/year)" },
    { value: "365", label: "Daily (365 times/year)" },
  ];

  // Generate pie chart data for final breakdown
  const pieData = result
    ? [
        { name: "Principal", value: result.totalPrincipal, color: "hsl(var(--chart-1))" },
        { name: "Interest Earned", value: result.compoundInterest, color: "hsl(var(--chart-2))" },
      ]
    : [];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="principal">Principal Amount</Label>
                <Input
                  id="principal"
                  type="number"
                  placeholder="Enter principal amount"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rate">Annual Interest Rate (%)</Label>
                <Input
                  id="rate"
                  type="number"
                  placeholder="Enter annual interest rate"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Time Period (Years)</Label>
                <Input
                  id="time"
                  type="number"
                  placeholder="Enter time period in years"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequency">Compounding Frequency</Label>
                <Select value={compoundingFrequency} onValueChange={setCompoundingFrequency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    {frequencyOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateCompoundInterest} className="flex-1">
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
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Amount</p>
                    <p className="text-2xl font-bold">${result.totalAmount.toFixed(2)}</p>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Compound Interest Earned</p>
                    <p className="text-2xl font-bold text-primary">${result.compoundInterest.toFixed(2)}</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Formula: A = P(1 + r/n)^(nt)</p>
                    <p className="mt-1">
                      Principal: ${result.totalPrincipal.toFixed(2)} | Interest: ${result.compoundInterest.toFixed(2)}
                    </p>
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
                <h3 className="text-lg font-semibold mb-4">Growth Over Time</h3>
                <div className="h-[250px] w-full">
                  <ChartContainer
                    config={{
                      principal: {
                        label: "Principal",
                        color: "hsl(var(--chart-1))",
                      },
                      interest: {
                        label: "Interest",
                        color: "hsl(var(--chart-2))",
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
                          dataKey="principal"
                          stroke="var(--color-principal)"
                          fill="var(--color-principal)"
                          fillOpacity={0.3}
                          stackId="1"
                        />
                        <Area
                          type="monotone"
                          dataKey="interest"
                          stroke="var(--color-interest)"
                          fill="var(--color-interest)"
                          fillOpacity={0.3}
                          stackId="1"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="text-lg font-semibold mb-4">Final Breakdown</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="h-[200px]">
                    <ChartContainer
                      config={{
                        principal: {
                          label: "Principal",
                          color: "hsl(var(--chart-1))",
                        },
                        interest: {
                          label: "Interest",
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
                            labelLine={false}
                            label={({ name, value }) => `${name}: $${value.toLocaleString()}`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
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
                  <div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Component</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Percentage</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Principal</TableCell>
                          <TableCell className="font-mono">${result.totalPrincipal.toFixed(2)}</TableCell>
                          <TableCell className="font-mono">{((result.totalPrincipal / result.totalAmount) * 100).toFixed(1)}%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Interest Earned</TableCell>
                          <TableCell className="font-mono">${result.compoundInterest.toFixed(2)}</TableCell>
                          <TableCell className="font-mono">{((result.compoundInterest / result.totalAmount) * 100).toFixed(1)}%</TableCell>
                        </TableRow>
                        <TableRow className="font-semibold">
                          <TableCell>Total</TableCell>
                          <TableCell className="font-mono">${result.totalAmount.toFixed(2)}</TableCell>
                          <TableCell className="font-mono">100%</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What Is Compound Interest?</CardTitle>
          <CardDescription>Einstein supposedly called it the eighth wonder of the world</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Compound interest is what happens when your interest earns interest. You put $1,000 in an account at 5%. After year one, you have $1,050. In year two, you don't just earn 5% on the original $1,000 – you earn 5% on the full $1,050. That extra $50 starts working for you.
          </p>
          <p className="text-sm text-muted-foreground">
            Over short periods, the difference between simple and compound interest is negligible. Over decades, it's everything. $10,000 at 7% for 30 years becomes $31,000 with simple interest. With compound interest? $76,123. That's not a typo. The extra $45,000 comes from interest stacking on interest, year after year.
          </p>
          <p className="text-sm text-muted-foreground">
            Time is the secret ingredient. A 25-year-old who invests $5,000/year for just 10 years ($50,000 total) and then stops will have more at 65 than someone who starts at 35 and invests $5,000/year for 30 years ($150,000 total). The early starter's money had 10 extra years to compound. That's the power you're harnessing.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How Compounding Frequency Affects Returns</CardTitle>
          <CardDescription>More frequent = more money</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Frequency</TableHead>
                <TableHead>Times Per Year</TableHead>
                <TableHead>$10,000 at 5% for 10 Years</TableHead>
                <TableHead>Difference</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Annually</TableCell>
                <TableCell className="font-mono text-xs">1</TableCell>
                <TableCell className="font-mono text-xs">$16,289</TableCell>
                <TableCell className="text-xs text-muted-foreground">Baseline</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Semi-annually</TableCell>
                <TableCell className="font-mono text-xs">2</TableCell>
                <TableCell className="font-mono text-xs">$16,386</TableCell>
                <TableCell className="text-xs text-muted-foreground">+$97</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Quarterly</TableCell>
                <TableCell className="font-mono text-xs">4</TableCell>
                <TableCell className="font-mono text-xs">$16,436</TableCell>
                <TableCell className="text-xs text-muted-foreground">+$147</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Monthly</TableCell>
                <TableCell className="font-mono text-xs">12</TableCell>
                <TableCell className="font-mono text-xs">$16,470</TableCell>
                <TableCell className="text-xs text-muted-foreground">+$181</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Daily</TableCell>
                <TableCell className="font-mono text-xs">365</TableCell>
                <TableCell className="font-mono text-xs">$16,487</TableCell>
                <TableCell className="text-xs text-muted-foreground">+$198</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            The difference seems small here, but scales with larger amounts and longer time horizons. Over 30 years, daily vs annual compounding on $100,000 at 6% means an extra $1,800.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>The Rule of 72</CardTitle>
          <CardDescription>Quick mental math for doubling time</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Want to know how long it takes to double your money at a given interest rate? Divide 72 by the rate. At 6%, your money doubles in 12 years (72 ÷ 6 = 12). At 8%, it doubles in 9 years. At 10%, just over 7 years.
          </p>
          <p className="text-sm text-muted-foreground">
            The Rule of 72 isn't exact, but it's close enough for quick estimates. It works because of how compound interest math works out. The actual formula is ln(2) / ln(1 + r), which is harder to calculate in your head.
          </p>
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm font-semibold mb-2">Doubling Time Examples</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <p className="text-muted-foreground">At 3%</p>
                <p className="font-mono">24 years</p>
              </div>
              <div>
                <p className="text-muted-foreground">At 5%</p>
                <p className="font-mono">14.4 years</p>
              </div>
              <div>
                <p className="text-muted-foreground">At 7%</p>
                <p className="font-mono">10.3 years</p>
              </div>
              <div>
                <p className="text-muted-foreground">At 10%</p>
                <p className="font-mono">7.2 years</p>
              </div>
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
            <h4 className="font-semibold text-sm mb-2">How is compound interest calculated?</h4>
            <p className="text-xs text-muted-foreground">
              The formula is A = P(1 + r/n)^(nt), where P is principal, r is annual rate (as decimal), n is compounding frequency per year, and t is years. For $10,000 at 5% compounded monthly for 10 years: A = 10000(1 + 0.05/12)^(12×10) = $16,470.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Does compound interest work against you?</h4>
            <p className="text-xs text-muted-foreground">
              Absolutely. Credit cards compound daily, typically at 20-30% APR. That $5,000 balance at 24% compounded daily becomes $6,300 in just one year if you don't pay it down. Compound interest builds wealth when you're earning it, destroys wealth when you're paying it.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between APY and APR?</h4>
            <p className="text-xs text-muted-foreground">
              APR is the simple annual rate. APY (Annual Percentage Yield) includes compounding. A 5% APR with monthly compounding equals 5.12% APY. Banks advertise APY for savings accounts (looks higher) and APR for loans (looks lower). Always compare APY to APY.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Is compound interest better than simple interest?</h4>
            <p className="text-xs text-muted-foreground">
              For investors, yes – compound interest earns more over time. For borrowers, simple interest is cheaper. Most savings accounts and investments use compound interest. Most personal loans use simple interest. Mortgages and credit cards use compound interest.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How can I maximize compound interest?</h4>
            <p className="text-xs text-muted-foreground">
              Three levers: start early (time is the biggest factor), contribute consistently (more principal = more compounding), and seek higher rates (within your risk tolerance). A 25-year-old investing $300/month at 7% retires with $525,000. Waiting until 35 cuts that to $245,000.
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
            <a href="/calculators/roi-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">ROI Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate return on investment</p>
            </a>
            <a href="/calculators/simple-interest-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Simple Interest Calculator</p>
              <p className="text-xs text-muted-foreground">Compare simple vs compound interest</p>
            </a>
            <a href="/calculators/fixed-deposit-interest-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Fixed Deposit Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate FD maturity value</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
