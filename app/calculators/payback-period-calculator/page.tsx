"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PaybackPeriodCalculatorPage() {
  const [initialInvestment, setInitialInvestment] = useState<string>("");
  const [cashFlows, setCashFlows] = useState<string>("");
  const [result, setResult] = useState<{
    paybackYears: number;
    paybackMonths: number;
    totalCashFlows: number;
  } | null>(null);

  const calculatePaybackPeriod = () => {
    const initial = parseFloat(initialInvestment);
    const flows = cashFlows.split(",").map((cf) => parseFloat(cf.trim())).filter((cf) => !isNaN(cf));

    if (isNaN(initial) || flows.length === 0 || initial <= 0) {
      return;
    }

    let cumulativeCashFlow = 0;
    let fullYears = 0;

    for (let i = 0; i < flows.length; i++) {
      cumulativeCashFlow += flows[i];
      if (cumulativeCashFlow >= initial) {
        const previousCumulative = cumulativeCashFlow - flows[i];
        const remainingAmount = initial - previousCumulative;
        const fractionOfYear = remainingAmount / flows[i];
        const totalYears = fullYears + fractionOfYear;

        setResult({
          paybackYears: totalYears,
          paybackMonths: Math.round(fractionOfYear * 12),
          totalCashFlows: cumulativeCashFlow,
        });
        return;
      }
      fullYears++;
    }

    setResult({
      paybackYears: flows.length + (initial - cumulativeCashFlow) / (flows[flows.length - 1] || 1),
      paybackMonths: 0,
      totalCashFlows: cumulativeCashFlow,
    });
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
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Payback Period Calculator</h1>
          <p className="text-muted-foreground">
            Determine how quickly an investment pays for itself. Calculate the number of years or months needed to recover the initial cost from generated cash flows.
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
                <Label htmlFor="cashFlows">Annual Cash Flows (comma-separated)</Label>
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
                <Button onClick={calculatePaybackPeriod} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Payback Period</p>
                    <p className="text-2xl font-bold text-primary">
                      {result.paybackYears >= 1 ? `${result.paybackYears.toFixed(2)} years` : `${result.paybackMonths} months`}
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Cash Flows Recovered</p>
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
