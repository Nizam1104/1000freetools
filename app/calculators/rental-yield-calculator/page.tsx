"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RentalYieldCalculatorPage() {
  const [purchasePrice, setPurchasePrice] = useState<string>("");
  const [monthlyRent, setMonthlyRent] = useState<string>("");
  const [annualExpenses, setAnnualExpenses] = useState<string>("");
  const [result, setResult] = useState<{
    grossYield: number;
    netYield: number;
    annualRent: number;
    netAnnualIncome: number;
  } | null>(null);

  const calculateRentalYield = () => {
    const price = parseFloat(purchasePrice);
    const rent = parseFloat(monthlyRent);
    const expenses = parseFloat(annualExpenses) || 0;

    if (isNaN(price) || isNaN(rent) || price <= 0 || rent <= 0) {
      return;
    }

    const annualRent = rent * 12;
    const grossYield = (annualRent / price) * 100;
    const netAnnualIncome = annualRent - expenses;
    const netYield = (netAnnualIncome / price) * 100;

    setResult({ grossYield, netYield, annualRent, netAnnualIncome });
  };

  const reset = () => {
    setPurchasePrice("");
    setMonthlyRent("");
    setAnnualExpenses("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Rental Yield Calculator</h1>
          <p className="text-muted-foreground">
            Evaluate a rental property&apos;s performance. Calculate gross and net rental yield based on purchase price, annual rental income, and operating expenses.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="purchasePrice">Purchase Price</Label>
                <Input
                  id="purchasePrice"
                  type="number"
                  placeholder="Enter property purchase price"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyRent">Monthly Rent</Label>
                <Input
                  id="monthlyRent"
                  type="number"
                  placeholder="Enter monthly rental income"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="annualExpenses">Annual Expenses (optional)</Label>
                <Input
                  id="annualExpenses"
                  type="number"
                  placeholder="Enter annual expenses"
                  value={annualExpenses}
                  onChange={(e) => setAnnualExpenses(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Include: property tax, insurance, maintenance, HOA fees, etc.</p>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateRentalYield} className="flex-1">
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
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <p className="text-sm text-muted-foreground">Gross Rental Yield</p>
                      <p className="text-2xl font-bold text-primary">{result.grossYield.toFixed(2)}%</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <p className="text-sm text-muted-foreground">Net Rental Yield</p>
                      <p className="text-2xl font-bold text-primary">{result.netYield.toFixed(2)}%</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Annual Rental Income</p>
                      <p className="text-lg font-bold">${result.annualRent.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Net Annual Income</p>
                      <p className="text-lg font-bold">${result.netAnnualIncome.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Purchase Price: ${parseFloat(purchasePrice).toFixed(2)} | Monthly Rent: ${parseFloat(monthlyRent).toFixed(2)}</p>
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
