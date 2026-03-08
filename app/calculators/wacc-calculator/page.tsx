"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
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

        {/* How It Works Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-6">How to Calculate WACC</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-semibold mb-2">Enter Capital Structure</h3>
                <p className="text-sm text-muted-foreground">Input the market value of equity and debt to determine your company&apos;s capital mix.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-semibold mb-2">Input Cost Rates</h3>
                <p className="text-sm text-muted-foreground">Enter cost of equity, cost of debt, and corporate tax rate for accurate calculation.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-semibold mb-2">Get WACC Results</h3>
                <p className="text-sm text-muted-foreground">Click calculate to see your weighted average cost of capital with detailed breakdown.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Key Features of This WACC Calculator</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">**Complete WACC Formula**</h3>
              <p className="text-sm text-muted-foreground">Uses the standard formula: WACC = (E/V × Re) + (D/V × Rd × (1-T)) for accurate results.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">**Tax Shield Calculation**</h3>
              <p className="text-sm text-muted-foreground">Automatically calculates the tax benefit of debt financing in your cost of capital.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">**Weight Breakdown**</h3>
              <p className="text-sm text-muted-foreground">Shows equity and debt weights as percentages for capital structure analysis.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">**Investment Analysis Tool**</h3>
              <p className="text-sm text-muted-foreground">Essential for NPV calculations, project evaluation, and corporate finance decisions.</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">What is WACC?</h3>
              <p className="text-sm text-muted-foreground">WACC (Weighted Average Cost of Capital) is the average rate a company expects to pay to finance its assets. It represents the minimum return a company must earn to satisfy all its investors.</p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">How is WACC calculated?</h3>
              <p className="text-sm text-muted-foreground">WACC = (E/V × Re) + (D/V × Rd × (1-T)), where E is equity value, D is debt value, V is total value, Re is cost of equity, Rd is cost of debt, and T is tax rate.</p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">Why is WACC important?</h3>
              <p className="text-sm text-muted-foreground">WACC is used as the discount rate in NPV calculations, helps evaluate investment opportunities, and serves as a hurdle rate for capital budgeting decisions.</p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">What is a good WACC?</h3>
              <p className="text-sm text-muted-foreground">A lower WACC is generally better as it means cheaper financing. Typical WACC ranges from 5-15% depending on industry risk. Compare against your industry average.</p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">How does debt affect WACC?</h3>
              <p className="text-sm text-muted-foreground">Debt is usually cheaper than equity and provides a tax shield (interest is tax-deductible). However, too much debt increases financial risk and can raise both cost of debt and equity.</p>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
      </div>
    </div>
  );
}
