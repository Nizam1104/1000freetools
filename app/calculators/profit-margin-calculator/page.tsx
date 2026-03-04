"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
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

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Profit Margin Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Choose your calculation mode</p>
                    <p>Select "Calculate Margin" to find profit percentage from cost and price, or "Calculate Price" to determine selling price from cost and desired margin.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter your values</p>
                    <p>Input your cost of goods sold (COGS) and either the selling price or target margin percentage depending on your selected mode.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Review your results</p>
                    <p>See gross profit, margin percentage, markup percentage, and break-even price to make informed pricing decisions.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Key Features of This Calculator
              </h3>
              <div className="space-y-4 text-sm">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="font-medium text-foreground mb-1">Dual Calculation Modes</p>
                  <p className="text-muted-foreground">Switch between calculating margin from price or calculating optimal price from desired margin</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="font-medium text-foreground mb-1">Margin vs Markup Comparison</p>
                  <p className="text-muted-foreground">See both metrics side by side — crucial since they're often confused but give different percentages</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="font-medium text-foreground mb-1">Break-Even Analysis</p>
                  <p className="text-muted-foreground">Know the minimum price needed to cover costs before making any profit</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="font-medium text-foreground mb-1">Real-Time Calculations</p>
                  <p className="text-muted-foreground">Results update automatically as you type — no need to click calculate repeatedly</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Profit Margin Benchmarks by Industry
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Industry</th>
                      <th className="text-left py-3 px-2 font-semibold">Avg Gross Margin</th>
                      <th className="text-left py-3 px-2 font-semibold">Avg Net Margin</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Software/SaaS</td>
                      <td className="py-3 px-2">70-85%</td>
                      <td className="py-3 px-2">15-25%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Retail</td>
                      <td className="py-3 px-2">25-50%</td>
                      <td className="py-3 px-2">2-5%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Restaurants</td>
                      <td className="py-3 px-2">60-70%</td>
                      <td className="py-3 px-2">3-5%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Manufacturing</td>
                      <td className="py-3 px-2">20-40%</td>
                      <td className="py-3 px-2">5-10%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">E-commerce</td>
                      <td className="py-3 px-2">40-60%</td>
                      <td className="py-3 px-2">5-10%</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Consulting</td>
                      <td className="py-3 px-2">70-90%</td>
                      <td className="py-3 px-2">15-30%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: Gross margin varies widely within industries. Net margin accounts for all operating expenses.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">What is a good profit margin?</h4>
                  <p>
                    It depends on your industry. A 10% net margin is average across all businesses. Software companies often achieve 20%+, while grocery stores operate on 1-3%. Focus on your industry benchmark and improving your own margins over time.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How do I increase my profit margin?</h4>
                  <p>
                    Raise prices (if the market allows), negotiate better supplier costs, reduce waste, improve operational efficiency, or shift to higher-margin products. Small price increases often have the biggest impact since they flow directly to profit.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why is markup higher than margin?</h4>
                  <p>
                    Markup is calculated from cost (the smaller number), while margin is calculated from price (the larger number). A 50% markup on a $50 cost gives a $75 price, but that's only a 33% margin because $25 profit divided by $75 price equals 33%.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Should I use margin or markup for pricing?</h4>
                  <p>
                    Use margin for financial analysis and reporting — it's the standard metric investors and lenders expect. Use markup for quick pricing decisions and when communicating with sales teams who think in terms of "adding X% to cost."
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What's the difference between gross and net margin?</h4>
                  <p>
                    Gross margin only considers cost of goods sold. Net margin accounts for all expenses — rent, salaries, marketing, taxes, everything. Gross margin shows product profitability; net margin shows overall business profitability.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Related Tools
              </h3>
              <div className="space-y-2 text-sm">
                <a
                  href="/calculators/markup-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Markup Calculator</span>
                  <p className="text-muted-foreground">Calculate markup percentage and selling price from cost</p>
                </a>
                <a
                  href="/calculators/break-even-point-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Break-Even Point Calculator</span>
                  <p className="text-muted-foreground">Find the sales volume needed to cover all costs</p>
                </a>
                <a
                  href="/calculators/roi-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">ROI Calculator</span>
                  <p className="text-muted-foreground">Calculate return on investment for business decisions</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
