"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EmergencyFundCalculatorPage() {
  const [monthlyExpenses, setMonthlyExpenses] = useState<string>("");
  const [monthsOfCoverage, setMonthsOfCoverage] = useState<string>("");
  const [result, setResult] = useState<{
    emergencyFundSize: number;
  } | null>(null);

  const calculateEmergencyFund = () => {
    const expenses = parseFloat(monthlyExpenses);
    const months = parseFloat(monthsOfCoverage);

    if (isNaN(expenses) || isNaN(months) || expenses <= 0 || months <= 0) {
      return;
    }

    const emergencyFundSize = expenses * months;

    setResult({ emergencyFundSize });
  };

  const reset = () => {
    setMonthlyExpenses("");
    setMonthsOfCoverage("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Emergency Fund Calculator</h1>
          <p className="text-muted-foreground">
            Find out how large your emergency fund should be. Enter your monthly expenses and desired months of coverage to get your recommended safety net target.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="monthlyExpenses">Monthly Expenses</Label>
                <Input
                  id="monthlyExpenses"
                  type="number"
                  placeholder="Enter monthly expenses"
                  value={monthlyExpenses}
                  onChange={(e) => setMonthlyExpenses(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthsOfCoverage">Months of Coverage</Label>
                <Input
                  id="monthsOfCoverage"
                  type="number"
                  placeholder="Enter desired months (3-12 recommended)"
                  value={monthsOfCoverage}
                  onChange={(e) => setMonthsOfCoverage(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateEmergencyFund} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Recommended Emergency Fund</p>
                    <p className="text-3xl font-bold text-primary">${result.emergencyFundSize.toFixed(2)}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Monthly Expenses</p>
                    <p className="text-xl font-bold">${parseFloat(monthlyExpenses).toFixed(2)}</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Based on {monthsOfCoverage} months of coverage</p>
                    <p className="mt-1">Financial experts recommend 3-6 months of expenses as emergency fund</p>
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
