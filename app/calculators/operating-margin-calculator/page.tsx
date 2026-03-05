"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function OperatingMarginCalculatorPage() {
  const [revenue, setRevenue] = useState<string>("");
  const [operatingExpenses, setOperatingExpenses] = useState<string>("");
  const [costOfGoodsSold, setCostOfGoodsSold] = useState<string>("");
  const [result, setResult] = useState<{
    operatingIncome: number;
    operatingMargin: number;
    grossProfit: number;
  } | null>(null);

  const calculateOperatingMargin = () => {
    const rev = parseFloat(revenue);
    const opex = parseFloat(operatingExpenses) || 0;
    const cogs = parseFloat(costOfGoodsSold) || 0;

    if (isNaN(rev) || rev <= 0) {
      return;
    }

    const grossProfit = rev - cogs;
    const operatingIncome = grossProfit - opex;
    const operatingMargin = (operatingIncome / rev) * 100;

    setResult({
      operatingIncome,
      operatingMargin,
      grossProfit,
    });
  };

  const reset = () => {
    setRevenue("");
    setOperatingExpenses("");
    setCostOfGoodsSold("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Operating Margin Calculator</h1>
          <p className="text-muted-foreground">
            Measure your business's core profitability. Calculate operating profit margin percentage from revenue and operating expenses, before interest and taxes.
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
                  placeholder="Enter total revenue"
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="costOfGoodsSold">Cost of Goods Sold (COGS)</Label>
                <Input
                  id="costOfGoodsSold"
                  type="number"
                  placeholder="Enter COGS"
                  value={costOfGoodsSold}
                  onChange={(e) => setCostOfGoodsSold(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="operatingExpenses">Operating Expenses</Label>
                <Input
                  id="operatingExpenses"
                  type="number"
                  placeholder="Enter operating expenses"
                  value={operatingExpenses}
                  onChange={(e) => setOperatingExpenses(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateOperatingMargin} className="flex-1">
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
                  <div className={`p-4 rounded-lg ${result.operatingMargin >= 0 ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
                    <p className="text-sm text-muted-foreground">Operating Margin</p>
                    <p className={`text-3xl font-bold ${result.operatingMargin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {result.operatingMargin.toFixed(2)}%
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Operating Income</p>
                      <p className="text-lg font-bold">${result.operatingIncome.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Gross Profit</p>
                      <p className="text-lg font-bold">${result.grossProfit.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Operating Margin = Operating Income / Revenue × 100</p>
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
                How to Use This Operating Margin Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter total revenue</p>
                    <p>Input your company's total revenue or net sales for the period being analyzed.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Input COGS and operating expenses</p>
                    <p>Enter cost of goods sold and operating expenses (SG&A, R&D, depreciation, etc.).</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Calculate and review results</p>
                    <p>Click Calculate to see operating income, gross profit, and operating margin percentage.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Operating Margin by Industry
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Industry</th>
                      <th className="text-right py-3 px-2 font-semibold">Average Margin</th>
                      <th className="text-left py-3 px-2 font-semibold">Classification</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Software/Technology</td>
                      <td className="text-right py-3 px-2">20-30%</td>
                      <td className="py-3 px-2">High margin</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Consulting Services</td>
                      <td className="text-right py-3 px-2">15-25%</td>
                      <td className="py-3 px-2">High margin</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Manufacturing</td>
                      <td className="text-right py-3 px-2">8-15%</td>
                      <td className="py-3 px-2">Moderate margin</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Retail</td>
                      <td className="text-right py-3 px-2">4-8%</td>
                      <td className="py-3 px-2">Low margin</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Grocery Stores</td>
                      <td className="text-right py-3 px-2">1-3%</td>
                      <td className="py-3 px-2">Very low margin</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Airlines</td>
                      <td className="text-right py-3 px-2">5-10%</td>
                      <td className="py-3 px-2">Low margin</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: Margins vary by company size and business model. Compare to similar competitors.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Operating Margin
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">What Is Operating Margin?</h4>
                  <p>
                    Operating margin measures profitability from core business operations before interest
                    and taxes. It shows how efficiently a company converts revenue into operating profit.
                    Unlike net margin, it excludes financing decisions and tax strategies, focusing purely
                    on operational efficiency.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Operating Margin vs Net Margin</h4>
                  <p>
                    Operating margin excludes interest expense and income taxes. Net margin includes them.
                    A company can have strong operating margin but weak net margin if it carries heavy debt.
                    Operating margin is better for comparing operational efficiency across companies with
                    different capital structures.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why Operating Margin Matters</h4>
                  <p>
                    Investors use operating margin to assess management effectiveness. Rising margins
                    indicate improving efficiency or pricing power. Declining margins signal cost pressure
                    or competitive challenges. Operating margin is harder to manipulate than net income
                    through one-time items.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips for Improving Operating Margin
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Reduce operating expenses</p>
                    <p>Audit SG&A expenses regularly. Eliminate redundant software, renegotiate vendor contracts, automate manual processes.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Improve gross margin first</p>
                    <p>Operating margin builds on gross margin. Negotiate better supplier pricing, optimize product mix, reduce waste.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Scale efficiently</p>
                    <p>Grow revenue faster than operating expenses. Many costs are fixed — spreading them over more revenue improves margin.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Monitor by segment</p>
                    <p>Track operating margin by product line or division. Exit or restructure consistently unprofitable segments.</p>
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
                  <h4 className="font-medium text-foreground mb-2">What is a good operating margin?</h4>
                  <p>
                    It varies by industry. Software companies often achieve 25%+ operating margins while
                    retailers operate on 3-5%. As a general guide: below 5% is low, 5-10% is average,
                    10-20% is good, and above 20% is excellent. Always compare to industry peers.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What expenses are included in operating expenses?</h4>
                  <p>
                    Operating expenses include selling, general and administrative (SG&A), research and
                    development (R&D), depreciation and amortization, rent, utilities, and salaries.
                    They exclude cost of goods sold, interest expense, and income taxes.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Can operating margin be negative?</h4>
                  <p>
                    Yes. Negative operating margin means operating expenses exceed gross profit. This
                    happens with startups investing in growth, companies in turnaround situations, or
                    businesses facing severe competitive pressure. Sustained negative operating margin
                    is unsustainable without external funding.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How is operating margin different from EBITDA margin?</h4>
                  <p>
                    Operating margin includes depreciation and amortization. EBITDA margin excludes them.
                    EBITDA is often higher because D&A can be substantial for capital-intensive businesses.
                    Operating margin is more conservative and GAAP-compliant.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why did my operating margin decline?</h4>
                  <p>
                    Common causes include: rising labor or material costs, price discounting to gain
                    share, increased marketing spend, hiring ahead of revenue growth, or one-time
                    restructuring charges. Analyze each expense category to identify the driver.
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
                  <p className="text-muted-foreground">Calculate net profit margin after all expenses and taxes</p>
                </a>
                <a
                  href="/calculators/gross-profit-margin-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Gross Profit Margin Calculator</span>
                  <p className="text-muted-foreground">Calculate gross margin from revenue and COGS</p>
                </a>
                <a
                  href="/calculators/ebitda-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">EBITDA Calculator</span>
                  <p className="text-muted-foreground">Calculate earnings before interest, taxes, depreciation and amortization</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
