"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
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

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Bond Price Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter the bond's face value and coupon rate</p>
                    <p>Face value is typically $1,000 for corporate bonds. The coupon rate is the annual interest rate the bond pays, expressed as a percentage.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Input years to maturity and market yield</p>
                    <p>Years to maturity is how long until the bond expires. Market yield (discount rate) is the current return investors demand for similar bonds.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Calculate and review the fair price</p>
                    <p>The result shows the bond's fair market price, whether it trades at a premium or discount to par, and the annual coupon payment amount.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Bond Pricing Reference Table
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Market Yield vs Coupon</th>
                      <th className="text-left py-3 px-2 font-semibold">Bond Price</th>
                      <th className="text-left py-3 px-2 font-semibold">Trading Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Market Yield = Coupon Rate</td>
                      <td className="py-3 px-2">Equals Face Value</td>
                      <td className="py-3 px-2">At Par</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Market Yield &lt; Coupon Rate</td>
                      <td className="py-3 px-2">Above Face Value</td>
                      <td className="py-3 px-2">At Premium</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Market Yield &gt; Coupon Rate</td>
                      <td className="py-3 px-2">Below Face Value</td>
                      <td className="py-3 px-2">At Discount</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Market Yield rises 1%</td>
                      <td className="py-3 px-2">Price falls ~Duration%</td>
                      <td className="py-3 px-2">Inverse relationship</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Market Yield falls 1%</td>
                      <td className="py-3 px-2">Price rises ~Duration%</td>
                      <td className="py-3 px-2">Inverse relationship</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Bond prices move inversely to interest rates. When market yields rise above a bond's coupon rate, the bond must trade at a discount to remain competitive.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Bond Pricing
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">How Bond Prices Are Calculated</h4>
                  <p>
                    A bond's price equals the present value of all future cash flows — coupon payments plus the return of face value at maturity. Each cash flow is discounted back to today using the current market yield. When market yields rise, the discount rate increases, making future cash flows worth less today.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Premium vs. Discount Bonds</h4>
                  <p>
                    A bond trades at a premium when its coupon rate exceeds current market yields. Investors pay more than face value to lock in the higher coupon. A bond trades at a discount when its coupon rate is below market yields. The lower price compensates buyers for the below-market coupon.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why Bond Prices Change</h4>
                  <p>
                    Bond prices fluctuate as market interest rates change. If you own a 5% coupon bond and new bonds now pay 6%, your bond becomes less valuable — its price drops until its effective yield matches the market. The opposite happens when rates fall. Credit rating changes and time to maturity also affect price.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">The Role of Time to Maturity</h4>
                  <p>
                    Longer-term bonds are more sensitive to interest rate changes. A 30-year bond's price will swing much more than a 2-year bond's price for the same rate move. This is because there are more future cash flows to discount, and small changes in the discount rate compound over time.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips for Bond Investors
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Compare Price to Fair Value</p>
                    <p>Use this calculator to determine if a bond is fairly priced. If the market price is below your calculated fair value, the bond may be undervalued.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Understand What Drives Premium Pricing</p>
                    <p>Premium bonds cost more upfront but return only face value at maturity. The higher coupon provides income, but you'll have a capital loss at maturity if held to term.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Watch Out for Call Risk on Premium Bonds</p>
                    <p>Issuers often call premium bonds when rates fall. You get your money back but lose the high coupon. Check the call schedule before paying a large premium.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Consider Tax Implications</p>
                    <p>Discount bonds may generate taxable imputed interest even though you don't receive it until maturity. Premium bonds can be amortized to reduce taxable income.</p>
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
                  <h4 className="font-medium text-foreground mb-2">Why is my bond trading below face value?</h4>
                  <p>
                    Your bond trades at a discount when market interest rates have risen above its coupon rate. Buyers demand a lower price to compensate for the below-market coupon. The bond will still pay face value at maturity, giving you a capital gain if you hold to term.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What happens to bond prices when interest rates rise?</h4>
                  <p>
                    Bond prices fall when interest rates rise. Existing bonds with lower coupons become less attractive, so their prices drop until their effective yield matches new bonds. The longer the bond's duration, the more its price will fall for a given rate increase.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Is it better to buy bonds at a premium or discount?</h4>
                  <p>
                    Neither is inherently better — both can offer fair value. Premium bonds provide higher current income but a capital loss at maturity. Discount bonds provide lower income but a capital gain. The total return depends on the yield to maturity, not the price relative to par.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How accurate is this bond price calculation?</h4>
                  <p>
                    This calculator provides a theoretical fair value based on the inputs. Actual market prices may differ due to factors like credit spreads, liquidity, call features, and supply-demand dynamics. Use it as a reference point, not a guaranteed market price.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Does the coupon frequency affect bond price?</h4>
                  <p>
                    Yes. Bonds that pay more frequently (monthly vs. annually) have slightly different prices because you receive cash sooner. More frequent payments mean each coupon can be reinvested earlier, which affects the present value calculation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Related Tools
              </h3>
              <div className="space-y-2 text-sm">
                <a
                  href="/calculators/bond-duration-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Bond Duration Calculator</span>
                  <p className="text-muted-foreground">Measure interest rate sensitivity with Macaulay and Modified Duration</p>
                </a>
                <a
                  href="/calculators/bond-yield-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Bond Yield Calculator</span>
                  <p className="text-muted-foreground">Calculate current yield and yield to maturity from market price</p>
                </a>
                <a
                  href="/calculators/current-yield-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Current Yield Calculator</span>
                  <p className="text-muted-foreground">Find the annual return on a bond based on its current market price</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
