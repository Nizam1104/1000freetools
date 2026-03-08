"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
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

        {/* SEO Content Section */}
        <div className="mt-8 space-y-8">
          {/* How It Works */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">How the DRIP Calculator Works</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-semibold mb-2">Enter Initial Investment</h3>
                    <p className="text-sm text-muted-foreground">Input your starting shares, current share price, and dividend yield percentage.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-semibold mb-2">Set Investment Period</h3>
                    <p className="text-sm text-muted-foreground">Choose how many years you want to project your dividend reinvestment growth.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-semibold mb-2">View Compound Growth</h3>
                    <p className="text-sm text-muted-foreground">See year-by-year breakdown of share accumulation and portfolio value growth.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features and Benefits */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Features of This DRIP Calculator</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Compound Growth Visualization</h3>
                      <p className="text-sm text-muted-foreground">Watch how reinvested dividends buy more shares, which then generate more dividends.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Year-by-Year Breakdown</h3>
                      <p className="text-sm text-muted-foreground">Detailed annual projection showing shares accumulated and dividends reinvested each year.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Total Dividends Tracked</h3>
                      <p className="text-sm text-muted-foreground">See the cumulative dividends reinvested over your entire investment period.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Final Portfolio Value</h3>
                      <p className="text-sm text-muted-foreground">Calculate total portfolio worth including all reinvested dividends and share growth.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Free DRIP Planning Tool</h3>
                      <p className="text-sm text-muted-foreground">Completely free dividend reinvestment calculator for long-term investors.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Mobile-Friendly Interface</h3>
                      <p className="text-sm text-muted-foreground">Plan your dividend strategy on any device, anywhere.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reference Table */}
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-3">DRIP Benefits at a Glance</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Benefit</th>
                        <th className="text-left py-2">Description</th>
                        <th className="text-left py-2">Impact</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Compound Growth</td>
                        <td className="py-2">Dividends buy more shares</td>
                        <td className="py-2">Exponential portfolio growth</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Dollar-Cost Averaging</td>
                        <td className="py-2">Automatic regular purchases</td>
                        <td className="py-2">Lower average cost per share</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">No Transaction Fees</td>
                        <td className="py-2">Most DRIPs are commission-free</td>
                        <td className="py-2">Maximize investment efficiency</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium">Fractional Shares</td>
                        <td className="py-2">Reinvest exact dividend amounts</td>
                        <td className="py-2">100% of dividends working for you</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">What is a dividend reinvestment plan (DRIP)?</h3>
                  <p className="text-sm text-muted-foreground">A DRIP automatically uses your cash dividends to purchase additional shares of the same stock, often without commission fees. This allows your investment to compound as you earn dividends on an increasing number of shares over time.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">How does dividend reinvestment compound growth?</h3>
                  <p className="text-sm text-muted-foreground">When dividends are reinvested, they buy more shares. Those additional shares then generate their own dividends, which buy even more shares. This snowball effect accelerates portfolio growth compared to taking cash dividends.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Is DRIP better than taking cash dividends?</h3>
                  <p className="text-sm text-muted-foreground">For long-term growth, DRIP is typically better due to compounding. However, taking cash provides income for living expenses. Choose DRIP during accumulation years and cash dividends when you need retirement income.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Are reinvested dividends taxed?</h3>
                  <p className="text-sm text-muted-foreground">Yes, reinvested dividends are still taxable in the year received, even though you did not take cash. The good news is your cost basis increases by the reinvested amount, reducing capital gains when you eventually sell.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">What is a good dividend yield for DRIP investing?</h3>
                  <p className="text-sm text-muted-foreground">Look for dividend yields between 3-6% from financially stable companies with a history of dividend growth. Too high a yield (above 8%) may indicate risk. Focus on dividend aristocrats with 25+ years of consecutive increases.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Tools */}
        </div>
      </div>
    </div>
  );
}
