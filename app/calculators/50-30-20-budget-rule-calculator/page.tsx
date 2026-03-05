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
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

export default function FiftyThirtyTwentyBudgetRuleCalculatorPage() {
  const [monthlyIncome, setMonthlyIncome] = useState<string>("");
  const [result, setResult] = useState<{
    needs: number;
    wants: number;
    savings: number;
  } | null>(null);

  const calculateBudget = () => {
    const income = parseFloat(monthlyIncome);

    if (isNaN(income) || income <= 0) {
      return;
    }

    const needs = income * 0.5;
    const wants = income * 0.3;
    const savings = income * 0.2;

    setResult({ needs, wants, savings });
  };

  const reset = () => {
    setMonthlyIncome("");
    setResult(null);
  };

  const pieData = result
    ? [
      { name: "Needs (50%)", value: result.needs, color: "hsl(var(--chart-1))", fill: "var(--color-needs)" },
      { name: "Wants (30%)", value: result.wants, color: "hsl(var(--chart-2))", fill: "var(--color-wants)" },
      { name: "Savings (20%)", value: result.savings, color: "hsl(var(--chart-3))", fill: "var(--color-savings)" },
    ]
    : [];

  const barData = result
    ? [
      { category: "Needs", amount: result.needs, fill: "var(--color-needs)" },
      { category: "Wants", amount: result.wants, fill: "var(--color-wants)" },
      { category: "Savings", amount: result.savings, fill: "var(--color-savings)" },
    ]
    : [];

  const needsExamples = [
    "Rent/mortgage",
    "Groceries",
    "Utilities (electric, water, gas)",
    "Transportation (car payment, gas, bus)",
    "Insurance (health, auto, home)",
    "Minimum debt payments",
    "Basic clothing",
  ];

  const wantsExamples = [
    "Dining out",
    "Entertainment (movies, concerts)",
    "Hobbies",
    "Streaming subscriptions",
    "Vacations",
    "Upgraded phone/electronics",
    "Gym membership (if not essential)",
  ];

  const savingsExamples = [
    "Emergency fund",
    "Retirement (401k, IRA)",
    "Extra debt payments",
    "Down payment savings",
    "Investment accounts",
    "College fund",
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>50/30/20 Budget Rule Calculator</CardTitle>
          <CardDescription>
            Apply the popular 50/30/20 budgeting rule to your income. Get recommended amounts for needs, wants, and savings based on your monthly take-home pay.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="monthlyIncome">Monthly Take-Home Income</Label>
                <Input
                  id="monthlyIncome"
                  type="number"
                  placeholder="Enter monthly income"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                />
              </div>

              <div className="pt-4">
                <div className="text-sm text-muted-foreground">
                  <p>The 50/30/20 rule suggests:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>50% for Needs (rent, food, utilities)</li>
                    <li>30% for Wants (entertainment, dining)</li>
                    <li>20% for Savings & Debt repayment</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateBudget} className="flex-1">
                  Calculate
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Recommended Budget</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Needs (50%)</p>
                    <p className="text-2xl font-bold text-red-600">${result.needs.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground mt-1">Housing, food, utilities, transportation</p>
                  </div>
                  <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Wants (30%)</p>
                    <p className="text-2xl font-bold text-blue-600">${result.wants.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground mt-1">Entertainment, dining, hobbies</p>
                  </div>
                  <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Savings & Debt (20%)</p>
                    <p className="text-2xl font-bold text-green-600">${result.savings.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground mt-1">Emergency fund, investments, extra debt payments</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Total Monthly Income: ${parseFloat(monthlyIncome).toFixed(2)}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 text-muted-foreground">
                  <p>Enter your income and click Calculate to see results</p>
                </div>
              )}
            </div>
          </div>

          {result && (
            <>
              <div className="mt-6 pt-6 border-t">
                <h3 className="text-lg font-semibold mb-4">Budget Breakdown</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="h-[250px]">
                    <ChartContainer
                      config={{
                        needs: {
                          label: "Needs",
                          color: "hsl(var(--chart-1))",
                        },
                        wants: {
                          label: "Wants",
                          color: "hsl(var(--chart-2))",
                        },
                        savings: {
                          label: "Savings",
                          color: "hsl(var(--chart-3))",
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
                  <div className="h-[250px]">
                    <ChartContainer
                      config={{
                        needs: {
                          label: "Needs",
                          color: "hsl(var(--chart-1))",
                        },
                        wants: {
                          label: "Wants",
                          color: "hsl(var(--chart-2))",
                        },
                        savings: {
                          label: "Savings",
                          color: "hsl(var(--chart-3))",
                        },
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="category" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="amount" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What Is the 50/30/20 Rule?</CardTitle>
          <CardDescription>A simple budgeting framework that actually works</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The 50/30/20 rule was popularized by Senator Elizabeth Warren in her book "All Your Worth." It's a budgeting framework that divides your after-tax income into three buckets: 50% for needs, 30% for wants, and 20% for savings and debt repayment.
          </p>
          <p className="text-sm text-muted-foreground">
            The beauty of this system is its simplicity. You don't need to track every coffee or categorize 47 different expense types. If your total needs stay under 50% and your savings hit 20%, you're winning. The remaining 30% is guilt-free spending money.
          </p>
          <p className="text-sm text-muted-foreground">
            Here's the catch: the 50/30/20 rule assumes your needs can fit into 50% of your income. For people in high-cost cities or low-income households, rent alone might eat 40-50%. That's okay – use it as a target, not a straitjacket. Aim for 50/30/20, but adjust based on your reality.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What Counts as Needs, Wants, and Savings?</CardTitle>
          <CardDescription>Where expenses belong</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Examples</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-red-600">Needs</TableCell>
                <TableCell className="font-mono text-xs">50%</TableCell>
                <TableCell className="text-xs">Rent/mortgage, groceries, utilities, transportation, insurance, minimum debt payments, basic clothing, healthcare</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-blue-600">Wants</TableCell>
                <TableCell className="font-mono text-xs">30%</TableCell>
                <TableCell className="text-xs">Dining out, entertainment, hobbies, streaming services, vacations, upgraded electronics, gym memberships, alcohol</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-green-600">Savings & Debt</TableCell>
                <TableCell className="font-mono text-xs">20%</TableCell>
                <TableCell className="text-xs">Emergency fund, retirement accounts, extra debt payments, investment accounts, college savings, down payment fund</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gray Areas: Needs vs Wants</CardTitle>
          <CardDescription>When the line gets blurry</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Groceries vs Dining Out</h4>
              <p className="text-xs text-muted-foreground">
                Groceries are a need. Restaurant meals are a want. But what about prepared meals from the grocery store? Here's a practical test: if you're buying it because it's convenient and costs 3x more than cooking, it's a want. If you genuinely can't cook (no kitchen, no time due to work), it's closer to a need.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Gym Membership</h4>
              <p className="text-xs text-muted-foreground">
                If your doctor told you to exercise for health reasons, a basic gym membership is arguably a need. If you're signing up for CrossFit because it's trendy and costs $200/month, that's a want. Same logic applies to yoga studios, Peloton subscriptions, and personal trainers.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Internet and Phone</h4>
              <p className="text-xs text-muted-foreground">
                Basic internet and phone service are needs in 2024 – you can't job hunt or pay bills without them. The $200/month fiber plan and unlimited international calling? Those are wants. Count the base plan as a need, the upgrades as wants.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">Debt Payments</h4>
              <p className="text-xs text-muted-foreground">
                Minimum payments are needs – you have to make them. Extra payments toward principal are savings (you're building net worth). This is why the 50/30/20 rule groups "savings and debt" together – both build your financial future.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>50/30/20 Budget Examples</CardTitle>
          <CardDescription>By income level</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Monthly Income</TableHead>
                <TableHead>Needs (50%)</TableHead>
                <TableHead>Wants (30%)</TableHead>
                <TableHead>Savings (20%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">$3,000</TableCell>
                <TableCell className="font-mono text-xs">$1,500</TableCell>
                <TableCell className="font-mono text-xs">$900</TableCell>
                <TableCell className="font-mono text-xs">$600</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">$4,000</TableCell>
                <TableCell className="font-mono text-xs">$2,000</TableCell>
                <TableCell className="font-mono text-xs">$1,200</TableCell>
                <TableCell className="font-mono text-xs">$800</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">$5,000</TableCell>
                <TableCell className="font-mono text-xs">$2,500</TableCell>
                <TableCell className="font-mono text-xs">$1,500</TableCell>
                <TableCell className="font-mono text-xs">$1,000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">$7,500</TableCell>
                <TableCell className="font-mono text-xs">$3,750</TableCell>
                <TableCell className="font-mono text-xs">$2,250</TableCell>
                <TableCell className="font-mono text-xs">$1,500</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">$10,000</TableCell>
                <TableCell className="font-mono text-xs">$5,000</TableCell>
                <TableCell className="font-mono text-xs">$3,000</TableCell>
                <TableCell className="font-mono text-xs">$2,000</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What If 50% Isn't Enough for Needs?</CardTitle>
          <CardDescription>Adjusting the rule for real life</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            If your needs exceed 50% – common in expensive cities or on lower incomes – you have three options: increase income, reduce needs costs, or adjust the ratios.
          </p>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">1</div>
              <div>
                <p className="font-medium text-sm">Try 60/20/20 or 55/25/20</p>
                <p className="text-xs text-muted-foreground">If rent alone is 40% of your income, a strict 50% needs budget is impossible. Shift the ratio: 60% needs, 20% wants, 20% savings still builds wealth. The savings percentage is the non-negotiable part.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">2</div>
              <div>
                <p className="font-medium text-sm">Audit your "needs"</p>
                <p className="text-xs text-muted-foreground">People routinely miscategorize wants as needs. That $150 cable bill? Streaming costs $15. That $600 car payment on a luxury vehicle? A reliable used car costs $250/month. Be honest about what's truly necessary.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">3</div>
              <div>
                <p className="font-medium text-sm">Focus on the 20% savings minimum</p>
                <p className="text-xs text-muted-foreground">If you can only hit two targets, make it savings and needs. Wants can shrink to 10% temporarily. The goal is building the habit of saving 20% – even if needs are 55% and wants are 25%, you're still winning.</p>
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
            <h4 className="font-semibold text-sm mb-2">Should I use gross or net income for the 50/30/20 rule?</h4>
            <p className="text-xs text-muted-foreground">
              Always use after-tax (net) income – what actually hits your bank account. The 50/30/20 rule is about allocating spendable money. If you make $5,000 gross but take home $3,800, budget based on $3,800. Taxes aren't part of your budget – they're already gone.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Does the 50/30/20 rule work for high earners?</h4>
            <p className="text-xs text-muted-foreground">
              It works, but high earners often don't need 50% for needs. Someone making $20,000/month might only need $6,000 (30%) for living expenses. In that case, keep needs at actual cost, maintain 20% savings minimum, and let wants expand – or better yet, increase savings to 30-40%.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if I have high-interest debt?</h4>
            <p className="text-xs text-muted-foreground">
              Aggressive debt payoff counts as savings in the 50/30/20 framework. If you're crushing credit card debt, you might do 50/10/40 temporarily – 40% to debt is still "savings" because you're building net worth. Once high-interest debt is gone, redirect that 40% to investments.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I track if I'm following the 50/30/20 rule?</h4>
            <p className="text-xs text-muted-foreground">
              Review your bank statements monthly. Categorize each transaction as need, want, or savings. Add them up and calculate percentages. Most budgeting apps (Mint, YNAB, Personal Capital) do this automatically. If needs are at 55%, find $200-300 to cut or shift from wants.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Is the 50/30/20 rule better than zero-based budgeting?</h4>
            <p className="text-xs text-muted-foreground">
              Depends on your personality. 50/30/20 is simpler and more flexible – good for people who hate detailed tracking. Zero-based budgeting (every dollar assigned a job) gives more control but requires more work. Try 50/30/20 first. If you need more structure, graduate to zero-based.
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
            <a href="/calculators/monthly-budget-breakdown-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Monthly Budget Breakdown</p>
              <p className="text-xs text-muted-foreground">Detailed budget planning</p>
            </a>
            <a href="/calculators/emergency-fund-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Emergency Fund Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate your safety net</p>
            </a>
            <a href="/calculators/debt-payoff-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Debt Payoff Calculator</p>
              <p className="text-xs text-muted-foreground">Plan your debt-free journey</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
