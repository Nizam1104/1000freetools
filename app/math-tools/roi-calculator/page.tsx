"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ROICalculator() {
  const [cost, setCost] = useState("");
  const [returnAmount, setReturnAmount] = useState("");
  const [result, setResult] = useState<{
    roi: number;
    netProfit: number;
    isProfit: boolean;
  } | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    const costBasis = parseFloat(cost);
    const returnValue = parseFloat(returnAmount);

    if (isNaN(costBasis) || isNaN(returnValue)) {
      setError("Please enter valid numbers for both fields");
      setResult(null);
      return;
    }

    if (costBasis <= 0) {
      setError("Cost must be greater than 0");
      setResult(null);
      return;
    }

    const netProfit = returnValue - costBasis;
    const roi = (netProfit / costBasis) * 100;

    setResult({
      roi: Math.round(roi * 100) / 100,
      netProfit: Math.round(netProfit * 100) / 100,
      isProfit: netProfit >= 0,
    });
    setError("");
  };

  const reset = () => {
    setCost("");
    setReturnAmount("");
    setResult(null);
    setError("");
  };

  const loadExample = () => {
    setCost("10000");
    setReturnAmount("12500");
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">ROI Calculator – Calculate Return on Investment Online</h1>
        <p className="text-muted-foreground">
          Calculate your Return on Investment (ROI) quickly with our free online ROI calculator. Enter cost and return values to get the ROI percentage and net profit instantly.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Cost of Investment</Label>
            <Input
              type="number"
              placeholder="e.g., 10000"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </div>
          <div>
            <Label>Return from Investment</Label>
            <Input
              type="number"
              placeholder="e.g., 12500"
              value={returnAmount}
              onChange={(e) => setReturnAmount(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate ROI</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={loadExample}>Load Example</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className={`p-6 rounded-lg text-center ${result.isProfit ? 'bg-primary text-primary-foreground' : 'bg-destructive text-destructive-foreground'}`}>
                <p className="text-sm opacity-80 mb-2">ROI</p>
                <p className="text-4xl font-bold">{result.roi > 0 ? "+" : ""}{result.roi}%</p>
              </div>
              <div className="p-6 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Net Profit/Loss</p>
                <p className={`text-3xl font-bold ${result.isProfit ? 'text-green-600' : 'text-destructive'}`}>
                  {result.netProfit > 0 ? "+" : ""}${Math.abs(result.netProfit).toLocaleString()}
                </p>
              </div>
              <div className="p-6 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Return Multiple</p>
                <p className="text-3xl font-bold">{(parseFloat(returnAmount) / parseFloat(cost)).toFixed(2)}x</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Formula & Calculation</h4>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                ROI = ((Return - Cost) / Cost) × 100<br />
                ROI = ((${returnAmount} - ${cost}) / ${cost}) × 100<br />
                ROI = (${result.netProfit} / ${cost}) × 100 = {result.roi}%
              </code>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Investment Summary</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Initial Investment:</span>
                  <span className="font-semibold ml-2">${parseFloat(cost).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Final Value:</span>
                  <span className="font-semibold ml-2">${parseFloat(returnAmount).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Gain/Loss:</span>
                  <span className={`font-semibold ml-2 ${result.isProfit ? 'text-green-600' : 'text-destructive'}`}>
                    {result.netProfit > 0 ? "+" : ""}${result.netProfit.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Performance:</span>
                  <span className={`font-semibold ml-2 ${result.isProfit ? 'text-green-600' : 'text-destructive'}`}>
                    {result.isProfit ? 'Profit' : 'Loss'} of {Math.abs(result.roi)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">What is ROI?</h2>
        <p className="text-muted-foreground">
          Return on Investment (ROI) is a performance measure used to evaluate the efficiency or profitability of an investment. ROI compares the gain or loss from an investment relative to its cost, expressed as a percentage.
        </p>
        <p className="text-muted-foreground">
          ROI is one of the most widely used financial metrics because it's simple to calculate and easy to understand. It helps investors compare different investment opportunities and make informed decisions.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">ROI Formula</h2>
        <div className="p-4 border rounded-lg">
          <code className="text-lg font-mono bg-muted px-3 py-2 rounded block">
            ROI = ((Return - Cost) / Cost) × 100
          </code>
          <div className="mt-4 grid md:grid-cols-3 gap-4">
            <div className="p-3 bg-muted rounded">
              <p className="font-semibold text-sm">Positive ROI</p>
              <p className="text-xs text-muted-foreground">Investment gained value (profit)</p>
            </div>
            <div className="p-3 bg-muted rounded">
              <p className="font-semibold text-sm">Negative ROI</p>
              <p className="text-xs text-muted-foreground">Investment lost value (loss)</p>
            </div>
            <div className="p-3 bg-muted rounded">
              <p className="font-semibold text-sm">Zero ROI</p>
              <p className="text-xs text-muted-foreground">Break-even (no gain or loss)</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">ROI Examples</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Stock Investment</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Bought shares for $5,000, sold for $6,500
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              ROI = ((6500 - 5000) / 5000) × 100 = +30%<br />
              Profit: $1,500
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Real Estate</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Property purchased for $200,000, sold for $180,000
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              ROI = ((180000 - 200000) / 200000) × 100 = -10%<br />
              Loss: $20,000
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Business Investment</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Invested $50,000 in equipment, generated $75,000 in additional revenue
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              ROI = ((75000 - 50000) / 50000) × 100 = +50%<br />
              Profit: $25,000
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Understanding ROI Values</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Good ROI Benchmarks</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Stock market: 7-10% annually (long-term average)</li>
              <li>• Real estate: 8-12% annually</li>
              <li>• Business projects: 15%+ often expected</li>
              <li>• Savings accounts: 0.5-2% (low risk)</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">ROI Limitations</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Doesn't account for time period</li>
              <li>• Ignores risk factors</li>
              <li>• Doesn't include opportunity cost</li>
              <li>• May not reflect cash flow timing</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">ROI vs Other Metrics</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Metric</th>
                <th className="text-left p-3">Formula</th>
                <th className="text-left p-3">Best For</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3 font-semibold">ROI</td>
                <td className="p-3 font-mono text-xs">(Return-Cost)/Cost</td>
                <td className="p-3">Simple investment comparison</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-semibold">ROE</td>
                <td className="p-3 font-mono text-xs">Net Income/Equity</td>
                <td className="p-3">Company profitability</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-semibold">IRR</td>
                <td className="p-3 font-mono text-xs">Discount rate for NPV=0</td>
                <td className="p-3">Time-value of money</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Payback Period</td>
                <td className="p-3 font-mono text-xs">Investment/Annual Cash Flow</td>
                <td className="p-3">Recovery time analysis</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What is a good ROI percentage?</h3>
            <p className="text-sm text-muted-foreground">
              A "good" ROI depends on the investment type and risk. Generally, 10%+ annually is considered good for stocks, while 15-20%+ is often expected for business investments.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Can ROI be negative?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, a negative ROI means the investment lost money. This happens when the return is less than the original cost.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Does ROI include time?</h3>
            <p className="text-sm text-muted-foreground">
              Basic ROI doesn't account for time. A 20% ROI over 1 year is better than 20% over 5 years. For time-adjusted returns, use Annualized ROI or IRR.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How do I calculate annualized ROI?</h3>
            <p className="text-sm text-muted-foreground">
              Annualized ROI = ((1 + ROI)^(1/n) - 1) × 100, where n is the number of years. This adjusts for the time period of the investment.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/profit-loss-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Profit & Loss</p>
            <p className="text-xs text-muted-foreground">Calculate P&L percentage</p>
          </a>
          <a href="/math-tools/compound-interest-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Compound Interest</p>
            <p className="text-xs text-muted-foreground">Investment growth</p>
          </a>
          <a href="/math-tools/percentage-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Percentage Calculator</p>
            <p className="text-xs text-muted-foreground">Percentage calculations</p>
          </a>
        </div>
      </section>
    </div>
  );
}
