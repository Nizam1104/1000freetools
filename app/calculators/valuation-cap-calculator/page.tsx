"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
      </div>
    </div>
  );
}
