"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
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

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This NPV Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter initial investment</p>
                    <p>Input the upfront cost or initial investment amount required for the project.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Set discount rate and cash flows</p>
                    <p>Enter your required rate of return and expected cash flows for each year, separated by commas.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Calculate and evaluate</p>
                    <p>Click Calculate to see NPV. Positive NPV indicates a worthwhile investment; negative suggests reconsidering.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                NPV Decision Guide
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">NPV Value</th>
                      <th className="text-left py-3 px-2 font-semibold">Decision</th>
                      <th className="text-left py-3 px-2 font-semibold">What It Means</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">NPV &gt; 0</td>
                      <td className="py-3 px-2">Accept</td>
                      <td className="py-3 px-2">Investment adds value; expected return exceeds required rate</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">NPV = 0</td>
                      <td className="py-3 px-2">Indifferent</td>
                      <td className="py-3 px-2">Investment breaks even; return equals required rate</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">NPV &lt; 0</td>
                      <td className="py-3 px-2">Reject</td>
                      <td className="py-3 px-2">Investment destroys value; return below required rate</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Comparing projects</td>
                      <td className="py-3 px-2">Choose higher NPV</td>
                      <td className="py-3 px-2">Select the project with highest positive NPV when mutually exclusive</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Net Present Value
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">What Is NPV?</h4>
                  <p>
                    Net Present Value calculates what future cash flows are worth in today's dollars. Money
                    received in the future is worth less than money today due to inflation and opportunity
                    cost. NPV discounts each future cash flow back to present value, then subtracts the
                    initial investment to show net value created.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">The Discount Rate Explained</h4>
                  <p>
                    The discount rate represents your required return or cost of capital. It reflects the
                    risk of the investment and what you could earn elsewhere with similar risk. A higher
                    discount rate reduces present value of future cash flows. Common rates range from 8%
                    for low-risk projects to 20%+ for high-risk ventures.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">NPV vs IRR</h4>
                  <p>
                    Internal Rate of Return (IRR) finds the discount rate that makes NPV equal zero. While
                    IRR gives a percentage return, NPV shows actual dollar value added. NPV is generally
                    preferred for decision-making because it directly measures wealth creation and handles
                    non-conventional cash flows better than IRR.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips for Better Investment Analysis
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Use realistic cash flow estimates</p>
                    <p>Be conservative with projections. Overly optimistic estimates lead to poor investment decisions.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Adjust discount rate for risk</p>
                    <p>Higher risk projects need higher discount rates. Do not use the same rate for all investments.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Run sensitivity analysis</p>
                    <p>Test how NPV changes with different assumptions. This reveals which variables matter most.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Consider non-financial factors</p>
                    <p>NPV is not everything. Strategic fit, competitive response, and regulatory risks also matter.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">What is a good NPV value?</h4>
                  <p>
                    Any positive NPV is good — it means the investment creates value. Higher is better.
                    However, compare NPV relative to investment size. A $10,000 NPV on a $50,000 investment
                    is better than $10,000 NPV on a $500,000 investment. Consider profitability index for
                    size-adjusted comparison.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How do I choose the right discount rate?</h4>
                  <p>
                    Use your weighted average cost of capital (WACC) for company investments. For personal
                    investments, use your expected return from similar-risk alternatives. Add a risk premium
                    for uncertain projects. Typical rates: 8-10% for stable businesses, 15-25% for startups.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Can NPV be negative and still be a good investment?</h4>
                  <p>
                    Generally no — negative NPV destroys shareholder value. Exceptions exist for strategic
                    investments that enable future opportunities, regulatory requirements, or projects with
                    significant intangible benefits not captured in cash flow projections.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What are the limitations of NPV?</h4>
                  <p>
                    NPV assumes cash flows can be reinvested at the discount rate, which may not be realistic.
                    It requires accurate cash flow estimates, which are often uncertain. NPV also does not
                    account for project size differences or timing flexibility (real options).
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How does inflation affect NPV calculations?</h4>
                  <p>
                    Be consistent: use nominal cash flows with nominal discount rates (including inflation),
                    or real cash flows with real discount rates (excluding inflation). Mixing them gives
                    incorrect results. Most analysts use nominal values since they are easier to estimate.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
