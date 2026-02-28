"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BreakEvenPointCalculatorPage() {
  const [fixedCosts, setFixedCosts] = useState<string>("");
  const [variableCostPerUnit, setVariableCostPerUnit] = useState<string>("");
  const [sellingPricePerUnit, setSellingPricePerUnit] = useState<string>("");
  const [result, setResult] = useState<{
    breakEvenUnits: number;
    breakEvenRevenue: number;
    contributionMargin: number;
  } | null>(null);

  const calculateBreakEven = () => {
    const FC = parseFloat(fixedCosts);
    const VC = parseFloat(variableCostPerUnit);
    const SP = parseFloat(sellingPricePerUnit);

    if (isNaN(FC) || isNaN(VC) || isNaN(SP) || FC < 0 || VC < 0 || SP <= 0) {
      return;
    }

    const contributionMargin = SP - VC;

    if (contributionMargin <= 0) {
      return;
    }

    const breakEvenUnits = Math.ceil(FC / contributionMargin);
    const breakEvenRevenue = breakEvenUnits * SP;

    setResult({ breakEvenUnits, breakEvenRevenue, contributionMargin });
  };

  const reset = () => {
    setFixedCosts("");
    setVariableCostPerUnit("");
    setSellingPricePerUnit("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Break-Even Point Calculator</h1>
          <p className="text-muted-foreground">
            Find the exact number of units you need to sell to cover all costs. Calculate your break-even point from fixed costs, variable costs, and selling price.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fixedCosts">Fixed Costs</Label>
                <Input
                  id="fixedCosts"
                  type="number"
                  placeholder="Enter total fixed costs"
                  value={fixedCosts}
                  onChange={(e) => setFixedCosts(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="variableCostPerUnit">Variable Cost Per Unit</Label>
                <Input
                  id="variableCostPerUnit"
                  type="number"
                  placeholder="Enter variable cost per unit"
                  value={variableCostPerUnit}
                  onChange={(e) => setVariableCostPerUnit(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sellingPricePerUnit">Selling Price Per Unit</Label>
                <Input
                  id="sellingPricePerUnit"
                  type="number"
                  placeholder="Enter selling price per unit"
                  value={sellingPricePerUnit}
                  onChange={(e) => setSellingPricePerUnit(e.target.value)}
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
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Break-Even Point (Units)</p>
                    <p className="text-3xl font-bold text-primary">{result.breakEvenUnits} units</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Break-Even Revenue</p>
                      <p className="text-lg font-bold">${result.breakEvenRevenue.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Contribution Margin</p>
                      <p className="text-lg font-bold">${result.contributionMargin.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>At {result.breakEvenUnits} units, total revenue equals total costs (zero profit/loss)</p>
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
