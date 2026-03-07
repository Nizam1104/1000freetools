"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function MarginCalculatorPage() {
  const [revenue, setRevenue] = useState<string>("");
  const [costOfGoodsSold, setCostOfGoodsSold] = useState<string>("");
  const [result, setResult] = useState<{
    grossProfit: number;
    grossMargin: number;
  } | null>(null);

  const calculateMargin = () => {
    const rev = parseFloat(revenue);
    const cogs = parseFloat(costOfGoodsSold);

    if (isNaN(rev) || isNaN(cogs) || rev <= 0 || cogs < 0) {
      return;
    }

    const grossProfit = rev - cogs;
    const grossMargin = (grossProfit / rev) * 100;

    setResult({ grossProfit, grossMargin });
  };

  const reset = () => {
    setRevenue("");
    setCostOfGoodsSold("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Profit Margin Calculator</h1>
          <p className="text-muted-foreground">
            Calculate your gross profit margin percentage from revenue and cost, or find the selling price needed to hit a target margin. Built for businesses and freelancers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="revenue">Revenue / Selling Price</Label>
                <Input
                  id="revenue"
                  type="number"
                  placeholder="Enter revenue or selling price"
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="costOfGoodsSold">Cost of Goods Sold</Label>
                <Input
                  id="costOfGoodsSold"
                  type="number"
                  placeholder="Enter cost of goods sold"
                  value={costOfGoodsSold}
                  onChange={(e) => setCostOfGoodsSold(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateMargin} className="flex-1">
                  Calculate Margin
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
                    <p className="text-sm text-muted-foreground">Gross Profit Margin</p>
                    <p className="text-3xl font-bold text-primary">{result.grossMargin.toFixed(2)}%</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Gross Profit</p>
                    <p className="text-xl font-bold">${result.grossProfit.toFixed(2)}</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Revenue: ${parseFloat(revenue).toFixed(2)} | COGS: ${parseFloat(costOfGoodsSold).toFixed(2)}</p>
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
                How to Use This Profit Margin Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter your revenue or selling price</p>
                    <p>Input the total revenue from a sale or your selling price per unit. This is the amount your customer pays.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter your cost of goods sold</p>
                    <p>Input the direct cost to produce or acquire the product. Include materials, labor, and any costs directly tied to the product.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">View your margin and profit</p>
                    <p>The calculator shows your gross profit margin as a percentage and the gross profit in dollars per unit or sale.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Profit Margin Benchmarks by Industry
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Industry</th>
                      <th className="text-left py-3 px-2 font-semibold">Avg. Gross Margin</th>
                      <th className="text-left py-3 px-2 font-semibold">Avg. Net Margin</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Software (SaaS)</td>
                      <td className="py-3 px-2">70-85%</td>
                      <td className="py-3 px-2">15-25%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Retail (General)</td>
                      <td className="py-3 px-2">25-50%</td>
                      <td className="py-3 px-2">2-5%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Restaurants</td>
                      <td className="py-3 px-2">60-70%</td>
                      <td className="py-3 px-2">3-5%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Construction</td>
                      <td className="py-3 px-2">15-25%</td>
                      <td className="py-3 px-2">2-6%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">E-commerce</td>
                      <td className="py-3 px-2">30-50%</td>
                      <td className="py-3 px-2">5-10%</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Manufacturing</td>
                      <td className="py-3 px-2">20-40%</td>
                      <td className="py-3 px-2">5-10%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: Gross margin is revenue minus COGS divided by revenue. Net margin accounts for all expenses including operating costs, taxes, and interest. Benchmarks vary by company size and market position.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Profit Margins
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  Gross profit margin measures what percentage of revenue remains after paying for the direct costs of producing your product or service. The formula is: (Revenue - COGS) / Revenue x 100. A 40% margin means you keep 40 cents of every dollar after covering production costs.
                </p>
                <p>
                  Margin differs from markup, which is calculated as a percentage of cost rather than revenue. A 50% markup on a $100 cost gives a $150 price, but the margin is only 33% ($50 profit / $150 revenue). Confusing these two leads to pricing mistakes that erode profitability.
                </p>
                <p>
                  Healthy margins vary widely by industry. Software companies often achieve 80%+ gross margins because replication costs are near zero. Retailers operate on thinner margins but make up for it with volume and inventory turnover. Focus on your industry benchmarks and track your own margin trends over time.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Pricing and Margin Improvement Tips
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Know Your True COGS</p>
                    <p>Include all direct costs: materials, direct labor, packaging, shipping to customer, and payment processing fees. Many businesses undercount COGS and overestimate their actual margin. Review your costs quarterly as supplier prices change.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Test Price Increases</p>
                    <p>Small price increases often have minimal impact on demand but directly improve margin. A 5% price increase with unchanged costs can boost margin by 20-30%. Test on new customers or specific products before rolling out broadly.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Negotiate with Suppliers</p>
                    <p>Regularly review supplier contracts and get competitive bids. Volume discounts, annual contracts, or switching to alternative materials can reduce COGS. Even a 3% reduction in material costs flows directly to your bottom line.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Analyze Product-Level Margins</p>
                    <p>Not all products have the same margin. Identify your high-margin winners and low-margin losers. Consider discontinuing consistently unprofitable products or raising their prices. Focus marketing on products with the best margin-to-effort ratio.</p>
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
                  <h4 className="font-medium text-foreground mb-2">What is a good profit margin?</h4>
                  <p>
                    It depends on your industry. A 10% net margin is excellent for retail but poor for software. As a rough guide: 5% net margin is low, 10% is healthy, and 15%+ is strong for most traditional businesses. Gross margins should be high enough to cover operating expenses with room for profit.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What's the difference between margin and markup?</h4>
                  <p>
                    Margin is profit as a percentage of selling price. Markup is profit as a percentage of cost. Example: Buy for $100, sell for $150. Markup is 50% ($50/$100), but margin is 33% ($50/$150). Margin is the correct metric for profitability analysis.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How do I calculate the selling price for a target margin?</h4>
                  <p>
                    Use the formula: Price = Cost / (1 - Target Margin). For a $100 cost and 40% target margin: Price = $100 / (1 - 0.40) = $100 / 0.60 = $166.67. This ensures your margin is 40% of the selling price, not the cost.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Should I focus on margin or volume?</h4>
                  <p>
                    Both matter, but margin comes first. High volume with negative or razor-thin margins is unsustainable. Aim for healthy margins, then scale volume. Some businesses intentionally run low margins to gain market share, but this strategy requires deep pockets and a clear path to future profitability.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How often should I review my margins?</h4>
                  <p>
                    Review product-level margins monthly and overall business margins quarterly. Input costs change, prices may need adjustment, and product mix shifts over time. Set up alerts for significant margin changes on key products. Regular review catches problems before they become crises.
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
