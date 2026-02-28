"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DividendReinvestmentCalculatorPage() {
  const [initialShares, setInitialShares] = useState<string>("");
  const [sharePrice, setSharePrice] = useState<string>("");
  const [dividendYield, setDividendYield] = useState<string>("");
  const [years, setYears] = useState<string>("");
  const [result, setResult] = useState<{
    finalShares: number;
    finalValue: number;
    totalDividends: number;
    totalInvested: number;
    yearByYear: Array<{ year: number; shares: number; dividends: number; value: number }>;
  } | null>(null);

  const calculateDRIP = () => {
    const shares = parseFloat(initialShares);
    const price = parseFloat(sharePrice);
    const yieldRate = parseFloat(dividendYield) / 100;
    const totalYears = parseFloat(years);

    if (isNaN(shares) || isNaN(price) || isNaN(yieldRate) || isNaN(totalYears) || shares <= 0 || price <= 0 || totalYears <= 0) {
      return;
    }

    let currentShares = shares;
    const initialInvestment = shares * price;
    let totalDividends = 0;
    const yearByYear = [];

    for (let year = 1; year <= totalYears; year++) {
      const portfolioValue = currentShares * price;
      const dividends = portfolioValue * yieldRate;
      totalDividends += dividends;
      const newShares = dividends / price;
      currentShares += newShares;

      yearByYear.push({
        year,
        shares: Math.round(currentShares * 1000) / 1000,
        dividends: Math.round(dividends * 100) / 100,
        value: Math.round(currentShares * price * 100) / 100,
      });
    }

    setResult({
      finalShares: currentShares,
      finalValue: currentShares * price,
      totalDividends,
      totalInvested: initialInvestment,
      yearByYear,
    });
  };

  const reset = () => {
    setInitialShares("");
    setSharePrice("");
    setDividendYield("");
    setYears("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Dividend Reinvestment (DRIP) Calculator</h1>
          <p className="text-muted-foreground">
            Calculate how reinvesting dividends to buy more shares compounds your portfolio growth over time. See the power of DRIP on your long-term wealth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="initialShares">Initial Shares</Label>
                <Input
                  id="initialShares"
                  type="number"
                  placeholder="Enter number of shares"
                  value={initialShares}
                  onChange={(e) => setInitialShares(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sharePrice">Share Price</Label>
                <Input
                  id="sharePrice"
                  type="number"
                  placeholder="Enter current share price"
                  value={sharePrice}
                  onChange={(e) => setSharePrice(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dividendYield">Dividend Yield (%)</Label>
                <Input
                  id="dividendYield"
                  type="number"
                  placeholder="Enter dividend yield"
                  value={dividendYield}
                  onChange={(e) => setDividendYield(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="years">Investment Period (Years)</Label>
                <Input
                  id="years"
                  type="number"
                  placeholder="Enter number of years"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateDRIP} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Final Portfolio Value</p>
                    <p className="text-3xl font-bold text-primary">${result.finalValue.toFixed(2)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Final Shares</p>
                      <p className="text-lg font-bold">{result.finalShares.toFixed(3)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Initial Shares</p>
                      <p className="text-lg font-bold">{parseFloat(initialShares).toFixed(0)}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Dividends Reinvested</p>
                    <p className="text-lg font-bold text-green-600">${result.totalDividends.toFixed(2)}</p>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-semibold mb-2">Year-by-Year Growth</h4>
                    <div className="max-h-48 overflow-y-auto">
                      <table className="w-full text-sm">
                        <thead className="sticky top-0 bg-background">
                          <tr className="border-b">
                            <th className="text-left py-1">Year</th>
                            <th className="text-right py-1">Shares</th>
                            <th className="text-right py-1">Dividends</th>
                            <th className="text-right py-1">Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.yearByYear.map((y) => (
                            <tr key={y.year} className="border-b last:border-0">
                              <td className="py-1">{y.year}</td>
                              <td className="text-right">{y.shares.toFixed(2)}</td>
                              <td className="text-right">${y.dividends.toFixed(0)}</td>
                              <td className="text-right">${y.value.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
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
