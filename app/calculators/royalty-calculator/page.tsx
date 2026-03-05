"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RoyaltyCalculatorPage() {
  const [unitsSold, setUnitsSold] = useState<string>("");
  const [pricePerUnit, setPricePerUnit] = useState<string>("");
  const [royaltyRate, setRoyaltyRate] = useState<string>("");
  const [deductions, setDeductions] = useState<string>("");
  const [result, setResult] = useState<{
    grossRevenue: number;
    royaltyEarnings: number;
    afterDeductions: number;
  } | null>(null);

  const calculateRoyalty = () => {
    const units = parseFloat(unitsSold);
    const price = parseFloat(pricePerUnit);
    const rate = parseFloat(royaltyRate) / 100;
    const deduct = parseFloat(deductions) || 0;

    if (isNaN(units) || isNaN(price) || isNaN(rate) || units <= 0 || price <= 0 || rate <= 0) {
      return;
    }

    const grossRevenue = units * price;
    const royaltyEarnings = grossRevenue * rate;
    const afterDeductions = royaltyEarnings - deduct;

    setResult({
      grossRevenue,
      royaltyEarnings,
      afterDeductions: Math.max(0, afterDeductions),
    });
  };

  const reset = () => {
    setUnitsSold("");
    setPricePerUnit("");
    setRoyaltyRate("");
    setDeductions("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Royalty Calculator – Estimate Earnings from Sales and Revenue</h1>
          <p className="text-muted-foreground">
            Calculate your royalty earnings instantly with our free Royalty Calculator. Enter units sold, price per unit, and royalty rate to see your gross revenue, royalty payout, and net earnings after deductions — perfect for authors, musicians, and creators tracking their income.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="unitsSold">Units Sold</Label>
                <Input
                  id="unitsSold"
                  type="number"
                  placeholder="Enter units sold"
                  value={unitsSold}
                  onChange={(e) => setUnitsSold(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pricePerUnit">Price Per Unit</Label>
                <Input
                  id="pricePerUnit"
                  type="number"
                  placeholder="Enter price per unit"
                  value={pricePerUnit}
                  onChange={(e) => setPricePerUnit(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="royaltyRate">Royalty Rate (%)</Label>
                <Input
                  id="royaltyRate"
                  type="number"
                  placeholder="Enter royalty percentage"
                  value={royaltyRate}
                  onChange={(e) => setRoyaltyRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deductions">Deductions</Label>
                <Input
                  id="deductions"
                  type="number"
                  placeholder="Enter any deductions"
                  value={deductions}
                  onChange={(e) => setDeductions(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateRoyalty} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Royalty Earnings</p>
                    <p className="text-3xl font-bold text-primary">${result.royaltyEarnings.toFixed(2)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Gross Revenue</p>
                      <p className="text-lg font-bold">${result.grossRevenue.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Deductions</p>
                      <p className="text-lg font-bold">${(parseFloat(deductions) || 0).toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Net Payout</p>
                    <p className="text-lg font-bold text-green-600">${result.afterDeductions.toFixed(2)}</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Based on {unitsSold} units × ${parseFloat(pricePerUnit).toFixed(2)} × {royaltyRate}%</p>
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
                How to Use This Royalty Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter sales data</p>
                    <p>Input the number of units sold and the price per unit. The calculator multiplies these to get gross revenue.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Set your royalty rate</p>
                    <p>Enter your royalty percentage. Common rates range from 5-15% for books, 10-20% for music, and varies widely for other products.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Add deductions and calculate</p>
                    <p>Include any advances or deductions, then click Calculate. See your gross revenue, royalty earnings, and net payout.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Typical Royalty Rates by Industry
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Industry</th>
                      <th className="text-left py-3 px-2 font-semibold">Typical Rate</th>
                      <th className="text-left py-3 px-2 font-semibold">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Book Publishing</td>
                      <td className="py-3 px-2">5-15%</td>
                      <td className="py-3 px-2">Hardcover pays more than paperback</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">E-books</td>
                      <td className="py-3 px-2">25-70%</td>
                      <td className="py-3 px-2">Self-publishing platforms vary widely</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Music Streaming</td>
                      <td className="py-3 px-2">$0.003-0.005/stream</td>
                      <td className="py-3 px-2">Per-stream rate, not percentage</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Music Sales</td>
                      <td className="py-3 px-2">10-20%</td>
                      <td className="py-3 px-2">Based on wholesale or retail price</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Art Prints</td>
                      <td className="py-3 px-2">10-30%</td>
                      <td className="py-3 px-2">Gallery commissions reduce artist share</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Software/Apps</td>
                      <td className="py-3 px-2">70-85%</td>
                      <td className="py-3 px-2">After platform fees (App Store, Steam)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Licensing/Merchandise</td>
                      <td className="py-3 px-2">5-15%</td>
                      <td className="py-3 px-2">Based on wholesale price typically</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Stock Photography</td>
                      <td className="py-3 px-2">15-40%</td>
                      <td className="py-3 px-2">Varies by license type and exclusivity</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: Rates vary significantly based on contracts, negotiation, and specific platforms. Always review your agreement terms.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Royalty Calculations
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  Royalties are payments made to creators or rights holders for the ongoing use of their work. The basic formula is straightforward: multiply your sales revenue by your royalty rate. If you sell 1000 books at $20 each with a 10% royalty, you earn $2000.
                </p>
                <p>
                  The calculation gets more complex with deductions. Publishers often deduct advances, marketing costs, or returns from royalty payments. An advance is essentially a prepayment — you don&apos;t receive additional royalties until your earnings exceed the advance amount. This is called &quot;earning out&quot; your advance.
                </p>
                <p>
                  Different industries calculate the base differently. Book royalties might be based on list price, net receipts, or wholesale price. Music royalties split between mechanical, performance, and sync licenses. Understanding what your percentage applies to matters more than the percentage itself.
                </p>
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Important:</strong> A 10% royalty on list price differs from 10% on net. If a $20 book sells wholesale for $10, 10% of list = $2/book but 10% of net = $1/book. Always clarify the royalty base.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips for Maximizing Royalty Earnings
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Negotiate the royalty base</h4>
                  <p>
                    A lower percentage of a higher base often beats a higher percentage of a lower base. Ten percent of retail price typically earns more than 15% of wholesale. Push for royalties based on the highest reasonable base.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Watch for hidden deductions</h4>
                  <p>
                    Contracts may allow deductions for &quot;packaging,&quot; &quot;breakage,&quot; or &quot;free copies.&quot; These reduce your effective rate. Negotiate caps on deductions or require itemized statements showing what was deducted and why.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Understand the advance structure</h4>
                  <p>
                    Advances are paid in installments — on signing, delivery, and publication. A $10,000 advance might come as $3,333 × 3. You earn no additional royalties until sales exceed the full advance amount.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Track your sales independently</h4>
                  <p>
                    Don&apos;t rely solely on royalty statements. Use platform dashboards, ISBN tracking services, or sales monitoring tools. Discrepancies happen, and you need data to challenge underpayments.
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
                  <h4 className="font-medium text-foreground mb-2">What is a good royalty rate?</h4>
                  <p>
                    &quot;Good&quot; depends on the industry and what the rate applies to. For traditional book publishing, 10-15% of list price is standard. For self-published e-books, 70% of net is common. Compare rates within your specific field, not across industries.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How do advances affect royalties?</h4>
                  <p>
                    An advance is a prepayment against future royalties. If you receive a $5,000 advance and earn $3,000 in royalties your first year, you get nothing that year. You start receiving payments only after cumulative royalties exceed $5,000.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Are royalties taxed differently?</h4>
                  <p>
                    In most jurisdictions, royalties are ordinary income, not capital gains. Self-employed creators pay income tax plus self-employment tax. Some countries offer special regimes for artists or authors — consult a tax professional in your location.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What&apos;s the difference between gross and net royalties?</h4>
                  <p>
                    Gross royalties are your earnings before any deductions. Net royalties are what you actually receive after advances, returns, or other deductions. This calculator shows both — gross royalty earnings and net payout after deductions.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How often are royalties paid?</h4>
                  <p>
                    Most publishers and platforms pay quarterly, though some pay monthly or semi-annually. Payment typically comes 60-90 days after the period ends. A Q1 (Jan-Mar) royalty might not arrive until May or June.
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
                  href="/calculators/profit-margin-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Profit Margin Calculator</span>
                  <p className="text-muted-foreground">Calculate profit margins and markup percentages</p>
                </a>
                <a
                  href="/calculators/revenue-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Revenue Calculator</span>
                  <p className="text-muted-foreground">Estimate total revenue from sales</p>
                </a>
                <a
                  href="/calculators/income-tax-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Income Tax Calculator</span>
                  <p className="text-muted-foreground">Estimate tax on your earnings</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
