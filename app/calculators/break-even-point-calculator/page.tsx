"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BreakEvenPointCalculatorPage() {
  const [fixedCosts, setFixedCosts] = useState<string>("");
  const [variableCostPerUnit, setVariableCostPerUnit] = useState<string>("");
  const [sellingPricePerUnit, setSellingPricePerUnit] = useState<string>("");
  const [result, setResult] = useState<{
    breakEvenUnits: number;
    breakEvenRevenue: number;
    contributionMargin: number;
  } | null>(null);

  const calculateBreakEven = () => {
    const FC = parseFloat(fixedCosts);
    const VC = parseFloat(variableCostPerUnit);
    const SP = parseFloat(sellingPricePerUnit);

    if (isNaN(FC) || isNaN(VC) || isNaN(SP) || FC < 0 || VC < 0 || SP <= 0) {
      return;
    }

    const contributionMargin = SP - VC;

    if (contributionMargin <= 0) {
      return;
    }

    const breakEvenUnits = Math.ceil(FC / contributionMargin);
    const breakEvenRevenue = breakEvenUnits * SP;

    setResult({ breakEvenUnits, breakEvenRevenue, contributionMargin });
  };

  const reset = () => {
    setFixedCosts("");
    setVariableCostPerUnit("");
    setSellingPricePerUnit("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Break-Even Point Calculator</h1>
          <p className="text-muted-foreground">
            Find the exact number of units you need to sell to cover all costs. Calculate your break-even point from fixed costs, variable costs, and selling price.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fixedCosts">Fixed Costs</Label>
                <Input
                  id="fixedCosts"
                  type="number"
                  placeholder="Enter total fixed costs"
                  value={fixedCosts}
                  onChange={(e) => setFixedCosts(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="variableCostPerUnit">Variable Cost Per Unit</Label>
                <Input
                  id="variableCostPerUnit"
                  type="number"
                  placeholder="Enter variable cost per unit"
                  value={variableCostPerUnit}
                  onChange={(e) => setVariableCostPerUnit(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sellingPricePerUnit">Selling Price Per Unit</Label>
                <Input
                  id="sellingPricePerUnit"
                  type="number"
                  placeholder="Enter selling price per unit"
                  value={sellingPricePerUnit}
                  onChange={(e) => setSellingPricePerUnit(e.target.value)}
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
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Break-Even Point (Units)</p>
                    <p className="text-3xl font-bold text-primary">{result.breakEvenUnits} units</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Break-Even Revenue</p>
                      <p className="text-lg font-bold">${result.breakEvenRevenue.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Contribution Margin</p>
                      <p className="text-lg font-bold">${result.contributionMargin.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>At {result.breakEvenUnits} units, total revenue equals total costs (zero profit/loss)</p>
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
                How to Use This Break-Even Point Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter your total fixed costs</p>
                    <p>Fixed costs are expenses that don't change with sales volume — rent, salaries, insurance, and equipment payments. Use monthly or annual figures consistently.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Input variable cost and selling price per unit</p>
                    <p>Variable costs change with each unit sold — materials, packaging, shipping. Selling price is what you charge customers per unit.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Calculate your break-even point</p>
                    <p>The result shows how many units you must sell to cover all costs. Every unit sold beyond this point generates profit equal to the contribution margin.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Break-Even Analysis Reference Table
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Scenario</th>
                      <th className="text-left py-3 px-2 font-semibold">Fixed Costs</th>
                      <th className="text-left py-3 px-2 font-semibold">Contribution Margin</th>
                      <th className="text-left py-3 px-2 font-semibold">Break-Even Units</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Low Overhead</td>
                      <td className="py-3 px-2">$5,000/month</td>
                      <td className="py-3 px-2">$50/unit</td>
                      <td className="py-3 px-2">100 units</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Medium Business</td>
                      <td className="py-3 px-2">$20,000/month</td>
                      <td className="py-3 px-2">$100/unit</td>
                      <td className="py-3 px-2">200 units</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">High Overhead</td>
                      <td className="py-3 px-2">$50,000/month</td>
                      <td className="py-3 px-2">$200/unit</td>
                      <td className="py-3 px-2">250 units</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Low Margin Product</td>
                      <td className="py-3 px-2">$10,000/month</td>
                      <td className="py-3 px-2">$20/unit</td>
                      <td className="py-3 px-2">500 units</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Service Business</td>
                      <td className="py-3 px-2">$15,000/month</td>
                      <td className="py-3 px-2">$500/client</td>
                      <td className="py-3 px-2">30 clients</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Break-even units = Fixed Costs ÷ Contribution Margin. Higher contribution margins mean you need to sell fewer units to break even.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Break-Even Analysis
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">What Is the Break-Even Point?</h4>
                  <p>
                    The break-even point is the sales volume where total revenue equals total costs — you make zero profit but also zero loss. It's the minimum performance threshold for your business. Below this point, you lose money. Above it, every sale contributes to profit.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Fixed Costs vs. Variable Costs</h4>
                  <p>
                    Fixed costs stay the same regardless of sales — rent, salaries, insurance, loan payments. Variable costs change with each unit — materials, packaging, shipping, commissions. Understanding this split is essential because only variable costs affect your contribution margin.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What Is Contribution Margin?</h4>
                  <p>
                    Contribution margin is selling price minus variable cost per unit. It's the amount each sale contributes toward covering fixed costs. Once fixed costs are covered, the contribution margin becomes profit. A $100 sale with $60 variable cost has a $40 contribution margin.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why Break-Even Matters for Planning</h4>
                  <p>
                    Break-even analysis tells you whether your business model is viable. If you need to sell 1,000 units monthly but the market only supports 500, you have a problem. It also helps set sales targets, evaluate pricing changes, and decide whether to add new products or cut existing ones.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips for Using Break-Even Analysis
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Calculate Break-Even for Each Product</p>
                    <p>Different products have different margins. A low-margin product may need to sell 10x more units than a high-margin product to cover its share of fixed costs. Know which products carry your business.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Revisit Your Numbers Regularly</p>
                    <p>Costs change — rent increases, material prices fluctuate, wages go up. Recalculate break-even quarterly or whenever major costs change. An outdated break-even point gives false confidence.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Use It to Evaluate Price Changes</p>
                    <p>Before cutting prices, calculate how many additional units you need to sell to maintain the same profit. A 10% price cut might require a 25% volume increase to break even on the change.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Build a Safety Margin Into Plans</p>
                    <p>Don't plan to sell exactly at break-even. Aim for 20-30% above to absorb unexpected cost increases or sales shortfalls. The gap between expected sales and break-even is your margin of safety.</p>
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
                  <h4 className="font-medium text-foreground mb-2">How do I calculate break-even point in units?</h4>
                  <p>
                    Divide total fixed costs by contribution margin per unit. Contribution margin = selling price minus variable cost. Example: $10,000 fixed costs ÷ ($50 price - $30 variable cost) = 500 units to break even.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What if I sell multiple products?</h4>
                  <p>
                    Calculate a weighted average contribution margin based on your sales mix. If Product A (60% of sales) has $40 margin and Product B (40% of sales) has $60 margin, your weighted average is $48. Use this for overall break-even analysis.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Can break-even point be too high?</h4>
                  <p>
                    Yes. If your break-even point requires selling more units than the market can support, your business model isn't viable. Solutions include raising prices, reducing fixed costs, or lowering variable costs through efficiency.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How does break-even help with pricing decisions?</h4>
                  <p>
                    It shows the volume impact of price changes. Lower prices reduce contribution margin, requiring more sales to break even. Higher prices increase margin but may reduce demand. Break-even analysis quantifies this trade-off.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Should I include owner salary in fixed costs?</h4>
                  <p>
                    Yes, if you pay yourself a regular salary. Your break-even should cover all cash outflows including owner compensation. If you're not taking a salary yet, include what you would need to pay someone to do your work.
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
                  href="/calculators/break-even-discount-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Break-Even Discount Calculator</span>
                  <p className="text-muted-foreground">Find the maximum discount you can offer without losing money</p>
                </a>
                <a
                  href="/calculators/profit-margin-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Profit Margin Calculator</span>
                  <p className="text-muted-foreground">Calculate gross and net profit margins from revenue and costs</p>
                </a>
                <a
                  href="/calculators/margin-vs-markup-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Margin vs Markup Calculator</span>
                  <p className="text-muted-foreground">Understand the difference between margin and markup percentages</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
