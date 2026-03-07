"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BondConvexityCalculatorPage() {
  const [faceValue, setFaceValue] = useState<string>("");
  const [couponRate, setCouponRate] = useState<string>("");
  const [yearsToMaturity, setYearsToMaturity] = useState<string>("");
  const [yieldToMaturity, setYieldToMaturity] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("2");
  const [result, setResult] = useState<{
    convexity: number;
    effectiveConvexity: number;
  } | null>(null);

  const calculateConvexity = () => {
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
    let convexitySum = 0;

    for (let t = 1; t <= n; t++) {
      const cashFlow = t === n ? couponPayment + F : couponPayment;
      const pv = cashFlow / Math.pow(1 + r, t);
      pvTotal += pv;
      convexitySum += t * (t + 1) * pv;
    }

    const convexity = convexitySum / (pvTotal * Math.pow(1 + r, 2) * freq * freq);
    const effectiveConvexity = convexity / (1 + Y / freq);

    setResult({
      convexity,
      effectiveConvexity,
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
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Bond Convexity Calculator</h1>
          <p className="text-muted-foreground">
            Go beyond duration with convexity. Calculate bond convexity to accurately assess interest rate risk by measuring the curvature in the price-yield relationship.
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
                <Button onClick={calculateConvexity} className="flex-1">
                  Calculate Convexity
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
                      <p className="text-sm text-muted-foreground">Convexity</p>
                      <p className="text-2xl font-bold text-primary">{result.convexity.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <p className="text-sm text-muted-foreground">Effective Convexity</p>
                      <p className="text-2xl font-bold text-primary">{result.effectiveConvexity.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Convexity measures the curvature of price-yield relationship</p>
                    <p className="mt-1">Higher convexity = better protection against rate changes</p>
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
                How to Use This Bond Convexity Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter bond details</p>
                    <p>Input the face value, coupon rate, years to maturity, and yield to maturity.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Select coupon frequency</p>
                    <p>Choose how often the bond pays coupons: annual, semi-annual, quarterly, or monthly.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Calculate convexity measures</p>
                    <p>Get both standard convexity and effective convexity to assess interest rate risk.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Duration vs Convexity Comparison
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Measure</th>
                      <th className="text-left py-3 px-2 font-semibold">What It Measures</th>
                      <th className="text-left py-3 px-2 font-semibold">Limitation</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Duration</td>
                      <td className="py-3 px-2">Linear price sensitivity to yield changes</td>
                      <td className="py-3 px-2">Assumes straight-line relationship</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Modified Duration</td>
                      <td className="py-3 px-2">Percentage price change per 1% yield change</td>
                      <td className="py-3 px-2">Still linear approximation</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Convexity</td>
                      <td className="py-3 px-2">Curvature of price-yield relationship</td>
                      <td className="py-3 px-2">Second-order effect, smaller impact</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Effective Convexity</td>
                      <td className="py-3 px-2">Convexity adjusted for yield compounding</td>
                      <td className="py-3 px-2">More accurate for large rate changes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: Use duration and convexity together for accurate price change estimates.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Bond Convexity
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">What Is Convexity?</h4>
                  <p>
                    Convexity measures how the duration of a bond changes as interest rates change. While
                    duration provides a linear estimate of price sensitivity, convexity accounts for the
                    curved (convex) relationship between bond prices and yields. This curvature becomes
                    important for larger interest rate movements.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why Convexity Matters</h4>
                  <p>
                    Bonds with higher convexity gain more when rates fall and lose less when rates rise,
                    compared to what duration alone predicts. This asymmetry benefits investors. Convexity
                    is especially important for bonds with embedded options or when interest rate volatility
                    is high.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Positive vs Negative Convexity</h4>
                  <p>
                    Most plain vanilla bonds have positive convexity — price increases accelerate as yields
                    fall. Callable bonds can exhibit negative convexity at low yields because the issuer is
                    likely to call the bond, limiting price appreciation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips for Using Convexity in Bond Analysis
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Combine with duration</p>
                    <p>Use the formula: % Price Change ≈ -Duration × ΔYield + 0.5 × Convexity × (ΔYield)² for better estimates.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Prefer higher convexity when yields are volatile</p>
                    <p>In uncertain rate environments, bonds with higher convexity provide better protection against adverse moves.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Understand convexity trade-offs</p>
                    <p>Higher convexity bonds typically trade at a premium (lower yield). Decide if the protection is worth the cost.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Watch for negative convexity</p>
                    <p>Mortgage-backed securities and callable bonds can have negative convexity, working against you when rates move.</p>
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
                  <h4 className="font-medium text-foreground mb-2">What is a good convexity value?</h4>
                  <p>
                    Convexity values vary widely based on bond characteristics. Longer maturity and lower
                    coupon bonds have higher convexity. A 10-year bond might have convexity around 100-150,
                    while a 30-year bond could exceed 300. Compare convexity within similar bond categories.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How does coupon rate affect convexity?</h4>
                  <p>
                    Lower coupon bonds have higher convexity because more of their value comes from the
                    distant principal payment. Zero-coupon bonds have the highest convexity for a given
                    maturity. Higher coupons reduce convexity by bringing cash flows closer to present.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">When should I use convexity instead of duration?</h4>
                  <p>
                    Use both together. Duration works well for small yield changes (under 50 basis points).
                    For larger moves, convexity becomes important. If you expect significant rate volatility,
                    convexity analysis is essential for accurate risk assessment.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What causes negative convexity?</h4>
                  <p>
                    Negative convexity occurs when bond prices increase less when rates fall than they
                    decrease when rates rise. This happens with callable bonds (issuer calls when rates
                    drop) and mortgage-backed securities (homeowners refinance when rates fall).
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How does maturity affect convexity?</h4>
                  <p>
                    Convexity increases with the square of maturity. Doubling maturity roughly quadruples
                    convexity. Long-term bonds therefore have much higher convexity than short-term bonds,
                    making them more sensitive to interest rate curvature effects.
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
