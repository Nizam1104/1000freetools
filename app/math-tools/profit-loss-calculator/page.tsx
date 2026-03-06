"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfitLossCalculator() {
  const [costPrice, setCostPrice] = useState<string>("");
  const [sellingPrice, setSellingPrice] = useState<string>("");
  const [result, setResult] = useState<{
    amount: number;
    percentage: number;
    isProfit: boolean;
  } | null>(null);

  const calculate = () => {
    const cp = parseFloat(costPrice);
    const sp = parseFloat(sellingPrice);

    if (!cp || !sp) {
      setResult(null);
      return;
    }

    const amount = sp - cp;
    const percentage = (amount / cp) * 100;

    setResult({
      amount: Math.abs(amount),
      percentage: Math.abs(percentage),
      isProfit: amount > 0,
    });
  };

  const reset = () => {
    setCostPrice("");
    setSellingPrice("");
    setResult(null);
  };

  const loadExample = () => {
    setCostPrice("80");
    setSellingPrice("120");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Profit & Loss Calculator – Find Profit or Loss Percentage</h1>
        <p className="text-muted-foreground">
          Calculate profit or loss on any transaction with our free online profit and loss calculator. Enter cost price and selling price to instantly find profit/loss amount and percentage.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Calculate Profit or Loss</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="costPrice">Cost Price ($)</Label>
              <Input
                id="costPrice"
                type="number"
                placeholder="e.g., 80"
                value={costPrice}
                onChange={(e) => setCostPrice(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sellingPrice">Selling Price ($)</Label>
              <Input
                id="sellingPrice"
                type="number"
                placeholder="e.g., 120"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
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
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Result</div>
                <div className={`text-4xl font-bold ${result.isProfit ? 'text-green-600' : 'text-red-600'}`}>
                  {result.isProfit ? 'Profit' : 'Loss'}: ${result.amount.toFixed(2)}
                </div>
                <div className={`text-2xl font-semibold mt-2 ${result.isProfit ? 'text-green-600' : 'text-red-600'}`}>
                  {result.isProfit ? '+' : '-'}{result.percentage.toFixed(2)}%
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Understanding Profit and Loss</h2>
        <p className="text-muted-foreground">
          Profit occurs when you sell something for more than you paid for it. Loss happens when the selling price is less than the cost price.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <div className="font-semibold text-sm mb-2 text-green-600">Profit</div>
            <p className="text-xs text-muted-foreground">
              Selling Price &gt; Cost Price. You've made money on the transaction.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold text-sm mb-2 text-red-600">Loss</div>
            <p className="text-xs text-muted-foreground">
              Selling Price &lt; Cost Price. You've lost money on the transaction.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">The Formulas</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <div className="font-semibold text-sm mb-2">Profit</div>
            <div className="font-mono text-xs mb-2">Profit = Selling Price - Cost Price</div>
            <div className="font-mono text-xs">Profit % = (Profit ÷ Cost Price) × 100</div>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <div className="font-semibold text-sm mb-2">Loss</div>
            <div className="font-mono text-xs mb-2">Loss = Cost Price - Selling Price</div>
            <div className="font-mono text-xs">Loss % = (Loss ÷ Cost Price) × 100</div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Example Calculations</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <div className="font-semibold text-sm mb-2">Profit Example</div>
            <div className="text-sm text-muted-foreground space-y-1">
              <div>You buy a product for $80 (Cost Price)</div>
              <div>You sell it for $120 (Selling Price)</div>
              <div>Profit = $120 - $80 = $40</div>
              <div>Profit % = ($40 ÷ $80) × 100 = 50%</div>
            </div>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <div className="font-semibold text-sm mb-2">Loss Example</div>
            <div className="text-sm text-muted-foreground space-y-1">
              <div>You buy stock for $500 (Cost Price)</div>
              <div>You sell it for $400 (Selling Price)</div>
              <div>Loss = $500 - $400 = $100</div>
              <div>Loss % = ($100 ÷ $500) × 100 = 20%</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Why Profit Percentage Matters</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <div className="font-semibold text-sm mb-2">Business Health</div>
            <p className="text-xs text-muted-foreground">
              Track profit margins to understand if your business model is sustainable long-term.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold text-sm mb-2">Pricing Decisions</div>
            <p className="text-xs text-muted-foreground">
              Calculate the minimum selling price needed to achieve your target profit margin.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold text-sm mb-2">Investment Analysis</div>
            <p className="text-xs text-muted-foreground">
              Compare returns across different investments using percentage rather than absolute amounts.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between markup and profit margin?</h4>
            <p className="text-xs text-muted-foreground">
              Markup is based on cost price (Profit ÷ Cost), while profit margin is based on selling price (Profit ÷ Selling Price). A 50% markup doesn't equal a 50% profit margin.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can profit percentage be more than 100%?</h4>
            <p className="text-xs text-muted-foreground">
              Yes. If you buy something for $10 and sell it for $25, your profit is $15, which is 150% of the cost price.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I find selling price if I know cost and desired profit %?</h4>
            <p className="text-xs text-muted-foreground">
              Selling Price = Cost Price × (1 + Profit% ÷ 100). For a 30% profit on a $100 item: $100 × 1.30 = $130.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
