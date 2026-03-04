"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
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

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This EBITDA Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter your net income</p>
                    <p>Start with the net income from your income statement. This is the bottom line profit after all expenses, interest, and taxes have been deducted.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Add back interest, taxes, depreciation, and amortization</p>
                    <p>Enter the interest expense, tax expense, depreciation, and amortization amounts from your financial statements. These are added back to net income to calculate EBITDA.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter revenue for margin calculation</p>
                    <p>Input total revenue to calculate the EBITDA margin percentage. This shows EBITDA as a percentage of sales, useful for comparing companies of different sizes.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                EBITDA Margins by Industry
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Industry</th>
                      <th className="text-left py-3 px-2 font-semibold">Typical EBITDA Margin</th>
                      <th className="text-left py-3 px-2 font-semibold">Good Margin</th>
                      <th className="text-left py-3 px-2 font-semibold">Excellent Margin</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Software/SaaS</td>
                      <td className="py-3 px-2">15-25%</td>
                      <td className="py-3 px-2">25-35%</td>
                      <td className="py-3 px-2">35%+</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Retail</td>
                      <td className="py-3 px-2">5-10%</td>
                      <td className="py-3 px-2">10-15%</td>
                      <td className="py-3 px-2">15%+</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Manufacturing</td>
                      <td className="py-3 px-2">8-15%</td>
                      <td className="py-3 px-2">15-20%</td>
                      <td className="py-3 px-2">20%+</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Healthcare</td>
                      <td className="py-3 px-2">10-20%</td>
                      <td className="py-3 px-2">20-30%</td>
                      <td className="py-3 px-2">30%+</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Restaurants</td>
                      <td className="py-3 px-2">5-10%</td>
                      <td className="py-3 px-2">10-15%</td>
                      <td className="py-3 px-2">15%+</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Construction</td>
                      <td className="py-3 px-2">3-8%</td>
                      <td className="py-3 px-2">8-12%</td>
                      <td className="py-3 px-2">12%+</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: EBITDA margins vary significantly by industry. Compare your margin to industry peers, not to companies in different sectors.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding EBITDA
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">What Is EBITDA?</h4>
                  <p>
                    EBITDA stands for Earnings Before Interest, Taxes, Depreciation, and Amortization. It measures a company operating performance without the effects of financing decisions, accounting choices, and tax environments. EBITDA approximates the cash flow generated by core business operations.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">EBITDA Formula</h4>
                  <p>
                    EBITDA = Net Income + Interest + Taxes + Depreciation + Amortization. Alternatively, EBITDA = Operating Income (EBIT) + Depreciation + Amortization. Both methods should yield the same result when calculated correctly from the same financial statements.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">EBITDA Margin</h4>
                  <p>
                    EBITDA margin equals EBITDA divided by revenue, expressed as a percentage. This metric allows comparison of operating profitability across companies of different sizes and in different tax jurisdictions. Higher margins indicate better operational efficiency.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">When EBITDA Is Useful</h4>
                  <p>
                    EBITDA is particularly useful for comparing companies with different capital structures, tax situations, or depreciation policies. It is commonly used in valuation multiples (EV/EBITDA), leveraged buyout analysis, and assessing companies with significant non-cash charges.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                EBITDA Analysis Tips
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Compare Within Industries</p>
                    <p>EBITDA margins vary widely across industries. Software companies often have 30%+ margins while retailers may have 5-10%. Always compare a company EBITDA margin to its industry peers, not to companies in different sectors.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Watch for EBITDA Manipulation</p>
                    <p>Some companies present adjusted EBITDA that excludes legitimate expenses. Be skeptical of companies that add back stock-based compensation, restructuring costs, or other recurring expenses. Stick to standard EBITDA calculations for comparisons.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Consider Capital Expenditures</p>
                    <p>EBITDA ignores capital expenditures required to maintain operations. A company with high EBITDA but massive capex needs may not generate much free cash flow. Always consider capex when evaluating a business.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Track EBITDA Trends</p>
                    <p>Look at EBITDA over multiple periods. Growing EBITDA indicates improving operational performance. Declining EBITDA margins may signal competitive pressure, rising costs, or pricing problems. Trend analysis reveals more than a single period snapshot.</p>
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
                  <h4 className="font-medium text-foreground mb-2">What is a good EBITDA margin?</h4>
                  <p>
                    A good EBITDA margin depends on the industry. For most businesses, 10-20% is considered healthy. Software and technology companies often achieve 25-40% margins. Retail and restaurants typically have 5-15% margins. Compare your margin to industry averages for meaningful assessment.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Is EBITDA the same as operating cash flow?</h4>
                  <p>
                    No, EBITDA is not the same as operating cash flow. EBITDA ignores changes in working capital and does not account for capital expenditures. Operating cash flow from the cash flow statement includes working capital changes and is a more complete measure of cash generation.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why do investors use EBITDA?</h4>
                  <p>
                    Investors use EBITDA because it allows comparison of operating performance across companies with different capital structures, tax rates, and depreciation policies. It is also used in valuation multiples and is a common metric in loan covenants and private equity deals.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What are the limitations of EBITDA?</h4>
                  <p>
                    EBITDA ignores capital expenditures, changes in working capital, interest expense, and taxes. It can make highly leveraged or capital-intensive businesses appear more profitable than they are. Warren Buffett famously criticized EBITDA, noting it ignores the cost of assets needed to run the business.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How is EBITDA different from EBIT?</h4>
                  <p>
                    EBIT (Earnings Before Interest and Taxes) includes depreciation and amortization, while EBITDA excludes them. EBIT equals operating income on most income statements. EBITDA = EBIT + Depreciation + Amortization. EBIT is closer to GAAP operating income.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Related Tools
              </h3>
              <div className="space-y-2 text-sm">
                <a
                  href="/calculators/net-profit-margin-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Net Profit Margin Calculator</span>
                  <p className="text-muted-foreground">Calculate your net profit margin and assess overall profitability</p>
                </a>
                <a
                  href="/calculators/operating-margin-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Operating Margin Calculator</span>
                  <p className="text-muted-foreground">Measure operating efficiency with operating margin analysis</p>
                </a>
                <a
                  href="/calculators/roi-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">ROI Calculator</span>
                  <p className="text-muted-foreground">Calculate return on investment for business decisions</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
