"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ValuationCapCalculatorPage() {
  const [valuationCap, setValuationCap] = useState<string>("");
  const [preMoneyValuation, setPreMoneyValuation] = useState<string>("");
  const [investmentAmount, setInvestmentAmount] = useState<string>("");
  const [result, setResult] = useState<{
    conversionPrice: number;
    pricePerShare: number;
    sharesReceived: number;
    discount: number;
    effectiveValuation: number;
  } | null>(null);

  const calculateValuationCap = () => {
    const cap = parseFloat(valuationCap);
    const preMoney = parseFloat(preMoneyValuation);
    const investment = parseFloat(investmentAmount);

    if (isNaN(cap) || isNaN(preMoney) || isNaN(investment) || cap <= 0 || preMoney <= 0 || investment <= 0) {
      return;
    }

    // The conversion valuation is the lower of cap and pre-money
    const conversionValuation = Math.min(cap, preMoney);
    const effectiveValuation = conversionValuation;

    // Assume 10M shares outstanding for calculation
    const sharesOutstanding = 10000000;
    const pricePerShare = preMoney / sharesOutstanding;
    const conversionPrice = conversionValuation / sharesOutstanding;
    const sharesReceived = investment / conversionPrice;
    const discount = ((pricePerShare - conversionPrice) / pricePerShare) * 100;

    setResult({
      conversionPrice,
      pricePerShare,
      sharesReceived,
      discount: Math.max(0, discount),
      effectiveValuation,
    });
  };

  const reset = () => {
    setValuationCap("");
    setPreMoneyValuation("");
    setInvestmentAmount("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Valuation Cap Calculator – SAFE & Convertible Notes</h1>
          <p className="text-muted-foreground">
            Calculate the effective conversion price of a SAFE or convertible note at a priced round. Enter the valuation cap and pre-money valuation to find the conversion price.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="valuationCap">Valuation Cap</Label>
                <Input
                  id="valuationCap"
                  type="number"
                  placeholder="Enter valuation cap"
                  value={valuationCap}
                  onChange={(e) => setValuationCap(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preMoneyValuation">Pre-Money Valuation</Label>
                <Input
                  id="preMoneyValuation"
                  type="number"
                  placeholder="Enter pre-money valuation"
                  value={preMoneyValuation}
                  onChange={(e) => setPreMoneyValuation(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="investmentAmount">Investment Amount</Label>
                <Input
                  id="investmentAmount"
                  type="number"
                  placeholder="Enter investment"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                />
              </div>

              <div className="pt-4">
                <div className="text-sm text-muted-foreground">
                  <p>The conversion uses the LOWER of:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Valuation Cap</li>
                    <li>Pre-Money Valuation</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateValuationCap} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Effective Valuation</p>
                    <p className="text-2xl font-bold text-primary">${result.effectiveValuation.toLocaleString()}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Price Per Share (New)</p>
                      <p className="text-lg font-bold">${result.pricePerShare.toFixed(4)}</p>
                    </div>
                    <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Conversion Price</p>
                      <p className="text-lg font-bold text-green-600">${result.conversionPrice.toFixed(4)}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Shares Received</p>
                    <p className="text-lg font-bold">{result.sharesReceived.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Effective Discount</p>
                    <p className="text-lg font-bold text-primary">{result.discount.toFixed(1)}%</p>
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
          <h2 className="text-2xl font-semibold mb-6">How to Calculate SAFE Conversion</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-semibold mb-2">Enter Valuation Cap</h3>
                <p className="text-sm text-muted-foreground">Input the maximum valuation from your SAFE or convertible note agreement.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-semibold mb-2">Add Pre-Money Valuation</h3>
                <p className="text-sm text-muted-foreground">Enter the company's pre-money valuation at the Series A or priced funding round.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-semibold mb-2">Get Conversion Terms</h3>
                <p className="text-sm text-muted-foreground">See your effective valuation, share price, and discount percentage at conversion.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Why Use This Valuation Cap Calculator</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">SAFE & Note Support</h3>
              <p className="text-sm text-muted-foreground">Works with both SAFE agreements and convertible notes that have valuation cap provisions.</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Effective Discount Calculation</h3>
              <p className="text-sm text-muted-foreground">Automatically calculates your real discount percentage based on cap vs. actual valuation.</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Share Count Estimation</h3>
              <p className="text-sm text-muted-foreground">Estimates the number of shares you'll receive based on your investment amount.</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Conversion Price Comparison</h3>
              <p className="text-sm text-muted-foreground">Compare your conversion price to the new investor price to see your advantage.</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-primary/10 rounded-lg">
            <h3 className="font-semibold mb-3">Valuation Cap Scenarios</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Your Cap</th>
                  <th className="text-left py-2">Series A Pre-Money</th>
                  <th className="text-left py-2">Conversion Valuation</th>
                  <th className="text-left py-2">Effective Discount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">$5M</td>
                  <td className="py-2">$10M</td>
                  <td className="py-2">$5M (cap)</td>
                  <td className="py-2">50%</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">$8M</td>
                  <td className="py-2">$12M</td>
                  <td className="py-2">$8M (cap)</td>
                  <td className="py-2">33%</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">$10M</td>
                  <td className="py-2">$8M</td>
                  <td className="py-2">$8M (pre-money)</td>
                  <td className="py-2">0% (no benefit)</td>
                </tr>
                <tr>
                  <td className="py-2">$5M</td>
                  <td className="py-2">$20M</td>
                  <td className="py-2">$5M (cap)</td>
                  <td className="py-2">75%</td>
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
              <h3 className="font-semibold mb-2">What is a valuation cap in a SAFE?</h3>
              <p className="text-sm text-muted-foreground">A valuation cap is the maximum company valuation at which your SAFE investment converts to equity. If the company's actual valuation exceeds the cap, you convert at the lower cap valuation, giving you more shares for your investment.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How does a valuation cap benefit investors?</h3>
              <p className="text-sm text-muted-foreground">The cap rewards early investors for taking more risk. If you invest at a $5M cap and the company raises Series A at $20M, you convert at $5M—effectively getting a 75% discount compared to new investors.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What happens if the valuation is below the cap?</h3>
              <p className="text-sm text-muted-foreground">If the Series A valuation is lower than your cap, you convert at the actual (lower) valuation. The cap only helps when the company performs better than expected.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What's a typical valuation cap for startups?</h3>
              <p className="text-sm text-muted-foreground">Early-stage caps range from $3M-$15M depending on market, team, and traction. Seed-stage companies often have $5M-$8M caps, while hot startups in competitive markets may have $10M-$20M+ caps.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How is the conversion price calculated?</h3>
              <p className="text-sm text-muted-foreground">Conversion Price = Conversion Valuation ÷ Fully Diluted Shares Outstanding. If a company has 10M shares and converts at $5M valuation, the price is $0.50 per share. Your $100K investment buys 200,000 shares.</p>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
      </div>
    </div>
  );
}
