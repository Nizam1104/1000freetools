"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Faqs from "@/components/utils/Faqs";


export default function BreakEvenDiscountCalculatorPage() {
  const [costPrice, setCostPrice] = useState<string>("");
  const [sellingPrice, setSellingPrice] = useState<string>("");
  const [result, setResult] = useState<{
    currentProfit: number;
    profitMargin: number;
    maxDiscount: number;
    maxDiscountPercent: number;
    breakEvenPrice: number;
  } | null>(null);

  const calculateBreakEven = () => {
    const cost = parseFloat(costPrice);
    const price = parseFloat(sellingPrice);

    if (isNaN(cost) || isNaN(price) || cost <= 0 || price <= 0) {
      return;
    }

    const currentProfit = price - cost;
    const profitMargin = (currentProfit / price) * 100;
    const maxDiscount = currentProfit;
    const maxDiscountPercent = (currentProfit / price) * 100;
    const breakEvenPrice = cost;

    setResult({
      currentProfit,
      profitMargin,
      maxDiscount,
      maxDiscountPercent,
      breakEvenPrice,
    });
  };

  const reset = () => {
    setCostPrice("");
    setSellingPrice("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Break-Even Discount Calculator</h1>
          <p className="text-muted-foreground">
            Find the maximum discount you can offer without losing money. Calculate the break-even discount percentage given your cost price and current selling price.
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
                <Label htmlFor="sellingPrice">Selling Price</Label>
                <Input
                  id="sellingPrice"
                  type="number"
                  placeholder="Enter selling price"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateBreakEven} className="flex-1">
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
                  <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Max Discount (Break-Even)</p>
                    <p className="text-3xl font-bold text-green-600">${result.maxDiscount.toFixed(2)} ({result.maxDiscountPercent.toFixed(1)}%)</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Current Profit</p>
                      <p className="text-lg font-bold">${result.currentProfit.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Profit Margin</p>
                      <p className="text-lg font-bold">{result.profitMargin.toFixed(1)}%</p>
                    </div>
                  </div>
                  <div className="p-4 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Break-Even Price</p>
                    <p className="text-lg font-bold text-orange-600">${result.breakEvenPrice.toFixed(2)}</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Any discount above {result.maxDiscountPercent.toFixed(1)}% will result in a loss</p>
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
                How to Use This Break-Even Discount Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter your cost price</p>
                    <p>This is what you pay to acquire or produce each unit. Include all direct costs like materials, labor, and shipping.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Input your current selling price</p>
                    <p>This is your regular retail price before any discounts. The calculator will determine how much you can reduce this price without losing money.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Review your maximum safe discount</p>
                    <p>The result shows the maximum discount amount and percentage you can offer while still breaking even. Any discount beyond this point means a loss.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Discount Margin Reference Guide
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Profit Margin</th>
                      <th className="text-left py-3 px-2 font-semibold">Max Discount</th>
                      <th className="text-left py-3 px-2 font-semibold">Risk Level</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">10%</td>
                      <td className="py-3 px-2">10% off</td>
                      <td className="py-3 px-2">Low flexibility</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">20%</td>
                      <td className="py-3 px-2">20% off</td>
                      <td className="py-3 px-2">Moderate flexibility</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">30%</td>
                      <td className="py-3 px-2">30% off</td>
                      <td className="py-3 px-2">Good flexibility</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">40%</td>
                      <td className="py-3 px-2">40% off</td>
                      <td className="py-3 px-2">High flexibility</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">50%+</td>
                      <td className="py-3 px-2">50%+ off</td>
                      <td className="py-3 px-2">Maximum flexibility</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Your maximum discount equals your profit margin. A 25% margin means you can discount up to 25% and still cover costs. Beyond that, each sale loses money.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Break-Even Discounts
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">What Is Break-Even Discount?</h4>
                  <p>
                    Break-even discount is the maximum percentage you can reduce your selling price without losing money on the sale. At this discount level, your revenue exactly equals your cost — you make zero profit but also zero loss. It's the absolute floor for pricing decisions.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why Profit Margin Sets Your Discount Limit</h4>
                  <p>
                    Your profit margin is the difference between cost and selling price, expressed as a percentage of the selling price. This margin is your pricing cushion. If your margin is 30%, you can cut price by up to 30% and still cover costs. Any deeper discount comes out of your pocket.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">When Break-Even Pricing Makes Sense</h4>
                  <p>
                    Selling at break-even can be strategic. You might do this to clear old inventory, match a competitor's promotion, or attract customers who will buy other profitable items. The key is knowing your limit so you don't accidentally go below it.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">The Danger of Discounting Beyond Break-Even</h4>
                  <p>
                    Every sale below break-even loses real money. A 5% loss on a $100 item is $5 out of pocket. To recover that $5, you need to make profitable sales elsewhere. Many businesses fail because they discount too deeply without tracking the cumulative losses.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Smart Discounting Strategies
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Know Your Margin Before Any Sale</p>
                    <p>Calculate your break-even point before running promotions. Keep a reference sheet showing max discount for each product. This prevents accidental losses during busy sales periods.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Use Tiered Discounts Strategically</p>
                    <p>Offer smaller discounts (10-15%) on low-margin items and deeper discounts on high-margin products. This protects profitability while still giving customers perceived value.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Consider Volume When Discounting</p>
                    <p>A break-even sale might make sense if it leads to additional profitable purchases. But calculate the total transaction value, not just the discounted item. Don't assume volume will materialize.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Track Discount Impact on Margins</p>
                    <p>Monitor how discounts affect your overall profit margin over time. If you're constantly discounting to break-even, your base prices may be too high or your costs too high.</p>
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
    question: "How do I calculate break-even discount percentage?",
    answer: "Subtract your cost from your selling price to get profit. Divide profit by selling price and multiply by 100. For example: $80 cost, $100 price = $20 profit. $20 / $100 = 20% maximum discount.",
  },
{
    question: "Is it ever smart to sell below break-even?",
    answer: "Sometimes, but only with a clear strategy. Loss leaders can draw customers who buy other items. Clearance sales free up cash and space. The key is limiting the loss and having a specific goal beyond just moving inventory.",
  },
{
    question: "What costs should I include in cost price?",
    answer: "Include all direct costs: purchase price or materials, direct labor, shipping to you, and any customization costs. Don't include overhead like rent or utilities — those are covered by your profit margin.",
  },
{
    question: "How does VAT or sales tax affect break-even?",
    answer: "Sales tax is collected from customers and remitted to the government — it's not your revenue. Calculate break-even using pre-tax prices. The tax doesn't affect your profit margin calculation.",
  },
{
    question: "Why is my break-even discount lower than competitors?",
    answer: "Competitors may have lower costs from bulk purchasing, vertical integration, or different overhead structures. They might also be willing to accept lower margins. Focus on your own numbers, not theirs.",
  }
  ]} />
</section>

        </div>
      </div>
    </div>
  );
}
