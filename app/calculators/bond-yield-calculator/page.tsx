"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BondYieldCalculatorPage() {
  const [faceValue, setFaceValue] = useState<string>("");
  const [couponRate, setCouponRate] = useState<string>("");
  const [marketPrice, setMarketPrice] = useState<string>("");
  const [yearsToMaturity, setYearsToMaturity] = useState<string>("");
  const [result, setResult] = useState<{
    currentYield: number;
    ytm: number;
    annualCoupon: number;
  } | null>(null);

  const calculateBondYield = () => {
    const F = parseFloat(faceValue);
    const C = parseFloat(couponRate) / 100;
    const P = parseFloat(marketPrice);
    const N = parseFloat(yearsToMaturity);

    if (isNaN(F) || isNaN(C) || isNaN(P) || isNaN(N) || F <= 0 || P <= 0 || N <= 0) {
      return;
    }

    const annualCoupon = F * C;
    const currentYield = (annualCoupon / P) * 100;

    // YTM approximation
    const ytm = ((annualCoupon + (F - P) / N) / ((F + P) / 2)) * 100;

    setResult({
      currentYield,
      ytm,
      annualCoupon,
    });
  };

  const reset = () => {
    setFaceValue("");
    setCouponRate("");
    setMarketPrice("");
    setYearsToMaturity("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Bond Yield Calculator</h1>
          <p className="text-muted-foreground">
            Find the current yield or yield-to-maturity of a bond from its market price, coupon payments, and maturity date. Essential for fixed-income investing.
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
                <Label htmlFor="marketPrice">Current Market Price</Label>
                <Input
                  id="marketPrice"
                  type="number"
                  placeholder="Enter market price"
                  value={marketPrice}
                  onChange={(e) => setMarketPrice(e.target.value)}
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
                <Button onClick={calculateBondYield} className="flex-1">
                  Calculate Yields
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
                      <p className="text-sm text-muted-foreground">Current Yield</p>
                      <p className="text-2xl font-bold text-primary">{result.currentYield.toFixed(2)}%</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <p className="text-sm text-muted-foreground">Yield to Maturity</p>
                      <p className="text-2xl font-bold text-primary">{result.ytm.toFixed(2)}%</p>
                    </div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Annual Coupon Payment</p>
                    <p className="text-lg font-bold">${result.annualCoupon.toFixed(2)}</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Market Price: ${parseFloat(marketPrice).toFixed(2)} | Face Value: ${parseFloat(faceValue).toFixed(2)}</p>
                    {parseFloat(marketPrice) < parseFloat(faceValue) ? (
                      <p className="text-green-600 mt-1">Bond at discount - YTM &gt; Current Yield</p>
                    ) : parseFloat(marketPrice) > parseFloat(faceValue) ? (
                      <p className="text-orange-600 mt-1">Bond at premium - YTM &lt; Current Yield</p>
                    ) : null}
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
