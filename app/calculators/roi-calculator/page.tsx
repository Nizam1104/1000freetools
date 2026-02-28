"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ROICalculatorPage() {
  const [initialCost, setInitialCost] = useState<string>("");
  const [finalValue, setFinalValue] = useState<string>("");
  const [result, setResult] = useState<{
    roi: number;
    netProfit: number;
  } | null>(null);

  const calculateROI = () => {
    const cost = parseFloat(initialCost);
    const value = parseFloat(finalValue);

    if (isNaN(cost) || isNaN(value) || cost <= 0) {
      return;
    }

    const netProfit = value - cost;
    const roi = (netProfit / cost) * 100;

    setResult({ roi, netProfit });
  };

  const reset = () => {
    setInitialCost("");
    setFinalValue("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">ROI Calculator – Return on Investment</h1>
          <p className="text-muted-foreground">
            Quickly measure the profitability of any investment. Calculate Return on Investment as a percentage using your initial cost and final value or net profit.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="initialCost">Initial Cost / Investment</Label>
                <Input
                  id="initialCost"
                  type="number"
                  placeholder="Enter initial cost"
                  value={initialCost}
                  onChange={(e) => setInitialCost(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="finalValue">Final Value / Return</Label>
                <Input
                  id="finalValue"
                  type="number"
                  placeholder="Enter final value"
                  value={finalValue}
                  onChange={(e) => setFinalValue(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateROI} className="flex-1">
                  Calculate ROI
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
                  <div className={`p-4 rounded-lg ${result.roi >= 0 ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
                    <p className="text-sm text-muted-foreground">Return on Investment (ROI)</p>
                    <p className={`text-3xl font-bold ${result.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {result.roi >= 0 ? '+' : ''}{result.roi.toFixed(2)}%
                    </p>
                  </div>
                  <div className={`p-4 rounded-lg ${result.netProfit >= 0 ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
                    <p className="text-sm text-muted-foreground">Net Profit / Loss</p>
                    <p className={`text-xl font-bold ${result.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {result.netProfit >= 0 ? '+' : ''}${result.netProfit.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Formula: ROI = ((Final Value - Initial Cost) / Initial Cost) × 100</p>
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
