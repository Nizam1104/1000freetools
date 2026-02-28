"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function IRRCalculatorPage() {
  const [initialInvestment, setInitialInvestment] = useState<string>("");
  const [cashFlows, setCashFlows] = useState<string>("");
  const [result, setResult] = useState<{
    irr: number;
    totalCashFlows: number;
  } | null>(null);

  const calculateIRR = () => {
    const initial = parseFloat(initialInvestment);
    const flows = cashFlows.split(",").map((cf) => parseFloat(cf.trim())).filter((cf) => !isNaN(cf));

    if (isNaN(initial) || flows.length === 0 || initial <= 0) {
      return;
    }

    const allFlows = [-initial, ...flows];
    
    // Newton-Raphson method to find IRR
    let irr = 0.1; // Initial guess of 10%
    for (let i = 0; i < 100; i++) {
      let npv = 0;
      let derivative = 0;
      
      for (let t = 0; t < allFlows.length; t++) {
        npv += allFlows[t] / Math.pow(1 + irr, t);
        derivative -= t * allFlows[t] / Math.pow(1 + irr, t + 1);
      }
      
      const newIrr = irr - npv / derivative;
      if (Math.abs(newIrr - irr) < 0.0001) {
        irr = newIrr;
        break;
      }
      irr = newIrr;
    }

    const totalCashFlows = flows.reduce((sum, cf) => sum + cf, 0);
    setResult({ irr: irr * 100, totalCashFlows });
  };

  const reset = () => {
    setInitialInvestment("");
    setCashFlows("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">IRR Calculator – Internal Rate of Return</h1>
          <p className="text-muted-foreground">
            Find the effective annualized yield of any investment. Calculate the Internal Rate of Return from a series of cash flows to compare investment opportunities.
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
                  placeholder="Enter initial investment"
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cashFlows">Cash Flows (comma-separated)</Label>
                <Input
                  id="cashFlows"
                  type="text"
                  placeholder="e.g., 5000, 8000, 10000, 12000"
                  value={cashFlows}
                  onChange={(e) => setCashFlows(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Enter cash flows for each year, separated by commas</p>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateIRR} className="flex-1">
                  Calculate IRR
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
                  <div className={`p-4 rounded-lg ${result.irr >= 0 ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
                    <p className="text-sm text-muted-foreground">Internal Rate of Return (IRR)</p>
                    <p className={`text-3xl font-bold ${result.irr >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {result.irr.toFixed(2)}%
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Cash Flows</p>
                    <p className="text-xl font-bold">${result.totalCashFlows.toFixed(2)}</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Initial Investment: ${parseFloat(initialInvestment).toFixed(2)}</p>
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
