"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
      </div>
    </div>
  );
}
