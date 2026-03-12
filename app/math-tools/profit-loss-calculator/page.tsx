"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

  const loadExample = (cp: string, sp: string) => {
    setCostPrice(cp);
    setSellingPrice(sp);
    setResult(null);
  };

  return (
    <div className="w-full mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Profit & Loss Calculator - Find Profit or Loss Percentage</h1>
        <p className="text-muted-foreground">
          Calculate profit or loss on any transaction with our free online profit and loss calculator. Enter cost price and selling price to instantly find profit/loss amount and percentage.
        </p>
      </div>

      <div className="space-y-4">
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

        <div className="flex flex-wrap gap-2">
          <Button onClick={calculate} className="flex-1">Calculate</Button>
          <Button onClick={reset} variant="outline">Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("80", "120")}>50% profit</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("500", "400")}>20% loss</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("100", "100")}>Break even</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("25", "40")}>Resale profit</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1500", "1200")}>Electronics loss</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("35000", "42000")}>Car profit</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("10", "15")}>Simple markup</Button>
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

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Calculation Details</h4>
              <div className="font-mono text-sm space-y-1">
                <div>Cost Price: ${costPrice}</div>
                <div>Selling Price: ${sellingPrice}</div>
                <div>Difference: ${sellingPrice} - ${costPrice} = ${result.isProfit ? '+' : '-'}${result.amount.toFixed(2)}</div>
                <div>Percentage: (${result.amount} / ${costPrice}) × 100 = {result.percentage.toFixed(2)}%</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Profit and Loss</h2>
        <p className="text-muted-foreground">
          Profit and loss calculations are fundamental to business and personal finance. Whether you're running a company, selling items online, investing in stocks, or just comparing deals, knowing how to calculate profit or loss percentage helps you make smarter financial decisions.
        </p>
        <p className="text-muted-foreground">
          The key insight is that profit/loss percentage is always calculated relative to the cost price, not the selling price. This standardization lets you compare transactions of different sizes fairly.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">The Formulas</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold text-sm mb-2 text-green-600">Profit</h4>
            <div className="font-mono text-xs mb-2">Profit = Selling Price - Cost Price</div>
            <div className="font-mono text-xs">Profit % = (Profit ÷ Cost Price) × 100</div>
            <p className="text-xs text-muted-foreground mt-2">Occurs when Selling Price &gt; Cost Price</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold text-sm mb-2 text-red-600">Loss</h4>
            <div className="font-mono text-xs mb-2">Loss = Cost Price - Selling Price</div>
            <div className="font-mono text-xs">Loss % = (Loss ÷ Cost Price) × 100</div>
            <p className="text-xs text-muted-foreground mt-2">Occurs when Selling Price &lt; Cost Price</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Retail Profit</h4>
            <p className="text-sm text-muted-foreground mb-2">
              You buy a product for $80 and sell it for $120. What's your profit percentage?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Cost Price = $80</div>
              <div>Selling Price = $120</div>
              <div>Profit = $120 - $80 = $40</div>
              <div>Profit % = ($40 ÷ $80) × 100 = 0.5 × 100 = 50%</div>
              <div className="text-green-600 font-semibold">You made a 50% profit</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Investment Loss</h4>
            <p className="text-sm text-muted-foreground mb-2">
              You bought stock for $500 and sold it for $400. What's your loss percentage?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Cost Price = $500</div>
              <div>Selling Price = $400</div>
              <div>Loss = $500 - $400 = $100</div>
              <div>Loss % = ($100 ÷ $500) × 100 = 0.2 × 100 = 20%</div>
              <div className="text-red-600 font-semibold">You lost 20% of your investment</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Break Even</h4>
            <p className="text-sm text-muted-foreground mb-2">
              You buy an item for $100 and sell it for $100. What's the profit or loss?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Cost Price = $100</div>
              <div>Selling Price = $100</div>
              <div>Profit/Loss = $100 - $100 = $0</div>
              <div>Profit/Loss % = 0%</div>
              <div className="text-muted-foreground">You broke even - no profit, no loss</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: Finding Selling Price</h4>
            <p className="text-sm text-muted-foreground mb-2">
              You want a 25% profit on an item that costs $60. What should you sell it for?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Cost Price = $60</div>
              <div>Desired Profit = 25%</div>
              <div>Profit Amount = $60 × 0.25 = $15</div>
              <div>Selling Price = $60 + $15 = $75</div>
              <div className="text-green-600 font-semibold">Sell for $75 to achieve 25% profit</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 5: Finding Cost Price</h4>
            <p className="text-sm text-muted-foreground mb-2">
              You sold something for $90 at a 10% loss. What did you pay for it?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Selling Price = $90</div>
              <div>Loss = 10%</div>
              <div>Selling Price = Cost × (1 - 0.10) = Cost × 0.90</div>
              <div>Cost = $90 ÷ 0.90 = $100</div>
              <div className="text-red-600 font-semibold">Original cost was $100</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
          <p className="text-sm">
            The concept of profit percentage has been used for thousands of years. Ancient Mesopotamian merchants around 2000 BCE used clay tablets to record transactions with profit margins. The Code of Hammurabi (1750 BCE) even regulated maximum profit rates for certain goods. Modern percentage notation (%) didn't appear until the 15th century, evolving from the Italian "per cento" (per hundred).
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between markup and profit margin?</h4>
            <p className="text-sm text-muted-foreground">
              Markup is profit as a percentage of cost. Profit margin is profit as a percentage of selling price. If you buy for $80 and sell for $100: Markup = $20/$80 = 25%, but Profit Margin = $20/$100 = 20%. They're different! Retailers often confuse these.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can profit percentage be more than 100%?</h4>
            <p className="text-sm text-muted-foreground">
              Yes! If you buy something for $10 and sell it for $25, your profit is $15, which is 150% of the cost. High-margin businesses like software or pharmaceuticals often have profit percentages well over 100%.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I calculate selling price for a target profit %?</h4>
            <p className="text-sm text-muted-foreground">
              Selling Price = Cost Price × (1 + Profit% ÷ 100). For 30% profit on a $100 item: $100 × 1.30 = $130. For a target loss: Selling Price = Cost × (1 - Loss% ÷ 100).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is profit percentage based on cost, not selling price?</h4>
            <p className="text-sm text-muted-foreground">
              It's a convention that makes comparison easier. Your cost is what you control; selling price varies by market. Also, calculating from cost ensures consistency - a 50% markup always means the same thing regardless of the final price.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's a good profit percentage?</h4>
            <p className="text-sm text-muted-foreground">
              It varies by industry. Grocery stores operate on 1-3% net profit. Restaurants aim for 3-5%. Software companies can achieve 20-30% or more. Retail typically targets 5-10%. What matters is your industry average and whether you're profitable enough to sustain and grow.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do discounts affect profit percentage?</h4>
            <p className="text-sm text-muted-foreground">
              Discounts reduce your selling price, which reduces profit. A 20% discount doesn't mean 20% less profit - it could wipe out profit entirely. If your margin is 25% and you discount 20%, your new margin is only 5% (or less, depending on calculation method).
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
