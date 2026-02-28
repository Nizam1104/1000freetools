"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RSUVestingCalculatorPage() {
  const [totalRSUs, setTotalRSUs] = useState<string>("");
  const [grantPrice, setGrantPrice] = useState<string>("");
  const [currentPrice, setCurrentPrice] = useState<string>("");
  const [vestingYears, setVestingYears] = useState<string>("");
  const [cliffMonths, setCliffMonths] = useState<string>("12");
  const [taxRate, setTaxRate] = useState<string>("");
  const [result, setResult] = useState<{
    vestingSchedule: Array<{ date: string; shares: number; value: number; tax: number }>;
    totalValue: number;
    totalTax: number;
    netValue: number;
  } | null>(null);

  const calculateRSUVesting = () => {
    const total = parseFloat(totalRSUs);
    const price = parseFloat(grantPrice);
    const currPrice = parseFloat(currentPrice) || price;
    const years = parseFloat(vestingYears);
    const cliff = parseFloat(cliffMonths);
    const tax = parseFloat(taxRate) / 100;

    if (isNaN(total) || isNaN(price) || isNaN(years) || isNaN(cliff) || isNaN(tax) || total <= 0 || years <= 0) {
      return;
    }

    const monthlyVesting = total / (years * 12);
    const vestingSchedule = [];
    let totalValue = 0;
    let totalTax = 0;

    const startDate = new Date();

    for (let month = 1; month <= years * 12; month++) {
      if (month >= cliff) {
        const shares = monthlyVesting;
        const value = shares * currPrice;
        const taxAmount = value * tax;
        totalValue += value;
        totalTax += taxAmount;

        const vestDate = new Date(startDate);
        vestDate.setMonth(vestDate.getMonth() + month);

        vestingSchedule.push({
          date: vestDate.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
          shares: Math.round(shares * 1000) / 1000,
          value: Math.round(value * 100) / 100,
          tax: Math.round(taxAmount * 100) / 100,
        });
      }
    }

    setResult({
      vestingSchedule,
      totalValue,
      totalTax,
      netValue: totalValue - totalTax,
    });
  };

  const reset = () => {
    setTotalRSUs("");
    setGrantPrice("");
    setCurrentPrice("");
    setVestingYears("");
    setCliffMonths("12");
    setTaxRate("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">RSU Vesting Calculator</h1>
          <p className="text-muted-foreground">
            Track your RSU compensation clearly. Calculate shares vesting on each date, their estimated value, and estimated tax liability based on your vesting schedule.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="totalRSUs">Total RSUs Granted</Label>
                <Input
                  id="totalRSUs"
                  type="number"
                  placeholder="Enter total RSUs"
                  value={totalRSUs}
                  onChange={(e) => setTotalRSUs(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="grantPrice">Grant Price Per Share</Label>
                <Input
                  id="grantPrice"
                  type="number"
                  placeholder="Enter grant price"
                  value={grantPrice}
                  onChange={(e) => setGrantPrice(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentPrice">Current/Future Price Per Share</Label>
                <Input
                  id="currentPrice"
                  type="number"
                  placeholder="Enter expected price"
                  value={currentPrice}
                  onChange={(e) => setCurrentPrice(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vestingYears">Vesting Period (Years)</Label>
                <Input
                  id="vestingYears"
                  type="number"
                  placeholder="e.g., 4 years"
                  value={vestingYears}
                  onChange={(e) => setVestingYears(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cliffMonths">Cliff Period (Months)</Label>
                <Input
                  id="cliffMonths"
                  type="number"
                  placeholder="Default 12"
                  value={cliffMonths}
                  onChange={(e) => setCliffMonths(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxRate">Tax Rate (%)</Label>
                <Input
                  id="taxRate"
                  type="number"
                  placeholder="Enter tax rate"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateRSUVesting} className="flex-1">
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
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Value</p>
                      <p className="text-xl font-bold text-primary">${result.totalValue.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Net After Tax</p>
                      <p className="text-xl font-bold text-green-600">${result.netValue.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Estimated Total Tax</p>
                    <p className="text-lg font-bold text-red-600">${result.totalTax.toLocaleString()}</p>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-semibold mb-2">Vesting Schedule</h4>
                    <div className="max-h-48 overflow-y-auto">
                      <table className="w-full text-sm">
                        <thead className="sticky top-0 bg-background">
                          <tr className="border-b">
                            <th className="text-left py-1">Date</th>
                            <th className="text-right py-1">Shares</th>
                            <th className="text-right py-1">Value</th>
                            <th className="text-right py-1">Tax</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.vestingSchedule.slice(0, 12).map((row, i) => (
                            <tr key={i} className="border-b last:border-0">
                              <td className="py-1">{row.date}</td>
                              <td className="text-right">{row.shares.toFixed(2)}</td>
                              <td className="text-right">${row.value.toFixed(0)}</td>
                              <td className="text-right">${row.tax.toFixed(0)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {result.vestingSchedule.length > 12 && (
                        <p className="text-xs text-muted-foreground mt-2">+{result.vestingSchedule.length - 12} more vesting dates</p>
                      )}
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
