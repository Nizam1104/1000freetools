"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
      </div>
    </div>
  );
}
