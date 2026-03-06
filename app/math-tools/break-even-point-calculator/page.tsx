"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BreakEvenPointCalculator() {
  const [fixedCosts, setFixedCosts] = useState<string>("");
  const [variableCost, setVariableCost] = useState<string>("");
  const [sellingPrice, setSellingPrice] = useState<string>("");
  const [result, setResult] = useState<{
    breakEvenUnits: number;
    breakEvenRevenue: number;
    contributionMargin: number;
  } | null>(null);

  const calculateBreakEven = () => {
    const fixed = parseFloat(fixedCosts);
    const variable = parseFloat(variableCost);
    const price = parseFloat(sellingPrice);

    if (!fixed || !variable || !price || price <= variable) {
      setResult(null);
      return;
    }

    const contributionMargin = price - variable;
    const breakEvenUnits = Math.ceil(fixed / contributionMargin);
    const breakEvenRevenue = breakEvenUnits * price;

    setResult({
      breakEvenUnits,
      breakEvenRevenue,
      contributionMargin,
    });
  };

  const reset = () => {
    setFixedCosts("");
    setVariableCost("");
    setSellingPrice("");
    setResult(null);
  };

  const loadExample = () => {
    setFixedCosts("5000");
    setVariableCost("10");
    setSellingPrice("25");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Break-Even Point Calculator – Find BEP for Your Business</h1>
        <p className="text-muted-foreground">
          Calculate the break-even point in units and sales revenue with our free online break-even calculator. Enter fixed costs, variable costs, and selling price for instant BEP analysis.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Calculate Break-Even Point</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fixedCosts">Fixed Costs ($)</Label>
              <Input
                id="fixedCosts"
                type="number"
                placeholder="e.g., 5000"
                value={fixedCosts}
                onChange={(e) => setFixedCosts(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="variableCost">Variable Cost per Unit ($)</Label>
              <Input
                id="variableCost"
                type="number"
                placeholder="e.g., 10"
                value={variableCost}
                onChange={(e) => setVariableCost(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sellingPrice">Selling Price per Unit ($)</Label>
              <Input
                id="sellingPrice"
                type="number"
                placeholder="e.g., 25"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={calculateBreakEven} className="flex-1">
              Calculate Break-Even
            </Button>
            <Button onClick={reset} variant="outline">
              Reset
            </Button>
            <Button onClick={loadExample} variant="outline">
              Load Example
            </Button>
          </div>

          {result && (
            <div className="space-y-4 pt-4 border-t">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Contribution Margin</div>
                  <div className="text-2xl font-bold">${result.contributionMargin.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground mt-1">Per unit profit before fixed costs</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Break-Even Units</div>
                  <div className="text-4xl font-bold">{result.breakEvenUnits}</div>
                  <p className="text-xs text-muted-foreground mt-1">Units to sell</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Break-Even Revenue</div>
                  <div className="text-4xl font-bold">${result.breakEvenRevenue.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground mt-1">Total sales needed</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">What is Break-Even Analysis?</h2>
        <p className="text-muted-foreground">
          Break-even analysis helps you determine when your business will start making a profit. The break-even point is where total revenue equals total costs – you're neither making nor losing money.
        </p>
        <p className="text-muted-foreground">
          Knowing your break-even point helps with pricing decisions, setting sales targets, and understanding the financial viability of your business or product.
        </p>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">The Break-Even Formula</h2>
        <div className="p-4 bg-muted rounded-lg">
          <div className="font-mono text-sm mb-2">Break-Even Units = Fixed Costs ÷ (Selling Price - Variable Cost)</div>
          <div className="text-sm text-muted-foreground">
            The denominator (Selling Price - Variable Cost) is called the contribution margin – the amount each unit contributes toward covering fixed costs.
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <div className="font-semibold text-sm mb-2">Fixed Costs</div>
            <p className="text-xs text-muted-foreground">
              Expenses that don't change with production volume: rent, salaries, insurance, equipment payments.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold text-sm mb-2">Variable Costs</div>
            <p className="text-xs text-muted-foreground">
              Costs that vary with production: raw materials, direct labor, packaging, shipping per unit.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Example Calculation</h2>
        <div className="p-4 bg-muted rounded-lg">
          <div className="font-semibold text-sm mb-3">A small business selling handmade candles:</div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fixed Costs (monthly):</span>
              <span className="font-medium">$5,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Variable Cost per Candle:</span>
              <span className="font-medium">$10</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Selling Price per Candle:</span>
              <span className="font-medium">$25</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-semibold">
                <span>Contribution Margin:</span>
                <span>$25 - $10 = $15</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Break-Even Units:</span>
                <span>$5,000 ÷ $15 = 334 candles</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Break-Even Revenue:</span>
                <span>334 × $25 = $8,350</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Why Break-Even Analysis Matters</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <div className="font-semibold text-sm mb-2">Pricing Strategy</div>
            <p className="text-xs text-muted-foreground">
              Test different price points to see how they affect your break-even volume. Higher prices mean fewer units needed to break even.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold text-sm mb-2">Goal Setting</div>
            <p className="text-xs text-muted-foreground">
              Set realistic sales targets based on your break-even point. Know exactly how much you need to sell to become profitable.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold text-sm mb-2">Risk Assessment</div>
            <p className="text-xs text-muted-foreground">
              Evaluate whether your break-even point is achievable given market size and competition. High break-even volumes may signal higher risk.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold text-sm mb-2">Cost Control</div>
            <p className="text-xs text-muted-foreground">
              Identify opportunities to reduce fixed or variable costs, lowering your break-even point and improving profitability.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm mb-2">What if my selling price is less than variable cost?</h4>
            <p className="text-xs text-muted-foreground">
              You can't break even – you lose money on every unit sold. You'll need to either raise prices or reduce variable costs to have a viable business model.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Does break-even include taxes?</h4>
            <p className="text-xs text-muted-foreground">
              Basic break-even analysis doesn't include taxes since you're calculating when revenue equals costs (zero profit). For after-tax break-even, you'd need to factor in your tax rate.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How often should I recalculate break-even?</h4>
            <p className="text-xs text-muted-foreground">
              Recalculate whenever fixed costs, variable costs, or prices change significantly. Review at least quarterly to keep your financial planning current.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
