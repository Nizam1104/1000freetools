"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
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

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Bond Yield Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter the bond's face value and coupon rate</p>
                    <p>Face value is the amount the bond will pay at maturity, typically $1,000. The coupon rate determines the annual interest payment.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Input the current market price and years to maturity</p>
                    <p>Market price is what you would pay to buy the bond today. Years to maturity is how long until the bond expires and returns face value.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">View current yield and yield to maturity</p>
                    <p>Current yield shows annual income as a percentage of price. Yield to maturity (YTM) includes both income and any capital gain or loss at maturity.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Bond Yield Comparison Table
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Bond Price vs Par</th>
                      <th className="text-left py-3 px-2 font-semibold">Current Yield</th>
                      <th className="text-left py-3 px-2 font-semibold">Yield to Maturity</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">At Par ($1,000)</td>
                      <td className="py-3 px-2">Equals Coupon Rate</td>
                      <td className="py-3 px-2">Equals Coupon Rate</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">At Discount ($900)</td>
                      <td className="py-3 px-2">Higher than Coupon</td>
                      <td className="py-3 px-2">Higher than Current Yield</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">At Premium ($1,100)</td>
                      <td className="py-3 px-2">Lower than Coupon</td>
                      <td className="py-3 px-2">Lower than Current Yield</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Deep Discount</td>
                      <td className="py-3 px-2">Much higher than Coupon</td>
                      <td className="py-3 px-2">Includes large capital gain</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Zero-Coupon Bond</td>
                      <td className="py-3 px-2">0% (no coupons)</td>
                      <td className="py-3 px-2">All return from price gain</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                For discount bonds, YTM exceeds current yield because you gain the difference between purchase price and face value at maturity. The opposite is true for premium bonds.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Bond Yields
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">What Is Current Yield?</h4>
                  <p>
                    Current yield is the annual coupon payment divided by the bond's current market price. It tells you the income return you get today, ignoring any capital gain or loss at maturity. A $50 annual coupon on a $950 bond gives a current yield of 5.26%.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What Is Yield to Maturity (YTM)?</h4>
                  <p>
                    YTM is the total annualized return if you hold the bond until it matures. It includes both coupon income and any capital gain or loss from the difference between purchase price and face value. YTM is the most complete measure of bond return.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why YTM Matters More Than Current Yield</h4>
                  <p>
                    Current yield only shows income. YTM shows the full picture. If you buy a bond at a discount, YTM will be higher than current yield because you also profit from the price appreciation to par. For premium bonds, YTM is lower because you lose money at maturity.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How Price Affects Yield</h4>
                  <p>
                    Bond yields move opposite to prices. When a bond's price falls, its yield rises — you pay less for the same coupon payments. When price rises, yield falls. This inverse relationship is fundamental to bond investing and explains why bond prices drop when interest rates rise.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips for Evaluating Bond Yields
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Compare YTM Across Similar Bonds</p>
                    <p>Use YTM to compare bonds with different prices and coupons. Two bonds with the same maturity and credit rating should have similar YTMs. Large differences may signal mispricing or different risk levels.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Watch for Call Risk on High-YTM Bonds</p>
                    <p>A bond trading at a deep discount may have a high YTM, but if it's callable, the issuer might redeem it early. Check the yield to call (YTC) as well as YTM for callable bonds.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Consider Reinvestment Risk</p>
                    <p>YTM assumes you reinvest all coupons at the same rate. If rates fall, you may not achieve the calculated YTM. This risk is higher for bonds with higher coupons and longer maturities.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Factor in Taxes and Costs</p>
                    <p>YTM is a pre-tax figure. Municipal bonds may have lower YTM but better after-tax returns for high-income investors. Also consider transaction costs and any advisory fees.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">What is the difference between current yield and YTM?</h4>
                  <p>
                    Current yield only measures annual coupon income as a percentage of price. YTM includes both coupon income and any capital gain or loss from holding the bond to maturity. YTM is the more complete measure of expected return.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why is YTM higher for discount bonds?</h4>
                  <p>
                    Discount bonds trade below face value. At maturity, you receive the full face value, giving you a capital gain in addition to coupon income. This extra gain pushes YTM above the current yield. The deeper the discount, the bigger the difference.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Is a higher YTM always better?</h4>
                  <p>
                    Not necessarily. Higher YTM often means higher risk — the bond may be discounted because of credit concerns or call risk. Compare bonds with similar credit ratings and maturities. A junk bond's high YTM compensates for default risk, not superior value.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Does YTM assume I reinvest the coupons?</h4>
                  <p>
                    Yes. YTM calculations assume all coupon payments are reinvested at the same YTM rate. If you spend the coupons or reinvest at lower rates, your actual return will be less than the stated YTM. This is called reinvestment risk.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Can YTM be negative?</h4>
                  <p>
                    Yes, though it's rare. A bond can have negative YTM if it trades at such a high premium that the capital loss at maturity outweighs all coupon payments. This sometimes happens with safe-haven government bonds during flight-to-quality events.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
