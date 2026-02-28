"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
      </div>
    </div>
  );
}
