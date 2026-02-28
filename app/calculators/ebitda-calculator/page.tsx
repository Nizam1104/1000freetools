"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EBITDACalculatorPage() {
  const [netIncome, setNetIncome] = useState<string>("");
  const [interest, setInterest] = useState<string>("");
  const [taxes, setTaxes] = useState<string>("");
  const [depreciation, setDepreciation] = useState<string>("");
  const [amortization, setAmortization] = useState<string>("");
  const [revenue, setRevenue] = useState<string>("");
  const [result, setResult] = useState<{
    ebitda: number;
    ebitdaMargin: number;
    ebit: number;
  } | null>(null);

  const calculateEBITDA = () => {
    const netInc = parseFloat(netIncome);
    const interestExp = parseFloat(interest) || 0;
    const taxExp = parseFloat(taxes) || 0;
    const deprec = parseFloat(depreciation) || 0;
    const amort = parseFloat(amortization) || 0;
    const rev = parseFloat(revenue) || 0;

    if (isNaN(netInc)) {
      return;
    }

    const ebitda = netInc + interestExp + taxExp + deprec + amort;
    const ebit = netInc + interestExp + taxExp;
    const ebitdaMargin = rev > 0 ? (ebitda / rev) * 100 : 0;

    setResult({
      ebitda,
      ebitdaMargin,
      ebit,
    });
  };

  const reset = () => {
    setNetIncome("");
    setInterest("");
    setTaxes("");
    setDepreciation("");
    setAmortization("");
    setRevenue("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">EBITDA Calculator</h1>
          <p className="text-muted-foreground">
            Calculate Earnings Before Interest, Taxes, Depreciation, and Amortization from net income or operating profit figures to assess core business performance.
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
                  placeholder="Enter revenue"
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="netIncome">Net Income</Label>
                <Input
                  id="netIncome"
                  type="number"
                  placeholder="Enter net income"
                  value={netIncome}
                  onChange={(e) => setNetIncome(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interest">Interest Expense</Label>
                <Input
                  id="interest"
                  type="number"
                  placeholder="Enter interest"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxes">Taxes</Label>
                <Input
                  id="taxes"
                  type="number"
                  placeholder="Enter taxes"
                  value={taxes}
                  onChange={(e) => setTaxes(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="depreciation">Depreciation</Label>
                <Input
                  id="depreciation"
                  type="number"
                  placeholder="Enter depreciation"
                  value={depreciation}
                  onChange={(e) => setDepreciation(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amortization">Amortization</Label>
                <Input
                  id="amortization"
                  type="number"
                  placeholder="Enter amortization"
                  value={amortization}
                  onChange={(e) => setAmortization(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateEBITDA} className="flex-1">
                  Calculate EBITDA
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
                    <p className="text-sm text-muted-foreground">EBITDA</p>
                    <p className="text-3xl font-bold text-primary">${result.ebitda.toLocaleString()}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">EBIT</p>
                      <p className="text-lg font-bold">${result.ebit.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">EBITDA Margin</p>
                      <p className="text-lg font-bold">{result.ebitdaMargin.toFixed(2)}%</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>EBITDA = Net Income + Interest + Taxes + Depreciation + Amortization</p>
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
