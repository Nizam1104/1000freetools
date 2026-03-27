"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Faqs from "@/components/utils/Faqs";


export default function MarkupCalculatorPage() {
  const [costPrice, setCostPrice] = useState<string>("");
  const [markupPercent, setMarkupPercent] = useState<string>("");
  const [result, setResult] = useState<{
    sellingPrice: number;
    markupAmount: number;
    profitMargin: number;
  } | null>(null);

  const calculateMarkup = () => {
    const cost = parseFloat(costPrice);
    const markup = parseFloat(markupPercent);

    if (isNaN(cost) || isNaN(markup) || cost <= 0 || markup < 0) {
      return;
    }

    const markupAmount = cost * (markup / 100);
    const sellingPrice = cost + markupAmount;
    const profitMargin = (markupAmount / sellingPrice) * 100;

    setResult({ sellingPrice, markupAmount, profitMargin });
  };

  const reset = () => {
    setCostPrice("");
    setMarkupPercent("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Markup Calculator</h1>
          <p className="text-muted-foreground">
            Calculate selling price and markup percentage from cost and desired profit, or reverse-calculate cost from price and markup. Essential for pricing strategy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="costPrice">Cost Price</Label>
                <Input
                  id="costPrice"
                  type="number"
                  placeholder="Enter cost price"
                  value={costPrice}
                  onChange={(e) => setCostPrice(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="markupPercent">Markup Percentage (%)</Label>
                <Input
                  id="markupPercent"
                  type="number"
                  placeholder="Enter markup percentage"
                  value={markupPercent}
                  onChange={(e) => setMarkupPercent(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateMarkup} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Selling Price</p>
                    <p className="text-3xl font-bold text-primary">${result.sellingPrice.toFixed(2)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Markup Amount</p>
                      <p className="text-lg font-bold">${result.markupAmount.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Profit Margin</p>
                      <p className="text-lg font-bold">{result.profitMargin.toFixed(2)}%</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Cost: ${parseFloat(costPrice).toFixed(2)} | Markup: {markupPercent}%</p>
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
                How to Use This Markup Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter your cost price</p>
                    <p>Input the amount you paid for the product or service. This is your base cost before any markup.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Set your desired markup percentage</p>
                    <p>Enter the percentage you want to add to your cost. A 50% markup on a $100 item adds $50.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Click Calculate to see your pricing</p>
                    <p>The calculator shows your selling price, the markup amount in dollars, and your actual profit margin percentage.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Common Markup Percentages by Industry
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Industry</th>
                      <th className="text-left py-3 px-2 font-semibold">Typical Markup</th>
                      <th className="text-left py-3 px-2 font-semibold">Profit Margin</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Grocery/Food</td>
                      <td className="py-3 px-2">20-30%</td>
                      <td className="py-3 px-2">17-23%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Restaurants</td>
                      <td className="py-3 px-2">300-400%</td>
                      <td className="py-3 px-2">75-80%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Clothing/Retail</td>
                      <td className="py-3 px-2">50-100%</td>
                      <td className="py-3 px-2">33-50%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Electronics</td>
                      <td className="py-3 px-2">10-30%</td>
                      <td className="py-3 px-2">9-23%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Automotive Parts</td>
                      <td className="py-3 px-2">40-60%</td>
                      <td className="py-3 px-2">29-38%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Pharmaceuticals</td>
                      <td className="py-3 px-2">200-500%</td>
                      <td className="py-3 px-2">67-83%</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Jewelry</td>
                      <td className="py-3 px-2">100-300%</td>
                      <td className="py-3 px-2">50-75%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: Actual markups vary based on competition, location, and business model. These are general industry averages.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Markup vs Profit Margin
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">What Is Markup?</h4>
                  <p>
                    Markup is the percentage added to your cost to determine the selling price. It's calculated based on cost. If you buy something for $100 and add a 50% markup, you sell it for $150. The $50 difference is your gross profit.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What Is Profit Margin?</h4>
                  <p>
                    Profit margin is the percentage of the selling price that is profit. It's calculated based on the selling price, not the cost. Using the same example: $50 profit on a $150 sale equals a 33.3% profit margin, not 50%.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why the Difference Matters</h4>
                  <p>
                    Many business owners confuse markup and margin. A 50% markup does not equal a 50% profit margin. To achieve a 50% profit margin, you need a 100% markup. Understanding this distinction helps you price products correctly to hit your profit targets.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">The Formulas</h4>
                  <div className="bg-muted p-3 rounded font-mono text-xs space-y-2 mt-2">
                    <div>Selling Price = Cost × (1 + Markup%)</div>
                    <div>Markup Amount = Cost × Markup%</div>
                    <div>Profit Margin = (Markup Amount / Selling Price) × 100</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Pricing Tips for Small Businesses
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Know all your costs</p>
                    <p>Include shipping, storage, payment processing fees, and your time. Many businesses underprice because they miss hidden costs.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Research competitor pricing</p>
                    <p>Know what others charge for similar products. You can price higher if you offer better quality or service, but be prepared to justify it.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Consider psychological pricing</p>
                    <p>Prices ending in 9 or 99 often sell better than round numbers. $19.99 feels significantly cheaper than $20 to many customers.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Review and adjust regularly</p>
                    <p>Costs change over time. Review your pricing quarterly and adjust markups to maintain your target profit margins.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <section className="container mx-auto px-4 py-12 mb-12">
  <h2 className="text-3xl font-semibold mb-8 text-center">
    Frequently Asked Questions
  </h2>
  <Faqs faqs={[
{
    question: "How do I calculate selling price from cost and markup?",
    answer: "Multiply your cost by (1 + markup percentage as a decimal). For a $50 item with 40% markup: $50 × 1.40 = $70 selling price. The markup amount is $70 - $50 = $20.",
  },
{
    question: "What's a good markup percentage?",
    answer: "It depends on your industry and costs. Retail typically uses 50-100% markup. Restaurants often use 300%+ on food. Service businesses may use lower markups but higher volume. Calculate based on your overhead and profit goals.",
  },
{
    question: "Is markup the same as profit margin?",
    answer: "No. Markup is based on cost; margin is based on selling price. A 50% markup gives you a 33% profit margin. To get a 50% profit margin, you need a 100% markup. This calculator shows both values.",
  },
{
    question: "How do I calculate markup if I know cost and selling price?",
    answer: "Subtract cost from selling price to get the markup amount. Divide by cost and multiply by 100. Example: Cost $80, sell for $120. Markup = ($120 - $80) / $80 × 100 = 50%.",
  },
{
    question: "Should I include taxes in my markup calculation?",
    answer: "No. Sales tax is added on top of the selling price and remitted to the government. Calculate your markup on your actual product cost. Sales tax is a pass-through cost, not part of your pricing strategy.",
  }
  ]} />
</section>

        </div>
      </div>
    </div>
  );
}
