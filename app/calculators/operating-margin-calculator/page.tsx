"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function OperatingMarginCalculatorPage() {
  const [revenue, setRevenue] = useState<string>("");
  const [operatingExpenses, setOperatingExpenses] = useState<string>("");
  const [costOfGoodsSold, setCostOfGoodsSold] = useState<string>("");
  const [result, setResult] = useState<{
    operatingIncome: number;
    operatingMargin: number;
    grossProfit: number;
  } | null>(null);

  const calculateOperatingMargin = () => {
    const rev = parseFloat(revenue);
    const opex = parseFloat(operatingExpenses) || 0;
    const cogs = parseFloat(costOfGoodsSold) || 0;

    if (isNaN(rev) || rev <= 0) {
      return;
    }

    const grossProfit = rev - cogs;
    const operatingIncome = grossProfit - opex;
    const operatingMargin = (operatingIncome / rev) * 100;

    setResult({
      operatingIncome,
      operatingMargin,
      grossProfit,
    });
  };

  const reset = () => {
    setRevenue("");
    setOperatingExpenses("");
    setCostOfGoodsSold("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Operating Margin Calculator</h1>
          <p className="text-muted-foreground">
            Measure your business's core profitability. Calculate operating profit margin percentage from revenue and operating expenses, before interest and taxes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="revenue">Total Revenue</Label>
                <Input
                  id="revenue"
                  type="number"
                  placeholder="Enter total revenue"
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="costOfGoodsSold">Cost of Goods Sold (COGS)</Label>
                <Input
                  id="costOfGoodsSold"
                  type="number"
                  placeholder="Enter COGS"
                  value={costOfGoodsSold}
                  onChange={(e) => setCostOfGoodsSold(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="operatingExpenses">Operating Expenses</Label>
                <Input
                  id="operatingExpenses"
                  type="number"
                  placeholder="Enter operating expenses"
                  value={operatingExpenses}
                  onChange={(e) => setOperatingExpenses(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateOperatingMargin} className="flex-1">
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
                  <div className={`p-4 rounded-lg ${result.operatingMargin >= 0 ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
                    <p className="text-sm text-muted-foreground">Operating Margin</p>
                    <p className={`text-3xl font-bold ${result.operatingMargin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {result.operatingMargin.toFixed(2)}%
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Operating Income</p>
                      <p className="text-lg font-bold">${result.operatingIncome.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Gross Profit</p>
                      <p className="text-lg font-bold">${result.grossProfit.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Operating Margin = Operating Income / Revenue × 100</p>
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
