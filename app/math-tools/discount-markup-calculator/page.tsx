"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DiscountMarkupCalculator() {
  const [mode, setMode] = useState<"discount" | "markup">("discount");
  const [originalPrice, setOriginalPrice] = useState<string>("");
  const [percentage, setPercentage] = useState<string>("");
  const [result, setResult] = useState<{
    amount: number;
    finalPrice: number;
  } | null>(null);

  const calculate = () => {
    const price = parseFloat(originalPrice);
    const percent = parseFloat(percentage);

    if (!price || !percent) {
      setResult(null);
      return;
    }

    const amount = (price * percent) / 100;
    const finalPrice = mode === "discount" ? price - amount : price + amount;

    setResult({ amount, finalPrice });
  };

  const reset = () => {
    setOriginalPrice("");
    setPercentage("");
    setResult(null);
  };

  const loadExample = () => {
    if (mode === "discount") {
      setOriginalPrice("89.99");
      setPercentage("25");
    } else {
      setOriginalPrice("50");
      setPercentage("40");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Discount & Markup Calculator – Find Sale Price Online</h1>
        <p className="text-muted-foreground">
          Calculate discounted or marked-up prices instantly with our free online discount and markup calculator. Find the final price, savings amount, and percentage with ease.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Calculate Discount or Markup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button
              onClick={() => { setMode("discount"); setResult(null); }}
              variant={mode === "discount" ? "default" : "outline"}
              className="flex-1"
            >
              Discount
            </Button>
            <Button
              onClick={() => { setMode("markup"); setResult(null); }}
              variant={mode === "markup" ? "default" : "outline"}
              className="flex-1"
            >
              Markup
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="originalPrice">
                {mode === "discount" ? "Original Price ($)" : "Cost Price ($)"}
              </Label>
              <Input
                id="originalPrice"
                type="number"
                placeholder="e.g., 89.99"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="percentage">
                {mode === "discount" ? "Discount Percentage (%)" : "Markup Percentage (%)"}
              </Label>
              <Input
                id="percentage"
                type="number"
                placeholder="e.g., 25"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1">
              Calculate
            </Button>
            <Button onClick={reset} variant="outline">
              Reset
            </Button>
            <Button onClick={loadExample} variant="outline">
              Example
            </Button>
          </div>

          {result && (
            <div className="space-y-4 pt-4 border-t">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">
                    {mode === "discount" ? "Discount Amount" : "Markup Amount"}
                  </div>
                  <div className="text-3xl font-bold text-destructive">
                    {mode === "discount" ? "-" : "+"}${result.amount.toFixed(2)}
                  </div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">
                    {mode === "discount" ? "Sale Price" : "Selling Price"}
                  </div>
                  <div className="text-3xl font-bold">${result.finalPrice.toFixed(2)}</div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Percentage</div>
                  <div className="text-3xl font-bold">{percentage}%</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">
          {mode === "discount" ? "How Discounts Work" : "How Markup Works"}
        </h2>
        {mode === "discount" ? (
          <>
            <p className="text-muted-foreground">
              A discount reduces the original price by a certain percentage. Retailers use discounts for sales, promotions, and clearance events.
            </p>
            <p className="text-muted-foreground">
              The discount amount is calculated by multiplying the original price by the discount percentage, then subtracting from the original price.
            </p>
          </>
        ) : (
          <>
            <p className="text-muted-foreground">
              Markup is the amount added to the cost price to determine the selling price. Businesses use markup to cover expenses and generate profit.
            </p>
            <p className="text-muted-foreground">
              The markup amount is calculated by multiplying the cost price by the markup percentage, then adding to the cost price.
            </p>
          </>
        )}
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">The Formulas</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <div className="font-semibold text-sm mb-2">Discount Formula</div>
            <div className="font-mono text-xs mb-2">Discount Amount = Original Price × (Discount % ÷ 100)</div>
            <div className="font-mono text-xs">Sale Price = Original Price - Discount Amount</div>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <div className="font-semibold text-sm mb-2">Markup Formula</div>
            <div className="font-mono text-xs mb-2">Markup Amount = Cost Price × (Markup % ÷ 100)</div>
            <div className="font-mono text-xs">Selling Price = Cost Price + Markup Amount</div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Common Discount Scenarios</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <div className="font-semibold text-sm mb-2">Seasonal Sales</div>
            <p className="text-xs text-muted-foreground">
              End-of-season clearance: 30-70% off to make room for new inventory.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold text-sm mb-2">Bulk Discounts</div>
            <p className="text-xs text-muted-foreground">
              Buy more, save more: 10% off 3+ items, 20% off 5+ items.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold text-sm mb-2">Member Pricing</div>
            <p className="text-xs text-muted-foreground">
              Loyalty discounts: 5-15% off for members or subscribers.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I calculate the discount percentage if I know both prices?</h4>
            <p className="text-xs text-muted-foreground">
              Divide the discount amount by the original price, then multiply by 100. For example, if an item was $100 and is now $75, the discount is $25 ÷ $100 × 100 = 25%.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's a good markup percentage?</h4>
            <p className="text-xs text-muted-foreground">
              It depends on your industry. Retail typically uses 30-50% markup, restaurants 60-70%, and software can be 80% or higher. Consider your costs, competition, and perceived value.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I stack multiple discounts?</h4>
            <p className="text-xs text-muted-foreground">
              Sometimes, but be careful. A 20% discount followed by an additional 10% off isn't 30% total – it's 28% (0.8 × 0.9 = 0.72, so you pay 72%).
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
