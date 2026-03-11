"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

  const loadExample = (type: string) => {
    const examples: Record<string, { fixed: string; variable: string; price: string }> = {
      candles: { fixed: "5000", variable: "10", price: "25" },
      tshirts: { fixed: "3000", variable: "8", price: "22" },
      coffee: { fixed: "8000", variable: "2.50", price: "5.50" },
      software: { fixed: "50000", variable: "0", price: "99" },
      bakery: { fixed: "4500", variable: "3", price: "8" },
      consulting: { fixed: "6000", variable: "25", price: "150" },
      jewelry: { fixed: "2500", variable: "35", price: "85" }
    };
    const ex = examples[type] || examples.candles;
    setFixedCosts(ex.fixed);
    setVariableCost(ex.variable);
    setSellingPrice(ex.price);
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Break-Even Point Calculator – Find BEP for Your Business</h1>
        <p className="text-muted-foreground">
          Calculate the break-even point in units and sales revenue with our free online break-even calculator. Enter fixed costs, variable costs, and selling price for instant BEP analysis.
        </p>
      </div>

      <div className="space-y-4">
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

        <div className="flex flex-wrap gap-2">
          <Button onClick={calculateBreakEven} className="flex-1">
            Calculate Break-Even
          </Button>
          <Button onClick={reset} variant="outline">
            Reset
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Load example:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("candles")}>Candles</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("tshirts")}>T-Shirts</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("coffee")}>Coffee Shop</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("software")}>Software</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("bakery")}>Bakery</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("consulting")}>Consulting</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("jewelry")}>Jewelry</Button>
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
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">What Is Break-Even Analysis?</h2>
        <p className="text-muted-foreground">
          Break-even analysis tells you exactly how much you need to sell before your business starts making money. The break-even point is where your total revenue equals your total costs – you're not losing money, but you're not making any either. It's the threshold between loss and profit.
        </p>
        <p className="text-muted-foreground">
          Every business has two types of costs. Fixed costs stay the same no matter how much you sell – rent, insurance, salaries, equipment payments. Variable costs change with each unit you produce – materials, packaging, shipping. Your selling price minus variable cost gives you the contribution margin, which is what each sale contributes toward covering your fixed costs.
        </p>
        <p className="text-muted-foreground">
          Once you've sold enough units to cover all your fixed costs, you've broken even. Every sale after that is pure profit (well, before taxes). Knowing this number helps you set realistic sales targets and understand whether your pricing makes sense.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">The Break-Even Formula</h2>
        <div className="p-6 bg-muted rounded-lg">
          <div className="font-mono text-lg mb-4">Break-Even Units = Fixed Costs ÷ (Selling Price - Variable Cost)</div>
          <p className="text-sm text-muted-foreground">
            The denominator (Selling Price - Variable Cost) is called the <strong>contribution margin</strong>. It represents how much each unit sold contributes toward covering your fixed costs. Once fixed costs are covered, that same contribution margin becomes profit.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Fixed Costs</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Expenses that don't change with production volume. You pay these whether you sell one unit or one thousand.
            </p>
            <ul className="text-sm space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Rent or mortgage payments
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Salaries and wages
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Insurance premiums
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Equipment leases
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Software subscriptions
              </li>
            </ul>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Variable Costs</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Costs that vary directly with production. Make one more unit, and these costs go up. Make none, and these costs are zero.
            </p>
            <ul className="text-sm space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Raw materials
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Direct labor (per unit)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Packaging
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Shipping per order
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Transaction fees
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Worked Examples</h2>
        <div className="space-y-4">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 1: Handmade Candle Business</h3>
            <p className="text-sm text-muted-foreground mb-3">Sarah makes scented candles at home. Her monthly fixed costs are $5,000 (rent, utilities, equipment). Each candle costs $10 in materials and labor, and she sells them for $25.</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fixed Costs:</span>
                <span className="font-medium">$5,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Variable Cost per Candle:</span>
                <span className="font-medium">$10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Selling Price:</span>
                <span className="font-medium">$25</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between font-semibold">
                  <span>Contribution Margin:</span>
                  <span>$25 - $10 = $15 per candle</span>
                </div>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Break-Even Units:</span>
                <span>$5,000 ÷ $15 = 333.33 → 334 candles</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Break-Even Revenue:</span>
                <span>334 × $25 = $8,350</span>
              </div>
              <div className="pt-2 text-muted-foreground">
                Sarah needs to sell 334 candles per month to break even. Every candle after that earns her $15 in profit.
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 2: Coffee Shop</h3>
            <p className="text-sm text-muted-foreground mb-3">A coffee shop has monthly fixed costs of $8,000. Each cup of coffee costs $2.50 to make (beans, milk, cup, lid) and sells for $5.50.</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fixed Costs:</span>
                <span className="font-medium">$8,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Variable Cost per Cup:</span>
                <span className="font-medium">$2.50</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Selling Price:</span>
                <span className="font-medium">$5.50</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between font-semibold">
                  <span>Contribution Margin:</span>
                  <span>$5.50 - $2.50 = $3.00 per cup</span>
                </div>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Break-Even Units:</span>
                <span>$8,000 ÷ $3.00 = 2,666.67 → 2,667 cups</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Break-Even Revenue:</span>
                <span>2,667 × $5.50 = $14,668.50</span>
              </div>
              <div className="pt-2 text-muted-foreground">
                The coffee shop needs to sell 2,667 cups per month, or about 89 cups per day, to break even.
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 3: Software Product</h3>
            <p className="text-sm text-muted-foreground mb-3">A software company has development and overhead costs of $50,000 per month. Their software has virtually zero variable cost per license and sells for $99.</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fixed Costs:</span>
                <span className="font-medium">$50,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Variable Cost per License:</span>
                <span className="font-medium">$0 (digital product)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Selling Price:</span>
                <span className="font-medium">$99</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between font-semibold">
                  <span>Contribution Margin:</span>
                  <span>$99 - $0 = $99 per license</span>
                </div>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Break-Even Units:</span>
                <span>$50,000 ÷ $99 = 505.05 → 506 licenses</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Break-Even Revenue:</span>
                <span>506 × $99 = $50,094</span>
              </div>
              <div className="pt-2 text-muted-foreground">
                Software has high fixed costs but nearly zero variable costs, making it highly scalable after break-even.
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 4: Consulting Business</h3>
            <p className="text-sm text-muted-foreground mb-3">A consultant has monthly fixed costs of $6,000 (office, insurance, marketing). Each consulting day costs about $25 in expenses and bills at $150 per day.</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fixed Costs:</span>
                <span className="font-medium">$6,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Variable Cost per Day:</span>
                <span className="font-medium">$25</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Daily Rate:</span>
                <span className="font-medium">$150</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between font-semibold">
                  <span>Contribution Margin:</span>
                  <span>$150 - $25 = $125 per day</span>
                </div>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Break-Even Days:</span>
                <span>$6,000 ÷ $125 = 48 days</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Break-Even Revenue:</span>
                <span>48 × $150 = $7,200</span>
              </div>
              <div className="pt-2 text-muted-foreground">
                The consultant needs to bill 48 days per year to cover annual costs, or about 4 days per month.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Quick Fact</h2>
        <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm">
            <strong>Walter Rautenstrauch</strong>, an American engineer and professor at Columbia University, is credited with developing break-even analysis in the 1930s. He created it as a tool for business planning during the Great Depression, when companies desperately needed to understand their cost structures and minimum sales requirements. The technique became standard business practice by the 1950s and remains one of the most fundamental tools in managerial accounting today.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-sm mb-2">What if my selling price is less than my variable cost?</h3>
            <p className="text-sm text-muted-foreground">
              You can never break even – you lose money on every single unit sold. No amount of sales volume will help. You must either raise your price above the variable cost or find a way to reduce variable costs. This situation sometimes happens with loss leaders (products sold at a loss to attract customers), but those only work if they drive sales of profitable products.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">Does break-even analysis include taxes?</h3>
            <p className="text-sm text-muted-foreground">
              Basic break-even analysis doesn't include income taxes because you're calculating when revenue equals costs (zero profit, zero tax). If you want to know how many units you need to sell to achieve a specific after-tax profit, you'd need to adjust the formula to account for your tax rate.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">How often should I recalculate my break-even point?</h3>
            <p className="text-sm text-muted-foreground">
              Recalculate whenever anything significant changes: rent increases, material costs go up, you change your pricing, or you add new fixed expenses. Many businesses review their break-even analysis quarterly as part of regular financial planning. If your costs are stable, an annual review might suffice.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">Can break-even analysis handle multiple products?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but you need to use a weighted average contribution margin based on your expected sales mix. If Product A has a $10 margin and makes up 60% of sales, and Product B has a $20 margin at 40% of sales, your weighted average is ($10 × 0.6) + ($20 × 0.4) = $14. Use this in the break-even formula.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">What's the margin of safety?</h3>
            <p className="text-sm text-muted-foreground">
              Margin of safety is how much your actual or expected sales exceed the break-even point. If you break even at 1,000 units and expect to sell 1,500, your margin of safety is 500 units or 33%. It tells you how much sales can drop before you start losing money. A larger margin of safety means less risk.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">Why is my break-even point so high?</h3>
            <p className="text-sm text-muted-foreground">
              A high break-even point usually means one of three things: fixed costs are too high, contribution margin is too low (price too close to variable cost), or both. To lower it, you can reduce fixed costs (downsize, negotiate rent), increase prices, or reduce variable costs (find cheaper suppliers, improve efficiency).
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">Is break-even analysis useful for service businesses?</h3>
            <p className="text-sm text-muted-foreground">
              Absolutely. Service businesses have fixed costs (office, salaries, software) and variable costs (materials, travel, subcontractors). A consultant might calculate break-even in billable days. A salon might calculate it in appointments. The math is the same – you just define your "unit" appropriately for your business.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
