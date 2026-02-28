"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function StockCAGRCalculatorPage() {
  const [beginningValue, setBeginningValue] = useState<string>("");
  const [endingValue, setEndingValue] = useState<string>("");
  const [numberOfYears, setNumberOfYears] = useState<string>("");
  const [result, setResult] = useState<{
    cagr: number;
    totalReturn: number;
    absoluteReturn: number;
  } | null>(null);

  const calculateCAGR = () => {
    const BV = parseFloat(beginningValue);
    const EV = parseFloat(endingValue);
    const N = parseFloat(numberOfYears);

    if (isNaN(BV) || isNaN(EV) || isNaN(N) || BV <= 0 || N <= 0) {
      return;
    }

    const cagr = (Math.pow(EV / BV, 1 / N) - 1) * 100;
    const absoluteReturn = ((EV - BV) / BV) * 100;
    const totalReturn = EV - BV;

    setResult({ cagr, totalReturn, absoluteReturn });
  };

  const reset = () => {
    setBeginningValue("");
    setEndingValue("");
    setNumberOfYears("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Stock CAGR Calculator</h1>
          <p className="text-muted-foreground">
            Calculate the Compound Annual Growth Rate of any stock or investment. Enter the beginning value, ending value, and number of years to find your CAGR.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="beginningValue">Beginning Value</Label>
                <Input
                  id="beginningValue"
                  type="number"
                  placeholder="Enter initial investment value"
                  value={beginningValue}
                  onChange={(e) => setBeginningValue(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endingValue">Ending Value</Label>
                <Input
                  id="endingValue"
                  type="number"
                  placeholder="Enter final investment value"
                  value={endingValue}
                  onChange={(e) => setEndingValue(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="numberOfYears">Number of Years</Label>
                <Input
                  id="numberOfYears"
                  type="number"
                  placeholder="Enter investment period in years"
                  value={numberOfYears}
                  onChange={(e) => setNumberOfYears(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateCAGR} className="flex-1">
                  Calculate CAGR
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
                    <p className="text-sm text-muted-foreground">CAGR (Compound Annual Growth Rate)</p>
                    <p className="text-3xl font-bold text-primary">{result.cagr.toFixed(2)}%</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Absolute Return</p>
                      <p className="text-lg font-bold">{result.absoluteReturn.toFixed(2)}%</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Gain</p>
                      <p className="text-lg font-bold">${result.totalReturn.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Formula: CAGR = (Ending Value / Beginning Value)^(1/n) - 1</p>
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
