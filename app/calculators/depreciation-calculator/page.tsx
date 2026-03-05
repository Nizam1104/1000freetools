"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DepreciationCalculatorPage() {
  const [assetCost, setAssetCost] = useState<string>("");
  const [salvageValue, setSalvageValue] = useState<string>("");
  const [usefulLife, setUsefulLife] = useState<string>("");
  const [method, setMethod] = useState<string>("straight-line");
  const [result, setResult] = useState<{
    annualDepreciation: number;
    totalDepreciation: number;
    schedule: Array<{ year: number; depreciation: number; bookValue: number }>;
  } | null>(null);

  const calculateDepreciation = () => {
    const cost = parseFloat(assetCost);
    const salvage = parseFloat(salvageValue);
    const life = parseFloat(usefulLife);

    if (isNaN(cost) || isNaN(salvage) || isNaN(life) || cost <= 0 || life <= 0) {
      return;
    }

    const depreciableAmount = cost - salvage;
    const schedule = [];
    let bookValue = cost;
    let totalDep = 0;

    if (method === "straight-line") {
      const annualDep = depreciableAmount / life;
      for (let year = 1; year <= life; year++) {
        bookValue -= annualDep;
        totalDep += annualDep;
        schedule.push({
          year,
          depreciation: Math.round(annualDep * 100) / 100,
          bookValue: Math.round(Math.max(bookValue, salvage) * 100) / 100,
        });
      }
      setResult({ annualDepreciation: annualDep, totalDepreciation: totalDep, schedule });
    } else if (method === "declining-balance") {
      const rate = 2 / life;
      for (let year = 1; year <= life; year++) {
        const dep = bookValue * rate;
        bookValue -= dep;
        if (bookValue < salvage) {
          bookValue = salvage;
        }
        totalDep += dep;
        schedule.push({
          year,
          depreciation: Math.round(dep * 100) / 100,
          bookValue: Math.round(Math.max(bookValue, salvage) * 100) / 100,
        });
      }
      setResult({ annualDepreciation: schedule[0]?.depreciation || 0, totalDepreciation: totalDep, schedule });
    } else if (method === "sum-of-years") {
      const sumYears = (life * (life + 1)) / 2;
      for (let year = 1; year <= life; year++) {
        const dep = depreciableAmount * ((life - year + 1) / sumYears);
        bookValue -= dep;
        totalDep += dep;
        schedule.push({
          year,
          depreciation: Math.round(dep * 100) / 100,
          bookValue: Math.round(Math.max(bookValue, salvage) * 100) / 100,
        });
      }
      setResult({ annualDepreciation: schedule[0]?.depreciation || 0, totalDepreciation: totalDep, schedule });
    }
  };

  const reset = () => {
    setAssetCost("");
    setSalvageValue("");
    setUsefulLife("");
    setMethod("straight-line");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Depreciation Calculator</h1>
          <p className="text-muted-foreground">
            Calculate how your asset's value decreases over time. Supports straight-line, declining balance, and sum-of-years-digits depreciation methods.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="assetCost">Asset Cost</Label>
                <Input
                  id="assetCost"
                  type="number"
                  placeholder="Enter asset cost"
                  value={assetCost}
                  onChange={(e) => setAssetCost(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salvageValue">Salvage Value</Label>
                <Input
                  id="salvageValue"
                  type="number"
                  placeholder="Enter salvage value"
                  value={salvageValue}
                  onChange={(e) => setSalvageValue(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="usefulLife">Useful Life (Years)</Label>
                <Input
                  id="usefulLife"
                  type="number"
                  placeholder="Enter useful life"
                  value={usefulLife}
                  onChange={(e) => setUsefulLife(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="method">Depreciation Method</Label>
                <Select value={method} onValueChange={setMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="straight-line">Straight-Line</SelectItem>
                    <SelectItem value="declining-balance">Declining Balance</SelectItem>
                    <SelectItem value="sum-of-years">Sum-of-Years-Digits</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateDepreciation} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">First Year Depreciation</p>
                    <p className="text-2xl font-bold text-primary">${result.annualDepreciation.toFixed(2)}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Depreciation</p>
                    <p className="text-lg font-bold">${result.totalDepreciation.toFixed(2)}</p>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-semibold mb-2">Depreciation Schedule</h4>
                    <div className="max-h-48 overflow-y-auto">
                      <table className="w-full text-sm">
                        <thead className="sticky top-0 bg-background">
                          <tr className="border-b">
                            <th className="text-left py-1">Year</th>
                            <th className="text-right py-1">Depreciation</th>
                            <th className="text-right py-1">Book Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.schedule.map((row) => (
                            <tr key={row.year} className="border-b last:border-0">
                              <td className="py-1">{row.year}</td>
                              <td className="text-right">${row.depreciation.toLocaleString()}</td>
                              <td className="text-right">${row.bookValue.toLocaleString()}</td>
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

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Depreciation Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter the asset cost</p>
                    <p>Input the original purchase price of the asset. This is what you paid to acquire it.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Set salvage value and useful life</p>
                    <p>Salvage value is what the asset will be worth at the end of its useful life. Useful life is how many years you expect to use it.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Choose a depreciation method and calculate</p>
                    <p>Select straight-line, declining balance, or sum-of-years-digits. Click Calculate to see the annual depreciation schedule.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Depreciation Methods Compared
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Method</th>
                      <th className="text-left py-3 px-2 font-semibold">How It Works</th>
                      <th className="text-left py-3 px-2 font-semibold">Best For</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2 font-medium">Straight-Line</td>
                      <td className="py-3 px-2">Equal depreciation each year</td>
                      <td className="py-3 px-2">Buildings, furniture, general office equipment</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2 font-medium">Declining Balance</td>
                      <td className="py-3 px-2">Higher depreciation in early years</td>
                      <td className="py-3 px-2">Vehicles, computers, technology that becomes obsolete quickly</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2 font-medium">Sum-of-Years-Digits</td>
                      <td className="py-3 px-2">Accelerated but less extreme than declining balance</td>
                      <td className="py-3 px-2">Assets that lose value quickly but not as fast as tech</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Depreciation
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  Depreciation is how businesses spread the cost of an asset over its useful life. Instead of deducting the full cost in year one, you deduct a portion each year. This matches the expense to the revenue the asset helps generate.
                </p>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why Depreciation Matters</h4>
                  <p>
                    Depreciation affects your taxable income and book value. Higher depreciation means lower taxable income in the short term. It also shows how much of an asset's value has been "used up" on your balance sheet.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Salvage Value Explained</h4>
                  <p>
                    Salvage value (also called residual value or scrap value) is what you expect to get when you sell or dispose of the asset at the end of its useful life. A car might have a salvage value based on its expected trade-in value. A computer might have zero salvage value.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Useful Life Guidelines</h4>
                  <p>
                    The IRS publishes useful life guidelines in Publication 946. Common examples: computers and office equipment (5 years), vehicles (5 years), furniture and fixtures (7 years), residential rental property (27.5 years), commercial property (39 years). Your actual useful life may differ based on how you use the asset.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Common Useful Life Estimates
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Asset Type</th>
                      <th className="text-left py-3 px-2 font-semibold">Typical Useful Life</th>
                      <th className="text-left py-3 px-2 font-semibold">Common Method</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Computers & Software</td>
                      <td className="py-3 px-2">3-5 years</td>
                      <td className="py-3 px-2">Declining Balance</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Office Furniture</td>
                      <td className="py-3 px-2">7-10 years</td>
                      <td className="py-3 px-2">Straight-Line</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Vehicles</td>
                      <td className="py-3 px-2">5-8 years</td>
                      <td className="py-3 px-2">Declining Balance</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Machinery</td>
                      <td className="py-3 px-2">10-15 years</td>
                      <td className="py-3 px-2">Straight-Line or Sum-of-Years</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Buildings (Commercial)</td>
                      <td className="py-3 px-2">39 years</td>
                      <td className="py-3 px-2">Straight-Line</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Buildings (Residential Rental)</td>
                      <td className="py-3 px-2">27.5 years</td>
                      <td className="py-3 px-2">Straight-Line</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: These are general guidelines. Consult a tax professional for your specific situation.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips for Depreciation Planning
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Consider Section 179 Deduction</p>
                    <p>For qualifying assets, you may be able to deduct the full cost in year one instead of depreciating over time. There are annual limits and phase-out thresholds.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Keep Detailed Records</p>
                    <p>Document purchase dates, costs, and when assets are placed in service. The IRS requires this information for depreciation deductions.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Review Salvage Values Periodically</p>
                    <p>If an asset's expected salvage value changes significantly, you may need to adjust your depreciation calculations going forward.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Understand Bonus Depreciation</p>
                    <p>Bonus depreciation allows additional first-year depreciation for qualifying property. Rules change frequently, so check current tax law.</p>
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
                  <h4 className="font-medium text-foreground mb-2">What is the simplest depreciation method?</h4>
                  <p>
                    Straight-line depreciation is the simplest. You subtract salvage value from cost, then divide by useful life. A $10,000 asset with $1,000 salvage value and 5-year life depreciates $1,800 per year.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Can I change depreciation methods?</h4>
                  <p>
                    Generally, you need IRS approval to change depreciation methods. Form 3115 is used to request a change. It's best to choose the right method from the start rather than trying to switch later.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What happens when I sell a depreciated asset?</h4>
                  <p>
                    If you sell for more than the book value, you may have depreciation recapture taxed as ordinary income. If you sell for less, you may have a deductible loss. Keep records of the sale.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Do I have to depreciate assets?</h4>
                  <p>
                    For business assets with a useful life over one year, depreciation is generally required. You can't deduct the full cost immediately (unless qualifying for Section 179). Personal assets aren't depreciated.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How is book value different from market value?</h4>
                  <p>
                    Book value is cost minus accumulated depreciation. Market value is what someone would pay for the asset today. They're often different. A well-maintained vehicle might have a market value higher than its book value.
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
                  href="/calculators/roi-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">ROI Calculator</span>
                  <p className="text-muted-foreground">Calculate return on investment for business assets</p>
                </a>
                <a
                  href="/calculators/business-loan-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Business Loan Calculator</span>
                  <p className="text-muted-foreground">Plan financing for equipment and asset purchases</p>
                </a>
                <a
                  href="/calculators/break-even-calculator"
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">Break-Even Calculator</span>
                  <p className="text-muted-foreground">Determine when an investment becomes profitable</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
