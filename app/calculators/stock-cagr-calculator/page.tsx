"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function StockCAGRCalculatorPage() {
  const [beginningValue, setBeginningValue] = useState<string>("");
  const [endingValue, setEndingValue] = useState<string>("");
  const [numberOfYears, setNumberOfYears] = useState<string>("");
  const [result, setResult] = useState<{
    cagr: number;
    totalReturn: number;
    absoluteReturn: number;
  } | null>(null);

  const calculateCAGR = () => {
    const BV = parseFloat(beginningValue);
    const EV = parseFloat(endingValue);
    const N = parseFloat(numberOfYears);

    if (isNaN(BV) || isNaN(EV) || isNaN(N) || BV <= 0 || N <= 0) {
      return;
    }

    const cagr = (Math.pow(EV / BV, 1 / N) - 1) * 100;
    const absoluteReturn = ((EV - BV) / BV) * 100;
    const totalReturn = EV - BV;

    setResult({ cagr, totalReturn, absoluteReturn });
  };

  const reset = () => {
    setBeginningValue("");
    setEndingValue("");
    setNumberOfYears("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Stock CAGR Calculator</h1>
          <p className="text-muted-foreground">
            Calculate the Compound Annual Growth Rate of any stock or investment. Enter the beginning value, ending value, and number of years to find your CAGR.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="beginningValue">Beginning Value</Label>
                <Input
                  id="beginningValue"
                  type="number"
                  placeholder="Enter initial investment value"
                  value={beginningValue}
                  onChange={(e) => setBeginningValue(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endingValue">Ending Value</Label>
                <Input
                  id="endingValue"
                  type="number"
                  placeholder="Enter final investment value"
                  value={endingValue}
                  onChange={(e) => setEndingValue(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="numberOfYears">Number of Years</Label>
                <Input
                  id="numberOfYears"
                  type="number"
                  placeholder="Enter investment period in years"
                  value={numberOfYears}
                  onChange={(e) => setNumberOfYears(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateCAGR} className="flex-1">
                  Calculate CAGR
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
                    <p className="text-sm text-muted-foreground">CAGR (Compound Annual Growth Rate)</p>
                    <p className="text-3xl font-bold text-primary">{result.cagr.toFixed(2)}%</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Absolute Return</p>
                      <p className="text-lg font-bold">{result.absoluteReturn.toFixed(2)}%</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Gain</p>
                      <p className="text-lg font-bold">${result.totalReturn.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Formula: CAGR = (Ending Value / Beginning Value)^(1/n) - 1</p>
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
        <div className="mt-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-6">How the CAGR Calculator Works</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-3">1</div>
                  <h4 className="font-semibold mb-2">Enter Beginning Value</h4>
                  <p className="text-sm text-muted-foreground">Input the initial investment amount or stock price.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-3">2</div>
                  <h4 className="font-semibold mb-2">Add Ending Value</h4>
                  <p className="text-sm text-muted-foreground">Enter the final value after the investment period.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-3">3</div>
                  <h4 className="font-semibold mb-2">Specify Time Period</h4>
                  <p className="text-sm text-muted-foreground">Enter the number of years to calculate annualized return.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Why CAGR Matters</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Smooths Volatility</h4>
                    <p className="text-sm text-muted-foreground">CAGR provides a consistent annual rate, ignoring year-to-year fluctuations.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Compare Investments</h4>
                    <p className="text-sm text-muted-foreground">Easily compare returns across different assets and time periods.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Better Than Average</h4>
                    <p className="text-sm text-muted-foreground">Unlike arithmetic average, CAGR accounts for compounding effects.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Industry Standard</h4>
                    <p className="text-sm text-muted-foreground">CAGR is the standard metric used by financial professionals worldwide.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-1">What is a good CAGR for stocks?</h4>
                  <p className="text-sm text-muted-foreground">The S&P 500 has historically returned about 10% CAGR over long periods. 12-15%+ is considered excellent for individual stocks, while 7-10% is solid for diversified portfolios.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">What are CAGR limitations?</h4>
                  <p className="text-sm text-muted-foreground">CAGR ignores volatility and risk. It assumes steady growth, which rarely happens. Two investments with same CAGR can have very different risk profiles.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">How is CAGR different from average return?</h4>
                  <p className="text-sm text-muted-foreground">Average return is arithmetic mean of yearly returns. CAGR is the geometric mean that accounts for compounding. CAGR is always lower or equal to arithmetic average.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Can CAGR be negative?</h4>
                  <p className="text-sm text-muted-foreground">Yes, if the ending value is less than the beginning value, CAGR will be negative, indicating a loss over the investment period.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">What time period should I use for CAGR?</h4>
                  <p className="text-sm text-muted-foreground">Longer periods (5+ years) provide more meaningful CAGR figures. Short-term CAGR can be misleading due to market volatility.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Related Tools Section */}
        <div className="mt-6">
        </div>
      </div>
    </div>
  );
}
