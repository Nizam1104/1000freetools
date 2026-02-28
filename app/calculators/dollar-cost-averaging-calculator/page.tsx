"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DollarCostAveragingCalculatorPage() {
  const [investmentAmount, setInvestmentAmount] = useState<string>("");
  const [interval, setInterval] = useState<string>("monthly");
  const [duration, setDuration] = useState<string>("");
  const [initialPrice, setInitialPrice] = useState<string>("");
  const [finalPrice, setFinalPrice] = useState<string>("");
  const [result, setResult] = useState<{
    totalInvested: number;
    totalUnits: number;
    averageCostPerUnit: number;
    finalValue: number;
    gainLoss: number;
    gainLossPercent: number;
  } | null>(null);

  const calculateDCA = () => {
    const amount = parseFloat(investmentAmount);
    const years = parseFloat(duration);
    const initPrice = parseFloat(initialPrice);
    const finPrice = parseFloat(finalPrice);

    if (isNaN(amount) || isNaN(years) || isNaN(initPrice) || isNaN(finPrice) || amount <= 0 || years <= 0 || initPrice <= 0 || finPrice <= 0) {
      return;
    }

    let investmentsPerYear = 12;
    if (interval === "weekly") investmentsPerYear = 52;
    if (interval === "quarterly") investmentsPerYear = 4;
    if (interval === "annually") investmentsPerYear = 1;

    const totalInvestments = investmentsPerYear * years;
    const totalInvested = amount * totalInvestments;

    const avgPrice = (initPrice + finPrice) / 2;
    const totalUnits = totalInvested / avgPrice;
    const averageCostPerUnit = totalInvested / totalUnits;
    const finalValue = totalUnits * finPrice;
    const gainLoss = finalValue - totalInvested;
    const gainLossPercent = (gainLoss / totalInvested) * 100;

    setResult({
      totalInvested,
      totalUnits,
      averageCostPerUnit,
      finalValue,
      gainLoss,
      gainLossPercent,
    });
  };

  const reset = () => {
    setInvestmentAmount("");
    setInterval("monthly");
    setDuration("");
    setInitialPrice("");
    setFinalPrice("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Dollar-Cost Averaging (DCA) Calculator</h1>
          <p className="text-muted-foreground">
            Simulate investing a fixed amount at regular intervals over time. Calculate your average cost per unit, total invested, and final portfolio value with DCA.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="investmentAmount">Investment Amount</Label>
                <Input
                  id="investmentAmount"
                  type="number"
                  placeholder="Enter amount per interval"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interval">Investment Interval</Label>
                <select
                  id="interval"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={interval}
                  onChange={(e) => setInterval(e.target.value)}
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="annually">Annually</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Investment Duration (Years)</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="Enter duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="initialPrice">Initial Price per Unit</Label>
                <Input
                  id="initialPrice"
                  type="number"
                  placeholder="Enter starting price"
                  value={initialPrice}
                  onChange={(e) => setInitialPrice(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="finalPrice">Final Price per Unit</Label>
                <Input
                  id="finalPrice"
                  type="number"
                  placeholder="Enter ending price"
                  value={finalPrice}
                  onChange={(e) => setFinalPrice(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateDCA} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Final Portfolio Value</p>
                    <p className="text-3xl font-bold text-primary">${result.finalValue.toFixed(2)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Invested</p>
                      <p className="text-lg font-bold">${result.totalInvested.toFixed(2)}</p>
                    </div>
                    <div className={`p-4 rounded-lg ${result.gainLoss >= 0 ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
                      <p className="text-sm text-muted-foreground">Gain/Loss</p>
                      <p className={`text-lg font-bold ${result.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${result.gainLoss.toFixed(2)} ({result.gainLossPercent.toFixed(2)}%)
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Units</p>
                      <p className="text-lg font-bold">{result.totalUnits.toFixed(4)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Avg Cost/Unit</p>
                      <p className="text-lg font-bold">${result.averageCostPerUnit.toFixed(2)}</p>
                    </div>
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
