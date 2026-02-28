"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NPVCalculatorPage() {
  const [initialInvestment, setInitialInvestment] = useState<string>("");
  const [discountRate, setDiscountRate] = useState<string>("");
  const [cashFlows, setCashFlows] = useState<string>("");
  const [result, setResult] = useState<{
    npv: number;
    totalCashFlows: number;
    presentValueOfCashFlows: number;
  } | null>(null);

  const calculateNPV = () => {
    const initial = parseFloat(initialInvestment);
    const rate = parseFloat(discountRate) / 100;
    const flows = cashFlows.split(",").map((cf) => parseFloat(cf.trim())).filter((cf) => !isNaN(cf));

    if (isNaN(initial) || isNaN(rate) || flows.length === 0 || initial <= 0 || rate < 0) {
      return;
    }

    let pvOfCashFlows = 0;
    flows.forEach((cf, index) => {
      pvOfCashFlows += cf / Math.pow(1 + rate, index + 1);
    });

    const npv = pvOfCashFlows - initial;
    const totalCashFlows = flows.reduce((sum, cf) => sum + cf, 0);

    setResult({ npv, totalCashFlows, presentValueOfCashFlows: pvOfCashFlows });
  };

  const reset = () => {
    setInitialInvestment("");
    setDiscountRate("");
    setCashFlows("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">NPV Calculator – Net Present Value</h1>
          <p className="text-muted-foreground">
            Evaluate the viability of an investment by calculating its Net Present Value. Discount all future cash flows at your required rate of return to make smarter decisions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="initialInvestment">Initial Investment</Label>
                <Input
                  id="initialInvestment"
                  type="number"
                  placeholder="Enter initial investment amount"
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="discountRate">Discount Rate (%)</Label>
                <Input
                  id="discountRate"
                  type="number"
                  placeholder="Enter discount rate"
                  value={discountRate}
                  onChange={(e) => setDiscountRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cashFlows">Cash Flows (comma-separated)</Label>
                <Input
                  id="cashFlows"
                  type="text"
                  placeholder="e.g., 1000, 2000, 3000, 4000"
                  value={cashFlows}
                  onChange={(e) => setCashFlows(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Enter cash flows for each year, separated by commas</p>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateNPV} className="flex-1">
                  Calculate NPV
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
                  <div className={`p-4 rounded-lg ${result.npv >= 0 ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
                    <p className="text-sm text-muted-foreground">Net Present Value (NPV)</p>
                    <p className={`text-3xl font-bold ${result.npv >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${result.npv.toFixed(2)}
                    </p>
                    <p className="text-xs mt-1">
                      {result.npv >= 0 ? "Investment is viable (NPV ≥ 0)" : "Investment may not be viable (NPV < 0)"}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">PV of Cash Flows</p>
                      <p className="text-lg font-bold">${result.presentValueOfCashFlows.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Cash Flows</p>
                      <p className="text-lg font-bold">${result.totalCashFlows.toFixed(2)}</p>
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
