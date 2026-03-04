"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ReverseStockSplitCalculatorPage() {
  const [currentShares, setCurrentShares] = useState<string>("");
  const [currentPrice, setCurrentPrice] = useState<string>("");
  const [consolidationRatio, setConsolidationRatio] = useState<string>("");
  const [result, setResult] = useState<{
    newShares: number;
    newPrice: number;
    oldValue: number;
    newValue: number;
  } | null>(null);

  const calculateReverseSplit = () => {
    const shares = parseFloat(currentShares);
    const price = parseFloat(currentPrice);
    const ratio = parseFloat(consolidationRatio);

    if (isNaN(shares) || isNaN(price) || isNaN(ratio) || shares <= 0 || price <= 0 || ratio <= 0) {
      return;
    }

    const newShares = shares / ratio;
    const newPrice = price * ratio;
    const oldValue = shares * price;
    const newValue = newShares * newPrice;

    setResult({
      newShares,
      newPrice,
      oldValue,
      newValue,
    });
  };

  const reset = () => {
    setCurrentShares("");
    setCurrentPrice("");
    setConsolidationRatio("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Reverse Stock Split Calculator</h1>
          <p className="text-muted-foreground">
            Calculate the reduced share count and new price per share after a reverse stock split. Enter the consolidation ratio to see how your holdings are affected.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentShares">Current Number of Shares</Label>
                <Input
                  id="currentShares"
                  type="number"
                  placeholder="Enter share count"
                  value={currentShares}
                  onChange={(e) => setCurrentShares(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentPrice">Current Price Per Share</Label>
                <Input
                  id="currentPrice"
                  type="number"
                  placeholder="Enter current price"
                  value={currentPrice}
                  onChange={(e) => setCurrentPrice(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="consolidationRatio">Consolidation Ratio (e.g., 10 for 1:10 reverse split)</Label>
                <Input
                  id="consolidationRatio"
                  type="number"
                  step="0.01"
                  placeholder="Enter consolidation ratio"
                  value={consolidationRatio}
                  onChange={(e) => setConsolidationRatio(e.target.value)}
                />
              </div>

              <div className="pt-4">
                <div className="text-sm text-muted-foreground">
                  <p>Common reverse split ratios:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>1:2 - Half shares, double price</li>
                    <li>1:10 - One-tenth shares, 10x price</li>
                    <li>1:20 - One-twentieth shares, 20x price</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateReverseSplit} className="flex-1">
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
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Old Shares</p>
                      <p className="text-lg font-bold">{parseFloat(currentShares).toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">New Shares</p>
                      <p className="text-lg font-bold text-orange-600">{result.newShares.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Old Price</p>
                      <p className="text-lg font-bold">${parseFloat(currentPrice).toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">New Price</p>
                      <p className="text-lg font-bold text-orange-600">${result.newPrice.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Value</p>
                    <p className="text-lg font-bold text-green-600">${result.newValue.toFixed(2)} (unchanged)</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Reverse split ratio: 1:{consolidationRatio} | Shares reduced by {((1 - result.newShares / parseFloat(currentShares)) * 100).toFixed(1)}%</p>
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
                How to Use This Reverse Stock Split Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter your current share count</p>
                    <p>Input the total number of shares you own before the reverse split. For example, if you own 1,000 shares, enter &quot;1000&quot;.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter the current price per share</p>
                    <p>Input the stock&apos;s current market price. This helps calculate your total holding value before and after the split.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter the consolidation ratio</p>
                    <p>For a 1:10 reverse split, enter &quot;10&quot;. The calculator shows your new share count, adjusted price, and confirms your total value stays the same.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Common Reverse Split Ratios
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Ratio</th>
                      <th className="text-left py-3 px-2 font-semibold">Example</th>
                      <th className="text-left py-3 px-2 font-semibold">Old Shares</th>
                      <th className="text-left py-3 px-2 font-semibold">New Shares</th>
                      <th className="text-left py-3 px-2 font-semibold">Price Change</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">1:2</td>
                      <td className="py-3 px-2">2-for-1</td>
                      <td className="py-3 px-2">1,000</td>
                      <td className="py-3 px-2">500</td>
                      <td className="py-3 px-2">2x</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">1:5</td>
                      <td className="py-3 px-2">5-for-1</td>
                      <td className="py-3 px-2">1,000</td>
                      <td className="py-3 px-2">200</td>
                      <td className="py-3 px-2">5x</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">1:10</td>
                      <td className="py-3 px-2">10-for-1</td>
                      <td className="py-3 px-2">1,000</td>
                      <td className="py-3 px-2">100</td>
                      <td className="py-3 px-2">10x</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">1:20</td>
                      <td className="py-3 px-2">20-for-1</td>
                      <td className="py-3 px-2">1,000</td>
                      <td className="py-3 px-2">50</td>
                      <td className="py-3 px-2">20x</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">1:50</td>
                      <td className="py-3 px-2">50-for-1</td>
                      <td className="py-3 px-2">1,000</td>
                      <td className="py-3 px-2">20</td>
                      <td className="py-3 px-2">50x</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: Your total investment value remains unchanged. Only the number of shares and price per share adjust.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Reverse Stock Splits
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  A reverse stock split reduces the number of outstanding shares while increasing the price per share proportionally. If you owned 100 shares at $5 each before a 1:10 reverse split, you&apos;d own 10 shares at $50 each afterward. Your total value stays at $500.
                </p>
                <p>
                  Companies do reverse splits for a few reasons. The most common is to meet minimum price requirements for stock exchange listing. NYSE requires a $4 minimum share price; NASDAQ requires $1. Stocks trading below these thresholds face delisting risk. A reverse split boosts the price overnight.
                </p>
                <p>
                  Sometimes companies use reverse splits to appear more &quot;respectable&quot; to institutional investors. Some funds won&apos;t buy stocks under $5 or $10. A higher price per share can also reduce transaction costs for brokers who charge per-share fees.
                </p>
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Important:</strong> Reverse splits don&apos;t create value. They&apos;re like exchanging a $10 bill for two $5 bills — you have different denominations, but the same amount of money.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                What Reverse Splits Mean for Investors
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Fractional Shares</h4>
                  <p>
                    If the reverse split would give you fractional shares, companies typically round up to the nearest whole share or pay cash for the fraction. Check the company&apos;s proxy statement for their specific policy.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Market Perception</h4>
                  <p>
                    Reverse splits often signal trouble. The stock price fell so low that management needed engineering to meet exchange rules. Studies show stocks underperform after reverse splits, though causation is unclear — the underlying business problems caused both the price drop and the need for a split.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Options and Warrants</h4>
                  <p>
                    Options contracts adjust for reverse splits. A contract for 100 shares at a $50 strike might become a contract for 10 shares at a $500 strike. The Options Clearing Corporation handles these adjustments automatically.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Tax Implications</h4>
                  <p>
                    Reverse splits are generally not taxable events. Your cost basis per share adjusts proportionally. If you paid $3 per share and owned 100 shares ($300 total basis), after a 1:10 split you&apos;d have 10 shares with a $30 per share basis — still $300 total.
                  </p>
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
                  <h4 className="font-medium text-foreground mb-2">Does a reverse stock split change my investment value?</h4>
                  <p>
                    No. Your total investment value stays exactly the same. If you owned $5,000 worth of stock before the split, you&apos;ll own $5,000 worth after. The number of shares decreases and the price per share increases proportionally.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Is a reverse split good or bad?</h4>
                  <p>
                    The split itself is neutral — it&apos;s just math. But reverse splits often happen at struggling companies that needed to avoid delisting. The stock may continue falling if the underlying business doesn&apos;t improve. That said, some companies use reverse splits as part of legitimate restructuring.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What happens to fractional shares in a reverse split?</h4>
                  <p>
                    Companies handle fractions differently. Some round up to the nearest whole share (benefiting shareholders). Others round down or pay cash for the fractional portion. The specific terms appear in the company&apos;s reverse split announcement filed with the SEC.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How do I calculate my new share count?</h4>
                  <p>
                    Divide your current shares by the split ratio. For a 1:10 reverse split with 500 shares: 500 / 10 = 50 new shares. Multiply your old price by the ratio for the new price. $2 per share becomes $20 after a 1:10 split.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Can a company do multiple reverse splits?</h4>
                  <p>
                    Yes, though it&apos;s a bad sign. Some companies repeatedly reverse split as their stock keeps falling. This is sometimes called &quot;reverse split syndrome&quot; — the company can&apos;t fix its fundamental problems, so it keeps engineering the stock price.
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
                  href="/calculators/stock-average-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Stock Average Calculator</span>
                  <p className="text-muted-foreground">Calculate your average cost per share across multiple purchases</p>
                </a>
                <a
                  href="/calculators/stock-split-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Stock Split Calculator</span>
                  <p className="text-muted-foreground">Calculate share count and price after forward stock splits</p>
                </a>
                <a
                  href="/calculators/dividend-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Dividend Calculator</span>
                  <p className="text-muted-foreground">Estimate dividend income and reinvestment growth over time</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
