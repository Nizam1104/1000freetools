"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function MarginCalculatorPage() {
  const [revenue, setRevenue] = useState<string>("");
  const [costOfGoodsSold, setCostOfGoodsSold] = useState<string>("");
  const [result, setResult] = useState<{
    grossProfit: number;
    grossMargin: number;
  } | null>(null);

  const calculateMargin = () => {
    const rev = parseFloat(revenue);
    const cogs = parseFloat(costOfGoodsSold);

    if (isNaN(rev) || isNaN(cogs) || rev <= 0 || cogs < 0) {
      return;
    }

    const grossProfit = rev - cogs;
    const grossMargin = (grossProfit / rev) * 100;

    setResult({ grossProfit, grossMargin });
  };

  const reset = () => {
    setRevenue("");
    setCostOfGoodsSold("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Profit Margin Calculator</h1>
          <p className="text-muted-foreground">
            Calculate your gross profit margin percentage from revenue and cost, or find the selling price needed to hit a target margin. Built for businesses and freelancers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="revenue">Revenue / Selling Price</Label>
                <Input
                  id="revenue"
                  type="number"
                  placeholder="Enter revenue or selling price"
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="costOfGoodsSold">Cost of Goods Sold</Label>
                <Input
                  id="costOfGoodsSold"
                  type="number"
                  placeholder="Enter cost of goods sold"
                  value={costOfGoodsSold}
                  onChange={(e) => setCostOfGoodsSold(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateMargin} className="flex-1">
                  Calculate Margin
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
                    <p className="text-sm text-muted-foreground">Gross Profit Margin</p>
                    <p className="text-3xl font-bold text-primary">{result.grossMargin.toFixed(2)}%</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Gross Profit</p>
                    <p className="text-xl font-bold">${result.grossProfit.toFixed(2)}</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Revenue: ${parseFloat(revenue).toFixed(2)} | COGS: ${parseFloat(costOfGoodsSold).toFixed(2)}</p>
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
