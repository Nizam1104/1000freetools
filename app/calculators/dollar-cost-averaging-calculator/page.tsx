"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DollarCostAveragingCalculatorPage() {
  const [investmentAmount, setInvestmentAmount] = useState<string>("");
  const [interval, setInterval] = useState<string>("monthly");
  const [duration, setDuration] = useState<string>("");
  const [initialPrice, setInitialPrice] = useState<string>("");
  const [finalPrice, setFinalPrice] = useState<string>("");
  const [result, setResult] = useState<{
    totalInvested: number;
    totalUnits: number;
    averageCostPerUnit: number;
    finalValue: number;
    gainLoss: number;
    gainLossPercent: number;
  } | null>(null);

  const calculateDCA = () => {
    const amount = parseFloat(investmentAmount);
    const years = parseFloat(duration);
    const initPrice = parseFloat(initialPrice);
    const finPrice = parseFloat(finalPrice);

    if (isNaN(amount) || isNaN(years) || isNaN(initPrice) || isNaN(finPrice) || amount <= 0 || years <= 0 || initPrice <= 0 || finPrice <= 0) {
      return;
    }

    let investmentsPerYear = 12;
    if (interval === "weekly") investmentsPerYear = 52;
    if (interval === "quarterly") investmentsPerYear = 4;
    if (interval === "annually") investmentsPerYear = 1;

    const totalInvestments = investmentsPerYear * years;
    const totalInvested = amount * totalInvestments;

    const avgPrice = (initPrice + finPrice) / 2;
    const totalUnits = totalInvested / avgPrice;
    const averageCostPerUnit = totalInvested / totalUnits;
    const finalValue = totalUnits * finPrice;
    const gainLoss = finalValue - totalInvested;
    const gainLossPercent = (gainLoss / totalInvested) * 100;

    setResult({
      totalInvested,
      totalUnits,
      averageCostPerUnit,
      finalValue,
      gainLoss,
      gainLossPercent,
    });
  };

  const reset = () => {
    setInvestmentAmount("");
    setInterval("monthly");
    setDuration("");
    setInitialPrice("");
    setFinalPrice("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Dollar-Cost Averaging (DCA) Calculator</h1>
          <p className="text-muted-foreground">
            Simulate investing a fixed amount at regular intervals over time. Calculate your average cost per unit, total invested, and final portfolio value with DCA.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="investmentAmount">Investment Amount</Label>
                <Input
                  id="investmentAmount"
                  type="number"
                  placeholder="Enter amount per interval"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interval">Investment Interval</Label>
                <select
                  id="interval"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={interval}
                  onChange={(e) => setInterval(e.target.value)}
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="annually">Annually</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Investment Duration (Years)</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="Enter duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="initialPrice">Initial Price per Unit</Label>
                <Input
                  id="initialPrice"
                  type="number"
                  placeholder="Enter starting price"
                  value={initialPrice}
                  onChange={(e) => setInitialPrice(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="finalPrice">Final Price per Unit</Label>
                <Input
                  id="finalPrice"
                  type="number"
                  placeholder="Enter ending price"
                  value={finalPrice}
                  onChange={(e) => setFinalPrice(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateDCA} className="flex-1">
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
                      <p className="text-sm text-muted-foreground">Total Invested</p>
                      <p className="text-lg font-bold">${result.totalInvested.toFixed(2)}</p>
                    </div>
                    <div className={`p-4 rounded-lg ${result.gainLoss >= 0 ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
                      <p className="text-sm text-muted-foreground">Gain/Loss</p>
                      <p className={`text-lg font-bold ${result.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${result.gainLoss.toFixed(2)} ({result.gainLossPercent.toFixed(2)}%)
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Units</p>
                      <p className="text-lg font-bold">{result.totalUnits.toFixed(4)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Avg Cost/Unit</p>
                      <p className="text-lg font-bold">${result.averageCostPerUnit.toFixed(2)}</p>
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

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Dollar-Cost Averaging Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter your investment amount and frequency</p>
                    <p>Input the fixed amount you plan to invest each period. Choose weekly, monthly, quarterly, or annually based on your investment schedule.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Set the investment duration and price range</p>
                    <p>Enter how many years you will invest. Provide the starting price and expected ending price per unit of your investment.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Click Calculate to see your DCA results</p>
                    <p>You will see total invested, units accumulated, average cost per unit, final portfolio value, and your gain or loss percentage.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                DCA vs Lump Sum Comparison
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Scenario</th>
                      <th className="text-left py-3 px-2 font-semibold">Strategy</th>
                      <th className="text-left py-3 px-2 font-semibold">Avg Cost/Unit</th>
                      <th className="text-left py-3 px-2 font-semibold">Risk Level</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Rising Market</td>
                      <td className="py-3 px-2">Lump Sum</td>
                      <td className="py-3 px-2">$10.00</td>
                      <td className="py-3 px-2">Higher</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Rising Market</td>
                      <td className="py-3 px-2">DCA</td>
                      <td className="py-3 px-2">$12.50</td>
                      <td className="py-3 px-2">Lower</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Falling Market</td>
                      <td className="py-3 px-2">Lump Sum</td>
                      <td className="py-3 px-2">$10.00</td>
                      <td className="py-3 px-2">Higher</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Falling Market</td>
                      <td className="py-3 px-2">DCA</td>
                      <td className="py-3 px-2">$7.50</td>
                      <td className="py-3 px-2">Lower</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Volatile Market</td>
                      <td className="py-3 px-2">Lump Sum</td>
                      <td className="py-3 px-2">Varies</td>
                      <td className="py-3 px-2">Higher</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Volatile Market</td>
                      <td className="py-3 px-2">DCA</td>
                      <td className="py-3 px-2">$9.25</td>
                      <td className="py-3 px-2">Lower</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: This example assumes a $10 starting price with various market conditions. DCA smooths out the average cost over time.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Dollar-Cost Averaging
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">What Is Dollar-Cost Averaging?</h4>
                  <p>
                    Dollar-cost averaging (DCA) is an investment strategy where you invest a fixed amount of money at regular intervals, regardless of the asset price. When prices are high, your fixed amount buys fewer shares. When prices are low, it buys more shares. Over time, this can lower your average cost per share compared to trying to time the market.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How DCA Reduces Risk</h4>
                  <p>
                    The main benefit of DCA is that it removes the need to time the market. Instead of investing a lump sum all at once and risking buying at a peak, you spread your investments over time. This reduces the impact of volatility and protects against the regret of investing everything right before a downturn.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">The Math Behind DCA</h4>
                  <p>
                    If you invest $100 monthly for 12 months, you buy more shares when the price is $8 and fewer when it is $12. Your average cost per share will be lower than the average price over that period. This is because you automatically buy more shares at lower prices, weighting your average cost downward.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">When DCA Works Best</h4>
                  <p>
                    DCA shines in volatile or declining markets where prices fluctuate significantly. In a steadily rising market, a lump sum investment would outperform DCA because you would have more money working for you earlier. However, since nobody can predict market direction consistently, DCA provides a disciplined approach that works across different market conditions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Best Practices for Dollar-Cost Averaging
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Automate Your Investments</p>
                    <p>Set up automatic transfers from your bank to your investment account. This ensures you invest consistently without having to remember each period. Most brokerages offer automatic investment plans.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Choose Low-Cost Index Funds</p>
                    <p>For most investors, broad market index funds are the best choice for DCA. They have low fees, instant diversification, and historically solid returns. Expense ratios under 0.10% are ideal.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Stay Consistent Through Market Swings</p>
                    <p>The hardest part of DCA is continuing to invest when markets are falling. This is exactly when you should keep buying. Your fixed amount purchases more shares at lower prices, setting you up for better returns when markets recover.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Increase Contributions Over Time</p>
                    <p>As your income grows, increase your DCA amount annually. Even small increases compound significantly over decades. Many investors automatically increase contributions by 1-2% each year.</p>
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
                  <h4 className="font-medium text-foreground mb-2">Is dollar-cost averaging better than lump sum investing?</h4>
                  <p>
                    Statistically, lump sum investing outperforms DCA about two-thirds of the time because markets tend to rise over time. However, DCA reduces regret risk and emotional stress. For investors who worry about timing the market or would panic if their lump sum dropped 20% immediately, DCA provides psychological benefits that may be worth the slight expected return trade-off.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How often should I invest with DCA?</h4>
                  <p>
                    Monthly investing aligns well with most paychecks and is common for 401(k) contributions. Weekly or biweekly investing can smooth out volatility slightly more but may incur more transaction fees depending on your broker. The exact frequency matters less than consistency. Pick a schedule you can maintain.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Does DCA work for cryptocurrency?</h4>
                  <p>
                    Yes, DCA is particularly well-suited for cryptocurrency given its extreme volatility. Buying a fixed dollar amount of Bitcoin or Ethereum weekly or monthly reduces the risk of buying at a peak. Many crypto investors use DCA as their primary strategy rather than trying to time volatile markets.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What is the average cost per unit in DCA?</h4>
                  <p>
                    The average cost per unit is your total amount invested divided by the total number of units purchased. With DCA, this average cost is typically lower than the average market price over the same period because you automatically buy more units when prices are low and fewer when prices are high.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Should I stop DCA during a bear market?</h4>
                  <p>
                    No, continuing DCA during a bear market is when the strategy provides the most value. Your fixed contributions buy more shares at depressed prices. Investors who maintain DCA through downturns are often rewarded with strong returns when markets eventually recover. Stopping contributions locks in losses and misses the recovery.
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
                  href="/calculators/compound-interest-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Compound Interest Calculator</span>
                  <p className="text-muted-foreground">Calculate how your investments grow over time with compound interest</p>
                </a>
                <a
                  href="/calculators/roi-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">ROI Calculator</span>
                  <p className="text-muted-foreground">Measure the return on investment for any investment opportunity</p>
                </a>
                <a
                  href="/calculators/sip-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">SIP Calculator</span>
                  <p className="text-muted-foreground">Plan your systematic investment plan for mutual funds</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
