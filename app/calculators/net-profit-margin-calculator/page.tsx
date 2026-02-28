"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NetProfitMarginCalculatorPage() {
  const [revenue, setRevenue] = useState<string>("");
  const [netIncome, setNetIncome] = useState<string>("");
  const [result, setResult] = useState<{
    netProfitMargin: number;
    profitPerDollar: number;
  } | null>(null);

  const calculateNetProfitMargin = () => {
    const rev = parseFloat(revenue);
    const netInc = parseFloat(netIncome);

    if (isNaN(rev) || rev <= 0) {
      return;
    }

    const netProfitMargin = (netInc / rev) * 100;
    const profitPerDollar = netInc / rev;

    setResult({
      netProfitMargin,
      profitPerDollar,
    });
  };

  const reset = () => {
    setRevenue("");
    setNetIncome("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Net Profit Margin Calculator</h1>
          <p className="text-muted-foreground">
            Calculate your overall bottom-line profitability. Find net profit margin percentage from total revenue and net income after all expenses are accounted for.
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
                <Label htmlFor="netIncome">Net Income (Profit)</Label>
                <Input
                  id="netIncome"
                  type="number"
                  placeholder="Enter net income"
                  value={netIncome}
                  onChange={(e) => setNetIncome(e.target.value)}
                />
              </div>

              <div className="pt-4">
                <div className="text-sm text-muted-foreground">
                  <p>Net Profit Margin Guidelines:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>&lt; 5%: Low margin</li>
                    <li>5% - 10%: Average margin</li>
                    <li>10% - 20%: Good margin</li>
                    <li>&gt; 20%: Excellent margin</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateNetProfitMargin} className="flex-1">
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
                  <div className={`p-4 rounded-lg ${result.netProfitMargin >= 0 ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
                    <p className="text-sm text-muted-foreground">Net Profit Margin</p>
                    <p className={`text-3xl font-bold ${result.netProfitMargin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {result.netProfitMargin.toFixed(2)}%
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Profit per Dollar of Revenue</p>
                    <p className="text-lg font-bold">${result.profitPerDollar.toFixed(2)}</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Net Profit Margin = Net Income / Revenue × 100</p>
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
