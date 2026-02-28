"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function WealthGrowthProjectionCalculatorPage() {
  const [currentSavings, setCurrentSavings] = useState<string>("");
  const [monthlyContribution, setMonthlyContribution] = useState<string>("");
  const [expectedReturn, setExpectedReturn] = useState<string>("");
  const [years, setYears] = useState<string>("");
  const [result, setResult] = useState<{
    finalValue: number;
    totalContributed: number;
    totalGrowth: number;
    yearByYear: Array<{ year: number; value: number; contributed: number; growth: number }>;
  } | null>(null);

  const calculateWealthGrowth = () => {
    const current = parseFloat(currentSavings);
    const monthly = parseFloat(monthlyContribution);
    const rate = parseFloat(expectedReturn) / 100 / 12;
    const totalYears = parseFloat(years);

    if (isNaN(current) || isNaN(monthly) || isNaN(rate) || isNaN(totalYears) || current < 0 || monthly < 0 || totalYears <= 0) {
      return;
    }

    let value = current;
    let totalContributed = current;
    const yearByYear = [];

    for (let year = 1; year <= totalYears; year++) {
      for (let month = 0; month < 12; month++) {
        value = value * (1 + rate) + monthly;
        totalContributed += monthly;
      }
      yearByYear.push({
        year,
        value: Math.round(value * 100) / 100,
        contributed: Math.round(totalContributed * 100) / 100,
        growth: Math.round((value - totalContributed) * 100) / 100,
      });
    }

    setResult({
      finalValue: value,
      totalContributed,
      totalGrowth: value - totalContributed,
      yearByYear,
    });
  };

  const reset = () => {
    setCurrentSavings("");
    setMonthlyContribution("");
    setExpectedReturn("");
    setYears("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Wealth Growth Projection Calculator</h1>
          <p className="text-muted-foreground">
            Project your portfolio's value year by year. Enter current savings, monthly contributions, and expected annual return to visualize your long-term wealth trajectory.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentSavings">Current Savings</Label>
                <Input
                  id="currentSavings"
                  type="number"
                  placeholder="Enter current savings"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyContribution">Monthly Contribution</Label>
                <Input
                  id="monthlyContribution"
                  type="number"
                  placeholder="Enter monthly contribution"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
                <Input
                  id="expectedReturn"
                  type="number"
                  placeholder="Enter expected return"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(e.target.value)}
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
                <Button onClick={calculateWealthGrowth} className="flex-1">
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
                      <p className="text-sm text-muted-foreground">Total Contributed</p>
                      <p className="text-lg font-bold">${result.totalContributed.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Growth</p>
                      <p className="text-lg font-bold text-green-600">${result.totalGrowth.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-semibold mb-2">Year-by-Year Projection</h4>
                    <div className="max-h-48 overflow-y-auto">
                      <table className="w-full text-sm">
                        <thead className="sticky top-0 bg-background">
                          <tr className="border-b">
                            <th className="text-left py-1">Year</th>
                            <th className="text-right py-1">Value</th>
                            <th className="text-right py-1">Growth</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.yearByYear.map((y) => (
                            <tr key={y.year} className="border-b last:border-0">
                              <td className="py-1">{y.year}</td>
                              <td className="text-right">${y.value.toLocaleString()}</td>
                              <td className="text-right text-green-600">${y.growth.toLocaleString()}</td>
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
