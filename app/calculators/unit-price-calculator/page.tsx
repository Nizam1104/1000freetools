"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UnitPriceCalculatorPage() {
  const [totalQuantity, setTotalQuantity] = useState<string>("");
  const [totalCost, setTotalCost] = useState<string>("");
  const [unit, setUnit] = useState<string>("units");
  const [result, setResult] = useState<{
    pricePerUnit: number;
    pricePerHundred: number;
    pricePerThousand: number;
  } | null>(null);

  const calculateUnitPrice = () => {
    const quantity = parseFloat(totalQuantity);
    const cost = parseFloat(totalCost);

    if (isNaN(quantity) || isNaN(cost) || quantity <= 0 || cost <= 0) {
      return;
    }

    const pricePerUnit = cost / quantity;
    const pricePerHundred = pricePerUnit * 100;
    const pricePerThousand = pricePerUnit * 1000;

    setResult({
      pricePerUnit,
      pricePerHundred,
      pricePerThousand,
    });
  };

  const reset = () => {
    setTotalQuantity("");
    setTotalCost("");
    setUnit("units");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Unit Price Calculator</h1>
          <p className="text-muted-foreground">
            Calculate the cost per unit of any product or purchase. Enter total quantity and total cost to find the per-unit price and assess cost efficiency.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="totalQuantity">Total Quantity</Label>
                <Input
                  id="totalQuantity"
                  type="number"
                  placeholder="Enter quantity"
                  value={totalQuantity}
                  onChange={(e) => setTotalQuantity(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="totalCost">Total Cost</Label>
                <Input
                  id="totalCost"
                  type="number"
                  placeholder="Enter total cost"
                  value={totalCost}
                  onChange={(e) => setTotalCost(e.target.value)}
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
                <Button onClick={calculateUnitPrice} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Price Per {unit}</p>
                    <p className="text-3xl font-bold text-primary">${result.pricePerUnit.toFixed(4)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Price Per 100</p>
                      <p className="text-lg font-bold">${result.pricePerHundred.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Price Per 1,000</p>
                      <p className="text-lg font-bold">${result.pricePerThousand.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>{totalQuantity} {unit} for ${parseFloat(totalCost).toFixed(2)}</p>
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

        {/* How It Works Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-6">How to Calculate Unit Price</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-semibold mb-2">Enter Total Quantity</h3>
                <p className="text-sm text-muted-foreground">Input the total amount of product - weight, volume, or count of items.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-semibold mb-2">Input Total Cost</h3>
                <p className="text-sm text-muted-foreground">Enter the total price you&apos;re paying for the entire quantity.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-semibold mb-2">Compare Prices</h3>
                <p className="text-sm text-muted-foreground">Get price per unit, per 100, and per 1,000 for easy comparison shopping.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Key Features of This Unit Price Calculator</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">**Multiple Unit Types**</h3>
              <p className="text-sm text-muted-foreground">Support for pounds, kilograms, ounces, grams, liters, milliliters, pieces, and more.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">**Bulk Pricing**</h3>
              <p className="text-sm text-muted-foreground">Shows price per 100 and per 1,000 units for wholesale and bulk purchase comparisons.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">**Smart Shopping Tool**</h3>
              <p className="text-sm text-muted-foreground">Compare different package sizes to find the best value for your money.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">**Free & Instant**</h3>
              <p className="text-sm text-muted-foreground">No registration needed. Calculate unit prices quickly while shopping.</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">What is unit price?</h3>
              <p className="text-sm text-muted-foreground">Unit price is the cost per single unit of measurement (per ounce, per pound, per item). It helps you compare products of different sizes to find the best value.</p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">How do I calculate unit price?</h3>
              <p className="text-sm text-muted-foreground">Divide the total price by the total quantity. For example, if a 16 oz jar costs $4, the unit price is $4 ÷ 16 = $0.25 per ounce.</p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">Why is unit price important for shopping?</h3>
              <p className="text-sm text-muted-foreground">Unit price reveals the true cost comparison between different package sizes. A larger package isn&apos;t always cheaper per unit - unit price tells you for sure.</p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">What&apos;s the difference between price per 100 and price per 1,000?</h3>
              <p className="text-sm text-muted-foreground">These are convenient scales for different products. Price per 100 works well for medium quantities, while price per 1,000 is useful for bulk/wholesale items.</p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">Can I use this for comparison shopping?</h3>
              <p className="text-sm text-muted-foreground">Absolutely! Calculate unit prices for different brands and sizes, then compare. The lowest unit price gives you the best value (assuming similar quality).</p>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
      </div>
    </div>
  );
}
