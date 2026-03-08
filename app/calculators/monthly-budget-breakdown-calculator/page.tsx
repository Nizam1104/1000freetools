"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function MonthlyBudgetBreakdownCalculatorPage() {
  const [monthlyIncome, setMonthlyIncome] = useState<string>("");
  const [housing, setHousing] = useState<string>("");
  const [food, setFood] = useState<string>("");
  const [transportation, setTransportation] = useState<string>("");
  const [utilities, setUtilities] = useState<string>("");
  const [insurance, setInsurance] = useState<string>("");
  const [debt, setDebt] = useState<string>("");
  const [entertainment, setEntertainment] = useState<string>("");
  const [savings, setSavings] = useState<string>("");
  const [other, setOther] = useState<string>("");
  const [result, setResult] = useState<{
    totalExpenses: number;
    surplus: number;
    categories: Array<{ name: string; amount: number; percent: number }>;
  } | null>(null);

  const calculateBudget = () => {
    const income = parseFloat(monthlyIncome);
    const expenses = {
      housing: parseFloat(housing) || 0,
      food: parseFloat(food) || 0,
      transportation: parseFloat(transportation) || 0,
      utilities: parseFloat(utilities) || 0,
      insurance: parseFloat(insurance) || 0,
      debt: parseFloat(debt) || 0,
      entertainment: parseFloat(entertainment) || 0,
      savings: parseFloat(savings) || 0,
      other: parseFloat(other) || 0,
    };

    if (isNaN(income) || income <= 0) {
      return;
    }

    const totalExpenses = Object.values(expenses).reduce((a, b) => a + b, 0);
    const surplus = income - totalExpenses;

    const categories = Object.entries(expenses).map(([name, amount]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      amount,
      percent: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
    }));

    setResult({ totalExpenses, surplus, categories });
  };

  const reset = () => {
    setMonthlyIncome("");
    setHousing("");
    setFood("");
    setTransportation("");
    setUtilities("");
    setInsurance("");
    setDebt("");
    setEntertainment("");
    setSavings("");
    setOther("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Monthly Budget Breakdown Calculator</h1>
          <p className="text-muted-foreground">
            Get a clear picture of your monthly finances. Input your income and expense categories to generate a full budget breakdown with surplus, deficit, and spending percentages.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-3">
              <div className="space-y-2">
                <Label htmlFor="monthlyIncome" className="text-primary">Monthly Income</Label>
                <Input
                  id="monthlyIncome"
                  type="number"
                  placeholder="Enter total income"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                />
              </div>

              <div className="pt-2">
                <Label className="text-sm font-semibold">Expenses</Label>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Input id="housing" type="number" placeholder="Housing" value={housing} onChange={(e) => setHousing(e.target.value)} />
                <Input id="food" type="number" placeholder="Food" value={food} onChange={(e) => setFood(e.target.value)} />
                <Input id="transportation" type="number" placeholder="Transport" value={transportation} onChange={(e) => setTransportation(e.target.value)} />
                <Input id="utilities" type="number" placeholder="Utilities" value={utilities} onChange={(e) => setUtilities(e.target.value)} />
                <Input id="insurance" type="number" placeholder="Insurance" value={insurance} onChange={(e) => setInsurance(e.target.value)} />
                <Input id="debt" type="number" placeholder="Debt" value={debt} onChange={(e) => setDebt(e.target.value)} />
                <Input id="entertainment" type="number" placeholder="Entertainment" value={entertainment} onChange={(e) => setEntertainment(e.target.value)} />
                <Input id="savings" type="number" placeholder="Savings" value={savings} onChange={(e) => setSavings(e.target.value)} />
              </div>
              <Input id="other" type="number" placeholder="Other expenses" value={other} onChange={(e) => setOther(e.target.value)} />

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateBudget} className="flex-1">
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
              <h3 className="text-lg font-semibold mb-4">Budget Breakdown</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${result.surplus >= 0 ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
                    <p className="text-sm text-muted-foreground">{result.surplus >= 0 ? 'Monthly Surplus' : 'Monthly Deficit'}</p>
                    <p className={`text-3xl font-bold ${result.surplus >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${result.surplus.toFixed(2)}
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Expenses</p>
                    <p className="text-xl font-bold">${result.totalExpenses.toFixed(2)}</p>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-semibold mb-2">Expense Breakdown</h4>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {result.categories.filter(c => c.amount > 0).map((cat) => (
                        <div key={cat.name} className="flex justify-between items-center text-sm">
                          <span>{cat.name}</span>
                          <div className="text-right">
                            <span className="font-medium">${cat.amount.toFixed(2)}</span>
                            <span className="text-muted-foreground ml-2">({cat.percent.toFixed(1)}%)</span>
                          </div>
                        </div>
                      ))}
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

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Budget Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter your monthly income</p>
                    <p>Include all sources: salary, freelance, investments, side hustles. Use after-tax (take-home) amounts.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Fill in your expense categories</p>
                    <p>Enter amounts for housing, food, transportation, utilities, and other categories. Leave blank if not applicable.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Review your budget breakdown</p>
                    <p>See your surplus or deficit, plus what percentage each category represents of total spending.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Recommended Budget Percentages (50/30/20 Rule)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Category</th>
                      <th className="text-left py-3 px-2 font-semibold">Recommended %</th>
                      <th className="text-left py-3 px-2 font-semibold">Includes</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2"><strong>Needs (50%)</strong></td>
                      <td className="py-3 px-2">50%</td>
                      <td className="py-3 px-2">Rent, groceries, utilities, insurance, minimum debt payments</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Housing</td>
                      <td className="py-3 px-2">25-35%</td>
                      <td className="py-3 px-2">Rent/mortgage, property tax, home insurance</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Food</td>
                      <td className="py-3 px-2">10-15%</td>
                      <td className="py-3 px-2">Groceries, essential meals</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2"><strong>Wants (30%)</strong></td>
                      <td className="py-3 px-2">30%</td>
                      <td className="py-3 px-2">Dining out, entertainment, hobbies, subscriptions</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2"><strong>Savings/Debt (20%)</strong></td>
                      <td className="py-3 px-2">20%</td>
                      <td className="py-3 px-2">Emergency fund, retirement, extra debt payments</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: The 50/30/20 rule is a guideline, not a strict rule. Adjust based on your income level and goals. High-cost areas may require 60%+ for needs.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Your Budget Breakdown
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Surplus vs Deficit</h4>
                  <p>
                    Surplus means you're spending less than you earn—this money should go to savings or debt payoff. Deficit means you're spending more than you earn, which leads to debt. If you're in deficit, look for categories to cut.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why Percentages Matter</h4>
                  <p>
                    Percentages help you compare your spending to recommendations regardless of income. If housing is 45% of your budget but recommended is 30%, that's a red flag even if you can technically afford it.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">The Hidden Category: Irregular Expenses</h4>
                  <p>
                    Car repairs, medical bills, holiday gifts—these don't happen monthly but they do happen. Divide annual irregular expenses by 12 and add that to your monthly budget as a "sinking fund" category.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips for Better Budget Management
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Track every dollar for a month</p>
                    <p>Before you can fix your budget, you need to know where money actually goes. Most people underestimate spending by 20-30%.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Pay yourself first</p>
                    <p>Automate savings transfers on payday. If you wait to save what's left after spending, there's usually nothing left.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Review and adjust monthly</p>
                    <p>Budgets aren't set in stone. Life changes, prices change, priorities change. Review your budget monthly and adjust categories as needed.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Build a buffer</p>
                    <p>Aim for one month's expenses in checking as a buffer. This prevents overdrafts when timing is off and reduces money stress.</p>
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
                  <h4 className="font-medium text-foreground mb-2">What if my expenses exceed my income?</h4>
                  <p>
                    You have three options: increase income (side hustle, raise, second job), decrease expenses (cut subscriptions, cook at home, downsize housing), or both. Start by tracking every expense for a month—you may find surprising leaks.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How much should I save each month?</h4>
                  <p>
                    Aim for 20% of take-home pay if possible. At minimum, build a $1,000 emergency fund, then contribute enough to get any employer 401(k) match, then build 3-6 months of expenses.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Should I budget every dollar or just track categories?</h4>
                  <p>
                    Both work. Zero-based budgeting (every dollar assigned a job) gives more control. Category tracking is more flexible. Try both for a month each and see which you stick with.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How do I handle irregular income?</h4>
                  <p>
                    Base your budget on your lowest expected month. In high-income months, save the surplus. Alternatively, pay yourself a fixed "salary" from a business account and smooth out the variations.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Is it normal to go over budget sometimes?</h4>
                  <p>
                    Yes. Budgets are planning tools, not straitjackets. If you overspend in one category, cover it by reducing another category that month. The goal is awareness and progress, not perfection.
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
