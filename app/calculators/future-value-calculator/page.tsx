"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FutureValueCalculatorPage() {
  const [presentValue, setPresentValue] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [timePeriod, setTimePeriod] = useState<string>("");
  const [result, setResult] = useState<{
    futureValue: number;
    interestEarned: number;
  } | null>(null);

  const calculateFutureValue = () => {
    const PV = parseFloat(presentValue);
    const R = parseFloat(interestRate) / 100;
    const T = parseFloat(timePeriod);

    if (isNaN(PV) || isNaN(R) || isNaN(T) || PV <= 0 || R < 0 || T <= 0) {
      return;
    }

    const futureValue = PV * Math.pow(1 + R, T);
    const interestEarned = futureValue - PV;

    setResult({ futureValue, interestEarned });
  };

  const reset = () => {
    setPresentValue("");
    setInterestRate("");
    setTimePeriod("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Future Value Calculator</h1>
          <p className="text-muted-foreground">
            Project how much your savings or investment will grow over time. Enter the current amount, expected return rate, and time horizon to see your future wealth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="presentValue">Current Amount (Present Value)</Label>
                <Input
                  id="presentValue"
                  type="number"
                  placeholder="Enter current amount"
                  value={presentValue}
                  onChange={(e) => setPresentValue(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interestRate">Expected Annual Return (%)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  placeholder="Enter expected return rate"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timePeriod">Time Horizon (Years)</Label>
                <Input
                  id="timePeriod"
                  type="number"
                  placeholder="Enter time period in years"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateFutureValue} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Future Value</p>
                    <p className="text-3xl font-bold text-primary">${result.futureValue.toFixed(2)}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Interest Earned</p>
                    <p className="text-xl font-bold">${result.interestEarned.toFixed(2)}</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Formula: FV = PV × (1 + r)^t</p>
                    <p className="mt-1">
                      Your ${parseFloat(presentValue).toFixed(2)} grows to ${result.futureValue.toFixed(2)} in {timePeriod} years at {interestRate}%
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
