"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function StockSplitCalculatorPage() {
  const [currentShares, setCurrentShares] = useState<string>("");
  const [currentPrice, setCurrentPrice] = useState<string>("");
  const [splitRatio, setSplitRatio] = useState<string>("");
  const [result, setResult] = useState<{
    newShares: number;
    newPrice: number;
    oldValue: number;
    newValue: number;
  } | null>(null);

  const calculateStockSplit = () => {
    const shares = parseFloat(currentShares);
    const price = parseFloat(currentPrice);
    const ratio = parseFloat(splitRatio);

    if (isNaN(shares) || isNaN(price) || isNaN(ratio) || shares <= 0 || price <= 0 || ratio <= 0) {
      return;
    }

    const newShares = shares * ratio;
    const newPrice = price / ratio;
    const oldValue = shares * price;
    const newValue = newShares * newPrice;

    setResult({
      newShares,
      newPrice,
      oldValue,
      newValue,
    });
  };

  const reset = () => {
    setCurrentShares("");
    setCurrentPrice("");
    setSplitRatio("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Stock Split Calculator</h1>
          <p className="text-muted-foreground">
            Calculate your new share count and adjusted price per share after a forward stock split. Enter the split ratio and your current holdings for an instant update.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentShares">Current Number of Shares</Label>
                <Input
                  id="currentShares"
                  type="number"
                  placeholder="Enter share count"
                  value={currentShares}
                  onChange={(e) => setCurrentShares(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentPrice">Current Price Per Share</Label>
                <Input
                  id="currentPrice"
                  type="number"
                  placeholder="Enter current price"
                  value={currentPrice}
                  onChange={(e) => setCurrentPrice(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="splitRatio">Split Ratio (e.g., 2 for 2:1 split)</Label>
                <Input
                  id="splitRatio"
                  type="number"
                  step="0.01"
                  placeholder="Enter split ratio"
                  value={splitRatio}
                  onChange={(e) => setSplitRatio(e.target.value)}
                />
              </div>

              <div className="pt-4">
                <div className="text-sm text-muted-foreground">
                  <p>Common split ratios:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>2:1 - Double shares, half price</li>
                    <li>3:1 - Triple shares, third price</li>
                    <li>4:1 - Quadruple shares, quarter price</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateStockSplit} className="flex-1">
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
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Old Shares</p>
                      <p className="text-lg font-bold">{parseFloat(currentShares).toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <p className="text-sm text-muted-foreground">New Shares</p>
                      <p className="text-lg font-bold text-primary">{result.newShares.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Old Price</p>
                      <p className="text-lg font-bold">${parseFloat(currentPrice).toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <p className="text-sm text-muted-foreground">New Price</p>
                      <p className="text-lg font-bold text-primary">${result.newPrice.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Value</p>
                    <p className="text-lg font-bold text-green-600">${result.newValue.toFixed(2)} (unchanged)</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Split ratio: {splitRatio}:1 | Shares increased by {((result.newShares / parseFloat(currentShares)) - 1) * 100}%</p>
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
