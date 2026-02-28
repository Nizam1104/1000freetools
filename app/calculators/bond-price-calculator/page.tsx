"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BondPriceCalculatorPage() {
  const [faceValue, setFaceValue] = useState<string>("");
  const [couponRate, setCouponRate] = useState<string>("");
  const [yearsToMaturity, setYearsToMaturity] = useState<string>("");
  const [marketYield, setMarketYield] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("2");
  const [result, setResult] = useState<{
    bondPrice: number;
    couponPayment: number;
    premiumDiscount: number;
  } | null>(null);

  const calculateBondPrice = () => {
    const F = parseFloat(faceValue);
    const C = parseFloat(couponRate) / 100;
    const N = parseFloat(yearsToMaturity);
    const Y = parseFloat(marketYield) / 100;
    const freq = parseInt(frequency);

    if (isNaN(F) || isNaN(C) || isNaN(N) || isNaN(Y) || F <= 0 || N <= 0) {
      return;
    }

    const couponPayment = (F * C) / freq;
    const r = Y / freq;
    const n = N * freq;

    const pvCoupons = couponPayment * (1 - Math.pow(1 + r, -n)) / r;
    const pvFace = F / Math.pow(1 + r, n);
    const bondPrice = pvCoupons + pvFace;
    const premiumDiscount = bondPrice - F;

    setResult({
      bondPrice,
      couponPayment: couponPayment * freq,
      premiumDiscount,
    });
  };

  const reset = () => {
    setFaceValue("");
    setCouponRate("");
    setYearsToMaturity("");
    setMarketYield("");
    setFrequency("2");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Bond Price Calculator</h1>
          <p className="text-muted-foreground">
            Calculate the fair market price of a bond based on its face value, coupon rate, years to maturity, and the prevailing market yield or discount rate.
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
                <Label htmlFor="marketYield">Market Yield / Discount Rate (%)</Label>
                <Input
                  id="marketYield"
                  type="number"
                  placeholder="Enter market yield"
                  value={marketYield}
                  onChange={(e) => setMarketYield(e.target.value)}
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
                <Button onClick={calculateBondPrice} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Bond Price</p>
                    <p className="text-3xl font-bold text-primary">${result.bondPrice.toFixed(2)}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Annual Coupon Payment</p>
                    <p className="text-lg font-bold">${result.couponPayment.toFixed(2)}</p>
                  </div>
                  <div className={`p-4 rounded-lg ${result.premiumDiscount >= 0 ? 'bg-green-100 dark:bg-green-900/20' : 'bg-orange-100 dark:bg-orange-900/20'}`}>
                    <p className="text-sm text-muted-foreground">
                      {result.premiumDiscount >= 0 ? 'Premium' : 'Discount'}
                    </p>
                    <p className={`text-lg font-bold ${result.premiumDiscount >= 0 ? 'text-green-600' : 'text-orange-600'}`}>
                      ${Math.abs(result.premiumDiscount).toFixed(2)} {result.premiumDiscount >= 0 ? 'above' : 'below'} par
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Price as % of par: {((result.bondPrice / parseFloat(faceValue)) * 100).toFixed(2)}%</p>
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
