"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
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

        {/* SEO Content Section */}
        <div className="mt-12 space-y-12">
          {/* How It Works */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">How to Calculate Cost of Capital</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-semibold mb-2">Enter Market Data</h3>
                  <p className="text-muted-foreground text-sm">Input risk-free rate, market return expectation, and your stock's beta coefficient.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-semibold mb-2">Add Debt Information</h3>
                  <p className="text-muted-foreground text-sm">Enter your company's debt interest rate and corporate tax rate for after-tax calculations.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-semibold mb-2">Get Cost Analysis</h3>
                  <p className="text-muted-foreground text-sm">See cost of equity (CAPM), cost of debt, and after-tax cost of debt for investment decisions.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Features & Benefits */}
          <section className="bg-card rounded-lg border p-6">
            <h2 className="text-2xl font-semibold mb-6">Why Calculate Cost of Capital?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">📊 Investment Decision Making</h3>
                <p className="text-muted-foreground text-sm">Compare project returns against cost of capital to determine if investments create shareholder value.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">💰 CAPM Formula Applied</h3>
                <p className="text-muted-foreground text-sm">Uses the Capital Asset Pricing Model to calculate cost of equity based on systematic risk (beta).</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">🏦 Debt Tax Shield</h3>
                <p className="text-muted-foreground text-sm">Calculates after-tax cost of debt, showing the tax advantage of debt financing.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">📈 WACC Foundation</h3>
                <p className="text-muted-foreground text-sm">Provides the component costs needed to calculate Weighted Average Cost of Capital (WACC).</p>
              </div>
            </div>
          </section>

          {/* Reference Table */}
          <section className="bg-card rounded-lg border p-6">
            <h2 className="text-2xl font-semibold mb-6">Cost of Capital Components Reference</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Component</th>
                    <th className="text-left py-3 px-4">Formula</th>
                    <th className="text-left py-3 px-4">Typical Range</th>
                    <th className="text-left py-3 px-4">Use Case</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Risk-Free Rate</td>
                    <td className="py-3 px-4">Treasury yield</td>
                    <td className="py-3 px-4">2-5%</td>
                    <td className="py-3 px-4">Baseline return expectation</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Cost of Equity (CAPM)</td>
                    <td className="py-3 px-4">Rf + β(Rm - Rf)</td>
                    <td className="py-3 px-4">8-15%</td>
                    <td className="py-3 px-4">Equity investment hurdle rate</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Cost of Debt</td>
                    <td className="py-3 px-4">Interest rate on debt</td>
                    <td className="py-3 px-4">4-10%</td>
                    <td className="py-3 px-4">Debt financing cost</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">After-Tax Cost of Debt</td>
                    <td className="py-3 px-4">Rd × (1 - Tax Rate)</td>
                    <td className="py-3 px-4">3-7%</td>
                    <td className="py-3 px-4">WACC calculation</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Cost of Capital FAQs</h2>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">What is the cost of capital?</h3>
                <p className="text-muted-foreground text-sm">Cost of capital is the minimum return a company must earn on investments to satisfy investors and creditors. It's the opportunity cost of using capital.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">How is cost of equity calculated using CAPM?</h3>
                <p className="text-muted-foreground text-sm">CAPM formula: Cost of Equity = Risk-Free Rate + Beta × (Market Return - Risk-Free Rate). This accounts for systematic risk via beta.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Why is after-tax cost of debt lower?</h3>
                <p className="text-muted-foreground text-sm">Interest payments are tax-deductible, creating a "tax shield." After-tax cost = Pre-tax cost × (1 - Tax Rate), reducing the effective cost.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">What is a good cost of equity?</h3>
                <p className="text-muted-foreground text-sm">Typical cost of equity ranges from 8-15% depending on risk. Higher beta (riskier stocks) have higher cost of equity expectations.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">How do I use cost of capital for investment decisions?</h3>
                <p className="text-muted-foreground text-sm">Compare project IRR to cost of capital. If IRR &gt; cost of capital, the project creates value. Use WACC as the hurdle rate for NPV calculations.</p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
        </div>
      </div>
    </div>
  );
}
