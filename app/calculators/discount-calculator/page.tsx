"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DiscountCalculatorPage() {
  const [originalPrice, setOriginalPrice] = useState<string>("");
  const [discountPercent, setDiscountPercent] = useState<string>("");
  const [result, setResult] = useState<{
    discountedPrice: number;
    savingsAmount: number;
  } | null>(null);

  const calculateDiscount = () => {
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercent);

    if (isNaN(price) || isNaN(discount) || price <= 0 || discount < 0 || discount > 100) {
      return;
    }

    const savingsAmount = price * (discount / 100);
    const discountedPrice = price - savingsAmount;

    setResult({ discountedPrice, savingsAmount });
  };

  const reset = () => {
    setOriginalPrice("");
    setDiscountPercent("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Discount Calculator</h1>
          <p className="text-muted-foreground">
            Instantly find the sale price, amount saved, and percentage off for any discount. Perfect for shopping, pricing, and deal comparisons.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="originalPrice">Original Price</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  placeholder="Enter original price"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="discountPercent">Discount Percentage (%)</Label>
                <Input
                  id="discountPercent"
                  type="number"
                  placeholder="Enter discount percentage"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateDiscount} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Discounted Price</p>
                    <p className="text-3xl font-bold text-primary">${result.discountedPrice.toFixed(2)}</p>
                  </div>
                  <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">You Save</p>
                    <p className="text-xl font-bold text-green-600">${result.savingsAmount.toFixed(2)} ({discountPercent}%)</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Original Price: ${parseFloat(originalPrice).toFixed(2)}</p>
                    <p>Discount: {discountPercent}%</p>
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
      </div>
    </div>
  );
}
