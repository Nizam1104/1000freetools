"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PresentValueCalculatorPage() {
  const [futureValue, setFutureValue] = useState<string>("");
  const [discountRate, setDiscountRate] = useState<string>("");
  const [timePeriod, setTimePeriod] = useState<string>("");
  const [result, setResult] = useState<{
    presentValue: number;
    discountFactor: number;
  } | null>(null);

  const calculatePresentValue = () => {
    const FV = parseFloat(futureValue);
    const R = parseFloat(discountRate) / 100;
    const T = parseFloat(timePeriod);

    if (isNaN(FV) || isNaN(R) || isNaN(T) || FV <= 0 || R < 0 || T <= 0) {
      return;
    }

    const discountFactor = 1 / Math.pow(1 + R, T);
    const presentValue = FV * discountFactor;

    setResult({ presentValue, discountFactor });
  };

  const reset = () => {
    setFutureValue("");
    setDiscountRate("");
    setTimePeriod("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Present Value Calculator</h1>
          <p className="text-muted-foreground">
            Determine what a future sum of money is worth in today&apos;s dollars. Discount single or multiple future cash flows using your chosen discount rate.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="futureValue">Future Value</Label>
                <Input
                  id="futureValue"
                  type="number"
                  placeholder="Enter future value"
                  value={futureValue}
                  onChange={(e) => setFutureValue(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="discountRate">Discount Rate (%)</Label>
                <Input
                  id="discountRate"
                  type="number"
                  placeholder="Enter discount rate"
                  value={discountRate}
                  onChange={(e) => setDiscountRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timePeriod">Time Period (Years)</Label>
                <Input
                  id="timePeriod"
                  type="number"
                  placeholder="Enter time period in years"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculatePresentValue} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Present Value</p>
                    <p className="text-3xl font-bold text-primary">${result.presentValue.toFixed(2)}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Discount Factor</p>
                    <p className="text-xl font-bold">{result.discountFactor.toFixed(4)}</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Formula: PV = FV / (1 + r)^t</p>
                    <p className="mt-1">
                      Future Value: ${parseFloat(futureValue).toFixed(2)} discounted at {discountRate}% for {timePeriod} years
                    </p>
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
