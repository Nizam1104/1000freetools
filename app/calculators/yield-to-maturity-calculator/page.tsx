"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
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

        {/* How It Works Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">How to Calculate Yield to Maturity</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-semibold mb-2">Enter Bond Details</h3>
                <p className="text-sm text-muted-foreground">Input the bond's face value, coupon rate, and current market price.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-semibold mb-2">Add Years to Maturity</h3>
                <p className="text-sm text-muted-foreground">Enter the number of years remaining until the bond matures.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-semibold mb-2">Get YTM & Current Yield</h3>
                <p className="text-sm text-muted-foreground">See yield to maturity, current yield, and whether bond trades at premium or discount.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Why Use This YTM Calculator</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Total Return Calculation</h3>
              <p className="text-sm text-muted-foreground">YTM includes both coupon income and capital gains/losses for complete return picture.</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Premium/Discount Indicator</h3>
              <p className="text-sm text-muted-foreground">Automatically shows if bond trades above or below par value and what it means.</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Current Yield Comparison</h3>
              <p className="text-sm text-muted-foreground">Compare current yield to YTM to understand the impact of price vs. par difference.</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Investment Decision Support</h3>
              <p className="text-sm text-muted-foreground">Compare YTM across bonds to make informed fixed-income investment choices.</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-primary/10 rounded-lg">
            <h3 className="font-semibold mb-3">Bond Pricing Scenarios</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Price vs. Par</th>
                  <th className="text-left py-2">Relationship</th>
                  <th className="text-left py-2">YTM vs. Coupon</th>
                  <th className="text-left py-2">Investor Impact</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">Discount (Price &lt; Par)</td>
                  <td className="py-2">Buying below face value</td>
                  <td className="py-2">YTM &gt; Coupon Rate</td>
                  <td className="py-2">Capital gain at maturity</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">At Par (Price = Par)</td>
                  <td className="py-2">Buying at face value</td>
                  <td className="py-2">YTM = Coupon Rate</td>
                  <td className="py-2">No capital gain/loss</td>
                </tr>
                <tr>
                  <td className="py-2">Premium (Price &gt; Par)</td>
                  <td className="py-2">Buying above face value</td>
                  <td className="py-2">YTM &lt; Coupon Rate</td>
                  <td className="py-2">Capital loss at maturity</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">What is yield to maturity (YTM)?</h3>
              <p className="text-sm text-muted-foreground">YTM is the total annualized return you'll earn if you hold a bond until it matures. It includes all coupon payments plus any capital gain or loss from the difference between purchase price and face value.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How is YTM different from current yield?</h3>
              <p className="text-sm text-muted-foreground">Current yield only considers annual coupon income divided by price. YTM also factors in the capital gain/loss when the bond matures at face value, giving a more complete return picture.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Why would I buy a bond at a premium?</h3>
              <p className="text-sm text-muted-foreground">Premium bonds typically have higher coupon rates than current market rates. You pay more upfront but receive larger coupon payments. The YTM reflects the true return after accounting for the premium.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What affects a bond's YTM?</h3>
              <p className="text-sm text-muted-foreground">YTM changes with bond price (inverse relationship), time to maturity, coupon rate, and prevailing interest rates. When market rates rise, bond prices fall and YTM increases.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is YTM guaranteed if I hold to maturity?</h3>
              <p className="text-sm text-muted-foreground">YTM assumes you hold the bond to maturity, receive all coupon payments, and the issuer doesn't default. It also assumes coupons are reinvested at the same YTM rate, which may not happen in reality.</p>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Related Finance Calculators</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/calculators/bond-price-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-1">Bond Price Calculator</h3>
              <p className="text-sm text-muted-foreground">Calculate bond price from yield, coupon, and maturity.</p>
            </a>
            <a href="/calculators/bond-yield-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-1">Bond Yield Calculator</h3>
              <p className="text-sm text-muted-foreground">Calculate current yield and other bond yield metrics.</p>
            </a>
            <a href="/calculators/fixed-deposit-interest-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-1">Fixed Deposit Interest Calculator</h3>
              <p className="text-sm text-muted-foreground">Compare fixed income investment returns.</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
