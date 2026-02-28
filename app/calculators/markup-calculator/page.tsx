"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function MarkupCalculatorPage() {
  const [costPrice, setCostPrice] = useState<string>("");
  const [markupPercent, setMarkupPercent] = useState<string>("");
  const [result, setResult] = useState<{
    sellingPrice: number;
    markupAmount: number;
    profitMargin: number;
  } | null>(null);

  const calculateMarkup = () => {
    const cost = parseFloat(costPrice);
    const markup = parseFloat(markupPercent);

    if (isNaN(cost) || isNaN(markup) || cost <= 0 || markup < 0) {
      return;
    }

    const markupAmount = cost * (markup / 100);
    const sellingPrice = cost + markupAmount;
    const profitMargin = (markupAmount / sellingPrice) * 100;

    setResult({ sellingPrice, markupAmount, profitMargin });
  };

  const reset = () => {
    setCostPrice("");
    setMarkupPercent("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Markup Calculator</h1>
          <p className="text-muted-foreground">
            Calculate selling price and markup percentage from cost and desired profit, or reverse-calculate cost from price and markup. Essential for pricing strategy.
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
                <Label htmlFor="markupPercent">Markup Percentage (%)</Label>
                <Input
                  id="markupPercent"
                  type="number"
                  placeholder="Enter markup percentage"
                  value={markupPercent}
                  onChange={(e) => setMarkupPercent(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateMarkup} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Selling Price</p>
                    <p className="text-3xl font-bold text-primary">${result.sellingPrice.toFixed(2)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Markup Amount</p>
                      <p className="text-lg font-bold">${result.markupAmount.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Profit Margin</p>
                      <p className="text-lg font-bold">{result.profitMargin.toFixed(2)}%</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Cost: ${parseFloat(costPrice).toFixed(2)} | Markup: {markupPercent}%</p>
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
