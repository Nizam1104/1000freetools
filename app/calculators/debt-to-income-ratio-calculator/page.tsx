"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DebtToIncomeRatioCalculatorPage() {
  const [grossMonthlyIncome, setGrossMonthlyIncome] = useState<string>("");
  const [monthlyDebtPayments, setMonthlyDebtPayments] = useState<string>("");
  const [result, setResult] = useState<{
    dtiRatio: number;
    remainingIncome: number;
    status: string;
  } | null>(null);

  const calculateDTI = () => {
    const income = parseFloat(grossMonthlyIncome);
    const debt = parseFloat(monthlyDebtPayments);

    if (isNaN(income) || isNaN(debt) || income <= 0 || debt < 0) {
      return;
    }

    const dtiRatio = (debt / income) * 100;
    const remainingIncome = income - debt;

    let status = "";
    if (dtiRatio <= 20) {
      status = "Excellent - Very low debt burden";
    } else if (dtiRatio <= 36) {
      status = "Good - Healthy debt level";
    } else if (dtiRatio <= 43) {
      status = "Fair - Approaching high debt level";
    } else {
      status = "High - Consider reducing debt";
    }

    setResult({ dtiRatio, remainingIncome, status });
  };

  const reset = () => {
    setGrossMonthlyIncome("");
    setMonthlyDebtPayments("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Debt-to-Income Ratio Calculator</h1>
          <p className="text-muted-foreground">
            Assess your borrowing capacity in seconds. Calculate the percentage of your gross monthly income consumed by debt payments to understand your financial health.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="grossMonthlyIncome">Gross Monthly Income</Label>
                <Input
                  id="grossMonthlyIncome"
                  type="number"
                  placeholder="Enter gross monthly income"
                  value={grossMonthlyIncome}
                  onChange={(e) => setGrossMonthlyIncome(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyDebtPayments">Total Monthly Debt Payments</Label>
                <Input
                  id="monthlyDebtPayments"
                  type="number"
                  placeholder="Enter total monthly debt payments"
                  value={monthlyDebtPayments}
                  onChange={(e) => setMonthlyDebtPayments(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Include: mortgage, car loans, credit cards, student loans, etc.</p>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateDTI} className="flex-1">
                  Calculate DTI
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
                  <div className={`p-4 rounded-lg ${
                    result.dtiRatio <= 36 ? 'bg-green-100 dark:bg-green-900/20' :
                    result.dtiRatio <= 43 ? 'bg-yellow-100 dark:bg-yellow-900/20' :
                    'bg-red-100 dark:bg-red-900/20'
                  }`}>
                    <p className="text-sm text-muted-foreground">Debt-to-Income Ratio</p>
                    <p className={`text-3xl font-bold ${
                      result.dtiRatio <= 36 ? 'text-green-600' :
                      result.dtiRatio <= 43 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {result.dtiRatio.toFixed(2)}%
                    </p>
                    <p className="text-sm mt-1">{result.status}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Remaining Income After Debt</p>
                    <p className="text-xl font-bold">${result.remainingIncome.toFixed(2)}</p>
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
