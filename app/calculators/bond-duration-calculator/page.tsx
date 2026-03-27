"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Faqs from "@/components/utils/Faqs";


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

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Bond Duration Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter the bond details</p>
                    <p>Input the face value (par value), coupon rate, years to maturity, and yield to maturity. Most corporate bonds have a $1,000 face value.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Select the coupon frequency</p>
                    <p>Choose how often the bond pays interest. Most U.S. bonds pay semi-annually (twice per year), but some pay quarterly or annually.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Review the duration results</p>
                    <p>The calculator shows Macaulay Duration (weighted average time to receive cash flows) and Modified Duration (price sensitivity to interest rate changes).</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Bond Duration Reference Guide
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Bond Type</th>
                      <th className="text-left py-3 px-2 font-semibold">Typical Duration</th>
                      <th className="text-left py-3 px-2 font-semibold">Interest Rate Risk</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Treasury Bills</td>
                      <td className="py-3 px-2">&lt; 1 year</td>
                      <td className="py-3 px-2">Very Low</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Short-Term Bonds</td>
                      <td className="py-3 px-2">1-3 years</td>
                      <td className="py-3 px-2">Low</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Intermediate Bonds</td>
                      <td className="py-3 px-2">3-7 years</td>
                      <td className="py-3 px-2">Moderate</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Long-Term Bonds</td>
                      <td className="py-3 px-2">7-15 years</td>
                      <td className="py-3 px-2">High</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">30-Year Treasury</td>
                      <td className="py-3 px-2">15-20 years</td>
                      <td className="py-3 px-2">Very High</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Duration is always less than or equal to maturity for coupon-paying bonds. Zero-coupon bonds have duration equal to maturity.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Bond Duration
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">What Is Macaulay Duration?</h4>
                  <p>
                    Macaulay Duration measures the weighted average time until you receive all cash flows from a bond. It accounts for both coupon payments and the return of principal at maturity. A 10-year bond with a 5% coupon might have a Macaulay Duration of around 8 years because you receive some money back before maturity through coupon payments.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What Is Modified Duration?</h4>
                  <p>
                    Modified Duration shows how much a bond's price will change for a 1% change in interest rates. If a bond has a Modified Duration of 5 years, its price will drop approximately 5% if rates rise by 1%, and rise approximately 5% if rates fall by 1%. This makes it a direct measure of interest rate risk.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why Duration Matters for Investors</h4>
                  <p>
                    Duration helps you compare bonds with different maturities and coupons. Two 10-year bonds can have very different durations depending on their coupon rates. Higher coupon bonds have lower duration because you get more money back sooner. This matters when interest rates are expected to rise — lower duration bonds lose less value.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Duration vs. Maturity</h4>
                  <p>
                    Maturity is simply when the bond expires. Duration is more nuanced — it factors in when you actually receive cash. A zero-coupon bond has duration equal to maturity. A high-coupon bond has duration significantly shorter than maturity. For most coupon bonds, duration runs about 70-80% of maturity.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips for Using Duration in Portfolio Management
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Match Duration to Your Time Horizon</p>
                    <p>If you need money in 5 years, consider bonds with duration around 5 years. This reduces the risk that rate changes will hurt your principal when you need to sell.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Use Duration to Gauge Rate Risk</p>
                    <p>When rates are expected to rise, shorten portfolio duration. When rates are expected to fall, extend duration to capture more price appreciation.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Consider Convexity for Large Rate Moves</p>
                    <p>Duration is a linear approximation. For large rate changes, convexity matters too. Bonds with higher convexity gain more when rates fall than they lose when rates rise.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Diversify Across Durations</p>
                    <p>A bond ladder with varying maturities gives you a blend of durations. This provides income stability while limiting exposure to any single rate environment.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <section className="container mx-auto px-4 py-12 mb-12">
  <h2 className="text-3xl font-semibold mb-8 text-center">
    Frequently Asked Questions
  </h2>
  <Faqs faqs={[
{
    question: "What is a good duration for a bond?",
    answer: "There is no single \"good\" duration — it depends on your goals and rate outlook. Short duration (1-3 years) suits conservative investors or those expecting rising rates. Long duration (7+ years) suits those seeking higher yields or expecting falling rates. Match duration to when you'll need the money.",
  },
{
    question: "Why is modified duration lower than Macaulay duration?",
    answer: "Modified Duration equals Macaulay Duration divided by (1 + yield/frequency). This adjustment accounts for the fact that bond prices and yields move inversely. The higher the yield, the bigger the gap between the two duration measures.",
  },
{
    question: "How does coupon rate affect duration?",
    answer: "Higher coupon bonds have lower duration. You receive more cash earlier through coupon payments, reducing the weighted average time to receive all cash flows. A 10-year bond with a 10% coupon has much lower duration than a 10-year bond with a 2% coupon.",
  },
{
    question: "Can duration be negative?",
    answer: "For standard bonds, duration is always positive. However, certain complex instruments like inverse floaters or some mortgage-backed securities can have negative duration — meaning they gain value when rates rise and lose value when rates fall.",
  },
{
    question: "Is duration the same as maturity?",
    answer: "No. Maturity is when the bond expires. Duration is the weighted average time to receive all cash flows. For zero-coupon bonds, duration equals maturity. For coupon bonds, duration is always less than maturity — often significantly so for high-coupon bonds.",
  }
  ]} />
</section>

        </div>
      </div>
    </div>
  );
}
