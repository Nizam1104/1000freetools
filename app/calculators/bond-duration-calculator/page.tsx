"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BondDurationCalculatorPage() {
  const [faceValue, setFaceValue] = useState<string>("");
  const [couponRate, setCouponRate] = useState<string>("");
  const [yearsToMaturity, setYearsToMaturity] = useState<string>("");
  const [yieldToMaturity, setYieldToMaturity] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("2");
  const [result, setResult] = useState<{
    macaulayDuration: number;
    modifiedDuration: number;
    durationPercent: number;
  } | null>(null);

  const calculateDuration = () => {
    const F = parseFloat(faceValue);
    const C = parseFloat(couponRate) / 100;
    const N = parseFloat(yearsToMaturity);
    const Y = parseFloat(yieldToMaturity) / 100;
    const freq = parseInt(frequency);

    if (isNaN(F) || isNaN(C) || isNaN(N) || isNaN(Y) || F <= 0 || N <= 0) {
      return;
    }

    const couponPayment = (F * C) / freq;
    const r = Y / freq;
    const n = N * freq;

    let pvTotal = 0;
    let weightedSum = 0;

    for (let t = 1; t <= n; t++) {
      const cashFlow = t === n ? couponPayment + F : couponPayment;
      const pv = cashFlow / Math.pow(1 + r, t);
      pvTotal += pv;
      weightedSum += (t / freq) * pv;
    }

    const macaulayDuration = weightedSum / pvTotal;
    const modifiedDuration = macaulayDuration / (1 + Y / freq);
    const durationPercent = (modifiedDuration / N) * 100;

    setResult({
      macaulayDuration,
      modifiedDuration,
      durationPercent,
    });
  };

  const reset = () => {
    setFaceValue("");
    setCouponRate("");
    setYearsToMaturity("");
    setYieldToMaturity("");
    setFrequency("2");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Bond Duration Calculator</h1>
          <p className="text-muted-foreground">
            Measure your bond's sensitivity to interest rate changes. Calculate Macaulay and Modified Duration to better manage fixed-income portfolio risk.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="faceValue">Face Value</Label>
                <Input
                  id="faceValue"
                  type="number"
                  placeholder="Enter face value"
                  value={faceValue}
                  onChange={(e) => setFaceValue(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="couponRate">Coupon Rate (%)</Label>
                <Input
                  id="couponRate"
                  type="number"
                  placeholder="Enter coupon rate"
                  value={couponRate}
                  onChange={(e) => setCouponRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="yearsToMaturity">Years to Maturity</Label>
                <Input
                  id="yearsToMaturity"
                  type="number"
                  placeholder="Enter years to maturity"
                  value={yearsToMaturity}
                  onChange={(e) => setYearsToMaturity(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="yieldToMaturity">Yield to Maturity (%)</Label>
                <Input
                  id="yieldToMaturity"
                  type="number"
                  placeholder="Enter YTM"
                  value={yieldToMaturity}
                  onChange={(e) => setYieldToMaturity(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequency">Coupon Frequency</Label>
                <select
                  id="frequency"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                >
                  <option value="1">Annual (1x/year)</option>
                  <option value="2">Semi-Annual (2x/year)</option>
                  <option value="4">Quarterly (4x/year)</option>
                  <option value="12">Monthly (12x/year)</option>
                </select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateDuration} className="flex-1">
                  Calculate Duration
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
                      <p className="text-sm text-muted-foreground">Macaulay Duration</p>
                      <p className="text-2xl font-bold text-primary">{result.macaulayDuration.toFixed(2)} years</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <p className="text-sm text-muted-foreground">Modified Duration</p>
                      <p className="text-2xl font-bold text-primary">{result.modifiedDuration.toFixed(2)} years</p>
                    </div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Duration as % of Maturity</p>
                    <p className="text-lg font-bold">{result.durationPercent.toFixed(1)}%</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Price sensitivity: ~{result.modifiedDuration.toFixed(2)}% price change per 1% yield change</p>
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
