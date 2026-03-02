"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TrendingUp, DollarSign, Percent, Info, Calculator } from "lucide-react";

interface ProfitMarginResult {
  grossProfit: number;
  marginPercent: number;
  markupPercent: number;
  breakEvenPrice: number;
}

export default function ProfitMarginCalculatorPage() {
  const [cost, setCost] = useState<string>("");
  const [revenue, setRevenue] = useState<string>("");
  const [desiredMargin, setDesiredMargin] = useState<string>("");
  const [calculateMode, setCalculateMode] = useState<"margin" | "price">("margin");
  const [result, setResult] = useState<ProfitMarginResult | null>(null);
  const [priceResult, setPriceResult] = useState<{ sellingPrice: number; profit: number } | null>(null);

  const calculateMargin = () => {
    const costValue = parseFloat(cost);
    const revenueValue = parseFloat(revenue);

    if (isNaN(costValue) || isNaN(revenueValue) || costValue === 0) {
      return;
    }

    const grossProfit = revenueValue - costValue;
    const marginPercent = (grossProfit / revenueValue) * 100;
    const markupPercent = (grossProfit / costValue) * 100;
    const breakEvenPrice = costValue;

    setResult({
      grossProfit: Math.round(grossProfit * 100) / 100,
      marginPercent: Math.round(marginPercent * 100) / 100,
      markupPercent: Math.round(markupPercent * 100) / 100,
      breakEvenPrice: Math.round(breakEvenPrice * 100) / 100,
    });
  };

  const calculatePrice = () => {
    const costValue = parseFloat(cost);
    const marginValue = parseFloat(desiredMargin);

    if (isNaN(costValue) || isNaN(marginValue) || marginValue >= 100) {
      return;
    }

    const sellingPrice = costValue / (1 - (marginValue / 100));
    const profit = sellingPrice - costValue;

    setPriceResult({
      sellingPrice: Math.round(sellingPrice * 100) / 100,
      profit: Math.round(profit * 100) / 100,
    });
  };

  const reset = () => {
    setCost("");
    setRevenue("");
    setDesiredMargin("");
    setResult(null);
    setPriceResult(null);
  };

  useEffect(() => {
    if (calculateMode === "margin") {
      calculateMargin();
    } else {
      calculatePrice();
    }
  }, [cost, revenue, desiredMargin, calculateMode]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Profit Margin Calculator – Calculate Gross Profit & Markup</h1>
          <p className="text-muted-foreground">
            Calculate profit margins, markup percentages, and optimal selling prices with our comprehensive Profit Margin Calculator. Essential for business owners, retailers, and anyone analyzing product profitability.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6 space-y-6">
              <div className="flex gap-4">
                <Button
                  variant={calculateMode === "margin" ? "default" : "outline"}
                  onClick={() => setCalculateMode("margin")}
                  className="flex-1"
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate Margin
                </Button>
                <Button
                  variant={calculateMode === "price" ? "default" : "outline"}
                  onClick={() => setCalculateMode("price")}
                  className="flex-1"
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  Calculate Price
                </Button>
              </div>

              {calculateMode === "margin" ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Calculate Profit Margin</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cost">Cost / COGS ($)</Label>
                      <Input
                        id="cost"
                        type="number"
                        placeholder="e.g., 50"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="revenue">Selling Price / Revenue ($)</Label>
                      <Input
                        id="revenue"
                        type="number"
                        placeholder="e.g., 75"
                        value={revenue}
                        onChange={(e) => setRevenue(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Calculate Selling Price</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cost-price">Cost / COGS ($)</Label>
                      <Input
                        id="cost-price"
                        type="number"
                        placeholder="e.g., 50"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="margin">Desired Profit Margin (%)</Label>
                      <Input
                        id="margin"
                        type="number"
                        placeholder="e.g., 30"
                        min="0"
                        max="99"
                        value={desiredMargin}
                        onChange={(e) => setDesiredMargin(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  {calculateMode === "margin" 
                    ? "Margin is profit as a percentage of selling price. Markup is profit as a percentage of cost."
                    : "Enter your cost and desired margin to find the optimal selling price."}
                </AlertDescription>
              </Alert>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateMode === "margin" ? calculateMargin : calculatePrice} className="flex-1">
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
              {calculateMode === "margin" && result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${result.grossProfit >= 0 ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                    <p className="text-sm text-muted-foreground">Gross Profit</p>
                    <p className={`text-3xl font-bold ${result.grossProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      ${result.grossProfit}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Profit Margin</p>
                      <p className="text-xl font-bold">{result.marginPercent}%</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Markup</p>
                      <p className="text-xl font-bold">{result.markupPercent}%</p>
                    </div>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground">Break-even Price</p>
                    <p className="text-lg font-bold">${result.breakEvenPrice}</p>
                  </div>

                  <div className="text-xs text-muted-foreground pt-4 border-t">
                    <p><strong>Formulas:</strong></p>
                    <p className="font-mono text-xs mt-1">Margin = (Revenue - Cost) / Revenue × 100%</p>
                    <p className="font-mono text-xs">Markup = (Revenue - Cost) / Cost × 100%</p>
                  </div>
                </div>
              ) : calculateMode === "price" && priceResult ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Selling Price</p>
                    <p className="text-4xl font-bold text-primary">${priceResult.sellingPrice}</p>
                  </div>

                  <div className="p-3 bg-green-500/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Profit at this Price</p>
                    <p className="text-2xl font-bold text-green-500">${priceResult.profit}</p>
                  </div>

                  <div className="text-xs text-muted-foreground pt-4 border-t">
                    <p><strong>Formula:</strong></p>
                    <p className="font-mono text-xs mt-1">Price = Cost / (1 - Margin%)</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter values and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Margin vs Markup: What's the Difference?</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4">Aspect</th>
                    <th className="text-left py-2 pr-4">Profit Margin</th>
                    <th className="text-left py-2">Markup</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-medium">Formula</td>
                    <td className="py-2 pr-4 font-mono text-xs">(Price - Cost) / Price</td>
                    <td className="py-2 font-mono text-xs">(Price - Cost) / Cost</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-medium">Based on</td>
                    <td className="py-2 pr-4">Selling Price</td>
                    <td className="py-2">Cost</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-medium">Example: $50 cost, $75 price</td>
                    <td className="py-2 pr-4">33.3% margin</td>
                    <td className="py-2">50% markup</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Use case</td>
                    <td className="py-2 pr-4">Financial analysis</td>
                    <td className="py-2">Pricing decisions</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
