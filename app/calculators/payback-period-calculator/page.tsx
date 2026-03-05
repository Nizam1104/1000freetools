"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";
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

        <div className="mt-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>How to Use This Payback Period Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">1</div>
                <div>
                  <p className="font-medium text-foreground">Enter the initial investment</p>
                  <p>Input the total upfront cost of the project or investment you're evaluating.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">2</div>
                <div>
                  <p className="font-medium text-foreground">Enter annual cash flows</p>
                  <p>List the expected cash inflows for each year, separated by commas. Use consistent time periods.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">3</div>
                <div>
                  <p className="font-medium text-foreground">Click Calculate</p>
                  <p>The calculator determines how many years it takes to recover your initial investment.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payback Period Examples</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Investment</th>
                      <th className="text-left py-3 px-2 font-semibold">Cash Flows</th>
                      <th className="text-left py-3 px-2 font-semibold">Payback Period</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">$10,000 equipment</td>
                      <td className="py-3 px-2">$3,000, $3,000, $3,000, $3,000</td>
                      <td className="py-3 px-2">3.33 years</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">$50,000 solar panels</td>
                      <td className="py-3 px-2">$8,000/year (equal)</td>
                      <td className="py-3 px-2">6.25 years</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">$25,000 marketing</td>
                      <td className="py-3 px-2">$5,000, $10,000, $15,000</td>
                      <td className="py-3 px-2">2.67 years</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">$100,000 expansion</td>
                      <td className="py-3 px-2">$20,000, $25,000, $30,000, $35,000</td>
                      <td className="py-3 px-2">3.71 years</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">$5,000 software</td>
                      <td className="py-3 px-2">$2,000, $2,000, $2,000</td>
                      <td className="py-3 px-2">2.5 years</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Understanding Payback Period</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">What Is Payback Period?</h4>
                <p>Payback period measures how long it takes to recover an initial investment from the cash flows it generates. It answers a simple question: "When do I get my money back?" Shorter payback periods are generally preferred because they mean less risk and faster capital recovery.</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How to Calculate Payback Period</h4>
                <p>For equal annual cash flows: Payback = Initial Investment / Annual Cash Flow. For uneven cash flows, add up the cash flows year by year until you reach the initial investment amount. If payback happens partway through a year, calculate the fraction based on how much of that year's cash flow was needed.</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Limitations of Payback Period</h4>
                <p>Payback period ignores the time value of money — a dollar today is worth more than a dollar tomorrow. It also ignores cash flows after the payback point. A project with a 3-year payback but no further returns might be worse than a 5-year payback with 20 years of profits. Use payback alongside NPV and IRR for better decisions.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>When to Use Payback Period Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Quick Screening</p>
                  <p>Use payback period to quickly eliminate projects that take too long to recover capital.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">High-Risk Environments</p>
                  <p>When future uncertainty is high, shorter payback periods reduce exposure to risk.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Cash-Strapped Companies</p>
                  <p>Businesses with limited capital need quick returns to fund ongoing operations.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Technology Investments</p>
                  <p>Fast-changing tech may become obsolete quickly, making short payback essential.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">What is a good payback period?</h4>
                <p>It depends on the industry and risk tolerance. Many companies target 2-4 years for most projects. High-risk ventures may require under 2 years. Infrastructure projects might accept 10+ years. Compare against your cost of capital and alternative investments.</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How is payback period different from ROI?</h4>
                <p>Payback period measures time to recover investment. ROI (Return on Investment) measures total profitability as a percentage. A project can have a quick payback but low total return, or slow payback with high long-term returns.</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Does payback period consider the time value of money?</h4>
                <p>No, the simple payback period doesn't account for the time value of money. For that, use discounted payback period, which discounts future cash flows to present value before calculating payback time.</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What if cash flows are irregular?</h4>
                <p>Add cash flows year by year until you reach the initial investment. If payback occurs partway through a year, divide the remaining amount needed by that year's cash flow to get the fraction.</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Can payback period be negative?</h4>
                <p>No. Payback period is always zero or positive. If cumulative cash flows never reach the initial investment, the payback period is undefined — the investment never pays back.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <a href="/calculators/roi-calculator" className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                  <span className="font-medium text-foreground">ROI Calculator</span>
                  <p className="text-muted-foreground">Calculate return on investment percentage</p>
                </a>
                <a href="/calculators/npv-calculator" className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                  <span className="font-medium text-foreground">NPV Calculator</span>
                  <p className="text-muted-foreground">Calculate net present value of cash flows</p>
                </a>
                <a href="/calculators/irr-calculator" className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                  <span className="font-medium text-foreground">IRR Calculator</span>
                  <p className="text-muted-foreground">Calculate internal rate of return</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
