"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">50/30/20 Budget Rule Calculator</h1>
          <p className="text-muted-foreground">
            Apply the popular 50/30/20 budgeting rule to your income. Get recommended amounts for needs, wants, and savings based on your monthly take-home pay.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
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
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recommended Budget</h3>
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
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter your income and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
