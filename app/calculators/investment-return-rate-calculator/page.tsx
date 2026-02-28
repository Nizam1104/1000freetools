"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InvestmentReturnRateCalculatorPage() {
  const [startingValue, setStartingValue] = useState<string>("");
  const [targetValue, setTargetValue] = useState<string>("");
  const [timePeriod, setTimePeriod] = useState<string>("");
  const [result, setResult] = useState<{
    annualizedReturn: number;
    totalReturn: number;
  } | null>(null);

  const calculateReturnRate = () => {
    const SV = parseFloat(startingValue);
    const TV = parseFloat(targetValue);
    const N = parseFloat(timePeriod);

    if (isNaN(SV) || isNaN(TV) || isNaN(N) || SV <= 0 || N <= 0) {
      return;
    }

    const annualizedReturn = (Math.pow(TV / SV, 1 / N) - 1) * 100;
    const totalReturn = ((TV - SV) / SV) * 100;

    setResult({ annualizedReturn, totalReturn });
  };

  const reset = () => {
    setStartingValue("");
    setTargetValue("");
    setTimePeriod("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Investment Return Rate Calculator</h1>
          <p className="text-muted-foreground">
            Work backwards from your goal. Calculate the annualized return rate needed to grow your investment from a starting value to a target amount over a set period.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="startingValue">Starting Value</Label>
                <Input
                  id="startingValue"
                  type="number"
                  placeholder="Enter current investment value"
                  value={startingValue}
                  onChange={(e) => setStartingValue(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetValue">Target Value</Label>
                <Input
                  id="targetValue"
                  type="number"
                  placeholder="Enter desired future value"
                  value={targetValue}
                  onChange={(e) => setTargetValue(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timePeriod">Time Period (Years)</Label>
                <Input
                  id="timePeriod"
                  type="number"
                  placeholder="Enter investment period in years"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateReturnRate} className="flex-1">
                  Calculate Return Rate
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
                    <p className="text-sm text-muted-foreground">Required Annualized Return</p>
                    <p className="text-3xl font-bold text-primary">{result.annualizedReturn.toFixed(2)}%</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Return Needed</p>
                    <p className="text-xl font-bold">{result.totalReturn.toFixed(2)}%</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>To grow ${parseFloat(startingValue).toFixed(2)} to ${parseFloat(targetValue).toFixed(2)} in {timePeriod} years</p>
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
