"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DividendPayoutCalculatorPage() {
  const [sharesHeld, setSharesHeld] = useState<string>("");
  const [dividendPerShare, setDividendPerShare] = useState<string>("");
  const [payoutFrequency, setPayoutFrequency] = useState<string>("quarterly");
  const [result, setResult] = useState<{
    annualDividend: number;
    perPayment: number;
  } | null>(null);

  const calculateDividend = () => {
    const shares = parseFloat(sharesHeld);
    const dps = parseFloat(dividendPerShare);

    if (isNaN(shares) || isNaN(dps) || shares <= 0 || dps <= 0) {
      return;
    }

    let paymentsPerYear = 4;
    switch (payoutFrequency) {
      case "monthly":
        paymentsPerYear = 12;
        break;
      case "quarterly":
        paymentsPerYear = 4;
        break;
      case "semi-annual":
        paymentsPerYear = 2;
        break;
      case "annual":
        paymentsPerYear = 1;
        break;
    }

    const perPayment = shares * dps;
    const annualDividend = perPayment * paymentsPerYear;

    setResult({ annualDividend, perPayment });
  };

  const reset = () => {
    setSharesHeld("");
    setDividendPerShare("");
    setPayoutFrequency("quarterly");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Dividend Payout Calculator</h1>
          <p className="text-muted-foreground">
            Estimate your total dividend income from a stock holding. Enter shares held, dividend per share, and payout frequency to calculate your earnings.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sharesHeld">Number of Shares Held</Label>
                <Input
                  id="sharesHeld"
                  type="number"
                  placeholder="Enter number of shares"
                  value={sharesHeld}
                  onChange={(e) => setSharesHeld(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dividendPerShare">Dividend Per Share ($)</Label>
                <Input
                  id="dividendPerShare"
                  type="number"
                  step="0.01"
                  placeholder="Enter dividend per share"
                  value={dividendPerShare}
                  onChange={(e) => setDividendPerShare(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="payoutFrequency">Payout Frequency</Label>
                <Select value={payoutFrequency} onValueChange={setPayoutFrequency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="semi-annual">Semi-Annual</SelectItem>
                    <SelectItem value="annual">Annual</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateDividend} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Annual Dividend Income</p>
                    <p className="text-3xl font-bold text-primary">${result.annualDividend.toFixed(2)}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Per Payout</p>
                    <p className="text-xl font-bold">${result.perPayment.toFixed(2)}</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Shares: {parseFloat(sharesHeld).toFixed(0)} | Dividend/Share: ${parseFloat(dividendPerShare).toFixed(2)}</p>
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
              <h2 className="text-2xl font-semibold mb-6">How the Dividend Payout Calculator Works</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-semibold mb-2">Enter Your Share Holdings</h3>
                    <p className="text-sm text-muted-foreground">Input the total number of shares you own in the dividend-paying stock.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-semibold mb-2">Add Dividend Per Share</h3>
                    <p className="text-sm text-muted-foreground">Enter the dividend amount paid per share for each payout period.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-semibold mb-2">Get Annual Income Estimate</h3>
                    <p className="text-sm text-muted-foreground">Receive your total annual dividend income and per-payout amount based on frequency.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features and Benefits */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Features of This Dividend Calculator</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Multiple Payout Frequencies</h3>
                      <p className="text-sm text-muted-foreground">Support for monthly, quarterly, semi-annual, and annual dividend payment schedules.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Annual Income Projection</h3>
                      <p className="text-sm text-muted-foreground">Calculate total yearly dividend income to plan your passive income strategy.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Per-Payment Breakdown</h3>
                      <p className="text-sm text-muted-foreground">See exactly how much you will receive with each dividend payment.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Simple and Fast</h3>
                      <p className="text-sm text-muted-foreground">Get instant dividend calculations without complex setup or registration.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Free Investment Tool</h3>
                      <p className="text-sm text-muted-foreground">Completely free dividend calculator for investors of all experience levels.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Mobile-Friendly Design</h3>
                      <p className="text-sm text-muted-foreground">Calculate dividend income on any device, anywhere.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reference Table */}
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-3">Common Dividend Payment Schedules</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Frequency</th>
                        <th className="text-left py-2">Payments Per Year</th>
                        <th className="text-left py-2">Example Companies</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Monthly</td>
                        <td className="py-2">12</td>
                        <td className="py-2">REITs, Income funds</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Quarterly</td>
                        <td className="py-2">4</td>
                        <td className="py-2">Most US stocks (AAPL, JNJ)</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Semi-Annual</td>
                        <td className="py-2">2</td>
                        <td className="py-2">UK, Australian stocks</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium">Annual</td>
                        <td className="py-2">1</td>
                        <td className="py-2">Some European stocks</td>
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
                  <h3 className="font-semibold mb-2">How do I calculate my total dividend income?</h3>
                  <p className="text-sm text-muted-foreground">Multiply your number of shares by the dividend per share, then multiply by the number of payments per year. For example, 100 shares x $0.50 per share x 4 quarterly payments = $200 annual dividend income.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">What is dividend per share (DPS)?</h3>
                  <p className="text-sm text-muted-foreground">Dividend per share is the total dividends paid by a company divided by the number of outstanding shares. It represents how much money you receive for each share you own during a payment period.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">How often do stocks pay dividends?</h3>
                  <p className="text-sm text-muted-foreground">Most US stocks pay dividends quarterly (4 times per year). Some REITs and income funds pay monthly. International stocks may pay semi-annually or annually. Check the company&apos;s investor relations page for their specific schedule.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">What is a good dividend yield?</h3>
                  <p className="text-sm text-muted-foreground">A dividend yield between 2-6% is generally considered good. Yields above 6% may indicate higher risk or a falling stock price. The S&P 500 average yield is around 1.5-2%, but varies by sector.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Are dividends taxed?</h3>
                  <p className="text-sm text-muted-foreground">Yes, dividends are typically taxed. Qualified dividends are taxed at capital gains rates (0%, 15%, or 20% depending on income). Non-qualified dividends are taxed at ordinary income rates. Tax treatment varies by country and account type.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Tools */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Related Investment Calculators</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <a href="/calculators/dividend-reinvestment-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
                  <h3 className="font-semibold mb-2">Dividend Reinvestment Calculator</h3>
                  <p className="text-sm text-muted-foreground">See how reinvesting dividends compounds your portfolio growth over time with DRIP.</p>
                </a>
                <a href="/calculators/dividend-yield-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
                  <h3 className="font-semibold mb-2">Dividend Yield Calculator</h3>
                  <p className="text-sm text-muted-foreground">Calculate dividend yield percentage to compare income potential across stocks.</p>
                </a>
                <a href="/calculators/compound-interest-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
                  <h3 className="font-semibold mb-2">Compound Interest Calculator</h3>
                  <p className="text-sm text-muted-foreground">Project investment growth with compound interest for long-term wealth building.</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
