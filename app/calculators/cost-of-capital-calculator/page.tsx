"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CostOfCapitalCalculatorPage() {
  const [riskFreeRate, setRiskFreeRate] = useState<string>("");
  const [beta, setBeta] = useState<string>("");
  const [marketReturn, setMarketReturn] = useState<string>("");
  const [debtInterestRate, setDebtInterestRate] = useState<string>("");
  const [taxRate, setTaxRate] = useState<string>("");
  const [result, setResult] = useState<{
    costOfEquity: number;
    costOfDebt: number;
    afterTaxCostOfDebt: number;
  } | null>(null);

  const calculateCostOfCapital = () => {
    const rrf = parseFloat(riskFreeRate) / 100;
    const b = parseFloat(beta);
    const rm = parseFloat(marketReturn) / 100;
    const rd = parseFloat(debtInterestRate) / 100;
    const t = parseFloat(taxRate) / 100;

    if (isNaN(rrf) || isNaN(b) || isNaN(rm) || isNaN(rd) || isNaN(t)) {
      return;
    }

    // CAPM formula for cost of equity
    const costOfEquity = rrf + b * (rm - rrf);
    const costOfDebt = rd;
    const afterTaxCostOfDebt = rd * (1 - t);

    setResult({
      costOfEquity: costOfEquity * 100,
      costOfDebt: costOfDebt * 100,
      afterTaxCostOfDebt: afterTaxCostOfDebt * 100,
    });
  };

  const reset = () => {
    setRiskFreeRate("");
    setBeta("");
    setMarketReturn("");
    setDebtInterestRate("");
    setTaxRate("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Cost of Capital Calculator</h1>
          <p className="text-muted-foreground">
            Calculate your company's cost of equity and cost of debt separately to understand the minimum return required to justify investment decisions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="riskFreeRate">Risk-Free Rate (%)</Label>
                <Input
                  id="riskFreeRate"
                  type="number"
                  placeholder="e.g., Treasury yield"
                  value={riskFreeRate}
                  onChange={(e) => setRiskFreeRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="beta">Beta (β)</Label>
                <Input
                  id="beta"
                  type="number"
                  step="0.01"
                  placeholder="Stock beta"
                  value={beta}
                  onChange={(e) => setBeta(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="marketReturn">Expected Market Return (%)</Label>
                <Input
                  id="marketReturn"
                  type="number"
                  placeholder="Market return expectation"
                  value={marketReturn}
                  onChange={(e) => setMarketReturn(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="debtInterestRate">Debt Interest Rate (%)</Label>
                <Input
                  id="debtInterestRate"
                  type="number"
                  placeholder="Interest rate on debt"
                  value={debtInterestRate}
                  onChange={(e) => setDebtInterestRate(e.target.value)}
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
                <Button onClick={calculateCostOfCapital} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Cost of Equity (CAPM)</p>
                    <p className="text-3xl font-bold text-primary">{result.costOfEquity.toFixed(2)}%</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Cost of Debt</p>
                      <p className="text-lg font-bold">{result.costOfDebt.toFixed(2)}%</p>
                    </div>
                    <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">After-Tax Cost of Debt</p>
                      <p className="text-lg font-bold text-green-600">{result.afterTaxCostOfDebt.toFixed(2)}%</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Cost of Equity = Rf + β × (Rm - Rf)</p>
                    <p>After-Tax Cost of Debt = Rd × (1 - Tax Rate)</p>
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
