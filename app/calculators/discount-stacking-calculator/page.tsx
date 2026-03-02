"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h3 className="text-lg font-semibold mb-3">Understanding Discount Stacking</h3>
          <p className="text-muted-foreground text-sm mb-3">
            <strong>Sequential discounts</strong> apply one after another, each reducing the already
            discounted price. This is how most stores apply multiple discounts.
          </p>
          <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
            <div>Example: $100 with 20% + 10% sequential:</div>
            <div>Step 1: $100 - 20% = $80</div>
            <div>Step 2: $80 - 10% = $72 (Final)</div>
            <div className="mt-2 text-muted-foreground">
              Note: This is NOT the same as 30% off ($70)
            </div>
          </div>
          <p className="text-muted-foreground text-sm mt-3">
            <strong>Tip:</strong> Sequential discounts always result in less total savings than the
            sum of individual percentages.
          </p>
        </div>
      </div>
    </div>
  );
}
