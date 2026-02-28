"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function WACCCalculatorPage() {
  const [marketValueEquity, setMarketValueEquity] = useState<string>("");
  const [marketValueDebt, setMarketValueDebt] = useState<string>("");
  const [costOfEquity, setCostOfEquity] = useState<string>("");
  const [costOfDebt, setCostOfDebt] = useState<string>("");
  const [taxRate, setTaxRate] = useState<string>("");
  const [result, setResult] = useState<{
    wacc: number;
    equityWeight: number;
    debtWeight: number;
    afterTaxCostOfDebt: number;
  } | null>(null);

  const calculateWACC = () => {
    const E = parseFloat(marketValueEquity);
    const D = parseFloat(marketValueDebt);
    const Re = parseFloat(costOfEquity) / 100;
    const Rd = parseFloat(costOfDebt) / 100;
    const t = parseFloat(taxRate) / 100;

    if (isNaN(E) || isNaN(D) || isNaN(Re) || isNaN(Rd) || isNaN(t) || (E + D) <= 0) {
      return;
    }

    const V = E + D;
    const equityWeight = E / V;
    const debtWeight = D / V;
    const afterTaxCostOfDebt = Rd * (1 - t);
    const wacc = equityWeight * Re + debtWeight * afterTaxCostOfDebt;

    setResult({
      wacc: wacc * 100,
      equityWeight: equityWeight * 100,
      debtWeight: debtWeight * 100,
      afterTaxCostOfDebt: afterTaxCostOfDebt * 100,
    });
  };

  const reset = () => {
    setMarketValueEquity("");
    setMarketValueDebt("");
    setCostOfEquity("");
    setCostOfDebt("");
    setTaxRate("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">WACC Calculator – Weighted Average Cost of Capital</h1>
          <p className="text-muted-foreground">
            Calculate your company's Weighted Average Cost of Capital using equity, debt, tax rate, and their proportions in the capital structure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="marketValueEquity">Market Value of Equity (E)</Label>
                <Input
                  id="marketValueEquity"
                  type="number"
                  placeholder="Enter equity value"
                  value={marketValueEquity}
                  onChange={(e) => setMarketValueEquity(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="marketValueDebt">Market Value of Debt (D)</Label>
                <Input
                  id="marketValueDebt"
                  type="number"
                  placeholder="Enter debt value"
                  value={marketValueDebt}
                  onChange={(e) => setMarketValueDebt(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="costOfEquity">Cost of Equity (%)</Label>
                <Input
                  id="costOfEquity"
                  type="number"
                  placeholder="Enter cost of equity"
                  value={costOfEquity}
                  onChange={(e) => setCostOfEquity(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="costOfDebt">Cost of Debt (%)</Label>
                <Input
                  id="costOfDebt"
                  type="number"
                  placeholder="Enter cost of debt"
                  value={costOfDebt}
                  onChange={(e) => setCostOfDebt(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxRate">Corporate Tax Rate (%)</Label>
                <Input
                  id="taxRate"
                  type="number"
                  placeholder="Enter tax rate"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateWACC} className="flex-1">
                  Calculate WACC
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
                    <p className="text-sm text-muted-foreground">WACC</p>
                    <p className="text-3xl font-bold text-primary">{result.wacc.toFixed(2)}%</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Equity Weight</p>
                      <p className="text-lg font-bold">{result.equityWeight.toFixed(1)}%</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Debt Weight</p>
                      <p className="text-lg font-bold">{result.debtWeight.toFixed(1)}%</p>
                    </div>
                  </div>
                  <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">After-Tax Cost of Debt</p>
                    <p className="text-lg font-bold text-green-600">{result.afterTaxCostOfDebt.toFixed(2)}%</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>WACC = (E/V × Re) + (D/V × Rd × (1-T))</p>
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
