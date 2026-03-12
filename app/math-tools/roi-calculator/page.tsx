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

  const loadExample = (c: string, r: string) => {
    setCost(c);
    setReturnAmount(r);
    setResult(null);
  };

  return (
    <div className="w-full mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">ROI Calculator - Calculate Return on Investment Online</h1>
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

        <div className="flex flex-wrap gap-2">
          <Button onClick={calculate}>Calculate ROI</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("10000", "12500")}>Stock gain</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("50000", "45000")}>Investment loss</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1000", "1000")}>Break even</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("250000", "325000")}>Real estate</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("5000", "8500")}>Small business</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("100000", "180000")}>Double your money</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("75000", "68000")}>Market downturn</Button>
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

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Return on Investment (ROI)</h2>
        <p className="text-muted-foreground">
          Return on Investment (ROI) is one of the most widely used financial metrics for evaluating the profitability of an investment. It tells you how much money you made (or lost) relative to what you put in, expressed as a percentage.
        </p>
        <p className="text-muted-foreground">
          ROI is universal - you can use it to compare stocks, real estate, business ventures, education, marketing campaigns, or any situation where you invest resources expecting a return. A positive ROI means profit; negative means loss.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">The ROI Formula</h3>
        <div className="p-4 bg-muted rounded-lg">
          <p className="font-mono text-center text-lg mb-3">
            ROI = ((Return - Cost) / Cost) × 100%
          </p>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>Or equivalently:</p>
            <p>ROI = (Net Profit / Cost) × 100%</p>
            <p>ROI = ((Final Value - Initial Cost) / Initial Cost) × 100%</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2 text-green-600">Positive ROI</h4>
            <p className="text-sm text-muted-foreground">Return &gt; Cost. You made money. The investment was profitable.</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2 text-gray-600">Zero ROI</h4>
            <p className="text-sm text-muted-foreground">Return = Cost. You broke even. No gain, no loss.</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2 text-red-600">Negative ROI</h4>
            <p className="text-sm text-muted-foreground">Return &lt; Cost. You lost money. The investment lost value.</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Stock Investment Gain</h4>
            <p className="text-sm text-muted-foreground mb-2">
              You bought shares for $10,000 and sold them for $12,500. What's your ROI?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Cost = $10,000</div>
              <div>Return = $12,500</div>
              <div>Net Profit = $12,500 - $10,000 = $2,500</div>
              <div>ROI = ($2,500 / $10,000) × 100 = 25%</div>
              <div className="text-green-600 font-semibold">Your investment returned 25%</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Real Estate Investment</h4>
            <p className="text-sm text-muted-foreground mb-2">
              You bought a property for $250,000 and sold it for $325,000. Calculate ROI.
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Cost = $250,000</div>
              <div>Return = $325,000</div>
              <div>Net Profit = $325,000 - $250,000 = $75,000</div>
              <div>ROI = ($75,000 / $250,000) × 100 = 30%</div>
              <div className="text-green-600 font-semibold">30% return on your real estate investment</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Investment Loss</h4>
            <p className="text-sm text-muted-foreground mb-2">
              You invested $50,000 in a business that's now worth $45,000. What's your ROI?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Cost = $50,000</div>
              <div>Return = $45,000</div>
              <div>Net Profit = $45,000 - $50,000 = -$5,000</div>
              <div>ROI = (-$5,000 / $50,000) × 100 = -10%</div>
              <div className="text-red-600 font-semibold">You've lost 10% of your investment</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: Comparing Two Investments</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Investment A: Cost $5,000, Return $8,500. Investment B: Cost $20,000, Return $28,000. Which performed better?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Investment A: ROI = ($3,500/$5,000) × 100 = 70%</div>
              <div>Investment B: ROI = ($8,000/$20,000) × 100 = 40%</div>
              <div className="text-green-600 font-semibold">Investment A had better ROI (70% vs 40%)</div>
              <div className="text-muted-foreground">But B made more absolute profit ($8,000 vs $3,500)</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 5: Doubling Your Money</h4>
            <p className="text-sm text-muted-foreground mb-2">
              What ROI do you get if you double your investment?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Cost = $100,000</div>
              <div>Return = $200,000</div>
              <div>Net Profit = $100,000</div>
              <div>ROI = ($100,000 / $100,000) × 100 = 100%</div>
              <div className="text-green-600 font-semibold">Doubling your money = 100% ROI</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
          <p className="text-sm">
            Warren Buffett's Berkshire Hathaway has achieved an average annual ROI of about 20% since 1965 - nearly double the S&P 500's historical average of ~10%. Over 55+ years, this compound growth turned $19 per share in 1965 into over $500,000 per share today. This demonstrates the power of consistent positive ROI over time.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What's a good ROI?</h4>
            <p className="text-sm text-muted-foreground">
              It depends on the investment type and risk. Stock market averages ~10% annually. Real estate might return 8-15%. Business investments vary wildly. Generally, higher risk should mean higher expected ROI. Compare your ROI to relevant benchmarks and consider the time period.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Does ROI account for time?</h4>
            <p className="text-sm text-muted-foreground">
              Basic ROI doesn't consider how long the investment took. A 20% return in 1 year is better than 20% in 5 years. For time-adjusted returns, use Annualized ROI or Internal Rate of Return (IRR). Annualized ROI = (1 + ROI)^(1/years) - 1.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between ROI and profit margin?</h4>
            <p className="text-sm text-muted-foreground">
              ROI measures return relative to investment cost. Profit margin measures profit relative to revenue. ROI = Profit/Cost. Profit Margin = Profit/Revenue. They answer different questions about business performance.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Should I include fees and taxes in ROI calculations?</h4>
            <p className="text-sm text-muted-foreground">
              For accurate personal ROI, yes - include all costs (fees, commissions, taxes) in your cost basis, and use after-tax returns. For comparing investment performance before taxes, use pre-tax figures. Just be consistent when comparing.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can ROI be more than 100%?</h4>
            <p className="text-sm text-muted-foreground">
              Absolutely! If you invest $1,000 and get back $5,000, your ROI is 400%. Some investments (like successful startups or cryptocurrencies) can have ROI in the thousands of percent. Conversely, maximum loss is -100% (losing everything).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How is ROI used in business decisions?</h4>
            <p className="text-sm text-muted-foreground">
              Companies use ROI to evaluate projects, marketing campaigns, equipment purchases, and acquisitions. If a project's expected ROI exceeds the company's cost of capital, it's typically worth pursuing. ROI helps prioritize limited resources across competing opportunities.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
