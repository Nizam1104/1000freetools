"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RoyaltyCalculatorPage() {
  const [unitsSold, setUnitsSold] = useState<string>("");
  const [pricePerUnit, setPricePerUnit] = useState<string>("");
  const [royaltyRate, setRoyaltyRate] = useState<string>("");
  const [deductions, setDeductions] = useState<string>("");
  const [result, setResult] = useState<{
    grossRevenue: number;
    royaltyEarnings: number;
    afterDeductions: number;
  } | null>(null);

  const calculateRoyalty = () => {
    const units = parseFloat(unitsSold);
    const price = parseFloat(pricePerUnit);
    const rate = parseFloat(royaltyRate) / 100;
    const deduct = parseFloat(deductions) || 0;

    if (isNaN(units) || isNaN(price) || isNaN(rate) || units <= 0 || price <= 0 || rate <= 0) {
      return;
    }

    const grossRevenue = units * price;
    const royaltyEarnings = grossRevenue * rate;
    const afterDeductions = royaltyEarnings - deduct;

    setResult({
      grossRevenue,
      royaltyEarnings,
      afterDeductions: Math.max(0, afterDeductions),
    });
  };

  const reset = () => {
    setUnitsSold("");
    setPricePerUnit("");
    setRoyaltyRate("");
    setDeductions("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Royalty Calculator</h1>
          <p className="text-muted-foreground">
            Estimate your royalty earnings from sales or revenue. Enter units sold or total revenue, royalty rate, and any applicable deductions to calculate your payout.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="unitsSold">Units Sold</Label>
                <Input
                  id="unitsSold"
                  type="number"
                  placeholder="Enter units sold"
                  value={unitsSold}
                  onChange={(e) => setUnitsSold(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pricePerUnit">Price Per Unit</Label>
                <Input
                  id="pricePerUnit"
                  type="number"
                  placeholder="Enter price per unit"
                  value={pricePerUnit}
                  onChange={(e) => setPricePerUnit(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="royaltyRate">Royalty Rate (%)</Label>
                <Input
                  id="royaltyRate"
                  type="number"
                  placeholder="Enter royalty percentage"
                  value={royaltyRate}
                  onChange={(e) => setRoyaltyRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deductions">Deductions</Label>
                <Input
                  id="deductions"
                  type="number"
                  placeholder="Enter any deductions"
                  value={deductions}
                  onChange={(e) => setDeductions(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateRoyalty} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Royalty Earnings</p>
                    <p className="text-3xl font-bold text-primary">${result.royaltyEarnings.toFixed(2)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Gross Revenue</p>
                      <p className="text-lg font-bold">${result.grossRevenue.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Deductions</p>
                      <p className="text-lg font-bold">${(parseFloat(deductions) || 0).toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Net Payout</p>
                    <p className="text-lg font-bold text-green-600">${result.afterDeductions.toFixed(2)}</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Based on {unitsSold} units × ${parseFloat(pricePerUnit).toFixed(2)} × {royaltyRate}%</p>
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
