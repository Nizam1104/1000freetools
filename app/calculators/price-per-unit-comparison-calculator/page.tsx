"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PricePerUnitComparisonCalculatorPage() {
  const [product1Quantity, setProduct1Quantity] = useState<string>("");
  const [product1Cost, setProduct1Cost] = useState<string>("");
  const [product2Quantity, setProduct2Quantity] = useState<string>("");
  const [product2Cost, setProduct2Cost] = useState<string>("");
  const [unit, setUnit] = useState<string>("units");
  const [result, setResult] = useState<{
    product1UnitPrice: number;
    product2UnitPrice: number;
    betterValue: string;
    savings: number;
    savingsPercent: number;
  } | null>(null);

  const calculateComparison = () => {
    const qty1 = parseFloat(product1Quantity);
    const cost1 = parseFloat(product1Cost);
    const qty2 = parseFloat(product2Quantity);
    const cost2 = parseFloat(product2Cost);

    if (isNaN(qty1) || isNaN(cost1) || isNaN(qty2) || isNaN(cost2) || qty1 <= 0 || qty2 <= 0 || cost1 <= 0 || cost2 <= 0) {
      return;
    }

    const unitPrice1 = cost1 / qty1;
    const unitPrice2 = cost2 / qty2;
    const betterValue = unitPrice1 < unitPrice2 ? "Product 1" : "Product 2";
    const savings = Math.abs(unitPrice1 - unitPrice2);
    const savingsPercent = (savings / Math.max(unitPrice1, unitPrice2)) * 100;

    setResult({
      product1UnitPrice: unitPrice1,
      product2UnitPrice: unitPrice2,
      betterValue,
      savings,
      savingsPercent,
    });
  };

  const reset = () => {
    setProduct1Quantity("");
    setProduct1Cost("");
    setProduct2Quantity("");
    setProduct2Cost("");
    setUnit("units");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Price-Per-Unit Comparison Calculator</h1>
          <p className="text-muted-foreground">
            Find the best value buy every time. Compare two or more products by normalizing their prices to a common unit to instantly identify the most cost-effective option.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="pt-2">
                <Label className="text-lg font-semibold text-primary">Product 1</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="product1Quantity">Quantity</Label>
                <Input
                  id="product1Quantity"
                  type="number"
                  placeholder="Enter quantity"
                  value={product1Quantity}
                  onChange={(e) => setProduct1Quantity(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product1Cost">Total Cost</Label>
                <Input
                  id="product1Cost"
                  type="number"
                  placeholder="Enter cost"
                  value={product1Cost}
                  onChange={(e) => setProduct1Cost(e.target.value)}
                />
              </div>

              <div className="pt-4 border-t">
                <Label className="text-lg font-semibold text-primary">Product 2</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="product2Quantity">Quantity</Label>
                <Input
                  id="product2Quantity"
                  type="number"
                  placeholder="Enter quantity"
                  value={product2Quantity}
                  onChange={(e) => setProduct2Quantity(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product2Cost">Total Cost</Label>
                <Input
                  id="product2Cost"
                  type="number"
                  placeholder="Enter cost"
                  value={product2Cost}
                  onChange={(e) => setProduct2Cost(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit">Unit Type</Label>
                <select
                  id="unit"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                >
                  <option value="units">Units</option>
                  <option value="lbs">Pounds (lbs)</option>
                  <option value="kg">Kilograms (kg)</option>
                  <option value="oz">Ounces (oz)</option>
                  <option value="g">Grams (g)</option>
                  <option value="liters">Liters</option>
                  <option value="ml">Milliliters</option>
                  <option value="pieces">Pieces</option>
                </select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateComparison} className="flex-1">
                  Compare
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Comparison Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${result.betterValue === 'Product 1' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-blue-100 dark:bg-blue-900/20'}`}>
                    <p className="text-sm text-muted-foreground">Better Value</p>
                    <p className={`text-2xl font-bold ${result.betterValue === 'Product 1' ? 'text-green-600' : 'text-blue-600'}`}>
                      {result.betterValue}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Product 1 Unit Price</p>
                      <p className="text-lg font-bold">${result.product1UnitPrice.toFixed(4)}/{unit}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Product 2 Unit Price</p>
                      <p className="text-lg font-bold">${result.product2UnitPrice.toFixed(4)}/{unit}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Savings Per Unit</p>
                    <p className="text-lg font-bold text-green-600">${result.savings.toFixed(4)} ({result.savingsPercent.toFixed(1)}%)</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Compare prices at the same unit level to find the best deal</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter values and click Compare to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>How to Compare Price Per Unit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
              <div>
                <p className="font-semibold mb-1">Enter product 1 details</p>
                <p className="text-sm text-muted-foreground">Input the quantity and total price for the first product.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
              <div>
                <p className="font-semibold mb-1">Enter product 2 details</p>
                <p className="text-sm text-muted-foreground">Input the quantity and total price for the second product.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
              <div>
                <p className="font-semibold mb-1">Get the better value</p>
                <p className="text-sm text-muted-foreground">See which product costs less per unit and how much you'll save.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Why Compare Unit Prices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="font-semibold mb-1">Smart shopping</p>
                <p className="text-sm text-muted-foreground">Avoid marketing tricks and find the true best deal every time.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Bulk buying decisions</p>
                <p className="text-sm text-muted-foreground">Know if bigger packages actually save money or cost more.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Brand comparison</p>
                <p className="text-sm text-muted-foreground">Compare name brands vs generics on equal footing.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Multiple unit support</p>
                <p className="text-sm text-muted-foreground">Works with pounds, ounces, grams, liters, pieces, and more.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Instant savings calculation</p>
                <p className="text-sm text-muted-foreground">See exactly how much you save per unit with the better option.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="font-semibold mb-1">How do I calculate price per unit?</p>
                <p className="text-sm text-muted-foreground">Divide total price by quantity. For $5.99 for 20 oz: $5.99 / 20 = $0.30 per ounce.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Is bulk always cheaper?</p>
                <p className="text-sm text-muted-foreground">Not always. Sometimes smaller packages have better unit prices due to sales or promotions.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">What unit should I compare?</p>
                <p className="text-sm text-muted-foreground">Use the same unit for both products. Compare oz to oz, lb to lb, or piece to piece.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">How much can I save by comparing?</p>
                <p className="text-sm text-muted-foreground">Grocery shoppers can save 10-30% on bills by consistently choosing better unit prices.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Does brand matter for unit price?</p>
                <p className="text-sm text-muted-foreground">Generic brands often have lower unit prices with similar quality to name brands.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Related Shopping Calculators</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Try our other money-saving tools: the <a href="/calculators/discount-calculator" className="text-primary hover:underline">discount calculator</a> for sale prices.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
