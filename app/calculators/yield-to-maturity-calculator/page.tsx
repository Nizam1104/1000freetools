"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function YieldToMaturityCalculatorPage() {
  const [faceValue, setFaceValue] = useState<string>("");
  const [couponRate, setCouponRate] = useState<string>("");
  const [currentPrice, setCurrentPrice] = useState<string>("");
  const [yearsToMaturity, setYearsToMaturity] = useState<string>("");
  const [result, setResult] = useState<{
    annualCoupon: number;
    ytm: number;
    currentYield: number;
  } | null>(null);

  const calculateYTM = () => {
    const F = parseFloat(faceValue);
    const C = parseFloat(couponRate) / 100;
    const P = parseFloat(currentPrice);
    const N = parseFloat(yearsToMaturity);

    if (isNaN(F) || isNaN(C) || isNaN(P) || isNaN(N) || F <= 0 || P <= 0 || N <= 0) {
      return;
    }

    const annualCoupon = F * C;

    // Approximation formula for YTM
    const ytm = (annualCoupon + (F - P) / N) / ((F + P) / 2);
    const currentYield = annualCoupon / P;

    setResult({
      annualCoupon,
      ytm: ytm * 100,
      currentYield: currentYield * 100,
    });
  };

  const reset = () => {
    setFaceValue("");
    setCouponRate("");
    setCurrentPrice("");
    setYearsToMaturity("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Yield-to-Maturity (YTM) Calculator</h1>
          <p className="text-muted-foreground">
            Calculate the total annualized return of a bond held to maturity. Factors in coupon payments, purchase price, face value, and time remaining to maturity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="faceValue">Face Value (Par Value)</Label>
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
                <Label htmlFor="currentPrice">Current Market Price</Label>
                <Input
                  id="currentPrice"
                  type="number"
                  placeholder="Enter current price"
                  value={currentPrice}
                  onChange={(e) => setCurrentPrice(e.target.value)}
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

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateYTM} className="flex-1">
                  Calculate YTM
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
                    <p className="text-sm text-muted-foreground">Yield to Maturity</p>
                    <p className="text-3xl font-bold text-primary">{result.ytm.toFixed(2)}%</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Current Yield</p>
                      <p className="text-lg font-bold">{result.currentYield.toFixed(2)}%</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Annual Coupon</p>
                      <p className="text-lg font-bold">${result.annualCoupon.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Face Value: ${parseFloat(faceValue).toFixed(2)} | Price: ${parseFloat(currentPrice).toFixed(2)}</p>
                    {parseFloat(currentPrice) < parseFloat(faceValue) ? (
                      <p className="text-green-600 mt-1">Bond trading at discount</p>
                    ) : parseFloat(currentPrice) > parseFloat(faceValue) ? (
                      <p className="text-orange-600 mt-1">Bond trading at premium</p>
                    ) : (
                      <p className="mt-1">Bond trading at par</p>
                    )}
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
