"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Faqs from "@/components/utils/Faqs";


interface Discount {
  id: number;
  value: string;
  type: "percent" | "fixed";
}

export default function DiscountStackingCalculatorPage() {
  const [originalPrice, setOriginalPrice] = useState<string>("");
  const [discounts, setDiscounts] = useState<Discount[]>([
    { id: 1, value: "", type: "percent" },
  ]);
  const [applyMethod, setApplyMethod] = useState<"sequential" | "combined">("sequential");
  const [result, setResult] = useState<{
    originalPrice: number;
    finalPrice: number;
    totalSavings: number;
    totalDiscountPercent: number;
    breakdown: { discount: string; amount: number; newPrice: number }[];
  } | null>(null);

  const addDiscount = () => {
    setDiscounts([...discounts, { id: Date.now(), value: "", type: "percent" }]);
  };

  const removeDiscount = (id: number) => {
    if (discounts.length > 1) {
      setDiscounts(discounts.filter((d) => d.id !== id));
    }
  };

  const updateDiscount = (id: number, field: keyof Discount, value: string) => {
    setDiscounts(
      discounts.map((d) => (d.id === id ? { ...d, [field]: value } : d))
    );
  };

  const calculate = () => {
    const price = parseFloat(originalPrice);
    if (isNaN(price) || price <= 0) return;

    let currentPrice = price;
    const breakdown: { discount: string; amount: number; newPrice: number }[] = [];
    let totalFixedDiscount = 0;
    let combinedPercent = 0;

    if (applyMethod === "sequential") {
      // Apply discounts one after another
      for (const discount of discounts) {
        const val = parseFloat(discount.value);
        if (isNaN(val) || val <= 0) continue;

        let discountAmount: number;
        if (discount.type === "percent") {
          discountAmount = currentPrice * (val / 100);
        } else {
          discountAmount = Math.min(val, currentPrice); // Can't discount more than price
        }

        currentPrice -= discountAmount;
        breakdown.push({
          discount: discount.type === "percent" ? `${val}%` : `$${val}`,
          amount: discountAmount,
          newPrice: currentPrice,
        });
      }
    } else {
      // Combine all discounts first
      for (const discount of discounts) {
        const val = parseFloat(discount.value);
        if (isNaN(val) || val <= 0) continue;

        if (discount.type === "percent") {
          combinedPercent += val;
        } else {
          totalFixedDiscount += val;
        }
      }

      // Apply percentage discount first, then fixed
      let percentAmount = price * (combinedPercent / 100);
      let afterPercent = price - percentAmount;

      let fixedAmount = Math.min(totalFixedDiscount, afterPercent);
      let finalPrice = afterPercent - fixedAmount;

      if (combinedPercent > 0) {
        breakdown.push({
          discount: `${combinedPercent}%`,
          amount: percentAmount,
          newPrice: afterPercent,
        });
      }
      if (totalFixedDiscount > 0) {
        breakdown.push({
          discount: `$${totalFixedDiscount}`,
          amount: fixedAmount,
          newPrice: finalPrice,
        });
      }

      currentPrice = finalPrice;
    }

    const totalSavings = price - currentPrice;
    const totalDiscountPercent = (totalSavings / price) * 100;

    setResult({
      originalPrice: price,
      finalPrice: Math.round(currentPrice * 100) / 100,
      totalSavings: Math.round(totalSavings * 100) / 100,
      totalDiscountPercent: Math.round(totalDiscountPercent * 100) / 100,
      breakdown,
    });
  };

  const reset = () => {
    setOriginalPrice("");
    setDiscounts([{ id: 1, value: "", type: "percent" }]);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Discount Stacking Calculator – Calculate Final Price After Multiple Discounts
          </h1>
          <p className="text-muted-foreground">
            Apply multiple discounts and see your true savings with our Discount Stacking
            Calculator. Whether it's a coupon plus a sale, or tiered pricing, instantly calculate
            the final price after stacking all discounts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="originalPrice">Original Price ($)</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  placeholder="e.g., 100"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Discount Application Method</Label>
                <Select value={applyMethod} onValueChange={(v) => setApplyMethod(v as "sequential" | "combined")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sequential">Sequential (One After Another)</SelectItem>
                    <SelectItem value="combined">Combined (All at Once)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Sequential: Each discount applies to the reduced price<br />
                  Combined: All discounts apply to original price
                </p>
              </div>

              <div className="space-y-3">
                <Label>Discounts</Label>
                {discounts.map((discount, index) => (
                  <div key={discount.id} className="flex gap-2 items-center">
                    <Input
                      type="number"
                      placeholder="Value"
                      value={discount.value}
                      onChange={(e) => updateDiscount(discount.id, "value", e.target.value)}
                      className="flex-1"
                    />
                    <Select
                      value={discount.type}
                      onValueChange={(v) => updateDiscount(discount.id, "type", v)}
                    >
                      <SelectTrigger className="w-[100px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percent">%</SelectItem>
                        <SelectItem value="fixed">$</SelectItem>
                      </SelectContent>
                    </Select>
                    {discounts.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDiscount(discount.id)}
                        className="text-destructive"
                      >
                        ×
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addDiscount} className="w-full">
                  + Add Another Discount
                </Button>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
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
              <h3 className="text-lg font-semibold mb-4">Discount Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Final Price</p>
                    <p className="text-3xl font-bold text-primary">${result.finalPrice.toFixed(2)}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Savings</p>
                      <p className="text-xl font-bold">${result.totalSavings.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Discount</p>
                      <p className="text-xl font-bold">{result.totalDiscountPercent}%</p>
                    </div>
                  </div>

                  {result.breakdown.length > 0 && (
                    <div className="border-t pt-4">
                      <p className="text-sm font-semibold mb-2">Discount Breakdown</p>
                      <div className="space-y-2">
                        {result.breakdown.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-sm p-2 bg-muted rounded">
                            <span>{item.discount} off</span>
                            <span className="text-muted-foreground">
                              -${item.amount.toFixed(2)} → ${item.newPrice.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Original Price</p>
                    <p className="text-lg font-bold">${result.originalPrice.toFixed(2)}</p>
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
                How to Use This Discount Stacking Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter the original price</p>
                    <p>Type the regular price before any discounts. For $89.99, enter "89.99". This is your starting point.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Add all applicable discounts</p>
                    <p>Enter each discount separately — sale price, coupon code, loyalty discount, etc. Choose percent (%) or fixed amount ($) for each. Click "Add Another Discount" for more.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Choose application method and calculate</p>
                    <p>Select sequential (most common) or combined. Click Calculate to see your final price, total savings, and how each discount affects the total.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Sequential vs. Combined Discounts
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Method</th>
                      <th className="text-left py-3 px-2 font-semibold">How It Works</th>
                      <th className="text-left py-3 px-2 font-semibold">Example: $100 with 20% + 10%</th>
                      <th className="text-left py-3 px-2 font-semibold">Final Price</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2 font-medium">Sequential</td>
                      <td className="py-3 px-2">Each discount applies to the reduced price from the previous discount</td>
                      <td className="py-3 px-2">$100 - 20% = $80, then $80 - 10% = $72</td>
                      <td className="py-3 px-2">$72 (28% total)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2 font-medium">Combined</td>
                      <td className="py-3 px-2">All percentage discounts add up, then apply once to original price</td>
                      <td className="py-3 px-2">$100 - 30% = $70</td>
                      <td className="py-3 px-2">$70 (30% total)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: Most retailers use sequential discounting. Combined discounting is rare and usually only happens when discounts are programmed to stack additively.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Discount Stacking
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  Discount stacking means applying multiple discounts to a single purchase. This happens when you use a coupon on a sale item, apply a loyalty discount, or use a promo code during checkout. The key question is: do the discounts add up, or do they apply one after another?
                </p>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why Sequential Discounts Don't Add Up</h4>
                  <p>
                    A 20% discount followed by a 10% discount doesn't equal 30% off. The first discount reduces the price, then the second discount applies to that lower amount. Mathematically: $100 x 0.80 x 0.90 = $72, not $70. You save 28%, not 30%.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">The Formula for Sequential Discounts</h4>
                  <p>
                    Final Price = Original x (1 - Discount1) x (1 - Discount2) x (1 - Discount3)... For three discounts of 30%, 20%, and 10%: $100 x 0.70 x 0.80 x 0.90 = $50.40. That's 49.6% off, not 60%.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Mixing Percent and Fixed Discounts</h4>
                  <p>
                    When you have both percentage and fixed-dollar discounts, order matters. Typically, percentage discounts apply first, then fixed amounts. A $100 item with 20% off plus $10 off: $100 - 20% = $80, then $80 - $10 = $70.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">When Stores Say "Cannot Be Combined"</h4>
                  <p>
                    This means you must choose one discount — you can't stack them. Often the register automatically applies the best single discount. Some stores allow stacking a percent-off coupon with a fixed-dollar reward, but not two percent-off coupons.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Common Discount Stacking Scenarios
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Scenario</th>
                      <th className="text-left py-3 px-2 font-semibold">Discounts</th>
                      <th className="text-left py-3 px-2 font-semibold">On $100</th>
                      <th className="text-left py-3 px-2 font-semibold">Total Savings</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Sale + Coupon</td>
                      <td className="py-3 px-2">40% off + 10% off</td>
                      <td className="py-3 px-2">$54 (sequential)</td>
                      <td className="py-3 px-2">$46 (46%)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Clearance + Rewards</td>
                      <td className="py-3 px-2">50% off + $15 reward</td>
                      <td className="py-3 px-2">$35 (sequential)</td>
                      <td className="py-3 px-2">$65 (65%)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Triple Stack</td>
                      <td className="py-3 px-2">30% + 20% + 15%</td>
                      <td className="py-3 px-2">$47.60 (sequential)</td>
                      <td className="py-3 px-2">$52.40 (52.4%)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Percent + Fixed</td>
                      <td className="py-3 px-2">25% off + $20 off</td>
                      <td className="py-3 px-2">$55 (sequential)</td>
                      <td className="py-3 px-2">$45 (45%)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">BOGO + Coupon</td>
                      <td className="py-3 px-2">50% off second + 10% off total</td>
                      <td className="py-3 px-2">$67.50 (two $50 items)</td>
                      <td className="py-3 px-2">$32.50 (32.5%)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips for Maximizing Discount Stacking
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Read the Fine Print on Coupons</p>
                    <p>Some coupons say "cannot be combined with other offers." Others say "valid on sale items." The wording determines if stacking is allowed. Store policies vary widely.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Stack Store Credit Card Discounts</p>
                    <p>Many stores offer an extra 10-25% off for opening a store credit card. This usually stacks with sale prices. Just make sure you can pay it off immediately to avoid interest.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Use Cashback Portals on Top of Discounts</p>
                    <p>Rakuten, TopCashback, and similar portals give 1-10% cashback on purchases. This stacks with everything because it's a rebate after purchase, not a discount at checkout.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Time Your Purchases for Maximum Stacking</p>
                    <p>Holiday weekends often have stackable offers: site-wide sales + extra coupon codes + cashback portal bonuses. Black Friday, Cyber Monday, and end-of-season clearances are prime stacking opportunities.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Know When Stacking Isn't Worth It</p>
                    <p>Don't open a store credit card just for a one-time discount unless you're making a huge purchase. Don't buy items you don't need just because they're on sale. A 50% discount on something useless is still a 100% waste.</p>
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
    question: "Do most stores allow discount stacking?",
    answer: "It depends on the store. Department stores and clothing retailers often allow stacking a sale price with a coupon. Electronics stores are stricter. Always check the coupon terms — \"cannot be combined\" means no stacking.",
  },
{
    question: "Why isn't 20% + 20% equal to 40% off?",
    answer: "Because the second 20% applies to the already-discounted price, not the original. $100 - 20% = $80. Then $80 - 20% = $64. You saved $36, which is 36% off, not 40%. This is how sequential discounts work.",
  },
{
    question: "Can I stack manufacturer and store coupons?",
    answer: "Many grocery and drug stores allow this. A manufacturer coupon plus a store coupon on the same item is common. Some stores also let you stack a third discount like a loyalty reward or app coupon.",
  },
{
    question: "What's the best order to apply discounts?",
    answer: "If you have control, apply percentage discounts first, then fixed-dollar discounts. This maximizes savings. However, most POS systems have a fixed order you can't change.",
  },
{
    question: "Do cashback apps count as discount stacking?",
    answer: "Yes, and they're the best kind because they don't affect the checkout total. Apps like Ibotta, Fetch Rewards, and Rakuten give cash back after purchase, stacking on top of any in-store discounts you already used.",
  }
  ]} />
</section>

        </div>
      </div>
    </div>
  );
}
