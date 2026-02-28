"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function StepDownSIPCalculatorPage() {
  const [monthlySIP, setMonthlySIP] = useState<string>("");
  const [expectedReturn, setExpectedReturn] = useState<string>("");
  const [tenure, setTenure] = useState<string>("");
  const [stepDownPercent, setStepDownPercent] = useState<string>("");
  const [result, setResult] = useState<{
    totalInvested: number;
    maturityValue: number;
    wealthGained: number;
    yearByYear: Array<{ year: number; sip: number; invested: number; value: number }>;
  } | null>(null);

  const calculateStepDownSIP = () => {
    const p = parseFloat(monthlySIP);
    const r = parseFloat(expectedReturn) / 100 / 12;
    const n = parseFloat(tenure);
    const stepDown = parseFloat(stepDownPercent) / 100;

    if (isNaN(p) || isNaN(r) || isNaN(n) || isNaN(stepDown) || p <= 0 || n <= 0) {
      return;
    }

    let totalInvested = 0;
    let maturityValue = 0;
    let currentSIP = p;
    const yearByYear = [];

    for (let year = 1; year <= n; year++) {
      let yearValue = 0;
      for (let month = 0; month < 12; month++) {
        yearValue = yearValue * (1 + r) + currentSIP;
        totalInvested += currentSIP;
      }
      maturityValue = maturityValue * Math.pow(1 + r, 12) + yearValue;
      yearByYear.push({
        year,
        sip: Math.round(currentSIP * 100) / 100,
        invested: Math.round(totalInvested * 100) / 100,
        value: Math.round(yearValue * 100) / 100,
      });
      currentSIP = currentSIP * (1 - stepDown);
      if (currentSIP < 0) currentSIP = 0;
    }

    setResult({
      totalInvested,
      maturityValue,
      wealthGained: maturityValue - totalInvested,
      yearByYear,
    });
  };

  const reset = () => {
    setMonthlySIP("");
    setExpectedReturn("");
    setTenure("");
    setStepDownPercent("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Step-Down SIP Calculator</h1>
          <p className="text-muted-foreground">
            Model a SIP where contributions taper down each year. Ideal for retirement planning or winding down an investment phase with decreasing monthly installments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="monthlySIP">Initial Monthly SIP</Label>
                <Input
                  id="monthlySIP"
                  type="number"
                  placeholder="Enter monthly SIP"
                  value={monthlySIP}
                  onChange={(e) => setMonthlySIP(e.target.value)}
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
                <Label htmlFor="tenure">Investment Tenure (Years)</Label>
                <Input
                  id="tenure"
                  type="number"
                  placeholder="Enter tenure"
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stepDownPercent">Annual Step-Down (%)</Label>
                <Input
                  id="stepDownPercent"
                  type="number"
                  placeholder="e.g., 10 for 10% decrease"
                  value={stepDownPercent}
                  onChange={(e) => setStepDownPercent(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateStepDownSIP} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Maturity Value</p>
                    <p className="text-3xl font-bold text-primary">${result.maturityValue.toFixed(2)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Invested</p>
                      <p className="text-lg font-bold">${result.totalInvested.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Wealth Gained</p>
                      <p className="text-lg font-bold text-green-600">${result.wealthGained.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-semibold mb-2">Year-by-Year Breakdown</h4>
                    <div className="max-h-48 overflow-y-auto">
                      <table className="w-full text-sm">
                        <thead className="sticky top-0 bg-background">
                          <tr className="border-b">
                            <th className="text-left py-1">Year</th>
                            <th className="text-right py-1">Monthly SIP</th>
                            <th className="text-right py-1">Invested</th>
                            <th className="text-right py-1">Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.yearByYear.map((y) => (
                            <tr key={y.year} className="border-b last:border-0">
                              <td className="py-1">{y.year}</td>
                              <td className="text-right">${y.sip.toFixed(0)}</td>
                              <td className="text-right">${y.invested.toLocaleString()}</td>
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
